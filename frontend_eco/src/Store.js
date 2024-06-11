import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userReducer,allUserReducer,profileReducer,ForgetPasswordReducer } from "./Reducer/Userreducer";
import { productsReducer,getAllProductReducer ,UpdateDelProductReducer,productDetailReducer} from "./Reducer/Productreducer";
const reducer = combineReducers({
  user: userReducer,
  Alluserinfo:allUserReducer,
  profileUpdate:profileReducer,
  forgetPassword:ForgetPasswordReducer,
  addNewProduct:productsReducer,
  allProductsData:getAllProductReducer,
  updateDelete:UpdateDelProductReducer,
  specificproduct:productDetailReducer,
});
const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;

let initialState = {
  user: {
  isAuthenticated: userData ? true : false,
  userData: userData || {},
},
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