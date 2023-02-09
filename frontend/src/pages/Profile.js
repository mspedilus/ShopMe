import React from 'react'
import "../styles/profile.css"
import Navbar from '../components/Navbar'
import useFetch from '../components/useFetch';

export default function Profile() {
  const { fetchedData } = useFetch("http://localhost:8800/api/users/profile")
  console.log( fetchedData )

  return (

    <div>
      <Navbar />
      <div className='account'>
        <div className='profile' >
          <h1>Profile</h1>
          <p>Name: {fetchedData.firstName} {fetchedData.lastName}</p>
          <p>Email: {fetchedData.email}</p>
          <p>Phone Number: {fetchedData.phoneNum}</p>
        </div>
        <div className='purchases'>
          <h1>Purchase History</h1>
        </div>
      </div>
    </div>
  )
}
