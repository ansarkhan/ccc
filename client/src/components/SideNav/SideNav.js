import React, { Component, Fragment } from 'react';
import "./SideNav.css";
import {NavLink} from 'react-router-dom';

export class SideNav extends Component {
  render() {
    return (    
<div className="cassowarynav">
            <NavLink className="casslink" exact activeClassName="activelink" to="/">Albums</NavLink>
            <NavLink className="casslink" exact activeClassName="activelink" to="/pictures">All Pictures</NavLink>
            <NavLink className="casslink " exact activeClassName="activelink" to="/upload">Upload Pictures</NavLink>
            <p className="side-footer">Copyright 2019 &copy; - Cassowary Coding</p>
            
            
</div>
        
    )
  }
}

export default SideNav
