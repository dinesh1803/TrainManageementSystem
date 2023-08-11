
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImExit } from 'react-icons/im';
import axiosHeader from '../../utills/Interceptor';

const MakeTrainSchedule = () => {

    const [routeDetails, setRouteDetails] = useState([])
    const[train ,setTrain]=useState({

    })
    const[trainName,setTrainName]=useState({})

    const navigate=useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(location.state?.train){
            setTrain(location.state?.train)
        const value = location.state?.train.id
        setTrainName(value);
        getRouteDetails(value);
        }else if(location.state?.trainName){
            const value = location.state?.trainName
            setTrainName(value);
            getRouteDetails(value);
        }   
    }, [])

    const getRouteDetails = (value) => {
        axiosHeader.get(`/route-details/gettrain?trainName=${value}`)
            .then(
                response => {


                    setRouteDetails( _.orderBy(response, "kilometers"))
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
    }

    const deleteRouteHandler = (id) => {
        axiosHeader.delete(`/route-details/delete/${id}`)
            .then(res=>{
                getRouteDetails(trainName)
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
                    <Link to="/addroutedetails" state={{train:trainName}} ><button className='button-update '> Add More Station</button></Link>
                    {/* <Link to="/addroutedetails" state={{train:routeDetails[routeDetails.length-1]}}><button className='button-update '> Add More Station</button></Link>  */}
                </u></div>



            <table id="customers">
                <thead>
                    <tr>
                        <th>S.No</th>

                        <th>Train Name</th>
                        <th>Station Name</th>

                        <th>Time</th>
                        <th>Halt</th>
                        <th>PF.NO</th>
                        <th>KMS</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        routeDetails.map((routedetail, index) =>
                            <tr key={routedetail.trainScheduleId}>

                                <td>{index + 1}</td>

                                <td>{routedetail?.train?.trainName}</td>

                                <td>{routedetail.station?.stationName}</td>

                                <td>{routedetail?.scheduleTime}</td>
                                <td >{routedetail?.haltTime}</td>
                                <td>PF #{routedetail?.platformNumber}</td>
                                <td>{routedetail?.kilometers} KMS</td>
                             
                                <td>
                                    <button className="button-del" onClick={() => deleteRouteHandler(routedetail.trainScheduleId)}>Delete</button>
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
export default MakeTrainSchedule;
