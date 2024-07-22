import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match', { className: 'toast-error' });
            return;
        }

        try {
            const response = await axios.post('http://localhost/CookCanvas/backend/users/signup.php', {
                username: username,
                email: email,
                password: password
            });
            console.log('Response Data:', response.data); // Log the response data for debugging

            // If response data is a string, parse it as JSON
            const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

            if (data.status === 'success') {
                toast.success('User registered successfully', { className: 'toast-success' });
                navigate('/login');
            } else {
                toast.error(data.message || 'Error registering user', { className: 'toast-error' });
            }
        } catch (error) {
            console.error('There was an error!', error);
            toast.error('An error occurred. Please try again later.', { className: 'toast-error' });
        }
    };

    const switchToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="signup-container">
            <ToastContainer />
            <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                <h2 className="signup-title">Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="button" className="signup-button" onClick={handleSubmit}>Sign Up</button>
                <button type="button" className="switch-button" onClick={switchToLogin}>
                    Already have an account? Login
                </button>
            </form>
        </div>
    );
};

export default Signup;
