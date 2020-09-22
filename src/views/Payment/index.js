import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { findIndex, find } from 'lodash';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Progress from '@/components/Progress';
import PayProductInfo from './PayProductInfo';
import RePayProductInfo from '@/components/PayProductInfo';
import Loading from '@/components/Loading';
import VisitorAddress from './Address/VisitorAddress';
import AddressList from './Address/List';
import SubscriptionSelect from './SubscriptionSelect';
import ClinicForm from './modules/ClinicForm';
import PetModal from './PetModal';
import OnePageClinicForm from './OnePage/ClinicForm';
import AddressPreview from './AddressPreview';
import Confirmation from './modules/Confirmation';
import { formatMoney, validData } from '@/utils/utils';
import { ADDRESS_RULE } from '@/utils/constant';
import { findUserConsentList, getStoreOpenConsentList } from '@/api/consent';
import {
  postVisitorRegisterAndLogin,
  batchAdd,
  confirmAndCommit,
  customerCommitAndPay,
  rePay,
  customerCommitAndPayMix,
  getWays
} from '@/api/payment';

import PayUCreditCard from './PayUCreditCard';
import AdyenCreditCard from './Adyen';
import OxxoConfirm from './Oxxo';
import AdyenCommonPay from './modules/AdyenCommonPay';
import TermsCommon from './Terms/common';

