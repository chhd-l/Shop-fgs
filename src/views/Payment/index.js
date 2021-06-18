import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import Modal from '@/components/Modal';
import find from 'lodash/find';
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
import Faq from './Faq';
import Loading from '@/components/Loading';
import LazyLoad from 'react-lazyload';
import ValidationAddressModal from '@/components/validationAddressModal';

import VisitorAddress from './Address/VisitorAddress';
import AddressList from './Address/List';
import AddressPreview from './Address/Preview';

import PetModal from './PetModal';
import RepayAddressPreview from './AddressPreview';
import Confirmation from './modules/Confirmation';
import SameAsCheckbox from './Address/SameAsCheckbox';
import CyberSaveCardCheckbox from './Address/CyberSaveCardCheckbox';
import { withOktaAuth } from '@okta/okta-react';
import { searchNextConfirmPanel } from './modules/utils';
import {
  formatMoney,
  generatePayUScript,
  getFormatDate,
  setSeoConfig,
  validData,
  bindSubmitParam
} from '@/utils/utils';
import { EMAIL_REGEXP } from '@/utils/constant';
import {
  findUserConsentList,
  getStoreOpenConsentList,
  userBindConsent
} from '@/api/consent';
import {
  postVisitorRegisterAndLogin,
  batchAdd,
  confirmAndCommit,
  customerCommitAndPay,
  rePay,
  customerCommitAndPayMix,
  getWays,
  getPaymentMethod
} from '@/api/payment';
import { getOrderDetails } from '@/api/order';
import { batchAddPets } from '@/api/pet';
import { editAddress } from '@/api/address';

import PayUCreditCard from './PaymentMethod/PayUCreditCard';
import AdyenCreditCard from './PaymentMethod/Adyen';
import CyberCardList from './PaymentMethod/Cyber/list';
import Cod from './PaymentMethod/Cod';
import OxxoConfirm from './PaymentMethod/Oxxo';
import AdyenCommonPay from './PaymentMethod/AdyenCommonPay';

import CyberPaymentForm from '@/components/CyberPaymentForm';

import OnePageEmailForm from './OnePage/EmailForm';
import OnePageClinicForm from './OnePage/ClinicForm';

import './modules/adyenCopy.css';
import './index.css';
import { Helmet } from 'react-helmet';
import Adyen3DForm from '@/components/Adyen/3d';
import { ADDRESS_RULE } from './PaymentMethod/Cyber/constant/utils';
import { doGetGAVal } from '@/utils/GA';
import { cyberFormTitle } from '@/utils/constant/cyber';
import { getProductPetConfig } from '@/api/payment';
import { registerCustomerList, guestList, commonList } from './tr_consent';
import ConsentData from '@/utils/consent';
import CyberPayment from './PaymentMethod/Cyber';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

const isHubGA = process.env.REACT_APP_HUB_GA;
const hideBillingAddr = Boolean(
  +process.env.REACT_APP_HIDE_CHECKOUT_BILLING_ADDR
);

