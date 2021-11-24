import { fetchAdyenOriginClientKey } from '@/api/payment';

const sessionItemRoyal = window.__.sessionItemRoyal;

export const getAdyenConf = async () => {
  let adyenOriginKeyConf = sessionItemRoyal.get('adyen-originkey-conf')
    ? JSON.parse(sessionItemRoyal.get('adyen-originkey-conf'))
    : null;
  if (!adyenOriginKeyConf) {
    const { context } = await fetchAdyenOriginClientKey();
    if (!context?.openPlatformSecret) {
      console.warn(
        'Info: adyen origin key is null, please configure it in the portal side.'
      );
    }
    // 本地环境使用生成的key，其他环境使用接口所配置的值
    adyenOriginKeyConf = {
      originKey: context?.openPlatformSecret,
      env: context?.appId2,
      locale: context?.openPlatformAppId || 'en-US',
      shopperLocale: context?.shopperLocale
    };
  }
  return adyenOriginKeyConf;
};

export default getAdyenConf;
