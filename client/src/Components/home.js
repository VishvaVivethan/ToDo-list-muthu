import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/navbar';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/css/home.css';

const DataDisplay = () => {
    const [users, setUsers] = useState([]);
    const [stories, setStories] = useState([]);

    const fetchData = async () => {
        try {
            const usersResponse = await axios.get('http://localhost:5000/api/data');
            const storiesResponse = await axios.get('http://localhost:5000/api/stories');
            setUsers(usersResponse.data);
            setStories(storiesResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <Container fluid className='todo-list1 user-1'>
                <Row>
                    <Col lg={3} md={12} xs={12}>
                        <h1 className='todo-head1'>User Details</h1>
                        <table className='todo-table1'>
                            <thead>
                                <tr>
                                    <th className='todo-th1'>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className='todo-td1'>{user.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                    <Col lg={9} md={12} xs={12}>
                        <h1 className='todo-head1'>Task Details</h1>
                        <table className='todo-table1'>
                            <thead>
                                <tr>
                                    <th className='todo-th1'>Title</th>
                                    <th className='todo-th1'>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stories.map((story) => (
                                    <tr key={story._id}>
                                        <td className='todo-td1'>{story.title}</td>
                                        <td className='todo-td1'>{story.description}</td>
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

export default DataDisplay;
