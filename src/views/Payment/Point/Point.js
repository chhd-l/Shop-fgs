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

const Point = ({ checkoutStore }) => {
  const { setSelectDiscountWay, setCurrentHoldingPoint, setEarnedPoint } =
    checkoutStore;
  const data = [
    {
      id: NOTUSEPOINT,
      name: <FormattedMessage id="Do not use points" />
    },
    { id: USEPOINT, name: <FormattedMessage id="Use points" /> }
  ];
  const initId = data[0].i;
  const [id, setId] = useState(initId);

  useEffect(() => {
    //初始化折扣方式为未使用积分
    setSelectDiscountWay(NOTUSEPOINT);

    setTimeout(() => {
      //获取当前积分
      setCurrentHoldingPoint(10872);
      //能挣得的积分
      setEarnedPoint(250);
    }, 2000);
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
    <div style={{ fontFamily: 'din-pro' }}>
      <div className="title text-rc-red mb-5">
        <span>
          <FormattedMessage id="Use Points" />
        </span>
        <span>
          <FormattedMessage id="Coupons" />
        </span>
        <span>
          <FormattedMessage id="Tickets" />
        </span>
      </div>
      <InputCircle data={data} getId={getId} />
      {FormType[id]}

      <style jsx>{`
        .title span::after {
          content: ' / ';
        }
        .title span:last-child::after {
          content: ' ';
        }
        .title span {
          font-size: 18px;
        }
        .content {
          background: #f6f6f6 !important;
        }
        .content .currentPoint {
          font-size: 14px;
          color: #666666;
          line-height: 20px;
          padding: 10px 0;
        }
        .content .currentPoint span {
          padding-left: 10px;
          font-size: 16px;
          font-weight: 500;
        }
        .content .form {
          font-size: 14px;
          color: #808285;
        }
        .content .tips {
          font-size: 12px;
          color: #666666;
          padding: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default inject('checkoutStore')(observer(Point));
