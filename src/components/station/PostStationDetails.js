import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PostStationDetails = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [stations, setStations] = useState({
        stationName: ''
    })

    useEffect(() => {
        if (location.state?.station) {
            setStations(location.state.station)
        }
    },[])

    const changeHandler = (e) => {
        setStations(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const clickHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/admin/station/post", stations)
            .then(
                response => {
                    navigate('/station')
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
                <form>
                    <h3>Add Stations</h3><br/><br/>
                    <div className='' >
                        <label htmlFor='text'>Enter Station Name</label><br/><br/>
                        <input  type={'text'} placeholder="station name.." name='stationName' value={stations.stationName} onChange={changeHandler} required ></input><br></br><br></br>
                    </div>
                    <div>
                        <button className='button-update ' onClick={clickHandler}>-Add-</button><br/><br/>
                    </div>
                    <div>
                        <Link to={"/station"}><button className='button-update ' > Back</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default PostStationDetails
