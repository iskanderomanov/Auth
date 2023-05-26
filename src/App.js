import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './AuthContext';
import CreatePage from './components/CreatePage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create" element={<ProtectedRoute />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

const ProtectedRoute = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const checkAuthentication = async () => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                setIsAuthenticated(true);
                // console.log('isAuthenticated:', true);
            }
        };

        checkAuthentication();
    }, [setIsAuthenticated]);

    console.log('isAuthenticated:', isAuthenticated);

    if (isAuthenticated === null) {
        return null;
    }

    if (!isAuthenticated) {
        // console.log(isAuthenticated)
        // return <Navigate to="/login" replace />;
    }

    return <CreatePage />;
};

export default App;
