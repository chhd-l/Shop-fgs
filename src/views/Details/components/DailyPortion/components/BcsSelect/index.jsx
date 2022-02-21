import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { optimizeImage } from '@/utils/utils';

import './index.less';

const getImg = (key) => {
  switch (key) {
    case 3:
      return `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/dailyPortion/Cat_underweight.png`;
    case 5:
      return `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/dailyPortion/Cat_ideal.png`;
    case 7:
      return `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/dailyPortion/Cat_overweight.png`;
    default:
      return '';
  }
};
export default function BcsSelect({
  label = '',
  value = '',
  options = [],
  ...rest
}) {
  const { onChange } = rest;
  const [bCSValue, setBCSValue] = useState('');

  const handleChange = (key) => {
    onChange && onChange(key);
  };

  useEffect(() => {
    setBCSValue(value);
  }, [value]);

  return (
    <div className="BcsSelect-wrap">
      <div className="question-title">{label}</div>
      <div className="flex py-6 flex-col lg:flex-row lg:justify-between">
        {options.map((item) => (
          <div className="w-full lg:w-3/10 mb-4 lg:mb-0" key={item.key}>
            <div
              className={classNames('flex BcsSelect-box p-4', {
                selected: bCSValue === item.key
              })}
              onClick={() => handleChange(item.key)}
            >
              <img
                src={optimizeImage({
                  originImageUrl: getImg(item.key),
                  width: 100
                })}
                alt={item.label}
              />
              <div className="pl-4">
                <p className={classNames('pb-2 BcsSelect-box-title')}>
                  {item.label}
                </p>
                <p className="BcsSelect-box-text">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