import { getAdyenParam } from './Adyen/utils';
import { getOrderDetails } from '@/api/order';
import { queryCityNameById } from '@/api';
import './modules/adyenCopy.css';
import './index.css';

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
@observer
@injectIntl
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReadPrivacyPolicy: false,
      isShipTracking: false,
      IsNewsLetter: false,
      promotionCode: '',
      billingChecked: true,
      isCompleteCredit: false,
      showPayMethodError: false,
      deliveryAddress: {
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
      //creditCard oxxo adyenCard adyenKlarnaPayNow adyenKlarnaPayLater directEbanking
      paymentTypeVal: '',
      errorMsg: '',
      currentProduct: null,
      loading: false,
      payosdata: {},
      selectedCardInfo: {},
      adyenPayParam: {},
      payWayNameArr: [],
      toolTipVisible: false,
      email: '',
      payWayObj: {}, //支付方式input radio汇总
      savedPayWayObj: {}, //保留初始化的支付方式
      orderDetails: null,
      tid: sessionItemRoyal.get('rc-tid'),
      recommend_data: [],
      petModalVisible: false,
      isAdd: 0,
      listData: [],
      requiredList: [],
      adyenComp: null
    };
    this.timer = null;
  }
  checkRequiredItem = (list) => {
    let requiredList = list.filter((item) => item.isRequired);
    this.setState(
      {
        requiredList
      },
      () => {
        console.log({ requiredList: this.state.requiredList });
      }
    );
  };
  //总的调用consense接口
  getConsentList() {
    this.isLogin
      ? this.doFindUserConsentList()
      : this.doGetStoreOpenConsentList();
  }
  //1.会员调用consense接口
  doFindUserConsentList() {
    findUserConsentList({}).then((result) => {
      this.isExistOptionalListFun(result);
    });
  }
  //2.游客调用consense接口
  doGetStoreOpenConsentList() {
    getStoreOpenConsentList({}).then((result) => {
      this.isExistListFun(result);
    });
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
    if (result.code === 'K-000000') {
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
  }
  //判断consent接口是否存在选填项
  isExistOptionalListFun(result) {
    if (
      result.code === 'K-000000' &&
      result.context.optionalList.length !== 0
    ) {
      const optionalList = result.context.optionalList.map((item) => {
        return {
          id: item.id,
          consentTitle: item.consentTitle,
          isChecked: false,
          isRequired: false,
          detailList: item.detailList
        };
      });
      this.rebindListData(optionalList);
    }
  }
  async componentDidMount() {
    this.getConsentList();

    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }

    if (this.state.tid) {
      this.queryOrderDetails();
    }
    if (sessionItemRoyal.get('recommend_product')) {
      let recommend_data = JSON.parse(
        sessionItemRoyal.get('recommend_product')
      );
      console.log(recommend_data, 'recommend_data', toJS(this.loginCartData));
      recommend_data = recommend_data.map((el) => {
        el.goodsInfo.salePrice = el.goodsInfo.marketPrice;
        el.goodsInfo.buyCount = el.recommendationNumber;
        return el.goodsInfo;
      });
      this.props.checkoutStore.updatePromotionFiled(recommend_data);
      this.setState({ recommend_data });
    }

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
        id: 'adyen',
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
      if (payWay.context[0].name.indexOf('PAYU') != -1) {
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
        if (item == 'adyen_card_subscription') {
          payWayNameArr.push({
            name: 'adyen_credit_card',
            id: 'adyen',
            paymentTypeVal: 'adyenCard'
          });
        }
        if (item == 'adyen_klarna_subscription') {
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

    if (this.isLogin && !this.loginCartData.length && !this.state.tid) {
      console.log(this.isLogin, this.loginCartData.length, this.state.tid, 111);
      this.props.history.push('/cart');
      return false;
    }
    if (
      !this.isLogin &&
      (!this.cartData.length ||
        !this.cartData.filter((ele) => ele.selected).length)
    ) {
      this.props.history.push('/cart');
      return false;
    }

    // fill default subform data
    let cacheSubForm = sessionItemRoyal.get('rc-subform');
    if (cacheSubForm) {
      cacheSubForm = JSON.parse(cacheSubForm);
      this.setState({
        subForm: cacheSubForm
      });
    }
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
    sessionItemRoyal.remove('rc-tid');
    sessionItemRoyal.remove('rc-subform');
    sessionItemRoyal.remove('recommend_product');
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
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
  get paymentMethodPanelStatus() {
    return this.props.paymentStore.panelStatus.paymentMethod;
  }
  get selectedDeliveryAddress() {
    return this.props.paymentStore.selectedDeliveryAddress;
  }
  get selectedBillingAddress() {
    return this.props.paymentStore.selectedBillingAddress;
  }
  get isOnepageCheckout() {
    return process.env.REACT_APP_ONEPAGE_CHECKOUT === 'true';
  }
  get checkoutWithClinic() {
    return process.env.REACT_APP_CHECKOUT_WITH_CLINIC === 'true';
  }
  //是否consent必填项勾选
  isConsentRequiredChecked() {
    let isAllChecked = this.state.requiredList.every((item) => item.isChecked);
    if (!isAllChecked) {
      throw new Error(this.props.intl.messages.CompleteRequiredItems);
    }
  }
  queryOrderDetails() {
    getOrderDetails(this.state.tid).then(async (res) => {
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

  // 总分发clickPay
  distributeClickPay = ({ email, type }) => {
    switch (this.state.paymentTypeVal) {
      case 'adyenCard':
        this.gotoAdyenCreditCardPay();
        break;
      case 'adyenKlarnaPayLater':
        this.initKlarnaPayLater(email);
        break;
      case 'adyenKlarnaPayNow':
        this.initKlarnaPayNow(email);
        break;
      case 'directEbanking':
        this.initSofort();
        break;
      case 'payUCreditCard':
        // todo one page checkout时，此时可能不存在cvv
        this.initPayUCreditCard();
        break;
      case 'oxxo':
        this.initOxxo(email);
        break;
    }
  };

  //支付1.初始化adyen_credit_card
  initAdyenPay() {
    if (!!window.AdyenCheckout) {
      //要有值
      const AdyenCheckout = window.AdyenCheckout;
      // (1) Create an instance of AdyenCheckout
      const checkout = new AdyenCheckout({
        environment: 'test',
        originKey: process.env.REACT_APP_AdyenOriginKEY,
        //  originKey:
        //    'pub.v2.8015632026961356.aHR0cDovL2xvY2FsaG9zdDozMDAw.zvqpQJn9QpSEFqojja-ij4Wkuk7HojZp5rlJOhJ2fY4', // todo
        locale: process.env.REACT_APP_Adyen_locale
      });

      // (2). Create and mount the Component
      const card = checkout
        .create('card', {
          hasHolderName: true,
          holderNameRequired: true,
          enableStoreDetails: false,
          styles: {},
          placeholders: {},
          showPayButton: false,
          brands: ['mc', 'visa', 'amex', 'cartebancaire'],
          onSubmit: (state, component) => {
            console.log(JSON.stringify(state));
            if (state.isValid) {
              //勾选条款验证
              try {
                if (!this.isOnepageCheckout) {
                  this.isConsentRequiredChecked();
                } else {
                  this.props.paymentStore.updatePanelStatus('paymentMethod', {
                    isPrepare: false,
                    isEdit: false,
                    isCompleted: true
                  });
                }
                let adyenPayParam = getAdyenParam(card.data);
                this.setState(
                  {
                    adyenPayParam
                  },
                  () => {
                    if (!this.isOnepageCheckout) {
                      this.gotoAdyenCreditCardPay();
                    }
                  }
                );
              } catch (err) {
                this.showErrorMsg(err.message);
              }
            }
          },
          onChange: (state, component) => {}
        })
        .mount('#card-container');
      this.setState({ adyenComp: card });
    }
  }

  gotoAdyenCreditCardPay = () => {
    this.doGetAdyenPayParam('adyen_credit_card');
  };

  adyenSubmit() {
    this.state.adyenComp.submit();
  }
  //payLater,payNow,sofort支付公共初始化方法
  initCommonPay = ({ email, type }) => {
    this.doGetAdyenPayParam(type);
    this.setState({
      email
    });
  };

  initPayUCreditCard = () => {
    this.doGetAdyenPayParam('payu_credit_card');
  };

  initOxxo = (email) => {
    this.doGetAdyenPayParam('oxxo');
    this.setState({
      email
    });
  };

  /**************支付公共方法start*****************/

  //组装支付共同的参数
  async getAdyenPayParam(type) {
    try {
      let obj = await this.getPayCommonParam();
      let commonParameter = obj.commonParameter;
      let phone = obj.phone;
      let parameters;
      /* 组装支付需要的参数 */
      const actions = {
        oxxo: () => {
          parameters = Object.assign({}, commonParameter, {
            payChannelItem: 'payuoxxo',
            country: 'MEX',
            email: this.state.email
          });
        },
        payu_credit_card: async () => {
          const { selectedCardInfo } = this.state;
          // todo one page checkout时，此时可能不存在cvv
          if (!this.isLogin) {
            parameters = Object.assign({}, commonParameter);
          } else {
            // 获取token，避免传给接口明文cvv
            let cvvResult = await new Promise((resolve) => {
              window.POS.tokenize(
                {
                  token_type: 'card_cvv_code',
                  credit_card_cvv: selectedCardInfo.cardCvv,
                  payment_method_token: selectedCardInfo.paymentMethod.token
                },
                function (result) {
                  console.log('result obtained' + result);
                  resolve(result);
                }
              );
            });
            try {
              cvvResult = JSON.parse(cvvResult);
            } catch (err) {
              throw new Error(err.message);
            }

            const tempPublicParams = Object.assign({}, commonParameter, {
              paymentMethodId: selectedCardInfo.id,
              creditDardCvv: cvvResult && cvvResult.token
            });
            if (this.state.subForm.buyWay === 'frequency') {
              parameters = Object.assign({}, tempPublicParams, {
                payChannelItem: 'payu_subscription'
              });
            } else {
              parameters = Object.assign({}, tempPublicParams, {
                payChannelItem: 'payu_customer'
              });
            }
          }
        },
        adyen_credit_card: () => {
          parameters = Object.assign(commonParameter, {
            ...this.state.adyenPayParam,
            shopperLocale: 'en_US',
            currency: 'EUR',
            country: process.env.REACT_APP_Adyen_country,
            email: this.state.email,
            payChannelItem:
              this.state.subForm.buyWay === 'frequency'
                ? 'adyen_card_subscription'
                : 'adyen_credit_card'
          });
        },
        adyen_klarna_pay_lat: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'klarna',
            payChannelItem:
              this.state.subForm.buyWay === 'frequency'
                ? 'adyen_later_subscription'
                : 'adyen_klarna_pay_lat',
            shopperLocale: 'en_US',
            currency: 'EUR',
            country: 'DE',
            email: this.state.email
          });
        },
        adyen_klarna_pay_now: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'klarna_paynow',
            payChannelItem:
              this.state.subForm.buyWay === 'frequency'
                ? 'adyen_klarna_subscription'
                : 'adyen_klarna_pay_now',
            shopperLocale: 'en_US',
            currency: 'EUR',
            country: 'DE',
            email: this.state.email
          });
        },
        sofort: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'directEbanking',
            payChannelItem:
              this.state.subForm.buyWay === 'frequency'
                ? 'adyen_sofort_subscription'
                : 'directEbanking',
            shopperLocale: 'en_US',
            currency: 'EUR',
            country: 'DE',
            email: this.state.email
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
      throw new Error(err.message);
    }
  }

  //获取参数
  async doGetAdyenPayParam(type) {
    try {
      //---------------会员 是否存在选填项start-----------------
      // if (this.isLogin) {
      //   const consentRes = await findUserConsentList({});

      //   if (
      //     consentRes.code == 'K-000000' &&
      //     consentRes.context.optionalList.length !== 0
      //   ) {
      //     this.props.history.push({
      //       pathname: '/required',
      //       state: { path: 'pay' }
      //     });
      //   }
      // }
      //---------------会员 是否存在选填项end--------------------
      let parameters = await this.getAdyenPayParam(type);
      await this.allAdyenPayment(parameters, type);
    } catch (err) {
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
      }

      payFun(this.state.tid != null, this.isLogin, this.state.subForm.buyWay);

      /* 4)调用支付 */
      const res = await action(parameters);
      const { tid } = this.state;
      let orderNumber;
      let subNumber;
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
          orderNumber = tid || oxxoContent.tid;
          subNumber = oxxoContent.subscribeId;
          gotoConfirmationPage = true;
          break;
        case 'payu_credit_card':
          orderNumber =
            tid || (res.context && res.context[0] && res.context[0].tid);
          subNumber =
            res.context && res.context[0] && res.context[0].subscribeId;
          gotoConfirmationPage = true;
          break;
        case 'adyen_credit_card':
          orderNumber = tid || res.context[0].tid;
          subNumber =
            res.context && res.context[0] && res.context[0].subscribeId;
          gotoConfirmationPage = true;
          break;
        case 'adyen_klarna_pay_lat':
        case 'adyen_klarna_pay_now':
        case 'sofort':
          orderNumber = res.context.pId;
          window.location.href = res.context.url;
          break;
      }
      if (orderNumber) {
        sessionItemRoyal.set('orderNumber', orderNumber);
      }
      if (subNumber) {
        sessionItemRoyal.set('subNumber', subNumber);
      }
      if (oxxoPayUrl) {
        sessionItemRoyal.set('oxxoPayUrl', oxxoPayUrl);
      }

      // update clinic
      clinicStore.removeLinkClinicId();
      clinicStore.removeLinkClinicName();
      clinicStore.setSelectClinicId(this.props.clinicStore.clinicId);
      clinicStore.setSelectClinicName(this.props.clinicStore.clinicName);
      clinicStore.setDefaultClinicId(this.props.clinicStore.clinicId);
      clinicStore.setDefaultClinicName(this.props.clinicStore.clinicName);

      sessionItemRoyal.remove('payosdata');
      if (gotoConfirmationPage) {
        this.props.history.push('/confirmation');
      }
    } catch (err) {
      console.log(err);
      if (!this.isLogin) {
        sessionItemRoyal.remove('rc-token');
      }
      if (err.errorData) {
        //err.errorData是返回的tid(订单号)
        sessionItemRoyal.set('rc-tid', err.errorData);
        this.setState(
          {
            tid: err.errorData
          },
          () => this.queryOrderDetails()
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
          email: creditCardInfo.email
        }
      );
      let postVisitorRegisterAndLoginRes = await postVisitorRegisterAndLogin(
        param
      );
      sessionItemRoyal.set(
        'rc-token',
        postVisitorRegisterAndLoginRes.context.token
      );

      await batchAdd({
        goodsInfos: cartData.map((ele) => {
          return {
            verifyStock: false,
            buyCount: ele.quantity,
            goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId
          };
        })
      });
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
    let {
      deliveryAddress,
      billingAddress,
      creditCardInfo,
      subForm,
      payosdata
    } = this.state;
    let param = {
      firstName: deliveryAddress.firstName,
      lastName: deliveryAddress.lastName,
      zipcode: deliveryAddress.postCode,
      city: deliveryAddress.cityName,
      country: payosdata.country_code,
      token: payosdata.token,
      creditDardCvv: payosdata.encrypted_cvv,
      phone: creditCardInfo.phoneNumber,
      email: creditCardInfo.email,
      line1: deliveryAddress.address1,
      line2: deliveryAddress.address2,
      clinicsId: this.props.clinicStore.clinicId,
      clinicsName: this.props.clinicStore.clinicName,
      storeId: process.env.REACT_APP_STOREID,
      tradeItems: [], // once order products
      subTradeItems: [], // subscription order products
      tradeMarketingList: [],

      last4Digits: payosdata.last_4_digits,
      payAccountName: creditCardInfo.cardOwner,
      payPhoneNumber: creditCardInfo.phoneNumber,

      petsId: '1231',

      deliveryAddressId: deliveryAddress.addressId,
      billAddressId: billingAddress.addressId
    };
    if (!this.checkoutWithClinic) {
      param = Object.assign(param, {
        clinicsId: 'FG20200914',
        clinicsName: 'France Default'
      });
    }
    if (localItemRoyal.get('recommend_product')) {
      param.tradeItems = this.state.recommend_data.map((ele) => {
        return {
          num: ele.buyCount,
          skuId: ele.goodsInfoId
        };
      });
    } else if (this.isLogin) {
      param.tradeItems = loginCartData.map((ele) => {
        return {
          num: ele.buyCount,
          skuId: ele.goodsInfoId,
          petsId: ele.petsId
        };
      });
    } else {
      param.tradeItems = cartData.map((ele) => {
        return {
          num: ele.quantity,
          skuId: find(ele.sizeList, (s) => s.selected).goodsInfoId
        };
      });
    }

    if (subForm.buyWay === 'frequency') {
      param.tradeItems = loginCartData
        .filter((ele) => !ele.subscriptionStatus || !ele.subscriptionPrice)
        .map((g) => {
          return {
            num: g.buyCount,
            skuId: g.goodsInfoId,
            petsId: g.petsId
          };
        });
      param.subTradeItems = loginCartData
        .filter((ele) => ele.subscriptionStatus && ele.subscriptionPrice > 0)
        .map((g) => {
          return {
            subscribeNum: g.buyCount,
            skuId: g.goodsInfoId
          };
        });
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
        if (tmpMarketing.marketingType == 0) {
          targetLevelId =
            tmpMarketing.fullReductionLevelList[0].reductionLevelId;
        } else if (tmpMarketing.marketingType == 1) {
          targetLevelId = tmpMarketing.fullDiscountLevelList[0].discountLevelId;
        }
        tmpParam.marketingLevelId = targetLevelId;
        tmpParam.marketingId = tmpMarketing.marketingId;
        tradeMarketingList.push(tmpParam);
      }
    }

    // rePay
    if (this.state.tid) {
      param.tid = this.state.tid;
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

      if (billingChecked) {
        param.billingAddress = tmpDeliveryAddress;
      } else {
        param.billingAddress = tmpBillingAddress;
      }

      // 未开启地图，需校验clinic
      if (
        this.checkoutWithClinic &&
        !this.props.configStore.prescriberMap &&
        (!this.props.clinicStore.clinicId || !this.props.clinicStore.clinicName)
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
      throw new Error(err.message);
    }
  }
  startLoading() {
    this.setState({ loading: true });
  }
  endLoading() {
    this.setState({ loading: false });
  }
  // 验证地址信息/最低额度/超库存商品等
  async valideCheckoutLimitRule() {
    try {
      if (!this.state.tid) {
        await this.saveAddressAndCommentPromise();

        // 价格未达到底限，不能下单
        if (this.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
          throw new Error(
            this.props.intl.formatMessage(
              { id: 'cart.errorInfo3' },
              { val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }
            )
          );
        }

        // 存在下架商品，不能下单
        if (this.props.checkoutStore.offShelvesProNames.length) {
          throw new Error(
            this.props.intl.formatMessage(
              { id: 'cart.errorInfo4' },
              { val: this.props.checkoutStore.offShelvesProNames.join('/') }
            )
          );
        }

        // 库存不够，不能下单
        if (this.props.checkoutStore.outOfstockProNames.length) {
          throw new Error(
            this.props.intl.formatMessage(
              { id: 'cart.errorInfo2' },
              { val: this.props.checkoutStore.outOfstockProNames.join('/') }
            )
          );
        }
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  savePromotionCode(promotionCode) {
    this.setState({
      promotionCode
    });
  }
  handlePaymentTypeChange(e) {
    this.setState({ paymentTypeVal: e.target.value });
  }

  updateSameAsCheckBoxVal = (val) => {
    this.setState({ billingChecked: val });
    if (val) {
      this.setState({
        billingAddress: this.state.deliveryAddress
      });
    }
  };

  /**
   * 渲染address panel
   */
  _renderAddressPanel = () => {
    const { deliveryAddress, billingAddress } = this.state;
    return (
      <>
        <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
          {this.isLogin ? (
            <AddressList
              id="1"
              updateData={(data) => {
                this.props.paymentStore.updateSelectedDeliveryAddress(data);
                this.setState({ deliveryAddress: data }); // to delete...
              }}
              updateSameAsCheckBoxVal={this.updateSameAsCheckBoxVal}
            />
          ) : (
            <VisitorAddress
              key={1}
              type="delivery"
              data={deliveryAddress}
              updateData={(data) => {
                this.props.paymentStore.updateSelectedDeliveryAddress(data);
                this.setState({
                  deliveryAddress: data
                });
              }}
              updateSameAsCheckBoxVal={this.updateSameAsCheckBoxVal}
            />
          )}
        </div>
        {!this.state.billingChecked && (
          <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
            {this.isLogin ? (
              <AddressList
                id="2"
                type="billing"
                visible={!this.state.billingChecked}
                updateData={(data) => {
                  this.props.paymentStore.updateSelectedBillingAddress(data);
                  this.setState({ billingAddress: data });
                }}
              >
                <div
                  className="card-header bg-transparent position-relative pt-0 pb-0"
                  style={{ zIndex: 2, width: '62%' }}
                >
                  <h5>
                    <i className="rc-icon rc-news--xs rc-iconography" />{' '}
                    <FormattedMessage id="payment.billTitle" />
                  </h5>
                </div>
              </AddressList>
            ) : (
              <VisitorAddress
                key={2}
                type="billing"
                data={billingAddress}
                updateData={(data) => {
                  this.props.paymentStore.updateSelectedBillingAddress(data);
                  this.setState({
                    billingAddress: data
                  });
                }}
              />
            )}
          </div>
        )}
      </>
    );
  };

  /**
   * 渲染订阅/一次购买模式选择
   */
  _renderSubSelect = () => {
    return this.isLogin &&
      find(
        this.state.recommend_data.length
          ? this.state.recommend_data
          : this.loginCartData,
        (ele) => ele.subscriptionStatus && ele.subscriptionPrice > 0
      ) ? (
      <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
        <div className="card-header bg-transparent pt-0 pb-0">
          <h5>
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
                .slice(8, -1) == 'Array'
            ) {
              //判断payWayObj是数组
              if (data.buyWay === 'frequency') {
                payuoxxoIndex = findIndex(this.state.payWayObj, function (o) {
                  return o.name == 'payuoxxo';
                }); //找到oxxo在数组中的下标
                if (payuoxxoIndex != -1) {
                  this.state.payWayObj.splice(payuoxxoIndex, 1);
                }
              } else {
                //为后台提供的初始支付方式
                this.state.payWayObj = JSON.parse(
                  JSON.stringify(this.state.savedPayWayObj)
                );
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

  /**
   * 渲染支付方式
   */
  _renderPayTab = () => {
    const { adyenPayParam } = this.state;
    return (
      <div
        // 没有开启onepagecheckout 或者 不是prepare状态时，才会显示
        className={`${
          !this.isOnepageCheckout || !this.paymentMethodPanelStatus.isPrepare
            ? ''
            : 'hidden'
        }`}
      >
        {/* *******************支付tab栏start************************************ */}
        <div className={`ml-custom mr-custom `}>
          {Object.entries(this.state.payWayObj).map((item) => {
            return (
              <div class="rc-input rc-input--inline">
                <input
                  class="rc-input__radio"
                  id={`payment-info-${item[1].id}`}
                  value={item[1].paymentTypeVal}
                  type="radio"
                  name="payment-info"
                  onChange={(event) => this.handlePaymentTypeChange(event)}
                  checked={this.state.paymentTypeVal === item[1].paymentTypeVal}
                  key={item[1].id}
                />
                <label
                  class="rc-input__label--inline"
                  for={`payment-info-${item[1].id}`}
                >
                  <FormattedMessage id={item[1].id} />
                </label>
              </div>
            );
          })}
        </div>
        {/* ********************支付tab栏end********************************** */}

        {/* ***********************支付选项卡的内容start******************************* */}
        {/* oxxo */}
        {this.state.paymentTypeVal === 'oxxo' && (
          <OxxoConfirm
            history={this.props.history}
            startLoading={() => this.startLoading()}
            endLoading={() => this.endLoading()}
            // clickPay={this.initOxxo}
            clickPay={this.initCommonPay}
          />
        )}
        {/* payu creditCard */}
        <div
          className={`${
            this.state.paymentTypeVal === 'payUCreditCard' ? '' : 'hidden'
          }`}
        >
          <PayUCreditCard
            listData={this.state.listData}
            startLoading={() => this.startLoading()}
            endLoading={() => this.endLoading()}
            showErrorMsg={(data) => this.showErrorMsg(data)}
            // clickPay={this.initPayUCreditCard}
            clickPay={this.initCommonPay}
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
            selectedDeliveryAddress={this.selectedDeliveryAddress}
          />
        </div>
        {/* adyenCreditCard */}
        <div
          className={`${
            this.state.paymentTypeVal === 'adyenCard' ? '' : 'hidden'
          }`}
        >
          <AdyenCreditCard
            listData={this.state.listData}
            checkRequiredItem={this.checkRequiredItem}
          />
          {/* <div class="payment-method checkout--padding">
            <p className="mb-2">
              <span className="logo-payment-card-list logo-credit-card ml-0">
                {ADYEN_CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
                  <img
                    key={idx}
                    style={{ width: '50px' }}
                    className="logo-payment-card mr-1"
                    src={el}
                  />
                ))}
              </span>
            </p>
            <div
              id="card-container"
              className={`payment-method__container ${
                !this.isOnepageCheckout || this.paymentMethodPanelStatus.isEdit
                  ? ''
                  : 'hidden'
              }`}
            />
            {this.isOnepageCheckout &&
              this.paymentMethodPanelStatus.isCompleted && (
                <div className="border pb-2">
                  <p>
                    <span
                      className="pull-right ui-cursor-pointer-pure mr-2"
                      onClick={() => {
                        this.props.paymentStore.updatePanelStatus(
                          'paymentMethod',
                          {
                            isPrepare: false,
                            isEdit: true,
                            isCompleted: false
                          }
                        );
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
                            adyenPayParam.adyenBrands.toUpperCase()
                          ] ||
                          'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                        }
                      />
                    </div>
                    <div className="col-12 col-sm-9 d-flex flex-column justify-content-around">
                      <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                        <div className="col-12 color-999">
                          <FormattedMessage id="name2" />
                          <br />
                          <span className="creditCompleteInfo">
                            {adyenPayParam.hasHolderName}
                          </span>
                        </div>
                      </div>
                      <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                        <div className="col-6 color-999">
                          <FormattedMessage id="payment.cardNumber2" />
                          <br />
                          <span className="creditCompleteInfo">
                            xxxx xxxx xxxx
                          </span>
                        </div>
                        <div className="col-6 color-999">
                          <FormattedMessage id="payment.cardType" />
                          <br />
                          <span className="creditCompleteInfo">
                            {adyenPayParam.adyenName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
todo
            <TermsCommon 
              id={'adyenCreditCard'}
              listData = {this.state.listData}
              checkRequiredItem = {this.checkRequiredItem}/>
          </div>*/}
        </div>
        {/* KlarnaPayLater */}
        <div
          className={`${
            this.state.paymentTypeVal === 'adyenKlarnaPayLater' ? '' : 'hidden'
          }`}
        >
          <AdyenCommonPay
            type={'adyen_klarna_pay_lat'}
            listData={this.state.listData}
            clickPay={this.initCommonPay}
            showErrorMsg={this.showErrorMsg}
          />
        </div>
        {/* KlarnaPayNow  */}
        <div
          className={`${
            this.state.paymentTypeVal === 'adyenKlarnaPayNow' ? '' : 'hidden'
          }`}
        >
          <AdyenCommonPay
            type={'adyen_klarna_pay_now'}
            listData={this.state.listData}
            clickPay={this.initCommonPay}
            showErrorMsg={this.showErrorMsg}
          />
        </div>
        {/* Sofort */}
        <div
          className={`${
            this.state.paymentTypeVal === 'directEbanking' ? '' : 'hidden'
          }`}
        >
          <AdyenCommonPay
            type={'sofort'}
            listData={this.state.listData}
            clickPay={this.initCommonPay}
            showErrorMsg={this.showErrorMsg}
          />
        </div>
        {/* ***********************支付选项卡的内容end******************************* */}
      </div>
    );
  };

  closePetModal() {
    if (this.state.isAdd === 2) {
      this.setState({
        isAdd: 0
      });
    }
    this.setState({
      petModalVisible: false
    });
  }
  petComfirm(data) {
    let loginCartData = this.loginCartData;
    console.log(data, this.props, toJS(loginCartData));
    loginCartData = loginCartData.map((el, i) => {
      if (i === this.state.currentProIndex) {
        el.petsId = data.value;
        el.petName = data.name;
      }
      return el;
    });
    this.props.checkoutStore.setLoginCartData(loginCartData);
    this.closePetModal();
    // this.props.history.push('/prescription');
  }
  openNew() {
    this.setState({
      isAdd: 1
    });
    this.openPetModal();
  }
  closeNew() {
    this.setState({
      isAdd: 2
    });
    this.openPetModal();
  }
  openPetModal() {
    this.setState({
      petModalVisible: true
    });
  }
  render() {
    const event = {
      page: {
        type: 'Checkout',
        theme: ''
      }
    };

    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          history={this.props.history}
          showMiniIcons={false}
          showUserIcon={true}
        />
        {this.state.loading ? <Loading /> : null}
        <main className="rc-content--fixed-header rc-bg-colour--brand4">
          <div className="rc-bottom-spacing data-checkout-stage rc-max-width--lg">
            <Progress type="payment" />
            <div className="rc-layout-container rc-three-column rc-max-width--xl">
              <div className="rc-column rc-double-width shipping__address">
                {/* 错误提示 */}
                <div
                  className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
                    this.state.errorMsg ? '' : 'hidden'
                  }`}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close"
                    role="alert"
                  >
                    {this.state.errorMsg}
                  </aside>
                </div>
                {this.state.tid ? (
                  <AddressPreview details={this.state.orderDetails} />
                ) : (
                  <>
                    <div className="shipping-form">
                      <div className="bg-transparent">
                        {this.checkoutWithClinic ? (
                          this.isOnepageCheckout ? (
                            <OnePageClinicForm history={this.props.history} />
                          ) : (
                            <ClinicForm history={this.props.history} />
                          )
                        ) : null}
                        {this._renderAddressPanel()}
                      </div>
                    </div>
                    {this._renderSubSelect()}
                  </>
                )}
                <div className="card-panel checkout--padding pl-0 pr-0 rc-bg-colour--brand3 rounded pb-0">
                  <h5
                    className="ml-custom mr-custom"
                    style={{ overflow: 'hidden' }}
                  >
                    <i
                      class="rc-icon rc-payment--sm rc-iconography"
                      style={{ transform: 'scale(.9)' }}
                    ></i>{' '}
                    <FormattedMessage id="Pet information" />
                    <p>
                      We need your pet information to authorize these items.
                    </p>
                    {this.loginCartData.map((el, i) => {
                      console.log(el, 'hahah');
                      return (
                        <div className="petProduct">
                          <img
                            src={el.goodsInfoImg}
                            style={{ float: 'left' }}
                          />
                          <div
                            style={{
                              float: 'left',
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
                            style={{
                              float: 'right',
                              marginTop: '30px',
                              marginLeft: '20px'
                            }}
                          >
                            <button
                              class="rc-btn rc-btn--sm rc-btn--one"
                              onClick={() => {
                                this.setState({
                                  petModalVisible: true,
                                  currentProIndex: i
                                });
                              }}
                            >
                              Select a pet
                            </button>
                            {/* &nbsp;&nbsp;
                            or
                            &nbsp;&nbsp;
                            <a class="rc-styled-link rc-btn--sm" href="#/">add a pet</a> */}
                          </div>
                        </div>
                      );
                    })}
                  </h5>

                  {/* {this._renderPayTab()} */}
                </div>
                <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded pl-0 pr-0 mb-3 pb-0">
                  <h5 className="ml-custom mr-custom">
                    <i
                      class="rc-icon rc-payment--sm rc-iconography"
                      style={{ transform: 'scale(.9)' }}
                    />{' '}
                    <FormattedMessage id="payment.paymentInformation" />
                  </h5>

                  {this._renderPayTab()}
                </div>
                {this.isOnepageCheckout && (
                  <Confirmation clickPay={this.initCommonPay} />
                )}
                {this.state.paymentTypeVal === 'adyenCard' && (
                  <div className="place_order-btn card rc-bg-colour--brand4 pt-4">
                    <div className="next-step-button">
                      <div className="rc-text--right">
                        <button
                          className={`rc-btn rc-btn--one submit-payment`}
                          type="submit"
                          name="submit"
                          value="submit-shipping"
                          onClick={() => this.adyenSubmit()}
                        >
                          <FormattedMessage id="payment.further" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="rc-column pl-md-0">
                {this.state.tid ? (
                  <>
                    <RePayProductInfo
                      fixToHeader={true}
                      details={this.state.orderDetails}
                      navigateToProDetails={true}
                    />
                  </>
                ) : (
                  <PayProductInfo
                    data={this.state.recommend_data}
                    ref="payProductInfo"
                    location={this.props.location}
                    history={this.props.history}
                    frequencyName={this.state.subForm.frequencyName}
                    buyWay={this.state.subForm.buyWay}
                    sendPromotionCode={(e) => this.savePromotionCode(e)}
                    promotionCode={this.state.promotionCode}
                    operateBtnVisible={!this.state.tid}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <PetModal
          visible={this.state.petModalVisible}
          isAdd={this.state.isAdd}
          productList={this.state.productList}
          openNew={() => this.openNew()}
          closeNew={() => this.closeNew()}
          confirm={(data) => this.petComfirm(data)}
          close={() => this.closePetModal()}
        />
      </div>
    );
  }
}

export default Payment;
