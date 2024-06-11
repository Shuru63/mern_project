import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allUserDetails, updateUserRole, deleteUser } from '../../Action/Useraction';
import './alluser.css';
import Loader from '../Fotter/Loader';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
const Alluser = () => {
    const dispatch = useDispatch();
    const allData = useSelector((state) => state.Alluserinfo);
    const { loading, error, allUserData } = allData;
    const userData = allData.Alluserdata
    const [visible, setVisible] = useState(false);
    const [roleVisible, setRoleVisible] = useState(false);
    const [fname, setFname] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('')
    const [userRoleId, setUserRoleId] = useState('');
    const UserRole = useSelector((state) => state.profileUpdate)
    const [userid, setUserId] = useState();
    const [userDeleteVisible,setUserDeleteVisible]=useState(false);
    useEffect(() => {
        dispatch(allUserDetails());
    }, [dispatch]);

    const getUserId = (userId, fname, email) => {
        setUserRoleId(userId);
        setFname(fname);
        setEmail(email);
        setRoleVisible(true)
    }
    const handleRole = async (e) => {
        console.log(fname, email, userType)
        e.preventDefault();
        dispatch(updateUserRole(userRoleId, fname, email, userType));
        setVisible(true);
        setRoleVisible(false);
    }
     const handleDeleteusers = (userId) => {
        setUserId(userId);
        setUserDeleteVisible(true);
        console.log(userId)
      };
    const UserDelete = (e) => {
        e.preventDefault();
        dispatch(deleteUser(userid));
        setUserDeleteVisible(false);
        window.location.reload();
    };
    return (
        <div>
             <CModal
        visible={userDeleteVisible}
        onClose={() => setUserDeleteVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        alignment='center'
      >
        <CModalHeader onClose={() => setUserDeleteVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Alert</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className='delete_modal'>
            <p>Are you sure Delete the user</p>
          <div className='product_delete_btn' >
             <button onClick={UserDelete}>delete user</button> 
          </div>
          </div>
          
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setUserDeleteVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Alert</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p >{UserRole.error}</p>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal
                visible={roleVisible}
                onClose={() => setRoleVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
                alignment="center"
            >
                <CModalHeader onClose={() => setRoleVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Change User Types</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <form onSubmit={handleRole}>
                        <div className='log-userid'>
                            <label htmlFor='email'>Full name :</label>
                            <input type='text' placeholder='enter email' defaultValue={fname} onChange={(e) => setFname(e.target.value)} />
                        </div>
                        <div className='log-user'>
                            <label htmlFor='email'>Email :</label>
                            <input type='email' placeholder='enter email' defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='log-user'>
                            <label htmlFor='email'>Admin role :</label>
                            <select name="userrole" id="" onChange={(e) => setUserType(e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className='log-btn'>
                            <button className='log-botn' type="submit">
                                Change role
                            </button>
                        </div>
                    </form>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setRoleVisible(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
            <div className='show-Alluser'>
                <p> All user data</p>
                <div className='user-list'>
                    {loading ? (
                       <Loader/>
                    ) : (
                        <table className='user-table'>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile No</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData && userData.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.role}</td>
                                        <td className='user_action' >
                                            <span class="material-symbols-outlined edit-user" onClick={() => getUserId(user._id, user.name, user.email)}>
                                                edit_square
                                            </span>
                                            <span class="material-symbols-outlined delete_user" onClick={() => handleDeleteusers(user._id,)}>
                                                delete
                                            </span>
                                        </td>
                                        <td className='delete-user' >
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Alluser;
