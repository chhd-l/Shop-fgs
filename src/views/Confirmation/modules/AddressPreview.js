import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getDictionary } from '@/utils/utils';
import find from 'lodash/find';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import LazyLoad from 'react-lazyload';

class InfosPreview extends React.Component {
  static defaultProps = {
    payRecord: null
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
  matchNamefromDict(dictList, id) {
    return find(dictList, (ele) => ele.id === id)
      ? find(dictList, (ele) => ele.id === id).name
      : id;
  }
  render() {
    const { payRecord, details } = this.props;
    console.log({payRecord})
    return (
      <div style={{ padding: '0 15px' }}>
        <div className="row rc-bg-colour--brand3 pt-3 pb-3 text-break">
          {details ? (
            <div className="col-12 col-md-6 mb-3">
              <div style={{margin:'10px 0',color:"#666",fontWeight:"bold"}}>
                <FormattedMessage id="deliveryAddress" />
              </div>
              <div>
               <span>{details.consignee.name}</span>
              </div>
              <div>
                {details.consignee.postCode}, {details.consignee.phone}
              </div>
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
          {details ? (
            <div className="col-12 col-md-6">
              <div style={{margin:'10px 0',color:"#666",fontWeight:"bold"}}>
                <FormattedMessage id="billingAddress" />
              </div>
              
              <div>
                <span>{details.invoice.contacts}</span>
              </div>           
              <div>
                {details.invoice.postCode}, {details.invoice.phone}
              </div>
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
          {payRecord && payRecord.last4Digits ? (
            // && payRecord.paymentMethod !== 'ADYEN'
            <div className="col-12 col-md-6 mb-3">
              <div style={{margin:'10px 0',color:"#666",fontWeight:"bold"}}>
                <FormattedMessage id="payment.paymentInformation" />
              </div>
              <div>
               <span>{details.consignee.name}</span>
              </div>
              <div>
                {payRecord.vendor}
              </div>
              {/* <LazyLoad style={{ width: '20%' }}>
                <img
                  alt=""
                  className="d-inline-block mr-1"
                  src={
                    CREDIT_CARD_IMG_ENUM[payRecord.vendor]
                      ? CREDIT_CARD_IMG_ENUM[payRecord.vendor.toUpperCase()]
                      : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                  }
                />
              </LazyLoad> */}
              <div>
                {payRecord.last4Digits ? (
                  <>
                    <span className="medium">
                      ********{payRecord.last4Digits}
                    </span>
                    <br />
                  </>
                ) : null}
              </div>
              <div>
                {payRecord.expirationDate ? (
                  <>
                    <span className="medium">
                      {payRecord.expirationDate}
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
          
        </div>
      </div>
    );
  }
}

export default InfosPreview;
