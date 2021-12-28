import React, { useEffect, useState } from 'react';
import './index.less';


export default function RadioButton(
  {
    label='',
    options=[],
    value='',
    type='petActivityCode', // 区别处理
    ...rest
  }
  ) {
  const [selectValue, setSelectValue] = useState('')

  const { onChange } = rest;

  const handleRadio = (key) => {
    if (!onChange) return;
    onChange(key)
  }

  useEffect(()=>{
    setSelectValue(value)
  }, [value])

  return (
    <div>
      <div className="question-title">
        {label}
      </div>
      <div className="radio-group">
        {options.map((item) => (
          <label
            key={item.key}
            className={`radio-button-wrapper p-2 ${
              selectValue === item.key ? 'radio-button-wrapper-checked' : ''
            }`}
            style={{
              // minHeight: 44,
              minHeight: type === 'petActivityCode' ? 76 : 44,
              flexDirection:
                type === 'petActivityCode' ? 'column' : 'row'
            }}
            onClick={() => {
              handleRadio(item.key)
            }}
          >
            {/*特定在选择性别时有icon*/}
            {item.key === 'female' ? (
              <span style={{ paddingRight: 5 }}>
                <i className="iconfont iconfemale1"/>
              </span>
            ) : (
              ''
            )}
            {item.key === 'male' ? (
              <span style={{ paddingRight: 5 }}>
                <i className="iconfont iconmale2"/>
              </span>
            ) : (
              ''
            )}
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
