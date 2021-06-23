import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { funcUrl } from '@/lib/url-utils';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('paymentStore')
@observer
class Adyen3DSFail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="checkout--padding"></div>;
  }
  async componentDidMount() {
    try {
      const tid = funcUrl({ name: 'tid' });
      const subscribeId = funcUrl({ name: 'subscribeId' });
      const tidList = funcUrl({ name: 'tidList' }).split('|');

      sessionItemRoyal.set('rc-tid', tid);
      sessionItemRoyal.set('rc-rePaySubscribeId', subscribeId);
      sessionItemRoyal.set('rc-tidList', JSON.stringify(tidList));
      console.log({ tid, subscribeId, tidList });
      this.props.history.push('/checkout');
    } catch (err) {
      console.log(err);
    }
  }
}

export default injectIntl(Adyen3DSFail);
