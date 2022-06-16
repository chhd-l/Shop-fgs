import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { formatMoney } from '@/utils/utils';

const OrderAllPrice = ({
  details,
  customTaxSettingOpenFlag,
  enterPriceType
}) => {
  return (
    <>
      {details ? (
        <div className="py-2 md:px-4">
          <div className="row mt-2 text-left">
            <div className="col-2 col-md-7 mb-2 rc-md-up">&nbsp;</div>
            <div
              className={`col-6 col-md-2 mb-2 ${
                window.__.env.REACT_APP_COUNTRY === 'tr'
                  ? 'tr-total-iVAIncluido'
                  : ''
              }`}
            >
              <span className="medium color-444">
                <FormattedMessage id="order.total" />
              </span>
              <span>&nbsp;</span>
              <span style={{ fontSize: '.8em' }}>
                <FormattedMessage id="order.iVAIncluido" defaultMessage=" " />
              </span>{' '}
            </div>
            <div className="col-6 col-md-3 text-right medium text-nowrap color-444">
              {formatMoney(
                !!details.tradePrice.installmentPrice
                  ? details.tradePrice.totalAddInstallmentPrice
                  : details.tradePrice.totalPrice
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OrderAllPrice;
