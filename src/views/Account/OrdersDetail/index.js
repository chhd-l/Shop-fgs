import React from "react"
import Skeleton from 'react-skeleton-loader'
import { createHashHistory } from 'history'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import { FormattedMessage } from 'react-intl'
import { formatMoney } from "@/utils/utils"
import { getOrderDetails, cancelOrder } from "@/api/order"
import './index.css'

export default class AccountOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      orderNumber: '',
      details: null,
      loading: true,
      modalShow: false,
      cancelOrderLoading: false
    }
  }
  componentDidMount () {
    this.setState({
      orderNumber: this.props.match.params.orderNumber
    }, () => {
      getOrderDetails(this.state.orderNumber)
        .then(res => {
          this.setState({
            details: res.context,
            loading: false
          })
        })
        .catch(err => {
          this.setState({
            loading: false
          })
        })
    })
  }
  hanldeItemClick (afterSaleType) {
    sessionStorage.setItem('rc-after-sale-type', afterSaleType)
    createHashHistory().push(`/account/orders-aftersale/${this.state.orderNumber}`)
  }
  handleCancelOrder () {
    this.setState({ cancelOrderLoading: true })
    cancelOrder(this.state.orderNumber)
      .then(res => {
        this.setState({ cancelOrderLoading: false })
        createHashHistory().push('/account/orders')
      })
      .catch(err => {
        console.log(err)
        this.setState({ cancelOrderLoading: false })
      })
  }
  returnOrExchangeBtnJSX () {
    const { details } = this.state
    let ret = null
    if (new Date().getTime() > new Date(details.orderTimeOut).getTime()
      && details.tradeState.deliverStatus === 'SHIPPED'
      && details.tradeState.flowState === 'COMPLETED') {
      return <React.Fragment>
        <button
          className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn"
          onClick={() => this.hanldeItemClick('exchange')}>
          <a className="ui-cursor-pointer">
            Exchange
          </a>
        </button>
        <button
          className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn"
          onClick={() => this.hanldeItemClick('return')}>
          <a className="ui-cursor-pointer">
            Return
          </a>
        </button>
      </React.Fragment>
    }
    return ret
  }
  cancelOrderBtnJSX () {
    const { details } = this.state
    let ret = null
    if (new Date().getTime() < new Date(details.orderTimeOut).getTime()) {
      ret = <button className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn">
        <span
          className="mr-2 rc-styled-link"
          onClick={() => {
            this.setState({ modalShow: true })
          }}>Cancel order</span>
      </button>
    }
    return ret
  }
  render () {
    const event = {
      "page": {
        "type": "Account",
        "hitTimestamp": new Date().toISOString(),
        "theme": ""
      }
    }
    const { details } = this.state
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header cartData={this.state.cartData} showMiniIcons={true} location={this.props.location} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu />
              <div className="my__account-content rc-column rc-quad-width">
                <div className="row justify-content-center">
                  <div className="order_listing_details col-12 no-padding">
                    <div
                      className="card confirm-details orderDetailsPage ml-0 mr-0"
                      ref={(node) => {
                        if (node) {
                          node.style.setProperty('padding', '0', 'important');
                          node.style.setProperty('border', '0', 'important');
                        }
                      }}>
                      {this.state.loading
                        ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
                        : details
                          ? <div className="card-body p-0">
                            <div className="ui-order-title d-flex justify-content-between">
                              <div>
                                <span className="inlineblock">Order number:{this.state.orderNumber}</span>&nbsp;&nbsp;
                                <span className="inlineblock">Order time:{details.tradeState.createTime.substr(0, 19)}</span>&nbsp;&nbsp;
                                <span className="inlineblock">Order status:{details.tradeState.flowState}</span>
                              </div>
                              <div className="details-btn-group d-flex">
                                {this.returnOrExchangeBtnJSX()}
                                {this.cancelOrderBtnJSX()}
                              </div>
                            </div>
                            <div className="detail-title">
                              Order information
                          </div>
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    Shipping address:
                                </div>
                                  <div className="col-12 col-md-8">
                                    echo 12 18983292983
                                </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    Delivery method:
                                </div>
                                  <div className="col-12 col-md-8">
                                    express delivery
                                </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    Invoice Information:
                                </div>
                                  <div className="col-12 col-md-8">
                                    General Invoice Details Individual
                                </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    Invoice receiving address:
                                </div>
                                  <div className="col-12 col-md-8">
                                    {[details.invoice.contacts, details.invoice.phone, details.invoice.address].join(' ')}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    Attachment information:
                                </div>
                                  <div className="col-12 col-md-8">
                                    no
                                </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    Payment method:
                                </div>
                                  <div className="col-12 col-md-8">
                                    Online payment paid&nbsp;
                                    <span className="red" data-tooltip-placement="bottom" data-tooltip="bottom-tooltip">payment record</span>
                                    <div id="bottom-tooltip" class="rc-tooltip p-2" style={{ width: 200 }}>
                                      <div className="row">
                                        <div className="col-6 text-right">收款账户:</div>
                                        <div className="col-6 text-left">无</div>
                                      </div>
                                      <div className="row">
                                        <div className="col-6 text-right">付款金额:</div>
                                        <div className="col-6 text-left">{formatMoney(400)}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    order notes:
                                </div>
                                  <div className="col-12 col-md-8">
                                    no
                                </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-4 text-right color-999">
                                    Seller notes:
                                </div>
                                  <div className="col-12 col-md-8">
                                    no
                                </div>
                                </div>
                              </div>
                            </div>
                            <div className="detail-title">
                              Product information
                            </div>
                            <div class="order__listing">
                              <div className="order-list-container">
                                <div className="card-container mt-0 border-0">
                                  <div className="card rc-margin-y--none">
                                    <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0 border-0">
                                      <div className="col-12 col-md-4">
                                        <p>Product</p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p>Unit</p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p>Price</p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p>Quantity</p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p>Subtotal</p>
                                      </div>
                                    </div>
                                  </div>
                                  {details.tradeItems.map((item, i) => (
                                    <div className="row rc-margin-x--none row align-items-center pt-2 pb-2 border-bottom" key={i}>
                                      <div className="col-12 col-md-4 d-flex pl-0 pr-0">
                                        <img
                                          className="img-fluid border"
                                          src={item.pic}
                                          alt={item.spuName}
                                          title={item.spuName} />
                                        <div className="m-1">
                                          {item.spuName}<br />
                                          <span className="color-999">{item.specDetails}</span>
                                        </div>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {item.unit}
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {formatMoney(item.price)}
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {item.num}
                                      </div>
                                      <div className="col-12 col-md-2">
                                        {formatMoney(item.price * item.num)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="row pt-2 pb-2 border-bottom" style={{ lineHeight: 1.7 }}>
                              <div className="col-9 text-right color-999">
                                Total:
                              </div>
                              <div className="col-2 text-right">{formatMoney(details.tradeItems.reduce((total, item) => total + item.splitPrice, 0))}</div>
                              <div className="col-9 text-right color-999">
                                Shipping:
                              </div>
                              <div className="col-2 text-right">{formatMoney(0)}</div>
                              <div className="col-9 text-right color-999">
                                Total(Including VAT):
                              </div>
                              <div className="col-2 text-right">{formatMoney(details.tradeItems.reduce((total, item) => total + item.splitPrice, 0))}</div>
                            </div>
                            <div className="detail-title">
                              Delivery Record
                            </div>
                            <div className="text-center">No data</div>
                          </div>
                          : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* modal */}
          <div
            className={`modal-backdrop fade ${
              this.state.modalShow ? "show" : ""
              }`}
            style={{ display: this.state.modalShow ? "block" : "none", zIndex: 59 }}
          ></div>
          <div
            className={`modal fade ${this.state.modalShow ? "show" : ""}`}
            id="removeProductModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="removeProductLineItemModal"
            style={{ display: this.state.modalShow ? "block" : "none", overflow: 'hidden' }}
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header delete-confirmation-header">
                  <h4 className="modal-title" id="removeProductLineItemModal">
                    Cancel Order?
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => { this.setState({ modalShow: false }) }}
                  >
                    <span aria-hidden="true">
                      ×
                  </span>
                  </button>
                </div>
                <div className="modal-body delete-confirmation-body">
                  Do you really want to cancel the order?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    data-dismiss="modal"
                    onClick={() => { this.setState({ modalShow: false }) }}
                  >
                    <FormattedMessage id="cancel" />
                  </button>
                  <button
                    type="button"
                    className={`btn btn-primary cart-delete-confirmation-btn ${this.state.cancelOrderLoading ? 'ui-btn-loading' : ''}`}
                    data-dismiss="modal"
                    onClick={() => this.handleCancelOrder()}
                  >
                    <FormattedMessage id="yes" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}