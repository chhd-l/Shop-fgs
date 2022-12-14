import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import find from 'lodash/find';
import { inject, observer } from 'mobx-react';
import { toJS, reaction } from 'mobx';
import Cookies from 'cookies-js';
import md5 from 'js-md5';
import {
  Header,
  Footer,
  Loading,
  GoogleTagManager,
  PayProductInfo as RePayProductInfo,
  ValidationAddressModal
} from '@/components';
import PayProductInfo from './PayProductInfo';
import Faq from './Faq';
import LazyLoad from 'react-lazyload';
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
  isMobile,
  payCountDown,
  formatMoney,
  generatePayUScript,
  validData,
  bindSubmitParam,
  getAppointmentInfo,
  getCurPickUpInfo
} from '@/utils/utils';
import { seoHoc } from '@/framework/common';
import { EMAIL_REGEXP } from '@/utils/constant';
import { userBindConsent } from '@/api/consent';
import {
  postVisitorRegisterAndLogin,
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
  cancelPosOrder,
  rePayPos
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
import { AddItemsMember as AddCartItemsMember } from '@/framework/cart';
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
import { Canonical, Button, Modal } from '@/components/Common';
import {
  USEPOINT,
  NOTUSEPOINT
} from '@/views/Payment/PaymentMethod/paymentMethodsConstant';
import Pos from './PaymentMethod/Pos';
import Cash from './PaymentMethod/Cash';
import Moto from './PaymentMethod/Moto';
import Ideal from './PaymentMethod/Ideal/indes';
import { openPromotionBox } from '@/views/Payment/modules/utils';

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
  <div>
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
              className={`logo-payment-card mr-1  max-h-8 ${
                el.cardType.toLowerCase() === 'moto'
                  ? 'w-14'
                  : el.cardType.toLowerCase() === 'paypal'
                  ? 'w-7 md:w-20'
                  : 'w-7 md:w-10'
              }`}
              src={el.imgUrl}
              alt={el.cardType}
            />
          )}
        </LazyLoad>
      ))}
    </span>
  </div>
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
      createSwishQrcodeTime: '', //??????????????????????????????
      countDownStartTime: 15 * 60, //????????????15?????????
      countDown: '', //?????????
      swishQrcodeError: false,
      swishAppRedirectUrl: '', //swish app???????????????
      visibleUpdate: false,
      authorizationCode: '',
      subscriptionID: '',
      cyberBtnLoading: false,
      cyberCardType: '',
      deliveryOrPickUp: 0,
      saveAddressNumber: 0, // ??????Delivery????????????
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
        DuData: null, // ?????????DuData
        formRule: [], // form??????????????????
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
      initLoading: false,
      payosdata: null,
      selectedCardInfo: null,
      adyenPayParam: null,
      payWayNameArr: [],
      originPayNameArr: [],
      email: '',
      swishPhone: '',
      bank: '',
      orderDetails: null,
      tid: sessionItemRoyal.get('rc-tid'),
      tidList: sessionItemRoyal.get('rc-tidList')
        ? JSON.parse(sessionItemRoyal.get('rc-tidList'))
        : [],
      rePaySubscribeId: sessionItemRoyal.get('rc-rePaySubscribeId'),
      serviceFeeEnabled: sessionItemRoyal.get('rc-serviceFeeEnabled'),
      recommend_data: [],
      isAdd: 0,
      listData: [],
      requiredList: [],
      needPrescriber:
        localItemRoyal.get('checkOutNeedShowPrescriber') === 'true', //isNeed clinic?????????Need prescriber??????????????????prescriber??????
      unLoginBackPets: [],
      guestEmail: '',
      mobileCartVisibleKey: 'less', // less/more
      validSts: { billingAddr: true },
      validForBilling: false,
      saveBillingLoading: false,
      payWayErr: '',
      pet: {},
      //cyber??????
      cyberPaymentForm: {
        cardholderName: '', //Didier Valansot
        cardNumber: '', //4111111111111111
        expirationMonth: '',
        expirationYear: '',
        securityCode: '', //000
        firstName: '',
        lastName: '',
        address1: '',
        address2: '', //?????????
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
      paymentValidationLoading: false, // ????????????loading
      btnLoading: false,
      validationModalVisible: false, // ????????????????????????
      selectValidationOption: 'suggestedAddress', // ????????????
      isShowValidationModal: true, // ????????????????????????
      billingAddressAddOrEdit: false, // billingAddress????????????????????????
      validationAddress: [], // ????????????
      shippingFeeAddress: {
        provinceIdStr: '',
        areaIdStr: '',
        cityIdStr: '',
        settlementIdStr: '',
        postalCode: '',
        address1: ''
      }, // ?????????????????????DuData?????????purchases?????????
      welcomeBoxValue: 'no', //first order welcome box:1????????? 2????????? 3?????????????????????student promotion 50% discount
      paymentPanelHasComplete: false, //??????payment??????????????????????????????0????????????????????????????????????payment??????
      isFromFelin: false, //?????????felin??????
      appointNo: null, //felin???????????????
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
    this.memberAddListRef = React.createRef();
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
  //cyber???????????????-??????
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
  //cyber???????????????-??????
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
    //??????InputCircle??????????????????????????????????????????????????????0
    reaction(
      () => this.props.checkoutStore.selectDiscountWay,
      () => {
        if (this.props.checkoutStore.selectDiscountWay == NOTUSEPOINT) {
          this.confirmCalculateServiceFeeAndLoyaltyPoints();
        }
      }
    );
    //??????????????????input????????????????????????????????????????????????????????????
    reaction(
      () => this.props.checkoutStore.inputPointOk,
      () => {
        if (this.props.checkoutStore.inputPointOk) {
          setTimeout(() => {
            if (
              this.props.checkoutStore.inputPoint <
                this.props.checkoutStore.loyaltyPointsMinimum ||
              this.props.checkoutStore.inputPoint >
                this.props.checkoutStore.loyaltyPointsMaximum
            )
              return;
            this.confirmCalculateServiceFeeAndLoyaltyPoints(
              Number(this.props.checkoutStore.inputPoint)
            );
          }, 1000);
        }
      }
    );
    const {
      history,
      checkoutStore: { resetPriceData, generateGuestUUID },
      configStore: { getSystemFormConfig, paymentAuthority }
    } = this.props;

    // ????????????checkout ??? ????????????
    if (paymentAuthority === 'MEMBER' && !this.isLogin) {
      history.replace('/');
    }
    await getSystemFormConfig();
    if (this.isLogin) {
      this.queryList();
    }

    if (!this.isLogin && !sessionItemRoyal.get('guest-uuid')) {
      generateGuestUUID();
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

      //swish??????????????????????????????????????????????????????
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
                  // ?????????????????????????????????
                  localItemRoyal.remove('rc-calculation-param');
                  sessionItemRoyal.remove('rc-clicked-surveyId');
                  sessionItemRoyal.remove('goodWillFlag');
                  //?????????????????????????????????
                  this.props.clinicStore.removeLinkClinicInfo();
                  this.props.clinicStore.removeLinkClinicRecommendationInfos();

                  // ?????? confirmation
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
    setTimeout(() => {
      this.setState({ initLoading: true });
    }, 3000);
  }

  componentWillUnmount() {
    //?????????
    const {
      paymentStore: { resetPanelStatus, serCurPayWayVal },
      checkoutStore: { setEarnedPoint, setInputPoint }
    } = this.props;
    resetPanelStatus();
    serCurPayWayVal(''); //??????????????????
    setEarnedPoint(0); //?????????????????????
    setInputPoint(''); //?????????????????????
    sessionItemRoyal.remove('rc-tid');
    sessionItemRoyal.remove('rc-tidList');
    sessionItemRoyal.remove('rc-swishQrcode');
    sessionItemRoyal.remove('rc-createSwishQrcodeTime');
    sessionItemRoyal.remove('recommend_product');
    sessionItemRoyal.remove('orderSource');
    sessionItemRoyal.remove('appointment-no');
    sessionItemRoyal.remove('isChangeAppoint');
    sessionItemRoyal.remove('oldAppointNo');
    sessionItemRoyal.remove('serviceFeeEnabled');
  }

  get isInputPointDisabled() {
    return (
      (this.props.checkoutStore.selectDiscountWay == USEPOINT &&
        !this.props.checkoutStore.inputPoint) ||
      (this.props.checkoutStore.selectDiscountWay == USEPOINT &&
        this.props.checkoutStore.inputPointErr)
    ); //??????????????????????????????????????????????????????->?????????disabled
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

  //??????????????????
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

  // ??????delivery address????????????
  updateSaveAddressNumber = async (number) => {
    this.setState({
      saveAddressNumber: number
    });
  };

  // ???????????????????????????
  get isCurrentBuyWaySubscription() {
    const { tid } = this.state;
    return tid
      ? !!this.state.orderDetails?.subscriptionResponseVO
      : this.state.subForm?.buyWay === 'frequency';
  }

  /**
   * init panel prepare/edit/complete status
   */
  sendCyberPaymentForm = async (cyberPaymentForm, cardType) => {
    //cardholderName, cardNumber, expirationMonth, expirationYear, securityCode???????????????????????????---start---
    let {
      cardholderName,
      cardNumber,
      expirationMonth,
      expirationYear,
      securityCode
    } = cyberPaymentForm;
    if (cardType !== undefined) {
      this.setState({
        cyberCardType: cardType
      });
    }
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
          if (
            this.props.paymentStore.curPayWayInfo.paymentFormType ==
            'MICRO_FORM'
          ) {
            //MICRO_FORM can submit
            this.setState({ subscriptionID: 'xxxx' });
          } else {
            this.setState({ cyberBtnLoading: true });
            this.handlesubScriptionID();
          }
          // this.cyberRef.current.cyberCardRef.current.cyberTokenGet?this.cyberRef.current.cyberCardRef.current.cyberTokenGet(async (data) => {
          //   let cyberCardType = data.type;
          //   this.setState({
          //     cyberCardType
          //   });
          //   this.setState({ cyberBtnLoading: false });
          //   // this.handlesubScriptionID()
          // }):this.handlesubScriptionID()
        } catch (err) {
          this.setState({ subscriptionID: '' }); // subscriptionID set empty
          this.showErrorMsg(err.message);
          this.setState({
            cyberBtnLoading: false,
            saveBillingLoading: false
          });
        }
      }
    } else {
      this.setState({ subscriptionID: '' });
    }
    //cardholderName, cardNumber, expirationMonth, expirationYear, securityCode???????????????????????????---end---
    this.setState({ cyberPaymentForm });
  };
  handlesubScriptionID = async (cb) => {
    try {
      let cyberParams = this.getCyberParams();
      let res = {};
      if (this.isLogin) {
        res = await this.queryCyberCardType(cyberParams);
      } else {
        res = await this.queryGuestCyberCardType(cyberParams);
      }

      let authorizationCode = res.context.requestToken;
      let subscriptionID = res.context.subscriptionID;
      let cyberCardType = res.context.cardType;
      this.setState(
        {
          authorizationCode,
          subscriptionID,
          cyberCardType
        },
        () => {
          cb && cb();
        }
      );
    } catch (err) {
      this.setState({ subscriptionID: '' }); // subscriptionID set empty
      this.showErrorMsg(err.message);
    } finally {
      this.setState({
        cyberBtnLoading: false,
        saveBillingLoading: false
      });
    }
  };

  //???????????????0????????????0????????????????????????paymentMethod?????????????????????????????????
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
        //??????0?????????
        if (this.paymentMethodPanelStatus.isEdit) {
          //??????????????????????????????paymentInfo,??????paymentMethod???????????????confirmation??????
          setStsToCompleted({
            key: 'paymentMethod'
          });
          setStsToEdit({ key: 'confirmation' });
        } else {
          //??????????????????????????????????????????paymentMethod????????????
          setStsToCompleted({
            key: 'paymentMethod'
          });
        }
      } else {
        //????????????0?????????
        if (!paymentPanelHasComplete && confirmationPanelStatus.isEdit) {
          //??????????????????confirm????????????payment????????????????????????payment??????
          setStsToEdit({ key: 'paymentMethod' });
          setStsToPrepare({ key: 'confirmation' });
          return;
        }
        if (!paymentPanelHasComplete && !this.paymentMethodPanelStatus.isEdit) {
          //????????????????????????????????????paymentMethod??????prePare
          setStsToPrepare({ key: 'paymentMethod' });
        }
      }
    }
  }

  initPanelStatus() {
    const { paymentStore, checkoutStore } = this.props;
    const { tid, isFromFelin } = this.state;
    //???????????????????????????0????????????paymentMethod?????????????????????
    if (this.isSkipPaymentPanel && !tid) {
      paymentStore.setStsToCompleted({
        key: 'paymentMethod'
      });
    }

    //repay??????from felin???????????????????????????????????????????????????completed
    if (isFromFelin || tid) {
      paymentStore.setStsToCompleted({
        key: 'deliveryAddr',
        isFirstLoad: true
      });
      paymentStore.setStsToCompleted({
        key: 'billingAddr',
        isFirstLoad: true
      });
      let nextConfirmPanel;
      // if (COUNTRY !== 'jp') {
      //   nextConfirmPanel = searchNextConfirmPanel({
      //     list: toJS(
      //       paymentStore?.panelStatus?.filter((item) => item.key !== 'bindPet')
      //     ),
      //     curKey: 'deliveryAddr'
      //   });
      // } else {
      // ?????????????????????complete???panel
      if (checkoutStore?.isShowBindPet) {
        nextConfirmPanel = searchNextConfirmPanel({
          list: toJS(paymentStore.panelStatus),
          curKey: 'bindPet'
        });
      } else {
        nextConfirmPanel = searchNextConfirmPanel({
          list: toJS(paymentStore.panelStatus),
          curKey: 'bindPet'
        });
      }

      // }
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
        data = Object.assign({}, data, {
          cardCvv: cyberMd5Cvv,
          Cvv: data.cardCvv
        });
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
    // const isFelin =
    //     sessionItemRoyal.get('rc-userGroup') == 'felinStore' ? true : false;
    // const isFgs =
    // sessionItemRoyal.get('rc-userGroup') == 'fgs' ? true : false;
    try {
      let res;
      // if (sessionItemRoyal.get('rc-userGroup')) {
      res = await getPaymentMethod({}, true);
      // } else {
      //   res = await getPaymentMethod({ isPC: true }, true);
      // }

      let cardList = res.context;
      const paypalCardIndex = cardList.findIndex(
        (item) => item.paymentItem?.toLowerCase() === 'adyen_paypal'
      );
      if (paypalCardIndex > -1) {
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

  //????????????listData
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

  //??????????????????
  initPaymentWay = async () => {
    try {
      const { tid, orderDetails } = this.state;
      const {
        paymentStore: { setPayWayNameArr }
      } = this.props;
      // ???????????????stoken????????????
      // fgs ????????? isOfflinePayment ???false???felin ????????????true
      const isFelin =
        sessionItemRoyal.get('rc-userGroup') == 'felinStore' ? true : false;
      const isFgs =
        sessionItemRoyal.get('rc-userGroup') == 'fgs' ? true : false;
      let payWay;
      if (isFelin) {
        payWay = await getWays({ businessType: '2' });
      } else {
        if (isFgs) {
          // businessType
          // 0 shop????????????
          // 1 ???????????? fgs
          // 2 ?????????????????? felin
          payWay = await getWays({ businessType: '1' });
        } else {
          payWay = await getWays({ businessType: '0' });
        }
      }
      let payWayNameArr = [];
      if (payWay.context) {
        // ????????????: 1.???????????? 2.???????????????, ???????????????????????????????????? 3.cod???, ????????????????????????
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

      //???????????????,?????????????????????,?????????????????????
      this.setState(
        {
          payWayNameArr,
          originPayNameArr: payWayNameArr
        },
        () => {
          setPayWayNameArr(payWayNameArr);
          // ideal???????????????????????????????????????
          const supportPaymentMethods =
            payWayNameArr[0]?.name === 'iDeal'
              ? payWayNameArr[1]?.payPspItemCardTypeVOList
              : payWayNameArr[0]?.payPspItemCardTypeVOList || [];
          this.props.paymentStore.setSupportPaymentMethods(
            supportPaymentMethods
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

  //???????????????,?????????????????????,?????????????????????
  initPaymentTypeVal(val) {
    const {
      paymentStore: { serCurPayWayVal }
    } = this.props;

    const tmpVal = val || this.state.payWayNameArr[0]?.code || '';
    if (chooseRadioType() === 'box' && !this.isSkipPaymentPanel) return; //box???????????????????????????????????????,0??????????????????????????????credit card????????????
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
  // adyenCard??????????????????
  setSupportPaymentMethods() {
    const {
      paymentStore: { curPayWayInfo }
    } = this.props;
    return (
      this.state.payWayNameArr.filter((p) => p.code === curPayWayInfo?.code)[0]
        ?.payPspItemCardTypeVOList || []
    );
  }
  //??????ServiceFeeAndLoyaltyPoints
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
          //todo
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
    // ??????felin ???????????????????????????????????????
    this.props.paymentStore.setStsToCompleted({
      key: 'paymentMethod',
      isFirstLoad: true
    });
    this.props.paymentStore.setStsToEdit({ key: 'paymentMethod' });

    this.setState({
      visibleUpdate: false
    });
  };

  // ??????????????????
  queryOrderDetails() {
    getOrderDetails(this.state.tidList[0]).then(async (res) => {
      let resContext = res.context;
      this.setState({
        orderDetails: resContext
      });
      // ???????????????????????????????????????
      const calculationParam =
        localItemRoyal.get('rc-calculation-param') || null;
      // ??????????????????
      this.updateDeliveryAddrData(calculationParam);
    });
  }

  //??????appointment??????
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
        // recommendationId: funcUrl({ name: 'appointmentNo' }) ? '' : 'Felin', //felin fgs???????????????Felin???????????????????????????????????????????????????
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
  // 4??????????????????????????????
  initCommonPay = ({ email = '' } = {}) => {
    this.doGetAdyenPayParam();
    if (email) {
      this.setState({
        email
      });
    }
  };

  /**************??????????????????start*****************/

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
        // ??????token???????????????????????????cvv
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

  // 6??????????????????????????????
  async getAdyenPayParam() {
    try {
      const {
        paymentStore: { curPayWayInfo }
      } = this.props;
      const { email, swishPhone, bank } = this.state;
      const { isLogin } = this;
      let obj = await this.getPayCommonParam();
      let commonParameter = obj.commonParameter;
      //???commonParameter????????????consentIds-start
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
      //???commonParameter????????????consentIds-end
      let phone = obj.phone;
      let parameters;
      /* ??????????????????????????? */
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
        // adyen_point_of_sale_onj ==>pos onj
        adyen_point_of_sale_onj: () => {
          parameters = Object.assign(commonParameter, {
            payPspItemEnum: 'ADYEN_POS_ONJ',
            wasFelinStore: true,
            posTypeEnum: 1
          });
        },
        adyen_moto: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: '',
            payPspItemEnum: 'ADYEN_MOTO'
          });
        },
        adyen_ideal: () => {
          parameters = Object.assign(commonParameter, {
            adyenType: 'ideal',
            payPspItemEnum: 'ADYEN_IDEAL',
            adyenIDealIssuer: bank
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
            cyberPayParam: { id, cardCvv, accessToken, Cvv }
          } = this.state;
          parameters = Object.assign({}, commonParameter, {
            payPspItemEnum: 'CYBER',
            paymentMethodId: id,
            securityCode: cardCvv,
            originCode: Cvv,
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

      //???????????????????????????
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

  //???????????????????????????
  async getPayCommonParam() {
    try {
      if (!this.state.tid) {
        await this.valideCheckoutLimitRule();
      }
      const commonParameter = await this.packagePayParam();
      let phone = this.state.billingAddress?.phoneNumber; //??????????????????
      return new Promise((resolve) => {
        resolve({ commonParameter, phone });
      });
    } catch (err) {
      console.warn(err);
      throw new Error(err.message);
    }
  }

  // 5???????????????
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

  // ????????????-???????????????????????????,????????????,????????????????????? confirmation
  async allAdyenPayment(parameters) {
    try {
      let action;
      const actions = () => {
        const rePayFun = () => {
          action = rePay;
        }; // ???????????????
        const customerCommitAndPayFun = () => {
          action = customerCommitAndPay;
        }; //????????????
        const confirmAndCommitFun = () => {
          action = confirmAndCommit;
        }; //??????
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
        checkoutStore: { isShowBindPet, generateGuestUUID }
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
      // ?????????orderSource??????L_ATELIER_FELIN
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

      /* 4)???????????? */
      const res = await action(parameters);
      const { tidList } = this.state;
      let orderNumber; // ????????????
      let subOrderNumberList = []; // ????????????????????????
      let subNumber; // ???????????????
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

            //?????????
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
            //????????????,res.context??????????????????
            adyenAction = JSON.parse(res.context.redirectUrl);
            if (subOrderNumberList.length) {
              sessionItemRoyal.set(
                'subOrderNumberList',
                JSON.stringify(subOrderNumberList)
              );
            }
            this.setState({ adyenAction });
          } else if (contextType === 'Object' && res.context.redirectUrl) {
            //??????repay??????res.context??????????????????
            adyenAction = JSON.parse(res.context.redirectUrl);
            if (subOrderNumberList.length) {
              sessionItemRoyal.set(
                'subOrderNumberList',
                JSON.stringify(subOrderNumberList)
              );
            }
            this.setState({ adyenAction });
          } else {
            //?????????
            gotoConfirmationPage = true;
          }
          break;
        case 'adyen_klarna_pay_later':
        case 'adyen_klarna_pay_now':
        case 'directEbanking':
        case 'adyen_paypal':
          subOrderNumberList = res.context.tidList;
          this.removeLocalCartData();
          // ???klana???????????????
          if (res.context.tid) {
            sessionItemRoyal.set('orderNumber', res.context.tid);
          }
          if (res.context.redirectUrl && !this.state.paypalAccount) {
            //???????????????paypal???????????????????????????????????????confirmation page
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
          // ????????????
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
            // ?????????????????????????????????????????????
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
                        parameter: {
                          ...res?.context,
                          queryPosOrderReturnCode: resp.code
                        }
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
                  // K-000001 ???????????????
                  // K-000002 ????????????
                  console.log('queryPosOrdererr', err);
                  // ??????30????????????????????????????????????????????????paying??????not paid
                  // 30?????????paying?????????repay

                  const isGuest = sessionItemRoyal.get('rc-guestId')
                    ? true
                    : false;
                  if (err.code == 'K-000001') {
                    if (i < 10) {
                      await sleep(3000);
                      return await queryPos();
                    } else {
                      valetGuestOrderPaymentResponse({
                        guest_id: sessionItemRoyal.get('rc-guestId'),
                        parameter: { ...res?.context }
                      })
                        .then((res) => {
                          console.log('res', res);
                        })
                        .catch((err) => {
                          console.log('err', err);
                        });
                      subOrderNumberList = tidList.length
                        ? tidList
                        : res.context && res.context.tidList;
                      subNumber =
                        (res.context && res.context.subscribeId) || '';
                      gotoConfirmationPage = true;
                    }
                  } else {
                    this.showErrorMsg(err.message);
                    if (!isGuest) {
                      this.setState(
                        {
                          tid,
                          tidList: res.context.tidList
                        },
                        () => {
                          this.queryOrderDetails();
                        }
                      );
                    } else {
                      valetGuestOrderPaymentResponse({
                        guest_id: sessionItemRoyal.get('rc-guestId'),
                        parameter: { ...res?.context }
                      })
                        .then((res) => {
                          console.log('res', res);
                        })
                        .catch((err) => {
                          console.log('err', err);
                        });
                      subOrderNumberList = tidList.length
                        ? tidList
                        : res.context && res.context.tidList;
                      subNumber =
                        (res.context && res.context.subscribeId) || '';
                      gotoConfirmationPage = true;
                    }
                  }
                });
            };
            await queryPos();
          }
          break;
        case 'adyen_point_of_sale_onj':
          const payStatus =
            res?.context?.trade?.tradeState?.payState == 'PAID' ? true : false;
          // ????????????
          if (res.code == 'K-000000' && payStatus) {
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
            const tid = res?.context?.tid;
            // ?????????????????????????????????????????????
            const queryPos = async () => {
              i++;
              return queryPosOrder({ tid, posTypeEnum: 1 })
                .then(async (resp) => {
                  if (resp.code == 'K-000000') {
                    const isGuest = sessionItemRoyal.get('rc-guestId')
                      ? true
                      : false;
                    if (isGuest) {
                      valetGuestOrderPaymentResponse({
                        guest_id: sessionItemRoyal.get('rc-guestId'),
                        parameter: {
                          ...res?.context,
                          queryPosOrderReturnCode: resp.code
                        }
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
                  // K-000001 ???????????????
                  // K-000002 ????????????
                  console.log('queryPosOrdererr', err);
                  // ??????30????????????????????????????????????????????????paying??????not paid
                  // 30?????????paying?????????repay

                  const isGuest = sessionItemRoyal.get('rc-guestId')
                    ? true
                    : false;
                  if (err.code == 'K-000001') {
                    if (i < 10) {
                      await sleep(3000);
                      return await queryPos();
                    } else {
                      valetGuestOrderPaymentResponse({
                        guest_id: sessionItemRoyal.get('rc-guestId'),
                        parameter: { ...res?.context }
                      })
                        .then((res) => {
                          console.log('res', res);
                        })
                        .catch((err) => {
                          console.log('err', err);
                        });
                      subOrderNumberList = tidList.length
                        ? tidList
                        : res.context && res.context.tidList;
                      subNumber =
                        (res.context && res.context.subscribeId) || '';
                      gotoConfirmationPage = true;
                    }
                  } else {
                    this.showErrorMsg(err.message);
                    if (!isGuest) {
                      this.setState(
                        {
                          tid,
                          tidList: res.context.tidList
                        },
                        () => {
                          this.queryOrderDetails();
                        }
                      );
                    } else {
                      valetGuestOrderPaymentResponse({
                        guest_id: sessionItemRoyal.get('rc-guestId'),
                        parameter: { ...res?.context }
                      })
                        .then((res) => {
                          console.log('res', res);
                        })
                        .catch((err) => {
                          console.log('err', err);
                        });
                      subOrderNumberList = tidList.length
                        ? tidList
                        : res.context && res.context.tidList;
                      subNumber =
                        (res.context && res.context.subscribeId) || '';
                      gotoConfirmationPage = true;
                    }
                  }
                });
            };
            await queryPos();
          }
          break;
        case 'cash':
          if (res.code) {
            const isGuest = sessionItemRoyal.get('rc-guestId') ? true : false;
            if (isGuest) {
              valetGuestOrderPaymentResponse({
                guest_id: sessionItemRoyal.get('rc-guestId'),
                parameter: {
                  ...res?.context,
                  queryPosOrderReturnCode: res.code
                }
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
        case 'adyen_moto':
          if (res.code === 'K-000000') {
            console.log('adyen_moto', res);
            subOrderNumberList = tidList.length
              ? tidList
              : res.context && res.context.tidList;
            subNumber = (res.context && res.context.subscribeId) || '';
            gotoConfirmationPage = true;
          }
          break;
        case 'adyen_ideal':
          subOrderNumberList = res.context.tidList;
          this.removeLocalCartData();
          // ???ideal???????????????
          if (res.context.tid) {
            sessionItemRoyal.set('orderNumber', res.context.tid);
          }
          if (res.code === 'K-000000') {
            if (res.context?.redirectUrl) {
              window.location.href = res.context?.redirectUrl;
            }
            console.log('adyen_ideal', res);
            // subOrderNumberList = tidList.length
            //   ? tidList
            //   : res.context && res.context.tidList;
            // subNumber = (res.context && res.context.subscribeId) || '';
            // gotoConfirmationPage = true;
          }
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

      generateGuestUUID();
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
        // ?????????????????????????????????
        localItemRoyal.remove('rc-calculation-param');
        sessionItemRoyal.remove('rc-clicked-surveyId');
        sessionItemRoyal.remove('goodWillFlag');
        sessionItemRoyal.remove('guestInfo');
        //localItemRoyal.remove('rc-promotionCode');
        this.props.checkoutStore.removePromotionCode();
        //??????????????????
        this.props.paymentStore.removePayWayNameArr();
        //?????????????????????????????????
        this.props.clinicStore.removeLinkClinicInfo();
        this.props.clinicStore.removeLinkClinicRecommendationInfos();
        // ?????? confirmation
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
        // err.errorData ???????????????errorData???????????????????????????????????????repay
        sessionItemRoyal.set('rc-tid', err.errorData.tid);
        sessionItemRoyal.set('rc-rePaySubscribeId', err.errorData.subscribeId);
        sessionItemRoyal.set(
          'rc-tidList',
          JSON.stringify(err.errorData.tidList)
        );
        sessionItemRoyal.set(
          'rc-serviceFeeEnabled',
          JSON.stringify(err?.errorData?.trade?.tradePrice?.serviceFeeEnabled)
        );
        this.setState(
          {
            tid: err.errorData.tid,
            tidList: err.errorData.tidList,
            rePaySubscribeId: err.errorData.subscribeId,
            serviceFeeEnabled:
              err?.errorData?.trade?.tradePrice?.serviceFeeEnabled
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

  // ?????????????????? delivery date ??? time slot
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

  // ?????????????????????
  async removeLocalCartData() {
    const { checkoutStore } = this.props;
    if (this.isLogin) {
      checkoutStore.removeLoginCartData();
      // ?????? delivery date ??? time slot (????????????phoneNumber??????)
      // await this.clearTimeslotAndDeliverydate();
    } else {
      checkoutStore.setCartData(
        checkoutStore.cartData.filter((ele) => !ele.selected)
      ); // ?????????selected
      //sessionItemRoyal.remove('rc-token');
    }
  }

  /**************??????????????????end*****************/

  /**
   * ?????????????????????&???????????????????????????
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

      //??????????????????????????????????????????
      let visitorRegisterParam = {
        ...param,
        ...submitParam
      };
      if (
        window.__.env.REACT_APP_COUNTRY === 'ru' &&
        !visitorRegisterParam.city &&
        !visitorRegisterParam.province
      ) {
        throw new Error('?????????????? ??????????');
      }
      //

      let postVisitorRegisterAndLoginRes = await postVisitorRegisterAndLogin({
        ...param,
        ...submitParam,
        ...{
          contractNumber: getCurPickUpInfo('contractNumber') || '',
          pickupName: getCurPickUpInfo('courier') || '', // ????????????
          courierCode: getCurPickUpInfo('courierCode') || ''
        }
      });

      //????????????consent ?????????????????????????????? start
      //let submitParam = bindSubmitParam(this.state.listData);
      // userBindConsent({
      //   ...submitParam,
      //   ...{ oktaToken: '' },
      //   customerId:
      //     (postVisitorRegisterAndLoginRes.context &&
      //       postVisitorRegisterAndLoginRes.context.customerId) ||
      //     ''
      // });
      //????????????consent ?????????????????????????????? end

      sessionItemRoyal.set(
        'rc-token',
        postVisitorRegisterAndLoginRes.context.token
      );
      let addPramas = (
        sessionItemRoyal.get('recommend_product')
          ? this.state.recommend_data
          : cartData
      ).map((ele) => ({
        goodsNum: ele.buyCount,
        goodsInfoId: ele.goodsInfoId
      }));
      await AddCartItemsMember({
        paramList: addPramas,
        orderSource:
          sessionItemRoyal.get('recommend_product') &&
          sessionItemRoyal.get('orderSource')
            ? sessionItemRoyal.get('orderSource')
            : '',
        doUpdateCart: false,
        showPCMiniCartPop: false
      });
    } catch (err) {
      console.warn(err);
      throw new Error(err.message);
    }
  }

  /**
   * ??????????????????
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

    // ?????????????????????????????????????????????
    const calculationParam = localItemRoyal.get('rc-calculation-param') || null;

    //??????????????????cart?????????survey???????????????????????????
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
    //??????felin????????????
    let appointParam = {};
    if (isFromFelin && recommend_data.length > 0) {
      appointParam = {
        appointmentNo: recommend_data[0]?.apptNo, //felin????????????
        specialistType: recommend_data[0]?.expertName, //????????????
        appointmentTime: recommend_data[0]?.minutes, //????????????
        appointmentType: recommend_data[0]?.appointType, //????????????
        appointmentDate: recommend_data[0]?.apptTime, //????????????
        isApptChange: Boolean(sessionItemRoyal.get('isChangeAppoint')),
        oldAppointNo: sessionItemRoyal.get('oldAppointNo')
      };
    }

    /**
     * ????????? 1
     * ????????????????????????????????????????????????????????????
     * ????????????????????????preview???????????????
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
        //???????????????????????????
        clinicsId: clinicStore.selectClinicId,
        clinicsName: clinicStore.selectClinicName,
        //????????????recommendationCode(clinicsCode)??????
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
    if (tokenObj && tokenObj?.accessToken) {
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

    //from adoptions page,shelter-landingPage
    const shelterLandingPageData = loginCartData.filter(
      (el) => el.prefixFn === 'shelter-page'
    );
    if (shelterLandingPageData.length) {
      // shelterLandingPageData.forEach(el => el.addCartTime = Math.round(new Date(el.createTime)))
      // shelterLandingPageData.sort((a, b) => a.addCartTime - b.addCartTime)
      const clinicsId = shelterLandingPageData?.[0]?.recommendationId || '';
      param = Object.assign(param, {
        clinicsId
      });
    }

    // ??????????????????
    if (localItemRoyal.get('deRecommendationGoodsId')) {
      if (this.isLogin) {
        param.tradeItems = loginCartData.map((ele) => {
          const recoProductParam = handleRecoProductParamByItem({
            ele,
            ...this.props
          });
          return Object.assign(recoProductParam, {
            num: ele.buyCount,
            skuId: ele.goodsInfoId,
            goodsInfoFlag: ele.goodsInfoFlag,
            referenceObject: 'vet',
            recommendationId:
              clinicStore.linkClinicRecommendationInfos.recommenderId
          });
        });
        param.clinicsName = '';
      } else {
        param.tradeItems = cartData.map((ele) => {
          const recoProductParam = handleRecoProductParamByItem({
            ele,
            ...this.props
          });
          return Object.assign(recoProductParam, {
            num: ele.buyCount,
            skuId: ele.goodsInfoId,
            goodsInfoFlag: ele.goodsInfoFlag,
            referenceObject: 'vet',
            recommendationId:
              clinicStore.linkClinicRecommendationInfos.recommenderId
          });
        });
      }
      param.clinicsId = clinicStore.linkClinicRecommendationInfos.recommenderId;
    } else if (sessionItemRoyal.get('recommend_product')) {
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
      let id =
        clinicStore.linkClinicRecommendationInfos.recommendationId ||
        clinicStore.selectClinicId ||
        clinicStore.defaultClinicId;
      const recomm = loginCartData?.filter((el) => el.recommendationId);
      const productRecomm = recomm?.[0]?.recommendationId || '';
      param.tradeItems = loginCartData.map((ele) => {
        const recoProductParam = handleRecoProductParamByItem({
          ele,
          ...this.props
        });
        return Object.assign(recoProductParam, {
          num: ele.buyCount,
          skuId: ele.goodsInfoId,
          goodsInfoFlag: ele.goodsInfoFlag,
          recommendationId: ele.recommendationId || id //As long as you bind the recommendation id once, you will need to pass it later
        });
      });
      param.clinicsId = productRecomm || id;
    } else {
      param.tradeItems = cartData.map((ele) => {
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
    }

    // ??????promotion??????
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
        // marketingType 0-??????fullReductionLevelList-reductionLevelId 1-??????fullDiscountLevelList-discountLevelId
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
   * ????????? 2
   * ????????????????????????????????????????????????????????????
   * ????????????????????????preview???????????????
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

  // ????????????/????????????/????????????/??????????????????
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
    //??????promotionCode???????????????0??????0????????????paymentMethod?????????????????????
    this.handleZeroOrder();
    this.setState({
      promotionCode
    });
  };
  handlePaymentTypeCommon = (paymentTypeCode) => {
    if (this.state.serviceFeeEnabled) return; //??????????????????????????????????????????
    const {
      paymentStore: { serCurPayWayVal },
      checkoutStore: { setInputPoint }
    } = this.props;
    serCurPayWayVal(paymentTypeCode);
    setInputPoint('');
    openPromotionBox();
    this.setState({ email: '', convenienceStore: '' }, () => {
      this.onPaymentTypeValChange();
    });
  };
  handlePaymentTypeChange = (e) => {
    this.handlePaymentTypeCommon(e.target.value);
  };
  handlePaymentTypeClick = (paymentTypeCode) => {
    this.handlePaymentTypeCommon(paymentTypeCode);
  };

  handleCardTypeChange = (e) => {
    this.setState({ cardTypeVal: e.target.value }, () => {
      this.onCardTypeValChange();
    });
  };

  // ?????????????????????billingAddress
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

    // ???????????? billingAddress = deliveryAddress
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

  // ????????????????????????????????????
  calculateFreight = async (data) => {
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

    // ?????????????????????????????????????????????
    data.maxDeliveryTime =
      data?.maxDeliveryTime || data?.calculation?.maxDeliveryTime;
    data.minDeliveryTime =
      data?.minDeliveryTime || data?.calculation?.minDeliveryTime;
    localItemRoyal.set('rc-calculation-param', data);

    param = {
      promotionCode: this.props.checkoutStore.promotionCode,
      purchaseFlag: false, // ?????????: true???checkout: false
      taxFeeData: {
        country: window.__.env.REACT_APP_GA_COUNTRY, // ???????????? / data.countryName
        region: data?.stateNo || '', // ????????????
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

    // PayProductInfo ????????????????????????
    localItemRoyal.set('rc-payment-purchases-param', param);
    try {
      // ????????????
      if (this.isLogin) {
        await this.props.checkoutStore.updateLoginCart(param);
        if (COUNTRY == 'jp' && this.props.paymentStore.curPayWayVal) {
          this.confirmCalculateServiceFeeAndLoyaltyPoints();
        }
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
    console.log(1234, data);

    const {
      paymentStore: { setPayWayNameArr, setCurReceiveType }
    } = this.props;
    const { originPayNameArr } = this.state;

    setCurReceiveType(data?.receiveType);

    this.setState(
      {
        deliveryAddress: data
      },
      () => {
        let newPayWayName =
          JSON.parse(sessionItemRoyal.get('rc-payWayNameArr')) || null;
        if (newPayWayName) {
          // pickup ?????????????????????
          // 1???cod: cash & card??????shop??????cod????????????
          // 2???cod: cash ??? card??????shop??????cod????????????
          // 3??????????????????shop???????????????

          // ??????pickup??????cod??????????????????cod
          let pmd = data?.paymentMethods;

          if (data?.receiveType == 'PICK_UP' && pmd !== 'cod') {
            newPayWayName = newPayWayName.filter((e) => {
              return e.code !== 'cod';
            });
          } else {
            newPayWayName = [...originPayNameArr];
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

  // ??????BillingAddress??????
  updateBillingAddrData = (data) => {
    if (!this.state.billingChecked) {
      this.setState({ billingAddress: data });
    }
  };
  // ??????????????????
  catchAddOrEditAddressErrorMessage = (msg) => {
    this.showErrorMsg(msg);
  };

  // ???????????????????????????
  getIntlMsg = (str) => {
    return this.props.intl.messages[str];
  };

  paymentUpdateDeliveryOrPickup = (num) => {
    this.setState({
      deliveryOrPickUp: num
    });
  };

  /**
   * ??????address panel
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
        ref={this.memberAddListRef}
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

        {/* BillingAddress ????????????????????? */}
        <ErrorMessage msg={billingAddressErrorMsg} />

        {/* ????????? deliveryAddress = billingAddress */}
        {billingChecked ? (
          <div className="ml-custom mr-custom">
            <AddressPreview form={this.state.billingAddress} />
          </div>
        ) : null}

        {/* ???????????? deliveryAddress != billingAddress */}
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
  // ?????? billingAddress ???????????????????????????
  getListAddOrEdit = (flag) => {
    this.setState({
      billingAddressAddOrEdit: flag
    });
  };
  // ??????confirm 1
  clickConfirmPaymentPanel = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    // ?????????billingAddress = deliveryAddress
    this.setState(
      {
        saveBillingLoading: true,
        isShowValidationModal: true
      },
      () => {
        setTimeout(() => {
          if (this.cyberRef?.current?.cyberCardRef?.current?.cyberTokenGet) {
            try {
              this.cyberRef.current.cyberCardRef.current.cyberTokenGet(() => {
                try {
                  this.handlesubScriptionID(this.confirmPaymentPanel);
                } catch (err) {
                  this.setState({ saveBillingLoading: false });
                  throw new Error(err.message);
                }
              });
            } catch (err) {
              this.setState({ saveBillingLoading: false });
              throw new Error(err.message);
            }
          } else {
            this.confirmPaymentPanel();
          }
        }, 800);
      }
    );
  };
  confirmPaymentPanel = async () => {
    const { isLogin } = this;
    const {
      paymentStore: { currentCardTypeInfo, curPayWayInfo }
    } = this.props;
    if (!currentCardTypeInfo && this.cyberRef?.current?.cyberCardRef?.current) {
      // cyber error update
      this.setState({ saveBillingLoading: false });
      let message =
        'This card type is temporarily not supported, please try again with a different card';
      this.showErrorMsg(message);
      return;
    }
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

    // ???billing????????????????????????
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
          // if-?????? else-??????
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

    // cyber????????????
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

    //cyber????????????
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
          // ????????????
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
  // ??????confirm cvv
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
      // ?????? BillingAddress ?????????
      let dfarr = laddf.settings;
      dfarr = dfarr.filter(
        (item) => item.enableFlag == 1 && item.requiredFlag == 1
      );
      let errMsgArr = [];
      dfarr.forEach((v, i) => {
        let akey = v.fieldKey;
        // state ????????????????????? province
        akey = v.fieldKey == 'state' ? 'province' : v.fieldKey;
        // region ????????????????????? area
        akey = v.fieldKey == 'region' ? 'area' : v.fieldKey;
        // phoneNumber ????????????????????? consigneeNumber
        if (billaddr?.consigneeNumber) {
          akey = v.fieldKey == 'phoneNumber' ? 'consigneeNumber' : v.fieldKey;
        }
        let fky = wrongBillingAddress[akey];
        // ??????city???cityId ???????????????
        if (v.fieldKey == 'city' && (billaddr.city || billaddr.cityId)) {
          akey = '';
        }
        // ??????country???countryId ???????????????
        if (
          v.fieldKey == 'country' &&
          (billaddr.country || billaddr.countryId)
        ) {
          akey = '';
        }
        if (akey && !billaddr[akey]) errMsgArr.push(fky);
      });

      errMsgArr = errMsgArr.join(', ');
      // ????????????????????????????????????????????????
      if (errMsgArr.length) {
        this.showBillingAddressErrorMsg(
          wrongBillingAddress['title'] + errMsgArr
        );
        return;
      }
    }

    // ??????????????????????????????
    if (
      !billingChecked &&
      (!tid || tid == null) &&
      isShowValidationModal &&
      billingAddressAddOrEdit
    ) {
      // ??????????????????????????????
      this.setState({
        paymentValidationLoading: true,
        validationModalVisible: true
      });
    } else {
      this.cvvConfirmNextPanel();
    }
  };
  // ??????????????????????????????
  setPaymentToCompleted = () => {
    this.cvvConfirmNextPanel();
  };
  // ????????? ?????????
  cvvConfirmNextPanel = async () => {
    const { isLogin } = this;
    const { paymentStore } = this.props;
    // ?????? VisitorAddress ?????? && !billingChecked
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
        // ??????purchases??????
        localItemRoyal.remove('rc-payment-purchases-param');
      }
    );
  };

  /***** ?????????????????? *******/
  // ????????????
  chooseValidationAddress = (e) => {
    this.setState({
      selectValidationOption: e.target.value
    });
  };
  // ????????????????????????????????????
  getValidationData = async (data) => {
    this.setState({
      paymentValidationLoading: false
    });
    if (data && data != null) {
      // ??????????????????????????????????????????
      this.setState({
        validationAddress: data
      });
    } else {
      // ?????????????????????????????????
      this.cvvConfirmNextPanel();
    }
  };
  // ??????????????????,??????????????????????????????complete???panel
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

      // ????????????????????????
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
        // ???????????? billingAddress ??????
        if (
          !billingChecked &&
          isLogin &&
          this.loginBillingAddrRef &&
          this.loginBillingAddrRef.current
        ) {
          await this.loginBillingAddrRef.current.handleSavePromise();
        }
        // ????????????????????????
        this.setState({
          validationModalVisible: false
        });
        // billing  ???????????????
        this.cvvConfirmNextPanel();
      }
    );
  };

  // ??????
  handleClickPaymentPanelEdit = async () => {
    if (this.props.checkoutStore.isShowBindPet) {
      this.props.paymentStore.setStsToCompleted({
        key: 'bindPet',
        onlyGa: true
      });
    } else {
      this.props.paymentStore.setStsToCompleted({
        key: 'deliveryAddr',
        onlyGa: true
      });
    }

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

    this.paymentUpdateDeliveryOrPickup(0); // ??????pickup???delivery home

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
   * ??????????????????
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

    // ?????????same as billing????????????billing addr
    const validForBilling = !billingChecked && !validSts.billingAddr;

    const payConfirmBtn = ({ disabled, loading = false } = {}) => {
      return (
        <div
          data-auto-testid="payment_confirm_btn"
          className="d-flex justify-content-end mt-3 rc_btn_payment_confirm"
        >
          <Button
            type="primary"
            disabled={disabled}
            loading={loading}
            data-auto-testid="payment_confirm_payment_method"
            className="rc_btn_payment_confirm"
            onClick={this.clickConfirmPaymentPanel}
          >
            <FormattedMessage id="NextToPlaceAnOrder" />
          </Button>
        </div>
      );
    };

    const reInputCVVBtn = ({ disabled, loading = false }) => {
      return (
        <div className="d-flex justify-content-end mt-3 rc_btn_payment_cvv">
          <Button
            type="primary"
            className={`rc_btn_payment_cvv`}
            loading={loading}
            disabled={disabled}
            onClick={this.clickReInputCvvConfirm}
          >
            <FormattedMessage id="yes2" />
          </Button>
        </div>
      );
    };

    //???????????????????????????
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
                  {/* ???????????????????????? */}
                  <div
                    className={cn(
                      'flex justify-between items-center text-grey-400 w-full border rounded-md pl-5 pr-2 py-2 my-4 cursor-pointer',
                      curPayWayInfo?.code === item.code
                        ? 'border-green'
                        : 'border-gray-300'
                    )}
                    data-auto-testid={`payment_${item.code}`}
                    key={index}
                    onClick={() => this.handlePaymentTypeClick(item.code)}
                  >
                    <div className="text-sm md:text-lg">
                      <FormattedMessage id={item.code} />
                    </div>
                    {/* adyenCard ??????????????????logo */}
                    {item?.payPspItemCardTypeVOList.length > 0 && (
                      <SupportPaymentMethodsPic
                        supportPaymentMethods={item.payPspItemCardTypeVOList}
                      />
                    )}
                  </div>
                  {/* ??????????????????????????????????????????????????????????????? */}
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
                  {/* adyen_point_of_sale_onj ==> pos onj */}
                  {item.code === 'adyen_point_of_sale_onj' &&
                    curPayWayInfo?.code === 'adyen_point_of_sale_onj' && (
                      <>
                        <Pos
                          billingJSX={this.renderBillingJSX({
                            type: 'adyen_point_of_sale_onj'
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
                  {/* adyen_moto */}
                  {item.code === 'adyen_moto' &&
                    curPayWayInfo?.code === 'adyen_moto' && (
                      <>
                        <Moto
                          billingJSX={this.renderBillingJSX({
                            type: 'adyen_moto'
                          })}
                        />
                      </>
                    )}
                  {/* adyen_ideal */}
                  {item.code === 'adyen_ideal' &&
                    curPayWayInfo?.code === 'adyen_ideal' && (
                      <>
                        <Ideal
                          updateBank={this.updateBank}
                          billingJSX={this.renderBillingJSX({
                            type: 'adyen_ideal'
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
                  {COUNTRY === 'de' &&
                    item.code === 'adyen_klarna_pay_later' &&
                    curPayWayInfo?.code === 'adyen_klarna_pay_later' && (
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
                          showIcon={false}
                        />
                        {/* ????????????
                    1 ????????????
                    2 billing?????? */}
                      </>
                    )}
                  {COUNTRY === 'de' &&
                    item.code === 'adyen_klarna_pay_now' &&
                    curPayWayInfo?.code === 'adyen_klarna_pay_now' && (
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
                          showIcon={false}
                        />
                        {/* {payConfirmBtn({
                          disabled: !EMAIL_REGEXP.test(email) || validForBilling
                        })} */}
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
          {curPayWayInfo?.code === 'adyen_point_of_sale_onj' &&
            payConfirmBtn({
              disabled: validForBilling
            })}
          {curPayWayInfo?.code === 'cash' &&
            payConfirmBtn({
              disabled: validForBilling
            })}
          {curPayWayInfo?.code === 'adyen_moto' &&
            payConfirmBtn({
              disabled: validForBilling
            })}
          {curPayWayInfo?.code === 'adyen_ideal' &&
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
          {COUNTRY === 'de' &&
            curPayWayInfo?.code === 'adyen_klarna_pay_later' &&
            payConfirmBtn({
              disabled: !EMAIL_REGEXP.test(email) || validForBilling
            })}
          {COUNTRY === 'de' &&
            curPayWayInfo?.code === 'adyen_klarna_pay_now' &&
            payConfirmBtn({
              disabled: !EMAIL_REGEXP.test(email) || validForBilling
            })}
          {/* ***********************????????????????????????start******************************* */}
          {payWayErr ? (
            payWayErr
          ) : (
            <>
              {/* cod ???????????? */}
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
                    key={this.isCurrentBuyWaySubscription}
                    isSupportInstallMent={
                      tid
                        ? false
                        : Boolean(
                            +window.__.env.REACT_APP_PAYU_SUPPORT_INSTALLMENT
                          )
                    }
                    needEmail={+window.__.env.REACT_APP_PAYU_EMAIL}
                    needPhone={+window.__.env.REACT_APP_PAYU_PHONE}
                    // todo ??????
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
                    {/* ????????????
                      1 ???????????????adyen form??????????????????
                      2 billing?????? */}
                    {payConfirmBtn({
                      disabled: !validSts.adyenCard || validForBilling,
                      loading: saveBillingLoading,
                      aaa: validSts,
                      bbb: validForBilling
                    })}
                  </>
                )}
              {/* KlarnaPayLater */}
              {COUNTRY !== 'de' &&
                curPayWayInfo?.code === 'adyen_klarna_pay_later' && (
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
                    {/* ????????????
                    1 ????????????
                    2 billing?????? */}
                    {payConfirmBtn({
                      disabled: !EMAIL_REGEXP.test(email) || validForBilling
                    })}
                  </>
                )}
              {/* KlarnaPayNow  */}
              {COUNTRY !== 'de' &&
                curPayWayInfo?.code === 'adyen_klarna_pay_now' && (
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

              {/* todo ????????????CYBER */}
              {curPayWayInfo?.code === 'pc_web' && (
                <>
                  <CyberPayment
                    {...this.props}
                    renderBillingJSX={this.renderBillingJSX}
                    renderSecurityCodeTipsJSX={this.renderSecurityCodeTipsJSX}
                    renderBackToSavedPaymentsJSX={
                      this.renderBackToSavedPaymentsJSX
                    }
                    curPayWayInfo={curPayWayInfo}
                    payConfirmBtn={payConfirmBtn}
                    saveBillingLoading={this.state.saveBillingLoading}
                    validForBilling={
                      !this.state.billingChecked &&
                      !this.state.validSts.billingAddr
                    }
                    subscriptionID={this.state.subscriptionID}
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
                    setCyberLoading={() => {
                      this.setState({ cyberBtnLoading: true });
                    }}
                    cyberBtnLoading={this.state.cyberBtnLoading}
                    showErrorMsg={this.showErrorMsg}
                    ref={this.cyberRef}
                  />
                </>
              )}

              {/* ***********************????????????????????????end******************************* */}
            </>
          )}
        </div>
      </div>
    );
  };

  updateGuestEmail = ({ email: guestEmail }) => {
    const {
      paymentStore: { setGuestEmail },
      checkoutStore: { updateUnloginCart }
    } = this.props;
    setGuestEmail(guestEmail);
    const { deliveryAddress } = this.state;
    this.setState({ guestEmail }, () => {
      updateUnloginCart({
        guestEmail,
        purchaseFlag: false, // ?????????: true???checkout: false
        taxFeeData: {
          country: window.__.env.REACT_APP_GA_COUNTRY, // ???????????? / data.countryName
          region: deliveryAddress.provinceNo, // ????????????
          city: deliveryAddress.city,
          street: deliveryAddress.address1,
          postalCode: deliveryAddress.postCode,
          customerAccount: guestEmail
        },
        shippingFeeAddress: this.state.shippingFeeAddress
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
  updateBank = (bank) => {
    this.setState({ bank });
  };
  // 1???????????????
  clickPay = () => {
    const { intl } = this.props;
    //0????????????????????????????????????????????????us?????????????????????
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

  // 2???
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
      pet,
      initLoading
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
        {initLoading ? (
          <>
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
                {/*checkout????????????????????????????????????*/}
                <div className="rc-padding--sm rc-padding-top--none11 px-4 md:p-8">
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
                    {/* ?????????????????????errorMsg?????????errorMsg===This Error No Display????????????  */}
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
                        <div
                          className="shipping-form"
                          id="J_checkout_panel_email"
                        >
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
                    {/* {COUNTRY === 'jp' && ( */}
                    <SelectPet
                      recommendData={this.state.recommend_data}
                      updateRecommendData={(data) => {
                        this.setState({ recommend_data: data });
                      }}
                      isRepay={tid}
                    />
                    {/* // )} */}

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
                        confirmCalculateServiceFeeAndLoyaltyPoints={
                          this.confirmCalculateServiceFeeAndLoyaltyPoints
                        }
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
                  <span
                    className={`${
                      COUNTRY === 'jp' ? 'font-semibold text-cs-primary' : ''
                    }`}
                  >
                    <FormattedMessage id="payment.yourOrder" />
                  </span>
                  <span
                    data-auto-testid="payment_info_trade_price"
                    className={`grand-total-sum ${
                      COUNTRY === 'jp' ? 'font-semibold text-cs-primary' : ''
                    }`}
                  >
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
                  className={cn(
                    mobileCartVisibleKey === 'more' ? '' : 'hidden'
                  )}
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
                {/* ?????????????????? */}
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
                      hanldeClickConfirm={() =>
                        this.confirmListValidationAddress()
                      }
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
                  <div className="mt-6 text-black text-base">
                    Payment failed
                  </div>
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
                  <Button
                    type="primary"
                    className="md:hidden mt-2"
                    onClick={() => {
                      window.location = this.state.swishAppRedirectUrl;
                    }}
                  >
                    Pay By Swish App
                  </Button>
                </div>
              )}
            </Modal>
          </>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withOktaAuth(Payment);
