import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../../Action/Useraction';

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.user);
    const { loading, error, user, isAuthenticated } = userProfile;

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            dispatch(userDetails());
        }
    }, [dispatch, isAuthenticated, navigate]);
    return (
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
                                <p>Name</p>
                                <p>{user.name}</p>
                            </div>
                            <div className='user-name'>
                                <p>Email</p>
                                <p>{user.email}</p>
                            </div>
                            <div className='user-name'>
                                <p>Phone</p>
                                <p>{user.phone}</p>
                            </div>
                            <div className='user-name'>
                                <p>Role</p>
                                <p>{user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;