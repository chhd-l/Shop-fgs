import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { passwordByForgot } from '@/api/login';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Loading from '@/components/Loading';
import cn from 'classnames';
import { EMAIL_REGEXP, LOGO_PRIMARY_RU, LOGO } from '@/utils/constant';
import base64 from 'base-64';

import { Button, Input } from '@/components/Common';
import './index.less';

const pass_word = 'pass' + 'word';
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerPassword: '',
      confirmPassword: '',
      errorMsg: '',
      emailValid: true,
      isWarning: false,
      resetBtnDisabled: true,
      loading: false,
      passwordInputType: pass_word,
      confirmNewPasswordType: pass_word,
      passwordValid: true,
      passwordMessage: '',
      passwordChanged: false,
      ruleLength: false,
      ruleLower: false,
      ruleUpper: false,
      ruleAname: false,
      ruleSpecial: false,
      confirmPasswordWarning: false,
      resetPasswordWarning: false
    };
  }
  sendEmail = async () => {
    this.setState({
      loading: true
    });
    try {
      const res = await forgetPassworSendEmail({ email: this.state.email });
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

  inputFocus = (e) => {
    this.setState({
      passwordChanged: true
    });
  };

  inputChange = (e) => {
    const value = e.target.value;
    var lowerReg = /[a-z]+/;
    var upperReg = /[A-Z]+/;
    var nameReg = /[\d]+/;
    var specialReg =
      /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;
    this.setState(
      {
        ruleLength: value.length >= 8,
        ruleLower: lowerReg.test(value),
        ruleUpper: upperReg.test(value),
        ruleAname: nameReg.test(value),
        ruleSpecial: specialReg.test(value),
        customerPassword: value
      },
      () => this.validInput(value, 'change')
    );
  };

  inputBlur = (e) => {
    const value = e.target.value;
    this.setState({
      passwordChanged: false
    });
    this.validInput(value, 'blur');
  };

  validInput = (value, type) => {
    const {
      ruleLength,
      ruleLower,
      ruleUpper,
      ruleAname,
      ruleSpecial,
      confirmPassword
    } = this.state;
    const valid =
      ruleLength && ruleLower && ruleUpper && ruleAname && ruleSpecial;
    this.setState({
      passwordValid: valid
    });
    if (type === 'blur') {
      this.setState({
        resetPasswordWarning: !valid
      });
      if (value === confirmPassword && valid) {
        this.setState({
          confirmPasswordWarning: false,
          resetBtnDisabled: false
        });
      } else if (confirmPassword !== '' && !valid) {
        this.setState({
          confirmPasswordWarning: true
        });
      }
    }

    if (type === 'change') {
      if (confirmPassword !== '' && confirmPassword !== value && valid) {
        this.setState({
          confirmPasswordWarning: true
        });
      }
    }
  };

  deleteInput = (name) => {};

  confirmInputChange = (e) => {
    const value = e.target.value;
    this.setState({
      confirmPassword: value
    });
    if (value === this.state.customerPassword) {
      this.setState({
        confirmPasswordWarning: false
      });
    }
  };

  confirmInputBlur = (e) => {
    const value = e.target.value;
    if (value !== this.state.customerPassword) {
      this.setState({
        confirmPasswordWarning: true,
        resetBtnDisabled: true
      });
    } else {
      this.setState({
        resetBtnDisabled: false
      });
    }
  };

  handleReset = async () => {
    const { customerPassword, confirmPassword, passwordValid } = this.state;
    if (customerPassword !== confirmPassword || !passwordValid) {
      return;
    }
    const params = {
      customerAccount: 'MTEzNDIxMjQ3N0BxcS5jb20=',
      customerPassword: base64.encode(customerPassword),
      confirmPassword: base64.encode(confirmPassword),
      verifyCode: '9178546600'
    };
    const res = await passwordByForgot(params);
    // console.l
  };

  render() {
    const {
      passwordMessage,
      passwordInputType,
      passwordValid,
      resetBtnDisabled,
      errorMsg,
      loading,
      passwordChanged,
      ruleLength,
      ruleLower,
      ruleUpper,
      ruleAname,
      ruleSpecial,
      customerPassword,
      confirmPassword,
      confirmNewPasswordType,
      confirmPasswordWarning,
      resetPasswordWarning
    } = this.state;
    return (
      <div className="flex flex-col items-center my-8 reset-password-wrap">
        {loading ? <Loading bgColor={'#fff'} /> : null}
        <div className="mt-5">
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
        <h1 className="text-3xl red text-center mt-14 mb-16 md:mb-24">
          <FormattedMessage id="setPassword" />
        </h1>
        <div className="w-full md:w-96 px-6 md:px-0">
          {errorMsg ? (
            <aside className="rc-alert rc-alert--error mb-2" role="alert">
              <span className="pl-0">{errorMsg}</span>
            </aside>
          ) : null}
          <Input
            id="resetPassword"
            type={passwordInputType}
            maxLength="255"
            minLength="8"
            name="password"
            // valid={passwordValid}
            onChange={this.inputChange}
            onFocus={this.inputFocus}
            autoComplete="password"
            isWarning={resetPasswordWarning}
            dataTestid="reset_password"
            onBlur={this.inputBlur}
            value={customerPassword}
            label={<FormattedMessage id="enterNewPassword" />}
            inValidLabel={<FormattedMessage id="enterNewPasswordErrMsg" />}
            rightOperateBoxJSX={
              <>
                {/* {passwordValid ? null : (
                  <ChaChaIcon
                    onClick={() =>
                      this.deleteInput('newPassword')
                    }
                  />
                )} */}
                <span
                  style={{ color: '#666' }}
                  className={cn(
                    'iconfont cursor-pointer font-bold text-lg inline-block py-3 px-2',
                    passwordInputType === 'password'
                      ? 'iconeye'
                      : 'iconeye-close'
                  )}
                  onClick={() => {
                    this.setState({
                      passwordInputType:
                        this.state.passwordInputType === 'password'
                          ? 'text'
                          : 'password'
                    });
                  }}
                />
                <button
                  type="button"
                  className={`rc-btn rc-btn--icon rc-icon rc-iconography rc-input__password-toggle hidden ${
                    passwordInputType === 'password'
                      ? 'rc-show--xs'
                      : 'rc-hide--xs'
                  }`}
                  onClick={() => {
                    this.setState({
                      passwordInputType:
                        this.state.passwordInputType === 'password'
                          ? 'text'
                          : 'password'
                    });
                  }}
                >
                  <span className="rc-screen-reader-text">
                    <FormattedMessage id="registerTogglePassword" />
                  </span>
                </button>
              </>
            }
            toolTip={
              <div
                className={cn('tippy-popper', {
                  hidden: !passwordChanged
                })}
                role="tooltip"
                id="password-tooltip"
                x-placement="top"
              >
                <div
                  className="tippy-tooltip brand4-theme rc-brand4-theme"
                  data-size="regular"
                  data-animation="shift-away"
                  data-state="visible"
                  data-interactive=""
                >
                  <div className="tippy-arrow" />
                  <div className="tippy-arrow-border" />
                  <div className="tippy-content" data-state="visible">
                    <div
                      id="password-tooltip"
                      className="rc-tooltip rc-text--left"
                    >
                      <div className="rc-meta">
                        <FormattedMessage id="registerRules" />
                      </div>
                      {[
                        {
                          stauts: ruleLength,
                          label: <FormattedMessage id="registerLength" />
                        },
                        {
                          stauts: ruleLower,
                          label: <FormattedMessage id="registerLowercase" />
                        },
                        {
                          stauts: ruleUpper,
                          label: <FormattedMessage id="registerUppercase" />
                        },
                        {
                          stauts: ruleAname,
                          label: <FormattedMessage id="registerAname" />
                        },
                        {
                          stauts: ruleSpecial,
                          label: <FormattedMessage id="registerSpecial" />
                        }
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={cn('rc-badge--label', {
                            'rc-text-colour--success': item.stauts
                          })}
                          data-password-strength="length"
                        >
                          {item.stauts ? (
                            <span className="iconfont green mr-2 iconchenggong" />
                          ) : null}
                          <span className="icon-validation rc-epsilon rc-b rc-hidden" />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <Input
            className={'mt-14'}
            id="confirmNewPassword"
            type={confirmNewPasswordType}
            maxLength="255"
            minLength="8"
            name="password"
            // valid={true}
            onChange={this.confirmInputChange}
            // onFocus={this.inputFocus}
            autoComplete="password"
            dataTestid="reset_password"
            onBlur={this.confirmInputBlur}
            isWarning={confirmPasswordWarning}
            value={confirmPassword}
            label={<FormattedMessage id="confirmNewPassword" />}
            inValidLabel={<FormattedMessage id="passwordsMatch" />}
            rightOperateBoxJSX={
              <>
                {/* {passwordValid ? null : (
                  <ChaChaIcon
                    onClick={() =>
                      this.deleteInput('newPassword')
                    }
                  />
                )} */}
                <span
                  style={{ color: '#666' }}
                  className={cn(
                    'iconfont cursor-pointer font-bold text-lg inline-block py-3 px-2',
                    confirmNewPasswordType === 'password'
                      ? 'iconeye'
                      : 'iconeye-close'
                  )}
                  onClick={() => {
                    this.setState({
                      confirmNewPasswordType:
                        this.state.confirmNewPasswordType === 'password'
                          ? 'text'
                          : 'password'
                    });
                  }}
                />
                <button
                  type="button"
                  className={`rc-btn rc-btn--icon rc-icon rc-iconography rc-input__password-toggle hidden ${
                    confirmNewPasswordType === 'password'
                      ? 'rc-show--xs'
                      : 'rc-hide--xs'
                  }`}
                  onClick={() => {
                    this.setState({
                      confirmNewPasswordType:
                        this.state.confirmNewPasswordType === 'password'
                          ? 'text'
                          : 'password'
                    });
                  }}
                >
                  <span className="rc-screen-reader-text">
                    <FormattedMessage id="registerTogglePassword" />
                  </span>
                </button>
              </>
            }
          />
          <div className="flex justify-center mt-8">
            <Button
              type="primary"
              size="small"
              disabled={resetBtnDisabled}
              onClick={this.handleReset}
            >
              <FormattedMessage id="resetPassword" />
            </Button>
          </div>
        </div>
        <LazyLoad className="mt-16">
          <img
            className="align-self-center w-64 md:w-80"
            alt="forget password images"
            title="forget password"
            srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/reset_password_page.jpg`}
            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/reset_password_page.jpg`}
          />
        </LazyLoad>
      </div>
    );
  }
}
export default injectIntl(ResetPassword);

const ChaChaIcon = ({ className, onClick = () => {} } = {}) => {
  return (
    <span
      className={cn(
        'iconfont iconchahao font-bold icon-unsuscribe cursor-pointer inline-block py-3 px-2',
        className
      )}
      style={{ color: '#c03344' }}
      onClick={onClick}
    />
  );
};
