import React from 'react'
import './header.css'
import pic1 from "../../static_data/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import {  logoutUser } from "../../Action/Useraction";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.login);
  const handleLogout = () => {
    dispatch(logoutUser(navigate));
};
  return (
    <div>
      <div className='navigation'>
        <div className='cover-nav'>
          <div className='logo'>
            <div className='logo-img'>
              <img src={pic1} alt="" />
            </div>
          </div>
          <div className='search'>
            <div className='input'>
              <input type='text' placeholder='search product here...'>

              </input>
            </div>
            <div className='searc-logo'>
              <span class="material-symbols-outlined">
                search
              </span>
            </div>
          </div>
          <div className='others'>
            <div className='profile'>
              <span class="material-symbols-outlined">
                account_circle
              </span>
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
      </div>
    </div>
  )
}

export default Header
