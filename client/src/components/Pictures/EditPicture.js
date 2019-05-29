import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Edit.css'

export class EditPicture extends Component {
  state = {
    imageName: '',
    imageUrl: '',
    imageTags: this.props.tags
  }
  componentDidMount() {
    let {name, url} = this.props.picture;
    let noDplTags =  this.props.picture.tags.name;
    console.log(noDplTags)
        this.setState({ 
          imageName: name, 
          imageUrl: url,
         });
         console.log(this.props.tags)
    this.renderImg();
  };

  renderImg = () => {
    let {name, url} = this.props.picture;
      return (
        <div className="Edit">
          <img className="Edit-img" src={url} alt={name}/>
        </div>
      )
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
    }, 700a);
    this.submitTag();

  };
  submitTag = async (e) => {
    let id = Object.values(this.props.match.params)[0];
    let url_2 = `/api/tags/add/${id}`;
    let tagObj = {
      "tags": this.state.imageTags
    }
    console.log(tagObj)
    try {
      await axios.post(url_2, tagObj)
    } catch (error) {
      console.log(error)
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.handleTags()
  };
  handleTags = (e) => {
   this.setState(st => ({
    imageTags: st.imageTags
    }))
    
   }

  
  handleDelete = async (e) => {
    e.preventDefault();
    let id = Object.values(this.props.match.params)[0];
    let url = `/api/images/${id}`;
    await axios.delete(url);
    this.props.history.push('/');
    setTimeout(() => {
      window.location.reload()
    }, 500);
  }

  render() {
    return (
      <Fragment>
        <h1 className="indigo-text">View & Edit</h1>
        {this.renderImg()}
        <div className="col s12">
            <form 
              onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input 
              id="imageName"
              type="text"
              name="imageName"
              value={this.state.imageName}
              onChange={this.handleChange}
              autoComplete="off"
              />    
              <label htmlFor="imageName">Image Name</label>
            </div>

            <div className="input-field">
              <input 
              id="imageTags"
              type="text"
              name="imageTags"
              value={this.state.imageTags}
              onChange={this.handleChange}
              autoComplete="off"
              />    
              <label htmlFor="imageTags">Add new Tags</label>
            </div>
            <button
        className="btn red custom_delete"
        onClick={e =>
        window.confirm(`Are you sure you wish to delete ${this.state.imageName}?`) &&
        this.handleDelete(e)
    }
        >
          Delete
        </button>
            <button 
            className="btn-floating btn-large indigo custom_btn pulse" 
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
