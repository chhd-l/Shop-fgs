import React from "react"
import Skeleton from 'react-skeleton-loader'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom';
import { formatMoney, getPreMonthDay, dateFormat } from "@/utils/utils"
import { getOrderList } from "@/api/order"
// import './index.css'

export default class AccountOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : [],
      orderList: [

      ],
      form: {
        duringTime: '6',
        pageNum: 1,
        pageSize: 10
      },
      loading: false
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

    this.queryOrderList()
  }
  handleDuringTimeChange (e) {
    const { form } = this.state
    form.duringTime = e.target.value
    this.setState({
      form: form
    }, () => this.queryOrderList())
  }
  queryOrderList () {
    const { form } = this.state
    let createdFrom
    const res = [
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
    this.setState({ loading: true })
    let now = dateFormat('YYYY-mm-dd', new Date())
    if (form.duringTime === '13') {
      let now2 = new Date()
      now2.setDate(1)
      now2.setMonth(0)
      createdFrom = dateFormat('YYYY-mm-dd', now2)
    } else {
      createdFrom = getPreMonthDay(now, parseInt(form.duringTime))
    }
    let param = {
      createdFrom,
      createdTo: now,
      pageNum: form.pageNum - 1,
      pageSize: form.pageSize
    }
    getOrderList(param)
      .then(res => {

      })
      .catch(err => {
        this.setState({
          loading: false
        })
      })
    setTimeout(() => {
      this.setState({
        orderList: res,
        loading: false
      })
    }, 2000)
  }
  render () {
    sessionStorage.setItem('rc-token', 'eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNpkjr0Kg0AQhF8lbG1x62nu1i6lTV5B7mcVIcbgeZIgvns2RUgRphn4PpjZIWUPDaC1VhutiSwUMLoVGqwtGdJWlQWEnNZ54qWN4va9VRI06GpyEZU0Xxuvz9orJIKffwlhzvf1b-DLr25igQPPy8Cn6Mb0Erq5W-bOxcixS7xsY-Ak1n4I4-fjc43KyiBV6ngDAAD__w.-Ue6zzkw6wD_oDRz93xDbs3gQO3w7L_TDN_YrOx4bE0')
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
                    <select
                      data-js-select=""
                      value={this.state.form.duringTime}
                      onChange={(e) => this.handleDuringTimeChange(e)}>
                      <option value="6">Last 6 months</option>
                      <option value="12">Last 12 months</option>
                      <option value="13">{new Date().getFullYear()}</option>
                    </select>
                  </div>
                </div>

                <div class="order__listing">
                  <div class="order-list-container">
                    {this.state.loading ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={2} /> : null}
                    {!this.state.loading && this.state.orderList.map(order => (
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