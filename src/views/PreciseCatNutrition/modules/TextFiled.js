import React, { useContext } from 'react';
import { FormContext } from './QuestionnaireForm';
export default function TextFiled({ questionData, width }) {
  const Context = useContext(FormContext);
  const changeInput = (e) => {
    e.persist();
    Context.changeFormData(questionData.id, e.target.value);
  };
  return (
    <div style={{ width: width ? width : 'auto' }}>
      <span className="rc-input rc-input--label">
        <input
          className="rc-input__control"
          type="text"
          name="text"
          onChange={changeInput}
        />
        <label className="rc-input__label">
          <span className="rc-input__label-text">
            {questionData.metadata.label}
          </span>
        </label>
      </span>
    </div>
  );
}
