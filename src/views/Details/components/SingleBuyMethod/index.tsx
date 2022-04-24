import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { formatMoney } from '@/utils/utils';

interface Props {
  configStore: any;
  form: any;
  skuPromotions: any;
  selectedSpecItem: any;
  currentUnitPrice: any;
  currentSubscriptionPrice: any;
  changeMethod: Function;
  changeFreqency: Function;
  children: any;
}

const SingleBuyMethod = ({
  form,
  skuPromotions,
  configStore,
  selectedSpecItem,
  currentUnitPrice,
  currentSubscriptionPrice,
  changeMethod,
  changeFreqency,
  children
}: Props) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  return (
    <div
      className={`buyMethod rc-margin-bottom--xs d-flex row align-items-md-center justify-content-between flex-wrap-reverse 1 ml-0 mr-0 ui-cursor-pointer-pure ${
        form.buyWay === 0 ? 'border-red' : 'border-d7d7d7'
      }`}
      onClick={changeMethod.bind(this)}
    >
      <div className="radioBox order-1 md:order-1 col-8 px-0">
        <div className="rc-input rc-input--inline rc-input--full-width mr-0">
          <FormattedMessage id="email">
            {(txt) => (
              <input
                className="rc-input__radio"
                id="type_once"
                type="radio"
                name="buyWay"
                value="0"
                key="0"
                // onChange={(event) =>
                //   this.handleInputChange(event)
                // }
                checked={form.buyWay === 0}
              />
            )}
          </FormattedMessage>
          <label className="rc-input__label--inline" htmlFor="type_once">
            <span
              style={{
                fontWeight: 400,
                color: '#333'
              }}
            >
              <FormattedMessage id="singlePurchase" />
            </span>
          </label>
          <br />
          {form.buyWay === 0 ? (
            <div className="freeshippingBox">
              <FormattedMessage
                id={
                  window.__.env.REACT_APP_COUNTRY == 'tr' ||
                  window.__.env.REACT_APP_COUNTRY == 'se'
                    ? 'oneoffFreeShipping'
                    : 'freeShipping'
                }
              />
            </div>
          ) : null}
        </div>
      </div>
      {/* <div className="freqency order-3 md:order-2 col-12 col-md-4 text-center">
        <FormattedMessage id="deliveryOneTimeOnly" />
      </div> */}
      <div className="price font-weight-normal text-right position-relative order-2 md:order-3 col-4 text-nowrap px-0">
        <div>
          {formatMoney(currentUnitPrice)}
          <span className="red unit-star">
            <FormattedMessage id="starUnit" defaultMessage=" " />
          </span>
        </div>
        {form.buyWay === 0 &&
        configStore?.info?.storeVO?.basePricePDPShowedFlag &&
        selectedSpecItem?.goodsInfoWeight &&
        selectedSpecItem?.goodsInfoUnit ? (
          <div
            style={{
              fontSize: '.875rem',
              color: '#999'
            }}
          >
            {formatMoney(
              (
                currentUnitPrice / parseFloat(selectedSpecItem.goodsInfoWeight)
              ).toFixed(2)
            )}
            /{selectedSpecItem.goodsInfoUnit}
          </div>
        ) : null}
      </div>
      {form.buyWay === 0 ? (
        <div className="flex w-full justify-center">{children}</div>
      ) : null}
    </div>
  );
};

export default SingleBuyMethod;
