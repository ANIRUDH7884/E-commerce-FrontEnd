import React from 'react'
import './Footer.css'
import  footer_logo from '../assets/logo_big.png'
import instagram_icon from '../assets/instagram_icon.png'
import pinterest_icon from '../assets/pintester_icon.png'
import watsapp_icon from '../assets/whatsapp_icon.png'


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
       <img src={footer_logo}alt="" />
       <p>Blank-Clothing</p>
      </div>
      <ul className='footer-links'> 
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Conatct</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-conatiner">
            <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-conatiner">
            <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer-icons-conatiner">
            <img src={watsapp_icon} alt="" />
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
