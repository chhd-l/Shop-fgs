import React, { useState } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import './index.less';

//圆形单选框
const InputCircle = ({
  data,
  horizontal = false,
  fontSize = '16px',
  getId = () => {},
  checkoutStore
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentId, setCurrentId] = useState(data[0].id);
  const { setInputPoint } = checkoutStore;
  const handleChange = (item, i) => {
    setInputPoint('');
    setCurrentIndex(i);
    setCurrentId(item.id);
    getId(item.id);
  };
  return (
    <>
      {data.map((item, i) => (
        <div
          className={cn(
            'input-circle',
            'rc-input',
            horizontal == true ? 'rc-input--inline' : '',
            horizontal == true ? '' : 'my-2'
          )}
          key={i}
        >
          <input
            className="rc-input__radio"
            id={`input-circle-${i}`}
            value={item.id}
            type="radio"
            name="input-circle"
            onChange={() => handleChange(item, i)}
            checked={currentIndex === i}
          />
          <label
            className={cn('rc-input__label--inline')}
            style={{ fontSize }}
            htmlFor={`input-circle-${i}`}
          >
            {item.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default inject('checkoutStore')(observer(InputCircle));
