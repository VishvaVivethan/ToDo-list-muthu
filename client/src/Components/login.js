import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../assets/css/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError(''); // Clear error on input change
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            alert(response.data.message || 'Logged in successfully!');
            navigate('/storylist');
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'An unexpected error occurred.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className='body1'>
            <Row>
                <Col lg={6} md={12} xs={12}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            required
                            placeholder="Email"
                            className='input-email login'
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required
                            placeholder="Password"
                            className='input-pwd login'
                        />
                        {error && <p className='error-message'>{error}</p>}
                        <p className='log-fp'><a href='/fp'>Forgot Password</a></p>
                        <button type="submit" className='input-button login' disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        <p className='reg-1'>Or</p>
                        <button className='input-button login'><a href='/register' className=' btn-1'>Register</a></button>
                        
                    </form>
                </Col>
                <Col lg={6} md={12} xs={12}>
                    {/* Optional image or other content */}
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
