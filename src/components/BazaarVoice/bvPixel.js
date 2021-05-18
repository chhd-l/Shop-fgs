import { loadJS } from '../../utils/utils';

//type:
//1、Transactions—Product purchases. These events are captured if you implement BV Pixel on the order confirmation page.
export function transactionPixel(
  transactionInfo = {
    currency: 'USD',
    orderId: '',
    total: '',
    items: [
      { price: '', quantity: '', productId: '', optional_item_parameter: '' }
    ],
    optional_order_parameter: '',
    optional_PII_parameter: ''
  }
) {
  // if (!!+process.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS) {
  loadJS({
    code: `window.bvCallback = function (BV) {
    BV.pixel.trackTransaction({
    "currency" : ${transactionInfo.currency},
    "orderId" : ${transactionInfo.orderId},
    "total" : ${transactionInfo.total},
    "items" :${transactionInfo.item},
    "optional_order_parameter" : ${transactionInfo['optional_order_parameter']},
    ...
    "optional_PII_parameter" : ${transactionInfo['optional_PII_parameter']},
    ...
  });
};`
  });
  // }
}
