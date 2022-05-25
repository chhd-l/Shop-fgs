import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { AddressPreview } from '@/components/Address';
import {
  formatDate,
  formatMoney,
  getDictionary,
  matchNamefromDict,
  handleEmailShow
} from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import getCardImg from '@/lib/get-card-img';
import { ConvenienceStorePayReview } from '@/views/Payment/PaymentMethod';
import OrderAppointmentInfo from '@/views/Account/AppointmentsDetail/modules/AppointmentInfo';
import { getWays } from '@/api/payment';
import { LOGO_ADYEN_COD, LOGO_ADYEN_PAYPAL } from '@/utils/constant';

const OrderAddressAndPayReview = ({ details, payRecord }) => {
  const [countryList, setCountryList] = useState([]);
  const [supportPaymentMethods, setSupportPaymentMethods] = useState([]);

  let newDeliveryDate = formatDate({
    date: details?.consignee?.deliveryDate,
    formatOption: { weekday: 'long', day: '2-digit', month: 'long' }
  });

  useEffect(() => {
    getDictionary({ type: 'country' }).then((res) => {
      setCountryList(res || []);
    });
    getWays().then((res) => {
      setSupportPaymentMethods(
        res?.context?.payPspItemVOList[0]?.payPspItemCardTypeVOList || []
      );
    });
  }, []);

  return (
    <div>
      {details?.consignee ? (
        <div className="mx-2 md:mx-0">
          <p className="mt-4 mb-3 red text-left">
            <FormattedMessage id="transactionInfomation" />
          </p>
          <div className="row text-left text-break">
            <div className="col-12 col-md-4 mb-3">
              <div className="border rounded h-100">
                <div className="d-flex p-3 h-100">
                  <img
                    className="align-middle mr-3 ml-1 w-8 h-8"
                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/addresses.svg`}
                    alt="icons addresses"
                  />
                  <div>
                    <p className="medium mb-3">
                      <FormattedMessage id="delivery2" />
                    </p>
                    <AddressPreview
                      nameCls="medium mb-2"
                      data={{
                        name: details.consignee.name,
                        phone: details.consignee.phone,
                        countryName: matchNamefromDict(
                          countryList,
                          details.consignee.countryId
                        ),
                        address1: details.consignee.detailAddress1,
                        address2: details.consignee.detailAddress2,
                        city: details.consignee.city,
                        area: details.consignee.area,
                        province: details.consignee.province,
                        county: details.consignee.county,
                        postCode: details.consignee.postCode,
                        rfc: details.consignee.rfc,
                        buyerRemark: details.buyerRemark
                      }}
                    />

                    {/* 运费折扣 */}
                    {!details.consignee.timeSlot &&
                    details?.maxDeliveryTime != null &&
                    details?.minDeliveryTime != null ? (
                      <p className="mb-0 od_mb_yf">
                        {details.minDeliveryTime === details.maxDeliveryTime ? (
                          <FormattedMessage
                            id="payment.deliveryDate2"
                            values={{
                              val: details.minDeliveryTime
                            }}
                          />
                        ) : (
                          <FormattedMessage
                            id="payment.deliveryDate"
                            values={{
                              min: details.minDeliveryTime,
                              max: details.maxDeliveryTime
                            }}
                          />
                        )}
                      </p>
                    ) : null}

                    {/* delivery date */}
                    {newDeliveryDate && (
                      <p className="mb-0 od_mb_deliveryDate">
                        {newDeliveryDate}
                      </p>
                    )}

                    {/* time slot */}
                    {details.consignee.timeSlot && (
                      <p className="mb-0 od_mb_timeSlot">
                        {details.consignee.timeSlot}
                      </p>
                    )}

                    {/* workTime */}
                    {details.consignee.workTime && (
                      <p className="mb-0 od_mb_workTime">
                        {details.consignee.workTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {!Boolean(+window.__.env.REACT_APP_HIDE_CHECKOUT_BILLING_ADDR) ? (
              <div className="col-12 col-md-4 mb-3">
                <div className="border rounded p-3 h-100">
                  <div className="d-flex">
                    <img
                      className="align-middle mr-3 ml-1 w-8 h-8"
                      src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/BillingAddress1.svg`}
                      alt="icons BillingAddress1"
                    />
                    <div>
                      <p className="medium mb-3">
                        <FormattedMessage id="billing2" />
                      </p>
                      <AddressPreview
                        nameCls="medium mb-2"
                        data={{
                          name: details.invoice.contacts,
                          phone: details.invoice.phone,
                          countryName: matchNamefromDict(
                            countryList,
                            details.invoice.countryId
                          ),
                          address1: details.invoice.address1,
                          address2: details.invoice.address2,
                          city: details.invoice.city,
                          area: details.invoice.area,
                          province: details.invoice.province,
                          county: details.invoice.county,
                          postCode: details.invoice.postCode,
                          rfc: details.invoice.rfc
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {payRecord && payRecord.lastFourDigits ? (
              <PaymentMethodContainer>
                <div className="medium mb-2">
                  <LazyLoad className="inline">
                    <img
                      alt="card background"
                      className="d-inline-block mr-1 w-1/5"
                      src={getCardImg({
                        supportPaymentMethods: supportPaymentMethods,
                        currentVendor: payRecord.paymentVendor
                      })}
                    />
                  </LazyLoad>
                  {payRecord.lastFourDigits ? (
                    <span className="medium">
                      ********
                      {payRecord.lastFourDigits}
                    </span>
                  ) : null}
                </div>

                {payRecord.holderName ? (
                  <p className="mb-0">{payRecord.holderName}</p>
                ) : null}

                {/* 分期费用明细 */}
                {0 && details.tradePrice.installmentPrice ? (
                  <p>
                    {formatMoney(details.tradePrice.totalPrice)} (
                    {details.tradePrice.installmentPrice.installmentNumber} *{' '}
                    {formatMoney(
                      details.tradePrice.installmentPrice.installmentPrice
                    )}
                    )
                  </p>
                ) : null}
              </PaymentMethodContainer>
            ) : null}
            {details.paymentItem?.toLowerCase() === 'adyen_paypal' ? (
              <PaymentMethodContainer>
                <div className="medium mb-2">
                  <LazyLoad className="inline-block">
                    <img
                      alt="paypal"
                      className="w-20 h-10"
                      src={LOGO_ADYEN_PAYPAL}
                    />
                  </LazyLoad>
                  <p>{handleEmailShow(details?.payPalEmail)}</p>
                </div>
              </PaymentMethodContainer>
            ) : null}
            {details.paymentItem === 'adyen_convenience_store' ? (
              <PaymentMethodContainer>
                <div className="medium mb-2">
                  <ConvenienceStorePayReview
                    convenienceStore={
                      details?.payInfo?.convenienceStorePayInfo?.storeName
                    }
                  />
                </div>
              </PaymentMethodContainer>
            ) : null}
            {details.paymentItem === 'cod_japan' ? (
              <PaymentMethodContainer>
                <div className="flex items-center">
                  <LazyLoad>
                    <img src={LOGO_ADYEN_COD} className="w-10 mr-2" />
                  </LazyLoad>
                  <span>
                    <FormattedMessage id="cashOnDelivery" />
                  </span>
                </div>
              </PaymentMethodContainer>
            ) : null}
          </div>
        </div>
      ) : details?.appointNo ? (
        <OrderAppointmentInfo
          details={{
            expertType: details.specialistType,
            appointmentType: details.appointmentType,
            apptTime: details.appointmentDate
          }}
        />
      ) : null}
    </div>
  );
};

export default OrderAddressAndPayReview;

const PaymentMethodContainer = ({ children }) => {
  return (
    <div className="col-12 col-md-4 mb-2">
      <div className="border rounded p-3 h-100">
        <div className="d-flex">
          <img
            className="align-middle mr-3 ml-1 w-8 h-8"
            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/payments.svg`}
            alt="icons payments"
          />
          <div>
            <p className="medium mb-3">
              <FormattedMessage id="payment.payment" />
            </p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
