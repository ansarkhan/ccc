import React, { Component, Fragment } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import {BrowserRouter, Route} from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import Uploader from './components/Uploader/Uploader';
import Albums from './components/Albums/Albums';
import Pictures from './components/Pictures/Pictures';
import EditPicture from './components/Pictures/EditPicture';

export default class App extends Component {
  
  state = {
    uploading: false,
    images: []
  }

  render() {

    return (
      <div>
        <BrowserRouter>
        <div className="cassowaryapp">
        <SideNav />  
        <div className="cassowarycomponents">
        <Route exact path="/" component={Albums} />
        <Route exact path="/pictures" component={Pictures} />
        <Route exact path="/upload" component={Uploader} />
        <Route
            exact
            path='/api/image/edit/:id'
            component={EditPicture}
          />
        </div>
        </div>
        
        
        {/* <Footer /> */}
        </BrowserRouter>
      </div>
    );
  }
};
