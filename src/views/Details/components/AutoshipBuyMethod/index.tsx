import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { FrequencySelection } from '@/components';
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
  handleNoShowValue:Function;
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
  handleNoShowValue,
  children
}: Props) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const discountAmount = new Decimal(currentUnitPrice)
    .sub(new Decimal(currentSubscriptionPrice))
    .toNumber();
  const discountAmountUnit = formatMoney(discountAmount);
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.persist();
    // console.log('e4334', e);
    changeMethod();
  };
  return (
    <div
      className={`buy-method-box pb-2 ${form.buyWay === 1 ? 'border-red' : ''}`}
    >
      <div
        data-tetsid="pdp_autoship_btn"
        className={`buyMethod autoship-buy-method rc-margin-bottom--xs d-flex row justify-content-between 2 ml-0 mr-0 ui-cursor-pointer-pure ${
          form.buyWay === 1 ? 'border-solid border-b border-d7d7d7' : ''
        }`}
        onClick={handleClick}
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
            <label
              className="rc-input__label--inline"
              htmlFor="type_frequency"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                style={{
                  fontWeight: 400,
                  color: '#333'
                }}
              >
                {/* <span className="iconfont mr-2">&#xe675;</span> */}
                <FormattedMessage id="autoship" />
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
        <div
          className={`price ${
            // jp remove autoship-price classname
            window.__.env.REACT_APP_COUNTRY !== 'jp' && 'autoship-price'
          } font-weight-normal text-right position-relative order-2 md:order-3 col-4 text-nowrap px-0`}
        >
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
                handleNoShowValue={(data:any)=>handleNoShowValue(data)}
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
