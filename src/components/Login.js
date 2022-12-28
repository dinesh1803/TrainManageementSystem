
import { Link } from 'react-router-dom'
import './View.css'



import React, { Component } from 'react'





export class Login extends Component {

  submitDetails = (e) => {
    e.PreventDefault();
  }
  render() {


    return (
      <div className='View'>
        <div className='form'>
          <h1 > Login</h1>
          <form onSubmit={this.submitDetails}>
            <label htmlFor='text'>email</label><br />
            <input type='search' placeholder='email' required /><br />

            <label htmlFor='text'>password</label><br />
            <input type='search' placeholder='password' required /><br /><br />

            <Link to='/nav'>
              <button >Sign in</button><br /><br />
            </Link>
          </form>
          <Link to='/register'>
            <button>If you don't have an account ? sign up</button>
          </Link>
        </div>
      </div>
    )
  }
}


