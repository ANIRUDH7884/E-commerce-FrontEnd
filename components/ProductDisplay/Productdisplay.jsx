import React, { useContext } from 'react'
import './Productdisplay.css'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'



const Productdisplay = (props) => {
    const {product} =  props;
    const {addToCart} = useContext(ShopContext)


  const Addtocart=async(productID)=>{
try {
  const token=localStorage.getItem('auth-token')


  const datatocart = await fetch('http://localhost:5001/addtocart', {
    method: 'POST',
    body: JSON.stringify({ token, productID }),  // Convert object to JSON string
    headers: {
      'Content-Type': 'application/json'  // Ensure JSON content type
    },
    credentials: 'include'  // Include credentials (cookies, etc.)
  });

  // Check if the response is OK (status 200-299)
  if (datatocart.ok) {
    alert('Product added to cart successfully!');
  } else {
    const errorData = await datatocart.json();  // Parse the response in case of an error
    alert(`Error: ${errorData.message}`);
  }
  
} catch (error) {
  throw new Error(error)
}
  }


  return (
    <div className='Productdisplay'>
      <div className="productdisplay-left">
        <div className="productimage-list">
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
         <h1>{product.name}</h1>
         <div className="productsisplay-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price} </div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="product-display-right-description">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, eius?
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button  onClick={()=>{Addtocart(product._id)}}>ADD TO CART</button>
            <p className="productsisplat-right-category"><span>Category : </span> women ,t-shirt, CropTop</p>
            <p className="productsisplat-right-category"><span>Tags : </span> modern , minimalist</p>
         </div>
      </div>
    </div>
  )
}

export default Productdisplay
