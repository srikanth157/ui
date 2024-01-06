// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'UPDATE_CART':
      return state.map((item) =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.productId !== action.payload.productId);
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const updateCart = (productId, quantity) => {
    dispatch({ type: 'UPDATE_CART', payload: { productId, quantity } });
  };

  const removeProductFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, removeProductFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
