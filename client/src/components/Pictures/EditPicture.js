import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Edit.css'

export class EditPicture extends Component {
  state = {
    imageName: '',
    imageUrl: '',
    imageTags: {},
    imageAlbum: {}
  }
  componentDidMount() {
    let { name, url } = this.props.picture;
    let noDplTags =  this.props.picture.tags.map(n => {
      return n.name
    }).join(',');
    let thisAlbum = this.props.album;
    this.setState({
      imageName: name,
      imageUrl: url,
      imageTags: noDplTags,
      imageAlbum: thisAlbum
    });
    this.renderImg();

  };

  renderImg = () => {
    let { name, url } = this.props.picture;
    return (
      <div className="Edit">
        <img className="Edit-img" src={url} alt={name} />
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
    await axios.post(url, obj);
    this.props.history.push('/');
    setTimeout(() => {
      window.location.reload()
    }, 700);
    this.submitTag();
    this.submitAlbum();

  };
  submitTag = async (e) => {
    let id = Object.values(this.props.match.params)[0];
    let url_2 = `/api/tags/add/${id}`;
    let tagObj = {
      "tags": this.state.imageTags
    }
    console.log('tagObj',tagObj)
    try {
      await axios.post(url_2, tagObj)
    } catch (error) {
      console.log(error)
    }
  }

  submitAlbum = async (e) => {
    let id = Object.values(this.props.match.params)[0];
    let url_3 = `/api/images/sort/${id}`;
    let albumObj = {
      "name": this.state.imageAlbum
    }
    try {
      await axios.post(url_3, albumObj)
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.handleTags();
    this.handleAlbum();
  };

  handleTags = (e) => {
    this.setState(st => ({
      imageTags: st.imageTags
    }))
  };
  
  handleAlbum = (e) => {
    this.setState(st => ({
      imageAlbum: st.imageAlbum
    }))
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
  };

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

            <div className="input-field">

              <select 
              onChange={this.handleChange}
              name='imageAlbum' 
              style={{display: 'block'}}>
              <option value="" disabled selected className="text-hide">Please select
              </option>
                  {
                    this.props.allAlbums.map((a, b) => {
                  return <option
                  key={b}
                  value={a.name}> {a.name} </option>
                  })
                  }
              </select>
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
