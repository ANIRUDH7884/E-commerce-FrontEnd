import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import './Cartitem.css';
import remove_icon from '../assets/cart_cross_icon.png';

const Cartitems = () => {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({}); // State for product quantities
const [count,setCont]=useState([])
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
      setCont(result)
console.log(result);

      if (response.ok) {
        toast.success('Products found in the cart!'); // Success toast notification
        const productData = result.map(item => ({
          ...item.ProductId,
          quantity: 1, // Initialize each product's quantity to 1 or based on your logic
        }));
        setData(productData);
        const initialQuantities = productData.reduce((acc, item) => {
          acc[item.id] = 1; // Initialize quantities
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } else {
        toast.error(`Error: ${result.message}`); // Error toast notification
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Something went wrong, please try again.'); // Error toast notification
    }
  };

  const removeFromCart = (id) => {
    setData(data.filter(item => item.id !== id));
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[id]; // Remove the quantity of the removed product
      return newQuantities;
    });
    toast.info('Product removed from cart.'); // Info toast notification
  };

  const getTotalCartAmount = () => {
    return data.reduce((total, item) => {
      const quantity = quantities[item.id] || 0;
      return total + item.new_price * quantity;
    }, 0);
  };

  useEffect(() => {
    Addtocart();
  }, []);

  return (
    <div className='cartitems'>
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {data.map((e) => (
        <div key={e.id}>
          <div className="cartitems-format cartitem-format-main">
            <img src={e.image} alt={e.name} className='carticon-product-icon' />
            <p>{e.name}</p>
            <p>${e.new_price.toFixed(2)}</p>
            <button className='cartitems-quantity'>{quantities[e.id]}</button>
            <p>${(e.new_price * (quantities[e.id] || 0)).toFixed(2)}</p>
            <img
              src={remove_icon}
              onClick={() => removeFromCart(e.id)}
              alt="Remove"
              className="cart-remove-icon"
            />
          </div>
          <hr />
        </div>
      ))}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount().toFixed(2)}</h3>
            </div>
          </div>

          <button>PROCEED TO CHECK OUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promocode, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='PROMOCODE' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartitems;
