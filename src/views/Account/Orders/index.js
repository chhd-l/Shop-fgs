import React from "react"
import Skeleton from 'react-skeleton-loader'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom';
import { formatMoney, getPreMonthDay, dateFormat } from "@/utils/utils"
import { getOrderList } from "@/api/order"
import { IMG_DEFAULT } from '@/utils/constant'

export default class AccountOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderList: [],
      form: {
        duringTime: '7d',
        pageSize: 6,
        orderNumber: '',
        startdate: '',
        enddate: ''
      },
      loading: false,
      currentPage: 1,
      totalPage: 1,
      initing: true,
      errMsg: ''
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
  handlePrevOrNextPage (type) {
    const { currentPage, totalPage } = this.state
    let res
    if (type === 'prev') {
      if (currentPage <= 1) {
        return
      }
      res = currentPage - 1
    } else {
      if (currentPage >= totalPage) {
        return
      }
      res = currentPage + 1
    }
    this.setState({ currentPage: res }, () => this.queryOrderList())
  }
  handleCurrentPageNumChange (e) {
    const val = e.target.value
    if (val === '') {
      this.setState({ currentPage: val })
    } else {
      let tmp = parseInt(val)
      if (isNaN(tmp)) {
        tmp = 1
      }
      if (tmp > this.state.totalPage) {
        tmp = this.state.totalPage
      } else if (tmp < 1) {
        tmp = 1
      }
      if (tmp !== this.state.currentPage) {
        this.setState({ currentPage: tmp }, () => this.queryOrderList())
      }
    }
  }
  handleDuringTimeChange (e) {
    const { form } = this.state
    form.duringTime = e.target.value
    this.setState({
      form: form,
      currentPage: 1,
    }, () => this.queryOrderList())
  }
  handleInputChange (e) {
    const target = e.target
    const { form } = this.state
    form[target.name] = target.value
    this.setState({ form: form })
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.queryOrderList()
    }, 500)
  }
  queryOrderList () {
    const { form, initing, currentPage } = this.state

    if (!initing) {
      const widget = document.querySelector('#J_order_list')
      if (widget) {
        setTimeout(() => {
          window.scrollTo(0, widget.offsetTop);
        }, 0)
      }
    }
    let createdFrom = ''
    this.setState({ loading: true })
    let now = dateFormat('YYYY-mm-dd', new Date())
    if (form.duringTime.includes('d')) {
      let now2 = new Date()
      now2.setDate(now2.getDate() - parseInt(form.duringTime))
      createdFrom = dateFormat('YYYY-mm-dd', now2)
    } else if (form.duringTime.includes('m')) {
      createdFrom = getPreMonthDay(now, parseInt(form.duringTime))
    }
    let param = {
      createdFrom,
      createdTo: now,
      keywords: form.orderNumber,
      // createdFrom: form.startdate ? form.startdate.split('/').join('-') : '',
      // createdTo: form.enddate ? form.enddate.split('/').join('-') : dateFormat('YYYY-mm-dd', new Date()),
      pageNum: currentPage - 1,
      pageSize: form.pageSize
    }
    getOrderList(param)
      .then(res => {
        this.setState({
          orderList: res.context.content,
          currentPage: res.context.pageable.pageNumber + 1,
          totalPage: res.context.totalPages,
          loading: false,
          initing: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false,
          errMsg: err.toString()
        })
      })
  }
  updateFilterData (form) {
    this.setState({
      form: Object.assign({}, this.state.form, form),
      currentPage: 1
    }, () => this.queryOrderList())
  }
  render () {
    const event = {
      "page": {
        "type": "Account",
        "hitTimestamp": new Date().toISOString(),
        "theme": ""
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header showMiniIcons={true} location={this.props.location} history={this.props.history} />
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
                <div className="row justify-content-around">
                  <div className="col-12 col-md-5 row align-items-center mt-2 mt-md-0">
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
                          value={this.state.form.orderNumber}
                          onChange={e => this.handleInputChange(e)} />
                        <label className="rc-input__label" htmlFor="id-text8">
                          <span className="rc-input__label-text">
                            <FormattedMessage id="order.inputOrderNumberTip" />
                          </span>
                        </label>
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-5 row align-items-center mt-2 mt-md-0">
                    <div className="col-12">
                      <div className="rc-full-width rc-select-processed">
                        <select
                          data-js-select=""
                          value={this.state.form.duringTime}
                          onChange={(e) => this.handleDuringTimeChange(e)}>
                          <FormattedMessage id="order.lastXDays" values={{ val: 7 }}>
                            {txt => (
                              <option value="7d">
                                {txt}
                              </option>
                            )}
                          </FormattedMessage>
                          <FormattedMessage id="order.lastXDays" values={{ val: 30 }}>
                            {txt => (
                              <option value="30d">
                                {txt}
                              </option>
                            )}
                          </FormattedMessage>
                          <FormattedMessage id="order.lastXMonths" values={{ val: 3 }}>
                            {txt => (
                              <option value="3m">
                                {txt}
                              </option>
                            )}
                          </FormattedMessage>
                          <FormattedMessage id="order.lastXMonths" values={{ val: 6 }}>
                            {txt => (
                              <option value="6m">
                                {txt}
                              </option>
                            )}
                          </FormattedMessage>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order__listing">
                  <div className="order-list-container">
                    {
                      this.state.loading
                        ? <Skeleton color="#f5f5f5" width="100%" height="50%" count={2} />
                        : this.state.errMsg
                          ? <div className="text-center mt-5">
                            <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                            {this.state.errMsg}
                          </div>
                          : this.state.orderList.length
                            ? <React.Fragment>
                              {this.state.orderList.map(order => (
                                <div className="card-container" key={order.id}>
                                  <div className="card rc-margin-y--none ml-0">
                                    <div className="card-header row rc-margin-x--none align-items-center pl-0 pr-0">
                                      <div className="col-12 col-md-2">
                                        <p><FormattedMessage id="order.orderDate" />: <br className="d-none d-md-block" /> <span className="medium orderHeaderTextColor">{order.tradeState.createTime.substr(0, 10)}</span></p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p><FormattedMessage id="order.orderNumber" />: <br className="d-none d-md-block" /> <span className="medium orderHeaderTextColor">{order.id}</span></p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p><FormattedMessage id="order.orderStatus" /></p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p><FormattedMessage id="order.shippingStatus" /></p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p><FormattedMessage id="order.paymentStatus" /></p>
                                      </div>
                                      <div className="col-12 col-md-2 d-flex justify-content-end flex-column flex-md-row rc-padding-left--none--mobile">
                                        <Link
                                          className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn"
                                          to={`/account/orders-detail/${order.id}`}>
                                          <span className="medium pull-right--desktop rc-styled-link rc-padding-top--xs">
                                            <FormattedMessage id="order.orderDetails" />
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row rc-margin-x--none row align-items-center" style={{ padding: '1rem 0' }}>
                                    <div className="col-12 col-md-4 d-flex flex-wrap">
                                      {order.tradeItems.map(item => (
                                        <img
                                          className="img-fluid"
                                          key={item.oid}
                                          src={item.pic || IMG_DEFAULT}
                                          alt={item.spuName}
                                          title={item.spuName} />
                                      ))}
                                    </div>
                                    <div className="col-12 col-md-2">
                                      {order.tradeState.flowState}
                                    </div>
                                    <div className="col-12 col-md-2">
                                      {order.tradeState.deliverStatus}
                                    </div>
                                    <div className="col-12 col-md-2">
                                      {order.tradeState.payState}
                                    </div>
                                    <div className="col-12 col-md-1 text-right">
                                      {formatMoney(order.tradeItems.reduce((total, item) => total + item.splitPrice, 0))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div className="grid-footer rc-full-width">
                                <nav className="rc-pagination rc-padding--s no-padding-left no-padding-right">
                                  <div className="rc-pagination__form">
                                    <div
                                      className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography"
                                      onClick={() => this.handlePrevOrNextPage('prev')}></div>
                                    {/* <div
                              className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-left--xs rc-iconography"
                              onClick={this.handlePrevOrNextPage('prev')}></div> */}
                                    <div className="rc-pagination__steps">
                                      <input
                                        type="text"
                                        className="rc-pagination__step rc-pagination__step--current"
                                        value={this.state.currentPage}
                                        onChange={() => this.handleCurrentPageNumChange()} />
                                      <div className="rc-pagination__step rc-pagination__step--of">
                                        <FormattedMessage id="of" /> <span>{this.state.totalPage}</span>
                                      </div>
                                    </div>

                                    <span
                                      className="rc-btn rc-pagination__direction rc-pagination__direction--prev rc-icon rc-right--xs rc-iconography"
                                      onClick={() => this.handlePrevOrNextPage('next')}></span>
                                  </div>
                                </nav>
                              </div>
                            </React.Fragment>
                            : <div className="text-center mt-5">
                              <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                              <FormattedMessage id="order.noDataTip" />
                            </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div >
    )
  }
}