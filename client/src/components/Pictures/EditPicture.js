import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Edit.css'

export class EditPicture extends Component {
  state = {
    imageName: '',
    imageUrl: ''
  }
  componentDidMount() {
    let id = Object.values(this.props.match.params)[0];
    let pictures = this.props.pictures;
    pictures.filter(m => {
      let name = m.name;
      let url = m.url
      if(id === m._id) {
        console.log(m)
        this.setState({ imageName: name, imageUrl: url });
      }
      return;
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

  handleSubmit = async (e) => {
    e.preventDefault();
    let id = Object.values(this.props.match.params)[0];
    let url = `/api/images/${id}`;
    let obj = {
      "name": this.state.imageName
    }
    console.log(obj)

    await axios.post(url, obj);
    this.props.history.push('/');
    setTimeout(() => {
      window.location.reload()
    }, 500);

  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render() {
    return (
      <Fragment>
        <h1 className="indigo-text">View & Edit</h1>
        {this.renderImg()}
        <div className="input-field col s12">
          <form 
          onSubmit={this.handleSubmit}>

        <input 
        id="imageName"
        type="text"
        name="imageName"
        value={this.state.imageName}
        onChange={this.handleChange}
        autoComplete="off"
        />    
        <label htmlFor="imageName">Image Name</label>
        <button 
        className="btn-floating btn-large indigo custom_btn pulse" 
        onClick={this.handleSaved}
        type="submit" 
        name="action">
        <i className="large material-icons">save</i>
        </button>
        </form>
      
        </div>
       
      </Fragment>
    )
  }
}

export default EditPicture
