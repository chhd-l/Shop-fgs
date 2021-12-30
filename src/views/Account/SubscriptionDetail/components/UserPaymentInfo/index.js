import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl-phraseapp';
import deliveryIcon from '../../images/deliveryAddress.png';
import billingIcon from '../../images/billingAddress.png';
import getCardImg from '@/lib/get-card-img';
import paymentIcon from '../../images/payment.png';
import { getDictionary, isCanVerifyBlacklistPostCode } from '@/utils/utils';
import { inject, observer } from 'mobx-react';
import AddressPreview from '@/components/AddressPreview';

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
    if (type !== 'delivery') {
      window.scrollTo(0, 0);
    }
    if (type == 'PaymentComp') {
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
      <div
        className="col-12 col-md-4 mb-2"
        style={{ padding: '5px', paddingLeft: '0' }}
      >
        <div
          className="h-100 border border-d7d7d7"
          style={{
            padding: '1.25rem'
          }}
        >
          <div className="align-items-center">
            {/* <em className="rc-icon rc-delivery--sm rc-brand1 ml-1 mr-1 mt-1" /> */}
            <LazyLoad>
              <img
                alt="delivery Icon"
                src={deliveryIcon}
                style={{
                  width: '30px',
                  marginRight: '1.125rem',
                  display: 'inline-block'
                }}
              />
            </LazyLoad>
            <span>
              <FormattedMessage id="delivery2" />
            </span>
            {subDetail.subscribeStatus === '0' && (
              <a
                className="rc-styled-link red-text"
                style={{ float: 'right', marginTop: '5px' }}
                onClick={() => eidtModule('delivery')}
              >
                <FormattedMessage id="edit" />{' '}
                {/* <FormattedMessage id="address" /> */}
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
                className="medium"
                style={{
                  fontSize: '1.125rem',
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
                maxDeliveryTime,
                minDeliveryTime
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
          <div
            className="h-100 border border-d7d7d7"
            style={{
              padding: '1.25rem'
            }}
          >
            <div className="align-items-center">
              <LazyLoad>
                <img
                  alt="billing Icon"
                  src={billingIcon}
                  style={{
                    width: '30px',
                    marginRight: '1.125rem',
                    display: 'inline-block'
                  }}
                />
              </LazyLoad>
              <span>
                <FormattedMessage id="billing2" />
              </span>
              {subDetail.subscribeStatus === '0' && (
                <a
                  className="rc-styled-link red-text"
                  style={{ float: 'right', marginTop: '5px' }}
                  onClick={() => eidtModule('billing')}
                >
                  <FormattedMessage id="edit" />{' '}
                </a>
              )}
            </div>
            <div className="ml-1">
              <AddressPreview
                nameCls="medium"
                data={{
                  name: currentBillingAddress.consigneeName,
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
          <div
            className="h-100 border border-d7d7d7"
            style={{
              padding: '1.25rem'
            }}
          >
            <div className="align-items-center">
              <LazyLoad style={{ display: 'inline' }}>
                <img
                  src="paymentIcon"
                  src={paymentIcon}
                  style={{
                    width: '30px',
                    marginRight: '1.125rem',
                    display: 'inline-block'
                  }}
                />
              </LazyLoad>
              <span>
                <FormattedMessage id="payment.payment" />
              </span>
              {subDetail.subscribeStatus === '0' && (
                <a
                  className="rc-styled-link red-text"
                  style={{ float: 'right', marginTop: '5px' }}
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
                      className="medium"
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: '400',
                        color: '#333',
                        margin: '25px 0 .625rem',
                        verticalAlign: 'middle'
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

              <p className="mb-0">{currentCardInfo.holderName}</p>
              {/* <p className="mb-0">{currentCardInfo.phone}</p> */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default inject('paymentStore')(observer(UserPaymentInfo));
