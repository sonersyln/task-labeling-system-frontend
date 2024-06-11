import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksByLabel,
  createTask,
  removeTask,
  editTask,
} from "../store/taskSlice";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { IoTrashOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const tasks = useSelector((state) => state.tasks);
  console.log("task logu" + tasks);
  const dispatch = useDispatch();
  const params = useParams();
  const labelId = params.id;

  useEffect(() => {
    if (!labelId) return;

    dispatch(fetchTasksByLabel(labelId));
  }, [dispatch, labelId]);

  const handleSave = async (id, value, labelIds) => {
    const task = tasks.find((task) => task.id === id);
    const taskLabelIds =
      task && task.labels ? task.labels.map((label) => label.id) : [];

    const updateTaskRequest = {
      id,
      name: value.value,
      labelIds: labelIds || taskLabelIds,
    };

    try {
      await dispatch(editTask(updateTaskRequest));
      toast.success("Görev başarıyla güncellendi!");
    } catch (error) {
      const errorMessage =
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.name;
      const turkishErrorMessage = `Görev güncellenirken hata oluştu: ${errorMessage}`;
      toast.error(turkishErrorMessage || "Görev güncellenirken hata oluştu");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(removeTask(id));
      if (response.config.method === "delete") {
        toast.success("Görev başarıyla silindi!");
      }
    } catch (error) {
      console.error("Görev silinirken hata oluştu:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="detailTaskContainer">
      <div className="row">
        {tasks &&
          tasks.map(
            (task, taskIndex) =>
              task && (
                <div className="col-4" key={task.id}>
                  <div className="card">
                    <div className="labelContainer">
                      {task.labels &&
                        task.labels.map(
                          (label, labelIndex) =>
                            label && (
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
                            )
                        )}
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
                              value.value,
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
              )
          )}
      </div>
    </div>
  );
};

export default TaskDetails;
