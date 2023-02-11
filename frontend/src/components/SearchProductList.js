import React, { useContext } from 'react'
import { SearchContext } from '../Contexts/SearchContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

export default function SearchProductList() {

  const navigate = useNavigate()
  const {fetchedData, setProperties, properties, loading, currentPage, setCurrentPage} = useContext(SearchContext) //Makes api calls
  const maxPage = Math.ceil(fetchedData.itemCount / 48)  //Finds max number of pages
  let arr = Array.from({length: maxPage}, (_, i) => i + 1) 

  //Lists product items in grid
  const productItems = (product, i) => {
      return <div key={i} className='grid-item'>
                <img id={product.id} src={`https://${product.imageUrl}`} alt={product.name} onClick={() => navigate("/itemDetails", {state: {id: product.id}})} />
                <p className="link" id={product.id} onClick={() => navigate("/itemDetails", {state: {id: product.id}})}>{product.name}</p>
                { product.price.isMarkedDown === true ? 
                    <>
                        <p className='crossedText'>${product.price.previous.value}</p>   
                        <p>{product.price.current.text}</p>   
                    </>
                    :
                    <p className='bold'>{product.price.current.text}</p>   
                }

             </div>
    }

    // Toggles between hiding and showing the dropdown content 
    function showDropdown(x) {
      document.getElementById(x).classList.toggle("show");
    }

    // Closes the sort dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.page-dropBtn')) {
        var dropdowns = document.getElementsByClassName("page-dropContent");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }

    //Creates page nums in page dropdown
    const getPageNums = (num) => {
      return <p onClick={() => handleOffset(num)} key={num + 1000}>{num}</p>
    }

    //Sets offset variable to grab more product items in api call
    function handleOffset(pageNum){
      let x = 48 * (pageNum - 1)
      if (properties.offset !== x){
        setCurrentPage(pageNum)
        setProperties((prop) => {return ({...prop, offset: x})})
      }

    }

    //Handles left and right arrows to move to or back a page
    function changePage(action) {
      let offset = 0

      if(action === "prev"){
        offset = properties.offset - 48
        offset = offset < 0 ? 0 : offset
        setCurrentPage((curr) => curr -= 1)
      }
      else {
        offset = properties.offset + 48
        setCurrentPage((curr) => curr += 1)
      }

      setProperties((prop) => {return ({...prop, offset: offset})})
    }


  return (
    <div>
      
        {/* Grid display of products */}
        <div className='grid-container'>
            {fetchedData.products !== undefined ? fetchedData.products.map(productItems) : <></> }
        </div>
        
        {/* Page Dropdown */}
        { !loading && fetchedData.itemCount > 0 && 
          <div className='page-container'>
           {properties.offset > 1 && <FontAwesomeIcon icon={faAngleLeft} className='arrow' onClick={() => changePage("prev")} size="xl"/>}
            <div className='page-dropdown'>
              <button className='page-dropBtn' onClick={() => showDropdown("page")}>{currentPage} of {maxPage}</button>
              <div id="page" className='page-dropContent'>
                  {arr.length > 0 && arr.map(getPageNums)}
              </div>  
            </div>
            {maxPage !== currentPage && <FontAwesomeIcon icon={faAngleRight} className='arrow 'onClick={() => changePage("next")} size="xl"/>}
          </div>
        }

    </div>
  )
}
