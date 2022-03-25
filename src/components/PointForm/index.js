import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';

const PointForm = ({ checkoutStore }) => {
  const [CurrentHoldingPoint, setCurrentHoldingPoint] = useState(0);
  const [inputPoint, setInputPoint] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const { tradePrice, inputPointErr, setInputPointErr } = checkoutStore;

  const MinPointMsg = () => {
    return <FormattedMessage id="Only 100 or more points can be used" />;
  };

  const MaxPointMsg = ({ CurrentHoldingPoint }) => {
    return (
      <>
        <FormattedMessage id="Current holding points equals to" />
        {CurrentHoldingPoint}
      </>
    );
  };

  const OverPointMsg = ({ tradePrice }) => {
    return (
      <>
        <FormattedMessage id="Use points are valid only for total price or less, in this case " />
        {tradePrice}
      </>
    );
  };

  useEffect(() => {
    if (inputPoint > tradePrice) {
      setInputPointErr(true);
      setErrMsg(<OverPointMsg tradePrice={tradePrice} />);
      return;
    }

    if (inputPoint === '') {
      setInputPointErr(false);
    } else if (inputPoint > 0 && inputPoint < 100) {
      setInputPointErr(true);
      setErrMsg(<MinPointMsg />);
    } else if (inputPoint > 100 && inputPoint <= CurrentHoldingPoint) {
      setInputPointErr(false);
    } else {
      setInputPointErr(true);
      setErrMsg(<MaxPointMsg CurrentHoldingPoint={CurrentHoldingPoint} />);
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
            inputPointErr ? 'border-red-600' : 'border-gray-500'
          )}
          onChange={(e) => setInputPoint(e.target.value)}
        />
        <span className="pl-2 text-16">pt</span>
      </form>
      <span className={cn(inputPointErr ? 'text-12 text-red-600' : 'hidden')}>
        {errMsg}
      </span>
      <div className="tips">
        <FormattedMessage id="Points can be used in 1pt increment of 100 pt or more." />
        <br />
        <FormattedMessage id="Please enter the number of points you want to use" />
      </div>
    </div>
  );
};

export default inject('checkoutStore')(observer(PointForm));
