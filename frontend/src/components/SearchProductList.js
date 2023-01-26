import React, { useContext } from 'react'
import { SearchContext } from '../Contexts/SearchContext'
import { useNavigate } from 'react-router-dom'

export default function SearchProductList() {

  const {fetchedData} = useContext(SearchContext)
  const navigate = useNavigate()

  //Lists product items in grid
  const productItems = (product, i) => {
      return <div key={i} className='grid-item'>
                <img id={product.id} src={`https://${product.imageUrl}`} alt={product.name} onClick={() => navigate("/itemDetails", {state: {id: product.id}})} />
                <p id={product.id}>{product.name}</p>
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


  return (
    <div>
        {/* Grid display of products */}
        <div className='grid-container'>
            {fetchedData.products !== undefined ? fetchedData.products.map(productItems) : <></> }
        </div>
    </div>
  )
}
