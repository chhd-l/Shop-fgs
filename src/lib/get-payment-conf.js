import { fetchAdyenOriginClientKeyV2 } from '@/api/payment';

const sessionItemRoyal = window.__.sessionItemRoyal;

export const getPaymentConf = async () => {
  let adyenOriginKeyConf = sessionItemRoyal.get('payment-originkey-conf')
    ? JSON.parse(sessionItemRoyal.get('payment-originkey-conf'))
    : [];
  if (!adyenOriginKeyConf.length) {
    // 先读取店铺基础配置，若没有，再请求client-key接口
    if (
      false &&
      window.__.env.REACT_APP_Adyen_locale &&
      window.__.env.REACT_APP_AdyenOriginKEY &&
      window.__.env.REACT_APP_Adyen_ENV
    ) {
      adyenOriginKeyConf = [
        {
          pspItemCode: 'adyen_credit_card',
          locale: window.__.env.REACT_APP_Adyen_locale,
          openPlatformSecret: window.__.env.REACT_APP_AdyenOriginKEY,
          environment: window.__.env.REACT_APP_Adyen_ENV
        }
      ];
    } else {
      const { context } = await fetchAdyenOriginClientKeyV2();
      adyenOriginKeyConf = context.originClientKeysList;
    }

    sessionItemRoyal.set(
      'payment-originkey-conf',
      JSON.stringify(adyenOriginKeyConf)
    );

    // if (!context?.openPlatformSecret) {
    //   console.warn(
    //     'Info: adyen origin key is null, please configure it in the portal side.'
    //   );
    // }
    // // 本地环境使用生成的key，其他环境使用接口所配置的值
    // adyenOriginKeyConf = {
    //   originKey: context?.openPlatformSecret,
    //   env: context?.appId2,
    //   locale: context?.openPlatformAppId || 'es_ES',
    //   shopperLocale: context?.shopperLocale
    // };
  }
  return adyenOriginKeyConf;
};

export default getPaymentConf;
