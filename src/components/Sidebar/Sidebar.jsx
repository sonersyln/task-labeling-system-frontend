import React, { useEffect } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLabel, updateLabel, fetchLabels } from "../../store/labelSlice";
import LabelForm from "../LabelForm";
import { IoTrashOutline } from "react-icons/io5";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { toast } from "react-toastify";

const Sidebar = () => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.labels);

  useEffect(() => {
    dispatch(fetchLabels());
  }, [dispatch]);

  const labelDelete = async (id) => {
    try {
      await dispatch(deleteLabel(id));
    } catch (error) {
      console.error("Etiket silinirken hata oluştu:", error);
    }
  };

  const handleTextChange = async (label, newValue) => {
    const newLabelValue = newValue.value;
    if (label.name !== newLabelValue) {
      const updatedLabel = { ...label, name: newLabelValue };
      try {
        await dispatch(updateLabel(updatedLabel));
      } catch (error) {
        const errorMessage = error.response.data.message.name;
        toast.error(`Etiket güncellenirken hata oluştu: ${errorMessage}`);
      }
    }
  };
  

  return (
    <div className="col-4 p-2">
      <LabelForm />
      <div className="card p-2 text-center label-container-card">
      {labels && labels.map((label) => (
  label && label.id && (
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
  )
))}
      </div>
    </div>
  );
};

export default Sidebar;