import React, { useState, useEffect } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { IoTrashOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  deleteTask,
  getAllTasksByLabelId,
  updateTask,
  getAllLabelsByTaskId,
} from "../services/api";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const params = useParams();
  const [Tasks, setTasks] = useState();
  const [Labels, setLabels] = useState();

  useEffect(() => {
    const fetchLabels = async () => {
      setTasks(null);
      setLabels(null);
      try {
        const getData = await getAllTasksByLabelId(params.id);

        setTasks(getData.data.data);

      } catch (error) {
        console.error("Error fetching labels:", error);
      }
    };
    setTasks(null);
    fetchLabels();
  }, [params.id]);

  return (
    <div className="detailTaskContainer">
      <div className="row">
      {Tasks &&
  Tasks.map((task, taskIndex) => (
    <div className="col-4" key={task.id}>
      <div className="card">
        <div className="labelContainer">
          {task.labels &&
            task.labels.map((label, labelIndex) => (
              <div className="card" key={`${task.id}-${label.id}-${taskIndex}-${labelIndex}`}>
                <p id={`tooltip-${task.id}-${label.id}-${taskIndex}-${labelIndex}`} className="hoverText">
                  {label.name}
                </p>
                <Tooltip
                  anchorId={`tooltip-${task.id}-${label.id}-${taskIndex}-${labelIndex}`}
                  content={label.name}
                  place="top"
                />
              </div>
            ))}
        </div>
        <div className="contentContainer">
          <p>
            <EditText
              defaultValue={task.name}
              className="card-title"
              showEditButton
              onSave=""
            />
          </p>
          <div className="card-icons text-danger">
            <IoTrashOutline />
          </div>
        </div>
      </div>
    </div>
  ))}
      </div>
    </div>
  );
};

export default TaskDetails;
