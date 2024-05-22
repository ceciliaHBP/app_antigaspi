import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice'
import cartReducer from './reducers/cartSlice';
import orderReducer from './reducers/orderSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer
      },
})
export default store;