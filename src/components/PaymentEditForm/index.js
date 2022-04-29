//卡form表单
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import AdyenEditForm from '@/components/Adyen/form';
import { getDictionary, validData } from '@/utils/utils';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import CyberPaymentForm from '@/components/CyberPaymentForm';
import CyberBillingAddress from '@/components/CyberBillingAddress';
import { getProvincesList } from '@/api/address';
import {
  usPaymentInfo,
  usPayCardSubscription,
  addOrUpdatePaymentMethod,
  addOrUpdatePaymentMethodRu
} from '@/api/payment';
import Loading from '@/components/Loading';
import ValidationAddressModal from '@/components/validationAddressModal';
import { ADDRESS_RULE } from './utils/constant';
import IMask from 'imask';
import { cyberCardTypeToValue } from '@/utils/constant/cyber';
import getCardImg from '@/lib/get-card-img';

const localItemRoyal = window.__.localItemRoyal;

@inject('loginStore')
@injectIntl
@observer
class PaymentEditForm extends React.Component {
  static defaultProps = {
    paymentType: 'PAYU', // PAYU ADYEN CYBER(美国支付)
    onCardTypeValChange: () => {},
    payuFormRule: []
  };
  constructor(props) {
    super(props);
    this.state = {
      authorizationCode: '',
      subscriptionID: '',
      cyberBtnLoading: false,
      errorMsg: '',
      saveLoading: false,
      creditCardInfoForm: {
        cardNumber: '',
        cardMmyy: '',
        cardCvv: '',
        cardOwner: '',
        email: '',
        // phoneNumber: '+7 (',
        phoneNumber: '',
        phone: '',
        isDefault: 0,
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
        countryId: '',
        state: '', //Alabama
        city: '',
        zipCode: '', //10036
        postCode: '', //10036
        email: '', //didier.valansot@publicissapient.com
        isDefault: 0

        // cardholderName: '', //Didier Valansot
        // cardNumber: '4111111111111111', //4111111111111111
        // expirationMonth: 2, //2
        // expirationYear: '2022', //2022
        // securityCode: '000', //000
        // firstName: 'Didier', //Didier
        // lastName: 'Valansot', //Valansot
        // address1: 'add1', //add1
        // address2: '', //add2非必填
        // country: '',
        // state: 'Alabama', //Alabama
        // city: '',
        // zipCode: '10036', //10036
        // postCode: '', //10036
        // email: 'didier.valansot@publicissapient.com', //didier.valansot@publicissapient.com
        //  isDefault: 0
      },
      // countryList: [],
      stateList: [],

      validationLoading: false, // 地址校验loading
      validationModalVisible: false, // 地址校验查询开关
      selectValidationOption: 'suggestedAddress',

      ValidationAddressData: {}, //用于validationAddress校验的参数组装

      validationAddress: '',

      errMsgObj: {},

      cardTypeVal: this.props.defaultCardTypeVal || '',
      btnLoading: false
    };
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  // 设置手机号输入限制
  setPhoneNumberReg = () => {
    let element = document.getElementById('paymentPhoneNumber');
    let maskOptions = {};
    let phoneReg = '';
    switch (window.__.env.REACT_APP_COUNTRY) {
      case 'fr':
        phoneReg = [
          { mask: '(+33) 0 00 00 00 00' },
          { mask: '(+33) 00 00 00 00 00' }
        ];
        break;
      case 'us':
        phoneReg = [{ mask: '000-000-0000' }];
        break;
      case 'uk':
        phoneReg = [
          { mask: '(+44) 00 00 00 00 00' },
          { mask: '(+44) 000 00 00 00 00' }
        ];
        break;
      case 'ru':
        phoneReg = [
          {
            mask: '+{7}(Y00)000-00-00',
            lazy: false,
            blocks: {
              Y: {
                mask: IMask.MaskedEnum,
                enum: ['0', '1', '2', '3', '4', '5', '6', '9']
              } //枚举 Y值只能使用这些值
            }
          }
        ];
        break;
      case 'mx':
        phoneReg = [{ mask: '+(52) 000 000 0000' }];
        break;
      case 'tr':
        phoneReg = [{ mask: '{0} (000) 000-00-00' }];
        break;
      default:
        phoneReg = [{ mask: '00000000000' }];
        break;
    }
    maskOptions = {
      mask: phoneReg
    };
    let pval = IMask(element, maskOptions);
  };
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
    getProvincesList({ storeId: window.__.env.REACT_APP_STOREID }).then(
      (res) => {
        this.setState({
          stateList: res.context.systemStates
        });
      }
    );

    if (this.props.needPhone && this.props.paymentType == 'PAYU') {
      // 设置手机号输入限制
      this.setPhoneNumberReg();
    }
  }
  toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  cardInfoInputChange = (e) => {
    const target = e?.target;
    const value = target?.type === 'checkbox' ? target?.checked : target?.value;
    const name = target?.name;
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
      this.inputBlur(e);
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
            public_key: window.__.env.REACT_APP_PaymentKEY_MEMBER,
            'x-payments-os-env': window.__.env.REACT_APP_PaymentENV,
            'Content-type': 'application/json',
            app_id: window.__.env.REACT_APP_PaymentAPPID_MEMBER,
            'api-version': '1.3.0'
          }
        }
      );
      if (!res.data.vendor) {
        throw new Error(messages.supportCardTypeMismatch);
      }

      const isCountryRu = window.__.env.REACT_APP_COUNTRY === 'ru';

      //  如果是俄罗斯需要走 3ds 绑卡流程
      if (isCountryRu) {
        const addCardRes = await addOrUpdatePaymentMethodRu({
          paymentToken: res ? res.data.token : '',
          binNumber: res ? res.data.bin_number : '',
          cardType: res ? res.data.card_type : '',
          customerId: this.userInfo ? this.userInfo.customerId : '',
          email: creditCardInfoForm.email,
          holderName: res ? res.data.holder_name : '',
          isDefault: creditCardInfoForm.isDefault ? '1' : '0',
          lastFourDigits: res ? res.data.last_4_digits : '',
          paymentVendor: res ? res.data.vendor : '',
          phone: creditCardInfoForm.phoneNumber || '',
          storeId: window.__.env.REACT_APP_STOREID,
          // 接口需要重定向页面去授权 目前是由后端拼地址 重定向地址：/PaymentMethod3dsResult
          redirectUrl: process.env.REACT_APP_3DS_REDIRECT_URL || '',
          token: res ? res.data.token : '',
          pspName: 'PAYU'
        });

        // 如果接口返回有重定向的链接就重定向到对应的验证页
        if (addCardRes.context?.redirectUrl) {
          // 保存当前页面地址, 便于 /PaymentMethod3dsResult 页面授权成功后跳回本页面
          localItemRoyal.set(
            'paymentEditFormCurrentPage',
            this.props.fromPath || '/account/subscription'
          );

          window.location.href = addCardRes.context.redirectUrl;
        } else {
          this.handleCancel();
          this.props.refreshList();
        }

        return;
      }

      await addOrUpdatePaymentMethod({
        storeId: window.__.env.REACT_APP_STOREID,
        customerId: this.userInfo ? this.userInfo.customerId : '',
        email: creditCardInfoForm.email,
        phone: creditCardInfoForm.phoneNumber || '',
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
      await validData({
        rule: this.props.payuFormRule,
        data: this.state.creditCardInfoForm,
        intl: this.props.intl
      });
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
  //查询卡类型-会员
  queryCyberCardType = async (params) => {
    try {
      const res = await usPayCardSubscription(params);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  };
  //input输入事件
  handleInputChange = (e) => {
    const target = e.target;
    const { paymentForm } = this.state;
    const name = target.name;
    let value = '';
    value = target.value;
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 '); //银行卡4位后自动加空格
    }
    paymentForm[name] = value;

    this.setState({ paymentForm });
    this.inputBlur(e);
  };
  inputBlur = async (e) => {
    const { intl } = this.props;
    const { creditCardInfoForm, errMsgObj } = this.state;
    const target = e?.target;
    const tname = target?.name;
    const targetRule = ADDRESS_RULE.filter((e) => e.key === tname);
    const value = target?.value;
    // 如果需要输入电话
    if (this.props.needPhone) {
      creditCardInfoForm[tname] = value;
      this.setState({ creditCardInfoForm });
    }
    try {
      await validData({ rule: targetRule, data: { [tname]: value }, intl });
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [tname]: ''
        })
      });
    } catch (err) {
      this.setState({
        errMsgObj: Object.assign({}, errMsgObj, {
          [tname]: err.message
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
    paymentForm[name] = paymentForm[name] == 0 ? 1 : 0;

    let obj = Object.assign({}, errMsgObj, { isDefault: 0 }); //选择有值了，就清空没填提示
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
    const {
      paymentStore: { currentCardTypeInfo }
    } = this.props;
    let { paymentForm, selectValidationOption, validationAddress } = this.state;
    let oldPaymentForm = JSON.parse(JSON.stringify(paymentForm));
    this.setState({ btnLoading: true });
    let theform = [];
    if (selectValidationOption == 'suggestedAddress') {
      paymentForm.address1 = validationAddress.address1;
      paymentForm.city = validationAddress.city;
      paymentForm.country = validationAddress.countryCode;
      paymentForm.zipCode = validationAddress.postalCode;
      paymentForm.postCode = validationAddress.postalCode;

      paymentForm.province = validationAddress.provinceCode;
      paymentForm.provinceId = validationAddress.provinceId
        ? validationAddress.provinceId
        : paymentForm.provinceId;

      // 地址校验返回参数
      paymentForm.validationResult = validationAddress.validationResult;
      theform = Object.assign({}, paymentForm);
    } else {
      theform = JSON.parse(JSON.stringify(oldPaymentForm));
    }
    this.setState({
      paymentForm: Object.assign({}, theform)
    });

    let subscriptionParams = Object.assign({}, paymentForm, {
      //cardType: currentCardTypeInfo.cardType,
      cardType: null,
      //cardTypeValue: currentCardTypeInfo.cardTypeValue,
      cardTypeValue: null,
      paymentVendor: currentCardTypeInfo.cardType
    });

    try {
      let res = await this.queryCyberCardType(subscriptionParams);
      let authorizationCode = res.context.requestToken;
      let subscriptionID = res.context.subscriptionID;
      let cyberCardType = res.context.cardType;
      this.setState(
        { cardTypeVal: cyberCardTypeToValue[cyberCardType] },
        () => {
          this.props.onCardTypeValChange({
            cardTypeVal: this.state.cardTypeVal
          });
        }
      );

      let params = Object.assign({}, paymentForm, {
        cardType: cyberCardTypeToValue[cyberCardType],
        cardTypeValue: cyberCardType,
        authorizationCode: authorizationCode,
        subscriptionID: subscriptionID,
        paymentVendor: cyberCardTypeToValue[cyberCardType]
      });
      const newCardNumber = params?.cardNumber?.replace(/\s*/g, '') || '';
      const newParams = Object.assign({}, params, {
        cardNumber: newCardNumber?.replace(/\d(?=\d{4})/g, 'X')
      });
      await usPaymentInfo(newParams);
      this.handleCancel();
      // this.props.refreshList(res.message);
      this.props.refreshList({
        msg: this.props.intl.messages.saveSuccessfullly3
      });
    } catch (err) {
      this.showErrorMsg(err.message);
    } finally {
      this.setState({ btnLoading: false });
    }

    this.showNextPanel();
  }

  isAllFinish = () => {
    let errMsgObj = {};
    const paymentForm = this.state.paymentForm;
    ADDRESS_RULE.forEach((item) => {
      if (
        Object.keys(paymentForm).indexOf(item.key) != -1 &&
        !paymentForm[item.key] &&
        item.require //必填项没值
      ) {
        errMsgObj[item.key] = true;
      }
    });

    if (Object.keys(errMsgObj).length == 0 && this.state.isValidForm) {
      return true;
    } else {
      return false;
    }
  };

  //CYBER支付save判断必填项是否已经全部填完
  // cyberSaveIsAllRequiredFinished = () => {
  //   let errMsgObj = {};
  //   const paymentForm = this.state.paymentForm;
  //   ADDRESS_RULE.forEach((item) => {
  //     if (
  //       Object.keys(paymentForm).indexOf(item.key)!=-1 &&
  //       !paymentForm[item.key] &&
  //       item.require //必填项没值
  //     ) {
  //       errMsgObj[item.key] = true;
  //     }
  //   });

  //   if (Object.keys(errMsgObj).length > 0) {//payForm表单验证
  //     this.setState({ errMsgObj }, () => {
  //       this.toTop();
  //     });
  //   } else if(!this.state.isValidForm){//billdingAddress验证
  //     this.toTop();
  //     return;
  //   } else if(!this.state.paymentForm. isDefault) { //勾选框
  //     let errMsgObj = Object.assign({}, this.state.errMsgObj, {
  //        isDefault: true
  //     });
  //     this.setState({ errMsgObj });
  //   } else {
  //     this.handleCyberSave();
  //   }
  // };
  //CYBER支付保存event
  handleCyberSave = () => {
    const { paymentForm } = this.state;

    // 地址验证
    this.setState({
      validationLoading: true
    });

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

  handleCardTypeChange = (e) => {
    this.setState({ cardTypeVal: e.target.value }, () => {
      this.props.onCardTypeValChange({ cardTypeVal: this.state.cardTypeVal });
    });
  };

  updateCyberBillingAddress = async (data) => {
    const { intl } = this.props;
    this.setState({
      isValidForm: false
    });
    const { paymentForm } = this.state;
    try {
      if (!data?.formRule || (data?.formRule).length <= 0) {
        return;
      }
      await validData({ rule: data.formRule, data, intl }); // 数据验证

      data.zipCode = data.postCode; //后台接口需要，多加个属性
      data.phone = data.phoneNumber || ''; //后台接口需要，多加个属性

      const {
        cardholderName,
        cardNumber,
        expirationMonth,
        expirationYear,
        securityCode
      } = paymentForm;

      const paymentFormObj = {
        cardholderName,
        cardNumber,
        expirationMonth,
        expirationYear,
        securityCode
      };
      let newPaymentForm = Object.assign({}, data, paymentFormObj);

      this.setState({
        isValidForm: true,
        paymentForm: newPaymentForm
      });
    } catch (err) {
      console.log(' err msg: ', err);
    }
  };
  render() {
    const {
      paymentStore: { supportPaymentMethods },
      needEmail,
      needPhone
    } = this.props;
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
      cardTypeVal
    } = this.state;
    const { paymentType } = this.props;

    const showPaymentMethodTipsRu = window.__.env.REACT_APP_COUNTRY === 'ru';

    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {supportPaymentMethods.map((el, idx) => (
          <LazyLoad key={idx}>
            <img
              key={idx}
              className="logo-payment-card"
              src={el.imgUrl}
              alt="logo-payment-card-image"
            />
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
              showSetAsDefaultCheckobx={
                window.__.env.REACT_APP_COUNTRY === 'uk'
              }
              showCancelBtn={true}
              queryList={this.props.refreshList}
              updateFormVisible={this.handleCancel}
              // updateInitStatus={this.updateInitStatus}
              enableStoreDetails={true}
              mustSaveForFutherPayments={true}
              showErrorMsg={this.showErrorMsg}
              {...this.props}
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
                              alt="Card img"
                              src={getCardImg({
                                supportPaymentMethods,
                                currentVendor
                              })}
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
                  <div className="col-sm-6 payment_method_phone_number">
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
                          type="text"
                          className="rc-input__control input__phoneField shippingPhoneNumber"
                          id="paymentPhoneNumber"
                          min-lenght="18"
                          max-length="18"
                          data-phonelength="18"
                          // data-js-validate="(^(\+?7|8)?9\d{9}$)"
                          // data-js-pattern="(^\d{10}$)"
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
              <div className="row">
                <div className="col-12">
                  <div
                    className="rc-input w-100"
                    onClick={() => {
                      creditCardInfoForm.isDefault =
                        !creditCardInfoForm.isDefault;
                      this.setState({ creditCardInfoForm });
                    }}
                  >
                    <input
                      type="checkbox"
                      className="rc-input__checkbox"
                      checked={creditCardInfoForm.isDefault}
                    />
                    <label className="rc-input__label--inline w-100 text-break">
                      <FormattedMessage id="setDefaultPaymentMethod" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6 mt-2">
                  <button
                    onClick={this.handleCancel}
                    className="btn btn-block btn-outline-primary"
                    style={{ maxWidth: '12.6rem' }}
                  >
                    <FormattedMessage id="cancel" />
                  </button>
                </div>
                <div className="col-12 col-md-6 mt-2">
                  <button
                    className={`rc-btn rc-btn--one submitBtn editAddress w-100 ${
                      saveLoading ? 'ui-btn-loading' : ''
                    }`}
                    style={{ maxWidth: '12.6rem' }}
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
              {/* 俄罗斯3ds卡 绑定需要展示扣钱提示 */}
              {showPaymentMethodTipsRu ? (
                <div className="row">
                  <div className="col-12 mt-2 red">
                    <FormattedMessage id="payment.addCardTips" />
                  </div>
                </div>
              ) : null}
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
            {supportPaymentMethods.length > 1 &&
              supportPaymentMethods.map((item, i) => {
                return (
                  <div className={`rc-input rc-input--inline`} key={i}>
                    <input
                      className="rc-input__radio"
                      id={`payment-info-${item.id}`}
                      value={item.cardType}
                      type="radio"
                      name="payment-info"
                      onChange={this.handleCardTypeChange}
                      checked={cardTypeVal === item.cardType}
                    />
                    <label
                      className="rc-input__label--inline"
                      htmlFor={`payment-info-${item.id}`}
                    >
                      <img
                        src={item.imgUrl}
                        title={item.cardType}
                        style={{ width: '40px' }}
                        alt="cardType-image"
                      />
                    </label>
                  </div>
                );
              })}
            {/* ********************支付tab栏end********************************** */}
            <CyberPaymentForm
              cardTypeVal={this.state.cardTypeVal}
              form={this.state.paymentForm}
              errMsgObj={errMsgObj}
              handleInputChange={this.handleInputChange}
              handleSelectedItemChange={this.handleSelectedItemChange}
              inputBlur={this.inputBlur}
            />
            <CyberBillingAddress
              form={this.state.paymentForm}
              updateCyberBillingAddress={this.updateCyberBillingAddress}
            />
            {/* saveCard checkbox */}
            <div className="row">
              <div className="col-sm-6">
                <div
                  className="c-input rc-input--inline"
                  style={{ maxWidth: '400px' }}
                  onClick={() => this.handelCheckboxChange('isDefault')}
                >
                  {this.state.paymentForm.isDefault ? (
                    <input
                      type="checkbox"
                      className="rc-input__checkbox"
                      value={this.state.paymentForm.isDefault}
                      key="1"
                      checked
                    />
                  ) : (
                    <input
                      type="checkbox"
                      className="rc-input__checkbox"
                      value={this.state.paymentForm.isDefault}
                      key="2"
                    />
                  )}
                  <label className="rc-input__label--inline text-break">
                    <FormattedMessage id="cyber.form.saveFor" />
                  </label>
                  {/* {this.state.errMsgObj.isDefault ? (
                    <div className="red-text">
                      <FormattedMessage id="cyber.form.theBox" />
                    </div>
                  ) : null} */}
                </div>
              </div>
            </div>
            {/* 取消 确认 按钮 */}
            <div className="row" style={{ marginTop: '1.25rem' }}>
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
                  //className="rc-btn rc-btn--one"
                  className={`rc-btn rc-btn--one ${
                    this.state.cyberBtnLoading ? 'ui-btn-loading' : ''
                  }`}
                  style={{ width: '200px' }}
                  onClick={this.handleCyberSave}
                  disabled={this.isAllFinish() ? false : true}
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
