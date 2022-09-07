import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { forgetPassworSendEmail } from '@/api/login';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Loading from '@/components/Loading';
import { EMAIL_REGEXP, LOGO_PRIMARY_RU, LOGO } from '@/utils/constant';

import './index.css';
import { Button, Input } from '@/components/Common';

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errorMsg: '',
      emailValid: true,
      isWarning: false,
      correctEmail: false,
      loading: false
    };
  }
  sendEmail = async () => {
    this.setState({
      loading: true
    });
    try {
      const res = await forgetPassworSendEmail({
        customerAccount: this.state.email
      });
      if (res.code === 'K-000000') {
        this.props.history.push({
          pathname: '/forgot/success/email',
          state: {
            email: this.state.email
          }
        });
      }
    } catch (err) {
      this.showErrorMsg(
        err.message.toString() || this.props.intl.messages.systemError
      );
    } finally {
      this.setState({
        loading: false
      });
    }
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

  backToLogin() {
    const { history } = this.props;
    history.push('/login');
  }

  inputChange = (e) => {
    const value = e.target.value;
    const emailTest = EMAIL_REGEXP.test(value);
    this.setState({
      correctEmail: emailTest,
      email: value
    });
    if (value) {
      this.setState({
        isWarning: false
      });
    }
  };

  inputBlur = (e) => {
    const value = e.target.value;
    if (!value) {
      this.setState({
        isWarning: true
      });
    }
  };

  render(h) {
    const { emailValid, email, isWarning, correctEmail, errorMsg, loading } =
      this.state;
    return (
      <div className="flex flex-col items-center my-8">
        {loading ? <Loading bgColor={'#fff'} /> : null}
        <div className="my-5">
          <DistributeHubLinkOrATag
            href={''}
            to="/home"
            className="logo-home d-inline-block border-bottom border-transparent"
            title="Commerce Cloud Storefront Reference Architecture Accueil"
          >
            <h1 className="content-asset mb-0">
              {window.__.env.REACT_APP_COUNTRY === 'ru' ? (
                <img
                  src={LOGO_PRIMARY_RU}
                  alt="Royal Canin Flagship Store"
                  className="w-36 md:w-44"
                />
              ) : (
                <>
                  <img
                    src={LOGO}
                    alt=""
                    className="inline-block w-36 md:w-44"
                  />
                </>
              )}
            </h1>
          </DistributeHubLinkOrATag>
        </div>
        <h1 className="text-3xl red text-center">
          <FormattedMessage id="forgetPassword" />
        </h1>
        <div className="miaa-body px-6 md:px-0">
          {errorMsg ? (
            <aside className="rc-alert rc-alert--error mb-2" role="alert">
              <span className="pl-0">{errorMsg}</span>
            </aside>
          ) : null}
          <div className="text-gray-600 text-lg mb-16 text-center">
            <FormattedMessage id="forgetPassword.forgetPasswordSubTitle" />
          </div>
          <Input
            id="email"
            dataTestid="email"
            autocomplete="off"
            type="email"
            maxLength="90"
            name="email"
            className="w-64 md:w-80 m-auto mb-14"
            valid={emailValid}
            isWarning={isWarning}
            onChange={this.inputChange}
            onBlur={this.inputBlur}
            value={email}
            label={<FormattedMessage id="forgetPassword.email" />}
            inValidLabel={<FormattedMessage id="forgetPassword.validMessage" />}
          />

          <div className="flex items-end justify-center">
            <Link
              to="/"
              className={'border-b text-gray-600 hover:border-red-600'}
            >
              <FormattedMessage id="forgetPassword.cancel" />
            </Link>
            <span className="mx-3">
              <FormattedMessage id="or" />
            </span>
            <Button
              type="primary"
              size="small"
              disabled={!correctEmail}
              onClick={this.sendEmail}
            >
              <FormattedMessage id="forgetPassword.send" />
            </Button>
          </div>
        </div>
        <LazyLoad className="mt-16">
          <img
            className="align-self-center w-64 md:w-80"
            alt="forget password images"
            title="forget password"
            srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/forget-password-pet.jpg`}
            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/forget-password-pet.jpg`}
          />
        </LazyLoad>
      </div>
    );
  }
}
export default injectIntl(ForgetPassword);
