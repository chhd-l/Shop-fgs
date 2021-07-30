import React, { useContext, useEffect } from 'react';
import './index.less';
import { FormContext } from '../QuestionnaireForm';
export default function QuestionnaireRadio({ questionData }) {
  const Context = useContext(FormContext);
  //初始化选中第一个
  useEffect(() => {
    Context.changeFormData(
      questionData.id,
      questionData.possibleValues?.[0].value
    );
  }, []);
  const handleRadioChange = (val) => {
    console.log(val);
    Context.changeFormData(questionData.id, val.value);
  };
  return (
    <div className="questionnaire-radio">
      <div className="question-title">
        {questionData.metadata.label}
        {questionData.metadata.description ? (
          <span className="iconfont-box">
            <i
              className="iconfont iconinfo"
              title="Bottom"
              data-tooltip-placement="bottom"
              data-tooltip="bottom-tooltip"
            ></i>
            <div id="bottom-tooltip" className="rc-tooltip">
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
            // checked={form && form.key === ele.key}
          />

          <label
            className="rc-input__label--inline"
            htmlFor={`pro-finder-answer-${i}`}
          >
            <div className="label-box">
              <img
                src={require('../../../../assets/images/preciseCatNutrition/radio.png')}
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
