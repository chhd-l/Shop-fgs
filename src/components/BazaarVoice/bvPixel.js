import { loadJS } from '../../utils/utils';

//type:
//1、Transactions—Product purchases. These events are captured if you implement BV Pixel on the order confirmation page.
export function transactionPixel(details) {
  console.log(details);
  const items = details.tradeItems.map((item) => {
    return {
      price: String(item.price.toFixed(2)),
      quantity: String(item.num.toFixed(2)),
      productId: item.spuNo,
      optional_item_parameter: {
        name: item.spuName
      }
    };
  });
  const transactionInfo = {
    currency: process.env.REACT_APP_CURRENCY,
    orderId: details.id || '',
    total: String(details.tradePrice.totalPrice.toFixed(2)) || '',
    items: items || { price: '', quantity: '', productId: '' },
    // optional_order_parameter: '',
    email: details.consignee.email || '',
    locale: 'en_US',
    nickname: details.consignee.name || '',
    userId: details.consignee.id || '',
    optional_PII_parameter: {
      email: details.consignee.email || '',
      locale: 'en_US',
      nickname: details.consignee.name || '',
      userId: details.consignee.id || ''
    }
  };
  loadJS({
    code: `window.bvCallback = function (BV) {
    BV.pixel.trackTransaction(${JSON.stringify(transactionInfo)});
};`
  });
}
