//处理order list item
export function handleOrderItem(ele, res) {
  const tradeState = ele.tradeState;
  return Object.assign(ele, {
    canPayNow:
      ele.orderCategory !== 'RECURRENT_AUTOSHIP' &&
      tradeState.flowState === 'INIT' &&
      tradeState.auditState === 'NON_CHECKED' &&
      tradeState.payState === 'NOT_PAID' &&
      new Date(ele.orderTimeOut).getTime() >
        new Date(res.defaultLocalDateTime).getTime() &&
      (!ele.payWay ||
        !['OXXO', 'ADYEN_OXXO', 'COD'].includes(ele.payWay.toUpperCase())), // orderCategory为RECURRENT_AUTOSHIP为refill订单，需要隐藏repay按钮
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
      !ele.appointmentNo &&
      !ele.tradeItems?.find((el) => el.goodsInfoFlag === 3) &&
      (tradeState.flowState === 'COMPLETED' || tradeState.flowState === 'VOID'), // goodsInfoFlag=3是indv的商品，需要隐藏加入购物车这个按钮
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
    canDownInvoice:
      ['fr'].includes(window.__.env.REACT_APP_COUNTRY) &&
      (tradeState.deliverStatus === 'SHIPPED' ||
        tradeState.deliverStatus === 'DELIVERED') &&
      tradeState.invoiceState === 1
  });
}
