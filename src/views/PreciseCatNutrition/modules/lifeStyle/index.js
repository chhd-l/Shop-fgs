import React, { useContext, useEffect, useState } from 'react';
import '../RadioButton/index.less';
import { FormContext } from '../QuestionnaireForm';
import Tooltips from '../tooltips';

export default function LifeStyle({ questionData, id }) {
  const [checked, setChecked] = useState('');
  const [answerList, setAnswerList] = useState([]);
  const Context = useContext(FormContext);

  //初始化选中第一个
  useEffect(() => {
    let array = [];
    questionData.possibleValues.forEach((item) => {
      switch (item.key) {
        case 'indoor':
          array[0] = item;
          break;
        case 'noPreference':
          array[1] = item;
          break;
        case 'outdoor':
          array[2] = item;
          break;
      }
    });
    setAnswerList(array);
    if (Context.formData[questionData.name]) {
      setChecked(Context.formData[questionData.name]);
      Context.changeFormData(
        questionData.name,
        Context.formData[questionData.name]
      );
    } else {
      setChecked(array?.[0].key);
      Context.changeFormData(questionData.name, array?.[0].key);

      // setChecked(questionData.possibleValues?.[0].key);
      // Context.changeFormData(
      //   questionData.name,
      //   questionData.possibleValues?.[0].key
      // );
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
      <div
        className="radio-group"
        style={{
          maxWidth: '460px',
          width: 'auto',
          flexDirection: 'column',
          margin: '10px 0 20px 0'
        }}
      >
        {answerList.map((item) => (
          <label
            key={item.key}
            className={`radio-button-column-wrapper ${
              checked === item.key ? 'radio-button-column-wrapper-checked' : ''
            }`}
            style={{
              minHeight: 64,
              flexWrap: 'nowrap',
              maxWidth: '460px',
              padding: '8px',
              overflow: 'hidden'
            }}
            onClick={() => {
              setChecked(item.key);
              Context.changeFormData(questionData.name, item.key);
            }}
          >
            {/*特定icon*/}
            {item.key === 'indoor' ? (
              <>
                {checked === 'indoor' ? (
                  <img
                    src={require('../../../../assets/images/preciseCatNutrition/lifeStyle/IconsIndoors16.png')}
                  />
                ) : (
                  <img
                    src={require('../../../../assets/images/preciseCatNutrition/lifeStyle/IconsIndoors161.png')}
                  />
                )}
              </>
            ) : (
              ''
            )}
            {item.key === 'noPreference' ? (
              <>
                {checked === 'noPreference' ? (
                  <img
                    src={require('../../../../assets/images/preciseCatNutrition/lifeStyle/IconsIndoor Outdoor161.png')}
                  />
                ) : (
                  <img
                    src={require('../../../../assets/images/preciseCatNutrition/lifeStyle/IconsIndoor Outdoor16.png')}
                  />
                )}
              </>
            ) : (
              ''
            )}
            {item.key === 'outdoor' ? (
              <>
                {checked === 'outdoor' ? (
                  <img
                    src={require('../../../../assets/images/preciseCatNutrition/lifeStyle/IconsOutdoor161.png')}
                  />
                ) : (
                  <img
                    src={require('../../../../assets/images/preciseCatNutrition/lifeStyle/IconsOutdoor16.png')}
                  />
                )}
              </>
            ) : (
              ''
            )}
            <span
              style={{
                flex: 1,
                wordBreak: 'break-word',
                textAlign: 'left',
                paddingLeft: '15px'
              }}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </>
  );
}
