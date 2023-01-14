import React, { Component } from 'react';
import { Link,  } from 'react-router-dom';
import './Home.css'


export class NavigateBar extends Component {
  render() {
    return (
      
      <div className='background'>
        <nav  className='align'>    
        <ul>  
          <h3>Train Route Management</h3><br/>
        

          <li><a href="/routes"><b>Route Details</b></a></li><br/><br/>
          <li><a href="/trains"><b>Train Details</b></a></li><br/><br/>
        
          <li><a href="/station"><b>Station Management</b></a></li><br/><br/>
          <li><a href="/timeschedule"><b>Train Schedule</b></a></li><br/><br/>
     
        
        </ul>
        </nav>
      </div>
    )
  }
}

export default NavigateBar
