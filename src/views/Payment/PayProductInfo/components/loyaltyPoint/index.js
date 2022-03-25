import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { observer, inject } from 'mobx-react';
import cn from 'classnames';
import LazyLoad from 'react-lazyload';
import { LOGO_POINT } from '@/utils/constant';

const LoyaltyPoint = ({ checkoutStore }) => {
  const { earnedPoint } = checkoutStore;
  return (
    <div
      style={{ fontFamily: 'din-pro' }}
      className={cn(earnedPoint > 0 ? '' : 'hidden')}
    >
      <div className="body m-3 mt-1 px-2 py-4 bg-gray-50 flex justify-between items-center">
        <div className="flex">
          <div className="mx-3 relative top-1">
            <LazyLoad>
              <img src={LOGO_POINT} className="w-3" alt="logo_point" />
            </LazyLoad>
          </div>
          <div className="word">
            <FormattedMessage id="Loyalty points to be earned" />{' '}
          </div>
        </div>
        <div className="point mr-2">+{earnedPoint}</div>
      </div>
      <div className="h-2"></div>

      <style jsx>{`
        .body {
          background-color: ##f6f6f6;
        }
        .word {
          font-size: 14px;
          color: #666;
        }
        .point {
          font-size: 16px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default inject('checkoutStore')(observer(LoyaltyPoint));
