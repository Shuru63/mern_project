import axios from 'axios';
import {
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_ADMIN_PRODUCT_REQUEST,
  ALL_ADMIN_PRODUCT_SUCCESS,
  ALL_ADMIN_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
} from "../Constant/Productconstant";

export const addNewProduct = (name, description, price, image, categories, stocks) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const addData = await axios.post('/api/v1/admin/products/new/', {
      name,
      description,
      price,
      image,
      categories,
      stocks,
      config
    })
    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: addData })
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    })

  }
}

export const getAllAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADMIN_PRODUCT_REQUEST });

    const allProducts = await axios.get('/api/v1//products/admin')

    dispatch({ type: ALL_ADMIN_PRODUCT_SUCCESS, payload: allProducts })
  } catch (error) {
    dispatch({
      type: ALL_ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}
export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const allProducts = await axios.get('/api/v1/products')

    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: allProducts })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Update Product
export const updateProduct = (id, name, description, price, image, Stock) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/products/${id}`,{
        name,
        description,
        price,
        image,
        Stock
      },
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { deleteData } = await axios.delete(`/api/v1/admin/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: deleteData.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};