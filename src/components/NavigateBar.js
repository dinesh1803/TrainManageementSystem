import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigatebar.css'


export class NavigateBar extends Component {
  render() {
    return (
      <div className='Container'>
        <nav>    
        <u id="nav">  
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/about">about us</NavLink></li>
        </u>
        </nav>
      </div>
    )
  }
}

export default NavigateBar
