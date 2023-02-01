import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ClockPicker, LocalizationProvider, TimePicker } from '@mui/lab';

const PostRouteDetails = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [postRouteDetails, setPostRouteDetails] = useState({
        
    })
    const [addTrain, setAddTrain] = useState([])

    const [station, setStation] = useState([])

    const[stateId,setStateId]=useState({

    })
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
            setPostRouteDetails(location.state?.routedetail)
            setStateId(location.state?.routedetail?.train?.id)
        }
         else if(location.state?.train){
                    console.log(location.state?.train)
                    setStateId(location.state?.train)
                 
                }
    },[])
    

    


    const changeHandler = (e) => {
        if(e.target.name==="station"){
            let train=_.filter(station,s=>s.stationName===e.target.value)
            setPostRouteDetails(prev => ({ ...prev, [e.target.name]: train[0] }))
        }else{
        setPostRouteDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
//console.log(postRouteDetails, "postRouteDetails");
        if (!postRouteDetails.train) return
        if(typeof(postRouteDetails.train)==='string'){
            const train = { id: postRouteDetails.train }
            postRouteDetails.train = train
        }

        if (!postRouteDetails.station) return

        if (typeof(postRouteDetails.station) === 'string') {
            const station = { 
                id:postRouteDetails.station }
            postRouteDetails.station = station
        }
        console.log(postRouteDetails, "here");
        axios.post("http://localhost:8080/admin/route-details/post", postRouteDetails)
            .then(
                (res) => {
                    navigate('/makeSchedule',  { state: { trainName:postRouteDetails.train.id } } )
                    console.log(res.data);
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
                <form onSubmit={(e) => submitHandler(e)}>
                    <h3>Add Train Schedule</h3>
                    <div>
                        <label htmlFor='text'>TrainName</label><br></br>
                        <select name='train' id='id' onChange={changeHandler} value={postRouteDetails.train?.id} >
                        <option  className='dropdown-cont' selected value={''} >select Train Name</option>
                            {_.map(addTrain, train => <option  key ={train.id} value={train.id}>{train.trainName}</option>)}
                        </select>
        

                    </div><br />
                    <div >
                        <label htmlFor='text'>Station Name</label><br></br>
                
                             <input list='data' name='station' placeholder='search from station' onChange={changeHandler}  autocomplete="off"></input>
                    <datalist id='data' >
                    <option selected value={''}>select Station Name</option>
                      {_.map(station, stations => <option key={stations.id} value={stations.stationName} >{stations.stationName}</option>)}
                    </datalist>
                    </div><br />
                    <div >
                        <label htmlFor='text'>Arraival Time</label><br></br>
                        <input type={"time"} placeholder="HH:mm" name='scheduleTime' onChange={changeHandler} required ></input><br/><br/>
                    </div>
                    <div >
                        <label htmlFor='text'>Halt Time</label><br></br>
                        <input type={"text"} placeholder="halt time" name='haltTime' value={postRouteDetails.haltTime} onChange={changeHandler} required ></input><br/><br/>
                    </div>
                    <div >
                        <label htmlFor='text'>platformNumber</label><br></br>
                        <input type={"text"} placeholder="PF.." name='platformNumber' value={postRouteDetails.platformNumber} onChange={changeHandler} required ></input><br/><br/>
                    </div>
                    <div >
                        <label htmlFor='text'>Kilometers</label><br></br>
                        <input type={"number"} placeholder="KMS..." name='kilometers' value={postRouteDetails.kilometers} onChange={changeHandler} required ></input><br/><br/>
                    </div>
                    <div>
                        <button className='button-update ' type='submit'>{postRouteDetails.id ? "Update" : "Save"}</button><br></br><br />
                    </div>
                    <div>
                        <Link to={"/makeschedule"} state={{ trainName:stateId }}> <button className='button-update '>Back</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default PostRouteDetails
