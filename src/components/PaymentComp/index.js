import React from "react";
import { FormattedMessage } from "react-intl";
import Skeleton from 'react-skeleton-loader'
import { formatMoney, jugeLoginStatus } from "@/utils/utils";
import { findIndex, find } from "lodash";
import Store from "@/store/store";
import axios from "axios";
import visaImg from "@/assets/images/credit-cards/visa.svg";
import amexImg from "@/assets/images/credit-cards/amex.svg";
import mastercardImg from "@/assets/images/credit-cards/mastercard.svg";
import discoverImg from "@/assets/images/credit-cards/discover.svg";
import paypalImg from "@/assets/images/credit-cards/paypal.png";
import {
  getPaymentMethod,
  deleteCard,
  addOrUpdatePaymentMethod
} from "@/api/payment";
import Loading from "@/components/Loading";
import ConfirmTooltip from '@/components/ConfirmTooltip'

class PaymentComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCardImgUrl: [visaImg, amexImg, mastercardImg],
      creditCardImgObj: {
        VISA: visaImg,
        MASTERCARD: mastercardImg,
        "AMERICAN EXPRESS": amexImg,
        DISCOVER: discoverImg,
      },
      creditCardList: [],
      isEdit: false,
      creditCardInfo: {
        cardNumber: "",
        cardMmyy: "",
        cardCvv: "",
        cardOwner: "",
        email: "",
        phoneNumber: "",
        identifyNumber: "111",
        isDefault: false,
      },
      loading: false,
      listLoading: true,
      listErr: '',
      currentVendor: '1'
    };
  }
  async componentDidMount () {
    if (Store.isLogin) {
      await this.getPaymentMethodList();
      this.state.creditCardList.map((el) => {
        if (el.isDefault === 1) {
          el.selected = true;
          this.props.getSelectedValue && this.props.getSelectedValue(el);
        }
      });
      this.setState({ creditCardList: this.state.creditCardList });
    }
  }
  async getPaymentMethodList () {
    this.setState({ listLoading: true })
    try {
      let res = await getPaymentMethod({
        customerId: JSON.parse(localStorage.getItem("rc-userinfo"))[
          "customerId"
        ]
      });
      this.setState({ creditCardList: res.context })
    } catch (err) {
      this.setState({ listErr: err.toString() })
    } finally {
      this.setState({
        loading: false,
        listLoading: false
      });
    }
  }
  initCardInfo () {
    this.setState({
      creditCardInfo: {
        cardNumber: "",
        cardMmyy: "",
        cardCvv: "",
        cardOwner: "",
        email: "",
        phoneNumber: "",
        identifyNumber: "111",
        isDefault: false,
      },
    }, () => {
      // this.scrollToPaymentComp()
    });
  }
  getElementToPageTop (el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message,
    });
    // this.scrollToPaymentComp();
    setTimeout(() => {
      this.setState({
        errorMsg: "",
      });
    }, 3000);
  };
  scrollToErrorMsg () {
    const widget = document.querySelector(".content-asset");
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo({
        top: this.getElementToPageTop(widget),
        behavior: "smooth",
      });
    }
  }
  scrollToPaymentComp () {
    const widget = document.querySelector("#PaymentComp");
    widget.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    // if (widget) {
    //   window.scrollTo({
    //     top: this.getElementToPageTop(widget),
    //     behavior: "smooth",
    //   });
    // }
  }
  async cardNumberChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let cardNumber = value.replace(/\s*/g, "") ||  this.state.creditCardInfo.cardNumber;

    try {
      let res = await axios.post(
        "https://api.paymentsos.com/tokens",
        {
          token_type: "credit_card",
          card_number: cardNumber,
          expiration_date: '12-20',
          credit_card_cvv: '888',
          holder_name: "echo"
        },
        {
          headers: {
            public_key:
              process.env.NODE_ENV === "development"
                ? "fd931719-5733-4b77-b146-2fd22f9ad2e3"
                : process.env.REACT_APP_PaymentKEY,
            "x-payments-os-env":
              process.env.NODE_ENV === "development"
                ? "test"
                : process.env.REACT_APP_PaymentENV,
            "Content-type": "application/json",
            app_id: "com.razorfish.dev_mexico",
            "api-version": "1.3.0",
          },
        }
      );
      console.log(res)
      this.setState({currentVendor: res.data.vendor})
    } catch (e) {
      console.log(e)
    }

  }
  cardInfoInputChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfo } = this.state;
    if (name === "cardNumber") {
      console.log(value, value.replace(/\s*/g, ""))
      creditCardInfo[name] = value.replace(/\s*/g, "");
    } else if (name === "cardMmyy") {
      let beforeValue = value.substr(0, value.length - 1);
      let inputValue = value.substr(value.length - 1, 1);

      if (
        creditCardInfo[name] !== beforeValue &&
        creditCardInfo[name].substr(0, creditCardInfo[name].length - 1) !==
        value
      )
        return;
      if (
        isNaN(parseInt(inputValue)) &&
        value.length > creditCardInfo[name].length
      )
        return;
      if (creditCardInfo[name].length == 2 && value.length == 3) {
        creditCardInfo[name] = value.slice(0, 2) + "/" + value.slice(2);
      } else if (creditCardInfo[name].length == 4 && value.length == 3) {
        creditCardInfo[name] = creditCardInfo[name].slice(0, 2);
      } else {
        creditCardInfo[name] = value;
      }
    } else {
      creditCardInfo[name] = value;
    }

    console.log(["cardNumber", "cardMmyy", "cardCvv"].indexOf(name));
    if (["cardNumber", "cardMmyy", "cardCvv"].indexOf(name) === -1) {
      this.inputBlur(e);
    }
    this.setState({ creditCardInfo });
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
  async handleSave (e) {
    e.preventDefault();
    const { creditCardInfo } = this.state;
    console.log(creditCardInfo)
    for (let k in creditCardInfo) {
      let fieldList =['cardNumber',
        'cardMmyy',
        'cardCvv',
        'cardOwner',
        'email',
        'phoneNumber',
        'identifyNumber']
      if (fieldList.indexOf(k) !== -1 && this.state.creditCardInfo[k] === "") {
        this.showErrorMsg("Please complete the required item");
        return
      }
      if (k === "email" && !/^\w+([-_.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(creditCardInfo[k].replace(/\s*/g, ""))) {
        this.showErrorMsg("Please enter the correct email");
        return;
      }
    }
    this.setState({
      loading: true,
    });
    try {
      let res = await axios.post(
        "https://api.paymentsos.com/tokens",
        {
          token_type: "credit_card",
          card_number: creditCardInfo.cardNumber,
          expiration_date: creditCardInfo.cardMmyy.replace(/\//, "-"),
          holder_name: creditCardInfo.cardOwner,
          credit_card_cvv: creditCardInfo.cardCvv,
        },
        {
          headers: {
            public_key:
              process.env.NODE_ENV === "development"
                ? "fd931719-5733-4b77-b146-2fd22f9ad2e3"
                : process.env.REACT_APP_PaymentKEY,
            "x-payments-os-env":
              process.env.NODE_ENV === "development"
                ? "test"
                : process.env.REACT_APP_PaymentENV,
            "Content-type": "application/json",
            app_id: "com.razorfish.dev_mexico",
            "api-version": "1.3.0",
          },
        }
      );
      if(!res.data.vendor) {
        this.showErrorMsg("Lo sentimos, los tipos de tarjeta de crédito actualmente admitidos son: VISA, American Express, MasterCard");
        this.setState({
          loading: false,
        });
        return
      }
      let params = {
        cardCvv: creditCardInfo.cardCvv,
        cardMmyy: creditCardInfo.cardMmyy,
        cardNumber: creditCardInfo.cardNumber,
        cardOwner: creditCardInfo.cardOwner,
        cardType: res.data.card_type,
        customerId: JSON.parse(localStorage.getItem("rc-userinfo"))[
          "customerId"
        ],
        email: creditCardInfo.email,
        phoneNumber: creditCardInfo.phoneNumber,
        vendor: res.data.vendor,
        id: creditCardInfo.id ? creditCardInfo.id : "",
        isDefault: creditCardInfo.isDefault ? "1" : "0",
      };
      console.log(1);
      let addRes = await addOrUpdatePaymentMethod(params);
      console.log(2);
      this.setState({
        loading: false,
        isEdit: false,
      });
      this.initCardInfo();
      await this.getPaymentMethodList();
      this.state.creditCardList.map((el) => {
        if (el.isDefault === 1) {
          el.selected = true;
          this.props.getSelectedValue && this.props.getSelectedValue(el);
        }
      });
      this.setState({ creditCardList: this.state.creditCardList });
    } catch (e) {
      let res = e.response;
      this.setState({
        loading: false,
      });
      if (res) {
        console.log(
          res.data.more_info,
          'body/expiration_date should match pattern "^(0[1-9]|1[0-2])(/|-|.| )d{2,4}"'
        );
        if (
          res.data.more_info.indexOf(
            "body/credit_card_cvv should match pattern"
          ) !== -1
        ) {
          this.showErrorMsg("your card cvv is invalid");
        } else if (
          res.data.more_info.indexOf(
            "body/card_number should match pattern"
          ) !== -1
        ) {
          this.showErrorMsg("your card number is invalid");
        } else if (
          res.data.more_info.indexOf(
            "body/expiration_date should match pattern"
          ) !== -1
        ) {
          this.showErrorMsg("your card expiration_date is invalid");
        } else {
          this.showErrorMsg(res.data.description);
        }
        return;
      }
      this.showErrorMsg("Save Failed!");
    }
  }
  async deleteCard (el) {
    let { creditCardList } = this.state
    el.confirmTooltipVisible = false
    this.setState({
      loading: true,
      creditCardList: creditCardList
    });
    await deleteCard({ id: el.id })
      .then((res) => {
        if (res.code === "K-000000") {
          // console.log(1)
          // this.showSuccessMsg(res.message || "Delete Address Success");
          this.getPaymentMethodList();
        } else {
          console.log(2);
          this.showErrorMsg(res.message || "Delete Address Failed");
          this.setState({
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.showErrorMsg("Delete Address Failed");
        this.setState({
          loading: false,
        });
      });
  }
  updateConfirmTooltipVisible (el, status) {
    let { creditCardList } = this.state
    el.confirmTooltipVisible = status
    this.setState({
      creditCardList: creditCardList
    })
  }
  render () {
    const { creditCardInfo, creditCardList, creditCardImgUrl } = this.state;
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {creditCardImgUrl.map((el, idx) => (
          <img key={idx} className="logo-payment-card" src={el} />
        ))}
      </span>
    );
    return (
      <div
        id="PaymentComp"
        className={`loginCardBox ${Store.isLogin ? '' : 'hidden'} ${this.state.isEdit && window.location.pathname === "/payment/payment" ? 'rc-border-all rc-border-colour--interface checkout--padding' : ''}`}>
        {this.state.loading ? <Loading positionFixed="true" /> : null}
        <div className={`table-toolbar d-flex flex-wrap justify-content-between p-0 ${!this.state.isEdit ? '' : 'hidden-xxl-down'}`}>
          <span className="t-gray">
            {
              creditCardList.length > 1
                ? <FormattedMessage
                  id="creditCardTipMany"
                  values={{ number: <b>{creditCardList.length}</b> }} />
                : <FormattedMessage
                  id="creditCardTip"
                  values={{ number: <b>{creditCardList.length}</b> }} />
            }
          </span>
          <span
            className="red font-weight-normal ui-cursor-pointer"
            onClick={() => {
              this.setState({ isEdit: true }, () => {
                this.scrollToPaymentComp()
              });
              this.initCardInfo();
            }}>
            <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus"></span>
            <FormattedMessage id="addNewCreditCard" />
          </span>
        </div>
        {/* <div className="addbox" onClick={() => this.openCreatePage()}>
          <div id="cross"></div>
        </div> */}
        <div>

        </div>
        {!this.state.isEdit
          ? this.state.listLoading
            ? <div className="mt-4"><Skeleton color="#f5f5f5" width="100%" height="50%" count={4} /></div>
            : this.state.listErr
              ? <div className="text-center p-4">{this.state.listErr}</div>
              : <div className="border">
                {
                  creditCardList.map((el, idx) => {
                    return (
                      <div
                        className={`pl-2 pr-2 creditCompleteInfoBox position-relative ui-cursor-pointer ${el.selected ? "active" : ""}`}
                        key={idx}
                        onClick={() => {
                          creditCardList.map((el) => (el.selected = false));
                          el.selected = true;
                          this.props.getSelectedValue &&
                            this.props.getSelectedValue(el);
                          this.setState({ creditCardList });
                        }}>
                        <div className={`pt-3 pb-3 ${idx !== creditCardList.length - 1 ? 'border-bottom' : ''} `}>
                          <div className="overflow-hidden position-absolute" style={{ right: '1%', top: '2%', zIndex: 1 }}>
                            <span className="pull-right position-relative border-left pl-2 ui-cursor-pointer-pure">
                              <span onClick={() => this.updateConfirmTooltipVisible(el, true)}>
                                <FormattedMessage id="delete" />
                              </span>
                              <ConfirmTooltip
                                display={el.confirmTooltipVisible}
                                confirm={e => this.deleteCard(el)}
                                updateChildDisplay={status => this.updateConfirmTooltipVisible(el, status)} />
                            </span>
                            <span
                              className="pull-right ui-cursor-pointer-pure"
                              onClick={() => {
                                this.setState({
                                  isEdit: true,
                                  creditCardInfo: el,
                                }, () => {
                                  this.scrollToPaymentComp()
                                });
                              }}
                            >
                              <FormattedMessage id="edit" />
                            </span>
                          </div>
                          <div className="row">
                            <div className={`col-6 col-sm-3 d-flex flex-column justify-content-center`}>
                              <img src={
                                this.state.creditCardImgObj[el.vendor]
                                  ? this.state.creditCardImgObj[el.vendor]
                                  : "https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                              } />
                            </div>
                            <div className={`col-12 col-sm-9 d-flex flex-column justify-content-around`}>
                              <div className="row ui-margin-top-1-md-down">
                                <div className="col-12 color-999">
                                  <FormattedMessage id="name2" /><br />
                                  <span className="creditCompleteInfo">{el.cardOwner}</span>
                                </div>
                              </div>
                              <div className="row ui-margin-top-1-md-down">
                                <div className="col-6 color-999">
                                  <FormattedMessage id="payment.cardNumber2" /><br />
                                  <span className="creditCompleteInfo">
                                    xxxx xxxx xxxx{" "}{el.cardNumber ? el.cardNumber.substring(el.cardNumber.length - 4) : ""}
                                  </span>
                                </div>
                                <div className="col-6 border-left color-999">
                                  <FormattedMessage id="payment.cardType" /><br />
                                  <span className="creditCompleteInfo">{el.cardType}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
          : null
        }
        {/* {window.location.pathname !== "/payment/payment" && !this.state.isEdit && (
          <div
            className="addbox"
            onClick={() => {
              this.setState({ isEdit: true });
              this.initCardInfo();
            }}
          >
            <div id="cross"></div>
          </div>
        )} */}

        <div
          className="credit-card-content"
          id="credit-card-content"
          style={{
            display: this.state.isEdit ? "block" : "none",
          }}
        >
          <div className="credit-card-form ">
            <div className="rc-margin-bottom--xs">
              <div className="content-asset">
                <div
                  className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                    this.state.errorMsg ? "" : "hidden"
                    }`}
                >
                  <aside
                    className="rc-alert rc-alert--error rc-alert--with-close errorAccount"
                    role="alert"
                  >
                    <span>{this.state.errorMsg}</span>
                    <button
                      className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                      onClick={() => {
                        this.setState({ errorMsg: "" });
                      }}
                      aria-label="Close"
                    >
                      <span className="rc-screen-reader-text">
                        <FormattedMessage id="close" />
                      </span>
                    </button>
                  </aside>
                </div>
                <aside
                  className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                    this.state.successMsg ? "" : "hidden"
                    }`}
                  role="alert"
                >
                  <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                    {this.state.successMsg}
                  </p>
                </aside>
                <p>
                  <FormattedMessage id="payment.acceptCards" />
                </p>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="cardNumber">
                      <FormattedMessage id="payment.cardNumber" />*
                      {CreditCardImg}
                      <div className="cardFormBox">
                        <span class="cardImage">
                          <img
                            alt="Card"
                            // src="https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                            src={
                              this.state.creditCardImgObj[this.state.currentVendor]
                                  ? this.state.creditCardImgObj[this.state.currentVendor]
                                  : "https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                            }
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
                                    id="number"
                                    value={creditCardInfo.cardNumber}
                                    onChange={(e) =>
                                      this.cardInfoInputChange(e)
                                    }
                                    onKeyUp={(e) => {
                                      this.cardNumberChange(e)
                                    }}
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
                                    value={creditCardInfo.cardMmyy}
                                    onChange={(e) =>
                                      this.cardInfoInputChange(e)
                                    }
                                    name="cardMmyy"
                                    maxLength="5"
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
                                    data-phonelength="18"
                                    data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                    data-range-error="The phone number should contain 10 digits"
                                    value={creditCardInfo.cardCvv}
                                    onChange={(e) =>
                                      this.cardInfoInputChange(e)
                                    }
                                    name="cardCvv"
                                    maxLength="3"
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
                        className="rc-input__control form-control cardOwner"
                        name="cardOwner"
                        value={creditCardInfo.cardOwner}
                        onChange={(e) => this.cardInfoInputChange(e)}
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
                        onChange={(e) => this.cardInfoInputChange(e)}
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
                    <label className="form-control-label" htmlFor="phoneNumber">
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
                        onChange={(e) => this.cardInfoInputChange(e)}
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
              <div className="text-right">
                <div
                  className="rc-input rc-input--inline"
                  style={{ marginTop: "10px", float: "left" }}
                  onClick={() => {
                    creditCardInfo.isDefault = !creditCardInfo.isDefault;
                    this.setState({ creditCardInfo });
                  }}
                >
                  <input
                    type="checkbox"
                    id="defaultAddress"
                    className="rc-input__checkbox"
                    value={creditCardInfo.isDefault}
                  />
                  {!creditCardInfo.isDefault ? (
                    <label className="rc-input__label--inline">
                      <FormattedMessage id="setDefaultPaymentMethod"></FormattedMessage>
                    </label>
                  ) : (
                      <label className="rc-input__label--inline defaultAddressChecked">
                        <FormattedMessage id="setDefaultPaymentMethod"></FormattedMessage>
                      </label>
                    )}
                </div>
                <a
                  className="rc-styled-link editPersonalInfoBtn"
                  name="contactInformation"
                  onClick={() => {
                    this.initCardInfo();
                    this.setState({ isEdit: false })
                    // this.scrollToPaymentComp();
                  }}
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
                  onClick={(e) => this.handleSave(e)}
                >
                  <FormattedMessage id="save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentComp;
