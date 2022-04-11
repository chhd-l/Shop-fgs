import React from 'react';
import findIndex from 'lodash/findIndex';
import { PAYMENT_METHOD_PAU_CHECKOUT_RULE } from '@/utils/constant';
import { validData, loadJS } from '@/utils/utils';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { queryIsSupportInstallMents } from '@/api/payment';
import { scrollPaymentPanelIntoView } from '../../modules/utils';
import MemberCardList from './MemberCardList';
import CardItemCover from './CardItemCover';
import InstallmentTable from './InstallmentTable';
import axios from 'axios';
import getCardImg from '@/lib/get-card-img';
import cn from 'classnames';

const sessionItemRoyal = window.__.sessionItemRoyal;

function VisitorEditForm({
  creditCardInfoForm,
  onChange,
  onInputBlur,
  needEmail,
  needPhone
}) {
  return (
    <>
      <div className="row overflow_visible">
        <div className="col-sm-12">
          <div className="form-group required">
            <label className="form-control-label" htmlFor="cardOwner">
              <FormattedMessage id="payment.cardOwner" />
            </label>
            <span className="rc-input rc-input--full-width" input-setup="true">
              <input
                type="text"
                autocomplete="off"
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
        {needEmail ? (
          <div className="col-sm-6">
            <div className="form-group required">
              <label className="form-control-label" htmlFor="email">
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
        ) : null}
        {needPhone ? (
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
                  autocomplete="off"
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
        ) : null}
      </div>
    </>
  );
}
@inject('paymentStore', 'checkoutStore')
@observer
class PayOs extends React.Component {
  static defaultProps = {
    isLogin: false,
    needEmail: true,
    needPhone: true,
    isSupportInstallMent: false,
    mustSaveForFutherPayments: false, // 是否将卡保存到后台
    billingJSX: null,
    updateFormValidStatus: () => {},
    onVisitorPayosDataConfirm: () => {},
    onInstallMentParamChange: () => {}
  };
  constructor(props) {
    super(props);
    this.state = {
      creditCardInfoForm: {
        cardNumber: '',
        cardMmyy: '',
        cardCvv: '',
        // cardDate: "",
        // cardCVV: "",
        cardOwner: '',
        email: '',
        phoneNumber: '',
        identifyNumber: '111',
        creditDardCvv: '',
        installmentChecked: false
      },
      payosdata: null,
      selectedCardInfo: null,
      inited: false,
      isValid: false,
      saveLoading: false,
      isEdit: true,
      installMentTableData: [], // 分期详情table data
      installMentParam: null, // 所选择的分期详情
      isCreditCardCheck: {
        cardNumber: 'NOT_TEST', //NOT_TEST：未开始检测 FAIL：测试不成功 SUCCESS：测试成功
        cardMmyy: 'NOT_TEST',
        cardCvv: 'NOT_TEST',
        cardOwner: 'NOT_TEST'
      },
      currentVendor: '1'
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
          window.POS.setPublicKey(window.__.env.REACT_APP_PaymentKEY_MEMBER);
          window.POS.setEnvironment(window.__.env.REACT_APP_PaymentENV);
          _this.setState({
            inited: true
          });
        }
      });
    } else {
      loadJS({
        url: 'https://js.paymentsos.com/v2/latest/secure-fields.min.js',
        callback: function () {
          window.POS.setPublicKey(window.__.env.REACT_APP_PaymentKEY_VISITOR);
          window.POS.setEnvironment(window.__.env.REACT_APP_PaymentENV);
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
    // this.initForm();
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  /**
   * 默认同步地址里相关信息
   */
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
  formatValue = (name, value) => {
    let finalValue = '';
    if (name === 'cardMmyy') {
      // 获取 / 前后数字
      // let splitArr = value.split('/');
      // let noFormatStr = '';

      // // 获得不带/的数字
      // if (splitArr[1] || splitArr[0].length > 2) {
      //   noFormatStr = splitArr[0].concat(splitArr[1] ? splitArr[1] : '');
      //   finalValue = noFormatStr.slice(0, 2) + '/' + noFormatStr.slice(2);
      // } else {
      //   noFormatStr = splitArr[0];
      //   finalValue = noFormatStr.slice(0, 2);
      // }
      let element = document.getElementById('cardMmyy');
      let maskOptions = [];
      let cardMmyyReg = [{ mask: '00/00' }];
      maskOptions = {
        mask: cardMmyyReg
      };
      IMask(element, maskOptions);
      finalValue = value;
    } else {
      finalValue = value;
    }
    return finalValue;
  };
  cardNumberChange = async (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let cardNumber =
      value.replace(/\s*/g, '') || this.state.creditCardInfoForm.cardNumber;

    try {
      let res = await axios.post(
        'https://api.paymentsos.com/tokens',
        {
          token_type: 'credit_card',
          card_number: cardNumber,
          expiration_date: '08-23',
          credit_card_cvv: '888',
          holder_name: 'echo'
        },
        {
          headers: {
            public_key: window.__.env.REACT_APP_PaymentKEY_MEMBER,
            'x-payments-os-env': window.__.env.REACT_APP_PaymentENV,
            'Content-type': 'application/json',
            app_id: window.__.env.REACT_APP_PaymentAPPID_MEMBER,
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
  cardInfoInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfoForm } = this.state;
    creditCardInfoForm[name] = this.formatValue(name, value);
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
  //给俄罗斯credit card表单重新写的方法
  inputBoxBlur = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    let result = '';
    let coverObj = {};
    let data = {};
    switch (key) {
      case 'cardNumber':
        if (value.length == 0) {
          result = 'NOT_TEST';
        } else {
          result = 'SUCCESS';
        }
        break;
      case 'cardMmyy':
        let splitArr = value.split('/');
        let arr = [];
        for (let i = 0; i < splitArr.length; i++) {
          arr.push(splitArr[i]);
        }
        if (arr.length == 1 && arr[0] === '') {
          result = 'NOT_TEST';
        } else if (
          arr.length == 2 &&
          arr[0].length == 2 &&
          arr[1].length == 2
        ) {
          result = 'SUCCESS';
        } else {
          result = 'FAIL';
        }
        break;
      case 'cardCvv':
        if (value.length === 0) {
          result = 'NOT_TEST';
        } else if (value.length >= 3 && value.length <= 4) {
          result = 'SUCCESS';
        } else {
          result = 'FAIL';
        }
        break;
      case 'cardOwner':
        if (value.length === 0) {
          result = 'NOT_TEST';
        } else {
          result = 'SUCCESS';
        }
        break;
    }
    coverObj[key] = result;
    data = Object.assign({}, this.state.isCreditCardCheck, coverObj);
    this.setState({ isCreditCardCheck: data });
  };
  async validFormData() {
    try {
      const { intl } = this.props;
      await validData({
        rule: PAYMENT_METHOD_PAU_CHECKOUT_RULE,
        data: this.state.creditCardInfoForm,
        intl
      });
      this.setState({ isValid: true });
    } catch (err) {
      this.setState({ isValid: false });
    } finally {
      this.props.updateFormValidStatus(this.state.isValid);
    }
  }

  handleClickCardConfirm = async () => {
    try {
      const { isSupportInstallMent } = this.props;
      const { creditCardInfoForm, isValid, isEdit, payosdata } = this.state;
      if (!isValid) {
        return false;
      }
      this.setState({ saveLoading: true });
      const isCountryRu = window.__.env.REACT_APP_COUNTRY === 'ru';
      let payosdataRes = {};
      let tokenResult = '';
      if (!payosdata) {
        if (isCountryRu) {
          tokenResult = await axios.post(
            'https://api.paymentsos.com/tokens',
            {
              token_type: 'credit_card',
              card_number: creditCardInfoForm.cardNumber.split(' ').join(''), //''4652035440667037''
              expiration_date: creditCardInfoForm.cardMmyy.replace(/\//, '-'), //'08-23'
              holder_name: creditCardInfoForm.cardOwner, //'J.Smith'
              credit_card_cvv: creditCardInfoForm.cardCvv //'971'
            },
            {
              headers: {
                public_key: window.__.env.REACT_APP_PaymentKEY_MEMBER,
                'x-payments-os-env': window.__.env.REACT_APP_PaymentENV,
                'Content-type': 'application/json',
                app_id: window.__.env.REACT_APP_PaymentAPPID_MEMBER,
                'api-version': '1.3.0'
              }
            }
          );
          payosdataRes = tokenResult.data;
        } else {
          tokenResult = await new Promise((resolve) => {
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
          payosdataRes = JSON.parse(tokenResult);
        }

        if (payosdataRes) {
          this.setState({
            payosdata: payosdataRes
          });
          if (payosdataRes.category === 'client_validation_error') {
            sessionItemRoyal.remove('payosdata');
            throw new Error(payosdataRes.more_info);
          } else {
            // 如果分期，则不直接返回封面，需要返回卡列表，进行分期查询
            if (isSupportInstallMent && isEdit) {
              this.setState({ isEdit: false });
              const res = await queryIsSupportInstallMents({
                platformName: 'PAYU',
                pspItemCode: 'payu_tu',
                binNumber: payosdataRes.bin_number, // 卡前6位
                payAmount: this.tradePrice,
                storeId: window.__.env.REACT_APP_STOREID
              });

              const installMentTableData =
                res?.context?.installments[0]?.installmentPrices || [];
              this.setState({
                installMentTableData
              });
              throw new Error('This Error No Display');
            }
          }
        }
      }
      this.props.onVisitorPayosDataConfirm(this.state.payosdata);
      // this.props.onInstallMentParamChange(this.state.installMentParam);
      scrollPaymentPanelIntoView();
    } catch (err) {
      if (err?.message !== 'This Error No Display') {
        this.setState({ payosdata: null });
        this.props.showErrorMsg(err.message);
      }
      throw new Error(err.message);
    } finally {
      this.setState({ saveLoading: false });
    }
  };
  onPaymentCompDataChange = (data) => {
    this.setState({ selectedCardInfo: data }, () => {
      this.props.onPaymentCompDataChange(data);
    });
  };
  onCheckboxChange(item) {
    const { key } = item;
    this.setState((curState) => ({
      creditCardInfoForm: Object.assign(curState.creditCardInfoForm, {
        [key]: !curState.creditCardInfoForm[key]
      })
    }));
  }
  installmentTableChanger = (data) => {
    this.setState({ installMentParam: data }, () => {
      this.props.onInstallMentParamChange(this.state.installMentParam);
    });
  };
  handleClickEditBtn = () => {
    this.setState({ isEdit: true, payosdata: null });
  };
  render() {
    const {
      isLogin,
      billingJSX,
      defaultCardDataFromAddr,
      needEmail,
      needPhone,
      paymentStore: { supportPaymentMethods }
    } = this.props;
    const {
      creditCardInfoForm,
      isEdit,
      isValid,
      saveLoading,
      payosdata,
      installMentTableData
    } = this.state;

    const CreditCardImg = supportPaymentMethods.length > 0 && (
      <span className="logo-payment-card-list logo-credit-card">
        {supportPaymentMethods.map((el, idx) => (
          <LazyLoad key={idx}>
            <img
              className="logo-payment-card"
              src={el.imgUrl}
              style={{
                width: window.__.env.REACT_APP_COUNTRY == 'ru' ? '50px' : '30px'
              }}
              alt="logo payment card"
            />
          </LazyLoad>
        ))}
      </span>
    );

    //俄罗斯表单专用
    const formListLabelColor = (commonStyle, type) => {
      return cn(
        commonStyle,
        {
          'text-black': this.state.isCreditCardCheck[type] === 'NOT_TEST'
        },
        {
          'text-red-500': this.state.isCreditCardCheck[type] === 'FAIL'
        },
        {
          'text-black': this.state.isCreditCardCheck[type] === 'SUCCESS'
        }
      );
    };

    const formListInputColor = (commonStyle, type) => {
      return cn(
        commonStyle,
        {
          'border border-gray-300':
            this.state.isCreditCardCheck[type] === 'NOT_TEST'
        },
        {
          'border-b-2 border-red-500':
            this.state.isCreditCardCheck[type] === 'FAIL'
        },
        {
          borderBottomLightGreen:
            this.state.isCreditCardCheck[type] === 'SUCCESS'
        }
      );
    };

    const formListInputIcon = (type) => {
      return (
        <>
          {this.state.isCreditCardCheck[type] === 'SUCCESS' ? (
            <div className={cn('font-bold text-md absolute top-3 right-3')}>
              <svg
                fill="#0ABF53"
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
              >
                <path d="M6.50025408,13.5007781 C6.23625408,13.5007781 5.98125408,13.3967781 5.79325408,13.2077781 L2.79325408,10.2077781 C2.40225408,9.81677809 2.40225408,9.18477809 2.79325408,8.79377809 C3.18425408,8.40277809 3.81625408,8.40277809 4.20725408,8.79377809 L6.34525408,10.9307781 L11.6682541,2.94577809 C11.9742541,2.48677809 12.5942541,2.36077809 13.0552541,2.66877809 C13.5142541,2.97477809 13.6382541,3.59577809 13.3322541,4.05577809 L7.33225408,13.0557781 C7.16625408,13.3047781 6.89625408,13.4667781 6.59925408,13.4957781 C6.56525408,13.4997781 6.53325408,13.5007781 6.50025408,13.5007781"></path>
              </svg>
            </div>
          ) : null}
          {this.state.isCreditCardCheck[type] === 'FAIL' ? (
            <div className={cn('font-bold text-md absolute top-3 right-3')}>
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                fill="#D10244"
              >
                <path d="M16,8 C16,9.44086038 15.6397848,10.7741935 14.9193548,12 C14.1989249,13.2258065 13.2258065,14.1989249 12,14.9193548 C10.7741935,15.6397848 9.44086038,16 8,16 C6.55913962,16 5.22580645,15.6397848 4,14.9193548 C2.77419355,14.1989249 1.8010751,13.2258065 1.08064516,12 C0.360215218,10.7741935 0,9.44086038 0,8 C0,6.55913962 0.360215218,5.22580645 1.08064516,4 C1.8010751,2.77419355 2.77419355,1.8010751 4,1.08064516 C5.22580645,0.360215218 6.55913962,0 8,0 C9.44086038,0 10.7741935,0.360215218 12,1.08064516 C13.2258065,1.8010751 14.1989249,2.77419355 14.9193548,4 C15.6397848,5.22580645 16,6.55913962 16,8 Z M8.01612903,10 C7.60308539,10 7.24982468,10.1467391 6.95634642,10.4402174 C6.66286816,10.7336957 6.51612903,11.0869564 6.51612903,11.5 C6.51612903,11.9130436 6.66286816,12.2663043 6.95634642,12.5597826 C7.24982468,12.8532609 7.60308539,13 8.01612903,13 C8.42917268,13 8.78243338,12.8532609 9.07591164,12.5597826 C9.3693899,12.2663043 9.51612903,11.9130436 9.51612903,11.5 C9.51612903,11.0869564 9.3693899,10.7336957 9.07591164,10.4402174 C8.78243338,10.1467391 8.42917268,10 8.01612903,10 Z M6.58064516,3.41935484 L6.83870968,7.80645161 C6.83870968,7.89247328 6.87634425,7.97311844 6.9516129,8.0483871 C7.02688156,8.12365575 7.11827973,8.16129032 7.22580645,8.16129032 L8.77419355,8.16129032 C8.88172027,8.16129032 8.97311844,8.12365575 9.0483871,8.0483871 C9.12365575,7.97311844 9.16129032,7.89247328 9.16129032,7.80645161 L9.41935484,3.41935484 C9.41935484,3.29032258 9.38172027,3.18817188 9.30645161,3.11290323 C9.23118296,3.03763457 9.13978478,3 9.03225806,3 L6.96774194,3 C6.86021522,3 6.76881704,3.03763457 6.69354839,3.11290323 C6.61827973,3.18817188 6.58064516,3.29032258 6.58064516,3.41935484 Z"></path>
              </svg>
            </div>
          ) : null}
        </>
      );
    };

    const formListInputError = (errMsg, type) => {
      return this.state.isCreditCardCheck[type] === 'FAIL' ? (
        <div className="text-red-500 my-1 whitespace-nowrap">{errMsg}</div>
      ) : null;
    };
    //俄罗斯表单专用

    // 分期按钮显示控制
    const checkboxList = [
      {
        key: 'installmentChecked',
        id: 'id-payu-installment',
        langKey: 'payment.installment',
        value: creditCardInfoForm.installmentChecked,
        visible: installMentTableData.length > 0,
        showInstallMentTable: creditCardInfoForm.installmentChecked
      }
    ].filter((c) => c.visible);
    return (
      <>
        <div className="card payment-form Card-border rounded rc-border-colour--interface border-0">
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
                      <MemberCardList
                        {...this.props}
                        key={Object.values(defaultCardDataFromAddr || {}).join(
                          '|'
                        )}
                        ref={this.paymentCompRef}
                        mustSaveForFutherPayments={
                          this.props.mustSaveForFutherPayments
                        }
                        isSupportInstallMent={this.props.isSupportInstallMent}
                        needEmail={needEmail}
                        needPhone={needPhone}
                        billingJSX={billingJSX}
                        getSelectedValue={this.onPaymentCompDataChange}
                        onInstallMentParamChange={
                          this.props.onInstallMentParamChange
                        }
                        onVisitorPayosDataConfirm={
                          this.props.onVisitorPayosDataConfirm
                        }
                        needReConfirmCVV={this.props.needReConfirmCVV}
                        defaultCardDataFromAddr={defaultCardDataFromAddr}
                        updateFormValidStatus={this.props.updateFormValidStatus}
                        inited={this.state.inited}
                      />
                    </div>
                  ) : window.__.env.REACT_APP_COUNTRY == 'ru' ? (
                    <div className="credit-card-form">
                      <div className="rc-margin-bottom--xs">
                        <div className="content-asset">
                          <p className="m-0">{CreditCardImg}</p>
                        </div>
                        <div className="flex h-20 mb-2">
                          <div className="w-100">
                            <div className="form-group">
                              <label
                                className={formListLabelColor(
                                  'form-control-label text-black text-xs font-normal',
                                  'cardNumber'
                                )}
                                htmlFor="cardNumber"
                              >
                                <FormattedMessage id="payment.cardNumber" />
                                <span className="red">*</span>
                                <div className="ru-cardFrom cardFormBox mt-1">
                                  <span className="w-full cardForm relative">
                                    <div className="flex">
                                      <div className="w-100">
                                        <div className="core form-group required">
                                          <span
                                            className="rc-input rc-input--full-width"
                                            input-setup="true"
                                          >
                                            <input
                                              type="tel"
                                              autocomplete="off"
                                              className={formListInputColor(
                                                'form-control email h-10 pl-3 py-0 border border-gray-300 rounded-md placeholder-gray-300',
                                                'cardNumber'
                                              )}
                                              id="number"
                                              value={creditCardInfoForm.cardNumber
                                                .replace(/\s/g, '')
                                                .replace(
                                                  /(\d{4})(?=\d)/g,
                                                  '$1 '
                                                )}
                                              onChange={
                                                this.cardInfoInputChange
                                              }
                                              onKeyUp={this.cardNumberChange}
                                              onBlur={this.inputBoxBlur}
                                              name="cardNumber"
                                              placeholder={
                                                this.props.intl?.messages
                                                  .cardNumber
                                              }
                                            />
                                          </span>
                                          {formListInputError(
                                            'неверный номер карты.',
                                            'cardNumber'
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <span className="cardImage absolute top-2 right-0">
                                      <LazyLoad>
                                        <img
                                          alt="Card image"
                                          src={getCardImg({
                                            supportPaymentMethods,
                                            currentVendor:
                                              this.state.currentVendor
                                          })}
                                          className="img"
                                        />
                                      </LazyLoad>
                                    </span>
                                  </span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row mb-0 w-100 mx-0 flex-nowrap h-20">
                          <label
                            className={formListLabelColor(
                              'form-control-label my-0 w-1/2 text-black text-xs font-normal',
                              'cardMmyy'
                            )}
                            htmlFor="cardNumber"
                          >
                            Дата окончания
                            <span className="red">*</span>
                            <div className="core form-group required mt-1">
                              <span
                                className="rc-input rc-input--full-width"
                                input-setup="true"
                              >
                                <input
                                  type="tel"
                                  autocomplete="off"
                                  className={formListInputColor(
                                    'rc-text-colour--iconography font-thin form-control  phone border border-gray-300 rounded-md h-10 pl-3 py-0 placeholder-gray-300',
                                    'cardMmyy'
                                  )}
                                  min-lenght="18"
                                  max-length="18"
                                  value={creditCardInfoForm.cardMmyy}
                                  onChange={this.cardInfoInputChange}
                                  onBlur={this.inputBoxBlur}
                                  name="cardMmyy"
                                  maxLength="5"
                                  placeholder={'MM/YY'}
                                  id="cardMmyy"
                                />
                                {formListInputIcon('cardMmyy')}
                              </span>
                              {formListInputError(
                                'Неверная дата окончания.',
                                'cardMmyy'
                              )}
                            </div>
                          </label>
                          <div className="w-5"></div>
                          <label
                            className={formListLabelColor(
                              'form-control-label my-0 w-1/2 text-black text-xs font-normal',
                              'cardCvv'
                            )}
                            htmlFor="cardNumber"
                          >
                            CVV
                            <span className="red">*</span>
                            <div className="core form-group required mt-1">
                              <span
                                className="rc-input rc-input--full-width relative"
                                input-setup="true"
                              >
                                <input
                                  type="password"
                                  autocomplete="off"
                                  className={formListInputColor(
                                    'form-control phone  rounded-md h-10 pl-3 py-0 placeholder-gray-300',
                                    'cardCvv'
                                  )}
                                  value={creditCardInfoForm.cardCvv}
                                  onChange={this.cardInfoInputChange}
                                  onBlur={this.inputBoxBlur}
                                  name="cardCvv"
                                  maxLength="4"
                                  placeholder="CVV"
                                />
                                {formListInputIcon('cardCvv')}
                              </span>
                              {formListInputError(
                                'Неверный код безопасности.',
                                'cardCvv'
                              )}
                            </div>
                          </label>
                        </div>
                        <div className="flex overflow_visible">
                          <div className="w-100">
                            <label
                              className={formListLabelColor(
                                'form-control-label my-0 w-full text-black text-xs font-normal',
                                'cardOwner'
                              )}
                              htmlFor="cardNumber"
                            >
                              <FormattedMessage id="payment.cardOwner" />
                              <span className="red">*</span>
                              <div className="core form-group required mt-1">
                                <span
                                  className="rc-input rc-input--full-width"
                                  input-setup="true"
                                >
                                  <input
                                    type="text"
                                    className={formListInputColor(
                                      'rc-text-colour--iconography font-thin form-control cardOwner border border-gray-300 rounded-md h-10 pl-3 py-0 placeholder-gray-300',
                                      'cardOwner'
                                    )}
                                    autocomplete="off"
                                    name="cardOwner"
                                    value={creditCardInfoForm.cardOwner}
                                    onChange={this.cardInfoInputChange}
                                    onBlur={this.inputBoxBlur}
                                    maxLength="40"
                                    placeholder="SERGEY IVANOV"
                                  />
                                  {formListInputIcon('cardOwner')}
                                </span>
                                {formListInputError(
                                  'поле необходимо заполнить.',
                                  'cardOwner'
                                )}
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* edit form */}
                      <div
                        className={`credit-card-content ${
                          isEdit ? '' : 'hidden'
                        }`}
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
                              needEmail={needEmail}
                              needPhone={needPhone}
                              creditCardInfoForm={creditCardInfoForm}
                              onChange={this.cardInfoInputChange}
                              onInputBlur={this.inputBlur}
                            />
                          </div>
                        </div>
                      </div>
                      {!isEdit && (
                        <>
                          <CardItemCover
                            el={{
                              paymentVendor: payosdata?.vendor,
                              holderName: payosdata?.holder_name,
                              lastFourDigits: payosdata?.last_4_digits,
                              cardType: payosdata?.card_type
                            }}
                            canEdit={true}
                            selectedSts={true}
                            lastItem={true}
                            needReConfirmCVV={false}
                            handleClickEditBtn={this.handleClickEditBtn}
                          />
                          {checkboxList.map((item, i) => (
                            <div className="row mt-3" key={i}>
                              <div className="col-12">
                                <div className="rc-input rc-input--inline w-100 mw-100">
                                  <input
                                    className="rc-input__checkbox"
                                    id={`id-payu-${item.key}`}
                                    name={`id-payu-${item.key}`}
                                    onChange={this.onCheckboxChange.bind(
                                      this,
                                      item
                                    )}
                                    type="checkbox"
                                    checked={item.value}
                                  />
                                  <label
                                    className="rc-input__label--inline text-break"
                                    htmlFor={`id-payu-${item.key}`}
                                  >
                                    <FormattedMessage id={item.langKey} />
                                  </label>
                                </div>
                              </div>
                              {item.showInstallMentTable ? (
                                <div className="col-12 mb-2">
                                  <InstallmentTable
                                    defaultValue={0}
                                    list={installMentTableData}
                                    onChange={this.installmentTableChanger}
                                  />
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </>
                      )}
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

export default PayOs;
// export default injectIntl(PayOs, { forwardRef: true });
