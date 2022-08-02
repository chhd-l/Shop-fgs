import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import InputCircle from '@/components/InputCircle';
import PointForm from '@/components/PointForm';
import { inject, observer } from 'mobx-react';
import {
  NOTUSEPOINT,
  USEPOINT
} from '@/views/Checkout/PaymentMethod/paymentMethodsConstant';
import './Point.less';
import {
  openPromotionBox,
  disabledPromotionBox
} from '@/views/Checkout/modules/utils';

const Point = ({ checkoutStore }) => {
  const { setSelectDiscountWay, setInputPoint } = checkoutStore;

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
    setInputPoint('');
  }, []);

  const FormType = {
    notUsePoint: null,
    usePoint: <PointForm />
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
    <>
      <div className="pointContainer">
        <div className="title text-rc-red mb-3 mt-2">
          <span>
            <FormattedMessage id="payment.points" />
          </span>
          {/* <span>
            <FormattedMessage id="payment.coupons" />
          </span>
          <span>
            <FormattedMessage id="payment.tickets" />
          </span> */}
        </div>
        <InputCircle data={data} getId={getId} />
        {FormType[id]}
      </div>
    </>
  );
};

export default inject('checkoutStore', 'loginStore')(observer(Point));
