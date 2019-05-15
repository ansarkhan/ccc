const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAVYR463QKC55KAAFA";
AWS.config.secretAccessKey = "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";
AWS.config.region = "us-east-1";

const s3 = new AWS.S3();


let objectNameArr = []

let s3Params = { 
       Bucket: "ccc-project-3-sandbox"
}

const upload = multer({
       storage: multerS3({
         s3: s3,
         bucket: s3Params.Bucket,
         acl: 'public-read',
         metadata: function (req, file, cb) {
           cb(null, {fieldName: file.fieldname});
         },
         key: function (req, file, cb) {
           cb(null, Date.now().toString())
         }
       })
     })
     
module.exports = upload;

var rekognition = new AWS.Rekognition();


// s3.listObjects(s3Params, function (err,data) {
//        if (err) {
//               console.log(err);
//        } else {
//               console.log(data);  
//        }

//        objectNameArr = data.Contents.map(function (el) { return el.Key; });
//        // console.log(objectNameArr);

//        objectNameArr.forEach(element => {

//               let rkParams = {
//                      Image: {
//                         S3Object: {
//                         Bucket: "ccc-project-3-sandbox",
//                         Name: element
//                        }
//                       },
                     
//                      };
                 
//                      rekognition.detectLabels(rkParams, function(err, data) {
//                      if (err) {
//                             console.log(err, err.stack)
//                      } else {
//                             console.log(data)
//                      } 
//                      });
              
//        });

// });


// Steps for uploading and analyzing
// - Use React uploader
// - Upload items to s3 using filename as object name
// - Send file names and URL to DB(sample object below)
// - Send s3 object names to Rekognition
// - Send Rekognition tags to DB

//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// User -> React Uploader -> POST to s3 
// s3 -> DB 
// s3 -> Rekognition -> DB
//  DB -> React


// EXAMPLE OBJECT

// {
//     name: file.name,
//     createdAt: 05/09/2019, 10:00:00,
//     tags: [tag1, tag2, tag3]
//     }