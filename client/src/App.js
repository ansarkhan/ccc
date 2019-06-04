import React, { Component } from 'react';
import './App.css';
// import Footer from './components/Footer/Footer';
import { BrowserRouter, Route } from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import Uploader from './components/Uploader/Uploader';
import SearchBar from './components/SearchBar/SearchBar';
import Albums from './components/Albums/Albums';
import Pictures from './components/Pictures/Pictures';
import AddAlbum from './components/Albums/AddAlbum';
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

    let resAlbums = await fetch('/api/albums');
    let dataAlbums = await resAlbums.json();

    this.setState({
      images: data,
      tags: [],
      albums: dataAlbums
    })

  };


  editPicture = (props) => {
    let id = props.match.params.id;
    let currentImg = this.state.images.find(
      img => img._id === id
    );
    let tags = [];
    currentImg.tags.map(t => {
      return tags.push(t.name)
    });

    let noDplTags = [...new Set(tags)];

    return <EditPicture {...props} picture={currentImg} tags={noDplTags} album={currentImg.album.name} allAlbums={this.state.albums} />
  }

  editAlbum = (props) => {
    let id = props.match.params.id;
    let currentAlbum = this.state.albums.find(
      album => album._id === id
    );

    return <EditAlbum {...props} album={currentAlbum} />
  }

  getAlbum = (props) => {
    let id = props.match.params.id;
    let currentImages = this.state.images.filter(
      img => img.album._id === id
    );

    return <Pictures pictures={currentImages} />
  }

  handleSearch = (img,searchName) => {
    let search = searchName.toLowerCase()
    if (img.name.toString().toLowerCase().includes(search)) {
      return true;
    }
    else if (img.album.name.toString().toLowerCase().includes(search)) {
      return true;
    }
    else {
      let tagMatch = false;
        img.tags.forEach(tag => {
          if (tag.name.toString().toLowerCase() === search) {
            tagMatch = true;
          }
        });
        return tagMatch;
    }
  }

  searchPictures = (props) => {
    var imgMatch = this.state.images.filter(
      img => this.handleSearch(img,props.match.params.name)
    );

    return <Pictures pictures={imgMatch} />
  }

  addAlbum = (props) => {
    return <AddAlbum {...props} />
  }

  render() {

    return (
      <div>
        <BrowserRouter>
          <div className="cassowaryapp">
            <SideNav />
            <div className="cassowarycomponents">
              {/* <Route exact path="/" component={Albums} /> */}
              <Route exact path="/search" component={SearchBar} />
              <Route exact path="/pictures" render={() => <Pictures pictures={this.state.images} />} />
              <Route exact path="/albums" render={(routeProps) =>
                <div>
                  <AddAlbum {...routeProps}/>
                  <Albums albums={this.state.albums} />
                </div>} />
              <Route exact path="/" component={Uploader} />
              {/* <Route exact path='/api/images/edit/:id' render={(routeProps) => <EditPicture pictures={this.state.images} {...routeProps} />} /> */}
              <Route exact path='/images/edit/:id' render={this.editPicture} />
              <Route exact path='/albums/edit/:id' render={this.editAlbum} />
              <Route exact path='/images/album/:id' render={this.getAlbum} />
              <Route exact path='/images/search/:name' render={this.searchPictures}/>
            </div>
          </div>


          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    );
  }
};
