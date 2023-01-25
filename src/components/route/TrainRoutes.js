import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImExit } from 'react-icons/im';
import { Link, NavLink } from 'react-router-dom';
import '../../css/border.css';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';


const TrainRoutes = () => {

    const [routes, setRoutes] = useState([])

    useEffect(() => {
        getRoutes();
    }, [])

    const getRoutes = () => {
        axios.get("http://localhost:8080/admin/route/get")
            .then(response => {
                setRoutes(response.data)
            }).catch(error => {
                console.log(error)
            })
    }


    const deleteRouteHandler = (routeId, e) => {
        axios.delete(`http://localhost:8080/admin/route/delete/${routeId}`)
            .then(response => {
                setRoutes(response.data)
            }).catch(error => {
                console.log(error)
            })
    }



    return (

        <div>
            <h1 className='h1'> Route Details </h1><br />
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 2rem .5rem 2rem' }}>
                <NavLink style={{ textDecoration: 'none' }} to='/nav'>
                    <Button variant="contained" color='success' onClick={() => { <Link to='/nav'></Link> }} startIcon={<HomeIcon />}>
                        <span style={{ paddingTop: '3px' }}>Home</span>
                    </Button>
                </NavLink>
                <NavLink to="/addroutes"><button className='button-update '>Add More Routes</button></NavLink>
            </div>

            <table id="customers">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Route Id</th>
                        <th>Route Name</th>
                        <th>From Station</th>
                        <th>DESTINATION</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        routes.map((route, index) =>
                            <tr key={route.routeId}>
                                <td>{index + 1}</td>
                                <td> {route.routeId}</td>
                                <td>{route.routeName}</td>
                                <td> {route.source}</td>
                                <td> {route.destination}</td>
                                <td  >
                                    <button className="button-del" onClick={() => deleteRouteHandler(route.routeId)}>Delete</button> </td>
                                <td  >   <Link to={'/addroutes'} state={{ route: route }}><button className='button-update ' >Update</button></Link>
                                </td>
                            </tr>

                        )
                    }


                </tbody>
            </table><br />

        </div>
    )
}

export default TrainRoutes;