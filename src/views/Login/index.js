import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import './index.css';
import Loading from '@/components/Loading';
import { login, getQuestions, register } from '@/api/login';
import { getCustomerInfo } from '@/api/user';
import { getDictionary } from '@/utils/utils';
// import bg1 from "@/assets/images/login-bg1.png";
// import bg2 from "@/assets/images/login-bg2.png";
import bg1 from '@/assets/images/login-bg3.jpg';
import bg2 from '@/assets/images/register-bg1.jpg';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@injectIntl
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: '0',
      loginForm: {
        customerAccount: '',
        customerPassword: ''
      },
      loginPasswordType: 'password',
      registerPwdType: 'password',
      registerConfirmPwdType: 'password',

      registerForm: {
        firstName: '',
        lastName: '',
        country: 6,
        email: '',
        password: '',
        confirmPassword: '',
        securityQuestion: '',
        answer: '',
        firstChecked: false
        // secondChecked: false,
        // thirdChecked: false,
      },
      countryList: [
        {
          id: 6,
          name: 'Mexico'
        }
      ],
      errorMsg: '',
      successMsg: '',
      questionList: [],
      // type: this.props.match.params.type,
      type: localItemRoyal.get('loginType') || 'login',
      loading: false
    };
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    // console.log()
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
    getQuestions()
      .then((res) => {
        if (res.code === 'K-000000') {
          this.setState({
            questionList: res.context
          });
        } else {
          this.showErrorMsg(
            res.message || this.props.intl.messages.getDataFailed
          );
        }
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.getDataFailed
        );
      });
  }
  // getQuestions=()=>{

  // }
  // loginFormChange (e) {
  //     .catch((err) => {
  //       this.showErrorMsg(err.toString() || "get data failed");
  //     });
  // }
  loginFormChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { loginForm } = this.state;
    loginForm[name] = value;
    // this.inputBlur(e);
    this.setState({ loginForm: loginForm });
  }

  registerFormChange = ({ field, value }) => {
    const { registerForm } = this.state;
    registerForm[field] = value;
    this.setState({
      registerForm: registerForm
    });
  };
  loginClick = () => {
    if (sessionItemRoyal.get('rc-token')) {
      sessionItemRoyal.remove('rc-token');
    }
    if (localItemRoyal.get('rc-token')) {
      localItemRoyal.remove('rc-token');
    }
    this.props.loginStore.removeUserInfo();

    const { history } = this.props;
    login(this.state.loginForm)
      .then((res) => {
        localItemRoyal.set('rc-token', res.context.token);
        let userinfo = res.context.customerDetail;
        userinfo.customerAccount = res.context.accountName;

        getCustomerInfo()
          .then((customerInfoRes) => {
            if (res.code === 'K-000000') {
              userinfo.defaultClinics = customerInfoRes.context.defaultClinics;
              this.props.loginStore.setUserInfo(userinfo);
            }

            history.push(
              (this.props.location.state &&
                this.props.location.state.redirectUrl) ||
                '/account'
            );
          })
          .catch((err) => {
            history.push(
              (this.props.location.state &&
                this.props.location.state.redirectUrl) ||
                '/account'
            );
            this.showErrorMsg(
              err.message.toString() || this.props.intl.messages.loginFailed
            );
          });
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.loginFailed
        );
      });
  };
  register = () => {
    this.setState({
      loading: true
    });
    const { registerForm } = this.state;
    const objKeys = Object.keys(registerForm);
    let requiredVerify = true;
    for (let i = 0; i < objKeys.length; i++) {
      if (!registerForm[objKeys[i]]) {
        requiredVerify = false;
      }
    }
    if (!requiredVerify) {
      this.showErrorMsg(this.props.intl.messages.mandatoryFieldsError);
      return false;
    }
    if (
      !(
        this.nameVerify(registerForm.firstName) &&
        this.nameVerify(registerForm.lastName)
      )
    ) {
      this.showErrorMsg(this.props.intl.messages.firstNameLastName50characters);
      return false;
    }
    if (!this.emailVerify(registerForm.email)) {
      this.showErrorMsg(this.props.intl.messages.yourEmailNotVerified);
      return false;
    }
    if (!this.passwordVerify(registerForm.password)) {
      this.showErrorMsg(this.props.intl.messages.yourPasswordNotVerified);
      return false;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      this.showErrorMsg(
        this.props.intl.messages.twoPasswordsYouTypedDoNotMatch
      );
      return false;
    }

    let params = {
      answer: registerForm.answer,
      confirmPassword: registerForm.confirmPassword,
      country: registerForm.country,
      customerPassword: registerForm.password,
      email: registerForm.email,
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      questionId: registerForm.securityQuestion
    };

    console.log(params);

    register(params)
      .then((res) => {
        // debugger
        if (res.code === 'K-000000') {
          console.log(res);

          localItemRoyal.set('rc-token', res.context.token);
          let userinfo = res.context.customerDetail;
          userinfo.customerAccount = res.context.accountName;
          this.props.loginStore.setUserInfo(userinfo);
          const { history } = this.props;
          history.push('/account');
        } else {
          this.showErrorMsg(
            res.message || this.props.intl.messages.registerFailed
          );
        }
        console.log(res);
      })
      .catch((err) => {
        this.showErrorMsg(
          err.message.toString() || this.props.intl.messages.registerFailed
        );
      });
  };

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message,
      loading: false
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 3000);
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
    }, 2000);
  };

  emailVerify = (email) => {
    let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(email);
  };
  passwordVerify = (password) => {
    //匹配至少包含一个数字、一个大写字母 一个小写字母 8-20 位的密码
    let reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\D]{8,20}$/;
    return reg.test(password);
  };
  nameVerify = (name) => {
    if (name.length > 50) return false;
    else return true;
  };

  render() {
    const { registerForm } = this.state;
    return (
      <div>
        <div
          id="embedded-container"
          className="miaa miaa-wrapper miaa-embedded"
        >
          <div
            id="signIn"
            className="miaa-screen janrain-capture-ui capture-ui-content capture_screen_container"
            role="document"
            data-capturescreenname="signIn"
            data-captureventadded="true"
            style={{ display: 'block' }}
          >
            <div className="miaa-content">
              {/* <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  ×
                </span>
              </button> */}
              {/* <div className="miaa-header">
                <div className="miaa-inner-content">
                  <div className="miaa-brand-logo mb-5"></div>
                </div>
              </div> */}
              <div
                className="logoImg"
                style={{
                  width: '120px',
                  height: '45px'
                }}
              >
                <object
                  id="main-logo"
                  className="rc-logo-svg rc-logo--primary"
                  data="https://d1a19ys8w1wkc1.cloudfront.net/logo--primary.svg?v=8-9-5"
                  type="image/svg+xml"
                >
                  <img
                    src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-9-5"
                    width="150"
                    height="100"
                    alt="Royal Canin logo"
                    style={{
                      backgroundImage:
                        'url(https://d1a19ys8w1wkc1.cloudfront.net/logo--primary.png?v=8-9-5)'
                    }}
                  />
                </object>
              </div>
              <div
                className="rc-layout-container rc-two-column"
                style={{
                  display: this.state.type === 'login' ? 'block' : 'none'
                }}
              >
                <div className="rc-column">
                  <h1 className="rc-espilon imgBox">
                    <img src={bg1} style={{ display: 'inline' }}  alt=""/>
                  </h1>
                </div>

                <div className="rc-column loginForm">
                  <h1 className="rc-espilon">
                    <h3 style={{ fontSize: '32px' }}>
                      <span style={{ color: '#666' }}>
                        <FormattedMessage id="welcomeTo" />
                      </span>{' '}
                      <FormattedMessage id="royalCanin" />
                    </h3>

                    <div className="loginBox">
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
                            <span className="pl-0">{this.state.errorMsg}</span>
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

                      <div style={{ marginTop: '40px' }}>
                        <div className="miaa_input required ">
                          <input
                            type="email"
                            className="capture_signInEmailAddress capture_required capture_text_input form-control"
                            placeholder={this.props.intl.messages.emailAddress}
                            name="customerAccount"
                            value={this.state.loginForm.customerAccount}
                            onChange={(e) => this.loginFormChange(e)}
                          />
                        </div>
                        {/* <span
                        className="rc-input rc-input--inline rc-input--label"
                        style={{ width: "100%" }}
                      >
                        <input
                          className="rc-input__control"
                          id="email"
                          type="text"
                          name="text"
                        />
                        <label className="rc-input__label" for="email">
                          <span className="rc-input__label-text">
                            Email Address
                          </span>
                        </label>
                      </span> */}
                      </div>
                      <div style={{ marginTop: '40px' }}>
                        <div className="miaa_input required ">
                          <div className="input-append input-group">
                            <input
                              id="capture_signIn_currentPassword"
                              data-capturefield="currentPassword"
                              type={this.state.loginPasswordType}
                              className="capture_currentPassword capture_required capture_text_input form-control"
                              placeholder={this.props.intl.messages.password}
                              name="customerPassword"
                              value={this.state.loginForm.customerPassword}
                              onChange={(e) => this.loginFormChange(e)}
                            />
                            <span
                              tabIndex="100"
                              title="Show / hide password"
                              className="add-on input-group-addon"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                let type =
                                  this.state.loginPasswordType === 'password'
                                    ? 'text'
                                    : 'password';
                                this.setState({
                                  loginPasswordType: type
                                });
                              }}
                            >
                              <i className="icon-eye-open fa fa-eye"></i>
                            </span>
                          </div>
                        </div>
                        {/* <span
                        className="rc-input rc-input--inline rc-input--label"
                        style={{ width: "100%" }}
                      >
                        <input
                          className="rc-input__control"
                          id="password"
                          type="text"
                          name="text"
                        />
                        <label className="rc-input__label" for="password">
                          <span className="rc-input__label-text">Password</span>
                        </label>
                      </span> */}
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '60px',
                          marginTop: '10px'
                        }}
                      >
                        <div
                          className="rc-input rc-input--inline"
                          style={{ float: 'left' }}
                        >
                          <input
                            className="rc-input__checkbox"
                            id="id-checkbox-cat"
                            value="Cat"
                            type="checkbox"
                            name="checkbox-1"
                          />
                          <label
                            className="rc-input__label--inline"
                            for="id-checkbox-cat"
                            style={{ color: '#666', fontSize: '14px' }}
                          >
                            <FormattedMessage id="rememberMe" />
                          </label>
                        </div>

                        <p style={{ float: 'right' }}>
                          <a
                            className="rc-styled-link"
                            href="#/"
                            style={{ color: '#666', fontSize: '14px' }}
                            onClick={(e) => {
                              e.preventDefault();
                              this.setState({ type: 'forgetPassword' });
                              localItemRoyal.set('loginType', 'forgetPassword');
                            }}
                          >
                            <FormattedMessage id="forgetPassword" />
                          </a>
                          {/* <Link to="/forgetPassword" style={{ color: "#666", fontSize: "14px" }}>
                          <FormattedMessage id="login.forgetPassword" />
                        </Link> */}
                        </p>
                      </div>
                      <div
                        className="rc-layout-container rc-two-column"
                        style={{ width: '100%' }}
                      >
                        <div className="rc-column" style={{ textAlign: 'center' }}>
                          <button
                            className="rc-btn rc-btn--one"
                            style={{ width: '100%' }}
                            onClick={() => this.loginClick()}
                          >
                            <FormattedMessage id="login" />
                          </button>
                        </div>
                        <div className="rc-column" style={{ textAlign: 'center' }}>
                          <button
                            className="rc-btn rc-btn--two"
                            style={{ width: '100%' }}
                            onClick={() => {
                              this.setState({ type: 'register' });
                              localItemRoyal.set('loginType', 'register');
                            }}
                          >
                            <FormattedMessage id="createAnAccount" />
                          </button>
                        </div>
                      </div>
                      <a
                        className="rc-styled-link"
                        style={{ color: '#666', fontSize: '14px' }}
                        onClick={() => {
                          window.location.href =
                            this.props.location.state &&
                            this.props.location.state.redirectUrl === '/cart'
                              ? '/prescription'
                              : '/';
                        }}
                      >
                        <FormattedMessage id="continueAsGuest" />
                        {'>'}
                      </a>
                    </div>
                  </h1>
                </div>
              </div>
              <div
                style={{
                  display: this.state.type === 'register' ? 'block' : 'none'
                }}
                className="register"
              >
                {this.state.loading ? <Loading positionFixed="true" /> : null}
                <h3
                  style={{
                    textAlign: 'center',
                    color: '#e2001a',
                    fontSize: '32px'
                  }}
                >
                  <span style={{ color: '#666' }}>
                    {' '}
                    <FormattedMessage id="welcomeTo" />
                  </span>{' '}
                  <FormattedMessage id="royalCanin" />
                </h3>
                <div
                  className="registerBox"
                  style={{ position: 'relative', margin: '0 auto' }}
                >
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
                        <span className="pl-0">{this.state.errorMsg}</span>
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
                  <img
                    src={bg2}
                    className="registerImg"
                    style={{
                      width: '270px',
                      position: 'absolute',
                      bottom: '-120px',
                      right: '-270px'
                    }}
                    alt=""
                  />
                  <div className="rc-layout-container rc-two-column">
                    <div className="rc-column">
                      <div className="miaa_input required">
                        <input
                          id="capture_traditionalRegistration_firstName"
                          data-capturefield="firstName"
                          type="text"
                          className="capture_firstName capture_required capture_text_input form-control"
                          placeholder={this.props.intl.messages.firstName}
                          name="firstName"
                          onChange={(e) => {
                            const value = e.target.value;
                            this.registerFormChange({
                              field: 'firstName',
                              value
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="rc-column">
                      <div className="miaa_input required">
                        <input
                          id="capture_traditionalRegistration_lastName"
                          data-capturefield="lastName"
                          type="text"
                          className="capture_lastName capture_required capture_text_input form-control"
                          placeholder={this.props.intl.messages.lastName}
                          name="lastName"
                          onChange={(e) => {
                            const value = e.target.value;
                            this.registerFormChange({
                              field: 'lastName',
                              value
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="rc-layout-container rc-two-column">
                    <div className="rc-column">
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
                            this.registerFormChange({
                              field: 'email',
                              value
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="rc-column">
                      <div className="miaa_input required country_select">
                        <select
                          data-js-select=""
                          id="country"
                          value={registerForm.country}
                          placeholder={this.props.intl.messages.country}
                          name="country"
                          onChange={(e) => {
                            const value = e.target.value;
                            // value = value === '' ? null : value;
                            this.registerFormChange({
                              field: 'country',
                              value
                            });
                          }}
                        >
                          {this.state.countryList.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="rc-layout-container rc-two-column">
                    <div className="rc-column">
                      <div className="input-append input-group miaa_input required">
                        <input
                          autoComplete="off"
                          data-capturefield="password"
                          type={this.state.registerPwdType}
                          className="capture_password capture_required capture_text_input form-control"
                          placeholder={this.props.intl.messages.password}
                          name="password"
                          onChange={(e) => {
                            const value = e.target.value;
                            this.registerFormChange({
                              field: 'password',
                              value
                            });
                          }}
                        />
                        <span
                          tabIndex="100"
                          title="Show / hide password"
                          className="add-on input-group-addon"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            let type =
                              this.state.registerPwdType === 'password'
                                ? 'text'
                                : 'password';
                            this.setState({
                              registerPwdType: type
                            });
                          }}
                        >
                          <i className="icon-eye-open fa fa-eye"></i>
                        </span>
                      </div>
                      <p style={{ marginTop: '-20px' }}>
                        {' '}
                        <FormattedMessage id="login.passwordTip" />{' '}
                      </p>
                    </div>
                    <div className="rc-column">
                      <div className="input-append input-group miaa_input required">
                        <input
                          autoComplete="off"
                          data-capturefield="confirmPassword"
                          type={this.state.registerConfirmPwdType}
                          className="capture_password capture_required capture_text_input form-control"
                          placeholder={this.props.intl.messages.confirmPassword}
                          name="confirmPassword"
                          onChange={(e) => {
                            const value = e.target.value;
                            this.registerFormChange({
                              field: 'confirmPassword',
                              value
                            });
                          }}
                        />
                        <span
                          tabIndex="100"
                          title="Show / hide password"
                          className="add-on input-group-addon"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            let type =
                              this.state.registerConfirmPwdType === 'password'
                                ? 'text'
                                : 'password';
                            this.setState({
                              registerConfirmPwdType: type
                            });
                          }}
                        >
                          <i className="icon-eye-open fa fa-eye"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="rc-layout-container rc-two-column">
                    <div className="rc-column">
                      <div className="miaa_input required country_select">
                        <select
                          data-js-select=""
                          id="securityQuestion"
                          value={registerForm.securityQuestion}
                          name="securityQuestion"
                          onChange={(e) => {
                            const value = e.target.value;
                            // value = value === '' ? null : value;
                            this.registerFormChange({
                              field: 'securityQuestion',
                              value
                            });
                          }}
                        >
                          <option value="" disabled>
                            {this.props.intl.messages.securityQuestion} *
                          </option>
                          {this.state.questionList.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.question}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="rc-column">
                      <div className="miaa_input required">
                        <input
                          id="capture_traditionalRegistration_firstName"
                          data-capturefield="answer"
                          type="text"
                          className="capture_firstName capture_required capture_text_input form-control"
                          placeholder={this.props.intl.messages.answer}
                          name="answer"
                          onChange={(e) => {
                            const value = e.target.value;
                            this.registerFormChange({
                              field: 'answer',
                              value
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="policyBox" style={{ textAlign: 'left' }}>
                    {/* <div className="rc-input rc-input--inline">
                  <input
                    className="rc-input__checkbox"
                    id="id-checkbox-cat"
                    value="Cat"
                    type="checkbox"
                    name="checkbox-1"
                  />
                  <label
                    className="rc-input__label--inline"
                    for="id-checkbox-cat"
                    style={{ color: "#666", fontSize: "14px" }}
                  >
                    Remember Me
                  </label>
                </div> */}
                    <label
                      htmlFor="capture_traditionalRegistration_privacyAndTermsStatus"
                      className="form-check-label"
                    >
                      <input
                        id="capture_traditionalRegistration_privacyAndTermsStatus"
                        data-capturefield="privacyAndTermsStatus"
                        value={registerForm.firstChecked}
                        type="checkbox"
                        className="capture_privacyAndTermsStatus capture_required capture_input_checkbox form-check-input"
                        name="firstChecked"
                        onChange={(e) => {
                          let value = e.target.value === 'false' ? true : false;
                          this.registerFormChange({
                            field: 'firstChecked',
                            value
                          });
                        }}
                      />
                      <FormattedMessage id="iHaveReadThe" />
                      <a
                        href="https://www.shop.royal-canin.ru/ru/general-terms-conditions.html/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                          {' '}
                          <FormattedMessage id="userAgreement" />
                      </a>
                      <FormattedMessage id="andThe" />
                      <a
                        href="https://www.mars.com/global/policies/privacy/pp-russian/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                          <FormattedMessage id="privacyPolicy" />{' '}
                      </a>
                      <FormattedMessage id="giveConsentPersonalData" />
                    </label>
                  </div>
                </div>

                <div
                  style={{ textAlign: 'center' }}
                  className="rc-layout-container rc-two-column buttonGroup"
                >
                  <div className="rc-column" style={{ textAlign: 'center' }}>
                    <button
                      className="rc-btn rc-btn--one"
                      style={{ width: '100%' }}
                      onClick={() => this.register()}
                    >
                      <FormattedMessage id="createAnAccount" />
                    </button>
                  </div>
                  <div className="rc-column" style={{ textAlign: 'center' }}>
                    <button
                      className="rc-btn rc-btn--two"
                      style={{ width: '100%' }}
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ type: 'login' });
                        localItemRoyal.set('loginType', 'login');
                      }}
                    >
                      <FormattedMessage id="login" />
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display:
                    this.state.type === 'forgetPassword' ? 'block' : 'none'
                }}
                className="forgetPassword"
              >
                <h3 style={{ textAlign: 'center', fontSize: '30px' }}>
                  <FormattedMessage id="forgetPassword.createNewPassword" />
                </h3>

                <div className="forgetBox" style={{ position: 'relative' }}>
                  <img
                    src={bg2}
                    className="registerImg"
                    style={{
                      width: '300px',
                      position: 'absolute',
                      bottom: '-120px',
                      right: '-400px'
                    }}
                    alt=""
                  />
                  <p>
                    <FormattedMessage id="forgetPassword.forgetPasswordTip" />
                  </p>
                  <div className="miaa_input required">
                    <input
                      id="capture_traditionalRegistration_firstName"
                      data-capturefield="email"
                      type="text"
                      className="capture_firstName capture_required capture_text_input form-control"
                      placeholder={this.props.intl.messages.emailAddress}
                      name="email"
                      onChange={(e) => {
                        const value = e.target.value;
                        this.registerFormChange({
                          field: 'email',
                          value
                        });
                      }}
                    />
                    <div style={{ width: '100%', marginTop: '100px' }}>
                      <p style={{ textAlign: 'center' }}>
                        <button
                          className="rc-btn rc-btn--one"
                          style={{ width: '70%' }}
                          onClick={() => {
                            this.setState({ type: 'login' });
                          }}
                        >
                          <FormattedMessage id="submit" />
                        </button>
                      </p>
                      <p style={{ textAlign: 'center' }}>
                        <button
                          className="rc-btn rc-btn--two"
                          style={{ width: '70%' }}
                          onClick={() => this.setState({ type: 'login' })}
                        >
                          <FormattedMessage id="backToAuthorization" />
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="miaa-toggle-wrapper">
                <div className="miaa-inner-content">
                  <div className="row no-gutters">
                    <a
                      className={`col d-flex justify-content-center align-items-center miaa-toggle-signin ${
                        this.state.tabIndex === "0" ? "active" : ""
                        }`}
                      onClick={() => {
                        this.setState({ tabIndex: "0" });
                      }}
                    >
                      <div>
                        <FormattedMessage id="login" />
                      </div>
                    </a>
                    <a
                      className={`col d-flex justify-content-center align-items-center miaa-toggle-signin ${
                        this.state.tabIndex === "1" ? "active" : ""
                        }`}
                      onClick={() => {
                        this.setState({ tabIndex: "1" });
                      }}
                    >
                      <div>
                        <FormattedMessage id="login.register" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                id="capture_signIn_signInForm"
                name="signInForm"
                data-capturefield="signInForm"
                // action="https://royalcanin.eu.janraincapture.com/widget/traditional_signin.jsonp"
                className="capture_form capture_signInForm"
                // method="POST"
                noValidate="novalidate"
                data-transactionid="u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                target="captureIFrame_u0krt3r6k50pni8jkfjtmvb8mv1bjhf73e5egjyq"
                acceptCharset="UTF-8"
                next='{"noop":""}'
              >

                <div className="miaa-body">
                  <div
                    className="miaa-inner-content"
                    style={{
                      display: this.state.tabIndex === "0" ? "block" : "none",
                    }}
                  >
                    <p className="text-center miaa-greeting-followup pt-3">
                      <FormattedMessage id="login.loginTip" />
                    </p>
                    <div className="mt-2">
                      <div className="capture_signin">
                        <div
                          className="miaa_input required "
                        >
                          <input
                            type="email"
                            className="capture_signInEmailAddress capture_required capture_text_input form-control"
                            placeholder="Email Address *"
                            name="customerAccount"
                            value={this.state.loginForm.customerAccount}
                            onChange={(e) => this.loginFormChange(e)}
                          />

                        </div>
                        <div className="miaa_input required ">
                          <div className="input-append input-group">
                            <input
                              id="capture_signIn_currentPassword"
                              data-capturefield="currentPassword"
                              type={this.state.loginPasswordType}
                              className="capture_currentPassword capture_required capture_text_input form-control"
                              placeholder="Password *"
                              name="customerPassword"
                              value={this.state.loginForm.customerPassword}
                              onChange={(e) => this.loginFormChange(e)}
                            />
                            <span
                              tabIndex="100"
                              title="Show / hide password"
                              className="add-on input-group-addon"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                let type = this.state.loginPasswordType === 'password' ? 'text' : 'password'
                                this.setState({
                                  loginPasswordType: type
                                })
                              }}
                            >
                              <i className="icon-eye-open fa fa-eye"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <Link to="/forgetPassword" className="text-muted small-medium">
                          <FormattedMessage id="login.forgetPassword" />
                        </Link>

                        <div className="text-center">
                          <button
                            className="btn btn-primary"
                            onClick={() => this.loginClick()}
                          >
                            <FormattedMessage id="login" />
                          </button>
                        </div>


                        <Link to={(this.props.location.state &&
                          this.props.location.state.redirectUrl === '/cart') ?
                          "/prescription" : "/"}
                          className="click-hover"
                          style={{ textDecoration: 'underline', color: '#4b5257' }}>

                          <FormattedMessage id="login.guestContinue" />

                        </Link>

                      </div>
                    </div>
                  </div>
                  <div
                    className="miaa-inner-content"
                    style={{
                      display: this.state.tabIndex === "1" ? "block" : "none",
                    }}
                  >
                    <div className="row">
                      <div className="col">

                        <div className="message-tip">
                          <div className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${this.state.errorMsg ? '' : 'hidden'}`}>
                            <aside className="rc-alert rc-alert--error rc-alert--with-close errorAccount" role="alert">
                              <span>{this.state.errorMsg}</span>
                              <button
                                className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                                onClick={() => { this.setState({ errorMsg: '' }) }}
                                aria-label="Close">
                                <span className="rc-screen-reader-text">
                                  <FormattedMessage id="close" />
                                </span>
                              </button>
                            </aside>
                          </div>
                          <aside
                            className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successMsg ? '' : 'hidden'}`}
                            role="alert">
                            <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">{this.state.successMsg}</p>
                          </aside>
                        </div>

                        <div className="miaa_input required">
                          <input
                            id="capture_traditionalRegistration_firstName"
                            data-capturefield="firstName"
                            type="text"
                            className="capture_firstName capture_required capture_text_input form-control"
                            placeholder="First Name *"
                            name="firstName"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'firstName',
                                value
                              });
                            }}
                          />
                        </div>
                        <div className="miaa_input required">
                          <input
                            id="capture_traditionalRegistration_lastName"
                            data-capturefield="lastName"
                            type="text"
                            className="capture_lastName capture_required capture_text_input form-control"
                            placeholder="Last Name *"
                            name="lastName"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'lastName',
                                value
                              });
                            }}
                          />
                        </div>
                        <div className="miaa_input required">
                          <input
                            id="capture_traditionalRegistration_email"
                            data-capturefield="email"
                            type="email"
                            className="capture_email capture_required capture_text_input form-control"
                            placeholder="Email Address *"
                            name="email"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'email',
                                value
                              });
                            }}
                          />
                        </div>



                        <div className="miaa_input required country_select">
                          <select
                            data-js-select=""
                            id="country"
                            value={registerForm.country}
                            placeholder="Country *"
                            name="country"
                            onChange={(e) => {
                              const value = (e.target).value;
                              // value = value === '' ? null : value;
                              this.registerFormChange({
                                field: 'country',
                                value
                              });
                            }}
                          >
                            {
                              this.state.countryList.map(item => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="input-append input-group miaa_input required">
                          <input
                            autoComplete="off"
                            data-capturefield="password"
                            type={this.state.registerPwdType}
                            className="capture_password capture_required capture_text_input form-control"
                            placeholder="Password *"
                            name="password"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'password',
                                value
                              });
                            }}
                          />
                          <span
                            tabIndex="100"
                            title="Show / hide password"
                            className="add-on input-group-addon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              let type = this.state.registerPwdType === 'password' ? 'text' : 'password'
                              this.setState({
                                registerPwdType: type
                              })
                            }}
                          >
                            <i className="icon-eye-open fa fa-eye"></i>
                          </span>

                        </div>
                        <p style={{ marginTop: '-20px' }}>  <FormattedMessage id="login.passwordTip" /> </p>

                        <div className="input-append input-group miaa_input required">
                          <input
                            autoComplete="off"
                            data-capturefield="confirmPassword"
                            type={this.state.registerConfirmPwdType}
                            className="capture_password capture_required capture_text_input form-control"
                            placeholder="Confirm Password *"
                            name="confirmPassword"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'confirmPassword',
                                value
                              });
                            }}
                          />
                          <span
                            tabIndex="100"
                            title="Show / hide password"
                            className="add-on input-group-addon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              let type = this.state.registerConfirmPwdType === 'password' ? 'text' : 'password'
                              this.setState({
                                registerConfirmPwdType: type
                              })
                            }}
                          >
                            <i className="icon-eye-open fa fa-eye"></i>
                          </span>
                        </div>

                        <div className="miaa_input required country_select">
                          <select
                            data-js-select=""
                            id="securityQuestion"
                            value={registerForm.securityQuestion}
                            name="securityQuestion"
                            onChange={(e) => {
                              const value = (e.target).value;
                              // value = value === '' ? null : value;
                              this.registerFormChange({
                                field: 'securityQuestion',
                                value
                              });
                            }}
                          >

                            <option value="" disabled>Security Question *</option>
                            {
                              this.state.questionList.map(item => (
                                <option value={item.id} key={item.id}>{item.question}</option>
                              ))
                            }
                          </select>
                        </div>

                        <div className="miaa_input required">
                          <input
                            id="capture_traditionalRegistration_firstName"
                            data-capturefield="answer"
                            type="text"
                            className="capture_firstName capture_required capture_text_input form-control"
                            placeholder="Answer *"
                            name="answer"
                            onChange={(e) => {
                              const value = (e.target).value;
                              this.registerFormChange({
                                field: 'answer',
                                value
                              });
                            }}
                          />
                        </div>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <label
                          htmlFor="capture_traditionalRegistration_privacyAndTermsStatus"
                          className="form-check-label"
                        >
                          <input
                            id="capture_traditionalRegistration_privacyAndTermsStatus"
                            data-capturefield="privacyAndTermsStatus"
                            value={registerForm.firstChecked}
                            type="checkbox"
                            className="capture_privacyAndTermsStatus capture_required capture_input_checkbox form-check-input"
                            name="firstChecked"
                            onChange={(e) => {
                              let value = (e.target).value === 'false' ? true : false;
                              this.registerFormChange({
                                field: 'firstChecked',
                                value
                              });
                            }}
                          />
                            I have read the
                          <a
                            href="https://www.shop.royal-canin.ru/ru/general-terms-conditions.html/"
                            target="_blank" rel='noopener noreferrer'
                          >
                            User Agreement
                          </a>
                              and the
                          <a
                            href="https://www.mars.com/global/policies/privacy/pp-russian/"
                            target="_blank" rel='noopener noreferrer'
                          >
                            Privacy Policy
                          </a>
                              and give my consent to the processing of
                              personal data, including cross-border transfer
                        </label>
                      </div>
                      <div className="col-lg-12">
                        <label
                          htmlFor="capture_traditionalRegistration_ageIndicator"
                          className="form-check-label"
                        >
                          <input
                            id="capture_traditionalRegistration_ageIndicator"
                            data-capturefield="ageIndicator"
                            value={registerForm.secondChecked}
                            type="checkbox"
                            className="capture_ageIndicator capture_required capture_input_checkbox form-check-input"
                            name="secondChecked"
                            onChange={(e) => {
                              let value = (e.target).value === 'false' ? true : false;
                              this.registerFormChange({
                                field: 'secondChecked',
                                value
                              });
                            }}
                          />
                          <FormattedMessage id="login.secondCheck" />

                        </label>
                      </div>
                      <div className="col-lg-12">
                        <label
                          htmlFor="capture_traditionalRegistration_optEmail"
                          className="form-check-label"
                        >
                          <input
                            id="capture_traditionalRegistration_optEmail"
                            data-capturefield="optEmail"
                            value={registerForm.thirdChecked}
                            type="checkbox"
                            className="capture_optEmail capture_input_checkbox form-check-input"
                            name="thirdChecked"
                            onChange={(e) => {
                              let value = (e.target).value === 'false' ? true : false;
                              this.registerFormChange({
                                field: 'thirdChecked',
                                value
                              });
                            }}
                          />
                          <FormattedMessage id="login.thirdCheck" />

                        </label>
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        <FormattedMessage id="requiredFields" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary capture_btn"
                      disabled={!(registerForm.firstChecked && registerForm.secondChecked && registerForm.thirdChecked)}
                      onClick={() => this.register()}
                    >
                      <FormattedMessage id="save" />

                    </button>

                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
