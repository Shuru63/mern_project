import React from 'react'
import  { useEffect, useState } from 'react';
import './header.css'
import pic1 from "../../static_data/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import {  logoutUser } from "../../Action/Useraction";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../Fotter/Loader';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
const Header = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isAuthenticated ,loading} = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser(navigate));

};
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
          <p >Log Out successfully</p>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
        {loading ? (
            <Loader/>
         ) : (
      <div className='navigation'>
        <div className='cover-nav'>
          <div className='logo'>
            <div className='logo-img'>
          <Link to='/'  >  <img src={pic1} alt="" /></Link>
            </div>
          </div>
          <div className='search'>
            <div className='input-cover'>
              <input type='text' className='input' placeholder='search product here...'>

              </input>
            </div>
          </div>
          <div className='others'>
          
            <div className='profile'>
             {isAuthenticated ? ( <Link to="/userprofile" style={{ color: "white" }}> <span class="material-symbols-outlined">
                account_circle
              </span></Link>):(
                <span></span>
              )}
            </div>
            <div className='add-cart'>
              <span class="material-symbols-outlined">
                shopping_cart
              </span>
              <p className='power'>0</p>
            </div>
            <div className='login'>
            {isAuthenticated ? (
                <button className='login-btn' onClick={handleLogout}>Logout</button>
              ) : (
                <button className='login-btn'>
                  <Link to="/login" style={{ color: "white" }}>Login</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default Header
