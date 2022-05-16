import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import Modal from '@/components/Modal';
import find from 'lodash/find';
import { inject, observer } from 'mobx-react';
import { toJS, reaction } from 'mobx';
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
import {
  VisitorAddress,
  AddressList,
  AddressPreview,
  SameAsCheckbox,
  RepayAddressPreview
} from './Address';
import Confirmation from './modules/Confirmation';
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
  validData,
  bindSubmitParam,
  getAppointmentInfo
} from '@/utils/utils';
import { seoHoc } from '@/framework/common';
import { EMAIL_REGEXP } from '@/utils/constant';
import { userBindConsent } from '@/api/consent';
import {
  postVisitorRegisterAndLogin,
  batchAdd,
  confirmAndCommit,
  customerCommitAndPay,
  rePay,
  getWays,
  getPaymentMethod,
  confirmAndCommitFelin,
  rePayFelin,
  adyenPaymentsDetails,
  swishCancelOrRefund,
  valetGuestOrderPaymentResponse,
  queryPosOrder,
  cancelPosOrder
} from '@/api/payment';
import { getOrderDetails } from '@/api/order';
import { getLoginDetails, getDetails } from '@/api/details';
import { batchAddPets } from '@/api/pet';
import { editAddress } from '@/api/address';
import {
  PayUCreditCard,
  AdyenCreditCard,
  Paypal,
  Swish,
  Cod,
  OxxoConfirm,
  AdyenCommonPay,
  CyberPayment,
  ConvenienceStore
} from './PaymentMethod';
import { OnePageEmailForm, OnePageClinicForm } from './OnePage';
import './modules/adyenCopy.css';
import './index.css';
import Adyen3DForm from '@/components/Adyen/3d';
import { ADDRESS_RULE } from './PaymentMethod/Cyber/constant/utils';
import {
  doGetGAVal,
  GAonSearchSelectionFocus,
  GAonSearchSelectionError,
  GAonSearchSelectionChange
} from '@/utils/GA';
import ConsentData from '@/utils/consent';
import { querySurveyContent } from '@/api/cart';
import { funcUrl } from '@/lib/url-utils';
import swishIcon from '@/assets/images/swish-icon.svg';
import swishError from '@/assets/images/swish-error.svg';
import { postUpdateUser, getAppointByApptNo } from '@/api/felin';
import UpdatModal from './updatModules/modal';
import QRCode from 'qrcode.react';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import base64 from 'base-64';
import cn from 'classnames';
import { SelectPet } from './SelectPet';
import {
  PanelContainer,
  PayInfoPreview,
  PaymentPanelInfoPreview
} from './Common';
import { Point } from './Point';
import {
  radioTypes,
  supportPoint,
  felinAddr
} from './PaymentMethod/paymentMethodsConstant';
import { ErrorMessage } from '@/components/Message';
import Canonical from '@/components/Canonical';
import {
  USEPOINT,
  NOTUSEPOINT
} from '@/views/Payment/PaymentMethod/paymentMethodsConstant';
import Pos from './PaymentMethod/Pos';
import Cash from './PaymentMethod/Cash';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isHubGA = window.__.env.REACT_APP_HUB_GA;
const hideBillingAddr = Boolean(
  +window.__.env.REACT_APP_HIDE_CHECKOUT_BILLING_ADDR
);

const COUNTRY = window.__.env.REACT_APP_COUNTRY;

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const SupportPaymentMethodsPic = ({ supportPaymentMethods }) => (
  <p>
    <span className="logo-payment-card-list logo-credit-card">
      {supportPaymentMethods.map((el, idx) => (
        <LazyLoad key={idx}>
          {el.imgHtml ? (
            <span
              dangerouslySetInnerHTML={{
                __html: el.imgHtml
              }}
            />
          ) : (
            <img
              className="logo-payment-card mr-1 w-7 max-h-8 md:w-10"
              src={el.imgUrl}
              alt={el.cardType}
            />
          )}
        </LazyLoad>
      ))}
    </span>
  </p>
);

const chooseRadioType = () => {
  return radioTypes[window.__.env.REACT_APP_COUNTRY] || radioTypes['default'];
};

