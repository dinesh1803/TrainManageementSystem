import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';

const Search =()=>{
    const [routeDetails, setRouteDetails] = useState([])
  

    const location = useLocation()

    useEffect(() => {
    const value = location.state.train
        getRouteDetails(value);
    }, [])

    const getRouteDetails = (value) => {
        axios.get(`http://localhost:8080/admin/route-details/gettrain?trainName=${value}`)
            .then(
                response => {
                    console.log(response.data)
               
                    setRouteDetails(response.data)
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
    }

       


    return (
        <div>


       
            <table  id="customers">
                <thead>
                    <tr>
                        <th>S.No</th>
                   
                        <th>Train Name</th>
                        <th>Station Name</th>
                        <th>Train Id</th>
                        <th>Time</th>
                       
                    </tr>
                </thead>

                <tbody>
                    {
                        routeDetails.map((routedetail, index) =>
                            <tr key={routedetail.id}>

                                <td>{index + 1}</td>
                               
                                <td>{routedetail?.train.trainName}</td>

                                <td>{routedetail.station?.stationName}</td>
                                <td>{routedetail.train?.id}</td>
                                <td>{routedetail?.scheduleTime}</td>

                                

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

export default Search
