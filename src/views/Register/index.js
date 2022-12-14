import React, { Component, useState } from 'react';
import { Footer, GoogleTagManager, Loading, Consent } from '@/components';
import { getStoreOpenConsentList } from '@/api/consent';
import './index.less';
import SocialRegister from './components/socialRegister';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { oktaRegister } from '@/api/user';
import stores from '@/store';
import {
  mergeUnloginCartData,
  getOktaCallBackUrl,
  bindSubmitParam,
  isMobile as isMobilePhone
} from '@/utils/utils';
import { withOktaAuth } from '@okta/okta-react';
import { userBindConsent } from '@/api/consent';
import { inject, observer } from 'mobx-react';
import { addEventListenerArr } from './addEventListener';
import { EMAIL_REGEXP, LOGO_PRIMARY_RU, LOGO } from '@/utils/constant';
import cn from 'classnames';
import { Input, Button, Modal } from '@/components/Common';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { seoHoc } from '@/framework/common';
import { Link } from 'react-router-dom';
import { saveShelterId } from '@/api/recommendation';
import NlConsentAdditionalText from '@/components/Consent/ConsentAdditionalText/nlConsentText';
import './components/notification.less';

// 日本logo
import jpLogo from '@/assets/images/register/jp_logo.svg';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const checkoutStore = stores.checkoutStore;
const loginStore = stores.loginStore;
const pass_word = 'pass' + 'word';

