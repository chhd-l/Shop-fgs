import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl-phraseapp';
import getCardImg from '@/lib/get-card-img';
import {
  getDictionary,
  isCanVerifyBlacklistPostCode,
  handleEmailShow,
  formatMoney,
  formatDate,
  getFormatDate
} from '@/utils/utils';
import { inject, observer } from 'mobx-react';
import { AddressPreview } from '@/components/Address';
import { LOGO_ADYEN_COD, LOGO_ADYEN_PAYPAL } from '@/utils/constant';
import { format } from 'date-fns';
import * as date_fns_locale from 'date-fns/locale';
import { Modal } from '@/components/Common';

const country = window.__.env.REACT_APP_COUNTRY;

const UserPaymentInfo = ({
  currentCardInfo,
  currentBillingAddress,
  subDetail,
  setState,
  currentDeliveryAddress,
  paymentStore: { supportPaymentMethods }
}) => {
  const [countryList, setCountryList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [promotionsArr, setPromotionsArr] = useState([]);
  let minDeliveryTime = null;
  let maxDeliveryTime = null;
  if (subDetail?.noStartTradeList) {
    let snsl = subDetail.noStartTradeList[0];
    minDeliveryTime = snsl.minDeliveryTime;
    maxDeliveryTime = snsl.maxDeliveryTime;
  }

  useEffect(() => {
    getDictionary({ type: 'country' }).then((res) => {
      setCountryList(res || []);
    });
  }, []);

  useEffect(() => {
    setPromotionsArr(subDetail.promotionResponse?.promotionVOList || []);
  }, [subDetail.promotionResponse?.promotionVOList]);

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
                className="rc-styled-link text-rc-red float-right"
                style={{ marginTop: '5px', overflow: 'visible' }}
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
                {window.__.env.REACT_APP_COUNTRY === 'jp' ? (
                  <span>
                    {currentDeliveryAddress?.lastName}
                    {currentDeliveryAddress?.firstName}
                  </span>
                ) : (
                  currentDeliveryAddress?.consigneeName
                )}
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
                pickupPriceVisible: false,
                lastName: '', //jp,subscription order detail no display name,因为上面显示了
                firstName: ''
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
                  className="rc-styled-link text-rc-red float-right"
                  style={{ marginTop: '5px', overflow: 'visible' }}
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
                className="align-middle mr-3 w-8 h-8 inline-block"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/payments.svg`}
                alt="icons payments"
              />
              <span>
                <FormattedMessage id="payment.payment" />
              </span>
              {subDetail.subscribeStatus === 'ACTIVE' && (
                <a
                  className="rc-styled-link text-rc-red float-right"
                  style={{ marginTop: '5px', overflow: 'visible' }}
                  onClick={() => eidtModule('PaymentComp')}
                >
                  <FormattedMessage id="edit" />{' '}
                  {/* <FormattedMessage id="card" /> */}
                </a>
              )}
            </div>
            <div className="ml-1">
              {currentCardInfo?.paymentItem?.toLowerCase() !== 'adyen_moto' ? (
                currentCardInfo?.paymentItem?.toLowerCase() ===
                'adyen_ideal' ? (
                  <>
                    <div className="mt-4 mb-4">
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
                            'https://fgs-cdn.azureedge.net/cdn/img/payment/ideal-logo.svg'
                          }
                        />
                      </LazyLoad>
                    </div>
                    <p className="mb-0">
                      {currentCardInfo?.binNumber} BANK **** ****{' '}
                      {currentCardInfo.lastFourDigits.substr(2)}
                    </p>
                  </>
                ) : (
                  <>
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
                    {currentCardInfo.pspName === 'cod' ? (
                      <div className="flex items-center mt-4">
                        <LazyLoad>
                          <img src={LOGO_ADYEN_COD} className="w-10 mr-2" />
                        </LazyLoad>
                        <span>
                          <FormattedMessage id="cashOnDelivery" />
                        </span>
                      </div>
                    ) : null}
                    {currentCardInfo?.paymentItem?.toLowerCase() ===
                    'adyen_paypal' ? (
                      <div className="flex flex-col mt-4">
                        <LazyLoad>
                          <img src={LOGO_ADYEN_PAYPAL} className="mb-4" />
                        </LazyLoad>
                        <div>{handleEmailShow(currentCardInfo.email)}</div>
                      </div>
                    ) : null}
                    {/* {currentCardInfo?.paymentItem?.toLowerCase() ===
                    'adyen_paypal' ? (
                      <div className="flex flex-col mt-4">
                        <LazyLoad>
                          <img src={LOGO_ADYEN_PAYPAL} className="mb-4" />
                        </LazyLoad>
                        <div>{handleEmailShow(currentCardInfo.email)}</div>
                      </div>
                    ) : null} */}
                    {/* <p className="mb-0">{currentCardInfo.phone}</p> */}
                  </>
                )
              ) : (
                <>
                  <LazyLoad
                    style={{
                      width: '60%',
                      marginRight: '.2rem'
                    }}
                  >
                    <img
                      alt="card background"
                      className="d-inline-block"
                      src={
                        'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202008060240358083.png'
                      }
                    />
                  </LazyLoad>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {/* promotion save */}
      {/* fr ru tr  us: 368369*/}
      {/* ['fr', 'ru', 'tr'].includes(country) */}
      {promotionsArr?.length > 0 && (
        <div className="col-12 col-md-4 mb-2 pl-0" style={{ padding: '5px' }}>
          <div className="h-100 border border-d7d7d7 p-5">
            {/* 头部标题和 more */}
            <div className="align-items-center">
              <span className="iconfont iconpoint-logo mr-3" />
              <span>
                <FormattedMessage id="subscription.Promotions" />
              </span>
              <a
                className="rc-styled-link text-rc-red float-right"
                style={{ marginTop: '5px', overflow: 'visible' }}
                onClick={() => setVisible(true)}
              >
                <FormattedMessage id="subscription.Seemore" />
              </a>
            </div>

            <div className="subscription_detail_userinfo">
              {/* 省下来的钱 */}
              <p className="money flex mt-4">
                <span
                  className="iconfont iconrefresh mr-3 font-semibold"
                  style={{ color: '#009700' }}
                />
                <span>
                  <FormattedMessage
                    id="Subscription.SaveTitle"
                    values={{
                      money: (
                        <span style={{ color: '#009700' }}>
                          {formatMoney(
                            subDetail?.promotionResponse
                              ?.totalSubscriptionPrice ?? 0
                          )}
                        </span>
                      )
                    }}
                  />
                </span>
              </p>
              {/* 使用的code */}
              <p className="code flex mt-4">
                <span
                  className="iconfont iconrefresh mr-3 font-semibold"
                  style={{ color: '#009700' }}
                />
                <span>
                  {/* marketingType 0 满减 1 满折 */}
                  <FormattedMessage
                    id="Subscription.SavePrice"
                    values={{
                      money: (
                        <span style={{ color: '#009700' }}>
                          {formatMoney(promotionsArr[0].value ?? 0)}
                        </span>
                      ),
                      code: (
                        <span
                          className="text-22 font-semibold"
                          style={{ color: '#009700' }}
                        >
                          {promotionsArr[0].publicStatus === '1' ? (
                            <FormattedMessage id="subscription.PROMOTION" />
                          ) : (
                            promotionsArr[0]?.code
                          )}
                        </span>
                      )
                    }}
                  />
                  <br />
                  <span>
                    {/* 日本是年 月 日  -----其他国家是日 月 年 */}
                    <FormattedMessage
                      id="Subscription.AddOn"
                      values={{
                        time: (
                          <span>
                            {getFormatDate(promotionsArr[0].useTime) ||
                              getFormatDate(new Date())}
                          </span>
                        )
                      }}
                    />
                    {/* {format(new Date("2022-7-29"), "MMMM do yyyy", { locale: date_fns_locale[window.__.env.REACT_APP_LANG_LOCALE] })} */}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      {/* promotion modal */}
      <Modal
        modalTitle={
          <span className="text-cs-primary flex">
            <span className="flex items-center">
              <span className="iconfont iconpoint-logo mr-3 font-semibold" />
            </span>
            <span className="text-30">
              <FormattedMessage id="subscription.PromotionsHistory" />
            </span>
          </span>
        }
        visible={visible}
        footerVisible={false}
        close={() => setVisible(false)}
      >
        <div
          className="promotionModal pl-3 pr-3"
          style={{ maxHeight: '28rem', overflowY: 'auto' }}
        >
          {promotionsArr?.length > 0 &&
            promotionsArr.map((item) => {
              // publicStatus 0 private
              //              1 public
              if (item?.publicStatus === '1') {
                return (
                  <div
                    className="flex mb-2 p-4"
                    style={{
                      border: '1px solid #d7d7d7',
                      borderRadius: '4px',
                      maxHeight: '400px'
                    }}
                  >
                    <span className="flex items-center">
                      <span
                        className="iconfont iconrefresh mr-3 font-semibold"
                        style={{ color: '#009700' }}
                      />
                    </span>
                    <div>
                      <p className="font-medium text-20">{item.name ?? ''}</p>
                      <p>
                        <FormattedMessage
                          id="Subscription.SaveItem"
                          values={{
                            money: `${formatMoney(item?.value || 0)}`,
                            code: (
                              <span className="font-medium text-18">
                                <FormattedMessage id="subscription.PROMOTION" />
                              </span>
                            )
                          }}
                        />
                      </p>
                    </div>
                  </div>
                );
              } else {
                // marketingType 0 满减 1 满折
                if (item?.marketingType === 0) {
                  return (
                    <div
                      className="flex mb-2 p-4"
                      style={{
                        border: '1px solid #d7d7d7',
                        borderRadius: '4px',
                        maxHeight: '400px'
                      }}
                    >
                      <span className="flex items-center">
                        <span
                          className="iconfont iconrefresh mr-3 font-semibold"
                          style={{ color: '#009700' }}
                        />
                      </span>
                      <div>
                        <p className="font-medium text-20">{item.name ?? ''}</p>
                        <p>
                          <FormattedMessage
                            id="Subscription.SaveItem"
                            values={{
                              money: `${formatMoney(item?.value ?? 0)}`,
                              code: (
                                <span className="font-medium text-18">
                                  {item?.code ?? ''}
                                </span>
                              )
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="flex mb-2 p-4"
                      style={{
                        border: '1px solid #d7d7d7',
                        borderRadius: '4px',
                        maxHeight: '400px'
                      }}
                    >
                      <span className="flex items-center">
                        <span
                          className="iconfont iconrefresh mr-3 font-semibold"
                          style={{ color: '#009700' }}
                        />
                      </span>
                      <div>
                        <p className="font-medium text-20">{item.name ?? ''}</p>
                        <p>
                          <FormattedMessage
                            id="Subscription.SaveItemDiscount"
                            values={{
                              discount:
                                `${
                                  item?.discount &&
                                  `${item?.discount}`.includes('%')
                                    ? item?.discount
                                    : Number(item?.discount).toFixed(0) + '%'
                                }` ?? '0%',
                              code: (
                                <span className="font-medium text-18">
                                  {item?.code ?? ''}
                                </span>
                              )
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  );
                }
              }
            })}
        </div>
      </Modal>
    </div>
  );
};
export default inject('paymentStore')(observer(UserPaymentInfo));
