import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import AdyenEditForm from '@/components/Adyen/form';
import { CREDIT_CARD_IMG_ENUM, PAYMENT_METHOD_RULE } from '@/utils/constant';
import { addOrUpdatePaymentMethod } from '@/api/payment';
import { getDictionary, validData } from '@/utils/utils';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import CyberPaymentForm from '@/components/CyberPaymentForm';
import CyberBillingAddress from '@/components/CyberBillingAddress';
import { getProvincesList } from '@/api/index';
import { usPaymentInfo } from '@/api/payment';
import Loading from '@/components/Loading';
import ValidationAddressModal from '@/components/validationAddressModal';
import { ADDRESS_RULE } from './utils/constant';
import visaImg from '@/assets/images/credit-cards/visa.svg';
import amexImg from '@/assets/images/credit-cards/amex.svg';
import mastercardImg from '@/assets/images/credit-cards/mastercard.svg';
import discoverImg from '@/assets/images/credit-cards/discover.svg';

const cardTypeImg = {
  visa: visaImg,
  mastercard: mastercardImg,
  amex: amexImg,
  discover: discoverImg
};

const CardTypeArr = {
  cyberVisa: '001',
  cyberMastercard: '002',
  cyberAmex: '003',
  cyberDiscover: '004'
};
const CardTypeName = {
  cyberVisa: 'Visa',
  cyberMastercard: 'Mastercard',
  cyberAmex: 'Amex',
  cyberDiscover: 'Discover'
};

