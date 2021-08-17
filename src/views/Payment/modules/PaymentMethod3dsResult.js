import React, { Component } from 'react';
import { payu3dsPaymentsDetails } from '@/api/payment';
import { transferToObject } from '@/lib/url-utils';
import { sleep } from '@/utils/utils';
import Loading from '@/components/Loading';
import { inject, observer } from 'mobx-react';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@observer
class PaymentMethod3dsResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleLoading: false
    };
  }
  async UNSAFE_componentWillMount() {
    const { history } = this.props;
    const redirectPage =
      localItemRoyal.get('paymentEditFormCurrentPage') || '/';

    this.setState({
      circleLoading: true
    });
    try {
      const res = await payu3dsPaymentsDetails({
        ...transferToObject()
      });

      if (res.context.status === 'Succeed') {
        history.push(redirectPage);
      } else {
        history.push('/');
      }
    } catch (err) {
      history.push('/');
    } finally {
      await sleep(2000); //防止还没跳转
      this.setState({
        circleLoading: false
      });
    }
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
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
}

export default PaymentMethod3dsResult;
