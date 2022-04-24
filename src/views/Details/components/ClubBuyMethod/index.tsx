import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import FrequencySelection from '@/components/FrequencySelection';
import { formatMoney } from '@/utils/utils';
import { Decimal } from 'decimal.js';

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
  children: any;
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
  toClubTab,
  children
}: Props) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const handleToClubTab = () => {
    toClubTab();
  };
  const discountAmount = new Decimal(currentUnitPrice)
    .sub(new Decimal(currentSubscriptionPrice))
    .toNumber();
  const discountAmountUnit = formatMoney(discountAmount);

  return (
    <div
      className={`buy-method-box pb-2 ${form.buyWay === 2 ? 'border-red' : ''}`}
    >
      <div
        className={`buyMethod club-buy-method d-flex row 3 ml-0 mr-0 justify-content-between ui-cursor-pointer-pure ${
          form.buyWay === 2 ? 'border-solid border-b border-d7d7d7' : ''
        }`}
        onClick={changeMethod.bind(this)}
      >
        <div className="radioBox order-1 md:order-1 col-8 px-0">
          <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width m-0">
            <FormattedMessage id="email">
              {(txt) => (
                <input
                  className="rc-input__radio"
                  id="type_frequency"
                  type="radio"
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
                  fontWeight: 400,
                  color: '#333'
                }}
              >
                {/* <span
                className="iconfont mr-1"
                style={{
                  fontWeight: '600',
                  color: '#ec001a'
                }}
              >
                &#xe602;
              </span> */}
                <FormattedMessage id="Club subscription" />
              </span>
            </label>
          </div>
          {/* <br /> */}
          {/* <div className="discountBox" style={{ background: '#3ab41d' }}>
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
        </div> */}
          <br />
          <div className="freeshippingBox">
            <FormattedMessage id="freeShipping" />
          </div>
          <br />
          {window.__.env.REACT_APP_COUNTRY !== 'ru' ? (
            <div className="freeshippingBox">
              <FormattedMessage id="detail.subscriptionBuyTip" />
            </div>
          ) : null}
        </div>
        <div className="price club-price font-weight-normal text-right position-relative order-2 md:order-3 col-4 text-nowrap px-0">
          <div>
            {/* <span className="text-line-through-price">
            {formatMoney(currentUnitPrice)}
          </span> */}
            {formatMoney(currentSubscriptionPrice || 0)}
            <span className="red unit-star">
              <FormattedMessage id="starUnit" defaultMessage=" " />
            </span>
          </div>
          <div className="discountText">
            {configStore.discountDisplayTypeInfo == 'Percentage' ? (
              <FormattedMessage
                id="saveExtra"
                values={{
                  val: selectedSpecItem?.subscriptionPercentage
                }}
              />
            ) : (
              <FormattedMessage
                id="saveExtra"
                values={{
                  val: discountAmountUnit
                }}
              />
            )}
          </div>
          {form.buyWay === 2 &&
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
                  currentSubscriptionPrice /
                  parseFloat(selectedSpecItem.goodsInfoWeight)
                ).toFixed(2)
              )}
              /{selectedSpecItem.goodsInfoUnit}
            </div>
          ) : null}
        </div>
      </div>
      {form.buyWay === 2 ? (
        <>
          <div className="px-4 buy-method-frequency pt-2">
            {skuPromotions && (
              <FrequencySelection
                frequencyType={skuPromotions}
                currentFrequencyId={form.frequencyId}
                handleConfirm={(data: any) => changeFreqency(data)}
                contentStyle={{
                  borderBottom: '1px solid #808285'
                }}
                selectionCustomInnerStyle={{ height: '3rem!important' }}
                textClassName="font-normal"
              />
            )}
            <div
              className="text-center mt-4 mb-2 subscription-learn-more"
              onClick={handleToClubTab}
            >
              <span className="rc-styled-link mr-1 text-sm">
                <FormattedMessage id="details.whatISubscrpition" />
              </span>
              <svg
                style={{ color: '#767676', display: 'inline' }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                />
              </svg>
            </div>
          </div>
          <div className="flex w-full justify-center">{children}</div>
        </>
      ) : null}
    </div>
  );
};

export default ClubBuyMethod;
