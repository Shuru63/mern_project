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
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
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
        const config = { headers: { "Content-Type": "application/json" } };
        const response = await axios.post('/api/v1/loginuser/', {
            email,
            password,
        },config);
        if (response.status === 200) {
            const userData = {
                token: response.data.token,
                user: response.data.user,
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            if (response.data.token) {
                document.cookie = `token=${response.data.token}; path=/product`;
                dispatch({ type: LOGIN_SUCCESS, payload: userData });
                navigate('/', { replace: true });
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
            type: REGISTER_USER_FAIL,
            payload: 'All fields are required',
        });
        return;
    }
    else if (phone.length !== 10) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: 'Phone number must be 10 digits.',
        });
        return;
    }
    else if (password.length < 6) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: 'Password must be at least 6 characters long.',
        });
        return;

    }
    else if (password !== cpassword) {
        dispatch({
            type: REGISTER_USER_FAIL,
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
            localStorage.removeItem('userData');
            dispatch({ type: LOGOUT_FAIL, payload: 'Logout failed, please try again.' });
        }
    } catch (error) {
        localStorage.removeItem('userData');
        dispatch({ type: LOGOUT_FAIL, payload: 'Logout failed, please try again.' });
    }
};
export const userDetails = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get('/api/v1/profile/');
        dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
export const allUserDetails = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const allUserData = await axios.get('/api/v1/admin/user/');
   
        dispatch({ type: ALL_USERS_SUCCESS, payload: allUserData.data.userdetail })
    }
    catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

export const updateUserRole=(id, fname, email,role)=> async (dispatch)=>{
    try{
        if (!fname || !email || !role) {
            dispatch({
                type: UPDATE_USER_FAIL,
                payload: 'All fields are required..',
            });
            return;
        }
        
       dispatch({type:UPDATE_USER_REQUEST});
     
       const roleData= await axios.put(`/api/v1/admin/user${id}`,{
        fname,
         email,
         role
        });
       dispatch({type:UPDATE_USER_SUCCESS,payload:roleData.success})
 }catch(error){
        dispatch({type: UPDATE_USER_FAIL,
        payload: error.response.data.message,})
    }
}

export const getOtpEmail=(email,navigate)=>async(dispatch)=>{
    try{
     dispatch({type:FORGOT_PASSWORD_REQUEST});
     const forgetData= await  axios.post('/api/v1//password/forget/',
        {
            email
        }
     ).then((response) => {
        if (response.status === 201) {
            dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:forgetData})
            setTimeout(() => {
                navigate('/forgetpassword');
            }, 2000);
        } else {
            dispatch({
                type: FORGOT_PASSWORD_FAIL,
                payload: response.data.message,
            })
        }
    })
        .catch((error) => {
            dispatch({
                type:FORGOT_PASSWORD_FAIL,
                payload: error.response.data.message,
            })
        });
     dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:forgetData.data})
    }catch(error){
      dispatch({type:FORGOT_PASSWORD_FAIL,payload: error.response.data.message})
    }
}
// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };