import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, fetchTasksByLabel } from '../store/taskSlice';
import { useAuth } from './../pages/Auth/AuthContext';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const { user } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  const labelId = location.pathname.split('/').pop();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tokenFromStorage = window.localStorage.getItem('token');
    const decodedToken = jwtDecode(tokenFromStorage);
    const username = decodedToken ? decodedToken.sub : '';
  
    if (!labelId) {
      toast.error('Etiket seçiniz!');
      return;
    }
  
    try {
      await dispatch(createTask({ name: taskName, username, labelIds: [labelId] }));
      dispatch(fetchTasksByLabel(labelId));
      setTaskName('');
      toast.success('Görev başarıyla eklendi!');
    } catch (error) {
      const errorMessage = error.response.data.message.name;
      const turkishErrorMessage = `Görev eklenirken hata oluştu: ${errorMessage}`;
      toast.error(turkishErrorMessage);
    }
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
          placeholder="Görev eklemek için Enter'a basınız..."
        />
      </div>
    </form>
  );
};

export default TaskForm;