import React, { useState, useEffect } from 'react';
import { getLabels, addTask } from '../services/api';

const TaskForm = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchLabels = async () => {
      const response = await getLabels();
      setLabels(response.data);
    };
    fetchLabels();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addTask({ name: taskName, labelIds: selectedLabels });
    setTaskName('');
    setSelectedLabels([]);
    if (onTaskAdded) onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="taskName">Görev Adı</label>
        <input
          type="text"
          className="form-control"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>
      <div className="form-group mt-2">
        <label>Etiketler</label>
        {labels.map((label) => (
          <div key={label.id} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`label-${label.id}`}
              value={label.id}
              onChange={(e) => {
                const { checked, value } = e.target;
                setSelectedLabels((prev) =>
                  checked ? [...prev, parseInt(value)] : prev.filter((id) => id !== parseInt(value))
                );
              }}
            />
            <label className="form-check-label" htmlFor={`label-${label.id}`}>
              {label.name}
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary mt-2">Görev Ekle</button>
    </form>
  );
};

export default TaskForm;
