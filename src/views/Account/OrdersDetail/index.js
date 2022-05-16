import React from 'react';
import { inject, observer } from 'mobx-react';
import Skeleton from 'react-skeleton-loader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import SideMenu from '@/components/SideMenu';
import BannerTip from '@/components/BannerTip';
import { FormattedMessage } from 'react-intl-phraseapp';
import { judgeIsIndividual, formatDate } from '@/utils/utils';
import findIndex from 'lodash/findIndex';
import { getOrderDetails, getPayRecord } from '@/api/order';
import { queryLogistics } from '@/api/order';
import { IMG_DEFAULT } from '@/utils/constant';
import './index.less';
import LazyLoad from 'react-lazyload';
import PageBaseInfo from '@/components/PageBaseInfo';
import { injectIntl } from 'react-intl-phraseapp';
import {
  handleOrderStatusMap,
  handleFelinOrderStatusMap
} from './modules/handleOrderStatus';
import { handleOrderItem } from '../Orders/modules/handleOrderItem';
import {
  OrderAddressAndPayReview,
  OrderAllPrice,
  PriceDetailsList,
  OrderAllProduct,
  OrderHeaderInfo,
  OrderHeadTip,
  OrderProgress,
  OrderLogisticsProgress,
  CancelOrderForJp
} from './modules';
import { DivWrapper } from './style';

@inject('checkoutStore', 'configStore', 'paymentStore')
@injectIntl
@observer
class AccountOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: '',
      details: null,
      payRecord: null,
      loading: true,
      errMsg: '',
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
      curLogisticInfo: null
    };
    this.changeTab = this.changeTab.bind(this);
    this.handleClickLogisticsCard = this.handleClickLogisticsCard.bind(this);
  }
  componentDidMount() {
    this.setState(
      {
        orderNumber: this.props.match.params.orderNumber
      },
      () => {
        this.init();
      }
    );
  }
  init() {
    const { orderNumber } = this.state;
    this.setState({ loading: true });
    let normalProgressList = [];
    getOrderDetails(orderNumber)
      .then(async (res) => {
        let resContext = res.context;
        resContext.tradeItems?.forEach((el) => {
          el.spuName = judgeIsIndividual(el) ? (
            <FormattedMessage
              id="subscription.personalized"
              values={{ val1: el.petsName }}
            />
          ) : (
            el.spuName
          );
        });
        resContext?.subscriptionPlanGiftList?.forEach((el) => {
          el.pic = el.goodsInfoImg || el.pic;
          el.isWelcomeBox = true;
          el.spuName = el.goodsInfoName;
          el.num = el.quantity;
          el.originalPrice = el.marketPrice;
        });
        const tradeState = resContext.tradeState;
        let currentProgressIndex = -1;
        normalProgressList = resContext.appointmentNo
          ? handleFelinOrderStatusMap(resContext.orderStatusMap)
          : handleOrderStatusMap(resContext.orderStatusMap);
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
              logisticsList: res?.context?.tradeDelivers || []
            });
          });
        }
        const tradeEventLogs = resContext.tradeEventLogs || [];
        if (tradeEventLogs.length) {
          currentProgressIndex = findIndex(normalProgressList, (ele) =>
            ele.flowStateIds.includes(tradeState.flowState)
          );
        }
        this.setState({
          details: handleOrderItem(resContext, res),
          loading: false,
          currentProgressIndex,
          normalProgressList,
          defaultLocalDateTime: res.defaultLocalDateTime
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errMsg: err.message.toString()
        });
      });
  }
  changeTab(i) {
    this.setState({
      activeTabIdx: i
    });
  }
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
  handleLogisticsDetails = (tradeLogisticsDetails) => {
    return (
      tradeLogisticsDetails.sort((a, b) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }) || []
    );
  };
  renderLogitiscsJSX = () => {
    const { moreLogistics, activeTabIdx } = this.state;
    //没有详细物流信息的package不显示
    const logisticsList = [];
    this.state.logisticsList.forEach((item, index) => {
      item.giftItemList = item.giftItemList.filter((item2) => !item2.isHidden);
      if (
        item.shippingItems.length ||
        item.giftItemList.length ||
        item.subscriptionPlanGiftItemList.length
      ) {
        logisticsList.push(item);
      }
    });
    const filteredLogisticsList = logisticsList;
    return (
      <>
        {logisticsList.length > 0 ? (
          <div className="col-12 mt-4 border1 rounded mb-4 px-0 rc-md-up">
            {/* tab表头，length大于才展示 */}
            {logisticsList.length > 1 ? (
              <nav className="rc-bg-colour--brand4 p-3">
                {logisticsList.map(
                  (item, i) =>
                    true && (
                      <span
                        className={`ui-cursor-pointer mr-2 px-3 py-2 rounded ${
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

            {logisticsList.map((item, i) => (
              <div
                key={i}
                className={`mx-3 ${i === activeTabIdx ? '' : 'hidden'}`}
              >
                <OrderLogisticsProgress
                  list={this.handleLogisticsDetails(item.tradeLogisticsDetails)}
                  hasMoreLessOperation={true}
                  moreLogistics={moreLogistics}
                  handleToggleMoreLess={this.handleToggleMoreLess}
                  customDateCls="text-nowrap"
                />
                <div className="row mb-2">
                  {(item.shippingItems || [])
                    .concat(item.giftItemList)
                    .concat(item.subscriptionPlanGiftItemList || [])
                    .map((ele) => (
                      <div className="text-center col-2" key={ele.skuId}>
                        <img
                          className="mx-auto my-0 w-auto"
                          src={ele.pic || IMG_DEFAULT}
                          alt={ele.itemName}
                          title={ele.itemName}
                          style={{ height: '60px' }}
                        />
                        <p className="font-weight-normal ui-text-overflow-line1">
                          {ele.itemNum} X {ele.itemName}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="row border-top m-0 py-2">
                  <div className="col-12 col-md-3">
                    <span className="iconfont iconDeliverydate mr-1 logics-icon" />
                    <FormattedMessage id="deliveryDate" />:{' '}
                    <span className="medium">
                      {formatDate({ date: item.deliverTime })}
                    </span>
                  </div>
                  <div className="col-12 col-md-4">
                    <span className="iconfont iconLogisticscompany mr-1 logics-icon" />
                    <FormattedMessage id="logisticsCompany" />:{' '}
                    <span className="medium">
                      {item.logistics ? item.logistics.logisticCompanyName : ''}
                    </span>
                  </div>
                  <div className="col-12 col-md-5">
                    <span className="iconfont iconLogisticssinglenumber mr-1 logics-icon" />
                    <FormattedMessage id="logisticsSingleNumber" />:{' '}
                    <span className="medium">
                      {item.logistics ? item.logistics.logisticNo : ''}
                    </span>
                    <CopyToClipboard
                      text={item.logistics ? item.logistics.logisticNo : ''}
                    >
                      <span className="iconfont ui-cursor-pointer ml-2 iconcopy" />
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mx-4 rc-md-down mt-2 md:mt-0">
          {filteredLogisticsList.map((item, i) => (
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
                  <div className="col-3 flex items-end" key={sItem.skuId}>
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
          ))}
        </div>
      </>
    );
  };
  render() {
    const { configStore } = this.props;
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
      curLogisticInfo
    } = this.state;

    console.log({ details });
    console.log({ logisticsList: this.state.logisticsList });

    return (
      <DivWrapper>
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
                    <div className="card confirm-details orderDetailsPage mx-0 border-0">
                      {this.state.loading ? (
                        <Skeleton
                          color="#f5f5f5"
                          width="100%"
                          height="50%"
                          count={5}
                        />
                      ) : details ? (
                        <div className="card-body p-0">
                          <OrderHeadTip
                            props={this.props}
                            details={details}
                            logisticsList={this.state.logisticsList}
                            currentProgressIndex={currentProgressIndex}
                            defaultLocalDateTime={
                              this.state.defaultLocalDateTime
                            }
                            normalProgressList={normalProgressList}
                            renderLogitiscsJSX={this.renderLogitiscsJSX()}
                          />

                          {currentProgressIndex > -1 ? (
                            <OrderProgress
                              {...this.props}
                              progressList={normalProgressList}
                              currentProgressIndex={currentProgressIndex}
                            />
                          ) : null}

                          <div className="rc-bg-colour--brand4 rc-md-down mt-3 h-3.5" />
                          <div className="row m-0 mx-2 md:mx-0 ">
                            <OrderHeaderInfo
                              details={details}
                              props={this.props}
                            />
                            <div className="col-12 table-body rounded md:mt-3 mb-2 px-0">
                              <OrderAllProduct details={details} />
                              {details ? (
                                <PriceDetailsList
                                  data={{
                                    totalPrice: details?.tradePrice?.goodsPrice,
                                    taxFeePrice:
                                      details?.tradePrice?.taxFeePrice,
                                    subscriptionDiscountPrice:
                                      details?.tradePrice
                                        ?.subscriptionDiscountPrice,
                                    deliveryPrice:
                                      details?.tradePrice?.deliveryPrice,
                                    freeShippingDiscountPrice:
                                      details.tradePrice
                                        .freeShippingDiscountPrice,
                                    freeShippingFlag:
                                      details.tradePrice.freeShippingFlag,
                                    promotionVOList:
                                      details?.tradePrice?.promotionVOList,
                                    isShowInstallMent:
                                      !!details.tradePrice.installmentPrice,
                                    installMentAdditionalFee:
                                      details?.tradePrice?.installmentPrice
                                        ?.additionalFee,
                                    serviceFeePrice:
                                      details?.tradePrice?.serviceFeePrice,
                                    loyaltyPointsPrice:
                                      details?.tradePrice?.loyaltyPoints
                                  }}
                                />
                              ) : null}
                              <OrderAllPrice
                                details={details}
                                customTaxSettingOpenFlag={
                                  customTaxSettingOpenFlag
                                }
                                enterPriceType={enterPriceType}
                              />
                            </div>
                          </div>
                          <OrderAddressAndPayReview
                            details={details}
                            payRecord={payRecord}
                          />
                          <CancelOrderForJp
                            details={details}
                            props={this.props}
                            cancelSuccessCallback={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                              });
                              this.init();
                            }}
                          />
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
                    <OrderLogisticsProgress
                      list={this.handleLogisticsDetails(
                        curLogisticInfo.tradeLogisticsDetails
                      )}
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
                    <div className="row m-0 py-2">
                      <div className="col-12 col-md-3 d-flex">
                        <span className="iconfont iconDeliverydate mr-1 logics-icon" />
                        <p>
                          <FormattedMessage id="deliveryDate" />
                          <br />
                          <span className="medium color-444">
                            {formatDate({ date: curLogisticInfo.deliverTime })}
                          </span>
                        </p>
                      </div>
                      <div className="col-12 col-md-3 d-flex">
                        <span className="iconfont iconLogisticscompany mr-1 logics-icon" />
                        <p>
                          <FormattedMessage id="logisticsCompany" />
                          <br />
                          <span className="medium color-444">
                            {curLogisticInfo?.logistics?.logisticCompanyName ||
                              ''}
                          </span>
                        </p>
                      </div>
                      <div className="col-12 col-md-6 d-flex">
                        <span className="iconfont iconLogisticssinglenumber mr-1 logics-icon" />
                        <p>
                          <FormattedMessage id="logisticsSingleNumber" />
                          <br />
                          <span className="medium color-444">
                            {curLogisticInfo?.logistics?.logisticNo || ''}
                          </span>
                          <CopyToClipboard
                            text={curLogisticInfo?.logistics?.logisticNo || ''}
                          >
                            <span className="iconfont ui-cursor-pointer ml-2 iconcopy" />
                          </CopyToClipboard>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </DivWrapper>
    );
  }
}

export default AccountOrders;
