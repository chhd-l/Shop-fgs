import React, { useState, useEffect } from 'react';

export default function WeightSelect({
  label = 'Current pet weight',
  value = '',
  unit = 'Kg',
  ...rest
}) {
  const [weight, setWeight] = useState('');
  const { onChange } = rest;

  const changeNumValue = (e) => {
    let value = e.target.value;
    value = value.match(/^\d*(\.?\d{0,2})/g)[0] || undefined; //小数点后2位
    onChange(value);
  };

  const blockInvalidChar = (e) => {
    return ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
  };

  useEffect(() => {
    setWeight(value);
  }, [value]);

  return (
    <div>
      <div className="question-title">{label}</div>
      <div
        className="flex rc-input items-center"
        style={{ width: '100px', borderBottom: '2px solid #d7d7d7' }}
      >
        <input
          className="rc-input__control"
          type="number"
          value={weight}
          name="weight"
          onKeyDown={blockInvalidChar}
          onChange={changeNumValue}
        />
        <span>{unit}</span>
      </div>
    </div>
  );
}
