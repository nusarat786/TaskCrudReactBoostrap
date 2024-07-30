import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePage = ({fetchTasks}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const URL = "https://taskcrudnodeapi.onrender.com";

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/tasks/${id}`);
        setTask(response.data.taskById);
        setTitle(response.data.taskById.title);
        setDescription(response.data.taskById.description);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
      setLoading(false);
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${URL}/tasks/${id}`, { title, description });
      
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
    fetchTasks();
    setLoading(false);
  };

  return (
    <div className="mt-4 mb-4">
      <div className='bs p-3'>
      <h1>Update Task</h1>
      {loading && 
      <div className="text-center alpha-1" style={{height:"100vh"}}>
        <div className="spinner-border" role="status">
        </div>
        <div className="visually-hidden">
          Loading...
        </div>
      </div>
      }
      {task && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-warning">Update Task</button>
        </form>
      )}
      </div>
    </div>
  );
};

export default UpdatePage;
