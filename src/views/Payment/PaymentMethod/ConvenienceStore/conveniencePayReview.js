import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { optimizeImage } from '@/utils/utils';

const ConvenienceStorePayReview = ({ convenienceStore }) => {
  const convenienceStoreLogoSrc =
    'https://fgs-cdn.azureedge.net/cdn/img/payment/logo-convenience-store.svg';
  return (
    <>
      <div className="flex">
        <img
          src={optimizeImage({
            originImageUrl: convenienceStoreLogoSrc
          })}
          className="w-8 h-8 mt-1"
        />
        <div className="ml-4">
          <p className="text text-black">
            <FormattedMessage id="Convenience Store" />
          </p>
          <FormattedMessage id={convenienceStore} />
        </div>
      </div>
    </>
  );
};

export default ConvenienceStorePayReview;
