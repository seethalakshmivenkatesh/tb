import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const exists = cartItems?.find?.(i => i?.name === item?.name);
    if (exists) {
      setCartItems(cartItems?.map?.(i =>
        i?.name === item?.name ? { ...i, quantity: i?.quantity + 1 } : i
      ));
    } else {
      setCartItems([...(cartItems || []), { ...item, quantity: 1 }]);
    }
    alert('Item added to cart!');
  };

  const increaseQuantity = (itemName) => {
    setCartItems(cartItems?.map?.(item =>
      item?.name === itemName ? { ...item, quantity: item?.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (itemName) => {
    setCartItems(cartItems?.map?.(item =>
      item?.name === itemName && item?.quantity > 1
        ? { ...item, quantity: item?.quantity - 1 }
        : item
    ));
  };

  const removeFromCart = (itemName) => {
    setCartItems(cartItems?.filter?.(item => item?.name !== itemName));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
