import React from "react"
import Skeleton from 'react-skeleton-loader'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { formatMoney } from "@/utils/utils"
import { getOrderReturnDetails } from "@/api/order"
import './index.css'

export default class OrdersAfterSale extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      afterSaleType: '', //操作类型 - exchange/return
      orderNumber: '',
      details: null,
      loading: true,
      selectedIdx: -1
    }
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
    const afterSaleType = sessionStorage.getItem('rc-after-sale-type')
    if (afterSaleType) {
      this.setState({
        afterSaleType: afterSaleType,
        orderNumber: this.props.match.params.orderNumber
      }, () => this.queryDetails())
    } else {
      const { history } = this.props
      history.goBack()
    }
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  queryDetails () {
    getOrderReturnDetails(this.state.orderNumber)
      .then(res => {
        res = res.context
        res.tradeItems = res.tradeItems.map(t => Object.assign({}, t, { numOrigin: t.num }))
        this.setState({
          details: res,
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
      })
  }
  subQuantity (item) {
    item.num--
    this.setState({
      details: this.state.details
    })
  }
  addQuantity (item) {
    item.num++
    this.setState({
      details: this.state.details
    })
  }
  handleAmountChange (e, item) {
    const val = e.target.value
    if (val === '') {
      item.num = val
      this.setState({
        details: this.state.details
      })
    } else {
      let tmp = parseInt(val)
      if (isNaN(tmp)) {
        tmp = 1
      }
      if (tmp < 0) {
        tmp = 0
      } else if (tmp > item.numOrigin) {
        tmp = item.numOrigin
      }
      item.num = tmp
      this.setState({
        details: this.state.details
      })
    }
  }
  handleSelectedItemChange (idx) {
    this.setState({ selectedIdx: idx })
  }
  render () {
    const event = {
      "page": {
        "type": "Account",
        "hitTimestamp": new Date().toISOString(),
        "theme": ""
      }
    }
    const { afterSaleType, details, selectedIdx } = this.state
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
                      {
                        this.state.loading
                          ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={5} />
                          : details
                            ? <div className="card-body">
                              <div className="ui-order-title">
                                <span>Order number:{this.state.orderNumber}</span>&nbsp;&nbsp;
                                <span>
                                  Order amount:
                                  <span className="red">{formatMoney(details.tradeItems.reduce((total, item) => total + item.splitPrice, 0))}</span>
                                </span>
                              </div>
                              <div className="detail-title">
                                {afterSaleType === 'exchange' ? 'Exchange Product' : 'Return Product'}
                              </div>
                              <div class="order__listing">
                                <div className="order-list-container">
                                  <div className="card-container mt-0 border-0">
                                    <div className="card rc-margin-y--none">
                                      <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0 border-0">
                                        <div className="col-12 col-md-4">
                                          <p>product name</p>
                                        </div>
                                        <div className="col-12 col-md-1">
                                          <p>unit</p>
                                        </div>
                                        <div className="col-12 col-md-2">
                                          <p>{afterSaleType === 'exchange' ? 'Exchange Price' : 'Return Price'}</p>
                                        </div>
                                        <div className="col-12 col-md-1">
                                          <p>Quantity</p>
                                        </div>
                                        <div className="col-12 col-md-2">
                                          <p>{afterSaleType === 'exchange' ? 'Exchange quantity' : 'Quantity returned'}</p>
                                        </div>
                                        <div className="col-12 col-md-2">
                                          <p>Subtotal</p>
                                        </div>
                                      </div>
                                    </div>
                                    {details.tradeItems.map((item, i) => (
                                      <div className="row rc-margin-x--none row align-items-center pt-2 pb-2 border-bottom" key={i}>
                                        <div className="col-12 col-md-4 pl-0 pr-0">
                                          <div className="row">
                                            <div className="col-12 col-md-2 d-flex align-items-center justify-content-center">
                                              <div class="rc-input rc-input--inline mr-0">
                                                <input class="rc-input__radio" id={`id-radio-${i}`} value={i} type="radio" name="radio" onChange={e => this.handleSelectedItemChange(i)} />
                                                <label class="rc-input__label--inline ml-0" for={`id-radio-${i}`}>&nbsp;</label>
                                              </div>
                                            </div>
                                            <div className="col-12 col-md-10 d-flex">
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
                                          </div>
                                        </div>
                                        <div className="col-12 col-md-1">
                                          {item.unit}
                                        </div>
                                        <div className="col-12 col-md-2">
                                          {formatMoney(item.price)}
                                        </div>
                                        <div className="col-12 col-md-1">
                                          {item.numOrigin}
                                        </div>
                                        <div className="col-12 col-md-2">
                                          <div className="rc-quantity d-flex">
                                            {
                                              item.num < 1
                                                ? <span
                                                  className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus rc-btn--increment"
                                                  disabled></span>
                                                : <span
                                                  className=" rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus rc-btn--increment"
                                                  onClick={() => this.subQuantity(item)}></span>
                                            }
                                            <input
                                              className="rc-quantity__input"
                                              type="number"
                                              value={item.num}
                                              min="0"
                                              max={item.numOrigin}
                                              onChange={(e) => this.handleAmountChange(e, item)}
                                            />
                                            {
                                              item.num >= item.numOrigin
                                                ? <span
                                                  className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus rc-btn--increment"
                                                  disabled></span>
                                                : <span
                                                  className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus rc-btn--increment"
                                                  onClick={() => this.addQuantity(item)}></span>
                                            }

                                          </div>

                                        </div>
                                        <div className="col-12 col-md-2">
                                          {formatMoney(item.num * item.price)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {afterSaleType !== 'exchange'
                                ? <div className="row pt-4 pb-4 border-bottom" style={{ lineHeight: 1.7 }}>
                                  <div className="col-9 text-right">
                                    Refundable amount:
                                </div>
                                  <div className="col-2 text-right">{formatMoney(selectedIdx > -1 ? details.tradeItems[selectedIdx].num * details.tradeItems[selectedIdx].price : 0)}</div>
                                </div>
                                : null}
                              <div className="mt-3">
                                <div className="row form-reason align-items-center mb-3">
                                  <label className="col-3 required">reasons for return:</label>
                                  <div className="col-4">
                                    <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                      <select
                                        data-js-select=""
                                        id="shippingCountry"
                                        value=""
                                        name="country"
                                      >
                                        <option>Please select a reason for return</option>
                                        <option>退货原因1</option>
                                        <option>退货原因2</option>
                                      </select>
                                    </span>
                                  </div>
                                </div>
                                <div className="row form-reason align-items-center mb-3">
                                  <label className="col-3 required">Return Method:</label>
                                  <div className="col-4">
                                    <span className="rc-select rc-full-width rc-input--full-width rc-select-processed">
                                      <select
                                        data-js-select=""
                                        id="shippingCountry"
                                        value=""
                                        name="country"
                                      >
                                        <option>Please select a return method</option>
                                        <option>退货方式1</option>
                                        <option>退货方式2</option>
                                      </select>
                                    </span>
                                  </div>
                                </div>
                                <div className="row form-reason align-items-center mb-3">
                                  <label className="col-3 required">Return instructions:</label>
                                  <div className="col-4">
                                    <span
                                      className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                                      input-setup="true"
                                    >
                                      <textarea
                                        className="rc-input__textarea noborder"
                                        maxLength="1000"
                                        name="dwfrm_shipping_shippingAddress_deliveryComment"
                                        id="delivery-comment"
                                        value=""
                                        placeholder="Please fill in the return instructions"
                                      ></textarea>
                                      <label
                                        className="rc-input__label"
                                        htmlFor="delivery-comment"
                                      ></label>
                                    </span>
                                  </div>
                                </div>
                                <div className="row form-reason align-items-center mb-3">
                                  <label className="col-3">Chargeback attachment:</label>
                                  <div className="col-4">
                                    <span
                                      className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                                      input-setup="true"
                                    >
                                      <textarea
                                        className="rc-input__textarea noborder"
                                        maxLength="1000"
                                        name="dwfrm_shipping_shippingAddress_deliveryComment"
                                        id="delivery-comment"
                                        value=""
                                      ></textarea>
                                      <label
                                        className="rc-input__label"
                                        htmlFor="delivery-comment"
                                      ></label>
                                    </span>
                                  </div>
                                </div>
                                <div className="row form-reason align-items-center">
                                  <label className="col-3"></label>
                                  <div className="col-4">
                                    <button class="rc-btn rc-btn--one">Confirm</button>
                                    <button class="rc-btn rc-btn--two">Cancel</button>
                                  </div>
                                </div>
                              </div>
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