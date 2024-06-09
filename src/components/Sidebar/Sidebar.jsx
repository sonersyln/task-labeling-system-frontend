import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { deleteLabel, getLabels, updateLabel } from "../../services/api";
import LabelForm from "../LabelForm";
import { IoTrashOutline } from "react-icons/io5";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [Labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const getData = await getLabels();
        setLabels(getData.data.data);
        console.log(getData.data.data);
      } catch (error) {
        console.error("Etiketler alınırken hata oluştu:", error);
      }
    };

    fetchLabels();
  }, []);

  const labelDelete = async (id) => {
    try {
      await deleteLabel(id);
      setLabels(Labels.filter((label) => label.id !== id));
    } catch (error) {
      console.error("Etiket silinirken hata oluştu:", error);
    }
  };

  const handleTextChange = async (label, newValue) => {
    const newLabelValue = newValue.value;
    if (label.name !== newLabelValue) {
      const updatedLabel = { ...label, name: newLabelValue };

      await updateLabelData(updatedLabel);
    }
  };

  const updateLabelData = async (updatedLabel) => {
    try {
      await updateLabel(updatedLabel);
    } catch (error) {
      const errorMessage = error.response.data.message.name;
      toast.error(`Etiket güncellenirken hata oluştu: ${errorMessage}`);
    }
  };

  return (
    <div className="col-4 p-2">
      <LabelForm />
      <div className="card p-2 text-center label-container-card">
        {Labels.map((label) => (
          <NavLink
            to={"/labels/" + label.id}
            className={"label-menu-link"}
            key={label.id}
          >
            <EditText
              defaultValue={label.name}
              className="card-title"
              showEditButton
              onSave={(newValue) => handleTextChange(label, newValue)}
            />
            <div
              className="card-icon text-danger"
              onClick={() => labelDelete(label.id)}
            >
              <IoTrashOutline />
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
