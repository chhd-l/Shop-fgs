import React from 'react';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TimeCount from '@/components/TimeCount';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import Modal from '@/components/Modal';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage } from 'react-intl-phraseapp';
import {
  formatMoney,
  getDictionary,
  matchNamefromDict,
  filterOrderId,
  getClubLogo,
  judgeIsIndividual,
  formatDate,
  optimizeImage
} from '@/utils/utils';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import {
  getOrderDetails,
  cancelOrder,
  getPayRecord,
  returnFindByTid,
  queryLogistics
} from '@/api/order';
import { IMG_DEFAULT } from '@/utils/constant';
import './index.less';
import LazyLoad from 'react-lazyload';
import PageBaseInfo from '@/components/PageBaseInfo';
import { injectIntl } from 'react-intl-phraseapp';
import {
  handleOrderStatusMap,
  handleFelinOrderStatusMap
} from './modules/handleOrderStatus';
import OrderAppointmentInfo from '../AppointmentsDetail/modules/AppointmentInfo';
import getCardImg from '@/lib/get-card-img';
import { getWays } from '@/api/payment';
import { handleOrderItem } from '../Orders/modules/handleOrderItem';
import paypalLogo from '@/assets/images/paypal-logo.svg';
import { AddressPreview } from '@/components/Address';

const sessionItemRoyal = window.__.sessionItemRoyal;

