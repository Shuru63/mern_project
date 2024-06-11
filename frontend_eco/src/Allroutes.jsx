import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header'
import LoginPage from './Page/Auth_page/LoginPage'
import Register from './Page/Auth_page/Newregister'
import Home from './Page/Auth_page/Homepage/Home';
import Product from './Page/Auth_page/Product/Product';
import Userpage from './components/Userpage/Userpage';
import Forgetpasswprd from './Page/Auth_page/Forgetpasswprd';
import CategoryProductpage from './Page/Auth_page/Product/CategoryProductpage';
import Footer from './components/Fotter/Footer';
const Allroutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <div>
     
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/userprofile" element={<Userpage />} />
          <Route path="/forgetpassword" element={<Forgetpasswprd />} />
          <Route path="/categoryproductpage/:category" element={<CategoryProductpage/>} />
        </Routes>

     <Footer/>
      </Router>

    </div>
  )
}

export default Allroutes
