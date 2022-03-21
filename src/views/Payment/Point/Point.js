import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import InputCircle from '@/components/InputCircle';

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
  const [CurrentHoldingPoint, setCurrentHoldingPoint] = useState(0);
  const [inputPoint, setUsePoint] = useState('');
  const [inputErr, setInputErr] = useState(false);

  const PointForm = () => {
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

  useEffect(() => {
    setTimeout(() => {
      setCurrentHoldingPoint(10872);
    }, 2000);
  }, []);

  useEffect(() => {
    if (inputPoint === '') {
      setInputErr(false);
    } else if (inputPoint > 0 && inputPoint < 100) {
      setInputErr(true);
    } else {
      setInputErr(false);
    }
  }, [inputPoint]);

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