function CreditCardInfoPreview({
  data: { holderNameDeco, brandDeco, lastFourDeco, expirationDate }
}) {
  return (
    <div className="col-12 col-md-6">
      <span className="medium">
        <FormattedMessage id="bankCard" />
      </span>
      <br />
      <span>{holderNameDeco}</span>
      <br />
      <span>{brandDeco}</span>
      <br />
      <span>{lastFourDeco ? `************${lastFourDeco}` : null}</span>
      {expirationDate ? (
        <>
          <br />
          <span>
            {getFormatDate(expirationDate, (date) => {
              if (process.env.REACT_APP_COUNTRY === 'fr') {
                return date.slice(3);
              } else {
                return date;
              }
            })}
          </span>
        </>
      ) : null}
    </div>
  );
}

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
      adyenAction: {},
      promotionCode: this.props.checkoutStore.promotionCode || '',
      billingChecked: true,
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      deliveryAddress: {
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        address1: '',
        address2: '',
        country: '',
        countryId: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        cityId: '',
        city: '',
        area: '',
        areaId: '',
        regionId: '',
        region: '',
        provinceNo: '',
        provinceId: '',
        province: '',
        stateId: '',
        postCode: '',
        phoneNumber: '',
        entrance: '',
        apartment: '',
        street: '',
        house: '',
        housing: '',
        comment: '',
        minDeliveryTime: 0,
        maxDeliveryTime: 0,
        DuData: null, // 俄罗斯DuData
        formRule: [] // form表单校验规则
      },
      billingAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        rfc: '',
        entrance: '',
        apartment: '',
        comment: '',
        countryId: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        country: '',
        cityId: '',
        city: '',
        postCode: '',
        phoneNumber: ''
      },
      wrongBillingAddress: localItemRoyal.get('rc-wrongAddressMsg')
        ? JSON.parse(localItemRoyal.get('rc-wrongAddressMsg'))
        : [],
      billingAddressErrorMsg: '',
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
        buyWay: 'once'
      },
      paymentTypeVal: '',
      errorMsg: '',
      loading: false,
      payosdata: null,
      selectedCardInfo: null,
      adyenPayParam: null,
      payWayNameArr: [],
      email: '',
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
      needPrescriber:
        localItemRoyal.get('checkOutNeedShowPrescriber') === 'true', //调整checkout页面第一行显示prescriber信息条件：商品Need prescriber或者已经有了prescriber信息
      unLoginBackPets: [],
      guestEmail: '',
      mobileCartVisibleKey: 'less', // less/more
      validSts: { billingAddr: true },
      validForBilling: false,
      saveBillingLoading: false,
      payWayErr: '',
      pet: {},
      //cyber参数
      cyberPaymentForm: {
        cardholderName: '', //Didier Valansot
        cardNumber: '', //4111111111111111
        expirationMonth: '',
        expirationYear: '',
        securityCode: '', //000
        firstName: '',
        lastName: '',
        address1: '',
        address2: '', //非必填
        country: '',
        state: '', //Alabama
        city: '',
        zipCode: '',
        email: '',
        isSaveCard: false
      },
      cyberErrMsgObj: {},

      cardTypeVal: '',
      cyberPayParam: '',
      isShowCardList: false,
      isShowCyberBindCardBtn: false,
      cardListLength: 0,
      paymentValidationLoading: false, // 地址校验loading
      btnLoading: false,
      validationModalVisible: false, // 地址校验查询开关
      selectValidationOption: 'suggestedAddress', // 校验选择
      isShowValidationModal: true, // 是否显示验证弹框
      billingAddressAddOrEdit: false, // billingAddress编辑或者添加地址
      validationAddress: [], // 校验地址
      ruShippingDTO: {
        regionFias: '',
        areaFias: '',
        cityFias: '',
        settlementFias: '',
        postalCode: ''
      } // 俄罗斯计算运费DuData对象，purchases接口用
    };
    this.timer = null;
    this.toggleMobileCart = this.toggleMobileCart.bind(this);
    this.updateValidStatus = this.updateValidStatus.bind(this);
    this.unLoginBillingAddrRef = React.createRef();
    this.loginBillingAddrRef = React.createRef();
    this.adyenCardRef = React.createRef();
    this.payUCreditCardRef = React.createRef();
    this.cyberCardRef = React.createRef();
    this.cyberCardListRef = React.createRef();
    this.cyberRef = React.createRef();
    this.confirmListValidationAddress = this.confirmListValidationAddress.bind(
      this
    );
  }
  componentWillMount() {
    isHubGA && this.getPetVal();
  }
  async componentDidMount() {
    await this.props.configStore.getSystemFormConfig();
    if (this.isLogin) {
      this.queryList();
    }

    try {
      const { history } = this.props;
      const { tid } = this.state;

      setSeoConfig({
        pageName: 'Checkout page'
      }).then((res) => {
        this.setState({ seoConfig: res });
      });

      if (tid) {
        this.queryOrderDetails();
      }

      this.setState(
        {
          subForm: {
            buyWay: this.computedCartData.filter((el) => el.goodsInfoFlag)
              .length
              ? 'frequency'
              : 'once'
          }
        },
        () => {
          this.setState({
            cyberPaymentForm: Object.assign({}, this.state.cyberPaymentForm, {
              isSaveCard: true
            })
          });
        }
      );

      const recommendProductJson = sessionItemRoyal.get('recommend_product');
      if (!recommendProductJson) {
        if (!this.computedCartData.length && !tid) {
          sessionItemRoyal.remove('rc-iframe-from-storepotal');
          history.push('/cart');
          return false;
        }
      } else {
        let recommend_data = JSON.parse(recommendProductJson);
        recommend_data = recommend_data.map((el) => {
          el.goodsInfo.salePrice = el.goodsInfo.marketPrice;
          el.goodsInfo.buyCount = el.recommendationNumber;
          return el.goodsInfo;
        });
        this.props.checkoutStore.updatePromotionFiled(recommend_data);
        this.setState({ recommend_data });
      }
    } catch (err) {
      console.warn(err);
    }

    let consentData = await ConsentData(this.props);
    this.rebindListData(consentData);
    this.initPaymentWay();
    this.initPanelStatus();
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
    sessionItemRoyal.remove('rc-tid');
    sessionItemRoyal.remove('rc-tidList');
    sessionItemRoyal.remove('recommend_product');
    sessionItemRoyal.remove('orderSource');
  }
  get billingAdd() {
    return this.state.billingAddress;
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
  get computedCartData() {
    return this.isLogin ? this.loginCartData : this.cartData;
  }
  get tradePrice() {
    return this.props.checkoutStore.tradePrice;
  }
  get paymentMethodPanelStatus() {
    return this.props.paymentStore.paymentMethodPanelStatus;
  }
  get defaultCardDataFromAddr() {
    return this.props.paymentStore.defaultCardDataFromAddr;
  }
  get isPayUPaymentTypeVal() {
    return ['payUCreditCard', 'payUCreditCardRU', 'payUCreditCardTU'].includes(
      this.state.paymentTypeVal
    );
  }
  // 当前是否为订阅购买
  get isCurrentBuyWaySubscription() {
    let isSubscription =
      this.state.subForm?.buyWay == 'frequency' ||
      this.state.orderDetails?.subscriptionResponseVO
        ? true
        : false;
    //this.state.orderDetails?.subscriptionResponseVO 这个是repay通过订单号查询的是否订阅的字段
    return isSubscription;
  }
  /**
   * init panel prepare/edit/complete status
   */
  sendCyberPaymentForm = (cyberPaymentForm) => {
    this.setState({ cyberPaymentForm });
  };
  initPanelStatus() {
    const { paymentStore } = this.props;
    const { tid } = this.state;

    // repay情况下，地址信息不可编辑，直接置为
    if (tid) {
      paymentStore.setStsToCompleted({
        key: 'deliveryAddr',
        isFirstLoad: true
      });
      paymentStore.setStsToCompleted({
        key: 'billingAddr',
        isFirstLoad: true
      });
      // 下一个最近的未complete的panel
      const nextConfirmPanel = searchNextConfirmPanel({
        list: toJS(paymentStore.panelStatus),
        curKey: 'deliveryAddr'
      });
      paymentStore.setStsToEdit({ key: nextConfirmPanel.key });
    }
  }
  updateSelectedCardInfo = (data) => {
    let cyberMd5Cvv;
    if (data?.cardCvv) {
      if (this.state.paymentTypeVal == 'cyber') {
        cyberMd5Cvv = md5(data.lastFourDigits + data.cardCvv);
        data = Object.assign({}, data, { cardCvv: cyberMd5Cvv });
      }
      this.setState({
        isShowCyberBindCardBtn: true,
        cyberPayParam: data
      });
    } else {
      this.setState({
        isShowCyberBindCardBtn: false,
        cyberPayParam: data
      });
    }
  };
  inputBlur = async (e) => {
    const { cyberErrMsgObj } = this.state;
    const target = e.target;
    const targetRule = ADDRESS_RULE.filter((e) => e.key === target.name);
    const value = target.value;
    try {
      await validData(targetRule, { [target.name]: value });
      this.setState({
        cyberErrMsgObj: Object.assign({}, cyberErrMsgObj, {
          [target.name]: ''
        })
      });
    } catch (err) {
      this.setState({
        cyberErrMsgObj: Object.assign({}, cyberErrMsgObj, {
          [target.name]: err.message
        })
      });
    }
  };
  getPetVal() {
    let obj = doGetGAVal(this.props);
    this.setState({ pet: obj });
    sessionItemRoyal.set('gaPet', JSON.stringify(obj));
  }
  queryList = async () => {
    try {
      let res = await getPaymentMethod();
      let cardList = res.context;
      this.setState({ cardListLength: cardList.length });
      if (cardList.length > 0) {
        this.setState({ isShowCardList: true });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  checkRequiredItem = (list) => {
    let requiredList = list?.filter((item) => item.isRequired);
    this.setState({
      requiredList
    });
  };
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

  //获取支付方式
  initPaymentWay = async () => {
    try {
      const payWay = await getWays();
      // name:后台返回的支付方式，langKey：翻译id，paymentTypeVal：前端显示的支付方式
      let payMethodsObj = {
        PAYU: {
          name: 'payu',
          langKey: 'creditCard',
          paymentTypeVal: 'payUCreditCard'
        },
        PAYU_RU: {
          name: 'payu_ru',
          langKey: 'creditCard',
          paymentTypeVal: 'payUCreditCardRU'
        },
        PAYU_TU: {
          name: 'payu_tu',
          langKey: 'creditCard',
          paymentTypeVal: 'payUCreditCardTU'
        },
        COD: {
          name: 'payu_cod',
          langKey: 'cod',
          paymentTypeVal: 'cod'
        },
        PAYUOXXO: { name: 'payuoxxo', langKey: 'oxxo', paymentTypeVal: 'oxxo' },
        adyen_credit_card: {
          name: 'adyen_credit_card',
          langKey: 'adyenCard',
          paymentTypeVal: 'adyenCard'
        },
        adyen_klarna_pay_now: {
          name: 'adyen_klarna_pay_now',
          langKey: 'adyenPayNow',
          paymentTypeVal: 'adyenKlarnaPayNow'
        },
        adyen_klarna_pay_later: {
          name: 'adyen_klarna_pay_lat',
          langKey: 'adyenPayLater',
          paymentTypeVal: 'adyenKlarnaPayLater'
        },
        directEbanking: {
          name: 'directEbanking',
          langKey: 'sofort',
          paymentTypeVal: 'directEbanking'
        },
        adyen_oxxo: {
          name: 'adyen_oxxo',
          langKey: 'oxxo',
          paymentTypeVal: 'adyenOxxo'
        },
        pc_web: {
          name: 'cyber',
          langKey: 'cyber',
          paymentTypeVal: 'cyber'
        }
      };
      if (
        process.env.REACT_APP_COUNTRY === 'ru' &&
        sessionItemRoyal.get('rc-iframe-from-storepotal')
      ) {
        payMethodsObj = {
          COD: {
            name: 'payu_cod',
            langKey: 'cod',
            paymentTypeVal: 'cod'
          }
        };
      }
      let payWayNameArr = [];

      if (payWay.context) {
        // 筛选条件: 1.开关开启 2.订阅购买时, 排除不支持订阅的支付方式 3.cod时, 是否超过限制价格
        payWayNameArr = (payWay.context.payPspItemVOList || [])
          .map((p) => {
            const tmp =
              payMethodsObj[p.code] || payMethodsObj[p.code.toUpperCase()];
            return tmp ? Object.assign({}, tmp, p) : tmp;
          })
          .filter((e) => e)
          .filter(
            (e) =>
              e.isOpen &&
              (!this.isCurrentBuyWaySubscription || e.supportSubscription) &&
              (e.code !== 'cod' || this.tradePrice <= e.maxAmount)
          );
      }

      //默认第一个,如没有支付方式,就不初始化方法
      this.setState(
        {
          payWayNameArr
        },
        () => {
          this.setState(
            {
              paymentTypeVal: payWayNameArr[0]?.paymentTypeVal || ''
            },
            () => this.onPaymentTypeValChange()
          );
        }
      );
    } catch (e) {
      this.setState({
        payWayErr: e.message
      });
    }
  };
  onPaymentTypeValChange() {
    const supportPaymentMethods =
      this.state.payWayNameArr.filter(
        (p) => p.paymentTypeVal === this.state.paymentTypeVal
      )[0]?.payPspItemCardTypeVOList || [];
    this.props.paymentStore.setSupportPaymentMethods(supportPaymentMethods);
    this.setState(
      { cardTypeVal: supportPaymentMethods[0]?.cardType || '' },
      () => {
        this.onCardTypeValChange();
      }
    );
  }
  onCardTypeValChange() {
    const { paymentStore } = this.props;
    paymentStore.setCurrentCardTypeInfo(
      paymentStore.supportPaymentMethods.filter(
        (s) => s.cardType === this.state.cardTypeVal
      )[0] || null
    );
  }
  generatePayUParam = () => {
    const jsessionid =
      Cookies.get('jsessionid') ||
      sessionItemRoyal.get('jsessionid') ||
      `${this.userInfo?.customerId}${new Date().getTime()}`;
    if (jsessionid) {
      const fingerprint = md5(`${jsessionid}${new Date().getTime()}`);
      generatePayUScript(fingerprint);
      this.jsessionid = jsessionid;
      this.fingerprint = fingerprint;
    }
  };
  // 获取订单详细
  queryOrderDetails() {
    getOrderDetails(this.state.tidList[0]).then(async (res) => {
      let resContext = res.context;
      this.setState({
        orderDetails: resContext
      });

      // 获取本地存储的计算运费折扣
      const calculationParam =
        localItemRoyal.get('rc-calculation-param') || null;
      // 查询运费折扣
      this.updateDeliveryAddrData(calculationParam);
    });
  }
  showErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg,
      loading: false
    });
    if (msg) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorMsg: ''
      });
    }, 5000);
  };
  // 4、支付公共初始化方法
  initCommonPay = ({ email = '', type }) => {
    if (this.props.checkoutStore.AuditData.length) {
      let petFlag = true;
      let data = this.props.checkoutStore.AuditData;
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

  async hanldePAYUCheckoutParams({
    commonParameter,
    parameters,
    payPspItemEnum,
    country,
    ...otherParams
  }) {
    const { selectedCardInfo } = this.state;
    parameters = Object.assign({}, commonParameter, {
      payPspItemEnum,
      country,
      ...otherParams
    });
    if (selectedCardInfo && selectedCardInfo.paymentToken) {
      try {
        // 获取token，避免传给接口明文cvv
        // console.log(selectedCardInfo, 'selectedCardInfo');
        this.startLoading();
        let cvvResult = await new Promise((resolve) => {
          window.POS.tokenize(
            {
              token_type: 'card_cvv_code',
              credit_card_cvv: selectedCardInfo.cardCvv,
              payment_method_token: selectedCardInfo.paymentToken
            },
            function (result) {
              // console.log('result obtained' + result);
              resolve(result);
            }
          );
        });
        cvvResult = JSON.parse(cvvResult);
        parameters = Object.assign(parameters, {
          paymentMethodId: selectedCardInfo.id,
          creditDardCvv: cvvResult && cvvResult.token
        });
      } catch (err) {
        this.endLoading();
        throw new Error(err.message);
      }
    }
    return new Promise((resolve) => {
      resolve(parameters);
    });
  }

  // 6、组装支付共同的参数
  async getAdyenPayParam(type) {
    try {
      const { email } = this.state;
      const { isLogin } = this;
      let obj = await this.getPayCommonParam();
      let commonParameter = obj.commonParameter;
      //在commonParameter加上一个consentIds-start
      if (process.env.REACT_APP_COUNTRY == 'tr') {
        let list = [...this.state.listData];
        let consentIds = [];
        list
          .filter((item) => item.isRequired)
          .forEach((item) => {
            if (
              item.desc == 'RC_DF_TR_FGS_A' ||
              item.desc == 'RC_DF_TR_FGS_B'
            ) {
              consentIds.push(item.id);
            }
          });
        commonParameter.consentIds = consentIds;
      }
      //在commonParameter加上一个consentIds-end
      let phone = obj.phone;
      let parameters;
      /* 组装支付需要的参数 */
      // console.log(type, parameters, commonParameter, obj, 'type');
      const actions = {
        oxxo: () => {
          parameters = Object.assign({}, commonParameter, {
            payPspItemEnum: 'PAYU_OXXO',
            country: 'MEX',
            email
          });
        },
        payUCreditCard: async () => {
          parameters = await this.hanldePAYUCheckoutParams({
            commonParameter,
            parameters,
            payPspItemEnum: 'PAYU_CREDIT_CARD',
            country: 'MEX'
          });
        },
        payUCreditCardRU: async () => {
          parameters = await this.hanldePAYUCheckoutParams({
            commonParameter,
            parameters: parameters,
            payPspItemEnum: isLogin ? 'PAYU_RUSSIA_AUTOSHIP2' : 'PAYU_RUSSIA',
            country: 'RUS'
          });
        },
        payUCreditCardTU: async () => {
          let installments;
          const {
            checkoutStore: { installMentParam }
          } = this.props;
          if (installMentParam) {
            installments = installMentParam.installmentNumber;
          }
          parameters = await this.hanldePAYUCheckoutParams({
            commonParameter,
            parameters,
            payPspItemEnum: isLogin ? 'PAYU_TURKEY_AUTOSHIP2' : 'PAYU_TURKEY',
            country: 'TUR',
            installments,
            installmentPrice: installMentParam
          });
        },
        cod: () => {
          parameters = Object.assign(commonParameter, {
            payPspItemEnum: 'PAYU_RUSSIA_COD'
          });
        },
        adyenCard: () => {
          const { adyenPayParam } = this.state;
          parameters = Object.assign(commonParameter, {
            browserInfo: this.props.paymentStore.browserInfo,
            encryptedSecurityCode: adyenPayParam.encryptedSecurityCode,
            shopperLocale: process.env.REACT_APP_SHOPPER_LOCALE || 'en_US',
            currency: process.env.REACT_APP_CURRENCY,
            country: process.env.REACT_APP_Adyen_country,
            payPspItemEnum: 'ADYEN_CREDIT_CARD'
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
            payPspItemEnum: 'ADYEN_KLARNA_PAY_LATER',
            shopperLocale: process.env.REACT_APP_SHOPPER_LOCALE,
            currency: process.env.REACT_APP_CURRENCY,
            country: process.env.REACT_APP_Adyen_country,
            email
          });
        },
        adyenKlarnaPayNow: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'klarna_paynow',
            payPspItemEnum: 'ADYEN_KLARNA_PAYNOW',
            shopperLocale: process.env.REACT_APP_SHOPPER_LOCALE,
            currency: process.env.REACT_APP_CURRENCY,
            country: process.env.REACT_APP_Adyen_country,
            email
          });
        },
        directEbanking: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'directEbanking',
            payPspItemEnum: 'ADYEN_SOFORT',
            shopperLocale: process.env.REACT_APP_SHOPPER_LOCALE,
            currency: process.env.REACT_APP_CURRENCY,
            country: process.env.REACT_APP_Adyen_country,
            email
          });
        },
        adyenOxxo: () => {
          parameters = Object.assign(commonParameter, {
            payPspItemEnum: 'ADYEN_OXXO',
            shopperLocale: process.env.REACT_APP_SHOPPER_LOCALE,
            currency: process.env.REACT_APP_CURRENCY,
            country: process.env.REACT_APP_Adyen_country,
            email
          });
        },
        cyber: () => {
          parameters = Object.assign({}, commonParameter, {
            payPspItemEnum: 'CYBER',
            paymentMethodId: this.state.cyberPayParam.id,
            securityCode: this.state.cyberPayParam.cardCvv,
            accessToken: this.state.cyberPayParam.accessToken
          });
        }
      };
      await actions[type]();

      const successUrlFun = (type) => {
        const defaultUrl = '',
          Adyen3DSUrl = process.env.REACT_APP_Adyen3DSUrl,
          payResultUrl = process.env.REACT_APP_SUCCESSFUL_URL + '/PayResult',
          payu3dsResultUrl =
            process.env.REACT_APP_SUCCESSFUL_URL + '/Payu3dsPayResult';
        return (
          {
            adyenCard: Adyen3DSUrl,
            adyenKlarnaPayLater: payResultUrl,
            adyenKlarnaPayNow: payResultUrl,
            directEbanking: payResultUrl,
            payUCreditCardRU: payu3dsResultUrl,
            payUCreditCardTU: payu3dsResultUrl
          }[type] || defaultUrl
        );
      };
      let successUrl = successUrlFun(type);

      //合并支付必要的参数
      let finalParam = Object.assign(parameters, {
        successUrl,
        deliveryAddressId: this.state.deliveryAddress?.addressId,
        billAddressId: this.state.billingAddress?.addressId,
        domainName: process.env.REACT_APP_DOMAIN || '',
        phone
      });
      return finalParam;
    } catch (err) {
      console.warn(err);
      throw new Error(err.message);
    }
  }

  //得到支付共同的参数
  async getPayCommonParam() {
    try {
      if (!this.state.tid) {
        await this.valideCheckoutLimitRule();
      }
      const commonParameter = this.packagePayParam();
      let phone = this.state.billingAddress?.phoneNumber; //获取电话号码
      return new Promise((resolve) => {
        resolve({ commonParameter, phone });
      });
    } catch (err) {
      console.warn(err);
      throw new Error(err.message);
    }
  }
  // 5、获取参数
  async doGetAdyenPayParam(type) {
    try {
      let parameters = await this.getAdyenPayParam(type);
      // console.log('1028: ', parameters);
      await this.allAdyenPayment(parameters, type);
    } catch (err) {
      console.warn(err);
      if (err.message !== 'agreement failed') {
        this.showErrorMsg(
          err.message ? err.message.toString() : err.toString()
        );
      }
      this.endLoading();
    }
  }
  // 根据条件-调用不同的支付接口,进行支付,支付成功跳转到 confirmation
  async allAdyenPayment(parameters, type) {
    try {
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

      if (this.isPayUPaymentTypeVal) {
        this.generatePayUParam();
      }
      if (this.jsessionid && this.fingerprint) {
        parameters = Object.assign(parameters, {
          userAgent: navigator.userAgent,
          cookie: this.jsessionid,
          fingerprint: this.fingerprint
        });
      }
      // 线下店orderSource埋点L_ATELIER_FELIN
      let orderSource = sessionItemRoyal.get('orderSource');
      if (orderSource) {
        parameters.orderSource = orderSource;
      }
      let isRepay = this.state.tid ? true : false;
      payFun(isRepay, this.isLogin, this.state.subForm.buyWay);

      /* 4)调用支付 */
      const res = await action(parameters);
      // console.log(parameters);
      const { tidList } = this.state;
      let orderNumber; // 主订单号
      let subOrderNumberList = []; // 拆单时，子订单号
      let subNumber; // 订阅订单号
      let oxxoPayUrl;
      let gotoConfirmationPage = false;

      switch (type) {
        case 'oxxo':
          const oxxoContent = res.context;
          oxxoPayUrl =
            oxxoContent?.args?.additionalDetails?.data[0]?.href || '';
          subOrderNumberList = tidList.length
            ? tidList
            : oxxoContent && oxxoContent.tidList;
          gotoConfirmationPage = true;
          break;
        case 'payUCreditCardRU':
        case 'payUCreditCardTU':
        case 'payUCreditCard':
        case 'cod':
          subOrderNumberList = tidList.length
            ? tidList
            : res.context && res.context.tidList;
          subNumber = (res.context && res.context.subscribeId) || '';

          if (res.context.redirectUrl) {
            window.location.href = res.context.redirectUrl;
          } else {
            gotoConfirmationPage = true;
          }
          break;
        case 'adyenOxxo':
          subOrderNumberList =
            tidList.length && tidList[0]
              ? tidList
              : res.context && res.context.tidList;
          subNumber = (res.context && res.context.subscribeId) || '';

          if (res.context.redirectUrl) {
            let adyenOxxoAction = res.context.redirectUrl;
            if (adyenOxxoAction) {
              sessionItemRoyal.set('adyenOxxoAction', adyenOxxoAction);
            }
            if (subOrderNumberList.length) {
              sessionItemRoyal.set(
                'subOrderNumberList',
                JSON.stringify(subOrderNumberList)
              );
            }
            gotoConfirmationPage = true;
          }
          break;
        case 'adyenCard':
          subOrderNumberList =
            tidList.length && tidList[0]
              ? tidList
              : res.context && res.context.tidList;
          subNumber = (res.context && res.context.subscribeId) || '';

          let contextType = Object.prototype.toString
            .call(res.context)
            .slice(8, -1);
          let adyenAction = '';
          if (contextType === 'Array' && res.context.redirectUrl) {
            //正常时候,res.context后台返回数组
            adyenAction = JSON.parse(res.context.redirectUrl);
            if (subOrderNumberList.length) {
              sessionItemRoyal.set(
                'subOrderNumberList',
                JSON.stringify(subOrderNumberList)
              );
            }
            this.setState({ adyenAction });
          } else if (contextType === 'Object' && res.context.redirectUrl) {
            //会员repay时，res.context后台返回对象
            adyenAction = JSON.parse(res.context.redirectUrl);
            if (subOrderNumberList.length) {
              sessionItemRoyal.set(
                'subOrderNumberList',
                JSON.stringify(subOrderNumberList)
              );
            }
            this.setState({ adyenAction });
          } else {
            //正常卡
            gotoConfirmationPage = true;
          }
          break;
        case 'adyenKlarnaPayLater':
        case 'adyenKlarnaPayNow':
        case 'directEbanking':
          subOrderNumberList = res.context.tidList;
          this.removeLocalCartData();
          // 给klana支付跳转用
          if (res.context.tid) {
            sessionItemRoyal.set('orderNumber', res.context.tid);
          }
          if (res.context.redirectUrl) {
            window.location.href = res.context.redirectUrl;
          }
          break;
        case 'cyber':
          subOrderNumberList =
            tidList.length && tidList[0]
              ? tidList
              : res.context && res.context.tidList;
          subNumber = (res.context && res.context.subscribeId) || '';

          sessionItemRoyal.set(
            'subOrderNumberList',
            JSON.stringify(subOrderNumberList)
          );
          gotoConfirmationPage = true;
          break;
        default:
          break;
      }
      // if (orderNumber) {
      //   sessionItemRoyal.set('orderNumber', orderNumber);
      // }
      this.removeLocalCartData();
      if (subOrderNumberList?.length) {
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

      sessionItemRoyal.remove('payosdata');
      if (gotoConfirmationPage) {
        // 清除掉计算运费相关参数
        localItemRoyal.remove('rc-calculation-param');
        //支付成功清除推荐者信息
        this.props.clinicStore.removeLinkClinicId();
        this.props.clinicStore.removeLinkClinicRecommendationInfos();
        this.props.clinicStore.removeLinkClinicName();

        // 跳转 confirmation
        this.props.history.push('/confirmation');
      }
    } catch (err) {
      console.warn(err);
      if (!this.isLogin) {
        sessionItemRoyal.remove('rc-token');
      }
      if (
        err.errorData &&
        err.errorData.tid &&
        err.errorData.tidList &&
        this.isLogin
      ) {
        // err.errorData 支付失败，errorData返回支付信息，只有会员才有repay
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
  // 下单后，清空 delivery date 和 time slot
  clearTimeslotAndDeliverydate = async () => {
    const { deliveryAddress } = this.state;
    try {
      let deliveryAdd = Object.assign({}, deliveryAddress, {
        deliveryDate: '',
        timeSlot: '',
        consigneeNumber: deliveryAddress.phoneNumber,
        isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0
      });
      let res = await editAddress(deliveryAdd);
      console.log('666 修改地址: ', res);
    } catch (err) {
      console.log(err);
    }
  };
  // 删除本地购物车
  async removeLocalCartData() {
    const { checkoutStore } = this.props;
    if (this.isLogin) {
      checkoutStore.removeLoginCartData();
      // 清空 delivery date 和 time slot
      await this.clearTimeslotAndDeliverydate();
    } else {
      checkoutStore.setCartData(
        checkoutStore.cartData.filter((ele) => !ele.selected)
      ); // 只移除selected
      //sessionItemRoyal.remove('rc-token');
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
        creditCardInfo,
        guestEmail
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
          billCityId: billingAddress.cityId,
          billCountryId: billingAddress.countryId,
          billCountry: billingAddress.country,
          billFirstName: billingAddress.firstName,
          billLastName: billingAddress.lastName,
          billPhoneNumber: billingAddress.phoneNumber,
          billPostCode: billingAddress.postCode,
          billProvince: billingAddress.province, // 2021-05-14 10:00
          billProvinceId: billingAddress.provinceId,
          rfc: deliveryAddress.rfc,
          billRfc: billingAddress.rfc,
          email: creditCardInfo.email || guestEmail,
          consigneeEmail: deliveryAddress.email
        }
      );
      let postVisitorRegisterAndLoginRes = await postVisitorRegisterAndLogin(
        param
      );

      //游客绑定consent 一定要在游客注册之后 start
      let submitParam = bindSubmitParam(this.state.listData);
      userBindConsent({
        ...submitParam,
        ...{ oktaToken: '' },
        customerId:
          (postVisitorRegisterAndLoginRes.context &&
            postVisitorRegisterAndLoginRes.context.customerId) ||
          ''
      });
      //游客绑定consent 一定要在游客注册之后 end

      sessionItemRoyal.set(
        'rc-token',
        postVisitorRegisterAndLoginRes.context.token
      );
      if (sessionItemRoyal.get('recommend_product')) {
        // 线下店orderSource埋点L_ATELIER_FELIN
        let orderSource = sessionItemRoyal.get('orderSource');
        let addPramas = {
          goodsInfos: this.state.recommend_data.map((ele) => {
            return {
              verifyStock: false,
              buyCount: ele.buyCount,
              goodsInfoId: find(ele.goods.sizeList, (s) => s.selected)
                .goodsInfoId
            };
          })
        };
        if (orderSource) {
          addPramas.orderSource = orderSource;
        }

        await batchAdd(addPramas);
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
      console.warn(err);
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
      payosdata,
      guestEmail,
      promotionCode
    } = this.state;

    // 获取本地存储的计算运费折扣参数
    const calculationParam = localItemRoyal.get('rc-calculation-param') || null;

    /**
     * ★★★ 1
     * 封装下单参数的时候需要把新加的字段加上，
     * 否则支付时会刷新preview显示的参数
     */
    let param = Object.assign({}, deliveryAddress, {
      zipcode: deliveryAddress?.postCode,
      phone: creditCardInfo?.phoneNumber,
      email: creditCardInfo?.email || deliveryAddress?.email,
      line1: deliveryAddress?.address1,
      line2: deliveryAddress?.address2,
      //推荐者信息下放到商品行
      // recommendationId: clinicStore.linkClinicId,
      // recommendationPrimaryKeyId: clinicStore.linkClinicBusId,
      // recommendationName: clinicStore.linkClinicName,
      //审核者信息放订单行
      clinicsId: clinicStore.selectClinicId,
      clinicsName: clinicStore.selectClinicName,
      storeId: process.env.REACT_APP_STOREID,
      tradeItems: [], // once order products
      subTradeItems: [], // subscription order products
      tradeMarketingList: [],
      payAccountName: creditCardInfo?.cardOwner,
      payPhoneNumber: creditCardInfo?.phoneNumber,
      petsId: '',
      deliveryAddressId: deliveryAddress?.addressId,
      billAddressId: billingAddress?.addressId,
      maxDeliveryTime: calculationParam?.calculation?.maxDeliveryTime,
      minDeliveryTime: calculationParam?.calculation?.minDeliveryTime,
      promotionCode,
      guestEmail
    });
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
    if (tokenObj && tokenObj.accessToken) {
      param.oktaToken = 'Bearer ' + tokenObj.accessToken.accessToken;
    }
    // console.log('★★★★★★ 1548 封装下单参数: ', param);
    // let param = {
    //   zipcode: deliveryAddress?.postCode,
    //   phone: creditCardInfo?.phoneNumber,
    //   email: creditCardInfo?.email || deliveryAddress?.email,
    //   line1: deliveryAddress?.address1,
    //   line2: deliveryAddress?.address2,
    //   //推荐者信息下放到商品行
    //   // recommendationId: clinicStore.linkClinicId,
    //   // recommendationPrimaryKeyId: clinicStore.linkClinicBusId,
    //   // recommendationName: clinicStore.linkClinicName,
    //   //审核者信息放订单行
    //   clinicsId: clinicStore.selectClinicId,
    //   clinicsName: clinicStore.selectClinicName,
    //   storeId: process.env.REACT_APP_STOREID,
    //   tradeItems: [], // once order products
    //   subTradeItems: [], // subscription order products
    //   tradeMarketingList: [],
    //   payAccountName: creditCardInfo?.cardOwner,
    //   payPhoneNumber: creditCardInfo?.phoneNumber,
    //   petsId: '',
    //   deliveryAddressId: deliveryAddress?.addressId,
    //   billAddressId: billingAddress?.addressId,
    //   maxDeliveryTime: calculationParam?.calculation?.maxDeliveryTime,
    //   minDeliveryTime: calculationParam?.calculation?.minDeliveryTime,
    //   promotionCode,
    //   guestEmail
    // };

    if (payosdata) {
      param = Object.assign(param, {
        country: payosdata.country_code,
        token: payosdata.token,
        creditDardCvv: payosdata.encrypted_cvv,
        cardType: payosdata.card_type,
        lastFourDigits: payosdata.last_4_digits,
        holderName: payosdata.holder_name,
        paymentVendor: payosdata.vendor,
        expirationDate: payosdata.expiration_date
      });
    }
    if (sessionItemRoyal.get('recommend_product')) {
      param.tradeItems = this.state.recommend_data.map((ele) => {
        let recommendationInfos = {};
        if (ele.recommendationInfos && ele.recommendationInfos != 'null') {
          recommendationInfos =
            typeof ele.recommendationInfos == 'string'
              ? JSON.parse(ele.recommendationInfos)
              : ele.recommendationInfos;
        }
        let {
          recommendationName = '',
          recommendationId = '',
          referenceObject = '',
          recommenderId = '',
          referenceData = '',
          recommenderName = ''
        } = recommendationInfos;
        let referenceId = recommenderId || recommendationId;
        return {
          //shelter和breeder产品参数 start
          utmSource: ele.utmSource || '',
          utmMedium: ele.utmMedium || '',
          utmCampaign: ele.utmCampaign || '',
          prefixFn: ele.prefixFn || '',
          prefixBreed: ele.prefixBreed || '',
          //shelter和breeder产品参数 end
          num: ele.buyCount,
          skuId: ele.goodsInfoId,
          petsId: ele.petsId,
          petsName: ele.petsName,
          goodsInfoFlag: 0,
          referenceObject,
          recommenderId,
          referenceData,
          recommenderName,
          referenceId,
          recommendationId: recommendationId || ele.recommendationId || '', // 优先去取recommendationInfos里面的recommendationId
          // recommendationPrimaryKeyId: ele.recommendationPrimaryKeyId || '',
          recommendationName: recommendationName || ele.recommendationName || ''
        };
      });
    } else if (this.isLogin) {
      param.tradeItems = loginCartData.map((ele) => {
        let recommendationInfos = {};
        if (ele.recommendationInfos && ele.recommendationInfos != 'null') {
          recommendationInfos =
            typeof ele.recommendationInfos == 'string'
              ? JSON.parse(ele.recommendationInfos)
              : ele.recommendationInfos;
        }
        let {
          recommendationName = '',
          recommendationId = '',
          referenceObject = '',
          recommenderId = '',
          referenceData = '',
          recommenderName = ''
        } = recommendationInfos;
        let referenceId = recommenderId || recommendationId;
        return {
          utmSource: ele.utmSource || '',
          utmMedium: ele.utmMedium || '',
          utmCampaign: ele.utmCampaign || '',
          prefixFn: ele.prefixFn || '',
          prefixBreed: ele.prefixBreed || '',
          num: ele.buyCount,
          skuId: ele.goodsInfoId,
          petsId: ele.petsId,
          petsName: ele.petsName,
          goodsInfoFlag: ele.goodsInfoFlag,
          referenceObject,
          recommenderId,
          referenceData,
          recommenderName,
          referenceId,
          recommendationId: recommendationId || ele.recommendationId || '',
          // recommendationPrimaryKeyId: ele.recommendationPrimaryKeyId || '',
          recommendationName: recommendationName || ele.recommendationName || ''
        };
      });
    } else {
      param.tradeItems = cartData.map((ele) => {
        let recommendationInfos = {};
        if (ele.recommendationInfos && ele.recommendationInfos != 'null') {
          recommendationInfos =
            typeof ele.recommendationInfos == 'string'
              ? JSON.parse(ele.recommendationInfos)
              : ele.recommendationInfos;
        }
        let {
          recommendationName = '',
          recommendationId = '',
          referenceObject = '',
          recommenderId = '',
          referenceData = '',
          recommenderName = ''
        } = recommendationInfos;
        let referenceId = recommenderId || ele.recommendationId;
        return {
          utmSource: ele.utmSource || '',
          utmMedium: ele.utmMedium || '',
          utmCampaign: ele.utmCampaign || '',
          prefixFn: ele.prefixFn || '',
          prefixBreed: ele.prefixBreed || '',
          num: ele.quantity,
          skuId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
          goodsInfoFlag: ele.goodsInfoFlag,
          referenceObject,
          recommenderId,
          referenceData,
          recommenderName,
          referenceId,
          recommendationId: recommendationId || ele.recommendationId || '',
          // recommendationPrimaryKeyId: ele.recommendationPrimaryKeyId || '',
          recommendationName: recommendationName || ele.recommendationName || ''
        };
      });
    }

    if (this.isCurrentBuyWaySubscription) {
      param.tradeItems = loginCartData
        // .filter((ele) => !ele.subscriptionStatus || !ele.subscriptionPrice)
        .filter((ele) => !ele.goodsInfoFlag)
        .map((g) => {
          let recommendationInfos = {};
          if (g.recommendationInfos && g.recommendationInfos != 'null') {
            recommendationInfos =
              typeof g.recommendationInfos == 'string'
                ? JSON.parse(g.recommendationInfos)
                : g.recommendationInfos;
          }
          let {
            recommendationName = '',
            recommendationId = '',
            referenceObject = '',
            recommenderId = '',
            referenceData = '',
            recommenderName = ''
          } = recommendationInfos;
          let referenceId = recommenderId || g.recommendationId;
          return {
            utmSource: g.utmSource || '',
            utmMedium: g.utmMedium || '',
            utmCampaign: g.utmCampaign || '',
            prefixFn: g.prefixFn || '',
            prefixBreed: g.prefixBreed || '',
            num: g.buyCount,
            skuId: g.goodsInfoId,
            petsId: g.petsId,
            petsName: g.petsName,
            goodsInfoFlag: g.goodsInfoFlag,
            periodTypeId: g.periodTypeId,
            referenceObject,
            recommenderId,
            referenceData,
            recommenderName,
            referenceId,
            recommendationId: recommendationId || g.recommendationId || '',
            // recommendationPrimaryKeyId: g.recommendationPrimaryKeyId || '',
            recommendationName: recommendationName || g.recommendationName || ''
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
            (ele.subscriptionPrice > 0 || ele.settingPrice > 0) && // food dispensor 的时候取的settingPrice
            ele.goodsInfoFlag
        )
        .map((g) => {
          let recommendationInfos = {};
          if (g.recommendationInfos && g.recommendationInfos != 'null') {
            recommendationInfos =
              typeof g.recommendationInfos == 'string'
                ? JSON.parse(g.recommendationInfos)
                : g.recommendationInfos;
          }
          let {
            recommendationName = '',
            recommendationId = '',
            referenceObject = '',
            recommenderId = '',
            referenceData = '',
            recommenderName = ''
          } = recommendationInfos;
          let referenceId = recommenderId || g.recommendationId;
          return {
            settingPrice: g.settingPrice,
            packageId: g.packageId,
            subscriptionPlanPromotionFlag: g.subscriptionPlanPromotionFlag,
            subscriptionPlanId: g.subscriptionPlanId,
            utmSource: g.utmSource || '',
            utmMedium: g.utmMedium || '',
            utmCampaign: g.utmCampaign || '',
            prefixFn: g.prefixFn || '',
            prefixBreed: g.prefixBreed || '',
            goodsInfoFlag:
              parseInt(g.goodsInfoFlag) && g.promotions?.includes('club')
                ? 2
                : parseInt(g.goodsInfoFlag),
            questionParams: g.questionParams ? g.questionParams : undefined,
            subscribeNum: g.buyCount,
            skuId: g.goodsInfoId,
            petsId: g.petsId,
            petsType: g.petsType,
            petsName: g.petsName,
            periodTypeId: g.periodTypeId,
            referenceObject,
            recommenderId,
            referenceData,
            recommenderName,
            referenceId,
            recommendationId: recommendationId || g.recommendationId || '',
            // recommendationPrimaryKeyId: g.recommendationPrimaryKeyId || '',
            recommendationName: recommendationName || g.recommendationName || ''
          };
        });
      // }

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
   * ★★★ 2
   * 封装下单参数的时候需要把新加的字段加上，
   * 否则支付时会刷新preview显示的参数
   */
  async saveAddressAndCommentPromise() {
    try {
      const { configStore, clinicStore } = this.props;
      const { deliveryAddress, billingAddress, billingChecked } = this.state;
      let tmpDeliveryAddress = { ...deliveryAddress };
      let tmpBillingAddress = { ...billingAddress };
      if (this.isLogin) {
        tmpDeliveryAddress = Object.assign({}, tmpDeliveryAddress, {
          phoneNumber: deliveryAddress.consigneeNumber,
          addressId:
            deliveryAddress.addressId || deliveryAddress.deliveryAddressId
        });
        // tmpDeliveryAddress = {
        //   firstName: deliveryAddress.firstName,
        //   lastName: deliveryAddress.lastName,
        //   address1: deliveryAddress.address1,
        //   address2: deliveryAddress.address2,
        //   rfc: deliveryAddress.rfc,
        //   countryId: deliveryAddress.countryId,
        //   country: deliveryAddress.country,
        //   city: deliveryAddress.city,
        //   cityId: deliveryAddress.cityId,
        //   provinceId: deliveryAddress.provinceId,
        //   provinceNo: deliveryAddress.provinceNo,
        //   province: deliveryAddress.province,
        //   postCode: deliveryAddress.postCode,
        //   comment: deliveryAddress?.comment,
        //   email: deliveryAddress.email,
        //   phoneNumber: deliveryAddress.consigneeNumber,
        //   addressId: deliveryAddress.addressId || deliveryAddress.deliveryAddressId
        // };
        if (!billingChecked) {
          tmpBillingAddress = {
            area: billingAddress.area || '',
            areaId: billingAddress.areaId || '',
            firstName: billingAddress.firstName,
            lastName: billingAddress.lastName,
            address1: billingAddress.address1,
            address2: billingAddress.address2,
            rfc: billingAddress.rfc,
            countryId: billingAddress.countryId,
            country: billingAddress.country,
            city: billingAddress.city,
            cityId: billingAddress.cityId,
            provinceId: billingAddress.provinceId,
            provinceNo: billingAddress.provinceNo,
            province: billingAddress.province,
            postCode: billingAddress.postCode,
            comment: billingAddress?.comment,
            phoneNumber: billingAddress.consigneeNumber,
            addressId:
              billingAddress.addressId || billingAddress.deliveryAddressId
          };
        }
      }
      const param = {
        billingChecked,
        deliveryAddress: { ...tmpDeliveryAddress }
      };
      param.billingAddress = billingChecked
        ? { ...tmpDeliveryAddress }
        : { ...tmpBillingAddress };
      // console.log(
      //   '★★★★★★ ---------- saveAddressAndCommentPromise param: ',
      //   param
      // );
      this.setState({
        deliveryAddress: { ...param.deliveryAddress },
        billingAddress: { ...param.billingAddress },
        billingChecked: param.billingChecked
      });
    } catch (err) {
      console.warn(err);
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
    try {
      await this.saveAddressAndCommentPromise();
      await this.props.checkoutStore.validCheckoutLimitRule({
        minimunAmountPrice: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
      });
    } catch (err) {
      console.warn(err);
      throw new Error(err.message);
    }
  }

  savePromotionCode = (promotionCode) => {
    this.setState({
      promotionCode
    });
  };
  handlePaymentTypeChange = (e) => {
    this.setState({ paymentTypeVal: e.target.value, email: '' }, () =>
      this.onPaymentTypeValChange()
    );
  };

  handleCardTypeChange = (e) => {
    this.setState({ cardTypeVal: e.target.value }, () => {
      this.onCardTypeValChange();
    });
  };

  // 是否勾选自定义billingAddress
  updateSameAsCheckBoxVal = (val) => {
    const curPanelKey = 'billingAddr';
    if (!val && this.props.paymentStore['billingAddrPanelStatus'].isCompleted) {
      this.props.paymentStore.setStsToEdit({
        key: curPanelKey
      });
    }
    // console.log('是否勾选自定义billingAddress: ',val);
    this.setState({
      billingChecked: val
    });

    // 勾选，则 billingAddress = deliveryAddress
    let billadd = null;
    if (val) {
      billadd = this.state.deliveryAddress;
    } else {
      if (!this.state.billingAddressAddOrEdit) {
        this.setState({
          validForBilling: true
        });
      }

      billadd = {
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        address1: '',
        address2: '',
        country: '',
        countryId: process.env.REACT_APP_DEFAULT_COUNTRYID || '',
        cityId: '',
        city: '',
        areaId: '',
        area: '',
        regionId: '',
        region: '',
        provinceNo: '',
        provinceId: '',
        province: '',
        stateId: '',
        postCode: '',
        phoneNumber: '',
        entrance: '',
        apartment: '',
        comment: '',
        minDeliveryTime: 0,
        maxDeliveryTime: 0,
        DuData: null,
        formRule: []
      };
    }
    this.setState({
      billingAddress: billadd
    });
  };

  // 计算税额、运费、运费折扣
  calculateFreight = async (data) => {
    // console.log('1851 ★★ -- Payment 计算税额、运费、运费折扣: ', data);
    const { ruShippingDTO, guestEmail } = this.state;
    let param = {};

    var dudata = data?.DuData;
    if (dudata) {
      ruShippingDTO.regionFias = dudata?.provinceId;
      ruShippingDTO.areaFias = dudata?.areaId;
      ruShippingDTO.cityFias = dudata?.cityId;
      ruShippingDTO.settlementFias = dudata?.settlementId;
      ruShippingDTO.postalCode = dudata?.postCode;
      this.setState({
        ruShippingDTO
      });
      // 把查询运费折扣相关参数存到本地
      localItemRoyal.set('rc-calculation-param', data);
    }
    param = {
      promotionCode: this.state.promotionCode,
      purchaseFlag: false, // 购物车: true，checkout: false
      taxFeeData: {
        country: process.env.REACT_APP_GA_COUNTRY, // 国家简写 / data.countryName
        region: data?.stateNo || '', // 省份简写
        city: data?.city,
        street: data?.address1,
        postalCode: data?.postCode,
        customerAccount: guestEmail
      },
      address1: data?.address1,
      ruShippingDTO: ruShippingDTO
    };
    if (this.isLogin) {
      param.subscriptionFlag = false;
    }

    // PayProductInfo 组件中用到的参数
    localItemRoyal.set('rc-payment-purchases-param', param);
    console.log('666 param: ', param);
    try {
      // 获取税额
      if (this.isLogin) {
        await this.props.checkoutStore.updateLoginCart(param);
      } else {
        await this.props.checkoutStore.updateUnloginCart(param);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  updateDeliveryAddrData = (data) => {
    // console.log('1900 -- Payment updateDeliveryAddrData: ', data);
    this.setState({
      deliveryAddress: data
    });
    if (this.state.billingChecked) {
      this.setState({
        billingAddress: data
      });
    }
  };

  // 修改BillingAddress数据
  updateBillingAddrData = (data) => {
    // console.log('1924 -- Payment updateBillingAddrData: ', data);
    if (!this.state.billingChecked) {
      this.setState({ billingAddress: data });
    }
  };
  // 抓取异常信息
  catchAddOrEditAddressErrorMessage = (msg) => {
    this.showErrorMsg(msg);
  };

  // 对应的国际化字符串
  getIntlMsg = (str) => {
    return this.props.intl.messages[str];
  };
  /**
   * 渲染address panel
   */
  renderAddressPanel = () => {
    const { paymentStore } = this.props;
    const { deliveryAddress, guestEmail } = this.state;
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
            <AddressList
              id="1"
              type="delivery"
              reSelectTimeSlot={this.getIntlMsg('payment.reselectTimeSlot')}
              showDeliveryDateTimeSlot={true}
              isDeliveryOrBilling="delivery"
              isValidationModal={this.state.isShowValidationModal}
              updateValidationStaus={this.updateValidationStaus}
              catchErrorMessage={this.catchAddOrEditAddressErrorMessage}
              updateData={this.updateDeliveryAddrData}
              calculateFreight={this.calculateFreight}
            />
          ) : (
            <VisitorAddress
              key={1}
              type="delivery"
              reSelectTimeSlot={this.getIntlMsg('payment.reselectTimeSlot')}
              showDeliveryDateTimeSlot={true}
              isDeliveryOrBilling="delivery"
              initData={deliveryAddress}
              isValidationModal={this.state.isShowValidationModal}
              guestEmail={guestEmail}
              updateValidationStaus={this.updateValidationStaus}
              updateData={this.updateDeliveryAddrData}
              calculateFreight={this.calculateFreight}
            />
          )}
        </div>
      </>
    );
  };

  renderBillingJSX = ({ type }) => {
    const {
      billingAddressErrorMsg,
      billingChecked,
      billingAddress,
      deliveryAddress,
      adyenPayParam,
      tid,
      guestEmail,
      cyberPaymentForm: { isSaveCard }
    } = this.state;

    if (hideBillingAddr) return null;

    if (tid) return null;

    return (
      <>
        {/* {this.state.paymentTypeVal == 'cyber' && this.isLogin ? (
          <CyberSaveCardCheckbox
            isChecked={isSaveCard}
            changeCyberPaymentFormIsSaveCard={
              this.changeCyberPaymentFormIsSaveCard
            }
          />
        ) : null} */}
        <SameAsCheckbox
          initVal={billingChecked}
          updateSameAsCheckBoxVal={this.updateSameAsCheckBoxVal}
          type={type}
        />

        {/* BillingAddress 地址不完整提示 */}
        <div
          className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
            billingAddressErrorMsg ? '' : 'hidden'
          }`}
        >
          <aside
            className="rc-alert rc-alert--error rc-alert--with-close"
            role="alert"
          >
            {billingAddressErrorMsg}
          </aside>
        </div>

        {/* 勾选， deliveryAddress = billingAddress */}
        {billingChecked ? (
          <div className="ml-custom mr-custom">
            {this.renderAddrPreview({
              form: billingAddress,
              titleVisible: false,
              boldName: true
            })}
          </div>
        ) : null}

        {/* 不勾选， deliveryAddress != billingAddress */}
        {!billingChecked && (
          <>
            {this.isLogin ? (
              <AddressList
                ref={this.loginBillingAddrRef}
                key={2}
                titleVisible={false}
                type="billing"
                isDeliveryOrBilling="billing"
                showOperateBtn={false}
                visible={!billingChecked}
                updateData={this.updateBillingAddrData}
                isAddOrEdit={this.getListAddOrEdit}
                isValidationModal={this.state.isShowValidationModal}
                updateValidationStaus={this.updateValidationStaus}
                updateFormValidStatus={this.updateValidStatus.bind(this, {
                  key: 'billingAddr'
                })}
                catchErrorMessage={this.catchAddOrEditAddressErrorMessage}
              />
            ) : (
              <VisitorAddress
                ref={this.unLoginBillingAddrRef}
                key={2}
                titleVisible={false}
                showConfirmBtn={false}
                type="billing"
                isDeliveryOrBilling="billing"
                initData={billingAddress}
                guestEmail={guestEmail}
                isValidationModal={this.state.isShowValidationModal}
                updateValidationStaus={this.updateValidationStaus}
                updateData={this.updateBillingAddrData}
                setPaymentToCompleted={this.setPaymentToCompleted}
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

  renderSecurityCodeTipsJSX = () => {
    return (
      <div className="securityCodeTips">
        <span className="icon icon1"></span>
        <div className="desc">100% secure payment</div>
      </div>
    );
  };

  updateValidationStaus = (flag) => {
    this.setState({
      isShowValidationModal: flag
    });
  };
  // 获取 billingAddress 是编辑或者添加地址
  getListAddOrEdit = (flag) => {
    // console.log(' 2258 ----------- getListAddOrEdit: ', flag);
    this.setState({
      billingAddressAddOrEdit: flag
    });
  };
  // 点击confirm 1
  clickConfirmPaymentPanel = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    // console.log(' 2126 ----------- click Confirm Payment Panel');
    // 勾选，billingAddress = deliveryAddress
    this.setState(
      {
        saveBillingLoading: true,
        isShowValidationModal: true
      },
      () => {
        setTimeout(() => {
          this.confirmPaymentPanel();
        }, 800);
      }
    );
  };
  confirmPaymentPanel = async () => {
    const { isLogin } = this;
    const {
      paymentStore: { currentCardTypeInfo }
    } = this.props;
    const {
      adyenPayParam,
      paymentTypeVal,
      billingAddress,
      cyberPaymentForm: {
        cardholderName,
        cardNumber,
        expirationMonth,
        expirationYear,
        securityCode
      },
      tid,
      orderDetails
    } = this.state;

    let newBillingAddress = Object.assign({}, this.state.billingAddress);
    if (tid && tid != null) {
      newBillingAddress = orderDetails?.invoice;
      newBillingAddress.phoneNumber = orderDetails?.invoice?.phone;
    }
    let cyberPaymentParam = {};
    let cyberParams = {};

    if (paymentTypeVal == 'cyber') {
      cyberPaymentParam.cardholderName = cardholderName;
      cyberPaymentParam.cardNumber = cardNumber;
      cyberPaymentParam.securityCode = securityCode;
      cyberPaymentParam.expirationMonth = expirationMonth;
      cyberPaymentParam.expirationYear = expirationYear;
      cyberPaymentParam.firstName = newBillingAddress.firstName;
      cyberPaymentParam.lastName = newBillingAddress.lastName;
      cyberPaymentParam.address1 = newBillingAddress.address1;
      cyberPaymentParam.address2 = newBillingAddress.address2;
      cyberPaymentParam.country = 'us';
      cyberPaymentParam.state = newBillingAddress.province;
      cyberPaymentParam.city = newBillingAddress.city;
      cyberPaymentParam.zipCode = newBillingAddress.postCode;
      cyberPaymentParam.phone = newBillingAddress.phoneNumber;
      cyberPaymentParam.email = isLogin
        ? tid
          ? orderDetails?.invoice?.email || ''
          : billingAddress.email || ''
        : this.state.guestEmail;
      cyberParams = Object.assign({}, cyberPaymentParam, {
        cardType: currentCardTypeInfo.cardType,
        cardTypeValue: currentCardTypeInfo.cardTypeValue,
        paymentVendor: currentCardTypeInfo.cardType
      });
    }

    // 当billing未确认时，需确认
    const { billingChecked } = this.state;
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
          // 会员
          if (
            _this.payUCreditCardRef.current.paymentCompRef &&
            _this.payUCreditCardRef.current.paymentCompRef.current
          ) {
            // 保存/修改 地址
            await _this.payUCreditCardRef.current.paymentCompRef.current.handleSave();
          } else {
            // 游客
            await _this.payUCreditCardRef.current.handleClickCardConfirm();
          }
        }
      } catch (e) {
        throw new Error(e.message);
      }
    }

    // cyber游客绑卡
    const unLoginCyberSaveCard = async (params) => {
      // console.log('2080 params: ', params);
      try {
        const res = await this.cyberRef.current.cyberCardRef.current.usGuestPaymentInfoEvent(
          params
        );
        return new Promise((resolve) => {
          resolve(res);
        });
      } catch (e) {
        throw new Error(e.message);
      }
    };

    //cyber会员绑卡
    const loginCyberSaveCard = async (params) => {
      try {
        const res = await this.cyberRef.current.cyberCardRef.current.usPaymentInfoEvent(
          params
        );
        return new Promise((resolve) => {
          resolve(res);
        });
      } catch (e) {
        throw new Error(e.message);
      }
    };

    const getBindCardInfo = (res) => {
      this.setState({ cyberPayParam: res.context });
    };

    try {
      if (isLogin) {
        // 1 save billing addr, when billing checked status is false
        if (
          !billingChecked &&
          this.loginBillingAddrRef &&
          this.loginBillingAddrRef.current
        ) {
          // console.log('------------- 会员保存地址，并弹出地址校验');
          await this.loginBillingAddrRef.current.handleSave();
        }
        // 2 save card form, when add a new card
        if (paymentTypeVal === 'adyenCard' && !adyenPayParam) {
          await handleClickSaveAdyenForm(this);
        }

        await handleClickSavePayUForm(this);

        if (paymentTypeVal === 'cyber') {
          this.state.cyberPaymentForm.isSaveCard
            ? (cyberParams.isSaveCard = true)
            : (cyberParams.isSaveCard = false);
          const res = await loginCyberSaveCard(cyberParams);
          getBindCardInfo(res);
        }
      } else {
        // 1 save card form
        // 2 save billing addr, when billing checked status is false
        await handleClickSaveAdyenForm(this);
        await handleClickSavePayUForm(this);

        if (paymentTypeVal === 'cyber') {
          cyberParams.isSaveCard = true;
          const res = await unLoginCyberSaveCard(cyberParams);
          getBindCardInfo(res);
        }

        if (
          !billingChecked &&
          this.unLoginBillingAddrRef &&
          this.unLoginBillingAddrRef.current
        ) {
          // 游客确认
          this.unLoginBillingAddrRef.current.handleClickConfirm();
        }
      }

      // console.log('★ ----------------- 游客和会员绑卡后执行');
      this.setPaymentToCompleted();
    } catch (e) {
      this.showErrorMsg(e.message);
    } finally {
      this.setState({ saveBillingLoading: false });
    }
  };
  showBillingAddressErrorMsg = (msg) => {
    this.setState({
      billingAddressErrorMsg: msg
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        billingAddressErrorMsg: ''
      });
    }, 4000);
  };
  // 点击confirm cvv
  clickReInputCvvConfirm = () => {
    const {
      wrongBillingAddress,
      deliveryAddress,
      billingAddress,
      billingChecked,
      tid,
      isShowValidationModal,
      billingAddressAddOrEdit
    } = this.state;
    // console.log(billingAddress);

    if (!tid || tid == null) {
      let billaddr = Object.assign({}, billingAddress);
      // 判断 BillingAddress 完整性
      const laddf = this.props.configStore.localAddressForm;
      let dfarr = laddf.settings;
      dfarr = dfarr.filter(
        (item) => item.enableFlag == 1 && item.requiredFlag == 1
      );
      let errMsgArr = [];
      dfarr.forEach((v, i) => {
        let akey = v.fieldKey;
        // state 对应数据库字段 province
        v.fieldKey == 'state' ? (akey = 'province') : v.fieldKey;
        // region 对应数据库字段 area
        v.fieldKey == 'region' ? (akey = 'area') : v.fieldKey;
        // phoneNumber 对应数据库字段 consigneeNumber
        if (billaddr?.consigneeNumber) {
          v.fieldKey == 'phoneNumber' ? (akey = 'consigneeNumber') : v.fieldKey;
        }
        let fky = wrongBillingAddress[akey];
        // 判断city和cityId 是否均为空
        if (v.fieldKey == 'city') {
          billaddr.city || billaddr.cityId ? (akey = '') : akey;
        }
        // 判断country和countryId 是否均为空
        if (v.fieldKey == 'country') {
          billaddr.country || billaddr.countryId ? (akey = '') : akey;
        }
        if (akey) billaddr[akey] ? '' : errMsgArr.push(fky);
      });
      errMsgArr = errMsgArr.join(', ');
      // 如果地址字段有缺失，提示错误信息
      if (errMsgArr.length) {
        this.showBillingAddressErrorMsg(
          wrongBillingAddress['title'] + errMsgArr
        );
        return;
      }
    }

    // 点击按钮后进入下一步
    if (
      !billingChecked &&
      (!tid || tid == null) &&
      isShowValidationModal &&
      billingAddressAddOrEdit
    ) {
      // console.log('★ --- payment 地址验证 ');
      // 未勾选，显示地址验证
      this.setState({
        paymentValidationLoading: true,
        validationModalVisible: true
      });
    } else {
      // console.log('★ --- clickReInputCvvConfirm 跳过验证，下一步 ');
      this.cvvConfirmNextPanel();
    }
  };
  // 点击按钮后进入下一步
  setPaymentToCompleted = () => {
    // console.log('★ --- setPaymentToCompleted 跳过验证，下一步 ');
    this.cvvConfirmNextPanel();
  };
  // 已绑卡 下一步
  cvvConfirmNextPanel = async () => {
    const { isLogin } = this;
    const { paymentStore } = this.props;
    // 清空 VisitorAddress 参数 && !billingChecked
    if (
      !isLogin &&
      this.unLoginBillingAddrRef &&
      this.unLoginBillingAddrRef.current
    ) {
      this.unLoginBillingAddrRef.current.resetVisitorAddressState();
    }
    // console.log('★ --- payment 收起面板，显示preview ');
    paymentStore.setStsToCompleted({ key: 'billingAddr' });
    paymentStore.setStsToCompleted({ key: 'paymentMethod' });
    this.props.paymentStore.saveDeliveryAddressInfo(this.state.deliveryAddress);
    this.props.paymentStore.saveBillingAddressInfo(this.state.billingAddress);
    paymentStore.setStsToEdit({ key: 'confirmation' });

    this.setState(
      {
        billingAddressAddOrEdit: false,
        saveBillingLoading: false,
        isShowValidationModal: true,
        paymentValidationLoading: false,
        btnLoading: false
      },
      () => {
        // 清除purchases参数
        localItemRoyal.remove('rc-payment-purchases-param');
      }
    );
  };

  /***** 地址校验相关 *******/
  // 选择地址
  chooseValidationAddress = (e) => {
    this.setState({
      selectValidationOption: e.target.value
    });
  };
  // 获取地址验证查询到的数据
  getValidationData = async (data) => {
    this.setState({
      paymentValidationLoading: false
    });
    if (data && data != null) {
      // 获取并设置地址校验返回的数据
      this.setState({
        validationAddress: data
      });
    } else {
      // 不校验地址，进入下一步
      this.cvvConfirmNextPanel();
    }
  };
  // 确认选择地址,切换到下一个最近的未complete的panel
  confirmListValidationAddress = async () => {
    const { isLogin } = this;
    const {
      billingAddress,
      selectValidationOption,
      validationAddress,
      billingChecked
    } = this.state;
    this.setState({
      btnLoading: true
    });
    let oldForm = JSON.parse(JSON.stringify(billingAddress));
    if (selectValidationOption == 'suggestedAddress') {
      billingAddress.address1 = validationAddress.address1;
      billingAddress.city = validationAddress.city;
      billingAddress.postCode = validationAddress.postalCode;

      billingAddress.province = validationAddress.provinceCode;
      billingAddress.provinceId =
        validationAddress.provinceId && validationAddress.provinceId != null
          ? validationAddress.provinceId
          : billingAddress.provinceId;

      // 地址校验返回参数
      billingAddress.validationResult = validationAddress.validationResult;
    } else {
      this.setState({
        billingAddress: JSON.parse(JSON.stringify(oldForm))
      });
    }
    // console.log('------ 确认选择地址');
    // 调用保存 billingAddress 方法
    if (
      !billingChecked &&
      isLogin &&
      this.loginBillingAddrRef &&
      this.loginBillingAddrRef.current
    ) {
      // console.log('★------ 调用保存 billingAddress 方法');
      await this.loginBillingAddrRef.current.handleSavePromise();
    }
    // 隐藏地址校验弹框
    this.setState({
      validationModalVisible: false
    });
    // billing  进入下一步
    this.cvvConfirmNextPanel();
  };

  // 编辑
  handleClickPaymentPanelEdit = async () => {
    const { paymentStore } = this.props;

    paymentStore.setRreshCardList(true);

    const { billingChecked, paymentTypeVal } = this.state;
    if (paymentTypeVal == 'cyber' && this.isLogin) {
      await this.queryList();
    }
    this.props.checkoutStore.setInstallMentParam(null);
    paymentStore.setStsToEdit({
      key: 'paymentMethod',
      hideOthers: true
    });
    this.payUCreditCardRef?.current?.handleClickEditBtn();

    if (!billingChecked) {
      paymentStore.setStsToEdit({
        key: 'billingAddr'
      });
    }
  };
  updateValidStatus({ key }, status) {
    const { billingChecked, billingAddressAddOrEdit } = this.state;
    this.setState({
      validSts: Object.assign(this.state.validSts, { [key]: status }),
      validForBilling: status && !billingChecked && billingAddressAddOrEdit
    });
  }

  onInstallMentParamChange = (data) => {
    this.props.checkoutStore.setInstallMentParam(data);
  };

  /**
   * 渲染支付方式
   */
  renderPayTab = ({ visible = false }) => {
    const {
      paymentStore: { supportPaymentMethods }
    } = this.props;
    const {
      paymentTypeVal,
      subForm,
      payWayErr,
      billingChecked,
      email,
      validSts,
      saveBillingLoading,
      payWayNameArr,
      cyberPaymentForm,
      cardTypeVal,
      tid
    } = this.state;

    // 未勾选same as billing时，校验billing addr
    const validForBilling = !billingChecked && !validSts.billingAddr;
    const validForCyberPayment = () => {
      let isValidForCyberPayment = false;
      let errMsgObj = {};
      let isCheckSaveCard = this.state.cyberPaymentForm.isSaveCard;
      ADDRESS_RULE.forEach((item) => {
        if (
          Object.keys(cyberPaymentForm).indexOf(item.key) &&
          !cyberPaymentForm[item.key] &&
          item.require
        ) {
          errMsgObj[item.key] = true;
        }
      });
      if (Object.keys(errMsgObj).length > 0) {
        isValidForCyberPayment = false;
      } else {
        if (this.isCurrentBuyWaySubscription) {
          if (isCheckSaveCard) {
            isValidForCyberPayment = true; //有订阅商品，必须勾上保存卡checkbox框
          } else {
            isValidForCyberPayment = false;
          }
        } else {
          isValidForCyberPayment = true;
        }
      }
      // console.log('2256 isValidForCyberPayment: ', isValidForCyberPayment);
      return !isValidForCyberPayment;
    };

    const payConfirmBtn = ({ disabled, loading = false }) => {
      return (
        <div className="d-flex justify-content-end mt-3 rc_btn_payment_confirm">
          <button
            className={`rc-btn rc-btn--one ${loading ? 'ui-btn-loading' : ''}`}
            disabled={disabled}
            onClick={this.clickConfirmPaymentPanel}
          >
            <FormattedMessage id="NextToPlaceAnOrder" />
          </button>
        </div>
      );
    };

    const reInputCVVBtn = ({ disabled, loading = false }) => {
      // console.log('2263 CVV Btn: ', disabled);
      return (
        <div className="d-flex justify-content-end mt-3 rc_btn_payment_cvv">
          <button
            className={`rc-btn rc-btn--one ${loading ? 'ui-btn-loading' : ''}`}
            disabled={disabled}
            onClick={this.clickReInputCvvConfirm}
          >
            <FormattedMessage id="yes2" />
          </button>
        </div>
      );
    };

    return (
      <div className={`pb-3 ${visible ? '' : 'hidden'}`}>
        {/* *******************支付tab栏start************************************ */}
        {/* payWayObj为支付方式，如果大于1种，才显示此tab栏 */}
        {payWayNameArr.length > 1 && (
          <div className={`ml-custom mr-custom`}>
            {payWayNameArr.map((item, i) => (
              <div className={`rc-input rc-input--inline`} key={i}>
                <input
                  className="rc-input__radio"
                  id={`payment-info-${item.id}`}
                  value={item.paymentTypeVal}
                  type="radio"
                  name="payment-info"
                  onChange={this.handlePaymentTypeChange}
                  checked={paymentTypeVal === item.paymentTypeVal}
                />
                <label
                  className="rc-input__label--inline"
                  htmlFor={`payment-info-${item.id}`}
                >
                  <FormattedMessage id={item.langKey} />
                </label>
              </div>
            ))}
          </div>
        )}
        {/* ********************支付tab栏end********************************** */}

        <div className="checkout--padding ml-custom mr-custom pt-3 pb-3 border rounded">
          {/* ***********************支付选项卡的内容start******************************* */}
          {payWayErr ? (
            payWayErr
          ) : (
            <>
              {/* cod 货到付款 */}
              {paymentTypeVal === 'cod' && (
                <>
                  <Cod
                    type={'cod'}
                    billingJSX={this.renderBillingJSX({ type: 'cod' })}
                    updateFormValidStatus={this.updateValidStatus.bind(this, {
                      key: 'cod'
                    })}
                  />
                  {payConfirmBtn({
                    disabled: !validSts.cod || validForBilling
                  })}
                </>
              )}
              {/* oxxo */}
              {paymentTypeVal === 'oxxo' ? (
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
              ) : null}
              {/* adyenOxxo */}
              {paymentTypeVal === 'adyenOxxo' ? (
                <>
                  <OxxoConfirm
                    type={'adyenOxxo'}
                    updateEmail={this.updateEmail}
                    billingJSX={this.renderBillingJSX({ type: 'adyenOxxo' })}
                  />
                  {payConfirmBtn({
                    disabled: !EMAIL_REGEXP.test(email) || validForBilling
                  })}
                </>
              ) : null}
              {/* payu creditCard */}
              {this.isPayUPaymentTypeVal && (
                <>
                  <PayUCreditCard
                    ref={this.payUCreditCardRef}
                    type={'PayUCreditCard'}
                    isLogin={this.isLogin}
                    mustSaveForFutherPayments={this.isCurrentBuyWaySubscription}
                    isSupportInstallMent={
                      tid
                        ? false
                        : Boolean(
                            +process.env.REACT_APP_PAYU_SUPPORT_INSTALLMENT
                          )
                    }
                    needEmail={+process.env.REACT_APP_PAYU_EMAIL}
                    needPhone={+process.env.REACT_APP_PAYU_PHONE}
                    // todo 动态
                    // pspItemCode={payWayNameArr.filter((c) => c)}
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
                    onInstallMentParamChange={this.onInstallMentParamChange}
                    isApplyCvv={false}
                    needReConfirmCVV={true}
                    updateFormValidStatus={this.updateValidStatus.bind(this, {
                      key: 'payUCreditCard'
                    })}
                    billingJSX={this.renderBillingJSX({
                      type: 'payUCreditCard'
                    })}
                    defaultCardDataFromAddr={this.defaultCardDataFromAddr}
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
                    billingJSX={this.renderBillingJSX({
                      type: 'adyenCard'
                    })}
                  />
                  {/* 校验状态
                  1 卡校验，从adyen form传入校验状态
                  2 billing校验 */}
                  {payConfirmBtn({
                    disabled: !validSts.adyenCard || validForBilling,
                    loading: saveBillingLoading,
                    aaa: validSts,
                    bbb: validForBilling
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
                  {/* 校验状态
                  1 校验邮箱
                  2 billing校验 */}
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
                    billingJSX={this.renderBillingJSX({
                      type: 'directEbanking'
                    })}
                  />
                  {payConfirmBtn({
                    disabled: !EMAIL_REGEXP.test(email) || validForBilling
                  })}
                </>
              )}

              {/* todo 重构后的CYBER */}
              {paymentTypeVal === 'cyber' && (
                <>
                  <CyberPayment
                    renderBillingJSX={this.renderBillingJSX}
                    renderSecurityCodeTipsJSX={this.renderSecurityCodeTipsJSX}
                    renderBackToSavedPaymentsJSX={
                      this.renderBackToSavedPaymentsJSX
                    }
                    payConfirmBtn={payConfirmBtn}
                    saveBillingLoading={this.state.saveBillingLoading}
                    validForBilling={
                      !this.state.billingChecked &&
                      !this.state.validSts.billingAddr
                    }
                    billingChecked={this.state.billingChecked}
                    validBillingAddress={this.state.validForBilling}
                    isCurrentBuyWaySubscription={
                      this.isCurrentBuyWaySubscription
                    }
                    updateSelectedCardInfo={this.updateSelectedCardInfo}
                    reInputCVVBtn={reInputCVVBtn}
                    isShowCyberBindCardBtn={this.state.isShowCyberBindCardBtn}
                    sendCyberPaymentForm={this.sendCyberPaymentForm}
                    ref={this.cyberRef}
                  />
                </>
              )}

              {/* ***********************支付选项卡的内容end******************************* */}
            </>
          )}
        </div>
      </div>
    );
  };

  renderAddrPreview = ({ form, titleVisible = false, boldName = false }) => {
    return form ? (
      <>
        {titleVisible && (
          <p className="mb-0 medium">
            <FormattedMessage id="billingAddress" />
          </p>
        )}
        <AddressPreview
          boldName={boldName}
          form={form}
          isLogin={this.isLogin}
        />
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
      tid,
      cyberPayParam
    } = this.state;

    //this.props.paymentStore.saveBillingAddressInfo(form)

    let paymentMethod;
    if (adyenPayParam) {
      paymentMethod = adyenPayParam;
    }
    if (cyberPayParam) {
      paymentMethod = cyberPayParam;
    }
    if (selectedCardInfo) {
      paymentMethod = selectedCardInfo;
    }
    let lastFourDeco;
    let brandDeco;
    let holderNameDeco;
    let expirationDate;
    if (paymentMethod) {
      lastFourDeco = paymentMethod.lastFourDigits;
      brandDeco = paymentMethod.paymentVendor;
      holderNameDeco = paymentMethod.holderName;
      expirationDate = paymentMethod.expirationDate;
      if (expirationDate) {
        let curExpirationDate = paymentMethod.expirationDate.split('-');
        curExpirationDate.pop();
        expirationDate = curExpirationDate.join('-');
      }
    } else if (payosdata && payosdata.vendor) {
      lastFourDeco = payosdata.last_4_digits;
      brandDeco = payosdata.vendor;
      holderNameDeco = payosdata.holder_name;
    }

    let ret = null;
    switch (paymentTypeVal) {
      case 'payUCreditCard':
      case 'payUCreditCardRU':
      case 'payUCreditCardTU':
      case 'adyenCard':
      case 'cyber':
        ret = (
          <CreditCardInfoPreview
            data={{
              holderNameDeco,
              brandDeco,
              lastFourDeco,
              expirationDate
            }}
          />
        );
        break;
      case 'cod':
        ret = (
          <div className="col-12 col-md-6">
            <FormattedMessage id="payment.codConfirmTip" />
          </div>
        );
        break;
      default:
        ret = <div className="col-12 col-md-6">{email}</div>;
        break;
    }
    return (
      <div className="ml-custom mr-custom mb-3">
        <div className="row">
          {ret}
          {!tid && !hideBillingAddr && (
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
    this.props.paymentStore.setGuestEmail(guestEmail);
    const { deliveryAddress } = this.state;
    this.setState({ guestEmail }, () => {
      this.props.checkoutStore.updateUnloginCart({
        guestEmail,
        purchaseFlag: false, // 购物车: true，checkout: false
        taxFeeData: {
          country: process.env.REACT_APP_GA_COUNTRY, // 国家简写 / data.countryName
          region: deliveryAddress.provinceNo, // 省份简写
          city: deliveryAddress.city,
          street: deliveryAddress.address1,
          postalCode: deliveryAddress.postCode,
          customerAccount: guestEmail
        },
        address1: deliveryAddress?.address1,
        ruShippingDTO: this.state.ruShippingDTO
      });
    });
  };
  toggleMobileCart(name) {
    this.setState({ mobileCartVisibleKey: name });
  }
  updateAdyenPayParam = (data) => {
    this.setState({ adyenPayParam: data }, () => {
      // console.log(this.state.adyenPayParam);
    });
  };
  updateEmail = (email) => {
    this.setState({ email });
  };
  // 1、点击支付
  clickPay = () => {
    if (this.isLogin) {
      this.userBindConsentFun();
    }
    const { paymentTypeVal } = this.state;
    // console.log('★★★★★★ clickPay: ', this.state.billingAddress);
    console.log('★★★★★★ clickPay: ', this.state.deliveryAddress);
    this.initCommonPay({
      type: paymentTypeVal
    });
  };
  // 2、
  userBindConsentFun() {
    const oktaTokenString =
      this.props.authState && this.props.authState.accessToken
        ? this.props.authState.accessToken.value
        : '';
    let oktaToken = 'Bearer ' + oktaTokenString;
    let submitParam = bindSubmitParam(this.state.listData);
    userBindConsent({
      ...submitParam,
      ...{ oktaToken },
      consentPage: 'check out',
      customerId: this.userInfo?.customerId || ''
    });
  }

  render() {
    const { paymentMethodPanelStatus } = this;
    const { history, location, checkoutStore } = this.props;
    const {
      loading,
      errorMsg,
      tid,
      orderDetails,
      listData,
      recommend_data,
      subForm,
      promotionCode,
      petModalVisible,
      isAdd,
      mobileCartVisibleKey,
      guestEmail,
      deliveryAddress,
      paymentValidationLoading,
      validationModalVisible,
      billingAddress,
      selectValidationOption
    } = this.state;
    const event = {
      page: {
        type: 'Checkout',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      },
      pet: this.state.pet
    };
    const paymentMethodTitleForPrepare = (
      <div className="ml-custom mr-custom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <em
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
          <em
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
          <em
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
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showNav={false}
          showLoginBtn={false}
          history={this.props.history}
          showMiniIcons={false}
          showUserIcon={true}
          match={this.props.match}
        />
        {loading ? <Loading /> : null}
        <main className="rc-content--fixed-header rc-bg-colour--brand4">
          <div className="rc-bottom-spacing data-checkout-stage1 rc-max-width--lg">
            {/*<Progress type="payment" />*/}
            {/*checkout页面所有国家都不用流程图*/}
            <div className="rc-padding--sm rc-padding-top--none">
              <div className="title">
                <h4>
                  <FormattedMessage id="payment.checkout" />
                </h4>
                <p>
                  <FormattedMessage
                    id="checkoutTip"
                    values={{
                      val1: <br />
                    }}
                  />
                </p>
              </div>
            </div>
            <div className="rc-layout-container rc-three-column rc-max-width--xl mt-3 mt-md-0">
              <div className="rc-column rc-double-width shipping__address">
                {/* 错误提示，errorMsg==This Error No Display时不显示  */}
                <div
                  className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
                    errorMsg
                      ? errorMsg == 'This Error No Display'
                        ? 'hidden'
                        : ''
                      : 'hidden'
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
                  <RepayAddressPreview details={orderDetails} />
                ) : (
                  <>
                    <div className="shipping-form" id="J_checkout_panel_email">
                      <OnePageClinicForm
                        key={this.state.needPrescriber}
                        needPrescriber={this.state.needPrescriber}
                        history={history}
                      />
                      <OnePageEmailForm
                        history={history}
                        currentEmailVal={guestEmail}
                        onChange={this.updateGuestEmail}
                      />

                      {this.renderAddressPanel()}
                    </div>
                  </>
                )}
                {checkoutStore.petFlag && checkoutStore.AuditData.length > 0 && (
                  <div className="card-panel checkout--padding pl-0 pr-0 rc-bg-colour--brand3 rounded pb-0">
                    <h5
                      className="ml-custom mr-custom"
                      style={{ overflow: 'hidden' }}
                    >
                      <em
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
                                    alt="goods information image"
                                    src={el.goodsInfoImg}
                                  />
                                </LazyLoad>

                                <div
                                  className="pull-left"
                                  style={{
                                    marginTop: '1.25rem',
                                    marginLeft: '1.25rem'
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
                                    marginLeft: '1.25rem'
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
                                    alt="pet product image"
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
                                    marginTop: '1.25rem',
                                    marginLeft: '1.25rem'
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
                                    marginLeft: '1.25rem'
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
                  <span>{paymentMethodTitle}</span>
                  {this.renderPayTab({
                    visible: paymentMethodPanelStatus.isEdit
                  })}
                  {paymentMethodPanelStatus.isCompleted &&
                    this.renderPayPreview()}
                </div>
                <Confirmation
                  paymentTypeVal={this.state.paymentTypeVal}
                  clickPay={this.clickPay}
                  listData={listData}
                  checkRequiredItem={this.checkRequiredItem}
                  checkoutStore={checkoutStore}
                  tradePrice={
                    tid && orderDetails
                      ? orderDetails.tradePrice.totalPrice
                      : this.tradePrice
                  }
                />
              </div>
              <div className="rc-column pl-md-0 rc-md-up ">
                {tid ? (
                  <RePayProductInfo
                    fixToHeader={false}
                    style={{ background: '#fff' }}
                    details={orderDetails}
                    navigateToProDetails={true}
                    location={location}
                    history={history}
                    isRepay={true}
                  />
                ) : (
                  <PayProductInfo
                    data={recommend_data}
                    fixToHeader={false}
                    style={{ background: '#fff' }}
                    ref="payProductInfo"
                    location={location}
                    history={history}
                    buyWay={subForm.buyWay}
                    sendPromotionCode={this.savePromotionCode}
                    promotionCode={promotionCode}
                    operateBtnVisible={!tid}
                    currentPage="checkout"
                    guestEmail={guestEmail}
                    isCheckOut={true}
                    deliveryAddress={deliveryAddress}
                  />
                )}

                <Faq />
              </div>
            </div>
            <Adyen3DForm action={this.state.adyenAction} />
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
              buyWay={subForm.buyWay}
              sendPromotionCode={this.savePromotionCode}
              promotionCode={promotionCode}
              operateBtnVisible={!tid}
              onClickHeader={this.toggleMobileCart.bind(this, 'less')}
              headerIcon={
                <span className="rc-icon rc-down--xs rc-iconography" />
              }
              isCheckOut={true}
            />
          </div>

          <>
            {/* 地址校验弹框 */}
            {paymentValidationLoading && <Loading positionFixed="true" />}
            {validationModalVisible && (
              <>
                <ValidationAddressModal
                  btnLoading={this.state.btnLoading}
                  address={billingAddress}
                  updateValidationData={this.getValidationData}
                  selectValidationOption={selectValidationOption}
                  handleChooseValidationAddress={(e) =>
                    this.chooseValidationAddress(e)
                  }
                  hanldeClickConfirm={() => this.confirmListValidationAddress()}
                  validationModalVisible={validationModalVisible}
                  close={() => {
                    this.setState({
                      validationModalVisible: false,
                      paymentValidationLoading: false,
                      btnLoading: false,
                      saveLoading: false
                    });
                  }}
                />
              </>
            )}
          </>

          <Footer />
        </main>
        <PetModal
          visible={petModalVisible}
          isAdd={isAdd}
          openNew={this.openNew}
          closeNew={this.closeNew}
          confirm={this.petComfirm}
          close={this.closePetModal}
        />
        <Modal
          type="fullscreen"
          visible={true}
          footerVisible={false}
          modalTitle={<FormattedMessage id="addPet" />}
          confirmBtnText={<FormattedMessage id="continue" />}
          // close={() => this.handelClose()}
          // hanldeClickConfirm={() => this.hanldeConfirm()}
        />
      </div>
    );
  }
}

export default withOktaAuth(Payment);
