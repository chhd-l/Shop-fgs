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
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import {
  formatMoney,
  getDictionary,
  getDeviceType,
  setSeoConfig
} from '@/utils/utils';
import { batchAdd } from '@/api/payment';
import { getOrderList, getOrderDetails, exportInvoicePDF } from '@/api/order';
import orderImg from './img/order.jpg';
import { IMG_DEFAULT } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import base64 from 'base-64';

import './index.less';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

@inject('checkoutStore')
@injectIntl
@observer
class AccountOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      form: {
        orderNumber: '',
        period: 7,
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
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  componentDidMount() {
    setSeoConfig({
      pageName: 'Account orders'
    });
    this.FormateOderTimeFilter();
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    this.queryOrderList();
  }
  async FormateOderTimeFilter() {
    let res = await getDictionary({ type: 'orderTimeFilter' });
    let duringTimeOptions =
      res &&
      res.map((item) => {
        let value, values;
        if (Number(item.valueEn) === 7) {
          value = item.valueEn;
          values = 7;
          return {
            value,
            name: (
              <FormattedMessage id="order.lastXDays" values={{ val: values }} />
            )
          };
        } else if (Number(item.valueEn) === 30) {
          value = item.valueEn;
          values = 30;
          return {
            value,
            name: (
              <FormattedMessage id="order.lastXDays" values={{ val: values }} />
            )
          };
        } else {
          value = item.valueEn;
          values = item.valueEn / 30;
          return {
            value,
            name: (
              <FormattedMessage
                id="order.lastXMonths"
                values={{ val: values }}
              />
            )
          };
        }
      });
    this.setState({
      duringTimeOptions
    });
  }
  handleDuringTimeChange = (data) => {
    // console.log("获取当前选择的天气",data,this.state.form.period)
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
          const tradeState = ele.tradeState;
          return Object.assign(ele, {
            canPayNow:
              ((!ele.isAuditOpen && tradeState.flowState === 'AUDIT') ||
                (ele.isAuditOpen &&
                  tradeState.flowState === 'INIT' &&
                  tradeState.auditState === 'NON_CHECKED')) &&
              tradeState.deliverStatus === 'NOT_YET_SHIPPED' &&
              tradeState.payState === 'NOT_PAID' &&
              new Date(ele.orderTimeOut).getTime() >
                new Date(res.defaultLocalDateTime).getTime() &&
              (!ele.payWay || ele.payWay.toUpperCase() !== 'OXXO'),
            showOXXOExpireTime:
              tradeState.flowState === 'AUDIT' &&
              tradeState.deliverStatus === 'NOT_YET_SHIPPED' &&
              tradeState.payState === 'NOT_PAID' &&
              new Date(ele.orderTimeOut).getTime() >
                new Date(res.defaultLocalDateTime).getTime() &&
              ele.payWay &&
              ele.payWay.toUpperCase() === 'OXXO',
            payNowLoading: false,
            canRePurchase:
              tradeState.flowState === 'COMPLETED' ||
              tradeState.flowState === 'VOID',
            canReview:
              tradeState.flowState === 'COMPLETED' && !ele.storeEvaluateVO,
            canViewTrackInfo:
              tradeState.payState === 'PAID' &&
              tradeState.auditState === 'CHECKED' &&
              tradeState.deliverStatus === 'SHIPPED' &&
              tradeState.flowState === 'DELIVERED' &&
              ele.tradeDelivers &&
              ele.tradeDelivers.length
          });
        });
        if (this.state.initing) {
          this.setState({ everHaveNoOrders: !tmpList.length });
        }
        this.setState({
          orderList: tmpList,
          currentPage: res.context.pageable.pageNumber + 1,
          totalPage: res.context.totalPages,
          defaultLocalDateTime: res.defaultLocalDateTime,
          loading: false,
          initing: false,
          initLoading: false
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errMsg: err.message.toString(),
          tabErrMsg: err.message.toString(),
          initing: false,
          initLoading: false
        });
      });
  }
  hanldePageNumChange = (params) => {
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
        subscriptionStatus: ele.subscriptionStatus
      };
    });
    try {
      const detailRes = await getOrderDetails(order.id);
      const detailResCt = detailRes.context;
      const tmpDeliveryAddress = {
        firstName: detailResCt.consignee.firstName,
        lastName: detailResCt.consignee.lastName,
        address1: detailResCt.consignee.detailAddress1,
        address2: detailResCt.consignee.detailAddress2,
        rfc: detailResCt.consignee.rfc,
        country: detailResCt.consignee.countryId
          ? detailResCt.consignee.countryId.toString()
          : '',
        city: detailResCt.consignee.cityId
          ? detailResCt.consignee.cityId.toString()
          : '',
        postCode: detailResCt.consignee.postCode,
        phoneNumber: detailResCt.consignee.phone,
        addressId: detailResCt.consignee.id
      };
      const tmpBillingAddress = {
        firstName: detailResCt.invoice.firstName,
        lastName: detailResCt.invoice.lastName,
        address1: detailResCt.invoice.address1,
        address2: detailResCt.invoice.address2,
        rfc: detailResCt.invoice.rfc,
        country: detailResCt.invoice.countryId
          ? detailResCt.invoice.countryId.toString()
          : '',
        city: detailResCt.invoice.cityId
          ? detailResCt.invoice.cityId.toString()
          : '',
        postCode: detailResCt.invoice.postCode,
        phoneNumber: detailResCt.invoice.phone,
        addressId: detailResCt.invoice.addressId
      };
      localItemRoyal.set('loginDeliveryInfo', {
        deliveryAddress: tmpDeliveryAddress,
        billingAddress: tmpBillingAddress,
        commentOnDelivery: detailResCt.buyerRemark
      });
      this.props.checkoutStore.setLoginCartData(tradeItems);
      sessionItemRoyal.set('rc-tid', order.id);
      sessionItemRoyal.set('rc-rePaySubscribeId', order.subscribeId);
      sessionItemRoyal.set('rc-tidList', JSON.stringify(order.tidList));
      this.props.checkoutStore.setCartPrice({
        totalPrice: order.tradePrice.totalPrice,
        tradePrice: order.tradePrice.originPrice,
        discountPrice: order.tradePrice.discountsPrice,
        deliveryPrice: order.tradePrice.deliveryPrice,
        promotionDesc: order.tradePrice.promotionDesc,
        promotionDiscount: order.tradePrice.deliveryPrice,
        subscriptionPrice: order.tradePrice.subscriptionPrice
      });

      this.props.history.push('/checkout');
    } catch (err) {
      console.log(err);
    } finally {
      order.payNowLoading = true;
      this.setState({ orderList: orderList });
    }
  }
  rePurchase(order) {
    this.hanldeLoginAddToCart(order);
  }
  async hanldeLoginAddToCart(order) {
    const cartProduct = this.props.checkoutStore.loginCartData;
    const productList = order.tradeItems ? order.tradeItems : [];
    const tradeItems = productList.map((ele) => {
      return {
        goodsInfoImg: ele.pic,
        goodsName: ele.spuName,
        specText: ele.specDetails,
        buyCount: 1, //ele.num
        salePrice: ele.price,
        goodsInfoId: ele.skuId
      };
    });
    const list = [...tradeItems, ...cartProduct];
    const paramList = [];
    productList.forEach((item) => {
      let obj = {
        verifyStock: false,
        buyCount: 1,
        goodsInfoId: item.skuId
      };
      paramList.push(obj);
    });
    await batchAdd({ goodsInfos: paramList });
    await this.props.checkoutStore.updateLoginCart();
    this.props.history.push('/cart');
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
    if (this.deviceType === 'PC') return false;
    this.setState({ curOneOrderDetails: item });
    setTimeout(() => {
      this.setState({ showOneOrderDetail: true });
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  handleClickBackToIndex = () => {
    this.setState({ showOneOrderDetail: false });
  };
  handleDownInvoice(order) {
    let orderInvoiceIds = [];
    orderInvoiceIds.push(order.id);
    let params = {
      orderInvoiceIds
    };
    const token =
      sessionItemRoyal.get('rc-token') || localItemRoyal.get('rc-token');
    let result = JSON.stringify({ ...params, token: 'Bearer ' + token });
    const exportHref = `${
      process.env.REACT_APP_BASEURL
    }/account/orderInvoice/exportPDF/${base64.encode(result)}`;

    window.open(exportHref);
  }
  renderOperationBtns = (order) => {
    return (
      <>
        {order.canPayNow ? (
          <>
            <TimeCount
              startTime={this.state.defaultLocalDateTime}
              endTime={order.orderTimeOut}
              onTimeEnd={() => this.handlePayNowTimeEnd(order)}
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
        {order.canRePurchase ? (
          <button
            className="rc-btn rc-btn--sm rc-btn--two rePurchase-btn ord-list-operation-btn"
            onClick={() => this.rePurchase(order)}
          >
            <FormattedMessage id="rePurchase" />
          </button>
        ) : null}
        {order.canViewTrackInfo ? (
          <button className="rc-btn rc-btn--sm rc-btn--one ord-list-operation-btn">
            {order.tradeDelivers[0] &&
            order.tradeDelivers[0].trackingUrl ? null : (
              <FormattedMessage id="trackDelivery">
                {(txt) => (
                  <>
                    {order.tradeDelivers[0] &&
                    order.tradeDelivers[0].trackingUrl ? (
                      <a
                        href={order.tradeDelivers[0].trackingUrl}
                        target="_blank"
                        rel="nofollow"
                        title={txt}
                        alt={txt}
                      >
                        {txt}
                      </a>
                    ) : (
                      <Link
                        className="text-white"
                        to={`/account/orders/detail/${order.id}`}
                        title={txt}
                        alt={txt}
                      >
                        {txt}
                      </Link>
                    )}
                  </>
                )}
              </FormattedMessage>
            )}
          </button>
        ) : null}
      </>
    );
  };
  render() {
    const event = {
      page: {
        type: 'Account',
        theme: ''
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
        <GoogleTagManager additionalEvents={event} />
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
          <div className="p-md-2rem rc-max-width--xl ord-list">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Orders" customCls="rc-md-up" />
              <div
                className={`my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop pl-0 pr-0 pr-md-3 pl-md-3 ${
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
                            <img src={orderImg} className="w-100" alt="" />
                          </LazyLoad>
                        </div>
                        <div className="rc-column d-flex align-items-center justify-content-center">
                          <div>
                            <p>
                              <FormattedMessage id="account.orders.tips" />
                            </p>
                            <Link className="rc-btn rc-btn--one" to="/home">
                              <FormattedMessage id="account.orders.btns" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="row mb-3 ml-2 m-md-0">
                      <div className="col-12 rc-md-down">
                        <Link to="/account">
                          <span className="red">&lt;</span>
                          <span className="rc-styled-link rc-progress__breadcrumb ml-2 mt-1">
                            <FormattedMessage id="home" />
                          </span>
                        </Link>
                      </div>
                      <div className="col-12 order-1 order-md-0 col-md-8 rc-fade--x">
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
                      <div className="col-10 order-0 order-md-1 col-md-4">
                        <div className="rc-select rc-full-width rc-input--full-width rc-select-processed mt-0 mb-2 mb-md-0">
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
                            {orderList.map((order) => (
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
                                    <div className="col-12 col-md-3">
                                      <p>
                                        <FormattedMessage id="order.orderPlacedOn" />
                                        <br className="d-none d-md-block" />
                                        <span className="medium orderHeaderTextColor">
                                          {order.tradeState.createTime.substr(
                                            0,
                                            10
                                          )}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="col-12 col-md-3 mb-2 mb-md-0">
                                      <p className="text-nowrap">
                                        <FormattedMessage id="order.orderNumber" />
                                        <br className="d-none d-md-block" />
                                        <span className="medium orderHeaderTextColor">
                                          {order.id}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="col-12 col-md-2">
                                      <p>
                                        <FormattedMessage id="total" />
                                        <br className="d-none d-md-block" />
                                        <span className="medium orderHeaderTextColor">
                                          {formatMoney(
                                            order.tradePrice.totalPrice
                                          )}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="col-12 col-md-2">
                                      {order.tradeState.flowState ===
                                        'COMPLETED' && (
                                        <div
                                          onClick={this.handleDownInvoice.bind(
                                            this,
                                            order
                                          )}
                                        >
                                          <span className="rc-icon rc-pdf--xs rc-iconography" />
                                          <span
                                            className="medium pull-right--desktop rc-styled-link text-nowrap"
                                            style={{
                                              textOverflow: 'ellipsis',
                                              overflow: 'hidden',
                                              maxWidth: '82%'
                                            }}
                                          >
                                            <FormattedMessage id="invoice" />
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="col-12 col-md-2 d-flex justify-content-end flex-column flex-md-row rc-padding-left--none--mobile">
                                      <Link
                                        className="rc-btn rc-btn--icon-label rc-icon rc-news--xs rc-iconography rc-padding-right--none orderDetailBtn btn--inverse rc-btn--inverse"
                                        to={`/account/orders/detail/${order.id}`}
                                      >
                                        <span
                                          className="medium pull-right--desktop rc-styled-link text-nowrap"
                                          style={{
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            maxWidth: '99%'
                                          }}
                                        >
                                          <FormattedMessage id="order.orderDetails" />
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mb-3 mt-3 align-items-center m-0">
                                  {/* 订单完成tip */}
                                  {order.tradeState.flowState === 'COMPLETED' &&
                                  !order.storeEvaluateVO &&
                                  order.tradeEventLogs[0].eventType ===
                                    'COMPLETED' ? (
                                    <div className="col-12 mt-1 mt-md-0 mb-md-1 order-1 order-md-0">
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
                                        <div className="col-8 col-md-4">
                                          <span className="medium color-444 ui-text-overflow-line2">
                                            {item.spuName}
                                          </span>
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
                                        </div>
                                        <div className="col-2 col-md-2 rc-md-up">
                                          {formatMoney(item.price)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="col-2 col-md-3 text-center pl-md-0 pr-md-0">
                                    <div className="rc-md-up">
                                      {this.renderOperationBtns(order)}
                                    </div>
                                    <span className="rc-icon rc-right rc-iconography rc-md-down ord-list-operation-btn" />
                                  </div>
                                  {order.subscribeId ? (
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
                                  ) : null}
                                </div>
                              </div>
                            ))}
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
                          <div className="grid-footer rc-full-width mt-4 mt-md-2">
                            <Pagination
                              loading={this.state.loading}
                              totalPage={this.state.totalPage}
                              defaultCurrentPage={this.state.currentPage}
                              key={this.state.currentPage}
                              onPageNumChange={this.hanldePageNumChange}
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
        </main>
        <Footer />
      </div>
    );
  }
}
export default AccountOrders;
