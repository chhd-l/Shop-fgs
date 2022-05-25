import React, { useContext, useEffect, useState } from 'react';
import './index.less';
import { FormContext } from '../QuestionnaireForm';
import radioImage from '../../../../assets/images/preciseCatNutrition/radio.png';
import radioImage1 from '../../../../assets/images/preciseCatNutrition/radio1.png';
import radioImage2 from '../../../../assets/images/preciseCatNutrition/radio2.png';
import Tooltips from '../tooltips';
import { FormattedMessage } from 'react-intl-phraseapp';

let imgMap = {
  3: radioImage1,
  4: radioImage,
  5: radioImage,
  6: radioImage2,
  7: radioImage2
};
let chooseMap = {
  3: [
    <FormattedMessage id="preciseNutrition.bsc3.1" />,
    <FormattedMessage id="preciseNutrition.bsc3.2" />,
    <FormattedMessage id="preciseNutrition.bsc3.3" />,
    <FormattedMessage id="preciseNutrition.bsc3.4" />
  ],
  4: [
    <FormattedMessage id="preciseNutrition.bsc4.1" />,
    <FormattedMessage id="preciseNutrition.bsc4.2" />,
    <FormattedMessage id="preciseNutrition.bsc4.3" />,
    <FormattedMessage id="preciseNutrition.bsc4.4" />
  ],
  5: [
    <FormattedMessage id="preciseNutrition.bsc5.1" />,
    <FormattedMessage id="preciseNutrition.bsc5.2" />,
    <FormattedMessage id="preciseNutrition.bsc5.3" />,
    <FormattedMessage id="preciseNutrition.bsc5.4" />,
    <FormattedMessage id="preciseNutrition.bsc5.5" />
  ],
  6: [
    <FormattedMessage id="preciseNutrition.bsc6.1" />,
    <FormattedMessage id="preciseNutrition.bsc6.2" />,
    <FormattedMessage id="preciseNutrition.bsc6.3" />
  ],
  7: [
    <FormattedMessage id="preciseNutrition.bsc7.1" />,
    <FormattedMessage id="preciseNutrition.bsc7.2" />,
    <FormattedMessage id="preciseNutrition.bsc7.3" />,
    <FormattedMessage id="preciseNutrition.bsc7.4" />
  ]
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
        <Tooltips isArray={true} isIdea={true} isBsc={true} />
      </div>
      <div className="questionnaire-radio-options">
        {(questionData.possibleValues || []).map((ele, i) => (
          <div key={i} style={{ display: 'flex' }}>
            <div
              className="rc-input rc-margin-y--xs rc-input--full-width ml-2"
              style={{ height: 67 }}
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
                    style={{
                      display: 'inline-block',
                      paddingRight: 5,
                      width: 95,
                      height: 60
                    }}
                  />
                </div>
              </label>
            </div>
            <div
              style={{
                display: checked === ele.key ? 'block' : 'flex',
                alignItems: 'center',
                flex: 1
              }}
            >
              <div>{ele.label}</div>
              {checked === ele.key && (
                <ul className="radio-options">
                  {chooseMap[ele.key].map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
