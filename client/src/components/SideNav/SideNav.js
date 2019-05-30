import React, { Component } from 'react';
import "./SideNav.css";
import {NavLink} from 'react-router-dom';
import logo from  '../assets/logo.gif'

export class SideNav extends Component {
  render() {
    return (    
<div className="cassowarynav">
            <img src={logo} alt="" className="custom-logo"/>
            <NavLink className="casslink " exact activeClassName="activelink" to="/">Upload Pictures</NavLink>
            {/* <NavLink className="casslink" exact activeClassName="activelink" to="/">Albums</NavLink> */}
            <NavLink className="casslink" exact activeClassName="activelink" to="/pictures">All Pictures</NavLink>
            <NavLink className="casslink" exact activeClassName="activelink" to="/albums">All Albums</NavLink>
            <p className="side-footer indigo white-text">Copyright 2019 &copy; - Cassowary Coding</p>
            
            
</div>
        
    )
  }
}

export default SideNav
