import React, { Component } from 'react';
import axios from 'axios';
import {Container, Col, Row} from 'react-bootstrap';
import Picture from './Picture';
import "./Pictures.css"

export class Pictures extends Component {
  state = {
    images: [],
    tags: []
  }


  componentDidMount() {
    axios.get('http://localhost:4000/api/all-images')
    .then(response => {
      // console.log(response.data);
      let res = response.data;


      this.setState({
        images: res
      })

      console.log('saved to state')
      
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleRenderPics = () => {
    return this.state.images.map(el =>
    <Picture 
    id={el._id}
    url={el.url}
    name={el.name}
    date={el.createdAt}
    tags={el.tags.map(tag =>
      tag.name
    )}
    />
    )
  }



  render() {
    return (
      <div className="row">
        {this.handleRenderPics()}
      </div>
    )
  }
}

export default Pictures