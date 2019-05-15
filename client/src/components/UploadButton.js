import React from 'react'

export default props =>
    <div className='button'>
        <input type='file' id='multi' onChange={props.onChange} />
    </div>
