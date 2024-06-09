import React, { useState, useEffect } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { IoTrashOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { deleteTask, getAllTasksByLabelId, updateTask } from "../services/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const TaskDetails = () => {
  const params = useParams();
  const [Tasks, setTasks] = useState();

  useEffect(() => {
    const fetchLabels = async () => {
      setTasks(null);
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

  const handleSave = async (id, value, labelIds) => {
    const updateTaskRequest = {
      id,
      name: value.value,
      labelIds,
    };

    try {
      await updateTask(updateTaskRequest);
      const getData = await getAllTasksByLabelId(params.id);
      setTasks(getData.data.data);
      toast.success("Görev başarıyla güncellendi!"); 
    } catch (error) {
      console.error("Görev güncellenirken hata oluştu:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Görev güncellenirken hata oluştu");
      } else {
        toast.error("Görev güncellenirken hata oluştu");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      const getData = await getAllTasksByLabelId(params.id);
      setTasks(getData.data.data);
      toast.success("Görev başarıyla silindi!"); 
    } catch (error) {
      console.error("Görev silinirken hata oluştu:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message );
      } 
    }
  };

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
                      <div
                        className="card"
                        key={`${task.id}-${label.id}-${taskIndex}-${labelIndex}`}
                      >
                        <p
                          id={`tooltip-${task.id}-${label.id}-${taskIndex}-${labelIndex}`}
                          className="hoverText"
                        >
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
                      onSave={(value) =>
                        handleSave(
                          task.id,
                          value,
                          task.labels.map((label) => label.id)
                        )
                      }
                    />
                  </p>
                  <div
                    className="card-icons delete-task-icon text-danger"
                    onClick={() => handleDelete(task.id)}
                  >
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
