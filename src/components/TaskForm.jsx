import React, { useState } from 'react';
import { addTask } from '../services/api';

const TaskForm = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addTask({ name: taskName });
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