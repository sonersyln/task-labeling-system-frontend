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
    const actionResult = await dispatch(createLabel({ name: labelName }));
    if (createLabel.fulfilled.match(actionResult)) {
      dispatch(fetchLabels());
      setLabelName('');
      toast.success('Etiket başarıyla eklendi!');
    } else if (createLabel.rejected.match(actionResult)) {
      const errorMessage = actionResult.payload.message.name;
      const turkishErrorMessage = 'Etiket eklerken hata oluştu: ' + errorMessage;
      toast.error(turkishErrorMessage);
    }
  } catch (error) {
    toast.error('Etiket eklerken bir hata oluştu.');
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