function Progress({ progressList, currentProgressIndex }) {
  console.log(progressList);
  return (
    <div className="od-prg-container ml-2 mr-2 md:ml-4 md:mr-4">
      <div className="od-prg d-flex align-items-center px-3">
        {progressList.map((item, i) => (
          <>
            <span
              className={`od-prg-text position-relative ${!i ? 'ml-3' : ''} ${
                i <= currentProgressIndex ? 'compelete red' : ''
              }`}
            >
              {i <= currentProgressIndex ? (
                <svg
                  className="svg-icon align-middle w-6 h-6"
                  aria-hidden="true"
                >
                  <use xlinkHref="#iconwancheng" />
                </svg>
              ) : (
                <span className="od-prg-icon inlineblock text-white">
                  {i + 1}
                </span>
              )}
              <span className="ml-1 rc-md-up">{item.flowStateDesc}</span>
              <span className="od-prg-name position-absolute rc-md-down">
                {item.flowStateDesc}
              </span>
              <span className="od-prg-time position-absolute">
                <span className="rc-md-up">
                  {formatDate({ date: item.time1 })} {item.time2}
                </span>
                <span className="rc-md-down">
                  {formatDate({ date: item.time1 })}
                  <br />
                  {item.time2 || (
                    <span style={{ color: 'transparent' }}>&nbsp;</span>
                  )}
                </span>
              </span>
            </span>
            {i !== progressList.length - 1 ? (
              <span
                className={`od-prg-line position-relative flex-fill ml-2 mr-2 ${
                  i < currentProgressIndex
                    ? 'complete'
                    : i == currentProgressIndex
                    ? 'ing'
                    : ''
                }`}
              />
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
}

function HeadTip(props) {
  return (
    <>
      <div className="row align-items-center text-left ml-1 mr-1 md:ml-0 md:mr-0">
        <div className="col-3 col-md-1">{props.icon}</div>
        <div className={`col-9 ${props.operation ? 'col-md-7' : 'col-md-11'}`}>
          <span
            className={`font-weight-normal color-444 ${props.titleColor || ''}`}
          >
            {props.title}
          </span>
          <br />
          {window.__.env.REACT_APP_COUNTRY !== 'us' ? props.tip : null}
        </div>
        {props.operation ? (
          <div className="col-12 col-md-4 md:text-right text-center">
            <span className="sticky-operation-btn rc-md-down">
              {props.operation}
            </span>
            <span className="rc-md-up">{props.operation}</span>
          </div>
        ) : null}
        {props.moreTip ? <>{props.moreTip}</> : null}
      </div>
    </>
  );
}

function LogisticsProgress(props) {
  const {
    hasMoreLessOperation = false,
    moreLogistics,
    handleToggleMoreLess,
    customDateCls = ''
  } = props;
  return (
    <ul className="text-break">
      {(props.list || []).map(
        (item, i) =>
          item.shown && (
            <li
              className={`logi-item align-items-center ${
                item.active ? 'active' : ''
              } ${
                !hasMoreLessOperation || !i || moreLogistics
                  ? 'd-flex'
                  : 'hidden'
              }`}
              key={i}
            >
              <span className={`logi-time text-right ${customDateCls}`}>
                {formatDate({ date: item.timestamp })}
                <br />
                {formatDate({
                  date: item.timestamp,
                  showYear: false,
                  showMinute: true
                })}
              </span>
              <div className="logi-text pl-4 pr-4 pt-3 pb-3">
                <svg className="svg-icon logi-icon" aria-hidden="true">
                  <use
                    xlinkHref={`#${!i ? 'iconjinhangzhong' : 'iconyiwancheng'}`}
                  />
                </svg>

                <span
                  className={`ml-4 ui-text-overflow-line2 ${!i ? 'red' : ''}`}
                >
                  {item.longDescription}
                </span>
              </div>
              {hasMoreLessOperation && !i ? (
                <span
                  className={`iconfont ui-cursor-pointer ${!i ? 'red' : ''}`}
                  onClick={handleToggleMoreLess}
                >
                  {moreLogistics ? <>&#xe6b1;</> : <>&#xe6b0;</>}
                </span>
              ) : null}
            </li>
          )
      )}
    </ul>
  );
}

@inject('checkoutStore', 'configStore', 'paymentStore')
@injectIntl
@observer
class AccountOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: '',
      subNumber: '',
      orderNumberForOMS: '',
      details: null,
      payRecord: null,
      loading: true,
      cancelOrderLoading: false,
      returnOrExchangeLoading: false,
      errMsg: '',
      cancelOrderModalVisible: false,
      operateSuccessModalVisible: false,
      errModalVisible: false,
      returnOrExchangeModalVisible: false,
      errModalText: '',
      countryList: [],
      normalProgressList: [],
      currentProgressIndex: -1,
      defaultLocalDateTime: '',
      isAuditOpen: false,
      processMore: false,
      confirmTooltipVisible: true,
      auditRejectReason: '',
      moreLogistics: false,
      logisticsList: [],
      activeTabIdx: 0,
      showLogisticsDetail: false,
      curLogisticInfo: null,
      welcomeGiftLists: [], //first-order welcome box gifts
      paymentItem: '' //支付方式 paypal，swish
    };
    this.changeTab = this.changeTab.bind(this);
    this.handleClickLogisticsCard = this.handleClickLogisticsCard.bind(this);
  }
  componentDidMount() {
    const { paymentStore } = this.props;
    this.setState(
      {
        orderNumber: this.props.match.params.orderNumber
      },
      () => {
        this.init();
      }
    );
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
    getWays().then((res) => {
      paymentStore.setSupportPaymentMethods(
        res?.context?.payPspItemVOList[0]?.payPspItemCardTypeVOList || []
      );
    });
  }
  get isShowInstallMent() {
    const { details } = this.state;
    return !!details.tradePrice.installmentPrice;
  }
  // 存在分期时，总价显示另一个字段
  get totalPrice() {
    const { details } = this.state;
    return this.isShowInstallMent
      ? details.tradePrice.totalAddInstallmentPrice
      : details.tradePrice.totalPrice;
  }
  //判断是否是felin 订单
  get isFelinOrder() {
    const { details } = this.state;
    return details?.appointmentNo;
  }
  init() {
    const { orderNumber } = this.state;
    this.setState({ loading: true });
    let normalProgressList = [];
    getOrderDetails(orderNumber)
      .then(async (res) => {
        let resContext = res.context;
        let isIndv = false;
        resContext.tradeItems?.forEach((el) => {
          if (judgeIsIndividual(el)) {
            el.spuName = (
              <FormattedMessage
                id="subscription.personalized"
                values={{ val1: el.petsName }}
              />
            );
            isIndv = true;
          }
        });
        let welcomeGiftLists = (resContext?.subscriptionPlanGiftList || []).map(
          (el) => {
            if (isIndv) {
              el.promotions = 'individual';
            }
            return el;
          }
        );
        let paymentItem = resContext.paymentItem;
        this.setState({
          welcomeGiftLists,
          paymentItem
        });
        const tradeState = resContext.tradeState;
        const orderStatusMap = resContext.orderStatusMap;
        let currentProgressIndex = -1;
        normalProgressList = resContext.appointmentNo
          ? handleFelinOrderStatusMap(orderStatusMap)
          : handleOrderStatusMap(orderStatusMap);
        // 查询支付卡信息
        if (resContext?.totalTid) {
          getPayRecord(resContext.totalTid).then((res) => {
            this.setState({
              payRecord: res.context
            });
          });
        }
        // 发货运输中，查询物流信息
        if (
          tradeState.payState === 'PAID' &&
          (tradeState.auditState === 'CHECKED' ||
            tradeState.auditState === 'INSIDE_CHECKED') &&
          (tradeState.deliverStatus === 'SHIPPED' ||
            tradeState.deliverStatus === 'PART_SHIPPED')
        ) {
          queryLogistics(orderNumber).then((res) => {
            this.setState({
              logisticsList: (res.context && res.context.tradeDelivers) || []
            });
          });
        }
        const tradeEventLogs = res.context.tradeEventLogs || [];
        if (tradeEventLogs.length) {
          currentProgressIndex = findIndex(normalProgressList, (ele) =>
            ele.flowStateIds.includes(tradeState.flowState)
          );
        }
        this.setState({
          details: handleOrderItem(resContext, res.context),
          loading: false,
          currentProgressIndex,
          normalProgressList,
          defaultLocalDateTime: res.defaultLocalDateTime,
          subNumber: resContext?.subscriptionResponseVO?.subscribeId,
          orderNumberForOMS: resContext?.tradeOms?.orderNo
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errMsg: err.message.toString()
        });
      });
  }
  async hanldeItemClick(afterSaleType) {
    // 退单都完成了，才可继续退单
    this.setState({ returnOrExchangeLoading: true });
    let res = await returnFindByTid(this.state.orderNumber);
    let unloadItem = find(
      res.context,
      (ele) =>
        ele.returnFlowState === 'INIT' ||
        ele.returnFlowState === 'AUDIT' ||
        ele.returnFlowState === 'DELIVERED' ||
        ele.returnFlowState === 'RECEIVED'
    );
    if (unloadItem) {
      this.setState({
        returnOrExchangeModalVisible: true,
        returnOrExchangeLoading: false
      });
    } else {
      sessionItemRoyal.set('rc-after-sale-type', afterSaleType);
      this.props.history.push(
        `/account/orders-aftersale/${this.state.orderNumber}`
      );
    }
  }
  handleCancelOrder() {
    this.setState({ cancelOrderLoading: true });
    cancelOrder(this.state.orderNumber)
      .then((res) => {
        this.setState({
          cancelOrderLoading: false,
          cancelOrderModalVisible: false,
          operateSuccessModalVisible: true
        });
        this.init();
      })
      .catch((err) => {
        this.setState({
          cancelOrderLoading: false,
          errModalText: err.message.toString(),
          cancelOrderModalVisible: false,
          errModalVisible: true
        });
      });
  }
  returnOrExchangeBtnJSX() {
    const { details } = this.state;
    let ret = <span />;
    if (details?.canReturnOrExchange) {
      return (
        <>
          <a
            className="color-999 ui-cursor-pointer"
            title="More"
            data-tooltip-placement="bottom"
            data-tooltip="bottom-tooltip"
          >
            •••
          </a>
          <div id="bottom-tooltip" className="rc-tooltip text-left pl-1 pr-1">
            <div
              className={`border-bottom p-1 ui-cursor-pointer ${
                this.props.returnOrExchangeLoading
                  ? 'ui-btn-loading ui-btn-loading-border-red'
                  : ''
              }`}
              onClick={() => this.hanldeItemClick('exchange')}
            >
              <FormattedMessage id="order.return" />
            </div>
            <div
              className={`p-1 ui-cursor-pointer ${
                this.props.returnOrExchangeLoading
                  ? 'ui-btn-loading ui-btn-loading-border-red'
                  : ''
              }`}
              onClick={() => this.hanldeItemClick('return')}
            >
              <FormattedMessage id="order.exchange" />
            </div>
          </div>
        </>
      );
    }
    return ret;
  }
  cancelOrderBtnJSX() {
    const { details } = this.state;
    let ret = <span />;
    if (details?.canCancelOrder) {
      ret = (
        <>
          <a
            className="color-999 ui-cursor-pointer"
            title="More"
            data-tooltip-placement="bottom"
            data-tooltip="bottom-tooltip"
          >
            •••
          </a>
          <div id="bottom-tooltip" className="rc-tooltip text-left px-1">
            <div
              className={`p-1 ui-cursor-pointer ${
                this.props.returnOrExchangeLoading
                  ? 'ui-btn-loading ui-btn-loading-border-red'
                  : ''
              }`}
              onClick={() => {
                this.setState({ cancelOrderModalVisible: true });
              }}
            >
              <FormattedMessage id="order.cancelOrder" />
            </div>
          </div>
        </>
      );
    }
    return ret;
  }
  changeTab(i) {
    this.setState({
      activeTabIdx: i
    });
  }
  handleClickPayNow = async () => {
    const { details: order, details } = this.state;
    this.setState({ details: Object.assign(details, { payNowLoading: true }) });
    const tradeItems = details.tradeItems.map((ele) => {
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
    this.props.checkoutStore.setLoginCartData(tradeItems);
    sessionItemRoyal.set('rc-tid', details.id);
    sessionItemRoyal.set('rc-tidList', JSON.stringify(details.tidList));
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
    this.setState({
      details: Object.assign(details, { payNowLoading: false })
    });
  };
  handlePayNowTimeEnd = () => {
    const { details } = this.state;
    this.setState({ details: Object.assign(details, { canPayNow: false }) });
  };
  handleToggleMoreLess = () => {
    this.setState((currentState) => ({
      moreLogistics: !currentState.moreLogistics
    }));
  };
  handleClickLogisticsCard(item) {
    this.setState({ showLogisticsDetail: true, curLogisticInfo: item });
  }
  handleClickBackToIndex = () => {
    this.setState({ showLogisticsDetail: false });
  };
  renderLogitiscsJSX = () => {
    const { moreLogistics, activeTabIdx } = this.state;
    //没有详细物流信息的package不显示
    const logisticsList = [];
    this.state.logisticsList.forEach((item, index) => {
      if (
        !(
          item.trackingUrl === null && item?.tradeLogisticsDetails?.length === 0
        )
      ) {
        logisticsList.push(item);
      }
    });
    const filteredLogisticsList = logisticsList
      .map((ele) => (ele && ele.tradeLogisticsDetails ? ele : []))
      .filter((ele) => ele);
    return (
      <>
        {logisticsList[0] && logisticsList[0].trackingUrl ? null : (
          <>
            {logisticsList.length > 0 ? (
              <div className="col-12 mt-4 border1 rounded mb-4 pl-0 pr-0 rc-md-up">
                {logisticsList.length > 1 ? (
                  <nav className="rc-bg-colour--brand4 p-3">
                    {logisticsList.map(
                      (item, i) =>
                        item?.tradeLogisticsDetails?.length > 0 && (
                          <span
                            className={`ui-cursor-pointer mr-2 pl-3 pr-3 pb-2 pt-2 rounded ${
                              activeTabIdx === i
                                ? 'active red rc-bg-colour--brand3'
                                : ''
                            }`}
                            onClick={this.changeTab.bind(this, i)}
                            key={i}
                          >
                            <FormattedMessage
                              id="packageX"
                              values={{ val: i + 1 }}
                            />
                          </span>
                        )
                    )}
                  </nav>
                ) : null}

                {logisticsList.map(
                  (item, i) =>
                    item?.tradeLogisticsDetails?.length > 0 && (
                      <div
                        key={i}
                        className={`mx-3 ${i === activeTabIdx ? '' : 'hidden'}`}
                      >
                        <LogisticsProgress
                          list={item.tradeLogisticsDetails.sort((a, b) => {
                            return (
                              new Date(b.timestamp).getTime() -
                              new Date(a.timestamp).getTime()
                            );
                          })}
                          hasMoreLessOperation={true}
                          moreLogistics={moreLogistics}
                          handleToggleMoreLess={this.handleToggleMoreLess}
                          customDateCls="text-nowrap"
                        />
                        <div className="row">
                          {(item.shippingItems || []).map((ele) => (
                            <div className="text-center col-2" key={ele.skuId}>
                              <img
                                className="mx-auto my-0 w-auto"
                                src={ele.pic || IMG_DEFAULT}
                                alt={ele.itemName}
                                title={ele.itemName}
                                style={{ height: '60px' }}
                              />
                              <p className="font-weight-normal ui-text-overflow-line1">
                                {ele.itemName} X {ele.itemNum}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="row border-top m-0 pt-2 pb-2">
                          <div className="col-12 col-md-3">
                            <svg className="svg-icon mr-1" aria-hidden="true">
                              <use xlinkHref="#iconDeliverydate" />
                            </svg>
                            <FormattedMessage id="deliveryDate" />:{' '}
                            <span className="medium">
                              {formatDate({ date: item.deliverTime })}
                            </span>
                          </div>
                          <div className="col-12 col-md-4">
                            <svg className="svg-icon mr-1" aria-hidden="true">
                              <use xlinkHref="#iconLogisticscompany" />
                            </svg>
                            <FormattedMessage id="logisticsCompany" />:{' '}
                            <span className="medium">
                              {item.logistics
                                ? item.logistics.logisticCompanyName
                                : ''}
                            </span>
                          </div>
                          <div className="col-12 col-md-5">
                            <svg className="svg-icon mr-1" aria-hidden="true">
                              <use xlinkHref="#iconLogisticssinglenumber" />
                            </svg>
                            <FormattedMessage id="logisticsSingleNumber" />:{' '}
                            <span className="medium">
                              {item.logistics ? item.logistics.logisticNo : ''}
                            </span>
                            <CopyToClipboard
                              text={
                                item.logistics ? item.logistics.logisticNo : ''
                              }
                            >
                              <span className="iconfont ui-cursor-pointer ml-2">
                                &#xe6c0;
                              </span>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            ) : null}

            <div className="ml-4 mr-4 rc-md-down mt-2 md:mt-0">
              {filteredLogisticsList.map(
                (item, i) =>
                  item?.tradeLogisticsDetails?.length > 0 && (
                    <div
                      className="row rc-bg-colour--brand4 rounded mb-2 pb-2"
                      onClick={this.handleClickLogisticsCard.bind(this, item)}
                      key={i}
                    >
                      <div className="col-10 medium color-444 d-flex align-items-center">
                        <span>
                          {formatDate({
                            date: item.deliverTime,
                            showMinute: true
                          })}
                        </span>
                      </div>
                      <div className="col-2">
                        <span className="icon iconfont">&#xe6f9;</span>
                      </div>
                      <div className="col-12 row mt-2">
                        {item.shippingItems.map((sItem) => (
                          <div
                            className="col-3 flex items-end"
                            key={sItem.skuId}
                          >
                            <LazyLoad>
                              <img
                                className="rc-bg-colour--brand4 w-3/4"
                                src={sItem.pic}
                                alt="shipping Items image"
                              />
                            </LazyLoad>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </>
        )}
      </>
    );
  };
  renderHeadTip = () => {
    const {
      details,
      auditRejectReason,
      orderNumber,
      logisticsList,
      currentProgressIndex,
      normalProgressList
    } = this.state;
    let ret = null;
    switch (currentProgressIndex) {
      case 0:
        // 订单创建
        ret = (
          <>
            <HeadTip
              icon={
                <svg className="svg-icon w-14 h-14" aria-hidden="true">
                  <use xlinkHref="#iconTobepaid" />
                </svg>
              }
              title={normalProgressList[currentProgressIndex]?.flowStateDesc}
              titleColor="text-info"
              tip={
                <FormattedMessage
                  id="orderStatus.INITTip"
                  values={{
                    val: (
                      <>
                        {details.canPayNow ? (
                          <>
                            <span
                              className={`red ui-cursor-pointer ${
                                details.payNowLoading
                                  ? 'ui-btn-loading ui-btn-loading-border-red'
                                  : ''
                              }`}
                              onClick={this.handleClickPayNow}
                            >
                              <span className={`red rc-styled-link mr-2`}>
                                <FormattedMessage id="order.payNow" />
                              </span>
                              &gt;
                            </span>{' '}
                            <TimeCount
                              className="rc-hidden"
                              startTime={this.state.defaultLocalDateTime}
                              endTime={details.orderTimeOut}
                              onTimeEnd={this.handlePayNowTimeEnd}
                            />
                          </>
                        ) : null}
                      </>
                    )
                  }}
                />
              }
            />
            <hr className="my-4" />
          </>
        );
        break;
      case 1:
        // 等待发货
        ret = (
          <>
            <HeadTip
              icon={
                <svg className="svg-icon w-14 h-14" aria-hidden="true">
                  <use xlinkHref="#iconTobedelivered" />
                </svg>
              }
              title={normalProgressList[currentProgressIndex]?.flowStateDesc}
              titleColor="text-warning"
              tip={<FormattedMessage id="order.toBeDeliveredTip" />}
            />
            <hr className="my-4" />
          </>
        );
        break;
      case 2:
        // 发货运输中
        ret = (
          <HeadTip
            icon={
              <svg className="svg-icon w-14 h-14" aria-hidden="true">
                <use xlinkHref="#iconIntransit" />
              </svg>
            }
            title={normalProgressList[currentProgressIndex]?.flowStateDesc}
            titleColor="text-success"
            moreTip={this.renderLogitiscsJSX()}
            tip={
              <FormattedMessage
                id="order.inTranistTip"
                values={{
                  val:
                    logisticsList[0] && logisticsList[0].trackingUrl ? (
                      <span className={`red ui-cursor-pointer`}>
                        <a
                          href={logisticsList[0].trackingUrl}
                          target="_blank"
                          rel="nofollow"
                          className={`red rc-styled-link mr-2`}
                        >
                          <FormattedMessage id="order.viewLogisticDetail" />
                        </a>
                        &gt;
                      </span>
                    ) : null
                }}
              />
            }
          />
        );
        break;
      case 3:
        // 完成订单
        ret = (
          <>
            <HeadTip
              icon={
                <svg className="svg-icon w-14 h-14" aria-hidden="true">
                  <use xlinkHref="#iconCompleted" />
                </svg>
              }
              title={normalProgressList[currentProgressIndex]?.flowStateDesc}
              tip={<FormattedMessage id="order.completeTip" />}
              operation={
                !!+window.__.env.REACT_APP_PDP_RATING_VISIBLE && (
                  <FormattedMessage id="comment">
                    {(txt) => (
                      <Link
                        className="rc-btn rc-btn--sm rc-btn--one"
                        to={`/account/productReview/${orderNumber}`}
                        title={txt}
                        alt={txt}
                      >
                        {txt}
                      </Link>
                    )}
                  </FormattedMessage>
                )
              }
              moreTip={this.renderLogitiscsJSX()}
            />
            <hr className="my-4" />
          </>
        );
        break;
    }
    // if (auditRejectReason) {
    //   // 审核拒绝
    //   ret = (
    //     <>
    //       <HeadTip
    //         icon={
    //           <svg
    //             className="svg-icon"
    //             aria-hidden="true"
    //             style={{ width: '3.5em', height: '3.5em' }}
    //           >
    //             <use xlinkHref="#iconPrescriptionDeclined" />
    //           </svg>
    //         }
    //         title={<FormattedMessage id="prescriptionDeclined" />}
    //         titleColor="red"
    //         tip={auditRejectReason}
    //       />
    //       <hr />
    //     </>
    //   );
    // }
    return ret;
  };
  //特殊处理felin订单HeadTip
  renderFelinHeadTip = () => {
    const { currentProgressIndex, normalProgressList } = this.state;
    let ret = null;
    console.log('currentProgressIndex', currentProgressIndex);
    switch (currentProgressIndex) {
      case 0:
        // Appointment confirmed
        ret = (
          <>
            <HeadTip
              icon={
                <svg className="svg-icon w-14 h-14" aria-hidden="true">
                  <use xlinkHref="#iconTobepaid" />
                </svg>
              }
              title={normalProgressList[currentProgressIndex]?.flowStateDesc}
              titleColor="text-info"
              tip={<FormattedMessage id="orderStatus.INITTip" />}
            />
            <hr className="my-4" />
          </>
        );
        break;
      case 1:
        // Order paid
        ret = (
          <>
            <HeadTip
              icon={
                <i className="iconfont iconfuwudiqiu ml-3 text-rc-detail-red text-5xl" />
              }
              title={<FormattedMessage id="felinOrder.servicePaid" />}
              titleColor="text-warning"
              tip={<FormattedMessage id="felinOrder.servicePaidTip" />}
            />
            <hr className="my-4" />
          </>
        );
        break;
      case 2:
        // Check in
        ret = (
          <>
            <HeadTip
              icon={
                <i className="iconfont iconfuwudiqiu ml-3 text-rc-detail-red text-5xl" />
              }
              title={<FormattedMessage id="appointment.serviceArrived" />}
              titleColor="text-warning"
              tip={<FormattedMessage id="appointment.serviceArrivedTip" />}
            />
            <hr className="my-4" />
          </>
        );
        break;
    }
    return ret;
  };
  //felin订单操作按钮显示
  renderOperationBtns = () => {
    const { orderNumber, details } = this.state;
    return (
      <>
        {/*服务类产品评论*/}
        {details.canReviewService ? (
          <button className="rc-btn rc-btn--sm rc-btn--one ord-list-operation-btn">
            <FormattedMessage id="writeReview">
              {(txt) => (
                <Link
                  className="color-fff"
                  to={`/account/productReviewService/${orderNumber}`}
                  title={txt}
                  alt={txt}
                >
                  {txt}
                </Link>
              )}
            </FormattedMessage>
          </button>
        ) : null}
      </>
    );
  };
  render() {
    const { configStore, paymentStore } = this.props;
    const { customTaxSettingOpenFlag, enterPriceType } = configStore;
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
      details,
      payRecord,
      currentProgressIndex,
      normalProgressList,
      showLogisticsDetail,
      curLogisticInfo,
      welcomeGiftLists,
      paymentItem
    } = this.state;

    let newDeliveryDate = formatDate({
      date: details?.consignee?.deliveryDate,
      formatOption: { weekday: 'long', day: '2-digit', month: 'long' }
    });

    return (
      <div>
        <PageBaseInfo additionalEvents={event} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3 ord-detail">
          <BannerTip />
          <BreadCrumbs />
          <div className="md:p-8 rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Orders" customCls="rc-md-up" />
              <div className="my__account-content rc-column rc-quad-width p-2">
                {showLogisticsDetail ? (
                  <span onClick={this.handleClickBackToIndex}>
                    <span className="red">&lt;</span>
                    <span className="rc-styled-link rc-progress__breadcrumb ml-2 mt-1">
                      <FormattedMessage id="order.orderDetails" />
                    </span>
                  </span>
                ) : (
                  <Link
                    to="/account/orders"
                    className="rc-md-down mt-3 ml-2 inlineblock"
                  >
                    <span className="red">&lt;</span>
                    <span className="rc-styled-link rc-progress__breadcrumb ml-2">
                      <FormattedMessage id="account.ordersTitle" />
                    </span>
                  </Link>
                )}

                <div
                  className={`row m-0 justify-content-center mt-3 md:mt-0 ${
                    showLogisticsDetail ? 'hidden' : ''
                  }`}
                >
                  <div className="order_listing_details col-12 no-padding">
                    <div className="card confirm-details orderDetailsPage ml-0 mr-0 border-0">
                      {this.state.loading ? (
                        <Skeleton
                          color="#f5f5f5"
                          width="100%"
                          height="50%"
                          count={5}
                        />
                      ) : details ? (
                        <div className="card-body p-0">
                          {this.isFelinOrder
                            ? this.renderFelinHeadTip()
                            : this.renderHeadTip()}
                          {currentProgressIndex > -1 ? (
                            <Progress
                              {...this.props}
                              progressList={normalProgressList}
                              currentProgressIndex={currentProgressIndex}
                            />
                          ) : null}

                          <div className="rc-bg-colour--brand4 rc-md-down mt-3 h-3.5" />
                          <div className="row m-0 ml-2 mr-2 md:ml-0 md:mr-0">
                            <div className="col-12 border table-header rounded mt-3 md:mt-0">
                              <div className="row pt-3 pb-2 pl-1 pr-1 md:pl-4 md:pr-4 md:pt-4 md:pb-3">
                                {/* 订单号 */}
                                <div className="col-12 col-md-3 text-left mb-2">
                                  <FormattedMessage id="order.orderNumber" />
                                  <br />
                                  <span className="medium">
                                    {filterOrderId({
                                      orderNo: this.state.orderNumber,
                                      orderNoForOMS:
                                        this.state.orderNumberForOMS
                                    })}
                                  </span>
                                </div>
                                {/* 订单状态 */}
                                <div className="col-12 col-md-3 text-left mb-2">
                                  <FormattedMessage id="order.orderStatus" />
                                  <br />
                                  <span className="medium">
                                    {details.tradeState.orderStatus}
                                  </span>
                                </div>
                                {/* goodwill order flag */}
                                {details.goodWillFlag === 1 && (
                                  <div className="col-12 col-md-3 text-left mb-2">
                                    <FormattedMessage id="order.goodwillOrder" />
                                  </div>
                                )}
                                {/* 订阅订单号 */}
                                {/* {details.subscriptionResponseVO ? (
                                  <div className="col-12 col-md-3 text-left mb-2">
                                    <FormattedMessage id="subscription.numberFirstWordUpperCase" />
                                    <br />
                                    <Link
                                      to={`/account/subscription/order/detail/${this.state.subNumber}`}
                                      className="rc-styled-link medium mb-0"
                                    >
                                      {filterOrderId({
                                        orderNo: this.state.subNumber,
                                        orderNoForOMS: this.state
                                          .orderNumberForOMS
                                      })}
                                    </Link>
                                  </div>
                                ) : null} */}

                                {/* clinic信息 */}
                                {window.__.env
                                  .REACT_APP_CHECKOUT_WITH_CLINIC ===
                                  'true' && (
                                  <div className="col-12 col-md-3 text-left mb-2">
                                    <FormattedMessage id="payment.clinicTitle3" />
                                    <br />
                                    <span
                                      className="medium ui-text-overflow-line2"
                                      title={details.clinicsName}
                                    >
                                      {details.clinicsName}
                                    </span>
                                  </div>
                                )}
                                {/* {this.returnOrExchangeBtnJSX()} */}
                                {/* {this.cancelOrderBtnJSX()} */}
                                {this.isFelinOrder ? (
                                  <div className="col-12 col-md-0 text-left mb-2 rc-md-down">
                                    {this.renderOperationBtns()}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-12 table-body rounded md:mt-3 mb-2 pl-0 pr-0">
                              <div className="order__listing text-left">
                                <div className="order-list-container">
                                  {details.tradeItems
                                    .concat(details.gifts)
                                    .map((item, i) => (
                                      <div
                                        className="border-bottom pl-2 pr-2 pt-3 pb-3"
                                        key={i}
                                      >
                                        <div
                                          className={`row align-items-center pl-2 pr-2 md:pl-0 md:pr-0`}
                                        >
                                          <div className="col-4 col-md-2 d-flex justify-content-center align-items-center">
                                            <LazyLoad className="w-full">
                                              <img
                                                className="order-details-img-fluid w-100"
                                                src={
                                                  optimizeImage(item.pic) ||
                                                  IMG_DEFAULT
                                                }
                                                alt={item.spuName}
                                                title={item.spuName}
                                              />
                                            </LazyLoad>
                                          </div>
                                          <div className="col-8 col-md-3">
                                            <span className="">
                                              <span
                                                className="medium ui-text-overflow-line2 text-break color-444"
                                                title={item.spuName}
                                              >
                                                {judgeIsIndividual(item) ? (
                                                  <FormattedMessage
                                                    id="subscription.personalized"
                                                    values={{
                                                      val1: item.petsName
                                                    }}
                                                  />
                                                ) : (
                                                  item.spuName
                                                )}
                                              </span>
                                              <span className="ui-text-overflow-line2">
                                                {this.isFelinOrder ? (
                                                  <span className="rc-md-up">
                                                    {details.specialistType} –{' '}
                                                    {details.appointmentTime}
                                                    <FormattedMessage id="min" />{' '}
                                                    –{details.appointmentType}
                                                  </span>
                                                ) : (
                                                  <span className="rc-md-up">
                                                    {item.specDetails}
                                                  </span>
                                                )}

                                                <span className="rc-md-down">
                                                  {judgeIsIndividual(item) ? (
                                                    <span>
                                                      {item.specDetails} x1
                                                    </span>
                                                  ) : this.isFelinOrder ? (
                                                    <span className="rc-md-down">
                                                      {details.specialistType} –{' '}
                                                      {details.appointmentTime}
                                                      <FormattedMessage id="min" />{' '}
                                                      –{details.appointmentType}
                                                    </span>
                                                  ) : (
                                                    <FormattedMessage
                                                      id="quantityText"
                                                      values={{
                                                        specText:
                                                          item.specDetails ||
                                                          '',
                                                        buyCount: item.num
                                                      }}
                                                    />
                                                  )}
                                                </span>
                                              </span>
                                              {item.subscriptionSourceList
                                                ?.length ? (
                                                <span>
                                                  <span className="iconfont mr-2 text-rc-red">
                                                    &#xe675;
                                                  </span>
                                                  <FormattedMessage id="subscription.numberFirstWordUpperCase" />
                                                  {item.subscriptionSourceList.map(
                                                    (el) => (
                                                      <p className="ui-text-overflow-line1">
                                                        <Link
                                                          to={`/account/subscription/order/detail/${el.subscribeId}`}
                                                          className="rc-styled-link medium mb-0"
                                                        >
                                                          {filterOrderId({
                                                            orderNo:
                                                              el.subscribeId,
                                                            orderNoForOMS:
                                                              this.state
                                                                .orderNumberForOMS
                                                          })}
                                                        </Link>
                                                      </p>
                                                    )
                                                  )}
                                                </span>
                                              ) : null}
                                              <span className="rc-md-down">
                                                {details.subscriptionResponseVO &&
                                                item.subscriptionStatus ? (
                                                  judgeIsIndividual(item) ? (
                                                    ''
                                                  ) : (
                                                    <>
                                                      <span className="red font-weight-normal">
                                                        {formatMoney(
                                                          item.subscriptionPrice
                                                        )}
                                                      </span>

                                                      <span className="text-line-through ml-2">
                                                        {formatMoney(
                                                          item.originalPrice
                                                        )}
                                                      </span>
                                                    </>
                                                  )
                                                ) : (
                                                  formatMoney(
                                                    item.originalPrice
                                                  )
                                                )}
                                              </span>
                                              {/* {details.subscriptionResponseVO &&
                                              item.subscriptionStatus && (
                                                <>
                                                  <br />
                                                  <span
                                                    className="iconfont font-weight-bold red mr-1"
                                                    style={{ fontSize: '.8em' }}
                                                  >
                                                    &#xe675;
                                                  </span>
                                                  <FormattedMessage id="details.Subscription" />
                                                </>
                                              )} */}
                                            </span>
                                          </div>
                                          <div className="col-6 col-md-2 text-right md:text-left rc-md-up">
                                            {!this.isFelinOrder ? (
                                              <FormattedMessage
                                                id="xProduct"
                                                values={{
                                                  val: judgeIsIndividual(item)
                                                    ? 1
                                                    : item.num
                                                }}
                                              />
                                            ) : null}
                                          </div>
                                          <div
                                            className={`col-6 ${
                                              this.isFelinOrder
                                                ? 'col-md-2'
                                                : 'col-md-3'
                                            } text-right md:text-left rc-md-up`}
                                          >
                                            {details.subscriptionResponseVO &&
                                            item.subscriptionStatus ? (
                                              judgeIsIndividual(item) ? (
                                                ''
                                              ) : (
                                                <>
                                                  <span className="red font-weight-normal">
                                                    {formatMoney(
                                                      item.subscriptionPrice
                                                    )}
                                                  </span>

                                                  <span className="text-line-through ml-2">
                                                    {formatMoney(
                                                      item.originalPrice
                                                    )}
                                                  </span>
                                                </>
                                              )
                                            ) : (
                                              formatMoney(item.originalPrice)
                                            )}
                                          </div>
                                          <div
                                            className={`col-12 ${
                                              this.isFelinOrder
                                                ? 'col-md-3'
                                                : 'col-md-2'
                                            } text-right md:text-left text-nowrap rc-md-up font-weight-normal d-flex justify-content-center flex-column`}
                                          >
                                            {details.subscriptionResponseVO &&
                                            item.subscriptionStatus
                                              ? formatMoney(
                                                  judgeIsIndividual(item)
                                                    ? details.tradePrice
                                                        .goodsPrice
                                                    : item.subscriptionPrice *
                                                        item.num
                                                )
                                              : this.isFelinOrder
                                              ? this.renderOperationBtns()
                                              : formatMoney(
                                                  item.originalPrice * item.num
                                                )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  {/*welcome box gifts*/}
                                  {welcomeGiftLists.map((item, i) => (
                                    <div
                                      className="border-bottom pl-2 pr-2 pt-3 pb-3"
                                      key={i}
                                    >
                                      <div
                                        className={`row align-items-center pl-2 pr-2 md:pl-0 md:pr-0`}
                                      >
                                        <div className="col-4 col-md-2 d-flex justify-content-center align-items-center">
                                          <LazyLoad className="w-full">
                                            <img
                                              className="order-details-img-fluid w-100"
                                              src={
                                                optimizeImage(
                                                  item.goodsInfoImg || item.pic
                                                ) ||
                                                getClubLogo({
                                                  goodsInfoFlag:
                                                    item.goodsInfoFlag
                                                })
                                              }
                                              alt=""
                                              title=""
                                            />
                                          </LazyLoad>
                                        </div>
                                        <div className="col-8 col-md-3">
                                          <span
                                            className="medium ui-text-overflow-line2 text-break color-444"
                                            title={item.goodsInfoName}
                                          >
                                            {item.goodsInfoName}
                                          </span>
                                          <span className="ui-text-overflow-line2">
                                            <span className="rc-md-down">
                                              <FormattedMessage
                                                id="quantityText"
                                                values={{
                                                  specText: '',
                                                  buyCount: item.quantity
                                                }}
                                              />
                                            </span>
                                          </span>
                                          <span className="rc-md-down 1111">
                                            {judgeIsIndividual(item)
                                              ? ''
                                              : formatMoney(item.marketPrice)}
                                          </span>
                                        </div>
                                        <div className="col-6 col-md-2 text-right md:text-left rc-md-up">
                                          <FormattedMessage
                                            id="xProduct"
                                            values={{
                                              val: judgeIsIndividual(item)
                                                ? 1
                                                : item.quantity
                                            }}
                                          />
                                        </div>
                                        <div className="col-6 col-md-3 text-right md:text-left rc-md-up">
                                          {judgeIsIndividual(item)
                                            ? ''
                                            : formatMoney(item.marketPrice)}
                                        </div>
                                        <div className="col-12 col-md-2 text-right md:text-left text-nowrap rc-md-up font-weight-normal 222">
                                          {formatMoney(item.marketPrice)}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="pt-2 pb-2 md:pl-4 md:pr-4">
                                <div className="row mt-2 text-left">
                                  <div className="col-2 col-md-7 mb-2 rc-md-up">
                                    &nbsp;
                                  </div>
                                  <div className="col-6 col-md-2 mb-2">
                                    <FormattedMessage id="total" />
                                  </div>
                                  <div className="col-6 col-md-3 text-right text-nowrap">
                                    {formatMoney(details.tradePrice.goodsPrice)}
                                  </div>

                                  {details.tradePrice
                                    .subscriptionDiscountPrice ? (
                                    <>
                                      <div className="col-2 col-md-7 mb-2 rc-md-up">
                                        &nbsp;
                                      </div>
                                      <div className="col-6 col-md-2 mb-2 green">
                                        <FormattedMessage id="promotion" />
                                      </div>
                                      <div className="col-6 col-md-3 text-right green text-nowrap">
                                        -
                                        {formatMoney(
                                          details.tradePrice
                                            .subscriptionDiscountPrice
                                        )}
                                      </div>
                                    </>
                                  ) : null}

                                  {details.tradePrice.promotionVOList?.map(
                                    (el) => (
                                      <>
                                        <div className="col-2 col-md-7 mb-2 rc-md-up">
                                          &nbsp;
                                        </div>
                                        <div className="col-6 col-md-2 mb-2 green">
                                          {el.marketingName}
                                        </div>
                                        <div className="col-6 col-md-3 text-right green text-nowrap">
                                          -{formatMoney(el.discountPrice)}
                                        </div>
                                      </>
                                    )
                                  )}

                                  <div className="col-2 col-md-7 mb-2 rc-md-up">
                                    &nbsp;
                                  </div>
                                  <div className="col-6 col-md-2 mb-2">
                                    <FormattedMessage id="order.shipping" />
                                  </div>
                                  <div className="col-6 col-md-3 text-right text-nowrap">
                                    {formatMoney(
                                      details.tradePrice.deliveryPrice
                                    )}
                                  </div>

                                  {details.tradePrice.freeShippingFlag ? (
                                    <>
                                      <div className="col-2 col-md-7 mb-2 rc-md-up">
                                        &nbsp;
                                      </div>
                                      <div className="col-6 col-md-2 mb-2 green">
                                        <FormattedMessage id="payment.shippingDiscount" />
                                      </div>
                                      <div className="col-6 col-md-3 text-right green text-nowrap">
                                        {details.tradePrice
                                          .freeShippingDiscountPrice > 0 && '-'}
                                        {formatMoney(
                                          details.tradePrice
                                            .freeShippingDiscountPrice
                                        )}
                                      </div>
                                    </>
                                  ) : null}

                                  {customTaxSettingOpenFlag &&
                                  enterPriceType === 'NO_TAX' ? (
                                    <>
                                      <div className="col-2 col-md-7 mb-2 rc-md-up">
                                        &nbsp;
                                      </div>
                                      <div className="col-6 col-md-2 mb-2">
                                        <FormattedMessage id="estimatedTax" />
                                      </div>
                                      <div className="col-6 col-md-3 text-right text-nowrap">
                                        {formatMoney(
                                          details.tradePrice.taxFeePrice
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {/* 分期手续费 */}
                                  {this.isShowInstallMent ? (
                                    <>
                                      <div className="col-2 col-md-7 mb-2 rc-md-up">
                                        &nbsp;
                                      </div>
                                      <div className="col-6 col-md-2 mb-2 red">
                                        <FormattedMessage id="installMent.additionalFee" />
                                      </div>
                                      <div className="col-6 col-md-3 text-right red text-nowrap">
                                        {formatMoney(
                                          details.tradePrice.installmentPrice
                                            .additionalFee
                                        )}
                                      </div>
                                    </>
                                  ) : null}

                                  <div className="col-2 col-md-7 mb-2 rc-md-up">
                                    &nbsp;
                                  </div>
                                  <div
                                    className={`col-6 col-md-2 mb-2 ${
                                      window.__.env.REACT_APP_COUNTRY === 'tr'
                                        ? 'tr-total-iVAIncluido'
                                        : ''
                                    }`}
                                  >
                                    <span className="medium color-444">
                                      <FormattedMessage id="order.total" />
                                    </span>
                                    <span>&nbsp;</span>
                                    <span style={{ fontSize: '.8em' }}>
                                      <FormattedMessage
                                        id="order.iVAIncluido"
                                        defaultMessage=" "
                                      />
                                    </span>{' '}
                                  </div>
                                  <div className="col-6 col-md-3 text-right medium text-nowrap color-444">
                                    {formatMoney(this.totalPrice)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/*felin订单? appointmentInfo :地址/支付信息   !this.isFelinOrder(不是felin订单) */}
                          {details.consignee ? (
                            <div className="ml-2 mr-2 md:mr-0 md:ml-0">
                              <p className="mt-4 mb-3 red text-left">
                                <FormattedMessage id="transactionInfomation" />
                              </p>
                              <div className="row text-left text-break">
                                <div className="col-12 col-md-4 mb-3">
                                  <div className="border rounded h-100">
                                    <div className="d-flex p-3 h-100">
                                      <svg
                                        className="svg-icon align-middle mr-3 ml-1 w-8 h-8"
                                        aria-hidden="true"
                                      >
                                        <use xlinkHref="#iconaddresses" />
                                      </svg>
                                      <div>
                                        <p className="medium mb-3">
                                          <FormattedMessage id="delivery2" />
                                        </p>
                                        <AddressPreview
                                          nameCls="medium mb-2"
                                          data={{
                                            name: details.consignee.name,
                                            phone: details.consignee.phone,
                                            countryName: matchNamefromDict(
                                              this.state.countryList,
                                              details.consignee.countryId
                                            ),
                                            address1:
                                              details.consignee.detailAddress1,
                                            address2:
                                              details.consignee.detailAddress2,
                                            city: details.consignee.city,
                                            area: details.consignee.area,
                                            province:
                                              details.consignee.province,
                                            county: details.consignee.county,
                                            postCode:
                                              details.consignee.postCode,
                                            rfc: details.consignee.rfc,
                                            buyerRemark: details.buyerRemark
                                          }}
                                        />

                                        {/* 运费折扣 */}
                                        {!details.consignee.timeSlot &&
                                        details?.maxDeliveryTime != null &&
                                        details?.minDeliveryTime != null ? (
                                          <p className="mb-0 od_mb_yf">
                                            {details.minDeliveryTime ===
                                            details.maxDeliveryTime ? (
                                              <FormattedMessage
                                                id="payment.deliveryDate2"
                                                values={{
                                                  val: details.minDeliveryTime
                                                }}
                                              />
                                            ) : (
                                              <FormattedMessage
                                                id="payment.deliveryDate"
                                                values={{
                                                  min: details.minDeliveryTime,
                                                  max: details.maxDeliveryTime
                                                }}
                                              />
                                            )}
                                          </p>
                                        ) : null}

                                        {/* delivery date */}
                                        {newDeliveryDate && (
                                          <p className="mb-0 od_mb_deliveryDate">
                                            {newDeliveryDate}
                                          </p>
                                        )}

                                        {/* time slot */}
                                        {details.consignee.timeSlot && (
                                          <p className="mb-0 od_mb_timeSlot">
                                            {details.consignee.timeSlot}
                                          </p>
                                        )}

                                        {/* workTime */}
                                        {details.consignee.workTime && (
                                          <p className="mb-0 od_mb_workTime">
                                            {details.consignee.workTime}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {!Boolean(
                                  +window.__.env
                                    .REACT_APP_HIDE_CHECKOUT_BILLING_ADDR
                                ) ? (
                                  <div className="col-12 col-md-4 mb-3">
                                    <div className="border rounded p-3 h-100">
                                      <div className="d-flex">
                                        <svg
                                          className="svg-icon align-middle mr-3 ml-1 w-8 h-8"
                                          aria-hidden="true"
                                        >
                                          <use xlinkHref="#iconBillingAddress1" />
                                        </svg>
                                        <div>
                                          <p className="medium mb-3">
                                            <FormattedMessage id="billing2" />
                                          </p>
                                          <AddressPreview
                                            nameCls="medium mb-2"
                                            data={{
                                              name: details.invoice.contacts,
                                              phone: details.invoice.phone,
                                              countryName: matchNamefromDict(
                                                this.state.countryList,
                                                details.invoice.countryId
                                              ),
                                              address1:
                                                details.invoice.address1,
                                              address2:
                                                details.invoice.address2,
                                              city: details.invoice.city,
                                              area: details.invoice.area,
                                              province:
                                                details.invoice.province,
                                              county: details.invoice.county,
                                              postCode:
                                                details.invoice.postCode,
                                              rfc: details.invoice.rfc
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                                {payRecord && payRecord.lastFourDigits ? (
                                  <div className="col-12 col-md-4 mb-2">
                                    <div className="border rounded p-3 h-100">
                                      <div className="d-flex">
                                        <svg
                                          className="svg-icon align-middle mr-3 ml-1 w-8 h-8"
                                          aria-hidden="true"
                                        >
                                          <use xlinkHref="#iconpayments" />
                                        </svg>
                                        <div>
                                          <p className="medium mb-3">
                                            <FormattedMessage id="payment.payment" />
                                          </p>
                                          <div className="medium mb-2">
                                            <LazyLoad className="inline">
                                              <img
                                                alt="card background"
                                                className="d-inline-block mr-1 w-1/5"
                                                src={getCardImg({
                                                  supportPaymentMethods:
                                                    paymentStore.supportPaymentMethods,
                                                  currentVendor:
                                                    payRecord.paymentVendor
                                                })}
                                              />
                                            </LazyLoad>
                                            {payRecord.lastFourDigits ? (
                                              <span className="medium">
                                                ********
                                                {payRecord.lastFourDigits}
                                              </span>
                                            ) : null}
                                          </div>

                                          {payRecord.holderName ? (
                                            <p className="mb-0">
                                              {payRecord.holderName}
                                            </p>
                                          ) : null}

                                          {/* 分期费用明细 */}
                                          {0 &&
                                          details.tradePrice
                                            .installmentPrice ? (
                                            <p>
                                              {formatMoney(
                                                details.tradePrice.totalPrice
                                              )}{' '}
                                              (
                                              {
                                                details.tradePrice
                                                  .installmentPrice
                                                  .installmentNumber
                                              }{' '}
                                              *{' '}
                                              {formatMoney(
                                                details.tradePrice
                                                  .installmentPrice
                                                  .installmentPrice
                                              )}
                                              )
                                            </p>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                                {paymentItem == 'adyen_paypal' ? (
                                  <div className="col-12 col-md-4 mb-2">
                                    <div className="border rounded p-3 h-100">
                                      <div className="d-flex">
                                        <svg
                                          className="svg-icon align-middle mr-3 ml-1 w-8 h-8"
                                          aria-hidden="true"
                                        >
                                          <use xlinkHref="#iconpayments" />
                                        </svg>
                                        <div>
                                          <p className="medium mb-3">
                                            <FormattedMessage id="payment.payment" />
                                          </p>
                                          <div className="medium mb-2">
                                            <LazyLoad className="inline-block">
                                              <img
                                                alt="paypal"
                                                className="w-20 h-10"
                                                src={paypalLogo}
                                              />
                                            </LazyLoad>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            <OrderAppointmentInfo
                              details={{
                                expertType: details.specialistType,
                                appointmentType: details.appointmentType,
                                apptTime: details.appointmentDate
                              }}
                            />
                          )}
                        </div>
                      ) : this.state.errMsg ? (
                        <div className="text-center mt-5">
                          <span className="rc-icon rc-incompatible--xs rc-iconography" />
                          {this.state.errMsg}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* one order details for mobile */}
                {showLogisticsDetail ? (
                  <div className="row">
                    <LogisticsProgress
                      list={
                        curLogisticInfo.tradeLogisticsDetails.sort((a, b) => {
                          return (
                            new Date(b.timestamp).getTime() -
                            new Date(a.timestamp).getTime()
                          );
                        }) || []
                      }
                    />
                    <div className="col-12 rc-bg-colour--brand4 rc-md-down mb-3 h-3.5" />
                    {(curLogisticInfo.shippingItems || []).map((ele) => (
                      <div className="row col-12" key={ele.skuId}>
                        <div className="col-6">
                          <LazyLoad>
                            <img
                              src={ele.pic || IMG_DEFAULT}
                              alt={ele.itemName}
                              title={ele.itemName}
                              style={{ width: '70%' }}
                            />
                          </LazyLoad>
                        </div>

                        <div className="col-6 d-flex align-items-center">
                          <div>
                            <div className="font-weight-normal ui-text-overflow-line2">
                              {ele.itemName}
                            </div>
                            {judgeIsIndividual(ele) ? (
                              <div>{ele.specDetails} x 1</div>
                            ) : (
                              <FormattedMessage
                                id="quantityText"
                                values={{
                                  specText: ele.specDetails || '',
                                  buyCount: ele.itemNum
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="col-12 rc-bg-colour--brand4 rc-md-down mb-3 h-3.5" />
                    <div className="row m-0 pt-2 pb-2">
                      <div className="col-12 col-md-3 d-flex">
                        <svg className="svg-icon mr-1" aria-hidden="true">
                          <use xlinkHref="#iconDeliverydate" />
                        </svg>
                        <p>
                          <FormattedMessage id="deliveryDate" />
                          <br />
                          <span className="medium color-444">
                            {item.deliverTime(curLogisticInfo.deliverTime)}
                          </span>
                        </p>
                      </div>
                      <div className="col-12 col-md-3 d-flex">
                        <svg className="svg-icon mr-1" aria-hidden="true">
                          <use xlinkHref="#iconLogisticscompany" />
                        </svg>
                        <p>
                          <FormattedMessage id="logisticsCompany" />
                          <br />
                          <span className="medium color-444">
                            {curLogisticInfo.logistics
                              ? curLogisticInfo.logistics.logisticCompanyName
                              : ''}
                          </span>
                        </p>
                      </div>
                      <div className="col-12 col-md-6 d-flex">
                        <svg className="svg-icon mr-1" aria-hidden="true">
                          <use xlinkHref="#iconLogisticssinglenumber" />
                        </svg>
                        <p>
                          <FormattedMessage id="logisticsSingleNumber" />
                          <br />
                          <span className="medium color-444">
                            {curLogisticInfo.logistics
                              ? curLogisticInfo.logistics.logisticNo
                              : ''}
                          </span>
                          <CopyToClipboard
                            text={
                              curLogisticInfo.logistics
                                ? curLogisticInfo.logistics.logisticNo
                                : ''
                            }
                          >
                            <span className="iconfont ui-cursor-pointer ml-2">
                              &#xe6c0;
                            </span>
                          </CopyToClipboard>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Modal
            key="1"
            visible={this.state.cancelOrderModalVisible}
            confirmLoading={this.state.cancelOrderLoading}
            modalText={<FormattedMessage id="order.confirmCancelOrderInfo" />}
            close={() => {
              this.setState({ cancelOrderModalVisible: false });
            }}
            hanldeClickConfirm={() => this.handleCancelOrder()}
          />
          <Modal
            key="2"
            visible={this.state.operateSuccessModalVisible}
            modalText={<FormattedMessage id="operateSuccessfully" />}
            close={() => {
              this.setState({ operateSuccessModalVisible: false });
            }}
            hanldeClickConfirm={() => {
              this.props.history.push('/account/orders');
            }}
          />
          <Modal
            key="3"
            visible={this.state.errModalVisible}
            modalText={this.state.errModalText}
            close={() => {
              this.setState({ errModalVisible: false });
            }}
            hanldeClickConfirm={() => {
              this.setState({ errModalVisible: false });
            }}
          />
          <Modal
            key="4"
            visible={this.state.returnOrExchangeModalVisible}
            modalText={<FormattedMessage id="order.refundErrorInfo" />}
            close={() => {
              this.setState({ returnOrExchangeModalVisible: false });
            }}
            hanldeClickConfirm={() => {
              this.setState({ returnOrExchangeModalVisible: false });
            }}
          />
          <Footer />
        </main>
      </div>
    );
  }
}

export default AccountOrders;
