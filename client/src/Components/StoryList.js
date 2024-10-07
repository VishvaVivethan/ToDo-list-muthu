import React, { useState, useEffect, useCallback } from 'react';
import { getStories, createStory, updateStoryStatus, deleteStory } from '../services/api';
import Navbar from '../Components/navbar';
import '../assets/css/storylist.css';

const StoryItem = ({ story, onStatusChange, onShare }) => (
  <li key={story._id} className='task-li'>
    <p className='task-p'>
      <strong className='task-title'>Title:</strong> {story.title}
    </p>
    <p className='task-p'>
      <strong className='task-title'>Description:</strong> {story.description}
    </p>
    <p className='task-p task-status'>
      <strong className='task-title'>Status:</strong> {story.status}
    </p>
    
    <button onClick={() => onStatusChange(story._id, 'Pending')} className='task-btn'>Pending</button>
    <button onClick={() => onStatusChange(story._id, 'In Progress')} className='task-btn'>In Progress</button>
    <button onClick={() => onStatusChange(story._id, 'Completed')} className='task-btn'>Completed</button>
    <button onClick={() => onStatusChange(story._id, 'Delete')} className='task-btn'>Delete</button>
    <button onClick={() => onShare(story)} className='wpbtn' title="Share on WhatsApp">
      <img className="wp" src="https://www.sharethis.com/wp-content/uploads/2017/05/WhatsApp.png" alt="Share on WhatsApp" />
    </button>
  </li>
);

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const { data } = await getStories(filter);
      setStories(data);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
      setError("Failed to fetch stories. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleCreateStory = async () => {
    if (title && description) {  
      setLoading(true);
      setError(null); // Reset error state
      try {
        await createStory({ title, description });
        setTitle('');
        setDescription('');
        fetchStories();
      } catch (error) {
        console.error("Failed to create story:", error);
        setError("Failed to create story. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      if (status === 'Delete') {
        await deleteStory(id);
      } else {
        await updateStoryStatus(id, status);
      }
      fetchStories();
    } catch (error) {
      console.error("Failed to update story status:", error);
      setError("Failed to update story status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (story) => {
    const message = `Check out this user detail:\nTitle: ${story.title}\nDescription: ${story.description}\nStatus: ${story.status}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className='user-1'>
      <Navbar />
      <div className='task'>
        <h1>Task List</h1>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className='task-input'
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className='task-input'
        />
        <button onClick={handleCreateStory} className='task-input task-1'>Add Task</button>

        <div>
          <label className='task-label'>Filter by Status:</label>
          <select onChange={(e) => setFilter(e.target.value)} className='task-select'>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className='error-message'>{error}</p>
        ) : (
          <ul className='task-ul'>
            {stories.map((story) => (
              <StoryItem key={story._id} story={story} onStatusChange={handleStatusChange} onShare={handleShare} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StoryList;
