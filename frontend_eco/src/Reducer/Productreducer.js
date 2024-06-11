import {
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST
    , NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_ADMIN_PRODUCT_REQUEST,
    ALL_ADMIN_PRODUCT_SUCCESS,
    ALL_ADMIN_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    ALL_PRODUCT_DETAILS_REQUEST,
    ALL_PRODUCT_DETAILS_SUCCESS,
    ALL_PRODUCT_DETAILS_FAIL
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
export const getAllProductReducer = (state = { ourproducts: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ALL_ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                ourproducts: [],
            };
        case ALL_PRODUCT_SUCCESS:
        case ALL_ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                ourproducts: action.payload
            };
        case ALL_PRODUCT_FAIL:
        case ALL_ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
                ourproducts: [],
            };
        default:
            return state;
    }
};

export const UpdateDelProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdate: action.payload
            };
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        default:
            return state;
    };
};

export const productDetailReducer = (state = { specificData: {} }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case ALL_PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                specificData: action.payload,
            }

            case ALL_PRODUCT_DETAILS_FAIL:
                return{
                    loading: false,
                    error: action.payload,
                }
                default:
                    return state
    }
}