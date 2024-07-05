import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setUserId } = useUser(); // Destructure setUserId from useUser
    const [formData, setFormData] = useState({
        username: '',
        passwordhash: '',
    });
    const [loginStatus, setLoginStatus] = useState('');

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
                // Handle successful login, set userId in context and localStorage
                setUserId(userId);
                localStorage.setItem('userId', userId);
                navigate('/mainpage');
            } else {
                console.error('UserID is undefined or null in response.', response.data);
                setLoginStatus('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login failed!', error);
            setLoginStatus('Login failed. Please check your credentials.');
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
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%', backgroundColor: '#ffffff' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '10px' }}>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    
                    <label style={{ marginBottom: '10px' }}>Password:</label>
                    <input
                        type="password"
                        name="passwordhash"
                        value={formData.passwordhash}
                        onChange={handleChange}
                        required
                        style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    
                    <button type="submit" style={{ padding: '10px 20px', marginTop: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Login</button>
                    {loginStatus && <p style={{ textAlign: 'center', marginTop: '10px', color: 'red' }}>{loginStatus}</p>}
                </form>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p>Don't have an account? <a href="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Create One</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
