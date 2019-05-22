import React, {Component} from 'react';
import './App.css';
import Uploader from './components/Uploader';
import Footer from './components/Footer';
import SideNav from './components/SideNav';



export default class App extends Component {


  state = {
    uploading: false,
    images: []
  }

  // AWS.config.update({ accessKeyId: "AKIAVYR463QKBOP4IGMM", secretAccessKey: "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", region: "us-east-1" });





  render() {

    return (
      <div>
         <SideNav />
        <Uploader />
       
        <Footer />
      </div>
    );
  }
}
