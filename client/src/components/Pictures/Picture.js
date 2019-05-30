import React, {Fragment} from 'react';
import './Pictures.css';
import {Link, withRouter} from 'react-router-dom'
import moment from 'moment';


const Picture = (props) => {
  
let noDuplicatesTags = [...new Set(props.tags)]
  return (
    <Fragment>
    <div className="image-container clearfix row border-bottom">
      <div className="col s6">
          <img className="image" src={props.url} alt={props.name} /> 
            <Link to={`/image/edit/${props.id}`}> View and Edit </Link>
      </div>
      <div className="col s6">
        <p> <strong>Name:</strong> {props.name} </p>
        <p> <strong>tags:</strong> {noDuplicatesTags.join(', ')}</p>
        <p> <strong>Album:</strong> {props.album} </p>
        <p> <strong>Uploaded:</strong> { moment(props.date).format('LLLL')} </p>
      </div>
    </div>
    </Fragment>
  )
}

export default withRouter(Picture)

/*
0:
createdAt: "2019-05-22T13:16:57.000Z"
name: "Stones-large.JPG"
tags: Array(5)
0: {_id: "5ce54bc8ea31e5f597b98578", name: "Flagstone", __v: 0}
1: {_id: "5ce54bc8ea31e5f597b98579", name: "Wood", __v: 0}
2: {_id: "5ce54bc8ea31e5f597b9857a", name: "Brick", __v: 0}
3: {_id: "5ce54bc8ea31e5f597b9857b", name: "Slate", __v: 0}
4: {_id: "5ce54bc8ea31e5f597b9857c", name: "Concrete", __v: 0}
length: 5
__proto__: Array(0)
url: "https://ccc-project-3-sandbox.s3.amazonaws.com/Stones-large.JPG"
__v: 0
_id: "5ce54bc9ea31e5f597b9857d"
__proto__: Object
*/
