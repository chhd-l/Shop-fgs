import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { adyen3DSResult } from '@/api/payment';
import { inject, observer } from 'mobx-react';
const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('paymentStore')
@observer
class Adyen3DSResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="checkout--padding"></div>;
  }
  async UNSAFE_componentWillMount() {
    try {
      const res = await adyen3DSResult({
        md:this.props.paymentStore.md,
        paRes: sessionItemRoyal.get('orderNumber')
      });

      if (res.context.status === 'SUCCEED') {
        this.props.history.push('/confirmation');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default injectIntl(Adyen3DSResult);
