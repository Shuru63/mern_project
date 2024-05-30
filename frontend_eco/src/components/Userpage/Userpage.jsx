import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../../Action/Useraction';
import Alluser from '../mini-component/Alluser';
import './userpage.css'
const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.user);
    const { loading, userData, isAuthenticated } = userProfile;
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            dispatch(userDetails());
        }
    }, [dispatch, isAuthenticated, navigate]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                userData && userData.userprofile && (
                    <div>
                    <div className='userpage'>
                        <div className='user-div'>
                            <div className='user-profile'>
                                <div className='profile-pic'>
                                    <span className="material-symbols-outlined">
                                        account_circle
                                    </span>
                                </div>
                                <div className='user-detail'>
                                    <div className='each-details'>
                                        <div className='user-name'>
                                            <p>Name :</p>
                                            <p>{userData.userprofile.name}</p>
                                        </div>
                                        <div className='user-name'>
                                            <p>Email :</p>
                                            <p>{userData.userprofile.email}</p>
                                        </div>
                                        <div className='user-name'>
                                            <p>Phone :</p>
                                            <p>{userData.userprofile.phone}</p>
                                        </div>
                                        <div className='user-name'>
                                            <p>Role :</p>
                                            <p>{userData.userprofile.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {userData.userprofile.role==='admin' &&(
                        <div className='admin-btn-fun'>
                            <div className='admin-user'>
                                <button className='admin-click'>All User</button>
                            </div>
                            <div className='admin-user'>
                                <button className='admin-click'>All Products</button>
                            </div>
                        </div>
                    )}
                   
                    </div>
        
                        <Alluser/>
                    </div>
                )
            )}
        </>
    );
};

export default UserProfile;
