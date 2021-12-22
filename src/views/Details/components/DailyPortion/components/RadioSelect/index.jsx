import React, { useState} from 'react';
import classNames from 'classnames';

export default function RadioSelect(
  {
    label='Is you pet neutered ? ', // 表单标题
    options= [],
    ...rest
  }
){
  const [checked, setChecked] = useState('')
  const { onChange } = rest;
  const handleChange = (e) => {
    let value = e.target.value;
    setChecked(value)
    onChange && onChange(value);
  }
  return (
    <div>
      <div className="question-title">
        { label }
      </div>
      <div className='flex items-center pt-6'>
        {
          options.map((item, index) => (
            <div className={classNames(
              'rc-input',
              {'ml-6': index > 0}
            )}>
              <input
                className="rc-input__radio"
                id={item.label}
                type="radio"
                value={item.key}
                name={item.label}
                checked={checked === item.key}
                onChange={handleChange}
              />
              <label
                className="rc-input__label--inline"
                for={item.label}
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
