import React from "react";
import { inject, observer } from 'mobx-react'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OxxoModal from "./modules/OxxoModal"
import PayProductInfo from "@/components/PayProductInfo"
import AddressPreview from "@/components/AddressPreview";
import Modal from '@/components/Modal'
import { FormattedMessage } from 'react-intl'
import { Link } from "react-router-dom"
import successImg from "@/assets/images/credit-cards/success.png"
import { find } from "lodash"
import { GTM_SITE_ID } from "@/utils/constant"
import { getDictionary } from "@/utils/utils"
import { addEvaluate } from "@/api/order"
import store from 'storejs'
import "./index.css"

@inject("checkoutStore", "frequencyStore")
@observer
class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      currentProduct: null,
      loading: true,
      paywithLogin: sessionStorage.getItem("rc-paywith-login") === "true",
      oxxoPayUrl: sessionStorage.getItem("oxxoPayUrl"),
      submitLoading: false,
      evalutateScore: -1,
      consumerComment: "",

      modalShow: false,
      oxxoModalShow: false,
      operateSuccessModalVisible: false,
      errorMsg: "",

      subNumber: store.get('subNumber'),
      orderNumber: store.get('orderNumber')
    };
    this.timer = null;
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
    if (this.state.paywithLogin) {
      this.props.checkoutStore.removeLoginCartData();
    } else {
      this.props.checkoutStore.setCartData(
        this.props.checkoutStore.cartData.filter((ele) => !ele.selected)
      ); // 只移除selected
      sessionStorage.removeItem("rc-token");
    }
    store.remove('orderNumber')
    store.remove('subNumber')
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false;
    }
    let productList;
    if (this.state.paywithLogin) {
      productList = this.props.checkoutStore.loginCartData;
    } else {
      productList = this.props.checkoutStore.cartData.filter(
        (ele) => ele.selected
      );
    }
    this.setState({
      productList: productList,
      loading: false
    });
    setTimeout(() => {
      if (this.state.oxxoPayUrl) {
        this.setState({ modalShow: false, oxxoModalShow: true });
      }
    }, 3000);
  }
  get tradePrice () {
    return this.props.checkoutStore.tradePrice
  }
  matchNamefromDict (dictList, id) {
    return find(dictList, (ele) => ele.id == id)
      ? find(dictList, (ele) => ele.id == id).name
      : id;
  }
  async hanldeClickSubmit () {
    const { evalutateScore } = this.state;
    if (evalutateScore === -1) {
      this.setState({
        errorMsg: <FormattedMessage id="confirmation.rateTip4" />,
      });
      return false;
    }
    this.setState({ submitLoading: true });
    try {
      await addEvaluate({
        storeId: process.env.REACT_APP_STOREID,
        orderNo: this.state.orderNumber,
        goodsScore: evalutateScore + 1,
        consumerComment: this.state.consumerComment,
        serverScore: -1,
        logisticsScore: -1,
        compositeScore: -1,
        consumerType: this.state.paywithLogin ? "Member" : "Guest",
      });
      this.setState({
        modalShow: false,
        // operateSuccessModalVisible: true
      });
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   this.setState({ operateSuccessModalVisible: false })
      // }, 5000)
    } catch (err) {
      this.setState({ errorMsg: err.toString() });
    } finally {
      this.setState({ submitLoading: false });
    }
  }
  handleConsumerCommentChange (e) {
    this.setState({
      errorMsg: "",
      consumerComment: e.target.value,
    });
  }
  render () {
    const {
      productList,
      loading
    } = this.state;

    let event;
    let eEvents;
    if (!loading) {
      let products;
      if (this.state.paywithLogin) {
        products = productList.map((item) => {
          return {
            id: item.goodsInfoId,
            name: item.goodsName,
            price: item.salePrice,
            brand: "Royal Canin",
            category: item.goodsCategory,
            quantity: item.buyCount,
            variant: item.specText,
          };
        });
      } else {
        products = productList.map((item) => {
          const selectedSize = item.sizeList.filter((s) => s.selected)[0];
          return {
            id: selectedSize.goodsInfoId,
            name: item.goodsName,
            price: selectedSize.salePrice,
            brand: "Royal Canin",
            category: item.goodsCategory,
            quantity: item.quantity,
            variant: selectedSize.specText,
          };
        });
      }
      event = {
        page: {
          type: "Order Confirmation",
          theme: "",
        },
      };
      eEvents = {
        event: `${GTM_SITE_ID}eComTransaction`,
        ecommerce: {
          currencyCode: "MXN",
          purchase: {
            actionField: {
              id: this.state.orderNumber,
              revenue: this.tradePrice
            },
            products,
          },
        },
      };
    }

    return (
      <div>
        {event ? (
          <GoogleTagManager
            additionalEvents={event}
            ecommerceEvents={eEvents}
          />
        ) : null}
        <Header history={this.props.history} />
        <main className="rc-content--fixed-header">
          <div className="rc-layout-container rc-three-column rc-max-width--xl">
            <div className="rc-column rc-double-width shipping__address">
              <div className="center">
                <img
                  src={successImg}
                  alt=""
                  style={{ display: "inline-block" }}
                />
                <h4>
                  <b>
                    <FormattedMessage id="confirmation.info1" />
                  </b>
                </h4>
                <p style={{ marginBottom: "5px" }}>
                  <FormattedMessage id="confirmation.info2" />
                </p>
                <div className="d-flex align-items-center justify-content-center">
                  {
                    this.state.oxxoPayUrl
                      ? <>
                        <Link className="rc-btn rc-btn--one"
                          onClick={() => {
                            this.setState({ oxxoModalShow: true });
                          }}>
                          <FormattedMessage id="printEbanx" />
                        </Link>
                      &nbsp;<FormattedMessage id="or" />&nbsp;
                      <Link
                          to="/"
                          className="rc-meta rc-styled-link backtohome mb-0">
                          <FormattedMessage id="confirmation.visitOnlineStore" />
                        </Link>
                      </>
                      : <Link
                        to="/"
                        className="rc-btn rc-btn--one"
                        style={{ transform: 'scale(.85)' }}>
                        <FormattedMessage id="confirmation.visitOnlineStore" />
                      </Link>
                  }
                </div>
                {
                  !this.state.oxxoPayUrl && <p
                    className={`rc-margin-top--sm ${this.state.subNumber ? 'text-left' : ''} ml-auto mr-auto`}
                    style={{ width: '25%' }}>
                    {
                      this.state.subNumber && <>
                        <b className="mb-3" style={{ display: 'inline-block' }}>
                          <FormattedMessage id="subscription.number" />:{' '}
                          <Link
                            to={`/account/subscription-detail/${this.state.subNumber}`}
                            className="rc-meta rc-styled-link backtohome mb-0">
                            {this.state.subNumber}
                          </Link>
                        </b>
                        <br />
                      </>
                    }
                    <b>
                      <FormattedMessage id="confirmation.orderNumber" />:{' '}
                      {
                        this.state.paywithLogin
                          ? <Link
                            to={`/account/orders-detail/${this.state.orderNumber}`}
                            className="rc-meta rc-styled-link backtohome mb-0">
                            {this.state.orderNumber}
                          </Link>
                          : this.state.orderNumber
                      }
                    </b>
                  </p>
                }

              </div>
              <div className="rc-bg-colour--brand3 rc-max-width--xl rc-bottom-spacing rc-padding--sm imformation">
                <div className="product-summary rc-column" style={{padding:0}}>
                  <h5 className="product-summary__title rc-margin-bottom--xs center">
                    <FormattedMessage id="total" />
                  </h5>
                  <PayProductInfo history={this.props.history}
                    buyWay={this.props.frequencyStore.buyWay}
                    frequencyName={this.props.frequencyStore.frequencyName}
                  />
                </div>
                <AddressPreview info={this.state.paywithLogin ? store.get("loginDeliveryInfo") : store.get("deliveryInfo")} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <Modal
          key="1"
          visible={this.state.modalShow}
          confirmLoading={this.state.submitLoading}
          modalTitle={<FormattedMessage id="order.rateModalTitle" />}
          confirmBtnText={<FormattedMessage id="submit" />}
          cancelBtnVisible={false}
          close={() => {
            this.setState({ modalShow: false });
          }}
          hanldeClickConfirm={() => this.hanldeClickSubmit()}
        >
          <div className="text-center pl-4 pr-4" style={{ lineHeight: 2 }}>
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
          </div>
        </Modal>
        <Modal
          key="2"
          visible={this.state.operateSuccessModalVisible}
          modalText={<FormattedMessage id="operateSuccessfully" />}
          close={() => {
            this.setState({ operateSuccessModalVisible: false });
          }}
          hanldeClickConfirm={() => {
            this.setState({ operateSuccessModalVisible: false });
          }}
        />
        <OxxoModal visible={this.state.oxxoModalShow} oxxoPayUrl={this.state.oxxoPayUrl} close={() => {
          this.setState({ oxxoModalShow: false });
        }} />
      </div>
    );
  }
}

export default Confirmation;
