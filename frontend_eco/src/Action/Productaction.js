import axios from 'axios';
import {  NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
     NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET ,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL} from "../Constant/Productconstant";

    export const addNewProduct = (name, description, price, image, categories,Stock)=>async(dispatch)=>{
   try{
     dispatch({type:NEW_PRODUCT_REQUEST});
     const addData= await axios.post('/api/v1/admin/products/new/',{
        name, 
        description,
         price, 
         image, 
         categories,
         Stock
     })
     dispatch({type:NEW_PRODUCT_SUCCESS,payload:addData})
   }catch(error){
    dispatch({type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,})
    
    }
}

export const getAllProduct =()=> async(dispatch)=>{
    try{
   dispatch({type:ALL_PRODUCT_REQUEST});

   const allProducts= axios.get('/api/v1/products')
   
   dispatch({type:ALL_PRODUCT_SUCCESS,payload:allProducts})
    }catch(error){
        dispatch({type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,})
    }
}