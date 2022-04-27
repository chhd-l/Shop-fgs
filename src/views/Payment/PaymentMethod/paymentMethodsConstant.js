// name:后台返回的支付方式，paymentTypeVal：前端选择的支付方式，作为用来判断的变量
export const paymentMethodsObj = {
  // 1 2
  PAYU: {
    name: 'payu',
    paymentTypeVal: 'payUCreditCard'
  },
  // 1 2
  PAYU_RU: {
    name: 'payu_ru',
    paymentTypeVal: 'payUCreditCardRU'
  },
  // 1 2
  PAYU_TU: {
    name: 'payu_tu',
    paymentTypeVal: 'payUCreditCardTU'
  },
  // 1 2
  COD: {
    name: 'payu_cod',
    paymentTypeVal: 'cod'
  },
  // 1 2
  cod_japan: {
    name: 'cod_japan',
    paymentTypeVal: 'cod_japan'
  },
  // 1 2
  PAYUOXXO: { name: 'payuoxxo', paymentTypeVal: 'oxxo' },
  // 1 2
  adyen_credit_card: {
    name: 'adyen_credit_card',
    paymentTypeVal: 'adyenCard'
  },
  // 1 2
  adyen_klarna_pay_now: {
    name: 'adyen_klarna_pay_now',
    paymentTypeVal: 'adyenKlarnaPayNow'
  },
  // 1 2
  adyen_klarna_pay_later: {
    name: 'adyen_klarna_pay_lat',
    paymentTypeVal: 'adyenKlarnaPayLater'
  },
  // 1 2
  directEbanking: {
    name: 'directEbanking',
    paymentTypeVal: 'directEbanking'
  },
  // 1 2
  adyen_oxxo: {
    name: 'adyen_oxxo',
    paymentTypeVal: 'adyenOxxo'
  },
  // 1 2
  adyen_paypal: {
    name: 'adyen_paypal',
    paymentTypeVal: 'adyenPaypal'
  },
  // 1 不显示
  pc_web: {
    name: 'cyber',
    paymentTypeVal: 'cyber'
  },
  // 1
  adyen_swish: {
    name: 'adyen_swish',
    paymentTypeVal: 'adyen_swish'
  },
  // 1
  adyen_convenience_store: {
    name: 'adyen_convenience_store',
    paymentTypeVal: 'adyen_convenience_store'
  }
};

//支付方式渲染形式 box/circle
export const radioTypes = {
  fr: 'box',
  uk: 'box',
  se: 'box',
  jp: 'box',
  default: 'circle'
};

export const initDeliveryAddress = {
  firstName: '',
  lastName: '',
  email: '',
  birthdate: '',
  address1: '',
  address2: '',
  country: '',
  countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
  cityId: '',
  city: '',
  area: '',
  areaId: '',
  regionId: '',
  region: '',
  provinceNo: '',
  provinceId: '',
  province: '',
  stateId: '',
  postCode: '',
  phoneNumber: '',
  entrance: '',
  apartment: '',
  street: '',
  house: '',
  housing: '',
  comment: '',
  minDeliveryTime: 0,
  maxDeliveryTime: 0,
  DuData: null, // 俄罗斯DuData
  formRule: [], // form表单校验规则
  receiveType: ''
};

export const initBillingAddress = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  rfc: '',
  entrance: '',
  apartment: '',
  comment: '',
  countryId: window.__.env.REACT_APP_DEFAULT_COUNTRYID || '',
  country: '',
  cityId: '',
  city: '',
  postCode: '',
  phoneNumber: ''
};

export const felinAddr = [
  {
    address1: '142 BOULEVARD SAINT GERMAIN',
    address2: '',
    alert: null,
    apartment: '',
    area: '',
    areaId: 0,
    areaIdStr: '',
    canDelFlag: true,
    city: 'PARIS',
    cityId: 0,
    cityIdStr: '',
    comment: '',
    country: 'FR',
    countryId: 2612,
    county: null,
    delFlag: 0,
    deliveryAddress: '142 BOULEVARD SAINT GERMAIN',
    addressId: 'feline_config_2021110810081234',
    deliveryAddressId: 'feline_config_2021110810081234',
    deliveryDate: '',
    email: '',
    entrance: '',
    house: '',
    housing: '',
    isDefaltAddress: 0,
    isValidated: null,
    paymentMethods: null,
    pickupCode: null,
    pickupDescription: null,
    pickupName: null,
    pickupPrice: null,
    postCode: '75006',
    province: '',
    provinceCode: null,
    provinceId: null,
    provinceIdStr: '',
    receiveType: 'HOME_DELIVERY',
    rfc: '',
    settlement: null,
    settlementIdStr: '',
    sfccCityCode: null,
    state: null,
    street: '',
    timeSlot: '',
    type: 'DELIVERY',
    validFlag: 1,
    workTime: '',
    firstName: '',
    lastName: '',
    consigneeName: '',
    consigneeNumber: ''
  }
];

//支持积分
export const supportPoint = {
  jp: true,
  default: false
};

export const NOTUSEPOINT = 'notUsePoint';

export const USEPOINT = 'usePoint';
