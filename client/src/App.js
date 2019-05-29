import React, { Component } from 'react';
import './App.css';
// import Footer from './components/Footer/Footer';
import {BrowserRouter, Route} from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import Uploader from './components/Uploader/Uploader';
// import Albums from './components/Albums/Albums';
import Pictures from './components/Pictures/Pictures';
import EditPicture from './components/Pictures/EditPicture';
// import axios from 'axios';

export default class App extends Component {
  
  state = {
    images: [],
    tags: []
    
  };

  
  async componentDidMount() {
    let res = await fetch('/api/images');
    let data = await res.json();
    this.setState({
      images: data,
      tags: []
    })   
   
  };


  getPicture = (props) => {
    let id = props.match.params.id;
    let currentImg = this.state.images.find(
      img => img._id === id
    );
    let tags = [];
    currentImg.tags.map(t => {
      return tags.push(t.name)
    });
    let noDplTags = [...new Set(tags)];
    
    return <EditPicture {...props} picture={currentImg} tags={noDplTags}  />
  }

  render() {

    return (
      <div>
        <BrowserRouter>
          <div className="cassowaryapp">
          <SideNav />  
          <div className="cassowarycomponents">
          {/* <Route exact path="/" component={Albums} /> */}
          <Route exact path="/pictures" render={() => <Pictures pictures={this.state.images} />} />
          <Route exact path="/" component={Uploader} />
          {/* <Route exact path='/api/image/edit/:id' render={(routeProps) => <EditPicture pictures={this.state.images} {...routeProps} />} /> */}
          <Route exact path='/image/edit/:id' render={this.getPicture} />

          </div>
        </div>
        
        
        {/* <Footer /> */}
        </BrowserRouter>
      </div>
    );
  }
};
