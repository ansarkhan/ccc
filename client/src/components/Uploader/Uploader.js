import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner'
import axios from 'axios';
import './Uploader.css';

export class Uploader extends Component {

    state = {
        file: '',
        selected: null,
        open: true
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
        this.setState({open: false});
        toast.success(`Uploading ${this.state.file.name} `, {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true
          });
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

  render() {
    return (
      <div className="Uploader">
            <h1>uploader</h1>
{ this.state.open ?
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
      </form> :
      <div>
        <p>Uploading Now! Please Wait...</p>
      <Loader 
         type="Puff"
         color="#333"
         height="100"	
         width="100"
      />   
      </div> 
}
      {this.renderFiles()}

             <ToastContainer
              position="bottom-center"
              autoClose={10000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnVisibilityChange={false}
              draggable
              pauseOnHover={false}
              />
      
      </div>
    )
  }
}

export default Uploader;
