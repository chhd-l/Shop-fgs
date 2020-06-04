import React from "react";
import { FormattedMessage } from "react-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";
import SideMenu from "@/components/SideMenu";
import "./index.css";
import { findIndex } from "lodash";
import {
  saveAddress,
  setDefaltAddress,
  deleteAddress,
  getAddressById,
  editAddress,
} from "@/api/address";
import { Link } from "react-router-dom";
import Loading from "@/components/Loading";
import { getDict } from "@/api/dict";

import visaImg from "@/assets/images/credit-cards/visa.svg";
import amexImg from "@/assets/images/credit-cards/amex.svg";
import mastercardImg from "@/assets/images/credit-cards/mastercard.svg";
import discoverImg from "@/assets/images/credit-cards/discover.svg";
import paypalImg from "@/assets/images/credit-cards/paypal.png";
import axios from 'axios'
import { addOrUpdatePaymentMethod } from "@/api/payment"

export default class ShippingAddressFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModal: false,
      isAdd: true,
      addressList: [],
      total: 0,
      errorMsg: "",
      successMsg: "",
      addressForm: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: 0,
        city: 0,
        postCode: "",
        phoneNumber: "",
        rfc: "",
        isDefault: false,
        deliveryAddressId: "",
        customerId: "",
      },
      cityList: [],
      countryList: [],
      creditCardImgUrl: [visaImg, amexImg, mastercardImg],
      creditCardImgObj: {
        VISA: visaImg,
        MASTERCARD: mastercardImg,
        "AMERICAN EXPRESS": amexImg,
        DISCOVER: discoverImg,
      },
      creditCardInfo: {
        cardNumber: "",
        cardMmyy: "",
        cardCvv: "",
        cardOwner: "",
        email: "",
        phoneNumber: "",
        identifyNumber: "111",
        isDefault: false
      },
      payosdata: {},
    };
  }
  componentDidMount() {
    console.log(this.props)
    const { location } = this.props
    if(location.query) {
      sessionStorage.setItem('paymentMethodForm', JSON.stringify(location.query))
      this.setState({
        creditCardInfo: location.query
      })
    }else if(sessionStorage.getItem('paymentMethodForm')) {
      let paymentMethodForm = JSON.parse(sessionStorage.getItem('paymentMethodForm'))
      this.setState({
        creditCardInfo: paymentMethodForm
      })
    }
  }
  componentWillMount() {
    sessionStorage.removeItem('paymentMethodForm')
  }
  cardInfoInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfo } = this.state;
    // if (name === "phoneNumber") {
    //   this.phoneNumberInput(e, creditCardInfo, name);
    // } else {
    creditCardInfo[name] = value;
    // }
    console.log(["cardNumber", "cardMmyy", "cardCvv"].indexOf(name));
    if (["cardNumber", "cardMmyy", "cardCvv"].indexOf(name) === -1) {
      this.inputBlur(e);
    }
    this.setState({ creditCardInfo: creditCardInfo });
  }
  inputBlur(e) {
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
  async handleSave() {
    const { creditCardInfo } = this.state
    this.setState({
      loading:true
    })
    try {

      let res = await axios.post('https://api.paymentsos.com/tokens', {
        "token_type": "credit_card",
        "card_number": creditCardInfo.cardNumber,
        "expiration_date": creditCardInfo.cardMmyy.replace(/\//, '-'),
        "holder_name": creditCardInfo.cardOwner,
        "credit_card_cvv": creditCardInfo.cardCvv
      }, {
        headers: {
          public_key: 'fd931719-5733-4b77-b146-2fd22f9ad2e3',
          "x-payments-os-env": 'test',
          "Content-type": 'application/json',
          app_id: 'com.razorfish.dev_mexico',
          "api-version": '1.3.0'
        }
      })
      console.log(res.data)
      let params = {
        cardCvv: creditCardInfo.cardCvv,
        cardMmyy: creditCardInfo.cardMmyy,
        cardNumber: creditCardInfo.cardNumber,
        cardOwner: creditCardInfo.cardOwner,
        cardType: res.data.card_type,
        customerId: JSON.parse(sessionStorage.getItem('rc-userinfo'))['customerId'],
        email: creditCardInfo.email,
        phoneNumber: creditCardInfo.phoneNumber,
        vendor: res.data.vendor,
        id: creditCardInfo.id?creditCardInfo.id: '',
        isDefault: creditCardInfo.isDefault? '1': '0'
      }
      console.log(1)
      let  addRes = await addOrUpdatePaymentMethod(params)
      console.log(2)
      this.setState({
        loading:false
      })
      this.handleCancel()
    }catch(e)  {
      console.log(e)
      this.setState({
        loading:false
      })
      this.showErrorMsg("Save Failed!")
    }
  }
  handleCancel=()=>{
    const { history } = this.props
    history.push('/account/paymentMethod')
  }

  showErrorMsg=(message)=>{
    this.setState({
      errorMsg: message
    })
    this.scrollToErrorMsg()
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      })
    }, 3000)
  }

  showSuccessMsg=(message)=>{
    this.setState({
      successMsg: message
    })
    this.scrollToErrorMsg()
    setTimeout(() => {
      this.setState({
        successMsg: ''
      })
    }, 2000)
  }
  //定位
  scrollToErrorMsg () {
    const widget = document.querySelector('.billing-payment')
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo(this.getElementToPageTop(widget), 0)
    }
  }
  getElementToPageTop (el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop
    }
    return el.offsetTop
  }
  render() {
    const { addressForm, creditCardInfo } = this.state;
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {this.state.creditCardImgUrl.map((el, idx) => (
          <img key={idx} className="logo-payment-card" src={el} />
        ))}
      </span>
    );
    return (
      <div>
        <Header
          showMiniIcons={true}
          location={this.props.location}
          history={this.props.history}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              {this.state.loading ? <Loading positionFixed="true" /> : null}
              <SideMenu type="PaymentMethod" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="billing-payment">
                <div className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${this.state.errorMsg ? '' : 'hidden'}`}>
                  <aside className="rc-alert rc-alert--error rc-alert--with-close errorAccount" role="alert">
                    <span>{this.state.errorMsg}</span>
                    <button
                      className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                      onClick={() => { this.setState({ errorMsg: '' }) }}
                      aria-label="Close">
                      <span className="rc-screen-reader-text">
                        <FormattedMessage id="close" />
                      </span>
                    </button>
                  </aside>
                </div>
                  <div
                    className="rc-list__accordion-item"
                    data-method-id="CREDIT_CARD"
                    style={{
                      display: "block",
                      // this.state.payMethod === "creditCard"
                      //   ? "block"
                      //   : "none",
                    }}
                  >
                    <div className="rc-border-all rc-border-colour--interface checkout--padding">
                      <div
                        className="credit-card-content"
                        id="credit-card-content"
                        style={{
                          display: "block",
                          // !this.state.isCompleteCredit
                          //   ? "block"
                          //   : "none",
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
                                    <FormattedMessage id="payment.cardNumber" />
                                    *{CreditCardImg}
                                    {/* <form id="payment-form">
                                      <div id="card-secure-fields"></div>
                                      <button
                                        id="submit"
                                        name="submit"
                                        className="creadit"
                                        type="submit"
                                      >
                                        Pay
                                      </button>
                                    </form> */}
                                    <div className="cardFormBox">
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
                                                    this.cardInfoInputChange(e)
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
                                                    creditCardInfo.cardMmyy
                                                  }
                                                  onChange={(e) =>
                                                    this.cardInfoInputChange(e)
                                                  }
                                                  name="cardMmyy"
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
                                                  value={creditCardInfo.cardCvv}
                                                  onChange={(e) =>
                                                    this.cardInfoInputChange(e)
                                                  }
                                                  name="cardCvv"
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
                                    </div>
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
                            <div className="text-right">
                            {/* <div className="form-group col-6"> */}
                      <div className="rc-input rc-input--inline" style={{marginTop: "10px", float: 'left'}} onClick={()=> {
                        creditCardInfo.isDefault = !creditCardInfo.isDefault
                        this.setState({creditCardInfo})
                      }}>
                        <input type="checkbox" 
                          id="defaultAddress"
                          className="rc-input__checkbox" 
                          
                          value={creditCardInfo.isDefault}/>
                          {
                            !creditCardInfo.isDefault?<label className="rc-input__label--inline" >
                            <FormattedMessage id="setDefaultPaymentMethod"></FormattedMessage>
                          </label>:<label className="rc-input__label--inline defaultAddressChecked">
                          <FormattedMessage id="setDefaultPaymentMethod"></FormattedMessage>
                        </label>
                          }
                      </div>
                    {/* </div> */}
                              <a
                                className="rc-styled-link editPersonalInfoBtn"
                                name="contactInformation"
                                onClick={() => this.handleCancel()}
                              >
                                <FormattedMessage id="cancel" />
                              </a>
                              &nbsp;
                              <FormattedMessage id="or" />
                              &nbsp;
                              <button
                                className="rc-btn rc-btn--one submitBtn editAddress"
                                data-sav="false"
                                name="contactInformation"
                                type="submit"
                                onClick={() => this.handleSave()}
                              >
                                <FormattedMessage id="save" />
                              </button>
                            </div>
                            {/* <div className="row">
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
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
