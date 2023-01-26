import "../styles/itemDetails.css"
import React, { useState } from 'react'
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import useFetch from '../components/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faTruckFast, faBox, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'

//Displays the product details page
export default function ItemDetails() {

  const location = useLocation();
  const [properties] = useState({id: location.state.id})
  const { fetchedData, loading } = useFetch("http://localhost:8800/api/products/details", properties) //Performs api calls
  const [size, setSize] = useState("")

  //Turns the fetchedData string into usable html
  var stringToHTML = function (str, id) {
    //str = str.replace(/<br>/gi, "<br/>")
    var dom = document.getElementById(id)
    dom.innerHTML = str;
  };

  // Closes the size dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.size-dropBtn')) {
      var dropdowns = document.getElementsByClassName("size-dropContent");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  // Toggles between hiding and showing the dropdown content 
  function showDropdown(x) {
    document.getElementById(x).classList.toggle("show");
  }

  //Displays all product images
  const getPrevewImgs = (img, i) => {
    return (
      <img key={i} src={`https://${img.url}`} alt={fetchedData.name} />
    )
  }

  //Displays all product sizes
  const getSize = (size, i) => {
    return (
        <p onClick={() => setSize(size.brandSize)} key={i}>{size.brandSize}</p>
    )
  }


  return (
    <div>
      <Navbar />
      {loading ? <Loading /> : 
      <div className='detail-grid'>

        {/* Product Images */}
        <div className='img-previews'>
          {fetchedData.media !== undefined && fetchedData.media.images.map(getPrevewImgs)}
        </div>

         {/* Product Info */}
        <div className='product-details'>
          <h2>{fetchedData.media !== undefined && fetchedData.name}</h2>
          <p  className='detail-text'>{fetchedData.media !== undefined && fetchedData.price.current.text} {fetchedData.media !== undefined && fetchedData.price.isMarkedDown && <span className='markedDown'>{fetchedData.media!== undefined && fetchedData.price.previous.text}</span>}</p>
          <p><span className='detail-text'>Color:</span> {fetchedData.media !== undefined && fetchedData.media.images[0].colour}</p>
          
          <div className='size-dropdown'>
            <button className='size-dropBtn' onClick={() => showDropdown("size-drop")}>{size || "Please Select"}<FontAwesomeIcon icon={faAngleDown} className='unclickable right'/></button>
            <div id="size-drop" className='size-dropContent'>
                {fetchedData.media !== undefined && fetchedData.variants.map(getSize)}
            </div>
          </div>
          <button className='addToBagBtn'>ADD TO BAG</button>
          
          <div className='shipping-container'>
            <p><FontAwesomeIcon icon={faTruckFast} className='unclickable' /> Free Delivery.</p>
            <p><FontAwesomeIcon icon={faBox} className='fa-regular unclickable'/> Free Returns.</p>
          </div>

         {/* Dropdown Product Info */}
          <div className='product-dropdown'>
            <p className="product-dropBtn" id="product-dropBtn" onClick={() => showDropdown("product-drop")}>Product Details <FontAwesomeIcon icon={faPlus} className='unclickable right' /></p>
            <div id="product-drop" className='product-dropContent'>
                <div id="product-details"></div>
            </div>
          </div>
          
          <div className='product-dropdown'>
            <p className="product-dropBtn" onClick={() => showDropdown("about-drop")}>About Me<FontAwesomeIcon icon={faPlus} className='unclickable right' /></p>
            <div id="about-drop" className='about-dropContent'>
                <div id="about"></div>
            </div>
          </div>

          <div className='product-dropdown'>
            <p className="product-dropBtn" onClick={() => showDropdown("sizeFit-drop")}>Size & Fit<FontAwesomeIcon icon={faPlus} className='unclickable right' /></p>
            <div id="sizeFit-drop" className='sizeFit-dropContent'>
                <div id="sizeFit"></div>
            </div>
          </div>

          <div className='product-dropdown'>
            <p className="product-dropBtn" onClick={() => showDropdown("care-drop")}>Care Info<FontAwesomeIcon icon={faPlus} className='unclickable right' /></p>
            <div id="care-drop" className='care-dropContent'>
                <div id="care"></div>
            </div>
          </div>

          </div>

          <div>
            <h2>Customers also loved</h2>
          </div>

      </div>
      }
    <Footer />

    {document.getElementById("product-details") !== null && fetchedData.id !== undefined && stringToHTML(fetchedData.description, "product-details")}
    {document.getElementById("about") !== null && fetchedData.id !== undefined && stringToHTML(fetchedData.info.aboutMe, "about")}
    {document.getElementById("sizeFit") !== null && fetchedData.id !== undefined && stringToHTML(fetchedData.info.sizeAndFit, "sizeFit")}
    {document.getElementById("care") !== null && fetchedData.id !== undefined && stringToHTML(fetchedData.info.careInfo, "care")}

    </div>
  )
}
