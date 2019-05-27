import React, { Component, Fragment } from 'react';
import './Edit.css'

export class EditPicture extends Component {
  state = {
    imageName: '',
    imageUrl: ''
  }
  componentDidMount() {
    let newImageArr = [];
    let id = Object.values(this.props.match.params)[0];
    let pictures = this.props.pictures;
    pictures.filter(m => {
      let name = m.name;
      let url = m.url
      if(id === m._id) {
        this.setState({ imageName: name, imageUrl: url });
      }
    });
    
    this.renderImg();

  };
  renderImg = () => {
    // return this.state.singleImg.map(img => {
      return (
        <div className="Edit">
          <img className="Edit-img" src={this.state.imageUrl} alt={this.state.imageName}/>
        </div>
      )
    // })
  };
  handleSaved = () => {
    console.log('saved')
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    console.log(this.state)    
    return (
      <Fragment>
        <h1 className="indigo-text">View & Edit</h1>
        {this.renderImg()}
        <button 
        className="btn-floating btn-large indigo custom_btn pulse" 
        onClick={this.handleSaved}
        type="submit" 
        name="action">
          <i className="large material-icons">save</i>
        </button>
        <div class="input-field col s12">
        <input 
        id="imageName"
        type="text"
        name="imageName"
        value={this.state.imageName}
        onChange={this.handleChange}
        autocomplete="off"
        />    
        <label for="imageName">Image Name</label>
      
        </div>
       
      </Fragment>
    )
  }
}

export default EditPicture
