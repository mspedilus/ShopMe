import React from 'react'
import "../styles/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faCartShopping} from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  return (
    <div className="header">
        <div className="container">
            <div className='containerItem'>
                <FontAwesomeIcon icon={faUser} inverse className='icon'/>
                Login
            </div>
            <div className='containerItem'>
                <FontAwesomeIcon icon={faCartShopping} inverse className='icon'/>
                Cart 
            </div>

            <div className='search'>
                <input className="input" type="text" />
                <FontAwesomeIcon icon={faMagnifyingGlass} inverse id='magnifying'/>
            </div>
        </div>
        <div className='container2'>
            <div id="title">Shop Me</div>
            <div className="nav">
                <a href= " " >Clothing</a>
                <a href= " " >Sweaters</a>
                <a href= " " >Tops</a>
                <a href= " " >Pants & Jeans</a>
                <a href= " " >Accessories</a>
                <a href= " " >Shoes</a>
            </div>
        </div>
    </div>
  )
}
