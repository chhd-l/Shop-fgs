import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import FrequencySelection from '@/components/FrequencySelection/index.tsx';
import { formatMoney } from '@/utils/utils';
import {Decimal} from 'decimal.js';
const De = window.__.env.REACT_APP_COUNTRY === 'de';

interface Props {
  form: any;
  configStore: any;
  skuPromotions: any;
  selectedSpecItem: any;
  currentUnitPrice: any;
  currentSubscriptionPrice: any;
  changeMethod: Function;
  changeFreqency: Function;
  toClubTab: Function;
}

const ClubBuyMethod = ({
  form,
  configStore,
  skuPromotions,
  selectedSpecItem,
  currentUnitPrice,
  currentSubscriptionPrice,
  changeMethod,
  changeFreqency,
  toClubTab
}: Props) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const handleToClubTab = () => {
    toClubTab();
  };
  const discountAmount = new Decimal(currentUnitPrice).sub(new Decimal(currentSubscriptionPrice)).toNumber()
  const discountAmountUnit = formatMoney(discountAmount)

  return (
    <div
      className={`buyMethod rc-margin-bottom--xs d-flex row align-items-center 3 ml-0 mr-0 ui-cursor-pointer-pure ${
        form.buyWay === 2 ? 'border-red' : 'border-d7d7d7'
      }`}
      onClick={changeMethod.bind(this)}
    >
      <div className="radioBox order-1 md:order-1 col-8 col-md-5 px-0">
        <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width m-0">
          <FormattedMessage id="email">
            {(txt) => (
              <input
                className="rc-input__radio"
                id="type_frequency"
                type="radio"
                alt={txt}
                name="buyWay"
                value="2"
                key="2"
                checked={form.buyWay === 2}
              />
            )}
          </FormattedMessage>
          <label className="rc-input__label--inline" htmlFor="type_frequency">
            <span
              style={{
                fontWeight: '400',
                color: '#333'
              }}
            >
              <span
                className="iconfont mr-2"
                style={{
                  fontWeight: '600',
                  color: '#ec001a'
                }}
              >
                &#xe602;
              </span>
              <FormattedMessage id="Club subscription" />
            </span>
          </label>
        </div>
        <br />
        <div className="discountBox" style={{ background: '#3ab41d' }}>
          {configStore.discountDisplayTypeInfo == "Percentage"?
          <FormattedMessage
          id="saveExtra"
          values={{
            val: selectedSpecItem?.subscriptionPercentage
          }}
        />
          :<FormattedMessage
            id="saveExtra"
            values={{
            val:discountAmountUnit
            }}
          />}
        </div>
        <br />
        <div className="freeshippingBox">
          <FormattedMessage id="freeShipping" />
        </div>
        <div className="learnMore">
          <span className="rc-styled-link" onClick={handleToClubTab}>
            <FormattedMessage id="details.learnMore" />
          </span>
        </div>
      </div>
      {skuPromotions && (
        <FrequencySelection
          frequencyType={skuPromotions}
          currentFrequencyId={form.frequencyId}
          handleConfirm={(data) => changeFreqency(data)}
        />
      )}
      <div className="price font-weight-normal text-right position-relative order-2 md:order-3 col-4 col-md-3 text-nowrap">
        <div>
          <span className="text-line-through-price">
            {formatMoney(currentUnitPrice)}
          </span>
          {formatMoney(currentSubscriptionPrice || 0)}
          <span className="red unit-star">
            <FormattedMessage id="starUnit" defaultMessage=" " />
          </span>
        </div>
        {configStore?.info?.storeVO?.basePricePDPShowedFlag &&
        selectedSpecItem?.goodsInfoWeight &&
        selectedSpecItem?.goodsInfoUnit ? (
          <div
            style={{
              fontSize: '.875rem',
              color: '#999'
            }}
          >
            (
            {formatMoney(
              (
                currentSubscriptionPrice /
                parseFloat(selectedSpecItem.goodsInfoWeight)
              ).toFixed(2)
            )}
            /{selectedSpecItem.goodsInfoUnit})
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ClubBuyMethod;
