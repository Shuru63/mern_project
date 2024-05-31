import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userReducer,allUserReducer,profileReducer,ForgetPasswordReducer } from "./Reducer/Userreducer";

const reducer = combineReducers({
  user: userReducer,
  Alluserinfo:allUserReducer,
  profileUpdate:profileReducer,
  forgetPassword:ForgetPasswordReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = configureStore({
  reducer,
  preloadedState: initialState, 
});

export default store;