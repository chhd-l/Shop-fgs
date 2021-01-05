import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Cookies from 'cookies-js';
import md5 from 'js-md5';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Progress from '@/components/Progress';
import PayProductInfo from './PayProductInfo';
import RePayProductInfo from '@/components/PayProductInfo';
import Faq from './Fr/faq';
import Loading from '@/components/Loading';
import VisitorAddress from './Address/VisitorAddress';
import AddressList from './Address/List';
import SubscriptionSelect from './SubscriptionSelect';
import PetModal from './PetModal';
import AddressPreview from './AddressPreview';
import Confirmation from './modules/Confirmation';
import SameAsCheckbox from './Address/SameAsCheckbox';
import {
  searchNextConfirmPanel,
  isPrevReady,
  scrollPaymentPanelIntoView
} from './modules/utils';
import {
  formatMoney,
  validData,
  generatePayUScript,
  getDictionary,
  matchNamefromDict
} from '@/utils/utils';
import { ADDRESS_RULE, EMAIL_REGEXP } from '@/utils/constant';
import { findUserConsentList, getStoreOpenConsentList } from '@/api/consent';
import { batchAddPets } from '@/api/pet';
import LazyLoad from 'react-lazyload';
import {
  postVisitorRegisterAndLogin,
  batchAdd,
  confirmAndCommit,
  customerCommitAndPay,
  rePay,
  customerCommitAndPayMix,
  getWays,
  getProductPetConfig
} from '@/api/payment';

import PayUCreditCard from './PayUCreditCard';
import AdyenCreditCard from './Adyen';
import OxxoConfirm from './Oxxo';
import AdyenCommonPay from './modules/AdyenCommonPay';

import OnePageEmailForm from './OnePage/EmailForm';
import OnePageClinicForm from './OnePage/ClinicForm';

