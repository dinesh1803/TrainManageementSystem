import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { ImExit } from 'react-icons/im';
import { Link, NavLink } from 'react-router-dom';
import axiosHeader from '../../utills/Interceptor';

const GetrouteDetails = () => {

    const [routeDetails, setRouteDetails] = useState([])
    const [filterRouteDetails, setFilterRouteDetails] = useState([])
    const [searchTrain, setSearchTrain] = useState([])

    useEffect(() => {
        getRouteDetails();
    }, [])

    const getRouteDetails = () => {
        axiosHeader.get(`/route-details/get`)
            .then(
                response => {
                    console.log(response.data)
                    setRouteDetails(_.orderBy(response,"train.id"))
                    setFilterRouteDetails(response)
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
    }
    // const deleteRouteHandler = (id) => {
    //     axios.delete(`http://localhost:8080/admin/route-details/delete/${id}`)
    //         .then(response => {
    //             console.log(response)
    //             setRouteDetails(response.data)
    //         }).catch(error => {
    //             console.log(error)
    //         })
    // }


    const searchHandler = (e) => {
        // _.map(routeDetails,r=>{
        //    _.map(r.train,(t)=>{
        //     console.log(t.destination,t.source);
        //    })
        // })
       
            const filterResult = filterRouteDetails
                .filter((item => item.train.trainName.toLowerCase().includes(e.target.value.toLowerCase())
                    || item.station.stationName.toLowerCase().includes(e.target.value.toLowerCase())));

            setRouteDetails(filterResult);
        
        setSearchTrain(e.target.value);
    }


    return (
        <div>
            <h1  className='h1'>Train Schedule</h1><br></br>
                   <Link to='/nav'  >
                <button className='button-del '><ImExit/> Home</button>
            </Link>
            <u className='add'>
                    <li><NavLink to="/addroutedetails"><button className='button-update '> Add More Station</button></NavLink></li>

                </u>
          
            

            <div className='SearchBar'>
                <label htmlFor='text'>Search By Train or Station Name</label><br/>
                <input className='SearchInput' type='search' name='searchTrain' placeholder="search...."
                    value={searchTrain} onInput={(e) => searchHandler(e)} ></input><br /><br />
            </div>
            <table id="customers">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>RouteName</th>
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
                                <td>{routedetail?.train?.route?.routeName}</td>
                                <td>{routedetail?.train?.trainName}</td>

                                <td>{routedetail.station?.stationName}</td>
                             
                                <td>{routedetail?.scheduleTime}</td>
                                <td>{routedetail?.haltTime}</td>

                               

                            </tr>
                        )
                    }
                </tbody>
            </table><br />
     
        </div>
    ) 
}
export default GetrouteDetails
  