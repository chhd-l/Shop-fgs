import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';

const PointForm = ({ checkoutStore }) => {
  const [errMsg, setErrMsg] = useState('');
  const {
    tradePrice,
    inputPoint,
    setInputPoint,
    inputPointErr,
    setInputPointErr,
    CurrentHoldingPoint,
    setCurrentHoldingPoint
  } = checkoutStore;
  const [minUsedPoint, setMinUsedPoint] = useState(10);

  const MinPointMsg = () => {
    return (
      <FormattedMessage
        id="checkout.point.minPointMsg"
        values={{ val: minUsedPoint }}
      />
    );
  };

  const MaxPointMsg = ({ CurrentHoldingPoint }) => {
    return (
      <>
        <FormattedMessage id="Current holding points equals to " />
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
    //在checkoutStore里面存储输入的积分
    setInputPoint(inputPoint);
    //

    //判断输入的积分是否符合条件
    //(1)首要判断 积分大于价格  直接报错
    if (inputPoint > tradePrice) {
      setInputPointErr(true);
      setErrMsg(<OverPointMsg tradePrice={tradePrice} />);
      return;
    }
    //(2)积分其他判断条件
    if (inputPoint === '') {
      setInputPointErr(false);
    } else if (inputPoint > 0 && inputPoint < minUsedPoint) {
      setInputPointErr(true);
      setErrMsg(<MinPointMsg />);
    } else if (inputPoint > minUsedPoint && inputPoint <= CurrentHoldingPoint) {
      setInputPointErr(false);
    } else {
      setInputPointErr(true);
      setErrMsg(<MaxPointMsg CurrentHoldingPoint={CurrentHoldingPoint} />);
    }
    //
  }, [inputPoint]);

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
        <FormattedMessage
          id="checkout.point.tips1"
          values={{ val: minUsedPoint }}
        />
        <br />
        <FormattedMessage id="Please enter the number of points you want to use" />
      </div>
    </div>
  );
};

export default inject('checkoutStore')(observer(PointForm));
