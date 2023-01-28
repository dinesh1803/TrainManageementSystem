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
import {  TbArrowBigRightLines } from "react-icons/tb";
import { FaTrain } from 'react-icons/fa';
import { BsArrowLeftRight } from 'react-icons/bs';

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
         
<div className='header'>
   <div style={{marginLeft:"9rem"}} > <FaTrain style={{fontSize:"3rem"}}/> &#160; &nbsp;&#160; &nbsp;（{routeDetails[0]?.train?.trainNumber}） ༺ 
   {routeDetails[0]?.train?.trainName} ༻</div>
   <div style={{marginRight:"2rem"}}>{routeDetails[0]?.station?.stationName} &#160; &nbsp; <BsArrowLeftRight/>  &#160; &nbsp; {routeDetails[routeDetails.length-1]?.station?.stationName}</div>
   </div>
            {_.map(routeDetails,r=>{
                return <Timeline position="alternate">
                <TimelineItem style={{marginRight:"7rem"}}>
                    <TimelineOppositeContent color="text.secondary">
                        <div>
                        {r.station?.stationCode}</div>
                     <div>{r?.scheduleTime}</div>
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
