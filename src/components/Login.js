
import { Link, useNavigate } from 'react-router-dom'
import '../css/View.css'

import axios from 'axios'
import React, { useState } from 'react'
import { errorHandler } from '../utills/ErrorHandler'

export const Login=()=> {
  const nav=useNavigate()

const[login,setLogin]=useState({

})
const changeHandler=(e)=>{
  setLogin(prev=>({...prev,[e.target.name]:e.target.value}))
}

  const submitDetails = (e) => {
    e.preventDefault();
    axios.post(`http://192.168.1.15:8081/admin/login`,login).then((res)=>{
      console.log(res, "response")
      localStorage.setItem("token",res.data)
      nav("/nav")
    }).catch((error)=>{
      console.log(error)
      errorHandler(error)
    })
  }




    return (
      <div className='View'>
        <div className='form'>
          <h1 > Login</h1>
          <form onSubmit={(e)=>submitDetails(e)}>

            <label htmlFor='text'>email</label><br />
            <input type='search' placeholder='email' name='email' value={login.email} onChange={changeHandler} required /><br /><br />

            <label htmlFor='text'>password</label><br />
            <input type='search' placeholder='password' name='password' value={login.password} onChange={changeHandler} required /><br /><br />

              <button >Sign in</button><br/><br />
           
          </form>
          <Link to='/register'>
            If you don't have an account ? sign up
          </Link>
        </div>
      </div>
    )
  }
