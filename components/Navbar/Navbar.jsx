import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'


import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import nav_dropdown from '../assets/nav_dropdown.png'


const Navbar = () => {  
const [menu,setMenu] = useState("shop");
const {getTotalCartItems}  =useContext(ShopContext)
const menuref = useRef();
const dropdown_toggle = (e) =>{
  menuref.current.classList.toggle('nav-menu-visible');
  e.target.classList.toggle('open');
}
const [count,setCount]=useState([])

const Addtocart = async () => {
  try {
    const token = localStorage.getItem('auth-token');
    const response = await fetch('http://localhost:5001/mycart', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const result = await response.json();
    setCount(result)
   
console.log(result);

  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};
useEffect(()=>{
Addtocart()
},[])
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src= {logo} alt="" />
        <p>BLANK-CLOTHING</p>
      </div>
      <img className='nav-dropdown' src={nav_dropdown} onClick= {dropdown_toggle} alt="" />
      <ul  ref={menuref} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to= '/'> Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link  style={{textDecoration: 'none'}} to= '/mens'> Mens</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration: 'none'}} to= '/womens'> Womans </Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link  style={{textDecoration: 'none'}} to = '/kids'> Kids </Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button on onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>LogOut</button>
        :<Link to = '/login'><button>Login</button></Link>}
        <Link to = '/cart'><img src= {cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{count.length}</div>
      </div>
    </div>
  )
}

export default Navbar
