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
import AddressPreview from "@/components/AddressPreview";
import visaImg from "@/assets/images/credit-cards/visa.svg";
import amexImg from "@/assets/images/credit-cards/amex.svg";
import mastercardImg from "@/assets/images/credit-cards/mastercard.svg";
import discoverImg from "@/assets/images/credit-cards/discover.svg";
import { getDictionary, formatMoney } from "@/utils/utils";
import {
  postVisitorRegisterAndLogin,
  batchAdd,
  confirmAndCommit,
  customerCommitAndPay,
  rePay,
  customerCommitAndPayMix
} from "@/api/payment";
import PaymentComp from "@/components/PaymentComp";
import store from "storejs";
import axios from "axios";
import "./index.css";
import OxxoConfirm from "./modules/OxxoConfirm";

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

@inject("loginStore", "checkoutStore", "clinicStore", "frequencyStore")
@observer
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotionCode: '',
      billingChecked: true,
      isCompleteCredit: false,
      showPayMethodError: false,
      isReadPrivacyPolicyInit: true,
      isEighteenInit: true,
      isReadPrivacyPolicy: false,
      isEighteen: false,
      creditCardImgUrl: [visaImg, amexImg, mastercardImg],
      creditCardImgObj: {
        VISA: visaImg,
        MASTERCARD: mastercardImg,
        "AMERICAN EXPRESS": amexImg,
        DISCOVER: discoverImg,
      },
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
      errorShow: false,
      errorMsg: "",
      commentOnDelivery: "",
      currentProduct: null,
      loading: false,
      modalShow: false,
      payosdata: {},
      selectedCardInfo: {},
      isToPayNow: sessionStorage.getItem("rc-tid"),
      showOxxoForm: false
    };
    this.tid = sessionStorage.getItem("rc-tid");
    this.timer = null;
    this.confirmCardInfo = this.confirmCardInfo.bind(this);
    this.loginDeliveryAddressRef = React.createRef();
    this.loginBillingAddressRef = React.createRef();
  }
  async componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false;
    }

    if (this.isLogin && !this.loginCartData.length) {
      this.props.history.push("/cart");
    }
    if (
      !this.isLogin &&
      (!this.cartData.length ||
        !this.cartData.filter((ele) => ele.selected).length)
    ) {
      this.props.history.push("/cart");
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
    return this.props.checkoutStore.tradePrice
  }
  showErrorMsg (msg) {
    this.setState({
      errorShow: true,
      errorMsg: msg
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        errorShow: false
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
      isCompleteCredit: true
    });
  }
  /**
   * save address/comment
   */
  async saveAddressAndComment () {
    const {
      deliveryAddress,
      billingAddress,
      billingChecked,
      commentOnDelivery,
      creditCardInfo
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
        isDefault: false
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
        window.scrollTo({ behavior: "smooth", top: 0 })
        this.showErrorMsg(<FormattedMessage id="cart.errorInfo3" values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }} />)
        return false
      }
      // 存在下架商品，不能下单
      if (this.props.checkoutStore.offShelvesProNames.length) {
        window.scrollTo({ behavior: "smooth", top: 0 })
        this.showErrorMsg(<FormattedMessage id="cart.errorInfo4"
          values={{ val: this.props.checkoutStore.offShelvesProNames.join('/') }} />)
        return false
      }

      // 库存不够，不能下单
      if (this.props.checkoutStore.outOfstockProNames.length) {
        window.scrollTo({ behavior: "smooth", top: 0 })
        this.showErrorMsg(<FormattedMessage id="cart.errorInfo2"
          values={{ val: this.props.checkoutStore.outOfstockProNames.join('/') }} />)
        return false
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
            creditCardInfo: Object.assign({}, selectedCard)
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
    } = this.state;
    const loginCartData = this.loginCartData;
    const cartData = this.cartData.filter((ele) => ele.selected);
    if ((!isEighteen || !isReadPrivacyPolicy) && !showOxxoForm) {
      this.setState({ isEighteenInit: false, isReadPrivacyPolicyInit: false });
      return false;
    }
    let payosdata = this.state.payosdata;
    if (!payosdata.token && !showOxxoForm) {
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
          goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId
        };
      }),
    };
    if (this.isLogin) {
      param2.goodsInfos = loginCartData.map((ele) => {
        return {
          verifyStock: false,
          buyCount: ele.buyCount,
          goodsInfoId: ele.goodsInfoId,
          subscriptionStatus: ele.subscriptionStatus
        };
      });
    }

    // 拼接promotion参数
    let tradeMarketingList = [];
    let goodsMarketingMap = this.props.checkoutStore.goodsMarketingMap;
    if (Object.keys(goodsMarketingMap).length) {
      tradeMarketingList.push({
        marketingId: [],
        marketingLevelId: [],
        skuIds: [],
        giftSkuIds: [],
      });
      for (let k in goodsMarketingMap) {
        const firstList = tradeMarketingList[0]
        firstList.skuIds.push(k);
        // marketingType 0-满减fullReductionLevelList-reductionLevelId 1-满折fullDiscountLevelList-discountLevelId
        const tmpMarketing = goodsMarketingMap[k][0]
        let targetLevelId = ''
        if (tmpMarketing.marketingType == 0) {
          targetLevelId = tmpMarketing.fullReductionLevelList[0].reductionLevelId
        } else if (tmpMarketing.marketingType == 1) {
          targetLevelId = tmpMarketing.fullDiscountLevelList[0].discountLevelId
        }
        firstList.marketingLevelId.push(targetLevelId)
        firstList.marketingId.push(tmpMarketing.marketingId)
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

      petsId: "1231"
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
            .filter(ele => !ele.subscriptionStatus)
            .map(g => {
              return {
                num: g.buyCount,
                skuId: g.goodsInfoId
              };
            });
          param3.subTradeItems = loginCartData
            .filter(ele => ele.subscriptionStatus)
            .map(g => {
              return {
                subscribeNum: g.buyCount,
                skuId: g.goodsInfoId
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

      if (showOxxoForm) {
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
            loading: false
          });
          if (payosdata.category === "client_validation_error") {
            this.setState({
              errorShow: true,
              errorMsg: payosdata.more_info
            });
            sessionStorage.clear("payosdata");
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            setTimeout(() => {
              this.setState({
                errorShow: false
              });
            }, 5000);
            return;
          } else {
            this.setState({
              isCompleteCredit: true
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
  handleClickEditClinic (e) {
    e.preventDefault();
    sessionStorage.setItem("clinic-reselect", true);
    this.props.history.push("/prescription");
  }
  savePromotionCode (promotionCode) {
    this.setState({
      promotionCode
    })
  }
  render () {
    const { deliveryAddress, billingAddress, creditCardInfo } = this.state;
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {this.state.creditCardImgUrl.map((el, idx) => (
          <img key={idx} className="logo-payment-card" src={el} />
        ))}
      </span>
    );
    const event = {
      page: {
        type: "Checkout",
        theme: ""
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
          className="rc-content--fixed-header rc-bg-colour--brand3"
          id="payment"
        >
          <div
            id="checkout-main"
            className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
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
                  <AddressPreview />
                ) : (
                    <>
                      <div className="shipping-form">
                        <div className="card">
                          <div className="card-header">
                            <h5 className="pull-left">
                              {this.isLogin ? (
                                <FormattedMessage id="payment.clinicTitle2" />
                              ) : (
                                  <FormattedMessage id="payment.clinicTitle" />
                                )}
                            </h5>
                            <p
                              onClick={(e) => this.handleClickEditClinic(e)}
                              className="rc-styled-link rc-margin-top--xs pull-right m-0">
                              <FormattedMessage id="edit" />
                            </p>
                          </div>
                          <div className="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                            {this.props.clinicStore.clinicName}
                          </div>
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
                          <div
                            className="card-header"
                            style={{ zIndex: 2, width: "62%" }}
                          >
                            <h5>
                              <FormattedMessage id="payment.billTitle" />
                            </h5>
                            <div className="billingCheckbox rc-margin-top--xs">
                              <input
                                className="form-check-input"
                                id="id-checkbox-billing"
                                value="Cat"
                                type="checkbox"
                                onChange={() => this.billingCheckedChange()}
                                checked={this.state.billingChecked}
                              />
                              <label
                                className="rc-input__label--inline"
                                htmlFor="id-checkbox-billing"
                              >
                                <FormattedMessage id="payment.useDeliveryAddress" />
                              </label>
                            </div>
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

                          <fieldset className="shipping-method-block rc-fieldset">
                            <div className="card-header">
                              <h5>
                                <FormattedMessage id="payment.howToDelivery" />
                              </h5>
                            </div>
                            <div>
                              <div className="leading-lines shipping-method-list rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                                <div className="row deliveryMethod">
                                  <div className="col-8">
                                    <span className="display-name pull-left">
                                      <FormattedMessage id="payment.normalDelivery2" />
                                    </span>
                                    <span className="text-muted arrival-time">
                                      <FormattedMessage id="payment.normalDelivery3" />
                                    </span>
                                  </div>
                                  <div className="col-4">
                                    <span
                                      className="shipping-method-pricing"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <span className="shipping-cost">
                                        <FormattedMessage id="payment.forFree" />
                                      </span>
                                      <span
                                        className=" info-tooltip delivery-method-tooltip"
                                        title="Top"
                                        data-tooltip-placement="top"
                                        data-tooltip="top-tooltip"
                                      >
                                        i
                                    </span>
                                      <div
                                        id="top-tooltip"
                                        className="rc-tooltip"
                                      >
                                        <FormattedMessage id="payment.forFreeTip" />
                                      </div>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          <div className="card">
                            <div className="card-header">
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
                        </div>
                      </div>
                      {this.isLogin &&
                        find(
                          this.loginCartData,
                          (ele) => ele.subscriptionStatus
                        ) ? (
                          <>
                            <div className="card-header">
                              <h5>
                                <FormattedMessage id="subscription.chooseSubscription" />
                              </h5>
                            </div>
                            <SubscriptionSelect
                              updateSelectedData={(data) => {
                                this.props.frequencyStore.updateBuyWay(data.buyWay)
                                this.props.frequencyStore.updateFrequencyName(data.frequencyName)
                                if (data.buyWay === "frequency") {
                                  this.setState({
                                    showOxxoForm: false,
                                  });
                                }
                                this.setState(
                                  {
                                    subForm: data,
                                  },
                                  () => {
                                    this.state.subForm.buyWay == "once"
                                      ? this.props.checkoutStore.updateLoginCart(this.state.promotionCode,
                                        false
                                      )
                                      : this.props.checkoutStore.updateLoginCart(this.state.promotionCode,
                                        true
                                      );
                                  }
                                );
                              }}
                            />
                          </>
                        ) : null}
                    </>
                  )}
                <div>
                  <h5>
                    <FormattedMessage id="payment.paymentInformation" />
                  </h5>
                  <nav
                    class="rc-tabs__controller rc-fade--x "
                    data-toggle-group=""
                    style={{
                      marginBottom: "20px",
                      display:
                        this.state.subForm.buyWay === "frequency"
                          ? "none"
                          : "block",
                    }}
                  >
                    <ul
                      class="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank text-break"
                      role="tablist"
                    >
                      <li className="rc-tabs-li" style={{ width: "40%" }}>
                        <button
                          class="rc-tab text-break"
                          onClick={() => this.setState({ showOxxoForm: false })}
                          style={{ padding: "8px 15px", width: "100%" }}
                          data-toggle="creditCard"
                          aria-selected={
                            this.state.showOxxoForm ? "false" : "true"
                          }
                          role="tab"
                        >
                          <FormattedMessage id="creditCard"></FormattedMessage>
                        </button>
                      </li>
                      <li className="rc-tabs-li" style={{ width: "40%" }}>
                        <button
                          class="rc-tab text-break"
                          onClick={() => this.setState({ showOxxoForm: true })}
                          style={{ padding: "8px 15px", width: "100%" }}
                          data-toggle="oxxo"
                          aria-selected={
                            this.state.showOxxoForm ? "true" : "false"
                          }
                          role="tab"
                        >
                          <FormattedMessage id="oxxo"></FormattedMessage>
                        </button>
                      </li>
                    </ul>
                  </nav>
                  {this.state.showOxxoForm ? (
                    <OxxoConfirm
                      history={this.props.history}
                      getParameter={() => this.goConfirmation()}
                      startLoading={() => this.startLoading()}
                      endLoading={() => this.endLoading()}
                    />
                  ) : (
                      ""
                    )}
                  <div
                    style={{
                      display: this.state.showOxxoForm ? "none" : "block",
                    }}
                  >
                    <div className="card payment-form">
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
                                    className={`rc-border-all rc-border-colour--interface ${
                                      !this.state.isCompleteCredit
                                        ? "checkout--padding"
                                        : ""
                                      }`}
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
                                                *{CreditCardImg}
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
                                        <div className="col-6 col-sm-3 d-flex flex-column justify-content-center">
                                          <img
                                            src={
                                              this.state.creditCardImgObj[
                                                this.state.payosdata.vendor
                                              ]
                                                ? this.state.creditCardImgObj[
                                                this.state.payosdata.vendor
                                                ]
                                                : "https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                                            }
                                            alt=""
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
                                )}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="footerCheckbox rc-margin-top--sm">
                      <input
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
                    <div className="footerCheckbox">
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
                      />
                      <label
                        htmlFor="id-checkbox-cat-1"
                        className="rc-input__label--inline"
                      >
                        <FormattedMessage id="payment.confirmInfo1" />
                        <div
                          className="warning"
                          style={{
                            display:
                              this.state.isEighteen || this.state.isEighteenInit
                                ? "none"
                                : "block",
                          }}
                        >
                          <FormattedMessage id="payment.confirmInfo2" />
                        </div>
                      </label>
                    </div>
                    <div className="place_order-btn card">
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
                </div>
              </div>
              <div className="product-summary rc-column">
                <h5 className="product-summary__title rc-margin-bottom--xs">
                  <FormattedMessage id="payment.yourOrder" />
                </h5>
                {!this.state.isToPayNow && (
                  <Link
                    to="/cart"
                    className="product-summary__cartlink rc-styled-link"
                  >
                    <FormattedMessage id="edit" />
                  </Link>
                )}
                <PayProductInfo
                  history={this.props.history}
                  frequencyName={this.state.subForm.frequencyName}
                  buyWay={this.state.subForm.buyWay}
                  sendPromotionCode={(e) => this.savePromotionCode(e)}
                  promotionCode={this.state.promotionCode}
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
