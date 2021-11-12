import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import {
  getDictionary,
  matchNamefromDict,
  getDeviceType,
  getFormatDate,
  handleFelinAppointTime
} from '@/utils/utils';
import { format } from 'date-fns-tz';

@inject('configStore')
@observer
class InfosPreview extends React.Component {
  static defaultProps = {
    payRecord: null,
    hideBillingAddr: false
  };
  constructor(props) {
    super(props);
    this.state = {
      countryList: [],
      deviceType: '',
      orderArr: []
    };
  }
  componentDidMount() {
    this.setState({ deviceType: getDeviceType() }, () => {
      this.computedOrder(); //地址栏三个部分的order顺序需要动态调整
    });
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
  }
  computedOrder = () => {
    if (this.state.deviceType == 'PC') {
      this.setState({ orderArr: ['order1', 'order2', 'order3'] });
    } else {
      this.setState({ orderArr: ['order1', 'order3', 'order2'] });
    }
  };
  handleFelinOrderDate = (appointmentDate) => {
    const orderTime = handleFelinAppointTime(appointmentDate);
    return (
      orderTime.appointStartTime +
      ' - ' +
      orderTime.appointEndTime.split(' ')[1]
    );
  };
  render() {
    const { payRecord, details } = this.props;
    // 获取本地存储的需要显示的地址字段
    const localAddressForm = this.props.configStore.localAddressForm;
    return (
      <div style={{ padding: '0 .9375rem' }}>
        <div className="row rc-bg-colour--brand3 pt-3 pb-3 text-break">
          {/*Felin Appointment summary*/}
          {details.orderType === 'FELINE_ORDER' ? (
            <div className="col-12 col-md-6 mb-3">
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
                <span>
                  {this.handleFelinOrderDate(details.appointmentDate)}
                </span>
              </div>
            </div>
          ) : null}

          {/* {JSON.stringify(details.consignee)} */}
          {details && details.orderType !== 'FELINE_ORDER' ? (
            <div
              className={[
                'col-12',
                'col-md-6',
                'mb-3',
                this.state.orderArr[0]
              ].join(' ')}
            >
              <div className="bold mt-1 mb-1" style={{ color: '#666' }}>
                <FormattedMessage id="deliveryAddress" />
              </div>
              <div>
                <span>{details.consignee.name}</span>
              </div>
              <div>
                {/* address1 */}
                {localAddressForm['address1'] && (
                  <>{details.consignee.detailAddress1}</>
                )}
                <br />
                {/* address2 */}
                {localAddressForm['address2'] && (
                  <>
                    {details.consignee.detailAddress2}
                    {details.consignee.detailAddress2 ? <br /> : null}
                  </>
                )}
              </div>
              <div>
                {window.__.env.REACT_APP_COUNTRY == 'us' ? null : (
                  <>
                    {matchNamefromDict(
                      this.state.countryList,
                      details.consignee.countryId
                    )}{' '}
                  </>
                )}
                {/* 城市 */}
                {localAddressForm['city'] && (
                  <>
                    {details.consignee.city}
                    {', '}
                  </>
                )}
                {/* 区域 */}
                {localAddressForm['region'] && (
                  <>
                    {details.consignee.area}
                    {', '}
                  </>
                )}
                {/* 区域 */}
                {localAddressForm['state'] && (
                  <>{details.consignee.province} </>
                )}
                {/* 邮编 */}
                {localAddressForm['postCode'] && (
                  <>{details.consignee.postCode}</>
                )}
              </div>
              {details.consignee.rfc}
              {details.consignee.rfc ? <br /> : null}
              {details.buyerRemark}
            </div>
          ) : null}
          {payRecord && payRecord.lastFourDigits ? (
            <div
              className={[
                'col-12',
                'col-md-6',
                'mb-3',
                this.state.orderArr[1]
              ].join(' ')}
            >
              <div className="bold mt-1 mb-1" style={{ color: '#666' }}>
                <FormattedMessage id="payment.paymentInformation" />
              </div>
              <div>
                <span>{details.consignee.name}</span>
              </div>
              <div>{payRecord.paymentVendor}</div>
              <div>
                {payRecord.lastFourDigits ? (
                  <>
                    <span className="medium">
                      ********{payRecord.lastFourDigits}
                    </span>
                    <br />
                  </>
                ) : null}
              </div>
              <div>
                {payRecord.expirationDate ? (
                  <>
                    <span className="medium">
                      <FormattedMessage id="Expire" />{' '}
                      {window.__.env.REACT_APP_COUNTRY == 'us'
                        ? format(
                            new Date(payRecord.expirationDate).addHours(12),
                            'MM/yyyy'
                          )
                        : getFormatDate(payRecord.expirationDate.substr(0, 7))}
                    </span>
                    <br />
                  </>
                ) : null}
              </div>

              {payRecord.accountName ? (
                <>
                  {payRecord.accountName}
                  <br />
                </>
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
            </div>
          ) : null}
          {/* {JSON.stringify(details.invoice)} */}
          {details &&
          !this.props.hideBillingAddr &&
          details.invoice &&
          details.orderType !== 'FELINE_ORDER' ? (
            <div
              className={[
                'col-12',
                'col-md-6',
                'mb-3',
                this.state.orderArr[2]
              ].join(' ')}
            >
              <div className="bold mt-1 mb-1" style={{ color: '#666' }}>
                <FormattedMessage id="billingAddress" />
              </div>
              <div>
                <span>{details.invoice.contacts}</span>
              </div>
              <div>
                {/* address1 */}
                {localAddressForm['address1'] && (
                  <>{details.invoice.address1}</>
                )}
                <br />
                {/* address2 */}
                {localAddressForm['address2'] && (
                  <>
                    {details.invoice.address2}
                    {details.invoice.address2 ? <br /> : null}
                  </>
                )}
              </div>
              <div>
                {window.__.env.REACT_APP_COUNTRY == 'us' ? null : (
                  <>
                    {matchNamefromDict(
                      this.state.countryList,
                      details.invoice.countryId
                    )}{' '}
                  </>
                )}
                {/* 城市 */}
                {localAddressForm['city'] && (
                  <>
                    {details.invoice.city}
                    {', '}
                  </>
                )}
                {/* 区域 */}
                {localAddressForm['region'] && (
                  <>
                    {details.invoice.area}
                    {', '}
                  </>
                )}
                {/* 区域 */}
                {localAddressForm['state'] && <>{details.invoice.province} </>}
                {/* 邮编 */}
                {localAddressForm['postCode'] && (
                  <>{details.invoice.postCode}</>
                )}
              </div>
              {details.invoice.rfc}
              {details.invoice.rfc ? <br /> : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default InfosPreview;
