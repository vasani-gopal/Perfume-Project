import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");   // ✅ new
    const navigate = useNavigate();

    // styles same rakhe hain
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

    const inputGroupStyle = { marginBottom: '20px' };
    const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#555' };
    const inputStyle = { width: '100%', padding: '12px 15px', border: '2px solid #e1e5e9', borderRadius: '10px', fontSize: '16px', transition: 'border-color 0.3s ease', boxSizing: 'border-box' };
    const errorStyle = { color: '#e74c3c', fontSize: '12px', marginTop: '5px' };
    const buttonStyle = { width: '100%', padding: '15px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', marginBottom: '20px' };
    const linkStyle = { textAlign: 'center', color: '#ff6b6b', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = existingUsers.find(user => user.email === formData.email);

        if (userExists) {
            setErrors({ email: 'User with this email already exists' });
            setIsLoading(false);
            return;
        }

        // ✅ Password ko thoda encode kar diya (basic security)
        const newUser = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            password: btoa(formData.password), 
            createdAt: new Date().toISOString()
        };

        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        setMessage("Signup successful! Please login to continue.");  // ✅ success msg
        setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // ✅ reset form

        setIsLoading(false);

        setTimeout(() => navigate('/login'), 1500); // ✅ chhota delay
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h2 style={titleStyle}>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={{ ...inputStyle, borderColor: errors.name ? '#e74c3c' : '#e1e5e9' }}
                            placeholder="Enter your full name"
                        />
                        {errors.name && <div style={errorStyle}>{errors.name}</div>}
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{ ...inputStyle, borderColor: errors.email ? '#e74c3c' : '#e1e5e9' }}
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
                            style={{ ...inputStyle, borderColor: errors.password ? '#e74c3c' : '#e1e5e9' }}
                            placeholder="Enter your password"
                        />
                        {errors.password && <div style={errorStyle}>{errors.password}</div>}
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            style={{ ...inputStyle, borderColor: errors.confirmPassword ? '#e74c3c' : '#e1e5e9' }}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
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
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}  {/* ✅ message */}

                <div style={{ textAlign: 'center' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>Already have an account? </span>
                    <span style={linkStyle} onClick={() => navigate('/login')}>Login here</span>
                </div>
            </div>
        </div>
    );
}
