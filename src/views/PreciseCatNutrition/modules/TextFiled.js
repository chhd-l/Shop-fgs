import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from './QuestionnaireForm';

export default function TextFiled({ questionData, key }) {
  const Context = useContext(FormContext);
  const [value, setValue] = useState('');
  useEffect(() => {
    console.log(Context.formData);
    if (Context.formData[questionData.name]) {
      setValue(Context.formData[questionData.name]);
      Context.changeFormData(
        questionData.name,
        Context.formData[questionData.name]
      );
    } else {
      setValue('');
      Context.changeFormData(questionData.name, '');
    }
  }, [questionData.name]);

  const changeInput = (e) => {
    e.persist();
    setValue(e.target.value);
    Context.changeFormData(questionData.name, e.target.value);
  };
  return (
    <div>
      <span className="rc-input rc-input--label">
        <input
          className="rc-input__control"
          type="text"
          name="text"
          id={`id-text${questionData.name}`}
          onChange={changeInput}
          value={value}
        />
        <label
          className="rc-input__label"
          htmlFor={`id-text${questionData.name}`}
        >
          <span className="rc-input__label-text">
            {questionData.metadata.label}
          </span>
        </label>
      </span>
    </div>
  );
}
