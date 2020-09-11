import React from 'react';
import { Link } from 'react-router-dom';
import { findIndex, find } from 'lodash';
import PaymentComp from '../PaymentComp';
import {
  CREDIT_CARD_IMG_ENUM,
  CREDIT_CARD_IMGURL_ENUM,
  PAYMENT_METHOD_RULE
} from '@/utils/constant';
import { validData } from '@/utils/utils';
import { injectIntl, FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('loginStore')
@injectIntl
@observer
class PayOs extends React.Component {
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
      isReadPrivacyPolicyInit: true,
      isEighteenInit: true,
      isReadPrivacyPolicy: false,
      isEighteen: false,
      selectedCardInfo: null,
      inited: false,
      hasEditedEmail: false,
      hasEditedPhone: false,
      hasEditedName: false,
      isValid: false
    };
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  componentDidMount() {
    const _this = this;
    if (this.isLogin) {
      loadJS('https://js.paymentsos.com/v2/0.0.1/token.min.js', function () {
        window.POS.setPublicKey(process.env.REACT_APP_PaymentKEY_MEMBER);
        window.POS.setEnvironment(process.env.REACT_APP_PaymentENV);
        _this.setState({
          inited: true
        });
      });
    } else {
      this.setState({
        inited: true
      });
    }
  }
  componentWillReceiveProps(nextProps) {
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
  cardInfoInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfoForm } = this.state;
    creditCardInfoForm[name] = value;
    this.inputBlur(e);
    this.setState({ creditCardInfoForm: creditCardInfoForm }, () => {
      this.props.onCardInfoChange(this.state.creditCardInfoForm);
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
  async validFormData() {
    try {
      await validData(PAYMENT_METHOD_RULE, this.state.creditCardInfoForm);
      this.setState({ isValid: true });
    } catch (err) {
      console.log(err);
      this.setState({ isValid: false });
    }
  }
  handleClickCardConfirm() {
    if (!this.state.isValid) {
      return false;
    }

    this.props.startLoading();
    document.getElementById('payment-form').submit.click();
    let timer = setInterval(() => {
      try {
        let payosdata = JSON.parse(sessionItemRoyal.get('payosdata'));
        if (payosdata) {
          this.props.endLoading();
          clearInterval(timer);
          this.setState(
            {
              payosdata: payosdata
            },
            () => {
              this.props.onPayosDataChange(this.state.payosdata);
            }
          );
          if (payosdata.category === 'client_validation_error') {
            this.props.showErrorMsg(payosdata.more_info);
            sessionItemRoyal.remove('payosdata');
          } else {
            this.setState({ isCompleteCredit: true });
          }
        }
      } catch (err) {
        this.props.showErrorMsg(
          sessionItemRoyal.get('payosdata')
            ? sessionItemRoyal.get('payosdata')
            : err.toString()
        );
        clearInterval(timer);
        this.props.endLoading();
      }
    }, 1000);
  }
  // 获取选中卡的token
  async getPayMentOSToken() {
    let selectedCard = this.state.selectedCardInfo;
    this.props.startLoading();
    try {
      let res = await axios.post(
        'https://api.paymentsos.com/tokens',
        {
          token_type: 'credit_card',
          card_number: selectedCard.cardNumber,
          expiration_date: selectedCard.cardMmyy.replace(/\//, '-'),
          holder_name: selectedCard.cardOwner,
          credit_card_cvv: selectedCard.cardCvv
        },
        {
          headers: {
            public_key: process.env.REACT_APP_PaymentKEY_VISITOR,
            'x-payments-os-env': process.env.REACT_APP_PaymentENV,
            'Content-type': 'application/json',
            app_id: process.env.REACT_APP_PaymentAPPID_VISITOR,
            'api-version': '1.3.0'
          }
        }
      );
      this.setState(
        {
          payosdata: res.data,
          creditCardInfoForm: Object.assign({}, selectedCard)
        },
        () => {
          this.props.onPayosDataChange(this.state.payosdata);
          this.props.onCardInfoChange(this.state.creditCardInfoForm);
        }
      );
    } catch (err) {
      this.props.endLoading();
      throw new Error(err);
    }
  }
  clickPay = async () => {
    if (!this.state.inited) {
      return false;
    }
    try {
      const { needReConfirmCVV } = this.props;
      let {
        isEighteen,
        isReadPrivacyPolicy,
        payosdata,
        selectedCardInfo
      } = this.state;
      if (this.isLogin) {
        if (
          needReConfirmCVV &&
          (!selectedCardInfo ||
            !selectedCardInfo.cardCvv ||
            !selectedCardInfo.id)
        ) {
          throw new Error(this.props.intl.messages['payment.errTip']);
        }
        if (
          !needReConfirmCVV &&
          (!selectedCardInfo || !selectedCardInfo.paymentMethod)
        ) {
          throw new Error(this.props.intl.messages['payment.errTip']);
        }
        this.props.startLoading();
        const result = await this.payUTokenPromise({
          cvv: selectedCardInfo.cardCvv,
          token: selectedCardInfo.paymentMethod.token
        });
        try {
          const parsedRes = JSON.parse(result);
          this.setState(
            {
              creditCardInfoForm: Object.assign({}, selectedCardInfo, {
                creditDardCvv: parsedRes.token
              })
            },
            () => {
              this.props.onCardInfoChange(this.state.creditCardInfoForm);
            }
          );
        } catch (err) {
          this.props.endLoading();
          throw new Error(err.message);
        }
      } else {
        if (!payosdata.token) {
          throw new Error(this.props.intl.messages.clickConfirmCardButton);
        }
      }

      if (!isEighteen || !isReadPrivacyPolicy) {
        this.setState({
          isEighteenInit: false,
          isReadPrivacyPolicyInit: false
        });
        throw new Error('agreement failed');
      }

      this.props.clickPay();
    } catch (err) {
      if (err.message !== 'agreement failed') {
        this.props.showErrorMsg(
          err.message ? err.message.toString() : err.toString()
        );
      }
      this.props.endLoading();
    }
  };
  // 获取token，避免传给接口明文cvv
  payUTokenPromise({ cvv, token }) {
    return new Promise((resolve) => {
      window.POS.tokenize(
        {
          token_type: 'card_cvv_code',
          credit_card_cvv: cvv,
          payment_method_token: token
        },
        function (result) {
          console.log('result obtained' + result);
          resolve(result);
        }
      );
    });
  }
  onPaymentCompDataChange = (data) => {
    this.setState({ selectedCardInfo: data }, () => {
      this.props.onPaymentCompDataChange(data);
    });
  };
  render() {
    const { creditCardInfoForm } = this.state;

    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
          <img key={idx} className="logo-payment-card" src={el} />
        ))}
      </span>
    );

    return (
      <>
        <div className="card payment-form ml-custom mr-custom Card-border p-3 rounded rc-border-all rc-border-colour--interface">
          <div className="card-body rc-padding--none">
            <form
              method="POST"
              data-address-mode="new"
              name="dwfrm_billing"
              id="dwfrm_billing"
            >
              <div className="billing-payment">
                <div
                  className={`rc-list__accordion-item border-0`}
                  data-method-id="CREDIT_CARD"
                >
                  {this.isLogin ? (
                    <div className="rc-border-colour--interface">
                      <PaymentComp
                        deliveryAddress={this.props.deliveryAddress}
                        getSelectedValue={this.onPaymentCompDataChange}
                        needReConfirmCVV={this.props.needReConfirmCVV}
                        selectedDeliveryAddress={
                          this.props.selectedDeliveryAddress
                        }
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        className={`credit-card-content ${
                          !this.state.isCompleteCredit ? '' : 'hidden'
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
                                      <div id="card-secure-fields"></div>
                                      <button
                                        id="submit"
                                        name="submit"
                                        className="creadit"
                                        type="submit"
                                        style={{ visibility: 'hidden' }}
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
                                      onChange={(e) =>
                                        this.cardInfoInputChange(e)
                                      }
                                      onBlur={(e) => this.inputBlur(e)}
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
                                    />
                                  </span>
                                  <div className="invalid-feedback">
                                    <FormattedMessage id="payment.errorInfo2" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12 rc-margin-y--xs rc-text--center">
                              <button
                                className="rc-btn rc-btn--two card-confirm"
                                id="card-confirm"
                                type="button"
                                onClick={() => this.handleClickCardConfirm()}
                                disabled={!this.state.isValid}
                              >
                                <FormattedMessage id="payment.confirmCard" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`creditCompleteInfoBox pb-3 ${
                          !this.state.isCompleteCredit ? 'hidden' : ''
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
                            <img
                              className="PayCardImgFitScreen"
                              src={
                                CREDIT_CARD_IMG_ENUM[
                                  this.state.payosdata.vendor
                                ]
                                  ? CREDIT_CARD_IMG_ENUM[
                                      this.state.payosdata.vendor
                                    ]
                                  : 'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                              }
                            />
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
        {/* 条款 */}
        <div className="footerCheckbox rc-margin-top--sm ml-custom mr-custom mt-3">
          <input
            className="form-check-input ui-cursor-pointer-pure"
            id="id-checkbox-cat-2"
            value=""
            type="checkbox"
            name="checkbox-2"
            onChange={() => {
              this.setState({
                isReadPrivacyPolicy: !this.state.isReadPrivacyPolicy,
                isReadPrivacyPolicyInit: false
              });
            }}
            checked={this.state.isReadPrivacyPolicy}
          />
          <label
            htmlFor="id-checkbox-cat-2"
            className="rc-input__label--inline ui-cursor-pointer-pure"
          >
            <FormattedMessage
              id="payment.confirmInfo3"
              values={{
                val1: (
                  <Link className="red" target="_blank" to="/privacypolicy">
                    Política de privacidad
                  </Link>
                ),
                val2: (
                  <Link className="red" target="_blank" to="/termuse">
                    la transferencia transfronteriza
                  </Link>
                )
              }}
            />
            <div
              className={`warning ${
                this.state.isReadPrivacyPolicy ||
                this.state.isReadPrivacyPolicyInit
                  ? 'hidden'
                  : ''
              }`}
            >
              <FormattedMessage id="payment.confirmInfo4" />
            </div>
          </label>
        </div>
        <div className="footerCheckbox ml-custom mr-custom">
          <input
            className="form-check-input ui-cursor-pointer-pure"
            id="id-checkbox-cat-1"
            value="Cat"
            type="checkbox"
            name="checkbox-2"
            onChange={() => {
              this.setState({
                isEighteen: !this.state.isEighteen,
                isEighteenInit: false
              });
            }}
            checked={this.state.isEighteen}
          />
          <label
            htmlFor="id-checkbox-cat-1"
            className="rc-input__label--inline ui-cursor-pointer-pure"
          >
            <FormattedMessage id="payment.confirmInfo1" />
            <div
              className={`warning ${
                this.state.isEighteen || this.state.isEighteenInit
                  ? 'hidden'
                  : ''
              }`}
            >
              <FormattedMessage id="login.secondCheck" />
            </div>
          </label>
        </div>
        <div className="place_order-btn card rc-bg-colour--brand4 pt-4">
          <div className="next-step-button">
            <div className="rc-text--right">
              {this.state.inited ? (
                <button
                  className={`rc-btn rc-btn--one submit-payment`}
                  type="submit"
                  name="submit"
                  value="submit-shipping"
                  onClick={this.clickPay}
                >
                  <FormattedMessage id="payment.further" />
                </button>
              ) : (
                <button
                  className={`rc-btn rc-btn--one submit-payment`}
                  type="submit"
                  name="submit"
                  value="submit-shipping"
                  disabled
                >
                  <FormattedMessage id="payment.further" />
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PayOs;

function loadJS(url, callback, dataSets) {
  var script = document.createElement('script'),
    fn = callback || function () {};
  script.type = 'text/javascript';
  script.charset = 'UTF-8';

  if (dataSets) {
    for (let key in dataSets) {
      script.dataset[key] = dataSets[key];
    }
  }
  //IE
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null;
        fn();
      }
    };
  } else {
    //其他浏览器
    script.onload = function () {
      fn();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
