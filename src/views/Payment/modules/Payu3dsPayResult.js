import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { payu3dsPaymentsDetails } from '@/api/payment';
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
