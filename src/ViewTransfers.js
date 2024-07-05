import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ViewTransfers = () => {
    const [transfers, setTransfers] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5145/api/CaseStudy/GetUserTransfers?userId=${userId}`)
                .then(response => {
                    setTransfers(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching transfers:', error);
                });
        }
    }, [userId]);

    const handleDelete = (transferId) => {
        axios.delete(`http://localhost:5145/api/CaseStudy/DeleteTransfer?transferId=${transferId}`)
            .then(response => {
                alert('Transfer deleted successfully');
                setTransfers(transfers.filter(t => t.TransferId !== transferId));
            })
            .catch(error => {
                alert('Failed to delete transfer');
                console.error('Error deleting transfer:', error);
            });
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const filterTransfers = () => {
        let filteredTransfers = transfers;

        // Filter by date range
        if (startDate && endDate) {
            filteredTransfers = filteredTransfers.filter(transfer => {
                const transferDate = new Date(transfer.TransferDate);
                const start = new Date(startDate);
                const end = new Date(endDate);
                return transferDate >= start && transferDate <= end;
            });
        }

        return filteredTransfers;
    };

    const filteredTransfers = filterTransfers();

    console.log(userId);

    const userIdInt = parseInt(localStorage.getItem('userId'), 10); // Convert to number

    const sentTransfers = filteredTransfers.filter(transfer => transfer.SenderUserId === userIdInt);
    const receivedTransfers = filteredTransfers.filter(transfer => transfer.ReceiverUserId === userIdInt);

    console.log(sentTransfers);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', marginTop: '10vh', marginBottom: '10vh' }}>
            <div>
                <Navbar />
                <h2>Your Transfer History</h2>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                    <label htmlFor="endDate" style={{ marginLeft: '10px' }}>End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={handleEndDateChange}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </div>

                <h3>Transfers Sent</h3>
                <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Transfer ID</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Receiver Username</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Transfer Date</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sentTransfers.map(transfer => (
                            <tr key={transfer.TransferId}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transfer.TransferId}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transfer.ReceiverUsername}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transfer.Amount}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transfer.Description}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transfer.TransferDate}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <button onClick={() => handleDelete(transfer.TransferId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Transfers Received</h3>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Transfer ID</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Sender Username</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Transfer Date</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receivedTransfers.map(transfer => (
                            <tr key={transfer.TransferId}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transfer.TransferId}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transfer.SenderUsername}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transfer.Amount}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transfer.Description}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transfer.TransferDate}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <button onClick={() => handleDelete(transfer.TransferId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ marginTop: '20px' }}>
                    <Link to="/addtransfer">
                        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Add Transfer</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewTransfers;
