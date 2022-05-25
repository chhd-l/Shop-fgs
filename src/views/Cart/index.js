import React from 'react';
import { inject, observer } from 'mobx-react';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import './index.css';
import { doGetGAVal } from '@/utils/GA';
import GoogleTagManager from '@/components/GoogleTagManager';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

const isHubGA = window.__.env.REACT_APP_HUB_GA;

@inject('loginStore', 'configStore', 'checkoutStore')
@seoHoc()
@observer
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: {}
    };
  }
  UNSAFE_componentWillMount() {
    isHubGA && this.getPetVal();
  }
  getPetVal() {
    let obj = doGetGAVal(this.props);
    this.setState({ pet: obj });
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  render() {
    const { configStore, history, match } = this.props;
    const event = {
      page: {
        type: 'Cart',
        theme: '',
        path: history.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      },
      pet: this.state.pet
    };

    return (
      <>
        <Canonical />
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        {this.isLogin ? (
          <LoginCart
            history={history}
            match={match}
            configStore={configStore}
          />
        ) : (
          <UnloginCart
            history={history}
            match={match}
            configStore={configStore}
          />
        )}
      </>
    );
  }
}

export default Cart;
