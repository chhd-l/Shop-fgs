import React, { useState, useEffect } from 'react';

const RadioAnswer = (props) => {
  const [form, setFormData] = useState('');
  // setInterval(() => {
  //   if (progress < 101) {
  //     setProgress((c) => c + 1);
  //   }
  // }, 3000);

  function handleRadioChange(e, idx) {
    setFormData(idx + '');
  }

  useEffect(() => {
    props.updateFromData(form);
  }, [form]);

  return (
    <>
      <h4 className="mb-4 red">{props.config.title}</h4>
      {props.config.list.map((ele, i) => (
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
      ))}
    </>
  );
};

export default RadioAnswer;
