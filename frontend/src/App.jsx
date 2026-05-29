import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';

import Contact from './pages/Contact';
import Register from './pages/Register';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

const PrivateRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext);
    
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) {
        return <Navigate to={user.role === 'manager' ? '/manager' : '/employee'} />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route 
                    path="/employee" 
                    element={
                        <PrivateRoute role="employee">
                            <EmployeeDashboard />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/manager" 
                    element={
                        <PrivateRoute role="manager">
                            <ManagerDashboard />
                        </PrivateRoute>
                    } 
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
