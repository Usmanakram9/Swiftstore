import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse
(localStorage.getItem('cart')) : {cartItems: [], shippingAddress: {}, paymentMethod: 'paypal' };


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existitem = state.cartItems.find((x) => x._id === item._id)

      if(existitem){
        state.cartItems = state.cartItems.map((x)=> x._id === existitem._id ? item : x)
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
      
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x)=>x._id !== action.payload);

      return updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentmethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    }
  },
});


export const { addToCart, removeFromCart, saveShippingAddress, savePaymentmethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;