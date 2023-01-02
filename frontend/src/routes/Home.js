import React from 'react'
import "../styles/home.css"
import Header1 from "../assets/header1.jpg"
import Header2 from "../assets/header2.jpg"
import Header3 from "../assets/header3.jpg"
import Header4 from "../assets/header4.jpg"

import Navbar from '../components/Navbar'
export default function Home() {
  return (
    <div>
      <Navbar />
      <section className='banner'>
        <div className="slider-wrapper">
          <div className="slider">
            <img id="slide-1" src={Header1} alt="3 Mmages of a woman posing" />
            <img id="slide-2" src={Header2} alt="Man wearing a jacket with his hands stretched out " />
            <img id="slide-3" src={Header3} alt="Women in active wear posing" />
            <img id="slide-4" src={Header4} alt="Close up of a pair of shoes" />
          </div>
          <div className="slider-nav">
            <a href="#slide-1"> </a>
            <a href="#slide-2"> </a>
            <a href="#slide-3"> </a>
            <a href="#slide-4"> </a>
          </div>
        </div>
      </section>
    </div>
  )
}
