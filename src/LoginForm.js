import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you use axios for HTTP requests

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        passwordhash: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make an API request to authenticate user
            const response = await axios.post('http://localhost:5145/api/CaseStudy/Login', formData);
            console.log('Login successful!', response.data);

            // Redirect to main page upon successful login
            navigate('/mainpage');

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
