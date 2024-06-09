import React from 'react'
import './loder.css'
const Loader = () => {
  return (
    <div>
        <div className="loader-container">
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
    </div>
  )
}

export default Loader
