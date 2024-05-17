import axios from 'axios';
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

export const loginUser = (email, password, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    if (!email || !password) {
        dispatch({
            type: LOGIN_FAIL,
            payload: 'Email and password are required.',
        });
        return;
    }

    try {
        const response = await axios.post('/api/v1/loginuser/', {
            email,
            password,
        });
        console.log(response)
        if (response.status === 200) {
            const userData = {
                token: response.data.token,
                user: response.data.user,
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            if (response.data.token) {
                document.cookie = `token=${response.data.token}; path=/product`;
                dispatch({ type: LOGIN_SUCCESS, payload: userData });
                navigate('/product', { replace: true });
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: response.data.message,
                });
            }
        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: 'Please enter correct credentials',
        });
    }
};
export const Register = (name, email, phone, password, cpassword, role, navigate) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    if (!name || !email || !phone || !password || !cpassword) {
        dispatch({
            type: LOGIN_FAIL,
            payload: 'All fields are required',
        });
        return;
    }
    else if (phone.length !== 10) {
        dispatch({
            type: LOGIN_FAIL,
            payload: 'Phone number must be 10 digits.',
        });
        return;
    }
    else if (password.length < 6) {
        dispatch({
            type: LOGIN_FAIL,
            payload: 'Password must be at least 6 characters long.',
        });
        return;

    }
    else if (password !== cpassword) {
        dispatch({
            type: LOGIN_FAIL,
            payload: 'Passwords do not match.',
        });
        return;
    }
    else {
        await axios.post("api/v1/register/", {
            name,
            email,
            phone
            , password,
            role
        }).then((response) => {
            if (response.status === 201) {
                dispatch({ type: REGISTER_USER_SUCCESS, payload: response })
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                dispatch({
                    type: REGISTER_USER_FAIL,
                    payload: response.data.message,
                })
            }
        })
            .catch((error) => {
                dispatch({
                    type: REGISTER_USER_FAIL,
                    payload: 'Please enter correct credentials',
                })
            });
    }
}
export const logoutUser = (navigate) => async (dispatch) => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    try {
        const response = await axios.get('/api/v1/logoutuser/', {
            refresh: userData?.token?.refresh,
        });

        if (response.status === 200) {
            localStorage.removeItem('userData');
            navigate('/', { replace: true });
            dispatch({ type: LOGOUT_SUCCESS });
        } else {
            console.error('Something went wrong!', response);
            localStorage.removeItem('userData');
            dispatch({ type: LOGOUT_FAIL, payload: 'Logout failed, please try again.' });
        }
    } catch (error) {
        localStorage.removeItem('userData');
        dispatch({ type: LOGOUT_FAIL, payload: 'Logout failed, please try again.' });
    }
};