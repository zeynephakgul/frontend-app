import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const ProfilePage = () => {
    const [user, setUser] = useState({
        email: '',
        fullName: '',
        userId: '',
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [originalUser, setOriginalUser] = useState(null); // Store original user data for cancel

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:5145/api/CaseStudy/GetUserById?userId=${userId}`);
                setUser({
                    email: response.data.Email,
                    fullName: response.data.FullName,
                    userId: response.data.UserId
                });
                setOriginalUser(response.data); // Store original user data
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const { userId, fullName, email } = user; // Destructure user object
            const url = `http://localhost:5145/api/CaseStudy/UpdateUser?userId=${userId}&fullName=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}`;
            
            const response = await axios.put(url);
            console.log('User updated:', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleCancel = () => {
        // Restore original user data
        setUser({
            email: originalUser.Email,
            fullName: originalUser.FullName,
            userId: originalUser.UserId
        });
        setIsEditing(false);
    };

    const handleDeleteAccount = async () => {
        try {
            const userId = user.userId; // Assuming userId is stored in user state
            const url = `http://localhost:5145/api/CaseStudy/DeleteUser?userId=${userId}`;
            
            const response = await axios.delete(url);
            console.log('User deleted:', response.data);
            // Optionally handle user feedback or redirect to a different page
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    if (loading) {
        return <p>Loading user data...</p>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '800px', width: '90%', textAlign: 'center', backgroundColor: '#ffffff' }}>
                <Navbar />
                <h2>Profile</h2>
                <div style={{ marginBottom: '20px' }}>
                    <label>Full Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="fullName"
                            value={user.fullName}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <p>{user.fullName}</p>
                    )}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Email:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <p>{user.email}</p>
                    )}
                </div>
                {isEditing ? (
                    <div>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <div>
                            <button onClick={handleDeleteAccount}>Delete Account</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
