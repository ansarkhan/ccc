import React, { Component } from 'react';
import axios from 'axios';
import './Uploader.css';

export class Uploader extends Component {

    state = {
        file: '',
        selected: null
    };

    handleChange = (e) => {
        let file = e.target.files[0];
        console.log(file)
        this.setState({
            file: file,
            selected: true
        });

    };

    handleSubmit = (e) => {
      e.preventDefault();

      if(this.state.file === '') {
       this.setState({selected: false})

      } else {
        
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        axios.post('/api/images', formData, config);
        this.props.history.push('/');
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      };
      
    };
    renderFiles = () => {
      if(this.state.selected === false) {
        return <div> No Image Selected </div>
      } else {
        return <div>{this.state.file.name}</div>
      }
    };

  render() {
    return (
      <div className="Uploader">
            <h1>uploader</h1>
    <form
        onSubmit={this.handleSubmit}
        className="image-form" 
        id="submit_image">
        <input  
        className="inputfile"
        type="file" 
        name="file" 
        id="fileName"
        accept="image/*"
        onChange= {this.handleChange} />
        <label htmlFor="fileName">Choose a file</label>
        <button type="submit" className="btn indigo">Upload</button>
      </form>

      {this.renderFiles()}
      
      </div>
    )
  }
}

export default Uploader;
