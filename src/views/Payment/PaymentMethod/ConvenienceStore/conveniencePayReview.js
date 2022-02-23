import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import convenienceStoreLogo from '@/assets/images/convenience_store_logo.png';

const ConvenienceStorePayReview = ({ convenienceStore }) => {
  return (
    <>
      <div className="flex">
        <img src={convenienceStoreLogo} className="w-8 h-8 mt-1" />
        <div className="ml-4">
          <p className="text-lg text-black">
            <FormattedMessage id="Convenience Store" />
          </p>
          {convenienceStore}
        </div>
      </div>
    </>
  );
};

export default ConvenienceStorePayReview;
