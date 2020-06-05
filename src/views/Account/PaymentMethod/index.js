import React from "react";
import { FormattedMessage } from "react-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";
import SideMenu from "@/components/SideMenu";
import "./index.css";
import {
  getAddressList,
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
import { getPaymentMethod, deleteCard } from "@/api/payment";

export default class PaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showModal: false,
      isAdd: true,
      addressList: [],
      total: 0,
      errorMsg: "",
      successMsg: "",
      creditCardInfo: {
        // cardNumber: "",
        // cardDate: "",
        // cardCVV: "",
        cardOwner: "",
        email: "",
        phoneNumber: "",
        identifyNumber: "111",
      },
      payosdata: {},
      creditCardImgUrl: [visaImg, amexImg, mastercardImg],
      creditCardImgObj: {
        VISA: visaImg,
        MASTERCARD: mastercardImg,
        "AMERICAN EXPRESS": amexImg,
        DISCOVER: discoverImg,
      },
      creditCardList: [],
    };
  }

  componentWillUnmount() {
    localStorage.setItem("isRefresh", true);
  }
  async componentDidMount() {
    this.getPaymentMethodList()
  }
  async getPaymentMethodList() {
    try {
      let res = await getPaymentMethod({
        customerId: JSON.parse(sessionStorage.getItem('rc-userinfo'))['customerId'],
      });
      if (res.code === "K-000000") {
        this.setState({
          creditCardList: res.context
        });
      }
      this.setState({
        loading:false
      })
    }catch {
      this.showErrorMsg('get data failed')
      this.setState({
        loading: false
      })
    }
  }
  onFormChange = ({ field, value }) => {
    let data = this.state.addressForm;
    data[field] = value;
    this.setState({
      addressForm: data,
    });
  };
  isDefalt = () => {
    let data = this.state.addressForm;
    data.isDefalt = !data.isDefalt;
    this.setState({
      addressForm: data,
    });
  };
  saveAddress = async () => {
    this.setState({
      loading: true,
    });
    let data = this.state.addressForm;
    let params = {
      areaId: +data.country,
      cityId: +data.city,
      consigneeName: data.firstName + " " + data.lastName,
      consigneeNumber: data.phoneNumber,
      customerId: data.customerId,
      deliveryAddress: data.address1 + " " + data.address2,
      deliveryAddressId: data.deliveryAddressId,
      isDefaltAddress: data.isDefalt ? 1 : 0,
      postCode: data.postCode,
      provinceId: 0,
      rfc: data.rfc,
    };
    if (this.state.isAdd) {
      const res = await saveAddress(params);
      if (res.code === "K-000000") {
        this.getAddressList();
        this.closeModal();
      }
    } else {
      const res = await editAddress(params);
      if (res.code === "K-000000") {
        this.getAddressList();
        this.closeModal();
      }
    }
  };
  setDefaltAddress = async (id) => {
    this.setState({
      loading: true,
    });
    let params = {
      deliveryAddressId: id,
    };
    await setDefaltAddress(params)
      .then((res) => {
        if (res.code === "K-000000") {
          this.showSuccessMsg(res.message || "Set Defalt Address Success");
          this.getAddressList();
        } else {
          this.showErrorMsg(res.message || "Set Defalt Address Failed");
          this.setState({
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.showErrorMsg("Set Defalt Address Failed");
        this.setState({
          loading: false,
        });
      });
  };
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
          this.showSuccessMsg(res.message || "Delete Address Success");
          this.getPaymentMethodList();
        } else {
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
  deleteAddress = async (id) => {
    this.setState({
      loading: true,
    });
    let params = {
      id: id,
    };
    await deleteAddress(params)
      .then((res) => {
        if (res.code === "K-000000") {
          this.showSuccessMsg(res.message || "Delete Address Success");
          this.getAddressList();
        } else {
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
  };
  showErrorMsg = (message) => {
    this.setState({
      errorMsg: message,
    });
    this.scrollToErrorMsg();
    setTimeout(() => {
      this.setState({
        errorMsg: "",
      });
    }, 3000);
  };

  showSuccessMsg = (message) => {
    this.setState({
      successMsg: message,
    });
    this.scrollToErrorMsg();
    setTimeout(() => {
      this.setState({
        successMsg: "",
      });
    }, 2000);
  };

  //定位
  scrollToErrorMsg() {
    const widget = document.querySelector(".content-asset");
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo({
        top: this.getElementToPageTop(widget),
        behavior: 'smooth'
      })
    }
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }
  openCreatePage = () => {
    const { history } = this.props;
    if(this.state.creditCardList.length >= 10) {
      this.showErrorMsg('Quantity cannot exceed 10')
      return false
    }
    history.push("/account/paymentMethod/create");
  };
  openEditPage = (id) => {
    const { history } = this.props;
    history.push("/account/shippingAddress/" + id);
  };

  getDictValue = (list, id) => {
    if (list && list.length > 0) {
      let item = list.find((item) => {
        return item.id === id;
      });
      if (item) {
        return item.name;
      } else {
        return id;
      }
    } else {
      return id;
    }
  };
  render() {
    const event = {
      page: {
        type: "Account",
        theme: "",
      },
    };
    const { creditCardInfo, creditCardList } = this.state;
    return (
      <div>
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
                  <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                    <h4 className="rc-delta rc-margin--none">
                      <FormattedMessage id="paymentMethod"></FormattedMessage>
                    </h4>
                  </div>
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
                    <div className="table-toolbar">
                      <span className="t-gray">
                        <FormattedMessage
                          id="creditCardTip"
                          values={{ number: <b>{this.state.creditCardList.length}</b> }}
                        />
                      </span>
                      {/* <button
                        type="button"
                        className="address-btn"
                        onClick={() => this.openCreatePage()}
                      >
                        <span>
                          {" "}
                          <FormattedMessage id="addNewCreditCard"></FormattedMessage>
                        </span>
                      </button> */}
                    </div>
                    <div className="addbox" onClick={() => this.openCreatePage()}>
                      <div id="cross"></div>
                    </div>
                    {creditCardList.map((el) => (
                      <div
                        className={`creditCompleteInfoBox ${el.isDefault === 1?'active': ''}`}
                        style={{
                          display: "block",
                          // !this.state.isCompleteCredit
                          //   ? "none"
                          //   : "block",
                        }}
                      >
                        <p>
                          <span
                            className="pull-right"
                            onClick={() => {
                              const { history } = this.props
                              history.push({pathname: '/account/paymentMethod/create', query: el})
                            }}
                          >
                            <FormattedMessage id="edit" />
                          </span>
                          <span
                            className="pull-right"
                            onClick={() => {
                              this.deleteCard(el.id)
                            }}
                          >
                            <FormattedMessage id="delete" />
                          </span>
                        </p>
                        <div className="row">
                          <div className="col-sm-3">
                            <img
                              src={
                                this.state.creditCardImgObj[
                                  el.vendor
                                ]
                                  ? this.state.creditCardImgObj[
                                      el.vendor
                                    ]
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
                                {/* <p><FormattedMessage id="payment.DEBIT" /></p> */}
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}
