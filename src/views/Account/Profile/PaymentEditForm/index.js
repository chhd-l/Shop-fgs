import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import AdyenEditForm from '@/components/Adyen/form';
import {
  CREDIT_CARD_IMG_ENUM,
  CREDIT_CARD_IMGURL_ENUM,
  PAYMENT_METHOD_RULE
} from '@/utils/constant';
import { addOrUpdatePaymentMethod } from '@/api/payment';
import { validData } from '@/utils/utils';
import axios from 'axios';
import findIndex from 'lodash/findIndex';
import LazyLoad from 'react-lazyload';
import PaymentForm from '@/components/PaymentForm';
import { getProvincesList } from '@/api/index';

@inject('loginStore')
@injectIntl
@observer
class PaymentEditForm extends React.Component {
  static defaultProps = {
    paymentType: 'PAYU' // PAYU ADYEN CYBER(美国支付)
  };
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      saveLoading: false,
      creditCardInfoForm: {
        cardNumber: '',
        cardMmyy: '',
        cardCvv: '',
        cardOwner: '',
        email: '',
        phoneNumber: '',
        isDefault: false,
        paymentToken: '',
        paymentTransactionId: '',
        paymentCustomerId: ''
      },
      currentVendor: '1',
      isValid: false,

      // 組件
      paymentForm: {
        cardholderName: '',
        cardNumber: '',
        expirationMonth: '',
        expirationYear: '',
        securityCode: '',
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",//非必填
        country: "",
        state: "",
        city: "",
        zipCode: "",
        email: "",
        isSaveCard: true
      },
      monthList: [
        { name: '01', value: 1 },
        { name: '02', value: 2 },
        { name: '03', value: 3 },
        { name: '04', value: 4 },
        { name: '05', value: 5 },
        { name: '06', value: 6 },
        { name: '07', value: 7 },
        { name: '08', value: 8 },
        { name: '09', value: 9 },
        { name: '10', value: 10 },
        { name: '11', value: 11 },
        { name: '12', value: 12 },
      ],
      yearList: [
        { name: '2021', value: 2021 },
        { name: '2022', value: 2022 },
        { name: '2023', value: 2023 },
        { name: '2024', value: 2024 },
        { name: '2025', value: 2025 },
        { name: '2026', value: 2026 },
        { name: '2027', value: 2027 },
        { name: '2028', value: 2028 },
        { name: '2029', value: 2029 },
        { name: '2030', value: 2030 },
      ],
      countryList:[
        { name: 'Unite States', value: 'Unite States' },
      ],
      stateList:[],
    };
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  componentDidMount() {
    // 查询省份列表（美国：州）
    getProvincesList({ storeId: process.env.REACT_APP_STOREID }).then((res) => {
      this.setState({
        stateList: res.context.systemStates
      });
    });
  }
  cardInfoInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfoForm } = this.state;
    if (name === 'cardNumber') {
      let beforeValue = value.substr(0, value.length - 1);
      let inputValue = value.substr(value.length - 1, 1);
      if (isNaN(inputValue)) {
        creditCardInfoForm[name] = beforeValue;
      } else {
        creditCardInfoForm[name] = value.replace(/\s*/g, '');
      }
    } else if (name === 'cardMmyy') {
      // 获取 / 前后数字
      let splitArr = value.split('/');
      let noFormatStr = '';
      let finalValue = '';
      // 获得不带/的数字
      if (splitArr[1] || splitArr[0].length > 2) {
        noFormatStr = splitArr[0].concat(splitArr[1] ? splitArr[1] : '');
        finalValue = noFormatStr.slice(0, 2) + '/' + noFormatStr.slice(2);
      } else {
        noFormatStr = splitArr[0];
        finalValue = noFormatStr.slice(0, 2);
      }
      creditCardInfoForm[name] = finalValue;
    } else {
      creditCardInfoForm[name] = value;
    }
    if (['cardNumber', 'cardMmyy', 'cardCvv'].indexOf(name) === -1) {
      this.inputBlur(e);
    }
    this.setState({ creditCardInfoForm }, () => {
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
  // 实时获取卡类型
  cardNumberChange = async (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let cardNumber =
      value.replace(/\s*/g, '') || this.state.creditCardInfoForm.cardNumber;
    if (!cardNumber) {
      return false;
    }
    try {
      let res = await axios.post(
        'https://api.paymentsos.com/tokens',
        {
          token_type: 'credit_card',
          card_number: cardNumber,
          expiration_date: '12-20',
          credit_card_cvv: '888',
          holder_name: 'echo'
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
      console.log(res);
      this.setState({ currentVendor: res.data.vendor });
    } catch (e) {
      console.log(e);
    }
  };
  handleSave = async (e) => {
    e.preventDefault();
    const { creditCardInfoForm } = this.state;
    const { messages } = this.props.intl;
    this.setState({
      saveLoading: true
    });
    try {
      let res;
      res = await axios.post(
        'https://api.paymentsos.com/tokens',
        {
          token_type: 'credit_card',
          card_number: creditCardInfoForm.cardNumber,
          expiration_date: creditCardInfoForm.cardMmyy.replace(/\//, '-'),
          holder_name: creditCardInfoForm.cardOwner,
          credit_card_cvv: creditCardInfoForm.cardCvv
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
      if (!res.data.vendor) {
        throw new Error(messages.supportCardTypeMismatch);
      }

      await addOrUpdatePaymentMethod({
        storeId: process.env.REACT_APP_STOREID,
        customerId: this.userInfo ? this.userInfo.customerId : '',
        email: creditCardInfoForm.email,
        phone: creditCardInfoForm.phoneNumber,
        isDefault: creditCardInfoForm.isDefault ? '1' : '0',
        paymentToken: res ? res.data.token : '',
        paymentVendor: res ? res.data.vendor : '',
        pspName: 'PAYU'
      });
      this.handleCancel();
      this.props.refreshList();
    } catch (e) {
      let errMsg = e.message;
      const res = e.response;
      if (res) {
        const moreInfo = res.data.more_info;
        if (
          moreInfo.indexOf('body/credit_card_cvv should match pattern') !== -1
        ) {
          errMsg = messages.cardCvvIsInvalid;
        } else if (
          moreInfo.indexOf('body/card_number should match pattern') !== -1
        ) {
          errMsg = messages.cardNumberIsInvalid;
        } else if (
          moreInfo.indexOf('body/expiration_date should match pattern') !== -1
        ) {
          errMsg = messages.expirationDateIsInvalid;
        } else {
          errMsg = res.data.description;
        }
      }
      this.showErrorMsg(errMsg);
    } finally {
      this.setState({
        saveLoading: false
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
    }, 3000);
  };
  async validFormData() {
    try {
      await validData(PAYMENT_METHOD_RULE, this.state.creditCardInfoForm);
      this.setState({ isValid: true });
    } catch (err) {
      console.log(err);
      this.setState({ isValid: false });
    }
  }
  handleCancel = () => {
    this.props.hideMyself({ closeListPage: this.props.backPage === 'cover' });
  };

  //input输入事件
  handleInputChange = (e) => {
    const target = e.target;
    const { paymentForm } = this.state;
    const name = target.name;
    let value = '';
    value = target.value;
    paymentForm[name] = value;
    this.setState({ paymentForm }, () => {
      console.log(paymentForm, '--------handleInputChange');
    });
    this.inputBlur(e);
  };
  //select事件
  handleSelectedItemChange = (name, item) => {
    const { paymentForm } = this.state;
    paymentForm[name] = item.value;
    this.setState({ paymentForm }, () => {
      console.log(paymentForm, '--------handleSelectedItemChange');
    });
  };
  //checkbox事件
  handelCheckboxChange = (name) => {
    const { paymentForm } = this.state;
    paymentForm[name] = !paymentForm[name];
    this.setState(
      {
        paymentForm
      },
      () => {
        console.log(paymentForm, '--------handelCheckboxChange');
      }
    );
  };
  computedList(key) {
    let tmp = '';
    if (key == 'state') {
      tmp = this.state[`${key}List`].map((c) => {
        return {
          value: c.stateName,
          name: c.stateName
        };
      });
      tmp.unshift({ value: '', name: 'State' });
    }
    return tmp;
  }

  render() {
    const {
      creditCardInfoForm,
      errorMsg,
      successMsg,
      currentVendor,
      saveLoading
    } = this.state;
    const { paymentType } = this.props;

    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
          <LazyLoad key={idx}>
            <img key={idx} className="logo-payment-card" src={el} alt="" />
          </LazyLoad>
        ))}
      </span>
    );
    return (
      <div className="credit-card-content">
        {paymentType === 'ADYEN' && (
          <>
            <div className="content-asset">
              <div
                className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${errorMsg ? '' : 'hidden'
                  }`}
              >
                <aside
                  className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                  role="alert"
                >
                  <span className="pl-0">{errorMsg}</span>
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
                className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${successMsg ? '' : 'hidden'
                  }`}
                role="alert"
              >
                <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                  {successMsg}
                </p>
              </aside>
            </div>
            <AdyenEditForm
              showCancelBtn={true}
              queryList={this.props.refreshList}
              updateFormVisible={this.handleCancel}
              // updateInitStatus={this.updateInitStatus}
              enableStoreDetails={true}
              mustSaveForFutherPayments={true}
              showErrorMsg={this.showErrorMsg}
            />
          </>
        )}

        {paymentType === 'PAYU' && (
          <>
            <div className={`credit-card-form`}>
              <div className="rc-margin-bottom--xs">
                <div className="content-asset">
                  <div
                    className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${errorMsg ? '' : 'hidden'
                      }`}
                  >
                    <aside
                      className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                      role="alert"
                    >
                      <span className="pl-0">{errorMsg}</span>
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
                    className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${successMsg ? '' : 'hidden'
                      }`}
                    role="alert"
                  >
                    <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                      {successMsg}
                    </p>
                  </aside>
                  <p className="m-0">{CreditCardImg}</p>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label
                        className="form-control-label w-100"
                        htmlFor="cardNumber"
                      >
                        <FormattedMessage id="payment.cardNumber" />
                        <span className="red">*</span>
                        <div className="cardFormBox">
                          <span className="cardImage">
                            <LazyLoad>
                              <img
                                alt="Card"
                                src={
                                  CREDIT_CARD_IMG_ENUM[
                                  currentVendor && currentVendor.toUpperCase()
                                  ] ||
                                  'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                                }
                                className="img"
                              />
                            </LazyLoad>
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
                                      type="tel"
                                      className="rc-input__control form-control email"
                                      id="number"
                                      value={creditCardInfoForm.cardNumber}
                                      onChange={this.cardInfoInputChange}
                                      onKeyUp={this.cardNumberChange}
                                      name="cardNumber"
                                      maxLength="254"
                                      placeholder={
                                        this.props.intl.messages.cardNumber
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
                                      value={creditCardInfoForm.cardMmyy}
                                      onChange={this.cardInfoInputChange}
                                      name="cardMmyy"
                                      maxLength="5"
                                      placeholder={
                                        'MM/YY'
                                        // this.props.intl.messages.cardNumber
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
                                      type="password"
                                      className="rc-input__control form-control phone"
                                      data-phonelength="18"
                                      data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                      data-range-error="The phone number should contain 10 digits"
                                      value={creditCardInfoForm.cardCvv}
                                      onChange={this.cardInfoInputChange}
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
                        <label className="rc-input__label" htmlFor="email" />
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
                <div className="overflow-hidden">
                  <div className="text-right">
                    <div
                      className="rc-input rc-input--inline"
                      style={{
                        marginTop: '10px',
                        float: 'left',
                        textAlign: 'left',
                        maxWidth: '400px'
                      }}
                      onClick={() => {
                        creditCardInfoForm.isDefault = !creditCardInfoForm.isDefault;
                        this.setState({ creditCardInfoForm });
                      }}
                    >
                      {creditCardInfoForm.isDefault ? (
                        <input
                          type="checkbox"
                          className="rc-input__checkbox"
                          value={creditCardInfoForm.isDefault}
                          key="1"
                          checked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          className="rc-input__checkbox"
                          value={creditCardInfoForm.isDefault}
                          key="2"
                        />
                      )}
                      <label className="rc-input__label--inline text-break">
                        <FormattedMessage id="setDefaultPaymentMethod" />
                      </label>
                    </div>
                    <span
                      className="rc-styled-link editPersonalInfoBtn"
                      name="contactInformation"
                      onClick={this.handleCancel}
                    >
                      <FormattedMessage id="cancel" />
                    </span>
                    &nbsp;
                    <span>
                      <FormattedMessage id="or" />
                    </span>
                    &nbsp;
                    <button
                      className={`rc-btn rc-btn--one submitBtn editAddress ${saveLoading ? 'ui-btn-loading' : ''
                        }`}
                      data-sav="false"
                      name="contactInformation"
                      type="submit"
                      disabled={!this.state.isValid}
                      onClick={this.handleSave}
                    >
                      <FormattedMessage id="save" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
        }

        { paymentType === 'CYBER' && (
          <>
            <PaymentForm form={this.state.paymentForm}
              monthList={this.state.monthList}
              yearList={this.state.yearList}
              countryList={this.state.countryList}
              stateList={this.computedList('state')}
              handelCheckboxChange={this.handelCheckboxChange}
              handleInputChange={this.handleInputChange}
              handleSelectedItemChange={this.handleSelectedItemChange}
              inputBlur={this.inputBlur} />
          </>
        )
        }
      </div>
    );
  }
}

export default PaymentEditForm;
