import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const GetTrain = () => {

  const [trains, setTrains] = useState([])

  useEffect(() => {
    getRoutes();
  }, [])

  const getRoutes = () => {
    axios.get("http://localhost:8080/admin/traindetails/get")
      .then(response => {
        console.log(response.data)
        setTrains(_.orderBy(response.data,"id"))
      })
      .catch(error => {
        console.log(error)
      })
  }


  const deleteRouteHandler = (id) => {
    axios.delete(`http://localhost:8080/admin/traindetails/delete/${id}`)
      .then(response => {
        console.log(response)
        setTrains(response.data)

      }).catch(error => {
        console.log(error)
      })


  }




  return (

    <div><br/>
        <Link to='/nav'>
        <button className='button-update ' >  ‹‹‹ BACK TO HOME</button>
      </Link>
     <nav>
        <u id="nav">
      <NavLink to="/addtrains"><button className='button-update'>Add More Trains</button></NavLink>

        </u>
        </nav>
      

      <table id="customers">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Train Id</th>
            <th>Train Number</th>
            <th>Train Name</th>
            <th>routeId</th>
            <th>Delete</th>
            <th>Update</th>
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
                <td> {train.route?.routeId} </td>

                <td><button class="button-del" onClick={() => deleteRouteHandler(train.id)}>Delete</button></td>
                <td> <Link to={'/addtrains'} state={{ train: train }} ><button className='button-update '>Update</button></Link> </td>
              </tr>
            )
          }

        </tbody>

      </table><br />
  
    </div>
  )
}


export default GetTrain
