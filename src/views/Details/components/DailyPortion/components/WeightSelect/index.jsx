import React, { useState, useEffect } from 'react';

export default function WeightSelect(
  {
    label='Current pet weight',
    value='',
    unit='Kg',
    ...rest
  }
){
  const [weight, setWeight] = useState('')
  const { onChange } = rest;

  const changeNumValue = (e) => {
    let value = e.target.value;
    // value = (value.match(/^\d*(\.?\d{0,2})/g)[0]) || null //小数点后2位
    onChange(value);
  }

  // const handleBlur = (e) => {
  //   let num = parseFloat(e.target.value);
  //   let cleanNum = num.toFixed(2);
  //   onChange(cleanNum);
  // }

  useEffect(() => {
    setWeight(value)
  }, [value])

  return (
    <div>
      <div className="question-title">
        {label}
      </div>
      <div className='flex rc-input items-center' style={{width: '100px', borderBottom: '2px solid #d7d7d7'}}>
        <input
          className='rc-input__control'
          type='number'
          value={weight}
          onChange={changeNumValue}
          // onBlur={handleBlur}
        />
        <span>{unit}</span>
      </div>
    </div>
  )
}