import { getOrderDetails } from '@/api/order';
import { queryCityNameById } from '@/api';
import { setSeoConfig } from '@/utils/utils';
import './modules/adyenCopy.css';
import './index.css';
import { Helmet } from 'react-helmet';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject(
  'loginStore',
  'checkoutStore',
  'clinicStore',
  'frequencyStore',
  'configStore',
  'paymentStore'
)
@injectIntl
@observer
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotionCode: this.props.checkoutStore.promotionCode || '',
      billingChecked: true,
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      deliveryAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        country: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        city: '',
        postCode: '',
        phoneNumber: ''
      },
      billingAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        country: 'Mexico',
        city: '',
        postCode: '',
        phoneNumber: ''
      },
      creditCardInfo: {
        // cardNumber: "",
        // cardDate: "",
        // cardCVV: "",
        cardOwner: '',
        email: '',
        phoneNumber: '',
        identifyNumber: '111'
      },
      subForm: {
        buyWay: 'once',
        frequencyName: '',
        frequencyId: ''
      },
      paymentTypeVal: '',
      errorMsg: '',
      loading: false,
      payosdata: null,
      selectedCardInfo: null,
      adyenPayParam: null,
      payWayNameArr: [],
      email: '',
      payWayObj: {}, //支付方式input radio汇总
      savedPayWayObj: {}, //保留初始化的支付方式
      orderDetails: null,
      tid: sessionItemRoyal.get('rc-tid'),
      tidList: sessionItemRoyal.get('rc-tidList')
        ? JSON.parse(sessionItemRoyal.get('rc-tidList'))
        : [],
      rePaySubscribeId: sessionItemRoyal.get('rc-rePaySubscribeId'),
      recommend_data: [],
      petModalVisible: false,
      isAdd: 0,
      listData: [],
      requiredList: [],
      AuditData: [],
      needPrescriber: false,
      unLoginBackPets: [],
      guestEmail: '',
      mobileCartVisibleKey: 'less', // less/more
      countryList: [],
      validSts: { billingAddr: true },
      saveBillingLoading: false
    };
    this.timer = null;
    this.toggleMobileCart = this.toggleMobileCart.bind(this);
    this.updateValidStatus = this.updateValidStatus.bind(this);
    this.unLoginBillingAddrRef = React.createRef();
    this.loginBillingAddrRef = React.createRef();
    this.adyenCardRef = React.createRef();
    this.payUCreditCardRef = React.createRef();
  }
  
  async componentDidMount() {
    const { checkoutStore, paymentStore, clinicStore, history } = this.props;
    const { tid } = this.state;
    setSeoConfig().then((res) => {
      this.setState({ seoConfig: res });
    });
    if (this.isLogin) {
      // 登录情况下，无需显示email panel
      paymentStore.setStsToCompleted({ key: 'email' });
      if (tid) {
        paymentStore.setStsToCompleted({ key: 'deliveryAddr' });
        paymentStore.setStsToCompleted({ key: 'billingAddr' });
        this.queryOrderDetails();
      }

      if (this.loginCartData.filter((el) => el.goodsInfoFlag).length) {
        this.setState({
          subForm: {
            buyWay: 'frequency',
            frequencyName: '',
            frequencyId: ''
          }
        });
      }
    } else {
      if (this.cartData.filter((el) => el.goodsInfoFlag).length) {
        this.setState({
          subForm: {
            buyWay: 'frequency',
            frequencyName: '',
            frequencyId: ''
          }
        });
      }
    }
    this.setState(
      {
        needPrescriber: checkoutStore.autoAuditFlag
          ? (this.isLogin ? this.loginCartData : this.cartData).filter(
              (el) => el.prescriberFlag
            ).length > 0
          : checkoutStore.AuditData.length > 0
      },
      () => {
        const nextConfirmPanel = searchNextConfirmPanel({
          list: toJS(paymentStore.panelStatus),
          curKey: 'clinic'
        });

        // 不需要clinic/clinic已经填写时，需把下一个panel置为edit状态
        if (!this.checkoutWithClinic || clinicStore.clinicName) {
          paymentStore.setStsToCompleted({ key: 'clinic' });
          paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
        } else {
          // 把clinic置为edit状态
          paymentStore.setStsToEdit({ key: 'clinic' });
          paymentStore.setStsToPrepare({ key: nextConfirmPanel.key });
        }
      }
    );
    if (!sessionItemRoyal.get('recommend_product')) {
      if (this.isLogin && !this.loginCartData.length && !tid) {
        history.push('/cart');
        return false;
      }
      if (
        !this.isLogin &&
        (!this.cartData.length ||
          !this.cartData.filter((ele) => ele.selected).length)
      ) {
        history.push('/cart');
        return false;
      }
    }

    this.getConsentList();

    if (sessionItemRoyal.get('recommend_product')) {
      let recommend_data = JSON.parse(
        sessionItemRoyal.get('recommend_product')
      );
      recommend_data = recommend_data.map((el) => {
        el.goodsInfo.salePrice = el.goodsInfo.marketPrice;
        el.goodsInfo.buyCount = el.recommendationNumber;
        return el.goodsInfo;
      });
      this.props.checkoutStore.updatePromotionFiled(recommend_data);
      this.setState({ recommend_data });
    }

    this.initPaymentWay();

    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
    sessionItemRoyal.remove('rc-tid');
    sessionItemRoyal.remove('rc-tidList');
    sessionItemRoyal.remove('recommend_product');
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  get userInfo() {
    return this.props.loginStore.userInfo;
  }
  get cartData() {
    return this.props.checkoutStore.cartData;
  }
  get loginCartData() {
    return this.props.checkoutStore.loginCartData;
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  get checkoutWithClinic() {
    return (
      process.env.REACT_APP_CHECKOUT_WITH_CLINIC === 'true' &&
      this.state.needPrescriber
    );
  }
  get paymentMethodPanelStatus() {
    return this.props.paymentStore.paymentMethodPanelStatus;
  }
  get selectedDeliveryAddress() {
    return this.props.paymentStore.selectedDeliveryAddress;
  }
  get selectedBillingAddress() {
    return this.props.paymentStore.selectedBillingAddress;
  }
  checkRequiredItem = (list) => {
    let requiredList = list.filter((item) => item.isRequired);
    this.setState({
      requiredList
    });
  };
  //总的调用consense接口
  async getConsentList() {
    //1.会员调用consense接口
    //2.游客调用consense接口
    const { isLogin } = this;
    const res = await (isLogin ? findUserConsentList : getStoreOpenConsentList)(
      {}
    );
    if (isLogin) {
      this.isExistOptionalListFun(res);
    } else {
      this.isExistListFun(res);
    }
  }
  //重新组装listData
  rebindListData(listData) {
    this.setState(
      {
        listData
      },
      () => {
        this.checkRequiredItem(listData);
      }
    );
  }
  //判断consent接口是否存在项目
  isExistListFun(result) {
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
    let listData = [...requiredList, ...optioalList]; //必填项+选填项
    this.rebindListData(listData);
  }
  //判断consent接口是否存在选填项
  isExistOptionalListFun(result) {
    let optionalList = [];
    if (result.context.optionalList.length > 0) {
      optionalList = result.context.optionalList.map((item) => {
        return {
          id: item.id,
          consentTitle: item.consentTitle,
          isChecked: false,
          isRequired: false,
          detailList: item.detailList
        };
      });
    }
    // 为法国添加一条写死一条consent
    if (process.env.REACT_APP_LANG === 'fr') {
      optionalList = [
        {
          consentTitle: `<p><span style="font-size:11ptpx"><span style="color:#000000">J&#x27;ai lu et j&#x27;accepte les <a href="${process.env.REACT_APP_SUCCESSFUL_URL}/general-terms-conditions" target="_blank">conditions générales de vente</a></span></span></p>`,
          detailList: [],
          isChecked: false,
          isRequired: true
        },
        ...optionalList
      ];
    }
    if (optionalList.length > 0) {
      this.rebindListData(optionalList);
    }
  }
  initPaymentWay = async () => {
    //获取支付方式
    const payWay = await getWays();
    // name:后台返回的支付方式，id：翻译id，paymentTypeVal：前端显示的支付方式
    const payuMethodsObj = {
      PAYU: {
        name: 'payu',
        id: 'creditCard',
        paymentTypeVal: 'payUCreditCard'
      },
      PAYUOXXO: { name: 'payuoxxo', id: 'oxxo', paymentTypeVal: 'oxxo' },
      adyen_credit_card: {
        name: 'adyen_credit_card',
        id: 'adyenCard',
        paymentTypeVal: 'adyenCard'
      },
      adyen_klarna_pay_now: {
        name: 'adyen_klarna_pay_now',
        id: 'adyenPayNow',
        paymentTypeVal: 'adyenKlarnaPayNow'
      },
      adyen_klarna_pay_lat: {
        name: 'adyen_klarna_pay_lat',
        id: 'adyenPayLater',
        paymentTypeVal: 'adyenKlarnaPayLater'
      },
      directEbanking: {
        name: 'directEbanking',
        id: 'sofort',
        paymentTypeVal: 'directEbanking'
      }
    };
    let payWayNameArr = [],
      payuNameArr = [];
    if (payWay.context.length > 0) {
      //判断第0条的name是否存在PAYU的字段,因为后台逻辑不好处理，所以这里特殊处理
      if (payWay.context[0].name.indexOf('PAYU') !== -1) {
        payuNameArr = payWay.context.map((item) => item.name);
      } else {
        //正常处理
        payuNameArr = payWay.context
          .map((item) => item.payChannelItemList)[0]
          .map((item) => item.code);
      }
      //payuNameArr:["adyen_credit_card", "adyen_klarna_slice", "adyen_klarna_pay_now","adyen_klarna_pay_lat""payu","payuoxxo"，"directEbanking"]
      for (let item of payuNameArr) {
        // 只是为了墨西哥环境测试adyen订阅支付start
        if (item === 'adyen_card_subscription') {
          payWayNameArr.push({
            name: 'adyen_credit_card',
            id: 'adyen',
            paymentTypeVal: 'adyenCard'
          });
        }
        if (item === 'adyen_klarna_subscription') {
          payWayNameArr.push({
            name: 'adyen_klarna_pay_now',
            id: 'adyenPayNow',
            paymentTypeVal: 'adyenKlarnaPayNow'
          });
          payWayNameArr.push({
            name: 'adyen_klarna_pay_lat',
            id: 'adyenPayLater',
            paymentTypeVal: 'adyenKlarnaPayLater'
          });
        }
        // 只是为了墨西哥环境测试adyen订阅支付end
        if (payuMethodsObj.hasOwnProperty(item)) {
          payWayNameArr.push(payuMethodsObj[item]);
        }
      }
    }
    //数组转对象
    const payWayObj = payWayNameArr.map((item, index) => {
      return {
        name: item['name'],
        id: item['id'],
        paymentTypeVal: item['paymentTypeVal']
      };
    });

    this.setState({
      payWayObj,
      savedPayWayObj: JSON.parse(JSON.stringify(payWayObj))
    });

    let payMethod = (payWayNameArr[0] && payWayNameArr[0].name) || 'none'; //初始化默认取第1个
    //各种支付component初始化方法
    var initPaymentWay = {
      adyen_credit_card: () => {
        this.setState({ paymentTypeVal: 'adyenCard' });
        // this.initAdyenPay();
      },
      adyen_klarna_slice: () => {
        console.log('initKlarnaSlice');
      },
      adyen_klarna_pay_now: () => {
        this.setState({ paymentTypeVal: 'adyenKlarnaPayNow' });
      },
      adyen_klarna_pay_lat: () => {
        this.setState({ paymentTypeVal: 'adyenKlarnaPayLater' });
      },
      //Sofort支付
      directEbanking: () => {
        this.setState({ paymentTypeVal: 'directEbanking' });
      },
      payu: () => {
        this.setState({ paymentTypeVal: 'payUCreditCard' });
      },
      payuoxxo: () => {
        this.setState({ paymentTypeVal: 'oxxo' });
      },
      none: () => {
        console.log('no payway');
      }
    };

    //默认第一个,如没有支付方式,就不初始化方法
    this.setState(
      {
        payWayNameArr
      },
      () => {
        initPaymentWay[payMethod]();
      }
    );
  };
  generatePayUParam = () => {
    const jsessionid =
      Cookies.get('jsessionid') ||
      sessionItemRoyal.get('jsessionid') ||
      `${this.userInfo.customerId}${new Date().getTime()}`;
    if (jsessionid) {
      const fingerprint = md5(`${jsessionid}${new Date().getTime()}`);
      generatePayUScript(fingerprint);
      this.jsessionid = jsessionid;
      this.fingerprint = fingerprint;
    }
  };
  queryOrderDetails() {
    getOrderDetails(this.state.tidList[0]).then(async (res) => {
      let resContext = res.context;
      let cityRes = await queryCityNameById({
        id: [resContext.consignee.cityId, resContext.invoice.cityId]
      });
      cityRes = cityRes.context.systemCityVO || [];
      resContext.consignee.cityName = this.matchCityName(
        cityRes,
        resContext.consignee.cityId
      );
      resContext.invoice.cityName = this.matchCityName(
        cityRes,
        resContext.invoice.cityId
      );
      this.setState({
        orderDetails: resContext
      });
    });
  }
  matchCityName(dict, cityId) {
    return dict.filter((c) => c.id === cityId).length
      ? dict.filter((c) => c.id === cityId)[0].cityName
      : cityId;
  }
  showErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  };
  // 支付公共初始化方法
  initCommonPay = ({ email = '', type }) => {
    if (this.props.checkoutStore.AuditData.length) {
      let petFlag = true;
      let data = this.props.checkoutStore.AuditData;
      console.log(toJS(this.props.checkoutStore.AuditData));
      for (let i = 0; i < data.length; i++) {
        if (this.isLogin) {
          if (!data[i].petsId) {
            petFlag = false;
            break;
          }
        } else {
          if (!data[i].petForm || !data[i].petForm.petName) {
            petFlag = false;
            break;
          }
        }
      }
      if (!petFlag && this.props.checkoutStore.petFlag) {
        this.showErrorMsg('Please fill in pet information');
        this.endLoading();
        return;
      }
    }
    this.doGetAdyenPayParam(type);
    if (email) {
      this.setState({
        email
      });
    }
  };

  /**************支付公共方法start*****************/

  //组装支付共同的参数
  async getAdyenPayParam(type) {
    try {
      let obj = await this.getPayCommonParam();
      let commonParameter = obj.commonParameter;
      let phone = obj.phone;
      let parameters;
      const { subForm, email } = this.state;
      /* 组装支付需要的参数 */
      const actions = {
        oxxo: () => {
          parameters = Object.assign({}, commonParameter, {
            payChannelItem: 'payuoxxo',
            country: 'MEX',
            email
          });
        },
        payUCreditCard: async () => {
          const { selectedCardInfo } = this.state;
          if (!this.isLogin) {
            parameters = Object.assign({}, commonParameter);
          } else {
            try {
              // 获取token，避免传给接口明文cvv
              this.startLoading();
              let cvvResult = await new Promise((resolve) => {
                window.POS.tokenize(
                  {
                    token_type: 'card_cvv_code',
                    credit_card_cvv: selectedCardInfo.cardCvv,
                    payment_method_token: selectedCardInfo.paymentToken
                  },
                  function (result) {
                    console.log('result obtained' + result);
                    resolve(result);
                  }
                );
              });
              cvvResult = JSON.parse(cvvResult);
              const tempPublicParams = Object.assign({}, commonParameter, {
                paymentMethodId: selectedCardInfo.id,
                creditDardCvv: cvvResult && cvvResult.token
              });
              if (subForm.buyWay === 'frequency') {
                parameters = Object.assign({}, tempPublicParams, {
                  payChannelItem: 'payu_subscription'
                });
              } else {
                parameters = Object.assign({}, tempPublicParams, {
                  payChannelItem: 'payu_customer'
                });
              }
            } catch (err) {
              this.endLoading();
              throw new Error(err.message);
            }
          }
        },
        adyenCard: () => {
          const { adyenPayParam } = this.state;
          parameters = Object.assign(commonParameter, {
            encryptedSecurityCode: adyenPayParam.encryptedSecurityCode,
            shopperLocale: 'en_US',
            currency: 'EUR',
            country: process.env.REACT_APP_Adyen_country,
            payChannelItem: adyenPayParam.paymentToken
              ? subForm.buyWay === 'frequency'
                ? 'adyen_card_customer_subscription'
                : 'adyen_card_customer'
              : 'adyen_credit_card'
          });
          if (adyenPayParam.paymentToken) {
            parameters = Object.assign(parameters, {
              paymentMethodId: adyenPayParam.id
            });
          } else {
            parameters = Object.assign(parameters, {
              ...adyenPayParam
            });
          }
        },
        adyenKlarnaPayLater: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'klarna',
            payChannelItem:
              subForm.buyWay === 'frequency'
                ? 'adyen_later_subscription'
                : 'adyen_klarna_pay_lat',
            shopperLocale: 'en_US',
            currency: 'EUR',
            country: process.env.REACT_APP_Adyen_country,
            email
          });
        },
        adyenKlarnaPayNow: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'klarna_paynow',
            payChannelItem:
              subForm.buyWay === 'frequency'
                ? 'adyen_klarna_subscription'
                : 'adyen_klarna_pay_now',
            shopperLocale: 'en_US',
            currency: 'EUR',
            country: process.env.REACT_APP_Adyen_country,
            email
          });
        },
        directEbanking: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'directEbanking',
            payChannelItem:
              subForm.buyWay === 'frequency'
                ? 'adyen_sofort_subscription'
                : 'directEbanking',
            shopperLocale: 'en_US',
            currency: 'EUR',
            country: process.env.REACT_APP_Adyen_country,
            email
          });
        }
      };
      await actions[type]();
      //合并支付必要的参数
      let finalParam = Object.assign(parameters, {
        successUrl: process.env.REACT_APP_SUCCESSFUL_URL + '/payResult',
        //successUrl: 'http://m72na6.natappfree.cc/payResult',
        deliveryAddressId: this.state.deliveryAddress.addressId,
        billAddressId: this.state.billingAddress.addressId,
        phone
      });
      return finalParam;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  //得到支付共同的参数
  async getPayCommonParam() {
    try {
      await this.valideCheckoutLimitRule();
      const commonParameter = this.packagePayParam();
      let phone = this.state.billingAddress.phoneNumber; //获取电话号码
      return new Promise((resolve) => {
        resolve({ commonParameter, phone });
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  //获取参数
  async doGetAdyenPayParam(type) {
    try {
      let parameters = await this.getAdyenPayParam(type);
      await this.allAdyenPayment(parameters, type);
    } catch (err) {
      console.log(err);
      if (err.message !== 'agreement failed') {
        this.showErrorMsg(
          err.message ? err.message.toString() : err.toString()
        );
      }
      this.endLoading();
    }
  }

  //根据条件-调用不同的支付接口,进行支付
  async allAdyenPayment(parameters, type) {
    try {
      const { clinicStore } = this.props;
      const { paymentTypeVal } = this.state;
      let action;
      const actions = () => {
        const rePayFun = () => {
          action = rePay;
        }; // 存在订单号
        const customerCommitAndPayFun = () => {
          action = customerCommitAndPay;
        }; //会员once
        const customerCommitAndPayMixFun = () => {
          action = customerCommitAndPayMix;
        }; //  会员frequency
        const confirmAndCommitFun = () => {
          action = confirmAndCommit;
        }; //游客
        return new Map([
          [{ isTid: /^true$/i, isLogin: /.*/, buyWay: /.*/ }, rePayFun],
          [
            { isTid: /^false$/i, isLogin: /^true$/i, buyWay: /^once$/ },
            customerCommitAndPayFun
          ], //buyWay为once的时候均表示会员正常交易
          [
            { isTid: /^false$/i, isLogin: /^true$/i, buyWay: /^frequency$/ },
            customerCommitAndPayMixFun
          ],
          [
            { isTid: /^false$/i, isLogin: /^false$/i, buyWay: /.*/ },
            confirmAndCommitFun
          ]
        ]);
      };
      const payFun = (isTid, isLogin, buyWay) => {
        let action = [...actions()].filter(
          ([key, value]) =>
            key.isTid.test(isTid) &&
            key.isLogin.test(isLogin) &&
            key.buyWay.test(buyWay)
        );
        action.forEach(([key, value]) => value.call(this));
      };

      sessionItemRoyal.set('rc-paywith-login', this.isLogin);
      this.startLoading();
      if (!this.isLogin) {
        await this.visitorLoginAndAddToCart();
        if (
          this.props.checkoutStore.AuditData.length > 0 &&
          this.props.checkoutStore.petFlag &&
          !this.props.checkoutStore.autoAuditFlag
        ) {
          let param = this.props.checkoutStore.AuditData.map((el) => {
            let petForm = {
              birthday: el.petForm.birthday,
              breed: el.petForm.breed,
              petsName: el.petForm.petName,
              petsType: el.petForm.petType
            };
            return {
              customerPets: Object.assign(petForm, {
                productId: el.sizeList.filter((e) => e.selected)[0].goodsInfoId
              }),
              storeId: process.env.REACT_APP_STOREID
            };
          });
          let res = await batchAddPets({
            batchAddItemList: param
          });
          parameters.tradeItems.map((el) => {
            let filterItems = res.context.resultList.filter(
              (item) => item.productId === el.skuId
            );
            if (filterItems.length > 0) {
              el.petsName = filterItems[0].petsName;
              el.petsId = filterItems[0].petsId;
            }
          });
        }
      }

      if (paymentTypeVal === 'payUCreditCard') {
        this.generatePayUParam();
      }
      if (this.jsessionid && this.fingerprint) {
        parameters = Object.assign(parameters, {
          userAgent: navigator.userAgent,
          cookie: this.jsessionid,
          fingerprint: this.fingerprint
        });
      }

      payFun(this.state.tid != null, this.isLogin, this.state.subForm.buyWay);

      /* 4)调用支付 */
      const res = await action(parameters);
      const { tidList } = this.state;
      let orderNumber; // 主订单号
      let subOrderNumberList = []; // 拆单时，子订单号
      let subNumber; // 订阅订单号
      let oxxoPayUrl;
      let gotoConfirmationPage = false;
      switch (type) {
        case 'oxxo':
          var oxxoContent = res.context[0];
          var oxxoArgs = oxxoContent.args;
          oxxoPayUrl =
            oxxoArgs &&
            oxxoArgs.additionalDetails &&
            oxxoArgs.additionalDetails.object &&
            oxxoArgs.additionalDetails.object.data[0]
              ? oxxoArgs.additionalDetails.object.data[0].href
              : '';
          subOrderNumberList = tidList.length
            ? tidList
            : oxxoContent && oxxoContent.tidList;
          gotoConfirmationPage = true;
          break;
        case 'payUCreditCard':
          subOrderNumberList = tidList.length
            ? tidList
            : res.context && res.context[0] && res.context[0].tidList;
          subNumber =
            (res.context && res.context[0] && res.context[0].subscribeId) ||
            (res.context && res.context.subscribeId) ||
            '';
          gotoConfirmationPage = true;
          break;
        case 'adyenCard':
          subOrderNumberList = tidList.length
            ? tidList
            : res.context && res.context[0] && res.context[0].tidList;
          subNumber =
            (res.context && res.context[0] && res.context[0].subscribeId) ||
            (res.context && res.context.subscribeId) ||
            '';
          gotoConfirmationPage = true;
          break;
        case 'adyenKlarnaPayLater':
        case 'adyenKlarnaPayNow':
        case 'directEbanking':
          subOrderNumberList = [res.context.pId];
          // debugger
          // 删除本地购物车
          if (this.isLogin) {
            this.props.checkoutStore.removeLoginCartData();
          } else {
            this.props.checkoutStore.setCartData(
              this.props.checkoutStore.cartData.filter((ele) => !ele.selected)
            ); // 只移除selected
            //sessionItemRoyal.remove('rc-token');
          }
          // 给klana支付跳转用
          if (res.context.pId) {
            sessionItemRoyal.set('orderNumber', res.context.pId);
          }
          window.location.href = res.context.url;
          break;
        default:
          break;
      }
      // if (orderNumber) {
      //   sessionItemRoyal.set('orderNumber', orderNumber);
      // }
      if (subOrderNumberList.length) {
        sessionItemRoyal.set(
          'subOrderNumberList',
          JSON.stringify(subOrderNumberList)
        );
      }
      if (subNumber) {
        sessionItemRoyal.set('subNumber', subNumber);
      }
      if (oxxoPayUrl) {
        sessionItemRoyal.set('oxxoPayUrl', oxxoPayUrl);
      }

      // update clinic
      if (this.checkoutWithClinic) {
        if (
          clinicStore.linkClinicId &&
          clinicStore.linkClinicId !== clinicStore.selectClinicId
        ) {
          clinicStore.removeLinkClinicId();
          clinicStore.removeLinkClinicName();
          clinicStore.removeAuditAuthority();
        }
        // clinicStore.setSelectClinicId(clinicStore.clinicId);
        // clinicStore.setSelectClinicName(clinicStore.clinicName);
        // clinicStore.setDefaultClinicId(clinicStore.clinicId);
        // clinicStore.setDefaultClinicName(clinicStore.clinicName);
      }

      sessionItemRoyal.remove('payosdata');
      if (gotoConfirmationPage) {
        this.props.history.push('/confirmation');
      }
    } catch (err) {
      console.log(err);
      if (!this.isLogin) {
        sessionItemRoyal.remove('rc-token');
      }
      if (err.errorData && err.errorData.tid && err.errorData.tidList) {
        // err.errorData 支付失败，errorData返回支付信息
        sessionItemRoyal.set('rc-tid', err.errorData.tid);
        sessionItemRoyal.set('rc-rePaySubscribeId', err.errorData.subscribeId);
        sessionItemRoyal.set(
          'rc-tidList',
          JSON.stringify(err.errorData.tidList)
        );
        this.setState(
          {
            tid: err.errorData.tid,
            tidList: err.errorData.tidList,
            rePaySubscribeId: err.errorData.subscribeId
          },
          () => {
            this.state.tidList &&
              this.state.tidList.length &&
              this.queryOrderDetails();
          }
        );
      }
      throw new Error(err.message);
    } finally {
      this.endLoading();
    }
  }

  /**************支付公共方法end*****************/

  /**
   * 游客注册并登录&批量添加后台购物车
   */
  async visitorLoginAndAddToCart() {
    try {
      let {
        deliveryAddress,
        billingAddress,
        billingChecked,
        creditCardInfo
      } = this.state;
      const cartData = this.cartData.filter((ele) => ele.selected);

      let param = Object.assign(
        {},
        { useDeliveryAddress: billingChecked },
        deliveryAddress,
        {
          billAddress1: billingAddress.address1,
          billAddress2: billingAddress.address2,
          billCity: billingAddress.city,
          billCountry: billingAddress.country,
          billFirstName: billingAddress.firstName,
          billLastName: billingAddress.lastName,
          billPhoneNumber: billingAddress.phoneNumber,
          billPostCode: billingAddress.postCode,
          rfc: deliveryAddress.rfc,
          billRfc: billingAddress.rfc,
          email: creditCardInfo.email,
          consigneeEmail: deliveryAddress.email
        }
      );
      let postVisitorRegisterAndLoginRes = await postVisitorRegisterAndLogin(
        param
      );
      sessionItemRoyal.set(
        'rc-token',
        postVisitorRegisterAndLoginRes.context.token
      );
      if (sessionItemRoyal.get('recommend_product')) {
        await batchAdd({
          goodsInfos: this.state.recommend_data.map((ele) => {
            return {
              verifyStock: false,
              buyCount: ele.buyCount,
              goodsInfoId: find(ele.goods.sizeList, (s) => s.selected)
                .goodsInfoId
            };
          })
        });
      } else {
        await batchAdd({
          goodsInfos: cartData.map((ele) => {
            return {
              verifyStock: false,
              buyCount: ele.quantity,
              goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId
            };
          })
        });
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  /**
   * 封装下单参数
   */
  packagePayParam() {
    const loginCartData = this.loginCartData;
    const cartData = this.cartData.filter((ele) => ele.selected);
    const { clinicStore } = this.props;
    let {
      deliveryAddress,
      billingAddress,
      creditCardInfo,
      subForm,
      payosdata,
      needPrescriber,
      guestEmail,
      promotionCode
    } = this.state;
    let param = {
      firstName: deliveryAddress.firstName,
      lastName: deliveryAddress.lastName,
      zipcode: deliveryAddress.postCode,
      city: deliveryAddress.cityName,
      country: payosdata ? payosdata.country_code : '',
      token: payosdata ? payosdata.token : '',
      creditDardCvv: payosdata ? payosdata.encrypted_cvv : payosdata,
      phone: creditCardInfo.phoneNumber,
      email: creditCardInfo.email || deliveryAddress.email,
      line1: deliveryAddress.address1,
      line2: deliveryAddress.address2,
      recommendationId: clinicStore.linkClinicId,
      recommendationName: clinicStore.linkClinicName,
      storeId: process.env.REACT_APP_STOREID,
      tradeItems: [], // once order products
      subTradeItems: [], // subscription order products
      tradeMarketingList: [],
      last4Digits: payosdata ? payosdata.last_4_digits : '',
      payAccountName: creditCardInfo.cardOwner,
      payPhoneNumber: creditCardInfo.phoneNumber,
      petsId: '1231',
      deliveryAddressId: deliveryAddress.addressId,
      billAddressId: billingAddress.addressId,
      promotionCode,
      guestEmail
    };
    if (needPrescriber) {
      param.clinicsId = clinicStore.selectClinicId;
      param.clinicsName = clinicStore.selectClinicName;
    }

    if (sessionItemRoyal.get('recommend_product')) {
      param.tradeItems = this.state.recommend_data.map((ele) => {
        return {
          num: ele.buyCount,
          skuId: ele.goodsInfoId,
          petsId: ele.petsId,
          petsName: ele.petsName,
          goodsInfoFlag: 0
        };
      });
    } else if (this.isLogin) {
      param.tradeItems = loginCartData.map((ele) => {
        return {
          num: ele.buyCount,
          skuId: ele.goodsInfoId,
          petsId: ele.petsId,
          petsName: ele.petsName,
          goodsInfoFlag: ele.goodsInfoFlag
        };
      });
    } else {
      param.tradeItems = cartData.map((ele) => {
        return {
          num: ele.quantity,
          skuId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
          goodsInfoFlag: ele.goodsInfoFlag
        };
      });
    }

    if (subForm.buyWay === 'frequency') {
      param.tradeItems = loginCartData
        // .filter((ele) => !ele.subscriptionStatus || !ele.subscriptionPrice)
        .filter((ele) => !ele.goodsInfoFlag)
        .map((g) => {
          return {
            num: g.buyCount,
            skuId: g.goodsInfoId,
            petsId: g.petsId,
            petsName: g.petsName,
            goodsInfoFlag: g.goodsInfoFlag,
            periodTypeId: g.periodTypeId
          };
        });
      // if(sessionItemRoyal.get('recommend_product')) {
      //   param.subTradeItems = this.state.recommend_data
      //   .filter((ele) => ele.subscriptionStatus && ele.subscriptionPrice > 0)
      //   .map((g) => {
      //     return {
      //       subscribeNum: g.buyCount,
      //       skuId: g.goodsInfoId,
      //       petsId: g.petsId,
      //       petsName: g.petsName
      //     };
      //   });
      // }else {
      param.subTradeItems = loginCartData
        .filter(
          (ele) =>
            ele.subscriptionStatus &&
            ele.subscriptionPrice > 0 &&
            ele.goodsInfoFlag
        )
        .map((g) => {
          return {
            subscribeNum: g.buyCount,
            skuId: g.goodsInfoId,
            petsId: g.petsId,
            petsName: g.petsName,
            goodsInfoFlag: g.goodsInfoFlag,
            periodTypeId: g.periodTypeId
          };
        });
      // }

      param.cycleTypeId = subForm.frequencyId;
      param.paymentMethodId = creditCardInfo.id;
    }

    // 拼接promotion参数
    let tradeMarketingList = [];
    let goodsMarketingMap = this.props.checkoutStore.goodsMarketingMap;
    if (goodsMarketingMap && Object.keys(goodsMarketingMap).length) {
      for (let k in goodsMarketingMap) {
        let tmpParam = {
          marketingId: '',
          marketingLevelId: '',
          skuIds: [],
          giftSkuIds: []
        };
        tmpParam.skuIds.push(k);
        // marketingType 0-满减fullReductionLevelList-reductionLevelId 1-满折fullDiscountLevelList-discountLevelId
        const tmpMarketing = goodsMarketingMap[k][0];
        let targetLevelId = '';
        if (tmpMarketing.marketingType === 0) {
          targetLevelId =
            tmpMarketing.fullReductionLevelList[0].reductionLevelId;
        } else if (tmpMarketing.marketingType === 1) {
          targetLevelId = tmpMarketing.fullDiscountLevelList[0].discountLevelId;
        }
        tmpParam.marketingLevelId = targetLevelId;
        tmpParam.marketingId = tmpMarketing.marketingId;
        tradeMarketingList.push(tmpParam);
      }
    }

    // rePay (subscription can't repay)
    if (this.state.tid) {
      param.tid = this.state.tid;
      param.tidList = this.state.tidList;
      param.subscribeId = this.state.rePaySubscribeId;
      delete param.remark;
      delete param.tradeItems;
      delete param.tradeMarketingList;
    }
    return param;
  }

  /**
   * save address/comment
   */
  async saveAddressAndCommentPromise() {
    try {
      const { configStore, clinicStore } = this.props;
      const { deliveryAddress, billingAddress, billingChecked } = this.state;
      let tmpDeliveryAddress = deliveryAddress;
      let tmpBillingAddress = billingAddress;
      if (this.isLogin) {
        let tmpDeliveryAddressData = this.selectedDeliveryAddress;
        tmpDeliveryAddress = {
          firstName: tmpDeliveryAddressData.firstName,
          lastName: tmpDeliveryAddressData.lastName,
          address1: tmpDeliveryAddressData.address1,
          address2: tmpDeliveryAddressData.address2,
          rfc: tmpDeliveryAddressData.rfc,
          country: tmpDeliveryAddressData.countryId
            ? tmpDeliveryAddressData.countryId.toString()
            : '',
          city: tmpDeliveryAddressData.cityId
            ? tmpDeliveryAddressData.cityId.toString()
            : '',
          cityName: tmpDeliveryAddressData.cityName,
          postCode: tmpDeliveryAddressData.postCode,
          phoneNumber: tmpDeliveryAddressData.consigneeNumber,
          email: tmpDeliveryAddressData.email,
          addressId: tmpDeliveryAddressData.deliveryAddressId
        };
        if (!billingChecked) {
          let tmpBillingAddressData = this.selectedBillingAddress;
          tmpBillingAddress = {
            firstName: tmpBillingAddressData.firstName,
            lastName: tmpBillingAddressData.lastName,
            address1: tmpBillingAddressData.address1,
            address2: tmpBillingAddressData.address2,
            rfc: tmpBillingAddressData.rfc,
            country: tmpBillingAddressData.countryId
              ? tmpBillingAddressData.countryId.toString()
              : '',
            city: tmpBillingAddressData.cityId
              ? tmpBillingAddressData.cityId.toString()
              : '',
            cityName: tmpBillingAddressData.cityName,
            postCode: tmpBillingAddressData.postCode,
            phoneNumber: tmpBillingAddressData.consigneeNumber,
            addressId: tmpBillingAddressData.deliveryAddressId
          };
        }
      }
      const param = {
        billingChecked,
        deliveryAddress: tmpDeliveryAddress
      };
      param.billingAddress = billingChecked
        ? tmpDeliveryAddress
        : tmpBillingAddress;

      // 未开启地图，需校验clinic
      if (
        this.checkoutWithClinic &&
        !configStore.prescriberMap &&
        (!clinicStore.clinicId || !clinicStore.clinicName)
      ) {
        throw new Error(this.props.intl.messages.selectNoneClincTip);
      }

      await validData(ADDRESS_RULE, param.deliveryAddress);
      await validData(ADDRESS_RULE, param.deliveryAddress);
      localItemRoyal.set(
        this.isLogin ? 'loginDeliveryInfo' : 'deliveryInfo',
        param
      );
      this.setState({
        deliveryAddress: param.deliveryAddress,
        billingAddress: param.billingAddress,
        billingChecked: param.billingChecked
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
  startLoading = () => {
    this.setState({ loading: true });
  };
  endLoading = () => {
    this.setState({ loading: false });
  };
  // 校验邮箱/地址信息/最低额度/超库存商品等
  async valideCheckoutLimitRule() {
    const { checkoutStore } = this.props;
    const { guestEmail, tid, intl } = this.state;
    try {
      if (!tid) {
        if (!this.isLogin && !guestEmail) {
          throw new Error(
            intl.formatMessage(
              { id: 'enterCorrectValue' },
              {
                val: intl.formatMessage({ id: 'email' })
              }
            )
          );
        }
        await this.saveAddressAndCommentPromise();

        // 价格未达到底限，不能下单
        if (this.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
          throw new Error(
            intl.formatMessage(
              { id: 'cart.errorInfo3' },
              { val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }
            )
          );
        }

        // 存在下架商品，不能下单
        if (checkoutStore.offShelvesProNames.length) {
          throw new Error(
            intl.formatMessage(
              { id: 'cart.errorInfo4' },
              { val: checkoutStore.offShelvesProNames.join('/') }
            )
          );
        }

        // 库存不够，不能下单
        if (checkoutStore.outOfstockProNames.length) {
          throw new Error(
            this.props.intl.formatMessage(
              { id: 'cart.errorInfo2' },
              { val: checkoutStore.outOfstockProNames.join('/') }
            )
          );
        }
        // 存在被删除商品，不能下单
        if (checkoutStore.deletedProNames.length) {
          throw new Error(
            this.props.intl.formatMessage(
              { id: 'cart.errorInfo5' },
              { val: checkoutStore.deletedProNames.join('/') }
            )
          );
        }
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  savePromotionCode = (promotionCode) => {
    this.setState({
      promotionCode
    });
  };
  handlePaymentTypeChange = (e) => {
    this.setState({ paymentTypeVal: e.target.value, email: '' });
  };

  updateSameAsCheckBoxVal = (val) => {
    const { paymentStore } = this.props;
    const curPanelKey = 'billingAddr';
    // 切换时，需更改 billing module的isPrepared = false, isEdit = true
    if (!val && this.props.paymentStore['billingAddrPanelStatus'].isCompleted) {
      this.props.paymentStore.setStsToEdit({
        key: curPanelKey
      });
    }
    this.setState({ billingChecked: val });
    if (val) {
      this.setState({
        billingAddress: this.state.deliveryAddress
      });
    }
  };

  updateDeliveryAddrData = (data) => {
    this.props.paymentStore.updateSelectedDeliveryAddress(data);
    this.setState({
      deliveryAddress: data
    });
    if (this.state.billingChecked) {
      this.setState({
        billingAddress: data
      });
    }
  };

  updateBillingAddrData = (data) => {
    if (!this.state.billingChecked) {
      this.props.paymentStore.updateSelectedBillingAddress(data);
      this.setState({ billingAddress: data });
    }
  };

  /**
   * 渲染address panel
   */
  renderAddressPanel = () => {
    const { paymentStore } = this.props;
    const { deliveryAddress } = this.state;
    return (
      <>
        <div
          className={`card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3 border ${
            paymentStore.deliveryAddrPanelStatus.isEdit
              ? 'border-333'
              : 'border-transparent'
          }`}
          id="J_checkout_panel_deliveryAddr"
        >
          {this.isLogin ? (
            <AddressList id="1" updateData={this.updateDeliveryAddrData} />
          ) : (
            <VisitorAddress
              key={1}
              type="delivery"
              initData={deliveryAddress}
              updateData={this.updateDeliveryAddrData}
            />
          )}
        </div>
      </>
    );
  };

  /**
   * 渲染订阅/一次购买模式选择
   */
  renderSubSelect = () => {
    return this.isLogin &&
      find(
        this.state.recommend_data.length
          ? this.state.recommend_data
          : this.loginCartData,
        (ele) => ele.subscriptionStatus && ele.subscriptionPrice > 0
      ) ? (
      <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
        <div className="bg-transparent d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <span className="iconfont font-weight-bold mr-2">&#xe657;</span>
            <FormattedMessage id="subscription.chooseSubscription" />
          </h5>
        </div>
        <SubscriptionSelect
          data={this.state.recommend_data}
          updateSelectedData={(data) => {
            this.refs.payProductInfo.setState({
              isShowValidCode: false
            });
            this.props.frequencyStore.updateBuyWay(data.buyWay);
            this.props.frequencyStore.updateFrequencyName(data.frequencyName);

            // ****************订阅的时候隐藏oxxo支付方式start******************
            let payuoxxoIndex;
            if (
              Object.prototype.toString
                .call(this.state.payWayObj)
                .slice(8, -1) === 'Array'
            ) {
              //判断payWayObj是数组
              if (data.buyWay === 'frequency') {
                console.log(this.state.payWayObj);

                //adyen如果选订阅，只保留creditcard/klarnapaylater
                const adyenMethods = this.state.payWayObj.filter(
                  (item, index) => {
                    return (
                      item.name === 'adyen_credit_card' ||
                      item.name === 'adyen_klarna_pay_lat'
                    );
                  }
                );
                if (adyenMethods.length !== 0) {
                  this.setState({ payWayObj: adyenMethods });
                }

                //payu
                payuoxxoIndex = findIndex(this.state.payWayObj, function (o) {
                  return o.name === 'payuoxxo';
                }); //找到oxxo在数组中的下标
                if (payuoxxoIndex !== -1) {
                  this.state.payWayObj.splice(payuoxxoIndex, 1);
                }
              } else {
                //为后台提供的初始支付方式
                this.setState({
                  payWayObj: JSON.parse(
                    JSON.stringify(this.state.savedPayWayObj)
                  )
                });
              }
            }
            // ****************订阅的时候隐藏oxxo支付方式end******************

            if (
              data.buyWay === 'frequency' &&
              this.state.paymentTypeVal === 'oxxo'
            ) {
              this.setState({
                paymentTypeVal: 'payUCreditCard'
              });
            }
            this.setState(
              {
                subForm: data
              },
              () => {
                if (!sessionItemRoyal.get('recommend_product')) {
                  this.props.checkoutStore.updateLoginCart(
                    this.state.promotionCode,
                    this.state.subForm.buyWay !== 'once'
                  );
                }
              }
            );
          }}
        />
      </div>
    ) : null;
  };

  renderBillingJSX = ({ type }) => {
    const {
      billingChecked,
      billingAddress,
      deliveryAddress,
      adyenPayParam,
      tid
    } = this.state;

    if (tid) return null;

    return (
      <>
        <SameAsCheckbox
          initVal={billingChecked}
          updateSameAsCheckBoxVal={this.updateSameAsCheckBoxVal}
          type={type}
        />
        {billingChecked ? (
          <div className="ml-custom mr-custom">
            {this.renderAddrPreview({
              form: billingAddress,
              titleVisible: false,
              boldName: true
            })}
          </div>
        ) : null}

        {!billingChecked && (
          <>
            {this.isLogin ? (
              <AddressList
                ref={this.loginBillingAddrRef}
                key={2}
                type="billing"
                showOperateBtn={false}
                visible={!billingChecked}
                updateData={this.updateBillingAddrData}
                updateFormValidStatus={this.updateValidStatus.bind(this, {
                  key: 'billingAddr'
                })}
              />
            ) : (
              <VisitorAddress
                ref={this.unLoginBillingAddrRef}
                key={2}
                titleVisible={false}
                showConfirmBtn={false}
                type="billing"
                initData={billingAddress}
                updateData={this.updateBillingAddrData}
                updateFormValidStatus={this.updateValidStatus.bind(this, {
                  key: 'billingAddr'
                })}
              />
            )}
          </>
        )}
      </>
    );
  };

  clickConfirmPaymentPanel = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { isLogin } = this;
    const { paymentStore } = this.props;
    const { adyenPayParam } = this.state;

    // 当billing未确认时，需确认
    const { billingChecked } = this.state;
    this.setState({ saveBillingLoading: true });

    async function handleClickSaveAdyenForm(_this) {
      try {
        if (
          _this.adyenCardRef &&
          _this.adyenCardRef.current &&
          _this.adyenCardRef.current.cardListRef &&
          _this.adyenCardRef.current.cardListRef.current
        ) {
          await _this.adyenCardRef.current.cardListRef.current.clickConfirm();
        }
      } catch (e) {
        throw new Error(e.message);
      }
    }

    async function handleClickSavePayUForm(_this) {
      try {
        if (_this.payUCreditCardRef && _this.payUCreditCardRef.current) {
          await _this.payUCreditCardRef.current.handleClickCardConfirm();
          if (
            _this.payUCreditCardRef.current.paymentCompRef &&
            _this.payUCreditCardRef.current.paymentCompRef.current
          ) {
            await _this.payUCreditCardRef.current.paymentCompRef.current.handleSave();
          }
        }
      } catch (e) {
        throw new Error(e.message);
      }
    }

    try {
      if (isLogin) {
        // 1 save billing addr, when billing checked status is false
        if (
          !billingChecked &&
          this.loginBillingAddrRef &&
          this.loginBillingAddrRef.current
        ) {
          await this.loginBillingAddrRef.current.handleSave();
        }
        // 2 save card form, when add a new card
        if (!adyenPayParam) {
          await handleClickSaveAdyenForm(this);
        }
        await handleClickSavePayUForm(this);
      } else {
        // 1 save card form
        // 2 save billing addr, when billing checked status is false
        await handleClickSaveAdyenForm(this);
        await handleClickSavePayUForm(this);
        if (
          !billingChecked &&
          this.unLoginBillingAddrRef &&
          this.unLoginBillingAddrRef.current
        ) {
          this.unLoginBillingAddrRef.current.handleClickConfirm();
        }
      }
      paymentStore.setStsToCompleted({ key: 'billingAddr' });
      paymentStore.setStsToCompleted({ key: 'paymentMethod' });
      paymentStore.setStsToEdit({ key: 'confirmation' });
    } catch (e) {
    } finally {
      this.setState({ saveBillingLoading: false });
      setTimeout(() => {
        scrollPaymentPanelIntoView();
      });
    }
  };

  handleClickPaymentPanelEdit = () => {
    this.props.paymentStore.setStsToEdit({
      key: 'paymentMethod',
      hideOthers: true
    });
    const { billingChecked } = this.state;
    if (!billingChecked) {
      this.props.paymentStore.setStsToEdit({
        key: 'billingAddr'
      });
    }
  };
  updateValidStatus({ key }, status) {
    this.setState({
      validSts: Object.assign(this.state.validSts, { [key]: status })
    });
  }

  /**
   * 渲染支付方式
   */
  renderPayTab = ({ visible = false }) => {
    const {
      paymentTypeVal,
      subForm,
      payWayObj,
      billingChecked,
      email,
      validSts,
      saveBillingLoading,
      selectedCardInfo
    } = this.state;

    // 未勾选same as billing时，校验billing addr
    const validForBilling = !billingChecked && !validSts.billingAddr;

    const payConfirmBtn = ({ disabled, loading = false }) => {
      return (
        <div className="d-flex justify-content-end mt-3">
          <button
            className={`rc-btn rc-btn--one ${loading ? 'ui-btn-loading' : ''}`}
            disabled={disabled}
            onClick={this.clickConfirmPaymentPanel}
          >
            <FormattedMessage id="yes" />
          </button>
        </div>
      );
    };
    return (
      <div className={`pb-3 ${visible ? '' : 'hidden'}`}>
        {/* *******************支付tab栏start************************************ */}
        {/* payWayObj为支付方式，如果大于1种，才显示此tab栏 */}
        {Object.keys(payWayObj).length > 1 && (
          <div className={`ml-custom mr-custom`}>
            {Object.entries(payWayObj).map((item, i) => {
              return (
                <div
                  className={`rc-input rc-input--inline ${
                    subForm.buyWay == 'frequency' &&
                    item[1].id == 'adyenPayLater'
                      ? 'hidden'
                      : ''
                  }`}
                  key={i}
                >
                  <input
                    className="rc-input__radio"
                    id={`payment-info-${item[1].id}`}
                    value={item[1].paymentTypeVal}
                    type="radio"
                    name="payment-info"
                    onChange={this.handlePaymentTypeChange}
                    checked={paymentTypeVal === item[1].paymentTypeVal}
                    key={item[1].id}
                  />
                  <label
                    className="rc-input__label--inline"
                    htmlFor={`payment-info-${item[1].id}`}
                  >
                    <FormattedMessage id={item[1].id} />
                  </label>
                </div>
              );
            })}
          </div>
        )}
        {/* ********************支付tab栏end********************************** */}

        <div className="checkout--padding ml-custom mr-custom pt-3 pb-3 border rounded">
          {/* ***********************支付选项卡的内容start******************************* */}
          {/* oxxo */}
          {paymentTypeVal === 'oxxo' && (
            <>
              <OxxoConfirm
                type={'oxxo'}
                updateEmail={this.updateEmail}
                billingJSX={this.renderBillingJSX({ type: 'oxxo' })}
              />
              {payConfirmBtn({
                disabled: !EMAIL_REGEXP.test(email) || validForBilling
              })}
            </>
          )}
          {/* payu creditCard */}
          {paymentTypeVal === 'payUCreditCard' && (
            <>
              <PayUCreditCard
                ref={this.payUCreditCardRef}
                type={'PayUCreditCard'}
                isLogin={this.isLogin}
                showErrorMsg={this.showErrorMsg}
                onVisitorPayosDataConfirm={(data) => {
                  this.setState({ payosdata: data });
                }}
                onVisitorCardInfoChange={(data) => {
                  this.setState({ creditCardInfo: data });
                }}
                onPaymentCompDataChange={(data) => {
                  this.setState({ selectedCardInfo: data });
                }}
                isApplyCvv={false}
                needReConfirmCVV={true}
                updateFormValidStatus={this.updateValidStatus.bind(this, {
                  key: 'payUCreditCard'
                })}
                billingJSX={this.renderBillingJSX({ type: 'payUCreditCard' })}
                selectedDeliveryAddress={this.selectedDeliveryAddress}
              />
              {payConfirmBtn({
                disabled: !validSts.payUCreditCard || validForBilling,
                loading: saveBillingLoading
              })}
            </>
          )}
          {/* adyenCreditCard */}
          {paymentTypeVal === 'adyenCard' && (
            <>
              <AdyenCreditCard
                ref={this.adyenCardRef}
                subBuyWay={subForm.buyWay}
                showErrorMsg={this.showErrorMsg}
                updateAdyenPayParam={this.updateAdyenPayParam}
                updateFormValidStatus={this.updateValidStatus.bind(this, {
                  key: 'adyenCard'
                })}
                billingJSX={this.renderBillingJSX({ type: 'adyenCard' })}
              />
              {/* 校验状态
                  1 卡校验，从adyen form传入校验状态
                  2 billing校验 */}
              {payConfirmBtn({
                disabled: !validSts.adyenCard || validForBilling,
                loading: saveBillingLoading
              })}
            </>
          )}
          {/* KlarnaPayLater */}
          {paymentTypeVal === 'adyenKlarnaPayLater' && (
            <>
              <AdyenCommonPay
                type={'adyenKlarnaPayLater'}
                updateEmail={this.updateEmail}
                billingJSX={this.renderBillingJSX({
                  type: 'adyenKlarnaPayLater'
                })}
              />
              {/* // 校验状态
            // 1 校验邮箱
            // 2 billing校验 */}
              {payConfirmBtn({
                disabled: !EMAIL_REGEXP.test(email) || validForBilling
              })}
            </>
          )}
          {/* KlarnaPayNow  */}
          {paymentTypeVal === 'adyenKlarnaPayNow' && (
            <>
              <AdyenCommonPay
                type={'adyenKlarnaPayNow'}
                updateEmail={this.updateEmail}
                billingJSX={this.renderBillingJSX({
                  type: 'adyenKlarnaPayNow'
                })}
              />
              {payConfirmBtn({
                disabled: !EMAIL_REGEXP.test(email) || validForBilling
              })}
            </>
          )}
          {/* Sofort */}
          {paymentTypeVal === 'directEbanking' && (
            <>
              <AdyenCommonPay
                type={'directEbanking'}
                updateEmail={this.updateEmail}
                billingJSX={this.renderBillingJSX({ type: 'directEbanking' })}
              />
              {payConfirmBtn({
                disabled: !EMAIL_REGEXP.test(email) || validForBilling
              })}
            </>
          )}

          {/* ***********************支付选项卡的内容end******************************* */}
        </div>
      </div>
    );
  };

  renderAddrPreview = ({ form, titleVisible = false, boldName = false }) => {
    return form ? (
      <>
        {titleVisible && (
          <>
            <span className="medium">
              <FormattedMessage id="billingAddress" />:
            </span>
            <br />
          </>
        )}
        <span className={`${boldName ? 'medium' : ''}`}>
          {form.firstName + ' ' + form.lastName}
        </span>
        <br />
        {form.phoneNumber}
        <br />
        {form.address1}
        <br />
        {form.address2}
        {form.address2 ? <br /> : null}
        {form.postCode}, {form.cityName},{' '}
        {matchNamefromDict(
          this.state.countryList,
          form.country || form.countryId
        )}
      </>
    ) : null;
  };

  /**
   * 渲染pay panel预览信息
   * 不同情况预览不同规则
   */
  renderPayPreview = () => {
    let {
      paymentTypeVal,
      email,
      billingAddress: form,
      adyenPayParam,
      payosdata,
      selectedCardInfo,
      tid
    } = this.state;
    let adyenPaymentMethod;
    let payuPaymentMethod;
    if (adyenPayParam) {
      adyenPaymentMethod = { ...adyenPayParam.adyenPaymentMethod };
    }
    if (selectedCardInfo) {
      payuPaymentMethod = selectedCardInfo.payuPaymentMethod;
    }
    let lastFourDeco;
    let brandDeco;
    let holderNameDeco;
    if (adyenPaymentMethod) {
      lastFourDeco = adyenPaymentMethod.lastFour;
      brandDeco = adyenPaymentMethod.brand;
      holderNameDeco = adyenPaymentMethod.holderName;
    } else if (payosdata && payosdata.vendor) {
      lastFourDeco = payosdata.last_4_digits;
      brandDeco = payosdata.vendor;
      holderNameDeco = payosdata.holder_name;
    } else if (payuPaymentMethod) {
      lastFourDeco = payuPaymentMethod.last_4_digits;
      brandDeco = payuPaymentMethod.vendor;
      holderNameDeco = payuPaymentMethod.holder_name;
    }

    return (
      <div className="ml-custom mr-custom mb-3">
        <div className="row">
          {paymentTypeVal === 'payUCreditCard' ||
          paymentTypeVal === 'adyenCard' ? (
            <div className="col-12 col-md-6">
              <span className="medium">{brandDeco}</span>
              <br />
              {holderNameDeco}
              <br />
              {lastFourDeco ? `************${lastFourDeco}` : null}
            </div>
          ) : (
            <div className="col-12 col-md-6">{email}</div>
          )}
          {!tid && (
            <div className="col-12 col-md-6 mt-2 mt-md-0">
              {this.renderAddrPreview({
                form,
                titleVisible: true,
                boldName: false
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  closePetModal = () => {
    if (this.state.isAdd === 2) {
      this.setState({
        isAdd: 0
      });
    }
    this.setState({
      petModalVisible: false
    });
  };
  petComfirm = (data) => {
    if (!this.isLogin) {
      this.props.checkoutStore.AuditData[
        this.state.currentProIndex
      ].petForm = data;
    } else {
      let handledData;
      this.props.checkoutStore.AuditData.map((el, i) => {
        if (i === this.state.currentProIndex) {
          if (sessionItemRoyal.get('recommend_product')) {
            handledData = this.state.recommend_data.map((recomEl) => {
              if (recomEl.goodsInfoId === el.goodsInfoId) {
                recomEl.petsId = data.value;
                recomEl.petsName = data.name;
                el.petsId = data.value;
                el.petName = data.name;
              }
              return recomEl;
            });
          } else {
            handledData = this.loginCartData.map((loginEl) => {
              if (loginEl.goodsInfoId === el.goodsInfoId) {
                loginEl.petsId = data.value;
                loginEl.petsName = data.name;
                el.petsId = data.value;
                el.petName = data.name;
              }
              return loginEl;
            });
          }
        }
        return el;
      });
      if (sessionItemRoyal.get('recommend_product')) {
        this.setState({ recommend_data: handledData });
      } else {
        this.props.checkoutStore.setLoginCartData(handledData);
      }
    }
    this.closePetModal();
  };
  openNew = () => {
    this.setState({
      isAdd: 1
    });
    this.openPetModal();
  };
  closeNew = () => {
    this.setState({
      isAdd: 2
    });
    this.openPetModal();
  };
  openPetModal = () => {
    this.setState({
      petModalVisible: true
    });
  };
  updateGuestEmail = ({ email: guestEmail }) => {
    this.setState({ guestEmail });
  };
  toggleMobileCart(name) {
    this.setState({ mobileCartVisibleKey: name });
  }
  updateAdyenPayParam = (data) => {
    this.setState({ adyenPayParam: data }, () => {
      console.log(this.state.adyenPayParam);
    });
  };
  updateEmail = (email) => {
    this.setState({ email });
  };
  clickPay = () => {
    const { paymentTypeVal } = this.state;
    this.initCommonPay({
      type: paymentTypeVal
    });
  };
  render() {
    const { paymentMethodPanelStatus } = this;
    const { history, location, checkoutStore } = this.props;
    const {
      loading,
      errorMsg,
      tid,
      orderDetails,
      payWayObj,
      listData,
      recommend_data,
      subForm,
      promotionCode,
      petModalVisible,
      isAdd,
      mobileCartVisibleKey
    } = this.state;
    const event = {
      page: {
        type: 'Checkout',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    const paymentMethodTitleForPrepare = (
      <div className="ml-custom mr-custom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i
            className="rc-icon rc-payment--sm rc-iconography inlineblock"
            style={{
              transform: 'scale(.8)',
              transformOrigin: 'left',
              marginRight: '-.1rem'
            }}
          />{' '}
          <FormattedMessage id="payment.paymentInformation" />
        </h5>
      </div>
    );

    const paymentMethodTitleForEdit = (
      <div className="ml-custom mr-custom d-flex justify-content-between align-items-center red">
        <h5 className="mb-0">
          <i
            className="rc-icon rc-payment--sm rc-brand1 inlineblock"
            style={{
              transform: 'scale(.8)',
              transformOrigin: 'left',
              marginRight: '-.1rem'
            }}
          />{' '}
          <FormattedMessage id="payment.paymentInformation" />
        </h5>
      </div>
    );

    const paymentMethodTitleForCompeleted = (
      <div className="ml-custom mr-custom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i
            className="rc-icon rc-payment--sm rc-iconography inlineblock"
            style={{
              transform: 'scale(.8)',
              transformOrigin: 'left',
              marginRight: '-.1rem'
            }}
          />{' '}
          <FormattedMessage id="payment.paymentInformation" />
          <span className="iconfont font-weight-bold green ml-2">&#xe68c;</span>
        </h5>
        <p
          onClick={this.handleClickPaymentPanelEdit}
          className="rc-styled-link mb-1"
        >
          <FormattedMessage id="edit" />
        </p>
      </div>
    );

    const paymentMethodTitle = paymentMethodPanelStatus.isPrepare
      ? paymentMethodTitleForPrepare
      : paymentMethodPanelStatus.isEdit
      ? paymentMethodTitleForEdit
      : paymentMethodPanelStatus.isCompleted
      ? paymentMethodTitleForCompeleted
      : null;

    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          history={this.props.history}
          showMiniIcons={false}
          showUserIcon={true}
          match={this.props.match}
        />
        {loading ? <Loading /> : null}
        <main className="rc-content--fixed-header rc-bg-colour--brand4">
          <div className="rc-bottom-spacing data-checkout-stage rc-max-width--lg">
            <Progress type="payment" />
            <div className="rc-layout-container rc-three-column rc-max-width--xl mt-3 mt-md-0">
              <div className="rc-column rc-double-width shipping__address">
                {/* 错误提示 */}
                <div
                  className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
                    errorMsg ? '' : 'hidden'
                  }`}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close"
                    role="alert"
                  >
                    {errorMsg}
                  </aside>
                </div>
                {tid ? (
                  <AddressPreview details={orderDetails} />
                ) : (
                  <>
                    <div className="shipping-form" id="J_checkout_panel_email">
                      <div className="bg-transparent">
                        {this.checkoutWithClinic ? (
                          <OnePageClinicForm history={history} />
                        ) : null}
                        {!this.isLogin ? (
                          <OnePageEmailForm
                            history={history}
                            onChange={this.updateGuestEmail}
                          />
                        ) : null}

                        {this.renderAddressPanel()}
                      </div>
                    </div>
                    {/* {this.renderSubSelect()} */}
                  </>
                )}
                {checkoutStore.petFlag && checkoutStore.AuditData.length > 0 && (
                  <div className="card-panel checkout--padding pl-0 pr-0 rc-bg-colour--brand3 rounded pb-0">
                    <h5
                      className="ml-custom mr-custom"
                      style={{ overflow: 'hidden' }}
                    >
                      <i
                        className="rc-icon rc-payment--sm rc-iconography inlineblock"
                        style={{
                          transform: 'scale(.8)',
                          transformOrigin: 'left',
                          marginRight: '-.4rem'
                        }}
                      />{' '}
                      <FormattedMessage id="Pet information" />
                      <p>
                        We need your pet information to authorize these items.
                      </p>
                      {this.isLogin
                        ? checkoutStore.AuditData.map((el, i) => {
                            return (
                              <div className="petProduct">
                                <LazyLoad>
                                  <img
                                    className="pull-left"
                                    alt=""
                                    src={el.goodsInfoImg}
                                  />
                                </LazyLoad>

                                <div
                                  className="pull-left"
                                  style={{
                                    marginTop: '20px',
                                    marginLeft: '20px'
                                  }}
                                >
                                  <p>
                                    <span>Pet:</span>
                                    <span>
                                      {el.petName ? el.petName : 'required'}
                                    </span>
                                  </p>
                                  <p>
                                    <span>Qty:</span>
                                    <span>{el.buyCount}</span>
                                  </p>
                                </div>
                                <div
                                  className="pull-right"
                                  style={{
                                    marginTop: '30px',
                                    marginLeft: '20px'
                                  }}
                                >
                                  <button
                                    className="rc-btn rc-btn--sm rc-btn--one"
                                    onClick={() => {
                                      this.setState({
                                        petModalVisible: true,
                                        currentProIndex: i
                                      });
                                    }}
                                  >
                                    Select a pet
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        : checkoutStore.AuditData.map((el, i) => {
                            return (
                              <div className="petProduct" key={i}>
                                <LazyLoad>
                                  <img
                                    alt=""
                                    src={
                                      el.sizeList.filter((el) => el.selected)[0]
                                        .goodsInfoImg
                                    }
                                    className="pull-left"
                                  />
                                </LazyLoad>
                                <div
                                  className="pull-left"
                                  style={{
                                    marginTop: '20px',
                                    marginLeft: '20px'
                                  }}
                                >
                                  <p>
                                    <span>Pet:</span>
                                    <span>
                                      {el.petForm
                                        ? el.petForm.petName
                                        : 'required'}
                                    </span>
                                  </p>
                                  <p>
                                    <span>Qty:</span>
                                    <span>{el.quantity}</span>
                                  </p>
                                </div>
                                <div
                                  className="pull-right"
                                  style={{
                                    marginTop: '30px',
                                    marginLeft: '20px'
                                  }}
                                >
                                  <button
                                    id="selectPet"
                                    className="rc-btn rc-btn--sm rc-btn--one"
                                    onClick={() => {
                                      this.setState({
                                        petModalVisible: true,
                                        currentProIndex: i
                                      });
                                    }}
                                  >
                                    Select a pet
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                    </h5>
                  </div>
                )}
                <div
                  className={`card-panel checkout--padding rc-bg-colour--brand3 rounded pl-0 pr-0 mb-3 pb-0 border ${
                    paymentMethodPanelStatus.isEdit
                      ? 'border-333'
                      : 'border-transparent'
                  }`}
                  id="J_checkout_panel_paymentMethod"
                >
                  {paymentMethodTitle}
                  {/* 不是prepare状态时，才会显示 */}
                  {this.renderPayTab({
                    visible: paymentMethodPanelStatus.isEdit
                  })}
                  {paymentMethodPanelStatus.isCompleted &&
                    this.renderPayPreview()}
                </div>
                <Confirmation
                  clickPay={this.clickPay}
                  listData={listData}
                  checkRequiredItem={this.checkRequiredItem}
                  checkoutStore={checkoutStore}
                />
              </div>
              <div className="rc-column pl-md-0 rc-md-up">
                {tid ? (
                  <>
                    <RePayProductInfo
                      fixToHeader={false}
                      style={{ background: '#fff' }}
                      details={orderDetails}
                      navigateToProDetails={true}
                      location={location}
                      history={history}
                    />
                  </>
                ) : (
                  <PayProductInfo
                    data={recommend_data}
                    fixToHeader={false}
                    style={{ background: '#fff' }}
                    ref="payProductInfo"
                    location={location}
                    history={history}
                    frequencyName={subForm.frequencyName}
                    buyWay={subForm.buyWay}
                    sendPromotionCode={this.savePromotionCode}
                    promotionCode={promotionCode}
                    operateBtnVisible={!tid}
                  />
                )}
                {process.env.REACT_APP_LANG == 'fr' ? <Faq /> : null}
              </div>
            </div>
          </div>
          <div className="checkout-product-summary rc-bg-colour--brand3 rc-border-all rc-border-colour--brand4 rc-md-down">
            <div
              className={`order-summary-title align-items-center justify-content-between text-center ${
                mobileCartVisibleKey === 'less' ? 'd-flex' : 'hidden'
              }`}
              onClick={this.toggleMobileCart.bind(this, 'more')}
            >
              <span
                className="rc-icon rc-up rc-iconography"
                style={{ transform: 'scale(.7)' }}
              />
              <span>
                <FormattedMessage id="payment.yourOrder" />
              </span>
              <span className="grand-total-sum">
                {formatMoney(this.tradePrice)}
              </span>
            </div>
            <PayProductInfo
              data={recommend_data}
              fixToHeader={false}
              style={{
                background: '#fff',
                maxHeight: '80vh'
              }}
              className={`${mobileCartVisibleKey === 'more' ? '' : 'hidden'}`}
              ref="payProductInfo"
              location={location}
              history={history}
              frequencyName={subForm.frequencyName}
              buyWay={subForm.buyWay}
              sendPromotionCode={this.savePromotionCode}
              promotionCode={promotionCode}
              operateBtnVisible={!tid}
              onClickHeader={this.toggleMobileCart.bind(this, 'less')}
              headerIcon={
                <span className="rc-icon rc-down--xs rc-iconography" />
              }
            />
          </div>
        </main>
        <Footer />
        <PetModal
          visible={petModalVisible}
          isAdd={isAdd}
          openNew={this.openNew}
          closeNew={this.closeNew}
          confirm={this.petComfirm}
          close={this.closePetModal}
        />
      </div>
    );
  }
}

export default Payment;
