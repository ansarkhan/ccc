module.exports = (app) => {

  const Album = require('../models/Album');
  const Image = require('../models/Image');
  const Tag = require('../models/Image');

  const AWS = require('aws-sdk');
  AWS.config.update({ region: 'us-east-1' });

  const s3 = new AWS.S3();

  const fs = require('fs');

  app.get('/api/all-images', (req, res) => {
    Image.find({})
    .populate("tags")
    .then (function (error, found) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.json(found);
      }
    });
  });

  // Update name of image with given id
  app.post('/api/image/edit/:id', (req, res) => {
    console.log(req.body);
    res.send("ok");

    Image.findByIdAndUpdate(req.params.id, {
      $set: { name: req.body.name_new }
    },
      { new: true },
      function (error, doc, lastErrorObject) {
        if (error) {
          console.log(error);
          res.status(500);
        } else {


        }
      });

  });

  // Add tag to image with given id
  app.post('/api/tag/add/:id', (req, res) => {
    let newTag = new Tag(req.body);
    newTag.save(function (err, doc) {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        Image.findByIdAndUpdate(req.params.id, {
          $push: { 'tags': doc.id }
        },
          { new: true },
          function (error, doc, lastErrorObject) {
            if (error) {
              console.log(error);
              res.status(500);
            } else {


            }
          });
      }
    });

  });

  app.post('/api/tag/del/:id', (req, res) => {
    Tag.findByIdAndRemove(req.params.id, (err, tag) => {
      if (err) {
        console.log(err);
        res.status(500);
      } else {


      }
    });
  });

  app.post('/api/image-album/add', (req, res) => {
    //find image, add album
  });

  app.post('/api/image-album/delete', (req, res) => {
    //find image, delete album
  });

  // test API route for 
  app.get('/api/test', (req, res) => {
    res.send('test')
  });

  // Add (Upload) an Image
  app.post('/api/images', function (req, res) {
    let sampleFile;

    if (Object.keys(req.files).length == 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    console.log('req.files.myImage >>>', req.files.myImage); // eslint-disable-line

    let file = req.files.myImage;

    // relative path for file
    sampleFile = req.files.myImage.name;

    // absolute path for file
    let localFilePath = `${__dirname}/${sampleFile}`;

    // writing the file to server
    fs.writeFile(localFilePath, file.data, (err) => {
      if (err) throw err;
      console.log('success!!');
    })

    // verifying that file has a path on server
    console.log("this is the sample file path>>>", localFilePath)

    // creating stream for s3
    let fileStream = fs.createReadStream(localFilePath);

    // parameters for s3 upload method call
    var params = {
      Body: fileStream,
      Bucket: "ccc-project-3-sandbox",
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      Key: sampleFile
    };

    // s3 upload method
    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log("image uploaded to s3!")
        // console.log(data);

        var rekognition = new AWS.Rekognition();

        let rkParams = {
          Image: {
            S3Object: {
              Bucket: "ccc-project-3-sandbox",
              Name: data.Key
            }
          },

        };

        rekognition.detectLabels(rkParams, function (err, res) {
          if (err) {
            console.log(err, err.stack)
          } else {
            console.log("image uploaded to s3!")

            var tags = [];
            let length = Math.min(5, res.Labels.length);

            for (let i = 0; i < length; i++) {
              let tagObject = {
                "name": res.Labels[i].Name
              };
              console.log('tagObject', tagObject);
              tags.push(tagObject);
            }

            // for each object in tags array, create Tag model
            Tag.create(tags)
              .then(function (dbTag) {
                console.log('tags', tags);
                console.log('dbTag', dbTag);

                let imageObject = {
                  "createdAt": Date.now(),
                  "name": data.Key,
                  "tags": dbTag,
                  "url": data.Location
                };

                // create Image model
                Image.create(imageObject)
                  .then(function (dbImage) {
                    console.log(dbImage);
                    console.log("dbImage.tags", dbImage.tags);
                  })
                  .catch(function (err) {
                    console.log(err);
                  });

              })
              .catch(function (err) {
                console.log(err);
              });
            }
          });
      }

      // ROUTES/REQUESTS
      // Update image name
      // Update image tags
      // add image tags
      // delete image tags
      // Update image album

    });

  });

};

