import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getDictionary } from '@/utils/utils';
import { find } from 'lodash';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';

class InfosPreview extends React.Component {
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
  matchNamefromDict(dictList, id) {
    return find(dictList, (ele) => ele.id === id)
      ? find(dictList, (ele) => ele.id === id).name
      : id;
  }
  render() {
    const { payRecord, details } = this.props;
    return (
      <div style={{ padding: '0 15px' }}>
        <div className="row rc-bg-colour--brand3 pt-3 pb-3 text-break">
          {details ? (
            <div className="col-12 col-md-6 mb-3">
              <FormattedMessage id="deliveryAddress" />
              <br />
              <span className="medium">{details.consignee.name}</span>
              <br />
              {details.consignee.postCode}, {details.consignee.phone}
              <br />
              {this.matchNamefromDict(
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
          {payRecord 
          // && payRecord.paymentMethod !== 'ADYEN'
           ? (
            <div className="col-12 col-md-6 mb-3">
              <FormattedMessage id="payment.paymentInformation" />
              <br />
              <img
                alt=""
                className="d-inline-block mr-1"
                style={{ width: '20%' }}
                src={
                  CREDIT_CARD_IMG_ENUM[payRecord.vendor]
                    ? CREDIT_CARD_IMG_ENUM[payRecord.vendor.toUpperCase()]
                    : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                }
              />
              {payRecord.last4Digits ? (
                <>
                  <span className="medium">
                    ********{payRecord.last4Digits}
                  </span>
                  <br />
                </>
              ) : null}
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
            <div className="col-12 col-md-6">
              <FormattedMessage id="billingAddress" />
              <br />
              <span className="medium">{details.invoice.contacts}</span>
              <br />
              {details.invoice.postCode}, {details.invoice.phone}
              <br />
              {this.matchNamefromDict(
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
