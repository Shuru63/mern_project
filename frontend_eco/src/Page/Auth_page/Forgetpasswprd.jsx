import React from 'react'
import '../../Page/Auth_page/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { getOtpEmail } from '../../Action/Useraction';
const Forgetpasswprd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const forgetData = useSelector(state => state.forgetPassword);
console.log(forgetData)


  const submitemail = (e) => {
    e.preventDefault();
    dispatch(getOtpEmail(email, navigate))
    setVisible(true)
  };

  return (
    <div>
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
            <p >{forgetData.error}</p>
            <p >{forgetData.message}</p>
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
            <form onSubmit={submitemail}>
              <div className='log-userid'>
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='enter email' onChange={(e) => setEmail(e.target.value)} />
              </div>


              <div className='log-btn'>
                <button className='log-botn' type="submit">
                  Get otp
                </button>
              </div>
            </form>
            <p className='dont-acc'>another way <span><Link to="/login" style={{ color: "rgb(0, 149, 255)", textDecoration: "none" }}>Login</Link></span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgetpasswprd
