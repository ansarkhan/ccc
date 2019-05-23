import React, { Component, Fragment } from 'react';
import "./SideNav.css";
import {Link} from 'react-router-dom';

export class Sidenav extends Component {
  render() {
    return (
//         <div className="custom_sidenav">
// <ul>
//   <li><a href="#albums">Albums</a></li>
//   <li><a href="#allpics">All Pictures</a></li>
//   <li><a href="#upload">Upload Pictures</a></li>
  
// </ul>
// </div>
<div className="cassowarynav">
            <Link className="casslink" to="/">Albums</Link>
            <Link className="casslink" to="/pictures">All Pictures</Link>
            <Link className="casslink" to="/upload">Upload Pictures</Link>
            
            
           </div>
        
    )
  }
}

export default Sidenav
