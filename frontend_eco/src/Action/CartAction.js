import { ADD_TO_CART,SAVE_SHIPPING_INFO,REMOVE_CART_ITEM } from "../Constant/Cartconstant";
import axios from "axios";
export const addcart=(quantity,id)=>(dispatch)=>{
const {data}=axios.get(`/api/v1/products/${id}`);
dispatch({type:ADD_TO_CART,
    payload:{
        product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    }
});
localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeCart =(id)=>(dispatch,getState)=>{
dispatch({
    type:REMOVE_CART_ITEM,
    payload:id
});
localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}
export const shippingSave = (data)=>(dispatch)=>{
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
      });
    
      localStorage.setItem("shippingInfo", JSON.stringify(data));
}