import React, { useState } from 'react';
import axios from 'axios';

const TransferForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        amount: '',
        description: ''
    });

    const [recipientUserId, setRecipientUserId] = useState(null);
    const [transferStatus, setTransferStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if username exists and get recipientUserId
            const response = await axios.get(`http://localhost:5145/api/CaseStudy/GetUserIdByUsername?username=${formData.username}`);
            const recipientId = response.data;

            if (!recipientId) {
                setTransferStatus('Recipient username not found.');
                return;
            }

            // Proceed with the transfer
            const transferData = {
                senderUserId: localStorage.getItem('userId'), // Assuming sender's userId is stored in localStorage
                receiverUserId: recipientId,
                amount: formData.amount,
                description: formData.description
            };

            const transferResponse = await axios.post('http://localhost:5145/api/CaseStudy/AddTransfer', transferData);
            setTransferStatus(transferResponse.data);

            // Clear form after successful transfer
            setFormData({
                username: '',
                amount: '',
                description: ''
            });

        } catch (error) {
            console.error('Error during transfer:', error);
            setTransferStatus('Failed to transfer funds.');
        }
    };

    return (
        <div>
            <h2>Transfer Funds</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Recipient Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Amount:</label>
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <button type="submit">Transfer</button>
            </form>
            {transferStatus && <p>{transferStatus}</p>}
        </div>
    );
};

export default TransferForm;
