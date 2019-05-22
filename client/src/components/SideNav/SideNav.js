import React, { Component } from 'react';
import "./Sidenav.css";

export class Sidenav extends Component {
  render() {
    return (
        <div className="sidenav">
<ul>
  <li><a href="#albums">Albums</a></li>
  <li><a href="#allpics">All Pictures</a></li>
  <li><a href="#upload">Upload Pictures</a></li>
  
</ul>
</div>
        
    )
  }
}

export default Sidenav
