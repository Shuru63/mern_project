import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import pic1 from "../../static_data/logo.png"
const Header = () => {
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
              <button className='login-btn'><Link to="/login"  style={{color:"white"}}>Login</Link></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
