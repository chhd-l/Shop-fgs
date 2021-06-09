import React from 'react';
import { loadJS } from '@/utils/utils';
import { inject, observer } from 'mobx-react';

@observer
class AdyenOxxo extends React.Component {
  static defaultProps = {
    action: ''
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  presentVoucher(action) {
    loadJS({
      url:
        'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
      callback: function () {
        if (!!window.AdyenCheckout) {
          const AdyenCheckout = window.AdyenCheckout;
          const checkout = new AdyenCheckout({
            environment: process.env.REACT_APP_Adyen_ENV,
            originKey: process.env.REACT_APP_AdyenOriginKEY,
            locale: process.env.REACT_APP_Adyen_locale
          });

          //Present the voucher
          checkout.createFromAction(action).mount('#oxxo-container');
        }
      }
    });
  }
  render() {
    if (this.props.action && Object.keys(this.props.action).length > 0) {
      this.presentVoucher(this.props.action);
    }
    return (
      <>
        <div id="oxxo-container"></div>
      </>
    );
  }
}

export default AdyenOxxo;
