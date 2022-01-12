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
// import CyberSaveCardCheckbox from './Address/CyberSaveCardCheckbox';
import { withOktaAuth } from '@okta/okta-react';
import {
  searchNextConfirmPanel,
  handleRecoProductParamByItem
} from './modules/utils';
import {
  getDeviceType,
  payCountDown,
  formatMoney,
  generatePayUScript,
  setSeoConfig,
  validData,
  bindSubmitParam,
  getAppointmentInfo,
  formatDate
} from '@/utils/utils';
import { EMAIL_REGEXP, seTelephoneCheck } from '@/utils/constant';
import { userBindConsent } from '@/api/consent';
import {
  postVisitorRegisterAndLogin,
  batchAdd,
  confirmAndCommit,
  customerCommitAndPay,
  rePay,
  customerCommitAndPayMix,
  getWays,
  getPaymentMethod,
  confirmAndCommitFelin,
  rePayFelin,
  adyenPaymentsDetails
} from '@/api/payment';
import { getOrderDetails } from '@/api/order';
import { getLoginDetails, getDetails } from '@/api/details';
import { batchAddPets } from '@/api/pet';
import { editAddress } from '@/api/address';

import PayUCreditCard from './PaymentMethod/PayUCreditCard';
import AdyenCreditCard from './PaymentMethod/Adyen';
import Paypal from './PaymentMethod/Paypal';
import Swish from './PaymentMethod/Swish';
// import CyberCardList from './PaymentMethod/Cyber/list';
import Cod from './PaymentMethod/Cod';
import OxxoConfirm from './PaymentMethod/Oxxo';
import AdyenCommonPay from './PaymentMethod/AdyenCommonPay';

// import CyberPaymentForm from '@/components/CyberPaymentForm';

import OnePageEmailForm from './OnePage/EmailForm';
import OnePageClinicForm from './OnePage/ClinicForm';

import './modules/adyenCopy.css';
import './index.css';
import { Helmet } from 'react-helmet';
import Adyen3DForm from '@/components/Adyen/3d';
import { ADDRESS_RULE } from './PaymentMethod/Cyber/constant/utils';
import { doGetGAVal } from '@/utils/GA';
// import { cyberFormTitle } from '@/utils/constant/cyber';
// import { getProductPetConfig } from '@/api/payment';
// import { registerCustomerList, guestList, commonList } from './tr_consent';
import ConsentData from '@/utils/consent';
import CyberPayment from './PaymentMethod/Cyber';
import { querySurveyContent } from '@/api/cart';
import felinAddr from './Address/FelinOfflineAddress';
import { funcUrl } from '../../lib/url-utils';
import swishLogo from '@/assets/images/swish-logo.svg';
import swishIcon from '@/assets/images/swish-icon.svg';
import swishError from '@/assets/images/swish-error.svg';
import paypalLogo from '@/assets/images/paypal-logo.svg';

import { postUpdateUser, getAppointByApptNo } from '../../api/felin';
import UpdatModal from './updatModules/modal';
import QRCode from 'qrcode.react';
import { format } from 'date-fns';
import differenceInSeconds from 'date-fns/differenceInSeconds';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

const isHubGA = window.__.env.REACT_APP_HUB_GA;
const hideBillingAddr = Boolean(
  +window.__.env.REACT_APP_HIDE_CHECKOUT_BILLING_ADDR
);

function CreditCardInfoPreview({
  data: { holderNameDeco, brandDeco, lastFourDeco, expirationDate }
}) {
  return (
    <div className="col-12 col-md-6">
      <p className="medium">
        <FormattedMessage id="bankCard" />
      </p>
      <p>{holderNameDeco}</p>
      <p>{brandDeco}</p>
      {lastFourDeco ? <p>{`************${lastFourDeco}`}</p> : null}
      {expirationDate ? (
        <p>
          {formatDate({
            date: expirationDate,
            formatOption: {
              year: 'numeric',
              month: '2-digit'
            }
          })}
        </p>
      ) : null}
    </div>
  );
}

function emptyFun(num) {
  return num.split('').join('');
}

const AdyenCreditCardPic = ({ supportPaymentMethods }) => (
  <p>
    <span className="logo-payment-card-list logo-credit-card ml-0 mr-0 md:mr-5">
      {supportPaymentMethods.map((el, idx) => (
        <LazyLoad key={idx}>
          <img
            className="logo-payment-card mr-1 w-7 md:w-10"
            src={el.imgUrl}
            alt={el.cardType}
          />
        </LazyLoad>
      ))}
    </span>
  </p>
);

const radioTypes = {
  fr: 'box',
  uk: 'box',
  se: 'box',
  default: 'circle'
};

