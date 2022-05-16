import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TimeCount from '@/components/TimeCount';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const sessionItemRoyal = window.__.sessionItemRoyal;

const HeadTip = (props) => {
  return (
    <>
      <div className="row align-items-center text-left mx-1 md:mx-0">
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
};

const renderHeadTip = ({
  details,
  logisticsList,
  currentProgressIndex,
  normalProgressList,
  renderLogitiscsJSX,
  defaultLocalDateTime,
  checkoutStore,
  props
}) => {
  let ret = null;
  const [canPayNow, setCanPayNow] = React.useState(details?.canPayNow);
  const [payNowLoading, setPayNowLoading] = React.useState(false);

  useEffect(() => {
    setCanPayNow(details?.canPayNow);
    console.log(canPayNow);
  }, []);

  const handleClickPayNow = () => {
    const order = details;
    setPayNowLoading(true);
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
    checkoutStore.setLoginCartData(tradeItems);
    sessionItemRoyal.set('rc-tid', details.id);
    sessionItemRoyal.set('rc-tidList', JSON.stringify(details.tidList));
    checkoutStore.setCartPrice({
      totalPrice: order.tradePrice.goodsPrice,
      tradePrice: order.tradePrice.totalPrice,
      discountPrice: order.tradePrice.discountsPrice,
      deliveryPrice: order.tradePrice.deliveryPrice,
      promotionDesc: order.tradePrice.promotionDesc,
      promotionDiscount: order.tradePrice.deliveryPrice,
      subscriptionPrice: order.tradePrice.subscriptionPrice
    });
    props.history.push('/checkout');
    setPayNowLoading(false);
  };
  switch (currentProgressIndex) {
    case 0:
      // 订单创建
      ret = (
        <>
          <HeadTip
            icon={
              <img
                className="w-14 h-14"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/To be paid.svg`}
                alt="icons To be paid"
              />
            }
            title={normalProgressList[currentProgressIndex]?.flowStateDesc}
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
                            onClick={() => {
                              handleClickPayNow();
                            }}
                          >
                            <span className={`red rc-styled-link mr-2`}>
                              <FormattedMessage id="order.payNow" />
                            </span>
                            &gt;
                          </span>{' '}
                          <TimeCount
                            className="rc-hidden"
                            startTime={defaultLocalDateTime}
                            endTime={details.orderTimeOut}
                            onTimeEnd={() => {
                              setCanPayNow(true);
                            }}
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
              <img
                className="w-14 h-14"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/To be delivered.svg`}
                alt="icons To be delivered"
              />
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
            <>
              <img
                className="w-14 h-14"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/In transit.svg`}
                alt="icons In transit"
              />
            </>
          }
          title={normalProgressList[currentProgressIndex]?.flowStateDesc}
          titleColor="text-success"
          moreTip={renderLogitiscsJSX}
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
              <img
                className="w-14 h-14"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/Completed.svg`}
                alt="icons Completed"
              />
            }
            title={normalProgressList[currentProgressIndex]?.flowStateDesc}
            tip={<FormattedMessage id="order.completeTip" />}
            operation={
              !!+window.__.env.REACT_APP_PDP_RATING_VISIBLE && (
                <FormattedMessage id="comment">
                  {(txt) => (
                    <Link
                      className="rc-btn rc-btn--sm rc-btn--one"
                      to={`/account/productReview/${details.id}`}
                      title={txt}
                      alt={txt}
                    >
                      {txt}
                    </Link>
                  )}
                </FormattedMessage>
              )
            }
            moreTip={renderLogitiscsJSX}
          />
          <hr className="my-4" />
        </>
      );
      break;
  }
  return ret;
};

//特殊处理felin订单HeadTip
const renderFelinHeadTip = ({ currentProgressIndex, normalProgressList }) => {
  let ret = null;
  switch (currentProgressIndex) {
    case 0:
      // Appointment confirmed
      ret = (
        <>
          <HeadTip
            icon={
              <img
                className="w-14 h-14"
                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/To be paid.svg`}
                alt="icons To be paid"
              />
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

const OrderHeaderTip = ({
  details,
  logisticsList,
  currentProgressIndex,
  normalProgressList,
  renderLogitiscsJSX,
  defaultLocalDateTime,
  checkoutStore,
  props
}) => {
  return (
    <div>
      {details?.appointmentNo
        ? renderFelinHeadTip({
            currentProgressIndex,
            normalProgressList
          })
        : renderHeadTip({
            details,
            logisticsList,
            currentProgressIndex,
            normalProgressList,
            renderLogitiscsJSX,
            defaultLocalDateTime,
            checkoutStore,
            props
          })}
    </div>
  );
};

export default inject(
  'checkoutStore',
  'loginStore',
  'paymentStore'
)(observer(OrderHeaderTip));
