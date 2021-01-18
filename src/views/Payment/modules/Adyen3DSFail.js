import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import url from 'url'
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
      const param = url.parse(this.props.location.search)
      console.log(param)
      // sessionItemRoyal.set('rc-tid', 111);
      // sessionItemRoyal.set('rc-rePaySubscribeId', 222);
      // sessionItemRoyal.set(
      //     'rc-tidList',
      //     JSON.stringify(err.errorData.tidList)
      //   );
      //this.props.history.push('/checkout');
    } catch (err) {
      console.log(err);
    }
  }
}

export default injectIntl(Adyen3DSResult);
