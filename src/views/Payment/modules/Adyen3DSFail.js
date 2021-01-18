import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import url from 'url'
import {
  getParaByName
} from '@/utils/utils';
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
    const { search } = this.props.history.location;
    const tid = getParaByName(search, 'tid');
    const subscribeId = getParaByName(search, 'subscribeId');
    const tidList = getParaByName(search, 'tidList');
      sessionItemRoyal.set('rc-tid', tid);
      sessionItemRoyal.set('rc-rePaySubscribeId', subscribeId);
      sessionItemRoyal.set(
          'rc-tidList',
          JSON.stringify(tidList)
        );
        console.log({tid,subscribeId,tidList})
      this.props.history.push('/checkout');
    } catch (err) {
      console.log(err);
    }
  }
}

export default injectIntl(Adyen3DSResult);
