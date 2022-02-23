import React from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import UnloginCart from './modules/unLoginCart';
import LoginCart from './modules/loginCart';
import './index.css';
import { doGetGAVal } from '@/utils/GA';
import GoogleTagManager from '@/components/GoogleTagManager';
import { Helmet } from 'react-helmet';
import { seoHoc } from '@/framework/common';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

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
  componentWillUnmount() {}
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
        <Helmet>
          <link rel="canonical" href={pageLink} />
        </Helmet>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        {this.props.location.key}999999
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
