import React, { useState } from 'react';
import Selection from '@/components/Selection';

const RadioAnswer = (props) => {
  const [form, setFormData] = useState(
    Array(props.config.list.length).fill('')
  );

  function handleSelectChange(data, idx) {
    form.splice(idx, 1, data.value);
    setFormData(form);
    props.updateFromData(form);
  }
  return (
    <>
      <h4 className="mb-4 red">{props.config.title}</h4>
      <div className="row mb-4">
        {props.config.list.map((ele, i) => (
          <span
            className={`rc-select rc-full-width rc-input--full-width rc-select-processed col-6`}
            key={i}
          >
            <Selection
              optionList={ele.map((item) => ({ value: item, name: item }))}
              selectedItemChange={(data) => handleSelectChange(data, i)}
              selectedItemData={{
                value: form[i]
              }}
              key={`${i}-${form}`}
              placeholder={i ? 'Month' : 'Year'}
            />
          </span>
        ))}
      </div>
    </>
  );
};

export default RadioAnswer;
