import React from 'react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';

const Point = () => {
  return (
    <>
      <div className="title">
        <span>
          <FormattedMessage id="use points" />
        </span>
        <span>
          <FormattedMessage id="coupons" />
        </span>
        <span>
          <FormattedMessage id="tickets" />
        </span>
      </div>

      <style jsx>{`
        .title span::after {
          content: ' / ';
        }
        .title span:last-child::after {
          content: ' ';
        }
      `}</style>
    </>
  );
};

export default Point;
