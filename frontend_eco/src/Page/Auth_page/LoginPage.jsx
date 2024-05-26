import React from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {  loginUser } from "../../Action/Useraction";

import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
const LoginPage = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.user);
  const [password, setPassword] = useState(true)
  const [email, setEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser (email, inputPassword,navigate));
    setVisible(true);
  };
  const navigate = useNavigate();
  return (
    <div>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Alert</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p style={{ color: loginState.messageColor }}>{loginState.message}</p>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <div className='login-page'>
        <div className='log-cover'>
          <div className='log-logo'>
            <span className="material-symbols-outlined">
              account_circle
            </span>
          </div>
          <form onSubmit={submitLogin}>
            <div className='log-userid'>
              <label htmlFor='email'>Email</label>
              <input type='email' placeholder='enter email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='log-userpassword'>
              <label htmlFor='password' >Password</label>
              <input type={password ? 'password' : 'text'} placeholder='enter password' onChange={(e) => setInputPassword(e.target.value)} />
              <div className='loginpassword-eye' onClick={() => setPassword((prev) => !prev)}>
                {
                  password ?
                    <span class="material-symbols-outlined">
                      visibility_off
                    </span> : <span class="material-symbols-outlined">
                      visibility
                    </span>
                }

              </div>
              <p className='forget'>Forget password</p>
            </div>
            <div className='log-btn'>
              <button className='log-botn' type="submit">
                Log in
              </button>
            </div>
          </form>
          <p className='dont-acc'>Dont have account ? <span><Link to="/signup" style={{ color: "rgb(0, 149, 255)" }}>Sign up</Link></span></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
