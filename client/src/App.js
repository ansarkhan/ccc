import React, {Component} from 'react';
import './App.css';
import Images from './components/Images'
import UploadButton from './components/UploadButton';
import s3 from '../src/dummy'

const AWS = require('aws-sdk');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAVYR463QKC55KAAFA";
AWS.config.secretAccessKey = "PJOiWN6dbn+vgvGjkCiThmoi5zoze8odEEcrPaE+";
AWS.config.region = "us-east-1";

// const s3 = new AWS.S3({params: {Bucket: "ccc-project-3-sandbox"}});

// let objectNameArr = []

// let s3Params = { 
//        Bucket: "ccc-project-3-sandbox",
//        ACL : 'public-read'
// }


// s3.createBucket(s3Params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Location);
//   }
// });

var getHtml = (template) => {
  return template.join('\n');
}

var listAlbums = () => {
  s3.listObjects({Delimiter: '/'}, function(err, data) {
    if (err) {
      return alert('There was an error listing your albums: ' + err.message);
    } else {
      var albums = data.CommonPrefixes.map(function(commonPrefix) {
        var prefix = commonPrefix.Prefix;
        var albumName = decodeURIComponent(prefix.replace('/', ''));
        return getHtml([
          '<li>',
            '<span onclick="deleteAlbum(\'' + albumName + '\')">X</span>',
            '<span onclick="viewAlbum(\'' + albumName + '\')">',
              albumName,
            '</span>',
          '</li>'
        ]);
      });
      var message = albums.length ?
        getHtml([
          '<p>Click on an album name to view it.</p>',
          '<p>Click on the X to delete the album.</p>'
        ]) :
        '<p>You do not have any albums. Please Create album.';
      var htmlTemplate = [
        '<h2>Albums</h2>',
        message,
        '<ul>',
          getHtml(albums),
        '</ul>',
        '<button onclick=createAlbum("testBucket")>',
          'Create New Album',
        '</button>'
      ]
      document.getElementById('app').innerHTML = getHtml(htmlTemplate);
    }
  });
}

  var viewAlbum = (albumName) => {
    var albumPhotosKey = encodeURIComponent(albumName) + '//';
    s3.listObjects({Prefix: albumPhotosKey}, function(err, data) {
      if (err) {
        return alert('There was an error viewing your album: ' + err.message);
      }
      // 'this' references the AWS.Response instance that represents the response
      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + s3.Bucket + '/';
  
      var photos = data.Contents.map(function(photo) {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        return getHtml([
          '<span>',
            '<div>',
              '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
            '</div>',
            '<div>',
              '<span onclick="deletePhoto(\'' + albumName + "','" + photoKey + '\')">',
                'X',
              '</span>',
              '<span>',
                photoKey.replace(albumPhotosKey, ''),
              '</span>',
            '</div>',
          '</span>',
        ]);
      });
      var message = photos.length ?
        '<p>Click on the X to delete the photo</p>' :
        '<p>You do not have any photos in this album. Please add photos.</p>';
      var htmlTemplate = [
        '<h2>',
          'Album: ' + albumName,
        '</h2>',
        message,
        '<div>',
          getHtml(photos),
        '</div>',
        '<input id="photoupload" type="file" accept="image/*">',
        '<button id="addphoto" onclick="addPhoto(\'' + albumName +'\')">',
          'Add Photo',
        '</button>',
        '<button onclick="listAlbums()">',
          'Back To Albums',
        '</button>',
      ]
      document.getElementById('app').innerHTML = getHtml(htmlTemplate);
    });
  }

  var createAlbum = (albumName) => {
    albumName = albumName.trim();
    if (!albumName) {
      return alert('Album names must contain at least one non-space character.');
    }
    if (albumName.indexOf('/') !== -1) {
      return alert('Album names cannot contain slashes.');
    }
    var albumKey = encodeURIComponent(albumName) + '/';
    s3.headObject({Key: albumKey}, function(err, data) {
      if (!err) {
        return alert('Album already exists.');
      }
      if (err.code !== 'NotFound') {
        return alert('There was an error creating your album: ' + err.message);
      }
      s3.putObject({Key: albumKey}, function(err, data) {
        if (err) {
          return alert('There was an error creating your album: ' + err.message);
        }
        alert('Successfully created album.');
        viewAlbum(albumName);
      });
    });
  }

  var addPhoto = (albumName) => {
    var files = document.getElementById('photoupload').files;
    if (!files.length) {
      return alert('Please choose a file to upload first.');
    }
    var file = files[0];
    var fileName = file.name;
    var albumPhotosKey = encodeURIComponent(albumName) + '//';
  
    var photoKey = albumPhotosKey + fileName;
    s3.upload({
      Key: photoKey,
      Body: file,
      ACL: 'public-read'
    }, function(err, data) {
      if (err) {
        return alert('There was an error uploading your photo: ', err.message);
      }
      alert('Successfully uploaded photo.');
      viewAlbum(albumName);
    });
  }


export default class App extends Component {

  state = {
    uploading: false,
    images: []
  }

 componentDidMount() {
   listAlbums();
 }

  onChange = e => {
    // e.preventDefault();
    const files = Array.from(e.target.files)
    // this.setState({ uploading: true , images: files})

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    fetch('/api/image-upload', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      this.setState({ 
        uploading: false,
        images
      })
    })
  }

  render() {

    const { uploading, images } = this.state
    console.log('this.state.images',this.state.images);
    const content = () => {
      switch(true) {
        case images.length > 0:
        console.log('case: images',images);
        return <div><UploadButton onChange={this.onChange} /> <img src= {this.state.images[0].name} alt=""/></div>
          // return <div><UploadButton onChange={this.onChange} /> <Images images={images} removeImage={this.removeImage}/></div>
        default:
        console.log('case: default');
          return <UploadButton onChange={this.onChange} />
      }
    }

    return (
      <div className="App">
        <h1>CCC</h1>

        {content()}
      </div>
    );
  }
}
