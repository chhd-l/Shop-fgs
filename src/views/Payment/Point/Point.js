import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import InputCircle from '@/components/InputCircle';
import PointForm from '@/components/PointForm';

const Point = () => {
  const data = [
    {
      id: 'none',
      name: <FormattedMessage id="Do not use points / coupons / tickets" />
    },
    { id: 'point', name: <FormattedMessage id="Use points" /> },
    { id: 'coupons', name: <FormattedMessage id="Use coupons / tickets" /> }
  ];
  const initId = data[0].i;
  const [id, setId] = useState(initId);

  const CouponForm = () => {
    return (
      <>
        <div>CouponForm</div>
      </>
    );
  };

  const FormType = {
    none: null,
    point: <PointForm />,
    coupons: <CouponForm />
  };

  const getId = (id) => {
    setId(id);
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

export default Point;
