const express = require("express");
const router = express.Router();
const upload = require('../dummy');

const AWS = require('aws-sdk');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAVYR463QKC55KAAFA";
AWS.config.secretAccessKey = "PJOiWN6dbn+vgvGjkCiThmoi5zoze8odEEcrPaE+";
AWS.config.region = "us-east-1";
const s3 = new AWS.S3();

// const singleUpload = upload.single('image');

// router.post('/image-upload', function(req, res) {
//   // console.log('request here',req);
//   singleUpload(req, res, function(err, some) {
//     if (err) {
//       console.log('res here',res,'some here',some);
//       return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
//     }

//     return res.json({'imageUrl': req.file.location});
//   });
// })

router.post("/image-upload", function (req, res) {
  const file = (req.body.imageUpload);
  const keyNum = Date.now().toString()
  const params = {
    Bucket: "ccc-project-3-sandbox",
    Key: keyNum,
    ACL: 'public-read',
    Body: file
  };

  console.log(params);

  s3.putObject(params, function (err, data) {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log('data',data);
    }
  });
  // res.redirect("/feed");
});

module.exports = router;