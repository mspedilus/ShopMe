import React, {useEffect} from 'react'
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
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

//Homepage
export default function Home() {

  useEffect(() => {
    //const interval = setInterval(slideShow, 9000, 1)   //Creates automatic slideshow

   // return () => clearInterval(interval);
  }, []);


  //Performs left and right arrow action to switch photos in slideshow
  function slideShow(n) {
    let slideNum

    if(window.location.href === "http://localhost:3000/"){
      slideNum = 1 + n
    } else{
      slideNum = Number((window.location.href).slice(-1)) + n
    }

    if (slideNum > 4) slideNum = 1 //Resets to the first photo
    else if (slideNum < 1) slideNum = 4 //Resets to the last photo

    window.location.href = 'http://localhost:3000/#slide-' + slideNum;
  }


  return (
    <div >
      <Navbar />
      <div className='home'>
        <FontAwesomeIcon icon={faAngleLeft} className='icon' onClick={() => slideShow(-1)} size="2xl"/>
        <section className='banner'>
          <div className="slider-wrapper">
            <div className="slider">
              <img id="slide-1" className="mySlides" src={Header1} alt="3 Mmages of a woman posing" />
              <img id="slide-2" className="mySlides" src={Skincare} alt="Assortment of skin products" />
              <img id="slide-3" className="mySlides" src={Header2} alt="Man wearing a jacket with his hands stretched out " />
              <img id="slide-4" className="mySlides" src={Shoes} alt="Close up of a pair of shoes" />
            </div>
            <div className="slider-nav">
                <a href="#slide-1"> </a>
                <a href="#slide-2"> </a>
                <a href="#slide-3"> </a>
                <a href="#slide-4"> </a>
            </div>
          </div>
        </section>
        <FontAwesomeIcon icon={faAngleRight} className='icon 'onClick={() => slideShow(1)} size="2xl"/>
      </div>


      
      <section className="categories">
        <div className='firstRow'>
          <div div className='topCat'>
            <img src={Denim} className="top" alt="A man wearing a denim shirt and pants" />
            <h3>Denim With Love </h3> 
            <p> Meet our new ultra-flattering <br /> Slim Flare Jeans <br /> <a href=" " >Shop Now</a></p>
          </div>
          <div div className='topCat'>
            <img src={NewArrival} className="top" alt="Women wearing a denim shirt and pants" />
            <h3>New Arrivals</h3>
            <p>Consider this your <br /> New Year reset <br /> <a href=" " >Shop Now</a></p>
          </div>
        </div>

        <div className='secondRow'>
          <div className='botCat'>
            <img src={ActiveWear}  className="bot"alt="Women wearing a denim shirt and pants" />
            <h3>New Arrivals</h3>
            <p>Consider this your <br /> New Year reset <br /> <a href=" " >Shop Now</a></p>
          </div>
          <div className='botCat'  id="bags">
            <img src={Bags} className="bot" id="bagsPhoto" alt="Assortment of bags" />
            <h3>New Arrivals</h3>
            <p>Consider this your <br /> New Year reset <br /> <a href=" " >Shop Now</a></p>
          </div>
          <div className='botCat'>
            <img src={PlusSize} className="bot" alt="Women wearing a denim shirt and pants" />
            <h3>New Arrivals</h3>
            <p>Consider this your <br /> New Year reset <br /> <a href=" " >Shop Now</a></p>
          </div>
      </div>
      <h2>Shop By Brands</h2>

      <div className='thirdRow'>
        <img src={Adidas} alt="Adidas logo" />
        <img src={TommyHilfiger} alt="Tommy Hilfiger logo" />
        <img src={NorthFace} alt="North Face logo" />
        <img src={Abercrombie} alt="Levi's logo" />
        <img src={CalvinKlein} alt="Calvin Klein logo" />
      </div>
      <h2>Featured Fashionettes</h2>

      </section>
      




    
    <Footer />
    </div>
  )
}
