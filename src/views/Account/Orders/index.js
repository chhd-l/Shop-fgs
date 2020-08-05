import React from "react";
import Skeleton from "react-skeleton-loader";
import { inject, observer } from "mobx-react";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";
import SideMenu from "@/components/SideMenu";
import TimeCount from "@/components/TimeCount";
import Selection from "@/components/Selection";
import Pagination from "@/components/Pagination";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import {
  formatMoney,
  getPreMonthDay,
  dateFormat,
  getDictionary,
} from "@/utils/utils";
import { batchAdd } from "@/api/payment";
import { getOrderList, getOrderDetails } from "@/api/order";
import orderImg from "./img/order.jpg";
import store from "storejs";
import {
  IMG_DEFAULT,
  DELIVER_STATUS_ENUM,
  ORDER_STATUS_ENUM,
  PAY_STATUS_ENUM,
} from "@/utils/constant";
import "./index.css";

@injectIntl
@inject("checkoutStore")
@observer
class AccountOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      form: {
        orderNumber: "",
        period: 7,
      },
      loading: true,
      currentPage: 1,
      totalPage: 1,
      initing: true,
      errMsg: "",
      duringTimeOptions: [],
      defaultLocalDateTime: "",
      haveList: true,
    };

    this.pageSize = 6;
  }
  componentWillUnmount() {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount() {
    this.FormateOderTimeFilter();
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false;
    }
    this.queryOrderList();
  }
  async FormateOderTimeFilter() {
    let res = await getDictionary({ type: "orderTimeFilter" });
    let duringTimeOptions =
      res &&
      res.map((item) => {
        let value, values;
        if (item.valueEn == 7) {
          value = item.valueEn;
          values = 7;
          return {
            value: value,
            name: (
              <FormattedMessage id="order.lastXDays" values={{ val: values }} />
            ),
          };
        } else if (item.valueEn == 30) {
          value = item.valueEn;
          values = 30;
          return {
            value: value,
            name: (
              <FormattedMessage id="order.lastXDays" values={{ val: values }} />
            ),
          };
        } else {
          value = item.valueEn;
          values = item.valueEn / 30;
          return {
            value: value,
            name: (
              <FormattedMessage
                id="order.lastXMonths"
                values={{ val: values }}
              />
            ),
          };
        }
      });
    this.setState(
      {
        duringTimeOptions: duringTimeOptions,
      },
      () => {
        console.log(this.state.duringTimeOptions);
      }
    );
  }
  handleDuringTimeChange(data) {
    // console.log("获取当前选择的天气",data,this.state.form.period)
    const { form } = this.state;
    form.period = data.value;
    this.setState(
      {
        form: form,
        currentPage: 1,
      },
      () => this.queryOrderList()
    );
  }
  handleInputChange(e) {
    const target = e.target;
    const { form } = this.state;
    form[target.name] = target.value;
    this.setState({
      form: form,
      currentPage: 1,
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.queryOrderList();
    }, 500);
  }
  queryOrderList() {
    const { form, initing, currentPage } = this.state;
    if (!initing) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 0);
    }
    let createdFrom = "";
    this.setState({ loading: true });
    let param = {
      keywords: form.orderNumber,
      pageNum: currentPage - 1,
      pageSize: this.pageSize,
      period: form.period,
    };
    getOrderList(param)
      .then((res) => {
        console.log("paramas:", param);
        let tmpList = Array.from(res.context.content, (ele) => {
          const tradeState = ele.tradeState;
          return Object.assign(ele, {
            canPayNow:
              tradeState.flowState === "AUDIT" &&
              tradeState.deliverStatus === "NOT_YET_SHIPPED" &&
              tradeState.payState === "NOT_PAID" &&
              new Date(ele.orderTimeOut).getTime() >
                new Date(res.defaultLocalDateTime).getTime() &&
              (!ele.payWay || ele.payWay.toUpperCase() !== "OXXO"),
            showOXXOExpireTime:
              tradeState.flowState === "AUDIT" &&
              tradeState.deliverStatus === "NOT_YET_SHIPPED" &&
              tradeState.payState === "NOT_PAID" &&
              new Date(ele.orderTimeOut).getTime() >
                new Date(res.defaultLocalDateTime).getTime() &&
              ele.payWay &&
              ele.payWay.toUpperCase() === "OXXO",
            payNowLoading: false,
            canRePurchase:
              tradeState.flowState === "COMPLETED" ||
              tradeState.flowState === "VOID",
            canReview:
              tradeState.flowState === "COMPLETED" && !ele.storeEvaluateVO,
          });
        });
        if (!tmpList.length) {
          this.setState({ haveList: false });
        } else {
          this.setState({ haveList: true });
        }
        this.setState({
          orderList: tmpList,
          currentPage: res.context.pageable.pageNumber + 1,
          totalPage: res.context.totalPages,
          defaultLocalDateTime: res.defaultLocalDateTime,
          loading: false,
          initing: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errMsg: err.toString(),
          initing: false,
        });
      });
  }
  hanldePageNumChange(params) {
    this.setState(
      {
        currentPage: params.currentPage,
      },
      () => this.queryOrderList()
    );
  }
  updateFilterData(form) {
    this.setState(
      {
        form: Object.assign({}, this.state.form, form),
        currentPage: 1,
      },
      () => this.queryOrderList()
    );
  }
  handlePayNowTimeEnd(order) {
    const { orderList } = this.state;
    order.canPayNow = false;
    this.setState({ orderList: orderList });
  }
  async handleClickPayNow(order) {
    const { orderList } = this.state;
    order.payNowLoading = true;
    this.setState({ orderList: orderList });
    const tradeItems = order.tradeItems.map((ele) => {
      return {
        goodsInfoImg: ele.pic,
        goodsName: ele.spuName,
        specText: ele.specDetails,
        buyCount: ele.num,
        salePrice: ele.price,
        goodsInfoId: ele.skuId,
        subscriptionPrice: ele.subscriptionPrice,
        subscriptionStatus: ele.subscriptionStatus,
      };
    });
    try {
      const detailRes = await getOrderDetails(order.id);
      const detailResCt = detailRes.context;
      const tmpDeliveryAddress = {
        firstName: detailResCt.consignee.firstName,
        lastName: detailResCt.consignee.lastName,
        address1: detailResCt.consignee.detailAddress1,
        address2: detailResCt.consignee.detailAddress2,
        rfc: detailResCt.consignee.rfc,
        country: detailResCt.consignee.countryId
          ? detailResCt.consignee.countryId.toString()
          : "",
        city: detailResCt.consignee.cityId
          ? detailResCt.consignee.cityId.toString()
          : "",
        postCode: detailResCt.consignee.postCode,
        phoneNumber: detailResCt.consignee.phone,
        addressId: detailResCt.consignee.id,
      };
      const tmpBillingAddress = {
        firstName: detailResCt.invoice.firstName,
        lastName: detailResCt.invoice.lastName,
        address1: detailResCt.invoice.address1,
        address2: detailResCt.invoice.address2,
        rfc: detailResCt.invoice.rfc,
        country: detailResCt.invoice.countryId
          ? detailResCt.invoice.countryId.toString()
          : "",
        city: detailResCt.invoice.cityId
          ? detailResCt.invoice.cityId.toString()
          : "",
        postCode: detailResCt.invoice.postCode,
        phoneNumber: detailResCt.invoice.phone,
        addressId: detailResCt.invoice.addressId,
      };
      store.set("loginDeliveryInfo", {
        deliveryAddress: tmpDeliveryAddress,
        billingAddress: tmpBillingAddress,
        commentOnDelivery: detailResCt.buyerRemark,
      });
      this.props.checkoutStore.setLoginCartData(tradeItems);
      if (detailResCt.subscriptionResponseVO) {
        const cycleTypeId = detailResCt.subscriptionResponseVO.cycleTypeId;

        let dictList = await Promise.all([
          getDictionary({ type: "Frequency_week" }),
          getDictionary({ type: "Frequency_month" }),
        ]);
        sessionStorage.setItem(
          "rc-subform",
          JSON.stringify({
            buyWay: "frequency",
            frequencyName: [...dictList[0], ...dictList[1]].filter(
              (el) => el.id === cycleTypeId
            )[0].name,
            frequencyId: cycleTypeId,
          })
        );
      }
      sessionStorage.setItem("rc-tid", order.id);
      this.props.checkoutStore.setCartPrice({
        totalPrice: order.tradePrice.totalPrice,
        tradePrice: order.tradePrice.originPrice,
        discountPrice: order.tradePrice.discountsPrice,
        deliveryPrice: order.tradePrice.deliveryPrice,
        promotionDesc: order.tradePrice.promotionDesc,
        promotionDiscount: order.tradePrice.deliveryPrice,
        subscriptionPrice: order.tradePrice.subscriptionPrice,
      });

      this.props.history.push("/payment/payment");
    } catch (err) {
      console.log(err);
    } finally {
      order.payNowLoading = true;
      this.setState({ orderList: orderList });
    }
  }
  rePurchase(order) {
    this.hanldeLoginAddToCart(order);
  }
  async hanldeLoginAddToCart(order) {
    const cartProduct = this.props.checkoutStore.loginCartData;
    const productList = order.tradeItems ? order.tradeItems : [];
    const tradeItems = productList.map((ele) => {
      return {
        goodsInfoImg: ele.pic,
        goodsName: ele.spuName,
        specText: ele.specDetails,
        buyCount: 1, //ele.num
        salePrice: ele.price,
        goodsInfoId: ele.skuId,
      };
    });
    const list = [...tradeItems, ...cartProduct];
    const paramList = [];
    productList.forEach((item) => {
      let obj = {
        verifyStock: false,
        buyCount: 1,
        goodsInfoId: item.skuId,
      };
      paramList.push(obj);
    });
    await batchAdd({ goodsInfos: paramList });
    await this.props.checkoutStore.updateLoginCart();
    this.props.history.push("/cart");
  }
  render() {
    const event = {
      page: {
        type: "Account",
        theme: "",
      },
    };
    let { haveList } = this.state;
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Orders" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 className="rc-delta rc-margin--none pb-2">
                    <FormattedMessage id="order.historyOfOrders" />
                  </h4>
                </div>
                <div
                  className="row justify-content-around"
                  style={{ display: haveList ? "flex" : "none" }}
                >
                  <div className="col-12 col-md-6 row align-items-center mt-2 mt-md-0">
                    <div className="col-md-4">
                      <FormattedMessage id="order.orderNumber" />
                    </div>
                    <div className="col-md-8">
                      <span className="rc-input rc-input--inline rc-full-width">
                        <input
                          className="rc-input__control"
                          id="id-text8"
                          type="text"
                          name="orderNumber"
                          maxLength="20"
                          // placeholder={this.props.intl.message.order.inputOrderNumberTip}
                          value={this.state.form.orderNumber}
                          onChange={(e) => this.handleInputChange(e)}
                        />
                        {this.state.form.orderNumber ? null : (
                          <label className="rc-input__label" htmlFor="id-text8">
                            <span className="rc-input__label-text">
                              <FormattedMessage id="order.inputOrderNumberTip" />
                            </span>
                          </label>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 row align-items-center mt-2 mt-md-0">
                    <div className="col-12">
                      <div className="rc-full-width rc-select-processed">
                        <Selection
                          optionList={this.state.duringTimeOptions}
                          selectedItemChange={(data) =>
                            this.handleDuringTimeChange(data)
                          }
                          selectedItemData={{
                            value: this.state.form.period,
                          }}
                          customStyleType="select-one"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="order__listing"
                  style={{ display: haveList ? "block" : "none" }}
                >
                  <div className="order-list-container">
                    {this.state.loading ? (
                      <div className="mt-4">
                        <Skeleton
                          color="#f5f5f5"
                          width="100%"
                          height="50%"
                          count={4}
                        />
                      </div>
                    ) : this.state.errMsg ? (
                      <div className="text-center mt-5">
                        <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                        {this.state.errMsg}
                      </div>
                    ) : this.state.orderList.length ? (
                      <>
                        {this.state.orderList.map((order) => (
                          <div className="card-container" key={order.id}>
                            <div className="card rc-margin-y--none ml-0">
                              <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0">
                                <div className="col-12 col-md-2">
                                  <p>
                                    <FormattedMessage id="order.orderDate" />:{" "}
                                    <br className="d-none d-md-block" />
                                    <span className="medium orderHeaderTextColor">
                                      {order.tradeState.createTime.substr(
                                        0,
                                        10
                                      )}
                                    </span>
                                  </p>
                                </div>
                                <div className="col-12 col-md-2 mb-2 mb-md-0">
                                  <p className="text-nowrap">
                                    <FormattedMessage id="order.orderNumber" />:{" "}
                                    <br className="d-none d-md-block" />
                                    <span className="medium orderHeaderTextColor">
                                      {order.id}
                                    </span>
                                    {order.isAutoSub ? (
                                      <span
                                        className="iconfont font-weight-bold red ml-1"
                                        style={{ fontSize: ".8em" }}
                                      >
                                        &#xe675;
                                      </span>
                                    ) : null}
                                  </p>
                                </div>
                                <div className="col-4 col-md-2">
                                  <p>
                                    <FormattedMessage id="order.orderStatus" />
                                  </p>
                                </div>
                                <div className="col-4 col-md-2">
                                  <p>
                                    <FormattedMessage id="order.shippingStatus" />
                                  </p>
                                </div>
                                <div className="col-4 col-md-2">
                                  <p>
                                    <FormattedMessage id="order.paymentStatus" />
                                  </p>
                                </div>
                                <div className="col-12 col-md-2 d-flex justify-content-end flex-column flex-md-row rc-padding-left--none--mobile">
                                  <Link
                                    className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn"
                                    to={`/account/orders-detail/${order.id}`}
                                  >
                                    <span className="medium pull-right--desktop rc-styled-link">
                                      <FormattedMessage id="order.orderDetails" />
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div
                              className="row rc-margin-x--none row align-items-center"
                              style={{ padding: "1rem 0" }}
                            >
                              <div className="col-8 col-md-2 d-flex flex-wrap align-items-center mb-2 mb-md-0">
                                {order.tradeItems.slice(0, 2).map((item) => (
                                  <img
                                    className="img-fluid"
                                    key={item.oid}
                                    src={item.pic || IMG_DEFAULT}
                                    alt={item.spuName}
                                    title={item.spuName}
                                  />
                                ))}
                                {order.tradeItems.length > 2 ? (
                                  <span
                                    className="font-weight-bold"
                                    style={{ alignSelf: "flex-end" }}
                                  >
                                    ...
                                  </span>
                                ) : null}
                              </div>
                              <div className="col-4 col-md-2 text-right text-md-left">
                                {formatMoney(order.tradePrice.totalPrice)}
                              </div>
                              <div className="col-4 col-md-2">
                                {ORDER_STATUS_ENUM[
                                  order.tradeState.flowState
                                ] || order.tradeState.flowState}
                              </div>
                              <div className="col-4 col-md-2">
                                {DELIVER_STATUS_ENUM[
                                  order.tradeState.deliverStatus
                                ] || order.tradeState.deliverStatus}
                              </div>
                              <div className="col-4 col-md-2">
                                {PAY_STATUS_ENUM[order.tradeState.payState] ||
                                  order.tradeState.payState}
                              </div>
                              <div className="col-4 col-md-2 text-center">
                                {order.canPayNow ? (
                                  <>
                                    <TimeCount
                                      startTime={
                                        this.state.defaultLocalDateTime
                                      }
                                      endTime={order.orderTimeOut}
                                      onTimeEnd={() =>
                                        this.handlePayNowTimeEnd(order)
                                      }
                                    />
                                    <button
                                      className={`rc-btn rc-btn--one ${
                                        order.payNowLoading
                                          ? "ui-btn-loading"
                                          : ""
                                      }`}
                                      style={{ transform: "scale(.85)" }}
                                      onClick={() =>
                                        this.handleClickPayNow(order)
                                      }
                                    >
                                      <FormattedMessage id="order.payNow" />
                                    </button>
                                  </>
                                ) : null}
                                {order.showOXXOExpireTime && (
                                  <span className="red">
                                    <FormattedMessage id="order.expireTime" />:{" "}
                                    <br />
                                    {order.orderTimeOut}
                                  </span>
                                )}
                                {order.canReview ? (
                                  <button
                                    className="rc-btn rc-btn--sm rc-btn--two"
                                    style={{ transform: "scale(.85)" }}
                                  >
                                    <FormattedMessage id="writeReview">
                                      {(txt) => (
                                        <Link
                                          className="red-text"
                                          to={`/account/productReview/${order.id}`}
                                          title={txt}
                                          alt={txt}
                                        >
                                          {txt}
                                        </Link>
                                      )}
                                    </FormattedMessage>
                                  </button>
                                ) : null}
                                {order.canRePurchase ? (
                                  <button
                                    className="rc-btn rc-btn--sm rc-btn--two rePurchase-btn"
                                    style={{ transform: "scale(.85)" }}
                                    onClick={() => this.rePurchase(order)}
                                  >
                                    <FormattedMessage id="rePurchase"></FormattedMessage>
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : null}
                    {this.state.errMsg ||
                    !this.state.orderList.length ? null : (
                      <div className="grid-footer rc-full-width mt-2">
                        <Pagination
                          loading={this.state.loading}
                          totalPage={this.state.totalPage}
                          currentPage={this.state.currentPage}
                          onPageNumChange={(params) =>
                            this.hanldePageNumChange(params)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="content-asset"
                  style={{ display: haveList ? "none" : "block" }}
                >
                  <div class="rc-layout-container rc-two-column">
                    <div class="rc-column">
                      <img src={orderImg} style={{ width: "100%" }} />
                    </div>
                    <div
                      class="rc-column"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <p>
                          You haven't placed any orders yet! Start shopping now
                          for precise nutrition for your pet.
                        </p>
                        <button
                          class="rc-btn rc-btn--one"
                          onClick={() => this.props.history.push("/")}
                        >
                          Start Shopping
                        </button>
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
export default AccountOrders;
