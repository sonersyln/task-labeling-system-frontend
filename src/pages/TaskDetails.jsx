import React from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { IoTrashOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip"; 
import "react-tooltip/dist/react-tooltip.css";

const TaskDetails = () => {
  return (
    <div className="detailTaskContainer">
      
      <div className="row">
       {/* buraya maple*/}
        <div className="col-4">
          <div className="card">
            <div className="labelContainer">
              <div className="card">
                <p id="tooltip-2" className="hoverText">labelpopup</p>
                <Tooltip anchorId="tooltip-1" content="Tooltip Content 1" place="top" />
              </div>
              <div className="card">
                <p id="tooltip-1" className="hoverText">labelpopup</p>
                <Tooltip anchorId="tooltip-2" content="Tooltip Content 2" place="top" />
              </div>
              <div className="card">
                <p id="tooltip-2" className="hoverText">labelpopup</p>
                <Tooltip anchorId="tooltip-3" content="Tooltip Content 3" place="top" />
              </div>
            </div>
            <div className="contentContainer">
            <p><EditText
              defaultValue="MAPlicen burayı"
              className="card-title"
              showEditButton
              onSave=""
            /></p>
            <div className="card-icons text-danger">
              <IoTrashOutline />
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;