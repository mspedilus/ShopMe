import "../styles/viewCart.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

//View Bag Page
export default function ViewCart() {
  const navigate = useNavigate()
  var items = JSON.parse(localStorage.getItem("bag")) //Retreives all items in bag from local storage
  const user = JSON.parse(localStorage.getItem("user"))
  const [bagItems, setBagItems] = useState(items)
  const [price, setPrice] = useState(0)
  const [bagCount, setBagCount] = useState(0)
  
  //Removes items from the shopping bag
  function handleDelete(i) {
    var newArr = [...bagItems]
    newArr.splice(i, 1)
    localStorage.setItem("bag", JSON.stringify(newArr))
    setBagItems(newArr)
  }

  //Increases or decreases the quantity of an item
  function handleQuantity(i, action) {
    var newArr = [...bagItems]
    if (action === "add"){
      newArr[i].quantity += 1
    }
    else{
      if (newArr[i].quantity !== 1){
        newArr[i].quantity -= 1
        setBagItems(newArr)
      }
    }
    localStorage.setItem("bag", JSON.stringify(newArr))
    setBagItems(newArr)
  }

  //Displays all items in the shopping bag
  const displayItems = (item, i) => {
    return(
      <div className="cart-items" key={item.id}>
          <img src={item.imgUrl} alt={item.name} onClick={() => navigate("/itemDetails", {state: {id: item.id}})}/>
          <div className="cart-details">
            <p><span className='bold link' onClick={() => navigate("/itemDetails", {state: {id: item.id}})}>{item.name}</span></p>
            <p><span className='bold'>Color: </span>{item.color}</p>
            <p><span className='bold'>Size: </span>{item.size}</p>
            <p><span className='bold'> Quantity: </span>
            <FontAwesomeIcon icon={faMinus}className='quantity' size="xs" onClick={() => handleQuantity(i, "subtract")} />
            {item.quantity}
            <FontAwesomeIcon icon={faPlus} className='quantity' size="xs" onClick={() => handleQuantity(i, "add")}/></p>
            <button onClick={() => handleDelete(i)}>Remove</button>
          </div>
          <p className='float'><span className='bold'>${(item.currPrice).toFixed(2)}</span> {item.prevPrice !== 0 && <span className='markedDown bold'>{item.prevPrice}</span>}</p>
      </div>
    )
  }

  //Calculates price and item count in bag
  useEffect(() => {
    if (bagItems !== null){

      var count = 0
      var p = 0
      for(let x = 0; x < bagItems.length; x++){
        p += bagItems[x].currPrice  * bagItems[x].quantity
        count += bagItems[x].quantity
      }

      setPrice(p)
      setBagCount(count)
    }
  }, [bagItems])

  //Adds item to mongodb & navigates to purchase history page
  async function handleCheckout() {
    if(!user){
      navigate("/login")
    }
    else if (bagItems !== null){
      document.getElementById("confirmation").classList.add("show")
      try{
        await axios.post("/products/addOrder", 
                         {userId: user._id, order: JSON.stringify(bagItems), itemCount: bagCount, 
                          totalPrice: (price + (0.07 * price)).toFixed(2) }) 
      }catch(err){
        alert("An error has occured. Please try again.")
        console.log("Error:", err)
      }
      
    //Clears item in bag and navigates to purchase history page
      setTimeout(() => {
        localStorage.removeItem("bag")
        navigate("/account") }, 3000 )
    }

  }


  return (
    <>
    <Navbar />
    <div className='viewCart-container'>

      {/* Shopping Bag */}
      <div className="item-conatiner">
        <h1>Shopping Bag</h1>
        <p id="itemCount">You have {bagItems !== null ? bagCount : 0} item(s) in your bag</p>
        {bagItems !== null ? bagItems.map(displayItems) : <div id="null"> </div>}
      </div>

      {/* Order Summary */}
      <div>
        <div className="checkout">
          <h2>Order Summary</h2>
          <p>Subtotal <span>${price.toFixed(2)}</span></p> 
          <p>Shipping <span>FREE</span></p>
          <p>Taxes <span>${(0.07 * price).toFixed(2)}</span></p>
          <p id="lastp"><span id="total">Total</span> <span>${(price + (0.07 * price)).toFixed(2)}</span></p>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>

    {/* Order Confirmation Modal */}
    <div className='checkout-confirmation' id="confirmation">
      <div className='checkout-msg'>
        <h1>Thank you for your order!</h1>
        <p>We appreciate your business</p>
      </div>
    </div>
    
    <Footer />
    </>
  )
}
