import React, { useState } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';

//圆形单选框
const InputCircle = ({
  data,
  horizontal = false,
  fontSize = '16px',
  getId = () => {}
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentId, setCurrentId] = useState(data[0].id);
  const handleChange = (item, i) => {
    setCurrentIndex(i);
    setCurrentId(item.id);
    getId(item.id);
  };
  return (
    <>
      {data.map((item, i) => (
        <div
          className={cn(
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
      <style>{`
            label{
                color:"#666"
            }
        `}</style>
    </>
  );
};

export default InputCircle;
