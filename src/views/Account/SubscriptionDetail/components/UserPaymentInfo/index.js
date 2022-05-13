import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl-phraseapp';
import getCardImg from '@/lib/get-card-img';
import {
  getDictionary,
  isCanVerifyBlacklistPostCode,
  handleEmailShow
} from '@/utils/utils';
import { inject, observer } from 'mobx-react';
import { AddressPreview } from '@/components/Address';
import { LOGO_ADYEN_COD, LOGO_ADYEN_PAYPAL } from '@/utils/constant';

const UserPaymentInfo = ({
  currentCardInfo,
  currentBillingAddress,
  subDetail,
  setState,
  currentDeliveryAddress,
  paymentStore: { supportPaymentMethods }
}) => {
  useEffect(() => {
    getDictionary({ type: 'country' }).then((res) => {
      setCountryList(res || []);
    });
  }, []);
  const [countryList, setCountryList] = useState([]);
  let minDeliveryTime = null;
  let maxDeliveryTime = null;
  if (subDetail?.noStartTradeList) {
    let snsl = subDetail.noStartTradeList[0];
    minDeliveryTime = snsl.minDeliveryTime;
    maxDeliveryTime = snsl.maxDeliveryTime;
  }
  const eidtModule = (type) => {
    if (type == 'PaymentComp') {
      window.scrollTo(0, 0);
      setState({
        type
      });
      return;
    }
    setState({
      type: 'AddressComp',
      addressType: type
    });
  };

  return (
    <div className="row text-left text-break editCard ml-0 mr-0 subscription_detail_userinfo_box">
      <div className="col-12 col-md-4 mb-2 pl-0" style={{ padding: '5px' }}>
        <div className="h-100 border border-d7d7d7 p-5">
          <div className="align-items-center">
            <img
              className="account-info-icon align-middle mr-3 w-8 h-8 inline-block"
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/addresses.svg`}
              alt="icons addresses"
            />
            <span>
              <FormattedMessage id="delivery2" />
            </span>
            {subDetail.subscribeStatus === 'ACTIVE' && (
              <a
                className="rc-styled-link red-text float-right"
                style={{ marginTop: '5px' }}
                onClick={() => eidtModule('delivery')}
              >
                <FormattedMessage id="edit" />{' '}
              </a>
            )}
          </div>
          {currentDeliveryAddress.validFlag ? null : isCanVerifyBlacklistPostCode ? (
            <div style={{ color: '#e2001a', padding: '6px 0' }}>
              {currentDeliveryAddress.alert}
            </div>
          ) : null}

          <div className="ml-1 subscription_detail_userinfo">
            {/* 姓名 */}
            <p className="mb-0 sd_mb_name">
              <span
                className="medium text-lg"
                style={{
                  color: '#333',
                  margin: '25px 0 .625rem'
                }}
              >
                {currentDeliveryAddress?.consigneeName}
              </span>
            </p>

            <AddressPreview
              data={Object.assign({}, currentDeliveryAddress, {
                phone: currentDeliveryAddress?.consigneeNumber,
                countryName:
                  (countryList || []).filter(
                    (el) => el.id === currentDeliveryAddress.countryId
                  )[0]?.valueEn || currentDeliveryAddress.countryId,
                showDeliveryDateAndTimeSlot: false,
                maxDeliveryTime,
                minDeliveryTime,
                pickupPriceVisible: false
              })}
            />

            {/* delivery date */}
            {/* {currentDeliveryAddress?.deliveryDate && (
              <p className="mb-0 sd_mb_deliveryDate">
                {currentDeliveryAddress.deliveryDate}
              </p>
            )} */}

            {/* time slot */}
            {/* {currentDeliveryAddress?.timeSlot && (
              <p className="mb-0 sd_mb_timeSlot">
                {currentDeliveryAddress.timeSlot}
              </p>
            )} */}
          </div>
        </div>
      </div>

      {/* 不是美国或者不隐藏支付checkout billing addr时，才显示billing addr */}
      {window.__.env.REACT_APP_COUNTRY !== 'us' &&
      !Boolean(+window.__.env.REACT_APP_HIDE_CHECKOUT_BILLING_ADDR) ? (
        <div className={`col-12 col-md-4 mb-2`} style={{ padding: '5px' }}>
          <div className="h-100 border border-d7d7d7 p-5">
            <div className="align-items-center">
              <img
                className="align-middle mr-3 w-8 h-8 inline-block"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/BillingAddress1.svg`}
                alt="icons BillingAddress1"
              />
              <span>
                <FormattedMessage id="billing2" />
              </span>
              {subDetail.subscribeStatus === 'ACTIVE' && (
                <a
                  className="rc-styled-link red-text float-right"
                  style={{ marginTop: '5px' }}
                  onClick={() => eidtModule('billing')}
                >
                  <FormattedMessage id="edit" />{' '}
                </a>
              )}
            </div>
            <div className="ml-1">
              {/* 姓名 */}
              <p className="mb-0 sd_mb_name">
                <span
                  className="medium text-lg"
                  style={{
                    color: '#333',
                    margin: '25px 0 .625rem'
                  }}
                >
                  {currentBillingAddress.consigneeName}
                </span>
              </p>
              <AddressPreview
                nameCls="medium"
                data={{
                  phone: currentBillingAddress?.consigneeNumber,
                  countryName:
                    (countryList || []).filter(
                      (el) => el.id === currentBillingAddress.countryId
                    )[0]?.valueEn || currentBillingAddress.countryId,
                  address1: currentBillingAddress?.address1,
                  address2: currentBillingAddress?.address2,
                  city: currentBillingAddress?.city,
                  area: currentBillingAddress.area,
                  province: currentBillingAddress.province,
                  county: currentBillingAddress.county,
                  postCode: currentBillingAddress.postCode
                }}
              />
            </div>
          </div>
        </div>
      ) : null}

      {currentCardInfo ? (
        <div
          className="col-12 col-md-4 mb-2"
          style={{ padding: '5px', paddingRight: '0' }}
        >
          <div className="h-100 border border-d7d7d7 p-5">
            <div className="align-items-center">
              <img
                className="align-middle mr-3 w-8 h-8"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/payments.svg`}
                alt="icons payments"
              />
              <span>
                <FormattedMessage id="payment.payment" />
              </span>
              {subDetail.subscribeStatus === 'ACTIVE' && (
                <a
                  className="rc-styled-link red-text float-right"
                  style={{ marginTop: '5px' }}
                  onClick={() => eidtModule('PaymentComp')}
                >
                  <FormattedMessage id="edit" />{' '}
                  {/* <FormattedMessage id="card" /> */}
                </a>
              )}
            </div>
            <div className="ml-1">
              {currentCardInfo.lastFourDigits ? (
                <>
                  <p className="mb-0">
                    <span
                      className="medium text-lg font-normal align-middle"
                      style={{
                        color: '#333',
                        margin: '25px 0 .625rem'
                      }}
                    >
                      **** **** ****
                      {currentCardInfo.lastFourDigits}
                    </span>
                  </p>

                  <LazyLoad
                    style={{
                      width: '20%',
                      marginRight: '.2rem'
                    }}
                  >
                    <img
                      alt="card background"
                      className="d-inline-block"
                      src={getCardImg({
                        supportPaymentMethods,
                        currentVendor: currentCardInfo.paymentVendor
                      })}
                    />
                  </LazyLoad>
                </>
              ) : null}

              {currentCardInfo.holderName ? (
                <p className="mb-0">{currentCardInfo.holderName}</p>
              ) : null}
              {currentCardInfo.pspName === 'JAPAN_COD' ? (
                <div className="flex items-center mt-4">
                  <LazyLoad>
                    <img src={LOGO_ADYEN_COD} className="w-10 mr-2" />
                  </LazyLoad>
                  <span>
                    <FormattedMessage id="cashOnDelivery" />
                  </span>
                </div>
              ) : null}
              {currentCardInfo.paymentItem?.toLowerCase() === 'adyen_paypal' ? (
                <div className="flex flex-col mt-4">
                  <LazyLoad>
                    <img src={LOGO_ADYEN_PAYPAL} className="mb-4" />
                  </LazyLoad>
                  <div>{handleEmailShow(currentCardInfo.email)}</div>
                </div>
              ) : null}
              {/* <p className="mb-0">{currentCardInfo.phone}</p> */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default inject('paymentStore')(observer(UserPaymentInfo));
