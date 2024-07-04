import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import LoginForm from './LoginForm';
import MainPage from './MainPage';
import AddTransactionForm from './AddTransactionForm';
import { UserProvider } from './UserContext'; // Import UserProvider
import TransferForm from './TransferForm';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path='/mainpage' element={<MainPage />} />
                    <Route path='/addtransaction' element={<AddTransactionForm />} />
                    <Route path='/transfer' element={<TransferForm />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
