import React, { useEffect, useState } from 'react';
import { useLocalStore } from 'mobx-react';
import stores from '@/store';
import LazyLoad from 'react-lazyload';
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl';
import deliveryIcon from '../../images/deliveryAddress.png';
import billingIcon from '../../images/billingAddress.png';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import paymentIcon from '../../images/payment.png';
import { getDictionary, getAddressPostalCodeAlertMessage } from '@/utils/utils';

const UserPaymentInfo = ({
  currentCardInfo,
  currentBillingAddress,
  subDetail,
  setState,
  currentDeliveryAddress
}) => {
  useEffect(() => {
    getDictionary({ type: 'country' }).then((res) => {
      setCountryList(res || []);
    });
    getAddressPostalCodeAlertMessage().then((res) => {
      setPostalCodeAlertMessage(res);
    });
  }, []);
  const { configStore } = useLocalStore(() => stores);
  const [countryList, setCountryList] = useState([]);
  const [postalCodeAlertMessage, setPostalCodeAlertMessage] = useState('');
  // 获取本地存储的需要显示的地址字段
  const localAddressForm = configStore?.localAddressForm;
  let minDeliveryTime = null;
  let maxDeliveryTime = null;
  if (subDetail?.noStartTradeList) {
    let snsl = subDetail.noStartTradeList[0];
    minDeliveryTime = snsl.minDeliveryTime;
    maxDeliveryTime = snsl.maxDeliveryTime;
  }
  const eidtModule = (type) => {
    console.log('666 >>> type: ', type);

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
          <div
            style={{
              color: '#e2001a',
              padding: '6px 0'
            }}
          >
            {postalCodeAlertMessage}
          </div>
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

            {currentDeliveryAddress.receiveType === 'PICK_UP' ? (
              <>
                {/* pickupName */}
                <p className="mb-0 sd_mb_pickupName font-weight-bold">
                  {currentDeliveryAddress?.pickupName}
                </p>
                {/* 电话 */}
                {localAddressForm?.phoneNumber &&
                  currentDeliveryAddress?.consigneeNumber && (
                    <p className="mb-0 sd_mb_tel">
                      {currentDeliveryAddress?.consigneeNumber}
                    </p>
                  )}
                {/* 地址 */}
                {localAddressForm?.address1 &&
                  currentDeliveryAddress?.address1 && (
                    <p className="mb-0 sd_mb_address1">
                      {currentDeliveryAddress?.address1}
                    </p>
                  )}
              </>
            ) : (
              <>
                {/* 电话 */}
                {localAddressForm?.phoneNumber &&
                  currentDeliveryAddress?.consigneeNumber && (
                    <p className="mb-0 sd_mb_tel">
                      {currentDeliveryAddress?.consigneeNumber}
                    </p>
                  )}
                {/* 国家 */}
                {window.__.env.REACT_APP_COUNTRY == 'us' ||
                window.__.env.REACT_APP_COUNTRY == 'ru' ? null : (
                  <p className="mb-0 sd_mb_country">
                    {countryList.length &&
                    countryList.filter(
                      (el) => el.id === currentDeliveryAddress.countryId
                    ).length
                      ? countryList.filter(
                          (el) => el.id === currentDeliveryAddress.countryId
                        )[0].valueEn
                      : currentDeliveryAddress.countryId}
                    ,
                  </p>
                )}
                {/* 地址 */}
                {localAddressForm?.address1 &&
                  currentDeliveryAddress?.address1 && (
                    <p className="mb-0 sd_mb_address1">
                      {currentDeliveryAddress?.address1}
                    </p>
                  )}
                {localAddressForm?.address2 &&
                  currentDeliveryAddress?.address2 && (
                    <p className="mb-0 sd_mb_address2">
                      {currentDeliveryAddress?.address2}
                    </p>
                  )}

                <p className="mb-0 sd_mb_cpp">
                  {/* 城市 */}
                  {localAddressForm?.city &&
                    currentDeliveryAddress?.city + ', '}

                  {/* 区域 */}
                  {localAddressForm?.region &&
                    currentDeliveryAddress.area + ', '}

                  {/* 省份 / State */}
                  {localAddressForm?.state &&
                    currentDeliveryAddress?.province + ' '}

                  {/* 邮编 */}
                  {localAddressForm?.postCode &&
                    currentDeliveryAddress?.postCode}
                </p>

                {maxDeliveryTime && minDeliveryTime && (
                  <>
                    {minDeliveryTime && (
                      <>
                        {minDeliveryTime == maxDeliveryTime ? (
                          <FormattedMessage
                            id="payment.deliveryDate2"
                            values={{
                              val: minDeliveryTime
                            }}
                          />
                        ) : (
                          <FormattedMessage
                            id="payment.deliveryDate"
                            values={{
                              min: minDeliveryTime,
                              max: maxDeliveryTime
                            }}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}

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
                  {currentBillingAddress.consigneeName}
                </span>
              </p>

              {/* 电话 */}
              {localAddressForm?.phoneNumber &&
                currentBillingAddress?.consigneeNumber && (
                  <p className="mb-0 sd_mb_tel">
                    {currentBillingAddress.consigneeNumber}
                  </p>
                )}

              {/* 国家 */}
              {window.__.env.REACT_APP_COUNTRY == 'us' ||
              window.__.env.REACT_APP_COUNTRY == 'ru' ? null : (
                <p className="mb-0 sd_mb_country">
                  {countryList.length &&
                  countryList.filter(
                    (el) => el.id === currentBillingAddress.countryId
                  ).length
                    ? countryList.filter(
                        (el) => el.id === currentBillingAddress.countryId
                      )[0].valueEn
                    : currentBillingAddress.countryId}
                  ,
                </p>
              )}

              {/* 地址 */}
              {localAddressForm?.address1 &&
                currentBillingAddress?.address1 && (
                  <p className="mb-0 sd_mb_address1">
                    {currentBillingAddress?.address1}
                  </p>
                )}
              {localAddressForm?.address2 &&
                currentBillingAddress?.address2 && (
                  <p className="mb-0 sd_mb_address2">
                    {currentBillingAddress?.address2}
                  </p>
                )}
              <p className="mb-0 sd_mb_cpp">
                {/* 城市 */}
                {localAddressForm?.city && currentBillingAddress?.city + ', '}

                {/* 区域 */}
                {localAddressForm?.region && currentBillingAddress.area + ', '}

                {/* 省份 / State */}
                {localAddressForm?.state &&
                  currentBillingAddress?.province + ' '}

                {/* 邮编 */}
                {localAddressForm?.postCode && currentBillingAddress?.postCode}
              </p>
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
                      src={
                        CREDIT_CARD_IMG_ENUM[
                          currentCardInfo.paymentVendor.toUpperCase()
                        ] ||
                        'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                      }
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
export default UserPaymentInfo;
