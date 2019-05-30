import React, {Fragment} from 'react';
import './Albums.css';
import {Link, withRouter} from 'react-router-dom'

const Album = (props) => {
  
  return (
    <Fragment>
    <div className="image-container clearfix row border-bottom">
    <div className="col s6">
            <Link to={`/albums/edit/${props.id}`}> View </Link>
      </div>
      <div className="col s6">
            <Link to={`/albums/edit/${props.id}`}> Edit </Link>
      </div>
      <div className="col s6">
        <p> <strong>Album Name:</strong> {props.name} </p>
      </div>
    </div>
    </Fragment>
  )
}

export default withRouter(Album)

