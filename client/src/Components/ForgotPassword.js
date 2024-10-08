import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const forgotPassword = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            alert('OTP sent to your email');
            navigate('/cp');
        } catch (error) {
            console.error(error);
            alert('Error sending OTP');
        }
    };

    return (
      <Container fluid className='body1'>
<Row>
<Col lg={6} md={12} xs={12}>
<div className='form'>
    <h2  className='h2'>Forgot Password</h2>
            <input
            className='input-email login'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={forgotPassword} className='input-button login'>Send OTP</button>
      
    </div>
    </Col>
    <Col lg={6} md={12} xs={12}>
    </Col>
</Row>
      </Container>
          
    );
}

export default ForgotPassword;
