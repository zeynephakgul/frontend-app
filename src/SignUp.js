import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [passwordhash, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5145/api/CaseStudy/AddUser', {
                username,
                passwordhash,
                email,
                fullName
            });

            console.log(response.data);
            setMessage('User added successfully');
            navigate('/');
        } catch (error) {
            console.error('Failed to add user', error.response.data);
            setMessage('Failed to add user');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%', backgroundColor: '#ffffff' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '10px' }}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    
                    <label style={{ marginBottom: '10px' }}>Password:</label>
                    <input
                        type="password"
                        value={passwordhash}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    
                    <label style={{ marginBottom: '10px' }}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    
                    <label style={{ marginBottom: '10px' }}>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    
                    <button type="submit" style={{ padding: '10px 20px', marginTop: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sign Up</button>
                    {message && <p style={{ textAlign: 'center', marginTop: '10px' }}>{message}</p>}
                </form>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p>Already have an account? <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
