import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import underweightImage from '@/assets/images/dailyPortion/Cat_underweight.png';
import idealImage from '@/assets/images/dailyPortion/Cat_ideal.png';
import overweightImage from '@/assets/images/dailyPortion/Cat_overweight.png';

import './index.less';

const getImg = (key) => {
  switch (key) {
    case '3': return underweightImage;
    case '5': return idealImage;
    case '7': return overweightImage;
    default: return '';
  }
}
export default function BcsSelect(
  {
    label='',
    value='',
    options=[],
    ...rest
  }
){
  const { onChange } = rest;
  const [bCSValue, setBCSValue] = useState('');

  const handleChange = (key) => {
    onChange && onChange(key)
  }

  useEffect(() => {
    setBCSValue(value)
  }, [value])

  return (
    <div className='BcsSelect-wrap'>
      <div className="question-title">
        {label}
      </div>
      <div className='flex py-6 flex-col lg:flex-row lg:justify-between'>
        {
          options.map(item => (
            <div className='w-full lg:w-3/12 mb-4 lg:mb-0'>
              <div className={classNames(
                'flex BcsSelect-box p-4',
                {
                  'selected': bCSValue === item.key
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
