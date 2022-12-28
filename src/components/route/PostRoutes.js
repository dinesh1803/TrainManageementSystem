import axios from 'axios'
import React, { Component } from 'react'

export class PostRoutes extends Component {
    constructor(){
        super();
        this.state={
            source:"",
            destination:""
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler =() =>{
        axios.post(`http:localhost:8080/admin/route/post`,this.state)
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }



    render() {
        const {source,destination}=this.state
        return (
            <div>
                <div>
                    < label htmlFor='text'> Source </label><br />
                    <input type="text" name="source"
                        value={source} onChange={this.changeHandler} required /><br />
                </div>
                <div>
                    <label htmlFor='text'>Destination </label><br />
                    <input type="text" name="destination" value={destination} onChange={this.changeHandler} required /><br />
                </div>
                <div>
                    <button type='submit' onSubmit={this.submitHandler}>ADD</button>
                </div>
            </div>
        )
    }
}

export default PostRoutes
