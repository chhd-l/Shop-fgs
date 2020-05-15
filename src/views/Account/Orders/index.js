import React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom';
import { formatMoney } from "@/utils/utils"
// import './index.css'

export default class AccountOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      orderList: [
        {
          orderDate: '05/14/2020',
          orderNumber: '000053310',
          totalAmount: 2339,
          status: 'Not done',
          goodsName: 'Mini Adult',
          goodsImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw1e081197/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.png?sw=250&amp;sh=380&amp;sm=fit',
          amount: 1839,
          size: '4.00kg',
          quantity: '1.0'
        }
      ]
    }
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
  }
  render () {
    return (
      <div>
        <Header cartData={this.state.cartData} showMiniIcons={true} location={this.props.location} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Orders" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div class="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 class="rc-delta rc-margin--none">History of orders</h4>
                </div>
                <div>
                  <div class="form-group rc-select-processed">
                    <select data-js-select="">
                      <option>Last 6 months</option>
                      <option>Last 12 months</option>
                      <option>2020</option>
                    </select>
                  </div>
                </div>

                <div class="order__listing">
                  <div class="order-list-container">
                    {this.state.orderList.map(order => (
                      <div class="card-container" key={order.orderNumber}>
                        <div class="card rc-margin-y--none">
                          <div class="card-header row rc-margin-x--none">
                            <div class="col-12 col-md-3">
                              <p>Order Date: <br class="d-none d-md-block" /> <span class="medium orderHeaderTextColor">{order.orderDate}</span></p>
                            </div>
                            <div class="col-12 col-md-3">
                              <p>Order Number: <br class="d-none d-md-block" /> <span class="medium orderHeaderTextColor">{order.orderNumber}</span></p>
                            </div>
                            <div class="col-12 col-md-2">
                              <p>Only <br class="d-none d-md-block" /> <span class="medium orderHeaderTextColor price-symbol">{formatMoney(order.totalAmount)}</span></p>
                            </div>
                            <div class="col-12 col-md-4 d-flex justify-content-end flex-column flex-md-row rc-padding-left--none--mobile">
                              <button class="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn">
                                <Link
                                  class="medium pull-right--desktop rc-styled-link rc-padding-top--xs"
                                  to={`/account/orders/detail/${order.orderNumber}`}>
                                  Order Details
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="d-flex justify-content-between rc-column flex-column flex-md-row">
                          <span class="rc-padding-top--xs medium">{order.status}</span>
                        </div>
                        <div class="row rc-margin-x--none">
                          <div class="col-12 col-md-8 rc-column rc-padding-top--none">
                            <div class="row">
                              <div class="col-3">
                                <img
                                  class="img-fluid"
                                  src={order.goodsImg}
                                  alt={order.goodsName}
                                  title={order.goodsName} />
                              </div>
                              <div class="col-9 order-item-detail">
                                <span class="medium title_product text_content">{order.goodsName}</span><br />
                                <span>
                                  {order.size} - Amount {order.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-md-4">
                            <div class="col-7 offset-md-5 rc-padding-bottom--sm--mobile">
                              <div class="rc-text--right medium price-symbol">{formatMoney(order.amount)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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