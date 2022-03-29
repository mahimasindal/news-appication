import React from 'react'
import './style.css';
import loading from './loading-gif-icon-14.jpg';



export default function Spinner() {
  
    return (
      <div>
           <div className="text-center">
            <img src={loading} alt="Loading"></img>
          </div>
      </div>
    )
  }

