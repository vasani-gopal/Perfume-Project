import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
        padding: '20px',
    };

    const formContainerStyle = {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
    };

    const titleStyle = {
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#333',
    };

    const inputGroupStyle = {
        marginBottom: '20px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#555',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 15px',
        border: '2px solid #e1e5e9',
        borderRadius: '10px',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
        boxSizing: 'border-box',
    };

    const errorStyle = {
        color: '#e74c3c',
        fontSize: '12px',
        marginTop: '5px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '15px',
        backgroundColor: '#ff6b6b',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: '20px',
    };

    const linkStyle = {
        textAlign: 'center',
        color: '#ff6b6b',
        textDecoration: 'none',
        fontSize: '14px',
        cursor: 'pointer',
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(
            u => u.email === formData.email && u.password === btoa(formData.password)
        );

        if (!user) {
            setErrors({
                email: 'Invalid email or password',
                password: 'Invalid email or password'
            });
            setIsLoading(false);
            return;
        }

        // Save current user to localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
        }));

        // Show success message
        alert(`Welcome back, ${user.name}!`);

        setIsLoading(false);
        navigate('/');
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h2 style={titleStyle}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{
                                ...inputStyle,
                                borderColor: errors.email ? '#e74c3c' : '#e1e5e9'
                            }}
                            placeholder="Enter your email"
                        />
                        {errors.email && <div style={errorStyle}>{errors.email}</div>}
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            style={{
                                ...inputStyle,
                                borderColor: errors.password ? '#e74c3c' : '#e1e5e9'
                            }}
                            placeholder="Enter your password"
                        />
                        {errors.password && <div style={errorStyle}>{errors.password}</div>}
                    </div>

                    <button
                        type="submit"
                        style={buttonStyle}
                        disabled={isLoading}
                        onMouseOver={(e) => {
                            if (!isLoading) {
                                e.target.style.backgroundColor = '#e55a5a';
                                e.target.style.transform = 'translateY(-2px)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isLoading) {
                                e.target.style.backgroundColor = '#ff6b6b';
                                e.target.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={{ textAlign: 'center' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Don't have an account? </span>
                    <span
                        style={linkStyle}
                        onClick={() => navigate('/signup')}
                    >
                        Sign up here
                    </span>
                </div>
            </div>
        </div>
    );
}