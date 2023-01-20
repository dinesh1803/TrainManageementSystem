import axios from 'axios'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SearchBox = () => {
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

   const submitHandler = ()=>{

   }

    return (
        <div>
            <form onSubmit={submitHandler}>

                <div>
                    <label>Source</label>
                    <select name='source' id='id' onInput={changeHandler}>
                        <option selected value={''}>select Station Name</option>
                        {_.map(route, stations => <option name='source' value={stations.source} >{stations.source}</option>)}
                    </select>
                </div>
                <label>Destination</label>
                <select name='destination' id='id' onChange={changeHandler}>
                    <option selected value={''}>select Station Name</option>
                    {_.map(route, stations => <option  value={stations.destination} >{stations.destination}</option>)}
                </select>

                <Link to={'/searchTrain'} state={{ route: trainSchedule }}><button type='submit' >Search</button></Link>

            </form>
        </div>
    )
}

export default SearchBox
