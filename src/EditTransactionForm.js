import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTransactionForm = () => {
    const { transactionId } = useParams();
    const [transaction, setTransaction] = useState({
        transactionId: transactionId,
        amount: '',
        description: '',
        category: ''
    });
    const [categories, setCategories] = useState([]); // Add categories state
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5145/api/CaseStudy/GetUserTransactions?userId=${localStorage.getItem('userId')}`)
            .then(response => {
                const txn = response.data.find(t => t.TransactionId === parseInt(transactionId));
                if (txn) {
                    setTransaction(txn);
                }
            })
            .catch(error => {
                console.error('Error fetching transaction:', error);
            });

        // Fetch categories (this could be from an API or a predefined list)
        const predefinedCategories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Others'];
        setCategories(predefinedCategories);
    }, [transactionId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5145/api/CaseStudy/UpdateTransaction', transaction);
            alert('Transaction updated successfully');
            navigate('/transactions');
        } catch (error) {
            alert('Failed to update transaction');
            console.error(error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h2>Edit Transaction</h2>
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

                    <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Update Transaction</button>
                </form>
            </div>
        </div>
    );
};

export default EditTransactionForm;
