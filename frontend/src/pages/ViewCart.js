import React, { useState, useEffect } from 'react'
import "../styles/viewCart.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


export default function ViewCart() {
  const items = JSON.parse(localStorage.getItem("bag"))
  const [price, setPrice] = useState(0)



  const displayItems = (item, i) => {
    return(
      <div className="cart-items" key={i}>
          <img src={item.imgUrl} alt={item.name} />
          <div className="cart-details">
            <p>{item.brand}</p>
            <p>{item.name}</p>
            <p>Color: {item.color}</p>
            <p>Size: {item.size}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
      </div>
    )
  }

  useEffect(() => {
    var p = 0
    for(let x = 0; x < items.length; x++){
      p += items[x].price 
    }
    setPrice(p)
  }, [items])

  console.log(price)

  return (
    <>
    <Navbar />
    <div className='viewCart-container'>
      <div className="item-conatiner">
      <h1>Shopping Bag</h1>
      {items.map(displayItems)}
      </div>
      <div>
        <div className="checkout">
          <h2>Order Summary</h2>
          <p>Subtotal <span>${price.toFixed(2)}</span></p> 
          <p>Shipping <span>FREE</span></p>
          <p>Taxes <span>{(0.07 * price).toFixed(2)}</span></p>
          <p id="lastp">Total <span>{(price + (0.07 * price)).toFixed(2)}</span></p>
          <button>Checkout</button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
