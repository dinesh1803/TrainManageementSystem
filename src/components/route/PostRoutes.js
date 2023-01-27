import axios from 'axios'

import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PostRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const [routes, setRoutes] = useState({
        routeName: '',
        source: '',
        destination: ''
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
   axios.get(`http://localhost:8080/admin/station/get`)
        .then(
            response => {
                console.log(response.data)
                setStation(_.orderBy(response.data,"id"))
                // let fromStation=[]
                // const stationName=_.map(response.data,c=>{
                //     let name={};
                //     name.label=c.stationName;
                //     name.id=c.id
                //     fromStation.push(name)
                // })
                // setFromStation(fromStation);
    })
},[])

    const changeHandler = (e) => {
        setRoutes(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/admin/route/post', routes)

            .then(response => {
                navigate('/routes')
                console.log(response.data);
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
                   {<ComboBox data={fromStation} />}
                    </div> */}
                    <div>
                        < label htmlFor='text'> Route Name </label><br />
    
                        <input type="text" name="routeName" value={routes.routeName} onChange={changeHandler} required /><br /><br />
                    </div>
                    <div>
                        < label htmlFor='text'> From </label><br />
                      
                        {/* <select name='source' id='id' onChange={changeHandler}  >                     
                      <option selected value={''}>select Station Name</option>
                      {_.map(station, stations => <option key={stations.id} value={stations.stationName} >{stations.stationName}<br /></option>)}
                  </select> */}

                    <input list='data' name='source' placeholder='search from station' onChange={changeHandler} value={routes.source} ></input>
                    <datalist id='data' >
                    <option selected value={''}>select Station Name</option>
                      {_.map(station, stations => <option key={stations.id} value={stations.stationName} >{stations.stationName}</option>)}
                    </datalist>

                    </div>

                    <div>
                        <label htmlFor='text'>To </label><br />
                        <select name='destination' id='id' onChange={changeHandler} value={routes.destination}>
                      <option selected value={''}>select Station Name</option>
                      {_.map(station, stations => <option key={stations.id} value={stations.stationName} >{stations.stationName}<br /></option>)}
                  </select>
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


