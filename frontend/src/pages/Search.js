import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import "../styles/search.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer'
import { data } from "../components/dummyData"
//import  from '../components/useFetch';

export default function Search() {
  const [sortOption, setSortOption] = useState("New Arrivals")
  console.log(data)

  const params = (new URL(document.location)).searchParams; //recieves url
  const [productName, setProductName] = useState( params.get('name')) //stores movieTitle value from url

  //const {data, loading, error, reFetchData} = useFetch("")

  //navigate("\path", {state: {variable, variable, varianble}}) 1:09 part 1
  

  /* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
  function myFunction() {
    document.getElementById("sort").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
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

  const productItems = (product, i) => {
      return <div key={i} className='grid-item'>
                <img src={`https://${product.imageUrl}`} alt={product.name} />
                <p>{product.name}</p>
                <p>{product.price.current.text}</p>
             </div>
    }
  
  const filterList = (option, i) => {
    return <div key={i}>

           </div>
  }

  return (
    <div className='search-container'>
      <Navbar />

        <div className='search-top'>
          <p>We found {data.length} items you might like for {productName}</p>
          <div className="sort-dropdown">
            <button onClick={myFunction} className="sort-dropBtn" >{sortOption} &emsp; <FontAwesomeIcon icon={faAngleDown} className='unclickable'/></button>
            <div id="sort" className="sort-dropContent">
              <a href="# ">New Arrivals</a>
              <a href="# ">Price: Low to High</a>
              <a href="# ">Price: High to Low</a>
            </div>
          </div>
        </div>

        <div className='results-container'>
          <div className='sidebar'>Sidebar</div>
          <div className='grid-container'>
              {data.map(productItems)}
          </div>
        </div>
        <Footer />
    </div>
  )
}
