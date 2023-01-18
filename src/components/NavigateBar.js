import React, { Component } from 'react';
import { Link,  } from 'react-router-dom';
import './Home.css'


export class NavigateBar extends Component {
  render() {
    return (
    <>
      <div>
        <div  className='background'>
       
        <ul>  
          <header>
          <h3>Train Route Management</h3><br/>
          </header>
          <nav  className='align'>    

          <li><a href="/routes"><b>Route Details</b></a></li><br/><br/>
          <li><a href="/trains"><b>Train Details</b></a></li><br/><br/>
        
          <li><a href="/station"><b>Station Management</b></a></li><br/><br/>
          <li><a href="/timeschedule"><b>Train Schedule</b></a></li><br/><br/>
          </nav>
        
        </ul>
       
        </div>
      </div>
      </>  
    )
  }
}

export default NavigateBar
