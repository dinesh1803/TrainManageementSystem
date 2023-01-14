import React, { useEffect, useState } from 'react'

const UserDetais = () => {
    const[user,setUser]=useState()

    useEffect(()=>{
        getUserDetails();
    },[])

   const getUserDetails= ()=>{
    axios.post("http://localhost:8080/admin/get") 
    .then(res=>{
        console.log(res.data)
    }).catch(error=>{
        console.log(error)
    })
   }
   


  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>S.No</th>
                <th>User Name</th>
                <th>PhoneNumber</th>
                <th>E-mail Id</th>
                <th>password</th>
            </tr>
        </thead>
        <tbody>
            {
                user.map((users,index)=>
                <tr key={users.id}>
                    <td>{index+1}</td>
                    <td>{users.userName}</td>
                    <td>{users.phoneNumber}</td>
                    <td>{users.email}</td>
                    <td>{users.password}</td>

                </tr>
                )
            }
        </tbody>
      </table>
      
    </div>
  )
}

export default UserDetais
