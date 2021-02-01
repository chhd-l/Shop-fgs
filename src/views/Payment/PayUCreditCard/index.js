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

function VisitorEditForm({
  creditCardInfoForm,
  onChange,
  onInputBlur
}) {

  return (
    <>
      <div className="row overflow_visible">
        <div className="col-sm-12">
          <div className="form-group required">
            <label className="form-control-label">
              <FormattedMessage id="payment.cardOwner" />
            </label>
            <span className="rc-input rc-input--full-width" input-setup="true">
              <input
                type="text"
                className="rc-input__control form-control cardOwner"
                name="cardOwner"
                value={creditCardInfoForm.cardOwner}
                onChange={onChange}
                onBlur={onInputBlur}
                maxLength="40"
              />
              <label className="rc-input__label" htmlFor="cardOwner" />
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
            <span className="rc-input rc-input--full-width" input-setup="true">
              <input
                type="email"
                className="rc-input__control email"
                id="email"
                value={creditCardInfoForm.email}
                onChange={onChange}
                onBlur={onInputBlur}
                name="email"
                maxLength="254"
              />
              <label className="rc-input__label" htmlFor="email" />
            </span>
            <div className="invalid-feedback">
              <FormattedMessage id="payment.errorInfo2" />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group required">
            <label className="form-control-label" htmlFor="phoneNumber">
              <FormattedMessage id="payment.phoneNumber" />
            </label>
            <span
              className="rc-input rc-input--full-width"
              input-setup="true"
              data-js-validate=""
              data-js-warning-message="*Phone Number isn’t valid"
            >
              <input
                type="text"
                className="rc-input__control input__phoneField shippingPhoneNumber"
                min-lenght="18"
                max-length="18"
                data-phonelength="18"
                data-js-pattern="(^\d{10}$)"
                data-range-error="The phone number should contain 10 digits"
                value={creditCardInfoForm.phoneNumber}
                onChange={onChange}
                onBlur={onInputBlur}
                name="phoneNumber"
                maxLength="2147483647"
              />
              <label className="rc-input__label" htmlFor="phoneNumber" />
            </span>
            <div className="invalid-feedback">
              <FormattedMessage id="payment.errorInfo2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
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
        }
      });
      this.setState({
        inited: true
      });
    }
    this.initForm();
  }
  initForm() {
    const {
      paymentStore: { defaultCardDataFromAddr: defaultVal }
    } = this.props;
    let tmpDefaultName = '';
    if (defaultVal) {
      const { firstName, lastName } = defaultVal;
      tmpDefaultName = [firstName, lastName].filter((n) => !!n).join(' ');
    }
    this.setState(
      {
        creditCardInfoForm: Object.assign(this.state.creditCardInfoForm, {
          cardOwner: tmpDefaultName || '',
          email: (defaultVal && defaultVal.email) || '',
          phoneNumber: (defaultVal && defaultVal.phoneNumber) || ''
        })
      },
      () => {
        this.validFormData();
      }
    );
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
  handleClickCardConfirm = async () => {
    try {
      const { creditCardInfoForm, isValid } = this.state;
      if (!isValid) {
        return false;
      }
      this.setState({ saveLoading: true });

      const tokenResult = await new Promise((resolve) => {
        window.POS.createToken(
          {
            holder_name: creditCardInfoForm.cardOwner // This field is mandatory
          },
          function (result) {
            console.log(result, 'result');
            // Grab the token here
            resolve(result);
          }
        );
      });
      const payosdata = JSON.parse(tokenResult);
      if (payosdata) {
        this.setState({
          payosdata
        });
        if (payosdata.category === 'client_validation_error') {
          sessionItemRoyal.remove('payosdata');
          throw new Error(payosdata.more_info)
        } else {
          this.props.onVisitorPayosDataConfirm(payosdata);
          scrollPaymentPanelIntoView();
        }
      }
    } catch (err) {
      this.props.showErrorMsg(err.message);
      throw new Error();
    } finally {
      this.setState({ saveLoading: false });
    }
  };
  onPaymentCompDataChange = (data) => {
    this.setState({ selectedCardInfo: data }, () => {
      this.props.onPaymentCompDataChange(data);
    });
  };
  render() {
    const { isLogin, billingJSX, defaultCardDataFromAddr } = this.props;
    const { creditCardInfoForm } = this.state;

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
                        key={Object.values(defaultCardDataFromAddr || {}).join(
                          '|'
                        )}
                        ref={this.paymentCompRef}
                        billingJSX={billingJSX}
                        getSelectedValue={this.onPaymentCompDataChange}
                        needReConfirmCVV={this.props.needReConfirmCVV}
                        defaultCardDataFromAddr={defaultCardDataFromAddr}
                        updateFormValidStatus={this.props.updateFormValidStatus}
                      />
                    </div>
                  ) : (
                    <>
                      {/* edit form */}
                      <div className="credit-card-content">
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
                                    <form>
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
                            <VisitorEditForm
                              creditCardInfoForm={creditCardInfoForm}
                              onChange={this.cardInfoInputChange}
                              onInputBlur={this.inputBlur}
                            />
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