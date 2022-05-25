import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { ownerTotalPoints } from '@/api/payment';

const PointForm = ({ checkoutStore, loginStore }) => {
  const { customerId } = loginStore.userInfo;
  const [errMsg, setErrMsg] = useState('');
  const {
    tradePrice,
    inputPoint,
    setInputPoint,
    inputPointErr,
    setInputPointErr,
    CurrentHoldingPoint,
    setCurrentHoldingPoint,
    loyaltyPointsMinimum,
    loyaltyPointsMaximum,
    isCanUsePoint,
    setInputPointOk
  } = checkoutStore;

  const MinPointMsg = () => {
    return (
      <FormattedMessage
        id="checkout.point.minPointMsg"
        values={{ val: loyaltyPointsMinimum }}
      />
    );
  };

  const MaxPointMsg = ({ loyaltyPointsMaximum }) => {
    return (
      <>
        <FormattedMessage id="payment.maxPoint" />
        &nbsp;{loyaltyPointsMaximum}
      </>
    );
  };

  const OverPointMsg = ({ CurrentHoldingPoint }) => {
    return (
      <>
        <FormattedMessage id="payment.overPoint" />
        &nbsp;{CurrentHoldingPoint}
      </>
    );
  };

  useEffect(() => {
    //获取当前积分
    ownerTotalPoints({ customerId })
      .then((res) => {
        setCurrentHoldingPoint(res.context.totalPoints);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    //在checkoutStore里面存储输入的积分
    setInputPoint(inputPoint);
    //

    //每次inputPoint改变时设置输入状态初始值为false
    setInputPointOk(false);

    //判断输入的积分是否符合条件
    //(1)首要判断 积分大于价格  直接报错
    if (inputPoint > CurrentHoldingPoint) {
      setInputPointErr(true);
      setErrMsg(<OverPointMsg CurrentHoldingPoint={CurrentHoldingPoint} />);
      return;
    }
    //(2)积分其他判断条件
    if (inputPoint === '') {
      setInputPointErr(false);
    } else if (inputPoint > 0 && inputPoint < loyaltyPointsMinimum) {
      setInputPointErr(true);
      setErrMsg(<MinPointMsg />);
    } else if (
      inputPoint >= loyaltyPointsMinimum &&
      inputPoint <= loyaltyPointsMaximum
    ) {
      setInputPointErr(false);
      setInputPointOk(true);
    } else {
      setInputPointErr(true);
      setErrMsg(<MaxPointMsg loyaltyPointsMaximum={loyaltyPointsMaximum} />);
    }
    //
  }, [inputPoint]);

  return (
    <div className="content pl-5 py-2">
      <div className="currentPoint">
        <FormattedMessage id="payment.currentHoldingPoints" />
        <span>{CurrentHoldingPoint} pt</span>
      </div>
      <form className="form">
        <label>
          <FormattedMessage id="payment.pointsToUse" />
        </label>
        <br />
        <input
          type="number"
          //disabled={!isCanUsePoint}
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
          values={{ val: loyaltyPointsMinimum }}
        />
        <br />
        <FormattedMessage id="payment.enterPointYouwantToUse" />
      </div>
    </div>
  );
};

export default inject('checkoutStore', 'loginStore')(observer(PointForm));
