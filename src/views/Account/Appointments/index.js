import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import Pagination from '@/components/Pagination';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { formatMoney, getDeviceType, setSeoConfig } from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import { getOrderList, cancelAppointByNo } from '@/api/order';
import orderImg from './img/order.jpg';
import { IMG_DEFAULT } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import { myAccountPushEvent } from '@/utils/GA';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { filterOrderId } from '@/utils/utils';
import './index.less';
import moment from 'moment';
import { getAppointList } from '@/api/appointment';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href;

@inject('checkoutStore')
@injectIntl
@observer
class AccountOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      loading: true,
      initLoading: true,
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      currentPage: 1,
      totalPage: 1,
      initing: true,
      errMsg: '',
      tabErrMsg: '',
      everHaveNoOrders: true,
      showOneOrderDetail: false,
      curOneOrderDetails: null
    };

    this.pageSize = 30;
    this.deviceType = getDeviceType();
    this.handleClickCardItem = this.handleClickCardItem.bind(this);
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    myAccountPushEvent('Appointments');
    setSeoConfig({
      pageName: 'Account orders'
    }).then((res) => {
      this.setState({ seoConfig: res });
    });

    const orderId = funcUrl({ name: 'orderId' });
    if (orderId) {
      let res = await getOrderList({ id: orderId });
      let hasDetails = res.context?.content?.length;
      if (hasDetails) {
        let url = `/account/orders/detail/${orderId}`;
        this.props.history.push(url);
        return;
      }
    }

    this.queryOrderList();
  }
  queryOrderList() {
    const { form, initing, currentPage } = this.state;
    if (!initing) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 0);
    }
    this.setState({ loading: true });
    let param = {
      pageNum: currentPage - 1,
      pageSize: this.pageSize
    };
    getOrderList(param)
      .then((res) => {
        let tmpList = Array.from(res.context.content, (ele) => {
          const tradeState = ele.tradeState;
          return Object.assign(ele, {
            canChangeAppoint:
              ele.orderType === 'FELINE_ORDER' &&
              tradeState.flowState !== 'COMPLETED' &&
              tradeState.flowState !== 'VOID' &&
              tradeState.payState === 'PAID',
            canCancelAppoint:
              ele.orderType === 'FELINE_ORDER' &&
              tradeState.flowState !== 'COMPLETED' &&
              tradeState.flowState !== 'VOID' &&
              tradeState.payState === 'PAID',
            cancelAppointLoading: false
          });
        });
        tmpList = tmpList.filter((item) => item.orderType === 'FELINE_ORDER');
        if (this.state.initing) {
          this.setState({ everHaveNoOrders: !tmpList.length });
        }
        this.setState({
          orderList: tmpList,
          currentPage: res.context.pageable.pageNumber + 1,
          totalPage: res.context.totalPages
        });
      })
      .catch((err) => {
        this.setState({
          errMsg: err.message.toString(),
          tabErrMsg: err.message.toString()
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
          initing: false,
          initLoading: false
        });
      });
  }
  handlePageNumChange = (params) => {
    this.setState(
      {
        currentPage: params.currentPage
      },
      () => this.queryOrderList()
    );
  };
  async cancelAppoint(order) {
    try {
      const { orderList } = this.state;
      order.cancelAppointLoading = true;
      this.setState({ orderList: orderList });
      await cancelAppointByNo({ apptNo: order.appointmentNo });
      this.queryOrderList();
    } catch (err) {
    } finally {
      order.cancelAppointLoading = false;
    }
  }
  handleClickCardItem(item) {
    if (this.deviceType === 'PC') {
      return false;
    }
    this.props.history.push(`/account/appointments/detail/${item.id}`);
    return false;
  }
  handleClickBackToIndex = () => {
    this.setState({ showOneOrderDetail: false });
  };
  renderOperationBtns = (order) => {
    return (
      <>
        {/*felin订单change appoint*/}
        {order.canChangeAppoint ? (
          <span className="inline-flex items-center">
            <span className="iconfont iconedit-data text-green mr-2" />
            <FormattedMessage id="appointment.reSchedule">
              {(txt) => (
                <Link
                  to={`/felin?id=${order.appointmentNo}`}
                  title={txt}
                  alt={txt}
                >
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </span>
        ) : null}
        {/*felin订单cancel appoint*/}
        {/*{order.canCancelAppoint ? (*/}
        {/*  <button*/}
        {/*    className={`rc-btn rc-btn--sm rc-btn--one ord-list-operation-btn felin-order ml-0`}*/}
        {/*    onClick={this.cancelAppoint.bind(this, order)}*/}
        {/*  >*/}
        {/*    <FormattedMessage id="Cancel Appointment" />*/}
        {/*  </button>*/}
        {/*) : null}*/}
      </>
    );
  };
  render() {
    const event = {
      page: {
        type: 'Account',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    const {
      errMsg,
      everHaveNoOrders,
      orderList,
      tabErrMsg,
      showOneOrderDetail,
      curOneOrderDetails
    } = this.state;
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <div className="md:p-8 rc-max-width--xl ord-list">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Appointments" customCls="rc-md-up" />
              <div
                className={`my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop pl-0 pr-0 md:pr-3 md:pl-3 ${
                  showOneOrderDetail ? 'hidden' : ''
                }`}
              >
                {this.state.initLoading ? (
                  <div className="mt-4">
                    <Skeleton
                      color="#f5f5f5"
                      width="100%"
                      height="50%"
                      count={4}
                    />
                  </div>
                ) : errMsg ? (
                  <div className="text-center mt-5">
                    <span className="rc-icon rc-incompatible--xs rc-iconography" />
                    {errMsg}
                  </div>
                ) : everHaveNoOrders ? (
                  <>
                    {/* 无任何订单 */}
                    <div className={`content-asset`}>
                      <div className="rc-layout-container rc-two-column">
                        <div className="rc-column">
                          <LazyLoad>
                            <img
                              src={orderImg}
                              className="w-100"
                              alt="order image"
                            />
                          </LazyLoad>
                        </div>
                        <div className="rc-column d-flex align-items-center justify-content-center">
                          <div>
                            <p>
                              <FormattedMessage id="account.orders.tips" />
                            </p>
                            <DistributeHubLinkOrATag
                              href=""
                              to="/home"
                              className="rc-btn rc-btn--one"
                            >
                              <FormattedMessage id="account.orders.btns" />
                            </DistributeHubLinkOrATag>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row m-0 mb-3 md:m-0">
                      <div className="col-12 rc-md-down">
                        <Link to="/account">
                          <span className="red">&lt;</span>
                          <span className="rc-styled-link rc-progress__breadcrumb ml-2 mt-1">
                            <FormattedMessage id="home" />
                          </span>
                        </Link>
                      </div>
                    </div>

                    <div className="order__listing">
                      <div className="order-list-container">
                        {this.state.loading ? (
                          <div className="mt-4">
                            <Skeleton
                              color="#f5f5f5"
                              width="100%"
                              height="50%"
                              count={4}
                            />
                          </div>
                        ) : this.state.tabErrMsg ? (
                          <div className="text-center mt-5">
                            <span className="rc-icon rc-incompatible--xs rc-iconography" />
                            {this.state.tabErrMsg}
                          </div>
                        ) : orderList.length ? (
                          <>
                            {orderList.map((order) => {
                              return (
                                <div
                                  className="card-container"
                                  key={order.id}
                                  onClick={this.handleClickCardItem.bind(
                                    this,
                                    order
                                  )}
                                >
                                  <div className="card rc-margin-y--none ml-0">
                                    <div className="card-header border-color-d7d7d7 row rc-margin-x--none align-items-center pl-0 pr-0 rc-md-up">
                                      <div className="col-12 col-md-2">
                                        <p>
                                          <FormattedMessage id="appointment.appointmentPlacedOn" />
                                          <br className="d-none d-md-block" />
                                          <span className="medium orderHeaderTextColor">
                                            {moment(
                                              order.tradeState.createTime
                                            ).format('YYYY-MM-DD')}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p>
                                          <FormattedMessage id="appointment.appointmentNumber" />
                                          <br className="d-none d-md-block" />
                                          <span className="medium orderHeaderTextColor">
                                            {filterOrderId({
                                              orderNo: order.id,
                                              orderNoForOMS:
                                                order.tradeOms?.orderNo
                                            })}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="col-12 col-md-2">
                                        <p>
                                          <FormattedMessage id="appointment.appointmentStatus" />
                                          <br className="d-none d-md-block" />
                                          <span
                                            className="medium orderHeaderTextColor"
                                            title={order.tradeState.orderStatus}
                                          >
                                            {order.tradeState.orderStatus}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="col-12 col-md-4" />
                                      <div className="col-12 col-md-2 text-nowrap padding0">
                                        <FormattedMessage id="appointment.appointmentDetails">
                                          {(txt) => (
                                            <Link
                                              className="d-flex rc-padding-left--none rc-btn rc-btn--icon-label rc-padding-right--none orderDetailBtn btn--inverse text-wrap align-items-center"
                                              to={`/account/appointments/detail/${order.id}`}
                                            >
                                              <em className="rc-iconography rc-icon rc-news--xs" />
                                              <span
                                                className="medium pull-right--desktop rc-styled-link"
                                                title={txt}
                                              >
                                                {txt}
                                              </span>
                                            </Link>
                                          )}
                                        </FormattedMessage>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mb-3 mt-3 align-items-center m-0 relative">
                                    {/* 订单发货tip */}
                                    {((order.tradeState.payState === 'PAID' &&
                                      order.tradeState.auditState ===
                                        'CHECKED' &&
                                      order.tradeState.deliverStatus ===
                                        'SHIPPED' &&
                                      order.tradeState.flowState ===
                                        'DELIVERED') ||
                                      (order.tradeState.deliverStatus ===
                                        'PART_SHIPPED' &&
                                        order.tradeState.flowState ===
                                          'DELIVERED_PART')) && (
                                      <div className="col-12 mt-1 md:mt-0 md:mb-1 order-1 md:order-0">
                                        <p className="medium mb-0 color-444">
                                          <FormattedMessage id="deliveredTip" />
                                        </p>
                                        <p className="green">
                                          <FormattedMessage id="inTransit" />
                                        </p>
                                      </div>
                                    )}
                                    {/* 订单完成tip */}
                                    {order.tradeState.flowState ===
                                      'COMPLETED' &&
                                    !order.storeEvaluateVO &&
                                    order.tradeEventLogs[0] &&
                                    order.tradeEventLogs[0].eventType ===
                                      'COMPLETED' ? (
                                      <div className="col-12 mt-1 md:mt-0 md:mb-1 order-1 md:order-0">
                                        <p className="medium mb-0 color-444">
                                          <FormattedMessage id="orderStatus.COMPLETED" />
                                          :{' '}
                                          {order.tradeEventLogs[0].eventTime.substr(
                                            0,
                                            10
                                          )}
                                        </p>
                                        <p>
                                          <FormattedMessage id="order.completeTip" />
                                        </p>
                                      </div>
                                    ) : null}
                                    <div className="col-10 col-md-9">
                                      {order.tradeItems.map((item, idx) => (
                                        <div
                                          className={`row rc-margin-x--none align-items-center ${
                                            idx ? 'mt-2' : ''
                                          }`}
                                          key={item.oid}
                                        >
                                          <div className="col-4 col-md-2 d-flex justify-content-md-center">
                                            <LazyLoad>
                                              <img
                                                className="ord-list-img-fluid"
                                                src={item.pic || IMG_DEFAULT}
                                                alt={item.spuName}
                                                title={item.spuName}
                                              />
                                            </LazyLoad>
                                          </div>
                                          <div className="col-8 col-md-6">
                                            <span className="medium color-444 ui-text-overflow-line2">
                                              {item.spuName}
                                            </span>
                                            <span>
                                              {order.specialistType} –{' '}
                                              {order.appointmentTime}
                                              <FormattedMessage id="min" /> –
                                              {order.appointmentType}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="col-2 col-md-3 text-center md:pl-0 md:pr-0">
                                      <div className="rc-md-up">
                                        {this.renderOperationBtns(order)}
                                      </div>
                                      <span
                                        className="iconfont iconjiantouyou1 bold rc-md-down"
                                        style={{ fontSize: '20px' }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <div
                            style={{
                              margin: '50px auto'
                            }}
                            className="text-center"
                          >
                            <FormattedMessage id="order.noDataTip" />
                          </div>
                        )}
                        {tabErrMsg || !orderList.length ? null : (
                          <div className="grid-footer rc-full-width mt-4 md:mt-2">
                            <Pagination
                              loading={this.state.loading}
                              totalPage={this.state.totalPage}
                              defaultCurrentPage={this.state.currentPage}
                              key={this.state.currentPage}
                              onPageNumChange={this.handlePageNumChange}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* one order details for mobile */}
              {showOneOrderDetail && (
                <div className={`pl-4 pr-4 rc-md-down`}>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <span onClick={this.handleClickBackToIndex}>
                        <span className="red">&lt;</span>
                        <span className="rc-styled-link rc-progress__breadcrumb ml-2 mt-1">
                          <FormattedMessage id="order" />
                        </span>
                      </span>
                    </div>
                    {curOneOrderDetails.tradeItems.map((item, idx) => (
                      <div className="row col-12 mb-2" key={idx}>
                        <div className="col-6 d-flex">
                          <LazyLoad>
                            <img
                              className="ord-list-img-fluid"
                              src={item.pic || IMG_DEFAULT}
                              alt={item.spuName}
                              title={item.spuName}
                            />
                          </LazyLoad>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                          <div>
                            <span className="medium color-444 ui-text-overflow-line2">
                              {item.spuName}
                            </span>
                            <span>
                              {[
                                item.specDetails,
                                this.props.intl.formatMessage(
                                  { id: 'xProduct' },
                                  {
                                    val: item.num
                                  }
                                )
                              ]
                                .filter((e) => e)
                                .join(' - ')}
                            </span>
                            <br />
                            <span style={{ fontSize: '1.1em' }}>
                              {formatMoney(item.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="col-12 d-flex justify-content-center flex-column align-items-center mt-4 mb-4 ord-operation-btns">
                      {this.renderOperationBtns(curOneOrderDetails)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}
export default AccountOrders;
