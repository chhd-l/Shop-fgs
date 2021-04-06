import React, { Component, useState } from 'react';
import Consent from '@/components/Consent';
import { getStoreOpenConsentList } from '@/api/consent';
import Loading from '@/components/Loading';
import './index.less';
import SocialRegister from './components/socialRegister';
import { injectIntl, FormattedMessage } from 'react-intl';
import { oktaRegister } from '@/api/user';
import stores from '@/store';
import { mergeUnloginCartData, getOktaCallBackUrl } from '@/utils/utils';
import { withOktaAuth } from '@okta/okta-react';
import GoogleTagManager from '@/components/GoogleTagManager';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const checkoutStore = stores.checkoutStore;
const loginStore = stores.loginStore;

@injectIntl
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
      errorMessage: ''
    };
    this.sendList = this.sendList.bind(this);
    this.init = this.init.bind(this);
    this.register = this.register.bind(this);
    this.registerChange = this.registerChange.bind(this);
    this.inputFocus = this.inputFocus.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
  }

  componentDidMount() {
    const isLogin = !!localItemRoyal.get('rc-token');
    if (isLogin) {
      this.props.history.push('/');
    }
    this.init();
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

  init = async () => {
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
          isChecked: false,
          isRequired: true,
          detailList: item.detailList
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
    await oktaRegister({
      storeId: process.env.REACT_APP_STOREID,
      customerPassword: registerForm.password,
      customerAccount: registerForm.email,
      customerName: registerForm.name
    })
      .then(async (res) => {
        if (res.code === 'K-000000') {
          //GA 注册成功 start
          dataLayer.push({
            event: `${process.env.REACT_APP_GTM_SITE_ID}accountCreation`,
            interaction: {
              category: 'account creation',
              action: 'accounct creation',
              label: '',
              value: 1
            }
          });
          //GA 注册成功 end

          loginStore.changeLoginModal(false);
          loginStore.changeIsLogin(true);

          localItemRoyal.set('rc-token', res.context.token);
          localItemRoyal.set('rc-register', true);
          loginStore.setUserInfo(res.context.customerDetail);

          if (checkoutStore.cartData.length) {
            await mergeUnloginCartData();
            await checkoutStore.updateLoginCart();
          }
          if (res.context.oktaSessionToken) {
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
            window.location.href = callOktaCallBack;
          }
        } else {
          window.scrollTo(0, 0);
          this.setState({
            circleLoading: false,
            hasError: true,
            errorMessage: res.messages
          });
        }
      })
      .catch((err) => {
        window.scrollTo(0, 0);
        this.setState({
          circleLoading: false,
          hasError: true
        });
      });
  };

  render() {
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
      nameValid &&
      emailValid &&
      passwordValid &&
      registerForm.name &&
      registerForm.email &&
      registerForm.password;
    const requireCheckd =
      list.filter((x) => x.isChecked && x.isRequired).length ===
      requiredConsentCount;
    const registerDisabled = !(allValid && requireCheckd);
    const isHub = process.env.REACT_APP_HUB == '1';
    const isTr = process.env.REACT_APP_LANG === 'tr'; //因为土耳其welcome to royal canin的翻译，需要对welcome to royal canin特殊化处理
    let homePage = process.env.REACT_APP_HOMEPAGE;
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
        <div id="register" className="page" style={this.state.styleObj}>
          <div className="rc-layout-container rc-padding--sm rc-reverse-layout-mobile rc-bg-colour--brand3 rc-margin-bottom--xs">
            <div className="rc-column rc-padding-top--lg--mobile">
              <div className="rc-margin-bottom--sm text-center">
                <a
                  href={
                    isHub
                      ? process.env.REACT_APP_HUBPAGE_PREFIX
                      : process.env.REACT_APP_ACCESS_PATH
                  }
                  className="logo-home d-inline-block border-bottom border-transparent"
                  title="Commerce Cloud Storefront Reference Architecture Accueil"
                >
                  <span className="rc-screen-reader-text">
                    <FormattedMessage id="registerCloud" />
                  </span>
                  <div className="content-asset">
                    <img
                      src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/logo--secondary.png`}
                      width="164"
                      height="60"
                      alt="Royal Canin Flagship Store"
                    />
                  </div>
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
                        {errorMessage ? (
                          errorMessage
                        ) : (
                          <div>
                            <FormattedMessage id="registerErrorMessage" />
                            <strong>
                              <a
                                href={
                                  process.env.REACT_APP_LANG === 'en'
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
                        )}
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
                        Royal Canin
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
                            process.env.REACT_APP_HOMEPAGE
                          )
                        }
                        className="rc-styled-link"
                      >
                        <FormattedMessage id="registerLoginIn" />
                      </a>
                    </p>
                    {process.env.REACT_APP_LANG !== 'ru' ? (
                      <SocialRegister />
                    ) : null}
                    <div className="rc-column">
                      <p className="rc-margin-bottom--none text-center rc-padding--xs">
                        <FormattedMessage id="registerContinuing" />
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
                    <div className="rc-column">
                      <form
                        id="registrationForm"
                        className="registration-form rc-margin-bottom--xl--mobile"
                        encoding="off"
                      >
                        <div className="rc-margin-bottom--xs">
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
                              <label
                                className="rc-input__label"
                                htmlFor="registerName"
                              >
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
                                maxLength="50"
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
                            <FormattedMessage id="registerFooter1" />
                            {process.env.REACT_APP_LANG === 'en' ? (
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
      </div>
    );
  }
}
export default withOktaAuth(Register);
