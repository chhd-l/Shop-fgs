import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import {
  getDictionary,
  matchNamefromDict,
  getDeviceType,
  getFormatDate
} from '@/utils/utils';
import { format } from 'date-fns-tz';
import moment from 'moment';
import { getAppointByApptNo } from '@/api/order';

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
      orderArr: [],
      appointmentInfo: null //felin 预约信息
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
    if (this.props.details.appointmentNo) {
      this.queryAppointInfo();
    }
  }
  //获取appointment信息
  async queryAppointInfo() {
    getAppointByApptNo({ apptNo: this.props.details.appointmentNo }).then(
      async (res) => {
        let resContext = res?.context?.settingVO;
        Promise.all([
          getDictionary({
            type: 'apprintment_type'
          }),
          getDictionary({
            type: 'expert_type'
          })
        ]).then((resList) => {
          const appointmentDictRes = resList[0].filter(
            (item) => item.value === resContext?.apptTypeId
          );
          const expertDictRes = resList[1].filter(
            (item) => item.value === resContext?.expertTypeId
          );
          const appointType =
            appointmentDictRes.length > 0
              ? appointmentDictRes[0].name
              : 'Offline';
          const expertName =
            expertDictRes.length > 0 ? expertDictRes[0].name : 'Behaviorist';
          const apptTime = resContext.apptTime.split('#');
          const apptTime1 = apptTime[0].split(' ');
          const apptTime2 = apptTime[1].split(' ');
          const appointTime =
            moment(apptTime1[0]).format('YYYY-MM-DD') +
            ' ' +
            apptTime1[1] +
            ' - ' +
            apptTime2[1];
          this.setState({
            appointmentInfo: {
              appointType,
              expertName,
              appointTime
            }
          });
        });
      }
    );
  }
  computedOrder = () => {
    if (this.state.deviceType == 'PC') {
      this.setState({ orderArr: ['order1', 'order2', 'order3'] });
    } else {
      this.setState({ orderArr: ['order1', 'order3', 'order2'] });
    }
  };
  render() {
    const { payRecord, details } = this.props;
    const { appointmentInfo } = this.state;
    // 获取本地存储的需要显示的地址字段
    const localAddressForm = this.props.configStore.localAddressForm;
    return (
      <div style={{ padding: '0 .9375rem' }}>
        <div className="row rc-bg-colour--brand3 pt-3 pb-3 text-break">
          {/*Felin Appointment summary*/}
          {appointmentInfo ? (
            <div className="col-12 col-md-6 mb-3">
              <div className="bold mt-1 mb-1" style={{ color: '#666' }}>
                <FormattedMessage id="Appointment summary" />
              </div>
              <div className="d-flex flex-column">
                <span>
                  <FormattedMessage id="Expert type" />
                  {appointmentInfo.expertName}
                </span>
                <span>
                  <FormattedMessage id="Appointment type" />
                  {appointmentInfo.appointType}
                </span>
                <span>
                  <FormattedMessage id="Appointment time" />
                </span>
                <span>{appointmentInfo.appointTime}</span>
              </div>
            </div>
          ) : null}

          {/* {JSON.stringify(details.consignee)} */}
          {details ? (
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
          {details && !this.props.hideBillingAddr && details.invoice ? (
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
