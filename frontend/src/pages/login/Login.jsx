import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost/CookCanvas/backend/users/login.php', {
                email: email,
                password: password
            });
            console.log('Response Data:', response.data); // Log the response data for debugging

            // If response data is a string, parse it as JSON
            const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

            if (data.status === 'success') {
                toast.success('User logged in successfully', { className: 'toast-success' });
                navigate('/home');
            } else {
                toast.error(data.message || 'Invalid Credentials', { className: 'toast-error' });
            }
        } catch (error) {
            console.error('There was an error!', error);
            toast.error('An error occurred. Please try again later.', { className: 'toast-error' });
        }
    };

    const switchToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <ToastContainer />
            <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                <h2 className="login-title">Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="button" className="login-button" onClick={handleSubmit}>Login</button>
                <button type="button" className="switch-button" onClick={switchToSignup}>
                    Don't have an account? Sign Up
                </button>
            </form>
        </div>
    );
};

export default Login;
