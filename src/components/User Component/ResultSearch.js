import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const ResultSearch =()=>{
    const [routeDetails, setRouteDetails] = useState([])
  
    const[routeState,setRouteState]=useState({})
    const location = useLocation()

    useEffect(() => {
    const value = location.state.train?.id
    setRouteState( location.state?.train)
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
                        <th>Time</th>
                        <th>Halt</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        routeDetails.map((routedetail, index) =>
                            <tr key={routedetail.id}>
                                <td>{index + 1}</td>
                                <td>{routedetail?.train.trainName}</td>
                                <td>{routedetail.station?.stationName}</td>
                                <td>{routedetail?.scheduleTime}</td>
                                <td>{routedetail?.haltTime}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table><br />
            <Link to='/searchTrain' state={{resultSearch:routeState}} >
                <button >back</button><br /><br />
            </Link>
        </div>
    ) 
}

export default ResultSearch
