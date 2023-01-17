import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import "../styles/search.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer'
import { data, fullData } from "../components/dummyData"
import PriceOption from '../components/PriceOption'
import useFetch from '../components/useFetch'
import { useLocation } from 'react-router-dom'


//Search Results Page
export default function Search() {

  const location = useLocation();
  const [sortOption, setSortOption] = useState("New Arrivals")
  const [properties, setProperties] = useState({brand: "", style: "", sort: "freshness", leather: "", color: "", sale: "", 
                                                type: "", bodyFit: "", productName: "" , priceMin: "", priceMax: ""})
  const {data2, loading, error} = useFetch("http://localhost:8800/api/products", properties) //Performs api calls

  //Gets search value 
  useEffect(() => {
    setProperties((prev) =>{ return( {...prev, "productName": location.state.searchVal})})
  }, [location.state.searchVal])

  // Toggles between hiding and showing the dropdown content 
  function showDropdown(x) {
    document.getElementById(x).classList.toggle("show");
  }

  // Closes the sort dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.sort-dropBtn')) {
      var dropdowns = document.getElementsByClassName("sort-dropContent");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  //Lists product items in grid
  const productItems = (product, i) => {
      return <div key={i} className='grid-item'>
                <img src={`https://${product.imageUrl}`} alt={product.name} />
                <p>{product.name}</p>
                <p>{product.price.current.text}</p>
             </div>
    }

  //Lists filter options in sidebar
  const filterOptions = (option, i) => {
    if(option.name === 'Price Range') return <PriceOption showDropdown={showDropdown} /> //Manually adds the Price filter option
    if(option.name === 'New in date') return //Removes the "New in date" filter option because it's not usable in the api
    if(option.name === 'Discount %') return //Removes the "Discount %" filter option because it's not usable in the api

    return <div key={option.id}>
              <button className="filterBtn" onClick={() => showDropdown(option.id)}>{option.name}</button>
              <div id={option.id} className="filter-dropContent">
                {option.facetValues.map(item => filterOptionItems(item, option.id))}
              </div>
           </div>
  }

  //Lists filter options items in sidebar
  const filterOptionItems = (item, i) => {
    return <div className="filterItems" key={item.id} >
              <input className="checkbox" type="checkbox" value={item.id} id={i} name={i} />
              <label htmlFor={item.name}>{item.name}</label>
           </div>
  }

  //Gets and stores all checked/filled box values 
  function onUpdate() {
    var checkboxes = document.getElementsByClassName("checkbox");

    var brand = []
    var style = [] //attribute_1046
    var priceMin = document.getElementById("priceMin").value
    var priceMax = document.getElementById("priceMax").value
    var leather = [] //attribute_10147
    var color = [] //base_colour
    var sale = [] //range
    var type = [] //attribute_1047
    var bodyFit = [] //attribute_10155


    for(let i = 0; i < checkboxes.length; i++){
      if(checkboxes[i].checked){
        if(checkboxes[i].id === "brand") brand.push(checkboxes[i].value)
        else if(checkboxes[i].id === "attribute_1046") style.push(checkboxes[i].value)
        else if(checkboxes[i].id === "priceMin") priceMin.push(checkboxes[i].value)
        else if(checkboxes[i].id === "priceMax") priceMax.push(checkboxes[i].value)
        else if(checkboxes[i].id === "leather") leather.push(checkboxes[i].value)
        else if(checkboxes[i].id === "base_colour") color.push(checkboxes[i].value)
        else if(checkboxes[i].id === "range") sale.push(checkboxes[i].value)
        else if(checkboxes[i].id === "attribute_1047") type.push(checkboxes[i].value)
        else if(checkboxes[i].id === "attribute_10155") bodyFit.push(checkboxes[i].value)
      }
    }

    //Formatting to use in api call
    brand = brand.toString()
    style = style.toString()
    leather = leather.toString()
    color = color.toString()
    sale = sale.toString()
    type = type.toString()
    bodyFit = bodyFit.toString()

    //Ensures price range is valid
    if(priceMax < 0 || priceMin < 0 || priceMax < priceMin) {
      alert("Please enter a price range from 1 to 9999")
    }
    else{
      setProperties((prev) => { return ({...prev, brand: brand, style: style, leather: leather, color: color, sale: sale,
        type: type, bodyFit: bodyFit, priceMin: priceMin, priceMax: priceMax })} )
    }

  }

  //Handles sorting option
  function handleSort(x) {
    if(x === "priceasc" && properties.sort !== x){
      setSortOption("Price: Low to High")
      setProperties((prev) => {return({...prev, sort: x})})
    }
    else if(x === "pricedesc" && properties.sort !== x) {
      setSortOption("Price: High to Low") 
      setProperties((prev) => {return({...prev, sort: x})})
    }
    else if(x === "freshness" && properties.sort !== x){
      setSortOption("New Arrivals")
      setProperties((prev) => {return({...prev, sort: x})})
    }
  }

  return (
    <div className='search-container'>
      <Navbar />

        {/* Top bar */}
        <div className='search-top'>
          <p>We found {data.length} items you might like for {properties.productName}</p>
          <div className="sort-dropdown">
            <button onClick={() => showDropdown("sort")} className="sort-dropBtn" >{sortOption} &emsp; <FontAwesomeIcon icon={faAngleDown} className='unclickable'/></button>
            <div id="sort" className="sort-dropContent">
              <p onClick={() => handleSort("freshness")} >New Arrivals</p>
              <p onClick={() => handleSort("priceasc")} >Price: Low to High</p>
              <p onClick={() => handleSort("pricedesc")} >Price: High to Low</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='results-container'>
          <div className='sidebar'>
            <div>
              {fullData.facets.map(filterOptions)}
              <button className="updateBtn" onClick={onUpdate}>Update</button>
            </div>
          </div>

          {/* Grid display of products */}
          <div className='grid-container'>
              {data.map(productItems)}
          </div>
        </div>
        
        <Footer />
    </div>
  )
}
