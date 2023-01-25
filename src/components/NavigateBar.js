import React, { Component } from 'react';

import '../css/Home.css'
import { FaRoad, FaSearchPlus, FaTasks, FaTrain } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";

export class NavigateBar extends Component {
  render() {
    return (

        <div  className='background'>
          <header>
          <h1 className='home-h1'>Train Route Management</h1><br/>
         
          </header>
          <nav  >    
      <div>
         <a href="/routes"><button className='button-home'><FaRoad/>  Route Details</button></a></div>
         <div> <a href="/trains"><button className='button-home'><FaTrain/>  Train Details</button></a></div>
        
         <a href="/station"><button className='button-home'><FaTasks/> Station Management</button></a>
          <a href="/timeschedule"><button className='button-home'><AiOutlineSchedule />  Train Schedule</button></a>
          <a href="/usersearch"><button className='button-home'><FaSearchPlus/>Search Train</button></a>
          </nav>
          <body>
   <div>

   </div>
          </body>
          <footer>
          since 2022
          </footer>
       
        </div>

   
    )
  }
}

export default NavigateBar
