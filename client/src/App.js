import React, {Component} from 'react';
import './App.css';
import Uploader from './components/Uploader';

export default class App extends Component {
  
  state = {
    uploading: false,
    images: []
  }

  render() {

    return (
      <div className="App">
        <Uploader />
      </div>
    );
  }
}