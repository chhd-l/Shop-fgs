import React from 'react';
import { inject, observer } from 'mobx-react';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import './index.css';
import { setSeoConfig } from '@/utils/utils';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore', 'configStore')
@observer
class Cart extends React.Component {
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig();
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  render() {
    const { configStore, history, match } = this.props;
    return (
      <>
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
