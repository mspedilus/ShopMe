import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import "../styles/search.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer'
import { data, fullData } from "../components/dummyData"
import PriceOption from '../components/PriceOption'
import useFetch from '../components/useFetch'
import { useLocation } from 'react-router-dom'
import Loading from '../components/Loading'

//Search Results Page
export default function Search() {

  const location = useLocation();
  const [sortOption, setSortOption] = useState("New Arrivals")
  const [properties, setProperties] = useState({brand: "", style: "", sort: "", leather: "", color: "", sale: "", category: location.state.category,
                                                type: "" , bodyFit: "", productName: location.state.searchVal , priceMin: "", priceMax: "", size: ""})

  const {fetchedData, loading, error} = useFetch("http://localhost:8800/api/products", properties) //Performs api calls

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
                <img id={product.id} src={`https://${product.imageUrl}`} alt={product.name} />
                <p id={product.id}>{product.name}</p>
                { product.price.isMarkedDown === true ? 
                <>
                  <p className='crossedText'>${product.price.previous.value}</p>   
                  <p>{product.price.current.text}</p>   
                </>
                :
                <>
                  <p className='bold'>{product.price.current.text}</p>   
                </>
                }

             </div>
    }
    
  //Lists filter options in sidebar
  const filterOptions = (option, i) => {
    if(option.name === 'Price Range') return <PriceOption showDropdown={showDropdown} priceMin={properties.priceMin} priceMax={properties.priceMax} /> //Manually adds the Price filter option
    if(option.name === 'New in date') return //Skips the "New in date" filter option because it's not usable in the api
    if(option.name === 'Discount %') return //Skips the "Discount %" filter option because it's not usable in the api
    return <div key={i}>
              <button className="filterBtn" onClick={() => showDropdown(option.id)}>{option.name}</button>
              <div id={option.id} className="filter-dropContent">
                {option.facetValues.map(item => filterOptionItems(item, option.id))}
              </div>
           </div>
  }



  //Lists filter options items in sidebar
  const filterOptionItems = (item, i) => {
   // let isChecked = getCheckedBoxed(i, item.id)
    return <div className="filterItems" >
              <input className="checkbox" type="checkbox" value={item.id} id={i} name={i}/>
              <label htmlFor={item.name}>{item.name}</label>
           </div>
  }


  function getCheckedBoxed () {
    var checkboxes = document.getElementsByClassName("checkbox");

    if (fetchedData.facets === undefined) return
     //Formatting to use in api call
    var brand = properties.brand.split(",")
    var style = properties.style.split(",")
    var leather = properties.leather.split(",")
    var color = properties.color.split(",")
    var sale = properties.sale.split(",")
    var type = properties.type.split(",")
    var bodyFit = properties.bodyFit.split(",")
    var size = properties.size.split(",")

    for(let i = 0; i < checkboxes.length; i++){
        if(brand !== "") if(checkboxes[i].name === "brand" && brand.includes(checkboxes[i].value)) checkboxes[i].checked = true
        else if(style !== "") if(checkboxes[i].name === "attribute_1046" && style.includes(checkboxes[i].value)) checkboxes[i].checked = true
        else if(leather !== "") if(checkboxes[i].name === "attribute_10147" && leather.includes(checkboxes[i].value)) checkboxes[i].checked = true
        else if(color !== "") if(checkboxes[i].name === "base_colour" && color.includes(checkboxes[i].value)) checkboxes[i].checked = true
        else if(sale !== "") if(checkboxes[i].name === "range" && sale.includes(checkboxes[i].value)) checkboxes[i].checked = true //Doesn't work
        else if(type !== "") if(checkboxes[i].name === "attribute_1047" && type.includes(checkboxes[i].value)) checkboxes[i].checked = true
        else if(bodyFit !== "") if(checkboxes[i].name === "attribute_10155" && bodyFit.includes(checkboxes[i].value)) checkboxes[i].checked = true
        else if(size !== "") if(checkboxes[i].name === "size" && size.includes(checkboxes[i].value)) checkboxes[i].checked = true
    }
  }




  //Gets and stores all checked/filled box values 
  function onUpdate() {
    var checkboxes = document.getElementsByClassName("checkbox");

    var brand = []
    var style = [] //attribute_1046
    var priceMin = 0
    var priceMax = ""
    var leather = [] //attribute_10147
    var color = [] //base_colour
    var sale = [] //range
    var type = [] //attribute_1047
    var bodyFit = [] //attribute_10155
    var size = []

    if(document.getElementById("priceMin").value !== priceMin && document.getElementById("priceMin").value !== "") priceMin = document.getElementById("priceMin").value
    if(document.getElementById("priceMax").value !== priceMax  && document.getElementById("priceMax").value !== "") priceMax = document.getElementById("priceMax").value

    for(let i = 0; i < checkboxes.length; i++){
      if(checkboxes[i].checked){
        if(checkboxes[i].id === "brand") brand.push(checkboxes[i].value)
        else if(checkboxes[i].id === "attribute_1046") style.push(checkboxes[i].value)
        else if(checkboxes[i].id === "priceMin") priceMin.push(checkboxes[i].value)
        else if(checkboxes[i].id === "priceMax") priceMax.push(checkboxes[i].value)
        else if(checkboxes[i].id === "attribute_10147") leather.push(checkboxes[i].value)
        else if(checkboxes[i].id === "base_colour") color.push(checkboxes[i].value)
        else if(checkboxes[i].id === "range") sale.push(checkboxes[i].value)
        else if(checkboxes[i].id === "attribute_1047") type.push(checkboxes[i].value)
        else if(checkboxes[i].id === "attribute_10155") bodyFit.push(checkboxes[i].value)
        else if(checkboxes[i].id === "size") size.push(checkboxes[i].value)
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
    size = size.toString()

    //Ensures price range is valid
    if(priceMax < priceMin ) alert("Please enter a price range from 1 to 9999")
    else {
      if(priceMin === "" && priceMax !== "") priceMin = 0
      setProperties((prev) => { return ({...prev, brand: brand, style: style, leather: leather, 
                                            color: color, sale: sale, type: type, bodyFit: bodyFit, 
                                            priceMin: priceMin, priceMax: priceMax, size: size })} )
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

  console.log("fetched", fetchedData)
  console.log("prop", properties)
  if(fetchedData.facets.length > 0 ) getCheckedBoxed()

  // return (
  //   <div className='search-container'>
  //     <Navbar />

  //       {/* Top bar */}
  //       <div className='search-top'>
  //         <p>We found {data.length} items you might like for {fetchedData.productName}</p>
  //         <div className="sort-dropdown">
  //           <button onClick={() => showDropdown("sort")} className="sort-dropBtn" >{sortOption} &emsp; <FontAwesomeIcon icon={faAngleDown} className='unclickable'/></button>
  //           <div id="sort" className="sort-dropContent">
  //             <p onClick={() => handleSort("freshness")} >New Arrivals</p>
  //             <p onClick={() => handleSort("priceasc")} >Price: Low to High</p>
  //             <p onClick={() => handleSort("pricedesc")} >Price: High to Low</p>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Sidebar */}
  //       <div className='results-container'>
  //         <div className='sidebar'>
  //           <div>
  //             {fullData.facets.map(filterOptions)}
  //             <button className="updateBtn" onClick={onUpdate}>Update</button>
  //           </div>
  //         </div>

  //         {/* Grid display of products */}
  //         <div className='grid-container'>
  //             {data.map(productItems)}
  //         </div>
  //       </div>
        
  //       <Footer />
  //   </div>
  // )

  return (
    <div className='search-container'>
      <Navbar />

        {/* Top bar */}
        <div className='search-top'>
          <p>We found {fetchedData.itemCount || "0"} items you might like for {properties.productName}</p>
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
        {loading ? <Loading /> :
                <div className='results-container'>
                  <div className='sidebar'>
                    <div>
                      {fetchedData.facets !== undefined  ? fetchedData.facets.map(filterOptions) : <></>}
                      {fetchedData.facets && <button className="updateBtn" onClick={onUpdate}>Update</button>}
                    </div>
                  </div>
        
                  {/* Grid display of products */}
                  <div className='grid-container'>
                      {fetchedData.products !== undefined ? fetchedData.products.map(productItems) : <></> }
                  </div>
              </div>
        }
        <Footer />
    </div>
  )

}
