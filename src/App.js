
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import React, { Component } from 'react'
import Home from './components/Home';
import NavigateBar from './components/NavigateBar';
import About from './components/route/About';
import { TrainRoutes } from './components/route/TrainRoutes';
import PostRoutes from './components/route/PostRoutes';



 class App extends Component {

  render(){
  return (
   <>
    <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} ></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/nav' element={<NavigateBar/>}></Route>
          <Route path='/routes' element={<TrainRoutes/>} ></Route>
          <Route path='/addroutes' element={<PostRoutes/>} ></Route>
        </Routes>
    </div>
    </>
  )}
}
export default App;