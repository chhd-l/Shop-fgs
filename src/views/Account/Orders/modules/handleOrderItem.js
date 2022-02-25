import { handleDateForIos } from '@/utils/utils';

//处理order list item
export function handleOrderItem(ele, res) {
  const tradeState = ele.tradeState;
  return Object.assign(ele, {
    // orderCategory为RECURRENT_AUTOSHIP为refill订单，需要隐藏repay按钮
    canPayNow:
      ele.orderCategory !== 'RECURRENT_AUTOSHIP' &&
      tradeState.flowState === 'INIT' &&
      tradeState.auditState === 'NON_CHECKED' &&
      tradeState.payState === 'NOT_PAID' &&
      new Date(handleDateForIos(ele?.orderTimeOut)).getTime() >
        new Date(handleDateForIos(res.defaultLocalDateTime)).getTime() &&
      (!ele.payWay ||
        !['OXXO', 'ADYEN_OXXO', 'COD'].includes(ele.payWay.toUpperCase())),
    showOXXOExpireTime:
      tradeState.flowState === 'AUDIT' &&
      tradeState.deliverStatus === 'NOT_YET_SHIPPED' &&
      tradeState.payState === 'NOT_PAID' &&
      new Date(handleDateForIos(ele.orderTimeOut)).getTime() >
        new Date(handleDateForIos(res.defaultLocalDateTime)).getTime() &&
      ele.payWay &&
      ele.payWay.toUpperCase() === 'OXXO',
    payNowLoading: false,
    // goodsInfoFlag=3是indv的商品，需要隐藏加入购物车这个按钮
    canRePurchase:
      !ele.appointmentNo &&
      !ele.tradeItems?.find((el) => el.goodsInfoFlag === 3) &&
      (tradeState.flowState === 'COMPLETED' || tradeState.flowState === 'VOID'),
    canReview:
      !!+window.__.env.REACT_APP_PDP_RATING_VISIBLE &&
      ele.orderType !== 'ORDER_SERVICE' &&
      tradeState.flowState === 'COMPLETED' &&
      !ele.storeEvaluateVO,
    canChangeAppoint:
      ele.appointmentNo &&
      tradeState.flowState !== 'COMPLETED' &&
      tradeState.flowState !== 'VOID' &&
      tradeState.payState === 'PAID',
    canCancelAppoint:
      ele.appointmentNo &&
      tradeState.flowState !== 'COMPLETED' &&
      tradeState.flowState !== 'VOID' &&
      tradeState.payState === 'PAID',
    cancelAppointLoading: false,
    canReviewService:
      ele.appointmentNo &&
      tradeState.flowState === 'COMPLETED' &&
      !ele.storeEvaluateVO,
    canViewTrackInfo:
      tradeState.payState === 'PAID' &&
      tradeState.auditState === 'CHECKED' &&
      (tradeState.deliverStatus === 'SHIPPED' ||
        tradeState.deliverStatus === 'PARTIALLY_SHIPPED') &&
      (tradeState.flowState === 'DELIVERED' ||
        tradeState.flowState === 'PARTIALLY_DELIVERED') &&
      ele.tradeDelivers &&
      ele.tradeDelivers.length,
    //兼容feline order 预约状态为 arrived 时可下载发票
    canDownInvoice:
      window.__.env.REACT_APP_CAN_DOWNLOAD_INVOICE &&
      (tradeState.deliverStatus === 'SHIPPED' ||
        tradeState.deliverStatus === 'DELIVERED' ||
        ele.appointmentStatus === 1) &&
      tradeState.invoiceState === 1,
    showOrderDeliverTip:
      (tradeState.payState === 'PAID' &&
        tradeState.auditState === 'CHECKED' &&
        tradeState.deliverStatus === 'SHIPPED' &&
        tradeState.flowState === 'DELIVERED') ||
      (tradeState.deliverStatus === 'PART_SHIPPED' &&
        tradeState.flowState === 'DELIVERED_PART'),
    showOrderCompleteTip:
      tradeState.flowState === 'COMPLETED' &&
      !ele.storeEvaluateVO &&
      ele.tradeEventLogs[0]?.eventType === 'COMPLETED',
    canCancelOrder:
      new Date(handleDateForIos(res.defaultLocalDateTime)).getTime() <
        new Date(handleDateForIos(ele.orderTimeOut)).getTime() &&
      tradeState.flowState === 'AUDIT' &&
      tradeState.deliverStatus === 'NOT_YET_SHIPPED',
    canReturnOrExchange:
      tradeState.deliverStatus === 'SHIPPED' &&
      tradeState.flowState === 'COMPLETED',
    //japan cancel order
    canCancelOrderForJP:
      ['jp'].includes(window.__.env.REACT_APP_COUNTRY) &&
      new Date(handleDateForIos(res.defaultLocalDateTime)).getTime() <
        new Date(handleDateForIos(ele.orderTimeOut)).getTime() &&
      ((ele?.payWay.toUpperCase() === 'COD' &&
        tradeState.flowState === 'INIT') ||
        (ele?.payWay.toUpperCase() === 'COD' && tradeState.payState === 'PAID'))
  });
}
