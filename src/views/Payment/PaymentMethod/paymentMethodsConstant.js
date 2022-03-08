// name:后台返回的支付方式，langKey：翻译id，paymentTypeVal：前端选择的支付方式，作为用来判断的变量
export const paymentMethodsObj = {
  PAYU: {
    name: 'payu',
    langKey: 'creditCard',
    paymentTypeVal: 'payUCreditCard'
  },
  PAYU_RU: {
    name: 'payu_ru',
    langKey: 'creditCard',
    paymentTypeVal: 'payUCreditCardRU'
  },
  PAYU_TU: {
    name: 'payu_tu',
    langKey: 'creditCard',
    paymentTypeVal: 'payUCreditCardTU'
  },
  COD: {
    name: 'payu_cod',
    langKey: 'cod',
    paymentTypeVal: 'cod'
  },
  cod_japan: {
    name: 'cod_japan',
    langKey: 'cashOnDelivery',
    paymentTypeVal: 'cod_japan'
  },
  PAYUOXXO: { name: 'payuoxxo', langKey: 'oxxo', paymentTypeVal: 'oxxo' },
  adyen_credit_card: {
    name: 'adyen_credit_card',
    langKey: 'adyenCard',
    paymentTypeVal: 'adyenCard'
  },
  adyen_klarna_pay_now: {
    name: 'adyen_klarna_pay_now',
    langKey: 'adyenPayNow',
    paymentTypeVal: 'adyenKlarnaPayNow'
  },
  adyen_klarna_pay_later: {
    name: 'adyen_klarna_pay_lat',
    langKey: 'adyenPayLater',
    paymentTypeVal: 'adyenKlarnaPayLater'
  },
  directEbanking: {
    name: 'directEbanking',
    langKey: 'sofort',
    paymentTypeVal: 'directEbanking'
  },
  adyen_oxxo: {
    name: 'adyen_oxxo',
    langKey: 'oxxo',
    paymentTypeVal: 'adyenOxxo'
  },
  adyen_paypal: {
    name: 'adyen_paypal',
    langKey: 'paypal',
    paymentTypeVal: 'adyenPaypal'
  },
  pc_web: {
    name: 'cyber',
    langKey: 'cyber',
    paymentTypeVal: 'cyber'
  },
  adyen_swish: {
    name: 'adyen_swish',
    langKey: 'Swish',
    paymentTypeVal: 'adyen_swish'
  },
  adyen_convenience_store: {
    name: 'adyen_convenience_store',
    langKey: 'Convenience Store',
    paymentTypeVal: 'adyen_convenience_store'
  }
};

export const radioTypes = {
  fr: 'box',
  uk: 'box',
  se: 'box',
  jp: 'box',
  default: 'circle'
};
