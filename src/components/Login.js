
import { Link } from 'react-router-dom'
import './View.css'

import React from 'react'

export const Login=()=> {

  const submitDetails = (e) => {
    e.PreventDefault();
  }




    return (
      <div className='View'>
        <div className='form'>
          <h1 > Login</h1>
          <form onSubmit={(e)=>submitDetails(e)}>

            <label htmlFor='text'>email</label><br />
            <input type='search' placeholder='email' required /><br /><br />

            <label htmlFor='text'>password</label><br />
            <input type='search' placeholder='password' required /><br /><br />

            <Link to='/nav'>
              <button >Sign in</button><br/><br />
            </Link>
          </form>
          <Link to='/register'>
            If you don't have an account ? sign up
          </Link>
        </div>
      </div>
    )
  }
