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
        <div id="title">Shop Me</div>
        <div className="nav">
            <div className='navTxt'>Clothing</div>
            <div className='navTxt'>Sweaters</div>
            <div className='navTxt'>Tops</div>
            <div className='navTxt'>Pants & Jeans</div>
            <div className='navTxt'>Accessories</div>
            <div className='navTxt'>Shoes</div>
        </div>
    </div>
  )
}
