import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const ViewTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    useEffect(() => {
        // Fetch user transactions and categories
        if (userId) {
            axios.get(`http://localhost:5145/api/CaseStudy/GetUserTransactions?userId=${userId}`)
                .then(response => {
                    setTransactions(response.data);
                })
                .catch(error => {
                    console.error('Error fetching transactions:', error);
                });

            // Fetch categories (this could be from an API or a predefined list)
            const predefinedCategories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Others'];
            setCategories(predefinedCategories);
        }
    }, [userId]);

    const handleDelete = (transactionId) => {
        axios.delete(`http://localhost:5145/api/CaseStudy/DeleteTransaction?transactionId=${transactionId}`)
            .then(response => {
                alert('Transaction deleted successfully');
                setTransactions(transactions.filter(t => t.TransactionId !== transactionId));
            })
            .catch(error => {
                alert('Failed to delete transaction');
                console.error('Error deleting transaction:', error);
            });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const filterTransactions = () => {
        let filteredTransactions = transactions;

        // Filter by category
        if (selectedCategory) {
            filteredTransactions = filteredTransactions.filter(transaction => transaction.Category === selectedCategory);
        }

        // Filter by date range
        if (startDate && endDate) {
            filteredTransactions = filteredTransactions.filter(transaction => {
                const transactionDate = new Date(transaction.TransactionDate);
                const start = new Date(startDate);
                const end = new Date(endDate);
                return transactionDate >= start && transactionDate <= end;
            });
        }

        return filteredTransactions;
    };

    const filteredTransactions = filterTransactions();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
            <div>
                <Navbar />
                <h2>Your Transaction History</h2>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="categorySelect">Filter by Category:</label>
                    <select
                        id="categorySelect"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        style={{ marginLeft: '10px', padding: '5px' }}
                    >
                        <option value="">All</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
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
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>

                            <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Category</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Transaction Date</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(transaction => (
                            <tr key={transaction.TransactionId}>

                                <td style={{ border: '1px solid black', padding: '8px' }}>{transaction.Amount}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transaction.Description}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transaction.Category}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{transaction.TransactionDate}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <button onClick={() => navigate(`/edittransaction/${transaction.TransactionId}`)}>Edit</button>
                                    <button onClick={() => handleDelete(transaction.TransactionId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '20px' }}>
                    <Link to="/addtransaction">
                        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Add Transaction</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewTransactions;
