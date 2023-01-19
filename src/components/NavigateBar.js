import React, { Component } from 'react';

import './Home.css'
import { FaRoad, FaTasks, FaTrain } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";

export class NavigateBar extends Component {
  render() {
    return (

        <div  className='background'>
          <header>
          <h3>Train Route Management</h3><br/>
         
          </header>
          <nav  >    
      <div>
         <a href="/routes"><button className='button-update'><FaRoad/>           Route Details</button></a></div>
         <div> <a href="/trains"><button className='button-update'><FaTrain/>  Train Details</button></a></div>
        
         <a href="/station"><button className='button-update'><FaTasks/>      Station Management</button></a>
          <a href="/timeschedule"><button className='button-update'><AiOutlineSchedule />  Train Schedule</button></a>
          </nav>
          <body>
          {/* ind 1x1 -mindepth 2 -type f -exec mv -iy '{}' svgs/ ';' rm -rf react mkdir 
          react npx @svgr/cli --template template.js -d react svgs/ printf "import React 
          from 'react';"  react/0000import.js cat react/*  paths.ts rm react/0000import.js
           printf "import React from 'react';\nimport * as paths from './paths';\n\nexport
            class SvgWrapper : (any) React.FC = (Element) (props : React.SVGProps) 
           ;\n\n"  tmp000.js ls react/ | xargs -n 1 basename |s
           tmp001.js cat tmp*.js  index.ts rm tmp001.js rm tmp000.js */}
          </body>
          <footer>
              dffhdfhdfh
          </footer>
       
        </div>

   
    )
  }
}

export default NavigateBar
