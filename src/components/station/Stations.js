import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { ImExit } from 'react-icons/im';
import { Link, NavLink } from 'react-router-dom';

const Stations = () => {

    const [station, setStation] = useState([])
    const [filterStation, setFilterStation] = useState([])
    const [searchStation, setSearchStation] = useState('')


    useEffect(() => {
        getStation();
    }, [])

    const getStation = () => {
        axios.get(`http://localhost:8080/admin/station/get`)
            .then(
                response => {
                    console.log(response.data)
                    setStation(_.orderBy(response.data,"id"))
                    setFilterStation(response.data)
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
    }

    const deleteRouteHandler = (id, e) => {

        axios.delete(`http://localhost:8080/admin/station/delete/${id}`)
            .then(response => {
                console.log(response)
                setStation(response.data)

            }).catch(error => {
                console.log(error)
            })


    }
    const searchHandler = (e) => {

            const filterResult = filterStation.filter(item => item.stationName.toLowerCase().includes(e.target.value.toLowerCase()))
            setStation(filterResult)
        
        setSearchStation(e.target.value)
    }

    return (
        <div>
            <h1  className='h1'>Station Details</h1><br/>
         <Link to='/nav'>
         <button className='button-del '><ImExit/> Home</button>
            </Link>
            
          
            <u className='add'>
                    <NavLink to="/addstation"><button className='button-update '>Add More Station</button></NavLink>
                </u>

            <div className='SearchBar'>
                <label htmlFor='text'>Search...</label><br></br>
                <input  className='SearchInput'  type='search' name='searchTrain' placeholder="searchByTrain" value={searchStation} onInput={(e) => searchHandler(e)} ></input>
            </div><br/>
            <table id="customers">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Station Id</th>
                        <th>Station Name</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        station.map((station, index) =>
                            <tr key={station.id}>
                                <td>{index + 1}</td>
                                <td>{station?.stationCode}</td>
                                <td>{station.stationName}</td>
                                <td> <button class="button-del" onClick={() => deleteRouteHandler(station.id)}>Delete</button></td>
                                <td> <Link to={'/addstation'} state={{ station: station }} > <button className='button-update ' >Update</button></Link> </td>
                            </tr>

                        )
                    }
                </tbody>
            </table><br />
           
        </div>
    )
}


export default Stations
