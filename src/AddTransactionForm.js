import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTransactionForm = () => {
    const [transaction, setTransaction] = useState({
        userId: '',
        amount: '',
        description: '',
        category: ''
    });
    const [categories, setCategories] = useState([]); // Add categories state
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setTransaction(prevState => ({ ...prevState, userId: storedUserId }));
        }

        const predefinedCategories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Others'];
        setCategories(predefinedCategories);
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
            navigate('/transactions');
        } catch (error) {
            alert('Failed to add transaction');
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate('/transactions');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h2>Add New Transaction</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={transaction.amount}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                    />

                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={transaction.description}
                        onChange={handleChange}
                        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                    />

                    <label>Category:</label>
                    <select
                        name="category"
                        value={transaction.category}
                        onChange={handleChange}
                        required
                        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                    >
                        <option value="" disabled>Select category</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Add Transaction</button>
                    <button type="button" onClick={handleCancel} style={{ padding: '10px 20px', marginTop: '10px' }}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionForm;
