import React, { Component, useState } from 'react';
import Consent from '@/components/Consent';
import { getStoreOpenConsentList } from '@/api/consent';
import Loading from '@/components/Loading';
import './index.less';
import SocialRegister from './components/socialRegister';
import { injectIntl, FormattedMessage } from 'react-intl';
import { oktaRegister } from '@/api/user';
import stores from '@/store';
import {
  mergeUnloginCartData,
  getOktaCallBackUrl,
  bindSubmitParam
} from '@/utils/utils';
import { withOktaAuth } from '@okta/okta-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import { userBindConsent } from '@/api/consent';
import Modal from '@/components/Modal';
import { inject, observer } from 'mobx-react';
import { addEventListenerArr } from './addEventListener';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const checkoutStore = stores.checkoutStore;
const loginStore = stores.loginStore;

@injectIntl
@inject('paymentStore')
@observer
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleLoading: true,
      styleObj: { display: 'none' },
      list: [],
      width: '',
      zoom: '',
      fontZoom: '',

      passwordChanged: false,
      ruleLength: false,
      ruleLower: false,
      ruleUpper: false,
      ruleAname: false,
      ruleSpecial: false,

      nameValid: true,
      emailValid: true,
      passwordValid: true,

      registerForm: {
        name: '',
        email: '',
        password: ''
      },

      passwordMessage: '',
      emailMessage: '',
      requiredConsentCount: 0,
      hasError: false,
      errorMessage: '',
      firstNameValid: true,
      lastNameValid: true
    };
    this.sendList = this.sendList.bind(this);
    this.initConsent = this.initConsent.bind(this);
    this.register = this.register.bind(this);
    this.registerChange = this.registerChange.bind(this);
    this.inputFocus = this.inputFocus.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
  }

  componentDidMount() {
    const registerBack =
      window.location.search.indexOf('?origin=register') >= 0 &&
      window.location.search.indexOf('&token') >= 0;
    if (registerBack) {
      return;
    }
    const isLogin = !!localItemRoyal.get('rc-token');
    if (isLogin) {
      this.props.history.push('/');
    }
    this.initConsent();
    var windowWidth = document.body.clientWidth;
    if (windowWidth < 640) {
      this.setState({
        width: '80%',
        zoom: '120%',
        fontZoom: '100%'
      });
    }
    if (windowWidth >= 640) {
      this.setState({
        width: '90%',
        zoom: '150%',
        fontZoom: '120%'
      });
    }
    document.getElementById('wrap').addEventListener('click', (e) => {
      if (e.target.localName === 'font') {
        let keyWords = e.target.innerText;
        let index = Number(
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode
            .parentNode.parentNode.id
        );
        let arr = this.state.list[index].detailList.filter((item) => {
          return item.contentTitle === keyWords;
        });

        let tempArr = [...this.state.list];
        tempArr[index].innerHtml = tempArr[index].innerHtml
          ? ''
          : arr[0]
          ? arr[0].contentBody
          : '';

        this.setState({ list: tempArr });
      }
    });
  }

  initConsent = async () => {
    this.setState({
      circleLoading: true,
      styleObj: { display: 'none' },
      isLoading: true
    });
    try {
      const result = await getStoreOpenConsentList({});
      const optioalList = result.context.optionalList.map((item) => {
        return {
          id: item.id,
          consentTitle: item.consentTitle,
          isChecked: false,
          isRequired: false,
          detailList: item.detailList
        };
      });

      const requiredList = result.context.requiredList.map((item) => {
        return {
          id: item.id,
          consentTitle: item.consentTitle,
          isChecked:
            item.consentDesc == 'RC_DF_TR_FGS_PRIVACY_POLICY' ? true : false,
          isRequired: true,
          detailList: item.detailList,
          noChecked:
            item.consentDesc == 'RC_DF_TR_FGS_PRIVACY_POLICY' ? true : false
        };
      });

      let list = this.state.list;
      list = [...requiredList, ...optioalList];
      this.setState({
        list,
        requiredConsentCount: requiredList.length
      });
    } catch (err) {
    } finally {
      this.setState({
        circleLoading: false,
        styleObj: { display: 'block' },
        isLoading: false
      });
    }
  };

  sendList = (list) => {
    this.setState({ list });
  };

  inputFocus = (e) => {
    this.setState({
      passwordChanged: true
    });
  };

  deleteInput = (name) => {
    const { registerForm } = this.state;
    registerForm[name] = '';
    this.setState({
      registerForm
    });
    if (name === 'password') {
      this.setState({
        passwordMessage: this.props.intl.messages.registerFillIn
      });
    }
    if (name === 'email') {
      this.setState({
        emailMessage: this.props.intl.messages.registerFillIn
      });
    }
  };

  inputBlur = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'password') {
      this.setState({
        passwordChanged: false
      });
    }
    this.validInput(name, value);
  };

  validInput(name, value) {
    switch (name) {
      case 'password':
        const {
          ruleLength,
          ruleLower,
          ruleUpper,
          ruleAname,
          ruleSpecial
        } = this.state;
        const passwordValid =
          ruleLength && ruleLower && ruleUpper && ruleAname && ruleSpecial;
        this.setState({
          passwordValid,
          passwordMessage: value
            ? this.props.intl.messages.registerPasswordFormat
            : this.props.intl.messages.registerFillIn
        });
        break;
      case 'name':
        this.setState({
          nameValid: !!value
        });
        break;
      case 'firstName':
        this.setState({
          firstNameValid: !!value
        });
        break;
      case 'lastName':
        this.setState({
          lastNameValid: !!value
        });
        break;
      case 'email':
        var emailReg = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
        this.setState({
          emailValid: emailReg.test(value),
          emailMessage: value
            ? this.props.intl.messages.registerEmailFormate
            : this.props.intl.messages.registerFillIn
        });
        break;
      default:
        break;
    }
  }

  registerChange = (e) => {
    const { registerForm } = this.state;
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'password') {
      var lowerReg = /[a-z]+/;
      var upperReg = /[A-Z]+/;
      var nameReg = /[\d]+/;
      var specialReg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;
      this.setState(
        {
          ruleLength: value.length >= 8,
          ruleLower: lowerReg.test(value),
          ruleUpper: upperReg.test(value),
          ruleAname: nameReg.test(value),
          ruleSpecial: specialReg.test(value)
        },
        () => this.validInput(name, value)
      );
    }
    this.validInput(name, value);
    registerForm[name] = value;
    this.setState({ registerForm });
  };

  register = async () => {
    const { registerForm } = this.state;
    this.setState({
      circleLoading: true
    });
    let accessPath = window.__.env.REACT_APP_ACCESS_PATH;
    let registerUrl =
      accessPath.substring(accessPath.length - 1, accessPath.length) === '/'
        ? 'register'
        : '/register';
    await oktaRegister({
      storeId: window.__.env.REACT_APP_STOREID,
      customerPassword: registerForm.password,
      customerAccount: registerForm.email,
      customerName:
        window.__.env.REACT_APP_COUNTRY !== 'de'
          ? registerForm.name
          : registerForm.firstName + ' ' + registerForm.lastName,
      callback: window.__.env.REACT_APP_ACCESS_PATH + registerUrl
    })
      .then(async (res) => {
        if (res.code === 'K-000000') {
          //GA 注册成功 start
          dataLayer.push({
            event: `${window.__.env.REACT_APP_GTM_SITE_ID}accountCreation`,
            interaction: {
              category: 'account creation',
              action: 'accounct creation',
              label: '',
              value: 1
            }
          });
          //GA 注册成功 end

          if (res.context.oktaSessionToken) {
            loginStore.changeLoginModal(false);
            loginStore.changeIsLogin(true);

            localItemRoyal.set('rc-token', res.context.token);
            localItemRoyal.set('rc-register', true);
            if (checkoutStore.cartData.length) {
              await mergeUnloginCartData();
              await checkoutStore.updateLoginCart();
            }
            loginStore.setUserInfo(res.context.customerDetail);
            localItemRoyal.set(
              'okta-session-token',
              res.context.oktaSessionToken
            );
            var callOktaCallBack = getOktaCallBackUrl(
              res.context.oktaSessionToken
            );
            localItemRoyal.set(
              'rc-consent-list',
              JSON.stringify(this.state.list)
            );
            // 注册的时候如果是预约专家就直接跳转checkout页面
            let appointmentNo = sessionItemRoyal.get('appointment-no');
            if (appointmentNo) {
              window.location.href = '/checkout';
            } else {
              window.location.href = callOktaCallBack;
            }
          } else {
            let customerDetail = res.context.customerDetail;
            let submitParam = bindSubmitParam(this.state.list);
            userBindConsent({
              ...submitParam,
              useBackendOktaTokenFlag: true,
              customerId: customerDetail.customerId
            })
              .then((res) => {
                if (res.code === 'K-000000') {
                  loginStore.setUserInfo(customerDetail); // For compare email
                  this.props.history.push('/welcome/' + registerForm.email);
                } else {
                  window.scrollTo(0, 0);
                  this.setState({
                    circleLoading: false,
                    hasError: true,
                    errorMessage: null
                  });
                }
              })
              .catch((err) => {
                this.setState({
                  circleLoading: false,
                  hasError: true,
                  errorMessage: null
                });
              });
          }
        } else {
          window.scrollTo(0, 0);
          this.setState({
            circleLoading: false,
            hasError: true,
            errorMessage: null
          });
        }
      })
      .catch((err) => {
        window.scrollTo(0, 0);
        this.setState({
          circleLoading: false,
          hasError: true,
          errorMessage: null
        });
      });
  };
  componentDidUpdate() {
    if (window.__.env.REACT_APP_COUNTRY == 'tr') {
      this.addEventListenerFunTr();
    }
  }
  //监听土耳其consent
  addEventListenerFunTr() {
    const { setTrConsentModal } = this.props.paymentStore;
    for (let i = 0; i < addEventListenerArr.length; i++) {
      document
        .getElementById(addEventListenerArr[i].id)
        ?.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          setTrConsentModal(addEventListenerArr[i].modal, true);
        });
    }
  }
  getIntlMsg = (str) => {
    return this.props.intl.messages[str];
  };
  render() {
    const registerBack =
      window.location.search.indexOf('?origin=register') >= 0 &&
      window.location.search.indexOf('&token') >= 0;
    if (registerBack) {
      //example ?origin=register&token=20111jIFz6c2R4OpVzInpzlH9dBwgtgy2dgUi5toMSwMBGdC7JjEbWm
      var searchList = window.location.search.split('&');
      var tokenUrl = searchList.length > 1 ? searchList[1].split('=') : '';
      var sessionToken = tokenUrl.length > 1 ? tokenUrl[1] : '';
      if (sessionToken) {
        localItemRoyal.set('okta-session-token', sessionToken);
        var callOktaCallBack = getOktaCallBackUrl(
          localItemRoyal.get('okta-session-token')
        );
        window.location.href = callOktaCallBack;
      }
    } // from email register and the login automatically
    const event = {
      page: {
        type: 'register',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    const url = this.props.match.url;
    const {
      ruleLength,
      ruleLower,
      ruleUpper,
      ruleAname,
      ruleSpecial,
      passwordChanged,
      nameValid,
      firstNameValid,
      lastNameValid,
      emailValid,
      passwordValid,
      registerForm,
      emailMessage,
      passwordMessage,
      requiredConsentCount,
      list,
      hasError,
      errorMessage
    } = this.state;
    const allValid =
      (window.__.env.REACT_APP_COUNTRY !== 'de'
        ? nameValid
        : firstNameValid && lastNameValid) &&
      emailValid &&
      passwordValid &&
      (window.__.env.REACT_APP_COUNTRY !== 'de'
        ? registerForm.name
        : registerForm.firstName && registerForm.lastName) &&
      registerForm.email &&
      registerForm.password;
    const requireCheckd =
      list.filter((x) => x.isChecked && x.isRequired).length ===
      requiredConsentCount;
    const registerDisabled = !(allValid && requireCheckd);
    const isHub = window.__.env.REACT_APP_HUB == '1';
    const isTr = window.__.env.REACT_APP_COUNTRY === 'tr'; //因为土耳其welcome to royal canin的翻译，需要对welcome to royal canin特殊化处理
    let homePage = window.__.env.REACT_APP_HOMEPAGE;
    const contactUrl =
      homePage.substring(homePage.length - 1, homePage.length) === '/'
        ? 'help/contact'
        : '/help/contact';
    const helpUrl =
      homePage.substring(homePage.length - 1, homePage.length) === '/'
        ? 'help'
        : '/help';
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        {/*全局loading */}
        {this.state.circleLoading ? <Loading bgColor={'#fff'} /> : null}
        {registerBack ? null : (
          <div id="register" className="page" style={this.state.styleObj}>
            <div className="rc-layout-container rc-padding--sm rc-reverse-layout-mobile rc-bg-colour--brand3 rc-margin-bottom--xs">
              <div className="rc-column rc-padding-top--lg--mobile">
                <div className="rc-margin-bottom--sm text-center">
                  <a
                    href={
                      isHub
                        ? window.__.env.REACT_APP_HUB_URLPREFIX
                        : window.__.env.REACT_APP_ACCESS_PATH
                    }
                    className="logo-home d-inline-block border-bottom border-transparent"
                    title="Commerce Cloud Storefront Reference Architecture Accueil"
                  >
                    <span className="rc-screen-reader-text">
                      <FormattedMessage id="registerCloud" />
                    </span>
                    <h1 className="content-asset mb-0">
                      <img
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/logo--secondary.png`}
                        width="164"
                        height="60"
                        alt="Royal Canin Flagship Store"
                      />
                    </h1>
                  </a>
                </div>
                <div className="rc-layout-container rc-one-column rc-self-h-middle rc-flex-direction--reverse--md-down rc-max-width--lg">
                  <div className="rc-column rc-max-width--md rc-text--center">
                    <div className="rc-margin-bottom--sm">
                      <aside
                        aria-hidden="true"
                        className={
                          (!hasError ? 'hidden ' : '') +
                          'ciam-alert-error-popin rc-alert rc-alert--error rc-padding--sm rc-alert--with-close rc-margin-y--sm'
                        }
                        role="alert"
                      >
                        <p>
                          <div>
                            {errorMessage ? (
                              errorMessage + ' '
                            ) : (
                              <FormattedMessage id="registerErrorMessage" />
                            )}
                            <strong>
                              <a
                                href={
                                  window.__.env.REACT_APP_COUNTRY === 'us'
                                    ? homePage + contactUrl
                                    : homePage + helpUrl
                                }
                                className="rc-text-colour--brand1"
                              >
                                {' '}
                                <FormattedMessage id="footer.email" />
                              </a>
                            </strong>
                          </div>
                        </p>
                        <button
                          className="rc-btn rc-alert__close rc-close--xs rc-iconography"
                          data-close=""
                          aria-label=""
                        >
                          <span className="rc-screen-reader-text"></span>
                        </button>
                        <button
                          className="ciam-alert-close-error-popin rc-alert__close rc-icon rc-alert__close rc-close--xs rc-iconography"
                          data-close=""
                          onClick={() => {
                            this.setState({ hasError: false });
                          }}
                        >
                          <span className="rc-screen-reader-text"></span>
                        </button>
                      </aside>
                      <h2
                        className={`text-center rc-margin-bottom--sm ${
                          isTr ? 'trWelcome' : ''
                        }`}
                      >
                        <FormattedMessage id="registerWelcome" />{' '}
                        <span className="rc-text-colour--brand1">
                          <FormattedMessage id="register.royalCanin" />
                        </span>
                      </h2>
                      <p className="rc-margin-bottom--none text-center">
                        <FormattedMessage id="registerCompleteForm" />
                      </p>
                      <p className="text-center align-bottom">
                        <FormattedMessage id="registerHaveAccount" />{' '}
                        <a
                          onClick={() =>
                            this.props.oktaAuth.signInWithRedirect(
                              window.__.env.REACT_APP_HOMEPAGE
                            )
                          }
                          className="rc-styled-link"
                        >
                          <FormattedMessage id="registerLoginIn" />
                        </a>
                      </p>
                      {window.__.env.REACT_APP_COUNTRY !== 'ru' &&
                      window.__.env.REACT_APP_COUNTRY !== 'tr' &&
                      window.__.env.REACT_APP_COUNTRY !== 'uk' ? (
                        <>
                          <SocialRegister />
                          <div className="rc-column">
                            <p className="rc-margin-bottom--none text-center rc-padding--xs">
                              {window.__.env.REACT_APP_COUNTRY === 'de' ? (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: this.getIntlMsg(
                                      'registerContinuing'
                                    )
                                  }}
                                ></span>
                              ) : (
                                <FormattedMessage id="registerContinuing" />
                              )}
                            </p>
                          </div>
                          <div className="rc-column ouPadding">
                            <div className="auth-divider">
                              <span
                                className="auth-divider-text"
                                data-i18n="loginPage_or"
                              >
                                <FormattedMessage id="registerOr" />
                              </span>
                            </div>
                          </div>
                        </>
                      ) : null}
                      <div className="rc-column">
                        <form
                          id="registrationForm"
                          className="registration-form rc-margin-bottom--xl--mobile"
                          encoding="off"
                        >
                          <div className="rc-margin-bottom--xs">
                            {window.__.env.REACT_APP_COUNTRY !== 'de' ? (
                              <div className="form-group rc-margin-bottom--md required rc-text--left">
                                <div
                                  className={
                                    'rc-input rc-input--full-width ' +
                                    (nameValid ? '' : 'rc-input--error')
                                  }
                                  data-rc-feature-forms-setup="true"
                                >
                                  <input
                                    className="rc-input__control"
                                    id="registerName"
                                    type="text"
                                    maxLength="50"
                                    name="name"
                                    onChange={(e) => this.registerChange(e)}
                                    onBlur={(e) => this.inputBlur(e)}
                                    value={registerForm.name}
                                  />
                                  <label className="rc-input__label">
                                    <span className="rc-input__label-text">
                                      {' '}
                                      <FormattedMessage id="registerName" />{' '}
                                    </span>
                                  </label>
                                  {nameValid ? null : (
                                    <span
                                      className="input-cross icon-unsuscribe iconfont"
                                      onClick={() => this.deleteInput('name')}
                                    >
                                      &#xe6b2;
                                    </span>
                                  )}
                                </div>
                                <div className="invalid-feedback">
                                  <FormattedMessage id="registerFillIn" />
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="form-group rc-margin-bottom--md required rc-text--left">
                                  <div
                                    className={
                                      'rc-input rc-input--full-width ' +
                                      (firstNameValid ? '' : 'rc-input--error')
                                    }
                                    data-rc-feature-forms-setup="true"
                                  >
                                    <input
                                      className="rc-input__control"
                                      id="registerName"
                                      type="text"
                                      maxLength="50"
                                      name="firstName"
                                      onChange={(e) => this.registerChange(e)}
                                      onBlur={(e) => this.inputBlur(e)}
                                      value={registerForm.firstName}
                                    />
                                    <label className="rc-input__label">
                                      <span className="rc-input__label-text">
                                        {' '}
                                        <FormattedMessage id="payment.firstName" />{' '}
                                      </span>
                                    </label>
                                    {firstNameValid ? null : (
                                      <span
                                        className="input-cross icon-unsuscribe iconfont"
                                        onClick={() =>
                                          this.deleteInput('firstName')
                                        }
                                      >
                                        &#xe6b2;
                                      </span>
                                    )}
                                  </div>
                                  <div className="invalid-feedback">
                                    <FormattedMessage id="registerFillIn" />
                                  </div>
                                </div>
                                <div className="form-group rc-margin-bottom--md required rc-text--left">
                                  <div
                                    className={
                                      'rc-input rc-input--full-width ' +
                                      (lastNameValid ? '' : 'rc-input--error')
                                    }
                                    data-rc-feature-forms-setup="true"
                                  >
                                    <input
                                      className="rc-input__control"
                                      id="registerName"
                                      type="text"
                                      maxLength="50"
                                      name="lastName"
                                      onChange={(e) => this.registerChange(e)}
                                      onBlur={(e) => this.inputBlur(e)}
                                      value={registerForm.lastName}
                                    />
                                    <label className="rc-input__label">
                                      <span className="rc-input__label-text">
                                        {' '}
                                        <FormattedMessage id="payment.lastName" />{' '}
                                      </span>
                                    </label>
                                    {lastNameValid ? null : (
                                      <span
                                        className="input-cross icon-unsuscribe iconfont"
                                        onClick={() =>
                                          this.deleteInput('lastName')
                                        }
                                      >
                                        &#xe6b2;
                                      </span>
                                    )}
                                  </div>
                                  <div className="invalid-feedback">
                                    <FormattedMessage id="registerFillIn" />
                                  </div>
                                </div>
                              </>
                            )}

                            <div className="form-group rc-margin-bottom--md required rc-text--left">
                              <div
                                className={
                                  'rc-input rc-input--full-width ' +
                                  (emailValid ? '' : 'rc-input--error')
                                }
                              >
                                <input
                                  className="rc-input__control"
                                  id="registerEmail"
                                  type="email"
                                  maxLength="90"
                                  name="email"
                                  onChange={(e) => this.registerChange(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  value={registerForm.email}
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="registerEmail"
                                >
                                  <span className="rc-input__label-text">
                                    <FormattedMessage id="registerEmail" />
                                  </span>
                                </label>
                                {emailValid ? null : (
                                  <span
                                    className="input-cross icon-unsuscribe iconfont"
                                    onClick={() => this.deleteInput('email')}
                                  >
                                    &#xe6b2;
                                  </span>
                                )}
                              </div>
                              <div className="invalid-feedback">
                                {emailMessage}
                              </div>
                            </div>
                            <div className="form-group rc-margin-bottom--md relative required rc-text--left">
                              <div
                                className={
                                  'rc-input rc-input--full-width ' +
                                  (passwordValid ? '' : 'rc-input--error')
                                }
                                data-rc-feature-forms-setup="true"
                              >
                                <input
                                  className="rc-input__control rc-input__password"
                                  id="registerPassword"
                                  type="password"
                                  maxLength="255"
                                  minLength="8"
                                  name="password"
                                  onChange={(e) => this.registerChange(e)}
                                  onFocus={(e) => this.inputFocus(e)}
                                  onBlur={(e) => this.inputBlur(e)}
                                  value={registerForm.password}
                                />
                                <label
                                  className="rc-input__label"
                                  htmlFor="registerPassword"
                                >
                                  <span className="rc-input__label-text">
                                    <FormattedMessage id="registerPassword" />
                                  </span>
                                </label>
                                <button
                                  type="button"
                                  className="rc-btn rc-btn--icon rc-icon rc-show--xs rc-iconography rc-input__password-toggle"
                                >
                                  <span className="rc-screen-reader-text">
                                    <FormattedMessage id="registerTogglePassword" />
                                  </span>
                                </button>
                                {passwordValid ? null : (
                                  <span
                                    className="input-cross icon-unsuscribe iconfont"
                                    onClick={() => this.deleteInput('password')}
                                  >
                                    &#xe6b2;
                                  </span>
                                )}
                              </div>
                              <div className="invalid-feedback">
                                {passwordMessage}
                              </div>
                              <div
                                className={
                                  'tippy-popper ' +
                                  (passwordChanged ? '' : 'invisible')
                                }
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
                                  <div className="tippy-arrow"></div>
                                  <div
                                    className="tippy-content"
                                    data-state="visible"
                                  >
                                    <div
                                      id="password-tooltip"
                                      className="rc-tooltip rc-text--left"
                                    >
                                      <div className="rc-meta">
                                        <FormattedMessage id="registerRules" />
                                      </div>
                                      <div
                                        className={
                                          'rc-badge--label ' +
                                          (ruleLength
                                            ? 'rc-text-colour--success'
                                            : '')
                                        }
                                        data-password-strength="length"
                                      >
                                        {ruleLength ? (
                                          <span className="iconfont green mr-2">
                                            &#xe68c;
                                          </span>
                                        ) : null}
                                        <span className="icon-validation rc-epsilon rc-b rc-hidden"></span>
                                        <span>
                                          {' '}
                                          <FormattedMessage id="registerLength" />{' '}
                                        </span>
                                      </div>
                                      <div
                                        className={
                                          'rc-badge--label ' +
                                          (ruleLower
                                            ? 'rc-text-colour--success'
                                            : '')
                                        }
                                        data-password-strength="lowercase"
                                      >
                                        {ruleLower ? (
                                          <span className="iconfont green mr-2">
                                            &#xe68c;
                                          </span>
                                        ) : null}
                                        <span className="icon-validation rc-epsilon rc-b"></span>
                                        <span>
                                          <FormattedMessage id="registerLowercase" />
                                        </span>
                                      </div>
                                      <div
                                        className={
                                          'rc-badge--label ' +
                                          (ruleUpper
                                            ? 'rc-text-colour--success'
                                            : '')
                                        }
                                        data-password-strength="uppercase"
                                      >
                                        {ruleUpper ? (
                                          <span className="iconfont green mr-2">
                                            &#xe68c;
                                          </span>
                                        ) : null}
                                        <span className="icon-validation rc-epsilon rc-b rc-hidden"></span>
                                        <span>
                                          <FormattedMessage id="registerUppercase" />
                                        </span>
                                      </div>
                                      <div
                                        className={
                                          'rc-badge--label ' +
                                          (ruleAname
                                            ? 'rc-text-colour--success'
                                            : '')
                                        }
                                        data-password-strength="number"
                                      >
                                        {ruleAname ? (
                                          <span className="iconfont green mr-2">
                                            &#xe68c;
                                          </span>
                                        ) : null}
                                        <span className="icon-validation rc-epsilon rc-b rc-hidden"></span>
                                        <span>
                                          <FormattedMessage id="registerAname" />
                                        </span>
                                      </div>
                                      <div
                                        className={
                                          'rc-badge--label ' +
                                          (ruleSpecial
                                            ? 'rc-text-colour--success'
                                            : '')
                                        }
                                        data-password-strength="specialchar"
                                      >
                                        {ruleSpecial ? (
                                          <span className="iconfont green mr-2">
                                            &#xe68c;
                                          </span>
                                        ) : null}
                                        <span className="icon-validation rc-epsilon rc-b rc-hidden"></span>
                                        <span>
                                          <FormattedMessage id="registerSpecial" />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id="wrap">
                              <Consent
                                url={url}
                                list={this.state.list}
                                sendList={this.sendList}
                                width={this.state.width}
                                zoom={this.state.zoom}
                                fontZoom={this.state.fontZoom}
                                auto={true}
                                key={'required'}
                              />
                            </div>
                          </div>
                          <p className="rc-body rc-margin-bottom--lg rc-margin-bottom--sm--desktop rc-text--left">
                            <span
                              style={{ marginRight: '.625rem' }}
                              className="rc-text-colour--brand1"
                            >
                              *
                            </span>
                            <FormattedMessage id="registerMandatory" />
                          </p>
                          <div className="rc-content-v-middle--mobile rc-margin-bottom--lg rc-margin-bottom--sm--desktop">
                            <button
                              id="registerSubmitBtn"
                              type="button"
                              value="Créer votre compte Royal Canin"
                              className="rc-btn rc-btn--one rc-self-v-middle--mobile"
                              disabled={registerDisabled}
                              onClick={() => this.register()}
                            >
                              <FormattedMessage id="registerCreateYourAccout" />
                            </button>
                          </div>
                          <div className="rc-meta rc-margin-top--sm rc-text--left">
                            <p>
                              <FormattedMessage
                                id="registerFooter1"
                                defaultMessage={' '}
                              />
                              {window.__.env.REACT_APP_COUNTRY === 'us' ? (
                                <a href={homePage + contactUrl}>&nbsp;here</a>
                              ) : null}
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Modal
          type="fullscreen"
          visible={true}
          footerVisible={false}
          modalTitle={<FormattedMessage id="addPet" />}
          confirmBtnText={<FormattedMessage id="continue" />}
        />
      </div>
    );
  }
}
export default withOktaAuth(Register);
