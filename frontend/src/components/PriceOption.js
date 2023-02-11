import React, { useState } from 'react'

//Price option filter for search page sidebar
export default function PriceOption(props) {
  const [priceMin, setPriceMin] = useState(props.priceMin)
  const [priceMax, setPriceMax] = useState(props.priceMax)

  return (
    <div>
        <button className="filterBtn" onClick={() => props.showDropdown("price")}>Price</button>
        <div id="price" className="filter-dropContent" >
            <input type="number" value={priceMin} id="priceMin" min="0" placeholder='Min' onChange={(e) => setPriceMin(e.target.value)}/>to
            <input type="number" value={priceMax} id="priceMax" min="0" max="99999" placeholder='Max' onChange={(e) => setPriceMax(e.target.value)}/>
        </div>
    </div>
  )
}
