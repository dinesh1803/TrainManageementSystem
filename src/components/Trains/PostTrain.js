import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash'

import 'bootstrap/dist/css/bootstrap.min.css';

const PostTrain = () => {

  const location = useLocation()

  const navigate = useNavigate();

  const [addRoute, setAddRoute] = useState([])

  const [trainDetails, setTrainDetais] = useState({
    trainNumber: '',
    trainName: ''
  })

  useEffect(() => {
    if (location.state?.train) {
      setTrainDetais(location.state.train)
    }
  }, [])


  const changeHandler = e => {
    setTrainDetais(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }



  useEffect(() => {
    axios.get("http://localhost:8080/admin/route/get")
      .then(response => {
        setAddRoute(response.data)
      })
  },[])



  const submitHandler = (e) => {
    e.preventDefault()

    if (!trainDetails.routeIds) return

    if (trainDetails.routeIds) {
      const route = { routeId: trainDetails.routeIds }
      trainDetails.route = route;
    }

    axios.post('http://localhost:8080/admin/traindetails/post', trainDetails)
      .then(
        response => {
          navigate('/trains')
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
  }
  return (
    <div className='stylefrom'>
      <div className='forms' >
        <form onSubmit={submitHandler}>
          <h3>Add more Routes</h3>

          <div>
            < label htmlFor='text'> Train Number </label><br />
            <input type="text" name="trainNumber"
              value={trainDetails.trainNumber} onChange={changeHandler} required /><br /><br />
          </div>

          <div>
            <label htmlFor='text'>Train Name </label><br />
            <input type="text" name="trainName" value={trainDetails.trainName} onChange={changeHandler} required /><br /><br />
          </div>

          <div>
            <label htmlFor='text'>Select route Name</label><br />
            <select name='routeIds' id='routeId' onChange={changeHandler} >
              <option selected value={""}>Select route Id</option>
              {_.map(addRoute, r => <option key={r.routeId} value={r.routeId}>{r.routeName}</option>)}
            </select>
          </div><br />

{/* <div >
            <Select className="col-md-6" options={addRoute} />
          </div> */}

        

          <div>
            <button class="button-del" type="submit">{trainDetails.id ? "Update" : "save"}</button>
          </div><br/>
          <div>
            <Link to={"/trains"}> <button class="button-del">back</button></Link>
          </div>
        </form>
      </div>
    </div>
  )
}
export default PostTrain
 