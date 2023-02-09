import "../styles/itemDetails.css"
import React, { useState } from 'react'
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import useFetch from '../components/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faTruckFast, faBox, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'

//Displays the product details page
export default function ItemDetails() {

  const navigate = useNavigate()
  const location = useLocation();
  const [properties] = useState({id: location.state.id})
  const { fetchedData, loading } = useFetch("http://localhost:8800/api/products/details", properties) //Performs api calls
  const [size, setSize] = useState("")
  const [bagItems, setBagItems] = useState(JSON.parse(localStorage.getItem("bag")))

  //Turns the fetchedData string into usable html
  var stringToHTML = function (str, id) {
    //str = str.replace(/<br>/gi, "<br/>")
    var dom = document.getElementById(id)
    dom.innerHTML = str;
  };

  // Closes the size & modal dropdown menu if the user clicks outside of it
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
    if (event.target.matches('.modal-container') || event.target.matches(".keep-shopping-btn")) {
      var modal = document.getElementById("modal-container");
      modal.classList.remove('show');
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

  //Shows pop up message and adds item to bag
  function addToBagClick() {

    if (size === ""){
      alert("Select a size")
      return
    }

    document.getElementById("modal-container").classList.add("show");

    var itemInBag = false
    var index = 0;

    //Checks to see if item is already in bag
    for(let x = 0; x < bagItems.length; x++){
      if(Object.values(bagItems[x]).indexOf(fetchedData.id) >= 0 && bagItems[x].size === size){
        itemInBag = true
        index = x
        break
      }
    }


    if (itemInBag) { //If item is already in bag increase the quantity by 1
      let newArr = bagItems
      newArr[index] = {...newArr[index], quantity: newArr[index].quantity += 1}
      setBagItems(newArr)
      localStorage.setItem("bag", JSON.stringify(newArr))
    }
    else{ //Else Add item to bag
      const newBag = [...bagItems, { brand: fetchedData.brand.name, name: fetchedData.name, quantity: 1,
                                     color: fetchedData.media.images[0].colour, size: size, 
                                     price: fetchedData.price.current.value, id: fetchedData.id, 
                                     imgUrl: `https://${fetchedData.media.images[0].url}`} ]
      setBagItems(newBag)
      console.log(newBag)
      localStorage.setItem("bag", JSON.stringify(newBag))
    }

  }


  return (
    <div>
      <Navbar />
      {loading ? <Loading /> : 
      fetchedData.media &&
      <div className='detail-grid'>


        {/* Product Images */}
        <div className='img-previews'>
          {fetchedData.media !== undefined && fetchedData.media.images.map(getPrevewImgs)}
        </div>


         {/* Product Info */}
        <div className='product-details'>
          <h2>{fetchedData.media !== undefined && fetchedData.name}</h2>
          <p className='detail-text'>{fetchedData.media !== undefined && fetchedData.price.current.text} 
                                     {fetchedData.media !== undefined && fetchedData.price.isMarkedDown && 
                                     <span className='markedDown'>{fetchedData.media !== undefined && fetchedData.price.previous.text}</span>}
          </p>
          <p><span className='detail-text'>Color:</span> {fetchedData.media !== undefined && fetchedData.media.images[0].colour}</p>
          
          <div className='size-dropdown'>
            <button className='size-dropBtn' onClick={() => showDropdown("size-drop")}>{size || "Please Select"}<FontAwesomeIcon icon={faAngleDown} className='unclickable right'/></button>
            <div id="size-drop" className='size-dropContent'>
                {fetchedData.media !== undefined && fetchedData.variants.map(getSize)}
            </div>
          </div>
          <button className='addToBagBtn' disabled={loading} onClick={addToBagClick}>ADD TO BAG</button>
          
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
        

        {/*Pop up Container*/}
        <div className="modal-container" id="modal-container">
          <div className="modal">
          <h2>Added to your bag</h2>
            <div className="modal-items">
                <img src={`https://${fetchedData.media.images[0].url}`} alt={fetchedData.name} />
                <div className="modal-details">
                  <p>{fetchedData.brand.name}</p>
                  <p>{fetchedData.name}</p>
                  <p>Color: {fetchedData.media.images[0].colour}</p>
                  <p>Size: {size}</p>
                  <p>Price: {fetchedData.price.current.text}</p>
                </div>
            </div>
            <div className="modal-buttons">
              <button className="keep-shopping-btn">Keep Shopping</button>
              <button onClick={() => navigate("/viewBag")}>View Bag</button>
            </div>
          </div>
        </div>
      </div>
      }
    <Footer />


    {/* Converts proudct info from string to HTML */}
    {document.getElementById("product-details") !== null && fetchedData.id !== undefined && stringToHTML(fetchedData.description, "product-details")}
    {document.getElementById("about") !== null && fetchedData.id !== undefined && stringToHTML(fetchedData.info.aboutMe, "about")}
    {document.getElementById("sizeFit") !== null && fetchedData.id !== undefined && stringToHTML(fetchedData.info.sizeAndFit, "sizeFit")}
    {document.getElementById("care") !== null && fetchedData.id !== undefined && stringToHTML(fetchedData.info.careInfo, "care")}

    </div>
  )
}
