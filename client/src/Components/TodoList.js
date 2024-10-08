import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/todolist.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../Components/navbar';

const DataManager = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/data');
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/data/${editId}`, { name, value });
            } else {
                await axios.post('http://localhost:5000/api/data', { name, value });
            }
            setName('');
            setValue('');
            setEditId(null);
            fetchData();
        } catch (error) {
            console.error("Error during submit:", error);
        }
    };

    const handleEdit = (item) => {
        setName(item.name);
        setValue(item.value);
        setEditId(item._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete(`http://localhost:5000/api/data/${id}`);
                fetchData();
            } catch (error) {
                console.error("Error during delete:", error);
            }
        }
    };

    const handleShare = (item) => {
        const message = `Check out this user detail:\nUsername: ${item.name}\nPassword: ${item.value}`;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        
      <>
       <Navbar/>
        <Container fluid className=' user-1'>
              
            <Row>
            <Col lg={2} md={12} xs={12}></Col>
                <Col lg={10} md={12} xs={12}>
                    <br />
                   
                    <form onSubmit={handleSubmit} className='todo-form'>
                    <h1 className='todo-head'>User Details</h1>
                        <input className='todo-input'
                            type="text"
                            placeholder="User Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input className='todo-input input2'
                            type="text"
                            placeholder="Password"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                        <button type="submit" className='todo-btn'>{editId ? 'Update' : 'Add'}</button>
                    </form>
               
                    <table className='todo-table'>
                        <thead>
                            <tr>
                                <th className='todo-th'>Username</th>
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
                                        <h2>{item.value}</h2>
                                    </td>
                                    <td className='todo-td'>
                                        <button onClick={() => handleEdit(item)} className='todo-td-btn'>Edit</button>
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
};

export default DataManager;


