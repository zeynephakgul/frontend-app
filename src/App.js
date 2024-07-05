import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import LoginForm from './LoginForm';
import MainPage from './MainPage';
import AddTransactionForm from './AddTransactionForm';
import { UserProvider } from './UserContext'; // Import UserProvider
import TransferForm from './TransferForm';
import ViewTransactions from './ViewTransactions';
import EditTransactionForm from './EditTransactionForm';
import ProfilePage from './Profile';
import ViewTransfers from './ViewTransfers';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<LoginForm />} />
                    <Route path='/mainpage' element={<MainPage />} />
                    <Route path='/addtransaction' element={<AddTransactionForm />} />
                    <Route path='/addtransfer' element={<TransferForm />} />
                    <Route path='/transactions' element={<ViewTransactions />} />
                    <Route path="/edittransaction/:transactionId" element={<EditTransactionForm />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/transfers' element={<ViewTransfers />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
