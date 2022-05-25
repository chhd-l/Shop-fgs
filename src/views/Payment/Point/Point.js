import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import InputCircle from '@/components/InputCircle';
import PointForm from '@/components/PointForm';
import { inject, observer } from 'mobx-react';
import {
  NOTUSEPOINT,
  USEPOINT
} from '@/views/Payment/PaymentMethod/paymentMethodsConstant';
import './Point.less';

const Point = ({ checkoutStore, loginStore }) => {
  const { setSelectDiscountWay, setEarnedPoint } = checkoutStore;

  const data = [
    {
      id: NOTUSEPOINT,
      name: <FormattedMessage id="payment.doNotUsePoints" />
    },
    { id: USEPOINT, name: <FormattedMessage id="payment.usepoints" /> }
  ];
  const initId = data[0].i;
  const [id, setId] = useState(initId);

  useEffect(() => {
    //初始化折扣方式为未使用积分
    setSelectDiscountWay(NOTUSEPOINT);

    // setTimeout(() => {
    //   //获取当前积分
    //   setCurrentHoldingPoint(10872);
    //   //能挣得的积分
    //   setEarnedPoint(250);
    // }, 2000);
  }, []);

  const FormType = {
    notUsePoint: null,
    usePoint: <PointForm />
  };

  const openPromotionBox = () => {
    document.getElementById('id-promotionCode').removeAttribute('disabled');
    document.getElementById('promotionApply').removeAttribute('disabled');
  };

  const disabledPromotionBox = () => {
    document.getElementById('id-promotionCode').setAttribute('disabled', true);
    document.getElementById('promotionApply').setAttribute('disabled', true);
  };

  const getId = (id) => {
    setId(id);
    switch (id) {
      case 'notUsePoint':
        //1.有积分删除积分
        //(1). 设置deletePromotionFlag true
        setSelectDiscountWay(id);
        //todo
        //2.打开promotionCode输入框
        openPromotionBox();
        break;
      case 'usePoint':
        //1.有promotion先删除
        //(1). 设置deletePromotionFlag 为false
        setSelectDiscountWay(id);
        //todo
        //2.禁用promotionCode输入框
        disabledPromotionBox();
        break;
    }
  };

  return (
    <div className="pointContainer">
      <div className="title text-rc-red mb-5">
        <span>
          <FormattedMessage id="payment.points" />
        </span>
        <span>
          <FormattedMessage id="payment.coupons" />
        </span>
        <span>
          <FormattedMessage id="payment.tickets" />
        </span>
      </div>
      <InputCircle data={data} getId={getId} />
      {FormType[id]}
    </div>
  );
};

export default inject('checkoutStore', 'loginStore')(observer(Point));
