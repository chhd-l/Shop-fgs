import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { adyen3DSResult } from '@/api/payment';

class Adyen3DResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div></div>;
  }
  async UNSAFE_componentWillMount() {
    try {
      const res = await adyen3DSResult();
      console.log(res)
      debugger
      if (res.context.status === 'SUCCEED') {
        this.props.history.push('/confirmation');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default injectIntl(Adyen3DResult);
