import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

// Function to initialize cart based on available products
const getDefaultCart = (all_Product) => {
    let cart = {};
    all_Product.forEach((product) => {
        cart[product.id] = 0;
    });
    return cart;
};

const ShopContextProvider = (props) => {
    const [allProduct, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        // Fetch products from the server
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5001/allproducts');
                const data = await response.json();
                setAllProducts(data);
                setCartItems(getDefaultCart(data));  // Initialize cart after fetching products
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
        }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = allProduct.find((product) => product.id === Number(itemId));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);
    };

    const contextValue = {
        allProduct,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
