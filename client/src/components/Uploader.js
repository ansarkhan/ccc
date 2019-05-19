import React, { Component } from 'react'
import axios from 'axios';

export class Uploader extends Component {

    state = {
        file: ''
    }

    handleChange = (e) => {
        let file = e.target.files[0];
        console.log(file)
        this.setState({
            file: file
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        

        axios.post('/api/images', formData, config)
    }

  render() {
    return (
      <div>
            <h1>uploader</h1>
    <form
        onSubmit={this.handleSubmit}
        className="image-form" 
        id="submit_image">
        <input  type="file" name="file" onChange= {this.handleChange} />
        <button type="submit">Upload</button>
      </form>
      
      </div>
    )
  }
}

export default Uploader
