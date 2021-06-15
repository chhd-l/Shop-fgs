import { loadJS } from '../../utils/utils';

//type:
//1、Transactions—Product purchases. These events are captured if you implement BV Pixel on the order confirmation page.
export function transactionPixel(details) {
  console.log(details);
  const items = details.tradeItems.map((item) => {
    return {
      price: String(item.originalPrice.toFixed(2)),
      quantity: String(item.num),
      productId: item.spuNo
    };
  });
  const transactionInfo = {
    currency: process.env.REACT_APP_CURRENCY,
    orderId: details.id,
    total: String(details.tradePrice.totalPrice.toFixed(2)),
    items: items,
    //shippingDate: details.orderTimeOut.split(' ')[0],
    shippingDate: details.tradeState.createTime.split(' ')[0],
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
