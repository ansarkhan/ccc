import React from 'react'
var ReactS3Uploader = require('react-s3-uploader');

export default props =>
    // <div className='button'>
    //     <input type='file' id='multi' name="imageUpload" onChange={props.onChange} multiple />
    // </div>

    // <ReactS3Uploader
    //     signingUrl="/s3/sign"
    //     signingUrlMethod="GET"
    //     accept="image/*"
    //     s3path="/uploads/"
    //     preprocess={this.onUploadStart}
    //     onSignedUrl={this.onSignedUrl}
    //     onProgress={this.onUploadProgress}
    //     onError={this.onUploadError}
    //     onFinish={this.onUploadFinish}
    //     // signingUrlHeaders={{ additional: headers }}
    //     // signingUrlQueryParams={{ additional: query - params }}
    //     signingUrlWithCredentials={true}      // in case when need to pass authentication credentials via CORS
    //     uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
    //     contentDisposition="auto"
    //     scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
    //     // server="http://cross-origin-server.com"
    //     inputRef={cmp => this.uploadInput = cmp}
    //     autoUpload={true}
    // />

    <form action="/api/image-upload" method="POST" className="image-form">
        <input id="image-upload" className="file-add" type="file" accept="image/*" name="imageUpload" multiple />
        <button type="submit" id="image-upload" className="sinsup-button">Upload Image</button>
    </form>
