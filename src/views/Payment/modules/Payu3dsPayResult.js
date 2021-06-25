import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { payu3dsPaymentsDetails } from '@/api/payment';
import { transferToObject } from '@/lib/url-utils';
import { sleep } from '@/utils/utils';
import Loading from '@/components/Loading';

const sessionItemRoyal = window.__.sessionItemRoyal;

class Payu3dsResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleLoading: false
    };
  }
  render() {
    return (
      <div className="checkout--padding">
        {this.state.circleLoading ? (
          <Loading bgColor={'#fff'} opacity={1} />
        ) : null}
      </div>
    );
  }
  async UNSAFE_componentWillMount() {
    this.setState({
      circleLoading: true
    });
    try {
      const res = await payu3dsPaymentsDetails({
        ...transferToObject()
      });
      if (res.context.status === 'Succeed') {
        this.props.history.push('/confirmation');
      }
    } catch (err) {
      sessionItemRoyal.set('rc-tid', err.context.businessId);
      sessionItemRoyal.set('rc-tidList', JSON.stringify(err.context.tidList));
      this.props.history.push('/checkout');
    } finally {
      await sleep(2000); //防止还没跳转
      this.setState({
        circleLoading: false
      });
    }
  }
}

export default injectIntl(Payu3dsResult);
