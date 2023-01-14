import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './border.css'


const TrainRoutes = () => {

    const [routes, setRoutes] = useState([])
    const [show, setShow] = useState(true)


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

        <div><br />
             <Link to='/nav'>
                <button className='button-update '>Back to Home page</button>
            </Link>
           <nav >
                <u id="nav">
                    <li><NavLink to="/addroutes"><button className='button-update '>Add More Routes</button></NavLink></li>

                </u>
            </nav> 

            <table id="customers">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Route Id</th>
                        <th>Route Name</th>
                        <th>SOURCE</th>
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
                                    <button  className="button-del" onClick={() => deleteRouteHandler(route.routeId)}>Delete</button> </td>
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