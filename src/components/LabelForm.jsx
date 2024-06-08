import React, { useState } from 'react';
import { addLabel } from '../services/api';

const LabelForm = ({ onLabelAdded }) => {
  const [labelName, setLabelName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addLabel({ name: labelName });
    setLabelName('');
    if (onLabelAdded) onLabelAdded();
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="labelName">Etiketler</label>
        <input
          type="text"
          className="form-control"
          id="labelName"
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          required
          placeholder='Etiket eklemek için Entera basınız...'
        />
      </div>
    </form>
  );
};

export default LabelForm;
