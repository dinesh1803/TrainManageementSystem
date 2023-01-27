import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { MdTrain } from "react-icons/md";
import "../User Component/Enduser.css";

const ResultSearch = () => {
    const [routeDetails, setRouteDetails] = useState([])

    const [routeState, setRouteState] = useState({})
    const location = useLocation()

    useEffect(() => {
        const value = location.state.train?.id
        setRouteState(location.state?.train)
        getRouteDetails(value);
    }, [])

    const getRouteDetails = (value) => {
        axios.get(`http://localhost:8080/admin/route-details/gettrain?trainName=${value}`)
            .then(
                response => {
                    console.log(response.data)
                    setRouteDetails( _.orderBy(response.data, "kilometers"))
                   
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
    }

    return (
        <div>
            {/* { routeDetails.map((routedetail, index) =>
           <div id='lts-error-block'>
            <div className='white-timeline-bg '>
                    
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-xs-12'>
                            <div className='timeline-listing'>
                                <div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </div>
           )
} */}
            {_.map(routeDetails,r=>{
                return <Timeline position="alternate">
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        <div>
                        {r.station?.stationCode}</div>
                     <div>   {r?.scheduleTime}</div>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <MdTrain color='blue' />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent color="text.secondary"  >
                        <div className='pad'><b>{r.station?.stationName}</b></div>
                        <div>{r.kilometers} KMS | {r.haltTime} Min | PF# {r.platformNumber}</div>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
            })}
            
            <Link to='/searchTrain' state={{ resultSearch: routeState }} >
                <button >back</button><br /><br />
            </Link>
        </div>
    )
}

export default ResultSearch
{/* <table  id="customers">
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
            </table><br /> */}