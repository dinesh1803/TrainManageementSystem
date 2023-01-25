import axios from 'axios'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLocationArrow, FaMapMarkerAlt} from "react-icons/fa";

const SearchBox = () => {
   const navigate = useNavigate()

    const [trainSchedule, setTrainSchedule] = useState({
        source: "",
        destination: ""
    })

    const [route, setroute] = useState([])
   

    useEffect(() => {
        axios.get('http://localhost:8080/admin/route/get').then(res => {
            setroute(res.data)
        })
    }, [])

    const changeHandler = (e) => {

        console.log(e.target.value)
        setTrainSchedule(prev => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(trainSchedule.source)
    }

    const submitHandler = () => {

        navigate("/searchTrain", { state: { route: trainSchedule } })
    }

    return (
        <div className='search-background' >

    
            <form className='search-container' onSubmit={submitHandler}>
                <p className='search-type'>Search By Station</p>
                <div className='search-station'>
                    <label className='lab'> <FaLocationArrow/>  From..</label><br/>
                    <select className='in' name='source' id='id' onInput={changeHandler} required>
                        <option selected value={''}>Select Station</option>
                        {_.map(route, stations => <option name='source' value={stations.source} >{stations.source}</option>)}
                    </select>
                </div > <br/>
                <div className='search-station'> 
                <label className='lab'><FaMapMarkerAlt/> To..</label><br />
                <select className='in' name='destination' id='id' onChange={changeHandler} required>
                    <option selected value={''}>Select Station</option>
                    {_.map(route, stations => <option value={stations.destination} >{stations.destination}</option>)}
                </select>
                </div><br/>
                <div >
               <button className='find-train-btn' type='submit' >Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBox
