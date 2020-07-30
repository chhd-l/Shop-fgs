import axios from "axios"
const url = 'http://localhost:3001'


export const paymentMethodsConfig = {
    shopperReference: 'Checkout Components sample code test',
    reference: 'Checkout Components sample code test',
    countryCode: 'NL',
    amount: {
        value: 1000,
        currency: 'EUR'
    }
};

export const paymentsDefaultConfig = {
    shopperReference: 'Checkout Components sample code test',
    reference: 'Checkout Components sample code test',
    countryCode: 'NL',
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
    fetch(`${url}/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());

// Get all available payment methods from the local server
export const getPaymentMethods = () =>
    httpPost('paymentMethods', paymentMethodsConfig)
        .then(response => {
            if (response.error) throw 'No paymentMethods available';

            return response;
        })
        .catch(console.error);

// Posts a new payment into the local server
export const makePayment = (paymentMethod, config = {}) => {
    const paymentsConfig = { ...paymentsDefaultConfig, ...config };
    const paymentRequest = { ...paymentsConfig, ...paymentMethod };


    return httpPost('payments', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';

            return response;
        })
        .catch(console.error);
};

// Posts a new adyenPayment into the local server
export const makeAdyenPayment = (cardData, config = {}) => {
    let {paymentMethod:{encryptedCardNumber,encryptedExpiryMonth,encryptedExpiryYear,encryptedSecurityCode}} = cardData
    // const paymentsConfig = { ...paymentsDefaultConfig, ...config };
    // const paymentRequest = { ...paymentsConfig, ...paymentMethod };

    let parameters = {
        currency:'EUR',
        adyenBrands:'visa',
        adyenName:'Credit Card',
        adyenType:'scheme',
        payChannelItem:'adyen',
    }
    let param = {...parameters,encryptedCardNumber,encryptedExpiryMonth,encryptedExpiryYear,encryptedSecurityCode}
    return param
};

// Fetches an originKey from the local server
export const getOriginKey = () =>
    httpPost('originKeys')
        .then(response => {
            if (response.error || !response.originKeys) throw 'No originKey available';

            return response.originKeys[Object.keys(response.originKeys)[0]];
        })
        .catch(console.error);

export const axiosGetOriginKey = (domain)=> {
    return axios({
        url: 'https://checkout-test.adyen.com/originKeys',
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'X-API-Key':'AQErhmfuXNWTK0Qc+iSdk3YrjuqYR5ldAoFLTGBSrF51ENJOAzIOrvI655613hDBXVsNvuR83LVYjEgiTGAH-1IAk3WNsFHn9OQTCs1zqAgfITuuhrk2BSWACax6iq4g=-~7C;smxATY88pe*7'
        },
        data: { originDomains:[domain] }
    })
}