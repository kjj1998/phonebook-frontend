import React from 'react'

const Filter = ({type, value, eventHandler}) => {
    return (
      <div>
        filter shown with <input type={type} value={value} onChange={eventHandler} />
      </div>
    )
}

export default Filter