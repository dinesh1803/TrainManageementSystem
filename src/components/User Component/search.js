import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';

const Search =()=>{
    const [routeDetails, setRouteDetails] = useState([])
    const [filterRouteDetails, setFilterRouteDetails] = useState([])
    const [searchTrain, setSearchTrain] = useState([])

    const location = useLocation()

    useEffect(() => {
        getRouteDetails();
    }, [])

    const getRouteDetails = () => {
        axios.get(`http://localhost:8080/admin/route-details/get`)
            .then(
                response => {
                    console.log(response.data)
               
                    setFilterRouteDetails(response.data)
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
    }
    const deleteRouteHandler = (id) => {
        axios.delete(`http://localhost:8080/admin/route-details/delete/${id}`)
            .then(response => {
                console.log(response)
                setRouteDetails(response.data)
            }).catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        if (location.state?.train) {
            setSearchTrain(location.state.train)
        }
      }, [])

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
        
        setSearchTrain(e.targets.value);
    }


    return (
        <div>
            <nav>
                <u id="nav">
                    <li><NavLink to="/addroutedetails">Add More Station</NavLink></li>

                </u>
            </nav><br />

            <div className='SearchBar'>
                <label htmlFor='text'>Search By Train or Station Name</label><br /><br />
                <input className='SearchInput' type='search' name='searchTrain' placeholder="search...."
                    value={searchTrain} onChange={(e) => searchHandler(e)} ></input><br /><br />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>RouteId</th>
                        <th>Train Name</th>
                        <th>Station Name</th>
                        <th>Train Id</th>
                        <th>Time</th>
                        <th>Delete</th>
                        <th>update</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        routeDetails.map((routedetail, index) =>
                            <tr key={routedetail.id}>

                                <td>{index + 1}</td>
                                <td>{routedetail?.train.route.routeId}</td>
                                <td>{routedetail?.train.trainName}</td>

                                <td>{routedetail.station?.stationName}</td>
                                <td>{routedetail.train?.id}</td>
                                <td>{routedetail?.scheduleTime}</td>

                                <td>
                                    <button onClick={() => deleteRouteHandler(routedetail.id)}>Delete</button></td>
                                 <td> <Link  to={'/addroutedetails'} state={{routedetail:routedetail}}><button >Update</button></Link>  
                                </td>

                            </tr>
                        )
                    }
                </tbody>
            </table><br />
            <Link to='/nav'>
                <button >back to Home page</button><br /><br />
            </Link>
        </div>
    ) 
}

export default Search
