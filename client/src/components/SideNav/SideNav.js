import React, { Component } from 'react';
import "./SideNav.css";
import {NavLink, withRouter} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
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
            {/* <NavLink className="casslink" exact activeClassName="activelink" to="/search">Search</NavLink> */}
            
            <SearchBar />

            <p className="side-footer indigo white-text">Copyright 2019 &copy; - Cassowary Coding</p>
            
            
</div>
        
    )
  }
}

export default withRouter(SideNav)
