import React, { useState } from 'react'
import "../styles/profile.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import useFetch from '../components/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"))
  const fullName = user.firstName + " " + user.lastName
  const [profileData, setProfileData] = useState({...user, fullName: fullName})
  const {fetchedData, loading} = useFetch("http://localhost:8800/api/products/getOrders")
  const [error, setError] = useState("")

  // Toggles between hiding and showing the dropdown content 
  function showDropdown(x) {
    document.getElementById(x).classList.toggle("show");
  }

  const displayOrders = (order, i) => {
    const details = JSON.parse(order.order)
    return (
      <div key={order._id}>
        <div className='purchases-dropBtn' onClick={() => showDropdown(i)}>
          <div>
            <p>{order.createdAt.slice(5, 7) + "/" + order.createdAt.slice(8, 10)  + "/" + order.createdAt.slice(0, 4)}</p>
            <p>Order #{order._id.replace(/\D/g,'')}</p>
          </div>
          <div>
            <p>Total: ${order.totalPrice}</p>
            <p>{order.itemCount} item(s)</p>
          </div>
          <FontAwesomeIcon icon={faAngleDown} className='purchaseIcon'/>
        </div>
        <div className='order-container' id={i}>
          {details.map(displayDetails)}
        </div>
      </div>
    )
  }

  const displayDetails = (item) => {
    return (
        <div className='order-dropContent'>
          <img src={item.imgUrl} alt={item.name} />
          <div>
            <p><span className='bold'>{item.name}</span></p>
            <p><span className='bold'>Color: </span>{item.color}</p>
            <p><span className='bold'>Size: </span>{item.size}</p>
            <p><span className='bold'> Quantity: </span>{item.quantity}</p>
            <p>${(item.currPrice).toFixed(2)}</p>
          </div>
        </div>
    )
  }

  function handleChange(e){
    setProfileData((prev) =>{ return {...prev, [e.target.name]: e.target.value}} ) 
  }

  async function handleSave(){
    if(profileData.phoneNum === ""){  //Checks if phone number is empty
      setError("Please enter a phone number.")
      return
    }
    else if (/^\d+$/.test(profileData.phoneNum) !== true || profileData.phoneNum.length !== 10){ //Checks if phone number is valid
      setError("Phone number is invalid.")
      return
    }
    else if(profileData.email === ""){  //Checks if email is empty
      setError("Please enter an email.")
      return
    }
    else if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email) !== true ){ //Checks if email is valid
      setError("Email is invalid.")
      return
    }
    else if(profileData.fullName === ""){  //Checks name is empty
      setError("Please enter a name.")
      return
    }
    else{
      try{
        const name = profileData.fullName.split(" ")
        const newArr = {...profileData, firstName: name[0], lastName: name[1]}
        const res = await axios.put("http://localhost:8800/api/users/" + user._id, { withCredentials: true }, newArr) 
        setProfileData(res)
      } catch(err){
        alert("An error has occured. Please try again.")
        console.log("Error:", err)
      }
    }
  } 

  return (

    <div >
      <div className='profile-container'>
      <Navbar />
      { !loading && 
      <div className='account'>
        <div className='profile' >
          <h1>Profile</h1>
          <p>Name: {profileData.firstName} {profileData.lastName}</p>
          <p>Email: {profileData.email}</p>
          <p>Phone Number: {profileData.phoneNum}</p>
          <button>Edit</button>
        </div>
        <div className='profile' >
          <h1>Profile</h1>
          <div>
            <label htmlFor="fullName">Name: </label>
            <input type="text" name="fullName" value={profileData.fullName} onChange={(e) => handleChange(e)} required/>
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" value={profileData.email} onChange={(e) => handleChange(e)} required/>
          </div>
          <div>
            <label htmlFor="phoneNum">Phone number: </label>
            <input type="text" name="phoneNum" value={profileData.phoneNum} onChange={(e) => handleChange(e)} required/>
          </div>
          <button onClick={handleSave}>Save</button>
          <p className='error'>{error}</p>
        </div>
        <div className='purchases'>
          <h1>Purchase History</h1>
          <div className='order-dropdown'>
            {fetchedData !== ""  && fetchedData.map(displayOrders) }
            {fetchedData.length === 0 && <p id="noOrdersMsg">No orders has been found</p>}

          </div>
        </div>
      </div>
      }
      </div>
      <Footer />
    </div>
  )
}