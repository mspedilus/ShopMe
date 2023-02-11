import React, {useState, useContext} from 'react'
import { SearchContext } from '../Contexts/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';

//Displays top bar of search page
export default function SearchTopBar() {
  const location = useLocation()
  const {properties, setProperties, fetchedData} = useContext(SearchContext)
  const [sortOption, setSortOption] = useState("New Arrivals")

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
    <div>
        {/* Top bar in Search Page*/}
        <div className='search-top'>
            <p>We found {fetchedData.itemCount || "0"} items you might like for {location.state.searchVal}</p>
            { fetchedData.itemCount > 0 &&
            <div className="sort-dropdown">
                <button onClick={() => showDropdown("sort")} className="sort-dropBtn" >{sortOption} &emsp; <FontAwesomeIcon icon={faAngleDown} className='unclickable'/></button>
                <div id="sort" className="sort-dropContent">
                    <p onClick={() => handleSort("freshness")} >New Arrivals</p>
                    <p onClick={() => handleSort("priceasc")} >Price: Low to High</p>
                    <p onClick={() => handleSort("pricedesc")} >Price: High to Low</p>
                </div>
            </div>
            }
        </div>
    </div>
  )
}
