import React, { Component } from 'react';
import { payu3dsPaymentsDetails } from '@/api/payment';
import { transferToObject } from '@/lib/url-utils';
import { sleep } from '@/utils/utils';
import Loading from '@/components/Loading';
import { inject, observer } from 'mobx-react';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('loginStore')
@observer
class Payu3dsResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleLoading: false
    };
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
      console.log(err);
      const { history } = this.props;
      if (this.isLogin) {
        sessionItemRoyal.set('rc-tid', err.context.businessId);
        sessionItemRoyal.set('rc-tidList', JSON.stringify(err.context.tidList));
        history.push('/checkout');
      } else {
        history.push('/cart');
      }
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

export default Payu3dsResult;
