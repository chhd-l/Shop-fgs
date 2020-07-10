import React from "react";
import "./index.css";
import { FormattedMessage } from "react-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";
import SideMenu from "@/components/SideMenu";
import visaImg from "@/assets/images/credit-cards/visa.svg";
import Loading from "@/components/Loading";
import PaymentComp from './components/PaymentComp'
export default class SubscriptionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      type: 'main'
    };
  }
  componentWillUnmount() {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount() {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false;
    }
    console.log("enter detail");
    this.setState({
      subId: this.props.match.params.subscriptionNumber,
    });
  }
  render() {
    const data = this.state;
    let { isChangeQuatity, discount, type } = this.state;
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
            <div className="rc-padding--sm rc-max-width--xl">
              <div className="rc-layout-container rc-five-column">
                {this.state.loading ? <Loading positionFixed="true" /> : null}
                <SideMenu type="Subscription" />
                <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop subscriptionDetail" style={{display: type === 'PaymentComp'? 'block': 'none' }}>
                  <PaymentComp type={type} save={() => this.setState({type: 'main'})} cancel={() => this.setState({type: 'main'})}/>  
                </div>
                <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop subscriptionDetail" style={{display: type === 'main'? 'block': 'none' }}>
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
                      Subscription
                    </h4>
                    <div className="rightBox" style={{ flex: "1" }}>
                      <a class="rc-styled-link " href="#/">
                        Skip Next Delivery
                      </a>{" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      <a class="rc-styled-link " href="#/">
                        Cancel All
                      </a>
                      {/* <p>Order Status &nbsp; Not Yet Shipped</p>
                      <p className="col-12">
                        <div className="col-md-3">
                        Recent Order
                        </div>
                        <div className="col-md-6">
                          <span class="rc-select">
                            <select data-js-select="" id="id-single-select">
                              <option>O202007080936003217</option>
                              <option>O202007080936003218</option>
                            </select>
                          </span>
                        </div>
                      </p> */}
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
                            <b className="">To be Delivered</b>
                            <h4
                              className="rc-card__meta order-Id"
                              style={{ marginTop: "10px" }}
                            >
                              <span class="rc-select">
                                <select data-js-select="" id="id-single-select">
                                  <option>O202007080936003217</option>
                                  <option>O202007080936003218</option>
                                </select>
                              </span>
                              {/* Every 4 Weeks */}
                              {/* <FormattedMessage id="subscription.order"></FormattedMessage>{data.oderId}
                                {data.nextOrderTime} */}
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
                              <span class="rc-select">
                                <select data-js-select="" id="id-single-select">
                                  <option>Every 2 Weeks</option>
                                  <option>Every 4 Weeks</option>
                                </select>
                              </span>
                              {/* Every 4 Weeks */}
                              {/* <FormattedMessage id="subscription.order"></FormattedMessage>{data.oderId}
                                {data.nextOrderTime} */}
                            </h1>
                          </div>
                          {/* <div className="v-center" style={{marginRight: '40px'}}>
                            <a className="rc-styled-link red-text">
                              <FormattedMessage id="subscription.change"></FormattedMessage>
                            </a>
                          </div> */}
                        </div>
                      </div>
                      {/* <div className="rc-column column-contanier">
                          <div className="rc-card-container">
                            <div className="bt-icon">
                              <button
                                  className="rc-btn less-width-xs rc-btn--icon rc-icon rc-search--xs rc-iconography not-yet-btn"
                                  aria-label="Search"></button>
                            </div>
                            <div className="rc-card-content">
                              <b className="">
                                <FormattedMessage id="subscription.notYet"></FormattedMessage>
                              </b>
                              <h1 className="rc-card__meta order-Id"><FormattedMessage id="subscription.order"></FormattedMessage>                                {data.oderId}
                                {data.subId}
                              </h1>
                            </div>
                            <div>
                              <span className="rc-carousel__direction rc-carousel__direction--next
                                rc-btn rc-btn--icon rc-icon rc-interactive rc-right rc-iconography" aria-label="next">
                              <span className="rc-screen-reader-text">Next</span>
                              </span>
                            </div>
                          </div>
                        </div> */}

                      <div className="rc-column">
                        <div className="rc-card-container">
                          {/* <div className="bt-icon">
                            <button
                              className="rc-btn less-width-xs rc-btn--icon rc-icon rc-search--xs rc-iconography not-yet-btn"
                              aria-label="Search"
                            ></button>
                          </div> */}
                          <div
                            className="v-center"
                            style={{ marginRight: "20px" }}
                          >
                            <i className="rc-icon rc-refresh--xs rc-brand1"></i>
                          </div>
                          <div className="rc-card-content">
                            <b className="">
                              {/* <FormattedMessage id="subscription.nextOrder"></FormattedMessage> */}
                              Next Receive Date
                            </b>
                            <h1
                              className="rc-card__meta order-Id"
                              style={{ marginTop: "10px" }}
                            >
                              <span class="rc-input">
                                <input
                                  class="rc-input__date"
                                  id="id-date-2"
                                  type="date"
                                  name="example-date-input"
                                />
                                <label class="rc-input__label" for="id-date-2">
                                  {/* <span class="rc-input__label-text">Date</span> */}
                                </label>
                              </span>
                              {/* <FormattedMessage id="subscription.nextOrder"></FormattedMessage>{" "}
                              {data.oderId}
                              {data.nextOrderTime} */}
                            </h1>
                          </div>
                          {/* <div className="v-center" style={{marginRight: '40px'}}>
                            <a className="rc-styled-link red-text">
                              <FormattedMessage id="subscription.change"></FormattedMessage>
                            </a>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="rc-layout-container rc-three-column mgb30">
                      <div
                        className="rc-column product-container"
                        style={{ height: "200px" }}
                      >
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
                            onClick={() =>
                              this.setState({ isChangeQuatity: false })
                            }
                          >
                            <FormattedMessage id="Save"></FormattedMessage>
                          </a>
                        </div>
                        <div className="rc-layout-container rc-five-column">
                          <div className="rc-column rc-triple-width flex-layout">
                            <div className="img-container">
                              <img
                                // className="product-img"
                                src={data.productUrl}
                              />
                            </div>
                            <div className="v-center">
                              <label className="font18">
                                {data.productName}
                              </label>
                              <div>
                                <label className="font-weight-bold">
                                  {data.productPrice}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="rc-column rc-double-width">
                            <div className="p-container rc-quantity text-right d-flex justify-content-end rc-content-v-middle ">
                              <div
                                className="v-center"
                                style={{
                                  display: isChangeQuatity ? "block" : "none",
                                }}
                              >
                                <span className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus"></span>
                                <input
                                  className="rc-quantity__input"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="899"
                                  maxLength="5"
                                  value="1"
                                />
                                <span className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus"></span>
                              </div>
                              <div
                                className="v-center"
                                style={{
                                  display: !isChangeQuatity ? "block" : "none",
                                }}
                              >
                                <b className="">Qty: 1</b>
                              </div>
                            </div>
                          </div>
                        </div>
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
                                      cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                      discount.pop()
                                      this.setState({discount: discount})
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
                              />
                              <label class="rc-input__label" for="id-text2">
                                <span class="rc-input__label-text">
                                  Promotional Code
                                </span>
                              </label>
                            </span>
                            {/* <div className="text-right"> */}

                            <button
                              class="rc-btn rc-btn--sm rc-btn--two"
                              style={{ marginTop: "10px", float: "right" }}
                              onClick={() => {
                                discount.push(1)
                                this.setState({discount})
                              }}
                            >
                              Apply
                            </button>
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="rc-layout-container rc-two-column">
                      <div className="rc-column footer-container ">
                        <b className="font18">
                          <i className="rc-icon rc-shop--xs rc-brand1"></i>{" "}
                          <FormattedMessage id="subscription.shippingAddress"></FormattedMessage>
                        </b>
                        <div className="mt10">
                          {/* <article className="rc-card rc-card--a"> */}
                          <div className="rc-card__body pdl0">
                            <div className="rc-card-container">
                              <div className="rc-card-content">
                                {/* <b className="footer--title">
                                    {data.shippingAddress.name}
                                  </b> */}
                                <h1 className="rc-card__meta order-Id">
                                  {/* {data.shippingAddress.address} */}
                                  Cathy Lei
                                </h1>
                                <h1 className="rc-card__meta order-Id">
                                  {/* {data.shippingAddress.code} */}
                                  Mexico, Monterry
                                </h1>
                                <h1 className="rc-card__meta order-Id">
                                  {/* {data.shippingAddress.addressType} */}
                                  ILIANA ROMO MANZANO12345
                                </h1>
                                <a className="rc-styled-link red-text">
                                  <FormattedMessage id="subscription.change"></FormattedMessage>{" "}
                                  Address
                                </a>
                              </div>
                              {/* <div className="v-center">
                                  
                                </div> */}
                            </div>
                          </div>
                          {/* </article> */}
                        </div>
                      </div>
                      <div className="rc-column footer-container">
                        <b className="font18">
                          <i className="rc-icon rc-news--xs rc-brand1"></i>{" "}
                          <FormattedMessage id="subscription.BillingAddress"></FormattedMessage>
                        </b>
                        <div className="mt10">
                          {/* <article className="rc-card rc-card--a"> */}
                          <div className="rc-card__body pdl0">
                            <div className="rc-card-container">
                              <div className="rc-card-content">
                                {/* <b className="footer--title">
                                    {data.billingAddress.name}
                                  </b> */}
                                <h1 className="rc-card__meta order-Id">
                                  {/* {data.shippingAddress.address} */}
                                  Cathy Lei
                                </h1>
                                <h1 className="rc-card__meta order-Id">
                                  {/* {data.shippingAddress.code} */}
                                  Mexico, Monterry
                                </h1>
                                <h1 className="rc-card__meta order-Id">
                                  {/* {data.shippingAddress.addressType} */}
                                  ILIANA ROMO MANZANO12345
                                </h1>
                                <a className="rc-styled-link red-text">
                                  <FormattedMessage id="subscription.change"></FormattedMessage>{" "}
                                  Address
                                </a>
                              </div>
                              {/* <div className="v-center">
                                  
                                </div> */}
                            </div>
                          </div>
                          {/* </article> */}
                        </div>
                      </div>
                    </div>
                    <div className="rc-layout-container rc-two-column">
                      <div className="rc-column footer-container ">
                        <b className="b-text">
                          <i className="rc-icon rc-shelter--xs rc-brand1"></i>{" "}
                          <FormattedMessage id="subscription.paymentMethod"></FormattedMessage>
                        </b>
                        <div className="mt10">
                          {/* <article className="rc-card rc-card--a"> */}
                          <div className="rc-card__body pdl0 ">
                            <div className="rc-card-container">
                              {/* <div className="card-wrapper flex-layout">
                                  
                                </div> */}
                              <div className="rc-card-content">
                                {/* <b className="footer--title">
                                    {data.payment.name}
                                  </b> */}
                                <h1 className="rc-card__meta order-Id">
                                  <img
                                    className="card-img"
                                    src={data.payment.cardImg}
                                  />
                                  &nbsp;&nbsp; {data.payment.type}
                                </h1>
                                <h1 className="rc-card__meta order-Id">
                                  {/* {data.payment.card} */}
                                  XXXXXX0423
                                </h1>

                                <a className="rc-styled-link red-text" onClick={() => this.setState({type: 'PaymentComp'})}>
                                  <FormattedMessage id="subscription.change"></FormattedMessage>{" "}
                                  Card
                                </a>
                              </div>
                              {/* <div className="v-center"> */}

                              {/* </div> */}
                            </div>
                          </div>
                          {/* </article> */}
                        </div>
                      </div>
                      <div className="rc-column footer-container">
                        <b className="b-text">
                          <i className="rc-icon rc-new-window--xs rc-brand1"></i>{" "}
                          My Little Pet
                        </b>
                        <div className="mt10">
                          {/* <article className="rc-card rc-card--a"> */}
                          <div className="rc-card__body pdl0 ">
                            <div className="rc-card-container">
                              {/* <div className="card-wrapper flex-layout"> */}

                              {/* </div> */}
                              <div className="rc-card-content">
                                <h1 className="rc-card__meta order-Id">
                                  Ziggle
                                </h1>
                                {/* <b className="footer--title">
                                    {data.payment.name}
                                  </b> */}
                                <h1 className="rc-card__meta order-Id">
                                  {/* {data.payment.card} */}
                                  12.04.2019
                                </h1>

                                <a className="rc-styled-link red-text">
                                  <FormattedMessage id="subscription.change"></FormattedMessage>{" "}
                                  Pet
                                </a>
                              </div>
                              {/* <div className="v-center">
                                  
                                </div> */}
                            </div>
                          </div>
                          {/* </article> */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="footer" style={{margin: '30px 0'}}>
                      <div className="text-right">
                      <button class="rc-btn rc-btn--sm rc-btn--two">Skip this order</button> or <a class="rc-styled-link " href="#/">Cancel All</a>

                      </div>
                      </div> */}
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
