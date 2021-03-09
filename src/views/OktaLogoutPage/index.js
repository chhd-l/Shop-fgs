import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Logo from '@/components/Logo';
import {
  getParaByName,
  getDeviceType,
  generateOptions,
  getDictionary
} from '@/utils/utils';
import LoginButton from '@/components/LoginButton';
import LogoutButton from './LogoutButtonPack';
import { inject, observer } from 'mobx-react';
import { withOktaAuth } from '@okta/okta-react';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@injectIntl
@observer
class OktaLogoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingShow: true
    };
    this.LogoutButton = React.createRef();
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  async componentDidMount() {
    // if (!this.isLogin) {
    //   if (sessionItemRoyal.get('okta-redirectUrl-hub')) {
    //     let href = sessionItemRoyal.get('okta-redirectUrl-hub')
    //     sessionItemRoyal.remove('okta-redirectUrl-hub')
    //     window.location.href = href
    //   } else {
    //     this.props.history.push('/');
    //   }
    // } else {
    //   this.LogoutButton && this.LogoutButton.current.click();
    // }
  }

  render() {
    const { loginStore, history, match, location } = this.props;
    return (
      <>
        {/* <LoginButton
          buttonRef={this.LoginButton}
          btnStyle={{ width: '11rem', margin: '2rem 0', visibility: 'hidden' }}
          history={history}
        /> */}
        {withOktaAuth(<LogoutButton
          buttonRef={this.LogoutButton}
          btnStyle={{ width: '11rem', margin: '2rem 0', visibility: 'hidden' }}
          history={history}
          callbackUrl="/okta-logout-page"
        />)}
        {loginStore.loginModal || this.state.loadingShow ? <Loading /> : null}
      </>
    );
  }
}

export default OktaLogoutPage;
