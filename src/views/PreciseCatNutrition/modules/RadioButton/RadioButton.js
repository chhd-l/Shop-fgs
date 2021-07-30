import React, { useContext, useEffect, useState } from 'react';
import './index.less';
import { FormContext } from '../QuestionnaireForm';

export default function RadioButton({ questionData, id }) {
  const [checked, setChecked] = useState('');
  const Context = useContext(FormContext);
  //初始化选中第一个
  useEffect(() => {
    setChecked(questionData.possibleValues?.[0].value);
    Context.changeFormData(
      questionData.id,
      questionData.possibleValues?.[0].value
    );
  }, []);

  return (
    <>
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
      <div className="radio-group">
        {questionData.possibleValues.map((item) => (
          <label
            key={item.value}
            className={`radio-button-wrapper ${
              checked === item.value ? 'radio-button-wrapper-checked' : ''
            }`}
            style={{
              height: questionData.id === 'petActivityCode' ? 76 : 44,
              flexDirection:
                questionData.id === 'petActivityCode' ? 'column' : 'row'
            }}
            onClick={() => {
              setChecked(item.value);
              Context.changeFormData(questionData.id, item.value);
            }}
          >
            {/*特定在选择性别时有icon*/}
            {item.value === 'female' ? (
              <span style={{ paddingRight: 5 }}>
                <i className="iconfont iconfemale1"></i>
              </span>
            ) : (
              ''
            )}
            {item.value === 'male' ? (
              <span style={{ paddingRight: 5 }}>
                <i className="iconfont iconmale2"></i>
              </span>
            ) : (
              ''
            )}
            <span>{item.label}</span>
            {/*特定在选择户外活动时有tips*/}
            {item.value === 'low' ? (
              <div style={{ paddingRight: 5, color: '#666' }}>{`<1h/day`}</div>
            ) : (
              ''
            )}
            {item.value === 'moderate' ? (
              <div style={{ paddingRight: 5, color: '#666' }}>{`<1h/day`}</div>
            ) : (
              ''
            )}
            {item.value === 'high' ? (
              <div style={{ paddingRight: 5, color: '#666' }}>{`<1h/day`}</div>
            ) : (
              ''
            )}
          </label>
        ))}
      </div>
    </>
  );
}
