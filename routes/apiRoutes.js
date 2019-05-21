module.exports = (app) => {


    const mongojs = require("mongojs");

    const databaseUrl = "project3";
    const collections = ["images"];
    const db = mongojs(databaseUrl, collections);

    db.on("error", function(error) {
      console.log("Database Error:", error);
    });

    const AWS = require('aws-sdk');
    const s3 = new AWS.S3();
  

    const mongojs = require("mongojs");
    const databaseUrl = "project3";
    const collections = ["images"];
    const db = mongojs(databaseUrl, collections);

    app.get('/api/all-images', (req, res) => {

      db.images.find({}, function(error, found) {
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


    // Update image name
    app.post('/api/image-name/edit', (req,res) => {
      console.log(req.body);
      res.send("ok");

      db.images.findAndModify({
        query: { name: req.body.name },
        update: { $set: { name: req.body.name_new } },
        new: true
      }, function (err, doc, lastErrorObject) {

      });

    });

    app.post('/api/image-tag/add', (req,res) => {
      //find image, add tag
    });

    app.post('/api/image-tag/del', (req,res) => {
      //find image, delete tag
    });

    app.post('/api/image-album/add', (req,res) => {
      //find image, add album
    });

    app.post('/api/image-album/delete', (req,res) => {
      //find image, delete album
    });



    // test API route for 
    app.get('/api/test', (req, res) => {
        res.send('test')
    });
  
  const fs = require('fs');

  const s3 = new AWS.S3();


  // test API route for 
  app.get('/api/test', (req, res) => {
    res.send('test')
  });

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
            console.log(data);

            // console.log(res)

            let tags = [];
            let length = Math.min(5, res.Labels.length);
            for (let i = 0; i < length; i++) {
              tags.push(res.Labels[i].Name);
            }
            // console.log(tags)

            let imageObject = {
              "createdAt": Date.now(),
              "name": data.Key,
              "tags": tags,
              "url": data.Location
            };
            // console.log(imageObject);
            db.images.insert(imageObject);
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

