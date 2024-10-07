import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stories';

export const getStories = (status) => axios.get(`${API_URL}?status=${status}`);
export const createStory = (data) => axios.post(API_URL, data);  // Pass both title and description
export const updateStoryStatus = (id, status) => axios.put(`${API_URL}/${id}/status`, { status });
export const deleteStory = (id) => axios.delete(`${API_URL}/${id}`);
