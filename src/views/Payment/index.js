import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { findIndex, find } from "lodash";
import { inject, observer } from "mobx-react";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Progress from "@/components/Progress";
import PayProductInfo from "@/components/PayProductInfo";
import Loading from "@/components/Loading";
import UnloginDeliveryAddress from "./modules/UnloginDeliveryAddress";
import LoginDeliveryAddress from "./modules/LoginDeliveryAddress";
import BillingAddressForm from "./modules/BillingAddressForm";
import SubscriptionSelect from "./modules/SubscriptionSelect";
import ClinicForm from "./modules/ClinicForm";
import AddressPreview from "@/components/AddressPreview";
import { getDictionary, formatMoney } from "@/utils/utils";
import ConfirmTooltip from "@/components/ConfirmTooltip";
import {
  postVisitorRegisterAndLogin,
  batchAdd,
  confirmAndCommit,
  customerCommitAndPay,
  rePay,
  customerCommitAndPayMix,
  getWays,
} from "@/api/payment";
import PaymentComp from "@/components/PaymentComp";
import store from "storejs";
import axios from "axios";
import "./index.css";
import "./modules/adyenCopy.css"
import OxxoConfirm from "./modules/OxxoConfirm";
import KlarnaPayLater from "./modules/KlarnaPayLater";
import KlarnaPayNow from "./modules/KlarnaPayNow";
import Sofort from "./modules/Sofort";
import { getAdyenParam } from "./adyen/utils";
import {
  CREDIT_CARD_IMG_ENUM,
  CREDIT_CARD_IMGURL_ENUM,
} from "@/utils/constant";



const rules = [
  {
    key: "firstName",
    require: true,
  },
  {
    key: "lastName",
    require: true,
  },
  {
    key: "address1",
    require: true,
  },
  {
    key: "country",
    require: true,
  },
  {
    key: "city",
    require: true,
  },
  {
    key: "phoneNumber",
    require: true,
  },
  {
    key: "postCode",
    regExp: /\d{5}/,
    require: true,
  },
];

