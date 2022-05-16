import {
  confirmAndCommit,
  confirmAndCommitFelin,
  customerCommitAndPay,
  rePay,
  rePayFelin
} from '@/api/payment';
import { FormattedMessage } from 'react-intl-phraseapp';
import { LOGO_POINT } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import React from 'react';

const sessionItemRoyal = window.__.sessionItemRoyal;

//根据不同的条件判断走哪个支付接口
export const payAction = (isTid, isLogin, buyWay, isFelin) => {
  let action;
  const actions = () => {
    const rePayFun = () => {
      action = rePay;
    }; // 存在订单号
    const customerCommitAndPayFun = () => {
      action = customerCommitAndPay;
    }; //会员
    const confirmAndCommitFun = () => {
      action = confirmAndCommit;
    }; //游客
    const confirmAndCommitFelinFun = () => {
      action = confirmAndCommitFelin;
    }; //felin
    const rePayFelinFun = () => {
      action = rePayFelin;
    }; //repayFelin
    return new Map([
      [
        {
          isTid: /^true$/i,
          isLogin: /.*/,
          buyWay: /.*/,
          isFelin: /^true$/i
        },
        rePayFelinFun
      ],
      [
        {
          isTid: /^true$/i,
          isLogin: /.*/,
          buyWay: /.*/,
          isFelin: /^false$/i
        },
        rePayFun
      ],
      [
        {
          isTid: /^false$/i,
          isLogin: /^true$/i,
          buyWay: /.+/,
          isFelin: /^false$/i
        },
        customerCommitAndPayFun
      ],
      [
        {
          isTid: /^false$/i,
          isLogin: /^false$/i,
          buyWay: /.*/,
          isFelin: /^false$/i
        },
        confirmAndCommitFun
      ],
      [
        {
          isTid: /^false$/i,
          isLogin: /.*/,
          buyWay: /.*/,
          isFelin: /^true$/i
        },
        confirmAndCommitFelinFun
      ]
    ]);
  };
  const payFun = (isTid, isLogin, buyWay, isFelin) => {
    let action = [...actions()].filter(
      ([key, value]) =>
        key.isTid.test(isTid) &&
        key.isLogin.test(isLogin) &&
        key.buyWay.test(buyWay) &&
        key.isFelin.test(isFelin)
    );
    action.forEach(([key, value]) => value.call(this));
  };
  payFun(isTid, isLogin, buyWay, isFelin);
  return action;
};

//根据不同的支付方式处理不同的支付结果
export const handlePayResult = (tidList, type, res, isLogin, paypalAccount) => {
  let subOrderNumberList = []; // 拆单时，子订单号
  let subNumber; // 订阅订单号
  let oxxoPayUrl;
  let gotoConfirmationPage = false;
  let adyenAction = '';

  //adyen_swish this.setState太多，以及处理事项太多，单独处理
  switch (type) {
    case 'oxxo':
      const oxxoContent = res.context;
      oxxoPayUrl = oxxoContent?.args?.additionalDetails?.data[0]?.href || '';
      subOrderNumberList = tidList.length
        ? tidList
        : oxxoContent && oxxoContent.tidList;
      gotoConfirmationPage = true;
      break;
    case 'payUCreditCardRU':
    case 'payUCreditCardTU':
    case 'payUCreditCard':
    case 'cod':
    case 'cod_japan':
      subOrderNumberList = tidList.length
        ? tidList
        : res.context && res.context.tidList;
      subNumber = (res.context && res.context.subscribeId) || '';

      if (res.context.redirectUrl) {
        window.location.href = res.context.redirectUrl;
      } else {
        gotoConfirmationPage = true;
      }
      break;
    case 'adyenOxxo':
      subOrderNumberList =
        tidList.length && tidList[0]
          ? tidList
          : res.context && res.context.tidList;
      subNumber = (res.context && res.context.subscribeId) || '';

      if (res.context.redirectUrl) {
        let adyenOxxoAction = res.context.redirectUrl;
        if (adyenOxxoAction) {
          sessionItemRoyal.set('adyenOxxoAction', adyenOxxoAction);
        }
        gotoConfirmationPage = true;
      }
      break;
    case 'adyenCard':
      subOrderNumberList =
        tidList.length && tidList[0]
          ? tidList
          : res.context && res.context.tidList;
      subNumber = (res.context && res.context.subscribeId) || '';

      let contextType = Object.prototype.toString
        .call(res.context)
        .slice(8, -1);
      if (contextType === 'Array' && res.context.redirectUrl) {
        //正常时候,res.context后台返回数组
        adyenAction = JSON.parse(res.context.redirectUrl);
      } else if (contextType === 'Object' && res.context.redirectUrl) {
        //会员repay时，res.context后台返回对象
        adyenAction = JSON.parse(res.context.redirectUrl);
      } else {
        //正常卡
        gotoConfirmationPage = true;
      }
      break;
    case 'adyenKlarnaPayLater':
    case 'adyenKlarnaPayNow':
    case 'directEbanking':
    case 'adyenPaypal':
      subOrderNumberList = res.context.tidList;
      // 给klana支付跳转用
      if (res.context.tid) {
        sessionItemRoyal.set('orderNumber', res.context.tid);
      }
      if (res.context.redirectUrl && !paypalAccount) {
        //已经绑定过paypal账号的不跳转链接，直接进入confirmation page
        window.location.href = res.context.redirectUrl;
      }
      if (paypalAccount) {
        subOrderNumberList = tidList.length
          ? tidList
          : res.context && res.context.tidList;
        subNumber = (res.context && res.context.subscribeId) || '';
        gotoConfirmationPage = true;
      }
      break;
    case 'cyber':
      subOrderNumberList =
        tidList.length && tidList[0]
          ? tidList
          : res.context && res.context.tidList;
      subNumber = (res.context && res.context.subscribeId) || '';
      gotoConfirmationPage = true;
      break;
    case 'adyen_convenience_store':
      subOrderNumberList = tidList.length
        ? tidList
        : res.context && res.context.tidList;
      subNumber = (res.context && res.context.subscribeId) || '';
      gotoConfirmationPage = true;
      break;
    default:
      break;
  }
  return {
    subOrderNumberList,
    subNumber,
    oxxoPayUrl,
    gotoConfirmationPage,
    adyenAction
  };
};

const ShowUsePoint = () => {
  return (
    <div className="col-12 col-md-6 flex items-center pt-1 pb-3">
      <LazyLoad>
        <img src={LOGO_POINT} className="w-5 ml-8 mr-2" />
      </LazyLoad>
      <span className="font-medium">
        <FormattedMessage id="usePoints" />
      </span>
    </div>
  );
};

//根据不同的支付方式处理不同的支付参数
export const handlePayParams = async (
  commonParameter,
  email,
  isLogin,
  installMentParam,
  adyenPayParam,
  browserInfo,
  isSkipPaymentPanel,
  paypalCardId,
  cyberPayParam,
  convenienceStore,
  handlePAYUCheckoutParams,
  type,
  phone
) => {
  let parameters;
  const actions = {
    oxxo: () => {
      parameters = Object.assign({}, commonParameter, {
        payPspItemEnum: 'PAYU_OXXO',
        country: 'MEX',
        email
      });
    },
    payUCreditCard: async () => {
      parameters = await handlePAYUCheckoutParams({
        commonParameter,
        parameters,
        payPspItemEnum: 'PAYU_CREDIT_CARD',
        country: 'MEX'
      });
    },
    payUCreditCardRU: async () => {
      parameters = await handlePAYUCheckoutParams({
        commonParameter,
        parameters: parameters,
        payPspItemEnum: isLogin ? 'PAYU_RUSSIA_AUTOSHIP2' : 'PAYU_RUSSIA',
        country: 'RUS'
      });
    },
    payUCreditCardTU: async () => {
      let installments;
      if (installMentParam) {
        installments = installMentParam.installmentNumber;
      }
      parameters = await handlePAYUCheckoutParams({
        commonParameter,
        parameters,
        payPspItemEnum: isLogin ? 'PAYU_TURKEY_AUTOSHIP2' : 'PAYU_TURKEY',
        country: 'TUR',
        installments,
        installmentPrice: installMentParam
      });
    },
    cod: () => {
      parameters = Object.assign(commonParameter, {
        payPspItemEnum: 'PAYU_RUSSIA_COD'
      });
    },
    cod_japan: () => {
      parameters = Object.assign(commonParameter, {
        payPspItemEnum: 'JAPAN_COD'
      });
    },
    adyenCard: () => {
      parameters = Object.assign(commonParameter, {
        browserInfo: browserInfo,
        encryptedSecurityCode: adyenPayParam?.encryptedSecurityCode || '',
        payPspItemEnum:
          sessionItemRoyal.get('goodWillFlag') === 'GOOD_WILL' ||
          isSkipPaymentPanel
            ? 'ZEROPRICE'
            : 'ADYEN_CREDIT_CARD'
      });
      if (adyenPayParam?.paymentToken) {
        parameters = Object.assign(parameters, {
          paymentMethodId: adyenPayParam.id
        });
      } else {
        parameters = Object.assign(parameters, {
          ...adyenPayParam
        });
      }
    },
    adyenKlarnaPayLater: () => {
      parameters = Object.assign(commonParameter, {
        adyenType: 'klarna',
        payPspItemEnum: 'ADYEN_KLARNA_PAY_LATER',
        email
      });
    },
    adyenKlarnaPayNow: () => {
      parameters = Object.assign(commonParameter, {
        adyenType: 'klarna_paynow',
        payPspItemEnum: 'ADYEN_KLARNA_PAYNOW',
        email
      });
    },
    directEbanking: () => {
      parameters = Object.assign(commonParameter, {
        adyenType: 'directEbanking',
        payPspItemEnum: 'ADYEN_SOFORT',
        email
      });
    },
    adyenOxxo: () => {
      parameters = Object.assign(commonParameter, {
        payPspItemEnum: 'ADYEN_OXXO',
        email
      });
    },
    adyenPaypal: () => {
      parameters = Object.assign(commonParameter, {
        adyenType: 'paypal',
        payPspItemEnum: 'ADYEN_PAYPAL',
        paymentMethodId: paypalCardId
      });
    },
    adyen_swish: () => {
      parameters = Object.assign(commonParameter, {
        adyenType: 'swish',
        payPspItemEnum: 'ADYEN_SWISH'
      });
    },
    cyber: () => {
      parameters = Object.assign({}, commonParameter, {
        payPspItemEnum: 'CYBER',
        paymentMethodId: cyberPayParam.id,
        securityCode: cyberPayParam.cardCvv,
        accessToken: cyberPayParam.accessToken
      });
    },
    adyen_convenience_store: () => {
      parameters = Object.assign(commonParameter, {
        payPspItemEnum: 'ADYEN_CONVENIENCE_STORE',
        adyenType: 'convenience store',
        adyenConvenienceStorePayType:
          convenienceStore === 'Seven-Eleven'
            ? 'econtext_seven_eleven'
            : 'econtext_stores',
        adyenConvenienceStoreName: convenienceStore
      });
    }
  };
  await actions[type]();
  //合并支付必要的参数
  let finalParam = Object.assign(parameters, {
    /**
     * redirectUrl & successUrl
     * 1. handle callback through successUrl(which is included /api, it used nginx to intercep api router, and then redirect to related shop page) -> adyenCard
     * 2. /PayResult, handle callback at this router -> adyenKlarnaPayLater/adyenKlarnaPayNow/directEbanking
     * 3. /Payu3dsPayResult, handle callback at this router -> payUCreditCardRU/payUCreditCardTU
     */
    successUrl: window.__.env.REACT_APP_BASEURL, // /api
    redirectUrl: process.env.REACT_APP_3DS_REDIRECT_URL || '',
    deliveryAddressId: this.state.deliveryAddress?.addressId,
    billAddressId: this.state.billingAddress?.addressId,
    phone
  });
  return finalParam;
};
