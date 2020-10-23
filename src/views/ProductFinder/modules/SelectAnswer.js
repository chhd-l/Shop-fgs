import React, { useState, useEffect } from 'react';
import Selection from '@/components/Selection';

const RadioAnswer = (props) => {
  const [form, setFormData] = useState(
    Array(props.config.list.length).fill('')
  );
  // const [updateId, setUpdateId] = useState('');

  function handleSelectChange(data, idx) {
    form.splice(idx, 1, data.value);
    setFormData(form);
    // setUpdateId(new Date().getTime());
  }

  // useEffect(() => {
  //   props.updateFromData(updateId);
  //   console.log(111, form, updateId);
  //   console.log(111, form);
  // }, [updateId]);

  return (
    <>
      <h4 className="mb-4 red">{props.config.title}</h4>
      <div className="row mb-4">
        {props.config.list.map((ele, i) => (
          <span
            className={`rc-select rc-full-width rc-input--full-width rc-select-processed col-6 ${JSON.stringify(
              form
            )}`}
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

      {/* {props.config.list.map((ele, i) => (
        <div
          key={i}
          className="rc-input rc-margin-y--xs rc-input--full-width ml-2"
        >
          <input
            className="rc-input__radio"
            id={`pro-finder-answer-${i}`}
            type="radio"
            name="buyWay"
            value={i}
            onChange={(event) => handleRadioChange(event, i)}
            checked={ele.selected}
          />
          <label
            className="rc-input__label--inline"
            htmlFor={`pro-finder-answer-${i}`}
          >
            {ele}
          </label>
        </div>
      ))} */}
    </>
  );
};

export default RadioAnswer;
