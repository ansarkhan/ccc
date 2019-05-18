module.exports = (app) => {
    
    app.get('/api/test', (req, res) => {
        res.send('test')
    });

    app.post('/api/upload', function(req,res) {

        var text = JSON.stringify(req.body);
        console.log(text);


        res.json("hello");

        // You can either "yarn add aws-sdk" or "npm i aws-sdk"
        /*
        var base64 = req.body;

        const AWS = require('aws-sdk')

        // Configure AWS with your access and secret key. I stored mine as an ENV on the server
        // ie: process.env.ACCESS_KEY_ID = "abcdefg"
        AWS.config.update({ accessKeyId: "AKIAVYR463QKBOP4IGMM", secretAccessKey: "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", region: "us-east-1" });


        // Create an s3 instance
        const s3 = new AWS.S3();

        // Ensure that you POST a base64 data to your server.
        // Let's assume the variable "base64" is one.
        const base64Data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')

        // Getting the file type, ie: jpeg, png or gif
        const type = base64.split(';')[0].split('/')[1]

        // Generally we'd have a userId associated with the image
        // For this example, we'll simulate one
        const userId = 1;

        // With this setup, each time your user uploads an image, will be overwritten.
        // To prevent this, use a unique Key each time.
        // This won't be needed if they're uploading their avatar, hence the filename, userAvatar.js.
        const params = {
        Bucket: "ccc-project-3-sandbox",
        Key: `${userId}.${type}`, // type is not required
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64', // required
        ContentType: `image/${type}` // required. Notice the back ticks
        }

        // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
        // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
        s3.upload(params, (err, data) => {
        if (err) { return console.log(err) }
        
        // Continue if no error
        // Save data.Location in your database
        console.log('Image successfully uploaded.');
        });
        */
    });
};

// function addPhoto(albumName) {
//     var files = document.getElementById('photoupload').files;
//     if (!files.length) {
//       return alert('Please choose a file to upload first.');
//     }
//     var file = files[0];
//     var fileName = file.name;
//     var albumPhotosKey = encodeURIComponent(albumName) + '//';
  
//     var photoKey = albumPhotosKey + fileName;
//     s3.upload({
//       Key: photoKey,
//       Body: file,
//       ACL: 'public-read'
//     }, function(err, data) {
//       if (err) {
//         return alert('There was an error uploading your photo: ', err.message);
//       }
//       alert('Successfully uploaded photo.');
//       viewAlbum(albumName);
//     });
//   }