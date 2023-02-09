import React, { useState, useContext } from 'react'
import "../styles/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext'

export default function Navbar() {

    const [searchVal, setSearchVal] = useState("")
    const navigate = useNavigate()
    const { user, dispatch } = useContext(AuthContext)

    //Redirects page to search results page
    function onSearch(event, categoryId) {
        if (event.key === "Enter" || event.type === "click") {
            navigate("/search?name="+searchVal, {state: {searchVal, category: categoryId}});
        }
    }
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    function handleLogout(){
        localStorage.removeItem("user");
        dispatch({type: "logout"})
        navigate("/")
    }

    function handleLogin(){
        if (user == null) navigate("/login")
    }

    return (
    <div className="header">
            <div className="container">
                <div>
                    <div className='containerItem user-dropdown' onClick={handleLogin} >
                        <FontAwesomeIcon icon={faUser} inverse className='icon'/>
                        {user !== null ? `Hi, ${capitalizeFirstLetter(user.firstName)}` : "Sign In"}
                    </div>
                    { user !== null &&
                        <div className='nav-dropItems'>
                            <p onClick={() => navigate("/account")}>My Account</p>
                            <p onClick={handleLogout}>Logout</p>                        
                        </div>
                    }
                </div>
 
                <div className='containerItem' onClick={() => navigate("/viewBag")}>
                    <FontAwesomeIcon icon={faShoppingBag} inverse className='icon'/>
                    Bag
                </div>

                <div className='search'>
                    <input onKeyDown={onSearch} value={searchVal} className="input" id="searchInput" type="text" onChange={(e) => setSearchVal(e.target.value)} />
                    <FontAwesomeIcon onClick={onSearch} icon={faMagnifyingGlass} inverse id='magnifying'/>
                </div>
            </div>


        <div className='container2'>
            <div className='titleContainer'>
                <Link id="title" to="/">Shop Me</Link>
            </div>

            <div className="nav">
                {/* Men Options */}
                <div className="men-dropdown">
                    <p className='navTitles'>Men</p>
                    <div className='men-dropContent' >
                        <div>
                            <h4>Men's Clothing</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 6993)}>New-in-clothing</p>
                                <p onClick={(event) => onSearch(event, 25997)}>Plus Size</p>
                                <p onClick={(event) => onSearch(event, 5678)}>Suits </p>
                                <p onClick={(event) => onSearch(event, 3602)}>Shirts </p>
                                <p onClick={(event) => onSearch(event, 5668)}>Hoodies & Sweatshirt </p>
                                <p onClick={(event) => onSearch(event, 7617)}>Sweaters & Cardigans </p>
                                <p onClick={(event) => onSearch(event, 3606)}>Jackets & Coats </p>
                                <p onClick={(event) => onSearch(event, 4910)}>Pants </p>
                                <p onClick={(event) => onSearch(event, 7078)}>Shorts </p>
                                <p onClick={(event) => onSearch(event, 4208)}>Jeans </p>
                                <p onClick={(event) => onSearch(event, 16329)}>Underwear & Socks </p>
                                <p onClick={(event) => onSearch(event, 26090)}>Activewear </p>
                                <p onClick={(event) => onSearch(event, 18797)}>Loungewear </p>
                                <p onClick={(event) => onSearch(event, 13210)}>Swimwear </p>
                            </div>
                        </div>

                        <div>
                            <h4>Men's Shoes</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 17184)}>New-in-shoes </p>
                                <p onClick={(event) => onSearch(event, 4209)}>Shoes, Boots, & Sneakers </p>
                                <p onClick={(event) => onSearch(event, 11247)}>Loafers </p>
                                <p onClick={(event) => onSearch(event, 5775)}>Sneakers </p>
                                <p onClick={(event) => onSearch(event, 17514)}>Sliders & Flip Flops </p>
                                <p onClick={(event) => onSearch(event, 5774)}>Boots </p>
                            </div>
                        </div>

                        <div>
                            <h4>Bags & Accessories</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 4210)}>All Accessories </p>
                                <p onClick={(event) => onSearch(event, 9265)}>All Bags </p>
                                <p onClick={(event) => onSearch(event, 27112)}>New-in-accessories </p>
                                <p onClick={(event) => onSearch(event, 5034)}>Jewelry </p>
                                <p onClick={(event) => onSearch(event, 6519)}>Sunglasses </p>
                                <p onClick={(event) => onSearch(event, 19855)}>Watches </p>
                            </div>
                        </div>

                        <div>
                        <h4>Face & Body</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 27140)}>New-in-face-body </p>
                                <p onClick={(event) => onSearch(event, 19517)}>Face & Body </p>
                                <p onClick={(event) => onSearch(event, 27143)}>Haircare </p>
                                <p onClick={(event) => onSearch(event, 27149)}>Makeup </p>
                            </div>
                        </div>

                        <div>
                            <h4>Brands</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 27111)}>Designer Brands </p>
                                <p onClick={(event) => onSearch(event, 29065)}>Topman </p>
                                <p onClick={(event) => onSearch(event, 7113)}>Adidas </p>
                                <p onClick={(event) => onSearch(event, 2084)}>Converse </p>
                                <p onClick={(event) => onSearch(event, 4747)}>Dr Martens </p>
                                <p onClick={(event) => onSearch(event, 7277)}>Timberland </p>
                                <p onClick={(event) => onSearch(event, 5247)}>Tommy Hilfiger </p>
                                <p onClick={(event) => onSearch(event, 4766)}>Nike </p>
                                <p onClick={(event) => onSearch(event, 5715)}>The North Face </p>
                                <p onClick={(event) => onSearch(event, 3735)}>Casio </p>
                                <p onClick={(event) => onSearch(event, 4280)}>Polo Ralph Lauren </p>
                                <p onClick={(event) => onSearch(event, 4497)}>Rayban </p>
                                <p onClick={(event) => onSearch(event, 19971)}>Abercrombie and Fitch </p>
                                <p onClick={(event) => onSearch(event, 11248)}>Reclaimed Vintage </p>
                                <p onClick={(event) => onSearch(event, 4564)}>Levis </p>
                            </div>
                        </div>

                        <div>
                            <div className='pointer'>
                                <h4>Gifts</h4>
                                <p onClick={(event) => onSearch(event, 16091)}>Gifts </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Women Options */}
                <div className='women-dropdown'>
                    <p className='navTitles'>Women</p>
                    <div className='women-dropContent'>
                        <div>
                            <h4>Women's Clothing</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 6993)}>New-in-clothing </p>
                                <p onClick={(event) => onSearch(event, 25997)}>Plus Size </p>
                                <p onClick={(event) => onSearch(event, 5678)}>Suits </p>
                                <p onClick={(event) => onSearch(event, 3602)}>Shirts </p>
                                <p onClick={(event) => onSearch(event, 5668)}>Hoodies & Sweatshirt </p>
                                <p onClick={(event) => onSearch(event, 7617)}>Sweaters & Cardigans </p>
                                <p onClick={(event) => onSearch(event, 3606)}>Jackets & Coats </p>
                                <p onClick={(event) => onSearch(event, 4910)}>Pants </p>
                                <p onClick={(event) => onSearch(event, 7078)}>Shorts </p>
                                <p onClick={(event) => onSearch(event, 4208)}>Jeans </p>
                                <p onClick={(event) => onSearch(event, 16329)}>Underwear & Socks </p>
                                <p onClick={(event) => onSearch(event, 26090)}>Activewear </p>
                                <p onClick={(event) => onSearch(event, 18797)}>Loungewear </p>
                                <p onClick={(event) => onSearch(event, 2238)}>Swimwear </p>
                            </div>
                        </div>

                        <div>
                            <h4>Women's Shoes</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 17184)}>New-in-shoes </p>
                                <p onClick={(event) => onSearch(event, 4209)}>Shoes, Boots, & Sneakers </p>
                                <p onClick={(event) => onSearch(event, 11247)}>Loafers </p>
                                <p onClick={(event) => onSearch(event, 5775)}>Sneakers </p>
                                <p onClick={(event) => onSearch(event, 17514)}>Sliders & Flip Flops </p>
                                <p onClick={(event) => onSearch(event, 5774)}>Boots </p>
                            </div>
                        </div>

                        <div>
                            <h4>Bags & Accessories</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 4210)}>All Accessories </p>
                                <p onClick={(event) => onSearch(event, 9265)}>All Bags </p>
                                <p onClick={(event) => onSearch(event, 27109)}>New-in-accessories </p>
                                <p onClick={(event) => onSearch(event, 5034)}>Jewelry </p>
                                <p onClick={(event) => onSearch(event, 6519)}>Sunglasses </p>
                                <p onClick={(event) => onSearch(event, 19855)}>Watches </p>
                            </div>
                        </div>

                        <div>
                            <h4>Face & Body</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 27140)}>New-in-face-body </p>
                                <p onClick={(event) => onSearch(event, 19517)}>Face & Body </p>
                                <p onClick={(event) => onSearch(event, 27143)}>Haircare </p>
                                <p onClick={(event) => onSearch(event, 27149)}>Makeup </p>
                            </div>
                        </div>

                        <div>
                            <h4>Brands</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 27111)}>Designer Brands </p>
                                <p onClick={(event) => onSearch(event, 29065)}>Topman </p>
                                <p onClick={(event) => onSearch(event, 7113)}>Adidas </p>
                                <p onClick={(event) => onSearch(event, 2084)}>Converse </p>
                                <p onClick={(event) => onSearch(event, 4747)}>Dr Martens </p>
                                <p onClick={(event) => onSearch(event, 7277)}>Timberland </p>
                                <p onClick={(event) => onSearch(event, 5247)}>Tommy Hilfiger </p>
                                <p onClick={(event) => onSearch(event, 4766)}>Nike </p>
                                <p onClick={(event) => onSearch(event, 5715)}>The North Face </p>
                                <p onClick={(event) => onSearch(event, 3735)}>Casio </p>
                                <p onClick={(event) => onSearch(event, 4280)}>Polo Ralph Lauren </p>
                                <p onClick={(event) => onSearch(event, 4497)}>Rayban </p>
                                <p onClick={(event) => onSearch(event, 19971)}>Abercrombie and Fitch </p>
                                <p onClick={(event) => onSearch(event, 11248)}>Reclaimed Vintage </p>
                                <p onClick={(event) => onSearch(event, 4564)}>Levis </p>
                            </div>
                        </div>

                        <div>
                            <h4>Gifts</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 16091)}>Gifts </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sale Options */}
                <div className='sale-dropdown'>
                    <p className='navTitles'>Sale</p>
                    <div className='sale-dropContent' >
                        <div className='sale-items'>
                            <h4>Men's Sale</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 8409)}>Men Sale </p>
                                <p onClick={(event) => onSearch(event, 6993)}>New-in-clothing </p>
                                <p onClick={(event) => onSearch(event, 25997)}>Plus Size </p>
                                <p onClick={(event) => onSearch(event, 5678)}>Suits </p>
                                <p onClick={(event) => onSearch(event, 3602)}>Shirts </p>
                                <p onClick={(event) => onSearch(event, 5668)}>Hoodies & Sweatshirt </p>
                                <p onClick={(event) => onSearch(event, 7617)}>Sweaters & Cardigans </p>
                                <p onClick={(event) => onSearch(event, 3606)}>Jackets & Coats </p>
                                <p onClick={(event) => onSearch(event, 4910)}>Pants </p>
                                <p onClick={(event) => onSearch(event, 7078)}>Shorts </p>
                                <p onClick={(event) => onSearch(event, 4208)}>Jeans </p>
                                <p onClick={(event) => onSearch(event, 16329)}>Underwear & Socks </p>
                                <p onClick={(event) => onSearch(event, 26090)}>Activewear </p>
                                <p onClick={(event) => onSearch(event, 18797)}>Loungewear </p>
                                <p onClick={(event) => onSearch(event, 13210)}>Swimwear </p>
                            </div>
                        </div>

                        <div className='sale-items'>
                            <h4>Women's Sale</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 6993)}>New-in-clothing </p>
                                <p onClick={(event) => onSearch(event, 25997)}>Plus Size </p>
                                <p onClick={(event) => onSearch(event, 5678)}>Suits </p>
                                <p onClick={(event) => onSearch(event, 3602)}>Shirts </p>
                                <p onClick={(event) => onSearch(event, 20580)}>Hoodies & Sweatshirt </p>
                                <p onClick={(event) => onSearch(event, 7617)}>Sweaters & Cardigans </p>
                                <p onClick={(event) => onSearch(event, 3606)}>Jackets & Coats </p>
                                <p onClick={(event) => onSearch(event, 4910)}>Pants </p>
                                <p onClick={(event) => onSearch(event, 7078)}>Shorts </p>
                                <p onClick={(event) => onSearch(event, 4208)}>Jeans </p>
                                <p onClick={(event) => onSearch(event, 16329)}>Underwear & Socks </p>
                                <p onClick={(event) => onSearch(event, 26090)}>Activewear </p>
                                <p onClick={(event) => onSearch(event, 18797)}>Loungewear </p>
                                <p onClick={(event) => onSearch(event, 13210)}>Swimwear </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}
