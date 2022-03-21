import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';

const PointForm = ({}) => {
  const [CurrentHoldingPoint, setCurrentHoldingPoint] = useState(0);
  const [inputPoint, setUsePoint] = useState('');
  const [inputErr, setInputErr] = useState(false);

  useEffect(() => {
    if (inputPoint === '') {
      setInputErr(false);
    } else if (inputPoint > 0 && inputPoint < 100) {
      setInputErr(true);
    } else {
      setInputErr(false);
    }
  }, [inputPoint]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentHoldingPoint(10872);
    }, 2000);
  }, []);

  return (
    <div className="content pl-5 py-2">
      <div className="currentPoint">
        <FormattedMessage id="Current holding points" />
        <span>{CurrentHoldingPoint} pt</span>
      </div>
      <form className="form">
        <label>
          <FormattedMessage id="Points to use" />
        </label>
        <br />
        <input
          type="text"
          value={inputPoint}
          className={cn(
            'p-2 text-16 border rounded',
            inputErr ? 'border-red-600' : 'border-gray-500'
          )}
          onChange={(e) => setUsePoint(e.target.value)}
        />
        <span className="pl-2 text-16">pt</span>
      </form>
      <span className={cn(inputErr ? 'text-12 text-red-600' : 'hidden')}>
        <FormattedMessage id="Only 100 or more points can be used" />
      </span>
      <div className="tips">
        <FormattedMessage id="Points can be used in 1pt increment of 100 pt or more." />
        <br />
        <FormattedMessage id="Please enter the number of points you want to use" />
      </div>
    </div>
  );
};

export default PointForm;
