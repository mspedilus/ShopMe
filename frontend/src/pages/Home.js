import React, { useEffect } from 'react'
import "../styles/home.css"
import Header1 from "../assets/header1.jpg"
import Header2 from "../assets/header2.jpg"
import Skincare from "../assets/skincare.jpg"
import Shoes from "../assets/shoes.jpg"
import Denim from "../assets/denim.jpg"
import NewArrival from "../assets/newArrivals.jpg"
import ActiveWear from "../assets/activeWear.jpg"
import PlusSize from "../assets/plusSize.jpg"
import Bags from "../assets/bags.jpg"

import Adidas from "../assets/adidas.png"
import CalvinKlein from "../assets/calvinKlein.jpeg"
import Abercrombie from "../assets/abercrombie.png"
import NorthFace from "../assets/northFace.jpg"
import TommyHilfiger from "../assets/tommyHilfiger.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

//Homepage
export default function Home() {
  var navigate = useNavigate()
  var slideIndex = 1;

  //Starts automatic slideshow
  useEffect(() => {
    const interval = setInterval(plusSlides, 9000, 1);
    showSlides(slideIndex);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  //Performs left and right arrow action to switch photos in the slideshow
  function plusSlides(n){
    if (n < 0){
      showSlides(slideIndex -= 1); 
    } else {
    showSlides(slideIndex += 1); 
    }
  }

  //Goes directly to the nth photo in the slideshow
  function currentSlide(n){
    showSlides(slideIndex = n);
  }

  //Shows or hides photos for slideshow effect
  function showSlides(n){
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].style.backgroundColor = "#bbb";
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].style.backgroundColor = "#252525";

  }

  function handleClick (categoryId) {
    navigate("/search?name=", {state: {searchVal: "", category: categoryId}});
  }


  return (
    <div >
      <Navbar />

      <div className='slideshow'>
        <FontAwesomeIcon icon={faAngleLeft} className='icon arrow' onClick={() => plusSlides(-1)} size="2xl"/>
        <div className="slideshow-inner">
          <div className="mySlides">
            <img className="slideImgs" src={Header1} alt="3 images of a woman posing" />
            <div className="text">Trendy And Affordable Fashion For Every Occasion</div>
          </div>

          <div className="mySlides">
            <img className="slideImgs" src={Skincare} alt="Assortment of skin products" />
            <div className="text">Find the best face and body products that works best for you</div>
          </div>      

          <div className="mySlides">
            <img className="slideImgs" src={Header2} alt="Man wearing a jacket with his hands stretched out " />
            <div className="text"> Wide selection of jackets to choose from</div>
          </div>      

          <div className="mySlides">
            <img className="slideImgs" src={Shoes} alt="Close up of a pair of shoes" />
            <div className="text">Shop the best deals on shoes</div>
          </div>
        </div>
        <FontAwesomeIcon icon={faAngleRight} className='icon arrow 'onClick={() => plusSlides(1)} size="2xl"/>
      </div>



    <div className='dotContainer'>
      <span className="dot" onClick={() => currentSlide(1)}></span>
      <span className="dot" onClick={() => currentSlide(2)}></span>
      <span className="dot" onClick={() => currentSlide(3)}></span>
      <span className="dot" onClick={() => currentSlide(4)}></span>
    </div>

      <section className="categories">
        <div className='firstRow'>
          <div className='topCat'>
            <img src={Denim} className="top" alt="A man wearing a denim shirt and pants" />
            <h3>Denim With Love</h3> 
            <p> Meet our new ultra-flattering <br /> Slim Flare Jeans <br /> <span onClick={() => handleClick(17102)} >Shop Now</span></p>
          </div>
          <div className='topCat'>
            <img src={NewArrival} className="top" alt="Women posing on a stair step" />
            <h3>New Arrivals</h3>
            <p>Consider this your <br /> New Year reset <br /> <span onClick={() => handleClick(27413)} >Shop Now</span></p>
          </div>
        </div>

        <div className='secondRow'>
          <div className='botCat'>
            <img src={ActiveWear}  className="bot"alt="Women posing in activewear" />
            <h3>Activewear</h3>
            <p>Affordable, high quality  <br /> And stylish workout clothes <br /> <span onClick={() => handleClick(26091)} >Shop Now</span></p>
          </div>
          <div className='botCat'  id="bags">
            <img src={Bags} className="bot" id="bagsPhoto" alt="Assortment of bags" />
            <h3>Bags & Travel</h3>
            <p> Shop hundreds of styles <br /> Purses, backpacks, and luggages <br /> <span onClick={() => handleClick(9265)} >Shop Now</span></p>
          </div>
          <div className='botCat'>
            <img src={PlusSize} className="bot" alt="A women wearing a denim shirt and pants" />
            <h3>Diverse Selection</h3>
            <p>The styles you love <br /> in the sizes you need <br /> <span onClick={() => handleClick(9577)} >Shop Now</span></p>
          </div>
      </div>
      <h2>Shop By Brands</h2>

      <div className='thirdRow'>
        <img onClick={() => handleClick(5906)} src={Adidas} alt="Adidas logo" />
        <img onClick={() => handleClick(5247)} src={TommyHilfiger} alt="Tommy Hilfiger logo" />
        <img onClick={() => handleClick(19899)} src={NorthFace} alt="North Face logo" />
        <img onClick={() => handleClick(4564)} src={Abercrombie} alt="Abercrombie logo" />
        <img onClick={() => handleClick(2038)} src={CalvinKlein} alt="Calvin Klein logo" />
      </div>
      <h2>Recommended For You</h2>
      </section>

    <Footer />
    </div>
  )
}
