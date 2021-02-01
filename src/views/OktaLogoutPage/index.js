import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import Logo from '@/components/Logo';
import {
  getParaByName,
  getDeviceType,
  generateOptions,
  getDictionary
} from '@/utils/utils';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { inject, observer } from 'mobx-react';
import { withOktaAuth } from '@okta/okta-react';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject(
  'loginStore',
  'clinicStore',
  'configStore',
  'checkoutStore',
  'headerSearchStore'
)
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
    if(!this.isLogin) {
      if(sessionItemRoyal.get("okta-redirectUrl-hub")) {
        window.location.href = sessionItemRoyal.get("okta-redirectUrl-hub")
      }else {
        this.props.history.push('/')
      }
    }else {
      this.LogoutButton.current.click()
    }
  }

  render() {
    const {
      loginStore,
      history
    } = this.props;
    return (
      <>
        {/* <LoginButton
          buttonRef={this.LoginButton}
          btnStyle={{ width: '11rem', margin: '2rem 0', visibility: 'hidden' }}
          history={history}
        /> */}
        <LogoutButton
          buttonRef={this.LoginButton}
          btnStyle={{ width: '11rem', margin: '2rem 0', visibility: 'hidden' }}
          history={history}
        />
        {loginStore.loginModal || this.state.loadingShow ? <Loading /> : null}
      </>
    );
  }
}

export default withOktaAuth(OktaLogoutPage);
