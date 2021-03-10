export const paymentMethodsConfig = {
  shopperReference: 'Checkout Components sample code test',
  reference: 'Checkout Components sample code test',
  countryCode: process.env.REACT_APP_Adyen_country || 'NL',
  amount: {
    value: 1000,
    currency: 'EUR'
  }
};

export const paymentsDefaultConfig = {
  shopperReference: 'Checkout Components sample code test',
  reference: 'Checkout Components sample code test',
  countryCode:  process.env.REACT_APP_Adyen_country || 'NL',
  channel: 'Web',
  returnUrl: 'https://your-company.com/',
  amount: {
    value: 1000,
    currency: 'EUR'
  },
  lineItems: [
    {
      id: '1',
      description: 'Test Item 1',
      amountExcludingTax: 10000,
      amountIncludingTax: 11800,
      taxAmount: 1800,
      taxPercentage: 1800,
      quantity: 1,
      taxCategory: 'High'
    }
  ]
};

// Generic POST Helper
export const httpPost = (endpoint, data) =>
  fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => response.json());

// Get all available payment methods from the local server
export const getPaymentMethods = () =>
  httpPost('paymentMethods', paymentMethodsConfig)
    .then((response) => {
      if (response.error) throw new error('No paymentMethods available');

      return response;
    })
    .catch(console.error);

// Posts a new payment into the local server
export const makePayment = (paymentMethod, config = {}) => {
  const paymentsConfig = { ...paymentsDefaultConfig, ...config };
  const paymentRequest = { ...paymentsConfig, ...paymentMethod };

  return httpPost('payments', paymentRequest)
    .then((response) => {
      if (response.error) throw new Error('Payment initiation failed');

      return response;
    })
    .catch(console.error);
};

// Fetches an originKey from the local server
export const getOriginKey = () =>
  httpPost('originKeys')
    .then((response) => {
      if (response.error || !response.originKeys)
        throw new Error('No originKey available');

      return response.originKeys[Object.keys(response.originKeys)[0]];
    })
    .catch(console.error);

/////////////////////////////////////////////////

// qhx新增  获取adyen分支
export const getAdyenParam = (cardData, config = {}) => {
  let {
    storePaymentMethod,
    paymentMethod: {
      encryptedCardNumber,
      encryptedExpiryMonth,
      encryptedExpiryYear,
      encryptedSecurityCode,
      holderName
    }
  } = cardData;

  let parameters = {
    // adyenBrands: 'visa',
    // adyenName: 'Credit Card',
    adyenType: 'scheme',
    hasHolderName: holderName,
    enableStoreDetails: storePaymentMethod
  };

  let param = {
    ...parameters,
    encryptedCardNumber,
    encryptedExpiryMonth,
    encryptedExpiryYear,
    encryptedSecurityCode
  };
  return param;
};
