module.exports = (app) => {

    const mongojs = require("mongojs");

    const databaseUrl = "project3";
    const collections = ["images"];
    const db = mongojs(databaseUrl, collections);

    const AWS = require('aws-sdk');
    const s3 = new AWS.S3();

    const fs = require('fs');


    // Update image name
    app.post('api/image-name/edit', (req,res) {
      //find image, update name
    });

    app.post('api/image-tag/add', (req,res) {
      //find image, add tag
    });

    app.post('api/image-tag/del', (req,res) {
      //find image, delete tag
    });

    app.post('api/image-album/add', (req,res) {
      //find image, add album
    });

    app.post('api/image-album/delete', (req,res) {
      //find image, delete album
    });



    // test API route for 
    app.get('/api/test', (req, res) => {
        res.send('test')
    });


    app.post('/api/images', function(req, res) {
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
        s3.upload(params, function(err,data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log("image uploaded to s3!")
            console.log(data);

            // s3 object name
            // s3 object url
            // s3 object createdDate

            // Make call to rekognition
              // tags
            
            // Send to mongo


            // Update image name
            // Update image tags
              // add image tags
              // delete image tags
            // Update image album
            
          }
    
        });
      
    
      });

};

