import React from 'react';
import { loadJS } from '@/utils/utils';
import packageTranslations from './translations';
import { inject, observer } from 'mobx-react';
import getPaymentConf from '@/lib/get-payment-conf';
import AdyenCheckout from '@adyen/adyen-web';

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
    const configuration = {
      environment: adyenOriginKeyConf?.environment,
      clientKey: adyenOriginKeyConf?.openPlatformSecret,
      locale: adyenOriginKeyConf?.locale || 'en-US'
    };
    // without async because: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    AdyenCheckout(configuration).then((checkout) => {
      checkout.createFromAction(action).mount('#adyen-3d-form');
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
