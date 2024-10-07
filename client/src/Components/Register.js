// frontend/src/components/Register.js
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// css
import '../assets/css/register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        phoneNum: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (formData.password.length < 5) {
            alert("Password must be at least 5 characters long");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            alert(response.data.message);
            navigate('/');
            setFormData({
                email: '',
                phoneNum: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'An unexpected error occurred.';
            alert(errorMessage);
        }
    };
    
    return (
       < >
        <Container fluid className="body1">
            <Row>
                <Col lg={6} md={12} xs={12}>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" onChange={handleChange} required placeholder="Email" className='reg-input email' />
                        <input type="number" name="phoneNum" onChange={handleChange} required placeholder="Phone Number" className='reg-input phonenum' />
                        <input type="password" name="password" onChange={handleChange} required placeholder="Password" className='reg-input pwd' />
                        <input type="password" name="confirmPassword" onChange={handleChange} required placeholder="Confirm Password" className='reg-input pwd1' />
                        <button type="submit" className='reg-input button'>Register</button>
                        <p className='reg-1'>Or</p>
                        <button type="submit" className='reg-input button'><a href='/'className=' btn-1'>Login</a></button>
                        
                    </form>
                </Col>
                <Col lg={6} md={12} xs={12}>
                    {/* <img src={require('../assets/images/reg-2.jpg')} alt='..'></img> */}
                </Col>
            </Row>
        </Container>
       </>
    );
};

export default Register;
