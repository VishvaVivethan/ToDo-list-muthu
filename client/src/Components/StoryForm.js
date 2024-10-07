// client/src/components/StoryForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import '../assets/css/StoryForm.css';
import Navbar from '../Components/navbar';

const StoryForm = ({ fetchStories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/stories', { title, description, acceptanceCriteria });
    fetchStories();
    setTitle('');
    setDescription('');
    setAcceptanceCriteria('');
  };

  return (
   <>
    <Navbar/>
    <Container fluid className="body">
  
        
    <form onSubmit={handleSubmit} className='story-form'>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className='input' />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className='input' />
      <input value={acceptanceCriteria} onChange={(e) => setAcceptanceCriteria(e.target.value)} placeholder="Acceptance Criteria" required className='input' />
      <button type="submit" className='input button' > Add New Task</button>
    </form>
  
        </Container>
   </>
  );
};

export default StoryForm;
