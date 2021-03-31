import React from 'react';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import GoogleTagManager from '@/components/GoogleTagManager';
import TimeCount from '@/components/TimeCount';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import Modal from '@/components/Modal';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  formatMoney,
  getDictionary,
  setSeoConfig,
  getFormatDate,
  matchNamefromDict
} from '@/utils/utils';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import { queryCityNameById } from '@/api';
import {
  getOrderDetails,
  cancelOrder,
  getPayRecord,
  returnFindByTid,
  queryLogistics
} from '@/api/order';
import { IMG_DEFAULT, CREDIT_CARD_IMG_ENUM } from '@/utils/constant';
import './index.less';
import LazyLoad from 'react-lazyload';
import { Helmet } from 'react-helmet';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

const pageLink = window.location.href;

const storeInfo = JSON.parse(sessionItemRoyal.get('storeContentInfo'));
// 税额开关 0: on, 1: off
const customTaxSettingOpenFlag = storeInfo?.customTaxSettingOpenFlag;
// 买入价格开关 0：Inclusive of tax，1：Exclusive of tax
const enterPriceType =
  storeInfo?.systemTaxSetting?.configVOList &&
  storeInfo?.systemTaxSetting?.configVOList[1]?.context;

function Progress({ progressList, currentProgerssIndex }) {
  return (
    <div className="od-prg-container ml-2 mr-2 ml-md-4 mr-md-4">
      <div className="od-prg d-flex align-items-center">
        {progressList.map((item, i) => (
          <>
            <span
              className={`od-prg-text position-relative ${!i ? 'ml-3' : ''} ${
                i <= currentProgerssIndex ? 'compelete red' : ''
              }`}
            >
              {i <= currentProgerssIndex ? (
                <svg
                  className="svg-icon align-middle"
                  aria-hidden="true"
                  style={{
                    width: '1.5em',
                    height: '1.5em'
                  }}
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
                  {item.time1 ? getFormatDate(item.time1) : null} {item.time2}
                </span>
                <span className="rc-md-down">
                  {item.time1 ? getFormatDate(item.time1) : null}
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
                  i < currentProgerssIndex
                    ? 'complete'
                    : i == currentProgerssIndex
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
      <div className="row align-items-center text-left ml-1 mr-1 ml-md-0 mr-md-0">
        <div className="col-3 col-md-1">{props.icon}</div>
        <div className={`col-9 ${props.operation ? 'col-md-7' : 'col-md-11'}`}>
          <span
            className={`font-weight-normal color-444 ${props.titleColor || ''}`}
          >
            {props.title}
          </span>
          <br />
          {props.tip}
        </div>
        {props.operation ? (
          <div className="col-12 col-md-4 text-md-right text-center">
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
      {(props.list || []).map((item, i) => (
        <li
          className={`logi-item align-items-center ${
            item.active ? 'active' : ''
          } ${
            !hasMoreLessOperation || !i || moreLogistics ? 'd-flex' : 'hidden'
          }`}
          key={i}
        >
          <span className={`logi-time text-right ${customDateCls}`}>
            {getFormatDate(item.date)}
          </span>
          <div className="logi-text pl-4 pr-4 pt-3 pb-3">
            <svg className="svg-icon logi-icon" aria-hidden="true">
              <use
                xlinkHref={`#${!i ? 'iconjinhangzhong' : 'iconyiwancheng'}`}
              />
            </svg>

            <span className={`ml-4 ui-text-overflow-line2 ${!i ? 'red' : ''}`}>
              {item.details}
              {item.statusDescription}
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
      ))}
    </ul>
  );
}

@inject('checkoutStore')
@injectIntl
@observer
class AccountOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      orderNumber: '',
      totalTid: '',
      subNumber: '',
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
      cancelProgressList: [],
      currentProgerssIndex: -1,
      defaultLocalDateTime: '',
      isAuditOpen: false,
      processMore: false,
      confirmTooltipVisible: true,
      auditRejectReason: '',
      payNowLoading: false,
      canPayNow: false,
      moreLogistics: false,
      logisticsList: [],
      activeTabIdx: 0,
      showLogisticsDetail: false,
      curLogisticInfo: null
    };
    this.changeTab = this.changeTab.bind(this);
    this.handleClickLogisticsCard = this.handleClickLogisticsCard.bind(this);
  }
  componentDidMount() {
    setSeoConfig().then((res) => {
      this.setState({ seoConfig: res });
    });
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
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
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  init() {
    const { orderNumber, progressList } = this.state;
    this.setState({ loading: true });
    let normalProgressList = [];
    let cancelProgressList = [];
    getOrderDetails(orderNumber)
      .then(async (res) => {
        let resContext = res.context;
        const tradeState = resContext.tradeState;
        const orderStatusMap = resContext.orderStatusMap;
        let currentProgerssIndex = -1;
        let currentCanceledProgerssIndex = -1;

        // Created / To be delivered / Shipped / Delivered
        // 1000 /    3000 /   4000 /   9000
        // 1000-2000 / 3000-3010 / 4000-4010-5000 / 9000

        // Created / Cancelled
        // 9000-9999

        //   {
        //     "1000": {
        //         "flowStateId": "INIT",
        //         "flowStateDesc": "Created"
        //     },
        //     "2000": {
        //         "flowStateId": "PENDING_REVIEW",
        //         "flowStateDesc": "Processing"
        //     },
        //     "3000": {
        //         "flowStateId": "TO_BE_DELIVERED",
        //         "flowStateDesc": "Processing"
        //     },
        //     "3010": {
        //         "flowStateId": "PARTIALLY_SHIPPED",
        //         "flowStateDesc": "Partially Shipped"
        //     },
        //     "4000": {
        //         "flowStateId": "SHIPPED",
        //         "flowStateDesc": "Shipped"
        //     },
        //     "4010": {
        //         "flowStateId": "PARTIALLY_DELIVERED",
        //         "flowStateDesc": "Partially Delivered"
        //     },
        //     "5000": {
        //         "flowStateId": "DELIVERED",
        //         "flowStateDesc": "Delivered"
        //     },
        //     "8000": {
        //         "flowStateId": "REJECTED",
        //         "flowStateDesc": "Rejected"
        //     },
        //     "9000": {
        //         "flowStateId": "COMPLETED",
        //         "flowStateDesc": "Completed"
        //     },
        //     "9999": {
        //         "flowStateId": "VOID",
        //         "flowStateDesc": "Cancelled"
        //     }
        // }

        normalProgressList = [1000, 2000, 4000, 5000].map((el) => {
          let flowStateIds = [orderStatusMap[el]?.flowStateId];
          // 组装所有归属于此状态的订单状态
          switch (el) {
            // case 1000:
            //   flowStateIds.push(orderStatusMap[2000]?.flowStateId);
            //   break;
            case 2000:
              flowStateIds.push(orderStatusMap[3000]?.flowStateId);
              break;
            // case 3000:
            //   flowStateIds.push(orderStatusMap[3010]?.flowStateId);
            //   break;
            case 4000:
              flowStateIds.push(orderStatusMap[4010]?.flowStateId);
              // flowStateIds.push(orderStatusMap[5000]?.flowStateId);
              break;
            case 5000:
              flowStateIds.push(orderStatusMap[9000]?.flowStateId);
              break;
          }
          return Object.assign(orderStatusMap[el], {
            flowStateIds: [...flowStateIds],
            showInFlow: true
          });
        });

        // 处理取消订单流程
        // cancelProgressList = [1000, 9999].map((el) => {
        //   let flowStateIds2 = [orderStatusMap[el]?.flowStateId];
        //   // 组装所有归属于此状态的订单状态
        //   switch (el) {
        //     case 1000:
        //       flowStateIds2.push(
        //         orderStatusMap[2000]?.flowStateId,
        //         orderStatusMap[3000]?.flowStateId,
        //         orderStatusMap[4000]?.flowStateId,
        //         orderStatusMap[4010]?.flowStateId,
        //         orderStatusMap[5000]?.flowStateId
        //       );
        //       break;
        //     case 9999:
        //       flowStateIds2.push(
        //         orderStatusMap[9000]?.flowStateId,
        //         orderStatusMap[9999]?.flowStateId
        //       );
        //       break;
        //   }
        //   return Object.assign(orderStatusMap[el], {
        //     flowStateIds: [...flowStateIds2],
        //     showInFlow: true
        //   });
        // });

        // 查询支付卡信息
        this.setState(
          {
            totalTid: resContext.totalTid
          },
          () => {
            getPayRecord(this.state.totalTid).then((res) => {
              this.setState({
                payRecord: res.context
              });
            });
          }
        );
        // 发货运输中，查询物流信息
        if (
          tradeState.payState === 'PAID' &&
          tradeState.auditState === 'CHECKED' &&
          (tradeState.deliverStatus === 'SHIPPED' ||
            tradeState.deliverStatus === 'PART_SHIPPED')
        ) {
          queryLogistics(orderNumber).then((res) => {
            this.setState({
              logisticsList: (res.context && res.context.tradeDelivers) || []
            });
          });
          // 'O202011041057213979'
          // queryLogistics('O202011090822133614').then((res) => {
          //   this.setState({
          //     logisticsList: (res.context && res.context.tradeDelivers) || []
          //   });
          // });
        }
        const tradeEventLogs = res.context.tradeEventLogs || [];
        if (tradeEventLogs.length) {
          const lastedEventLog = tradeEventLogs[0];

          currentProgerssIndex = findIndex(normalProgressList, (ele) =>
            ele.flowStateIds.includes(tradeState.flowState)
          );
          if (currentProgerssIndex === -1) {
            currentCanceledProgerssIndex = findIndex(
              cancelProgressList,
              (ele) => ele.flowStateIds.includes(tradeState.flowState)
            );
          }

          // 从eventLogs中获取时间信息
          // Array.from(normalProgressList, (item) => {
          //   const tpm = find(tradeEventLogs, (ele) =>
          //     ele?.eventType?.includes(item.flowStateId)
          //   );
          //   if (tpm) {
          //     item.time1 = tpm.eventTime.substr(0, 10);
          //     item.time2 = tpm.eventTime.substr(11, 8);
          //   }
          //   return item;
          // });
        }
        // let cityRes = await queryCityNameById({
        //   id: [resContext.consignee.cityId, resContext.invoice.cityId]
        // });
        // cityRes = cityRes.context.systemCityVO || [];
        // resContext.consignee.cityName = this.matchCityName(
        //   cityRes,
        //   resContext.consignee.cityId
        // );
        // resContext.invoice.cityName = this.matchCityName(
        //   cityRes,
        //   resContext.invoice.cityId
        // );
        this.setState({
          details: resContext,
          loading: false,
          currentProgerssIndex,
          currentCanceledProgerssIndex,
          normalProgressList,
          cancelProgressList,
          defaultLocalDateTime: res.defaultLocalDateTime,
          subNumber: resContext?.subscriptionResponseVO?.subscribeId,
          canPayNow:
            ((!resContext.isAuditOpen && tradeState.flowState === 'AUDIT') ||
              (resContext.isAuditOpen &&
                tradeState.flowState === 'INIT' &&
                tradeState.auditState === 'NON_CHECKED')) &&
            tradeState.deliverStatus === 'NOT_YET_SHIPPED' &&
            tradeState.payState === 'NOT_PAID' &&
            new Date(resContext.orderTimeOut).getTime() >
              new Date(res.defaultLocalDateTime).getTime() &&
            (!resContext.payWay || resContext.payWay.toUpperCase() !== 'OXXO')
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errMsg: err.message.toString()
        });
      });
  }
  // matchCityName(dict, cityId) {
  //   return dict.filter((c) => c.id === cityId).length
  //     ? dict.filter((c) => c.id === cityId)[0].cityName
  //     : cityId;
  // }
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
    if (
      details.tradeState.deliverStatus === 'SHIPPED' &&
      details.tradeState.flowState === 'COMPLETED'
    ) {
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
    if (
      new Date(this.state.defaultLocalDateTime).getTime() <
        new Date(details.orderTimeOut).getTime() &&
      details.tradeState.flowState === 'AUDIT' &&
      details.tradeState.deliverStatus === 'NOT_YET_SHIPPED'
    ) {
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
          <div id="bottom-tooltip" className="rc-tooltip text-left pl-1 pr-1">
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
    const { consignee, invoice, tradePrice } = details;
    this.setState({ payNowLoading: true });
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
    const tmpDeliveryAddress = {
      firstName: consignee.firstName,
      lastName: consignee.lastName,
      address1: consignee.detailAddress1,
      address2: consignee.detailAddress2,
      rfc: consignee.rfc,
      country: consignee.countryId ? consignee.countryId.toString() : '',
      // city: consignee.cityId ? consignee.cityId.toString() : '',
      city: consignee.city == consignee.cityName ? null : consignee.city,
      cityName: consignee.cityName,
      postCode: consignee.postCode,
      phoneNumber: consignee.phone,
      addressId: consignee.id
    };
    const tmpBillingAddress = {
      firstName: invoice.firstName,
      lastName: invoice.lastName,
      address1: invoice.address1,
      address2: invoice.address2,
      rfc: invoice.rfc,
      country: invoice.countryId ? invoice.countryId.toString() : '',
      // city: invoice.cityId ? invoice.cityId.toString() : '',
      city: invoice.city == invoice.cityName ? null : invoice.city,
      cityName: invoice.cityName,
      postCode: invoice.postCode,
      phoneNumber: invoice.phone,
      addressId: invoice.addressId
    };
    localItemRoyal.set('loginDeliveryInfo', {
      deliveryAddress: tmpDeliveryAddress,
      billingAddress: tmpBillingAddress,
      commentOnDelivery: details.buyerRemark
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
    this.setState({ payNowLoading: false });
  };
  handlePayNowTimeEnd = () => {
    this.setState({ canPayNow: false });
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
    const { moreLogistics, logisticsList, activeTabIdx } = this.state;
    const filteredLogisticsList = logisticsList
      .map((ele) =>
        ele.syncLogisticsInfo &&
        ele.syncLogisticsInfo.originInfo &&
        ele.syncLogisticsInfo.originInfo.trackInfo
          ? ele
          : null
      )
      .filter((ele) => ele);
    return (
      <>
        {logisticsList[0] && logisticsList[0].trackingUrl ? null : (
          <>
            {logisticsList.length > 0 ? (
              <div className="col-12 mt-4 border1 rounded mb-4 pl-0 pr-0 rc-md-up">
                {logisticsList.length > 1 ? (
                  <nav className="rc-bg-colour--brand4 p-3">
                    {logisticsList.map((item, i) => (
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
                    ))}
                  </nav>
                ) : null}

                {logisticsList.map((item, i) => (
                  <div
                    key={i}
                    className={`ml-3 mr-3 ${
                      i === activeTabIdx ? '' : 'hidden'
                    }`}
                  >
                    <LogisticsProgress
                      list={
                        (item.syncLogisticsInfo &&
                          item.syncLogisticsInfo.originInfo &&
                          item.syncLogisticsInfo.originInfo.trackInfo) ||
                        []
                      }
                      hasMoreLessOperation={true}
                      moreLogistics={moreLogistics}
                      handleToggleMoreLess={this.handleToggleMoreLess}
                      customDateCls="text-nowrap"
                    />

                    <div className="row">
                      {(item.shippingItems || []).map((ele) => (
                        <div className="text-center col-2" key={ele.skuId}>
                          <LazyLoad>
                            <img
                              src={ele.pic || IMG_DEFAULT}
                              alt={ele.itemName}
                              title={ele.itemName}
                              style={{ width: '70%', margin: '0 auto' }}
                            />
                          </LazyLoad>
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
                          {getFormatDate(
                            (item.deliverTime || '').substr(0, 10)
                          )}
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
                          text={item.logistics ? item.logistics.logisticNo : ''}
                        >
                          <span className="iconfont ui-cursor-pointer ml-2">
                            &#xe6c0;
                          </span>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="ml-4 mr-4 rc-md-down mt-2 mt-md-0">
              {filteredLogisticsList.map((item, i) => (
                <div
                  className="row rc-bg-colour--brand4 rounded mb-2 pb-2"
                  onClick={this.handleClickLogisticsCard.bind(this, item)}
                  key={i}
                >
                  <div className="col-10 medium color-444 d-flex align-items-center">
                    <span>
                      {getFormatDate(
                        item.syncLogisticsInfo.originInfo.trackInfo[0].date
                      )}
                    </span>
                  </div>
                  <div className="col-2">
                    <span
                      className="rc-icon rc-right rc-iconography rc-md-down"
                      style={{ transform: 'scale(.85)' }}
                    />
                  </div>
                  <div className="col-12 mt-2">
                    {item.syncLogisticsInfo.originInfo.trackInfo[0].details}
                    {
                      item.syncLogisticsInfo.originInfo.trackInfo[0]
                        .statusDescription
                    }
                  </div>
                  <div className="col-12 row mt-2">
                    {item.shippingItems.map((sItem) => (
                      <div className="col-3" key={sItem.skuId}>
                        <LazyLoad>
                          <img
                            className="rc-bg-colour--brand4"
                            src={sItem.pic}
                            alt="shipping-Items-image"
                          />
                        </LazyLoad>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
      canPayNow,
      payNowLoading,
      defaultLocalDateTime,
      orderNumber,
      logisticsList,
      currentProgerssIndex,
      normalProgressList
    } = this.state;
    let ret = null;
    switch (currentProgerssIndex) {
      case 0:
        // 订单创建
        ret = (
          <>
            <HeadTip
              icon={
                <svg
                  className="svg-icon"
                  aria-hidden="true"
                  style={{ width: '3.5em', height: '3.5em' }}
                >
                  <use xlinkHref="#iconTobepaid" />
                </svg>
              }
              title={normalProgressList[currentProgerssIndex]?.flowStateDesc}
              titleColor="text-info"
              tip={
                <FormattedMessage
                  id="orderStatus.INITTip"
                  values={{
                    val: (
                      <>
                        {canPayNow ? (
                          <>
                            <span
                              className={`red ui-cursor-pointer ${
                                payNowLoading
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
            <hr />
          </>
        );
        break;
      case 1:
        // 等待发货
        ret = (
          <>
            <HeadTip
              icon={
                <svg
                  className="svg-icon"
                  aria-hidden="true"
                  style={{ width: '3.5em', height: '3.5em' }}
                >
                  <use xlinkHref="#iconTobedelivered" />
                </svg>
              }
              title={normalProgressList[currentProgerssIndex]?.flowStateDesc}
              titleColor="text-warning"
              tip={<FormattedMessage id="order.toBeDeliveredTip" />}
            />
            <hr />
          </>
        );
        break;
      case 2:
        // 发货运输中
        ret = (
          <HeadTip
            icon={
              <svg
                className="svg-icon"
                aria-hidden="true"
                style={{ width: '3.5em', height: '3.5em' }}
              >
                <use xlinkHref="#iconIntransit" />
              </svg>
            }
            title={<FormattedMessage id="inTransit" />}
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
                <svg
                  className="svg-icon"
                  aria-hidden="true"
                  style={{ width: '3.5em', height: '3.5em' }}
                >
                  <use xlinkHref="#iconCompleted" />
                </svg>
              }
              title={<FormattedMessage id="orderStatus.COMPLETED" />}
              tip={<FormattedMessage id="order.completeTip" />}
              operation={
                !!+process.env.REACT_APP_PDP_RATING_VISIBLE && (
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
            <hr />
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
      details,
      payRecord,
      currentProgerssIndex,
      currentCanceledProgerssIndex,
      orderNumber,
      normalProgressList,
      cancelProgressList,
      showLogisticsDetail,
      curLogisticInfo
    } = this.state;
    const isTr = process.env.REACT_APP_LANG === 'tr'; //因为土耳其Total VAT Included的翻译，需要对Total VAT Included特殊化处理
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
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3 ord-detail">
          <BannerTip />
          <BreadCrumbs />
          <div className="p-md-2rem rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Orders" customCls="rc-md-up" />
              <div className="my__account-content rc-column rc-quad-width">
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
                    className="rc-md-down mt-3 inlineblock"
                  >
                    <span className="red">&lt;</span>
                    <span className="rc-styled-link rc-progress__breadcrumb ml-2">
                      <FormattedMessage id="account.ordersTitle" />
                    </span>
                  </Link>
                )}

                <div
                  className={`row justify-content-center mt-3 mt-md-0 ${
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
                          {this.renderHeadTip()}
                          {currentProgerssIndex > -1 ? (
                            <Progress
                              progressList={normalProgressList}
                              currentProgerssIndex={currentProgerssIndex}
                            />
                          ) : null}
                          {/* 取消状态不展示进度条 */}
                          {/* {currentCanceledProgerssIndex > -1 ? (
                            <Progress
                              progressList={cancelProgressList}
                              currentProgerssIndex={
                                currentCanceledProgerssIndex
                              }
                            />
                          ) : null} */}

                          <div
                            className="rc-bg-colour--brand4 rc-md-down mt-3"
                            style={{ height: '.8rem' }}
                          />
                          <div className="row m-0 ml-2 mr-2 ml-md-0 mr-md-0">
                            <div className="col-12 border table-header rounded mt-3 mt-md-0">
                              <div className="row pt-3 pb-2 pl-1 pr-1 pl-md-4 pr-md-4 pt-md-4 pb-md-3">
                                {/* 订单号 */}
                                <div className="col-12 col-md-3 text-left mb-2">
                                  <FormattedMessage id="order.orderNumber" />
                                  <br />
                                  <span className="medium">{orderNumber}</span>
                                </div>
                                {/* 订单状态 */}
                                <div className="col-12 col-md-3 text-left mb-2">
                                  <FormattedMessage id="order.orderStatus" />
                                  <br />
                                  <span className="medium">
                                    {details.tradeState.orderStatus}
                                  </span>
                                </div>

                                {/* 订阅订单号 */}
                                {details.subscriptionResponseVO ? (
                                  <div className="col-12 col-md-3 text-left mb-2">
                                    <FormattedMessage id="subscription.numberFirstWordUpperCase" />
                                    <br />
                                    <Link
                                      to={`/account/subscription/order/detail/${this.state.subNumber}`}
                                      className="rc-styled-link medium mb-0"
                                    >
                                      {this.state.subNumber}
                                    </Link>
                                  </div>
                                ) : null}

                                {/* clinic信息 */}
                                {process.env.REACT_APP_CHECKOUT_WITH_CLINIC ===
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
                              </div>
                            </div>
                            <div className="col-12 table-body rounded mt-md-3 mb-2 pl-0 pr-0">
                              <div className="order__listing text-left">
                                <div className="order-list-container">
                                  {details.tradeItems.map((item, i) => (
                                    <div className="border-bottom p-2" key={i}>
                                      <div
                                        className={`row align-items-center pl-2 pr-2 pl-md-0 pr-md-0 ${
                                          i ? 'pt-3' : ''
                                        } ${
                                          i !== details.tradeItems.length - 1
                                            ? 'pb-3'
                                            : ''
                                        }`}
                                      >
                                        <div className="col-4 col-md-2 d-flex justify-content-center align-items-center">
                                          <LazyLoad classNamePrefix="d-flex justify-content-center align-items-center">
                                            <img
                                              style={{ width: '100px' }}
                                              className="order-details-img-fluid"
                                              src={item.pic || IMG_DEFAULT}
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
                                              {item.spuName}
                                            </span>
                                            <span className="ui-text-overflow-line2">
                                              <span className="rc-md-up">
                                                {item.specDetails}
                                              </span>
                                              <span className="rc-md-down">
                                                <FormattedMessage
                                                  id="quantityText"
                                                  values={{
                                                    specText: item.specDetails,
                                                    buyCount: item.num
                                                  }}
                                                />
                                              </span>
                                            </span>

                                            <span className="rc-md-down">
                                              {details.subscriptionResponseVO &&
                                              item.subscriptionStatus ? (
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
                                              ) : (
                                                formatMoney(item.originalPrice)
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
                                        <div className="col-6 col-md-2 text-right text-md-left rc-md-up">
                                          <FormattedMessage
                                            id="xProduct"
                                            values={{ val: item.num }}
                                          />
                                        </div>
                                        <div className="col-6 col-md-3 text-right text-md-left rc-md-up">
                                          {details.subscriptionResponseVO &&
                                          item.subscriptionStatus ? (
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
                                          ) : (
                                            formatMoney(item.originalPrice)
                                          )}
                                        </div>
                                        <div className="col-12 col-md-2 text-right text-md-left text-nowrap rc-md-up font-weight-normal">
                                          {formatMoney(item.price)}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="pt-2 pb-2 pl-md-4 pr-md-4">
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
                                  {/* {details.tradePrice.discountsPrice ? (
                                    <>
                                      <div className="col-2 col-md-7 mb-2 rc-md-up">
                                        &nbsp;
                                      </div>
                                      <div className="col-6 col-md-2 mb-2 red">
                                        {details.tradePrice.promotionDesc || (
                                          <FormattedMessage id="promotion" />
                                        )}
                                      </div>
                                      <div className="col-6 col-md-3 text-right red text-nowrap">
                                        -
                                        {formatMoney(
                                          details.tradePrice.discountsPrice
                                        )}
                                      </div>
                                    </>
                                  ) : null} */}
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
                                  {details.tradePrice.promotionDiscountPrice
                                    ? details.tradePrice.promotionVOList.map(
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
                                      )
                                    : null}
                                  <div className="col-2 col-md-7 mb-2 rc-md-up">
                                    &nbsp;
                                  </div>
                                  <div className="col-6 col-md-2 mb-2">
                                    <FormattedMessage id="shipping" />
                                  </div>
                                  <div className="col-6 col-md-3 text-right text-nowrap">
                                    {formatMoney(
                                      details.tradePrice.deliveryPrice
                                    )}
                                  </div>

                                  {/* 税额 */}
                                  {customTaxSettingOpenFlag == 0 &&
                                  enterPriceType == 1 ? (
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

                                  <div className="col-2 col-md-7 mb-2 rc-md-up">
                                    &nbsp;
                                  </div>
                                  <div
                                    className={`col-6 col-md-2 mb-2 ${
                                      isTr ? 'tr-total-iVAIncluido' : ''
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
                                    {formatMoney(details.tradePrice.totalPrice)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 地址/支付信息 */}
                          <div className="ml-2 mr-2 mr-md-0 ml-md-0">
                            <p className="mt-4 mb-2 red text-left">
                              <FormattedMessage id="transactionInfomation" />
                            </p>
                            <div className="row text-left text-break">
                              <div className="col-12 col-md-4 mb-2">
                                <div className="border rounded">
                                  <div className="d-flex p-3 h-100">
                                    <svg
                                      className="svg-icon align-middle mr-3 ml-1"
                                      aria-hidden="true"
                                      style={{ width: '2em', height: '2em' }}
                                    >
                                      <use xlinkHref="#iconaddresses" />
                                    </svg>
                                    <div>
                                      <p className="medium mb-3">
                                        <FormattedMessage id="delivery2" />
                                      </p>
                                      <p className="medium mb-2">
                                        {details.consignee.name}
                                      </p>
                                      {details.consignee.postCode},{' '}
                                      {details.consignee.phone}
                                      <br />
                                      {process.env.REACT_APP_LANG ==
                                      'en' ? null : (
                                        <>
                                          {matchNamefromDict(
                                            this.state.countryList,
                                            details.consignee.countryId
                                          )}{' '}
                                        </>
                                      )}
                                      {details?.consignee?.province &&
                                      details?.consignee?.province != null ? (
                                        <>
                                          <br />
                                          {details?.consignee?.province}
                                          <br />
                                        </>
                                      ) : null}
                                      {details.consignee.city}
                                      <br />
                                      {details.consignee.detailAddress1}
                                      <br />
                                      {details.consignee.detailAddress2}
                                      {details.consignee.detailAddress2 ? (
                                        <br />
                                      ) : null}
                                      {details.consignee.rfc}
                                      {details.consignee.rfc ? <br /> : null}
                                      {details.buyerRemark}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-4 mb-2">
                                <div className="border rounded p-3 h-100">
                                  <div className="d-flex">
                                    <svg
                                      className="svg-icon align-middle mr-3 ml-1"
                                      aria-hidden="true"
                                      style={{ width: '2em', height: '2em' }}
                                    >
                                      <use xlinkHref="#iconBillingAddress1" />
                                    </svg>
                                    <div>
                                      <p className="medium mb-3">
                                        <FormattedMessage id="billing2" />
                                      </p>
                                      <p className="medium mb-2">
                                        {details.invoice.contacts}
                                      </p>
                                      {details.invoice.postCode},{' '}
                                      {details.invoice.phone}
                                      <br />
                                      {process.env.REACT_APP_LANG ==
                                      'en' ? null : (
                                        <>
                                          {matchNamefromDict(
                                            this.state.countryList,
                                            details.invoice.countryId
                                          )}{' '}
                                        </>
                                      )}
                                      {details?.invoice?.province &&
                                      details?.invoice?.province != null ? (
                                        <>
                                          <br />
                                          {details?.invoice?.province}
                                          <br />
                                        </>
                                      ) : null}
                                      {details.invoice.city}
                                      <br />
                                      {details.invoice.address1}
                                      <br />
                                      {details.invoice.address2}
                                      {details.invoice.address2 ? <br /> : null}
                                      {details.invoice.rfc}
                                      {details.invoice.rfc ? <br /> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {payRecord && payRecord.lastFourDigits ? (
                                <div className="col-12 col-md-4 mb-2">
                                  <div className="border rounded p-3 h-100">
                                    <div className="d-flex">
                                      <svg
                                        className="svg-icon align-middle mr-3 ml-1"
                                        aria-hidden="true"
                                        style={{ width: '2em', height: '2em' }}
                                      >
                                        <use xlinkHref="#iconpayments" />
                                      </svg>
                                      <div>
                                        <p className="medium mb-3">
                                          <FormattedMessage id="payment.payment" />
                                        </p>
                                        <p className="medium mb-2">
                                          <LazyLoad
                                            style={{ display: 'inline' }}
                                          >
                                            <img
                                              alt="card-background"
                                              className="d-inline-block mr-1"
                                              style={{ width: '20%' }}
                                              src={
                                                CREDIT_CARD_IMG_ENUM[
                                                  payRecord.paymentVendor.toUpperCase()
                                                ] ||
                                                'https://js.paymentsos.com/v2/iframe/latest/static/media/unknown.c04f6db7.svg'
                                              }
                                            />
                                          </LazyLoad>
                                          {payRecord.lastFourDigits ? (
                                            <>
                                              <span className="medium">
                                                ********
                                                {payRecord.lastFourDigits}
                                              </span>
                                              <br />
                                            </>
                                          ) : null}
                                        </p>

                                        {payRecord.holderName ? (
                                          <>
                                            {payRecord.holderName}
                                            <br />
                                          </>
                                        ) : null}
                                        {payRecord.phone ? (
                                          <>
                                            {payRecord.phone}
                                            <br />
                                          </>
                                        ) : null}
                                        {payRecord.email}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
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
                        (curLogisticInfo.syncLogisticsInfo &&
                          curLogisticInfo.syncLogisticsInfo.originInfo &&
                          curLogisticInfo.syncLogisticsInfo.originInfo
                            .trackInfo) ||
                        []
                      }
                    />
                    <div
                      className="col-12 rc-bg-colour--brand4 rc-md-down mb-3"
                      style={{ height: '.8rem' }}
                    />
                    {(curLogisticInfo.shippingItems || []).map((ele) => (
                      <div className="row col-12" key={ele.skuId}>
                        <div className="col-6">
                          <LazyLoad>
                            <img
                              src={ele.pic || IMG_DEFAULT}
                              alt={ele.itemName}
                              title={ele.itemName}
                            />
                          </LazyLoad>
                        </div>

                        <div className="col-6 d-flex align-items-center">
                          <div>
                            <div className="font-weight-normal ui-text-overflow-line2">
                              {ele.itemName}
                            </div>
                            <FormattedMessage
                              id="quantityText"
                              values={{
                                specText: ele.specDetails,
                                buyCount: ele.itemNum
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className="col-12 rc-bg-colour--brand4 rc-md-down mb-3"
                      style={{ height: '.8rem' }}
                    />
                    <div className="row m-0 pt-2 pb-2">
                      <div className="col-12 col-md-3 d-flex">
                        <svg className="svg-icon mr-1" aria-hidden="true">
                          <use xlinkHref="#iconDeliverydate" />
                        </svg>
                        <p>
                          <FormattedMessage id="deliveryDate" />
                          <br />
                          <span className="medium color-444">
                            {getFormatDate(
                              (curLogisticInfo.deliverTime || '').substr(0, 10)
                            )}
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
