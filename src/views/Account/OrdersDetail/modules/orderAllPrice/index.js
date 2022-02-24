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
            <div className="col-6 col-md-2 mb-2">
              <FormattedMessage id="total" />
            </div>
            <div className="col-6 col-md-3 text-right text-nowrap">
              {formatMoney(details.tradePrice.goodsPrice)}
            </div>

            {details.tradePrice.subscriptionDiscountPrice ? (
              <>
                <div className="col-2 col-md-7 mb-2 rc-md-up">&nbsp;</div>
                <div className="col-6 col-md-2 mb-2 green">
                  <FormattedMessage id="promotion" />
                </div>
                <div className="col-6 col-md-3 text-right green text-nowrap">
                  -{formatMoney(details.tradePrice.subscriptionDiscountPrice)}
                </div>
              </>
            ) : null}

            {details.tradePrice.promotionVOList?.map((el) => (
              <>
                <div className="col-2 col-md-7 mb-2 rc-md-up">&nbsp;</div>
                <div className="col-6 col-md-2 mb-2 green">
                  {el.marketingName}
                </div>
                <div className="col-6 col-md-3 text-right green text-nowrap">
                  -{formatMoney(el.discountPrice)}
                </div>
              </>
            ))}

            <div className="col-2 col-md-7 mb-2 rc-md-up">&nbsp;</div>
            <div className="col-6 col-md-2 mb-2">
              <FormattedMessage id="order.shipping" />
            </div>
            <div className="col-6 col-md-3 text-right text-nowrap">
              {formatMoney(details.tradePrice.deliveryPrice)}
            </div>

            {details.tradePrice.freeShippingFlag ? (
              <>
                <div className="col-2 col-md-7 mb-2 rc-md-up">&nbsp;</div>
                <div className="col-6 col-md-2 mb-2 green">
                  <FormattedMessage id="payment.shippingDiscount" />
                </div>
                <div className="col-6 col-md-3 text-right green text-nowrap">
                  {details.tradePrice.freeShippingDiscountPrice > 0 && '-'}
                  {formatMoney(details.tradePrice.freeShippingDiscountPrice)}
                </div>
              </>
            ) : null}

            {customTaxSettingOpenFlag && enterPriceType === 'NO_TAX' ? (
              <>
                <div className="col-2 col-md-7 mb-2 rc-md-up">&nbsp;</div>
                <div className="col-6 col-md-2 mb-2">
                  <FormattedMessage id="estimatedTax" />
                </div>
                <div className="col-6 col-md-3 text-right text-nowrap">
                  {formatMoney(details.tradePrice.taxFeePrice)}
                </div>
              </>
            ) : (
              <></>
            )}

            {/* 分期手续费 */}
            {!!details.tradePrice.installmentPrice ? (
              <>
                <div className="col-2 col-md-7 mb-2 rc-md-up">&nbsp;</div>
                <div className="col-6 col-md-2 mb-2 red">
                  <FormattedMessage id="installMent.additionalFee" />
                </div>
                <div className="col-6 col-md-3 text-right red text-nowrap">
                  {formatMoney(
                    details.tradePrice.installmentPrice.additionalFee
                  )}
                </div>
              </>
            ) : null}

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
