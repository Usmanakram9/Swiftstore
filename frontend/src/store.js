import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice';
import { productsApiSlice } from './slices/productsApiSlice';
import cartReducer from './slices/CartSlice'
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,

  },
  middleware: getDefaultMiddleware().concat(apiSlice.middleware, productsApiSlice.middleware),
  devTools: true,
})

export default store;