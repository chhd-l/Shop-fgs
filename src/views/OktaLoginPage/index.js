import React from 'react';
import Loading from '@/components/Loading';
import LoginButton from '@/components/LoginButton';
import { inject, observer } from 'mobx-react';
import { withOktaAuth } from '@okta/okta-react';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
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
    const { loginStore } = this.props;
    return (
      <>
        <LoginButton
          buttonRef={this.LoginButton}
          btnStyle={{ width: '11rem', margin: '2rem 0', visibility: 'hidden' }}
          callbackUrl="/okta-login-page"
        />
        {loginStore.loginModal || this.state.loadingShow ? <Loading /> : null}
      </>
    );
  }
}

export default withOktaAuth(OktaLoginPage);
