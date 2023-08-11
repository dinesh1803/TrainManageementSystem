import axios from 'axios'

import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosHeader from '../../utills/Interceptor';


const PostRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const [routes, setRoutes] = useState({
     
    })

    const[station,setStation]=useState([])

    //update
    useEffect(() => {
        if (location.state?.route) {
            setRoutes(location.state.route)
        }
    }, [])

    //dropdown
    useEffect(()=>{
        axiosHeader.get(`/station/get`)
        .then(
            response => {
                setStation(_.orderBy(response,"id"))
              
    })
},[])

    const changeHandler = (e) => {
        setRoutes(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axiosHeader.post('/route/post', routes)

            .then(response => {
                navigate('/routes')
            }).catch(error => {
                console.log(error)
                toast.error("From and To station can not be same");
            })
    }



    return (
        <div className='stylefrom'>
            <div className='forms' >
                <form onSubmit={submitHandler}>
                    <h3>Add more Routes</h3>
                   
                    {/* <div>
                        < label htmlFor='text'> Route Name </label><br />
    
                        <input type="text" name="routeName" value={routes.routeName} onChange={changeHandler} required /><br /><br />
                    </div> */}
                    <div>
                        < label htmlFor='text'> From </label><br />
                      
                 
                    <input list='data' name='source' placeholder='search From station' onChange={changeHandler} value={routes.source} ></input>
                    <datalist id='data' >
                    <option selected value={''}>select Station Name</option>
                      {_.map(station, stations => <option key={stations.id} value={stations.stationName} >{stations.stationName}</option>)}
                    </datalist>

                    </div>

                    <div>
                        <label htmlFor='text'>To </label><br />
                        <input list='data' name='destination' placeholder='select To station' onChange={changeHandler} value={routes.destination} />
                        <datalist id='data'>
                      <option selected value={''}>select Station Name</option>
                      {_.map(station, stations => <option key={stations.id} value={stations.stationName} >{stations.stationName}<br /></option>)}
                      </datalist>
                  </div>
                    <div>
                        <button className='button-update ' type="submit" >{routes.id ? "Update" : "Save"}</button><br />
                    </div><br />
                    <div>
                        <Link to={'/routes'}>   <button className='button-update '>back</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default PostRoutes


