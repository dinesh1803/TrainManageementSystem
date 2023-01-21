
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const SearchTrain = () => {

  const [trains, setTrains] = useState([])

 const [props,setProps]= useState({

  })

   const location= useLocation()

  // useEffect(()=>{
  // setProps(lo)
  // },[])



  useEffect(() => {
    console.log(location.state.route)
    const source=location.state.route.source
    const destination=location.state.route.destination
    getRoutes(source,destination);
  }, [])

  const getRoutes = (source,destination) => {
    console.log(source)
    console.log("dest")
    axios.get(`http://localhost:8080/admin/traindetails/getBySourceAndDest?source=${source}&destination=${destination}`)
      .then(response => {
        console.log(response.data)

        setTrains(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (

    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Route Name</th>
            <th>Train Number</th>
            <th>Train Name</th>
            <th>FROM Station</th>
            <th>Destination</th>
            <th>View Schedule</th>
          </tr>
        </thead>

        <tbody>
          {
            trains.map((train, index) =>
              <tr key={train.id}>
                <td>{index + 1} </td>

                <td>{train.route.routeName}</td>
                <td> {train.trainNumber} </td>
                <td> {train.trainName} </td>
                <td> {train.route?.source} </td>
                <td>{train.route?.destination}</td>
                <td><Link to={'/search'} state={{ train: train.trainName }}><button>Train Schedule</button></Link></td>
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
