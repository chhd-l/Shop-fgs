import React from "react"
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { formatMoney } from "@/utils/utils"
import { getOrderDetails } from "@/api/order"
import './index.css'

export default class OrdersAfterSale extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      orderNumber: '',
      details: null,
      afterSaleType: '' //操作类型 - exchange/return
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
      })
    } else {
      const { history } = this.props
      history.goBack()
    }
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  render () {
    const event = {
      "page": {
        "type": "Account",
        "hitTimestamp": new Date().toISOString(),
        "theme": ""
      }
    }
    const { afterSaleType } = this.state
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
                      <div className="card-body">
                        <div className="ui-order-title">
                          <span>Order number:{this.state.orderNumber}</span>&nbsp;&nbsp;
                          <span>Order amount: {formatMoney(500)}</span>&nbsp;&nbsp;
                        </div>
                        <div className="detail-title">
                          {afterSaleType === 'exchange' ? 'Exchange Product' : 'Return Product'}
                        </div>
                        <div class="order__listing">
                          <div className="order-list-container">
                            <div className="card-container mt-0 border-0">
                              <div className="card rc-margin-y--none">
                                <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0 border-0">
                                  <div className="col-12 col-md-2">
                                    <p>product name</p>
                                  </div>
                                  <div className="col-12 col-md-2">
                                    <p>unit</p>
                                  </div>
                                  <div className="col-12 col-md-2">
                                    <p>{afterSaleType === 'exchange' ? 'Exchange Price' : 'Return Price'}</p>
                                  </div>
                                  <div className="col-12 col-md-2">
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
                              <div className="row rc-margin-x--none row align-items-center pt-2 pb-2 border-bottom">
                                <div className="col-12 col-md-2 pl-0 pr-0">
                                  <div className="row">
                                    <div className="col-12 col-md-3">
                                      <div class="rc-input rc-input--inline">
                                        <input class="rc-input__radio" id="id-radio-cat" value="Cat" type="radio" name="radio-1" />
                                        <label class="rc-input__label--inline" for="id-radio-cat"></label>
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-9 d-flex">
                                      <img
                                        className="img-fluid border"
                                        src="https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004271507544701.png"
                                        alt="dd"
                                        title="dd" />
                                      <span className="m-1">
                                        dsjodsaf<br />
                                        4kg
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-md-2">
                                  kg
                                </div>
                                <div className="col-12 col-md-2">
                                  {formatMoney(200)}
                                </div>
                                <div className="col-12 col-md-2">
                                  2
                                </div>
                                <div className="col-12 col-md-2">
                                  2
                                </div>
                                <div className="col-12 col-md-2">
                                  {formatMoney(200)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {afterSaleType !== 'exchange'
                          ? <div className="row pt-4 pb-4 border-bottom" style={{ lineHeight: 1.7 }}>
                            <div className="col-9 text-right">
                              Refundable amount:
                            </div>
                            <div className="col-2 text-right">$ 333</div>
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