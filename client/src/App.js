import React, { Component, Fragment } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import {BrowserRouter, Route} from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import Uploader from './components/Uploader/Uploader';
import Albums from './components/Albums/Albums';
import Pictures from './components/Pictures/Pictures';
import EditPicture from './components/Pictures/EditPicture';
// import axios from 'axios';

export default class App extends Component {
  
  state = {
    images: []
  };

  
  async componentDidMount() {
    let res = await fetch('/api/images');
    let data = await res.json();
    this.setState({
      images: data
    })   
   
  }

  render() {

    return (
      <div>
        <BrowserRouter>
          <div className="cassowaryapp">
          <SideNav />  
          <div className="cassowarycomponents">
          <Route exact path="/" component={Albums} />
          <Route exact path="/pictures" render={() => <Pictures pictures={this.state.images} />} />
          <Route exact path="/upload" component={Uploader} />
          <Route exact path='/api/image/edit/:id' render={(routeProps) => <EditPicture pictures={this.state.images} {...routeProps} />} />
          {/* <Route exact path={`/api/image/edit/:id`} component={EditPicture}/> */}

          </div>
        </div>
        
        
        {/* <Footer /> */}
        </BrowserRouter>
      </div>
    );
  }
};
