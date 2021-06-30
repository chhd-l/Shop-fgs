import { loadJS } from '../../utils/utils';

//type:
//1、Transactions—Product purchases.
// These events are captured if you implement BV Pixel on the order confirmation page.
export function transactionPixel(details) {
  console.log(details);
  const items = details.tradeItems.map((item) => {
    return {
      price: item.subscriptionStatus
        ? String((item.subscriptionPrice * item.num).toFixed(2))
        : String(item.splitPrice.toFixed(2)),
      quantity: '1',
      productId: item.spuNo,
      name: item.spuName,
      shippingDate: details.tradeState.createTime.split(' ')[0]
    };
  });
  const transactionInfo = {
    currency: window.__.env.REACT_APP_CURRENCY,
    orderId: details.id,
    total: String(details.tradePrice.goodsPrice.toFixed(2)),
    items: items,
    // tax: String(details.tradePrice.taxFeePrice.toFixed(2)),
    shippingDate: details.tradeState.createTime.split(' ')[0],
    // discount: String(details.tradePrice.promotionDiscountPrice.toFixed(2)),
    email: details.consignee.email,
    locale: 'en_US',
    nickname: details.consignee.name,
    userId: details.consignee.id
  };
  loadJS({
    code: `window.bvCallback = function (BV) {
    BV.pixel.trackTransaction(${JSON.stringify(transactionInfo)});
};`
  });
}
