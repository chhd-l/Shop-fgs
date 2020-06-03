import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom"
import { findIndex, find } from "lodash";
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Progress from "@/components/Progress";
import PayProductInfo from "@/components/PayProductInfo";
import "./index.css";
import Loading from "@/components/Loading";
import UnloginDeliveryAddress from './modules/UnloginDeliveryAddress'
import LoginDeliveryAddress from './modules/LoginDeliveryAddress'
import BillingAddressForm from './modules/BillingAddressForm'
import visaImg from "@/assets/images/credit-cards/visa.svg";
import amexImg from "@/assets/images/credit-cards/amex.svg";
import mastercardImg from "@/assets/images/credit-cards/mastercard.svg";
import discoverImg from "@/assets/images/credit-cards/discover.svg";
import paypalImg from "@/assets/images/credit-cards/paypal.png";
import { STOREID } from "@/utils/constant";
import { jugeLoginStatus } from "@/utils/utils"
import {
  postVisitorRegisterAndLogin,
  batchAdd,
  confirmAndCommit,
  customerCommitAndPay
} from "@/api/payment";

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
        DISCOVER: discoverImg
      },
      deliveryAddress: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        rfc: '',
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
        rfc: '',
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
        identifyNumber: '111'
      },
      errorShow: false,
      errorMsg: "",
      commentOnDelivery: "",
      currentProduct: null,
      loading: false,
      modalShow: false,
      payosdata: {},
    };
    this.confirmCardInfo = this.confirmCardInfo.bind(this);
    this.timer = null;
    this.loginDeliveryAddressRef = React.createRef()
    this.loginBillingAddressRef = React.createRef()
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
    // let urls = [process.env.PUBLIC_URL + '/royal/royal-assets1/webpack.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/sentry.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/tslib.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/jsSupport.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/37.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/polyfills.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/fontFallback.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/41.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/feature.selects_js.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/feature.forms_js.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/feature.toggle-group_js.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/feature.alerts_js.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/feature.tooltip_js.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/feature.svgAnimation_js.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/36.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/cssrcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/style-loader.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/choices_js.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/popper_js.rcdl.bundle.js',
    //   process.env.PUBLIC_URL + '/royal/royal-assets1/tippy_js.rcdl.bundle.js'
    // ]
    // urls.map(el => {
    //   this.loadJs(el, function () {
    //     // alert('done');
    //     console.log(el, '212121',process.env.PUBLIC_URL,'elllll')
    //   });
    // })
    let deliveryInfoStr = localStorage.getItem(`${jugeLoginStatus() ? 'loginDeliveryInfo' : 'deliveryInfo'}`);
    const { creditCardInfo } = this.state

    this.setState({
      type: this.props.match.params.type
    }, () => {
      if (deliveryInfoStr && (this.state.type === 'payment' || (!jugeLoginStatus() && this.state.type === 'shipping'))) {
        let deliveryInfo = JSON.parse(deliveryInfoStr);
        creditCardInfo.cardOwner =
          deliveryInfo.deliveryAddress.firstName + ' ' + deliveryInfo.deliveryAddress.lastName;
        creditCardInfo.phoneNumber = deliveryInfo.deliveryAddress.phoneNumber;
        this.setState({
          deliveryAddress: deliveryInfo.deliveryAddress,
          billingAddress: deliveryInfo.billingAddress,
          commentOnDelivery: deliveryInfo.commentOnDelivery,
          billingChecked: deliveryInfo.billingChecked,
          creditCardInfo: creditCardInfo,
        });
      }
    })
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  confirmCardInfo () {
    this.setState({
      isCompleteCredit: true,
    });
  }
  ChoosePayment () {
    const {
      deliveryAddress,
      billingAddress,
      billingChecked,
      commentOnDelivery,
      creditCardInfo,
    } = this.state;
    let tmpDeliveryAddress = deliveryAddress
    let tmpBillingAddress = billingAddress
    if (jugeLoginStatus()) {
      const tmp = this.loginDeliveryAddressRef.current && find(this.loginDeliveryAddressRef.current.state.addressList, ele => ele.selected)
      if (tmp) {
        tmpDeliveryAddress = {
          firstName: tmp.firstName,
          lastName: tmp.lastName,
          address1: tmp.address1,
          address2: tmp.address2,
          rfc: tmp.rfc,
          country: tmp.countryId ? tmp.countryId.toString() : '',
          city: tmp.cityId ? tmp.cityId.toString() : '',
          postCode: tmp.postCode,
          phoneNumber: tmp.consigneeNumber,
          addressId: tmp.deliveryAddressId
        }
      }
      const tmp2 = this.loginBillingAddressRef.current && find(this.loginBillingAddressRef.current.state.addressList, ele => ele.selected)
      if (tmp2) {
        tmpBillingAddress = {
          firstName: tmp2.firstName,
          lastName: tmp2.lastName,
          address1: tmp2.address1,
          address2: tmp2.address2,
          rfc: tmp2.rfc,
          country: tmp2.countryId ? tmp2.countryId.toString() : '',
          city: tmp2.cityId ? tmp2.cityId.toString() : '',
          postCode: tmp2.postCode,
          phoneNumber: tmp2.consigneeNumber,
          addressId: tmp2.deliveryAddressId
        }
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
    for (let k in param.deliveryAddress) {
      if (param.deliveryAddress[k] === "" && k !== "address2" && k !== "rfc") {
        this.setState({
          errorShow: true,
          errorMsg: jugeLoginStatus() ? 'Please select a delivery address' : 'Please complete the required items'
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.setState({
            errorShow: false,
          });
        }, 5000);
        return;
      }
      if (k === 'postCode' && !(/\d{5}/.test(param.deliveryAddress[k]))) {
        this.setState({
          errorShow: true,
          errorMsg: 'Please enter the correct post code'
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.setState({
            errorShow: false,
          });
        }, 5000);
        return
      }
      // if (k === 'phoneNumber' && !(/^\d{10}$/.test(param.billingAddress[k].replace(/\s*/g, "")))) {
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
    }
    for (let k in param.billingAddress) {
      if (param.billingAddress[k] === "" && k !== "address2" && k !== "rfc") {
        console.log('billing', k)
        this.setState({
          errorShow: true,
          errorMsg: 'Please complete the required items'
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.setState({
            errorShow: false,
          });
        }, 5000);
        return;
      }
      if (k === 'postCode' && !(/\d{5}/.test(param.billingAddress[k]))) {
        this.setState({
          errorShow: true,
          errorMsg: 'Please enter the correct post code'
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.setState({
            errorShow: false,
          });
        }, 5000);
        return
      }
      // if (k === 'phoneNumber' && !(/^\d{10}$/.test(param.billingAddress[k].replace(/\s*/g, "")))) {
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
    }
    if (jugeLoginStatus()) {
      localStorage.setItem("loginDeliveryInfo", JSON.stringify(param));
    } else {
      localStorage.setItem("deliveryInfo", JSON.stringify(param));
    }
    this.setState({
      creditCardInfo: creditCardInfo,
    });
    const { history } = this.props;
    history.push("/payment/payment");
  }
  payMethodChange (e) {
    this.setState({ payMethod: e.target.value, showPayMethodError: false });
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
      payMethod,
    } = this.state;
    const cartData = localStorage.getItem("rc-cart-data")
      ? JSON.parse(localStorage.getItem("rc-cart-data"))
      : [];
    if (!payMethod) {
      this.setState({ showPayMethodError: true });
    }
    if (isEighteen && isReadPrivacyPolicy) {
      let payosdata = this.state.payosdata;
      if (!payosdata.token) {
        this.setState({
          errorShow: true,
          errorMsg: 'Please click the confirm card button'
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.setState({
            errorShow: false,
          });
        }, 5000);
        return;
      }
      this.setState({
        loading: true,
      });
      let param = Object.assign(
        {},
        { useDeliveryAddress: billingChecked },
        deliveryAddress,
        { city: 1, country: 1 }
      );
      param.billAddress1 = billingAddress.address1;
      param.billAddress2 = billingAddress.address2;
      param.billCity = 1;
      param.billCountry = 1;
      param.billFirstName = billingAddress.firstName;
      param.billLastName = billingAddress.lastName;
      param.billPhoneNumber = billingAddress.phoneNumber;
      param.billPostCode = billingAddress.postCode;
      param.rfc = deliveryAddress.rfc
      param.billRfc = billingAddress.rfc
      let param2 = {
        goodsInfos: cartData.map(ele => {
          return {
            verifyStock: false,
            buyCount: ele.quantity,
            goodsInfoId: find(ele.sizeList, s => s.selected).goodsInfoId,
          };
        }),
      };
      if (jugeLoginStatus()) {
        const loginCartData = localStorage.getItem("rc-cart-data-login") ? JSON.parse(localStorage.getItem("rc-cart-data-login")) : []
        param2.goodsInfos = loginCartData.map(ele => {
          return {
            verifyStock: false,
            buyCount: ele.buyCount,
            goodsInfoId: ele.goodsInfoId
          }
        })
      }

      let tradeMarketingList = [
        {
          "marketingId": '',
          "marketingLevelId": '',
          "skuIds": [],
          "giftSkuIds": []
        }
      ]
      let goodsMarketingMapStr = sessionStorage.getItem('goodsMarketingMap')
      let goodsMarketingMap = JSON.parse(goodsMarketingMapStr)
      if (goodsMarketingMapStr === "{}") {
        tradeMarketingList = []
      } else {
        for (let k in goodsMarketingMap) {
          tradeMarketingList[0].skuIds.push(k)
          if (!tradeMarketingList[0].marketingLevelId) {
            tradeMarketingList[0].marketingLevelId = goodsMarketingMap[k][0]['fullDiscountLevelList'][0]['discountLevelId']
          }
          if (!tradeMarketingList[0].marketingId) {
            tradeMarketingList[0].marketingId = goodsMarketingMap[k][0]['fullDiscountLevelList'][0]['marketingId']
          }
        }
      }

      let param3 = {
        // birthday: '1990-01-01',
        // identifyNumber: '430702199001011111',
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
        // identifyNumber: creditCardInfo.identifyNumber,
        line1: deliveryAddress.address1,
        line2: deliveryAddress.address2,
        clinicsId:
          sessionStorage.getItem("rc-clinics-id") ||
          sessionStorage.getItem("rc-clinics-id2"),
        clinicsName:
          sessionStorage.getItem("rc-clinics-name2") ||
          sessionStorage.getItem("rc-clinics-name2"),
        remark: commentOnDelivery,
        storeId: STOREID,
        tradeItems: param2.goodsInfos.map((g) => {
          return {
            num: g.buyCount,
            skuId: g.goodsInfoId,
          };
        }),
        tradeMarketingList
      };
      try {
        sessionStorage.setItem("rc-paywith-login", jugeLoginStatus())
        if (!jugeLoginStatus()) {
          // 登录状态，不需要调用两个接口
          let postVisitorRegisterAndLoginRes = await postVisitorRegisterAndLogin(param);
          sessionStorage.setItem("rc-token", postVisitorRegisterAndLoginRes.context.token);
          await batchAdd(param2);
        } else {
          param3.payAccountName = creditCardInfo.cardOwner
          param3.payPhoneNumber = creditCardInfo.phoneNumber
          param3.deliveryAddressId = deliveryAddress.addressId
          param3.billAddressId = billingAddress.addressId
        }

        const tmpCommitAndPay = jugeLoginStatus() ? customerCommitAndPay : confirmAndCommit
        let confirmAndCommitRes = await tmpCommitAndPay(param3);
        console.log(confirmAndCommitRes)
        localStorage.setItem('orderNumber', confirmAndCommitRes.context[0]['tid'])
        this.setState({ loading: false });
        sessionStorage.removeItem("payosdata");
        history.push("/confirmation");
      } catch (e) {
        console.log(e);
        this.setState({
          errorShow: true,
          errorMsg: e.toString()
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.setState({
            errorShow: false,
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
          errorMsg: 'Please complete the required items'
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
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
      if (k === 'email' && !(/^\w+([-_.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(this.state.creditCardInfo[k].replace(/\s*/g, "")))) {
        this.setState({
          errorShow: true,
          errorMsg: 'Please enter the correct email'
        })
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.setState({
            errorShow: false,
          });
        }, 5000);
        return
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
        if (payosdata.category === 'client_validation_error') {
          this.setState({
            errorShow: true,
            errorMsg: payosdata.more_info
          })
          sessionStorage.clear("payosdata");
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
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

        target.value = this.retextStr(target.value, oldSelectionStart - 1, "")
        console.log(target.value, target.selectionStart - 1)
        target.value = this.insertStr(target.value, oldSelectionStart - 1, "_");
        console.log(target.value, target.selectionStart - 1)
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
  loadJs (url, callback) {
    // var script=document.createElement('script');
    // script.type="text/javascript";
    // if(typeof(callback)!="undefined"){
    // if(script.readyState){
    //   script.onreadystatechange=function(){
    //     if(script.readyState == "loaded" || script.readyState == "complete"){
    //       script.onreadystatechange=null;
    //       callback();
    //     }
    //   }
    // }else{
    //   script.onload=function(){
    //     callback();
    //   }
    // }
    // }
    // script.src=url;
    // document.body.appendChild(script);
    var head = document.getElementsByTagName("head")[0];

    var script = document.createElement("script");

    script.src = url;

    head.appendChild(script);
  }
  updateDeliveryAddress (data) {
    this.setState({
      deliveryAddress: data
    })
  }
  updateBillingAddress (data) {
    this.setState({
      billingAddress: data
    })
  }
  render () {
    const {
      deliveryAddress,
      billingAddress,
      creditCardInfo
    } = this.state;

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
        <Header history={this.props.history} />
        {this.state.loading ? <Loading /> : null}
        <main className="rc-content--fixed-header rc-bg-colour--brand3" id="payment">
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
                        <FormattedMessage id="payment.clinicTitle" />
                      </h5>
                      <p
                        onClick={(e) => {
                          e.preventDefault();
                          let { history } = this.props;
                          history.push("/prescription");
                        }}
                        style={{
                          display: sessionStorage.getItem("rc-clinics-name")
                            ? "none"
                            : "inline",
                          margin: 0,
                        }}
                        className="rc-styled-link rc-margin-top--xs pull-right"
                      >
                        <FormattedMessage id="edit" />
                      </p>
                    </div>
                    <div className="rc-border-all rc-border-colour--interface checkout--padding rc-margin-bottom--sm">
                      {sessionStorage.getItem("rc-clinics-name") ||
                        sessionStorage.getItem("rc-clinics-name2")}
                    </div>
                    {
                      jugeLoginStatus()
                        ? <LoginDeliveryAddress
                          id="1"
                          ref={this.loginDeliveryAddressRef}
                          otherUpdateList={() => { this.loginBillingAddressRef.current.queryAddressList() }} />
                        : <UnloginDeliveryAddress
                          data={deliveryAddress}
                          updateData={data => this.updateDeliveryAddress(data)} />
                    }
                    <div className="card-header" style={{ zIndex: 2 }}>
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

                    {
                      jugeLoginStatus()
                        ? <LoginDeliveryAddress
                          id="2"
                          type="billing"
                          ref={this.loginBillingAddressRef}
                          visible={!this.state.billingChecked}
                          otherUpdateList={() => { this.loginDeliveryAddressRef.current.queryAddressList() }} />
                        : <BillingAddressForm
                          data={billingAddress}
                          billingChecked={this.state.billingChecked}
                          updateData={data => this.updateBillingAddress(data)} />
                    }

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
                                <span className="shipping-cost"><FormattedMessage id="payment.forFree" /></span>
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
                        className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
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
                      <h5 className="pull-left">Address and Shipping Method</h5>
                      <a
                        href="#"
                        onClick={(e) => this.goDelivery(e)}
                        className=" rc-styled-link rc-margin-top--xs pull-right"
                      >
                        Edit
                      </a>
                    </div>
                    <div className="card-body rc-padding--none">
                      <p className="shipping-addr-label multi-shipping padding-y--sm">
                        Addresses and shipping methods are indicated under your
                        goods.
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
                                    &nbsp;{deliveryAddress.country}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.city" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{deliveryAddress.city}
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
                                    &nbsp;{billingAddress.country}
                                  </div>
                                  <div className="col-md-6">
                                    <FormattedMessage id="payment.city" />
                                  </div>
                                  <div className="col-md-6">
                                    &nbsp;{billingAddress.city}
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
                          {/* <div className="form-group rc-border-all rc-border-colour--interface checkout--padding">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="rc-input rc-input--inline">
                                  <input
                                    className="rc-input__radio"
                                    id="id-radio-creditCard"
                                    value="creditCard"
                                    type="radio"
                                    name="pay-method"
                                    onChange={(e) => this.payMethodChange(e)}
                                    checked={
                                      this.state.payMethod === "creditCard"
                                    }
                                  />
                                  <label
                                    className="rc-input__label--inline"
                                    htmlFor="id-radio-creditCard"
                                  >
                                    Credit card
                                    {CreditCardImg}
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6" style={{ display: 'none' }}>
                                <div className="rc-input rc-input--inline">
                                  <input
                                    className="rc-input__radio"
                                    id="id-radio-payPal"
                                    value="payPal"
                                    type="radio"
                                    name="pay-method"
                                    onChange={(e) => this.payMethodChange(e)}
                                    checked={this.state.payMethod === "payPal"}
                                  />
                                  <label
                                    className="rc-input__label--inline"
                                    htmlFor="id-radio-payPal"
                                  >
                                    <span className="logo-payment-card-list">
                                      <img
                                        className="logo-payment-card"
                                        style={{
                                          height: "18px",
                                          width: "70px",
                                        }}
                                        src={paypalImg}
                                      />
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              {this.state.showPayMethodError ?
                                <div className="ui-warning" style={{ paddingLeft: '20px' }}>
                                  Payment method is required.
                              </div>
                                : null}
                            </div>
                          </div> */}
                          <div
                            className="rc-list__accordion-item"
                            data-method-id="CREDIT_CARD"
                            style={{
                              display:
                                this.state.payMethod === "creditCard"
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <div className="rc-border-all rc-border-colour--interface checkout--padding">
                              <div
                                className="credit-card-content"
                                id="credit-card-content"
                                style={{
                                  display: !this.state.isCompleteCredit
                                    ? "block"
                                    : "none",
                                }}
                              >
                                <div className="credit-card-form ">
                                  <div className="rc-margin-bottom--xs">
                                    <div className="content-asset">
                                      <p>
                                        <FormattedMessage id="payment.acceptCards" />
                                      </p>
                                      {/* <p>We accept credit cards.</p> */}
                                    </div>
                                    <div className="row">
                                      <div className="col-sm-12">
                                        <div className="form-group">
                                          <label
                                            className="form-control-label"
                                            htmlFor="cardNumber"
                                          >
                                            <FormattedMessage id="payment.cardNumber" />*
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
                                            {/* <div className="cardFormBox">
                                              <span class="cardImage">
                                                <img
                                                  alt="Card"
                                                  src="https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                                                />
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
                                                          type="text"
                                                          className="rc-input__control form-control email"
                                                          id="email"
                                                          value={
                                                            creditCardInfo.cardNumber
                                                          }
                                                          onChange={(e) =>
                                                            this.cardInfoInputChange(
                                                              e
                                                            )
                                                          }
                                                          onBlur={(e) =>
                                                            this.inputBlur(e)
                                                          }
                                                          name="cardNumber"
                                                          maxLength="254"
                                                          placeholder="Card Number"
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
                                                          value={
                                                            creditCardInfo.cardDate
                                                          }
                                                          onChange={(e) =>
                                                            this.cardInfoInputChange(
                                                              e
                                                            )
                                                          }
                                                          onBlur={(e) =>
                                                            this.inputBlur(e)
                                                          }
                                                          name="cardDate"
                                                          maxLength="2147483647"
                                                          placeholder="MM/YY"
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
                                                          type="tel"
                                                          className="rc-input__control form-control phone"
                                                          min-lenght="18"
                                                          max-length="18"
                                                          data-phonelength="18"
                                                          data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                                          data-range-error="The phone number should contain 10 digits"
                                                          value={
                                                            creditCardInfo.cardCVV
                                                          }
                                                          onChange={(e) =>
                                                            this.cardInfoInputChange(
                                                              e
                                                            )
                                                          }
                                                          onBlur={(e) =>
                                                            this.inputBlur(e)
                                                          }
                                                          name="cardCVV"
                                                          maxLength="2147483647"
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
                                            </div> */}
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
                                    {/* <div className="row overflow_visible">
                                      <div className="col-sm-12">
                                        <div className="form-group required">
                                          <label className="form-control-label">
                                          <FormattedMessage id="payment.socialId" />
                                          </label>
                                          <span
                                            className="rc-input rc-input--full-width"
                                            input-setup="true"
                                          >
                                            <input
                                              type="text"
                                              className="rc-input__control form-control cardOwner"
                                              name="identifyNumber"
                                              value={creditCardInfo.identifyNumber}
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
                                    </div> */}
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
                                              // data-js-validate="(^(\+?7|8)?9\d{9}$)"
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
                                            {/* <input
                                              className="rc-input__control input__phoneField shippingPhoneNumber"
                                              type="tel"
                                              value={creditCardInfo.phoneNumber}
                                              onChange={(e) =>
                                                this.cardInfoInputChange(e)
                                              }
                                              onBlur={(e) => this.inputBlur(e)}
                                              onClick={(e) =>
                                                this.phoneNumberClick(e)
                                              }
                                              data-js-pattern="(^(\+52)\d{8}$)"
                                              name="phoneNumber"
                                              maxlength="17"
                                              minLength="16"
                                            ></input> */}
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
                              <div
                                className="creditCompleteInfoBox"
                                style={{
                                  display: !this.state.isCompleteCredit
                                    ? "none"
                                    : "block",
                                }}
                              >
                                <p>
                                  <span
                                    className="pull-right"
                                    onClick={() => {
                                      this.setState({
                                        isCompleteCredit: false,
                                      });
                                    }}
                                  >
                                    <FormattedMessage id="edit" />
                                  </span>
                                </p>
                                <div className="row">
                                  <div className="col-sm-5">
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
                                  <div className="col-sm-7">
                                    <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                                      <div className="col-6">
                                        <p>
                                          <FormattedMessage id="name" />
                                        </p>
                                        <p>
                                          <FormattedMessage id="payment.cardNumber" />
                                        </p>
                                        {/* <p><FormattedMessage id="payment.DEBIT" /></p> */}
                                        <p>{this.state.payosdata.card_type}</p>
                                      </div>
                                      <div className="col-6">
                                        <p>&nbsp;{creditCardInfo.cardOwner}</p>
                                        <p>
                                          &nbsp;xxxx xxxx xxxx{" "}
                                          {this.state.payosdata
                                            ? this.state.payosdata.last_4_digits
                                            : ""}
                                        </p>
                                        <p>&nbsp;</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                          val1: <Link className="red" target="_blank" to="/privacypolicy">Política de privacidad</Link>,
                          val2: <Link className="red" target="_blank" to="/termuse">la transferencia transfronteriza</Link>
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
                          onClick={() => this.goConfirmation()}
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
                <a
                  href="#"
                  onClick={(e) => this.goCart(e)}
                  className="product-summary__cartlink rc-styled-link"
                >
                  <FormattedMessage id="edit" />
                </a>
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

export default Payment;
