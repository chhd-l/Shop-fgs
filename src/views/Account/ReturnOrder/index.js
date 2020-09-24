import React from 'react';
import Skeleton from 'react-skeleton-loader';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import Pagination from '@/components/Pagination';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { formatMoney } from '@/utils/utils';
import { getReturnList } from '@/api/order';
import { IMG_DEFAULT } from '@/utils/constant';

const localItemRoyal = window.__.localItemRoyal;

export default class ReturnOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      form: {
        duringTime: '7d',
        returnNumber: '',
        dateRangeKey: 'inWeek'
      },
      loading: false,
      currentPage: 1,
      totalPage: 1,
      initing: true,
      errMsg: ''
    };
    this.pageSize = 6;
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }

    this.queryReturnList();
  }
  hanldePageNumChange(params) {
    this.setState(
      {
        currentPage: params.currentPage
      },
      () => this.queryReturnList()
    );
  }
  handleDuringTimeChange(e) {
    const { form } = this.state;
    form.duringTime = e.target.value;
    this.setState(
      {
        form: form,
        currentPage: 1
      },
      () => this.queryReturnList()
    );
  }
  handleInputChange(e) {
    const target = e.target;
    const { form } = this.state;
    form[target.name] = target.value;
    this.setState({ form: form });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.queryReturnList();
    }, 500);
  }
  queryReturnList() {
    const { form, initing, currentPage } = this.state;

    if (!initing) {
      const widget = document.querySelector('#J_order_list');
      if (widget) {
        setTimeout(() => {
          window.scrollTo({
            top: widget.offsetTop,
            behavior: 'smooth'
          });
        }, 0);
      }
    }
    this.setState({ loading: true });
    let param = {
      // beginTime: createdFrom,
      // endTime: now,
      // dateRangeKey: form.dateRangeKey,
      tradeOrSkuName: form.returnNumber,
      pageNum: currentPage - 1,
      pageSize: this.pageSize
    };
    getReturnList(param)
      .then((res) => {
        this.setState({
          orderList: res.context.content,
          currentPage: res.context.number + 1,
          totalPage: res.context.totalPages,
          loading: false,
          initing: false
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errMsg: err.message.toString()
        });
      });
  }
  render() {
    const event = {
      page: {
        type: 'Account',
        theme: ''
      }
    };
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
              <SideMenu type="ReturnOrder" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 className="rc-delta rc-margin--none pb-2">
                    <FormattedMessage id="order.historyOfOrders" />
                  </h4>
                </div>
                <div className="row justify-content-around">
                  <div className="col-12 col-md-5 row align-items-center mt-2 mt-md-0">
                    <div className="col-md-5">
                      <FormattedMessage id="order.returnNumber" />
                    </div>
                    <div className="col-md-7">
                      <span className="rc-input rc-input--inline rc-full-width">
                        <input
                          className="rc-input__control"
                          id="id-text8"
                          type="text"
                          name="returnNumber"
                          maxLength="20"
                          value={this.state.form.returnNumber}
                          onChange={(e) => this.handleInputChange(e)}
                        />
                        <label className="rc-input__label" htmlFor="id-text8">
                          <span className="rc-input__label-text">
                            <FormattedMessage id="order.inputReturnNumberTip" />
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
                          onChange={(e) => this.handleDuringTimeChange(e)}
                        >
                          <FormattedMessage
                            id="order.lastXDays"
                            values={{ val: 7 }}
                          >
                            {(txt) => <option value="7d">{txt}</option>}
                          </FormattedMessage>
                          <FormattedMessage
                            id="order.lastXDays"
                            values={{ val: 30 }}
                          >
                            {(txt) => <option value="30d">{txt}</option>}
                          </FormattedMessage>
                          <FormattedMessage
                            id="order.lastXMonths"
                            values={{ val: 3 }}
                          >
                            {(txt) => <option value="3m">{txt}</option>}
                          </FormattedMessage>
                          <FormattedMessage
                            id="order.lastXMonths"
                            values={{ val: 6 }}
                          >
                            {(txt) => <option value="6m">{txt}</option>}
                          </FormattedMessage>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order__listing">
                  <div className="order-list-container">
                    {this.state.loading ? (
                      <Skeleton
                        color="#f5f5f5"
                        width="100%"
                        height="50%"
                        count={2}
                      />
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
                                    <FormattedMessage id="order.returnDate" />:{' '}
                                    <br className="d-none d-md-block" />{' '}
                                    <span className="medium orderHeaderTextColor">
                                      {order.createTime.substr(0, 10)}
                                    </span>
                                  </p>
                                </div>
                                <div className="col-12 col-md-4">
                                  <p>
                                    <FormattedMessage id="order.returnNumber" />
                                    : <br className="d-none d-md-block" />{' '}
                                    <span className="medium orderHeaderTextColor">
                                      {order.id}
                                    </span>
                                  </p>
                                </div>
                                <div className="col-12 col-md-2">
                                  <p>
                                    <FormattedMessage id="order.returnStatus" />
                                  </p>
                                </div>
                                <div className="col-12 col-md-3 d-flex justify-content-end flex-column flex-md-row rc-padding-left--none--mobile">
                                  <Link
                                    className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn"
                                    to={`/account/return-order-detail/${order.id}`}
                                  >
                                    <span className="medium pull-right--desktop rc-styled-link rc-padding-top--xs">
                                      <FormattedMessage id="order.returnDetails" />
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div
                              className="row rc-margin-x--none row align-items-center"
                              style={{ padding: '1rem 0' }}
                            >
                              <div className="col-12 col-md-6 d-flex flex-wrap">
                                {order.returnItems.map((item) => (
                                  <img
                                    className="img-fluid"
                                    key={item.oid}
                                    src={item.pic || IMG_DEFAULT}
                                    alt={item.spuName}
                                    title={item.spuName}
                                  />
                                ))}
                              </div>
                              <div className="col-12 col-md-2">
                                {order.returnFlowState}
                              </div>
                              <div className="col-12 col-md-2 text-right">
                                {formatMoney(order.returnPrice.totalPrice)}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="grid-footer rc-full-width">
                          <Pagination
                            loading={this.state.loading}
                            totalPage={this.state.totalPage}
                            onPageNumChange={(params) =>
                              this.hanldePageNumChange(params)
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-center mt-5">
                        <span className="rc-icon rc-incompatible--xs rc-iconography"></span>
                        <FormattedMessage id="order.noDataTip" />
                      </div>
                    )}
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
