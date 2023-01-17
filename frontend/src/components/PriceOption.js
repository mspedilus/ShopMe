import React from 'react'

//Price option filter for search page sidebar
export default function PriceOption(props) {
  return (
    <div>
        <button className="filterBtn" onClick={() => props.showDropdown("price")}>Price</button>
        <div id="price" className="filter-dropContent" >
            <input type="number" id="priceMin" min="0" placeholder='Min'/>to
            <input type="number" id="priceMax" min="0" max="9999" placeholder='Max'/>
        </div>
    </div>
  )
}
