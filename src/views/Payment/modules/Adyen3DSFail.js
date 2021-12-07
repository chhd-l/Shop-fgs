import React, { Component } from 'react';
import { injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { funcUrl } from '@/lib/url-utils';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('paymentStore', 'loginStore')
@observer
class Adyen3DSFail extends Component {
  render() {
    return <div className="checkout--padding" />;
  }
  async componentDidMount() {
    try {
      const { history } = this.props;
      const tid = funcUrl({ name: 'tid' });
      const subscribeId = funcUrl({ name: 'subscribeId' });
      const tidList = funcUrl({ name: 'tidList' }).split('|');
      if (this.isLogin) {
        sessionItemRoyal.set('rc-tid', tid);
        sessionItemRoyal.set('rc-rePaySubscribeId', subscribeId);
        sessionItemRoyal.set('rc-tidList', JSON.stringify(tidList));
        history.push('/checkout');
      } else {
        history.push('/cart');
      }
    } catch (err) {
      console.log(err);
    }
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
}

export default injectIntl(Adyen3DSFail);
