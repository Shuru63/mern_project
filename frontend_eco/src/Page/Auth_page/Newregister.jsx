import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './login.css'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import SummaryApi from '../../common/Index';
import axios from 'axios';
import { useState } from 'react'
const Newregister = () => {
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState(true)
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('green');
    const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [userType,setUserType]=useState('')
  const navigate = useNavigate();
  const handleError = (e) => {
    setVisible(true);
    setMessage(e);
    setMessageColor('red');
  };

  // const handleSubmit=async (e)=>{
  //   e.preventDefault();
  //   const validate = () => {
  //       if (!fname || !email || !phone || !inputPassword || !cpassword) {
  //         handleError('All fields are required');
  //         return false;
  //       }
  //       if (phone.length !== 10) {
  //         handleError('Phone number must be 10 digits.');
  //         return false;
  //       }
  //       if (inputPassword.length < 6) {
  //         handleError('Password must be at least 6 characters long.');
  //         return false;
  //       }
  //       if (inputPassword !== cpassword) {
  //         handleError('Passwords do not match.');
  //         return false;
  //       }
  //       return true;
  //     };
  //     if(validate()){
  //       await axios.post("http://localhost:4000/api/v1/register/",{
  //         name:fname,
  //         email:email,
  //         phone:phone,
  //         password:inputPassword,
  //         role: userType
  //       }).then((response) => {
  //         if (response.status === 201) {
  //             setMessageColor('green');
  //             setMessage(response.data.msg);
  //             setVisible(true);
  //             setTimeout(() => {
  //               navigate('/login')
  //             }, 2000); 
  //         }else {
  //           setMessageColor('red');
  //           setMessage(response.data.message);
  //           setVisible(true);
  //         }
  //       })
  //       .catch((error) => {
  //         setMessageColor('red');
  //         setMessage('something went wrong please try again 455');
  //         setVisible(true);
  //       });
  //     }
      
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = () => {
        if (!fname || !email || !phone || !inputPassword || !cpassword) {
            handleError('All fields are required');
            return false;
        }
        if (phone.length !== 10) {
            handleError('Phone number must be 10 digits.');
            return false;
        }
        if (inputPassword.length < 6) {
            handleError('Password must be at least 6 characters long.');
            return false;
        }
        if (inputPassword !== cpassword) {
            handleError('Passwords do not match.');
            return false;
        }
        return true;
    };
    
    if (validate()) {
        try {
            const response = await axios.post("http://localhost:4000/api/v1/register/", {
                name: fname,
                email: email,
                phone: phone,
                password: inputPassword,
                role: userType
            });
            
            if (response.status === 201) {
                setMessageColor('green');
                setMessage(response.data.msg);
                setVisible(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000); 
            } else {
                setMessageColor('red');
                setMessage(response.data.message);
                setVisible(true);
            }
        } catch (error) {
            setMessageColor('red');
            setMessage('Something went wrong. Please try again.');
            setVisible(true);
        }
    }
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
          <p style={{ color: messageColor }}>{message}</p>
          
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
                            <input type='email' placeholder='enter email' onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='log-user'>
                            <label htmlFor='email'>Phone no :</label>
                            <input type='tel' placeholder='enter email' onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div className='log-user'>
                            <label htmlFor='email'>Admin role :</label>
                            <select name="userrole" id=""  onChange={(e) => setUserType(e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                         </div>
                        <div className='log-userpassword'>
                        <label htmlFor='password'>Password :</label>
                            <input type={password ? 'password' : 'text'} placeholder='enter password' onChange={(e) => setInputPassword(e.target.value)}/>
                            <div className='password-eye' onClick={() => setPassword((prev) => !prev)}>
                            {
                                password ?
                                 <span class="material-symbols-outlined">
                                    visibility_off
                                </span>: <span class="material-symbols-outlined">
                                    visibility
                                </span> 
                            }
                            
                            </div>
                        </div>
                        <div className='log-userpassword'>
                        <label htmlFor='confirm password'> confirm Password</label>
                            <input type={password ? 'password' : 'text'} placeholder='enter password' onChange={(e) => setCpassword(e.target.value)}/>
                            <div className='cpassword-eye' onClick={() => setPassword((prev) => !prev)}>
                            {
                                password ?
                                 <span class="material-symbols-outlined">
                                    visibility_off
                                </span>: <span class="material-symbols-outlined">
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
                    <p className='dont-acc'>I have already account  <span><Link to="/login" style={{color:"rgb(0, 149, 255)"}}>Log in</Link></span></p>
                </div>
            </div>
    </div>
  )
}

export default Newregister
