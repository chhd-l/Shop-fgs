import React from 'react';
import { loadJS } from '@/utils/utils';
import translations from './translations';
import { inject, observer } from 'mobx-react';
const sessionItemRoyal = window.__.sessionItemRoyal;

let oxxoInput = '';

@inject('paymentStore')
@observer
class AdyenOxxo extends React.Component {
  static defaultProps = {
    // sendAdyenOxxoIsValid: () => {},
    action: '',
    billingJSX: <></>
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  //   createOxxoComponent = () => {
  //     let _this = this;
  //     loadJS({
  //       url:
  //         'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
  //       callback: function () {
  //         if (!!window.AdyenCheckout) {
  //           const AdyenCheckout = window.AdyenCheckout;
  //           const checkout = new AdyenCheckout({
  //             environment: process.env.REACT_APP_Adyen_ENV,
  //             originKey: process.env.REACT_APP_AdyenOriginKEY,
  //             locale: process.env.REACT_APP_Adyen_locale,
  //             translations,
  //             onSubmit: (state) => {
  //               _this.props.sendAdyenOxxoIsValid();
  //               oxxoInput.unmount();
  //             }
  //           });

  //           //CreateOxxoComponent
  //           oxxoInput = checkout.create('oxxo').mount('#oxxo-container');
  //         }
  //       }
  //     });
  //   };
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
            locale: process.env.REACT_APP_Adyen_locale,
            translations
          });

          //Present the voucher
          //oxxoInput.unmount();
          checkout.createFromAction(action).mount('#oxxo-container');
        }
      }
    });
  }
  componentDidMount() {
    // this.createOxxoComponent();
  }
  render() {
    if (Object.keys(this.props.action).length > 0) {
      this.presentVoucher(this.props.action);
    }
    const { billingJSX } = this.props;
    return (
      <>
        <div id="oxxo-container"></div>
        {billingJSX}
      </>
    );
  }
}

export default AdyenOxxo;
