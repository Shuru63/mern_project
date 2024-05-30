import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allUserDetails } from '../../Action/Useraction';
import './alluser.css';

const Alluser = () => {
    const dispatch = useDispatch();
    const allData = useSelector((state) => state.Alluserinfo);
    const { loading, error, allUserData } = allData;
    const userData = allData.Alluserdata

    console.log(userData)
    useEffect(() => {
        dispatch(allUserDetails());
    }, [dispatch]);

    return (
        
        <div className='show-Alluser'>
            <p> All user data</p>
            <div className='user-list'>
                {loading ? (
                    <p>Loading...</p>
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
                                    <td className='edit-user'>
                                        <span class="material-symbols-outlined">
                                            edit_square
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Alluser;