@injectIntl
@inject('paymentStore')
@seoHoc()
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

      formWarning: {
        name: false,
        email: false,
        password: false
      },

      registerForm: {
        name: '',
        email: '',
        password: ''
      },
      regError: false,
      regErrorMessage: '',
      passwordMessage: '',
      emailMessage: '',
      requiredConsentCount: 0,
      hasError: false,
      errorMessage: '',
      firstNameValid: true,
      lastNameValid: true,
      phoneticFirstNameValid: true,
      phoneticLastNameValid: true,
      passwordInputType: pass_word,
      illegalSymbol: false,
      showValidErrorMsg: false
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
      let _optionalList = result.context.optionalList;
      if (window.__.env.REACT_APP_COUNTRY === 'nl') {
        _optionalList = result.context.optionalList.filter(
          (item) => item.consentDesc !== 'MARS-PETCARE_NL_GLOBAL_B2C_DATALAKE'
        );
      }
      const optioalList = _optionalList.map((item) => {
        return {
          id: item.id,
          consentTitle:
            ['uk', 'nl'].indexOf(window.__.env.REACT_APP_COUNTRY) > -1
              ? item.consentRegisterTitle || item.consentTitle
              : item.consentTitle,
          isChecked: false,
          isRequired: false,
          detailList: item.detailList,
          consentDesc: item.consentDesc
        };
      });

      const requiredList = result.context.requiredList.map((item) => {
        return {
          id: item.id,
          consentTitle:
            window.__.env.REACT_APP_COUNTRY === 'uk'
              ? item.consentRegisterTitle || item.consentTitle
              : item.consentTitle,
          isChecked:
            item.consentDesc == 'RC_DF_TR_FGS_PRIVACY_POLICY' ||
            item.consentDesc == 'RC_DF_UK_MINIMUM_AGE_16'
              ? true
              : false,
          isRequired: true,
          detailList: item.detailList,
          noChecked:
            item.consentDesc == 'RC_DF_TR_FGS_PRIVACY_POLICY' ||
            item.consentDesc == 'RC_DF_UK_MINIMUM_AGE_16'
              ? true
              : false,
          notShow: item.consentDesc == 'RC_DF_UK_MINIMUM_AGE_16' ? true : false,
          consentDesc: item.consentDesc
        };
      });

      let list = this.state.list;
      list = [...requiredList, ...optioalList];
      if (['uk', 'nl'].indexOf(window.__.env.REACT_APP_COUNTRY) > -1) {
        list = [...optioalList, ...requiredList]; //uk的排序特殊化
      }
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
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (name === 'password') {
      this.setState({
        passwordChanged: false
      });
    }
    this.validInput(name, value);
  };

  validInput(name, value) {
    const symbolReg1 = /^\?+$/;
    const symbolReg2 = /^\-+$/;
    const deIllegalSymbol =
      symbolReg1.test(value.trim()) || symbolReg2.test(value.trim());
    // jp katakana verification
    let jpNameValid = true;
    if (name === 'phoneticLastName' || name === 'phoneticFirstName') {
      const jpNameReg = /^(?=.*?[\u30A1-\u30FC])[\u30A1-\u30FC\s]*$/;
      jpNameValid = jpNameReg.test(value.trim());
      console.log(jpNameValid, 'jpjpjp');
    }

    let valid;
    switch (name) {
      case 'password':
        const { ruleLength, ruleLower, ruleUpper, ruleAname, ruleSpecial } =
          this.state;
        valid =
          ruleLength && ruleLower && ruleUpper && ruleAname && ruleSpecial;
        this.setState({
          passwordValid: valid,
          passwordMessage: value.trim()
            ? this.props.intl.messages.registerPasswordFormat
            : this.props.intl.messages.registerFillIn
        });
        break;
      case 'name':
        valid = !!value.trim();
        this.setState({
          nameValid: valid
        });
        break;
      case 'firstName':
        valid = !!value.trim() && !deIllegalSymbol;
        console.log('firstNamevalid', valid);
        this.setState({
          firstNameValid: valid,
          illegalSymbol: deIllegalSymbol
        });
        break;
      case 'lastName':
        valid = !!value.trim() && !deIllegalSymbol;
        this.setState({
          lastNameValid: valid,
          illegalSymbol: deIllegalSymbol
        });
        break;
      case 'phoneticFirstName':
        valid = !!value.trim() && !deIllegalSymbol && jpNameValid;
        this.setState({
          phoneticFirstNameValid: valid,
          illegalSymbol: deIllegalSymbol
        });
        break;
      case 'phoneticLastName':
        valid = !!value.trim() && !deIllegalSymbol && jpNameValid;
        console.log('phoneticLastNamevalid', valid);
        this.setState({
          phoneticLastNameValid: valid,
          illegalSymbol: deIllegalSymbol
        });
        break;
      case 'email':
        valid = EMAIL_REGEXP.test(value);
        this.setState({
          emailValid: valid,
          emailMessage: value
            ? this.props.intl.messages.registerEmailFormate
            : this.props.intl.messages.registerFillIn
        });
        break;
    }
    this.setState({
      formWarning: Object.assign({}, this.state.formWarning, { [name]: !valid })
    });
  }

  registerChange = (e) => {
    const { registerForm } = this.state;
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'password') {
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
          ruleSpecial: specialReg.test(value)
        },
        () => this.validInput(name, value)
      );
    }
    this.validInput(name, value);
    registerForm[name] = value;
    this.setState({ registerForm });
  };

  hiddenValidErrorMsg() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        showValidErrorMsg: false
      });
    }, 5000);
  }

  validDeName = () => {
    const { registerForm } = this.state;
    let De = window.__.env.REACT_APP_COUNTRY == 'de';
    let _firstName = registerForm.firstName?.trim();
    let _lastName = registerForm.lastName?.trim();
    let _name = registerForm.name?.trim();
    const symbolReg1 = /^\?+$/;
    const symbolReg2 = /^\-+$/;
    const deIllegalSymbol1 =
      symbolReg1.test(_firstName) || symbolReg1.test(_lastName);
    const deIllegalSymbol2 =
      symbolReg2.test(_firstName) || symbolReg2.test(_lastName);
    let deValidRule =
      De && (!_firstName || !_lastName || deIllegalSymbol1 || deIllegalSymbol2);
    // 如果是日本则不校验
    if (window.__.env.REACT_APP_COUNTRY === 'jp') {
      return true;
    }
    if (deValidRule || (!De && !_name)) {
      this.setState(
        {
          showValidErrorMsg: true
        },
        () => {
          this.hiddenValidErrorMsg();
        }
      );
      return false;
    } else {
      return true;
    }
  };

  register = async () => {
    const { registerForm } = this.state;
    console.log(this.validDeName(), '9898');
    if (!this.validDeName()) return;

    this.setState({
      circleLoading: true
    });
    const accessPath = window.__.env.REACT_APP_ACCESS_PATH;
    const params = {
      storeId: window.__.env.REACT_APP_STOREID,
      customerPassword: registerForm.password,
      customerAccount: registerForm.email,
      customerName:
        window.__.env.REACT_APP_COUNTRY !== 'de'
          ? registerForm.name
          : registerForm.firstName + ' ' + registerForm.lastName,
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      phoneticFirstName: registerForm.phoneticFirstName,
      phoneticLastName: registerForm.phoneticLastName
    };
    await oktaRegister(
      // {// callback: `${accessPath.replace(/\/$/gi, '')}/register`}
      params
    )
      .then(async (res) => {
        console.log('oktaRegister', res);
        //GA 注册成功 start
        window.dataLayer &&
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
        let customerDetail = res.context.customerDetail;
        let submitParam = bindSubmitParam(this.state.list);
        if (
          window.__.env.REACT_APP_FGS_SELF_REGISTER ||
          res.context.oktaSessionToken
        ) {
          //自动登录
          loginStore.changeLoginModal(false);
          loginStore.changeIsLogin(true);

          localItemRoyal.set('rc-register', true);
          localItemRoyal.set('rc-token', res.context.token);
          loginStore.setUserInfo(res.context.customerDetail);
          localItemRoyal.set(
            'okta-session-token',
            res.context.oktaSessionToken
          );

          // PO bind shelterId, country:de
          const shelterId = localItemRoyal.get('customerId') || '';
          const customerId = res.context?.customerId || '';
          if (shelterId) {
            await saveShelterId({
              shelterId,
              customerId,
              prescriberType: 'vet'
            });
          }

          var callOktaCallBack = getOktaCallBackUrl(
            res.context.oktaSessionToken
          ); //获取okta的登录的url
          localItemRoyal.set(
            'rc-consent-list',
            JSON.stringify(this.state.list)
          ); // 把consent放入缓存，登录完成后，注册consent

          if (checkoutStore.cartData.length) {
            await mergeUnloginCartData();
            await checkoutStore.updateLoginCart();
          }

          // 注册的时候如果是预约专家就直接跳转checkout页面
          let appointmentNo = sessionItemRoyal.get('appointment-no');
          if (appointmentNo) {
            // let type ={
            //   sit:'/fr/checkout',
            //   uat: '/fr/shop/checkout',
            // }
            // window.location.href = window.location.origin + type[window.__.env.REACT_APP_GA_ENV];
            this.props.history.push('/checkout');
          } else {
            if (window.__.env.REACT_APP_FGS_SELF_REGISTER) {
              // await  localItemRoyal.set('oktaToken',  res.context.oktaSessionToken);
              this.bindConsent(submitParam, customerDetail, () => {
                this.props.history.push('/required');
              });
            } else {
              window.location.href = callOktaCallBack; // 调用一次OKTA的登录
            }
          }
        } else {
          //发送邮件，跳转welcome页面
          this.bindConsent(submitParam, customerDetail, () => {
            loginStore.setUserInfo(customerDetail); // For compare email
            this.props.history.push('/welcome/' + registerForm.email);
          });
        }
      })
      .catch((err) => {
        window.scrollTo(0, 0);
        this.setState({
          circleLoading: false,
          hasError: true,
          errorMessage: null,
          regErrorMessage: err.detailMessage,
          regError: true
        });
      });
  };
  bindConsent(submitParam, customerDetail, cb) {
    userBindConsent({
      ...submitParam,
      useBackendOktaTokenFlag: true,
      customerId: customerDetail.customerId
    })
      .then((res) => {
        cb && cb();
      })
      .catch((err) => {
        window.scrollTo(0, 0);
        this.setState({
          circleLoading: false,
          hasError: true,
          errorMessage: null
        });
      });
  }
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
    const { intl } = this.props;
    const registerBack =
      window.location.search.indexOf('?origin=register') >= 0 &&
      window.location.search.indexOf('&token') >= 0; // 注册邮件点回来后，自动登录
    if (registerBack) {
      //example ?origin=register&token=20111jIFz6c2R4OpVzInpzlH9dBwgtgy2dgUi5toMSwMBGdC7JjEbWm
      var searchList = window.location.search.split('&');
      var tokenUrl = searchList.length > 1 ? searchList[1].split('=') : '';
      var sessionToken = tokenUrl.length > 1 ? tokenUrl[1] : ''; // 获取邮件返回的sessionToken
      if (sessionToken) {
        localItemRoyal.set('okta-session-token', sessionToken);
        var callOktaCallBack = getOktaCallBackUrl(
          localItemRoyal.get('okta-session-token')
        ); //获取okta的登录的url
        window.location.href = callOktaCallBack; // 调用一次OKTA的登录
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
      phoneticFirstNameValid,
      phoneticLastNameValid,
      emailValid,
      passwordValid,
      registerForm,
      emailMessage,
      passwordMessage,
      requiredConsentCount,
      list,
      hasError,
      errorMessage,
      passwordInputType,
      regError,
      formWarning
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
    const jpAllValid =
      firstNameValid &&
      lastNameValid &&
      emailValid &&
      passwordValid &&
      phoneticFirstNameValid &&
      phoneticLastNameValid &&
      registerForm.firstName &&
      registerForm.lastName &&
      registerForm.phoneticFirstName &&
      registerForm.phoneticLastName &&
      registerForm.email &&
      registerForm.password;
    const requireCheckd =
      list.filter((x) => x.isChecked && x.isRequired).length ===
      requiredConsentCount;
    const registerDisabled = !(allValid && requireCheckd);
    const jpRegisterDisabled = !(jpAllValid && requireCheckd);
    // 判断是否日本
    const isJp = window.__.env.REACT_APP_COUNTRY === 'jp';
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        {/* 日本注册 */}
        {!isJp ? null : (
          <div className="jp-reg">
            <div className="text-center head-logo">
              {/* 头部logo */}
              <DistributeHubLinkOrATag
                href={''}
                to="/"
                className="logo-home d-inline-block border-bottom border-transparent"
                title="Commerce Cloud Storefront Reference Architecture Accueil"
              >
                <span className="rc-screen-reader-text">
                  <FormattedMessage id="registerCloud" />
                </span>
                <h1 className="content-asset mb-0">
                  {window.__.env.REACT_APP_COUNTRY === 'jp' ? (
                    <img
                      src={jpLogo}
                      alt="Royal Canin Flagship Store"
                      className="w-36 md:w-52"
                    />
                  ) : (
                    <>
                      <img
                        src={LOGO}
                        alt=""
                        className="inline-block w-40 md:w-auto"
                      />
                    </>
                  )}
                </h1>
              </DistributeHubLinkOrATag>
            </div>
            {/* 注册重复错误提示 */}
            {regError ? (
              <aside
                className="rc-alert rc-alert--error mb-2 rc-alert__close"
                role="alert"
                style={{
                  padding: '.5rem',
                  width: '750px',
                  margin: '0px auto',
                  textAlign: 'center'
                }}
              >
                <span>
                  {
                    <FormattedMessage
                      id="jp.regErrorMessage"
                      values={{
                        val: ''
                      }}
                      // values={{
                      //   val: (
                      //     <a
                      //       className="rc-styled-link ui-cursor-pointer faq_rc_styled_link"
                      //       href="https://shopsit.royalcanin.com/jp/help"
                      //     >
                      //       {<FormattedMessage id="jp.reghelp" />}
                      //     </a>
                      //   )
                      // }}
                    />
                  }
                </span>
                <button
                  class="rc-alert__close rc-icon rc-icon rc-alert__close rc-close--xs rc-iconography"
                  onClick={() => this.setState({ regError: false })}
                >
                  <span class="rc-screen-reader-text">Close</span>
                </button>
              </aside>
            ) : null}
            {/* logo下标题 */}
            <div className="text-center logo-bottom-title">
              {/* <p>{<FormattedMessage id="jp.regtitle" />}</p>
              <p>{<FormattedMessage id="jp.regTitleTwo" />}</p>
              <p>
                <span>
                  {<FormattedMessage id="jp.regTitleThree" />}&nbsp;&nbsp;&nbsp;
                </span>
                <span>
                  {<FormattedMessage id="jp.regTitleFour" />}&nbsp;&nbsp;&nbsp;
                </span>
                <span>
                  {<FormattedMessage id="jp.regTitleFive" />}&nbsp;&nbsp;&nbsp;
                </span>
                <span>
                  {<FormattedMessage id="jp.regTitleSix" />}&nbsp;&nbsp;&nbsp;
                </span>
                <span>{<FormattedMessage id="jp.regTitleSeven" />}</span>
              </p>
              <h3>{<FormattedMessage id="jp.regTitleEight" />}</h3> */}
              <p className="text-center align-bottom gologin">
                <a
                  data-testid="jpgologin"
                  onClick={() =>
                    this.props.oktaAuth.signInWithRedirect(
                      window.__.env.REACT_APP_HOMEPAGE
                    )
                  }
                  className="jp-reg-to-login-btn cursor-pointer text-rc-red text-30"
                >
                  {<FormattedMessage id="jp.regToLogin" />}
                </a>
              </p>
              <p className="text-center">
                {
                  <FormattedMessage
                    id="jp.goToAccount"
                    values={{
                      val: (
                        <a
                          data-testid="goToAccount"
                          className="ui-cursor-pointer text-cs-gray text-16"
                          // href="https://accountpreview.royalcanin.com/"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            this.props.oktaAuth.signInWithRedirect(
                              window.__.env.REACT_APP_HOMEPAGE
                            );
                          }}
                          target={'_blank'}
                          style={{ borderBottom: '1px solid #666' }}
                        >
                          こちら
                        </a>
                      )
                    }}
                  />
                }
              </p>
            </div>
            {/* SocialRegister */}
            {window.__.env.REACT_APP_FaceBook_IDP ||
            window.__.env.REACT_APP_Google_IDP ? (
              <div id="register" className="page" style={this.state.styleObj}>
                <div className="rc-layout-container  rc-reverse-layout-mobile rc-bg-colour--brand3">
                  <div className="rc-column rc-padding-top--lg--mobile">
                    <div className="rc-layout-container rc-one-column rc-self-h-middle rc-flex-direction--reverse--md-down rc-max-width--lg">
                      <div className="rc-column rc-max-width--md rc-text--center">
                        <div>
                          <SocialRegister />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <form
              id="registrationForm"
              className="registration-form rc-margin-bottom--xl--mobile p-0 md:px-28"
              encoding="off"
            >
              <div className="rc-margin-bottom--xs regNameOne">
                <div className="regName">
                  <Input
                    id="registerName"
                    autoComplete="off"
                    type="text"
                    maxLength="50"
                    name="lastName"
                    valid={lastNameValid}
                    onChange={this.registerChange}
                    onBlur={this.inputBlur}
                    value={registerForm.lastName}
                    dataTestid="register_lastname"
                    data-testid="register_lastname"
                    label={<FormattedMessage id="jp.lastName" />}
                    rightOperateBoxJSX={
                      lastNameValid ? null : (
                        <ChaChaIcon
                          dataTestid={'register_lastname_ChaChaIcon'}
                          onClick={() => this.deleteInput('lastName')}
                        />
                      )
                    }
                    inValidLabel={
                      this.state.illegalSymbol ? (
                        <FormattedMessage id="registerIllegalSymbol" />
                      ) : (
                        <FormattedMessage id="registerFillIn" />
                      )
                    }
                  />
                  <Input
                    id="registerName"
                    autoComplete="off"
                    type="text"
                    maxLength="50"
                    dataTestid="register_firstname"
                    data-testid="register_firstname"
                    name="firstName"
                    valid={firstNameValid}
                    onChange={this.registerChange}
                    onBlur={this.inputBlur}
                    value={registerForm.firstName}
                    label={<FormattedMessage id="jp.firstName" />}
                    rightOperateBoxJSX={
                      firstNameValid ? null : (
                        <ChaChaIcon
                          dataTestid={'register_firstname_ChaChaIcon'}
                          onClick={() => this.deleteInput('firstName')}
                        />
                      )
                    }
                    inValidLabel={
                      this.state.illegalSymbol ? (
                        <FormattedMessage id="registerIllegalSymbol" />
                      ) : (
                        <FormattedMessage id="registerFillIn" />
                      )
                    }
                  />
                  <Input
                    id="registerName"
                    autoComplete="off"
                    type="text"
                    dataTestid="register_phoneticlastname"
                    data-testid="register_phoneticlastname"
                    maxLength="50"
                    name="phoneticLastName"
                    isWarning={!phoneticLastNameValid}
                    valid={phoneticLastNameValid}
                    onChange={this.registerChange}
                    onBlur={this.inputBlur}
                    value={registerForm.phoneticLastName}
                    label={<FormattedMessage id="phoneticLastName" />}
                    rightOperateBoxJSX={
                      phoneticLastNameValid ? null : (
                        <ChaChaIcon
                          dataTestid={'phoneticLastName_ChaChaIcon'}
                          onClick={() => this.deleteInput('phoneticLastName')}
                        />
                      )
                    }
                    inValidLabel={
                      this.state.illegalSymbol ? (
                        <FormattedMessage id="registerIllegalSymbol" />
                      ) : (
                        <FormattedMessage id="registerFillIn" />
                      )
                    }
                  />
                  <Input
                    id="registerName"
                    autoComplete="off"
                    type="text"
                    maxLength="50"
                    dataTestid="register_phoneticfirstname"
                    data-testid="register_phoneticfirstname"
                    name="phoneticFirstName"
                    valid={phoneticFirstNameValid}
                    onChange={this.registerChange}
                    onBlur={this.inputBlur}
                    isWarning={!phoneticFirstNameValid}
                    value={registerForm.phoneticFirstName}
                    label={<FormattedMessage id="phoneticFirstName" />}
                    rightOperateBoxJSX={
                      phoneticFirstNameValid ? null : (
                        <ChaChaIcon
                          dataTestid={'phoneticFirstName_ChaChaIcon'}
                          onClick={() => this.deleteInput('phoneticFirstName')}
                        />
                      )
                    }
                    inValidLabel={
                      this.state.illegalSymbol ? (
                        <FormattedMessage id="registerIllegalSymbol" />
                      ) : (
                        <FormattedMessage id="registerFillIn" />
                      )
                    }
                  />
                </div>
                <div className="regNameTwo">
                  <Input
                    id="registerEmail"
                    dataTestid="register_email"
                    data-testid="register_email"
                    autoComplete="off"
                    type="email"
                    maxLength="90"
                    name="email"
                    valid={emailValid}
                    isWarning={formWarning.email}
                    onChange={this.registerChange}
                    onBlur={this.inputBlur}
                    value={registerForm.email}
                    label={<FormattedMessage id="jp.email" />}
                    rightOperateBoxJSX={
                      formWarning.email ? (
                        <>
                          <ChaChaIcon
                            dataTestid={'email_ChaChaIcon'}
                            onClick={() => this.deleteInput('email')}
                          />
                        </>
                      ) : null
                    }
                    inValidLabel={emailMessage}
                  />

                  <Input
                    id="registerPassword"
                    type={passwordInputType}
                    maxLength="255"
                    autoComplete="new-password"
                    minLength="8"
                    dataTestid="register_password"
                    data-testid="register_password"
                    name="password"
                    valid={passwordValid}
                    isWarning={formWarning.password}
                    onChange={this.registerChange}
                    onFocus={this.inputFocus}
                    onBlur={this.inputBlur}
                    value={registerForm.password}
                    label={<FormattedMessage id="jp.password" />}
                    inValidLabel={passwordMessage}
                    rightOperateBoxJSX={
                      <>
                        {formWarning.password ? (
                          <ChaChaIcon
                            dataTestid={'ChaChaIcon_password'}
                            onClick={() => this.deleteInput('password')}
                          />
                        ) : null}
                        <span
                          style={{ color: '#666' }}
                          data-testid="passwordInputType_iconeye"
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
                          data-testid="passwordInputType_btn"
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
                                  label: (
                                    <FormattedMessage id="registerLength" />
                                  )
                                },
                                {
                                  stauts: ruleLower,
                                  label: (
                                    <FormattedMessage id="registerLowercase" />
                                  )
                                },
                                {
                                  stauts: ruleUpper,
                                  label: (
                                    <FormattedMessage id="registerUppercase" />
                                  )
                                },
                                {
                                  stauts: ruleAname,
                                  label: <FormattedMessage id="registerAname" />
                                },
                                {
                                  stauts: ruleSpecial,
                                  label: (
                                    <FormattedMessage id="registerSpecial" />
                                  )
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
                  {/* 下方条框勾选 */}
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
                      pageType="register"
                    />
                  </div>
                  {/* 注册按钮上的警示文字 */}
                  <p className="rc-body rc-margin-bottom--lg rc-margin-bottom--sm--desktop rc-text--left">
                    <span
                      style={{ marginRight: '.625rem' }}
                      className="rc-text-colour--brand1"
                    >
                      *
                    </span>
                    <FormattedMessage id="registerMandatory" />
                  </p>
                  {this.state.showValidErrorMsg ? (
                    <aside
                      className="rc-alert rc-alert--error mb-2"
                      role="alert"
                    >
                      <span className="pl-0">
                        <FormattedMessage id="registerIllegalSymbol" />
                      </span>
                    </aside>
                  ) : null}
                  {/* 注册按钮 */}
                  <div className="rc-content-v-middle--mobile rc-margin-bottom--lg rc-margin-bottom--sm--desktop">
                    <Button
                      dataTestid="register_submit_btn"
                      data-testid="register_submit_btn"
                      type="primary"
                      id="registerSubmitBtn"
                      htmlType="button"
                      value="Créer votre compte Royal Canin"
                      className="rc-self-v-middle--mobile"
                      disabled={jpRegisterDisabled}
                      onClick={() => this.register()}
                    >
                      <FormattedMessage id="jp.registerCreateYourAccout" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* <div className="rc-meta rc-margin-top--sm rc-text--left">
                <p>
                  <FormattedMessage id="registerFooter1" defaultMessage={' '} />
                </p>
              </div> */}
            </form>
          </div>
        )}
        {/*全局loading */}
        {this.state.circleLoading ? <Loading bgColor={'#fff'} /> : null}
        {registerBack || isJp ? null : (
          <div
            id="register"
            className="page overflow-x-hidden"
            style={this.state.styleObj}
          >
            <div className="rc-layout-container rc-padding--sm rc-reverse-layout-mobile rc-bg-colour--brand3 rc-margin-bottom--xs">
              <div className="rc-column rc-padding-top--lg--mobile">
                <div className="rc-margin-bottom--sm text-center">
                  <DistributeHubLinkOrATag
                    href={''}
                    to="/"
                    className="logo-home d-inline-block border-bottom border-transparent"
                    title="Commerce Cloud Storefront Reference Architecture Accueil"
                  >
                    <span className="rc-screen-reader-text">
                      <FormattedMessage id="registerCloud" />
                    </span>
                    <h1 className="content-asset mb-0">
                      {window.__.env.REACT_APP_COUNTRY === 'ru' ? (
                        <img
                          src={LOGO_PRIMARY_RU}
                          alt="Royal Canin Flagship Store"
                          className="w-36 md:w-52"
                        />
                      ) : (
                        <>
                          <img
                            src={LOGO}
                            alt=""
                            className="inline-block w-40 md:w-auto"
                          />
                        </>
                      )}
                    </h1>
                  </DistributeHubLinkOrATag>
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
                        <div>
                          <div>
                            {errorMessage ? (
                              errorMessage + ' '
                            ) : (
                              <FormattedMessage id="registerErrorMessage" />
                            )}
                            <strong>
                              9
                              <Link
                                to="/help"
                                className="rc-text-colour--brand1"
                              >
                                <FormattedMessage id="contactUs" />
                              </Link>
                            </strong>
                          </div>
                        </div>
                        <button
                          className="rc-btn rc-alert__close rc-close--xs rc-iconography"
                          data-close=""
                          aria-label=""
                        >
                          <span className="rc-screen-reader-text" />
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
                        className={`text-center rc-margin-bottom--sm`}
                        dangerouslySetInnerHTML={{
                          __html: intl.messages['register.welcomeToRoyalCanin']
                        }}
                      ></h2>
                      <p className="rc-margin-bottom--none text-center">
                        <FormattedMessage id="registerCompleteForm" />
                      </p>
                      <p className="text-center align-bottom">
                        <FormattedMessage id="registerHaveAccount" />{' '}
                        <span
                          data-testid="registerHaveAccount"
                          onClick={() => {
                            if (window.__.env.REACT_APP_FGS_SELF_LOGIN) {
                              this.props.history.push('./login');
                            } else {
                              this.props.oktaAuth.signInWithRedirect(
                                window.__.env.REACT_APP_HOMEPAGE
                              );
                            }
                          }}
                          className="rc-styled-link"
                        >
                          <FormattedMessage id="registerLoginIn" />
                        </span>
                      </p>
                      {/* SocialRegister */}
                      {window.__.env.REACT_APP_FaceBook_IDP ||
                      window.__.env.REACT_APP_Google_IDP ? (
                        <>
                          <SocialRegister />
                          <div className="rc-column">
                            <p className="rc-margin-bottom--none text-center rc-padding--xs">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: this.getIntlMsg('registerContinuing')
                                }}
                              />
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
                          className="registration-form rc-margin-bottom--xl--mobile p-0 md:px-28"
                          encoding="off"
                        >
                          <div className="rc-margin-bottom--xs">
                            {window.__.env.REACT_APP_COUNTRY !== 'de' ? (
                              <>
                                <Input
                                  name="name"
                                  id="registerName"
                                  valid={nameValid}
                                  dataTestid="register_name"
                                  data-testid="register_name"
                                  isWarning={formWarning.name}
                                  autoComplete="off"
                                  onChange={this.registerChange}
                                  onBlur={this.inputBlur}
                                  value={registerForm.name}
                                  label={<FormattedMessage id="registerName" />}
                                  rightOperateBoxJSX={
                                    formWarning.name ? (
                                      <ChaChaIcon
                                        dataTestid={'ChaChaIcon_name'}
                                        onClick={() => this.deleteInput('name')}
                                      />
                                    ) : null
                                  }
                                  inValidLabel={
                                    <FormattedMessage id="registerFillIn" />
                                  }
                                />
                              </>
                            ) : (
                              <>
                                <Input
                                  id="registerName"
                                  autoComplete="off"
                                  type="text"
                                  dataTestid="register_firstname"
                                  data-testid="register_firstname"
                                  maxLength="50"
                                  name="firstName"
                                  valid={firstNameValid}
                                  onChange={this.registerChange}
                                  onBlur={this.inputBlur}
                                  value={registerForm.firstName}
                                  label={
                                    <FormattedMessage id="payment.firstName" />
                                  }
                                  rightOperateBoxJSX={
                                    firstNameValid ? null : (
                                      <ChaChaIcon
                                        dataTestid={'ChaChaIcon_firstName'}
                                        onClick={() =>
                                          this.deleteInput('firstName')
                                        }
                                      />
                                    )
                                  }
                                  inValidLabel={
                                    this.state.illegalSymbol ? (
                                      <FormattedMessage id="registerIllegalSymbol" />
                                    ) : (
                                      <FormattedMessage id="registerFillIn" />
                                    )
                                  }
                                />
                                <Input
                                  id="registerName"
                                  autoComplete="off"
                                  type="text"
                                  maxLength="50"
                                  name="lastName"
                                  dataTestid="register_lastname"
                                  data-testid="register_lastname"
                                  valid={lastNameValid}
                                  onChange={this.registerChange}
                                  onBlur={this.inputBlur}
                                  value={registerForm.lastName}
                                  label={
                                    <FormattedMessage id="payment.lastName" />
                                  }
                                  rightOperateBoxJSX={
                                    firstNameValid ? null : (
                                      <ChaChaIcon
                                        dataTestid={'ChaChaIcon_lastName'}
                                        onClick={() =>
                                          this.deleteInput('lastName')
                                        }
                                      />
                                    )
                                  }
                                  inValidLabel={
                                    this.state.illegalSymbol ? (
                                      <FormattedMessage id="registerIllegalSymbol" />
                                    ) : (
                                      <FormattedMessage id="registerFillIn" />
                                    )
                                  }
                                />
                              </>
                            )}

                            <Input
                              id="registerEmail"
                              autoComplete="off"
                              type="email"
                              maxLength="90"
                              name="email"
                              dataTestid="register_email"
                              data-testid="register_email"
                              valid={emailValid}
                              isWarning={formWarning.email}
                              onChange={this.registerChange}
                              onBlur={this.inputBlur}
                              value={registerForm.email}
                              label={<FormattedMessage id="registerEmail" />}
                              rightOperateBoxJSX={
                                formWarning.email ? (
                                  <>
                                    <ChaChaIcon
                                      dataTestid={'ChaChaIcon_email'}
                                      onClick={() => this.deleteInput('email')}
                                    />
                                  </>
                                ) : null
                              }
                              inValidLabel={emailMessage}
                            />

                            <Input
                              id="registerPassword"
                              type={passwordInputType}
                              maxLength="255"
                              minLength="8"
                              name="password"
                              valid={passwordValid}
                              onChange={this.registerChange}
                              onFocus={this.inputFocus}
                              autoComplete="new-password"
                              dataTestid="register_password"
                              data-testid="register_password"
                              onBlur={this.inputBlur}
                              value={registerForm.password}
                              label={<FormattedMessage id="registerPassword" />}
                              inValidLabel={passwordMessage}
                              rightOperateBoxJSX={
                                <>
                                  {passwordValid ? null : (
                                    <ChaChaIcon
                                      dataTestid={'ChaChaIcon_password'}
                                      onClick={() =>
                                        this.deleteInput('password')
                                      }
                                    />
                                  )}
                                  <span
                                    style={{ color: '#666' }}
                                    data-testid="passwordInputType_iconeye"
                                    className={cn(
                                      'iconfont cursor-pointer font-bold text-lg inline-block py-3 px-2',
                                      passwordInputType === 'password'
                                        ? 'iconeye'
                                        : 'iconeye-close'
                                    )}
                                    onClick={() => {
                                      this.setState({
                                        passwordInputType:
                                          this.state.passwordInputType ===
                                          'password'
                                            ? 'text'
                                            : 'password'
                                      });
                                    }}
                                  />
                                  <button
                                    type="button"
                                    data-testid="passwordInputType_btn"
                                    className={`rc-btn rc-btn--icon rc-icon rc-iconography rc-input__password-toggle hidden ${
                                      passwordInputType === 'password'
                                        ? 'rc-show--xs'
                                        : 'rc-hide--xs'
                                    }`}
                                    onClick={() => {
                                      this.setState({
                                        passwordInputType:
                                          this.state.passwordInputType ===
                                          'password'
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
                                        {[
                                          {
                                            stauts: ruleLength,
                                            label: (
                                              <FormattedMessage id="registerLength" />
                                            )
                                          },
                                          {
                                            stauts: ruleLower,
                                            label: (
                                              <FormattedMessage id="registerLowercase" />
                                            )
                                          },
                                          {
                                            stauts: ruleUpper,
                                            label: (
                                              <FormattedMessage id="registerUppercase" />
                                            )
                                          },
                                          {
                                            stauts: ruleAname,
                                            label: (
                                              <FormattedMessage id="registerAname" />
                                            )
                                          },
                                          {
                                            stauts: ruleSpecial,
                                            label: (
                                              <FormattedMessage id="registerSpecial" />
                                            )
                                          }
                                        ].map((item, i) => (
                                          <div
                                            key={i}
                                            className={cn('rc-badge--label', {
                                              'rc-text-colour--success':
                                                item.stauts
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

                            <div id="wrap">
                              {window.__.env.REACT_APP_COUNTRY === 'uk' ? (
                                <div
                                  className="footer-checkbox-title rc-text--left"
                                  style={{ zoom: this.state.fontZoom }}
                                >
                                  <p>
                                    We’d like to keep you and your pet up to
                                    date with exciting promotions and new
                                    product developments from{' '}
                                    <a
                                      href="https://www.mars.com/made-by-mars/petcare"
                                      target="_blank"
                                    >
                                      Mars Petcare and its affiliates
                                    </a>
                                    .
                                  </p>
                                  <p>
                                    I am over 16 years old, and would like to
                                    receive these from:
                                  </p>
                                </div>
                              ) : null}
                              {window.__.env.REACT_APP_COUNTRY === 'nl' ? (
                                <NlConsentAdditionalText textPosition="top" />
                              ) : null}
                              <Consent
                                url={url}
                                list={this.state.list}
                                sendList={this.sendList}
                                width={this.state.width}
                                zoom={this.state.zoom}
                                fontZoom={this.state.fontZoom}
                                auto={true}
                                key={'required'}
                                pageType="register"
                              />
                              {window.__.env.REACT_APP_COUNTRY === 'uk' ? (
                                <div
                                  className="footer-checkbox-title rc-text--left"
                                  style={{ zoom: this.state.fontZoom }}
                                >
                                  <p>
                                    I understand that I may change these
                                    preferences at any time by updating my
                                    preferences in my account or by clicking the
                                    unsubscribe link in any communication I
                                    receive.
                                  </p>
                                  <p>
                                    From time to time, we may use your data for
                                    research to enhance our product and service
                                    offerings. You can find out how{' '}
                                    <a
                                      href="https://www.mars.com/made-by-mars/petcare"
                                      target="_blank"
                                    >
                                      Mars Petcare and its affiliates
                                    </a>{' '}
                                    collects and processes your data, contact us
                                    with privacy questions, and exercise your
                                    personal data rights via the{' '}
                                    <a
                                      href="https://www.mars.com/privacy-policy"
                                      target="_blank"
                                    >
                                      Mars Privacy Statement
                                    </a>
                                    .
                                  </p>
                                </div>
                              ) : null}
                              {window.__.env.REACT_APP_COUNTRY === 'nl' ? (
                                <NlConsentAdditionalText textPosition="bottom" />
                              ) : null}
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
                          {this.state.showValidErrorMsg ? (
                            <aside
                              className="rc-alert rc-alert--error mb-2"
                              role="alert"
                            >
                              <span className="pl-0">
                                <FormattedMessage id="registerIllegalSymbol" />
                              </span>
                            </aside>
                          ) : null}
                          <div className="rc-content-v-middle--mobile rc-margin-bottom--lg rc-margin-bottom--sm--desktop">
                            <Button
                              type="primary"
                              id="registerSubmitBtn"
                              htmlType="button"
                              value="Créer votre compte Royal Canin"
                              className="rc-self-v-middle--mobile"
                              disabled={registerDisabled}
                              onClick={() => this.register()}
                            >
                              <FormattedMessage id="registerCreateYourAccout" />
                            </Button>
                          </div>
                          <div className="rc-meta rc-margin-top--sm rc-text--left">
                            <p>
                              <FormattedMessage
                                id="registerFooter1"
                                defaultMessage={' '}
                              />
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer showFooter={false} />
          </div>
        )}
        <Modal
          type="fullscreen"
          visible={true}
          footerVisible={false}
          modalTitle={<FormattedMessage id="addPet" />}
          confirmBtnText={<FormattedMessage id="continue" />}
          children={22222}
        />
      </div>
    );
  }
}
export default withOktaAuth(Register);
const ChaChaIcon = ({ className, onClick = () => {}, dataTestid } = {}) => {
  return (
    <span
      className={cn(
        'iconfont iconchahao font-bold icon-unsuscribe cursor-pointer inline-block py-3 px-2',
        className
      )}
      style={{ color: '#c03344' }}
      onClick={onClick}
      data-testid={dataTestid}
    />
  );
};
