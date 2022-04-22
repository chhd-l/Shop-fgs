import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import FrequencySelection from '@/components/FrequencySelection';
import { formatMoney } from '@/utils/utils';
import { Decimal } from 'decimal.js';
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
  children: any;
}

const AutoshipBuyMethod = ({
  form,
  configStore,
  skuPromotions,
  selectedSpecItem,
  currentUnitPrice,
  currentSubscriptionPrice,
  changeMethod,
  changeFreqency,
  children
}: Props) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const discountAmount = new Decimal(currentUnitPrice)
    .sub(new Decimal(currentSubscriptionPrice))
    .toNumber();
  const discountAmountUnit = formatMoney(discountAmount);
  return (
    <div
      className={`buy-method-box pb-2 ${form.buyWay === 1 ? 'border-red' : ''}`}
    >
      <div
        className={`buyMethod autoship-buy-method rc-margin-bottom--xs d-flex row justify-content-between 2 ml-0 mr-0 ui-cursor-pointer-pure ${
          form.buyWay === 1 ? 'border-solid border-b border-d7d7d7' : ''
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
                  value="1"
                  key="1"
                  checked={form.buyWay === 1}
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
                {/* <span className="iconfont mr-2">&#xe675;</span> */}
                <FormattedMessage id="autoship" />
                {/* <span
                  className="info-tooltip delivery-method-tooltip"
                  onMouseEnter={() => {
                    setToolTipVisible(true);
                  }}
                  onMouseLeave={() => {
                    setToolTipVisible(false);
                  }}
                >
                  i
                  <ConfirmTooltip
                    arrowStyle={{ left: '50%' }}
                    containerStyle={{
                      transform: 'translate(-50%, 110%)'
                    }}
                    display={toolTipVisible}
                    cancelBtnVisible={false}
                    confirmBtnVisible={false}
                    updateChildDisplay={(status) => {
                      setToolTipVisible(status);
                    }}
                    content={
                      <FormattedMessage id="subscription.promotionTip2" />
                    }
                  />
                </span> */}
              </span>
            </label>
          </div>
          {/* <br />
          <div
            className="discountBox"
            style={{
              background:
                window.__.env.REACT_APP_COUNTRY === 'ru' ? '#3ab41d' : '#ec001a'
            }}
          >
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
          </div> */}
          <br />
          <div className="freeshippingBox">
            <FormattedMessage id="freeShipping" />
          </div>
        </div>
        <div className="price autoship-price font-weight-normal text-right position-relative order-2 md:order-3 col-4 text-nowrap px-0">
          <div>
            {/* <span className="text-line-through-price">
              {formatMoney(currentUnitPrice)}
            </span> */}
            {formatMoney(currentSubscriptionPrice || 0)}
            <span className="red unit-star">
              <FormattedMessage id="starUnit" defaultMessage=" " />
            </span>
          </div>
          {window.__.env.REACT_APP_COUNTRY != 'jp' ? (
            <div className="discountText mb-2">
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
          ) : null}
          {form.buyWay === 1 &&
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
      {form.buyWay === 1 ? (
        <>
          <div className="px-4 buy-method-frequency ">
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
          </div>
          <div className="flex w-full justify-center">{children}</div>
        </>
      ) : null}
      {/* {window.__.env.REACT_APP_COUNTRY == 'fr' ? (
        <div>Résiliation gratuite à tout moment </div>
      ) : null} */}
    </div>
  );
};

export default AutoshipBuyMethod;
