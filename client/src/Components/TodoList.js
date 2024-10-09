import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/navbar';
import '../assets/css/todolist.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/data');
            setData(response.data);
        } catch (error) {
            alert('Failed to fetch data: ' + error.message);
        }
    };

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/api/data/register', { name, email, password });
            fetchData();
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            alert('Registration failed: ' + error.response?.data || error.message);
        }
    };
    const handleShare = (item) => {
        const message = `Check out this user detail:\nUsername: ${item.name}\nemail: ${item.email}\nPassword: ${item.password}`;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/data/${id}`);
            fetchData();
        } catch (error) {
            alert('Failed to delete data: ' + error.message);
        }
    };

    return (
        <>
        <Navbar/>
        <Container fluid className=' user-1 '>
           
           <Row>
           <Col lg={2} md={12} xs={12}></Col>
               <Col lg={10} md={12} xs={12}>
   
        <h1 className='todo-head'>User Details</h1>
            <input placeholder="User Name" value={name} onChange={e => setName(e.target.value)} className='todo-input'/>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className='todo-input input2'/>
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className='todo-input input2'/>
            <button onClick={handleRegister} className='todo-btn'>Add User</button>
            
          
            <h2>User List</h2>
           
       
       <table>
                        <thead>
                            <tr>
                                <th className='todo-th'>Username</th>
                                <th className='todo-th'>Email</th>
                                <th className='todo-th'>Password</th>
                                <th className='todo-th'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id}>
                                    <td className='todo-td'>
                                        <h2>{item.name}</h2>
                                    </td>
                                    <td className='todo-td'>
                                        <h2>{item.email}</h2>
                                    </td>
                                    <td className='todo-td'>
                                        <h2>{item.password}</h2>
                                    </td>
                                    <td className='todo-td'>
                                        <button onClick={() => handleDelete(item._id)} className='todo-td-btn'>Delete</button>
                                        <button onClick={() => handleShare(item)} className='wpbtn' title="Share on WhatsApp">
                                            <img className="wp" src="https://www.sharethis.com/wp-content/uploads/2017/05/WhatsApp.png" alt="Share on WhatsApp" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



        </Col>
        </Row>
        </Container>
        </>
    );
}

export default App;
