
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

const SearchTrain = () => {

    const [trains, setTrains] = useState([])

    const[filterSource,setfilterSource]=useState([])

    const[searchsource , setSearchsource]=useState([])
    const[searchDestination , setsearchDestination]=useState([])
    


    useEffect(() => {
      getRoutes();
    }, [])
  
    const getRoutes = () => {
      axios.get("http://localhost:8080/admin/traindetails/get")
        .then(response => {
          console.log(response.data)
         
          setfilterSource(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }

  

  
    const searchHandlerSource=(e)=>{

        const filterResult=filterSource.filter((item=>item.route.source.toLowerCase().includes(e.target.value.toLowerCase())))

        setTrains(filterResult)

        setSearchsource(e.target.value)
    }
      
    const searchHandlerDestination=(e)=>{

        const filterResult=filterSource.filter((item=>item.route.destination.toLowerCase().includes(e.target.value.toLowerCase())))

        setTrains(filterResult)

        setsearchDestination(e.target.value)
    }
  
  
  
    return (
  
      <div>
        <nav>
          <u id="nav">
            <li><NavLink to="/addtrains">Add More Trains</NavLink></li>
  
          </u>
        </nav>
  
<div>
    <label>Source</label><br/>
    <input type={'search'} name='searchsource' value={searchsource} onInput={(e)=>searchHandlerSource(e)}></input><br/>
    
</div>
<div>
    <label>Destination</label><br/>
    <input type={'search'} name='searchDestination' value={searchDestination} onInput={(e)=>searchHandlerDestination(e)}></input><br/>
    
</div>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Train Id</th>
              <th>Train Number</th>
              <th>Train Name</th>
              <th>Source</th>
              <th>Destination</th>
           
            </tr>
          </thead>
  
          <tbody>
            {
              trains.map((train, index) =>
                <tr key={train.id}>
                  <td>{index + 1} </td>
                  <td> {train.id} </td>
                  <td> {train.trainNumber} </td>
                  <td> {train.trainName} </td>
                  <td> {train.route?.source} </td>
                  <td>{train.route?.destination}</td>
                 <td><Link to={'/search'} state={{train:train.trainName}}><button>Train Schedule</button></Link></td>
                </tr>
              )
            }
  
          </tbody>
        </table><br />
        <Link to='/nav'>
          <button >back to Home page</button><br /><br />
        </Link>
      </div>
    )
  }
  
export default SearchTrain
