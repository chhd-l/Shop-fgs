import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

export default function RadioSelect(
  {
    label='Is you pet neutered ? ', // 表单标题
    value='',
    options= [],
    ...rest
  }
){
  const [checked, setChecked] = useState('')
  const { onChange } = rest;
  const handleChange = (e) => {
    let value = e.target.value;
    onChange && onChange(value);
  }
  useEffect(() => {
    setChecked(value)
  }, [value])
  return (
    <div>
      <div className="question-title">
        { label }
      </div>
      <div className='flex items-center lg:pt-6'>
        {
          options.map((item, index) => (
            <div className={classNames(
              'rc-input',
              {'ml-6': index > 0}
            )}>
              <input
                className="rc-input__radio"
                id={`DailyPortion-neutered-${item.key}`}
                type="radio"
                value={item.key}
                name={`DailyPortion-neutered-${item.key}`}
                checked={checked === item.key}
                onChange={handleChange}
              />
              <label
                className="rc-input__label--inline"
                for={`DailyPortion-neutered-${item.key}`}
              >
                {item.label}
              </label>
            </div>
          ))
        }
      </div>
    </div>
  )
}
