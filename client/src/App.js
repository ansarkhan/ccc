import React, {Component} from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
// import {BrowserRouter} from 'react-router-dom';
import Sidenav from './components/Sidenav/Sidenav';
// import Uploader from './components/Uploader/Uploader';



export default class App extends Component {
  
  state = {
    uploading: false,
    images: []
  }

  render() {

    return (
      <div>
        <Sidenav />
        
        <Footer />
      </div>
    );
  }
}
