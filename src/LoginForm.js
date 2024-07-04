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
                // Handle case where userId is not received as expected
            }
        } catch (error) {
            console.error('Login failed!', error);
            // Handle login failure (show error message, etc.)
        }
    };
    
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="passwordhash" value={formData.passwordhash} onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
