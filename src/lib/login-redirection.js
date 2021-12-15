import { distributeLinktoPrecriberOrPaymentPage } from '@/utils/utils';
import { getProductPetConfig } from '@/api/payment';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

const loginRedirection = async ({
  clinicStore,
  configStore,
  checkoutStore,
  history,
  isLogin
}) => {
  const {
    loginCartData,
    cartData,
    setLoginCartData,
    setCartData,
    setAuditData,
    setAutoAuditFlag,
    setPetFlag
  } = checkoutStore;
  const tmpUrl = localItemRoyal.get('okta-redirectUrl')
    ? localItemRoyal.get('okta-redirectUrl')
    : '/';
  if (tmpUrl === '/prescription' || tmpUrl === '/cart') {
    let autoAuditFlag = false;
    let paramData = isLogin
      ? loginCartData
      : cartData.map((el) => {
          el.goodsInfoId = el.sizeList.filter(
            (item) => item.selected
          )[0].goodsInfoId;
          return el;
        });
    let res = await getProductPetConfig({
      goodsInfos: paramData
    });
    let handledData = paramData.map((el, i) => {
      el.auditCatFlag = res.context.goodsInfos[i]['auditCatFlag'];
      el.prescriberFlag = res.context.goodsInfos[i]['prescriberFlag'];
      return el;
    });
    isLogin ? setLoginCartData(handledData) : setCartData(handledData);
    let AuditData = handledData.filter((el) => el.auditCatFlag);
    setAuditData(AuditData);
    autoAuditFlag = res.context.autoAuditFlag;
    setAutoAuditFlag(autoAuditFlag);
    setPetFlag(res.context.petFlag);
    const url = await distributeLinktoPrecriberOrPaymentPage({
      configStore,
      checkoutStore,
      clinicStore,
      isLogin
    });
    url && history.push(url);
    // history.push('/prescription');
  } else {
    history.push(tmpUrl);
  }
};

export default loginRedirection;
