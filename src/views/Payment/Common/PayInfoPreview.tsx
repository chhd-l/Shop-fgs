import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { formatDate } from '@/utils/utils';
import { USEPOINT } from '@/views/Payment/PaymentMethod/paymentMethodsConstant';
import LazyLoad from 'react-lazyload';
import { ConvenienceStorePayReview } from '@/views/Payment/PaymentMethod/index';
import {
  LOGO_ADYEN_COD,
  LOGO_POINT,
  LOGO_ADYEN_PAYPAL,
  LOGO_SWISH,
  LOGO_CASH,
  LOGO_POS
} from '@/utils/constant';

interface Props {
  selectDiscountWay?: any;
  convenienceStore?: any;
  email?: string;
  cardData?: any;
  paymentTypeCode?: any;
  buyWay: string;
}

const PayInfoPreview = ({
  selectDiscountWay,
  convenienceStore,
  email,
  cardData,
  paymentTypeCode,
  buyWay
}: Props) => {
  switch (paymentTypeCode) {
    case 'payu':
    case 'payu_ru':
    case 'payu_tu':
    case 'adyen_credit_card':
    case 'CYBER':
      return (
        <>
          <div className="col-12 col-md-6">
            <p className="medium">
              <FormattedMessage id="bankCard" />
            </p>
            <p>{cardData.holderNameDeco}</p>
            <p>{cardData.brandDeco}</p>
            {cardData.lastFourDeco ? (
              <p>{`************${cardData.lastFourDeco}`}</p>
            ) : null}
            {cardData.expirationDate ? (
              <p>
                {formatDate({
                  date: cardData.expirationDate,
                  // @ts-ignore
                  formatOption: {
                    year: 'numeric',
                    month: '2-digit'
                  }
                })}
              </p>
            ) : null}
          </div>
          {selectDiscountWay == USEPOINT ? <ShowUsePoint /> : null}
        </>
      );

    case 'cod':
      return (
        <div className="col-12 col-md-6">
          <FormattedMessage id="payment.codConfirmTip" />
        </div>
      );

    case 'adyen_paypal':
      return (
        <div className="col-12 col-md-6">
          <img src={LOGO_ADYEN_PAYPAL} className="w-24 ml-8" />
        </div>
      );

    case 'adyen_point_of_sale':
      return (
        <div className="col-12 col-md-6">
          <img src={LOGO_POS} className="w-10 ml-8" />
        </div>
      );

    case 'cash':
      return (
        <div className="col-12 col-md-6">
          <img src={LOGO_CASH} className="w-10 ml-8" />
        </div>
      );

    case 'adyen_convenience_store':
      return (
        <>
          <div className="col-12 col-md-6">
            <ConvenienceStorePayReview convenienceStore={convenienceStore} />
          </div>
          {selectDiscountWay == USEPOINT ? <ShowUsePoint /> : null}
          {buyWay === 'once' && (
            <p className="ml-4">
              <FormattedMessage
                id="ForConvenienceStorePayment"
                values={{ val: <span className="text-red-500">7</span> }}
              />
            </p>
          )}
        </>
      );

    case 'adyen_swish':
      return (
        <div className="col-12 col-md-6">
          <img src={LOGO_SWISH} className="w-24 ml-8" />
        </div>
      );

    case 'cod_japan':
      return (
        <>
          <div className="col-12 col-md-6 flex items-center pt-1 pb-3">
            <LazyLoad>
              <img src={LOGO_ADYEN_COD} className="w-10 ml-8 mr-2" />
            </LazyLoad>
            <span className="font-medium">
              <FormattedMessage id="cashOnDelivery" />
            </span>
          </div>
          {selectDiscountWay == USEPOINT ? <ShowUsePoint /> : null}
          <p className="text-red-500 ml-10">
            <FormattedMessage id="ForCashOnDelivery" />
          </p>
        </>
      );

    default:
      return <div className="col-12 col-md-6">{email}</div>;
  }
};

const ShowUsePoint = () => {
  return (
    <div className="col-12 col-md-6 flex items-center pt-1 pb-3">
      <LazyLoad>
        <img src={LOGO_POINT} className="w-5 ml-8 mr-2" />
      </LazyLoad>
      <span className="font-medium">
        <FormattedMessage id="usePoints" />
      </span>
    </div>
  );
};

export default PayInfoPreview;
