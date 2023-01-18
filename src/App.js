
import { Link, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import React, { Component } from 'react'

import NavigateBar from './components/NavigateBar';
import About from './components/route/About';
import  TrainRoutes  from './components/route/TrainRoutes';
import PostRoutes from './components/route/PostRoutes';
import GetTrain from './components/Trains/GetTrain';
import PostTrain from './components/Trains/PostTrain';
import Stations from './components/station/Stations';
import PostStationDetails from './components/station/PostStationDetails';
import GetrouteDetails from './components/routedetails/GetrouteDetails';
import PostRouteDetails from './components/routedetails/PostRouteDetails';
import Search from './components/User Component/Search';
import SearchTrain from './components/User Component/SearchTrain';



 class App extends Component {

  render(){
  return (
   <>
    <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} ></Route>

          <Route path='/about' element={<About/>}></Route>
          <Route path='/nav' element={<NavigateBar/>}></Route>

          by routes
          <Route path='/routes' element={<TrainRoutes/>} ></Route>
          <Route path='/addroutes' element={<PostRoutes/>} ></Route>

          by train
          <Route path='/trains' element={<GetTrain/>} ></Route>
          <Route path='/addtrains' element={<PostTrain />} ></Route>
          {/* <Route path='/addtrains/:id' element={<PostTrain />} ></Route> */}

          by station
          <Route path='/station' element={<Stations/>} ></Route>
          <Route path='/addstation' element={<PostStationDetails/>} ></Route>
          by route routeDetails
          <Route path='/timeschedule' element={<GetrouteDetails/>} ></Route>
          <Route path='/addroutedetails' element={<PostRouteDetails/>} ></Route>
    
          <Route path='/search' element={<Search/>} ></Route>
          <Route path='/searchTrain' element={<SearchTrain/>} ></Route>
        </Routes>
    
    </div>
    </>
  )}
}
export default App;