import React from "react";
import "./index.css";
import { FormattedMessage, injectIntl } from "react-intl";
import Skeleton from "react-skeleton-loader";
import { inject, observer } from "mobx-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";
import SideMenu from "@/components/SideMenu";
import visaImg from "@/assets/images/credit-cards/visa.svg";
import amexImg from "@/assets/images/credit-cards/amex.svg";
import mastercardImg from "@/assets/images/credit-cards/mastercard.svg";
import discoverImg from "@/assets/images/credit-cards/discover.svg";
import Loading from "@/components/Loading";
import PaymentComp from "./components/PaymentComp";
import AddressComp from "./components/AddressComp";
import Selection from "@/components/Selection";
import { getDictionary } from "@/utils/utils";
import DatePicker from "react-datepicker";
import {
  ORDER_STATUS_ENUM,
} from '@/utils/constant'
import {
  updateDetail,
  getAddressDetail,
  getSubDetail,
  skipNextSub,
  cancelAllSub,
  orderNowSub,
  getPromotionPrice,
} from "@/api/subscription";
import Modal from "@/components/Modal";
import { formatMoney } from "@/utils/utils";
import resolve from "resolve";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

@inject("checkoutStore", "loginStore")
@injectIntl
class SubscriptionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //订阅购物车参数
      subTotal: 0,
      subDiscount: 0,
      subShipping: 0,
      promotionDiscount: 0,
      promotionDesc: "",
      subTradeTotal: 0,
      //订阅购物车参数
      discount: [], //促销码的折扣信息汇总
      promotionInputValue: "", //输入的促销码
      isClickApply: false, //是否点击apply按钮
      lastPromotionInputValue: "", //上一次输入的促销码
      isShowValidCode: false, //是否显示无效promotionCode
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
        countryId: 6,
      },
      currentBillingAddress: {
        cityId: 1,
        countryId: 6,
      },
      addressType: "delivery",
      cityList: [],
      countryList: [],
      frequencyList: [],
      orderOptions: [],
      modalShow: false,
      currentGoodsInfo: [],
      modalList: [
        {
          title: this.props.intl.messages.modalSkipTitle,
          content: this.props.intl.messages.modalSkipContent,
          type: "skipNext",
        },
        {
          title: this.props.intl.messages.modalCancelAllTitle,
          content: this.props.intl.messages.modalCancelAllContent,
          type: "cancelAll",
        },
        {
          title: this.props.intl.messages.modalOrderNowTitle,
          content: this.props.intl.messages.modalOrderNowContent,
          type: "orderNow",
        },
      ],
      currentModalObj: {
        title: this.props.intl.messages.modalSkipTitle,
        content: this.props.intl.messages.modalSkipContent,
        type: "skipNext",
      },
      modalType: "",
      errorShow: false,
      errorMsg: "",
      successTipVisible: false,
      minDate: new Date(),
      todaydate: new Date(),
      creditCardImgObj: {
        VISA: visaImg,
        MASTERCARD: mastercardImg,
        "AMERICAN EXPRESS": amexImg,
        DISCOVER: discoverImg,
      },
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
        countryList: res,
      });
    });
    getDictionary({ type: "Frequency_week" }).then((res) => {
      let frequencyList = res.map((el) => {
        return {
          id: el.id,
          name: el.name,
          value: el.name,
        };
      });
      getDictionary({ type: "Frequency_month" }).then((res) => {
        frequencyList = frequencyList.concat(
          res.map((el) => {
            return {
              id: el.id,
              name: el.name,
              value: el.name,
            };
          })
        );
        this.setState({
          frequencyList: frequencyList,
        });
      });
    });
    await this.getDetail();

    await this.doGetPromotionPrice();

    this.setState({
      subId: this.props.match.params.subscriptionNumber,
    });
  }
  onDateChange (date) {
    let { subDetail } = this.state;
    subDetail.nextDeliveryTime = moment(date).format("YYYY-MM-DD");
    let param = {
      subscribeId: subDetail.subscribeId,
      nextDeliveryTime: subDetail.nextDeliveryTime,
      goodsItems: subDetail.goodsInfo.map((el) => {
        return {
          skuId: el.skuId,
          subscribeNum: el.subscribeNum,
          subscribeGoodsId: el.subscribeGoodsId,
        };
      }),
    };
    this.setState({ loading: true });
    updateDetail(param)
      .then((res) => {
        this.setState({ loading: false });
        // window.location.reload();
        this.showErrMsg(
          this.props.intl.messages.saveSuccessfullly,
          "success",
          () => this.getDetail()
        );
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  //订阅数量更改
  async onQtyChange () {
    try {
      // this.showErrMsg(this.props.intl.messages.saveSuccessfullly, 'success', () => this.getDetail());
      //await this.doUpdateDetail(param)
      await this.doGetPromotionPrice(this.state.lastPromotionInputValue);
      //await this.getDetail()
    } catch (err) {
      this.showErrMsg(err);
    }
  }
  get isLogin () {
    return this.props.loginStore.isLogin;
  }
  // get totalPrice () {
  //   return this.props.checkoutStore.totalPrice
  // }
  // get tradePrice () {
  //   return this.props.checkoutStore.tradePrice
  // }
  // get discountPrice () {
  //   return this.props.checkoutStore.discountPrice
  // }
  // get deliveryPrice(){ 
  //   return this.props.checkoutStore.deliveryPrice
  // }
  // get subscriptionPrice(){
  //   return this.props.checkoutStore.subscriptionPrice
  // }
  // get promotionDesc(){
  //   return this.props.checkoutStore.promotionDesc
  // }
  async doUpdateDetail (param) {
    try {
      this.setState({ loading: true });
      await updateDetail(param);
    } catch (err) {
      throw new Error(err);
    } finally {
      this.setState({ loading: false });
    }
  }
  async getDetail () {
    try {
      this.setState({ loading: true });
      const res = await getSubDetail(
        this.props.match.params.subscriptionNumber
      );
      let subDetail = res.context;
      let orderOptions = (subDetail.trades || []).map((el) => {
        let orderStatus = ORDER_STATUS_ENUM[el.tradeState.flowState] || el.tradeState.flowState
        return { value: el.id, name: el.id + " " + orderStatus };
      });

      let now = new Date(res.defaultLocalDateTime);
      now.setDate(now.getDate() + 4);
      this.setState({
        subDetail: subDetail,
        currentCardInfo: subDetail.paymentInfo
          ? subDetail.paymentInfo
          : {
            cardNumber: "xxxx",
          },
        currentDeliveryAddress: subDetail.consignee,
        currentBillingAddress: subDetail.invoice,
        orderOptions: orderOptions,
        minDate: now,
      });
    } catch (err) {
      this.showErrMsg(err);
      // throw new Error(err);
    } finally {
      this.setState({ loading: false });
    }
  }
  async doGetPromotionPrice (promotionCode = "") {
    try {
      //计算Tota
      // this.setState({ loading: true });
      let goodsInfo = this.state.subDetail.goodsInfo;

      let subTotal = 0;
      for (let goods of goodsInfo) {
        subTotal += Number(goods.subscribePrice) * goods.subscribeNum;
      }
      this.setState({
        subTotal,
      });
      //拼装goodsInfoList参数
      let goodsInfoList = this.state.subDetail.goodsInfo.map((ele) => {
        return {
          goodsInfoId: ele.skuId,
          buyCount: ele.subscribeNum,
        };
      });

      //根据参数查询促销的金额与订单运费
      const res = await getPromotionPrice({
        goodsInfoList,
        promotionCode,
        isAutoSub: true,
      });

      //拼装订阅购物车参数
      if (res.code == "K-000000") {
        let subTradeTotal =
          this.state.subTotal +
          Number(res.context.deliveryPrice) -
          Number(res.context.discountsPrice) -
          Number(res.context.promotionDiscount);
        this.setState({
          // loading: false,
          subDiscount: res.context.discountsPrice,
          subShipping: res.context.deliveryPrice,
          promotionDiscount: res.context.promotionDiscount,
          subTradeTotal,
        });
      }
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (err) {
      this.showErrMsg(err);
      // throw new Error(err);
    } finally {
      this.setState({ loading: false });
    }
  }
  hanldeClickSubmit () {
    let { modalType, subDetail } = this.state;
    this.setState({ loading: true, modalShow: false })
    if (modalType === "skipNext") {
      skipNextSub({ subscribeId: subDetail.subscribeId }).then((res) => {
        window.location.reload();
      }).catch(err => {
        this.setState({
          loading: false
        })
        this.showErrMsg(err)
      })
    } else if (modalType === "cancelAll") {
      cancelAllSub({ subscribeId: subDetail.subscribeId }).then((res) => {
        window.location.reload();
      }).catch(err => {
        this.setState({
          loading: false
        })
        this.showErrMsg(err)
      })
    } else if (modalType === "orderNow") {
      orderNowSub({ subscribeId: subDetail.subscribeId }).then((res) => {
        window.location.reload();
      }).catch(err => {
        this.setState({
          loading: false
        })
        this.showErrMsg(err)
      })
    }
  }
  showErrMsg (msg, type, fn) {
    if (type === "success") {
      this.setState({
        successTipVisible: true,
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          successTipVisible: false,
        });
        fn && fn();
      }, 1000);
    } else {
      this.setState({
        errorShow: true,
        errorMsg: msg,
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          errorShow: false,
        });
        fn && fn();
      }, 3000);
    }
  }
  handlerChange (e) {
    let promotionInputValue = e.target.value;
    this.setState({
      promotionInputValue,
    });
  }
  render () {
    const data = this.state;
    const { checkoutStore } = this.props;
    let {
      isChangeQuatity,
      discount,
      type,
      currentCardInfo,
      currentDeliveryAddress,
      currentBillingAddress,
      addressType,
      subDetail,
      currentModalObj,
      todaydate,
    } = this.state;
    console.log(todaydate, this.state.minDate, "date", subDetail.frequency);
    console.log('props11', addressType)
    // const [startDate, setStartDate] = useState(new Date());
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
            </Modal>
            <div className="rc-padding--sm rc-max-width--xl">
              <div className="rc-layout-container rc-five-column">
                {/* {this.state.loading ? <Loading positionFixed="true" /> : null} */}
                <SideMenu type="Subscription" />
                <div
                  className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop"
                  style={{ display: type === "PaymentComp" ? "block" : "none" }}
                >
                  <PaymentComp
                    paymentId={currentCardInfo.id}
                    type={type}
                    save={(el) => {
                      console.log(el);
                      let param = {
                        subscribeId: subDetail.subscribeId,
                        paymentId: el.id,
                        goodsItems: subDetail.goodsInfo.map((el) => {
                          return {
                            skuId: el.skuId,
                            subscribeNum: el.subscribeNum,
                            subscribeGoodsId: el.subscribeGoodsId,
                          };
                        }),
                      };
                      console.log(param);
                      this.setState({ loading: true });
                      updateDetail(param)
                        .then((res) => {
                          this.setState({ loading: false });
                          // console.log(res);
                          // window.location.reload();
                          this.showErrMsg(
                            this.props.intl.messages.saveSuccessfullly,
                            "success",
                            () => this.getDetail()
                          );
                        })
                        .catch((err) => {
                          this.setState({ loading: false });
                        });
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
                          deliveryAddressId: el.deliveryAddressId,
                          goodsItems: subDetail.goodsInfo.map((el) => {
                            return {
                              skuId: el.skuId,
                              subscribeNum: el.subscribeNum,
                              subscribeGoodsId: el.subscribeGoodsId,
                            };
                          }),
                        };
                        if (isBillSame) {
                          param.billingAddressId = el.deliveryAddressId;
                        }
                        //订阅寄送地址和发票地址更改,在更新接口里面加上changeField参数为deliveryAddressId和billingAddressId的title
                        let title = "";
                        //寄送地址
                        title = this.props.intl.messages[
                          "subscription.shippingAddress"
                        ];
                        //如果勾选了同步发票地址,两个地址以逗号隔开传给后台
                        if (param.billingAddressId) {
                          title =
                            title +
                            "," +
                            this.props.intl.messages[
                            "subscription.BillingAddress"
                            ];
                        }
                        //增加返回changeField字段
                        Object.assign(param, {
                          changeField: title,
                        });
                        console.log(param);
                        this.setState({ loading: true });
                        updateDetail(param)
                          .then((res) => {
                            this.setState({ loading: false });
                            // console.log(res);
                            // window.location.reload();
                            this.showErrMsg(
                              this.props.intl.messages.saveSuccessfullly,
                              "success",
                              () => this.getDetail()
                            );
                          })
                          .catch((err) => {
                            this.setState({ loading: false });
                          });
                        this.setState({
                          type: "main",
                          currentDeliveryAddress: el,
                        });
                      } else {
                        let param = {
                          subscribeId: subDetail.subscribeId,
                          billingAddressId: el.deliveryAddressId,
                          goodsItems: subDetail.goodsInfo.map((el) => {
                            return {
                              skuId: el.skuId,
                              subscribeNum: el.subscribeNum,
                              subscribeGoodsId: el.subscribeGoodsId,
                            };
                          }),
                        };
                        //增加返回changeField字段
                        Object.assign(param, {
                          changeField: this.props.intl.messages[
                            "subscription.BillingAddress"
                          ],
                        });
                        console.log(param);
                        this.setState({ loading: true });
                        updateDetail(param)
                          .then((res) => {
                            this.setState({ loading: false });
                            // console.log(res);
                            // window.location.reload();
                            this.showErrMsg(
                              this.props.intl.messages.saveSuccessfullly,
                              "success",
                              () => this.getDetail()
                            );
                          })
                          .catch((err) => {
                            this.setState({ loading: false });
                          });
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
                      style={{ flex: "4" }}
                    >
                      {/* <FormattedMessage id="subscription.sub"></FormattedMessage>{data.subId} */}
                      <i className="rc-icon rc-address--xs rc-brand1"></i>{" "}
                      <FormattedMessage id="subscription" />(
                      {subDetail.subscribeId})
                    </h4>
                    {subDetail.subscribeStatus === "0" && (
                      <div
                        className="rightBox"
                        style={{
                          flex: "3",
                          textAlign: "right",
                          lineHeight: "36px",
                        }}
                      >
                        <a
                          class="rc-styled-link "
                          href="#/"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              modalType: "orderNow",
                              modalShow: true,
                              currentModalObj: this.state.modalList.filter(
                                (el) => el.type === "orderNow"
                              )[0],
                            });
                          }}
                        >
                          <FormattedMessage id="subscription.orderNow" />
                        </a>{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        <a
                          class="rc-styled-link "
                          href="#/"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              modalType: "skipNext",
                              modalShow: true,
                              currentModalObj: this.state.modalList.filter(
                                (el) => el.type === "skipNext"
                              )[0],
                            });
                          }}
                        >
                          <FormattedMessage id="subscription.skip" />
                        </a>{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        <a
                          class="rc-styled-link "
                          href="#/"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              modalType: "cancelAll",
                              modalShow: true,
                              currentModalObj: this.state.modalList.filter(
                                (el) => el.type === "cancelAll"
                              )[0],
                            });
                          }}
                        >
                          <FormattedMessage id="subscription.cancelAll" />
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="content-asset">
                    {this.state.loading && <div className="mt-4">
                      <Skeleton
                        color="#f5f5f5"
                        width="100%"
                        height="50%"
                        count={4}
                      />
                    </div>}
                    <div className={`${this.state.loading ? 'hidden' : ''} `}>
                      <div className="rc-layout-container rc-three-column mgb30 operationBox">
                        <div className="rc-column column-contanier" style={{ width: '50%' }}>
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
                                <FormattedMessage id="subscription.previousOrders" />
                              </b>
                              <h4
                                className="rc-card__meta order-Id"
                                style={{ marginTop: "10px" }}
                              >
                                <Selection
                                  optionList={this.state.orderOptions}
                                  selectedItemChange={(el) => {
                                    const { history } = this.props;
                                    history.push(
                                      `/account/orders-detail/${el.value}`
                                    );
                                  }}
                                  selectedItemData={{
                                    value: this.state.orderOptions.length
                                      ? this.state.orderOptions[0].value
                                      : "",
                                  }}
                                  customStyleType="select-one"
                                />
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="rc-column column-contanier">
                          <div
                            className="rc-card-container"
                            style={{ borderRight: "1px solid #ddd" }}
                          >
                            <div
                              className="v-center"
                              style={{ marginRight: "20px" }}
                            >
                              <i className="rc-icon rc-refresh--xs rc-brand1"></i>
                            </div>
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
                                  selectedItemChange={(el) => {
                                    let param = {
                                      subscribeId: subDetail.subscribeId,
                                      cycleTypeId: el.id,
                                      goodsItems: subDetail.goodsInfo.map(
                                        (el) => {
                                          return {
                                            skuId: el.skuId,
                                            subscribeNum: el.subscribeNum,
                                            subscribeGoodsId:
                                              el.subscribeGoodsId,
                                          };
                                        }
                                      ),
                                    };
                                    //增加返回changeField字段
                                    Object.assign(param, {
                                      changeField: this.props.intl.messages[
                                        "subscription.frequency"
                                      ],
                                    });
                                      this.setState({ loading: true });
                                    updateDetail(param)
                                      .then((res) => {
                                        this.setState({ loading: false });
                                        // window.location.reload();
                                        this.showErrMsg(
                                          this.props.intl.messages
                                            .saveSuccessfullly,
                                          "success",
                                          () => this.getDetail()
                                        );
                                      })
                                      .catch((err) => {
                                        this.setState({ loading: false });
                                      });
                                  }}
                                  selectedItemData={{
                                      value: subDetail.frequency || "",
                                  }}
                                  customStyleType="select-one"
                                  type="freqency"
                                  disabled={subDetail.subscribeStatus !== '0'}
                                />
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
                                {/* <span class="rc-input"> */}
                                {/* <span
                                className="rc-input rc-input--inline rc-full-width rc-icon rc-calendar--xs rc-interactive rc-iconography--xs"
                                input-setup="true"
                              > */}

                                <DatePicker
                                  className="receiveDate"
                                  placeholder="Select Date"
                                  dateFormat="yyyy-MM-dd"
                                  minDate={this.state.minDate}
                                  selected={
                                    subDetail.nextDeliveryTime
                                      ? new Date(subDetail.nextDeliveryTime)
                                      : new Date()
                                  }
                                  disabled={subDetail.subscribeStatus !== '0'}
                                  onChange={(date) => this.onDateChange(date)}
                                />
                                {/* </span> */}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="rc-layout-container rc-three-column mgb30"
                        style={{ borderBottom: "1px solid #ddd" }}
                      >
                        <div
                          className="rc-padding-bottom--xs cart-error-messaging cart-error"
                          style={{
                            display: this.state.errorShow ? "block" : "none",
                          }}
                        >
                          <aside
                            className="rc-alert rc-alert--error rc-alert--with-close text-break"
                            role="alert"
                          >
                            <span style={{ paddingLeft: 0 }}>
                              {this.state.errorMsg}
                            </span>
                          </aside>
                        </div>
                        <aside
                          className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${
                            this.state.successTipVisible ? "" : "hidden"
                            }`}
                          role="alert"
                        >
                          <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">
                            <FormattedMessage id="saveSuccessfullly" />
                          </p>
                        </aside>
                        <div className="rc-column product-container rc-double-width">
                          {
                            subDetail.subscribeStatus === '0' && (
                              <div
                                className="text-right"
                                style={{
                                  position: "absolute",
                                  paddingRight: "60px",
                                }}
                              >
                                <a
                                  className="rc-styled-link red-text"
                                  style={{
                                    display: !isChangeQuatity
                                      ? "inline-block"
                                      : "none",
                                  }}
                                  onClick={() =>
                                    this.setState({
                                      isChangeQuatity: true,
                                      currentGoodsInfo: JSON.parse(
                                        JSON.stringify(subDetail.goodsInfo)
                                      ),
                                    })
                                  }
                                >
                                  <FormattedMessage id="edit"></FormattedMessage>
                                </a>
                                <a
                                  className="rc-styled-link red-text"
                                  style={{
                                    display: isChangeQuatity
                                      ? "inline-block"
                                      : "none",
                                  }}
                                  onClick={() => {
                                    this.setState({ loading: true });
                                    window.location.reload();
                                  }}
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
                                  onClick={async () => {
                                    try {
                                      subDetail.goodsInfo = this.state.currentGoodsInfo;
                                      let param = {
                                        subscribeId: subDetail.subscribeId,
                                        goodsItems: subDetail.goodsInfo.map(
                                          (el) => {
                                            return {
                                              skuId: el.skuId,
                                              subscribeNum: el.subscribeNum,
                                              subscribeGoodsId:
                                                el.subscribeGoodsId,
                                            };
                                          }
                                        ),
                                      };
                                      Object.assign(param, {
                                        changeField: this.props.intl.messages[
                                          "subscription.change"
                                        ],
                                      });
                                      await this.doUpdateDetail(param);
                                      await this.getDetail();
                                      this.showErrMsg(
                                        this.props.intl.messages
                                          .saveSuccessfullly,
                                        "success"
                                      );
                                      this.setState({
                                        isChangeQuatity: false,
                                        subDetail,
                                      });
                                    } catch (err) {
                                      this.showErrMsg(err);
                                    } finally {
                                      this.setState({ loading: false });
                                    }
                                  }}
                                >
                                  <FormattedMessage id="Save"></FormattedMessage>
                                </a>
                              </div>
                            )
                          }

                          {subDetail.goodsInfo &&
                            subDetail.goodsInfo.map((el, index) => (
                              <div
                                className="rc-layout-container rc-five-column"
                                style={{
                                  height: "160px",
                                  paddingRight: "60px",
                                }}
                              >
                                <div
                                  className="rc-column flex-layout"
                                  style={{ width: "80%" }}
                                >
                                  <div className="img-container">
                                    <img src={el.goodsPic} />
                                  </div>
                                  <div
                                    className="v-center"
                                    style={{
                                      width: "200px",
                                    }}
                                  >
                                    <p
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        overflowWrap: "normal",
                                      }}
                                    >
                                      {el.goodsName}
                                    </p>
                                    <p
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {el.specText}
                                    </p>
                                    <div>
                                      <label
                                        style={{
                                          textDecoration: "line-through",
                                        }}
                                      >
                                        {el.originalPrice}
                                      </label>
                                        &nbsp;&nbsp;
                                        <label
                                      // className="font-weight-bold"
                                      // style={{color: '#ec001a'}}
                                      >
                                        {el.subscribePrice}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="rc-column"
                                  style={{ width: "20%" }}
                                >
                                  <div className="p-container rc-quantity text-right d-flex justify-content-end rc-content-v-middle ">
                                    <div
                                      className="v-center"
                                      style={{
                                        display: isChangeQuatity
                                          ? "block"
                                          : "none",
                                      }}
                                    >
                                      <span
                                        className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"
                                        onClick={() => {
                                          // if (el.subscribeNum > 1) {
                                          //   el.subscribeNum = el.subscribeNum - 1
                                          //   this.setState({ subDetail })
                                          // }
                                          let {
                                            currentGoodsInfo,
                                          } = this.state;
                                          if (
                                            currentGoodsInfo[index]
                                              .subscribeNum > 1
                                          ) {
                                            currentGoodsInfo[
                                              index
                                            ].subscribeNum =
                                              currentGoodsInfo[index]
                                                .subscribeNum - 1;
                                            this.setState({
                                              currentGoodsInfo,
                                            });
                                            //数量变更后
                                            subDetail.goodsInfo[
                                              index
                                            ].subscribeNum =
                                              currentGoodsInfo[
                                                index
                                              ].subscribeNum;
                                            this.onQtyChange();
                                          } else {
                                            this.showErrMsg(
                                              <FormattedMessage id="cart.errorInfo" />
                                            );
                                          }
                                        }}
                                      ></span>
                                      <input
                                        className="rc-quantity__input"
                                        id="quantity"
                                        name="quantity"
                                        min="1"
                                        max="899"
                                        maxLength="5"
                                        // value={el.subscribeNum}
                                        onChange={(e) => {
                                          this.setState({ errorShow: false });
                                          const val = e.target.value;
                                          let {
                                            currentGoodsInfo,
                                          } = this.state;
                                          if (val === "") {
                                            currentGoodsInfo[
                                              index
                                            ].subscribeNum = 1;
                                            this.setState({
                                              currentGoodsInfo,
                                            });
                                          } else {
                                            let tmp = parseInt(val);
                                            if (isNaN(tmp)) {
                                              tmp = 1;
                                              this.showErrMsg(
                                                <FormattedMessage id="cart.errorInfo" />
                                              );
                                            }
                                            if (tmp < 1) {
                                              tmp = 1;
                                              this.showErrMsg(
                                                <FormattedMessage id="cart.errorInfo" />
                                              );
                                            }
                                            if (tmp > 30) {
                                              tmp = 30;
                                              this.showErrMsg(
                                                <FormattedMessage id="cart.errorMaxInfo" />
                                              );
                                            }
                                            currentGoodsInfo[
                                              index
                                            ].subscribeNum = tmp;
                                            this.setState({
                                              currentGoodsInfo,
                                            });
                                            // this.updateBackendCart({ goodsInfoId: item.goodsInfoId, goodsNum: item.buyCount, verifyStock: false })
                                          }
                                          //数量变更后
                                          subDetail.goodsInfo[
                                            index
                                          ].subscribeNum =
                                            currentGoodsInfo[
                                              index
                                            ].subscribeNum;
                                          this.onQtyChange();
                                        }}
                                        value={
                                          this.state.currentGoodsInfo
                                            .length &&
                                          this.state.currentGoodsInfo[index]
                                            .subscribeNum
                                        }
                                      />
                                      <span
                                        className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"
                                        onClick={() => {
                                          let {
                                            currentGoodsInfo,
                                          } = this.state;
                                          if (
                                            currentGoodsInfo[index]
                                              .subscribeNum < 30
                                          ) {
                                            currentGoodsInfo[
                                              index
                                            ].subscribeNum =
                                              currentGoodsInfo[index]
                                                .subscribeNum + 1;
                                            this.setState({
                                              currentGoodsInfo,
                                            });
                                            //数量变更后
                                            subDetail.goodsInfo[
                                              index
                                            ].subscribeNum =
                                              currentGoodsInfo[
                                                index
                                              ].subscribeNum;
                                            this.onQtyChange();
                                          } else {
                                            //数量不能超过30
                                            this.showErrMsg(
                                              <FormattedMessage id="cart.errorMaxInfo" />
                                            );
                                          }
                                        }}
                                      ></span>
                                    </div>
                                    <div
                                      className="v-center"
                                      style={{
                                        display: !isChangeQuatity
                                          ? "block"
                                          : "none",
                                      }}
                                    >
                                      <b className="">
                                        Qty: {el.subscribeNum}
                                      </b>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                        <div
                          className="rc-column flex-layout"
                        // style={{ paddingLeft: "80px" }}
                        >
                          <div className="v-center total-container">
                            <div className="border-b">
                              <div className="flex-layout">
                                <label className="font18">
                                  <FormattedMessage id="subscription.total"></FormattedMessage>
                                    :
                                  </label>
                                <div className="text-right">
                                  <b>{formatMoney(this.state.subTotal)}</b>
                                </div>
                              </div>
                              {
                                this.state.subDiscount ? <div className="flex-layout">
                                  <label className="saveDiscount font18 red-text">
                                    <FormattedMessage id="subscription.saveDiscount"></FormattedMessage>
                                    :
                                  </label>
                                  <div className="text-right red-text">
                                    <b>
                                      -{formatMoney(this.state.subDiscount)}
                                    </b>
                                  </div>
                                </div> : null
                              }
                              {!this.state.isShowValidCode &&
                                discount.map((el) => (
                                  <div className="flex-layout">
                                    <label className="saveDiscount font18 red-text">
                                      {this.state.promotionDesc}
                                    </label>
                                    <div
                                      className="text-right red-text"
                                      style={{ position: "relative" }}
                                    >
                                      <b>
                                        -
                                          {formatMoney(
                                        this.state.promotionDiscount
                                      )}
                                      </b>
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
                                          this.setState({
                                            discount: discount,
                                          });
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
                                  <b>{formatMoney(this.state.subShipping)}</b>
                                </div>
                              </div>
                            </div>
                            <div className="flex-layout mgt20">
                              <label className="saveDiscount font18">
                                <FormattedMessage id="subscription.totalInclu"></FormattedMessage>
                                  :
                                </label>
                              <div className="text-right">
                                <b>{formatMoney(this.state.subTradeTotal)}</b>
                              </div>
                            </div>
                            {/* 支付新增promotionCode(选填) */}
                            <div
                              className="footer"
                              style={{ marginTop: "10px", display: subDetail.subscribeStatus === '0' ? 'block' : 'none' }}
                            >
                              <span
                                class="rc-input rc-input--inline rc-input--label"
                                style={{ width: "180px" }}
                              >
                                <input
                                  class="rc-input__control"
                                  id="id-text2"
                                  type="text"
                                  name="text"
                                  placeholder="Promotional Code"
                                  value={this.state.promotionInputValue}
                                  onChange={(e) => this.handlerChange(e)}
                                />
                                <label
                                  class="rc-input__label"
                                  for="id-text2"
                                ></label>
                              </span>
                              <button
                                className={[
                                  "rc-btn",
                                  "rc-btn--sm",
                                  "rc-btn--two",
                                  this.state.isClickApply &&
                                  "ui-btn-loading ui-btn-loading-border-red",
                                ].join(" ")}
                                style={{ marginTop: "10px", float: "right" }}
                                onClick={async () => {
                                  let result = {};
                                  if (!this.state.promotionInputValue) return;
                                  this.setState({
                                    isClickApply: true,
                                    isShowValidCode: false,
                                    lastPromotionInputValue: this.state
                                      .promotionInputValue,
                                  });
                                  //会员
                                  result = await this.doGetPromotionPrice(
                                    this.state.promotionInputValue
                                  );
                                  this.setState({
                                    promotionDesc:
                                      result.context.promotionDesc,
                                  });
                                  if (
                                    result.code == "K-000000" &&
                                    result.context.promotionDiscount
                                  ) {
                                    //表示输入apply promotionCode成功
                                    discount.splice(0, 1, 1); //(起始位置,替换个数,插入元素)
                                    this.setState({ discount });
                                  } else {
                                    this.setState({
                                      isShowValidCode: true,
                                    });
                                  }
                                  this.setState({
                                    isClickApply: false,
                                    promotionInputValue: "",
                                    loading: false,
                                  });
                                }}
                              >
                                Apply
                                </button>
                            </div>
                            {this.state.isShowValidCode ? (
                              <div
                                style={{
                                  margin: "25px 0 0 6px"
                                }}
                                className="red"
                              >
                                Promotion code(
                                {this.state.lastPromotionInputValue}) is not
                                  Valid
                              </div>
                            ) : null}
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
                                    {currentDeliveryAddress.consigneeNumber}
                                  </h1>
                                  <h1 className="rc-card__meta order-Id">
                                    {this.state.countryList.length &&
                                      this.state.countryList.filter(
                                        (el) =>
                                          el.id ===
                                          currentDeliveryAddress.countryId
                                      ).length
                                      ? this.state.countryList.filter(
                                        (el) =>
                                          el.id ===
                                          currentDeliveryAddress.countryId
                                      )[0].valueEn
                                      : currentDeliveryAddress.countryId}
                                      ,{" "}
                                    {this.state.cityList.length &&
                                      this.state.cityList.filter(
                                        (el) =>
                                          el.id ===
                                          currentDeliveryAddress.cityId
                                      ).length
                                      ? this.state.cityList.filter(
                                        (el) =>
                                          el.id ===
                                          currentDeliveryAddress.cityId
                                      )[0].valueEn
                                      : currentDeliveryAddress.cityId}
                                  </h1>
                                  <h1 className="rc-card__meta order-Id">
                                    {currentDeliveryAddress.address1}
                                  </h1>
                                  {
                                    subDetail.subscribeStatus === '0' && (
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
                                    )
                                  }
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
                                    {currentBillingAddress.consigneeNumber}
                                  </h1>
                                  <h1 className="rc-card__meta order-Id">
                                    {this.state.countryList.length &&
                                      this.state.countryList.filter(
                                        (el) =>
                                          el.id ===
                                          currentBillingAddress.countryId
                                      )[0].valueEn}
                                      ,{" "}
                                    {this.state.cityList.length &&
                                      this.state.cityList.filter(
                                        (el) =>
                                          el.id ===
                                          currentBillingAddress.cityId
                                      )[0].valueEn}
                                  </h1>
                                  <h1 className="rc-card__meta order-Id">
                                    {currentBillingAddress.address1}
                                  </h1>
                                  {
                                    subDetail.subscribeStatus === '0' && (
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
                                    )
                                  }
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
                                      // src={data.payment.cardImg}
                                      src={this.state.creditCardImgObj[currentCardInfo.vendor]}
                                    />
                                      &nbsp;&nbsp; xxxx xxxx xxxx{" "}
                                    {currentCardInfo.cardNumber.substring(
                                      currentCardInfo.cardNumber.length - 4
                                    )}
                                  </h1>
                                  <h1 className="rc-card__meta order-Id">
                                    {currentCardInfo.cardOwner}
                                  </h1>
                                  <h1 className="rc-card__meta order-Id">
                                    {currentCardInfo.phoneNumber}
                                  </h1>
                                  {
                                    subDetail.subscribeStatus === '0' && (
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
                                    )
                                  }
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
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default SubscriptionDetail;
