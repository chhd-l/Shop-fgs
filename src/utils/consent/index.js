import stores from '@/store';
import { findUserConsentList, getStoreOpenConsentList } from '@/api/consent';
const { loginStore, checkoutStore } = stores;

const { isLogin, userInfo } = loginStore;
const customerId = userInfo?.customerId;

function isExistListFun(result) {
  let listData = [];

  let optionalList = result.context.optionalList.map((item) => {
    return {
      id: item.id,
      consentTitle: item.consentTitle,
      isChecked: false,
      isRequired: false,
      detailList: item.detailList
    };
  });
  let requiredList = result.context.requiredList.map((item) => {
    return {
      id: item.id,
      consentTitle: item.consentTitle,
      isChecked: false,
      isRequired: true,
      detailList: item.detailList
    };
  });

  if (
    !isLogin &&
    (process.env.REACT_APP_COUNTRY == 'us' ||
      process.env.REACT_APP_COUNTRY == 'ru')
  ) {
    listData = [...requiredList]; //美国,俄罗斯游客只显示必选项
  } else if (process.env.REACT_APP_COUNTRY == 'ru') {
    listData = [...requiredList]; //俄罗斯-会员-必填项
  } else if (process.env.REACT_APP_COUNTRY == 'tr') {
    let cConsent = result.context.requiredList
      .filter((item) => {
        return item.consentDesc == 'RC_DF_TR_FGS_PRIVACY_POLICY';
      })
      .map((item2) => {
        return {
          id: item2.id,
          consentTitle: item2.consentTitle,
          isChecked: true,
          isRequired: true,
          detailList: item2.detailList,
          noChecked: true
        };
      });
    let aConsent = result.context.requiredList
      .filter((item) => {
        return item.consentDesc == 'RC_DF_TR_FGS_A';
      })
      .map((item2) => {
        return {
          id: item2.id,
          consentTitle: item2.consentTitle,
          isChecked: false,
          isRequired: true,
          detailList: item2.detailList,
          desc: item2.consentDesc
        };
      });
    let bConsent = result.context.requiredList
      .filter((item) => {
        return item.consentDesc == 'RC_DF_TR_FGS_B';
      })
      .map((item2) => {
        return {
          id: item2.id,
          consentTitle: item2.consentTitle,
          isChecked: false,
          isRequired: true,
          detailList: item2.detailList,
          desc: item2.consentDesc
        };
      });
    let dConsent = result.context.requiredList
      .filter((item) => {
        return item.consentDesc == 'RC_DF_TR_TRANSFER_DATA';
      })
      .map((item2) => {
        return {
          id: item2.id,
          consentTitle: `<span class="medium ui-cursor-pointer-pure" style="padding-bottom: 2px;
              border-bottom: 1px solid #ccc;color:#666" id="tr_consent_d">Yurtdışına Veri Aktarımı Açık Rıza Metni</span>ni okudum. Kişisel verilerimin Türkiye dışına transfer edilmesini onaylıyorum`, //特殊处理，这里需要替换成本地的文字
          isChecked: false,
          isRequired: true,
          detailList: item2.detailList
        };
      });

    listData = [...cConsent, ...aConsent, ...bConsent, ...dConsent];
  } else {
    listData = [...requiredList, ...optionalList]; //必填项+选填项
  }

  return listData;
}

const ConsentData = async (props) => {
  let params = {};
  // add subscriptionPlan consent
  let subscriptionPlanIds = checkoutStore.loginCartData?.filter(
    (item) => item.subscriptionPlanId?.length > 0
  );
  let groups = subscriptionPlanIds.map((item) => {
    return {
      consentGroup: 'subscription-plan',
      itemId: item.subscriptionPlanId
    };
  });
  if (isLogin) {
    const oktaTokenString = props.authState.accessToken
      ? props.authState.accessToken.value
      : '';
    let oktaToken = 'Bearer ' + oktaTokenString;
    params = { customerId, consentPage: 'check out', oktaToken: oktaToken };
  } else {
    params = { consentPage: 'check out' };
  }
  if (groups) {
    params.groups = groups;
  }
  let res = '';

  try {
    res = await (isLogin ? findUserConsentList : getStoreOpenConsentList)(
      params
    );
  } catch (err) {
    console.log(err.message);
  }
  if (res) {
    return isExistListFun(res);
  }
};

export default ConsentData;
