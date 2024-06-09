import React, { useState } from 'react';
import { addLabel } from '../services/api';
import { toast } from 'react-toastify';

const LabelForm = ({ onLabelAdded }) => {
  const [labelName, setLabelName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addLabel({ name: labelName });
      setLabelName('');
      if (onLabelAdded) onLabelAdded();
      window.location.reload();
    } catch (error) {
      const errorMessage = error.response.data.message.name;
      const turkishErrorMessage = 'Etiket eklerken hata oluştu: ' + errorMessage;
      toast.error(turkishErrorMessage);
    }
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
