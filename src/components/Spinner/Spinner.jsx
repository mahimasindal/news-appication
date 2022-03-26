import React, { Component } from 'react'
import './style.css';
import loading from './loading-gif-icon-14.jpg';

export default class Spinner extends Component {
  render() {
    return (
      <div>
           <div className="text-center">
            <img src={loading} alt="Loading"></img>
          </div>
      </div>
    )
  }
}
