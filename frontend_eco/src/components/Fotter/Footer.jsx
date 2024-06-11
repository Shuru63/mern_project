import React from 'react'
import playStore from "../../static_data/google.png";
import appStore from "../../static_data/paypal.png";
import './Footer.css'
const Footer = () => {
  return (
    <div>
       <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>SHURU.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Shubham kumar garg</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="">Instagram</a>
        <a href="">Youtube</a>
        <a href="">Facebook</a>
      </div>
    </footer>
    </div>
  )
}

export default Footer
