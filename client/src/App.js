import React, {Component} from 'react';
import './App.css';
import Images from './components/Images'
import UploadButton from './components/UploadButton';



export default class App extends Component {

  state = {
    uploading: false,
    images: []
  }

  onChange = e => {
    // e.preventDefault();
    const files = Array.from(e.target.files)
    // this.setState({ uploading: true , images: files})

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    fetch('/api/image-upload', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      this.setState({ 
        uploading: false,
        images
      })
    })
  }


  render() {
    const { uploading, images } = this.state
    console.log('this.state.images',this.state.images);
    const content = () => {
      switch(true) {
        case images.length > 0:
        console.log('case: images',images);
        return <div><UploadButton onChange={this.onChange} /> <img src= {this.state.images[0].name} alt=""/></div>
          // return <div><UploadButton onChange={this.onChange} /> <Images images={images} removeImage={this.removeImage}/></div>
        default:
        console.log('case: default');
          return <UploadButton onChange={this.onChange} />
      }
    }

    return (
      <div className="App">
        <h1>CCC</h1>

        {content()}
      </div>
    );
  }
}
