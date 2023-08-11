import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { ImExit } from 'react-icons/im';
import { Link, NavLink } from 'react-router-dom';
import axiosHeader from '../../utills/Interceptor';


const GetTrain = () => {

  const [trains, setTrains] = useState([])

  useEffect(() => {
    getRoutes();
  }, [])

  const getRoutes = () => {
    axiosHeader.get("/traindetails/get")
      .then(response => {
        console.log(response)
        setTrains(_.orderBy(response, "id"))
      })
      .catch(error => {
        console.log(error)
      })
  }


  const deleteRouteHandler = (id) => {
    axiosHeader.delete(`/traindetails/delete/${id}`)
      .then(response => {
        console.log(response)
        setTrains(response)

      }).catch(error => {
        console.log(error)
      })


  }




  return (

    <div>
      <h1 className='h1'> Train Route Details </h1><br />

      <Link to='/nav'>
        <button className='button-del '><ImExit /> Home</button>
      </Link>

      <u className='add'>
        <NavLink to="/addtrains"><button className='button-update'>Add More Trains</button></NavLink>
      </u>



      <table id="customers">
        <thead>
          <tr>
            <th>S.No</th>

            <th>Train Number</th>
            <th>Train Name</th>
            <th>Route Name</th>

            <th style={{width:'25rem'}}>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            trains.map((train, index) =>
              <tr key={train.id}>
                <td>{index + 1} </td>

                <td> {train.trainNumber} </td>
                <td> {train.trainName} </td>
                <td> {train.route?.routeName} </td>
                <td style={{width:'25rem',display:'flex', justifyContent:'space-around'}}><Link to={'/makeschedule'} state={{ train: train }} ><button >Make Schedule</button></Link>
                  <button class="button-del" onClick={() => deleteRouteHandler(train.id)}>Delete</button>
                  <Link to={'/addtrains'} state={{ train: train }} ><button className='button-update '>Update</button></Link> </td>
              </tr>
            )
          }

        </tbody>

      </table><br />

    </div>
  )
}


export default GetTrain
