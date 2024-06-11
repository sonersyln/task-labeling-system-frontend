import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLabel, fetchLabels } from '../store/labelSlice';
import { toast } from 'react-toastify';

const LabelForm = () => {
  const [labelName, setLabelName] = useState('');
  const dispatch = useDispatch();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createLabel({ name: labelName }));
      dispatch(fetchLabels());
      setLabelName('');
      toast.success('Etiket başarıyla eklendi!');
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
          placeholder="Etiket eklemek için Enter'a basınız..."
        />
      </div>
    </form>
  );
};

export default LabelForm;
