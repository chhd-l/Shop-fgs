import React, { useContext, useEffect, useState } from 'react';
import '../QuestionnaireRadio/index.less';
import { FormContext } from '../QuestionnaireForm';
import Tooltips from '../tooltips';

export default function RadioGroup({ questionData }) {
  const [checked, setChecked] = useState('');
  const Context = useContext(FormContext);
  //初始化选中第一个
  useEffect(() => {
    if (Context.formData[questionData.name]) {
      setChecked(String(Context.formData[questionData.name]));
    } else {
      setChecked('');
      Context.changeFormData(questionData.name, '');
    }
  }, [questionData.name]);
  const handleRadioChange = (val) => {
    console.log(val);
    setChecked(val.key);
    Context.changeFormData(
      questionData.name,
      questionData.name === 'bcs' ? parseInt(val.key) : val.key
    );
  };
  return (
    <div className="questionnaire-radio">
      <div className="question-title">
        {questionData.metadata.label}
        {questionData.metadata.description ? (
          <Tooltips description={questionData.metadata.description} />
        ) : (
          ''
        )}
      </div>
      {(questionData.possibleValues || []).map((ele, i) => (
        <div
          key={i}
          className="rc-input rc-margin-y--xs rc-input--full-width ml-2"
        >
          <input
            className="rc-input__radio"
            id={`pro-finder-answer-${i}`}
            type="radio"
            name={`pro-finder-adioAnswer`}
            value={i}
            // onChange={this.handleRadioChange.bind(this, ele)}
            onChange={() => handleRadioChange(ele)}
            checked={checked === ele.key}
          />

          <label
            className="rc-input__label--inline"
            htmlFor={`pro-finder-answer-${i}`}
          >
            <span>{ele.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
