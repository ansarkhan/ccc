import React, { Component, Fragment } from 'react';
import "./Sidenav.css";
import {NavLink} from 'react-router-dom';

export class Sidenav extends Component {
  render() {
    return (    
<div className="cassowarynav">
            <NavLink className="casslink" exact activeClassName="activelink" to="/">Albums</NavLink>
            <NavLink className="casslink" exact activeClassName="activelink" to="/pictures">All Pictures</NavLink>
            <NavLink className="casslink " exact activeClassName="activelink" to="/upload">Upload Pictures</NavLink>
            
            
           </div>
        
    )
  }
}

export default Sidenav
