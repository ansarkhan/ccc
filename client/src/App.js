import React, {Component} from 'react';
import './App.css';
import Uploader from './components/Uploader';



export default class App extends Component {


  state = {
    uploading: false,
    images: []
  }

  // AWS.config.update({ accessKeyId: "AKIAVYR463QKBOP4IGMM", secretAccessKey: "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", region: "us-east-1" });





  render() {

    return (
      <div>
        <Uploader />
      </div>
    );
  }
}
