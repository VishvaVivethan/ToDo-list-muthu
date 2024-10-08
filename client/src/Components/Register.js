
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../assets/css/register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { email, password });
            alert('Registration successful');
            navigate('/login'); // Navigate to the login page
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };


    

    return (
      <Container fluid className="body1">
           <Row>
           <Col lg={6} md={12} xs={12}>
         <div className='form'>
         <h2  className='h2'>Register</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className='reg-input email'/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className='reg-input pwd' />
            <button onClick={register} className='reg-input button'>Register</button>
            <p className='reg-1'>Or</p>
            <button type="button" className='reg-input button'><a href='/login' className='btn-1'>Login</a></button>
        
         </div>
          

           </Col>
           <Col lg={6} md={12} xs={12}>
           </Col>
           </Row>
      </Container>
    );
}

export default Register;
