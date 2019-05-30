import React, { Component } from 'react';
import './App.css';
// import Footer from './components/Footer/Footer';
import {BrowserRouter, Route} from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import Uploader from './components/Uploader/Uploader';
import Albums from './components/Albums/Albums';
import Pictures from './components/Pictures/Pictures';
import EditAlbum from './components/Albums/EditAlbum';
import EditPicture from './components/Pictures/EditPicture';
// import axios from 'axios';

export default class App extends Component {
  
  state = {
    images: [],
    tags: [],
    albums: []
  };

  
  async componentDidMount() {
    let res = await fetch('/api/images');
    let data = await res.json();

    let resAlbum = await fetch('/api/albums');
    let dataAlbum = await resAlbum.json();

    this.setState({
      images: data,
      tags: [],
      albums: dataAlbum
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
    
    return <EditPicture {...props} picture={currentImg} tags={noDplTags} album={currentImg.album.name}  />
  }

  getAlbum = (props) => {
    let id = props.match.params.id;
    let currentAlbum = this.state.albums.find(
      album => album._id === id
    );

    return <EditAlbum {...props} album={currentAlbum}  />
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
          <Route exact path="/albums" render={() => <Albums albums={this.state.albums} />} />
          <Route exact path="/" component={Uploader} />
          {/* <Route exact path='/api/images/edit/:id' render={(routeProps) => <EditPicture pictures={this.state.images} {...routeProps} />} /> */}
          <Route exact path='/images/edit/:id' render={this.getPicture} />
          <Route exact path='/albums/edit/:id' render={this.getAlbum} />

          </div>
        </div>
        
        
        {/* <Footer /> */}
        </BrowserRouter>
      </div>
    );
  }
};
