import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import '../assets/css/cp.css';

function ChangePassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate =useNavigate('');

    const changePassword = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/change-password', { email, otp, newPassword });
            alert('Password changed successfully');
            navigate('/login');
        } catch (error) {
            console.error('Error during password change:', error.response?.data || error.message);
            alert('Error changing password');
        }
    };

    return (
        <Container fluid className='body1'>
        <Row>
        <Col lg={6} md={12} xs={12}>
        <div className='form'>
            <h2 className='h2'>Change Password</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className='input-email login'/>
            <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} className='input-email login' />
            <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} className='input-email login' />
            <button onClick={changePassword} className='input-button login'>Change Password</button>
           </div>
    </Col>
    <Col lg={6} md={12} xs={12}>
    </Col>
</Row>
      </Container>
    );
}

export default ChangePassword;
