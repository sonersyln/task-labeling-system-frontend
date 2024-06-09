import React, { useState } from 'react';
import { addTask } from '../services/api';
import { useAuth } from './../pages/Auth/AuthContext';
import { useLocation } from 'react-router-dom';

const TaskForm = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');
  const { user } = useAuth();
  const location = useLocation();
  const labelId = location.pathname.split('/').pop();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userFromStorage = window.localStorage.getItem('user');
    const parsedUser = JSON.parse(userFromStorage);
    const username = parsedUser ? parsedUser.data.username : '';
    
    if (!labelId) {
      console.error('Label ID is null');
      return;
    }
  
    await addTask({ name: taskName, username, labelIds: [labelId] });
    setTaskName('');
    if (onTaskAdded) onTaskAdded();
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group d-flex add-task-row">
        <input
          type="text"
          className="form-control"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
          placeholder='Görev eklemek için Entera basınız...'
        />
      </div>
    </form>
  );
};

export default TaskForm;