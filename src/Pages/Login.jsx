import React, { useState } from 'react'
import{useNavigate} from'react-router-dom';
import{toast} from'react-toastify';
import authService from '../Services/authService';
import'../Styles/Auth.css';
const Login = () => {

 const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.phone || !formData.password || !formData.confirmPassword) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (formData.phone.length !== 10) {
            toast.error('Phone number must be 10 digits');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            
            // Remove confirmPassword before sending
            const { confirmPassword, ...registrationData } = formData;
            
            const response = await authService.register(registrationData);
            
            toast.success('Registration successful! Welcome!');
            navigate('/dashboard');
            
        } catch (err) {
            console.error('Registration error:', err);
            const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <div className='auth-header'>
                    <h1>🏥 Health Management System</h1>
                    <h2>Register</h2>
                    <p>Create your account to get started</p>
                </div>

                <form onSubmit={handleSubmit} className='auth-form'>
                    <div className='form-group'>
                        <label>👤 Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label>📱 Phone Number *</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter 10-digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength="10"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className='form-row'>
                        <div className='form-group'>
                            <label>🎂 Age</label>
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div className='form-group'>
                            <label>⚧ Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                disabled={loading}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>🏠 Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className='form-group'>
                        <label>🔒 Password *</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password (min 6 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label>🔒 Confirm Password *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className='btn-submit'
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className='auth-footer'>
                    <p>Already have an account? 
                        <span onClick={() => navigate('/login')} className='link'>
                            {' '}Login here
                        </span>
                    </p>
                </div>
            </div>

            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            border: '4px solid #f3f3f3',
                            borderTop: '4px solid #667eea',
                            borderRadius: '50%',
                            margin: '0 auto 20px',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <p>Creating your account...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login