const isSupportPoint = (isLogin) => {
  return (
    (supportPoint[window.__.env.REACT_APP_COUNTRY] ||
      supportPoint['default']) &&
    isLogin
  );
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
@seoHoc('Checkout page')
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
      isAdd: 0,
      listData: [],
      requiredList: [],
      needPrescriber:
        localItemRoyal.get('checkOutNeedShowPrescriber') === 'true', //isNeed clinic：商品Need prescriber或者已经有了prescriber信息
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
      appointNo: null, //felin的预约单号
      convenienceStore: '',
      paypalAccount: '',
      paypalCardId: ''
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
  handelQrcodeModalClose = async () => {
    try {
      this.startLoading();
      await swishCancelOrRefund({
        businessId: sessionItemRoyal.get('rc-businessId'),
        payPspItemEnum: 'ADYEN_SWISH'
      });
      const { history } = this.props;
      if (!this.isLogin) {
        sessionItemRoyal.remove('rc-token');
        history.push('/cart');
      }
      sessionItemRoyal.remove('rc-swishQrcode');
      sessionItemRoyal.remove('rc-createSwishQrcodeTime');
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
    } catch (err) {
      console.log(err.message);
    } finally {
      this.endLoading();
    }
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
    let guestInfo = funcUrl({ name: 'gusetInfo' });
    if (guestInfo) {
      sessionItemRoyal.set('guestInfo', base64.decode(guestInfo));
    }
    guestInfo = JSON.parse(sessionItemRoyal.get('guestInfo'));
    if (appointNo) {
      let felinAddress = Object.assign(
        felinAddr[0],
        this.isLogin
          ? {
              firstName: this.userInfo.firstName,
              lastName: this.userInfo.lastName,
              email: this.userInfo.email,
              consigneeName: this.userInfo.customerName,
              consigneeNumber: this.userInfo.contactPhone
            }
          : {
              firstName: guestInfo.firstName || '',
              lastName: guestInfo.lastName || '',
              consigneeName:
                guestInfo.firstName + ' ' + guestInfo.lastName || '',
              consigneeNumber: guestInfo.phone || ''
            }
      );
      this.setState(
        {
          appointNo: appointNo,
          isFromFelin: true,
          deliveryAddress: felinAddress,
          billingAddress: felinAddress,
          guestEmail: guestInfo?.email || ''
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
    //监听InputCircle组件选择不使用积分时，传入积分参数为0
    reaction(
      () => this.props.checkoutStore.selectDiscountWay,
      () => {
        if (this.props.checkoutStore.selectDiscountWay == NOTUSEPOINT) {
          this.confirmCalculateServiceFeeAndLoyaltyPoints();
        }
      }
    );
    //监听输入积分input框的值是否有效，有效就去调用计算积分接口
    reaction(
      () => this.props.checkoutStore.inputPointOk,
      () => {
        if (this.props.checkoutStore.inputPointOk) {
          setTimeout(() => {
            this.confirmCalculateServiceFeeAndLoyaltyPoints(
              Number(this.props.checkoutStore.inputPoint)
            );
          }, 1000);
        }
      }
    );
    const {
      history,
      checkoutStore: { resetPriceData }
    } = this.props;
    let { getSystemFormConfig, paymentAuthority } = this.props.configStore;

    // 游客不能checkout 且 没有登录
    if (paymentAuthority === 'MEMBER' && !this.isLogin) {
      history.replace('/');
    }
    await getSystemFormConfig();
    if (this.isLogin) {
      this.queryList();
    }

    try {
      const { tid, appointNo } = this.state;
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

      //swish支付刷新网站后持续倒计时监听支付状态
      if (sessionItemRoyal.get('rc-swishQrcode')) {
        this.setState({
          swishQrcode: sessionItemRoyal.get('rc-swishQrcode'),
          swishQrcodeModal: true
        });
        const result = differenceInSeconds(
          new Date(),
          new Date(sessionItemRoyal.get('rc-createSwishQrcodeTime'))
        );
        const getData = () => {
          if (!this.state.swishQrcodeModal) return;
          return adyenPaymentsDetails({
            redirectResult: sessionItemRoyal.get('rc-redirectResult'),
            businessId: sessionItemRoyal.get('rc-businessId')
          })
            .then((response) => {
              switch (response.context.status) {
                case 'PROCESSING':
                  setTimeout(() => {
                    return getData();
                  }, 2000);
                  break;
                case 'SUCCEED':
                  //gotoConfirmationPage = true;
                  this.removeLocalCartData();
                  // 清除掉计算运费相关参数
                  localItemRoyal.remove('rc-calculation-param');
                  sessionItemRoyal.remove('rc-clicked-surveyId');
                  sessionItemRoyal.remove('goodWillFlag');
                  //支付成功清除推荐者信息
                  this.props.clinicStore.removeLinkClinicInfo();
                  this.props.clinicStore.removeLinkClinicRecommendationInfos();

                  // 跳转 confirmation
                  this.props.history.push('/confirmation');
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
        };
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
          },
          (timer) => {
            if (!this.state.swishQrcodeModal) {
              clearInterval(timer);
            }
          }
        );
        getData();
      }
    } catch (err) {
      console.warn(err);
    }

    let consentData = await ConsentData(this.props);
    this.rebindListData(consentData);
    this.initPaymentWay();
    this.initPanelStatus();
    resetPriceData();
  }

  componentWillUnmount() {
    //因设置了router refresh=true，此生命周期无效，需在RouterFilter文件中删除
    const {
      paymentStore: { resetPanelStatus }
    } = this.props;
    resetPanelStatus();
    sessionItemRoyal.remove('rc-tid');
    sessionItemRoyal.remove('rc-tidList');
    sessionItemRoyal.remove('rc-swishQrcode');
    sessionItemRoyal.remove('rc-createSwishQrcodeTime');
    sessionItemRoyal.remove('recommend_product');
    sessionItemRoyal.remove('orderSource');
    sessionItemRoyal.remove('appointment-no');
    sessionItemRoyal.remove('isChangeAppoint');
    sessionItemRoyal.remove('oldAppointNo');
  }

  get isInputPointDisabled() {
    return (
      (this.props.checkoutStore.selectDiscountWay == USEPOINT &&
        !this.props.checkoutStore.inputPoint) ||
      this.props.checkoutStore.inputPointErr
    ); //使用积分为空或者输入的积分不满足条件->按钮都disabled
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

  //是否跳过支付
  get isSkipPaymentPanel() {
    return (
      this.tradePrice === 0 &&
      !(
        window.__.env.REACT_APP_COUNTRY === 'us' &&
        this.isCurrentBuyWaySubscription
      ) &&
      !(window.__.env.REACT_APP_COUNTRY === 'jp')
    );
  }

  get paymentMethodPanelStatus() {
    return this.props.paymentStore.paymentMethodPanelStatus;
  }

  get defaultCardDataFromAddr() {
    return this.props.paymentStore.defaultCardDataFromAddr;
  }

  get isPayUPaymentTypeVal() {
    const {
      paymentStore: { curPayWayInfo }
    } = this.props;
    return ['payu', 'payu_ru', 'payu_tu'].includes(curPayWayInfo?.code);
  }

  // 更新delivery address保存次数
  updateSaveAddressNumber = async (number) => {
    this.setState({
      saveAddressNumber: number
    });
  };

  // 当前是否为订阅购买
  get isCurrentBuyWaySubscription() {
    const { tid } = this.state;
    return tid
      ? !!this.state.orderDetails?.subscriptionResponseVO
      : this.state.subForm?.buyWay === 'frequency';
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
      if (this.isSkipPaymentPanel) {
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
    if (this.isSkipPaymentPanel && !tid) {
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
    const {
      paymentStore: { curPayWayInfo }
    } = this.props;
    let cyberMd5Cvv;
    if (data?.cardCvv) {
      if (curPayWayInfo?.code === 'pc_web') {
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
      let res = await getPaymentMethod({}, true);
      let cardList = res.context;
      const paypalCardIndex = cardList.findIndex(
        (item) => item.paymentItem?.toLowerCase() === 'adyen_paypal'
      );
      if (paypalCardIndex > -1) {
        // if(cardList[paypalCardIndex].isDefault === 1){
        //    this.handlePaymentTypeClick('adyenPaypal');
        // }
        this.setState({
          paypalAccount: cardList[paypalCardIndex].email,
          paypalCardId: cardList[paypalCardIndex].id
        });
        cardList = cardList.filter(
          (item) => item.paymentItem?.toLowerCase() !== 'adyen_paypal'
        );
      }
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
      const { tid, orderDetails } = this.state;
      const {
        paymentStore: { setPayWayNameArr }
      } = this.props;
      // 这里要根据stoken那里判断
      // fgs 下的单 isOfflinePayment 为false，felin 下的单为true
      const isFelin =
        sessionItemRoyal.get('rc-userGroup') == 'felinStore' ? true : false;
      const payWay = await getWays({ isOfflinePayment: isFelin });
      let payWayNameArr = [];
      if (payWay.context) {
        // 筛选条件: 1.开关开启 2.订阅购买时, 排除不支持订阅的支付方式 3.cod时, 是否超过限制价格
        payWayNameArr = (payWay.context.payPspItemVOList || [])
          .filter(
            (e) =>
              e &&
              e.isOpen &&
              e.isDisplay &&
              (!this.isCurrentBuyWaySubscription || e.supportSubscription) &&
              (!e.maxAmount || this.tradePrice <= e.maxAmount)
          )
          .filter((e) => {
            let ret = true;
            if (
              window.__.env.REACT_APP_COUNTRY === 'ru' &&
              sessionItemRoyal.get('rc-iframe-from-storepotal')
            ) {
              ret = ret && e.code === 'cod';
            }
            return ret;
          })
          .map((item) => {
            return { ...item, code: item.code.toLowerCase() };
          });
        // .filter(
        //   (e) =>
        //     !tid ||
        //     (orderDetails?.paymentItem &&
        //       e.code === orderDetails?.paymentItem)
        // );
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

    const tmpVal = val || this.state.payWayNameArr[0]?.code || '';
    if (chooseRadioType() === 'box' && !this.isSkipPaymentPanel) return; //box的方式不默认第一种支付方式,0元订单还是默认第一种credit card支付方式
    serCurPayWayVal(tmpVal);
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
    const {
      paymentStore: { curPayWayInfo }
    } = this.props;
    return (
      this.state.payWayNameArr.filter((p) => p.code === curPayWayInfo?.code)[0]
        ?.payPspItemCardTypeVOList || []
    );
  }
  //计算ServiceFeeAndLoyaltyPoints
  confirmCalculateServiceFeeAndLoyaltyPoints = (loyaltyPoints = 0) => {
    const {
      paymentStore: { curPayWayInfo }
    } = this.props;
    this.props.checkoutStore.calculateServiceFeeAndLoyaltyPoints({
      loyaltyPoints,
      subscriptionFlag:
        this.state.subForm?.buyWay === 'frequency' ? true : false,
      ownerId: this.props.loginStore?.userInfo?.customerId || '',
      paymentCode: curPayWayInfo?.code
    });
    this.onCardTypeValChange();
  };

  onPaymentTypeValChange() {
    const supportPaymentMethods = this.setSupportPaymentMethods();
    this.setState(
      { cardTypeVal: supportPaymentMethods[0]?.cardType || '' },
      () => {
        if (COUNTRY == 'jp') {
          this.confirmCalculateServiceFeeAndLoyaltyPoints();
        }
      }
    );
  }

  onCardTypeValChange() {
    const { paymentStore } = this.props;
    paymentStore.setCurrentCardTypeInfo(
      paymentStore?.supportPaymentMethods?.filter(
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

  async getDeatalData() {
    const { code, context } = await getAppointByApptNo({
      apptNo: this.state.appointNo
    });
    if (code === 'K-000000') {
      if (
        !context.consumerFirstName ||
        !context.consumerEmail ||
        !context.consumerLastName ||
        !context.consumerName ||
        !context.consumerPhone
      ) {
        this.setState({
          visibleUpdate: true
        });
      }
    }
  }

  handleUpdate = async (params) => {
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
      const result = await getAppointmentInfo(
        this.state.appointNo,
        this.isLogin
      );
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
  initCommonPay = ({ email = '' } = {}) => {
    this.doGetAdyenPayParam();
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
  async getAdyenPayParam() {
    try {
      const {
        paymentStore: { curPayWayInfo }
      } = this.props;
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
        payuoxxo: () => {
          parameters = Object.assign({}, commonParameter, {
            payPspItemEnum: 'PAYU_OXXO',
            country: 'MEX',
            email
          });
        },
        payu: async () => {
          parameters = await this.hanldePAYUCheckoutParams({
            commonParameter,
            parameters,
            payPspItemEnum: 'PAYU_CREDIT_CARD',
            country: 'MEX'
          });
        },
        payu_ru: async () => {
          parameters = await this.hanldePAYUCheckoutParams({
            commonParameter,
            parameters: parameters,
            payPspItemEnum: isLogin ? 'PAYU_RUSSIA_AUTOSHIP2' : 'PAYU_RUSSIA',
            country: 'RUS'
          });
        },
        payu_tu: async () => {
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
        cod_japan: () => {
          parameters = Object.assign(commonParameter, {
            payPspItemEnum: 'JAPAN_COD',
            loyaltyPoints: Number(this.props.checkoutStore.inputPoint)
          });
        },
        adyen_credit_card: () => {
          const { adyenPayParam } = this.state;
          parameters = Object.assign(commonParameter, {
            browserInfo: this.props.paymentStore.browserInfo,
            encryptedSecurityCode: adyenPayParam?.encryptedSecurityCode || '',
            loyaltyPoints: Number(this.props.checkoutStore.inputPoint),
            payPspItemEnum:
              sessionItemRoyal.get('goodWillFlag') === 'GOOD_WILL' ||
              this.isSkipPaymentPanel
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
        adyen_klarna_pay_later: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'klarna',
            payPspItemEnum: 'ADYEN_KLARNA_PAY_LATER',
            email
          });
        },
        adyen_klarna_pay_now: () => {
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
        adyen_oxxo: () => {
          parameters = Object.assign(commonParameter, {
            payPspItemEnum: 'ADYEN_OXXO',
            email
          });
        },
        adyen_paypal: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'paypal',
            payPspItemEnum: 'ADYEN_PAYPAL',
            paymentMethodId: this.state.paypalCardId
          });
        },
        // adyen_point_of_sale ==> pos
        adyen_point_of_sale: () => {
          parameters = Object.assign(commonParameter, {
            payPspItemEnum: 'ADYEN_POS',
            wasFelinStore: true
          });
        },
        cash: () => {
          parameters = Object.assign(commonParameter, {
            payPspItemEnum: 'CASH',
            wasFelinStore: true
          });
        },
        adyen_swish: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'swish',
            payPspItemEnum: 'ADYEN_SWISH'
            //adyenSwishPhone: swishPhone
          });
        },
        pc_web: () => {
          const {
            cyberPayParam: { id, cardCvv, accessToken }
          } = this.state;
          parameters = Object.assign({}, commonParameter, {
            payPspItemEnum: 'CYBER',
            paymentMethodId: id,
            securityCode: cardCvv,
            accessToken: accessToken
          });
        },
        adyen_convenience_store: () => {
          const { convenienceStore } = this.state;
          parameters = Object.assign(commonParameter, {
            payPspItemEnum: 'ADYEN_CONVENIENCE_STORE',
            adyenType: 'convenience store',
            adyenConvenienceStorePayType:
              convenienceStore === 'Seven-Eleven'
                ? 'econtext_seven_eleven'
                : 'econtext_stores',
            adyenConvenienceStoreName: convenienceStore,
            loyaltyPoints: Number(this.props.checkoutStore.inputPoint)
          });
        }
      };
      await actions[curPayWayInfo?.code.toLowerCase()]();

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
  async doGetAdyenPayParam() {
    try {
      let parameters = await this.getAdyenPayParam();
      await this.allAdyenPayment(parameters);
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
  async allAdyenPayment(parameters) {
    try {
      let action;
      const actions = () => {
        const rePayFun = () => {
          action = rePay;
        }; // 存在订单号
        const customerCommitAndPayFun = () => {
          action = customerCommitAndPay;
        }; //会员下单
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
              buyWay: /.+/,
              isFelin: /^false$/i
            },
            customerCommitAndPayFun
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
      const {
        paymentStore: { petList, petSelectedIds, curPayWayInfo },
        checkoutStore: { isShowBindPet }
      } = this.props;

      sessionItemRoyal.set('rc-paywith-login', this.isLogin);
      this.startLoading();
      if (!this.isLogin) {
        await this.visitorLoginAndAddToCart();
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

      switch (curPayWayInfo?.code) {
        case 'payuoxxo':
          const oxxoContent = res.context;
          oxxoPayUrl =
            oxxoContent?.args?.additionalDetails?.data[0]?.href || '';
          subOrderNumberList = tidList.length
            ? tidList
            : oxxoContent && oxxoContent.tidList;
          gotoConfirmationPage = true;
          break;
        case 'payu_ru':
        case 'payu_tu':
        case 'payu':
        case 'cod':
        case 'cod_japan':
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
          sessionItemRoyal.set('rc-redirectResult', res.context.paymentData);
          sessionItemRoyal.set('rc-businessId', res.context.tid);

          if (res.context.qrCodeData) {
            this.setState({ swishAppRedirectUrl: res.context.redirectUrl });
            const getData = async () => {
              if (!this.state.swishQrcodeModal) return;
              return adyenPaymentsDetails({
                redirectResult: res.context.paymentData,
                businessId: res.context.tid
              })
                .then(async (response) => {
                  switch (response.context.status) {
                    case 'PROCESSING':
                      // setTimeout(async () => {
                      //   return await getData();
                      // }, 2000);
                      await sleep(2000);
                      return await getData();
                    case 'SUCCEED':
                      gotoConfirmationPage = true;
                      // debugger
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
            };

            //模态框
            this.setState(
              {
                swishQrcode: res.context.qrCodeData,
                swishQrcodeModal: true
              },
              () => {
                sessionItemRoyal.set('rc-swishQrcode', this.state.swishQrcode);
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
              },
              (timer) => {
                if (!this.state.swishQrcodeModal) {
                  clearInterval(timer);
                }
              }
            );

            if (isMobile) {
              window.location = res.context.redirectUrl;
            }
            await getData();
          }

          break;
        case 'adyen_oxxo':
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
        case 'adyen_credit_card':
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
        case 'adyen_klarna_pay_later':
        case 'adyen_klarna_pay_now':
        case 'directEbanking':
        case 'adyen_paypal':
          subOrderNumberList = res.context.tidList;
          this.removeLocalCartData();
          // 给klana支付跳转用
          if (res.context.tid) {
            sessionItemRoyal.set('orderNumber', res.context.tid);
          }
          if (res.context.redirectUrl && !this.state.paypalAccount) {
            //已经绑定过paypal账号的不跳转链接，直接进入confirmation page
            window.location.href = res.context.redirectUrl;
          }
          if (this.state.paypalAccount) {
            subOrderNumberList = tidList.length
              ? tidList
              : res.context && res.context.tidList;
            subNumber = (res.context && res.context.subscribeId) || '';
            gotoConfirmationPage = true;
          }
          break;
        // adyen_point_of_sale ==> pos
        case 'adyen_point_of_sale':
          const payState =
            res.context?.trade?.tradeState?.payState == 'PAID' ? true : false;
          // if(res.code == 'K-000000'){
          //   const tid = res.context.tid;
          //   cancelPosOrder(tid)
          //   .then((res) => {
          //     if (res.code == 'K-000000') {
          //     }
          //     console.log('cancelPosOrderres', res);
          //   })
          //   .catch((err) => {
          //     console.log('cancelPosOrdererr', err);
          //   });
          //   return;
          // }
          // 支付成功
          if (res.code == 'K-000000' && payState) {
            const isGuest = sessionItemRoyal.get('rc-guestId') ? true : false;
            if (isGuest) {
              valetGuestOrderPaymentResponse({
                guest_id: sessionItemRoyal.get('rc-guestId'),
                parameter: res.context
              })
                .then((res) => {
                  console.log('res', res);
                })
                .catch((err) => {
                  console.log('err', err);
                });
            }
            subOrderNumberList = tidList.length
              ? tidList
              : res.context && res.context.tidList;
            subNumber = (res.context && res.context.subscribeId) || '';
            gotoConfirmationPage = true;
          } else {
            let i = 0;
            const tid = res.context.tid;
            // 根据订单号发送订单状态查询请求
            const queryPos = async () => {
              i++;
              return queryPosOrder(tid)
                .then(async (resp) => {
                  if (resp.code == 'K-000000') {
                    const isGuest = sessionItemRoyal.get('rc-guestId')
                      ? true
                      : false;
                    if (isGuest) {
                      valetGuestOrderPaymentResponse({
                        guest_id: sessionItemRoyal.get('rc-guestId'),
                        parameter: res.context
                      })
                        .then((res) => {
                          console.log('res', res);
                        })
                        .catch((err) => {
                          console.log('err', err);
                        });
                    }
                    subOrderNumberList = tidList.length
                      ? tidList
                      : res.context && res.context.tidList;
                    subNumber = (res.context && res.context.subscribeId) || '';
                    gotoConfirmationPage = true;
                  } else {
                    console.log('queryPosOrder', resp);
                  }
                })
                .catch(async (err) => {
                  // K-000001 还在支付中
                  // K-000002 支付失败
                  console.log('queryPosOrdererr', err);
                  if (i < 10) {
                    await sleep(3000);
                    return await queryPos();
                  } else {
                    this.showErrorMsg(err.message);
                    // 超过30秒就取消订单
                    cancelPosOrder(tid)
                      .then((res) => {
                        if (res.code == 'K-000000') {
                        }
                        console.log('cancelPosOrderres', res);
                      })
                      .catch((err) => {
                        console.log('cancelPosOrdererr', err);
                      });
                  }
                });
            };
            await queryPos();
          }
          break;
        case 'cash':
          if (res.code == 'K-000000') {
            const isGuest = sessionItemRoyal.get('rc-guestId') ? true : false;
            if (isGuest) {
              valetGuestOrderPaymentResponse({
                guest_id: sessionItemRoyal.get('rc-guestId'),
                parameter: res.context
              })
                .then((res) => {
                  console.log('res', res);
                })
                .catch((err) => {
                  console.log('err', err);
                });
            }
          }
          subOrderNumberList = tidList.length
            ? tidList
            : res.context && res.context.tidList;
          subNumber = (res.context && res.context.subscribeId) || '';
          gotoConfirmationPage = true;
          break;
        case 'pc_web':
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
        case 'adyen_convenience_store':
          subOrderNumberList = tidList.length
            ? tidList
            : res.context && res.context.tidList;
          subNumber = (res.context && res.context.subscribeId) || '';
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
      console.log({ gotoConfirmationPage });
      if (gotoConfirmationPage) {
        // 清除掉计算运费相关参数
        localItemRoyal.remove('rc-calculation-param');
        sessionItemRoyal.remove('rc-clicked-surveyId');
        sessionItemRoyal.remove('goodWillFlag');
        sessionItemRoyal.remove('guestInfo');
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
      let submitParam = bindSubmitParam(this.state.listData);

      //针对俄罗斯地址最后再一次校验
      let visitorRegisterParam = {
        ...param,
        ...submitParam
      };
      if (
        window.__.env.REACT_APP_COUNTRY === 'ru' &&
        !visitorRegisterParam.city &&
        !visitorRegisterParam.province
      ) {
        throw new Error('Введите адрес');
      }
      //

      let postVisitorRegisterAndLoginRes = await postVisitorRegisterAndLogin({
        ...param,
        ...submitParam
      });

      //游客绑定consent 一定要在游客注册之后 start
      //let submitParam = bindSubmitParam(this.state.listData);
      // userBindConsent({
      //   ...submitParam,
      //   ...{ oktaToken: '' },
      //   customerId:
      //     (postVisitorRegisterAndLoginRes.context &&
      //       postVisitorRegisterAndLoginRes.context.customerId) ||
      //     ''
      // });
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
    const { clinicStore, paymentStore, checkoutStore, loginStore } = this.props;
    const { addCardDirectToPayFlag } = paymentStore;
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
        breedOrShelter: breedOrShelterId.startsWith('BRD')
          ? 'Breeder'
          : breedOrShelterId.startsWith('BRM')
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
        appointmentDate: recommend_data[0]?.apptTime, //预约时间
        isApptChange: Boolean(sessionItemRoyal.get('isChangeAppoint')),
        oldAppointNo: sessionItemRoyal.get('oldAppointNo')
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
        email:
          creditCardInfo?.email ||
          deliveryAddress?.email ||
          this.userInfo?.email ||
          guestEmail,
        line1: deliveryAddress?.address1,
        line2: deliveryAddress?.address2,
        //审核者信息放订单行
        clinicsId: clinicStore.selectClinicId,
        clinicsName: clinicStore.selectClinicName,
        //下单增加recommendationCode(clinicsCode)字段
        clinicsCode: clinicStore.selectClinicCode,
        storeId: window.__.env.REACT_APP_STOREID,
        tradeItems: [], // order products
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
        paymentMethodIdFlag: addCardDirectToPayFlag
      },
      appointParam
    );
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
      param.contractNumber = deliveryAddress?.calculation?.contractNumber;
      param.courier = deliveryAddress?.calculation?.courier;
      param.courierCode = deliveryAddress?.calculation?.courierCode;
    }
    if (deliveryAddress?.receiveType == 'PICK_UP') {
      param.deliverWay = 2;
      param.contractNumber = deliveryAddress?.pickup?.contractNumber;
      param.courier = deliveryAddress?.pickup?.courier;
      param.courierCode = deliveryAddress?.pickup?.courierCode;
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
        const recoProductParam = handleRecoProductParamByItem({
          ele,
          ...this.props
        });
        return Object.assign(recoProductParam, {
          num: ele.buyCount,
          skuId: ele.goodsInfoId,
          goodsInfoFlag:
            this.isCurrentBuyWaySubscription &&
            !sessionItemRoyal.get('appointment-no')
              ? ele.goodsInfoFlag
              : 0
        });
      });
    } else if (this.isLogin) {
      param.tradeItems = loginCartData.map((ele) => {
        const recoProductParam = handleRecoProductParamByItem({
          ele,
          ...this.props
        });
        return Object.assign(recoProductParam, {
          num: ele.buyCount,
          skuId: ele.goodsInfoId,
          goodsInfoFlag: ele.goodsInfoFlag
        });
      });
    } else {
      param.tradeItems = cartData.map((ele) => {
        const recoProductParam = handleRecoProductParamByItem({
          ele,
          ...this.props
        });
        return Object.assign(recoProductParam, {
          num: ele.quantity,
          skuId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
          goodsInfoFlag: ele.goodsInfoFlag
        });
      });
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
    serCurPayWayVal(e.target.value);
    this.setState({ email: '' }, () => {
      this.onPaymentTypeValChange();
    });
  };
  handlePaymentTypeClick = (paymentTypeCode) => {
    const {
      paymentStore: { serCurPayWayVal }
    } = this.props;
    // code 转换小写
    serCurPayWayVal(paymentTypeCode);
    this.setState({ email: '' }, () => {
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

  paymentUpdateDeliveryOrPickup = (num) => {
    this.setState({
      deliveryOrPickUp: num
    });
  };

  /**
   * 渲染address panel
   */
  renderAddressPanel = () => {
    const { deliveryAddress, guestEmail } = this.state;
    return this.isLogin ? (
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
        onSearchSelectionFocus={GAonSearchSelectionFocus}
        onSearchSelectionChange={GAonSearchSelectionChange}
        onSearchSelectionError={GAonSearchSelectionError}
        // onSearchSelectionChange={() =>
        //   window.__.env.REACT_APP_COUNTRY === 'ru' &&
        //   window?.dataLayer?.push({
        //     event: 'suggestedAdressInteraction',
        //     suggestedAdress: {
        //       action: 'suggestionClick'
        //     }
        //   })
        // }
        // onSearchSelectionFocus={() =>
        //   window.__.env.REACT_APP_COUNTRY === 'ru' &&
        //   window?.dataLayer?.push({
        //     event: 'suggestedAdressInteraction',
        //     suggestedAdress: {
        //       action: 'fieldClick'
        //     }
        //   })
        // }
      />
    ) : (
      <VisitorAddress
        {...this.props}
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
        onSearchSelectionFocus={GAonSearchSelectionFocus}
        onSearchSelectionChange={GAonSearchSelectionChange}
        onSearchSelectionError={GAonSearchSelectionError}
        // onSearchSelectionChange={() =>
        //   window.__.env.REACT_APP_COUNTRY === 'ru' &&
        //   window?.dataLayer?.push({
        //     event: 'suggestedAdressInteraction',
        //     suggestedAdress: {
        //       action: 'suggestionClick'
        //     }
        //   })
        // }
        // onSearchSelectionFocus={() =>
        //   window.__.env.REACT_APP_COUNTRY === 'ru' &&
        //   window?.dataLayer?.push({
        //     event: 'suggestedAdressInteraction',
        //     suggestedAdress: {
        //       action: 'fieldClick'
        //     }
        //   })
        // }
      />
    );
  };

  renderBillingJSX = ({ type }) => {
    const { intl } = this.props;
    const {
      billingAddressErrorMsg,
      billingChecked,
      billingAddress,
      tid,
      guestEmail,
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
        <ErrorMessage msg={billingAddressErrorMsg} />

        {/* 勾选， deliveryAddress = billingAddress */}
        {billingChecked ? (
          <div className="ml-custom mr-custom">
            <AddressPreview form={this.state.billingAddress} />
          </div>
        ) : null}

        {/* 不勾选， deliveryAddress != billingAddress */}
        {!billingChecked && (
          <>
            {this.isLogin ? (
              <AddressList
                {...this.props}
                ref={this.loginBillingAddrRef}
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
                onSearchSelectionFocus={GAonSearchSelectionFocus}
                onSearchSelectionChange={GAonSearchSelectionChange}
                onSearchSelectionError={GAonSearchSelectionError}
              />
            ) : (
              <VisitorAddress
                {...this.props}
                ref={this.unLoginBillingAddrRef}
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
                onSearchSelectionFocus={GAonSearchSelectionFocus}
                onSearchSelectionChange={GAonSearchSelectionChange}
                onSearchSelectionError={GAonSearchSelectionError}
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
    this.setState({
      billingAddressAddOrEdit: flag
    });
  };
  // 点击confirm 1
  clickConfirmPaymentPanel = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

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
      paymentStore: { currentCardTypeInfo, curPayWayInfo }
    } = this.props;
    const {
      adyenPayParam,
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

    if (curPayWayInfo?.code === 'pc_web') {
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
          await this.loginBillingAddrRef.current.handleSave();
        }
        // 2 save card form, when add a new card
        if (curPayWayInfo?.code === 'adyen_credit_card' && !adyenPayParam) {
          await handleClickSaveAdyenForm(this);
        }

        await handleClickSavePayUForm(this);

        if (curPayWayInfo?.code === 'pc_web') {
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

        if (curPayWayInfo?.code === 'pc_web') {
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
      // 未勾选，显示地址验证
      this.setState({
        paymentValidationLoading: true,
        validationModalVisible: true
      });
    } else {
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
    // 清空 VisitorAddress 参数 && !billingChecked
    if (
      !isLogin &&
      this.unLoginBillingAddrRef &&
      this.unLoginBillingAddrRef.current
    ) {
      this.unLoginBillingAddrRef.current.resetVisitorAddressState();
    }
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
        // 调用保存 billingAddress 方法
        if (
          !billingChecked &&
          isLogin &&
          this.loginBillingAddrRef &&
          this.loginBillingAddrRef.current
        ) {
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
        setStsToEdit,
        curPayWayInfo
      }
    } = this.props;

    setAddCardDirectToPayFlag(false);
    setRreshCardList(true);

    const { billingChecked } = this.state;
    if (curPayWayInfo?.code === 'pc_web' && this.isLogin) {
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
  renderPayTab = () => {
    const {
      paymentStore: { curPayWayInfo }
    } = this.props;
    const {
      subForm,
      payWayErr,
      billingChecked,
      email,
      validSts,
      saveBillingLoading,
      payWayNameArr,
      cyberPaymentForm,
      tid
    } = this.state;

    // 未勾选same as billing时，校验billing addr
    const validForBilling = !billingChecked && !validSts.billingAddr;

    const payConfirmBtn = ({ disabled, loading = false } = {}) => {
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
      handlePaymentTypeChange
    }) => {
      const {
        paymentStore: { curPayWayInfo }
      } = this.props;
      return (
        <div className={`ml-custom mr-custom`}>
          {payWayNameArr.map((item, i) => (
            <div className={`rc-input rc-input--inline`} key={i}>
              <input
                className="rc-input__radio"
                id={`payment-info-${item.id}`}
                value={item.code}
                type="radio"
                name="payment-info"
                onChange={handlePaymentTypeChange}
                checked={curPayWayInfo?.code === item.code}
                autoComplete="new-password"
              />
              <label
                className="rc-input__label--inline"
                htmlFor={`payment-info-${item.id}`}
              >
                <FormattedMessage id={item.code} />
              </label>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className={`pb-3`}>
        {chooseRadioType() === 'circle' && payWayNameArr.length > 1 && (
          <InputCirclePaymethords
            payWayNameArr={payWayNameArr}
            handlePaymentTypeChange={this.handlePaymentTypeChange}
          />
        )}

        <div className="checkout--padding ml-custom mr-custom pt-3 pb-3 border rounded">
          {chooseRadioType() === 'box' && (
            <>
              {payWayNameArr.map((item, index) => (
                <>
                  {/* 选择支付方式横条 */}
                  <div
                    className={cn(
                      'flex justify-between items-center text-grey-400 w-full border rounded-md pl-5 pr-2 py-2 my-4 cursor-pointer',
                      curPayWayInfo?.code === item.code
                        ? 'border-green'
                        : 'border-gray-300'
                    )}
                    key={index}
                    onClick={() => this.handlePaymentTypeClick(item.code)}
                  >
                    <div className="text-sm md:text-lg">
                      <FormattedMessage id={item.code} />
                    </div>
                    {/* adyenCard 支持卡的类型logo */}
                    {item?.payPspItemCardTypeVOList.length > 0 && (
                      <SupportPaymentMethodsPic
                        supportPaymentMethods={item.payPspItemCardTypeVOList}
                      />
                    )}
                  </div>
                  {/* 选择了某种支付方式后，当前支付方式的详情页 */}
                  {item.code === 'adyen_credit_card' &&
                    curPayWayInfo?.code === 'adyen_credit_card' && (
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
                          supportPaymentMethodsVisibleAtForm={false}
                          supportPoint={isSupportPoint(this.isLogin)}
                        />
                      </>
                    )}
                  {item.code === 'adyen_paypal' &&
                    curPayWayInfo?.code === 'adyen_paypal' && (
                      <>
                        <Paypal
                          billingJSX={this.renderBillingJSX({
                            type: 'adyen_paypal'
                          })}
                          isLogin={this.isLogin}
                          isCurrentBuyWaySubscription={
                            this.isCurrentBuyWaySubscription
                          }
                          paypalAccount={this.state.paypalAccount}
                        />
                      </>
                    )}
                  {/* adyen_point_of_sale ===> pos */}
                  {item.code === 'adyen_point_of_sale' &&
                    curPayWayInfo?.code === 'adyen_point_of_sale' && (
                      <>
                        <Pos
                          billingJSX={this.renderBillingJSX({
                            type: 'adyen_point_of_sale'
                          })}
                        />
                      </>
                    )}
                  {item.code === 'cash' && curPayWayInfo?.code === 'cash' && (
                    <>
                      <Cash
                        billingJSX={this.renderBillingJSX({
                          type: 'cash'
                        })}
                      />
                    </>
                  )}
                  {item.code === 'cod_japan' &&
                    curPayWayInfo?.code === 'cod_japan' &&
                    isSupportPoint(this.isLogin) && <Point />}
                  {item.code === 'adyen_convenience_store' &&
                    curPayWayInfo?.code === 'adyen_convenience_store' && (
                      <>
                        <ConvenienceStore
                          convenienceStoreChange={(value) => {
                            this.setState({ convenienceStore: value });
                          }}
                          supportPoint={isSupportPoint(this.isLogin)}
                        />
                      </>
                    )}
                  {item.code === 'adyen_swish' &&
                    curPayWayInfo?.code === 'adyen_swish' && (
                      <>
                        <Swish
                          //updateSwishPhone={this.updateSwishPhone}
                          billingJSX={this.renderBillingJSX({
                            type: 'adyen_swish'
                          })}
                        />
                      </>
                    )}
                </>
              ))}
            </>
          )}
          {chooseRadioType() === 'box' &&
            curPayWayInfo?.code === 'adyen_credit_card' &&
            payConfirmBtn({
              disabled:
                !validSts.adyenCard ||
                validForBilling ||
                (COUNTRY == 'jp' && this.isInputPointDisabled),
              loading: saveBillingLoading,
              aaa: validSts,
              bbb: validForBilling
            })}
          {curPayWayInfo?.code === 'adyen_paypal' &&
            payConfirmBtn({
              disabled: validForBilling
            })}
          {curPayWayInfo?.code === 'adyen_point_of_sale' &&
            payConfirmBtn({
              disabled: validForBilling
            })}
          {curPayWayInfo?.code === 'cash' &&
            payConfirmBtn({
              disabled: validForBilling
            })}
          {curPayWayInfo?.code === 'adyen_swish' &&
            payConfirmBtn({
              disabled: validForBilling
            })}
          {curPayWayInfo?.code === 'adyen_convenience_store' &&
            payConfirmBtn({
              disabled:
                !this.state.convenienceStore || this.isInputPointDisabled
            })}
          {curPayWayInfo?.code === 'cod_japan' &&
            payConfirmBtn({
              disabled: this.isInputPointDisabled
            })}
          {/* ***********************支付选项卡的内容start******************************* */}
          {payWayErr ? (
            payWayErr
          ) : (
            <>
              {/* cod 货到付款 */}
              {curPayWayInfo?.code === 'cod' && (
                <>
                  <Cod
                    type={'cod'}
                    billingJSX={this.renderBillingJSX({ type: 'cod' })}
                    updateFormValidStatus={this.updateValidStatus.bind(this, {
                      key: 'cod'
                    })}
                    supportPoint={true}
                  />
                  {payConfirmBtn({
                    disabled: !validSts.cod || validForBilling
                  })}
                </>
              )}
              {/* oxxo */}
              {curPayWayInfo?.code === 'payuoxxo' ? (
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
              {curPayWayInfo?.code === 'adyen_oxxo' ? (
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
              {chooseRadioType() === 'circle' &&
                curPayWayInfo?.code === 'adyen_credit_card' && (
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
              {curPayWayInfo?.code === 'adyen_klarna_pay_later' && (
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
              {curPayWayInfo?.code === 'adyen_klarna_pay_now' && (
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
              {curPayWayInfo?.code === 'directEbanking' && (
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
              {curPayWayInfo?.code === 'pc_web' && (
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
    this.setState({ adyenPayParam: data });
  };
  updateEmail = (email) => {
    this.setState({ email });
  };
  updateSwishPhone = (swishPhone) => {
    this.setState({ swishPhone });
  };
  // 1、点击支付
  clickPay = () => {
    const { intl } = this.props;
    //0元订单中含有订阅商品时不能下单（us美国订阅可以）
    if (
      this.isSkipPaymentPanel &&
      window.__.env.REACT_APP_COUNTRY !== 'us' &&
      this.isCurrentBuyWaySubscription &&
      !sessionItemRoyal.get('appointment-no')
    ) {
      const errMsg = intl.messages['checkout.zeroOrder.butSubscription'];
      this.showErrorMsg(errMsg);
      return;
    }

    if (this.isLogin) {
      this.userBindConsentFun();
    }
    this.initCommonPay();
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
      mobileCartVisibleKey,
      guestEmail,
      deliveryAddress,
      paymentValidationLoading,
      validationModalVisible,
      billingAddress,
      selectValidationOption,
      pet
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
      pet
    };

    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
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
            <div className="rc-layout-container rc-three-column rc-max-width--xl mt-3 md:-mt-6">
              <div className="rc-column rc-double-width shipping__address">
                {/* 错误提示，没有errorMsg时，或errorMsg===This Error No Display时不显示  */}
                <ErrorMessage
                  msg={
                    errorMsg && errorMsg !== 'This Error No Display'
                      ? errorMsg
                      : ''
                  }
                />
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
                <SelectPet
                  recommendData={this.state.recommend_data}
                  updateRecommendData={(data) => {
                    this.setState({ recommend_data: data });
                  }}
                  isRepay={tid}
                />

                <PanelContainer
                  panelStatus={paymentMethodPanelStatus}
                  containerConf={{
                    className: cn('px-0', {
                      hidden: this.isSkipPaymentPanel,
                      'pb-0': !paymentMethodPanelStatus.isPrepare
                    }),
                    id: 'J_checkout_panel_paymentMethod'
                  }}
                  titleConf={{
                    className: 'mx-5',
                    icon: {
                      defaultIcon: (
                        <em
                          className={`rc-icon rc-payment--sm rc-iconography inlineblock origin-left paymentIconTransform`}
                        />
                      ),
                      highlighIcon: (
                        <em
                          className={`rc-icon rc-payment--sm rc-brand1 inlineblock origin-left paymentIconTransform`}
                        />
                      )
                    },
                    text: {
                      title: (
                        <FormattedMessage id="payment.paymentInformation" />
                      )
                    },
                    onEdit: this.handleClickPaymentPanelEdit
                  }}
                  previewJSX={<PaymentPanelInfoPreview {...this.state} />}
                >
                  {this.renderPayTab()}
                </PanelContainer>

                <Confirmation
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
              className={cn(
                `order-summary-title align-items-center justify-content-between text-center`,
                mobileCartVisibleKey === 'less' ? 'd-flex' : 'hidden'
              )}
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
              className={cn(mobileCartVisibleKey === 'more' ? '' : 'hidden')}
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
              <div className="pt-1 pb-6 text-black text-base">
                <FormattedMessage id="payment.scanQrcode" />
              </div>
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
                <FormattedMessage
                  id="payment.countdowning"
                  values={{ val: this.state.countDown }}
                />
              </div>
              <div className="w-64 md:w-96 text-center py-6 text-gray-600">
                <FormattedMessage id="payment.countdown" />
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
