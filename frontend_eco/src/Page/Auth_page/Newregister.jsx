import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../../Action/Useraction";

import { useState } from 'react'
const Newregister = () => {
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState(true)
    const [fname, setFname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [userType, setUserType] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerState = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        console.log(phone.length)
        e.preventDefault();
        dispatch(Register(fname, phone, email, inputPassword, cpassword, userType, navigate));
        setVisible(true);
    }


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
                    <p style={{ color: registerState.messageColor }}>{registerState.message}</p>

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
                    <form onSubmit={handleSubmit}>
                        <div className='log-userid'>
                            <label htmlFor='email'>Full name :</label>
                            <input type='text' placeholder='enter email' onChange={(e) => setFname(e.target.value)} />
                        </div>
                        <div className='log-user'>
                            <label htmlFor='email'>Email :</label>
                            <input type='email' placeholder='enter email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='log-user'>
                            <label htmlFor='email'>Phone no :</label>
                            <input type='tel' placeholder='enter email' onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className='log-user'>
                            <label htmlFor='email'>Admin role :</label>
                            <select name="userrole" id="" onChange={(e) => setUserType(e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className='log-userpassword'>
                            <label htmlFor='password'>Password :</label>
                            <input type={password ? 'password' : 'text'} placeholder='enter password' onChange={(e) => setInputPassword(e.target.value)} />
                            <div className='password-eye' onClick={() => setPassword((prev) => !prev)}>
                                {
                                    password ?
                                        <span class="material-symbols-outlined">
                                            visibility_off
                                        </span> : <span class="material-symbols-outlined">
                                            visibility
                                        </span>
                                }

                            </div>
                        </div>
                        <div className='log-userpassword'>
                            <label htmlFor='confirm password'> confirm Password</label>
                            <input type={password ? 'password' : 'text'} placeholder='enter password' onChange={(e) => setCpassword(e.target.value)} />
                            <div className='cpassword-eye' onClick={() => setPassword((prev) => !prev)}>
                                {
                                    password ?
                                        <span class="material-symbols-outlined">
                                            visibility_off
                                        </span> : <span class="material-symbols-outlined">
                                            visibility
                                        </span>
                                }

                            </div>
                        </div>
                        <div className='log-btn'>
                            <button type="submit" className='log-botn'>
                                Sign up
                            </button>
                        </div>
                    </form>
                    <p className='dont-acc'>I have already account  <span><Link to="/login" style={{ color: "rgb(0, 149, 255)" }}>Log in</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default Newregister
