import {
  fetchAdyenOriginClientKey,
  fetchAdyenOriginClientKeyV2
} from '@/api/payment';

const sessionItemRoyal = window.__.sessionItemRoyal;

export const getPaymentConf = async () => {
  let adyenOriginKeyConf = sessionItemRoyal.get('payment-originkey-conf')
    ? JSON.parse(sessionItemRoyal.get('payment-originkey-conf'))
    : [];
  if (!adyenOriginKeyConf.length) {
    const { context } = await fetchAdyenOriginClientKeyV2();
    adyenOriginKeyConf = context.originClientKeysList;
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
