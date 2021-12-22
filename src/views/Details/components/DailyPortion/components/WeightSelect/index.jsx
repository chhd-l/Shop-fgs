import React, { useState, useEffect } from 'react';

export default function WeightSelect(
  {
    label='Current pet weight',
    unit='Kg',
    ...rest
  }
){
  const [weight, setWeight] = useState('')
  const { onChange } = rest;

  const changeNumValue = (e) => {
    let value = e.target.value;
    console.log('value', value);
    value = (value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    // if (!tmpVal) return setWeight('')
    // tmpVal.replace(/[^\d\.]/g, '');
    // let reg = /^(0|([1-9]\d*))(\.\d{1,2})?$/; //正则验证保留 最多允许后输入两位小数
    //
    // if (!reg.test(tmpVal)) {
    //   tmpVal = tmpVal + "";
    //   tmpVal = tmpVal.substring(0, tmpVal.indexOf(".") + 3);
    //   let n = (tmpVal.split('.')).length - 1;
    //   if (n > 1) {
    //     tmpVal = tmpVal.substring(0, tmpVal.indexOf("."));
    //   }
    // }
    setWeight(value);
  }

  useEffect(() => {
    onChange && onChange(weight)
  }, [weight])

  return (
    <div>
      <div className="question-title">
        {label}
      </div>
      <div className='flex rc-input items-center' style={{width: '100px', borderBottom: '2px solid #d7d7d7'}}>
        <input
          className='rc-input__control'
          type={'number'}
          value={weight}
          onChange={changeNumValue}
        />
        <span>{unit}</span>
      </div>
    </div>
  )
}
