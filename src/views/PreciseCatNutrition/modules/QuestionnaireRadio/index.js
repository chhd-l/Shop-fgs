import React, { useContext, useEffect, useState } from 'react';
import './index.less';
import { FormContext } from '../QuestionnaireForm';
import radioImage from '../../../../assets/images/preciseCatNutrition/radio.png';
import radioImage1 from '../../../../assets/images/preciseCatNutrition/radio1.png';
import radioImage2 from '../../../../assets/images/preciseCatNutrition/radio2.png';

let imgMap = {
  3: radioImage1,
  4: radioImage,
  5: radioImage,
  6: radioImage2,
  7: radioImage2
};
export default function QuestionnaireRadio({ questionData }) {
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
          <span className="iconfont-box">
            <i className="iconfont iconinfo"></i>
            <div className="question-tooltip">
              {questionData.metadata.description}
            </div>
          </span>
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
            <div className="label-box">
              <img
                src={imgMap[ele.key]}
                style={{ display: 'inline-block', paddingRight: 5 }}
              />
              <span>{ele.label}</span>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}
