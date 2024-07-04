import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [passwordhash, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [message, setMessage] = useState('');

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
        } catch (error) {
            console.error('Failed to add user', error.response.data);
            setMessage('Failed to add user');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={passwordhash} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <br />
                <label>
                    Full Name:
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignUp;
