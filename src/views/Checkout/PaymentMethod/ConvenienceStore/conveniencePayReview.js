import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { LOGO_ADYEN_CONVENIENCE_STORE } from '@/utils/constant';

const ConvenienceStorePayReview = ({ convenienceStore }) => {
  return (
    <>
      <div className="flex">
        <img src={LOGO_ADYEN_CONVENIENCE_STORE} className="w-8 h-8 mt-1" />
        <div className="ml-4">
          <p className="text text-black">
            <FormattedMessage id="Convenience Store" />
          </p>
          {convenienceStore ? <FormattedMessage id={convenienceStore} /> : ''}
        </div>
      </div>
    </>
  );
};

export default ConvenienceStorePayReview;
