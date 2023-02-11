import React from 'react'
import "../styles/footer.css"
import USA from "../assets/US.gif"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faPinterest, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"


//Displays Footer
export default function Footer() {

    //Dispalys thank you message after filling out newsletter sign up
    function onNewsletterSignUp (e){
        e.preventDefault()
        document.getElementById("thankYouMsg").innerHTML = "Thank You!";
        document.getElementById("newsletter").style.display = "none";
    }
    
  return (

 <footer>

    {/* Left Hand Text */}
    <div className='footer'>
        <div>
            <h4>Customer Service</h4>
            <p>Contact Us<br />FAQs<br />Klarna<br />Order Lookup<br />Returns<br />Shipping & Delivery<br />United States</p>
        </div>
        <div>
            <h4>Customer Service</h4>
            <p>Contact Us<br />FAQs<br />Klarna<br />Order Lookup<br />Returns<br />Shipping & Delivery<br />United States <img src={USA} alt="USA flag"></img></p>
        </div>
        <div>
            <h4>ShopMe's Credit Card</h4>
            <p>Apply for ShopMe's Credit Card<br />Cardholder Benefits<br />Gift Cards<br />Gift Card Balance<br />ShopMe's Card Services<br />Pay Your Credit Card Bill</p>
        </div>
        <div>
            <h4>Stores & Services</h4>
            <p>Catalogs<br />Curbside & In Store Pickup<br />Locations & Hours<br />ShopMe's App<br />ShopMe's Backstage<br />Personal Stylist<br />Store Events<br />Tell Us What You Think</p>
        </div>
        <div>
            <h4>ShopMe's Inc.</h4>
            <p>Corporate Sales<br />Corporate Site<br />Investors<br />International Wholesale & Sourcing<br />ShopMeJOBS<br />Mission Every One<br />Press Room<br />Site Map<br />Sustainability</p>
        </div>


        {/* Right Hand Text */}
        <div className="rightFooter"> 
            <div className="rightFooterItem">
                <h4>Be The First To Know With Our Emails</h4>
                <p>If texts are more your style, we can send those too</p>
                <p className="footerTitle underline" id="thankYouMsg"></p>
                <form id="newsletter" onSubmit={onNewsletterSignUp}>
                    <input type="email" className='footerInput' required />
                    <button className='footerBtn'>Sign Up</button>
                </form>


            </div>
            <div className="rightFooterItem">
                <h4 className="footerTitle">Open A ShopMe's Card & Get 20% Off</h4>
                <p>Today and tomorrow,* up to a total savings of $100 on your ShopMe's purchases over the 2 days. *Subject to credit approval. <span className="underline">Details.</span> <br /> <span className="underline">Apply now</span></p>
            </div>
            <div>
                <h4 className="footerTitle">Connect With Us</h4>
                <div>
                    <FontAwesomeIcon icon={faTwitter} className="icon"/>         
                    <FontAwesomeIcon icon={faFacebook} className="icon" />               
                    <FontAwesomeIcon icon={faInstagram} className="icon"/>               
                    <FontAwesomeIcon icon={faPinterest} className="icon" />               
                    <FontAwesomeIcon icon={faYoutube} className="icon" />          
                    <FontAwesomeIcon icon={faTiktok} className="icon" />               
                </div>
            </div>
        </div>
    </div>

    {/* Bottom Text */}
    <div className='footer2'>
        <p>Privacy Notice | Cookie Preferences | Interest Based Ads | CA Privacy Rights | Do Not Sell or Share My Personal Information | Legal Notice</p>
        <p>Customer Bill of Rights | CA Transparency in Supply Chains | Product Recalls | Pricing Policy | Essential Accessibility</p>
        <p>©2023 ShopMe Inc. All Rights Reserved.</p>
    </div>
 </footer>
    )
}
