import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTransactionForm = () => {
    const [transaction, setTransaction] = useState({
        userId: '', // Initialize userId state
        amount: '',
        description: '',
        category: ''
    });

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setTransaction(prevState => ({ ...prevState, userId: storedUserId }));
        }
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5145/api/CaseStudy/AddTransaction', transaction);
            console.log(response.data);
            alert('Transaction added successfully');
            setTransaction({
                userId: localStorage.getItem('userId') || '',
                amount: '',
                description: '',
                category: ''
            });
        } catch (error) {
            alert('Failed to add transaction');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <label>User ID:</label>
                <input
                    type="text"
                    name="userId"
                    value={transaction.userId}
                    onChange={handleChange}
                    disabled // Disable user input for userId
                    required
                /><br />

                <label>Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={transaction.amount}
                    onChange={handleChange}
                    required
                /><br />

                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={transaction.description}
                    onChange={handleChange}
                /><br />

                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={transaction.category}
                    onChange={handleChange}
                /><br />

                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default AddTransactionForm;
