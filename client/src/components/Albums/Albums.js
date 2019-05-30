import React, { Component } from 'react';
import Album from './Album';
import "./Albums.css";

export class Albums extends Component {
  state = {
    albums: this.props.albums,
  }

  handleRenderAlbums = () => {
    return this.state.albums.map(el =>
    <Album
    key={el._id} 
    id={el._id}
    name={el.name}
    date={el.createdAt}
    imageNames={el.images.map(image =>
      image.name
    )}
    imageUrls={el.images.map(image =>
      image.url
    )}
    />
    )
  }

  render() {
    return (
      <div className="container">
        {this.handleRenderAlbums()}
      </div>
    )
  }
}

export default Albums;