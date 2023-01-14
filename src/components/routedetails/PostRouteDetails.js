import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PostRouteDetails = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [postRouteDetails, setPostRouteDetails] = useState({
        // scheduleTime: ''
    })
    const [addTrain, setAddTrain] = useState([])

    const [station, setStation] = useState([])

    //Train dropdown
    useEffect(() => {
        axios.get("http://localhost:8080/admin/traindetails/get")
            .then(response => {
                console.log(response.data)
                setAddTrain(response.data)
            })
    }, [])

    //station dropdown
    useEffect(() => {
        axios.get(`http://localhost:8080/admin/station/get`)
            .then(
                response => {
                    console.log(response.data)
                    setStation(response.data)
             
                }
            )
    }, [])

    //for update
    useEffect(()=>{
        if(location.state?.routedetail){
            setPostRouteDetails(location.state.routedetail)
        }

    },[])


    const changeHandler = (e) => {
        setPostRouteDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (!postRouteDetails.trainDetails) return

        if (postRouteDetails.trainDetails) {
            const train = { id: postRouteDetails.trainDetails }
            postRouteDetails.train = train
        }


        if (!postRouteDetails.stationDetails) return

        if (postRouteDetails.stationDetails) {
            const station = { 
                id:postRouteDetails.stationDetails }
            postRouteDetails.station = station
        }

        axios.post("http://localhost:8080/admin/route-details/post", postRouteDetails)
            .then(
                () => {
                    navigate('/timeschedule')
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
    }

    
    return (
        <div className='stylefrom'>
            <div className='forms' >
                <form onSubmit={submitHandler}>
                    <h3>Add Route Details</h3>
                    <div >
                        <label htmlFor='text'>TrainName</label><br></br>
                        <select name='trainDetails' id='id' onChange={changeHandler}>
                            <option selected value={''} >select Train Name</option>
                            {_.map(addTrain, train => <option key={train.id} value={train.id}>{train.trainName}</option>)}
                        </select>
                    </div><br />
                    <div >
                        <label htmlFor='text'>Station Id</label><br></br>
                        <select name='stationDetails' id='id' onChange={changeHandler}>
                      
                            <option selected value={''}>select Station Name</option>
                            {_.map(station, stations => <option key={stations.id} value={stations.id} >{stations.stationName}<br /></option>)}
                        </select>
                    </div><br />
                    <div >
                        <label htmlFor='text'>Arraival Time</label><br></br>
                        <input type={"text"} placeholder="HH:mm:ss" name='scheduleTime' value={postRouteDetails.scheduleTime} onChange={changeHandler} required ></input><br></br><br></br>
                    </div>
                    <div>
                        <button type='submit'>-Add-</button><br></br><br />
                    </div>
                    <div>
                        <Link to={"/timeschedule"}> Back</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default PostRouteDetails
