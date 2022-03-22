import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import InputCircle from '@/components/InputCircle';
import PointForm from '@/components/PointForm';
import { inject, observer } from 'mobx-react';

const Point = ({ checkoutStore }) => {
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

  const FormType = {
    none: null,
    point: <PointForm />,
    coupons: null
  };

  const getId = (id) => {
    setId(id);
    if (id == 'coupons') {
      document.getElementById('id-promotionCode').removeAttribute('disabled');
      document.getElementById('id-promotionCode').focus();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      document
        .getElementById('id-promotionCode')
        .setAttribute('disabled', true);
    }
  };

  useEffect(() => {
    if (id != 'coupons') {
      document
        .getElementById('id-promotionCode')
        .setAttribute('disabled', true);
    }
  }, []);

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