@inject("loginStore", "checkoutStore", "clinicStore", "frequencyStore", "configStore")
@observer
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotionCode: "",
      billingChecked: true,
      isCompleteCredit: false,
      showPayMethodError: false,
      isReadPrivacyPolicyInit: true,
      isEighteenInit: true,
      isReadPrivacyPolicy: false,
      isEighteen: false,
      deliveryAddress: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        rfc: "",
        country: "Mexico",
        city: "",
        postCode: "",
        phoneNumber: "",
      },
      billingAddress: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        rfc: "",
        country: "Mexico",
        city: "",
        postCode: "",
        phoneNumber: "",
      },
      creditCardInfo: {
        // cardNumber: "",
        // cardDate: "",
        // cardCVV: "",
        cardOwner: "",
        email: "",
        phoneNumber: "",
        identifyNumber: "111",
      },
      subForm: {
        buyWay: "",
        frequencyName: "",
        frequencyId: "",
      },
      paymentTypeVal: "", //creditCard oxxo adyen
      errorShow: false,
      errorMsg: "",
      commentOnDelivery: "",
      currentProduct: null,
      loading: false,
      modalShow: false,
      payosdata: {},
      selectedCardInfo: {},
      isToPayNow: sessionStorage.getItem("rc-tid"),
      showOxxoForm: false,
      adyenPayParam: {},
      payWayNameArr: [],
      toolTipVisible: false,
      email: '',
    };
    this.tid = sessionStorage.getItem("rc-tid");
    this.timer = null;
    this.confirmCardInfo = this.confirmCardInfo.bind(this);
    this.loginDeliveryAddressRef = React.createRef();
    this.loginBillingAddressRef = React.createRef();
    this.lang = process.env.REACT_APP_LANG;

  }
  async componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false;
    }

    //获取支付方式
    const payWay = await getWays();
    let payWayNameArr = []
    if (payWay.context.length > 0) {
      payWayNameArr = payWay.context
        .map((item) => item.payChannelItemList)[0]
        .map((item) => item.code);
      //["adyen_credit_card", "adyen_klarna_slice", "adyen_klarna_pay_now","adyen_klarna_pay_lat""payu","payuoxxo"，"directEbanking"]
    }

    let payMethod = payWayNameArr[0] || "none";//初始化默认取第1个
    //各种支付component初始化方法
    var initPaymentWay = {
      adyen_credit_card: () => {
        setTimeout(() => {
          this.initAdyenPay();
        }, 1000);
      },
      adyen_klarna_slice: () => {
        console.log("initKlarnaSlice");
      },
      adyen_klarna_pay_now: () => {
        this.setState({ paymentTypeVal: "adyenKlarnaPayNow" });
      },
      adyen_klarna_pay_lat: () => {
        this.setState({ paymentTypeVal: "adyenKlarnaPayLater" });
      },
      //Sofort支付
      directEbanking:()=>{
        this.setState({paymentTypeVal:'directEbanking'})
      },
      payu: () => {
        this.setState({ paymentTypeVal: "creditCard" });
      },
      payuoxxo: () => {
        this.setState({ paymentTypeVal: "oxxo" });
      },
      none: () => {
        console.log("no payway");
      },
    };

    //默认第一个,如没有支付方式,就不初始化方法
    this.setState(
      {
        payWayNameArr,
      },
      () => {
        initPaymentWay[payMethod]();
      }
    );

    if (this.isLogin && !this.loginCartData.length) {
      this.props.history.push("/cart");
      return false;
    }
    if (
      !this.isLogin &&
      (!this.cartData.length ||
        !this.cartData.filter((ele) => ele.selected).length)
    ) {
      this.props.history.push("/cart");
      return false;
    }
    let countryRes = await getDictionary({ type: "country" });
    const { creditCardInfo, deliveryAddress, billingAddress } = this.state;

    if (!this.isLogin) {
      let deliveryInfo = store.get("deliveryInfo");
      if (deliveryInfo) {
        creditCardInfo.cardOwner =
          deliveryInfo.deliveryAddress.firstName +
          " " +
          deliveryInfo.deliveryAddress.lastName;
        creditCardInfo.phoneNumber = deliveryInfo.deliveryAddress.phoneNumber;
        this.setState({
          deliveryAddress: deliveryInfo.deliveryAddress,
          billingAddress: deliveryInfo.billingAddress,
          commentOnDelivery: deliveryInfo.commentOnDelivery,
          billingChecked: deliveryInfo.billingChecked,
          creditCardInfo: creditCardInfo,
        });
      } else {
        const defaultCountryId = find(
          countryRes,
          (ele) => ele.name.toLowerCase() == "mexico"
        )
          ? find(countryRes, (ele) => ele.name.toLowerCase() == "mexico").id
          : "";
        deliveryAddress.country = defaultCountryId;
        billingAddress.country = defaultCountryId;
        this.setState({
          deliveryAddress: deliveryAddress,
          billingAddress: billingAddress,
        });
      }
    }

    // fill default subform data
    let cacheSubForm = sessionStorage.getItem("rc-subform");
    if (cacheSubForm) {
      cacheSubForm = JSON.parse(cacheSubForm);
      this.setState({
        subForm: cacheSubForm,
      });
    }
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
    sessionStorage.removeItem("rc-tid");
  }
  get isLogin () {
    return this.props.loginStore.isLogin;
  }
  get cartData () {
    return this.props.checkoutStore.cartData;
  }
  get loginCartData () {
    return this.props.checkoutStore.loginCartData;
  }
  get tradePrice () {
    return this.props.checkoutStore.tradePrice;
  }
  showErrorMsg (msg) {
    this.setState({
      errorShow: true,
      errorMsg: msg,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorShow: false,
      });
    }, 5000);
  }
  validInputsData (data) {
    for (let key in data) {
      const val = data[key];
      const targetRule = find(rules, (ele) => ele.key === key);
      if (targetRule) {
        if (targetRule.require && !val) {
          this.showErrorMsg(
            this.isLogin
              ? this.props.intl.messages.selectDeliveryAddress
              : this.props.intl.messages.CompleteRequiredItems
          );
          return false;
        }
        if (targetRule.regExp && !targetRule.regExp.test(val)) {
          this.showErrorMsg(this.props.intl.messages.EnterCorrectPostCode);
          return false;
        }
      }
    }
  }
  confirmCardInfo () {
    this.setState({
      isCompleteCredit: true,
    });
  }

  //支付1.初始化adyen_credit_card
  initAdyenPay () {
    this.setState({ paymentTypeVal: "adyenCard" });
    if (!!window.AdyenCheckout) {
      //要有值
      const AdyenCheckout = window.AdyenCheckout;
      // (1) Create an instance of AdyenCheckout
      const checkout = new AdyenCheckout({
        environment: "test",
        //originKey: process.env.REACT_APP_AdyenOriginKEY,
        originKey: 'pub.v2.8015632026961356.aHR0cDovL3N5OGg3NS5uYXRhcHBmcmVlLmNj.WCzZPSffL3D1bwvSNcuDqXTEFSqTDfwzlV07G3E6FdY',
        locale: "de-DE",
      });

      // (2). Create and mount the Component
      const card = checkout
        .create("card", {
          hasHolderName: true,
          holderNameRequired: true,
          enableStoreDetails: true,
          styles: {},
          placeholders: {},
          showPayButton: true,
          onSubmit: (state, component) => {
            if (state.isValid) {
              let adyenPayParam = getAdyenParam(card.data);
              this.setState(
                {
                  adyenPayParam,
                },
                () => {
                  this.doGetAdyenPayParam('adyen_credit_card');
                }
              );
            }
          },
          onChange: (state, component) => {

          },
        })
        .mount("#card-container");
    }
  }

  //支付2.初始化KlarnaPayLater
  initKlarnaPayLater = (email) => {
    this.doGetAdyenPayParam('adyen_klarna_pay_lat')
    this.setState({
      email
    })
  }

  //支付3,初始化KlarnaPayNow
  initKlarnaPayNow = (email) => {
    this.doGetAdyenPayParam('adyen_klarna_pay_now')
    this.setState({
      email
    })
  }

  //支付4，初始化sofort
  initSofort=()=>{
    this.doGetAdyenPayParam('sofort')
  }

  /**************支付公共方法start*****************/

  //组装支付共同的参数
  async getAdyenPayParam (type) {
    await this.saveAddressAndComment(); //获取两个addressId
    let obj = await this.getPayCommonParam()
    let commonParameter = obj.commonParameter
    let phone = obj.phone
    let parameters
    /* 组装支付需要的参数 */
    const actions = {
      'adyen_credit_card': () => {
        parameters = Object.assign(
          commonParameter,
          {
            ...this.state.adyenPayParam,
          },
        );
      },
      'adyen_klarna_pay_lat': () => {
        parameters = Object.assign(
          commonParameter,
          {
            adyenType: 'klarna',
            payChannelItem: 'adyen_klarna_pay_lat',
          },
        );
      },
      'adyen_klarna_pay_now': () => {
        parameters = Object.assign(
          commonParameter,
          {
            adyenType: 'klarna_paynow',
            payChannelItem: 'adyen_klarna_pay_now',
          },
        );
      },
      'sofort':() => {
        parameters = Object.assign(
          commonParameter,
          {
            adyenType: 'directEbanking',
            payChannelItem: 'directEbanking',
          },
        );
      }
    }
    actions[type]()
    //合并支付必要的参数
    let finalParam = Object.assign(
      parameters,
      {
        email: this.state.email,
        //successUrl: process.env.REACT_APP_SUCCESSFUL_URL+'/payResult',
        successUrl: 'http://sy8h75.natappfree.cc/payResult',
        shopperLocale: 'en_US',
        currency: 'EUR',
        country: "DE",
        deliveryAddressId: this.state.deliveryAddress.addressId,
        billAddressId: this.state.billingAddress.addressId,
        phone
      }
    )
    return finalParam
  }

  //得到支付共同的参数
  async getPayCommonParam () {
    let commonParameter = await this.goConfirmation(); //获取支付公共参数
    let phone = this.state.billingAddress.phoneNumber; //获取电话号码
    return new Promise((resolve => {
      resolve({ commonParameter, phone })
    }))
  }


  //获取adyen参数
  async doGetAdyenPayParam (type) {
    let parameters = await this.getAdyenPayParam(type)
    this.allAdyenPayment(parameters, type)
  }

  //根据条件-调用不同的支付接口,进行支付
  async allAdyenPayment (parameters, type) {
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
            customerCommitAndPayFun,
          ], //buyWay为once的时候均表示会员正常交易
          [
            { isTid: /^false$/i, isLogin: /^true$/i, buyWay: /^frequency$/ },
            customerCommitAndPayMixFun,
          ],
          [
            { isTid: /^false$/i, isLogin: /^false$/i, buyWay: /.*/ },
            confirmAndCommitFun,
          ],
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

      payFun(this.tid != null, this.isLogin, this.state.subForm.buyWay);

      /* 4)调用支付 */
      const res = await action(parameters);
      if (res.code === "K-000000") {
        let orderNumber
        switch (type) {
          case 'adyen_credit_card':
            orderNumber = res.context[0].tid;
            sessionStorage.setItem("orderNumber", orderNumber);
            this.props.history.push("/confirmation");
            break;
          case 'adyen_klarna_pay_lat':
          case 'adyen_klarna_pay_now':
            orderNumber = res.context.pId;
            window.location.href = res.context.url
            sessionStorage.setItem("orderNumber", orderNumber);
            break;
        }

      }
    } catch (err) {
      if (err.errorData) {
        //err.errorData是返回的tid(订单号)
        this.tid = err.errorData;
      }
      this.showErrorMsg(this.props.intl.messages.adyenPayFail);
    } finally {
      this.endLoading();
    }
  }



  /**************支付公共方法end*****************/


  /**
   * save address/comment
   */
  async saveAddressAndComment () {
    const {
      deliveryAddress,
      billingAddress,
      billingChecked,
      commentOnDelivery,
      creditCardInfo,
    } = this.state;
    let tmpDeliveryAddress = deliveryAddress;
    let tmpBillingAddress = billingAddress;
    if (this.isLogin) {
      const deliveryAddressEl = this.loginDeliveryAddressRef.current;
      let tmpDeliveryAddressData =
        deliveryAddressEl &&
        find(deliveryAddressEl.state.addressList, (ele) => ele.selected);
      // 若用户未存在任何地址，则自动触发保存操作
      if (!tmpDeliveryAddressData) {
        let addressRes = await deliveryAddressEl.handleSave();
        if (!addressRes) {
          return false;
        }
        tmpDeliveryAddressData =
          deliveryAddressEl &&
          find(deliveryAddressEl.state.addressList, (ele) => ele.selected);
      }
      tmpDeliveryAddress = {
        firstName: tmpDeliveryAddressData.firstName,
        lastName: tmpDeliveryAddressData.lastName,
        address1: tmpDeliveryAddressData.address1,
        address2: tmpDeliveryAddressData.address2,
        rfc: tmpDeliveryAddressData.rfc,
        country: tmpDeliveryAddressData.countryId
          ? tmpDeliveryAddressData.countryId.toString()
          : "",
        city: tmpDeliveryAddressData.cityId
          ? tmpDeliveryAddressData.cityId.toString()
          : "",
        postCode: tmpDeliveryAddressData.postCode,
        phoneNumber: tmpDeliveryAddressData.consigneeNumber,
        addressId: tmpDeliveryAddressData.deliveryAddressId,
      };

      if (!billingChecked) {
        const billingAddressEl = this.loginBillingAddressRef.current;
        let tmpBillingAddressData =
          billingAddressEl &&
          find(billingAddressEl.state.addressList, (ele) => ele.selected);
        if (!tmpBillingAddressData) {
          let addressRes = await billingAddressEl.handleSave();
          if (!addressRes) {
            return false;
          }
          tmpBillingAddressData =
            billingAddressEl &&
            find(billingAddressEl.state.addressList, (ele) => ele.selected);
        }
        tmpBillingAddress = {
          firstName: tmpBillingAddressData.firstName,
          lastName: tmpBillingAddressData.lastName,
          address1: tmpBillingAddressData.address1,
          address2: tmpBillingAddressData.address2,
          rfc: tmpBillingAddressData.rfc,
          country: tmpBillingAddressData.countryId
            ? tmpBillingAddressData.countryId.toString()
            : "",
          city: tmpBillingAddressData.cityId
            ? tmpBillingAddressData.cityId.toString()
            : "",
          postCode: tmpBillingAddressData.postCode,
          phoneNumber: tmpBillingAddressData.consigneeNumber,
          addressId: tmpBillingAddressData.deliveryAddressId,
        };
      }
    }
    const param = {
      billingChecked,
      deliveryAddress: tmpDeliveryAddress,
      commentOnDelivery,
    };

    if (billingChecked) {
      param.billingAddress = tmpDeliveryAddress;
    } else {
      param.billingAddress = tmpBillingAddress;
    }
    // 未开启地图，需校验clinic
    if (!this.props.configStore.prescriberMap && (!this.props.clinicStore.clinicId || !this.props.clinicStore.clinicName)
    ) {
      this.showErrorMsg(this.props.intl.messages.selectNoneClincTip);
      return false;
    }

    if (this.validInputsData(param.deliveryAddress) === false) {
      return false;
    }
    if (this.validInputsData(param.billingAddress) === false) {
      return false;
    }

    store.set(this.isLogin ? "loginDeliveryInfo" : "deliveryInfo", param);
    this.setState({
      creditCardInfo: creditCardInfo,
      deliveryAddress: param.deliveryAddress,
      billingAddress: param.billingAddress,
      commentOnDelivery: param.commentOnDelivery,
      billingChecked: param.billingChecked,
    });
  }
  initCardLoginInfo () {
    this.setState({
      creditCardLoginInfo: {
        cardNumber: "",
        cardMmyy: "",
        cardCvv: "",
        cardOwner: "",
        email: "",
        phoneNumber: "",
        identifyNumber: "111",
        isDefault: false,
      },
    });
  }
  startLoading () {
    this.setState({ loading: true });
  }
  endLoading () {
    this.setState({ loading: false });
  }
  async handleClickFurther () {
    if (!this.state.isToPayNow) {
      let tmpRes = await this.saveAddressAndComment();
      if (tmpRes === false) {
        return false;
      }
    }

    if (this.isLogin) {
      // 价格未达到底限，不能下单
      if (this.tradePrice < process.env.REACT_APP_MINIMUM_AMOUNT) {
        window.scrollTo({ behavior: "smooth", top: 0 });
        this.showErrorMsg(
          <FormattedMessage
            id="cart.errorInfo3"
            values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }}
          />
        );
        return false;
      }
      // 存在下架商品，不能下单
      if (this.props.checkoutStore.offShelvesProNames.length) {
        window.scrollTo({ behavior: "smooth", top: 0 });
        this.showErrorMsg(
          <FormattedMessage
            id="cart.errorInfo4"
            values={{
              val: this.props.checkoutStore.offShelvesProNames.join("/"),
            }}
          />
        );
        return false;
      }

      // 库存不够，不能下单
      if (this.props.checkoutStore.outOfstockProNames.length) {
        window.scrollTo({ behavior: "smooth", top: 0 });
        this.showErrorMsg(
          <FormattedMessage
            id="cart.errorInfo2"
            values={{
              val: this.props.checkoutStore.outOfstockProNames.join("/"),
            }}
          />
        );
        return false;
      }

      if (!this.state.selectedCardInfo.cardNumber) {
        this.showErrorMsg(this.props.intl.messages.clickConfirmCvvButton);
        return false;
      }
      let selectedCard = this.state.selectedCardInfo;
      this.startLoading();
      try {
        let res = await axios.post(
          "https://api.paymentsos.com/tokens",
          {
            token_type: "credit_card",
            card_number: selectedCard.cardNumber,
            expiration_date: selectedCard.cardMmyy.replace(/\//, "-"),
            holder_name: selectedCard.cardOwner,
            credit_card_cvv: selectedCard.cardCvv,
          },
          {
            headers: {
              public_key: process.env.REACT_APP_PaymentKEY,
              "x-payments-os-env": process.env.REACT_APP_PaymentENV,
              "Content-type": "application/json",
              app_id: "com.razorfish.dev_mexico",
              "api-version": "1.3.0",
            },
          }
        );
        console.log(res, "res");
        this.setState(
          {
            payosdata: res.data,
            creditCardInfo: Object.assign({}, selectedCard),
          },
          () => {
            this.goConfirmation();
          }
        );
      } catch (err) {
        this.showErrorMsg(err.toString());
        this.endLoading();
      }
    } else {
      this.goConfirmation();
    }
  }
  async goConfirmation () {
    const { history, clinicStore } = this.props;
    let {
      isEighteen,
      isReadPrivacyPolicy,
      deliveryAddress,
      billingAddress,
      commentOnDelivery,
      billingChecked,
      creditCardInfo,
      subForm,
      showOxxoForm,
      paymentTypeVal,
    } = this.state;
    const loginCartData = this.loginCartData;
    const cartData = this.cartData.filter((ele) => ele.selected);
    if (
      (!isEighteen || !isReadPrivacyPolicy) &&
      paymentTypeVal === "creditCard"
    ) {
      this.setState({ isEighteenInit: false, isReadPrivacyPolicyInit: false });
      return false;
    }
    let payosdata = this.state.payosdata;
    if (!payosdata.token && paymentTypeVal === "creditCard") {
      this.showErrorMsg(this.props.intl.messages.clickConfirmCardButton);
      return false;
    }
    this.setState({ loading: true });
    let param = Object.assign(
      {},
      { useDeliveryAddress: billingChecked },
      deliveryAddress
    );
    param.billAddress1 = billingAddress.address1;
    param.billAddress2 = billingAddress.address2;
    param.billCity = billingAddress.city;
    param.billCountry = billingAddress.country;
    param.billFirstName = billingAddress.firstName;
    param.billLastName = billingAddress.lastName;
    param.billPhoneNumber = billingAddress.phoneNumber;
    param.billPostCode = billingAddress.postCode;
    param.rfc = deliveryAddress.rfc;
    param.billRfc = billingAddress.rfc;
    param.email = creditCardInfo.email;
    let param2 = {
      goodsInfos: cartData.map((ele) => {
        return {
          verifyStock: false,
          buyCount: ele.quantity,
          goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId,
        };
      }),
    };
    if (this.isLogin) {
      param2.goodsInfos = loginCartData.map((ele) => {
        return {
          verifyStock: false,
          buyCount: ele.buyCount,
          goodsInfoId: ele.goodsInfoId,
          subscriptionStatus: ele.subscriptionStatus,
        };
      });
    }

    // 拼接promotion参数
    let tradeMarketingList = [];
    let goodsMarketingMap = this.props.checkoutStore.goodsMarketingMap;
    if (goodsMarketingMap && Object.keys(goodsMarketingMap).length) {
      for (let k in goodsMarketingMap) {
        let param = {
          marketingId: "",
          marketingLevelId: "",
          skuIds: [],
          giftSkuIds: [],
        };
        param.skuIds.push(k);
        // marketingType 0-满减fullReductionLevelList-reductionLevelId 1-满折fullDiscountLevelList-discountLevelId
        const tmpMarketing = goodsMarketingMap[k][0];
        let targetLevelId = "";
        if (tmpMarketing.marketingType == 0) {
          targetLevelId =
            tmpMarketing.fullReductionLevelList[0].reductionLevelId;
        } else if (tmpMarketing.marketingType == 1) {
          targetLevelId = tmpMarketing.fullDiscountLevelList[0].discountLevelId;
        }
        param.marketingLevelId = targetLevelId;
        param.marketingId = tmpMarketing.marketingId;
        tradeMarketingList.push(param);
      }
    }
    let param3 = {
      firstName: deliveryAddress.firstName,
      lastName: deliveryAddress.lastName,
      zipcode: deliveryAddress.postCode,
      city: deliveryAddress.city,
      country: payosdata.country_code,
      token: payosdata.token,
      creditDardCvv: payosdata.encrypted_cvv,
      phone: creditCardInfo.phoneNumber,
      email: creditCardInfo.email,
      line1: deliveryAddress.address1,
      line2: deliveryAddress.address2,
      clinicsId: this.props.clinicStore.clinicId,
      clinicsName: this.props.clinicStore.clinicName,
      remark: commentOnDelivery,
      storeId: process.env.REACT_APP_STOREID,
      tradeItems: param2.goodsInfos.map((g) => {
        return {
          num: g.buyCount,
          skuId: g.goodsInfoId,
        };
      }), // once order products
      subTradeItems: [], // subscription order products
      tradeMarketingList,

      last4Digits: payosdata.last_4_digits,
      payAccountName: creditCardInfo.cardOwner,
      payPhoneNumber: creditCardInfo.phoneNumber,

      petsId: "1231",
    };
    try {
      sessionStorage.setItem("rc-paywith-login", this.isLogin);
      if (!this.isLogin) {
        // 登录状态，不需要调用两个接口
        let postVisitorRegisterAndLoginRes = await postVisitorRegisterAndLogin(
          param
        );
        sessionStorage.setItem(
          "rc-token",
          postVisitorRegisterAndLoginRes.context.token
        );
        await batchAdd(param2);
      } else {
        param3.deliveryAddressId = deliveryAddress.addressId;
        param3.billAddressId = billingAddress.addressId;
        if (subForm.buyWay === "frequency") {
          param3.tradeItems = param2.goodsInfos
            .filter((ele) => !ele.subscriptionStatus)
            .map((g) => {
              return {
                num: g.buyCount,
                skuId: g.goodsInfoId,
              };
            });
          param3.subTradeItems = loginCartData
            .filter((ele) => ele.subscriptionStatus)
            .map((g) => {
              return {
                subscribeNum: g.buyCount,
                skuId: g.goodsInfoId,
              };
            });
          param3.cycleTypeId = subForm.frequencyId;
          param3.paymentMethodId = creditCardInfo.id;
        }
      }

      // rePay
      if (this.tid) {
        param3.tid = this.tid;
        delete param3.remark;
        delete param3.tradeItems;
        delete param3.tradeMarketingList;
      }

      if (paymentTypeVal !== "creditCard") {
        return param3;
      } // oxxo get param

      sessionStorage.removeItem("oxxoPayUrl");
      const tmpCommitAndPay = this.isLogin
        ? this.tid
          ? rePay
          : subForm.buyWay === "frequency"
            ? customerCommitAndPayMix
            : customerCommitAndPay
        : confirmAndCommit;
      const confirmAndCommitRes = await tmpCommitAndPay(param3);
      console.log(confirmAndCommitRes);
      const confirmAndCommitResContext = confirmAndCommitRes.context;
      sessionStorage.setItem(
        "orderNumber",
        (confirmAndCommitResContext && confirmAndCommitResContext[0]["tid"]) ||
        this.tid
      );
      sessionStorage.setItem(
        "subNumber",
        (confirmAndCommitResContext &&
          confirmAndCommitResContext[0]["subscribeId"]) ||
        ""
      );
      if (this.state.paymentTypeVal === "creditCard") {
        sessionStorage.setItem(
          "confirmation-info-payment",
          JSON.stringify({
            img: CREDIT_CARD_IMG_ENUM[this.state.payosdata.vendor]
              ? CREDIT_CARD_IMG_ENUM[this.state.payosdata.vendor]
              : "https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg",
            last4Digits: payosdata.last_4_digits,
            payAccountName: creditCardInfo.cardOwner,
            payPhoneNumber: creditCardInfo.phoneNumber,
            email: creditCardInfo.email,
          })
        );
      }
      // update clinic
      clinicStore.removeLinkClinicId();
      clinicStore.removeLinkClinicName();
      clinicStore.setSelectClinicId(this.props.clinicStore.clinicId);
      clinicStore.setSelectClinicName(this.props.clinicStore.clinicName);
      clinicStore.setDefaultClinicId(this.props.clinicStore.clinicId);
      clinicStore.setDefaultClinicName(this.props.clinicStore.clinicName);

      sessionStorage.removeItem("payosdata");
      history.push("/confirmation");
    } catch (e) {
      if (!this.isLogin) {
        sessionStorage.removeItem("rc-token");
      }
      console.log(e);
      if (e.errorData) {
        this.tid = e.errorData;
      }
      this.showErrorMsg(e.message ? e.message.toString() : e.toString());
      this.endLoading();
    }
  }
  cardInfoInputChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfo } = this.state;
    creditCardInfo[name] = value;
    this.inputBlur(e);
    this.setState({ creditCardInfo: creditCardInfo });
  }
  inputBlur (e) {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = findIndex(Array.from(el.classList), (classItem) => {
        return classItem === "invalid-feedback";
      });
      return i > -1;
    })[0];
    if (validDom) {
      validDom.style.display = e.target.value ? "none" : "block";
    }
  }
  commentChange (e) {
    this.setState({ commentOnDelivery: e.target.value });
  }
  cardConfirm () {
    for (let k in this.state.creditCardInfo) {
      if (this.state.creditCardInfo[k] === "") {
        this.showErrorMsg(this.props.intl.messages.CompleteRequiredItems);
        return;
      }
      if (
        k === "email" &&
        !/^\w+([-_.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(
          this.state.creditCardInfo[k].replace(/\s*/g, "")
        )
      ) {
        this.showErrorMsg(this.props.intl.messages.EnterCorrectEmail);
        return;
      }
    }
    this.startLoading();
    document.getElementById("payment-form").submit.click();
    let timer = setInterval(() => {
      try {
        let payosdata = JSON.parse(sessionStorage.getItem("payosdata"));
        if (payosdata) {
          clearInterval(timer);
          this.setState({
            payosdata: payosdata,
            loading: false,
          });
          if (payosdata.category === "client_validation_error") {
            this.setState({
              errorShow: true,
              errorMsg: payosdata.more_info,
            });
            sessionStorage.clear("payosdata");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setTimeout(() => {
              this.setState({
                errorShow: false,
              });
            }, 5000);
            return;
          } else {
            this.setState({
              isCompleteCredit: true,
            });
          }
        }
      } catch (err) {
        this.showErrorMsg(
          sessionStorage.getItem("payosdata")
            ? sessionStorage.getItem("payosdata")
            : err.toString()
        );
        clearInterval(timer);
        this.endLoading();
      }
    }, 1000);
  }
  insertStr (soure, start, newStr) {
    return soure.slice(0, start) + newStr + soure.slice(start);
  }
  retextStr (soure, start, newStr) {
    return soure.slice(0, start) + newStr + soure.slice(start + 1);
  }
  phoneNumberClick (e) {
    let index = e.target.value.indexOf("_");
    e.target.selectionStart = index;
    e.target.selectionEnd = index;
  }
  phoneNumberInput (e, obj, k) {
    let target = e.target;
    let textVal = target.value;
    let oldSelectionStart = target.selectionStart;
    let oldSelectionEnd = target.selectionEnd;
    if (target.value.length < 16) {
      console.log(target.selectionStart, target.selectionEnd);
      if (
        [9, 13].indexOf(oldSelectionStart) !== -1 &&
        [9, 13].indexOf(oldSelectionEnd) !== -1
      ) {
        target.value = this.retextStr(target.value, oldSelectionStart - 1, "");
        console.log(target.value, target.selectionStart - 1);
        target.value = this.insertStr(target.value, oldSelectionStart - 1, "_");
        console.log(target.value, target.selectionStart - 1);
        target.value = this.insertStr(target.value, oldSelectionStart, " ");

        target.selectionStart = oldSelectionStart - 1;
        target.selectionEnd = oldSelectionEnd - 1;
      } else if (oldSelectionStart === 5 && oldSelectionEnd === 5) {
        target.value = this.insertStr(target.value, target.selectionStart, " ");
        target.selectionStart = oldSelectionStart + 1;
        target.selectionEnd = oldSelectionEnd + 1;
      } else {
        target.value = this.insertStr(target.value, target.selectionStart, "_");
        target.selectionStart = oldSelectionStart;
        target.selectionEnd = oldSelectionEnd;
      }
      console.log(target.selectionStart, target.selectionEnd);
    } else if (target.value.length > 16) {
      console.log(target.selectionStart, target.selectionEnd);
      // messageDom.style.display = 'none'
      if (
        [9, 13].indexOf(oldSelectionStart) !== -1 &&
        [9, 13].indexOf(oldSelectionEnd) !== -1
      ) {
        target.value = this.retextStr(target.value, target.selectionStart, "");
        target.selectionStart = oldSelectionStart + 1;
        target.selectionEnd = oldSelectionEnd + 1;
      } else {
        target.value = this.retextStr(target.value, target.selectionStart, "");
        target.selectionStart = oldSelectionStart;
        target.selectionEnd = oldSelectionEnd;
      }
      console.log(target.selectionStart, target.selectionEnd);
    }
    target.value = target.value.slice(0, 16);
    obj[k] = target.value;
  }
  billingCheckedChange () {
    let { billingChecked } = this.state;
    this.setState({ billingChecked: !billingChecked });
    if (!billingChecked) {
      this.setState({
        billingAddress: this.state.deliveryAddress,
      });
    }
  }
  savePromotionCode (promotionCode) {
    this.setState({
      promotionCode,
    });
  }
  handlePaymentTypeChange (e) {
    this.setState(
      {
        paymentTypeVal: e.target.value,
      },
    );
  }
  render () {
    const { deliveryAddress, billingAddress, creditCardInfo } = this.state;
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
          <img key={idx} className="logo-payment-card" src={el} />
        ))}
      </span>
    );
    const event = {
      page: {
        type: "Checkout",
        theme: "",
      },
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
        <main
          className="rc-content--fixed-header rc-bg-colour--brand4"
          id="payment"
        >
          <div
            id="checkout-main"
            className="rc-bottom-spacing data-checkout-stage rc-max-width--lg"
          >
            <Progress type="payment" />
            <div className="rc-layout-container rc-three-column rc-max-width--xl">
              <div className="rc-column rc-double-width shipping__address">
                <div
                  className={`rc-padding-bottom--xs cart-error-messaging cart-error ${
                    this.state.errorShow ? "" : "hidden"
                    }`}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close"
                    role="alert"
                  >
                    {this.state.errorMsg}
                  </aside>
                </div>
                {this.state.isToPayNow ? (
                  <AddressPreview info={store.get("loginDeliveryInfo")} />
                ) : (
                    <>
                      <div className="shipping-form">
                        <div className="bg-transparent">
                          <ClinicForm history={this.props.history} />
                          <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
                            {this.isLogin ? (
                              <LoginDeliveryAddress
                                id="1"
                                ref={this.loginDeliveryAddressRef}
                              />
                            ) : (
                                <UnloginDeliveryAddress
                                  data={deliveryAddress}
                                  updateData={(data) => {
                                    this.setState({
                                      deliveryAddress: data,
                                    });
                                  }}
                                />
                              )}
                            {/* 标记 */}

                            <div className="billingCheckbox rc-margin-top--xs">
                              <div>
                                <input
                                  className="form-check-input"
                                  id="id-checkbox-billing"
                                  value="Cat"
                                  type="checkbox"
                                  onChange={() => this.billingCheckedChange()}
                                  checked={this.state.billingChecked}
                                  style={{ width: "17px", height: "17px" }}
                                />
                                <label
                                  className="rc-input__label--inline"
                                  htmlFor="id-checkbox-billing"
                                >
                                  <FormattedMessage id="biliingAddressSameAs" />
                                </label>
                              </div>
                              <div className=" normalDelivery">
                                <span>
                                  <FormattedMessage id="payment.normalDelivery2" />
                                </span>
                                <span className="text-muted arrival-time">
                                  <FormattedMessage id="payment.normalDelivery3" />
                                </span>

                                <span
                                  className="shipping-method-pricing ml3"

                                >
                                  <span
                                    className="info delivery-method-tooltip"
                                    // data-tooltip-placement="top"
                                    // data-tooltip="top-tooltip-delivery-tip"
                                    style={{ verticalAlign: "unset" }}
                                    onMouseEnter={() => {
                                      this.setState({
                                        toolTipVisible: true,
                                      });
                                    }}
                                    onMouseLeave={() => {
                                      this.setState({
                                        toolTipVisible: false,
                                      });
                                    }}
                                  >
                                    i
                                </span>
                                  <ConfirmTooltip
                                    containerStyle={{
                                      transform: "translate(-65%, 112%)",
                                    }}

                                    arrowStyle={{ left: "92%" }}
                                    display={this.state.toolTipVisible}
                                    cancelBtnVisible={false}
                                    confirmBtnVisible={false}
                                    updateChildDisplay={(status) =>
                                      this.setState({
                                        toolTipVisible: status,
                                      })
                                    }
                                    content={
                                      <FormattedMessage id="payment.forFreeTip" />
                                    }
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          {!this.state.billingChecked && (
                            <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
                              <div
                                className="card-header bg-transparent position-relative pt-0 pb-0"
                                style={{ zIndex: 2, width: "62%" }}
                              >
                                <h5>
                                  <i className="rc-icon rc-news--xs rc-iconography" />{" "}
                                  <FormattedMessage id="payment.billTitle" />
                                </h5>
                              </div>
                              {this.isLogin ? (
                                <LoginDeliveryAddress
                                  id="2"
                                  type="billing"
                                  ref={this.loginBillingAddressRef}
                                  visible={!this.state.billingChecked}
                                />
                              ) : (
                                  <BillingAddressForm
                                    data={billingAddress}
                                    billingChecked={this.state.billingChecked}
                                    updateData={(data) => {
                                      this.setState({
                                        billingAddress: data,
                                      });
                                    }}
                                  />
                                )}
                            </div>
                          )}
                          {/* 标记 */}
                          {/* <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3"> */}
                          {/* <div className="card-header bg-transparent pt-0 pb-0">
                              <h5>
                                <i className="rc-icon rc-delivery--sm rc-iconography" style={{ transform: 'scale(.9)' }}></i>{' '}
                                <FormattedMessage id="payment.howToDelivery" />
                              </h5>
                            </div>

                          </div> */}
                          {/* <fieldset className="shipping-method-block rc-fieldset">
                          </fieldset> */}
                          {/* <div className="card">
                            <div className="card-header bg-transparent">
                              <h5>
                                <FormattedMessage id="payment.commentOnDelivery" />
                              </h5>
                            </div>
                            <span
                              className="rc-input nomaxwidth rc-border-all rc-border-colour--interface rc-input--full-width"
                              input-setup="true"
                            >
                              <textarea
                                className="rc-input__textarea noborder"
                                maxLength="1000"
                                name="dwfrm_shipping_shippingAddress_deliveryComment"
                                id="delivery-comment"
                                value={this.state.commentOnDelivery}
                                onChange={(e) => this.commentChange(e)}
                              ></textarea>
                              <label
                                className="rc-input__label"
                                htmlFor="delivery-comment"
                              ></label>
                            </span>
                          </div>
                         */}
                        </div>
                      </div>
                      {this.isLogin &&
                        find(
                          this.loginCartData,
                          (ele) => ele.subscriptionStatus
                        ) ? (
                          <div className="card-panel checkout--padding rc-bg-colour--brand3 rounded mb-3">
                            <div className="card-header bg-transparent pt-0 pb-0">
                              <h5>
                                <span className="iconfont font-weight-bold mr-2">
                                  &#xe657;
                            </span>
                                <FormattedMessage id="subscription.chooseSubscription" />
                              </h5>
                            </div>
                            <SubscriptionSelect
                              updateSelectedData={(data) => {
                                //let isShowValidCode = this.refs.payProductInfo.state.isShowValidCode
                                this.refs.payProductInfo.setState({
                                  isShowValidCode: false,
                                });
                                this.props.frequencyStore.updateBuyWay(data.buyWay);
                                this.props.frequencyStore.updateFrequencyName(
                                  data.frequencyName
                                );
                                if (
                                  data.buyWay === "frequency" &&
                                  this.state.paymentTypeVal === "oxxo"
                                ) {
                                  this.setState({
                                    paymentTypeVal: "creditCard",
                                  });
                                }
                                this.setState(
                                  {
                                    subForm: data,
                                  },
                                  () => {
                                    this.state.subForm.buyWay == "once"
                                      ? this.props.checkoutStore.updateLoginCart(
                                        this.state.promotionCode,
                                        false
                                      )
                                      : this.props.checkoutStore.updateLoginCart(
                                        this.state.promotionCode,
                                        true
                                      );
                                  }
                                );
                              }}
                            />
                          </div>
                        ) : null}
                    </>
                  )}
                <div className="card-panel checkout--padding pl-0 pr-0 rc-bg-colour--brand3 rounded pb-0">
                  <h5 className="ml-custom mr-custom">
                    <i
                      class="rc-icon rc-payment--sm rc-iconography"
                      style={{ transform: "scale(.9)" }}
                    ></i>{" "}
                    <FormattedMessage id="payment.paymentInformation" />
                  </h5>
                  <div className="ml-custom mr-custom">
                    <div
                      class="rc-input rc-input--inline"
                      style={{
                        display:
                          this.state.payWayNameArr.indexOf("payu") != -1
                            ? "inline-block"
                            : "none",
                      }}
                    >
                      {this.state.paymentTypeVal === "creditCard" ? (
                        <input
                          class="rc-input__radio"
                          id="payment-info-creditCard"
                          value="creditCard"
                          type="radio"
                          name="payment-info"
                          onChange={(event) =>
                            this.handlePaymentTypeChange(event)
                          }
                          checked
                          key={1}
                        />
                      ) : (
                          <input
                            class="rc-input__radio"
                            id="payment-info-creditCard"
                            value="creditCard"
                            type="radio"
                            name="payment-info"
                            onChange={(event) =>
                              this.handlePaymentTypeChange(event)
                            }
                            key={2}
                          />
                        )}
                      <label
                        class="rc-input__label--inline"
                        for="payment-info-creditCard"
                      >
                        <FormattedMessage id="creditCard" />
                      </label>
                    </div>
                    {this.state.subForm.buyWay !== "frequency" && (
                      <div
                        class="rc-input rc-input--inline"
                        style={{
                          display:
                            this.state.payWayNameArr.indexOf("payuoxxo") != -1
                              ? "inline-block"
                              : "none",
                        }}
                      >
                        {this.state.paymentTypeVal === "oxxo" ? (
                          <input
                            class="rc-input__radio"
                            id="payment-info-oxxo"
                            value="oxxo"
                            type="radio"
                            name="payment-info"
                            onChange={(event) =>
                              this.handlePaymentTypeChange(event)
                            }
                            checked
                            key={3}
                          />
                        ) : (
                            <input
                              class="rc-input__radio"
                              id="payment-info-oxxo"
                              value="oxxo"
                              type="radio"
                              name="payment-info"
                              onChange={(event) =>
                                this.handlePaymentTypeChange(event)
                              }
                              key={4}
                            />
                          )}

                        <label
                          class="rc-input__label--inline"
                          for="payment-info-oxxo"
                        >
                          <FormattedMessage id="oxxo" />
                        </label>
                      </div>
                    )}
                    <div
                      class="rc-input rc-input--inline"
                      style={{
                        display:
                          this.state.payWayNameArr.indexOf(
                            "adyen_credit_card"
                          ) != -1
                            ? "inline-block"
                            : "none",
                      }}
                    >
                      {this.state.paymentTypeVal === "adyenCard" ? (
                        <input
                          class="rc-input__radio"
                          id="payment-info-adyen"
                          value="adyenCard"
                          type="radio"
                          name="payment-info"
                          onChange={(event) =>
                            this.handlePaymentTypeChange(event)
                          }
                          checked
                          key={5}
                        />
                      ) : (
                          <input
                            class="rc-input__radio"
                            id="payment-info-adyen"
                            value="adyenCard"
                            type="radio"
                            name="payment-info"
                            onChange={(event) =>
                              this.handlePaymentTypeChange(event)
                            }
                            key={6}
                          />
                        )}

                      <label
                        class="rc-input__label--inline"
                        for="payment-info-adyen"
                      >
                        <FormattedMessage id="adyen" />
                      </label>
                    </div>
                    {/* adyen_klarna_pay_lat */}
                    <div
                      class="rc-input rc-input--inline"
                      style={{
                        display:
                          this.state.payWayNameArr.indexOf(
                            "adyen_klarna_pay_lat"
                          ) != -1
                            ? " "
                            : "none",
                      }}
                    >
                      {this.state.paymentTypeVal === "adyenKlarnaPayLater" ? (
                        <input
                          class="rc-input__radio"
                          id="payment-info-adyen-klarna-pay-later"
                          value="adyenKlarnaPayLater"
                          type="radio"
                          name="payment-info"
                          onChange={(event) =>
                            this.handlePaymentTypeChange(event)
                          }
                          checked
                          key={7}
                        />
                      ) : (
                          <input
                            class="rc-input__radio"
                            id="payment-info-adyen-klarna-pay-later"
                            value="adyenKlarnaPayLater"
                            type="radio"
                            name="payment-info"
                            onChange={(event) =>
                              this.handlePaymentTypeChange(event)
                            }
                            key={8}
                          />
                        )}

                      <label
                        class="rc-input__label--inline"
                        for="payment-info-adyen-klarna-pay-later"
                      >
                        <FormattedMessage id="adyenPayLater" />
                      </label>
                    </div>
                    {/* KlarnaPayNow */}
                    <div
                      class="rc-input rc-input--inline"
                      style={{
                        display:
                          this.state.payWayNameArr.indexOf(
                            "adyen_klarna_pay_now"
                          ) != -1
                            ? " "
                            : "none",
                      }}
                    >
                      {this.state.paymentTypeVal === "adyenKlarnaPayNow" ? (
                        <input
                          class="rc-input__radio"
                          id="payment-info-adyen-klarna-pay-now"
                          value="adyenKlarnaPayNow"
                          type="radio"
                          name="payment-info"
                          onChange={(event) =>
                            this.handlePaymentTypeChange(event)
                          }
                          checked
                          key={7}
                        />
                      ) : (
                          <input
                            class="rc-input__radio"
                            id="payment-info-adyen-klarna-pay-now"
                            value="adyenKlarnaPayNow"
                            type="radio"
                            name="payment-info"
                            onChange={(event) =>
                              this.handlePaymentTypeChange(event)
                            }
                            key={8}
                          />
                        )}

                      <label
                        class="rc-input__label--inline"
                        for="payment-info-adyen-klarna-pay-now"
                      >
                        <FormattedMessage id="adyenPayNow" />
                      </label>
                    </div>
                    {/* Sofort */}
                    <div
                      class="rc-input rc-input--inline"
                      style={{
                        display:
                          this.state.payWayNameArr.indexOf(
                            "directEbanking"
                          ) != -1
                            ? " "
                            : "none",
                      }}
                    >
                      {this.state.paymentTypeVal === "directEbanking" ? (
                        <input
                          class="rc-input__radio"
                          id="payment-info-adyen-sofort"
                          value="directEbanking"
                          type="radio"
                          name="payment-info"
                          onChange={(event) =>
                            this.handlePaymentTypeChange(event)
                          }
                          checked
                          key={9}
                        />
                      ) : (
                          <input
                            class="rc-input__radio"
                            id="payment-info-adyen-sofort"
                            value="directEbanking"
                            type="radio"
                            name="payment-info"
                            onChange={(event) =>
                              this.handlePaymentTypeChange(event)
                            }
                            key={10}
                          />
                        )}

                      <label
                        class="rc-input__label--inline"
                        for="payment-info-adyen-sofort"
                      >
                        <FormattedMessage id="Sofort" />
                      </label>
                    </div>
                  </div>

                  {this.state.paymentTypeVal === "oxxo" && (
                    <OxxoConfirm
                      history={this.props.history}
                      getParameter={() => this.goConfirmation()}
                      startLoading={() => this.startLoading()}
                      endLoading={() => this.endLoading()}
                    />
                  )}
                  <div
                    className={`${
                      this.state.paymentTypeVal === "creditCard" ? "" : "hidden"
                      }`}
                  >
                    <div className="card payment-form ml-custom mr-custom Card-border p-3 rounded rc-border-all rc-border-colour--interface">
                      <div className="card-body rc-padding--none">
                        <form
                          method="POST"
                          data-address-mode="new"
                          name="dwfrm_billing"
                          id="dwfrm_billing"
                        >
                          <div className="billing-payment">
                            <div
                              className={`rc-list__accordion-item border-0`}
                              data-method-id="CREDIT_CARD"
                            >
                              {this.isLogin ? (
                                <div className="rc-border-colour--interface">
                                  <PaymentComp
                                    cardOwner={
                                      deliveryAddress.firstName +
                                      "" +
                                      deliveryAddress.lastName
                                    }
                                    phoneNumber={creditCardInfo.phoneNumber}
                                    getSelectedValue={(cardItem) => {
                                      this.setState({
                                        selectedCardInfo: cardItem,
                                      });
                                    }}
                                  />
                                </div>
                              ) : (
                                  <div
                                  // className={`rc-border-all rc-border-colour--interface ${
                                  //   !this.state.isCompleteCredit
                                  //     ? "checkout--padding"
                                  //     : ""
                                  //   }`}
                                  >
                                    <div
                                      className={`credit-card-content ${
                                        !this.state.isCompleteCredit
                                          ? ""
                                          : "hidden"
                                        }`}
                                      id="credit-card-content"
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
                                                  <span style={{ color: "red" }}>
                                                    *
                                                </span>
                                                  {CreditCardImg}

                                                  <form id="payment-form">
                                                    <div id="card-secure-fields"></div>
                                                    <button
                                                      id="submit"
                                                      name="submit"
                                                      className="creadit"
                                                      type="submit"
                                                    >
                                                      Pay
                                                  </button>
                                                  </form>
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
                                                    id="cardholder-name"
                                                    className="rc-input__control form-control cardOwner"
                                                    name="cardOwner"
                                                    value={
                                                      creditCardInfo.cardOwner
                                                    }
                                                    onChange={(e) =>
                                                      this.cardInfoInputChange(e)
                                                    }
                                                    onBlur={(e) =>
                                                      this.inputBlur(e)
                                                    }
                                                    maxLength="40"
                                                  />
                                                  <label
                                                    className="rc-input__label"
                                                    htmlFor="cardOwner"
                                                  ></label>
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
                                                    value={creditCardInfo.email}
                                                    onChange={(e) =>
                                                      this.cardInfoInputChange(e)
                                                    }
                                                    onBlur={(e) =>
                                                      this.inputBlur(e)
                                                    }
                                                    name="email"
                                                    maxLength="254"
                                                  />
                                                  <label
                                                    className="rc-input__label"
                                                    htmlFor="email"
                                                  ></label>
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
                                                    data-js-pattern="(^\d{10}$)"
                                                    data-range-error="The phone number should contain 10 digits"
                                                    value={
                                                      creditCardInfo.phoneNumber
                                                    }
                                                    onChange={(e) =>
                                                      this.cardInfoInputChange(e)
                                                    }
                                                    onBlur={(e) =>
                                                      this.inputBlur(e)
                                                    }
                                                    name="phoneNumber"
                                                    maxLength="2147483647"
                                                  />
                                                  <label
                                                    className="rc-input__label"
                                                    htmlFor="phoneNumber"
                                                  ></label>
                                                </span>
                                                <div className="invalid-feedback">
                                                  <FormattedMessage id="payment.errorInfo2" />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-sm-12 rc-margin-y--xs rc-text--center">
                                            <button
                                              className="rc-btn rc-btn--two card-confirm"
                                              id="card-confirm"
                                              type="button"
                                              onClick={() => this.cardConfirm()}
                                            >
                                              <FormattedMessage id="payment.confirmCard" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className={`creditCompleteInfoBox pb-3 ${
                                        !this.state.isCompleteCredit
                                          ? "hidden"
                                          : ""
                                        }`}
                                    >
                                      <p>
                                        <span
                                          className="pull-right ui-cursor-pointer-pure mr-2"
                                          onClick={() => {
                                            this.setState({
                                              isCompleteCredit: false,
                                            });
                                          }}
                                          style={{
                                            position: "relative",
                                            top: -9,
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
                                                this.state.payosdata.vendor
                                              ]
                                                ? CREDIT_CARD_IMG_ENUM[
                                                this.state.payosdata.vendor
                                                ]
                                                : "https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                                            }
                                          />
                                        </div>
                                        <div className="col-12 col-sm-9 d-flex flex-column justify-content-around">
                                          <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                                            <div className="col-12 color-999">
                                              <FormattedMessage id="name2" />
                                              <br />
                                              <span className="creditCompleteInfo">
                                                {creditCardInfo.cardOwner}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                                            <div className="col-6 color-999">
                                              <FormattedMessage id="payment.cardNumber2" />
                                              <br />
                                              <span className="creditCompleteInfo">
                                                xxxx xxxx xxxx{" "}
                                                {this.state.payosdata
                                                  ? this.state.payosdata
                                                    .last_4_digits
                                                  : ""}
                                              </span>
                                            </div>
                                            <div className="col-6 color-999">
                                              <FormattedMessage id="payment.cardType" />
                                              <br />
                                              <span className="creditCompleteInfo">
                                                {this.state.payosdata.card_type}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* 条款 */}
                    <div
                      className="footerCheckbox rc-margin-top--sm ml-custom mr-custom"
                      style={{ marginTop: "1rem" }}
                    >
                      <input
                        style={{ cursor: "pointer" }}
                        className="form-check-input"
                        id="id-checkbox-cat-2"
                        value=""
                        type="checkbox"
                        name="checkbox-2"
                        onChange={() => {
                          this.setState({
                            isReadPrivacyPolicy: !this.state
                              .isReadPrivacyPolicy,
                            isReadPrivacyPolicyInit: false,
                          });
                        }}
                        checked={this.state.isReadPrivacyPolicy}
                      />
                      <label
                        htmlFor="id-checkbox-cat-2"
                        className="rc-input__label--inline"
                        style={{ cursor: "pointer" }}
                      >
                        <FormattedMessage
                          id="payment.confirmInfo3"
                          values={{
                            val1: (
                              <Link
                                className="red"
                                target="_blank"
                                to="/privacypolicy"
                              >
                                Política de privacidad
                              </Link>
                            ),
                            val2: (
                              <Link
                                className="red"
                                target="_blank"
                                to="/termuse"
                              >
                                la transferencia transfronteriza
                              </Link>
                            ),
                          }}
                        />
                        <div
                          className="warning"
                          style={{
                            display:
                              this.state.isReadPrivacyPolicy ||
                                this.state.isReadPrivacyPolicyInit
                                ? "none"
                                : "block",
                          }}
                        >
                          <FormattedMessage id="payment.confirmInfo4" />
                        </div>
                      </label>
                    </div>
                    {/* none */}
                    {process.env.REACT_APP_LANG == "de" ? null : (
                      <div className="footerCheckbox ml-custom mr-custom">
                        <input
                          className="form-check-input"
                          id="id-checkbox-cat-1"
                          value="Cat"
                          type="checkbox"
                          name="checkbox-2"
                          onChange={() => {
                            this.setState({
                              isEighteen: !this.state.isEighteen,
                              isEighteenInit: false,
                            });
                          }}
                          checked={this.state.isEighteen}
                          style={{ cursor: "pointer" }}
                        />
                        <label
                          htmlFor="id-checkbox-cat-1"
                          className="rc-input__label--inline"
                          style={{ cursor: "pointer" }}
                        >
                          <FormattedMessage id="payment.confirmInfo1" />
                          <div
                            className="warning"
                            style={{
                              display:
                                this.state.isEighteen ||
                                  this.state.isEighteenInit
                                  ? "none"
                                  : "block",
                            }}
                          >
                            <FormattedMessage id="login.secondCheck" />
                          </div>
                        </label>
                      </div>
                    )}
                    {/* the end */}
                    <div className="place_order-btn card rc-bg-colour--brand4 pt-4">
                      <div className="next-step-button">
                        <div className="rc-text--right">
                          <button
                            className="rc-btn rc-btn--one submit-payment"
                            type="submit"
                            name="submit"
                            value="submit-shipping"
                            onClick={() => this.handleClickFurther()}
                          >
                            <FormattedMessage id="payment.further" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* adyenCreditCard */}
                  <div
                    className={`${
                      this.state.paymentTypeVal === "adyenCard" ? "" : "hidden"
                      }`}
                  >
                    <div class="payment-method checkout--padding">
                      <div
                        id="card-container"
                        class="payment-method__container"
                      >
                      </div>
                    </div>
                  </div>
                  {/* KlarnaPayLater */}
                  <div
                    className={`${
                      this.state.paymentTypeVal === "adyenKlarnaPayLater" ? "" : "hidden"
                      }`}
                  >
                    <KlarnaPayLater clickPay={this.initKlarnaPayLater} />
                  </div>
                  {/* KlarnaPayNow  */}
                  <div
                    className={`${
                      this.state.paymentTypeVal === "adyenKlarnaPayNow" ? "" : "hidden"
                      }`}
                  >
                    <KlarnaPayNow clickPay={this.initKlarnaPayNow} />
                  </div>
                  {/* Sofort */}
                  <div
                    className={`${
                      this.state.paymentTypeVal === "directEbanking" ? "" : "hidden"
                      }`}
                  >
                    <Sofort clickPay={this.initSofort} />
                  </div>
                </div>
              </div>
              <div className="rc-column pl-md-0">
                <PayProductInfo
                  ref="payProductInfo"
                  history={this.props.history}
                  frequencyName={this.state.subForm.frequencyName}
                  buyWay={this.state.subForm.buyWay}
                  sendPromotionCode={(e) => this.savePromotionCode(e)}
                  promotionCode={this.state.promotionCode}
                  operateBtnVisible={!this.state.isToPayNow}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default injectIntl(Payment);
