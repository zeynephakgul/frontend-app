import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const MainPage = () => {
    const [fullName, setFullName] = useState('');
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        const fetchFullName = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:5145/api/CaseStudy/GetUserNameById?userId=${userId}`);
                setFullName(response.data); // Assuming backend returns full name as a string
            } catch (error) {
                console.error('Error fetching full name:', error);
            }
        };

        const fetchExchangeRates = async () => {
            const appId = 'c89498c069484bd38de487533bd285c9';
            try {
                const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${appId}`);
                setExchangeRates(response.data.rates); // Assuming response.data contains rates
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchFullName();
        fetchExchangeRates();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '800px', width: '90%', textAlign: 'center', backgroundColor: '#ffffff' }}>
                <Navbar />
                <h1>Welcome, {fullName}</h1>
                <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px', borderRadius: '8px', overflow: 'hidden' }} className="hoverTable">
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px', borderRadius: '8px', backgroundColor: '#f0f0f0' }}>Currency</th>
                            <th style={{ border: '1px solid black', padding: '8px', borderRadius: '8px', backgroundColor: '#f0f0f0' }}>Value in USD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(exchangeRates).map(currency => (
                            <tr key={currency}>
                                <td style={{ border: '1px solid black', padding: '8px', borderRadius: '8px' }}>{currency}</td>
                                <td style={{ border: '1px solid black', padding: '8px', borderRadius: '8px' }}>{exchangeRates[currency]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainPage;
