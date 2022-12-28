
import { Link } from 'react-router-dom';
import axios from 'axios';
import './View.css'
import React, { Component } from 'react'

export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            phoneNumber: '',
            email: '',
            password: ''
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler = e => {
        e.preventDefault()

        console.log(this.state);

        axios.post('http://localhost:8080/user/post', this.state)
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
    }

    render() {
        const { userName, phoneNumber, email, password } = this.state

        return (
            <div className='View'>
                <div className='Regform'>
                    <h1 >Register</h1>
                    <form onSubmit={() => this.submitHandler()} >
                        <div>
                            < label htmlFor='text'>Username </label><br />
                            <input type="text" name="userName"
                                value={userName} onChange={this.changeHandler} required /><br />
                        </div>
                        <div>
                            <label htmlFor='text'>phone number </label><br />
                            <input type="tel" name="phoneNumber" value={phoneNumber} onChange={this.changeHandler} required /><br />
                        </div>

                        <div>
                            <label htmlFor='text'>E-mail</label><br />
                            <input type="text" placeholder='email' name='email' value={email} onChange={this.changeHandler} required /><br />
                        </div>

                        <div>
                            <label htmlFor='text'>password</label><br />
                            <input type='password' placeholder='password' name='password' value={password} onChange={this.changeHandler} required /><br /><br />
                        </div>

                        <div>
                            <button type='submit'>submit</button><br /><br />
                        </div>
                    </form>
                    <Link to='/'>
                        <button>Already have an account click to login</button><br />
                    </Link>
                </div>
            </div>
        )
    }
}

export default Register
