import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { payu3dsPaymentsDetails } from '@/api/payment';
import { getRequest } from '@/utils/utils';
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
        ...getRequest()
        //businessId: sessionItemRoyal.get('orderNumber')
      });
      if (res.context.status === 'SUCCEED') {
        this.props.history.push('/confirmation');
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({
        circleLoading: false
      });
    }
  }
}

export default injectIntl(Payu3dsResult);
