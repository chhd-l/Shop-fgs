import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import {
  getDictionary,
  matchNamefromDict,
  handleFelinAppointTime,
  formatDate
} from '@/utils/utils';
import cn from 'classnames';

@inject('configStore')
@injectIntl
@observer
class InfosPreview extends React.Component {
  static defaultProps = {
    payRecord: null,
    hideBillingAddr: false
  };
  constructor(props) {
    super(props);
    this.state = {
      countryList: []
    };
  }
  componentDidMount() {
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
  }
  handleFelinOrderDate = (appointmentDate) => {
    const orderTime = handleFelinAppointTime(appointmentDate);
    return (
      orderTime.appointStartTime +
      ' - ' +
      orderTime.appointEndTime.split(' ')[1]
    );
  };
  render() {
    const {
      payRecord,
      details,
      configStore: {
        localAddressForm: { fieldKeyEnableStatus }
      }
    } = this.props;

    return (
      <div className="row1 rc-bg-colour--brand3 p-3 text-break grid grid-cols-12">
        {/*Felin Appointment summary*/}
        {details.orderType === 'FELINE_ORDER' ? (
          <div className="col-span-12 md:col-span-6 mb-3">
            <div className="bold mt-1 mb-1" style={{ color: '#666' }}>
              <FormattedMessage id="Appointment summary" />
            </div>
            <div className="d-flex flex-column">
              <span>
                <FormattedMessage id="Expert type" />
                {details.specialistType}
              </span>
              <span>
                <FormattedMessage id="Appointment type" />
                {details.appointmentType}
              </span>
              <span>
                <FormattedMessage id="Appointment time" />
              </span>
              <span>{this.handleFelinOrderDate(details.appointmentDate)}</span>
            </div>
          </div>
        ) : null}

        {/* {JSON.stringify(details.consignee)} */}
        {details && details.orderType !== 'FELINE_ORDER' ? (
          <div className={cn('col-span-12 md:col-span-6 mb-3 order-1')}>
            <div className="bold mt-1 mb-1" style={{ color: '#666' }}>
              <FormattedMessage id="deliveryAddress" />
            </div>
            <p>{details.consignee.name}</p>
            {/* address1 */}
            {fieldKeyEnableStatus['address1'] && (
              <p>{details.consignee.detailAddress1}</p>
            )}
            {/* address2 */}
            {fieldKeyEnableStatus['address2'] &&
              details.consignee.detailAddress2 && (
                <p>{details.consignee.detailAddress2}</p>
              )}
            <p className="confirmation_delivery_address">
              {window.__.env.REACT_APP_COUNTRY == 'us' ||
              window.__.env.REACT_APP_COUNTRY == 'uk' ? null : (
                <>
                  {matchNamefromDict(
                    this.state.countryList,
                    details.consignee.countryId
                  )}{' '}
                </>
              )}
              {/* 城市 */}
              {fieldKeyEnableStatus['city'] && (
                <>
                  {details.consignee.city}
                  {', '}
                </>
              )}
              {/* 区域 */}
              {fieldKeyEnableStatus['region'] && (
                <>
                  {details.consignee.area}
                  {', '}
                </>
              )}
              {/* 区域 */}
              {fieldKeyEnableStatus['state'] && (
                <>{details.consignee.province} </>
              )}
              {/* county */}
              {fieldKeyEnableStatus['county'] && (
                <>{details.consignee?.county} </>
              )}
              {/* 国家，uk显示在这个位置 */}
              {window.__.env.REACT_APP_COUNTRY == 'uk' ? (
                <>
                  {matchNamefromDict(
                    this.state.countryList,
                    details.consignee.countryId
                  )}{' '}
                </>
              ) : null}
              {/* 邮编 */}
              {fieldKeyEnableStatus['postCode'] && (
                <>{details.consignee.postCode}</>
              )}
            </p>
            {details.consignee.rfc ? <p>{details.consignee.rfc}</p> : null}
            {details.buyerRemark ? <p>{details.buyerRemark}</p> : null}
          </div>
        ) : null}
        {payRecord && payRecord.lastFourDigits ? (
          <div
            className={cn('col-span-12 md:col-span-6 mb-3 order-4 md:order-2')}
          >
            <div className="bold mt-1 mb-1" style={{ color: '#666' }}>
              <FormattedMessage id="payment.paymentInformation" />
            </div>
            <div>{details.consignee.name}</div>
            <div>{payRecord.paymentVendor}</div>
            {payRecord.lastFourDigits ? (
              <div className="medium">********{payRecord.lastFourDigits}</div>
            ) : null}
            <div>
              {payRecord.expirationDate ? (
                <>
                  <span className="medium">
                    <FormattedMessage id="Expire" />{' '}
                    {window.__.env.REACT_APP_COUNTRY == 'us'
                      ? formatDate({
                          date: new Date(payRecord.expirationDate).addHours(12)
                        })
                      : formatDate({ date: payRecord.expirationDate })}
                  </span>
                  <br />
                </>
              ) : null}
            </div>

            {payRecord.accountName ? <p>{payRecord.accountName}</p> : null}
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
          </div>
        ) : null}
        {/* {JSON.stringify(details.invoice)} */}
        {details &&
        !this.props.hideBillingAddr &&
        details.invoice &&
        details.orderType !== 'FELINE_ORDER' ? (
          <div className={cn('col-span-12 md:col-span-6 mb-3 order-3')}>
            <div className="bold mt-1 mb-1" style={{ color: '#666' }}>
              <FormattedMessage id="billingAddress" />
            </div>
            <div>{details.invoice.contacts}</div>
            <div>
              {/* address1 */}
              {fieldKeyEnableStatus['address1'] && (
                <p>{details.invoice.address1}</p>
              )}
              {/* address2 */}
              {fieldKeyEnableStatus['address2'] && details.invoice.address2 && (
                <p>{details.invoice.address2}</p>
              )}
            </div>
            <div className="confirmation_billing_address">
              {window.__.env.REACT_APP_COUNTRY == 'us' ||
              window.__.env.REACT_APP_COUNTRY == 'uk' ? null : (
                <>
                  {matchNamefromDict(
                    this.state.countryList,
                    details.invoice.countryId
                  )}{' '}
                </>
              )}
              {/* 城市 */}
              {fieldKeyEnableStatus['city'] && (
                <>
                  {details.invoice.city}
                  {', '}
                </>
              )}
              {/* 区域 */}
              {fieldKeyEnableStatus['region'] && (
                <>
                  {details.invoice.area}
                  {', '}
                </>
              )}
              {/* 区域 */}
              {fieldKeyEnableStatus['state'] && (
                <>{details.invoice.province} </>
              )}
              {/* county */}
              {fieldKeyEnableStatus['county'] && <>{details.invoice.county} </>}

              {/* 国家，uk显示在这个位置 */}
              {window.__.env.REACT_APP_COUNTRY == 'uk' ? (
                <>
                  {matchNamefromDict(
                    this.state.countryList,
                    details.invoice.countryId
                  )}{' '}
                </>
              ) : null}

              {/* 邮编 */}
              {fieldKeyEnableStatus['postCode'] && (
                <>{details.invoice.postCode}</>
              )}
            </div>
            {details.invoice.rfc ? <p>{details.invoice.rfc}</p> : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default InfosPreview;
