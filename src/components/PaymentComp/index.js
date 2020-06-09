import React from "react";
import { FormattedMessage } from "react-intl";
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
  postVisitorRegisterAndLogin,
  batchAdd,
  confirmAndCommit,
  customerCommitAndPay,
  getPaymentMethod,
  deleteCard,
  addOrUpdatePaymentMethod,
} from "@/api/payment";

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
    };
  }
  async componentDidMount() {
    console.log(window.location.pathname, "111");
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
  async getPaymentMethodList() {
    try {
      let res = await getPaymentMethod({
        customerId: JSON.parse(sessionStorage.getItem("rc-userinfo"))[
          "customerId"
        ],
      });
      if (res.code === "K-000000") {
        this.setState({
          creditCardList: res.context,
        });
      }
      this.setState({
        loading: false,
      });
    } catch {
      this.showErrorMsg("get data failed");
      this.setState({
        loading: false,
      });
    }
  }
  initCardInfo() {
    // window.scrollTo(0, 0)
    window.location.href = "#PaymentComp";
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
    });
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }

  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message,
    });
    // this.scrollToErrorMsg();
    setTimeout(() => {
      this.setState({
        errorMsg: "",
      });
    }, 3000);
  };
  scrollToErrorMsg() {
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
  cardInfoInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfo } = this.state;
    if (name === "cardMmyy") {
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
  async handleSave(e) {
    e.preventDefault();
    const { creditCardInfo } = this.state;
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
      console.log(res.data);
      let params = {
        cardCvv: creditCardInfo.cardCvv,
        cardMmyy: creditCardInfo.cardMmyy,
        cardNumber: creditCardInfo.cardNumber,
        cardOwner: creditCardInfo.cardOwner,
        cardType: res.data.card_type,
        customerId: JSON.parse(sessionStorage.getItem("rc-userinfo"))[
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
  async deleteCard(id) {
    this.setState({
      loading: true,
    });
    let params = {
      id: id,
    };
    await deleteCard(params)
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
  render() {
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
        className="loginCardBox"
        style={{
          display: Store.isLogin ? "block" : "none",
        }}
      >
        <div
          className="table-toolbar"
          style={{
            display: !this.state.isEdit ? "flex" : "none",
          }}
        >
          <span className="t-gray">
            <FormattedMessage
              id="creditCardTip"
              values={{
                number: <b>{this.state.creditCardList.length}</b>,
              }}
            />
          </span>
          {window.location.pathname === "/payment/payment" && (
            <button
              type="button"
              className="address-btn"
              onClick={() => {
                this.setState({ isEdit: true });
                this.initCardInfo();
              }}
            >
              <span>
                <FormattedMessage id="addNewCreditCard"></FormattedMessage>
              </span>
            </button>
          )}
        </div>
        {/* <div className="addbox" onClick={() => this.openCreatePage()}>
          <div id="cross"></div>
        </div> */}
        {!this.state.isEdit &&
          creditCardList.map((el) => {
            return (
              <div
                onClick={() => {
                  creditCardList.map((el) => (el.selected = false));
                  el.selected = true;
                  this.props.getSelectedValue &&
                    this.props.getSelectedValue(el);
                  this.setState({ creditCardList });
                }}
                className={`creditCompleteInfoBox ${
                  el.selected ? "active" : ""
                }`}
                style={{
                  display: "block",
                }}
              >
                <p>
                  <span
                    className="pull-right"
                    onClick={() => {
                      this.setState({
                        isEdit: true,
                        creditCardInfo: el,
                      });
                      window.location.href = "#PaymentComp";
                    }}
                  >
                    <FormattedMessage id="edit" />
                  </span>
                  <span
                    className="pull-right"
                    onClick={() => {
                      this.deleteCard(el.id);
                    }}
                  >
                    <FormattedMessage id="delete" />
                  </span>
                </p>
                <div className="row">
                  <div className="col-sm-3">
                    <img
                      src={
                        this.state.creditCardImgObj[el.vendor]
                          ? this.state.creditCardImgObj[el.vendor]
                          : "https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="col-sm-9">
                    <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                      <div className="col-4">
                        <p>
                          <FormattedMessage id="name" />
                        </p>
                        <p>
                          <FormattedMessage id="payment.cardNumber" />
                        </p>
                        <p>{el.cardType}</p>
                      </div>
                      <div className="col-8">
                        <p>&nbsp;{el.cardOwner}</p>
                        <p>
                          &nbsp;xxxx xxxx xxxx{" "}
                          {el.cardNumber
                            ? el.cardNumber.substring(el.cardNumber.length - 4)
                            : ""}
                        </p>
                        <p>&nbsp;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {window.location.pathname !== "/payment/payment" && !this.state.isEdit && (
          <div
            className="addbox"
            onClick={() => {
              this.setState({ isEdit: true });
              this.initCardInfo();
            }}
          >
            <div id="cross"></div>
          </div>
        )}

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
                                    id="number"
                                    value={creditCardInfo.cardNumber}
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
                        id="cardholder-name"
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
                    this.setState({ isEdit: false });
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
