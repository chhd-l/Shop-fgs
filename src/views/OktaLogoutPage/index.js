import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Logo from '@/components/Logo';
import { getDeviceType, generateOptions, getDictionary } from '@/utils/utils';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
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
    setTimeout(() => {
      if (!this.isLogin) {
        if (localItemRoyal.get('okta-redirectUrl-hub')) {
          let href = localItemRoyal.get('okta-redirectUrl-hub');
          localItemRoyal.remove('okta-redirectUrl-hub');
          window.location.href = href;
        } else {
          this.props.history.push('/');
        }
      } else {
        this.LogoutButton && this.LogoutButton.current.click();
      }
    }, 300);
  }

  render() {
    const { loginStore, history, match, location } = this.props;
    return (
      <>
        <LogoutButton
          buttonRef={this.LogoutButton}
          btnStyle={{ width: '11rem', margin: '2rem 0', visibility: 'hidden' }}
          history={history}
          callbackUrl="/okta-logout-page"
        />
        {loginStore.loginModal || this.state.loadingShow ? <Loading /> : null}
      </>
    );
  }
}

export default OktaLogoutPage;
