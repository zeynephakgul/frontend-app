import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const MainPage = () => {
    const [username, setUsername] = useState('');

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Main Page</h2>
            
            <Link to="/profile">
                <button style={{ margin: '10px' }}>Profile</button>
            </Link>

            <Link to="/transactions">
                <button style={{ margin: '10px' }}>Manage Transactions</button>
            </Link>

            <Link to="/transfer">
                <button style={{ margin: '10px' }}>Manage Transfers</button>
            </Link>
        </div>
    );
};

export default MainPage;
