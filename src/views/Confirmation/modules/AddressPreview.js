import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import {
  getDictionary,
  matchNamefromDict,
  handleFelinAppointTime,
  formatDate
} from '@/utils/utils';
import { AddressPreview } from '@/components/Address';
import cn from 'classnames';

@injectIntl
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
      formatDate({ date: orderTime.appointStartTime.split(' ')[0] }) +
      ' ' +
      orderTime.appointStartTime.split(' ')[1] +
      ' - ' +
      orderTime.appointEndTime.split(' ')[1]
    );
  };
  render() {
    const { payRecord, details } = this.props;

    return (
      <div className="row1 rc-bg-colour--brand3 p-3 text-break grid grid-cols-12">
        {/*Felin Appointment summary*/}
        {details?.appointmentNo ? (
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
        {details && !details.appointmentNo ? (
          <div className={cn('col-span-12 md:col-span-6 mb-3 order-1')}>
            <div className="bold mt-1 mb-1" style={{ color: '#666' }}>
              <FormattedMessage id="deliveryAddress" />
            </div>

            <AddressPreview
              data={{
                name: details.consignee.name,
                address1: details.consignee.detailAddress1,
                address2: details.consignee.detailAddress2,
                city: details.consignee.city,
                area: details.consignee.area,
                province: details.consignee.province,
                county: details.consignee.county,
                postCode: details.consignee.postCode,
                rfc: details.consignee.rfc,
                buyerRemark: details.buyerRemark,
                countryName: matchNamefromDict(
                  this.state.countryList,
                  details.consignee.countryId
                )
              }}
            />
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
                    {formatDate({
                      date: payRecord.expirationDate,
                      formatOption: {
                        year: 'numeric',
                        month: '2-digit'
                      }
                    })}
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
        !details.appointmentNo ? (
          <div className={cn('col-span-12 md:col-span-6 mb-3 order-3')}>
            <div className="bold mt-1 mb-1" style={{ color: '#666' }}>
              <FormattedMessage id="billingAddress" />
            </div>
            <AddressPreview
              data={{
                name: details.invoice.contacts,
                address1: details.invoice.address1,
                address2: details.invoice.address2,
                countryName: matchNamefromDict(
                  this.state.countryList,
                  details.invoice.countryId
                ),
                city: details.invoice.city,
                area: details.invoice.area,
                province: details.invoice.province,
                county: details.invoice.county,
                postCode: details.invoice.postCode,
                rfc: details.invoice.rfc,
                buyerRemark: details.buyerRemark
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default InfosPreview;
