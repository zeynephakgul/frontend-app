import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setUserId } = useUser();
    const [formData, setFormData] = useState({
        username: '',
        passwordhash: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5145/api/CaseStudy/Login', {
                username: formData.username,
                passwordhash: formData.passwordhash
            });
            console.log('Login successful!', response.data);
    
            const { userId } = response.data;
            if (userId) {
                // Handle successful login, set userId
                setUserId(userId);
                localStorage.setItem('userId', userId);
                navigate('/mainpage');
            } else {
                console.error('UserID is undefined or null in response.', response.data);
            }
        } catch (error) {
            console.error('Login failed!', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '300px' }}>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Password:</label>
                        <input type="password" name="passwordhash" value={formData.passwordhash} onChange={handleChange} />
                    </div>
                    <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>Login</button>
                </form>
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <p>Don't have an account? <a href="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Create One</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
