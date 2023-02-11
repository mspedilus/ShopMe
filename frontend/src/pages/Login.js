import React, { useState, useContext } from 'react'
import axios from "axios"
import { AuthContext } from '../Contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import "../styles/login.css"

//Login Page
export default function Login() {

  const [credentials, setCredentials] = useState({ email: undefined, password: undefined })
  const [register, setRegister] = useState({ email: undefined, password: undefined, confirmPassword: undefined, 
                                             firstName: undefined, lastName: undefined, phoneNum: undefined,    })                              
  const { loading, error, dispatch } = useContext(AuthContext)
  const [registerError, setRegisterError] = useState("")
  const navigate = useNavigate()


  //Stores login values
  function handleLoginChange(e){
    setCredentials((prev) => ({...prev, [e.target.name]: e.target.value}))
  }


  //Stores register values
  function handleRegisterChange(e){
    setRegister((prev) => ({...prev, [e.target.name]: e.target.value}))
  }


  //Performs login action if credentials are valid
  async function handleLogin(){
    dispatch({type: "start-login"})
    try{
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials) //Validates user
      dispatch({type: "success-login", payload: res.data})
      navigate("/")
    }catch(err){
      dispatch({type: "failure-login", payload: err.response.data})
    }
  }


  //Performs register action if credentials are valid
  async function handleRegister(e){
    e.preventDefault()
    dispatch({type: "start-login"})
    if (/^\d+$/.test(register.phoneNum) !== true || register.phoneNum.length !== 10){ //Checks if phone number is valid
      setRegisterError("Phone number is invalid.")
      dispatch({type: "failure-login"})
      return
    }
    else if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.email) !== true ){ //Checks if email is valid
      setRegisterError("Email is invalid.")
      dispatch({type: "failure-login"})
      return
    }
    else if(register.password !== register.confirmPassword) { //Checks if passwords match
      setRegisterError("Password does not match.")
      dispatch({type: "failure-login"})
      return
    }
    else{
      try{
        const res = await axios.post("http://localhost:8800/api/auth/register", register) //Creates a new user
        dispatch({type: "success-login", payload: res.data})
        navigate("/")
      } catch(err){
        alert("An error has occured. Please try again later.")
        console.log("Error:", err)
      }
    }


  }

  return (
    <div>

      {/* Banner */}
      <div className='topLogin'>
          <Link className="logo" to="/">Shop Me</Link>
      </div>

      {/* Login  */}
      <div className='login-container'>
        <div className='loginInputs-container'>
          <h2>Sign In</h2>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" onChange={handleLoginChange} id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleLoginChange} id="password" />
          <button disabled={loading} className='loginBtn' onClick={handleLogin}>Sign In</button>
          {error && <p>{error.message}</p>}
        </div>

        {/* Register */}
        <div className='createAccount-container'>
          <h2>No account yet?</h2>
          <form autofill="off" onSubmit={handleRegister}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" onChange={handleRegisterChange} id="firstName" required />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" onChange={handleRegisterChange} id="lastName" required />
            <label htmlFor="phoneNum">Phone Number</label>
            <input type="text" name="phoneNum" onChange={handleRegisterChange} id="phoneNum" required />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleRegisterChange} id="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleRegisterChange} id="password" required />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" onChange={handleRegisterChange} id="confirmPassword" required />
            <button disabled={loading} type="submit" >Create Account</button>
          </form>
          {registerError && <p>{registerError}</p>}
        </div>
      </div>

    </div>
  )
}
