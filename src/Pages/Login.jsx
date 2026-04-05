import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../Services/authService';
import '../Styles/Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.phone || !formData.password) {
            toast.error('Please enter phone and password');
            return;
        }

        if (formData.phone.length !== 10) {
            toast.error('Phone number must be 10 digits');
            return;
        }

        try {
            setLoading(true);
            await authService.login({
                phone: formData.phone,
                password: formData.password,
            });
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage =
                err.response?.data?.error ||
                err.response?.data?.message ||
                'Login failed. Please check your credentials.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>🏥 Health Management System</h1>
                    <h2>Login</h2>
                    <p>Sign in with your phone and password</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>📱 Phone Number *</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="10-digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength="10"
                            disabled={loading}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>🔒 Password *</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Need an account?{' '}
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={() => navigate('/register')}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && navigate('/register')
                            }
                            className="link"
                        >
                            Register here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
