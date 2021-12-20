import React from 'react';
import { loadJS } from '@/utils/utils';
import packageTranslations from './translations';
import { inject, observer } from 'mobx-react';
import getPaymentConf from '@/lib/get-payment-conf';

@inject('paymentStore')
@observer
class Adyen3DForm extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      action: {},
      adyenOriginKeyConf: null
    };
  }
  componentDidMount() {
    const {
      paymentStore: { curPayWayInfo }
    } = this.props;
    getPaymentConf().then((res) => {
      this.setState({
        adyenOriginKeyConf: res.filter(
          (t) => t.pspItemCode === curPayWayInfo?.code
        )[0]
      });
    });
  }
  static getDerivedStateFromProps(props, state) {
    const { action } = props;
    if (action !== state.action) {
      return {
        action
      };
    }
  }
  initForm(action) {
    const {
      intl: { messages }
    } = this.props;
    const { translations } = packageTranslations({ messages });
    const { adyenOriginKeyConf } = this.state;
    loadJS({
      url: 'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.0/adyen.js',
      callback: function () {
        if (!!window.AdyenCheckout) {
          const AdyenCheckout = window.AdyenCheckout;
          const checkout = new AdyenCheckout({
            environment: adyenOriginKeyConf?.env,
            originKey: adyenOriginKeyConf?.originKey,
            locale: adyenOriginKeyConf?.locale || 'en-US',
            translations: {
              [adyenOriginKeyConf?.locale || 'en-US']: translations
            }
          });

          // 跳转到3DS页面
          checkout.createFromAction(action).mount('#adyen-3d-form');
        }
      }
    });
  }
  render() {
    if (Object.keys(this.state.action).length > 0) {
      this.initForm(this.state.action);
    }
    return <div id="adyen-3d-form" />;
  }
}

export default Adyen3DForm;
