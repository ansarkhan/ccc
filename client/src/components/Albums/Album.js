import React, {Fragment} from 'react';
import './Albums.css';
import {Link, withRouter} from 'react-router-dom'

const Album = (props) => {
  console.log(props.imageUrls)
  return (
    <Fragment>
    <div className="image-container clearfix row border-bottom">
      <div className="col s12 album-link">
        <Link to={`/images/album/${props.id}`}>
        <img src={props.imageUrls[0]} alt=""/>
        View {props.name}
        </Link>
        <Link to={`/albums/edit/${props.id}`}>
        <p> Edit</p>
        </Link>
      </div>
    </div>
    </Fragment>
  )
}

export default withRouter(Album)

