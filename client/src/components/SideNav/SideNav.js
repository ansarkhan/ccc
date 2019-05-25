import React, { Component, Fragment } from 'react';
import "./Sidenav.css";
import {NavLink} from 'react-router-dom';

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
            <NavLink className="casslink" exact activeClassName="activelink" to="/">Albums</NavLink>
            <NavLink className="casslink" exact activeClassName="activelink" to="/pictures">All Pictures</NavLink>
            <NavLink className="casslink " exact activeClassName="activelink" to="/upload">Upload Pictures</NavLink>
            
            
           </div>
        
    )
  }
}

export default Sidenav