@inject('loginStore')
@injectIntl
@observer
class PaymentEditForm extends React.Component {
  static defaultProps = {
    paymentType: 'PAYU', // PAYU ADYEN CYBER(美国支付)
    supportPaymentMethods: []
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
      isValidForm: false,

      // 組件
      paymentForm: {
        cardholderName: '', //Didier Valansot
        cardNumber: '', //4111111111111111
        expirationMonth: '', //2
        expirationYear: '', //2022
        securityCode: '', //000
        firstName: '', //Didier
        lastName: '', //Valansot
        address1: '', //add1
        address2: '', //add2非必填
        country: '',
        state: '', //Alabama
        city: '',
        zipCode: '', //10036
        postCode: '', //10036
        email: '', //didier.valansot@publicissapient.com
        isSaveCard: true

        // cardholderName: 'Didier Valansot', //Didier Valansot
        // cardNumber: '4111111111111111', //4111111111111111
        // expirationMonth: 2, //2
        // expirationYear: '2022', //2022
        // securityCode: '000', //000
        // firstName: 'Didier', //Didier
        // lastName: 'Didier', //Didier
        // address1: 'add1', //add1
        // address2: '', //add2非必填
        // country: '',
        // state: 'Alabama', //Alabama
        // city: '',
        // zipCode: '10036', //10036
        // email: 'didier.valansot@publicissapient.com', //didier.valansot@publicissapient.com
        // isSaveCard: true
      },
      monthList: [
        { name: 'month', value: '' },
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
        { name: '12', value: 12 }
      ],
      yearList: [
        { name: 'year', value: '' },
        { name: '2021', value: 2021 },
        { name: '2022', value: 2022 },
        { name: '2023', value: 2023 },
        { name: '2024', value: 2024 },
        { name: '2025', value: 2025 },
        { name: '2026', value: 2026 },
        { name: '2027', value: 2027 },
        { name: '2028', value: 2028 },
        { name: '2029', value: 2029 },
        { name: '2030', value: 2030 }
      ],
      // countryList: [],
      stateList: [],

      validationLoading: false, // 地址校验loading
      validationModalVisible: false, // 地址校验查询开关
      selectValidationOption: 'suggestedAddress',

      ValidationAddressData: {}, //用于validationAddress校验的参数组装

      validationAddress: '',

      errMsgObj: {},

      //CYBER支持的四种卡
      cardTypeArr: [
        {
          name: 'Visa',
          id: 'visa',
          cardTypeVal: 'cyberVisa'
        },
        {
          name: 'Mastercard',
          id: 'mastercard',
          cardTypeVal: 'cyberMastercard'
        },
        {
          name: 'Amex',
          id: 'amex',
          cardTypeVal: 'cyberAmex'
        },
        {
          name: 'Discover',
          id: 'discover',
          cardTypeVal: 'cyberDiscover'
        }
      ],
      cardTypeVal: '',
      btnLoading: false
    };
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  componentDidMount() {
    //查询国家
    getDictionary({ type: 'country' }).then((res) => {
      const { paymentForm } = this.state;
      let clist = [{ value: res[0]?.description, name: res[0]?.name }];
      this.setState({
        countryList: clist
      });
      paymentForm.countryId = res[0]?.id;
      paymentForm.country = res[0]?.description;
    });

    // 查询省份列表（美国：州）
    getProvincesList({ storeId: process.env.REACT_APP_STOREID }).then((res) => {
      this.setState({
        stateList: res.context.systemStates
      });
    });

    this.initCardType();
  }
  initCardType = () => {
    let cardTypeArr = [
      {
        name: 'Visa',
        id: 'visa',
        cardTypeVal: 'cyberVisa'
      },
      {
        name: 'Mastercard',
        id: 'mastercard',
        cardTypeVal: 'cyberMastercard'
      },
      {
        name: 'Amex',
        id: 'amex',
        cardTypeVal: 'cyberAmex'
      },
      {
        name: 'Discover',
        id: 'discover',
        cardTypeVal: 'cyberDiscover'
      }
    ];

    let cardType = 'Visa'; //默认Visa
    //各种支付component初始化方法
    var initCardType = {
      //cyber支付
      Visa: () => {
        this.setState({ cardTypeVal: 'cyberVisa' });
      },
      Mastercard: () => {
        this.setState({ cardTypeVal: 'cyberMastercard' });
      },
      Amex: () => {
        this.setState({ cardTypeVal: 'cyberAmex' });
      },
      discover: () => {
        this.setState({ cardTypeVal: 'cyberDiscover' });
      },
      none: () => {
        console.log('no payway');
      }
    };

    //默认第一个,如没有支付方式,就不初始化方法
    this.setState(
      {
        cardTypeArr
      },
      () => {
        initCardType[cardType]();
      }
    );
  };
  toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
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
        binNumber: res ? res.data.bin_number : '',
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
    this.toTop();
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
  inputBlur = async (e) => {
    const { errMsgObj } = this.state;
    const target = e.target;
    const targetRule = ADDRESS_RULE.filter((e) => e.key === target.name);
    const value = target.value;
    try {
      await validData(targetRule, { [target.name]: value });
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [target.name]: ''
        })
      });
    } catch (err) {
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [target.name]: err.message
        })
      });
    }
  };
  //select事件
  handleSelectedItemChange = (name, item) => {
    let errMsgObj = this.state.errMsgObj;
    const { paymentForm } = this.state;
    paymentForm[name] = item.value;
    let obj = Object.assign({}, errMsgObj, { [name]: '' }); //选择有值了，就清空没填提示
    this.setState({ paymentForm, errMsgObj: obj }, () => {
      console.log(paymentForm, '--------handleSelectedItemChange');
    });
  };
  //selct city特殊处理
  handleSelectedCityChange = (data) => {
    let errMsgObj = this.state.errMsgObj;
    const { paymentForm } = this.state;
    paymentForm.city = data.cityName;
    let obj = Object.assign({}, errMsgObj, { city: '' }); //选择有值了，就清空没填提示
    this.setState({ paymentForm, errMsgObj: obj }, () => {
      console.log(paymentForm, '--------handleSelectedCityChange');
    });
  };
  //checkbox事件
  handelCheckboxChange = (name) => {
    let errMsgObj = this.state.errMsgObj;
    const { paymentForm } = this.state;
    paymentForm[name] = !paymentForm[name];

    let obj = Object.assign({}, errMsgObj, { isSaveCard: '' }); //选择有值了，就清空没填提示
    this.setState(
      {
        paymentForm,
        errMsgObj: obj
      },
      () => {
        console.log(paymentForm, '--------handelCheckboxChange');
      }
    );
  };
  //转换optionList对象
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

  // 选择地址
  chooseValidationAddress = (e) => {
    this.setState({
      selectValidationOption: e.target.value
    });
  };
  // 获取地址验证查询到的数据
  getValidationData = async (data) => {
    this.setState({
      validationLoading: false
    });
    if (data && data != null) {
      // 获取并设置地址校验返回的数据
      this.setState({
        validationAddress: data
      });
    } else {
      // 不校验地址，进入下一步
      this.showNextPanel();
    }
  };
  // 确认选择地址,切换到下一个最近的未complete的panel
  async confirmValidationAddress() {
    let { paymentForm, selectValidationOption, validationAddress } = this.state;
    let oldPaymentForm = JSON.parse(JSON.stringify(paymentForm));
    this.setState({ btnLoading: true });
    if (selectValidationOption == 'suggestedAddress') {
      paymentForm.address1 = validationAddress.address1;
      paymentForm.address2 = validationAddress.address2;
      paymentForm.city = validationAddress.city;
      paymentForm.country = validationAddress.countryCode;
      paymentForm.zipCode = validationAddress.postalCode;
      paymentForm.postCode = validationAddress.postalCode;
      if (process.env.REACT_APP_Adyen_country === 'US') {
        paymentForm.state = validationAddress.provinceCode;
      }
    } else {
      this.setState({
        paymentForm: JSON.parse(JSON.stringify(oldPaymentForm))
      });
    }

    let params = Object.assign({}, paymentForm, {
      cardType: CardTypeArr[this.state.cardTypeVal] || '001', //默认visa
      paymentVendor: CardTypeName[this.state.cardTypeVal] || 'Visa'
    });

    try {
      const res = await usPaymentInfo(params);
      if (res.code == 'K-000000') {
        this.handleCancel();
        this.props.refreshList();
      }
    } catch (err) {
      this.showErrorMsg(err.message);
    } finally {
      this.setState({ btnLoading: false });
    }

    this.showNextPanel();
  }
  //CYBER支付save判断必填项是否已经全部填完
  cyberSaveIsAllRequiredFinished = () => {
    let errMsgObj = {};
    const paymentForm = this.state.paymentForm;
    // 表单验证是否通过
    if (!this.state.isValidForm) {
      this.toTop();
      return;
    }
    ADDRESS_RULE.forEach((item) => {
      if (
        Object.keys(paymentForm).indexOf(item.key) &&
        !paymentForm[item.key] &&
        item.require //必填项没值
      ) {
        errMsgObj[item.key] = true;
      }
    });

    if (Object.keys(errMsgObj).length > 0) {
      this.setState({ errMsgObj }, () => {
        //console.log(this.state.errMsgObj);
        this.toTop();
      });
    } else if (!this.state.paymentForm.isSaveCard) {
      let errMsgObj = Object.assign({}, this.state.errMsgObj, {
        isSaveCard: true
      });
      this.setState({ errMsgObj });
    } else {
      this.handleCyberSave();
    }
  };
  //CYBER支付保存event
  handleCyberSave = () => {
    const { paymentForm } = this.state;

    // 地址验证
    this.setState({
      validationLoading: true
    });

    // let ValidationAddressData = {};
    // ValidationAddressData['cityName'] = paymentForm.city;
    // ValidationAddressData['country'] = paymentForm.countryId;
    // ValidationAddressData['address1'] = paymentForm.address1;
    // ValidationAddressData['postCode'] = paymentForm.zipCode;
    // ValidationAddressData['province'] = paymentForm.state;

    // this.setState({ ValidationAddressData });

    setTimeout(() => {
      this.setState({
        validationModalVisible: true
      });
    }, 800);
  };
  // 确认校验地址后下一步操作
  showNextPanel = () => {
    this.setState({
      validationModalVisible: false
    });
    // 绑卡
  };

  handlePaymentTypeChange = (e) => {
    this.setState({ cardTypeVal: e.target.value }, () => {
      console.log(this.state.cardTypeVal);
    });
  };

  updateCyberBillingAddress = async (data) => {
    const { paymentForm } = this.state;
    try {
      if (!data?.formRule || (data?.formRule).length <= 0) {
        return;
      }
      await validData(data.formRule, data); // 数据验证
      data.zipCode = data.postCode;
      this.setState({
        isValidForm: true,
        paymentForm: Object.assign(paymentForm, data)
      });
    } catch (err) {
      console.error(' err msg: ', err);
    }
  };
  render() {
    const { supportPaymentMethods, needEmail, needPhone } = this.props;
    const {
      creditCardInfoForm,
      errorMsg,
      successMsg,
      currentVendor,
      saveLoading,
      paymentForm,
      ValidationAddressData,
      validationLoading,
      validationModalVisible,
      selectValidationOption,
      errMsgObj,
      cardTypeArr,
      cardTypeVal
    } = this.state;
    const { paymentType } = this.props;

    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {supportPaymentMethods.map((el, idx) => (
          <LazyLoad key={idx}>
            <img key={idx} className="logo-payment-card" src={el.img} alt="" />
          </LazyLoad>
        ))}
      </span>
    );
    return (
      <div className="credit-card-content">
        {paymentType === 'ADYEN' && (
          <div>
            <div className="content-asset">
              <div
                className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                  errorMsg ? '' : 'hidden'
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
                className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                  successMsg ? '' : 'hidden'
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
          </div>
        )}

        {paymentType === 'PAYU' && (
          <div className={`credit-card-form`}>
            <div className="rc-margin-bottom--xs">
              <div className="content-asset">
                <div
                  className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                    errorMsg ? '' : 'hidden'
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
                  className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                    successMsg ? '' : 'hidden'
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
                ) : null}
                {needPhone ? (
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
                ) : null}
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
                    <input
                      type="checkbox"
                      className="rc-input__checkbox"
                      // value={creditCardInfoForm.isDefault}
                      checked={creditCardInfoForm.isDefault}
                    />
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
                    className={`rc-btn rc-btn--one submitBtn editAddress ${
                      saveLoading ? 'ui-btn-loading' : ''
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
        )}

        {paymentType === 'CYBER' && (
          <div>
            <div className="content-asset">
              <div
                className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                  errorMsg ? '' : 'hidden'
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
                className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                  successMsg ? '' : 'hidden'
                }`}
                role="alert"
              >
                <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                  {successMsg}
                </p>
              </aside>
            </div>
            {/* CYBER支持卡类型，超过一种才显示此tab栏 */}
            {cardTypeArr.length > 1 && (
              <div>
                {cardTypeArr.map((item, i) => {
                  return (
                    <div className={`rc-input rc-input--inline`} key={i}>
                      <input
                        className="rc-input__radio"
                        id={`payment-info-${item.id}`}
                        value={item.cardTypeVal}
                        type="radio"
                        name="payment-info"
                        onChange={this.handlePaymentTypeChange}
                        checked={cardTypeVal === item.cardTypeVal}
                      />
                      <label
                        className="rc-input__label--inline"
                        htmlFor={`payment-info-${item.id}`}
                      >
                        {/* <FormattedMessage id={item.id} /> */}
                        <img
                          src={cardTypeImg[item.id]}
                          title={item.id}
                          style={{ width: '40px' }}
                          alt=""
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
            {/* ********************支付tab栏end********************************** */}
            <CyberPaymentForm
              form={this.state.paymentForm}
              errMsgObj={errMsgObj}
              monthList={this.state.monthList}
              yearList={this.state.yearList}
              handleInputChange={this.handleInputChange}
              handleSelectedItemChange={this.handleSelectedItemChange}
              inputBlur={this.inputBlur}
            />
            {/* <CyberBillingAddress
              form={this.state.paymentForm}
              errMsgObj={errMsgObj}
              countryList={this.state.countryList}
              stateList={this.computedList('state')}
              handleInputChange={this.handleInputChange}
              handleSelectedItemChange={this.handleSelectedItemChange}
              handleSelectedCityChange={this.handleSelectedCityChange}
              updateCyberBillingAddress={this.updateCyberBillingAddress}
            /> */}
            <CyberBillingAddress
              form={this.state.paymentForm}
              updateCyberBillingAddress={this.updateCyberBillingAddress}
            />
            {/* saveCard checkbox */}
            <div className="row">
              <div className="col-sm-6">
                <div
                  className="rc-input rc-input--inline"
                  onClick={() => this.handelCheckboxChange('isSaveCard')}
                >
                  {this.state.paymentForm.isSaveCard ? (
                    <input
                      type="checkbox"
                      className="rc-input__checkbox"
                      value={this.state.paymentForm.isSaveCard}
                      key="1"
                      checked
                    />
                  ) : (
                    <input
                      type="checkbox"
                      className="rc-input__checkbox"
                      value={this.state.paymentForm.isSaveCard}
                      key="2"
                    />
                  )}
                  <label className="rc-input__label--inline text-break">
                    <FormattedMessage id="cyber.form.saveFor" />
                  </label>
                  {this.state.errMsgObj.isSaveCard ? (
                    <div className="red-text">
                      <FormattedMessage id="cyber.form.theBox" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {/* 取消 确认 按钮 */}
            <div className="row" style={{ marginTop: '20px' }}>
              <div className="col-sm-3">
                <button
                  className="rc-btn rc-btn--two"
                  style={{ width: '200px' }}
                  onClick={this.handleCancel}
                >
                  Cancel
                </button>
              </div>
              <div className="col-sm-3"></div>
              <div className="col-sm-3">
                <button
                  className="rc-btn rc-btn--one"
                  style={{ width: '200px' }}
                  onClick={this.cyberSaveIsAllRequiredFinished}
                >
                  Save
                </button>
              </div>
              <div className="col-sm-3"></div>
            </div>
          </div>
        )}

        {/* 美国验证modal框 */}
        {validationLoading && <Loading positionFixed="true" />}
        {validationModalVisible && (
          <ValidationAddressModal
            btnLoading={this.state.btnLoading}
            address={paymentForm}
            updateValidationData={(res) => this.getValidationData(res)}
            selectValidationOption={selectValidationOption}
            handleChooseValidationAddress={(e) =>
              this.chooseValidationAddress(e)
            }
            hanldeClickConfirm={() => this.confirmValidationAddress()}
            validationModalVisible={validationModalVisible}
            close={() => {
              this.setState({
                validationModalVisible: false,
                validationLoading: false,
                saveLoading: false
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default PaymentEditForm;
