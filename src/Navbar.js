import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: '#333', color: '#fff', padding: '10px', marginBottom: '20px', borderRadius: '8px' }}>
            <ul style={{ display: 'flex', justifyContent: 'space-around', listStyleType: 'none', margin: 0, padding: 0 }}>
                <li>
                    <Link to="/mainpage" style={{ color: '#fff', textDecoration: 'none' }}>Main Page</Link>
                </li>
                <li>
                    <Link to="/transactions" style={{ color: '#fff', textDecoration: 'none' }}>Transactions</Link>
                </li>
                <li>
                    <Link to="/transfers" style={{ color: '#fff', textDecoration: 'none' }}>Transfers</Link>
                </li>
                <li>
                    <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
