import React from 'react';
import { Loading, LogoutButton } from '@/components';
import { inject, observer } from 'mobx-react';
import { withOktaAuth } from '@okta/okta-react';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
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
