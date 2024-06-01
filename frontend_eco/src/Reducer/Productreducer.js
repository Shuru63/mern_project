import {
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST
    , NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL
} from "../Constant/Productconstant";


export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                message: ""
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        default:
            return state;
    }
}
export const getAllProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
                products: [], 
            };
        default:
            return state;
    }
};