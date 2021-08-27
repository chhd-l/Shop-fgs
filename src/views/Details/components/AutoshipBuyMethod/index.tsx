import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import FrequencySelection from '@/components/FrequencySelection/index.tsx';
import { formatMoney } from '@/utils/utils';
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
}

const AutoshipBuyMethod = ({
  form,
  configStore,
  skuPromotions,
  selectedSpecItem,
  currentUnitPrice,
  currentSubscriptionPrice,
  changeMethod,
  changeFreqency
}: Props) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  return (
    <div>
      <div
        className={`buyMethod rc-margin-bottom--xs d-flex row align-items-md-center justify-content-between 2 ml-0 mr-0 ui-cursor-pointer-pure ${
          form.buyWay === 1 ? 'border-red' : 'border-d7d7d7'
        }`}
        onClick={changeMethod.bind(this)}
      >
        <div className="radioBox order-1 order-md-1 col-8 col-md-5">
          <div className="rc-input rc-input--inline rc-margin-y--xs rc-input--full-width m-0">
            <FormattedMessage id="email">
              {(txt) => (
                <input
                  className="rc-input__radio"
                  id="type_frequency"
                  type="radio"
                  alt={txt}
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
                  fontWeight: '400',
                  color: '#333'
                }}
              >
                <span className="iconfont mr-2">&#xe675;</span>
                <FormattedMessage id="autoship" />
                <span
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
                  content={<FormattedMessage id="subscription.promotionTip2" />}
                />
                </span>

              </span>
            </label>
          </div>
          <br />
          <div
            className="discountBox"
            style={{
              background:
                window.__.env.REACT_APP_COUNTRY === 'ru' ? '#3ab41d' : '#ec001a'
            }}
          >
            <FormattedMessage
              id="saveExtra"
              values={{
                val: selectedSpecItem?.subscriptionPercentage
              }}
            />
          </div>
          <br />
          <div className="freeshippingBox">
            <FormattedMessage id="freeShipping" />
          </div>
        </div>
        {skuPromotions && (
          <FrequencySelection
            frequencyType={skuPromotions}
            currentFrequencyId={form.frequencyId}
            handleConfirm={(data) => changeFreqency(data)}
            // handleConfirm={}
          />
        )}
        <div className="price font-weight-normal text-right position-relative order-2 order-md-3 col-4 col-md-3 text-nowrap">
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
      {window.__.env.REACT_APP_COUNTRY == 'fr' ? (
        <div>Résiliation gratuite à tout moment </div>
      ) : null}
    </div>
  );
};

export default AutoshipBuyMethod;
