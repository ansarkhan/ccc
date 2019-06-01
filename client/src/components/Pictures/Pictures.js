import React, { Component } from 'react';
import Picture from './Picture';
import "./Pictures.css";

export class Pictures extends Component {
  state = {
    images: this.props.pictures,
  }


  // componentDidMount() {
  //   axios.get('/api/images')
  //   .then(response => {
  //     let res = response.data;

  //     this.setState({
  //       images: res
  //     })      
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  handleRenderPics = () => {
    return this.state.images.map(el =>
    <Picture
    key={el._id} 
    id={el._id}
    url={el.url}
    name={el.name}
    // this bug needs to be fixed from when you change the name to an album that doesn't exist yet
    // an idea is to populate it with a select list in the edit 
    album={el.album.name}
    date={el.createdAt}
    tags={el.tags.map(tag =>
      tag.name
    )}
    />
    )
  }

  render() {
    return (
      <div className="container">
        {this.handleRenderPics()}
      </div>
    )
  }
}

export default Pictures