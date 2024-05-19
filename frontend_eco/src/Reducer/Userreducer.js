import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from '../Constant/Usercontant';

const initialState = {
    isAuthenticated:false,
    loading: false,
    visible: false,
    messageColor: '',
    message: '',
    userData: {},
    isAuthenticated:false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
                visible: false,
                message: '',
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                visible: true,
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
                visible: true,
                messageColor: 'red',
                message: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                isAuthenticated: false,
                loading: false,
                user: null,
                isAuthenticated: false,
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

