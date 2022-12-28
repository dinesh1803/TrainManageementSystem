import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './border.css'

export class TrainRoutes extends Component {

    constructor(){
        super();
        this.state = {
            routes : []
        }
    }
    
    componentDidMount(){
      this.getRoutes();
    }

    getRoutes = () => {
        axios.get("http://localhost:8080/admin/route/get")
        .then(response =>{
           console.log(response)
            this.setState({routes : response.data})
        }).catch(error => {
            console.log(error)
        })
    }


    deleteRouteHandler(routeId ,e ){
        axios.delete(`http://localhost:8080/admin/route/delete/${routeId}`)
        .then(response => {
            console.log(response)
            this.setState({routes : response.data})
        }).catch(error => {
            console.log(error)
        })
      

    }
    updateRouteHandler(routeId){

    }


  render() {
    
    return (
        
      <div>
        <nav>    
        <u id="nav">  
          <li><NavLink to="/addroutes">add routes</NavLink></li>
        
        </u>
        </nav>

        <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>SOURCE</th>
                    <th>DESTINATION</th>
                    <th>Control</th>
                </tr>
            </thead>

            <tbody >
                {
                    this.state.routes.map((route) =>
                        <tr key={route.routeId}>
                            <td> {route.routeId}</td>
                            <td> {route.source}</td>
                            <td> {route.destination}</td>
                            <td>
                                 <button onClick={()=>this.deleteRouteHandler(route.routeId)}>Delete</button>
                                 <button onClick={()=>this.updateRouteHandler(route.routeId)}>Update</button>
                            </td>
                        </tr>
                        
                        )
                }

            </tbody>
        </table>
        
      </div>
    )
  }
}