const chooseRadioType = (country) => {
  let radioType = radioTypes[country] || radioTypes['default'];
  return radioType;
};

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
      swishQrcode: '',
      swishQrcodeModal: false,
      createSwishQrcodeTime: '', //生成二维码的当前时间
      countDownStartTime: 15 * 60, //默认最初15分钟钟
      countDown: '', //倒计时
      swishQrcodeError: false,
      swishAppRedirectUrl: '', //swish app跳转的地址
      visibleUpdate: false,
      authorizationCode: '',
      subscriptionID: '',
      cyberBtnLoading: false,
      cyberCardType: '',
      deliveryOrPickUp: 0,
      saveAddressNumber: 0, // 保存Delivery地址次数
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
        countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
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
        formRule: [], // form表单校验规则
        receiveType: ''
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
        countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
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
      swishPhone: '',
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
      shippingFeeAddress: {
        provinceIdStr: '',
        areaIdStr: '',
        cityIdStr: '',
        settlementIdStr: '',
        postalCode: '',
        address1: ''
      }, // 俄罗斯计算运费DuData对象，purchases接口用
      welcomeBoxValue: 'no', //first order welcome box:1、会员 2、首单 3、未填写学生购student promotion 50% discount
      paymentPanelHasComplete: false, //增加payment面板按钮的状态，方便0元订单判断是否已经填写完payment面板
      isFromFelin: false, //是否是felin下单
      appointNo: null //felin的预约单号
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
    this.confirmListValidationAddress =
      this.confirmListValidationAddress.bind(this);
  }
  handelQrcodeModalClose = () => {
    const { history } = this.props;
    if (!this.isLogin) {
      sessionItemRoyal.remove('rc-token');
      history.push('/cart');
    }
    sessionItemRoyal.remove('rc-swishQrcode');
    this.setState({ swishQrcodeModal: false });
    this.setState(
      {
        tid: sessionItemRoyal.get('rc-tid'),
        tidList: sessionItemRoyal.get('rc-tidList')
          ? JSON.parse(sessionItemRoyal.get('rc-tidList'))
          : [],
        rePaySubscribeId: sessionItemRoyal.get('rc-rePaySubscribeId')
      },
      () => {
        this.state.tidList &&
          this.state.tidList.length &&
          this.queryOrderDetails();
      }
    );
  };
  //cyber查询卡类型-会员
  queryCyberCardType = async (params) => {
    try {
      const res =
        await this.cyberRef.current.cyberCardRef.current.queryCyberCardTypeEvent(
          params
        );
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //cyber查询卡类型-游客
  queryGuestCyberCardType = async (params) => {
    try {
      const res =
        await this.cyberRef.current.cyberCardRef.current.queryGuestCyberCardTypeEvent(
          params
        );
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  getCyberParams() {
    const { isLogin } = this;
    const {
      paymentStore: { currentCardTypeInfo }
    } = this.props;
    const { tid, billingAddress } = this.state;
    let cyberPaymentParam = {};
    let cyberParams = {};
    const {
      cardholderName,
      cardNumber,
      expirationMonth,
      expirationYear,
      securityCode
    } = this.state.cyberPaymentForm;
    let newBillingAddress = Object.assign({}, this.state.billingAddress);
    if (tid && tid != null) {
      newBillingAddress = orderDetails?.invoice;
      newBillingAddress.phoneNumber = orderDetails?.invoice?.phone;
    }
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
      cardType: null,
      cardTypeValue: null,
      paymentVendor: currentCardTypeInfo?.cardType
    });
    return cyberParams;
  }

  UNSAFE_componentWillMount() {
    isHubGA && this.getPetVal();
    const appointNo = sessionItemRoyal.get('appointment-no') || null;
    if (funcUrl({ name: 'oldAppointNo' })) {
      sessionItemRoyal.set('oldAppointNo', funcUrl({ name: 'oldAppointNo' }));
      sessionItemRoyal.set('isChangeAppoint', true);
    }
    if (appointNo) {
      let felinAddress = this.isLogin
        ? Object.assign(felinAddr[0], {
            firstName: this.userInfo.firstName,
            lastName: this.userInfo.lastName,
            email: this.userInfo.email,
            consigneeName: this.userInfo.customerName,
            consigneeNumber: this.userInfo.contactPhone
          })
        : felinAddr[0];
      this.setState(
        {
          appointNo: appointNo,
          isFromFelin: true,
          deliveryAddress: felinAddress,
          billingAddress: felinAddress
        },
        () => {
          this.props.paymentStore.setStsToCompleted({
            key: 'deliveryAddr',
            isFirstLoad: true
          });
          this.props.paymentStore.setStsToCompleted({
            key: 'billingAddr',
            isFirstLoad: true
          });
          this.props.paymentStore.setStsToCompleted({
            key: 'email',
            isFirstLoad: true
          });
        }
      );
    }
  }

  async componentDidMount() {
    const { history } = this.props;
    let { getSystemFormConfig, paymentAuthority } = this.props.configStore;

    // 游客不能checkout 且 没有登录
    if (paymentAuthority === 'MEMBER' && !this.isLogin) {
      history.replace('/');
    }
    await getSystemFormConfig();
    if (this.isLogin) {
      this.queryList();
    }

    if (sessionItemRoyal.get('rc-swishQrcode')) {
      this.setState({
        swishQrcode: sessionItemRoyal.get('rc-swishQrcode'),
        swishQrcodeModal: true
      });
      const result = differenceInSeconds(
        new Date(),
        new Date(sessionItemRoyal.get('rc-createSwishQrcodeTime'))
      );
      payCountDown(
        this.state.countDownStartTime - result,
        1,
        (res, swishQrcodeError) => {
          if (swishQrcodeError) {
            setTimeout(() => {
              this.handelQrcodeModalClose();
            }, 3000);
          }
          this.setState({ countDown: res, swishQrcodeError });
        }
      );
    }

    try {
      const { tid, appointNo } = this.state;

      setSeoConfig({
        pageName: 'Checkout page'
      }).then((res) => {
        this.setState({ seoConfig: res });
      });

      if (tid) {
        this.queryOrderDetails();
      }

      if (appointNo) {
        if (this.isLogin) {
          await this.getDeatalData();
        }
        await this.queryAppointInfo();
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
        if (!this.computedCartData.length && !tid && !appointNo) {
          sessionItemRoyal.remove('rc-iframe-from-storepotal');
          history.push('/cart');
          return false;
        }
      } else {
        let recommend_data = JSON.parse(recommendProductJson);
        recommend_data = recommend_data.map((el) => {
          el.goodsInfo.salePrice = el.goodsInfo?.marketPrice;
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
    console.log(consentData, 'consentData==');
    this.rebindListData(consentData);
    this.initPaymentWay();
    this.initPanelStatus();
  }

  componentWillUnmount() {
    //因设置了router refresh=true，此生命周期无效，需在RouterFilter文件中删除
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

  // 更新delivery address保存次数
  updateSaveAddressNumber = async (number) => {
    this.setState({
      saveAddressNumber: number
    });
  };

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
  sendCyberPaymentForm = async (cyberPaymentForm) => {
    //cardholderName, cardNumber, expirationMonth, expirationYear, securityCode变化时去查询卡类型---start---
    let {
      cardholderName,
      cardNumber,
      expirationMonth,
      expirationYear,
      securityCode
    } = cyberPaymentForm;

    if (
      cardholderName &&
      expirationMonth &&
      expirationYear &&
      cardNumber.length >= 18 &&
      securityCode.length >= 3
    ) {
      let cyberParams = this.getCyberParams();

      if (Object.keys(cyberParams).length > 0) {
        try {
          this.setState({ cyberBtnLoading: true });
          let res = {};
          if (this.isLogin) {
            res = await this.queryCyberCardType(cyberParams);
          } else {
            res = await this.queryGuestCyberCardType(cyberParams);
          }

          let authorizationCode = res.context.requestToken;
          let subscriptionID = res.context.subscriptionID;
          let cyberCardType = res.context.cardType;
          this.setState({ authorizationCode, subscriptionID, cyberCardType });
        } catch (err) {
          this.showErrorMsg(err.message);
        } finally {
          this.setState({ cyberBtnLoading: false });
        }
      }
    }
    //cardholderName, cardNumber, expirationMonth, expirationYear, securityCode变化时去查询卡类型---end---
    this.setState({ cyberPaymentForm });
  };

  //判断是否是0元订单，0元订单处理：隐藏paymentMethod，用户不用填写支付信息
  handleZeroOrder() {
    const {
      setStsToCompleted,
      setStsToEdit,
      setStsToPrepare,
      confirmationPanelStatus
    } = this.props.paymentStore;
    const { paymentPanelHasComplete, tid } = this.state;

    if (!tid) {
      if (this.tradePrice === 0) {
        //变成0元订单
        if (this.paymentMethodPanelStatus.isEdit) {
          //如果当前正在编辑的是paymentInfo,隐藏paymentMethod面板去编辑confirmation面板
          setStsToCompleted({
            key: 'paymentMethod'
          });
          setStsToEdit({ key: 'confirmation' });
        } else {
          //正在编辑其他面板的话只需要将paymentMethod面板隐藏
          setStsToCompleted({
            key: 'paymentMethod'
          });
        }
      } else {
        //变成不是0元订单
        if (!paymentPanelHasComplete && confirmationPanelStatus.isEdit) {
          //正在编辑的是confirm面板而且payment没有编辑完，切回payment面板
          setStsToEdit({ key: 'paymentMethod' });
          setStsToPrepare({ key: 'confirmation' });
          return;
        }
        if (!paymentPanelHasComplete && !this.paymentMethodPanelStatus.isEdit) {
          //正在编辑的是其他面板则将paymentMethod置为prePare
          setStsToPrepare({ key: 'paymentMethod' });
        }
      }
    }
  }

  initPanelStatus() {
    const { paymentStore } = this.props;
    const { tid, isFromFelin } = this.state;

    //初始化的时候如果是0元订单将paymentMethod面板置为已完成
    if (this.tradePrice === 0 && !tid) {
      paymentStore.setStsToCompleted({
        key: 'paymentMethod'
      });
    }

    //repay或者from felin情况下，地址信息不可编辑，直接置为completed
    if (isFromFelin || tid) {
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
    const { intl } = this.props;
    const { cyberErrMsgObj } = this.state;
    const target = e.target;
    const targetRule = ADDRESS_RULE.filter((e) => e.key === target.name);
    const value = target.value;
    try {
      await validData({
        rule: targetRule,
        data: { [target.name]: value },
        intl
      });
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
      const {
        paymentStore: { setPayWayNameArr }
      } = this.props;
      const payWay = await getWays();
      // name:后台返回的支付方式，langKey：翻译id，paymentTypeVal：前端选择的支付方式，作为用来判断的变量
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
        adyen_paypal: {
          name: 'adyen_paypal',
          langKey: 'paypal',
          paymentTypeVal: 'adyenPaypal'
        },
        pc_web: {
          name: 'cyber',
          langKey: 'cyber',
          paymentTypeVal: 'cyber'
        },
        adyen_swish: {
          name: 'adyen_swish',
          langKey: 'Swish',
          paymentTypeVal: 'adyen_swish'
        }
      };
      if (
        window.__.env.REACT_APP_COUNTRY === 'ru' &&
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
          setPayWayNameArr(payWayNameArr);
          this.props.paymentStore.setSupportPaymentMethods(
            payWayNameArr[0]?.payPspItemCardTypeVOList
          );
          sessionItemRoyal.set(
            'rc-payWayNameArr',
            JSON.stringify(payWayNameArr)
          );
          this.initPaymentTypeVal();
        }
      );
    } catch (e) {
      this.setState({
        payWayErr: e.message
      });
    }
  };

  //默认第一个,如没有支付方式,就不初始化方法
  initPaymentTypeVal(val) {
    const {
      paymentStore: { serCurPayWayVal }
    } = this.props;

    const tmpVal = val || this.state.payWayNameArr[0]?.paymentTypeVal || '';
    serCurPayWayVal(tmpVal);
    if (
      chooseRadioType(window.__.env.REACT_APP_COUNTRY) === 'box' &&
      this.tradePrice != 0
    )
      return; //box的方式不默认第一种支付方式,0元订单还是默认第一种credit card支付方式
    this.setState(
      {
        paymentTypeVal: tmpVal
      },
      () => {
        this.onPaymentTypeValChange();
      }
    );
  }
  // adyenCard支持的卡类型
  setSupportPaymentMethods() {
    return (
      this.state.payWayNameArr.filter(
        (p) => p.paymentTypeVal === this.state.paymentTypeVal
      )[0]?.payPspItemCardTypeVOList || []
    );
  }

  onPaymentTypeValChange() {
    const supportPaymentMethods = this.setSupportPaymentMethods();
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

  // 更新felin预约的用户信息

  async setFelinAppointInfo(params) {
    if (!this.userInfo) return;
    await postUpdateUser({
      apptNo: this.state.appointNo,
      consumerName: params.firstName + ' ' + params.lastName,
      consumerFirstName: params.firstName,
      consumerLastName: params.lastName,
      consumerEmail: params.email,
      consumerPhone: params.phone
    });
    this.setState({
      visibleUpdate: false
    });
  }

  async getDeatalData() {
    const { code, context } = await getAppointByApptNo({
      apptNo: this.state.appointNo
    });
    if (code === 'K-000000') {
      const {
        consumerFirstName,
        consumerEmail,
        consumerLastName,
        consumerName,
        consumerPhone
      } = context;
      if (
        !consumerFirstName ||
        !consumerEmail ||
        !consumerLastName ||
        !consumerName ||
        !consumerPhone
      ) {
        this.setState({
          visibleUpdate: true
        });
      }
    }
  }

  handleUpdate = async (params) => {
    this.setFelinAppointInfo(params);
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

  //获取appointment信息
  async queryAppointInfo() {
    try {
      const result = await getAppointmentInfo(this.state.appointNo);
      console.log('appointmentInfo', result);
      const requestName = this.isLogin ? getLoginDetails : getDetails;
      const goodInfoRes = await requestName(result?.goodsInfoId);
      const goodInfo = goodInfoRes?.context || {};
      if (!goodInfoRes?.context) {
        this.showErrorMsg('Cannot get product info from api');
        return;
      }
      const goodDetail = Object.assign(goodInfo, {
        goodsInfoId: result?.goodsInfoId,
        goodsInfoImg: goodInfo?.goods?.goodsImg,
        goodsName: goodInfo?.goods?.goodsName || '',
        buyCount: 1,
        // recommendationId: funcUrl({ name: 'appointmentNo' }) ? '' : 'Felin', //felin fgs下单的需要Felin字段，下线（邮件直接过来的）不需要
        salePrice: goodInfo?.goodsInfos
          ? goodInfo?.goodsInfos.filter(
              (item) => item.goodsInfoId === result?.goodsInfoId
            )[0].salePrice
          : 0,
        selected: true
      });
      sessionItemRoyal.set('recommend_product', JSON.stringify([goodDetail]));
      await this.props.checkoutStore.updatePromotionFiled([goodDetail]);
      this.handleZeroOrder();
      if (!this.isLogin) {
        const felinAddress = Object.assign(felinAddr[0], {
          firstName: result?.consumerFirstName || '',
          lastName: result?.consumerLastName || '',
          consigneeName:
            result?.consumerName ||
            result?.consumerFirstName + ' ' + result?.consumerLastName ||
            '',
          consigneeNumber: result?.consumerPhone || ''
        });
        this.setState({
          deliveryAddress: felinAddress,
          billingAddress: felinAddress,
          guestEmail: result?.consumerEmail
        });
      }
      this.setState({
        recommend_data: [Object.assign(result, goodDetail)]
      });
    } catch (err) {
      this.showErrorMsg(err.message);
    }
  }

  showErrorMsg = (msg) => {
    this.setState({
      errorMsg: msg,
      loading: false
    });
    if (msg && msg !== 'This Error No Display') {
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
    console.log('selectedCardInfo', selectedCardInfo);
    let _parameters = parameters;
    _parameters = Object.assign({}, commonParameter, {
      payPspItemEnum,
      country,
      ...otherParams
    });
    if (selectedCardInfo && selectedCardInfo.paymentToken) {
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
              resolve(result);
            }
          );
        });
        cvvResult = JSON.parse(cvvResult);
        _parameters = Object.assign(_parameters, {
          paymentMethodId: selectedCardInfo.id,
          creditDardCvv: cvvResult && cvvResult.token
        });
      } catch (err) {
        this.endLoading();
        throw new Error(err.message);
      }
    }
    return new Promise((resolve) => {
      resolve(_parameters);
    });
  }

  // 6、组装支付共同的参数
  async getAdyenPayParam(type) {
    try {
      const { email, swishPhone } = this.state;
      const { isLogin } = this;
      let obj = await this.getPayCommonParam();
      let commonParameter = obj.commonParameter;
      //在commonParameter加上一个consentIds-start
      if (window.__.env.REACT_APP_COUNTRY == 'tr') {
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
            encryptedSecurityCode: adyenPayParam?.encryptedSecurityCode || '',
            payPspItemEnum:
              sessionItemRoyal.get('goodWillFlag') === 'GOOD_WILL' ||
              this.tradePrice === 0
                ? 'ZEROPRICE'
                : 'ADYEN_CREDIT_CARD'
          });
          if (adyenPayParam?.paymentToken) {
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
            email
          });
        },
        adyenKlarnaPayNow: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'klarna_paynow',
            payPspItemEnum: 'ADYEN_KLARNA_PAYNOW',
            email
          });
        },
        directEbanking: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'directEbanking',
            payPspItemEnum: 'ADYEN_SOFORT',
            email
          });
        },
        adyenOxxo: () => {
          parameters = Object.assign(commonParameter, {
            payPspItemEnum: 'ADYEN_OXXO',
            email
          });
        },
        adyenPaypal: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'paypal',
            payPspItemEnum: 'ADYEN_PAYPAL'
          });
        },
        adyen_swish: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'swish',
            payPspItemEnum: 'ADYEN_SWISH'
            //adyenSwishPhone: swishPhone
          });
        },
        cyber: () => {
          const {
            cyberPayParam: { id, cardCvv, accessToken }
          } = this.state;
          parameters = Object.assign({}, commonParameter, {
            payPspItemEnum: 'CYBER',
            paymentMethodId: id,
            securityCode: cardCvv,
            accessToken: accessToken
          });
        }
      };
      await actions[type]();

      //合并支付必要的参数
      let finalParam = Object.assign(parameters, {
        /**
         * redirectUrl & successUrl
         * 1. handle callback through successUrl(which is included /api, it used nginx to intercep api router, and then redirect to related shop page) -> adyenCard
         * 2. /PayResult, handle callback at this router -> adyenKlarnaPayLater/adyenKlarnaPayNow/directEbanking
         * 3. /Payu3dsPayResult, handle callback at this router -> payUCreditCardRU/payUCreditCardTU
         */
        successUrl: window.__.env.REACT_APP_BASEURL, // /api
        redirectUrl: process.env.REACT_APP_3DS_REDIRECT_URL || '',
        deliveryAddressId: this.state.deliveryAddress?.addressId,
        billAddressId: this.state.billingAddress?.addressId,
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
      const commonParameter = await this.packagePayParam();
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
      // console.log('666 获取参数: ', parameters);
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
        const confirmAndCommitFelinFun = () => {
          action = confirmAndCommitFelin;
        }; //felin
        const rePayFelinFun = () => {
          action = rePayFelin;
        }; //repayFelin
        return new Map([
          [
            {
              isTid: /^true$/i,
              isLogin: /.*/,
              buyWay: /.*/,
              isFelin: /^true$/i
            },
            rePayFelinFun
          ],
          [
            {
              isTid: /^true$/i,
              isLogin: /.*/,
              buyWay: /.*/,
              isFelin: /^false$/i
            },
            rePayFun
          ],
          [
            {
              isTid: /^false$/i,
              isLogin: /^true$/i,
              buyWay: /^once$/,
              isFelin: /^false$/i
            },
            customerCommitAndPayFun
          ], //buyWay为once的时候均表示会员正常交易
          [
            {
              isTid: /^false$/i,
              isLogin: /^true$/i,
              buyWay: /^frequency$/,
              isFelin: /^false$/i
            },
            customerCommitAndPayMixFun
          ],
          [
            {
              isTid: /^false$/i,
              isLogin: /^false$/i,
              buyWay: /.*/,
              isFelin: /^false$/i
            },
            confirmAndCommitFun
          ],
          [
            {
              isTid: /^false$/i,
              isLogin: /.*/,
              buyWay: /.*/,
              isFelin: /^true$/i
            },
            confirmAndCommitFelinFun
          ]
        ]);
      };
      const payFun = (isTid, isLogin, buyWay, isFelin) => {
        let action = [...actions()].filter(
          ([key, value]) =>
            key.isTid.test(isTid) &&
            key.isLogin.test(isLogin) &&
            key.buyWay.test(buyWay) &&
            key.isFelin.test(isFelin)
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
              storeId: window.__.env.REACT_APP_STOREID
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
      payFun(
        isRepay,
        this.isLogin,
        this.state.subForm.buyWay,
        this.state.isFromFelin
      );

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
        case 'adyen_swish':
          subOrderNumberList = tidList.length
            ? tidList
            : res.context && res.context.tidList;
          subNumber = (res.context && res.context.subscribeId) || '';

          if (subOrderNumberList && this.isLogin) {
            sessionItemRoyal.set('rc-tid', subOrderNumberList[0]);
            sessionItemRoyal.set('rc-rePaySubscribeId', subNumber);
            sessionItemRoyal.set(
              'rc-tidList',
              JSON.stringify(subOrderNumberList)
            );
          }

          if (res.context.qrCodeData) {
            this.setState({ swishAppRedirectUrl: res.context.redirectUrl });
            async function getData() {
              return adyenPaymentsDetails({
                redirectResult: res.context.paymentData,
                businessId: res.context.tid
              })
                .then(async function (response) {
                  switch (response.context.status) {
                    case 'PROCESSING':
                      return await getData();
                      break;
                    case 'SUCCEED':
                      gotoConfirmationPage = true;
                      //return await getData();
                      break;
                    case 'FAILURE':
                      this.setState({
                        swishQrcodeError: true,
                        swishQrcode: ''
                      });
                      sessionItemRoyal.remove('rc-swishQrcode');
                      break;
                  }
                })
                .catch(function () {
                  //this.setState({ swishQrcodeError: true });
                });
            }

            //模态框
            this.setState(
              {
                swishQrcode: res.context.qrCodeData,
                swishQrcodeModal: true
              },
              () => {
                sessionItemRoyal.set('rc-swishQrcode', this.state.swishQrcode);
                // sessionItemRoyal.set('rc-createSwishQrcodeTime', format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
                sessionItemRoyal.set(
                  'rc-createSwishQrcodeTime',
                  new Date().toString()
                );
                this.endLoading();
              }
            );
            payCountDown(
              this.state.countDownStartTime,
              1,
              (res, swishQrcodeError) => {
                if (swishQrcodeError) {
                  setTimeout(() => {
                    this.handelQrcodeModalClose();
                  }, 3000);
                }
                this.setState({ countDown: res, swishQrcodeError });
              }
            );

            await getData();
          }
          if (isMobile) {
            window.location = res.context.redirectUrl;
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
        case 'adyenPaypal':
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
        sessionItemRoyal.remove('rc-clicked-surveyId');
        sessionItemRoyal.remove('goodWillFlag');
        //支付成功清除推荐者信息
        this.props.clinicStore.removeLinkClinicInfo();
        this.props.clinicStore.removeLinkClinicRecommendationInfos();

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
    if (deliveryAddress?.receiveType === 'PICK_UP') {
      return;
    }
    try {
      let deliveryAdd = Object.assign({}, deliveryAddress, {
        deliveryDate: '',
        timeSlot: '',
        consigneeNumber: deliveryAddress.phoneNumber,
        isDefaltAddress: deliveryAddress.isDefalt ? 1 : 0
      });
      let res = await editAddress(deliveryAdd);
    } catch (err) {
      console.log(err);
    }
  };

  // 删除本地购物车
  async removeLocalCartData() {
    const { checkoutStore } = this.props;
    if (this.isLogin) {
      checkoutStore.removeLoginCartData();
      // 清空 delivery date 和 time slot (可能造成phoneNumber为空)
      // await this.clearTimeslotAndDeliverydate();
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
              goodsInfoId: sessionItemRoyal.get('appointment-no')
                ? ele.goodsInfoId
                : find(ele.goods.sizeList, (s) => s.selected).goodsInfoId
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
  async packagePayParam() {
    const loginCartData = this.loginCartData;
    const cartData = this.cartData.filter((ele) => ele.selected);
    const {
      clinicStore,
      paymentStore: { addCardDirectToPayFlag }
    } = this.props;
    let {
      deliveryAddress,
      billingAddress,
      creditCardInfo,
      payosdata,
      guestEmail,
      promotionCode,
      recommend_data,
      isFromFelin
    } = this.state;

    // 获取本地存储的计算运费折扣参数
    const calculationParam = localItemRoyal.get('rc-calculation-param') || null;

    //登录状态下在cart勾选了survey需判断是否已下过单
    let surveyId = sessionItemRoyal.get('rc-clicked-surveyId') || '';
    const breedOrShelterId = sessionItemRoyal.get('BreedOrShelterId') || '';
    if (surveyId !== '' && this.isLogin) {
      const params = {
        storeId: window.__.env.REACT_APP_STOREID,
        customerId: this.userInfo.customerId,
        breedOrShelter:
          breedOrShelterId.indexOf('BRD') === 0
            ? 'Breeder'
            : breedOrShelterId.indexOf('BRM') === 0
            ? 'Shelter'
            : 'Everyone'
      };
      const result = await querySurveyContent(params);
      if (!result?.context?.isShow || surveyId !== result?.context?.id) {
        surveyId = '';
      }
    }
    //封装felin下单参数
    let appointParam = {};
    if (isFromFelin && recommend_data.length > 0) {
      appointParam = {
        appointmentNo: recommend_data[0]?.apptNo, //felin预约单号
        specialistType: recommend_data[0]?.expertName, //专家类型
        appointmentTime: recommend_data[0]?.minutes, //预约时长
        appointmentType: recommend_data[0]?.appointType, //预约类型
        appointmentDate: recommend_data[0]?.apptTime //预约时间
      };
    }

    /**
     * ★★★ 1
     * 封装下单参数的时候需要把新加的字段加上，
     * 否则支付时会刷新preview显示的参数
     */
    let param = Object.assign(
      {},
      deliveryAddress,
      {
        zipcode: deliveryAddress?.postCode,
        phone: creditCardInfo?.phoneNumber,
        email: creditCardInfo?.email || deliveryAddress?.email || guestEmail,
        line1: deliveryAddress?.address1,
        line2: deliveryAddress?.address2,
        //审核者信息放订单行
        clinicsId: clinicStore.selectClinicId,
        clinicsName: clinicStore.selectClinicName,
        //下单增加recommendationCode(clinicsCode)字段
        clinicsCode: clinicStore.selectClinicCode,
        storeId: window.__.env.REACT_APP_STOREID,
        tradeItems: [], // once order products
        subTradeItems: [], // subscription order products
        tradeMarketingList: [],
        payAccountName: creditCardInfo?.cardOwner,
        payPhoneNumber: creditCardInfo?.phoneNumber,
        petsId: '',
        deliveryAddressId: deliveryAddress?.addressId,
        billAddressId: billingAddress?.addressId,
        maxDeliveryTime:
          calculationParam?.maxDeliveryTime || deliveryAddress?.maxDeliveryTime,
        minDeliveryTime:
          calculationParam?.minDeliveryTime || deliveryAddress?.minDeliveryTime,
        promotionCode,
        guestEmail,
        selectWelcomeBoxFlag: this.state.welcomeBoxValue === 'yes', //first order welcome box
        surveyId, //us cart survey
        goodWillFlag:
          sessionItemRoyal.get('goodWillFlag') === 'GOOD_WILL' ? 1 : 0,
        isApptChange: Boolean(sessionItemRoyal.get('isChangeAppoint')),
        oldAppointNo: sessionItemRoyal.get('oldAppointNo'),
        paymentMethodIdFlag: addCardDirectToPayFlag
      },
      appointParam
    );
    if (sessionItemRoyal.get('goodWillFlag') === 'GOOD_WILL') {
      param.orderSource = 'SUPPLIER';
    }
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
    if (tokenObj && tokenObj.accessToken) {
      param.oktaToken = 'Bearer ' + tokenObj.accessToken.accessToken;
    }

    // 1: HOMEDELIVERY , 2: PICKUP
    if (
      deliveryAddress?.receiveType == 'HOME_DELIVERY' ||
      deliveryAddress?.receiveType == ''
    ) {
      param.deliverWay = 1;
    }
    if (deliveryAddress?.receiveType == 'PICK_UP') {
      param.deliverWay = 2;
    }

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
        const recoProductParam = handleRecoProductParamByItem(ele);
        return Object.assign(recoProductParam, {
          num: ele.buyCount,
          skuId: ele.goodsInfoId,
          petsId: ele.petsId,
          petsName: ele.petsName,
          goodsInfoFlag: 0
        });
      });
    } else if (this.isLogin) {
      param.tradeItems = loginCartData.map((ele) => {
        const recoProductParam = handleRecoProductParamByItem(ele);
        return Object.assign(recoProductParam, {
          num: ele.buyCount,
          skuId: ele.goodsInfoId,
          petsId: ele.petsId,
          petsName: ele.petsName,
          goodsInfoFlag: ele.goodsInfoFlag
        });
      });
    } else {
      param.tradeItems = cartData.map((ele) => {
        const recoProductParam = handleRecoProductParamByItem(ele);
        return Object.assign(recoProductParam, {
          num: ele.quantity,
          skuId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
          goodsInfoFlag: ele.goodsInfoFlag
        });
      });
    }

    if (
      this.isCurrentBuyWaySubscription &&
      !sessionItemRoyal.get('appointment-no')
    ) {
      param.tradeItems = loginCartData
        // .filter((ele) => !ele.subscriptionStatus || !ele.subscriptionPrice)
        .filter((ele) => !ele.goodsInfoFlag)
        .map((g) => {
          const recoProductParam = handleRecoProductParamByItem(g);
          return Object.assign(recoProductParam, {
            num: g.buyCount,
            skuId: g.goodsInfoId,
            petsId: g.petsId,
            petsName: g.petsName,
            goodsInfoFlag: g.goodsInfoFlag,
            periodTypeId: g.periodTypeId
          });
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
          const recoProductParam = handleRecoProductParamByItem(g);
          return Object.assign(recoProductParam, {
            settingPrice: g.settingPrice,
            packageId: g.packageId,
            subscriptionPlanPromotionFlag: g.subscriptionPlanPromotionFlag,
            subscriptionPlanId: g.subscriptionPlanId,
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
            periodTypeId: g.periodTypeId
          });
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
          phoneNumber: deliveryAddress?.consigneeNumber,
          addressId:
            deliveryAddress.addressId || deliveryAddress.deliveryAddressId
        });

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
            county: billingAddress?.county,
            city: billingAddress.city,
            cityId: billingAddress.cityId,
            provinceId: billingAddress.provinceId,
            provinceNo: billingAddress.provinceNo,
            province: billingAddress.province,
            postCode: billingAddress.postCode,
            comment: billingAddress?.comment,
            phoneNumber: billingAddress?.consigneeNumber,
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
    const { intl } = this.props;
    try {
      await this.saveAddressAndCommentPromise();
      await this.props.checkoutStore.validCheckoutLimitRule({
        minimunAmountPrice: formatMoney(window.__.env.REACT_APP_MINIMUM_AMOUNT),
        intl
      });
    } catch (err) {
      console.warn(err);
      throw new Error(err.message);
    }
  }

  savePromotionCode = (promotionCode) => {
    //如果promotionCode将订单变为0元，0元订单将paymentMethod面板置为已完成
    this.handleZeroOrder();
    this.setState({
      promotionCode
    });
  };
  handlePaymentTypeChange = (e) => {
    const {
      paymentStore: { serCurPayWayVal }
    } = this.props;
    this.setState({ paymentTypeVal: e.target.value, email: '' }, () => {
      serCurPayWayVal(this.state.paymentTypeVal);
      this.onPaymentTypeValChange();
    });
  };
  handlePaymentTypeClick = (paymentTypeVal) => {
    const {
      paymentStore: { serCurPayWayVal }
    } = this.props;
    this.setState({ paymentTypeVal, email: '' }, () => {
      serCurPayWayVal(this.state.paymentTypeVal);
      this.onPaymentTypeValChange();
    });
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
        countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
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
    const { intl } = this.props;
    const { shippingFeeAddress, guestEmail } = this.state;
    let param = {};
    // this.setState({
    //   loading: true
    // });
    if (data?.DuData) {
      let dudata = data?.DuData;
      shippingFeeAddress.provinceIdStr = dudata?.provinceId;
      shippingFeeAddress.areaIdStr = dudata?.areaId;
      shippingFeeAddress.cityIdStr = dudata?.cityId;
      shippingFeeAddress.settlementIdStr = dudata?.settlementId;
      shippingFeeAddress.postalCode = dudata?.postCode;
      shippingFeeAddress.address1 = data?.address1;
    } else {
      shippingFeeAddress.provinceIdStr = data?.provinceIdStr;
      shippingFeeAddress.areaIdStr = data?.areaIdStr;
      shippingFeeAddress.cityIdStr = data?.cityIdStr;
      shippingFeeAddress.settlementIdStr = data?.settlementIdStr;
      shippingFeeAddress.postalCode = data?.postalCode;
      shippingFeeAddress.address1 = data?.address1;
    }
    this.setState({
      shippingFeeAddress
    });

    // 把查询运费折扣相关参数存到本地
    data.maxDeliveryTime =
      data?.maxDeliveryTime || data?.calculation?.maxDeliveryTime;
    data.minDeliveryTime =
      data?.minDeliveryTime || data?.calculation?.minDeliveryTime;
    localItemRoyal.set('rc-calculation-param', data);

    param = {
      promotionCode: this.props.checkoutStore.promotionCode,
      purchaseFlag: false, // 购物车: true，checkout: false
      taxFeeData: {
        country: window.__.env.REACT_APP_GA_COUNTRY, // 国家简写 / data.countryName
        region: data?.stateNo || '', // 省份简写
        city: data?.city,
        street: data?.address1,
        postalCode: data?.postCode,
        customerAccount: guestEmail
      },
      shippingFeeAddress: shippingFeeAddress
    };
    if (this.isLogin) {
      param.subscriptionFlag = false;
    }

    // 1: HOMEDELIVERY , 2: PICKUP
    if (data?.receiveType == 'HOME_DELIVERY' || !data?.receiveType) {
      param.deliverWay = 1;
    }
    if (data?.receiveType == 'PICK_UP') {
      param.deliverWay = 2;
    }

    // PayProductInfo 组件中用到的参数
    localItemRoyal.set('rc-payment-purchases-param', param);
    try {
      // 获取税额
      param = Object.assign(param, { intl });
      if (this.isLogin) {
        await this.props.checkoutStore.updateLoginCart(param);
      } else {
        await this.props.checkoutStore.updateUnloginCart(param);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      // this.setState({
      //   loading: false
      // });
    }
  };
  updateDeliveryAddrData = (data) => {
    const {
      paymentStore: { setPayWayNameArr }
    } = this.props;
    this.setState(
      {
        deliveryAddress: data
      },
      () => {
        let newPayWayName =
          JSON.parse(sessionItemRoyal.get('rc-payWayNameArr')) || null;
        if (newPayWayName) {
          // pickup 支付方式处理：
          // 1、cod: cash & card，则shop展示cod和卡支付
          // 2、cod: cash 或 card，则shop展示cod和卡支付
          // 3、无返回，则shop展示卡支付
          let pmd = data?.paymentMethods || null;
          let pickupPayMethods = null;
          if (pmd == 'cod') {
            pickupPayMethods = pmd;
          } else {
            if (data?.receiveType == 'PICK_UP') {
              // 如果pickup没有cod的时候过滤掉cod
              newPayWayName = newPayWayName.filter((e) => {
                return e.code !== 'cod';
              });
            }
          }
          // console.log('666 -->> deliveryAddress: ', this.state.deliveryAddress);
          console.log('666 -->> pmd: ', pmd);

          this.setState({ payWayNameArr: [...newPayWayName] }, () => {
            setPayWayNameArr(this.state.payWayNameArr);
            this.initPaymentTypeVal();
          });
        }
      }
    );

    if (this.state.billingChecked || data?.receiveType == 'PICK_UP') {
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
    // console.log('666 ★★ 抓取异常：',msg)
    this.showErrorMsg(msg);
  };

  // 对应的国际化字符串
  getIntlMsg = (str) => {
    return this.props.intl.messages[str];
  };

  paymentUpdateDeliveryOrPickup = (num) => {
    // console.log('666  更新 deliveryOrPickUp: ', num);
    this.setState({
      deliveryOrPickUp: num
    });
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
              {...this.props}
              id="1"
              type="delivery"
              intlMessages={this.props.intl.messages}
              isCurrentBuyWaySubscription={this.isCurrentBuyWaySubscription}
              showDeliveryDateTimeSlot={true}
              isDeliveryOrBilling="delivery"
              isValidationModal={this.state.isShowValidationModal}
              saveAddressNumber={this.state.saveAddressNumber}
              paymentUpdateDeliveryOrPickup={this.paymentUpdateDeliveryOrPickup}
              deliveryOrPickUp={this.state.deliveryOrPickUp}
              updateSaveAddressNumber={(e) => this.updateSaveAddressNumber(e)}
              updateValidationStaus={this.updateValidationStaus}
              catchErrorMessage={this.catchAddOrEditAddressErrorMessage}
              updateData={this.updateDeliveryAddrData}
              calculateFreight={this.calculateFreight}
              cartData={this.computedCartData}
              isLogin={true}
            />
          ) : (
            <VisitorAddress
              {...this.props}
              key={1}
              type="delivery"
              intlMessages={this.props.intl.messages}
              reSelectTimeSlot={this.getIntlMsg('payment.reselectTimeSlot')}
              showDeliveryDateTimeSlot={true}
              isDeliveryOrBilling="delivery"
              initData={deliveryAddress}
              isValidationModal={this.state.isShowValidationModal}
              saveAddressNumber={this.state.saveAddressNumber}
              paymentUpdateDeliveryOrPickup={this.paymentUpdateDeliveryOrPickup}
              deliveryOrPickUp={this.state.deliveryOrPickUp}
              guestEmail={guestEmail}
              updateValidationStaus={this.updateValidationStaus}
              catchErrorMessage={this.catchAddOrEditAddressErrorMessage}
              updateData={this.updateDeliveryAddrData}
              calculateFreight={this.calculateFreight}
              cartData={this.computedCartData}
              isLogin={false}
            />
          )}
        </div>
      </>
    );
  };

  renderBillingJSX = ({ type }) => {
    const { intl } = this.props;
    const {
      billingAddressErrorMsg,
      billingChecked,
      billingAddress,
      deliveryAddress,
      adyenPayParam,
      tid,
      guestEmail,
      cyberPaymentForm: { isSaveCard },
      isFromFelin
    } = this.state;

    if (hideBillingAddr) return null;

    if (tid || isFromFelin) return null;

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
              form: this.state.billingAddress,
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
                {...this.props}
                ref={this.loginBillingAddrRef}
                key={2}
                titleVisible={false}
                type="billing"
                isDeliveryOrBilling="billing"
                intlMessages={intl.messages}
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
                isLogin={true}
              />
            ) : (
              <VisitorAddress
                {...this.props}
                ref={this.unLoginBillingAddrRef}
                key={2}
                titleVisible={false}
                showConfirmBtn={false}
                type="billing"
                intlMessages={intl.messages}
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
                catchErrorMessage={this.catchAddOrEditAddressErrorMessage}
                isLogin={false}
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
        authorizationCode: this.state.authorizationCode,
        subscriptionID: this.state.subscriptionID,
        paymentVendor: currentCardTypeInfo.cardType
      });
    }

    // 当billing未确认时，需确认
    const { billingChecked } = this.state;

    async function handleClickSaveAdyenForm(_this) {
      try {
        const cardListRef = _this.adyenCardRef?.current?.cardListRef?.current;
        if (cardListRef) {
          await cardListRef.clickConfirm();
        }
      } catch (e) {
        throw new Error(e.message);
      }
    }

    async function handleClickSavePayUForm(_this) {
      try {
        const payUCreditCardRef = _this.payUCreditCardRef?.current;
        if (payUCreditCardRef) {
          const paymentCompRef = payUCreditCardRef.paymentCompRef?.current;
          // if-会员 else-游客
          if (paymentCompRef) {
            await paymentCompRef.handleSave();
          } else {
            await payUCreditCardRef.handleClickCardConfirm();
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
        const res =
          await this.cyberRef.current.cyberCardRef.current.usGuestPaymentInfoEvent(
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
        const res =
          await this.cyberRef.current.cyberCardRef.current.usPaymentInfoEvent(
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
          await this.unLoginBillingAddrRef.current.handleClickConfirm();
        }
      }
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
      configStore: { localAddressForm: laddf }
    } = this.props;
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
      let dfarr = laddf.settings;
      dfarr = dfarr.filter(
        (item) => item.enableFlag == 1 && item.requiredFlag == 1
      );
      let errMsgArr = [];
      dfarr.forEach((v, i) => {
        let akey = v.fieldKey;
        // state 对应数据库字段 province
        akey = v.fieldKey == 'state' ? 'province' : v.fieldKey;
        // region 对应数据库字段 area
        akey = v.fieldKey == 'region' ? 'area' : v.fieldKey;
        // phoneNumber 对应数据库字段 consigneeNumber
        if (billaddr?.consigneeNumber) {
          akey = v.fieldKey == 'phoneNumber' ? 'consigneeNumber' : v.fieldKey;
        }
        let fky = wrongBillingAddress[akey];
        // 判断city和cityId 是否均为空
        if (v.fieldKey == 'city' && (billaddr.city || billaddr.cityId)) {
          akey = '';
        }
        // 判断country和countryId 是否均为空
        if (
          v.fieldKey == 'country' &&
          (billaddr.country || billaddr.countryId)
        ) {
          akey = '';
        }
        if (akey && !billaddr[akey]) errMsgArr.push(fky);
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
    this.cvvConfirmNextPanel();
  };
  // 已绑卡 下一步
  cvvConfirmNextPanel = async () => {
    const { isLogin } = this;
    const { paymentStore } = this.props;
    // console.log('666 ★ --- cvvConfirmNextPanel 跳过验证，下一步 ');
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
    this.setState({ paymentPanelHasComplete: true });
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
    let theform = [];
    if (selectValidationOption == 'suggestedAddress') {
      billingAddress.address1 = validationAddress.address1;
      billingAddress.city = validationAddress.city;
      billingAddress.postCode = validationAddress.postalCode;

      billingAddress.province = validationAddress.provinceCode;
      billingAddress.provinceId = validationAddress.provinceId
        ? validationAddress.provinceId
        : billingAddress.provinceId;

      // 地址校验返回参数
      billingAddress.validationResult = validationAddress.validationResult;
      theform = Object.assign({}, billingAddress);
    } else {
      theform = JSON.parse(JSON.stringify(oldForm));
    }
    this.setState(
      {
        billingAddress: Object.assign({}, theform)
      },
      async () => {
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
      }
    );
  };

  // 编辑
  handleClickPaymentPanelEdit = async () => {
    const {
      checkoutStore,
      paymentStore: {
        setAddCardDirectToPayFlag,
        setRreshCardList,
        setStsToEdit
      }
    } = this.props;

    setAddCardDirectToPayFlag(false);
    setRreshCardList(true);

    const { billingChecked, paymentTypeVal } = this.state;
    if (paymentTypeVal == 'cyber' && this.isLogin) {
      await this.queryList();
    }
    checkoutStore.setInstallMentParam(null);
    setStsToEdit({
      key: 'paymentMethod',
      hideOthers: true
    });
    this.payUCreditCardRef?.current?.handleClickEditBtn();

    this.paymentUpdateDeliveryOrPickup(0); // 隐藏pickup和delivery home

    if (!billingChecked) {
      setStsToEdit({
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
    const { paymentStore } = this.props;
    const {
      paymentStore: { supportPaymentMethods }
    } = this.props;
    const {
      paymentTypeVal,
      subForm,
      payWayErr,
      billingChecked,
      email,
      swishPhone,
      validSts,
      saveBillingLoading,
      payWayNameArr,
      cyberPaymentForm,
      cardTypeVal,
      deliveryAddress,
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
            className={`rc_btn_payment_confirm rc-btn rc-btn--one ${
              loading ? 'ui-btn-loading' : ''
            }`}
            disabled={disabled}
            onClick={this.clickConfirmPaymentPanel}
          >
            <FormattedMessage id="NextToPlaceAnOrder" />
          </button>
        </div>
      );
    };

    const reInputCVVBtn = ({ disabled, loading = false }) => {
      return (
        <div className="d-flex justify-content-end mt-3 rc_btn_payment_cvv">
          <button
            className={`rc_btn_payment_cvv rc-btn rc-btn--one ${
              loading ? 'ui-btn-loading' : ''
            }`}
            disabled={disabled}
            onClick={this.clickReInputCvvConfirm}
          >
            <FormattedMessage id="yes2" />
          </button>
        </div>
      );
    };

    //支付方式圆形单选框
    const InputCirclePaymethords = ({
      payWayNameArr,
      paymentTypeVal,
      handlePaymentTypeChange
    }) => {
      return (
        <div className={`ml-custom mr-custom`}>
          {payWayNameArr.map((item, i) => (
            <div className={`rc-input rc-input--inline`} key={i}>
              <input
                className="rc-input__radio"
                id={`payment-info-${item.id}`}
                value={item.paymentTypeVal}
                type="radio"
                name="payment-info"
                onChange={handlePaymentTypeChange}
                checked={paymentTypeVal === item.paymentTypeVal}
                autoComplete="new-password"
              />
              <label
                className="rc-input__label--inline"
                htmlFor={`payment-info-${item.id}`}
              >
                {item.langKey ? <FormattedMessage id={item.langKey} /> : null}
                {/* <FormattedMessage id={''} /> */}
              </label>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className={`pb-3 ${visible ? '' : 'hidden'}`}>
        {chooseRadioType(window.__.env.REACT_APP_COUNTRY) === 'circle' &&
          payWayNameArr.length > 1 && (
            <InputCirclePaymethords
              payWayNameArr={payWayNameArr}
              paymentTypeVal={paymentTypeVal}
              handlePaymentTypeChange={this.handlePaymentTypeChange}
            />
          )}

        <div className="checkout--padding ml-custom mr-custom pt-3 pb-3 border rounded">
          {chooseRadioType(window.__.env.REACT_APP_COUNTRY) === 'box' && (
            <>
              {payWayNameArr.map((item, index) => (
                <>
                  <div
                    className={`flex justify-between items-center text-grey-400 w-full border rounded-md pl-5 py-2 my-4 cursor-pointer ${
                      paymentTypeVal === item.paymentTypeVal
                        ? 'border-green'
                        : 'border-gray-300 '
                    }`}
                    key={index}
                    onClick={() =>
                      this.handlePaymentTypeClick(item.paymentTypeVal)
                    }
                  >
                    <div className="text-sm md:text-lg">
                      {item.langKey ? (
                        <FormattedMessage id={item.langKey} />
                      ) : null}
                    </div>

                    {/* adyenCard 支持卡的类型logo */}
                    {item.paymentTypeVal === 'adyenCard' &&
                      supportPaymentMethods.length > 0 && (
                        <AdyenCreditCardPic
                          supportPaymentMethods={supportPaymentMethods}
                        />
                      )}

                    {/* adyenPaypal的logo */}
                    {item.paymentTypeVal === 'adyenPaypal' && (
                      <div className="flex">
                        <img src={paypalLogo} className="w-24 mr-5" />
                      </div>
                    )}
                    {/* adyen swish的logo */}
                    {item.paymentTypeVal === 'adyen_swish' && (
                      <div>
                        <img src={swishLogo} className="w-12 md:w-20 mr-5" />
                      </div>
                    )}
                  </div>
                  {/* adyenCreditCard */}
                  {item.paymentTypeVal === 'adyenCard' &&
                    paymentTypeVal === 'adyenCard' && (
                      <>
                        <AdyenCreditCard
                          {...this.props}
                          ref={this.adyenCardRef}
                          subBuyWay={subForm.buyWay}
                          showErrorMsg={this.showErrorMsg}
                          updateAdyenPayParam={this.updateAdyenPayParam}
                          updateFormValidStatus={this.updateValidStatus.bind(
                            this,
                            {
                              key: 'adyenCard'
                            }
                          )}
                          billingJSX={this.renderBillingJSX({
                            type: 'adyenCard'
                          })}
                        />
                        {/* 校验状态
              1 卡校验，从adyen form传入校验状态
              2 billing校验 */}
                        {/* {payConfirmBtn({
                        disabled: !validSts.adyenCard || validForBilling,
                        loading: saveBillingLoading,
                        aaa: validSts,
                        bbb: validForBilling
                      })} */}
                      </>
                    )}
                  {item.paymentTypeVal === 'adyenPaypal' &&
                    paymentTypeVal === 'adyenPaypal' && (
                      <>
                        <Paypal
                          billingJSX={this.renderBillingJSX({
                            type: 'adyen_paypal'
                          })}
                        />
                        {/* {payConfirmBtn({
                        disabled: validForBilling
                      })} */}
                      </>
                    )}
                  {item.paymentTypeVal === 'adyen_swish' &&
                    paymentTypeVal === 'adyen_swish' && (
                      <>
                        <Swish
                          //updateSwishPhone={this.updateSwishPhone}
                          billingJSX={this.renderBillingJSX({
                            type: 'adyen_swish'
                          })}
                        />
                        {/* {payConfirmBtn({
                        // disabled:
                        //   !seTelephoneCheck.test(swishPhone.split(' ').join('')) ||
                        //   validForBilling
                        disabled: validForBilling
                      })} */}
                      </>
                    )}
                </>
              ))}
            </>
          )}
          {chooseRadioType(window.__.env.REACT_APP_COUNTRY) === 'box' &&
            paymentTypeVal === 'adyenCard' &&
            payConfirmBtn({
              disabled: !validSts.adyenCard || validForBilling,
              loading: saveBillingLoading,
              aaa: validSts,
              bbb: validForBilling
            })}
          {paymentTypeVal === 'adyenPaypal' &&
            payConfirmBtn({
              disabled: validForBilling
            })}
          {paymentTypeVal === 'adyen_swish' &&
            payConfirmBtn({
              disabled: validForBilling
            })}
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
                            +window.__.env.REACT_APP_PAYU_SUPPORT_INSTALLMENT
                          )
                    }
                    needEmail={+window.__.env.REACT_APP_PAYU_EMAIL}
                    needPhone={+window.__.env.REACT_APP_PAYU_PHONE}
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
                    {...this.props}
                  />
                  {payConfirmBtn({
                    disabled: !validSts.payUCreditCard || validForBilling,
                    loading: saveBillingLoading
                  })}
                </>
              )}

              {/* adyenCreditCard */}
              {chooseRadioType(window.__.env.REACT_APP_COUNTRY) === 'circle' &&
                paymentTypeVal === 'adyenCard' && (
                  <>
                    <AdyenCreditCard
                      {...this.props}
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
                    // logoUrl={
                    //   payWayNameArr?.filter(
                    //     (el) => el.code === 'adyen_klarna_pay_later'
                    //   )[0].logoUrl
                    // }
                    showIcon={true}
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
                    // logoUrl={
                    //   payWayNameArr?.filter(
                    //     (el) => el.code === 'adyen_klarna_pay_now'
                    //   )[0].logoUrl
                    // }
                    showIcon={true}
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
                    {...this.props}
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
                    cyberCardType={this.state.cyberCardType}
                    cyberPaymentForm={this.state.cyberPaymentForm}
                    cyberBtnLoading={this.state.cyberBtnLoading}
                    showErrorMsg={this.showErrorMsg}
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
          key={form}
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
      cyberPayParam,
      isFromFelin
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
            {...this.props}
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
      case 'adyenPaypal':
        ret = (
          <div className="col-12 col-md-6">
            <img src={paypalLogo} className="w-24 ml-8" />
          </div>
        );
        break;
      case 'adyen_swish':
        ret = (
          <div className="col-12 col-md-6">
            <img src={swishLogo} className="w-24 ml-8" />
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
          {!tid && !hideBillingAddr && !isFromFelin && (
            <div className="col-12 col-md-6 mt-2 md:mt-0 visitor_address_preview">
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
      this.props.checkoutStore.AuditData[this.state.currentProIndex].petForm =
        data;
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
    const {
      intl,
      paymentStore: { setGuestEmail },
      checkoutStore: { updateUnloginCart }
    } = this.props;
    setGuestEmail(guestEmail);
    const { deliveryAddress } = this.state;
    this.setState({ guestEmail }, () => {
      updateUnloginCart({
        guestEmail,
        purchaseFlag: false, // 购物车: true，checkout: false
        taxFeeData: {
          country: window.__.env.REACT_APP_GA_COUNTRY, // 国家简写 / data.countryName
          region: deliveryAddress.provinceNo, // 省份简写
          city: deliveryAddress.city,
          street: deliveryAddress.address1,
          postalCode: deliveryAddress.postCode,
          customerAccount: guestEmail
        },
        shippingFeeAddress: this.state.shippingFeeAddress,
        intl
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
  updateSwishPhone = (swishPhone) => {
    this.setState({ swishPhone });
  };
  // 1、点击支付
  clickPay = () => {
    if (this.tradePrice === 0 && this.isCurrentBuyWaySubscription) {
      //0元订单中含有订阅商品时不能下单
      const errMsg =
        this.props.intl.messages['checkout.zeroOrder.butSubscription'];
      this.showErrorMsg(errMsg);
      return;
    }
    if (this.isLogin) {
      this.userBindConsentFun();
    }
    const { paymentTypeVal } = this.state;
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
    const {
      history,
      location,
      checkoutStore,
      paymentStore: { curPayWayInfo }
    } = this.props;
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
        <h5 className="mb-0 text-xl">
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
        <h5 className="mb-0 text-xl">
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
        <h5 className="mb-0 text-xl">
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
          className="rc-styled-link mb-1 edit_payment_method"
          style={{ cursor: 'pointer' }}
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
          {...this.props}
          showNav={false}
          showLoginBtn={false}
          showMiniIcons={false}
          showUserIcon={true}
        />
        {loading ? <Loading /> : null}
        {this.state.visibleUpdate ? (
          <div className="modal-upadt">
            <UpdatModal
              userInfo={this.userInfo}
              visible={this.state.visibleUpdate}
              handleUpdate={this.handleUpdate}
            />
          </div>
        ) : null}
        <main className="rc-content--fixed-header rc-bg-colour--brand4">
          <div className="rc-bottom-spacing data-checkout-stage1 rc-max-width--lg">
            {/*<Progress type="payment" />*/}
            {/*checkout页面所有国家都不用流程图*/}
            <div className="rc-padding--sm rc-padding-top--none">
              <div className="title">
                <h4 className="text-2xl">
                  <FormattedMessage id="payment.checkout" />
                </h4>
                <p className="mb-0">
                  <FormattedMessage
                    id="checkoutTip"
                    values={{
                      val1: <br />
                    }}
                  />
                </p>
              </div>
            </div>
            <div className="rc-layout-container rc-three-column rc-max-width--xl mt-3 md:mt-0">
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
                      className="ml-custom mr-custom text-xl"
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
                    this.tradePrice === 0 ? 'hidden' : ''
                  } ${
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
              <div className="rc-column md:pl-0 hidden md:block">
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
                    welcomeBoxChange={(value) => {
                      this.setState({ welcomeBoxValue: value });
                    }}
                  />
                )}

                <Faq />
              </div>
            </div>
            <Adyen3DForm
              {...this.props}
              action={this.state.adyenAction}
              key={curPayWayInfo?.code}
            />
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
              welcomeBoxChange={(value) => {
                this.setState({ welcomeBoxValue: value });
              }}
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
        {/* Swish Qrcode Modal */}
        <Modal
          visible={this.state.swishQrcodeModal ? true : false}
          footerVisible={false}
          modalTitle=""
          close={() => this.handelQrcodeModalClose()}
        >
          {this.state.swishQrcodeError ? (
            <div className="h-64 flex flex-col justify-center items-center">
              <img src={swishError}></img>
              <div className="mt-6 text-black text-base">Payment failed</div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="pt-1 pb-6 text-black text-base">Scan QR code</div>
              <QRCode
                value={this.state.swishQrcode}
                size={256}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'L'}
                includeMargin={false}
                renderAs={'svg'}
                imageSettings={{
                  src: swishIcon,
                  x: null,
                  y: null,
                  height: 36,
                  width: 36,
                  excavate: true
                }}
              />
              <div className="text-black font-bold text-base pt-6">
                {formatMoney(this.tradePrice)}
              </div>
              <div className="text-sm pt-6">
                You have {this.state.countDown} to pay
              </div>
              <div className="w-64 md:w-96 text-center py-6 text-gray-600">
                After you scan, the status can be pending for up to 15 minutes.
                Attempting to pay again within this time may result in multiple
                charges.
              </div>
              <button
                className="md:hidden mt-2 rc-btn rc-btn--one"
                onClick={() => {
                  window.location = this.state.swishAppRedirectUrl;
                }}
              >
                Pay By Swish App
              </button>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

export default withOktaAuth(Payment);
