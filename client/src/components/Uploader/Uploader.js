import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import './Uploader.css';

export class Uploader extends Component {

    state = {
        file: '',
        selected: null,
        open: false
    };

    handleChange = (e) => {
        let file = e.target.files[0];
        console.log(file)
        this.setState({
            file: file,
            selected: true
        });

    };

    handleSubmit = async (e) => {
      e.preventDefault();

      if(this.state.file === '') {
       this.setState({selected: false})

      } else {
        this.setState({open: true});
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        setTimeout(() => {
          window.location.reload()
        }, 10000);
        await axios.post('/api/images', formData, config);
        
      };      
    };
    renderFiles = () => {
      if(this.state.selected === false) {
        return <div> No Image Selected </div>
      } else {
        return <div>{this.state.file.name}</div>
      }
    };

    closeSnackbar = () => {
      this.setState({open: false})
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

      <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}   
            open={this.state.open}   
            autoHideDuration={10000}
            message={ 
                <span id='message-id'>
                   {this.state.file.name} is Uploading
                </span> }  
            ContentProps={{"aria-describedby": 'message-id'}}
            onClose={this.closeSnackbar}
            action={[
                <IconButton onClick={this.closeSnackbar} color='inherit' key='close' aria-label='close'>
                    <CloseIcon />
                </IconButton>
            ]}
             />
      
      </div>
    )
  }
}

export default Uploader;
