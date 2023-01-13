import { React, useState } from 'react'
import "../styles/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [searchVal, setSearchVal] = useState("")

    const navigate = useNavigate()

    //Redirects page to search results page
    function onSearch(){
        navigate("/search?name="+searchVal);
    }

    function onMouseEvents (action) {
        if(action === "open_men") document.querySelector('.men-options').style.display = "flex"
        else if(action === "close_men") document.querySelector('.men-options').style.display = "none"
        else if (action === "open_women") document.querySelector('.women-options').style.display = "flex"
        else if(action === "close_women") document.querySelector('.women-options').style.display = "none"
        else if (action === "open_sale") document.querySelector('.sale-options').style.display = "flex"
        else if(action === "close_sale") document.querySelector('.sale-options').style.display = "none"
    }


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
                <input className="input" type="text" onChange={(e) => setSearchVal(e.target.value)} />
                <FontAwesomeIcon onClick={onSearch} icon={faMagnifyingGlass} inverse id='magnifying'/>
            </div>
        </div>
        <div className='container2'>
            <div id="title">Shop Me</div>
            <div className="nav">
                <p onMouseEnter={() => onMouseEvents("open_men")}
                   onMouseLeave={() => onMouseEvents("close_men")}>Men</p>
                <p onMouseEnter={() => onMouseEvents("open_women")}
                   onMouseLeave={() => onMouseEvents("close_women")}>Women</p>
                <p onMouseEnter={() => onMouseEvents("open_sale")}
                   onMouseLeave={() => onMouseEvents("close_sale")}>Sale</p>

            </div>
        </div>
 
        <div className='men-options'  onMouseEnter={() => onMouseEvents("open_men")}
                                      onMouseLeave={() => onMouseEvents("close_men")} >
            <div>
                <h4>Men's Clothing</h4>
                <p>New-in-clothing 6993</p>
                <p>Plus Size 25997</p>
                <p>Suits 5678</p>
                <p>Shirts 3602</p>
                <p>Hoodies & Sweatshirt 5668</p>
                <p>Sweaters & Cardigans 7617</p>
                <p>Jackets & Coats 3606</p>
                <p>Pants 4910</p>
                <p>Shorts 7078</p>
                <p>Jeans 4208</p>
                <p>Underwear & Socks 16329</p>
                <p>Activewear 26090</p>
                <p>Loungewear 18797</p>
                <p>Swimwear 13210</p>
            </div>

            <div>
                <h4>Men's Shoes</h4>
                <p>New-in-shoes 17184</p>
                <p>Shoes, Boots, & Sneakers 4209</p>
                <p>Loafers 11247</p>
                <p>Sneakers 5775</p>
                <p>Sliders & Flip Flops 17514</p>
                <p>Boots 5774</p>
            </div>

            <div>
                <h4>Bags & Accessories</h4>
                <p>New-in-accessories 27112</p>
                <p>All Accessories 4210</p>
                <p>All Bags 9265</p>
                <p>Jewelry 5034</p>
                <p>Sunglasses 6519</p>
                <p>Watches 19855</p>
            </div>

            <div>
                <h4>Face & Body</h4>
                <p>New-in-face-body 27140</p>
                <p>Face & Body 19517</p>
                <p>Haircare 27143</p>
                <p>Makeup 27149</p>
            </div>

            <div>
                <h4>Brands</h4>
                <p>Designer Brands 27111</p>
                <p>Topman 29065</p>
                <p>Adidas 7113</p>
                <p>Converse 2084</p>
                <p>Dr Martens 4747</p>
                <p>Timberland 7277</p>
                <p>Tommy Hilfiger 5247</p>
                <p>Nike 4766</p>
                <p>The North Face 5715</p>
                <p>Casio 3735</p>
                <p>Polo Ralph Lauren 4280</p>
                <p>Rayban 4497</p>
                <p>Abercrombie and Fitch 19971</p>
                <p>Reclaimed Vintage 11248</p>
                <p>Levis 4564</p>
            </div>

            <div>
                <h4>Gifts</h4>
                <p>gifts 16091</p>
            </div>
        </div>


        <div className='women-options'  onMouseEnter={() => onMouseEvents("open_women")}
                                      onMouseLeave={() => onMouseEvents("close_women")} >
            <div>
                <h4>Women's Clothing</h4>
                <p>New-in-clothing 6993</p>
                <p>Plus Size 25997</p>
                <p>Suits 5678</p>
                <p>Shirts 3602</p>
                <p>Hoodies & Sweatshirt 5668</p>
                <p>Sweaters & Cardigans 7617</p>
                <p>Jackets & Coats 3606</p>
                <p>Pants 4910</p>
                <p>Shorts 7078</p>
                <p>Jeans 4208</p>
                <p>Underwear & Socks 16329</p>
                <p>Activewear 26090</p>
                <p>Loungewear 18797</p>
                <p>Swimwear 13210</p>
            </div>

            <div>
                <h4>Women's Shoes</h4>
                <p>New-in-shoes 17184</p>
                <p>Shoes, Boots, & Sneakers 4209</p>
                <p>Loafers 11247</p>
                <p>Sneakers 5775</p>
                <p>Sliders & Flip Flops 17514</p>
                <p>Boots 5774</p>
            </div>

            <div>
                <h4>Bags & Accessories</h4>
                <p>New-in-accessories 27112</p>
                <p>All Accessories 4210</p>
                <p>All Bags 9265</p>
                <p>Jewelry 5034</p>
                <p>Sunglasses 6519</p>
                <p>Watches 19855</p>
            </div>

            <div>
                <h4>Face & Body</h4>
                <p>New-in-face-body 27140</p>
                <p>Face & Body 19517</p>
                <p>Haircare 27143</p>
                <p>Makeup 27149</p>
            </div>

            <div>
                <h4>Brands</h4>
                <p>Designer Brands 27111</p>
                <p>Topman 29065</p>
                <p>Adidas 7113</p>
                <p>Converse 2084</p>
                <p>Dr Martens 4747</p>
                <p>Timberland 7277</p>
                <p>Tommy Hilfiger 5247</p>
                <p>Nike 4766</p>
                <p>The North Face 5715</p>
                <p>Casio 3735</p>
                <p>Polo Ralph Lauren 4280</p>
                <p>Rayban 4497</p>
                <p>Abercrombie and Fitch 19971</p>
                <p>Reclaimed Vintage 11248</p>
                <p>Levis 4564</p>
            </div>

            <div>
                <h4>Gifts</h4>
                <p>gifts 16091</p>
            </div>
        </div>

        <div className='sale-options'  onMouseEnter={() => onMouseEvents("open_sale")}
                                      onMouseLeave={() => onMouseEvents("close_sale")} >
            <div className=''>
                <h4>Men's Sale</h4>
                <p>Men Sale 8409</p>
                <p>New-in-clothing 6993</p>
                <p>Plus Size 25997</p>
                <p>Suits 5678</p>
                <p>Shirts 3602</p>
                <p>Hoodies & Sweatshirt 5668</p>
                <p>Sweaters & Cardigans 7617</p>
                <p>Jackets & Coats 3606</p>
                <p>Pants 4910</p>
                <p>Shorts 7078</p>
                <p>Jeans 4208</p>
                <p>Underwear & Socks 16329</p>
                <p>Activewear 26090</p>
                <p>Loungewear 18797</p>
                <p>Swimwear 13210</p>
            </div>

            <div className='sale-items'>
                <h4>Women's Sale</h4>
                <p>New-in-clothing 6993</p>
                <p>Plus Size 25997</p>
                <p>Suits 5678</p>
                <p>Shirts 3602</p>
                <p>Hoodies & Sweatshirt 5668</p>
                <p>Sweaters & Cardigans 7617</p>
                <p>Jackets & Coats 3606</p>
                <p>Pants 4910</p>
                <p>Shorts 7078</p>
                <p>Jeans 4208</p>
                <p>Underwear & Socks 16329</p>
                <p>Activewear 26090</p>
                <p>Loungewear 18797</p>
                <p>Swimwear 13210</p>
            </div>
      
        </div>


    </div>
  )
}
