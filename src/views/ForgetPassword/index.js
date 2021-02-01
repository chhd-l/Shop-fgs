import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { forgetPassword } from '@/api/login';
import './index.css';

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errorMsg: '',
      successMsg: ''
    };
  }
  sendEmail = () => {
    if (!this.emailVerify(this.state.email)) {
      this.showErrorMsg(this.props.intl.messages.yourEmailNotVerified);
      return false;
    }
    forgetPassword({ customerAccount: this.state.email })
      .then((res) => {
        if (res.code === 'K-000000') {
          this.showSuccessMsg(
            res.message || this.props.intl.messages.resetPasswordEmail
          );
          console.log(res);
        }
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.systemError
        );
      });
  };

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  };
  showSuccessMsg = (message) => {
    this.setState({
      successMsg: message
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        successMsg: ''
      });
    }, 5000);
  };
  emailVerify = (email) => {
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(email);
  };
  backToLogin() {
    const { history } = this.props;
    history.push('/login');
  }
  render(h) {
    return (
      <div className="miaa-content">
        <div className="miaa-header">
          <h4
            className="miaa-title mb-3"
            style={{ fontWeight: 700, textAlign: 'center' }}
          >
            <FormattedMessage id="forgetPassword.createNewPassword" />
          </h4>
        </div>
        <div className="miaa-body">
          <div className="miaa-inner-content">
            <div className="text-gray info-text">
              <FormattedMessage id="forgetPassword.forgetPasswordTip" />
            </div>

            <div className="message-tip">
              <div
                className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                  this.state.errorMsg ? '' : 'hidden'
                }`}
              >
                <aside
                  className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                  role="alert"
                >
                  <span>{this.state.errorMsg}</span>
                  <button
                    className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                    onClick={() => {
                      this.setState({ errorMsg: '' });
                    }}
                    aria-label="Close"
                  >
                    <span className="rc-screen-reader-text">
                      <FormattedMessage id="close" />
                    </span>
                  </button>
                </aside>
              </div>
              <aside
                className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                  this.state.successMsg ? '' : 'hidden'
                }`}
                role="alert"
              >
                <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                  {this.state.successMsg}
                </p>
              </aside>
            </div>

            <div className="miaa_input required">
              <input
                id="capture_traditionalRegistration_email"
                data-capturefield="email"
                type="email"
                className="capture_email capture_required capture_text_input form-control"
                placeholder={this.props.intl.messages.emailAddress}
                name="email"
                onChange={(e) => {
                  const value = e.target.value;
                  this.setState({
                    email: value
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="miaa-footer">
          <div className="miaa-inner-content">
            <div className="row">
              <div className="col">
                <button
                  type="submit"
                  className="capture_btn btn btn-primary"
                  onClick={() => this.sendEmail()}
                >
                  <FormattedMessage id="submit" />
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.backToLogin()}
                >
                  <FormattedMessage id="forgetPassword.back" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(ForgetPassword);
