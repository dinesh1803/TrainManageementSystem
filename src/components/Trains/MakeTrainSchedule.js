
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImExit } from 'react-icons/im';

const MakeTrainSchedule = () => {

    const [routeDetails, setRouteDetails] = useState([])

    const navigate=useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(location.state?.train){
        const value = location.state?.train
        getRouteDetails(value);
        }else if(location.state?.trainName){
            const value = location.state?.trainName
            getRouteDetails(value);
        }
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

    const deleteRouteHandler = (id) => {
        axios.delete(`http://localhost:8080/admin/route-details/delete/${id}`)
            .then(response => {
                console.log(response)
                
           navigate('/makeschedule')
            }).catch(error => {
                console.log(error)
            })
    }




    return (
        <div>
            <div>
                <h1 className='h1'>Train Schedule</h1><br></br>
                <Link to='/trains'  >
                    <button className='button-del '><ImExit /> Back</button>
                </Link>
                <u className='add'>
                    <Link to="/addroutedetails" state={{ addMoreStations: routeDetails[routeDetails.length - 1] }}><button className='button-update '> Add More Station</button></Link>

                </u></div>



            <table id="customers">
                <thead>
                    <tr>
                        <th>S.No</th>

                        <th>Train Name</th>
                        <th>Station Name</th>

                        <th>Time</th>
                        <th>Halt</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        routeDetails.map((routedetail, index) =>
                            <tr key={routedetail.id}>

                                <td>{index + 1}</td>

                                <td>{routedetail?.train?.trainName}</td>

                                <td>{routedetail.station?.stationName}</td>

                                <td>{routedetail?.scheduleTime}</td>
                                <td >{routedetail?.haltTime}</td>
                                <td>
                                    <button className="button-del" onClick={() => deleteRouteHandler(routedetail.id)}>Delete</button>
                             <Link  to={'/addroutedetails'} state={{routedetail:routedetail}}><button className='button-update ' >Update</button></Link>  
                                </td>

                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}
export default MakeTrainSchedule
