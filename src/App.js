import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskForm from './Component/TaskForm';
import TaskList from './Component/TaskList';
import UpdatePage from './Component/UpdatePage';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = "https://taskcrudnodeapi.onrender.com";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/tasks`);
      setTasks(response.data.allTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  };

  const addTask = async (task) => {
    setLoading(true);
    try {
      await axios.post(`${URL}/tasks`, task);
      fetchTasks();
      alert("Task Added");
    } catch (error) {
      console.error('Error adding task:', error);
      alert("Error adding task");
    }
    setLoading(false);
  };

  const deleteTask = async (taskId) => {
    
    var conf = window.confirm("This will delete task ?");
    if(!conf){
      return alert(" delete task canselled ");
    }

    setLoading(true);

    try {
      await axios.delete(`${URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    setLoading(false);
  };

  return (
    <Router>
      <div className="container mt-4">
        <div className='bs p-3'>
          <h1>Task Manager  </h1>
          <Link to="/" className="btn btn-secondary mb-3">Home</Link>
          {
          loading && 
          <div className="text-center alpha-1" style={{height:"100vh"}}>
            <div className="spinner-border" role="status">
            </div>
            <div className="visually-hidden">Loading...</div>
          </div>
          }
          <TaskForm addTask={addTask} />
        </div>
        <br></br>
        
        <Routes>
          <Route 
          path="/" 
          element={<TaskList tasks={tasks} 
          onUpdate={(taskId) => { window.location.href = `/update/${taskId}`; }} 
          onDelete={deleteTask} />} 
          />
          <Route 
          path="/update/:id" 
          element={<UpdatePage 
          fetchTasks={fetchTasks} 
          />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
