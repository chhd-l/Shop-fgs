import React, { useContext, useEffect, useState } from 'react';
import Selection from '@/components/Selection';
import { FormattedMessage } from 'react-intl-phraseapp';
import { FormContext } from '../QuestionnaireForm';
import Tooltips from '../tooltips';

export default function AgeSelect({ config, questionData }) {
  const [form, setForm] = useState(Array(config.list.length).fill(-1));
  const Context = useContext(FormContext);

  useEffect(() => {
    if (Context.formData[questionData.name]) {
      let MonthNum = Context.formData[questionData.name];
      if (questionData.name === 'age') {
        setForm([
          parseInt(MonthNum - (MonthNum % 12)).toString(),
          (MonthNum % 12).toString()
        ]);
      }
      if (questionData.name === 'weight') {
        setForm([MonthNum]);
      }
    } else {
      setForm(Array(config.list.length).fill(-1));
      Context.changeFormData(questionData.name, '');
    }
  }, [questionData.name]);

  const handleSelectChange = (data, idx) => {
    let sum = 0;
    form.splice(idx, 1, data.value);
    console.log(form);
    form.forEach((item) => {
      if (item !== -1) {
        sum = sum + parseInt(item);
      }
    });
    Context.changeFormData(questionData.name, sum);
    setForm(form);
  };
  return (
    <div>
      <div className="question-title">
        {questionData.metadata.label}
        {questionData.metadata.description ? (
          <Tooltips
            description={questionData.metadata.description}
            isIdea={questionData.name === 'weight'}
            isArray={questionData.name === 'weight'}
          />
        ) : (
          ''
        )}
      </div>
      <div className="row" style={{ marginTop: '-8px' }}>
        {config.list.map((ele, i) => (
          <span
            className={`rc-select rc-full-width rc-input--full-width rc-select-processed col-6`}
            key={i}
          >
            <Selection
              optionList={ele.map((item) => ({
                value: item.key,
                name: item.label
              }))}
              selectedItemChange={(data) => handleSelectChange(data, i)}
              selectedItemData={{
                value: form[i]
              }}
              key={`${i}-${form}`}
              placeholder={config.placeholderList[i]}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
