import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { findIndex, find } from "lodash";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Progress from "@/components/Progress";
import PayProductInfo from "@/components/PayProductInfo";
import Loading from "@/components/Loading";
import UnloginDeliveryAddress from "./modules/UnloginDeliveryAddress";
import LoginDeliveryAddress from "./modules/LoginDeliveryAddress";
import BillingAddressForm from "./modules/BillingAddressForm";
import visaImg from "@/assets/images/credit-cards/visa.svg";
import amexImg from "@/assets/images/credit-cards/amex.svg";
import mastercardImg from "@/assets/images/credit-cards/mastercard.svg";
import discoverImg from "@/assets/images/credit-cards/discover.svg";
import { STOREID } from "@/utils/constant";
import { jugeLoginStatus, getDictionary } from "@/utils/utils";
import {
  postVisitorRegisterAndLogin,
  batchAdd,
  confirmAndCommit,
  customerCommitAndPay,
  rePay
} from "@/api/payment";
import PaymentComp from "@/components/PaymentComp"
import Store from '@/store/store';
import axios from 'axios'
import "./index.css";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      payMethod: "creditCard",
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
      errorShow: false,
      errorMsg: "",
      commentOnDelivery: "",
      currentProduct: null,
      loading: false,
      modalShow: false,
      payosdata: {},
      selectedCardInfo: {},
      isToPayNow: sessionStorage.getItem('rc-tid'),
      isLogin: jugeLoginStatus(),
      cityList: [],
      countryList: []
    };
    this.tid = sessionStorage.getItem('rc-tid')
    this.timer = null;
    this.confirmCardInfo = this.confirmCardInfo.bind(this);
    this.loginDeliveryAddressRef = React.createRef();
    this.loginBillingAddressRef = React.createRef();
  }
  async componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }

    if (this.state.isLogin && !localStorage.getItem("rc-cart-data-login")) {
      this.props.history.push('/cart')
    }
    if (!this.state.isLogin
      && (!localStorage.getItem("rc-cart-data")
        || !JSON.parse(localStorage.getItem("rc-cart-data")).length)) {
      this.props.history.push('/cart')
    }
    getDictionary({ type: 'city' })
      .then(res => {
        this.setState({
          cityList: res
        })
      })
    let countryRes = await getDictionary({ type: 'country' })

    let deliveryInfoStr = localStorage.getItem(`${this.state.isLogin ? 'loginDeliveryInfo' : 'deliveryInfo'}`);
    const { creditCardInfo, deliveryAddress, billingAddress } = this.state;
    this.setState({
      type: this.props.match.params.type,
      countryList: countryRes
    }, () => {
      if (deliveryInfoStr
        && (this.state.type === "payment"
          || (!this.state.isLogin && this.state.type === "shipping"))) {
        let deliveryInfo = JSON.parse(deliveryInfoStr);
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
          creditCardInfo: creditCardInfo
        });
      }
      if (!deliveryInfoStr && this.state.type === "shipping" && !this.state.isLogin) {
        let defaultCountryId = find(this.state.countryList, ele => ele.name.toLowerCase() == 'mexico')
          ? find(this.state.countryList, ele => ele.name.toLowerCase() == 'mexico').id
          : ''
        deliveryAddress.country = defaultCountryId
        billingAddress.country = defaultCountryId
        this.setState({
          deliveryAddress: deliveryAddress,
          billingAddress: billingAddress
        });
      }
    }
    );
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
    sessionStorage.removeItem('rc-tid')
  }
  matchNamefromDict (dictList, id) {
    return find(dictList, ele => ele.id == id)
      ? find(dictList, ele => ele.id == id).name
      : id
  }
  confirmCardInfo () {
    this.setState({
      isCompleteCredit: true,
    });
  }
  async ChoosePayment () {
    const {
      deliveryAddress,
      billingAddress,
      billingChecked,
      commentOnDelivery,
      creditCardInfo
    } = this.state;
    let tmpDeliveryAddress = deliveryAddress;
    let tmpBillingAddress = billingAddress;
    if (this.state.isLogin) {
      const deliveryAddressEl = this.loginDeliveryAddressRef.current
      let tmpDeliveryAddressData = deliveryAddressEl && find(deliveryAddressEl.state.addressList, (ele) => ele.selected)
      // 若用户未存在任何地址，则自动触发保存操作
      if (!tmpDeliveryAddressData) {
        let addressRes = await deliveryAddressEl.handleSave()
        if (!addressRes) {
          return false
        }
        tmpDeliveryAddressData = deliveryAddressEl && find(deliveryAddressEl.state.addressList, (ele) => ele.selected)
      }
      tmpDeliveryAddress = {
        firstName: tmpDeliveryAddressData.firstName,
        lastName: tmpDeliveryAddressData.lastName,
        address1: tmpDeliveryAddressData.address1,
        address2: tmpDeliveryAddressData.address2,
        rfc: tmpDeliveryAddressData.rfc,
        country: tmpDeliveryAddressData.countryId ? tmpDeliveryAddressData.countryId.toString() : '',
        city: tmpDeliveryAddressData.cityId ? tmpDeliveryAddressData.cityId.toString() : '',
        postCode: tmpDeliveryAddressData.postCode,
        phoneNumber: tmpDeliveryAddressData.consigneeNumber,
        addressId: tmpDeliveryAddressData.deliveryAddressId,
      }

      if (!billingChecked) {
        const billingAddressEl = this.loginBillingAddressRef.current
        let tmpBillingAddressData = billingAddressEl && find(billingAddressEl.state.addressList, ele => ele.selected)
        if (!tmpBillingAddressData) {
          let addressRes = await billingAddressEl.handleSave()
          if (!addressRes) {
            return false
          }
          tmpBillingAddressData = billingAddressEl && find(billingAddressEl.state.addressList, ele => ele.selected)
        }
        tmpBillingAddress = {
          firstName: tmpBillingAddressData.firstName,
          lastName: tmpBillingAddressData.lastName,
          address1: tmpBillingAddressData.address1,
          address2: tmpBillingAddressData.address2,
          rfc: tmpBillingAddressData.rfc,
          country: tmpBillingAddressData.countryId ? tmpBillingAddressData.countryId.toString() : '',
          city: tmpBillingAddressData.cityId ? tmpBillingAddressData.cityId.toString() : '',
          postCode: tmpBillingAddressData.postCode,
          phoneNumber: tmpBillingAddressData.consigneeNumber,
          addressId: tmpBillingAddressData.deliveryAddressId,
        }
      }
    }
    const param = {
      billingChecked,
      deliveryAddress: tmpDeliveryAddress,
      commentOnDelivery
    };

    if (billingChecked) {
      param.billingAddress = tmpDeliveryAddress;
    } else {
      param.billingAddress = tmpBillingAddress;
    }
    for (let k in param.deliveryAddress) {
      if (param.deliveryAddress[k] === "" && k !== "address2" && k !== "rfc") {
        this.setState({
          errorShow: true,
          errorMsg: this.state.isLogin
            ? this.props.intl.messages.selectDeliveryAddress
            : this.props.intl.messages.CompleteRequiredItems
        });
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.setState({
            errorShow: false
          })
        }, 5000)
        return
      }
      if (k === "postCode" && !/\d{5}/.test(param.deliveryAddress[k])) {
        this.setState({
          errorShow: true,
          errorMsg: this.props.intl.messages.EnterCorrectPostCode
        });
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setTimeout(() => {
          this.setState({
            errorShow: false
          })
        }, 5000)
        return
      }
    }
    for (let k in param.billingAddress) {
      if (param.billingAddress[k] === "" && k !== "address2" && k !== "rfc") {
        console.log("billing", k)
        this.setState({
          errorShow: true,
          errorMsg: this.props.intl.messages.CompleteRequiredItems
        });
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setTimeout(() => {
          this.setState({
            errorShow: false
          })
        }, 5000)
        return
      }
      if (k === "postCode" && !/\d{5}/.test(param.billingAddress[k])) {
        this.setState({
          errorShow: true,
          errorMsg: this.props.intl.messages.EnterCorrectPostCode
        });
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setTimeout(() => {
          this.setState({
            errorShow: false
          })
        }, 5000)
        return
      }
    }
    if (this.state.isLogin) {
      localStorage.setItem("loginDeliveryInfo", JSON.stringify(param))
    } else {
      localStorage.setItem("deliveryInfo", JSON.stringify(param))
    }
    this.setState({
      creditCardInfo: creditCardInfo
    });
    const { history } = this.props
    history.push("/payment/payment")
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
      }
    })
  }
  async handleClickFurther () {
    if (this.state.isLogin) {
      if (!this.state.selectedCardInfo.cardNumber) {
        this.setState({
          errorShow: true,
          errorMsg: this.props.intl.messages.clickConfirmRequireCvv
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setTimeout(() => {
          this.setState({
            errorShow: false,
          });
        }, 5000);
        return
      }
      let selectedCard = this.state.selectedCardInfo
      this.setState({ loading: true });
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
            "public_key": process.env.REACT_APP_PaymentKEY,
            "x-payments-os-env": process.env.REACT_APP_PaymentENV,
            "Content-type": "application/json",
            "app_id": "com.razorfish.dev_mexico",
            "api-version": "1.3.0",
          }
        }
      );
      console.log(res, 'res')
      this.setState({
        payosdata: res.data,
        creditCardInfo: Object.assign({}, selectedCard),
        loading: false
      }, () => {
        this.goConfirmation()
      })
    } else {
      this.goConfirmation()
    }
  }
  async goConfirmation () {
    const { history } = this.props;
    let {
      isEighteen,
      isReadPrivacyPolicy,
      deliveryAddress,
      billingAddress,
      commentOnDelivery,
      billingChecked,
      creditCardInfo,
      payMethod
    } = this.state;
    const cartData = localStorage.getItem("rc-cart-data")
      ? JSON.parse(localStorage.getItem("rc-cart-data"))
      : [];
    if (!payMethod) {
      this.setState({ showPayMethodError: true })
    }
    if (isEighteen && isReadPrivacyPolicy) {
      let payosdata = this.state.payosdata;
      if (!payosdata.token) {
        this.setState({
          errorShow: true,
          errorMsg: this.props.intl.messages.clickConfirmCardButton
        });
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
      }
      this.setState({ loading: true });
      let param = Object.assign({}, { useDeliveryAddress: billingChecked }, deliveryAddress);
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
      param.email = creditCardInfo.email
      let param2 = {
        goodsInfos: cartData.map((ele) => {
          return {
            verifyStock: false,
            buyCount: ele.quantity,
            goodsInfoId: find(ele.sizeList, (s) => s.selected).goodsInfoId
          }
        })
      }
      if (this.state.isLogin) {
        const loginCartData = localStorage.getItem("rc-cart-data-login")
          ? JSON.parse(localStorage.getItem("rc-cart-data-login"))
          : []
        param2.goodsInfos = loginCartData.map((ele) => {
          return {
            verifyStock: false,
            buyCount: ele.buyCount,
            goodsInfoId: ele.goodsInfoId
          }
        })
      }

      let tradeMarketingList = [
        {
          marketingId: "",
          marketingLevelId: "",
          skuIds: [],
          giftSkuIds: []
        },
      ];
      let goodsMarketingMapStr = sessionStorage.getItem("goodsMarketingMap")
      let goodsMarketingMap = JSON.parse(goodsMarketingMapStr)
      if (goodsMarketingMapStr === "{}") {
        tradeMarketingList = []
      } else {
        for (let k in goodsMarketingMap) {
          tradeMarketingList[0].skuIds.push(k);
          if (!tradeMarketingList[0].marketingLevelId) {
            tradeMarketingList[0].marketingLevelId =
              goodsMarketingMap[k][0]["fullDiscountLevelList"][0][
              "discountLevelId"
              ];
          }
          if (!tradeMarketingList[0].marketingId) {
            tradeMarketingList[0].marketingId =
              goodsMarketingMap[k][0]["fullDiscountLevelList"][0][
              "marketingId"
              ];
          }
        }
        if (!tradeMarketingList[0].marketingId) {
          tradeMarketingList = []
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
        last4Digits: payosdata.last_4_digits,
        line1: deliveryAddress.address1,
        line2: deliveryAddress.address2,
        clinicsId:
          sessionStorage.getItem("rc-clinics-id-link")
          || sessionStorage.getItem("rc-clinics-id-default")
          || sessionStorage.getItem("rc-clinics-id-select"),
        clinicsName:
          sessionStorage.getItem("rc-clinics-name-link")
          || sessionStorage.getItem("rc-clinics-name-default")
          || sessionStorage.getItem("rc-clinics-name-select"),
        remark: commentOnDelivery,
        storeId: STOREID,
        tradeItems: param2.goodsInfos.map((g) => {
          return {
            num: g.buyCount,
            skuId: g.goodsInfoId
          }
        }),
        tradeMarketingList,
        payAccountName: creditCardInfo.cardOwner,
        payPhoneNumber: creditCardInfo.phoneNumber
      };
      try {
        sessionStorage.setItem("rc-paywith-login", this.state.isLogin);
        if (!this.state.isLogin) {
          // 登录状态，不需要调用两个接口
          let postVisitorRegisterAndLoginRes = await postVisitorRegisterAndLogin(param);
          sessionStorage.setItem(
            "rc-token",
            postVisitorRegisterAndLoginRes.context.token
          );
          await batchAdd(param2);
        } else {
          param3.deliveryAddressId = deliveryAddress.addressId
          param3.billAddressId = billingAddress.addressId
        }
        // rePay
        if (this.tid) {
          param3.tid = this.tid
          delete param3.remark
          delete param3.tradeItems
          delete param3.tradeMarketingList
        }

        const tmpCommitAndPay = this.state.isLogin
          ? this.tid
            ? rePay
            : customerCommitAndPay
          : confirmAndCommit
        let confirmAndCommitRes = await tmpCommitAndPay(param3);
        console.log(confirmAndCommitRes);
        localStorage.setItem(
          "orderNumber", confirmAndCommitRes.context && confirmAndCommitRes.context[0]["tid"] || this.tid
        );
        this.setState({ loading: false });
        sessionStorage.removeItem("payosdata");
        history.push("/confirmation");
      } catch (e) {
        if (!this.state.isLogin) {
          sessionStorage.removeItem('rc-token')
        }
        console.log(e);
        if (e.errorData) {
          this.tid = e.errorData
        }
        this.setState({
          errorShow: true,
          errorMsg: e.message ? e.message.toString() : e.toString()
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.setState({
            errorShow: false
          });
        }, 5000);
      } finally {
        this.setState({ loading: false });
      }
    } else {
      this.setState({ isEighteenInit: false, isReadPrivacyPolicyInit: false });
    }
  }
  goDelivery (e) {
    e.preventDefault();
    const { history } = this.props;
    history.push("/payment/shipping");
  }
  goCart (e) {
    e.preventDefault();
    const { history } = this.props;
    history.push("/cart");
  }
  cardInfoInputChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfo } = this.state;
    // if (name === "phoneNumber") {
    //   this.phoneNumberInput(e, creditCardInfo, name);
    // } else {
    creditCardInfo[name] = value;
    // }
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
        this.setState({
          errorShow: true,
          errorMsg: this.props.intl.messages.CompleteRequiredItems,
        });
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
      }
      // if (k === 'phoneNumber' && !(/^\d{10}$/.test(this.state.creditCardInfo[k].replace(/\s*/g, "")))) {
      //   this.setState({
      //     errorShow: true,
      //     errorMsg: 'Please enter the correct phone number'
      //   })
      //   window.scrollTo(0, 0)
      //   setTimeout(() => {
      //     this.setState({
      //       errorShow: false,
      //     });
      //   }, 5000);
      //   return
      // }
      if (k === "email" && !/^\w+([-_.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(this.state.creditCardInfo[k].replace(/\s*/g, ""))) {
        this.setState({
          errorShow: true,
          errorMsg: this.props.intl.messages.EnterCorrectEmail,
        });
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
      }
    }
    this.setState({
      loading: true,
    });
    document.getElementById("payment-form").submit.click();
    let timer = setInterval(() => {
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
  }
  updateDeliveryAddress (data) {
    this.setState({
      deliveryAddress: data
    });
  }
  updateBillingAddress (data) {
    this.setState({
      billingAddress: data,
    });
  }
  handleClickEditClinic (e) {
    e.preventDefault()
    const tmpClinicsName = sessionStorage.getItem('rc-clinics-name-link') || sessionStorage.getItem('rc-clinics-name-default')
    const tmpClinicsId = sessionStorage.getItem('rc-clinics-id-link') || sessionStorage.getItem('rc-clinics-id-default')
    // 默认clini链接进来，仍然可以编辑
    if (tmpClinicsName) {
      sessionStorage.setItem('rc-clinics-name-select', tmpClinicsName)
      sessionStorage.setItem('rc-clinics-id-select', tmpClinicsId)
      sessionStorage.removeItem('rc-clinics-name-link')
      sessionStorage.removeItem('rc-clinics-id-link')
      sessionStorage.removeItem('rc-clinics-name-default')
      sessionStorage.removeItem('rc-clinics-id-default')
    }
    this.props.history.push("/prescription")
  }
  render () {
    const {
      deliveryAddress,
      billingAddress,
      creditCardInfo
    } = this.state;
    console.log(deliveryAddress, 'deli')
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {this.state.creditCardImgUrl.map((el, idx) => (
          <img key={idx} className="logo-payment-card" src={el} />
        ))}
      </span>
    );
    const event = {
      page: {
        type: 'Checkout',
        theme: ''
      }
    }

    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header history={this.props.history} showMiniIcons={false} showUserIcon={true} />
        {this.state.loading ? <Loading /> : null}
        <main
          className="rc-content--fixed-header rc-bg-colour--brand3"
          id="payment"
        >
          <div
            id="checkout-main"
            className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg"
            data-checkout-stage="payment"
          >
            <Progress type={this.state.type} />
            <div className="rc-layout-container rc-three-column rc-max-width--xl">
              <div className="rc-column rc-double-width shipping__address">
                <div
                  className="rc-padding-bottom--xs cart-error-messaging cart-error"
                  style={{ display: this.state.errorShow ? "block" : "none" }}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close"
                    role="alert"
                  >
                    <span style={{ paddingLeft: 0 }}>
                      {this.state.errorMsg}
                    </span>
                  </aside>
                </div>
                <div
                  className="shipping-form"
                  style={{
                    display: this.state.type === "shipping" ? "block" : "none",
                  }}
                >
                  <div className="card">
                    <div className="card-header">
                      <h5 className="pull-left">
                        {
                          jugeLoginStatus()
                            ? <FormattedMessage id="payment.clinicTitle2" />
                            : <FormattedMessage id="payment.clinicTitle" />
                        }
                      </h5>
                      <p
                        onClick={e => this.handleClickEditClinic(e)}
                        className={`rc-styled-link rc-margin-top--xs pull-right m-0 ${sessionStorage.getItem("rc-clinics-name-link") && sessionStorage.getItem("rc-clinics-id-link") ? 'hidden' : ''}`}
                      >
                        <FormattedMessage id="edit" />
                      </p>
                    </div>
                    <div className="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                      {
                        sessionStorage.getItem("rc-clinics-name-link")
                        || sessionStorage.getItem("rc-clinics-name-default")
                        || sessionStorage.getItem("rc-clinics-name-select")
                      }
                    </div>
                    {this.state.isLogin
                      ? (
                        <LoginDeliveryAddress
                          id="1"
                          ref={this.loginDeliveryAddressRef} />
                      ) : (
                        <UnloginDeliveryAddress
                          data={deliveryAddress}
                          updateData={(data) => this.updateDeliveryAddress(data)} />
                      )}
                    <div className="card-header" style={{ zIndex: 2, width: '62%' }}>
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

                    {this.state.isLogin ? (
                      <LoginDeliveryAddress
                        id="2"
                        type="billing"
                        ref={this.loginBillingAddressRef}
                        visible={!this.state.billingChecked} />
                    ) : (
                        <BillingAddressForm
                          data={billingAddress}
                          billingChecked={this.state.billingChecked}
                          updateData={(data) => this.updateBillingAddress(data)}
                        />
                      )}

                    <fieldset className="shipping-method-block rc-fieldset">
                      <div className="card-header">
                        <h5>
                          <FormattedMessage id="payment.howToDelivery" /> :
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
                                <div id="top-tooltip" className="rc-tooltip">
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
                  <div className="place_order-btn card">
                    <div className="next-step-button">
                      <div className="rc-text--right">
                        <button
                          className="rc-btn rc-btn--one submit-payment"
                          type="submit"
                          name="submit"
                          value="submit-shipping"
                          onClick={() => this.ChoosePayment()}
                        >
                          <FormattedMessage id="payment.choosePayment" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <p>
                    <button
                      className="rc-btn rc-btn--one pull-right rc-margin-bottom--sm"
                      onClick={() => this.ChoosePayment()}
                    >
                      Choose a payment
                    </button>
                  </p> */}
                </div>
                <div
                  style={{
                    display: this.state.type == "payment" ? "block" : "none",
                  }}
                >
                  <div className="card shipping-summary">
                    <div className="card-header rc-padding-right--none clearfix">
                      <h5 className="pull-left"><FormattedMessage id="payment.addressTitle" /></h5>
                      {
                        !this.state.isToPayNow && <a
                          href="#"
                          onClick={(e) => this.goDelivery(e)}
                          className=" rc-styled-link rc-margin-top--xs pull-right pt-0">
                          <FormattedMessage id="edit" />
                        </a>
                      }
                    </div>
                    <div className="card-body rc-padding--none">
                      <p className="shipping-addr-label multi-shipping padding-y--sm">
                        Addresses and shipping methods are indicated under your goods.
                      </p>
                      <div
                        className="single-shipping"
                        data-shipment-summary="8b50610f77571c1ac58b609278"
                      >
                        <div className="rc-border-all rc-border-colour--interface checkout--padding">
                          <div className="summary-details shipping rc-margin-bottom--xs">
                            <div className="address-summary row">
                              <div className="col-md-12 deliveryAddress">
                                <h5 className="center">
                                  <FormattedMessage id="payment.deliveryTitle" />
                                </h5>
                                <div className="row">
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.firstName" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.firstName}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.lastName" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.lastName}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.address1" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.address1}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.address2" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.address2}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.country" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{this.matchNamefromDict(this.state.countryList, deliveryAddress.country)}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.city" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{this.matchNamefromDict(this.state.cityList, deliveryAddress.city)}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.postCode" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.postCode}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.phoneNumber" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.phoneNumber}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.rfc" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.rfc}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.normalDelivery2" />
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.forFree" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 address-summary-left">
                                <h5 className="center">
                                  <FormattedMessage id="payment.billTitle" />
                                </h5>
                                <div className="row">
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.firstName" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.firstName}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.lastName" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.lastName}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.address1" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.address1}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.address2" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.address2}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.country" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{this.matchNamefromDict(this.state.countryList, billingAddress.country)}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.city" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{this.matchNamefromDict(this.state.cityList, billingAddress.city)}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.postCode" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.postCode}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.phoneNumber" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.phoneNumber}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.rfc" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.rfc}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.commentOnDelivery" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{this.state.commentOnDelivery}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="rc-margin-bottom--xs delivery-comment"
                            style={{ display: "none" }}
                          >
                            <b>Delivery comment:</b> <span>null</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card payment-form">
                    <div className="card-body rc-padding--none">
                      <form
                        method="POST"
                        data-address-mode="new"
                        name="dwfrm_billing"
                        id="dwfrm_billing"
                      >
                        <div className="card-header with-tooltip-icon rc-margin-top--sm">
                          <h5>
                            <FormattedMessage id="payment.paymentInformation" />
                          </h5>
                        </div>
                        <div className="billing-payment">
                          <div
                            className="rc-list__accordion-item border-0"
                            data-method-id="CREDIT_CARD"
                            style={{
                              display:
                                this.state.payMethod === "creditCard"
                                  ? "block"
                                  : "none",
                            }}
                          >
                            {
                              this.state.isLogin
                                ? <div className="rc-border-colour--interface">
                                  <PaymentComp cardOwner={deliveryAddress.firstName + '' + deliveryAddress.lastName} phoneNumber={creditCardInfo.phoneNumber} getSelectedValue={cardItem => {
                                    this.setState({ selectedCardInfo: cardItem })
                                  }} />
                                </div>
                                : <div className={`rc-border-all rc-border-colour--interface ${!this.state.isCompleteCredit ? 'checkout--padding' : ''}`}>
                                  <div
                                    className={`credit-card-content ${!this.state.isCompleteCredit ? '' : 'hidden'}`}
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
                                                  value={creditCardInfo.cardOwner}
                                                  onChange={(e) =>
                                                    this.cardInfoInputChange(e)
                                                  }
                                                  onBlur={(e) => this.inputBlur(e)}
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
                                                  onBlur={(e) => this.inputBlur(e)}
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
                                                  value={creditCardInfo.phoneNumber}
                                                  onChange={(e) =>
                                                    this.cardInfoInputChange(e)
                                                  }
                                                  onBlur={(e) => this.inputBlur(e)}
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
                                  </div>
                                  <div className={`creditCompleteInfoBox pb-3 ${!this.state.isCompleteCredit ? 'hidden' : ''}`}>
                                    <p>
                                      <span
                                        className="pull-right ui-cursor-pointer-pure mr-2"
                                        onClick={() => {
                                          this.setState({
                                            isCompleteCredit: false
                                          });
                                        }}
                                        style={{ position: 'relative', top: -9 }}
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
                                            <FormattedMessage id="name2" /><br />
                                            <span className="creditCompleteInfo">{creditCardInfo.cardOwner}</span>
                                          </div>
                                        </div>
                                        <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                                          <div className="col-6 color-999">
                                            <FormattedMessage id="payment.cardNumber2" /><br />
                                            <span className="creditCompleteInfo">xxxx xxxx xxxx{" "}{this.state.payosdata ? this.state.payosdata.last_4_digits : ""}</span>
                                          </div>
                                          <div className="col-6 color-999">
                                            <FormattedMessage id="payment.cardType" /><br />
                                            <span className="creditCompleteInfo">{this.state.payosdata.card_type}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            }
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
                          isReadPrivacyPolicy: !this.state.isReadPrivacyPolicy,
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
                            <Link className="red" target="_blank" to="/termuse">
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
              <div className="product-summary rc-column">
                <h5 className="product-summary__title rc-margin-bottom--xs">
                  <FormattedMessage id="payment.yourOrder" />
                </h5>
                {
                  !this.state.isToPayNow && <a
                    href="#"
                    onClick={(e) => this.goCart(e)}
                    className="product-summary__cartlink rc-styled-link">
                    <FormattedMessage id="edit" />
                  </a>
                }
                <PayProductInfo />
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
