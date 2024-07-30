import React from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, onUpdate, onDelete }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);
    
        return `${formattedDate} ${formattedTime}`;
      };



  return (
    <div className="list-group ">
        <h2>Tasks</h2>
      {tasks?.length===0 
        ?
        <div  className="list-group-item d-flex  align-items-center mb-4 bs"> 
            <h2 className='text-center'>No Task Available</h2>
        </div>
        : null
      }
      {tasks.map(task => (
        <div key={task._id} className="list-group-item d-flex justify-content-between align-items-center mb-4 bs">
          <div>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            </div>
          <div>
          <p className='date'>{task.createdAt ? formatDate(task.createdAt) : 'Date not available'}</p>
            
            <Link to={`/update/${task._id}`} className="btn btn-warning btn-sm me-2">Update</Link>
            &nbsp;
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
