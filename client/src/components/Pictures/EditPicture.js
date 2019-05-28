import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Edit.css'

export class EditPicture extends Component {
  state = {
    imageName: '',
    imageUrl: ''
  }
  componentDidMount() {
    let {name, url} = this.props.picture;
        this.setState({ imageName: name, imageUrl: url });
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
    }, 500);

  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
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
        <button
        className="btn red custom_delete"
        onClick={e =>
        window.confirm(`Are you sure you wish to delete ${this.state.imageName}?`) &&
        this.handleDelete(e)
    }
        >
          Delete
        </button>
      
        </div>
       
      </Fragment>
    )
  }
}

export default EditPicture
