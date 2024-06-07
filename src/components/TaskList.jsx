import React, { useState, useEffect } from 'react';
import { getTasks, getLabels } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedLabelId, setSelectedLabelId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      setTasks(response.data);
    };

    const fetchLabels = async () => {
      const response = await getLabels();
      setLabels(response.data);
    };

    fetchTasks();
    fetchLabels();
  }, []);

  const filteredTasks = selectedLabelId
    ? tasks.filter((task) => task.labelIds.includes(selectedLabelId))
    : tasks;

  return (
    <div>
      <div className="form-group">
        <label htmlFor="labelFilter">Etikete Göre Filtrele</label>
        <select
          className="form-control"
          id="labelFilter"
          onChange={(e) => setSelectedLabelId(parseInt(e.target.value))}
        >
          <option value="">Tüm Görevler</option>
          {labels.map((label) => (
            <option key={label.id} value={label.id}>
              {label.name}
            </option>
          ))}
        </select>
      </div>
      <ul className="list-group mt-3">
        {filteredTasks.map((task) => (
          <li key={task.id} className="list-group-item">
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
