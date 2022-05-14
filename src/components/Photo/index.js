import React from 'react'
import './styles.css'

function Photo({ title, url }) {
    return (
      <div 
        className="Photo"
      >
          <h4>{title}</h4>
          <img loading='lazy' alt={title} src={url} />
      </div>
    )
}

export default React.memo(Photo)