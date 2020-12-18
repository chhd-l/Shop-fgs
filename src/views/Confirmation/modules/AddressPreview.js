import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getDictionary } from '@/utils/utils';
import find from 'lodash/find';
import { CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import { getDeviceType } from '@/utils/utils';

class InfosPreview extends React.Component {
  static defaultProps = {
    payRecord: null
  };
  constructor(props) {
    super(props);
    this.state = {
      countryList: [],
      deviceType:'',
      orderArr:[]
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
  computedOrder=()=>{
    if(this.state.deviceType=='PC'){
      this.setState({orderArr:['order1','order2','order3']})
    }else{
      this.setState({orderArr:['order1','order3','order2']})
    }
   
  }
  componentDidMount(){
    this.setState({ deviceType: getDeviceType() },()=>{
      this.computedOrder() //地址栏三个部分的order顺序需要动态调整
    });
  }
  render() {
    const { payRecord, details } = this.props;
    console.log({payRecord})
    return (
      <div style={{ padding: '0 15px' }}>
        <div className="row rc-bg-colour--brand3 pt-3 pb-3 text-break">
          {details ? (
            <div className={['col-12','col-md-6','mb-3',this.state.orderArr[0]].join(" ")}>
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
          {payRecord && payRecord.last4Digits ? (
            // && payRecord.paymentMethod !== 'ADYEN'
            <div className={['col-12','col-md-6','mb-3',this.state.orderArr[1]].join(" ")}>
              <div style={{margin:'10px 0',color:"#666",fontWeight:"bold"}}>
                <FormattedMessage id="payment.paymentInformation" />
              </div>
              <div>
               <span>{details.consignee.name}</span>
              </div>
              <div>
                {payRecord.vendor}
              </div>
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
          {details ? (
            <div className={['col-12','col-md-6','mb-3',this.state.orderArr[2]].join(" ")}>
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
          
          
        </div>
      </div>
    );
  }
}

export default InfosPreview;
