import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header'
import LoginPage from './Page/Auth_page/LoginPage'
import Register from './Page/Auth_page/Newregister'
import Home from './Page/Auth_page/Homepage/Home';
import Product from './Page/Auth_page/Product/Product';
import Userpage from './components/Userpage/Userpage';
const Allroutes = () => {
  return (
    <div>
     
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/userprofile" element={<Userpage />} />


        </Routes>

     
      </Router>

    </div>
  )
}

export default Allroutes
