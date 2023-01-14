import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';


const PostRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [routes, setRoutes] = useState({
        routeName:'',
        source: '',
        destination: ''
    })

    useEffect(() => {
        if (location.state?.route) {
            setRoutes(location.state.route)
        }

    }, [])


    const changeHandler = (e) => {
        setRoutes(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/admin/route/post', routes)

            .then(response => {
                navigate('/routes')
            }).catch(error => {
                console.log(error)
            })

    }




    return (
        <div className='stylefrom'>
            <div className='forms' >
                <form onSubmit={submitHandler}>
                    <h3>Add more Routes</h3>
                    <div>

                        < label htmlFor='text'> Source </label><br />
                        <input type="text" name="source" value={routes.source} onChange={changeHandler} required /><br /><br />
                    </div>
                    <div>
                    < label htmlFor='text'> Route Name </label><br />
                        <input type="text" name="routeName" value={routes.routeName} onChange={changeHandler} required /><br /><br />
                    </div>
                    <div>
                        <label htmlFor='text'>Destination </label><br />
                        <input type="text" name="destination" value={routes.destination} onChange={changeHandler} required /><br /><br />
                    </div>
                    <div>
                        <button className='button-update ' type="submit" >{routes.id ? "Update" : "Save"}</button><br />
                    </div><br />
                    <div>
                        <Link to={'/routes'}>   <button className='button-update '>back</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default PostRoutes


