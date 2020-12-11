import React, { Component, useState  } from 'react';
import PropTypes from 'prop-types';
import Consent from '@/components/Consent';
import { getStoreOpenConsentList } from '@/api/consent';
import Loading from '@/components/Loading';
import './index.less';
import SocialRegister from './components/socialRegister';
import { injectIntl, FormattedMessage } from 'react-intl';
import { oktaRegister } from '@/api/user'
import { setToken } from '../../utils/token'

@injectIntl
class Register extends Component {
  static propTypes = {
    prop: PropTypes
  };

  static defaultProps = {};

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
      requiredConsentCount: 0
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
      if (e.target.localName === 'span') {
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
    if(name === 'password'){
      this.setState({
        passwordChanged: false
      })
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
      this.setState({
        ruleLength: value.length >= 8,
        ruleLower: lowerReg.test(value),
        ruleUpper: upperReg.test(value),
        ruleAname: nameReg.test(value),
        ruleSpecial: specialReg.test(value)
      }, () => this.validInput(name, value));
    }
    this.validInput(name, value);
    registerForm[name] = value;
    this.setState({ registerForm });
  };

  register = async () => {
    const [isGetUserInfoDown, setIsGetUserInfoDown] = useState(false);
    const { registerForm } = this.state;
    const res = oktaRegister({
      storeId: process.env.REACT_APP_STOREID,
      customerPassword: registerForm.password,
      customerAccount: registerForm.email,
      customerName:registerForm.name
    })
    if(res.code === 'K-000000') {
      var result = setToken(res.token)
      setIsGetUserInfoDown(result);
    }
  };

  render() {
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
      list
    } = this.state;
    const allValid = nameValid && emailValid && passwordValid 
            && registerForm.name && registerForm.email && registerForm.password;
    const requireCheckd = (list.filter(x=>x.isChecked && x.isRequired)).length === requiredConsentCount;
    const registerDisabled = !(allValid && requireCheckd)
    return (
      <div>
        {/*全局loading */}
        {this.state.circleLoading ? <Loading bgColor={'#fff'} /> : null}
        <div id="register" className="page" style={this.state.styleObj}>
          <div className="rc-layout-container rc-padding--sm rc-reverse-layout-mobile rc-bg-colour--brand3 rc-margin-bottom--xs">
            <div className="rc-column rc-padding-top--lg--mobile">
              <div className="rc-margin-bottom--sm text-center">
                <a
                  href="/home"
                  className="logo-home d-inline-block"
                  title="Commerce Cloud Storefront Reference Architecture Accueil"
                >
                  <span className="rc-screen-reader-text">
                    <FormattedMessage id="registerCloud" />
                  </span>
                  <div className="content-asset">
                    <img
                      src="https://shop.royalcanin.fr/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-FR-Library/default/dw66c24d73/Logo R-C/logo--secondary.png?sw=220&amp;sh=102&amp;sm=fit&amp;cx=0&amp;cy=0&amp;cw=220&amp;ch=102&amp;sfrm=png"
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
                      className="ciam-alert-error-popin rc-alert rc-alert--error rc-padding--sm rc-alert--with-close rc-margin-y--sm hidden"
                      role="alert"
                    >
                      <p>
                        <FormattedMessage id="registerErrorMessage" />
                        <b>
                          <a
                            href="https://shop.royalcanin.fr/help/contact"
                            className="rc-text-colour--brand1"
                          >
                            {' '}
                            <FormattedMessage id="footer.email" />
                          </a>
                        </b>
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
                    <h2 className="text-center rc-margin-bottom--sm">
                      <FormattedMessage id="registerWelcome" />{' '}
                      <span class="rc-text-colour--brand1">Royal Canin</span>
                    </h2>
                    <p className="rc-margin-bottom--none text-center">
                      <FormattedMessage id="registerCompleteForm" />
                    </p>
                    <p className="text-center align-bottom">
                      <FormattedMessage id="registerHaveAccount" />{' '}
                      <a
                        href="https://shop.royalcanin.fr/on/demandware.store/Sites-FR-Site/fr_FR/Login-OAuthLogin?oauthProvider=OktaProvider_FR&amp;oauthLoginTargetEndPoint=1"
                        className="rc-styled-link"
                      >
                        <FormattedMessage id="registerLoginIn" />
                      </a>
                    </p>
                    <SocialRegister />
                    <div className="rc-column">
                      <p className="rc-margin-bottom--none text-center rc-padding--xs">
                        <FormattedMessage id="registerContinuing" />
                      </p>
                    </div>
                    <div className="rc-column rc-padding-left--lg rc-padding-right--lg">
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
                                maxlength="50"
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
                                  class="input-cross icon-unsuscribe iconfont"
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
                                maxlength="50"
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
                                  class="input-cross icon-unsuscribe iconfont"
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
                                maxlength="255"
                                minlength="8"
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
                                  class="input-cross icon-unsuscribe iconfont"
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
                              tabindex="-1"
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
                              description={
                                this.props.intl.messages.registerDescription
                              }
                            />
                          </div>
                        </div>
                        <p className="rc-body rc-margin-bottom--lg rc-margin-bottom--sm--desktop rc-text--left">
                          <FormattedMessage id="registerMandatory" />
                          <span className="rc-text-colour--brand1">*</span>
                        </p>
                        <div className="rc-content-v-middle--mobile rc-margin-bottom--lg rc-margin-bottom--sm--desktop">
                          <button
                            id="registerSubmitBtn"
                            type="button"
                            value="Créer votre compte Royal Canin"
                            className="rc-btn rc-btn--one rc-self-v-middle--mobile"
                            disabled={ registerDisabled }
                            onClick={() => this.register()}
                          >
                            <FormattedMessage id="registerCreateYourAccout" />
                          </button>
                        </div>
                        <div className="rc-meta rc-margin-top--sm rc-text--left">
                          <p>
                            <FormattedMessage id="registerFooter1" />
                            <a
                              href="mailto:conso.fr@royalcanin.com"
                              className="rc-text-colour--brand1"
                            >
                              conso.fr@royalcanin.com
                            </a>
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
export default Register;
