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
import { getOrderDetails } from "@/api/order"
import './index.css'

export default class AccountOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      orderNumber: '',
      details: null,
      loading: true
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
    createHashHistory().push(`/account/orders/aftersale/${this.state.orderNumber}`)
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
                    <div className="card confirm-details orderDetailsPage">
                      {this.state.loading
                        ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
                        : details
                          ? <div className="card-body">
                            <div className="ui-order-title">
                              <span>Order number:{this.state.orderNumber}</span>&nbsp;&nbsp;
                              <span>Order time:{details.orderTimeOut.substr(0, 19)}</span>&nbsp;&nbsp;
                              <span>Order status:To be shipped</span>
                              <div className="details-btn-group d-flex">
                                <button className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn">
                                  <a onClick={() => this.hanldeItemClick('exchange')} className="ui-cursor-pointer">
                                    Exchange
                                </a>
                                </button>
                                <button
                                  className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn"
                                  style={{ marginLeft: '-1rem' }}>
                                  <a onClick={() => this.hanldeItemClick('return')} className="ui-cursor-pointer">
                                    Return
                                </a>
                                </button>
                                <button
                                  className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn"
                                  style={{ marginLeft: '-1rem' }}>
                                  <span className="mr-2 rc-styled-link">Cancel order</span>
                                </button>
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
        </main>
        <Footer />
      </div>
    )
  }
}