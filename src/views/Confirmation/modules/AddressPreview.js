import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  getDictionary,
  matchNamefromDict,
  getDeviceType,
  getFormatDate
} from '@/utils/utils';

class InfosPreview extends React.Component {
  static defaultProps = {
    payRecord: null
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
  render() {
    const { payRecord, details } = this.props;
    return (
      <div style={{ padding: '0 15px' }}>
        <div className="row rc-bg-colour--brand3 pt-3 pb-3 text-break">
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
                {details.consignee.postCode}, {details.consignee.phone}
              </div>
              {matchNamefromDict(
                this.state.countryList,
                details.consignee.countryId
              )}{' '}
              {details.consignee.cityName}
              <br />
              {details.consignee.detailAddress1}
              <br />
              {details.consignee.detailAddress2}
              {details.consignee.detailAddress2 ? <br /> : null}
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
                      {getFormatDate(payRecord.expirationDate.substr(0, 7))}
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
              {payRecord.phone ? (
                <>
                  {payRecord.phone}
                  <br />
                </>
              ) : null}
              {payRecord.email}
            </div>
          ) : null}
          {details ? (
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
                {details.invoice.postCode}, {details.invoice.phone}
              </div>
              {matchNamefromDict(
                this.state.countryList,
                details.invoice.countryId
              )}{' '}
              {details.invoice.cityName}
              <br />
              {details.invoice.address1}
              <br />
              {details.invoice.address2}
              {details.invoice.address2 ? <br /> : null}
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
