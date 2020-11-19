import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import './index.css';
import { findIndex } from 'lodash';
import Loading from '@/components/Loading';
import axios from 'axios';
import { addOrUpdatePaymentMethod } from '@/api/payment';
import { CREDIT_CARD_IMGURL_ENUM } from '@/utils/constant';
import { setSeoConfig } from '@/utils/utils';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('loginStore')
@injectIntl
@observer
class ShippingAddressFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false,
      isAdd: true,
      addressList: [],
      total: 0,
      errorMsg: '',
      successMsg: '',
      addressForm: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        country: 0,
        city: 0,
        postCode: '',
        phoneNumber: '',
        rfc: '',
        isDefault: false,
        deliveryAddressId: '',
        customerId: ''
      },
      cityList: [],
      creditCardInfo: {
        cardNumber: '',
        cardMmyy: '',
        cardCvv: '',
        cardOwner: '',
        email: '',
        phoneNumber: '',
        identifyNumber: '111',
        isDefault: false
      },
      payosdata: {}
    };
  }
  componentDidMount() {
    const { location } = this.props;
    setSeoConfig()
    if (location.query) {
      sessionItemRoyal.set(
        'paymentMethodForm',
        JSON.stringify(location.query)
      );
      this.setState({
        creditCardInfo: location.query
      });
    } else if (sessionItemRoyal.get('paymentMethodForm')) {
      let paymentMethodForm = JSON.parse(
        sessionItemRoyal.get('paymentMethodForm')
      );
      this.setState({
        creditCardInfo: paymentMethodForm
      });
    }
  }
  componentWillMount() {
    sessionItemRoyal.remove('paymentMethodForm');
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  cardInfoInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfo } = this.state;

    if (name === 'cardMmyy') {
      let beforeValue = value.substr(0, value.length - 1);
      let inputValue = value.substr(value.length - 1, 1);

      if (
        creditCardInfo[name] !== beforeValue &&
        creditCardInfo[name].substr(0, creditCardInfo[name].length - 1) !==
          value
      )
        return;
      if (
        isNaN(parseInt(inputValue)) &&
        value.length > creditCardInfo[name].length
      )
        return;
      if (creditCardInfo[name].length === 2 && value.length === 3) {
        creditCardInfo[name] = value.slice(0, 2) + '/' + value.slice(2);
      } else if (creditCardInfo[name].length === 4 && value.length === 3) {
        creditCardInfo[name] = creditCardInfo[name].slice(0, 2);
      } else {
        creditCardInfo[name] = value;
      }
    } else {
      creditCardInfo[name] = value;
    }

    console.log(['cardNumber', 'cardMmyy', 'cardCvv'].indexOf(name));
    if (['cardNumber', 'cardMmyy', 'cardCvv'].indexOf(name) === -1) {
      this.inputBlur(e);
    }

    this.setState({ creditCardInfo: creditCardInfo });
  }
  inputBlur(e) {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = findIndex(Array.from(el.classList), (classItem) => {
        return classItem === 'invalid-feedback';
      });
      return i > -1;
    })[0];
    if (validDom) {
      validDom.style.display = e.target.value ? 'none' : 'block';
    }
  }
  async handleSave() {
    const { creditCardInfo } = this.state;
    this.setState({
      loading: true
    });
    try {
      let res = await axios.post(
        'https://api.paymentsos.com/tokens',
        {
          token_type: 'credit_card',
          card_number: creditCardInfo.cardNumber,
          expiration_date: creditCardInfo.cardMmyy.replace(/\//, '-'),
          holder_name: creditCardInfo.cardOwner,
          credit_card_cvv: creditCardInfo.cardCvv
        },
        {
          headers: {
            public_key: process.env.REACT_APP_PaymentKEY_MEMBER,
            'x-payments-os-env': process.env.REACT_APP_PaymentENV,
            'Content-type': 'application/json',
            app_id: process.env.REACT_APP_PaymentAPPID_MEMBER,
            'api-version': '1.3.0'
          }
        }
      );
      console.log(res.data);
      let params = {
        cardCvv: creditCardInfo.cardCvv,
        cardMmyy: creditCardInfo.cardMmyy,
        cardNumber: creditCardInfo.cardNumber,
        cardOwner: creditCardInfo.cardOwner,
        cardType: res.data.card_type,
        customerId: this.userInfo ? this.userInfo.customerId : '',
        email: creditCardInfo.email,
        phoneNumber: creditCardInfo.phoneNumber,
        vendor: res.data.vendor,
        id: creditCardInfo.id ? creditCardInfo.id : '',
        isDefault: creditCardInfo.isDefault ? '1' : '0',
        paymentType: 'PAYU'
      };
      console.log(1);
      let addRes = await addOrUpdatePaymentMethod(params);
      console.log(2);
      this.setState({
        loading: false
      });
      this.handleCancel();
    } catch (e) {
      console.log(e.response);
      let res = e.response;

      this.setState({
        loading: false
      });
      if (res) {
        console.log(
          res.data.more_info,
          'body/expiration_date should match pattern "^(0[1-9]|1[0-2])(/|-|.| )d{2,4}"'
        );
        if (
          res.data.more_info.indexOf(
            'body/credit_card_cvv should match pattern'
          ) !== -1
        ) {
          this.showErrorMsg(this.props.intl.messages.cardCvvIsInvalid);
        } else if (
          res.data.more_info.indexOf(
            'body/card_number should match pattern'
          ) !== -1
        ) {
          this.showErrorMsg(this.props.intl.messages.cardNumberIsInvalid);
        } else if (
          res.data.more_info.indexOf(
            'body/expiration_date should match pattern'
          ) !== -1
        ) {
          this.showErrorMsg(this.props.intl.messages.expirationDateIsInvalid);
        } else {
          this.showErrorMsg(res.data.description);
        }
        return;
      }
      this.showErrorMsg(this.props.intl.messages.saveFailed);
    }
  }
  handleCancel = () => {
    const { history } = this.props;
    history.push('/account/paymentMethod');
  };

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message
    });
    this.scrollToErrorMsg();
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
    this.scrollToErrorMsg();
    setTimeout(() => {
      this.setState({
        successMsg: ''
      });
    }, 2000);
  };
  //定位
  scrollToErrorMsg() {
    const widget = document.querySelector('.billing-payment');
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo(this.getElementToPageTop(widget), 0);
    }
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  render() {
    const { addressForm, creditCardInfo } = this.state;
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
          <img key={idx} className="logo-payment-card" src={el} alt=""/>
        ))}
      </span>
    );
    return (
      <div>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              {this.state.loading ? <Loading positionFixed="true" /> : null}
              <SideMenu type="PaymentMethod" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="billing-payment">
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
                  <div
                    className="rc-list__accordion-item border-0"
                    data-method-id="CREDIT_CARD"
                    style={{
                      display: 'block'
                    }}
                  >
                    <div className="rc-border-colour--interface checkout--padding">
                      <div
                        className="credit-card-content"
                        id="credit-card-content"
                        style={{
                          display: 'block'
                        }}
                      >
                        <div className="credit-card-form ">
                          <div className="rc-margin-bottom--xs">
                            <div className="content-asset">
                              <p>
                                <FormattedMessage id="payment.acceptCards" />
                                {CreditCardImg}
                              </p>
                            </div>
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label
                                    className="form-control-label"
                                    htmlFor="cardNumber"
                                  >
                                    <FormattedMessage id="payment.cardNumber" />
                                    *
                                    <div className="cardFormBox">
                                      <span className="cardImage">
                                        <img
                                          alt="Card"
                                          src="https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                                        />
                                      </span>
                                      <span className="cardForm">
                                        <div className="row">
                                          <div className="col-sm-5">
                                            <div className="form-group required">
                                              <span
                                                className="rc-input rc-input--full-width"
                                                input-setup="true"
                                              >
                                                <input
                                                  type="text"
                                                  className="rc-input__control form-control email"
                                                  id="number"
                                                  value={
                                                    creditCardInfo.cardNumber
                                                  }
                                                  onChange={(e) =>
                                                    this.cardInfoInputChange(e)
                                                  }
                                                  name="cardNumber"
                                                  maxLength="254"
                                                  placeholder={
                                                    this.props.intl.messages
                                                      .findLocation
                                                  }
                                                />
                                              </span>
                                              <div className="invalid-feedback ui-position-absolute">
                                                <FormattedMessage id="payment.errorInfo2" />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-sm-4">
                                            <div className="form-group required">
                                              <span
                                                className="rc-input rc-input--full-width"
                                                input-setup="true"
                                                data-js-validate=""
                                                data-js-warning-message="*Phone Number isn’t valid"
                                              >
                                                <input
                                                  type="tel"
                                                  className="rc-input__control form-control phone"
                                                  min-lenght="18"
                                                  max-length="18"
                                                  data-phonelength="18"
                                                  data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                                  data-range-error="The phone number should contain 10 digits"
                                                  value={
                                                    creditCardInfo.cardMmyy
                                                  }
                                                  onChange={(e) =>
                                                    this.cardInfoInputChange(e)
                                                  }
                                                  name="cardMmyy"
                                                  maxLength="5"
                                                  placeholder={
                                                    this.props.intl.messages
                                                      .MMYY
                                                  }
                                                />
                                              </span>
                                              <div className="invalid-feedback ui-position-absolute">
                                                The field is required.
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-sm-3">
                                            <div className="form-group required">
                                              <span
                                                className="rc-input rc-input--full-width"
                                                input-setup="true"
                                                data-js-validate=""
                                                data-js-warning-message="*Phone Number isn’t valid"
                                              >
                                                <input
                                                  type="tel"
                                                  className="rc-input__control form-control phone"
                                                  data-phonelength="18"
                                                  data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                                  data-range-error="The phone number should contain 10 digits"
                                                  value={creditCardInfo.cardCvv}
                                                  onChange={(e) =>
                                                    this.cardInfoInputChange(e)
                                                  }
                                                  name="cardCvv"
                                                  maxLength="4"
                                                  placeholder="CVV"
                                                />
                                              </span>
                                              <div className="invalid-feedback ui-position-absolute">
                                                The field is required.
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="row overflow_visible">
                              <div className="col-sm-12">
                                <div className="form-group required">
                                  <label className="form-control-label">
                                    <FormattedMessage id="payment.cardOwner" />
                                  </label>
                                  <span
                                    className="rc-input rc-input--full-width"
                                    input-setup="true"
                                  >
                                    <input
                                      type="text"
                                      id="cardholder-name"
                                      className="rc-input__control form-control cardOwner"
                                      name="cardOwner"
                                      value={creditCardInfo.cardOwner}
                                      onChange={(e) =>
                                        this.cardInfoInputChange(e)
                                      }
                                      onBlur={(e) => this.inputBlur(e)}
                                      maxLength="40"
                                    />
                                    <label
                                      className="rc-input__label"
                                      htmlFor="cardOwner"
                                    ></label>
                                  </span>
                                  <div className="invalid-feedback">
                                    <FormattedMessage id="payment.errorInfo2" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="form-group required">
                                  <label className="form-control-label">
                                    <FormattedMessage id="payment.email" />
                                  </label>
                                  <span
                                    className="rc-input rc-input--full-width"
                                    input-setup="true"
                                  >
                                    <input
                                      type="email"
                                      className="rc-input__control email"
                                      id="email"
                                      value={creditCardInfo.email}
                                      onChange={(e) =>
                                        this.cardInfoInputChange(e)
                                      }
                                      onBlur={(e) => this.inputBlur(e)}
                                      name="email"
                                      maxLength="254"
                                    />
                                    <label
                                      className="rc-input__label"
                                      htmlFor="email"
                                    ></label>
                                  </span>
                                  <div className="invalid-feedback">
                                    <FormattedMessage id="payment.errorInfo2" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group required">
                                  <label
                                    className="form-control-label"
                                    htmlFor="phoneNumber"
                                  >
                                    <FormattedMessage id="payment.phoneNumber" />
                                  </label>
                                  <span
                                    className="rc-input rc-input--full-width"
                                    input-setup="true"
                                    data-js-validate=""
                                    data-js-warning-message="*Phone Number isn’t valid"
                                  >
                                    <input
                                      type="number"
                                      className="rc-input__control input__phoneField shippingPhoneNumber"
                                      min-lenght="18"
                                      max-length="18"
                                      data-phonelength="18"
                                      // data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                      data-js-pattern="(^\d{10}$)"
                                      data-range-error="The phone number should contain 10 digits"
                                      value={creditCardInfo.phoneNumber}
                                      onChange={(e) =>
                                        this.cardInfoInputChange(e)
                                      }
                                      onBlur={(e) => this.inputBlur(e)}
                                      name="phoneNumber"
                                      maxLength="2147483647"
                                    />
                                    <label
                                      className="rc-input__label"
                                      htmlFor="phoneNumber"
                                    ></label>
                                  </span>
                                  <div className="invalid-feedback">
                                    <FormattedMessage id="payment.errorInfo2" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                className="rc-input rc-input--inline"
                                style={{
                                  marginTop: '12px',
                                  float: 'left',
                                  maxWidth: 'none'
                                }}
                                onClick={() => {
                                  creditCardInfo.isDefault = !creditCardInfo.isDefault;
                                  this.setState({ creditCardInfo });
                                }}
                              >
                                {creditCardInfo.isDefault ? (
                                  <input
                                    type="checkbox"
                                    className="rc-input__checkbox"
                                    value={creditCardInfo.isDefault}
                                    key={1}
                                    checked
                                  />
                                ) : (
                                  <input
                                    type="checkbox"
                                    className="rc-input__checkbox"
                                    value={creditCardInfo.isDefault}
                                    key={2}
                                  />
                                )}
                                <label className="rc-input__label--inline text-break">
                                  <FormattedMessage id="setDefaultPaymentMethod" />
                                </label>
                              </div>
                              {/* </div> */}
                              <a
                                className="rc-styled-link editPersonalInfoBtn"
                                name="contactInformation"
                                onClick={() => this.handleCancel()}
                              >
                                <FormattedMessage id="cancel" />
                              </a>
                              &nbsp;
                              <FormattedMessage id="or" />
                              &nbsp;
                              <button
                                className="rc-btn rc-btn--one submitBtn editAddress"
                                data-sav="false"
                                name="contactInformation"
                                type="submit"
                                onClick={() => this.handleSave()}
                              >
                                <FormattedMessage id="save" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
export default injectIntl(ShippingAddressFrom);
