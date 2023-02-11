import React, { useState, useContext } from 'react'
import "../styles/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext'

//Displays navbar
export default function Navbar() {

    let params = (new URL(document.location)).searchParams; //recieves url
    let searchUrl = params.get('name'); //stores movieTitle value from url
    const [searchVal, setSearchVal] = useState(searchUrl)
    const navigate = useNavigate()
    const { user, dispatch } = useContext(AuthContext)

    //Redirects page to search results page
    function onSearch(event, categoryId) {
        if (event.key === "Enter" || event.type === "click") {
            navigate("/search?name="+searchVal, {state: {searchVal, category: categoryId}});
        }
    }

    //For logged in users, capitalizes the name shown in navbar
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    //Logs the user out
    function handleLogout(){
        localStorage.removeItem("user");
        dispatch({type: "logout"})
        navigate("/")
    }

    //Navigates user to login page
    function handleLogin(){
        if (user == null) navigate("/login")
    }


    return (
    <div className="header">
            <div className="container">

                {/* Account Navigation */}
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
 
                 {/* View Bag Navigation */}
                <div className='containerItem' onClick={() => navigate("/viewBag")}>
                    <FontAwesomeIcon icon={faShoppingBag} inverse className='icon'/>
                    Bag
                </div>

                {/* Search Navigation */}
                <div className='search'>
                    <input onKeyDown={onSearch} value={searchVal || ""} className="input" id="searchInput" type="text" onChange={(e) => setSearchVal(e.target.value)} />
                    <FontAwesomeIcon onClick={onSearch} icon={faMagnifyingGlass} inverse id='magnifying'/>
                </div>
            </div>


        <div className='container2'>

            {/* ShopMe Logo */}
            <div className='titleContainer'>
                <Link id="title" to="/">Shop Me</Link>
            </div>

            {/* Men, Women, & Sale Dropdown Menu */}

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
                                <p onClick={(event) => onSearch(event, 27111)}>Designer</p>
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
                                <p onClick={(event) => onSearch(event, 2623)}>New-in-clothing </p>
                                <p onClick={(event) => onSearch(event, 9577)}>Plus Size </p>
                                <p onClick={(event) => onSearch(event, 8799)}>Dresses </p>
                                <p onClick={(event) => onSearch(event, 4169)}>Shirts </p>
                                <p onClick={(event) => onSearch(event, 11321)}>Hoodies & Sweatshirt </p>
                                <p onClick={(event) => onSearch(event, 2637)}>Sweaters & Cardigans </p>
                                <p onClick={(event) => onSearch(event, 2641)}>Jackets & Coats </p>
                                <p onClick={(event) => onSearch(event, 2640)}>Pants </p>
                                <p onClick={(event) => onSearch(event, 9263)}>Shorts </p>
                                <p onClick={(event) => onSearch(event, 3630)}>Jeans </p>
                                <p onClick={(event) => onSearch(event, 7657)}>Socks & Tights</p>
                                <p onClick={(event) => onSearch(event, 26091)}>Activewear </p>
                                <p onClick={(event) => onSearch(event, 21867)}>Loungewear </p>
                                <p onClick={(event) => onSearch(event, 2238)}>Swimwear </p>
                            </div>
                        </div>

                        <div>
                            <h4>Women's Shoes</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 6992)}>New-in-shoes </p>
                                <p onClick={(event) => onSearch(event, 4172)}>Shoes, Boots, & Sneakers </p>
                                <p onClick={(event) => onSearch(event, 13692)}>Loafers </p>
                                <p onClick={(event) => onSearch(event, 6456)}>Sneakers </p>
                                <p onClick={(event) => onSearch(event, 6461)}>Heels </p>
                                <p onClick={(event) => onSearch(event, 6455)}>Boots </p>
                            </div>
                        </div>

                        <div>
                            <h4>Bags & Accessories</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 4174)}>All Accessories </p>
                                <p onClick={(event) => onSearch(event, 8730)}>Bags & Wallets </p>
                                <p onClick={(event) => onSearch(event, 27109)}>New-in-accessories </p>
                                <p onClick={(event) => onSearch(event, 4175)}>Jewelry </p>
                                <p onClick={(event) => onSearch(event, 4545)}>Sunglasses </p>
                                <p onClick={(event) => onSearch(event, 5088)}>Watches </p>
                            </div>
                        </div>

                        <div>
                            <h4>Face & Body</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 2426)}>New-in-face-body </p>
                                <p onClick={(event) => onSearch(event, 50349)}>Face & Body </p>
                                <p onClick={(event) => onSearch(event, 5021)}>Haircare </p>
                                <p onClick={(event) => onSearch(event, 5020)}>Makeup </p>
                            </div>
                        </div>

                        <div>
                            <h4>Brands</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 25001)}>Designer</p>
                                <p onClick={(event) => onSearch(event, 29299)}>Topshop </p>
                                <p onClick={(event) => onSearch(event, 5906)}>Adidas </p>
                                <p onClick={(event) => onSearch(event, 2611)}>Converse </p>
                                <p onClick={(event) => onSearch(event, 4650)}>Dr Martens </p>
                                <p onClick={(event) => onSearch(event, 10795)}>Timberland </p>
                                <p onClick={(event) => onSearch(event, 21378)}>Tommy Hilfiger </p>
                                <p onClick={(event) => onSearch(event, 5897)}>Nike </p>
                                <p onClick={(event) => onSearch(event, 19899)}>The North Face </p>
                                <p onClick={(event) => onSearch(event, 26543)}>Bershka </p>
                                <p onClick={(event) => onSearch(event, 20848)}>Polo Ralph Lauren </p>
                                <p onClick={(event) => onSearch(event, 4763)}>Rayban </p>
                                <p onClick={(event) => onSearch(event, 12949)}>Abercrombie and Fitch </p>
                                <p onClick={(event) => onSearch(event, 10597)}>Reclaimed Vintage </p>
                                <p onClick={(event) => onSearch(event, 7083)}>Levis </p>
                            </div>
                        </div>

                        <div>
                            <h4>Gifts</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 27400)}>Gifts </p>
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
                                <p onClick={(event) => onSearch(event, 26658)}>Plus Size </p>
                                <p onClick={(event) => onSearch(event, 8134)}>Suits </p>
                                <p onClick={(event) => onSearch(event, 3136)}>Shirts </p>
                                <p onClick={(event) => onSearch(event, 12418)}>Hoodies & Sweatshirt </p>
                                <p onClick={(event) => onSearch(event, 3137)}>Sweaters & Cardigans </p>
                                <p onClick={(event) => onSearch(event, 2112)}>Jackets & Coats </p>
                                <p onClick={(event) => onSearch(event, 12421)}>Pants </p>
                                <p onClick={(event) => onSearch(event, 5231)}>Shorts </p>
                                <p onClick={(event) => onSearch(event, 5230)}>Jeans </p>
                                <p onClick={(event) => onSearch(event, 3764)}>Underwear & Socks </p>
                                <p onClick={(event) => onSearch(event, 26954)}>Activewear </p>
                                <p onClick={(event) => onSearch(event, 11413)}>Loungewear </p>
                                <p onClick={(event) => onSearch(event, 13233)}>Swimwear </p>
                            </div>
                        </div>

                        <div className='sale-items'>
                            <h4>Women's Sale</h4>
                            <div className='pointer'>
                                <p onClick={(event) => onSearch(event, 7046)}>Women Sale </p>
                                <p onClick={(event) => onSearch(event, 10528)}>Plus Size </p>
                                <p onClick={(event) => onSearch(event, 5235)}>Dresses </p>
                                <p onClick={(event) => onSearch(event, 4167)}>Shirts </p>
                                <p onClick={(event) => onSearch(event, 20580)}>Hoodies & Sweatshirt </p>
                                <p onClick={(event) => onSearch(event, 2110)}>Jackets & Coats </p>
                                <p onClick={(event) => onSearch(event, 2110)}>Jackets & Coats </p>
                                <p onClick={(event) => onSearch(event, 1928)}>Pants </p>
                                <p onClick={(event) => onSearch(event, 12413)}>Shorts </p>
                                <p onClick={(event) => onSearch(event, 4331)}>Jeans </p>
                                <p onClick={(event) => onSearch(event, 10517)}>Socks & Tights </p>
                                <p onClick={(event) => onSearch(event, 26953)}>Activewear </p>
                                <p onClick={(event) => onSearch(event, 50067)}>Loungewear </p>
                                <p onClick={(event) => onSearch(event, 5263)}>Swimwear </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}
