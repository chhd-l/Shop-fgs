import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { payu3dsPaymentsDetails } from '@/api/payment';
import url from 'url';
import { getRequest } from '@/utils/utils';

const sessionItemRoyal = window.__.sessionItemRoyal;

class Payu3dsResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="checkout--padding"></div>;
  }
  async UNSAFE_componentWillMount() {
    console.log('Payu3dsResult');
    console.log(this.props.location.search);
    console.log(url.parse(this.props.location.search, true));
    console.log(getRequest());
    // let commonResult = this.props.location.search.split('=')[1];//adyen_credit_card、paylater，paynow
    // let payloadResult = url.parse(this.props.location.search, true).query.payload //sofort取的方式有点不一样
    // let redirectResult
    // if (payloadResult) {
    //   redirectResult = payloadResult
    // }else{
    //   redirectResult = commonResult
    // }
    try {
      const res = await payu3dsPaymentsDetails({
        ...getRequest()
        //businessId: sessionItemRoyal.get('orderNumber')
      });
      if (res.context.status === 'SUCCEED') {
        this.props.history.push('/confirmation');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default injectIntl(Payu3dsResult);
