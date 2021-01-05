import React from 'react';
import findIndex from 'lodash/findIndex';
import {
  CREDIT_CARD_IMG_ENUM,
  CREDIT_CARD_IMGURL_ENUM,
  PAYMENT_METHOD_RULE
} from '@/utils/constant';
import { validData, loadJS } from '@/utils/utils';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { scrollPaymentPanelIntoView } from '../modules/utils';
import PaymentComp from '../PaymentComp';

const sessionItemRoyal = window.__.sessionItemRoyal;
@inject('paymentStore')
@observer
class PayOs extends React.Component {
  static defaultProps = {
    isLogin: false,
    billingJSX: null,
    updateFormValidStatus: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      isCompleteCredit: false,
      creditCardInfoForm: {
        // cardNumber: "",
        // cardDate: "",
        // cardCVV: "",
        cardOwner: '',
        email: '',
        phoneNumber: '',
        identifyNumber: '111',
        creditDardCvv: ''
      },
      payosdata: {},
      selectedCardInfo: null,
      inited: false,
      hasEditedEmail: false,
      hasEditedPhone: false,
      hasEditedName: false,
      isValid: false,
      saveLoading: false
    };
    this.paymentCompRef = React.createRef();
  }
  componentDidMount() {
    const { isLogin } = this.props;
    const _this = this;
    if (isLogin) {
      loadJS({
        url: 'https://js.paymentsos.com/v2/0.0.1/token.min.js',
        callback: function () {
          window.POS.setPublicKey(process.env.REACT_APP_PaymentKEY_MEMBER);
          window.POS.setEnvironment(process.env.REACT_APP_PaymentENV);
          _this.setState({
            inited: true
          });
        }
      });
    } else {
      loadJS({
        url: 'https://js.paymentsos.com/v2/latest/secure-fields.min.js',
        callback: function () {
          window.POS.setPublicKey(process.env.REACT_APP_PaymentKEY_VISITOR);
          window.POS.setEnvironment(process.env.REACT_APP_PaymentENV);
          const style = {
            base: {
              secureFields: {
                width: 'calc(100% - 45px)'
              },
              pan: {
                display: 'inline-block',
                width: '50%'
              },
              expirationDate: {
                display: 'inline-block',
                width: '30%'
              },
              cvv: {
                display: 'inline-block',
                width: '20%'
              }
            }
          };
          window.POS.setStyle(style);
          window.POS.initSecureFields('card-secure-fields');
          try {
            document
              .getElementById('zoozIframe')
              .setAttribute('scrolling', 'no');
          } catch (e) {}
          if (document.getElementById('payment-form')) {
            document
              .getElementById('payment-form')
              .addEventListener('submit', function (event) {
                console.log(document.getElementById('cardholder-name'));
                event.preventDefault();
                const additionalData = {
                  holder_name: document.getElementById('cardholder-name').value // This field is mandatory
                };
                window.POS.createToken(additionalData, function (result) {
                  console.log(result, 'result');
                  // Grab the token here
                  sessionItemRoyal.set('payosdata', result);
                });
              });
          }
        }
      });
      this.setState({
        inited: true
      });
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    return null;
    const { creditCardInfoForm } = this.state;
    if (nextProps.selectedDeliveryAddress) {
      const {
        email: selectedEmail,
        phoneNumber: selectedPhone,
        firstName: selectedFirstName,
        lastName: selectedLastName
      } = nextProps.selectedDeliveryAddress;
      let {
        email: curEmail,
        phoneNumber: curPhone,
        cardOwner: curName
      } = creditCardInfoForm;
      const selectedName = [selectedFirstName, selectedLastName]
        .filter((n) => !!n)
        .join(' ');
      if (!this.state.hasEditedEmail && selectedEmail !== curEmail) {
        curEmail = selectedEmail;
      }
      if (!this.state.hasEditedPhone && selectedPhone !== curPhone) {
        curPhone = selectedPhone;
      }
      if (!this.state.hasEditedName && selectedName !== curName) {
        curName = selectedName;
      }
      this.setState(
        {
          creditCardInfoForm: Object.assign(this.state.creditCardInfoForm, {
            email: curEmail,
            phoneNumber: curPhone,
            cardOwner: curName
          })
        },
        () => {
          this.validFormData();
        }
      );
    }
  }
  cardInfoInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfoForm } = this.state;
    creditCardInfoForm[name] = value;
    this.inputBlur(e);
    this.setState({ creditCardInfoForm }, () => {
      this.props.onVisitorCardInfoChange(this.state.creditCardInfoForm);
      this.validFormData();
    });
    if (value) {
      if (name === 'email') {
        this.setState({ hasEditedEmail: true });
      }
      if (name === 'phoneNumber') {
        this.setState({ hasEditedPhone: true });
      }
      if (name === 'cardOwner') {
        this.setState({ hasEditedName: true });
      }
    }
  };
  inputBlur = (e) => {
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
  };
  async validFormData() {
    try {
      await validData(PAYMENT_METHOD_RULE, this.state.creditCardInfoForm);
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
    } finally {
      this.props.updateFormValidStatus(this.state.isValid);
    }
  }
  handleClickCardConfirm = () => {
    if (!this.state.isValid) {
      return false;
    }
    this.setState({ saveLoading: true });
    document.getElementById('payment-form').submit.click();
    let timer = setInterval(() => {
      try {
        let payosdata = JSON.parse(sessionItemRoyal.get('payosdata'));
        if (payosdata) {
          this.setState({
            payosdata
          });
          if (payosdata.category === 'client_validation_error') {
            this.props.showErrorMsg(payosdata.more_info);
            sessionItemRoyal.remove('payosdata');
          } else {
            // this.setState({ isCompleteCredit: true });
            this.props.onVisitorPayosDataConfirm(payosdata);
            scrollPaymentPanelIntoView();
          }
        }
      } catch (err) {
        this.props.showErrorMsg(
          sessionItemRoyal.get('payosdata')
            ? sessionItemRoyal.get('payosdata')
            : err.message.toString()
        );
        throw new Error();
      } finally {
        clearInterval(timer);
        this.setState({ saveLoading: false });
      }
    }, 1000);
  };
  onPaymentCompDataChange = (data) => {
    this.setState({ selectedCardInfo: data }, () => {
      this.props.onPaymentCompDataChange(data);
    });
  };
  render() {
    const { isLogin, billingJSX } = this.props;
    const {
      creditCardInfoForm,
      isValid,
      isCompleteCredit,
      saveLoading
    } = this.state;

    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
          <LazyLoad key={idx}>
            <img className="logo-payment-card" src={el} alt="" />
          </LazyLoad>
        ))}
      </span>
    );

    return (
      <>
        <div className="card payment-form Card-border rounded rc-border-colour--interface">
          <div className="card-body rc-padding--none">
            <form
              method="POST"
              data-address-mode="new"
              name="dwfrm_billing"
              id="dwfrm_billing"
            >
              <div className="billing-payment">
                <div className={`rc-list__accordion-item border-0`}>
                  {isLogin ? (
                    <div className="rc-border-colour--interface">
                      <PaymentComp
                        ref={this.paymentCompRef}
                        billingJSX={billingJSX}
                        getSelectedValue={this.onPaymentCompDataChange}
                        needReConfirmCVV={this.props.needReConfirmCVV}
                        selectedDeliveryAddress={
                          this.props.selectedDeliveryAddress
                        }
                        updateFormValidStatus={this.props.updateFormValidStatus}
                      />
                    </div>
                  ) : (
                    <>
                      {/* edit form */}
                      <div
                        className={`credit-card-content ${
                          !isCompleteCredit ? '' : 'hidden'
                        }`}
                        id="credit-card-content"
                      >
                        <div className="credit-card-form ">
                          <div className="rc-margin-bottom--xs">
                            <div className="content-asset">
                              <p>
                                <FormattedMessage id="payment.acceptCards" />
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
                                    <span className="red">*</span>
                                    {CreditCardImg}
                                    <form id="payment-form">
                                      <div id="card-secure-fields" />
                                      <button
                                        id="submit"
                                        name="submit"
                                        className="creadit"
                                        type="submit"
                                        style={{
                                          visibility: 'hidden',
                                          position: 'absolute'
                                        }}
                                      >
                                        Pay
                                      </button>
                                    </form>
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
                                      value={creditCardInfoForm.cardOwner}
                                      onChange={this.cardInfoInputChange}
                                      onBlur={this.inputBlur}
                                      maxLength="40"
                                    />
                                    <label
                                      className="rc-input__label"
                                      htmlFor="cardOwner"
                                    />
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
                                      value={creditCardInfoForm.email}
                                      onChange={this.cardInfoInputChange}
                                      onBlur={this.inputBlur}
                                      name="email"
                                      maxLength="254"
                                    />
                                    <label
                                      className="rc-input__label"
                                      htmlFor="email"
                                    />
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
                                      data-js-pattern="(^\d{10}$)"
                                      data-range-error="The phone number should contain 10 digits"
                                      value={creditCardInfoForm.phoneNumber}
                                      onChange={this.cardInfoInputChange}
                                      onBlur={this.inputBlur}
                                      name="phoneNumber"
                                      maxLength="2147483647"
                                    />
                                    <label
                                      className="rc-input__label"
                                      htmlFor="phoneNumber"
                                    />
                                  </span>
                                  <div className="invalid-feedback">
                                    <FormattedMessage id="payment.errorInfo2" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`creditCompleteInfoBox pb-3 ${
                          !isCompleteCredit ? 'hidden' : ''
                        }`}
                      >
                        <p>
                          <span
                            className="pull-right ui-cursor-pointer-pure mr-2"
                            onClick={() => {
                              this.setState({
                                isCompleteCredit: false
                              });
                            }}
                            style={{
                              position: 'relative',
                              top: -9
                            }}
                          >
                            <FormattedMessage id="edit" />
                          </span>
                        </p>
                        <div className="row">
                          <div className="col-6 col-sm-3 d-flex flex-column justify-content-center ">
                            <LazyLoad>
                              <img
                                alt=""
                                className="PayCardImgFitScreen"
                                src={
                                  CREDIT_CARD_IMG_ENUM[
                                    this.state.payosdata.vendor
                                  ]
                                    ? CREDIT_CARD_IMG_ENUM[
                                        this.state.payosdata.vendor.toUpperCase()
                                      ]
                                    : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                                }
                              />
                            </LazyLoad>
                          </div>
                          <div className="col-12 col-sm-9 d-flex flex-column justify-content-around">
                            <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                              <div className="col-12 color-999">
                                <FormattedMessage id="name2" />
                                <br />
                                <span className="creditCompleteInfo">
                                  {creditCardInfoForm.cardOwner}
                                </span>
                              </div>
                            </div>
                            <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                              <div className="col-6 color-999">
                                <FormattedMessage id="payment.cardNumber2" />
                                <br />
                                <span className="creditCompleteInfo">
                                  xxxx xxxx xxxx{' '}
                                  {this.state.payosdata
                                    ? this.state.payosdata.last_4_digits
                                    : ''}
                                </span>
                              </div>
                              <div className="col-6 color-999">
                                <FormattedMessage id="payment.cardType" />
                                <br />
                                <span className="creditCompleteInfo">
                                  {this.state.payosdata.card_type}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        {billingJSX}
      </>
    );
  }
}

export default injectIntl(PayOs, { forwardRef: true });
