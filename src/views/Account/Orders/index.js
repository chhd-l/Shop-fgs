import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { inject, observer } from 'mobx-react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import TimeCount from '@/components/TimeCount';
import Selection from '@/components/Selection';
import Pagination from '@/components/Pagination';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import {
  formatMoney,
  getDictionary,
  getDeviceType,
  judgeIsIndividual,
  formatDate,
  optimizeImage,
  filterOrderId
} from '@/utils/utils';
import { funcUrl } from '@/lib/url-utils';
import { batchAdd } from '@/api/payment';
import { getOrderList } from '@/api/order';
import orderImg from './img/order.jpg';
import { IMG_DEFAULT } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import base64 from 'base-64';
import { myAccountPushEvent, myAccountActionPushEvent } from '@/utils/GA';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import './index.less';
import { handleOrderItem } from './modules/handleOrderItem';
import { seoHoc } from '@/framework/common';
import Canonical from '@/components/Canonical';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore')
@injectIntl
@seoHoc('Account orders')
@observer
class AccountOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      form: {
        orderNumber: '',
        period: 180,
        orderCategory: '' // 订单类型
      },
      loading: true,
      initLoading: true,
      currentPage: 1,
      totalPage: 1,
      initing: true,
      errMsg: '',
      tabErrMsg: '',
      duringTimeOptions: [],
      defaultLocalDateTime: '',
      everHaveNoOrders: true,
      tabNames: [
        <FormattedMessage id="allOrders" />,
        <FormattedMessage id="single" />,
        <FormattedMessage id="autoship" />
      ],
      activeTabIdx: 0,
      showOneOrderDetail: false,
      curOneOrderDetails: null
    };

    this.pageSize = 6;
    this.deviceType = getDeviceType();
    this.changeTab = this.changeTab.bind(this);
    this.handleClickCardItem = this.handleClickCardItem.bind(this);
    this.handleDownInvoice = this.handleDownInvoice.bind(this);
    this.handleClickPayNow = this.handleClickPayNow.bind(this);
    this.handlePayNowTimeEnd = this.handlePayNowTimeEnd.bind(this);
    this.rePurchase = this.rePurchase.bind(this);
  }
  async componentDidMount() {
    myAccountPushEvent('Orders');

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

    await this.FormatOderTimeFilter();
    this.queryOrderList();
  }
  async FormatOderTimeFilter() {
    const res = await getDictionary({ type: 'orderTimeFilter' });
    this.setState({
      duringTimeOptions: (res || []).map((item) => ({
        value: item.valueEn,
        name: item.name
      }))
    });
  }
  handleDuringTimeChange = (data) => {
    const { form } = this.state;
    form.period = data.value;
    this.setState(
      {
        form: form,
        currentPage: 1
      },
      () => this.queryOrderList()
    );
  };
  handleInputChange(e) {
    const target = e.target;
    const { form } = this.state;
    form[target.name] = target.value;
    this.setState({
      form: form,
      currentPage: 1
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.queryOrderList();
    }, 500);
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
      keywords: form.orderNumber,
      pageNum: currentPage - 1,
      pageSize: this.pageSize,
      period: form.period,
      orderCategory: form.orderCategory
    };
    getOrderList(param)
      .then((res) => {
        let tmpList = Array.from(res.context.content, (ele) => {
          ele.tradeItems.forEach((el) => {
            el.spuName = judgeIsIndividual(el) ? (
              <FormattedMessage
                id="subscription.personalized"
                values={{ val1: el.petsName }}
              />
            ) : (
              el.spuName
            );
          });
          return handleOrderItem(ele, res);
        });
        if (this.state.initing) {
          this.setState({ everHaveNoOrders: !tmpList.length });
        }
        this.setState({
          orderList: tmpList,
          currentPage: res.context.pageable.pageNumber + 1,
          totalPage: res.context.totalPages,
          defaultLocalDateTime: res.defaultLocalDateTime
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
  updateFilterData(form) {
    this.setState(
      {
        form: Object.assign({}, this.state.form, form),
        currentPage: 1
      },
      () => this.queryOrderList()
    );
  }
  handlePayNowTimeEnd(order) {
    const { orderList } = this.state;
    order.canPayNow = false;
    this.setState({ orderList: orderList });
  }
  async handleClickPayNow(order) {
    const { orderList } = this.state;
    order.payNowLoading = true;
    this.setState({ orderList: orderList });
    const tradeItems = order.tradeItems.map((ele) => {
      return {
        goodsInfoImg: ele.pic,
        goodsName: ele.spuName,
        specText: ele.specDetails,
        buyCount: ele.num,
        salePrice: ele.price,
        goodsInfoId: ele.skuId,
        subscriptionPrice: ele.subscriptionPrice,
        subscriptionStatus: ele.subscriptionStatus,
        goodsInfoFlag: ele.goodsInfoFlag
      };
    });
    try {
      this.props.checkoutStore.setLoginCartData(tradeItems);
      sessionItemRoyal.set('rc-tid', order.id);
      sessionItemRoyal.set('rc-rePaySubscribeId', order.subscribeId);
      sessionItemRoyal.set('rc-tidList', JSON.stringify(order.tidList));
      this.props.checkoutStore.setCartPrice({
        totalPrice: order.tradePrice.goodsPrice,
        tradePrice: order.tradePrice.totalPrice,
        discountPrice: order.tradePrice.discountsPrice,
        deliveryPrice: order.tradePrice.deliveryPrice,
        promotionDesc: order.tradePrice.promotionDesc,
        promotionDiscount: order.tradePrice.deliveryPrice,
        subscriptionPrice: order.tradePrice.subscriptionPrice
      });
      this.props.history.push('/checkout');
      order.payNowLoading = false;
    } catch (err) {
      console.log(err);
    } finally {
      order.payNowLoading = true;
      this.setState({ orderList });
    }
  }
  async rePurchase(order) {
    try {
      const { orderList } = this.state;
      order.addToCartLoading = true;
      this.setState({ orderList: orderList });
      const paramList = (order.tradeItems || []).map((item) => {
        return {
          goodsInfoFlag: item.goodsInfoFlag,
          verifyStock: false,
          buyCount: 1,
          goodsInfoId: item.skuId,
          periodTypeId: item.periodTypeId
        };
      });
      await batchAdd({ goodsInfos: paramList });
      await this.props.checkoutStore.updateLoginCart({ intl: this.props.intl });
      this.props.history.push('/cart');
    } catch (err) {
    } finally {
      order.addToCartLoading = false;
    }
  }
  changeTab(i) {
    this.setState(
      {
        activeTabIdx: i,
        form: Object.assign(this.state.form, {
          orderCategory: { 0: '', 1: 'SINGLE', 2: 'FIRST_AUTOSHIP' }[i]
        }),
        currentPage: 1
      },
      () => this.queryOrderList()
    );
  }
  handleClickCardItem(item) {
    console.log(this.deviceType);
    if (this.deviceType === 'PC') return false;
    this.props.history.push(`/account/orders/detail/${item.id}`);
    return false;
  }
  handleClickBackToIndex = () => {
    this.setState({ showOneOrderDetail: false });
  };
  handleDownInvoice(order, e) {
    const ev = e || window.event;
    console.log('ev', ev);
    ev.stopPropagation();
    ev.preventDefault();
    let params = {
      orderNo: order.id
    };
    const token =
      sessionItemRoyal.get('rc-token') || localItemRoyal.get('rc-token');
    let result = JSON.stringify({ ...params, token: 'Bearer ' + token });
    const exportHref = `${
      window.__.env.REACT_APP_BASEURL
    }/account/orderInvoice/exportPDF/${base64.encode(result)}`;
    window.open(exportHref);
    myAccountActionPushEvent('Download Invoice');
  }
  renderOperationBtns = (order) => {
    return (
      <>
        {order.canPayNow ? (
          <>
            <TimeCount
              className="rc-hidden"
              startTime={this.state.defaultLocalDateTime}
              endTime={order.orderTimeOut}
              onTimeEnd={this.handlePayNowTimeEnd.bind(this, order)}
            />
            <br />
            <button
              className={`rc-btn rc-btn--one ord-list-operation-btn ${
                order.payNowLoading ? 'ui-btn-loading' : ''
              }`}
              onClick={this.handleClickPayNow.bind(this, order)}
            >
              <FormattedMessage id="order.payNow" />
            </button>
          </>
        ) : null}
        {/*普通产品评论*/}
        {order.canReview ? (
          <button className="rc-btn rc-btn--sm rc-btn--two ord-list-operation-btn">
            <FormattedMessage id="writeReview">
              {(txt) => (
                <Link
                  className="red-text"
                  to={`/account/productReview/${order.id}`}
                  title={txt}
                  alt={txt}
                >
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </button>
        ) : null}
        {/*服务类产品评论*/}
        {order.canReviewService ? (
          <button className="rc-btn rc-btn--sm rc-btn--one ord-list-operation-btn felin-order">
            <FormattedMessage id="writeReview">
              {(txt) => (
                <Link
                  className="color-fff"
                  to={`/account/productReviewService/${order.id}`}
                  title={txt}
                  alt={txt}
                >
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </button>
        ) : null}
        {order.canRePurchase ? (
          <button
            className={`rc-btn rc-btn--sm rc-btn--two rePurchase-btn ord-list-operation-btn ${
              order.addToCartLoading
                ? 'ui-btn-loading ui-btn-loading-border-red'
                : ''
            }`}
            onClick={this.rePurchase.bind(this, order)}
          >
            <FormattedMessage id="rePurchase" />
          </button>
        ) : null}
        {order.canViewTrackInfo ? (
          <button className="rc-btn rc-btn--sm rc-btn--one ord-list-operation-btn">
            <FormattedMessage id="trackDelivery">
              {(txt) => (
                <>
                  {order.tradeDelivers[0] &&
                  order.tradeDelivers[0].trackingUrl ? (
                    <a
                      className="text-white"
                      href={order.tradeDelivers[0].trackingUrl}
                      target="_blank"
                      rel="nofollow"
                      title={txt}
                      alt={txt}
                    >
                      {txt}
                      {Boolean(
                        window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                      ) && (
                        <span className="warning_blank">
                          <FormattedMessage id="opensANewWindow" />
                        </span>
                      )}
                    </a>
                  ) : (
                    <Link
                      className="text-white"
                      to={`/account/orders/detail/${order.id}`}
                      title={txt}
                      alt={txt}
                    >
                      {txt}
                      {Boolean(
                        window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                      ) && (
                        <span className="warning_blank">
                          <FormattedMessage id="opensANewWindow" />
                        </span>
                      )}
                    </Link>
                  )}
                </>
              )}
            </FormattedMessage>
          </button>
        ) : null}
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
      activeTabIdx,
      orderList,
      tabErrMsg,
      showOneOrderDetail,
      curOneOrderDetails,
      duringTimeOptions
    } = this.state;
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <div className="md:p-8 rc-max-width--xl ord-list">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Orders" customCls="rc-md-up" />
              <div
                className={`my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop px-0 md:px-3 ${
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
                            <FormattedMessage id="account.home" />
                          </span>
                        </Link>
                      </div>

                      <div className="col-12 order-1 md:order-0 col-md-8 rc-fade--x">
                        <ul
                          className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank rc-border-bottom rc-border-colour--interface"
                          role="tablist"
                        >
                          {this.state.tabNames.map((ele, index) => (
                            <li key={index}>
                              <button
                                className="rc-tab rc-btn rounded-0 border-top-0 border-right-0 border-left-0 font-weight-normal"
                                data-toggle={`tab__panel-${index}`}
                                aria-selected={
                                  activeTabIdx === index ? 'true' : 'false'
                                }
                                role="tab"
                                onClick={this.changeTab.bind(this, index)}
                              >
                                {ele}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="col-12 order-0 md:order-1 col-md-4">
                        <div className="rc-select rc-full-width rc-input--full-width rc-select-processed mt-0 mb-2 md:mb-0">
                          <Selection
                            optionList={duringTimeOptions}
                            selectedItemChange={this.handleDuringTimeChange}
                            selectedItemData={{
                              value: this.state.form.period
                            }}
                            key={this.state.form.period}
                            // customStyleType="select-one"
                            customInnerStyle={{
                              paddingTop: '.7em',
                              paddingBottom: '.7em'
                            }}
                          />
                        </div>
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
                              let isGift = order.tradeItems.find(
                                (item) =>
                                  (item.subscriptionPlanId || []).length > 0
                              );
                              return (
                                <div
                                  className="card-container border-b border-d7d7d7"
                                  key={order.id}
                                  onClick={this.handleClickCardItem.bind(
                                    this,
                                    order
                                  )}
                                >
                                  <div className="card rc-margin-y--none ml-0 border-0">
                                    <div className="card-header border-color-d7d7d7 row rc-margin-x--none align-items-center pl-0 pr-0 rc-md-up bg-rc-f6">
                                      <div className="col-12 col-md-2">
                                        <p className="text-nowrap ui-text-overflow-line1">
                                          <FormattedMessage id="order.orderPlacedOn" />
                                          <br className="d-none d-md-block" />
                                          <span className="medium orderHeaderTextColor">
                                            {formatDate({
                                              date: order.tradeState.createTime
                                            })}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="col-12 col-md-2 mb-2 md:mb-0">
                                        <p className="text-nowrap">
                                          <FormattedMessage id="order.orderNumber" />
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
                                        <p className="text-nowrap ui-text-overflow-line1">
                                          <FormattedMessage id="order.orderStatus" />
                                          <br className="d-none d-md-block" />
                                          <span
                                            className="medium orderHeaderTextColor"
                                            title={order.tradeState.orderStatus}
                                          >
                                            {order.tradeState.orderStatus}
                                          </span>
                                        </p>
                                      </div>
                                      <div
                                        className={`col-12 ${
                                          !order.canDownInvoice
                                            ? 'col-md-2'
                                            : 'col-md-1'
                                        }`}
                                      >
                                        <p>
                                          <FormattedMessage id="order.total" />
                                          <br className="d-none d-md-block" />
                                          <span className="medium orderHeaderTextColor">
                                            {/* 存在分期时，总价显示另一个字段 */}
                                            {formatMoney(
                                              order.tradePrice.installmentPrice
                                                ? order.tradePrice
                                                    .totalAddInstallmentPrice
                                                : order.tradePrice.totalPrice
                                            )}
                                          </span>
                                        </p>
                                      </div>
                                      {order.canDownInvoice ? (
                                        <div
                                          onClick={this.handleDownInvoice.bind(
                                            this,
                                            order
                                          )}
                                          className="text-nowrap col-12 col-md-1"
                                        >
                                          <span className="rc-icon rc-pdf--xs rc-iconography" />
                                          <FormattedMessage id="invoice">
                                            {(txt) => (
                                              <span
                                                className="medium pull-right--desktop rc-styled-link text-wrap"
                                                title={txt}
                                              >
                                                {txt}
                                              </span>
                                            )}
                                          </FormattedMessage>
                                        </div>
                                      ) : null}
                                      <div className="col-12 col-md-2">
                                        {order.goodWillFlag === 1 ? (
                                          <div>
                                            <FormattedMessage id="order.goodwillOrder" />
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="col-12 col-md-2 text-nowrap padding0">
                                        <FormattedMessage id="order.orderDetails">
                                          {(txt) => (
                                            <Link
                                              className="d-flex rc-padding-left--none rc-btn rc-btn--icon-label rc-padding-right--none orderDetailBtn text-wrap align-items-center"
                                              to={`/account/orders/detail/${order.id}`}
                                            >
                                              <em className="rc-iconography rc-icon rc-news--xs" />
                                              <span
                                                className="medium pull-right--desktop rc-styled-link text-current"
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
                                    {order.showOrderDeliverTip && (
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
                                    {order.showOrderCompleteTip ? (
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
                                                src={
                                                  optimizeImage({
                                                    originImageUrl: item.pic
                                                  }) || IMG_DEFAULT
                                                }
                                                alt={item.spuName}
                                                title={item.spuName}
                                              />
                                            </LazyLoad>
                                          </div>
                                          <div className="col-8 col-md-6">
                                            <span className="medium color-444 ui-text-overflow-line2">
                                              {item.spuName}
                                            </span>
                                            {judgeIsIndividual(item) ? (
                                              <span>{item.specDetails}</span>
                                            ) : order.appointmentNo ? (
                                              <span>
                                                {order.specialistType} –{' '}
                                                {order.appointmentTime}
                                                <FormattedMessage id="min" /> –
                                                {order.appointmentType}
                                              </span>
                                            ) : (
                                              <FormattedMessage
                                                id="order.quantityText"
                                                values={{
                                                  specText: item.specDetails,
                                                  buyCount: item.num
                                                }}
                                              />
                                            )}
                                          </div>
                                          {item.subscriptionPlanId ? (
                                            <div className="align-items-center d-flex">
                                              <em className="gift-icon" />
                                              <div>
                                                <span className="medium color-444 ui-text-overflow-line2">
                                                  Cadeaux
                                                </span>
                                                <span>
                                                  Abonnement Smart Feeder
                                                </span>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="col-2 col-md-2 rc-md-up">
                                              {formatMoney(item.splitPrice)}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                    {isGift && !(getDeviceType() === 'H5') ? (
                                      order.tradeItems.map((item, idx) => (
                                        <div
                                          className="col-2 col-md-3 text-right md:pl-0"
                                          key={idx}
                                        >
                                          {formatMoney(item.price)}
                                        </div>
                                      ))
                                    ) : (
                                      <div className="col-2 col-md-3 text-center md:pl-0 md:pr-0">
                                        <div className="rc-md-up">
                                          {this.renderOperationBtns(order)}
                                        </div>
                                        <span
                                          className="iconfont iconjiantouyou1 bold rc-md-down"
                                          style={{ fontSize: '20px' }}
                                        />
                                      </div>
                                    )}
                                    <div className="col-12 text-right md:hidden">
                                      {order.canDownInvoice ? (
                                        <span
                                          className="rc-styled-link"
                                          onClick={this.handleDownInvoice.bind(
                                            this,
                                            order
                                          )}
                                        >
                                          <FormattedMessage id="invoice" />
                                        </span>
                                      ) : null}
                                    </div>
                                    {/* {order.subscribeId && !isGift ? (
                                      <div className="col-12 text-right rc-md-up">
                                        <Link
                                          to={`/account/subscription/order/detail/${order.subscribeId}`}
                                        >
                                          <span
                                            className="iconfont font-weight-bold red mr-1"
                                            style={{ fontSize: '.8em' }}
                                          >
                                            &#xe675;
                                          </span>
                                          <span className="rc-styled-link">
                                            <FormattedMessage id="autoShipOrderDetails" />
                                          </span>
                                        </Link>
                                      </div>
                                    ) : null} */}
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
                              src={
                                optimizeImage({ originImageUrl: item.pic }) ||
                                IMG_DEFAULT
                              }
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
                      {curOneOrderDetails.subscribeId ? (
                        <Link
                          to={`/account/subscription/order/detail/${curOneOrderDetails.subscribeId}`}
                        >
                          <span
                            className="iconfont font-weight-bold red mr-1"
                            style={{ fontSize: '.8em' }}
                          >
                            &#xe675;
                          </span>
                          <span className="rc-styled-link">
                            <FormattedMessage id="autoShipOrderDetails" />
                          </span>
                        </Link>
                      ) : null}
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
