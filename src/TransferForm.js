import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const TransferForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        amount: '',
        description: ''
    });

    const [transferStatus, setTransferStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5145/api/CaseStudy/GetUserIdByUsername?username=${formData.username}`);
            const recipientId = response.data;

            if (!recipientId) {
                setTransferStatus('Recipient username not found.');
                alert('Recipient username not found.');
                return;
            }

            const transferData = {
                senderUserId: localStorage.getItem('userId'),
                receiverUserId: recipientId,
                amount: formData.amount,
                description: formData.description
            };

            const transferResponse = await axios.post('http://localhost:5145/api/CaseStudy/AddTransfer', transferData);
            setTransferStatus('Transfer successful!');
            alert('Transfer successful!');
            setFormData({
                username: '',
                amount: '',
                description: ''
            });

            navigate('/transfers'); // Redirect to the transfers page

        } catch (error) {
            console.error('Error during transfer:', error);
            setTransferStatus('Failed to transfer funds.');
            alert('Failed to transfer funds.');
        }
    };

    const handleCancel = () => {
        navigate('/transfers');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%', backgroundColor: '#ffffff' }}>
                <Navbar />
                <h2 style={{ textAlign: 'center' }}>Transfer Funds</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ width: '100%', textAlign: 'left' }}>Recipient Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                    />
                    
                    <label style={{ width: '100%', textAlign: 'left' }}>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                    />
                    
                    <label style={{ width: '100%', textAlign: 'left' }}>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                    />
                    
                    <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Transfer</button>
                    {transferStatus && <p style={{ textAlign: 'center', marginTop: '15px' }}>{transferStatus}</p>}

                    <button type="button" onClick={handleCancel} style={{ padding: '10px 20px', marginTop: '10px' }}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default TransferForm;