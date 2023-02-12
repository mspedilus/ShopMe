import React, { useContext, useState } from 'react'
import { SearchContext } from '../Contexts/SearchContext'
import PriceOption from './PriceOption'

//Displays sidebar in search page
export default function Sidebar() {

  const [searchResults, setSearchResults] = useState("")
  const {properties, setProperties, fetchedData, loading } = useContext(SearchContext)

  if (fetchedData !== "" && searchResults === ""){
    setSearchResults(fetchedData)
  }

  // Toggles between hiding and showing the dropdown content 
  function showDropdown(x) {
      document.getElementById(x).classList.toggle("show");
  }

  //Lists filter options in sidebar
  const filterOptions = (option, i) => {
  const allOptions = ["attribute_1046", "attribute_10147", "base_colour", "range", "attribute_1047", "attribute_10155", "brand", "size"]
  if(option.name === 'Price Range') return <PriceOption showDropdown={showDropdown} priceMin={properties.priceMin}  //Manually adds the Price filter option
                                                        priceMax={properties.priceMax} /> 
  if(allOptions.includes(option.id) !== true ) return //Skips all filter options that's not usable in the api

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
    var size = []


    for(let i = 0; i < checkboxes.length; i++){
      if(checkboxes[i].checked){
        if(checkboxes[i].id === "brand") brand.push(checkboxes[i].value)
        else if(checkboxes[i].id === "attribute_1046") style.push(checkboxes[i].value)
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
    if ((priceMax < priceMin) && priceMax !== "" ) alert("Please enter a price range from 1 to 99999")
    else {
      if(priceMin === "" && priceMax !== "") priceMin = 0
      setProperties((prev) => { return ({...prev, brand: brand, style: style, leather: leather, 
                                            color: color, sale: sale, type: type, bodyFit: bodyFit, 
                                            priceMin: priceMin, priceMax: priceMax, size: size })} )
    }

    window.scrollTo(0, 0); //Scrolls to top of page
  }


  return (
        <div>        
            <div className='results-container'>
              <div className='sidebar'>
                <div>
                  {searchResults && searchResults.products.length > 0 && searchResults.facets.map(filterOptions)}
                  {searchResults && searchResults.products.length > 0 && <button className="updateBtn" disabled={loading} onClick={onUpdate}>Update</button>}
                </div>
              </div>
            </div>
        </div>
  )
}
