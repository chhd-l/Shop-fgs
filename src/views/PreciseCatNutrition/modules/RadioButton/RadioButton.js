import React, { useContext, useEffect, useState } from 'react';
import './index.less';
import { FormContext } from '../QuestionnaireForm';
import Tooltips from '../tooltips';
export default function RadioButton({ questionData, id }) {
  const [checked, setChecked] = useState('');
  const Context = useContext(FormContext);

  //初始化选中第一个
  useEffect(() => {
    if (Context.formData[questionData.name]) {
      setChecked(Context.formData[questionData.name]);
      Context.changeFormData(
        questionData.name,
        Context.formData[questionData.name]
      );
    } else {
      setChecked(questionData.possibleValues?.[0].key);
      Context.changeFormData(
        questionData.name,
        questionData.possibleValues?.[0].key
      );
    }
  }, [questionData.name]);

  return (
    <>
      <div className="question-title">
        {questionData.metadata.label}
        {questionData.metadata.description ? (
          <Tooltips description={questionData.metadata.description} />
        ) : (
          ''
        )}
      </div>
      <div className="radio-group">
        {questionData.possibleValues.map((item) => (
          <label
            key={item.key}
            className={`radio-button-wrapper ${
              checked === item.key ? 'radio-button-wrapper-checked' : ''
            }`}
            style={{
              minHeight: 44,
              height: questionData.name === 'petActivityCode' ? 76 : 'auto',
              flexDirection:
                questionData.name === 'petActivityCode' ? 'column' : 'row'
            }}
            onClick={() => {
              setChecked(item.key);
              Context.changeFormData(questionData.name, item.key);
            }}
          >
            {/*特定在选择性别时有icon*/}
            {item.key === 'female' ? (
              <span style={{ paddingRight: 5 }}>
                <i className="iconfont iconfemale1"></i>
              </span>
            ) : (
              ''
            )}
            {item.key === 'male' ? (
              <span style={{ paddingRight: 5 }}>
                <i className="iconfont iconmale2"></i>
              </span>
            ) : (
              ''
            )}

            <span>{item.label}</span>

            {/*特定在选择户外活动时有tips*/}
            {/*{item.key === 'low' ? (*/}
            {/*  <div style={{ paddingRight: 5, color: '#666' }}>{`<1h/day`}</div>*/}
            {/*) : (*/}
            {/*  ''*/}
            {/*)}*/}
            {/*{item.key === 'moderate' ? (*/}
            {/*  <div style={{ paddingRight: 5, color: '#666' }}>{`<2h/day`}</div>*/}
            {/*) : (*/}
            {/*  ''*/}
            {/*)}*/}
            {/*{item.key === 'high' ? (*/}
            {/*  <div style={{ paddingRight: 5, color: '#666' }}>{`>3h/day`}</div>*/}
            {/*) : (*/}
            {/*  ''*/}
            {/*)}*/}
          </label>
        ))}
      </div>
    </>
  );
}
