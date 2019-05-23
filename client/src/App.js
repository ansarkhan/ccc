import React, { Component, Fragment } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import {BrowserRouter, Route} from 'react-router-dom';
import Sidenav from './components/SideNav/SideNav';
import Uploader from './components/Uploader/Uploader';
import Albums from './components/Albums/Albums';
import Pictures from './components/Pictures/Pictures';




export default class App extends Component {
  
  state = {
    uploading: false,
    images: []
  }

  render() {

    return (
      <div>
        <BrowserRouter>
        {/* <Fragment> */}
        <div className="cassowaryapp">
        <Sidenav />  
        <div className="cassowarycomponents">
        <Route exact path="/" component={Albums} />
        <Route exact path="/pictures" component={Pictures} />
        <Route exact path="/upload" component={Uploader} />
        </div>
        </div>
        {/* </Fragment> */}
        
        
        <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
