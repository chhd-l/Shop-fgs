import React from 'react';
import { inject, observer } from 'mobx-react';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@observer
class Cart extends React.Component {
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  render() {
    return (
      <>
        {this.isLogin ? (
          <LoginCart history={this.props.history} />
        ) : (
          <UnloginCart history={this.props.history} />
        )}
      </>
    );
  }
}

export default Cart;
