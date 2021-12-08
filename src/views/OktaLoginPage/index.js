import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import Logo from '@/components/Logo';
import { getDeviceType, generateOptions, getDictionary } from '@/utils/utils';
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
class OktaLoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingShow: true
    };
    this.LoginButton = React.createRef();
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  async componentDidMount() {
    if (this.isLogin) {
      if (localItemRoyal.get('okta-redirectUrl-hub')) {
        let href = localItemRoyal.get('okta-redirectUrl-hub');
        localItemRoyal.remove('okta-redirectUrl-hub');
        window.location.href = href;
      } else {
        this.props.history.push('/');
      }
    } else {
      this.LoginButton && this.LoginButton.current.click();
    }
  }

  render() {
    const { loginStore, intl } = this.props;
    return (
      <>
        <LoginButton
          buttonRef={this.LoginButton}
          btnStyle={{ width: '11rem', margin: '2rem 0', visibility: 'hidden' }}
          intl={intl}
          callbackUrl="/okta-login-page"
        />
        {loginStore.loginModal || this.state.loadingShow ? <Loading /> : null}
      </>
    );
  }
}

export default withOktaAuth(OktaLoginPage);
