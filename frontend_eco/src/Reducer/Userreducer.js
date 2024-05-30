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
    LOAD_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL
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
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                messageColor: 'green',
                message: 'Login successful!',
                userData: action.payload,
            };
            case LOAD_USER_SUCCESS:
                return {
                    ...state,
                    isAuthenticated: true,
                    loading: false,
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
                ...state,
                loading: false,
                isAuthenticated: false,
                userData: null,
                error: action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                userData: null,
            };
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
export const allUserReducer=(state={Alluserdata:[]},action)=>{
    switch (action.type){
        case ALL_USERS_REQUEST:
            return{
                ...state,
                loading:true,
            };
            case ALL_USERS_SUCCESS:
                return{
                    ...state,
                    isAuthenticated: true,
                    loading:false,
                    Alluserdata:action.payload
                };
            case ALL_USERS_FAIL:
                return{
                    ...state,
                    loading: false,
                    error: action.payload,
                }
                default:
                    return state;
                
    }
}