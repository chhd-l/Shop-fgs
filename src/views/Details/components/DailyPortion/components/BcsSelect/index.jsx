import React, { useState } from 'react';
import classNames from 'classnames';

import radioImage1 from '@/assets/images/preciseCatNutrition/radio.png';
import radioImage2 from '@/assets/images/preciseCatNutrition/radio1.png';
import radioImage3 from '@/assets/images/preciseCatNutrition/radio2.png';

import './index.less';

const getImg = (key) => {
  switch (key) {
    case '3': return radioImage1;
    case '5': return radioImage2;
    case '7': return radioImage3;
    default: return '';
  }
}
export default function BcsSelect(
  {
    label='',
    options=[],
    ...rest
  }
){
  const { onChange } = rest;
  const [value, setValue] = useState('');

  const handleChange = (key) => {
    setValue(key)
    onChange && onChange(key)
  }

  return (
    <div className='BcsSelect-wrap'>
      <div className="question-title">
        {label}
      </div>
      <div className='flex py-6 flex-col lg:flex-row lg:justify-between'>
        {
          options.map(item => (
            <div className='w-full lg:w-50 p-4'>
              <div className={classNames(
                'flex BcsSelect-box',
                {
                  'selected': value === item.key
                }
              )}
                   onClick={() => handleChange(item.key)}
              >
                <img src={getImg(item.key)} alt={item.label}/>
                <div className='pl-4'>
                  <p className={classNames(
                    'pb-2 BcsSelect-box-title',
                  )}>{item.label}</p>
                  <p className='BcsSelect-box-text'>{item.description}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
