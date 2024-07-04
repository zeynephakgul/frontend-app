import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import LoginForm from './LoginForm';
import MainPage from './MainPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path='/mainpage' element={<MainPage />} />
            </Routes>
        </Router>
    );
};

export default App;