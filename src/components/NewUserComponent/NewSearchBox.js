

import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { FaLocationArrow, FaMapMarkerAlt} from "react-icons/fa";
import axios from 'axios';

const NewSearchBox = () => {
     const navigate = useNavigate()

    const [trainSchedule, setTrainSchedule] = useState({
        source:"",
        destination:""

    })

    const [station, setStation] = useState([])
   

    useEffect(() => {
        axios.get('http://localhost:8080/admin/station/get').then(res => {
            setStation(res.data)
        })
    }, [])

    const changeHandler = (e) => {

        let train=_.filter(station,s=>s.stationName===e.target.value)
        setTrainSchedule(prev => ({ ...prev, [e.target.name]: train[0] }))

        // console.log(e.target.value)
        // setTrainSchedule(prev => ({ ...prev, [e.target.name]: e.target.value }))
    
    }

    const submitHandler = () => {

        navigate("/newsearchTrain", { state: { route: trainSchedule } })
    }

    return (
        <div className='search-background' >

    
            <form className='search-container' onSubmit={submitHandler}>
                <p className='search-type'>Search By Station</p>
                <div className='search-station'>
                    <label className='lab'> <FaLocationArrow/>  From..</label><br/>
                    {/* <select className='in' name='source' id='id' onInput={changeHandler} required>
                        <option selected value={''}>Select Station</option>
                        {_.map(station, stations => <option name='source' value={stations.id} >{stations.stationName}</option>)}
                    </select> */}

<input list='data' className='in' name='source' id='id' placeholder='search from station' onChange={changeHandler}  autocomplete="off"></input>
                    <datalist id='data' >
                    <option selected value={''}>select Station Name</option>
                      {_.map(station, stations => <option  key={stations.id} value={stations.stationName} >{stations.stationName}</option>)}
                    </datalist>

                </div > <br/>
                
                <div className='search-station'> 
                <label className='lab'><FaMapMarkerAlt/> To..</label><br />
                {/* <select className='in' name='destination' id='id' onChange={changeHandler} required>
                    <option selected value={''}>Select Station</option>
                    {_.map(station, stations => <option value={stations.id} >{stations.stationName}</option>)}
                </select> */}
<input list='data' className='in' name='destination' id='id' placeholder='search from station' onChange={changeHandler}  autocomplete="off"></input>
                    <datalist id='data' >
                    <option selected value={''}>select Station Name</option>
                      {_.map(station, stations => <option name='destination' value={stations.id} >{stations.stationName}</option>)}
                    </datalist>



                </div><br/>
                <div >
               <button className='find-train-btn' type='submit' >Search</button>
                </div>
            </form>
        </div>
    )
}

export default NewSearchBox
