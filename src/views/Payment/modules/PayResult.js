import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { adyenPaymentsDetails } from '@/api/payment';
import url from 'url';
import { inject, observer } from 'mobx-react';
import { sleep } from '@/utils/utils';
import Loading from '@/components/Loading';

const sessionItemRoyal = window.__.sessionItemRoyal;
const COUNTRY = window.__.env.REACT_APP_COUNTRY;

@inject('loginStore')
@observer
class AdyenPayResult extends Component {
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
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  async UNSAFE_componentWillMount() {
    this.setState({
      circleLoading: true
    });
    let commonResult = this.props.location.search.split('=')[1]; //adyen_credit_card、paylater，paynow
    let payloadResult = url.parse(this.props.location.search, true).query
      .payload; //sofort取的方式有点不一样
    let redirectResult;
    if (payloadResult) {
      redirectResult = payloadResult;
    } else {
      redirectResult = commonResult;
    }
    try {
      const res = await adyenPaymentsDetails({
        redirectResult,
        businessId: sessionItemRoyal.get('orderNumber')
      });

      if (res.context.status === 'SUCCEED') {
        this.props.history.push('/confirmation');
      }
    } catch (err) {
      console.log(err);
      const { history } = this.props;
      if (err?.message === 'Pay order error' && COUNTRY === 'nl') {
        if (this.isLogin) {
          sessionItemRoyal.set('rc-tid', sessionItemRoyal.get('orderNumber'));
          sessionItemRoyal.set(
            'rc-tidList',
            JSON.stringify(
              JSON.parse(sessionItemRoyal.get('subOrderNumberList'))
            )
          );
          history.push('/checkout');
        } else {
          history.push('/');
        }
      } else {
        if (this.isLogin) {
          sessionItemRoyal.set('rc-tid', err.context.businessId);
          sessionItemRoyal.set(
            'rc-tidList',
            JSON.stringify(err.context.tidList)
          );
          history.push('/checkout');
        } else {
          history.push('/cart');
        }
      }
    } finally {
      await sleep(2000); //防止还没跳转
      this.setState({
        circleLoading: false
      });
    }
  }
}

export default injectIntl(AdyenPayResult);
