import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../assets/css/login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        const urls = [
            'http://localhost:5000/api/auth/login',
            'http://localhost:5000/api/data/login'
        ];

        for (const url of urls) {
            try {
                await axios.post(url, { email, password });
                alert('Login successful');
                navigate('/home');
                return; 
            } catch (error) {
                console.error(`Login failed for ${url}:`, error);
              
            }
        }

        alert('Login failed for both APIs');
    };

    return (
        <Container fluid className='body1'>
            <Row>
                <Col lg={6} md={12} xs={12}>
                    <div className='form'>
                        <h2 className='h2'>Login</h2>
                        <input
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className='input-email login'
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className='input-pwd login'
                        />
                        <p className='log-fp'>
                            <a href='/fp'>Forgot Password</a>
                        </p>
                        <button onClick={login} className='input-button login'>Login</button>
                        <p className='reg-1'>Or</p>
                        <button className='input-button login'>
                            <a href='/' className='btn-1'>Register</a>
                        </button>
                    </div>
                </Col>
                <Col lg={6} md={12} xs={12}>
                    {/* Optional image or other content */}
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
