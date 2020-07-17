import React from "react";
import "./index.css";
import { FormattedMessage, injectIntl } from "react-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";
import SideMenu from "@/components/SideMenu";
import visaImg from "@/assets/images/credit-cards/visa.svg";
import Loading from "@/components/Loading";
import PaymentComp from "./components/PaymentComp";
import AddressComp from "./components/AddressComp";
import Selection from '@/components/Selection'
import { getDictionary } from "@/utils/utils";
import { updateDetail , getAddressDetail, getSubDetail, skipNextSub, cancelAllSub } from "@/api/subscription"
import Modal from '@/components/Modal'

@injectIntl
class SubscriptionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subDetail: {},
      loading: false,
      subId: 0,
      selectedTime: "Every 4 weeks",
      nextOrderTime: "2020-18-06",
      productName: "Glycobalance Feline",
      productPrice: "$46.54",
      productUrl:
        "https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004291741049919.png",
      totalMoney: 10,
      discount: 10,
      shipping: "FREE",
      totalRealPay: 0,
      shippingAddress: {
        name: "George Guo",
        address: "TESTST",
        code: "2929292",
        addressType: "SNSN,CO 27272",
      },
      billingAddress: {
        name: "George Guo",
        address: "TESTST",
        code: "2929292",
        addressType: "SNSN,CO 27272",
      },
      payment: {
        name: "George Guo",
        card: "00000008",
        type: "CREDIT",
        cardImg: visaImg,
      },
      isChangeQuatity: false,
      discount: [],
      type: "main",
      currentCardInfo: {
        id: "PM202007100416145447",
        customerId: "ff808081725658a001725a83be530084",
        cardNumber: "4772910000000007",
        cardType: "CREDIT",
        cardMmyy: "12/20",
        cardCvv: "888",
        cardOwner: "zhuyuqi22",
        email: "396838319@qq.com",
        vendor: "VISA",
        phoneNumber: "13080534977",
        createTime: "2020-07-10 04:16:15.000",
        updateTime: null,
        isDefault: 0,
        delFlag: 0,
      },
      currentDeliveryAddress: {
        cityId: 1,
        countryId: 6
      },
      currentBillingAddress: {
        cityId: 1,
        countryId: 6
      },
      addressType: "delivery",
      cityList: [],
      countryList: [],
      frequencyList: [],
      orderOptions: [],
      modalShow: true,
      modalList: [
        {
          title: this.props.intl.messages.modalSkipTitle,
          content: this.props.intl.messages.modalSkipContent,
          type: 'skipNext'
        },
        {
          title: this.props.intl.messages.modalCancelAllTitle,
          content: this.props.intl.messages.modalCancelAllContent,
          type: 'cancelAll'
        }
      ],

  //     'modalSkipTitle': 'SKIP NEXT DELIVERY?',
  // 'modalSkipContent': 'Are you sure you want to cancel the next delivery?',
  // 'modalCancelAllTitle': 'CANCEL ALL ORDERS?',
  // 'modalCancelAllContent': 'Are you sure you want to cancel all the following deliveries?',
      currentModalObj: {
        title: this.props.intl.messages.modalSkipTitle,
        content: this.props.intl.messages.modalSkipContent,
        type: 'skipNext'
      },
      modalType: ''
    };
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  async componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false;
    }
    await getDictionary({ type: "city" }).then((res) => {
      this.setState({
        cityList: res,
      });
    });

    getDictionary({ type: "country" }).then((res) => {
      this.setState({
        countryList: res
      });
    });
    getDictionary({ type: "Frequency" }).then((res) => {
      let frequencyList = res.map(el => {
        return {
          id: el.id,
          name: el.name,
          value: el.name
        }
      })
      this.setState({
        frequencyList: frequencyList
      });
    });

    let subDetailRes = await getSubDetail(this.props.match.params.subscriptionNumber)
    let subDetail = subDetailRes.context
    // getAddressDetail(subDetail.deliveryAddressId).then(res => {
    //   this.setState({currentDeliveryAddress: res.context})
    // })
    // getAddressDetail(subDetail.billingAddressId).then(res => {
    //   this.setState({currentBillingAddress: res.context})
    // })
    console.log(JSON.parse(localStorage.getItem("subDetail")), "subDetail");
    let orderOptions = (subDetail.trades || []).map(el => {
      return { value: el.id, name: el.id + '' }
    })
    console.log(orderOptions, 'aaa')
    this.setState({
      subId: this.props.match.params.subscriptionNumber,
      subDetail: subDetail,
      currentCardInfo: subDetail.paymentInfo,
      currentDeliveryAddress: subDetail.consignee,
      currentBillingAddress: subDetail.invoice,
      orderOptions: orderOptions
    });
  }
  hanldeClickSubmit() {
    let { modalType, subDetail } = this.state
    if(modalType === 'skipNext') {
      skipNextSub({ subscribeId: subDetail.subscribeId }).then(res => {
        window.location.reload()
      })
    }else if( modalType === 'cancelAll' ) {
      cancelAllSub({ subscribeId: subDetail.subscribeId }).then(res => {
        window.location.reload()
      })
    }
  }
  render () {
    const data = this.state;
    let {
      isChangeQuatity,
      discount,
      type,
      currentCardInfo,
      currentDeliveryAddress,
      currentBillingAddress,
      addressType,
      subDetail,
      currentModalObj
    } = this.state;
    return (
      <div>
        <div>
          <Header
            showMiniIcons={true}
            showUserIcon={true}
            location={this.props.location}
            history={this.props.history}
          />
          <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
            <BreadCrumbs />
            <Modal
              key="1"
              visible={this.state.modalShow}
              confirmLoading={this.state.submitLoading}
              modalTitle={currentModalObj.title}
              confirmBtnText={<FormattedMessage id="yes" />}
              cancelBtnVisible={<FormattedMessage id="cancel" />}
              close={() => {
                this.setState({ modalShow: false });
              }}
              hanldeClickConfirm={() => this.hanldeClickSubmit()}
            >
              <span>{currentModalObj.content}</span>
              {/* <div className="text-center pl-4 pr-4" style={{ lineHeight: 2 }}>
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
                <h4>
                  <FormattedMessage id="confirmation.rateTip" />
                </h4>
                <div
                  className="d-flex justify-content-around"
                  style={{ width: "40%", margin: "0 auto" }}
                >
                  {[0, 1, 2, 3, 4].map((item, idx) => (
                    <span
                      key={idx}
                      className={`rc-icon ui-cursor-pointer ${
                        this.state.evalutateScore >= idx
                          ? "rc-rate-fill"
                          : "rc-rate"
                        } rc-brand1`}
                      onClick={() => {
                        this.setState({ evalutateScore: idx, errorMsg: "" });
                      }}
                    />
                  ))}
                </div>
                <h4>
                  <FormattedMessage id="confirmation.rateTip2" />
                </h4>
                <span
                  className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                  input-setup="true"
                >
                  <FormattedMessage id="confirmation.rateTip3">
                    {(txt) => (
                      <textarea
                        className="rc-input__textarea noborder"
                        maxLength="50"
                        placeholder={txt}
                        style={{ height: 100 }}
                        value={this.state.consumerComment}
                        onChange={(e) => this.handleConsumerCommentChange(e)}
                      />
                    )}
                  </FormattedMessage>
                </span>
              </div> */}
            </Modal>
            <div className="rc-padding--sm rc-max-width--xl">
              <div className="rc-layout-container rc-five-column">
                {this.state.loading ? <Loading positionFixed="true" /> : null}
                <SideMenu type="Subscription" />
                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop"
                  style={{ display: type === "PaymentComp" ? "block" : "none" }}
                >
                  <PaymentComp
                    paymentId={currentCardInfo.id}
                    type={type}
                    save={(el) => {
                      console.log(el)
                      let param = {
                        subscribeId: subDetail.subscribeId,
                        paymentId: el.id
                      }
                      console.log(param)
                      updateDetail(param).then(res => {
                        console.log(res)
                        window.location.reload()
                      })
                      this.setState({ type: "main", currentCardInfo: el });
                    }}
                    cancel={() => this.setState({ type: "main" })}
                  />
                </div>
                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop"
                  style={{ display: type === "AddressComp" ? "block" : "none" }}
                >
                  <AddressComp
                    type={addressType}
                    deliveryAddressId={subDetail.deliveryAddressId}
                    billingAddressId={subDetail.billingAddressId}
                    save={(el, isBillSame) => {
                      console.log(el, isBillSame);
                      if (addressType === "delivery") {
                        let param = {
                          subscribeId: subDetail.subscribeId,
                          deliveryAddressId: el.deliveryAddressId
                        }
                        if (isBillSame) {
                          param.billingAddressId = el.deliveryAddressId
                        }
                        console.log(param)
                        updateDetail(param).then(res => {
                          console.log(res)
                          window.location.reload()
                        })
                        this.setState({
                          type: "main",
                          currentDeliveryAddress: el,
                        });
                      } else {
                        let param = {
                          subscribeId: subDetail.subscribeId,
                          billingAddressId: el.deliveryAddressId
                        }
                        console.log(param)
                        updateDetail(param).then(res => {
                          console.log(res)
                          window.location.reload()
                        })
                        this.setState({
                          type: "main",
                          currentBillingAddress: el,
                        });
                      }
                    }}
                    cancel={() => this.setState({ type: "main" })}
                  />
                </div>
                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop subscriptionDetail"
                  style={{ display: type === "main" ? "block" : "none" }}
                >
                  <div
                    className="rc-border-bottom rc-border-colour--interface"
                    style={{ display: "flex" }}
                  >
                    <h4
                      className="rc-delta rc-margin--none"
                      style={{ flex: "3" }}
                    >
                      {/* <FormattedMessage id="subscription.sub"></FormattedMessage>{data.subId} */}
                      <i className="rc-icon rc-address--xs rc-brand1"></i>{" "}
                      <FormattedMessage id="subscription" />
                    </h4>
                    <div className="rightBox" style={{ flex: "1" }}>
                      <a class="rc-styled-link " href="#/" onClick={(e) => {
                        e.preventDefault()
                        this.setState({
                          modalType: 'skipNext',
                          modalShow: true,
                          currentModalObj: this.state.modalList.filter(el => el.type === 'skipNext')[0]
                        })
                      }}>
                        <FormattedMessage id="subscription.skip" />
                      </a>{" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      <a class="rc-styled-link " href="#/" onClick={(e) => {
                        e.preventDefault()
                        this.setState({
                          modalType: 'cancelAll',
                          modalShow: true,
                          currentModalObj: this.state.modalList.filter(el => el.type === 'cancelAll')[0]
                        })
                      }}>
                        <FormattedMessage id="subscription.cancelAll" />
                      </a>
                    </div>
                  </div>
                  <div className="content-asset">
                    <div className="rc-layout-container rc-three-column mgb30 operationBox">
                      <div className="rc-column column-contanier">
                        <div
                          className="rc-card-container"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          {/* <div className="bt-icon"> */}
                          <div
                            className="v-center"
                            style={{ marginRight: "20px" }}
                          >
                            <i className="rc-icon rc-refresh--xs rc-brand1"></i>
                          </div>

                          {/* <button
                                  className="rc-btn less-width-xs rc-btn--icon rc-icon rc-search--xs rc-iconography not-yet-btn"
                                  aria-label="Search"></button> */}
                          {/* </div> */}
                          <div className="rc-card-content">
                            <b className="">
                              <FormattedMessage id="subscription.toBeDelivered" />
                            </b>
                            <h4
                              className="rc-card__meta order-Id"
                              style={{ marginTop: "10px" }}
                            >
                              <Selection
                                optionList={this.state.orderOptions}
                                selectedItemChange={el => {
                                  const { history } = this.props
                                  history.push(`/account/orders-detail/${el.value}`)
                                }}
                                selectedItemData={{
                                  value: this.state.orderOptions.length ? this.state.orderOptions[0].value : ''
                                }}
                                customStyleType="select-one" />
                            </h4>
                          </div>
                          {/* <div className="v-center" style={{marginRight: '40px'}}>
                            <a className="rc-styled-link red-text">
                              <FormattedMessage id="subscription.change"></FormattedMessage>
                            </a>
                          </div> */}
                        </div>
                      </div>
                      <div className="rc-column column-contanier">
                        <div
                          className="rc-card-container"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          {/* <div className="bt-icon"> */}
                          <div
                            className="v-center"
                            style={{ marginRight: "20px" }}
                          >
                            <i className="rc-icon rc-refresh--xs rc-brand1"></i>
                          </div>

                          {/* <button
                                  className="rc-btn less-width-xs rc-btn--icon rc-icon rc-search--xs rc-iconography not-yet-btn"
                                  aria-label="Search"></button> */}
                          {/* </div> */}
                          <div className="rc-card-content">
                            <b className="">
                              <FormattedMessage id="subscription.frequency"></FormattedMessage>
                            </b>
                            <h1
                              className="rc-card__meta order-Id"
                              style={{ marginTop: "10px" }}
                            >
                              <Selection
                                optionList={this.state.frequencyList}
                                selectedItemChange={el => {
                                  let param = {
                                    subscribeId: subDetail.subscribeId,
                                    cycleTypeId: el.id
                                  }
                                  updateDetail(param).then(res => {
                                    window.location.reload()
                                  })
                                }}
                                selectedItemData={{
                                  value: subDetail.frequency || ''
                                }}
                                customStyleType="select-one" />
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="rc-column">
                        <div className="rc-card-container">
                          <div
                            className="v-center"
                            style={{ marginRight: "20px" }}
                          >
                            <i className="rc-icon rc-refresh--xs rc-brand1"></i>
                          </div>
                          <div className="rc-card-content">
                            <b className="">
                              <FormattedMessage id="subscription.receiveDate"></FormattedMessage>
                            </b>
                            <h1
                              className="rc-card__meta order-Id"
                              style={{ marginTop: "10px" }}
                            >
                              <span class="rc-input">
                                <input
                                  class="rc-input__date"
                                  data-js-dateformat="YYYY-MM-DD"
                                  id="id-date-2"
                                  type="date"
                                  name="example-date-input"
                                  onBlur={(e) => {
                                    const target = e.target
                                    subDetail.nextDeliveryTime = target.value

                                    let param = {
                                      subscribeId: subDetail.subscribeId,
                                      nextDeliveryTime: target.value
                                    }
                                    updateDetail(param).then(res => {
                                      window.location.reload()
                                    })
                                  }}
                                  value={subDetail.nextDeliveryTime}
                                />
                                <label class="rc-input__label" for="id-date-2">
                                </label>
                              </span>
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="rc-layout-container rc-three-column mgb30"
                      style={{ borderBottom: "1px solid #ddd" }}
                    >
                      <div className="rc-column product-container">
                        <div
                          className="text-right"
                          style={{ position: "absolute" }}
                        >
                          <a
                            className="rc-styled-link red-text"
                            style={{
                              display: !isChangeQuatity
                                ? "inline-block"
                                : "none",
                            }}
                            onClick={() =>
                              this.setState({ isChangeQuatity: true })
                            }
                          >
                            <FormattedMessage id="subscription.change"></FormattedMessage>
                          </a>
                          <a
                            className="rc-styled-link red-text"
                            style={{
                              display: isChangeQuatity
                                ? "inline-block"
                                : "none",
                            }}
                            onClick={() =>
                              this.setState({ isChangeQuatity: false })
                            }
                          >
                            <FormattedMessage id="Cancel"></FormattedMessage>
                          </a>
                          &nbsp;&nbsp;&nbsp;
                          <a
                            className="rc-styled-link red-text"
                            style={{
                              display: isChangeQuatity
                                ? "inline-block"
                                : "none",
                            }}
                            onClick={() => {
                              let param = {
                                subscribeId: subDetail.subscribeId,
                                goodsItems: subDetail.goodsInfo.map(el => {
                                  return { skuId: el.skuId, subscribeNum: el.subscribeNum }
                                })
                              }
                              console.log(param)
                              updateDetail(param).then(res => {
                                console.log(res)
                                window.location.reload()
                              })
                              this.setState({ isChangeQuatity: false })
                            }}
                          >
                            <FormattedMessage id="Save"></FormattedMessage>
                          </a>
                        </div>
                        {subDetail.goodsInfo && subDetail.goodsInfo.map((el) => (
                          <div className="rc-layout-container rc-five-column" style={{ height: '160px' }}>
                            <div className="rc-column rc-triple-width flex-layout">
                              <div className="img-container">
                                <img
                                  src={el.goodsPic}
                                />
                              </div>
                              <div className="v-center" style={{
                                width: '200px'
                              }}>
                                <h5>
                                  {el.goodsName}
                                </h5>
                                <p>{el.specText}</p>
                                <div>
                                  <label className="font-weight-bold" style={{ textDecoration: 'line-through' }}>
                                    {el.originalPrice}
                                  </label>
                                  &nbsp;&nbsp;
                                  <label className="font-weight-bold">
                                    {el.subscribePrice}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="rc-column rc-double-width">
                              <div className="p-container rc-quantity text-right d-flex justify-content-end rc-content-v-middle ">
                                <div
                                  className="v-center"
                                  style={{
                                    display: isChangeQuatity ? "block" : "none"
                                  }}
                                >
                                  <span className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus" onClick={() => {
                                    if (el.subscribeNum > 1) {
                                      el.subscribeNum = el.subscribeNum - 1
                                      this.setState({ subDetail })
                                    }
                                  }}></span>
                                  <input
                                    className="rc-quantity__input"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    max="899"
                                    maxLength="5"
                                    value={el.subscribeNum}
                                  />
                                  <span className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus" onClick={() => {
                                    el.subscribeNum = el.subscribeNum + 1
                                    this.setState({ subDetail })
                                    console.log(el.subscribeNum)
                                  }}></span>
                                </div>
                                <div
                                  className="v-center"
                                  style={{
                                    display: !isChangeQuatity
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  <b className="">Qty: {el.subscribeNum}</b>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className="rc-column flex-layout"
                        style={{ paddingLeft: "80px" }}
                      >
                        <div className="v-center total-container">
                          <div className="border-b">
                            <div className="flex-layout">
                              <label className="font18">
                                <FormattedMessage id="subscription.total"></FormattedMessage>
                                :
                              </label>
                              <div className="text-right">
                                <b>${data.totalMoney}</b>
                              </div>
                            </div>
                            <div className="flex-layout">
                              <label className="saveDiscount font18">
                                <FormattedMessage id="subscription.saveDiscount"></FormattedMessage>
                                :
                              </label>
                              <div className="text-right red-text">
                                <b>-${data.discount}</b>
                              </div>
                            </div>
                            {this.state.discount.map((el) => (
                              <div className="flex-layout">
                                <label className="saveDiscount font18">
                                  25% save amount
                                </label>
                                <div
                                  className="text-right red-text"
                                  style={{ position: "relative" }}
                                >
                                  <b>-${8}</b>
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "-18px",
                                      fontSize: "22px",
                                      bottom: "8px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      discount.pop();
                                      this.setState({ discount: discount });
                                    }}
                                  >
                                    x
                                  </span>
                                </div>
                              </div>
                            ))}
                            <div className="flex-layout">
                              <label className="font18">
                                <FormattedMessage id="subscription.shipping"></FormattedMessage>
                                :
                              </label>
                              <div className="text-right red-text">
                                <b>{data.shipping}</b>
                              </div>
                            </div>
                          </div>
                          <div className="flex-layout mgt20">
                            <label className="saveDiscount font18">
                              <FormattedMessage id="subscription.totalInclu"></FormattedMessage>
                              :
                            </label>
                            <div className="text-right">
                              <b>${data.totalRealPay}</b>
                            </div>
                          </div>
                          <div className="footer" style={{ marginTop: "10px" }}>
                            <span
                              class="rc-input rc-input--inline rc-input--label"
                              style={{ width: "260px" }}
                            >
                              <input
                                class="rc-input__control"
                                id="id-text2"
                                type="text"
                                name="text"
                                placeholder="Promotional Code"
                              />
                              <label class="rc-input__label" for="id-text2">
                              </label>
                            </span>
                            <button
                              class="rc-btn rc-btn--sm rc-btn--two"
                              style={{ marginTop: "10px", float: "right" }}
                              onClick={() => {
                                discount.push(1);
                                this.setState({ discount });
                              }}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="rc-layout-container rc-three-column">
                      <div className="rc-column footer-container">
                        <b className="font18">
                          <i className="rc-icon rc-shop--xs rc-brand1"></i>{" "}
                          <FormattedMessage id="subscription.shippingAddress"></FormattedMessage>
                        </b>
                        <div className="mt10">
                          <div className="rc-card__body pdl0">
                            <div className="rc-card-container">
                              <div className="rc-card-content">
                                <h1 className="rc-card__meta order-Id">
                                  {currentDeliveryAddress.consigneeName}
                                </h1>
                                <h1 className="rc-card__meta order-Id">
                                  {this.state.countryList.length
                                    && this.state.countryList.filter(el => el.id === currentDeliveryAddress.countryId).length
                                    ? this.state.countryList.filter(el => el.id === currentDeliveryAddress.countryId)[0].valueEn
                                    : currentDeliveryAddress.countryId},{' '}
                                  {this.state.cityList.length
                                    && this.state.cityList.filter(el => el.id === currentDeliveryAddress.cityId).length
                                    ? this.state.cityList.filter(el => el.id === currentDeliveryAddress.cityId)[0].valueEn
                                    : currentDeliveryAddress.cityId}
                                </h1>
                                <h1 className="rc-card__meta order-Id">
                                  {currentDeliveryAddress.address1}
                                </h1>
                                <a
                                  className="rc-styled-link red-text"
                                  onClick={() => {
                                    window.scrollTo(0, 0);
                                    this.setState({
                                      type: "AddressComp",
                                      addressType: "delivery",
                                    });
                                  }}
                                >
                                  <FormattedMessage id="edit" />{" "}
                                  <FormattedMessage id="address" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rc-column footer-container">
                        <b className="font18">
                          <i className="rc-icon rc-news--xs rc-brand1"></i>{" "}
                          <FormattedMessage id="subscription.BillingAddress"></FormattedMessage>
                        </b>
                        <div className="mt10">
                          <div className="rc-card__body pdl0">
                            <div className="rc-card-container">
                              <div className="rc-card-content">
                                <h1 className="rc-card__meta order-Id">
                                  {currentBillingAddress.consigneeName}
                                </h1>
                                <h1 className="rc-card__meta order-Id">
                                  {this.state.countryList.length && this.state.countryList.filter(el => el.id === currentBillingAddress.countryId)[0].valueEn},{' '}
                                  {this.state.cityList.length && this.state.cityList.filter(el => el.id === currentBillingAddress.cityId)[0].valueEn}
                                </h1>
                                <h1 className="rc-card__meta order-Id">
                                  {currentBillingAddress.address1}
                                </h1>
                                <a
                                  className="rc-styled-link red-text"
                                  onClick={() => {
                                    window.scrollTo(0, 0);
                                    this.setState({
                                      type: "AddressComp",
                                      addressType: "billing",
                                    });
                                  }}
                                >
                                  <FormattedMessage id="edit" />{" "}
                                  <FormattedMessage id="address" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rc-column footer-container ">
                        <b className="b-text">
                          <i className="rc-icon rc-shelter--xs rc-brand1"></i>{" "}
                          <FormattedMessage id="subscription.paymentMethod"></FormattedMessage>
                        </b>
                        <div className="mt10">
                          <div className="rc-card__body pdl0 ">
                            <div className="rc-card-container">
                              <div className="rc-card-content">
                                <h1 className="rc-card__meta order-Id">
                                  <img
                                    className="card-img"
                                    src={data.payment.cardImg}
                                  />
                                  &nbsp;&nbsp; {currentCardInfo.cardType}
                                </h1>
                                <h1 className="rc-card__meta order-Id">
                                  xxxx xxxx xxxx{" "}
                                  {currentCardInfo.cardNumber.substring(
                                    currentCardInfo.cardNumber.length - 4
                                  )}
                                </h1>

                                <a
                                  className="rc-styled-link red-text"
                                  onClick={() => {
                                    window.scrollTo(0, 0);
                                    this.setState({ type: "PaymentComp" });
                                  }}
                                >
                                  <FormattedMessage id="edit" />{" "}
                                  <FormattedMessage id="card" />
                                </a>
                              </div>
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
      </div>
    );
  }
}

export default SubscriptionDetail