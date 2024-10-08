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
        try {
            await axios.post('http://localhost:5000/api/auth/login', { email, password });
            alert('Login successful');
            navigate('/todolist');
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    return (
       <Container  fluid className='body1'>
        <Row>
        <Col lg={6} md={12} xs={12}>
        <div className='form'>
        <h2  className='h2'>Login</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className='input-email login'/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  className='input-pwd login'/>
            <p className='log-fp'><a href='/fp'>Forgot Password</a></p>
            <button onClick={login} className='input-button login'>Login</button>
            <p className='reg-1'>Or</p>
          <button className='input-button login'><a href='/' className=' btn-1'>Register</a></button>
                       
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
