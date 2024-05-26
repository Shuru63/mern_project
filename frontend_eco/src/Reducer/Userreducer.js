import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL
} from '../Constant/Usercontant';

const initialState = {
    isAuthenticated: false,
    loading: false,
    messageColor: '',
    message: '',
    userData: {},

};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                message: '',
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                messageColor: 'green',
                message: 'Login successful!',
                userData: action.payload,
            };

        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                messageColor: 'red',
                message: action.payload,
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                isAuthenticated: false,
                loading: false,
                user: null,
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

// export const userProfile = (state = initialState, action) => {
//     switch (action.type) {
//         case LOAD_USER_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 message: action.payload,
//             }
//             case LOAD_USER_SUCCESS:
//                 return{
//                 ...state,
//                 loading: false,
//                 userData: action.payload,
//             }
//             case LOAD_USER_FAIL:
//                 return{
//                     ...state,
//                     loading: false,
//                     message: action.payload,
//                 }
//                 default:{
//                     return state;
//                 }
//     }
// }