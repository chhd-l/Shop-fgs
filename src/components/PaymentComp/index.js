import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import Skeleton from "react-skeleton-loader";
import { formatMoney } from "@/utils/utils";
import { findIndex, find } from "lodash";
import { inject, observer } from 'mobx-react';
import axios from "axios";
import successImg from "@/assets/images/success.png";
import {
  getPaymentMethod,
  deleteCard,
  addOrUpdatePaymentMethod,
} from "@/api/payment";
import Loading from "@/components/Loading";
import ConfirmTooltip from "@/components/ConfirmTooltip";
import { CREDIT_CARD_IMG_ENUM, CREDIT_CARD_IMGURL_ENUM } from '@/utils/constant'
import store from 'storejs'
import "./index.css";

@inject("loginStore")
@observer
class PaymentComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCardList: [],
      isEdit: false,
      creditCardInfo: {
        cardNumber: "",
        cardMmyy: "",
        cardCvv: "",
        cardOwner: this.props.cardOwner,
        email: "",
        phoneNumber: this.props.phoneNumber,
        identifyNumber: "111",
        isDefault: false,
      },
      loading: false,
      listLoading: true,
      listErr: "",
      currentVendor: "1",
      currentCvv: "",
      isCurrentCvvConfirm: false,
      currentCardInfo: {},
      completeCardShow: false,
      deliveryAddress: {},
      confirmCardInfo: {}
    };
  }
  componentWillReceiveProps (props) {
    if (props.isAddNewCard) {
      this.setState({ isEdit: true }, () => {
        this.scrollToPaymentComp();
      });
      this.initCardInfo();
    }
  }
  async componentDidMount () {
    if (this.props.loginStore.isLogin) {
      if (store.get('loginDeliveryInfo')) {
        let deliveryInfo = store.get('loginDeliveryInfo')
        deliveryInfo.deliveryAddress.cardOwner = deliveryInfo.deliveryAddress.firstName + '' + deliveryInfo.deliveryAddress.lastName
        this.setState({ deliveryAddress: deliveryInfo.deliveryAddress }, () => {
          this.initCardInfo()
        })
      }

      await this.getPaymentMethodList();
      // this.state.creditCardList.map((el) => {
      //   if (el.isDefault === 1) {
      //     el.selected = true;
      //     this.props.getSelectedValue && this.props.getSelectedValue(el);
      //   }else {
      //     el.selected = false;
      //   }
      // });
      let filterList = this.state.creditCardList.filter(el => {
        if (el.isDefault === 1) {
          el.selected = true;
          return true
        } else {
          el.selected = false;
          return false;
        }
      });
      if (filterList.length) {
        // this.props.getSelectedValue && this.props.getSelectedValue(filterList[0]);
      } else if (this.state.creditCardList.length) {
        this.state.creditCardList[0].selected = true;
        // this.props.getSelectedValue && this.props.getSelectedValue(this.state.creditCardList[0]);
      }
      this.setState({ creditCardList: this.state.creditCardList });
    }
  }
  get userInfo () {
    return this.props.loginStore.userInfo
  }
  async getPaymentMethodList () {
    let { confirmCardInfo } = this.state
    this.setState({ listLoading: true });
    try {
      let res = await getPaymentMethod({
        customerId: this.userInfo ? this.userInfo.customerId : ''
      });
      if (!res.context.length) {
        this.props.noCardCallback && this.props.noCardCallback(true)
      } else {
        this.props.noCardCallback && this.props.noCardCallback(false)
      }

      if (confirmCardInfo.id && res.context.filter(el => confirmCardInfo.id === el.id).length) {
        console.log(res.context.filter(el => confirmCardInfo.id === el.id).length)
        this.setState({ isCurrentCvvConfirm: true })
      } else {
        this.props.getSelectedValue && this.props.getSelectedValue({})
      }
      this.setState({ creditCardList: res.context });
    } catch (err) {
      console.log(err)
      this.setState({ listErr: err.toString() });
    } finally {
      this.setState({
        loading: false,
        listLoading: false,
      });
    }
  }
  initCardInfo () {
    let { deliveryAddress } = this.state
    this.setState(
      {
        creditCardInfo: {
          cardNumber: "",
          cardMmyy: "",
          cardCvv: "",
          cardOwner: deliveryAddress.cardOwner || '',
          email: "",
          phoneNumber: deliveryAddress.phoneNumber || '',
          identifyNumber: "111",
          isDefault: false,
        },
      },
      () => {
        // this.scrollToPaymentComp()
      }
    );
  }
  getElementToPageTop (el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  confirmCvv (e, el) {
    e.preventDefault()
    e.stopPropagation()
    let { isCurrentCvvConfirm } = this.state
    if (this.state.currentCvv === el.cardCvv) {
      isCurrentCvvConfirm = true
      this.props.getSelectedValue && this.props.getSelectedValue(el);
    } else {
      isCurrentCvvConfirm = false
      this.showErrorMsg(this.props.intl.messages.cvvWarning);
    }
    console.log(isCurrentCvvConfirm)
    this.setState({ isCurrentCvvConfirm: isCurrentCvvConfirm, confirmCardInfo: el })
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
      block: "center",
    });
    // if (widget) {
    //   window.scrollTo({
    //     top: this.getElementToPageTop(widget),
    //     behavior: "smooth",
    //   });
    // }
  }
  currentCvvChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ currentCvv: value })
  }
  async cardNumberChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let cardNumber =
      value.replace(/\s*/g, "") || this.state.creditCardInfo.cardNumber;

    try {
      let res = await axios.post(
        "https://api.paymentsos.com/tokens",
        {
          token_type: "credit_card",
          card_number: cardNumber,
          expiration_date: "12-20",
          credit_card_cvv: "888",
          holder_name: "echo",
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
      console.log(res);
      this.setState({ currentVendor: res.data.vendor });
    } catch (e) {
      console.log(e);
    }
  }
  cardInfoInputChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const { creditCardInfo } = this.state;
    if (name === "cardNumber") {
      let beforeValue = value.substr(0, value.length - 1);
      let inputValue = value.substr(value.length - 1, 1);
      if (isNaN(inputValue)) {
        creditCardInfo[name] = beforeValue
      } else {
        creditCardInfo[name] = value.replace(/\s*/g, "");
      }
      // creditCardInfo[name] = value.replace(/\s*/g, "");
    } else if (name === "cardMmyy") {
      // 获取 / 前后数字
      let splitArr = value.split('/')
      let noFormatStr = ''
      let finalValue = ''
      // 获得不带/的数字
      if (splitArr[1] || splitArr[0].length > 2) {
        noFormatStr = splitArr[0].concat(splitArr[1] ? splitArr[1] : '')
        finalValue = noFormatStr.slice(0, 2) + '/' + noFormatStr.slice(2)
      } else {
        noFormatStr = splitArr[0]
        finalValue = noFormatStr.slice(0, 2)
      }
      creditCardInfo[name] = finalValue;
      // let beforeValue = value.substr(0, value.length - 1);
      // let inputValue = value.substr(value.length - 1, 1);

      // if (
      //   creditCardInfo[name] !== beforeValue &&
      //   creditCardInfo[name].substr(0, creditCardInfo[name].length - 1) !==
      //   value
      // )
      //   return;
      // if (
      //   isNaN(parseInt(inputValue)) &&
      //   value.length > creditCardInfo[name].length
      // )
      //   return;
      // if (creditCardInfo[name].length == 2 && value.length == 3) {
      //   creditCardInfo[name] = value.slice(0, 2) + "/" + value.slice(2);
      // } else if (creditCardInfo[name].length == 4 && value.length == 3) {
      //   creditCardInfo[name] = creditCardInfo[name].slice(0, 2);
      // } else {
      //   creditCardInfo[name] = value;
      // }
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
    console.log('haha')
    e.preventDefault();
    const { creditCardInfo } = this.state;
    for (let k in creditCardInfo) {
      let fieldList = [
        "cardNumber",
        "cardMmyy",
        "cardCvv",
        "cardOwner",
        "email",
        "phoneNumber",
        "identifyNumber",
      ];
      if (fieldList.indexOf(k) !== -1 && this.state.creditCardInfo[k] === "") {
        this.showErrorMsg(
          this.props.intl.messages.pleasecompleteTheRequiredItem
        );
        return;
      }
      if (
        k === "email" &&
        !/^\w+([-_.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(
          creditCardInfo[k].replace(/\s*/g, "")
        )
      ) {
        this.showErrorMsg(this.props.intl.messages.pleaseEnterTheCorrectEmail);
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
            public_key: process.env.REACT_APP_PaymentKEY,
            "x-payments-os-env": process.env.REACT_APP_PaymentENV,
            "Content-type": "application/json",
            app_id: "com.razorfish.dev_mexico",
            "api-version": "1.3.0",
          },
        }
      );
      if (!res.data.vendor) {
        this.showErrorMsg(
          "Lo sentimos, los tipos de tarjeta de crédito actualmente admitidos son: VISA, American Express, MasterCard"
        );
        this.setState({
          loading: false,
        });
        return;
      }
      let params = {
        cardCvv: creditCardInfo.cardCvv,
        cardMmyy: creditCardInfo.cardMmyy,
        cardNumber: creditCardInfo.cardNumber,
        cardOwner: creditCardInfo.cardOwner,
        cardType: res.data.card_type,
        customerId: this.userInfo ? this.userInfo.customerId : '',
        email: creditCardInfo.email,
        phoneNumber: creditCardInfo.phoneNumber,
        vendor: res.data.vendor,
        id: creditCardInfo.id ? creditCardInfo.id : "",
        isDefault: creditCardInfo.isDefault ? "1" : "0",
      };

      let addRes = await addOrUpdatePaymentMethod(params);

      if (this.state.creditCardList.length) {
        this.setState({
          loading: false,
          isEdit: false,
        });
        this.initCardInfo();
        await this.getPaymentMethodList();

        if (window.location.pathname === "/payment/payment") {
          let creditCardInfo = {}
          this.state.creditCardList.map(el => {
            if (el.id === addRes.context.id) {
              el.selected = true
              creditCardInfo = el
            }
          })
          console.log(this.state.creditCardList, 'list')
          this.props.getSelectedValue &&
            this.props.getSelectedValue(creditCardInfo);
          this.setState({ isCurrentCvvConfirm: true })
        } else {
          let filterList = this.state.creditCardList.filter((el) => {
            if (el.isDefault === 1) {
              el.selected = true;
              return true;
            } else {
              el.selected = false;
              return false;
            }
          });
          if (filterList.length) {
          } else if (this.state.creditCardList.length) {
            this.state.creditCardList[0].selected = true;
          }
        }
      } else {
        await this.getPaymentMethodList();
        if (window.location.pathname !== "/payment/payment") {
          let filterList = this.state.creditCardList.filter((el) => {
            if (el.isDefault === 1) {
              el.selected = true;
              return true;
            } else {
              el.selected = false;
              return false;
            }
          });
          if (filterList.length) {
          } else if (this.state.creditCardList.length) {
            this.state.creditCardList[0].selected = true;
          }
        }
        this.setState({
          loading: false,
          isEdit: false,
          currentCardInfo: addRes.context,
          creditCardInfo: addRes.context,
          completeCardShow: true,
        }, () => {
          this.props.getSelectedValue &&
            this.props.getSelectedValue(this.state.creditCardInfo);
        });
      }
      this.setState({ creditCardList: this.state.creditCardList, currentCvv: '' });
    } catch (e) {
      let res = e.response;
      this.setState({
        loading: false,
        currentCvv: ''
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
          this.showErrorMsg(this.props.intl.messages.cardCvvIsInvalid);
        } else if (
          res.data.more_info.indexOf(
            "body/card_number should match pattern"
          ) !== -1
        ) {
          this.showErrorMsg(this.props.intl.messages.cardNumberIsInvalid);
        } else if (
          res.data.more_info.indexOf(
            "body/expiration_date should match pattern"
          ) !== -1
        ) {
          this.showErrorMsg(this.props.intl.messages.expirationDateIsInvalid);
        } else {
          this.showErrorMsg(res.data.description);
        }
        return;
      }
      this.showErrorMsg(this.props.intl.messages.saveFailed);
    }
  }
  async deleteCard (el) {
    let { creditCardList } = this.state;
    el.confirmTooltipVisible = false;
    this.setState({
      loading: true,
      creditCardList: creditCardList,
    });
    await deleteCard({ id: el.id })
      .then((res) => {
        if (res.code === "K-000000") {
          // console.log(1)
          // this.showSuccessMsg(res.message || "Delete Address Success");
          this.getPaymentMethodList();
        } else {
          console.log(2);
          this.showErrorMsg(
            res.message || this.props.intl.messages.deleteAddressFailed
          );
          this.setState({
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.showErrorMsg(this.props.intl.messages.deleteAddressFailed);
        this.setState({
          loading: false,
        });
      });
  }
  updateConfirmTooltipVisible (el, status) {
    let { creditCardList } = this.state;
    el.confirmTooltipVisible = status;
    this.setState({
      creditCardList: creditCardList,
    });
  }
  render () {
    let pathname = window.location.pathname
    const {
      creditCardInfo,
      creditCardList,
      isCurrentCvvConfirm,
      currentCardInfo,
    } = this.state;
    const CreditCardImg = (
      <span className="logo-payment-card-list logo-credit-card">
        {CREDIT_CARD_IMGURL_ENUM.map((el, idx) => (
          <img key={idx} className="logo-payment-card" src={el} />
        ))}
      </span>
    );
    const { isLogin } = this.props.loginStore
    return (
      <div
        style={{display: this.props.show === true?'block': 'none'}}
        id="PaymentComp"
        className={`loginCardBox ${isLogin ? "" : "hidden"}`}
      >
        {this.state.loading ? <Loading positionFixed="true" /> : null}
        <div
          className={`table-toolbar d-flex flex-wrap justify-content-between p-0 ${
            !this.state.isEdit && (this.state.creditCardList.length || pathname === '/account/paymentMethod')
              ? ""
              : "hidden-xxl-down"
            }`}
        >
          <span className="t-gray">
            {creditCardList.length > 1 ? (
              <FormattedMessage
                id="creditCardTipMany"
                values={{ number: <b>{creditCardList.length}</b> }}
              />
            ) : (
                <FormattedMessage
                  id="creditCardTip"
                  values={{ number: <b>{creditCardList.length}</b> }}
                />
              )}
          </span>
          {/* <span
            className="red font-weight-normal ui-cursor-pointer d-flex align-items-center"
            onClick={() => {
              this.setState({ isEdit: true }, () => {
                this.scrollToPaymentComp();
              });
              this.initCardInfo();
            }}
          >
            <span className="rc-icon rc-plus--xs rc-brand1 address-btn-plus"></span>
            <span style={{ marginTop: -3 }}>
              <FormattedMessage id="addNewCreditCard" />
            </span>
          </span> */}
        </div>
        {/* <div className="addbox" onClick={() => this.openCreatePage()}>
          <div id="cross"></div>
        </div> */}
        <div></div>
        {!this.state.isEdit && (this.state.creditCardList.length || pathname === '/account/paymentMethod') ? (
          this.state.listLoading ? (
            <div className="mt-4">
              <Skeleton color="#f5f5f5" width="100%" height="50%" count={4} />
            </div>
          ) : this.state.listErr ? (
            <div className="text-center p-4">{this.state.listErr}</div>
          ) : (
                <>
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
                        onClick={(e) => {
                          e.preventDefault()
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

                  {creditCardList.map((el, idx) => {
                    return (
                      <div
                        className={`rounded pl-2 pr-2 creditCompleteInfoBox position-relative ui-cursor-pointer border border-blue ${
                          el.selected ? "active" : ""
                          } ${idx !== creditCardList.length - 1 ? 'border-bottom-0' : ''}`}
                        key={idx}
                        onClick={() => {
                          if (pathname !== '/account/paymentMethod') {
                            if (creditCardList[idx].selected) return;
                            creditCardList.map((el) => (el.selected = false));
                            el.selected = true;
                            // this.props.getSelectedValue &&
                            //   this.props.getSelectedValue(el);
                            this.props.getSelectedValue &&
                              this.props.getSelectedValue({});
                            this.setState({
                              creditCardList,
                              isCurrentCvvConfirm: false,
                              currentCvv: "",
                            });
                          }
                        }}
                      >
                        <div
                          className={`pt-3 pb-3 ${
                            idx !== creditCardList.length - 1 ? "border-bottom" : ""
                            } `}
                        >
                          <div
                            className="position-absolute"
                            style={{ right: "1%", top: "2%", zIndex: "1" }}
                          >
                            <span className="pull-right position-relative border-left pl-2 ui-cursor-pointer-pure">
                              <span
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  this.updateConfirmTooltipVisible(el, true);
                                }}
                              >
                                <FormattedMessage id="delete" />
                              </span>
                              <ConfirmTooltip
                                containerStyle={{
                                  transform: "translate(-89%, 105%)",
                                }}
                                arrowStyle={{ left: "89%" }}
                                display={el.confirmTooltipVisible}
                                confirm={(e) => this.deleteCard(el)}
                                updateChildDisplay={(status) =>
                                  this.updateConfirmTooltipVisible(el, status)
                                }
                              />
                            </span>
                            <span
                              className="pull-right ui-cursor-pointer-pure"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                let creditCardInfo = { ...el }
                                creditCardInfo.cardCvv = ''
                                this.setState(
                                  {
                                    isEdit: true,
                                    creditCardInfo,
                                  },
                                  () => {
                                    this.scrollToPaymentComp();
                                  }
                                );
                              }}
                            >
                              <FormattedMessage id="edit" />
                            </span>
                          </div>
                          <div className="row">
                            <div
                              className={`col-6 col-sm-3 d-flex flex-column justify-content-center`}
                            >
                              <img
                                src={
                                  CREDIT_CARD_IMG_ENUM[el.vendor]
                                    ? CREDIT_CARD_IMG_ENUM[el.vendor]
                                    : "https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                                }
                              />
                            </div>
                            <div
                              className={`col-12 col-sm-9 flex-column justify-content-around`}
                              style={{ display: pathname === "/payment/payment" ? 'flex ' : 'none ' }}
                            >
                              <div className="row ui-margin-top-1-md-down">
                                <div
                                  className="col-12 color-999"
                                  style={{
                                    display: el.selected && !isCurrentCvvConfirm ? "none" : "block",
                                  }}
                                >
                                  <span style={{ fontSize: '14px' }}><FormattedMessage id="name2" /></span>
                                  <br />
                                  <span className="creditCompleteInfo">
                                    {el.cardOwner}
                                  </span>
                                </div>
                                <div
                                  className="col-12 color-999"
                                  style={{
                                    display: el.selected && !isCurrentCvvConfirm ? "block" : "none",
                                  }}
                                >
                                  <span style={{ fontSize: '14px' }}><FormattedMessage id="CVV" /></span>
                                  <br />
                                  <div
                                    className="col-4 color-999"
                                    style={{
                                      textAlign: "left",
                                      paddingLeft: "0",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    <input
                                      onChange={(e) => {
                                        this.currentCvvChange(e);
                                      }}
                                      type="password"
                                      maxLength="4"
                                      style={{ width: "100%" }}
                                      value={this.state.currentCvv}
                                    />
                                  </div>
                                  {/* <span className="creditCompleteInfo">
                                    <input type="password" maxLength="4" />
                                  </span> */}
                                </div>
                              </div>
                              <div className="row ui-margin-top-1-md-down">
                                <div className="col-md-4 col-6 color-999">
                                  <span style={{ fontSize: '14px' }}><FormattedMessage id="payment.cardNumber2" /></span>
                                  <br />
                                  <span className="creditCompleteInfo">
                                    xxxx xxxx xxxx{" "}
                                    {el.cardNumber
                                      ? el.cardNumber.substring(
                                        el.cardNumber.length - 4
                                      )
                                      : ""}
                                  </span>
                                </div>
                                <div className="col-md-4 col-6 border-left color-999">
                                  <span style={{ fontSize: '14px' }}><FormattedMessage id="payment.cardType" /></span>
                                  <br />
                                  <span className="creditCompleteInfo">
                                    {el.cardType}
                                  </span>
                                </div>
                                <div className="col-md-4 col-12 border-left color-999">
                                  <button
                                    className="rc-btn rc-btn--two"
                                    style={{
                                      display:
                                        el.selected && !isCurrentCvvConfirm
                                          ? "block"
                                          : "none",
                                      padding: '.2rem 1.6rem',
                                      marginTop: '20px',
                                      float: 'right'
                                    }}
                                    onClick={(e) => {
                                      this.confirmCvv(e, el);
                                    }}
                                  >
                                    <FormattedMessage id="payment.apply" />
                                  </button>
                                  <img
                                    src={successImg}
                                    style={{
                                      width: "25px",
                                      display:
                                        el.selected && isCurrentCvvConfirm
                                          ? "block"
                                          : "none",
                                      float: 'right',
                                      marginTop: '20px'
                                    }}
                                  />
                                  {/* <FormattedMessage id="payment.cardType" /><br />
                                  <span className="creditCompleteInfo">{el.cardType}</span> */}
                                </div>
                              </div>
                            </div>
                            <div className={`col-12 col-sm-9 flex-column justify-content-around`} style={{ display: pathname !== "/payment/payment" ? 'flex ' : 'none' }}>
                              <div className="row ui-margin-top-1-md-down">
                                <div className="col-12 color-999">
                                  <span style={{ fontSize: '14px' }}><FormattedMessage id="name2" /></span><br />
                                  <span className="creditCompleteInfo">{el.cardOwner}</span>
                                </div>
                              </div>
                              <div className="row ui-margin-top-1-md-down">
                                <div className="col-6 color-999">
                                  <span style={{ fontSize: '14px' }}><FormattedMessage id="payment.cardNumber2" /></span><br />
                                  <span className="creditCompleteInfo">
                                    xxxx xxxx xxxx{" "}{el.cardNumber ? el.cardNumber.substring(el.cardNumber.length - 4) : ""}
                                  </span>
                                </div>
                                <div className="col-6 border-left color-999">
                                  <span style={{ fontSize: '14px' }}><FormattedMessage id="payment.cardType" /></span><br />
                                  <span className="creditCompleteInfo">{el.cardType}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className="p-4 border text-center mt-2 rounded ui-cursor-pointer font-weight-normal"
                    ref={(node) => {
                      if (node) {
                        node.style.setProperty('border-width', '.1rem', 'important');
                        node.style.setProperty('border-style', 'dashed', 'important');
                      }
                    }}
                    onClick={() => {
                      this.setState({ isEdit: true }, () => {
                        this.scrollToPaymentComp();
                      });
                      this.initCardInfo();
                    }}>
                    <a className="rc-styled-link">
                      <FormattedMessage id="addNewCreditCard" />
                    </a>
                  </div>
                </>
              )
        ) : null}
        <div
          className={`credit-card-content ${this.state.isEdit || (!this.state.creditCardList.length && pathname !== '/account/paymentMethod') ? "" : "hidden"}`}
          id="credit-card-content"
        >
          <div className={`creditCompleteInfoBox pb-3 ${this.state.completeCardShow && (!this.state.creditCardList.length && pathname !== '/account/paymentMethod') ? "" : "hidden"}`}          >
            <p>
              <span
                className="pull-right ui-cursor-pointer-pure mr-2"
                onClick={() => {
                  this.setState({
                    completeCardShow: false,
                  });
                }}
                style={{ position: "relative", top: -9 }}
              >
                <FormattedMessage id="edit" />
              </span>
            </p>
            <div className="row">
              <div className="col-6 col-sm-3 d-flex flex-column justify-content-center">
                <img
                  src={
                    CREDIT_CARD_IMG_ENUM[currentCardInfo.vendor]
                      ? CREDIT_CARD_IMG_ENUM[currentCardInfo.vendor]
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
                      {currentCardInfo.cardOwner}
                    </span>
                  </div>
                </div>
                <div className="row creditCompleteInfo ui-margin-top-1-md-down">
                  <div className="col-6 color-999">
                    <FormattedMessage id="payment.cardNumber2" />
                    <br />
                    <span className="creditCompleteInfo">
                      xxxx xxxx xxxx{" "}
                      {currentCardInfo.cardNumber
                        ? currentCardInfo.cardNumber.substring(
                          currentCardInfo.cardNumber.length - 4
                        )
                        : ""}
                    </span>
                  </div>
                  <div className="col-6 color-999">
                    <FormattedMessage id="payment.cardType" />
                    <br />
                    <span className="creditCompleteInfo">
                      {currentCardInfo.cardType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`credit-card-form ${!this.state.completeCardShow ? "" : "hidden"}`}>
            <div className="rc-margin-bottom--xs">
              <div className="content-asset">
                <div
                  className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${this.state.errorMsg ? "" : "hidden"}`}
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
                      <FormattedMessage id="payment.cardNumber" /><span style={{ color: 'red' }}>*</span>
                      {CreditCardImg}
                      <div className="cardFormBox">
                        <span className="cardImage">
                          <img
                            alt="Card"
                            // src="https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg"
                            src={
                              CREDIT_CARD_IMG_ENUM[this.state.currentVendor]
                                ? CREDIT_CARD_IMG_ENUM[this.state.currentVendor]
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
                                    type="tel"
                                    className="rc-input__control form-control email"
                                    id="number"
                                    value={creditCardInfo.cardNumber}
                                    onChange={(e) =>
                                      this.cardInfoInputChange(e)
                                    }
                                    onKeyUp={(e) => {
                                      this.cardNumberChange(e);
                                    }}
                                    name="cardNumber"
                                    maxLength="254"
                                    placeholder={
                                      this.props.intl.messages.cardNumber
                                    }
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
                                    placeholder={
                                      'MM/YY'
                                      // this.props.intl.messages.cardNumber
                                    }
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
                                    type="password"
                                    className="rc-input__control form-control phone"
                                    data-phonelength="18"
                                    data-js-validate="(^(\+?7|8)?9\d{9}$)"
                                    data-range-error="The phone number should contain 10 digits"
                                    value={creditCardInfo.cardCvv}
                                    onChange={(e) =>
                                      this.cardInfoInputChange(e)
                                    }
                                    name="cardCvv"
                                    maxLength="4"
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
              <div className="overflow-hidden">
                <div className="text-right">
                  <div
                    className="rc-input rc-input--inline"
                    style={{
                      marginTop: "10px",
                      float: "left",
                      textAlign: "left",
                      maxWidth: '400px'
                    }}
                    onClick={() => {
                      creditCardInfo.isDefault = !creditCardInfo.isDefault;
                      this.setState({ creditCardInfo });
                    }}
                  >
                    {creditCardInfo.isDefault ? (
                      <input
                        type="checkbox"
                        className="rc-input__checkbox"
                        value={creditCardInfo.isDefault}
                        key="1"
                        checked
                      />
                    ) : (
                        <input
                          type="checkbox"
                          className="rc-input__checkbox"
                          value={creditCardInfo.isDefault}
                          key="2"
                        />
                      )}
                    <label className="rc-input__label--inline text-break">
                      <FormattedMessage id="setDefaultPaymentMethod" />
                    </label>
                  </div>
                  <a
                    className="rc-styled-link editPersonalInfoBtn"
                    name="contactInformation"
                    style={{
                      display: this.state.creditCardList.length || pathname === '/account/paymentMethod'
                        ? "inline-block"
                        : "none",
                    }}
                    onClick={() => {
                      this.initCardInfo();
                      this.setState({ isEdit: false, currentCvv: '' });
                      // this.scrollToPaymentComp();
                    }}
                  >
                    <FormattedMessage id="cancel" />
                  </a>
                &nbsp;
                <span
                    style={{
                      display: this.state.creditCardList.length || pathname === '/account/paymentMethod'
                        ? "inline-block"
                        : "none",
                    }}
                  >
                    <FormattedMessage id="or" />
                  </span>
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
      </div>
    );
  }
}

export default injectIntl(PaymentComp);
