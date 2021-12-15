import { distributeLinktoPrecriberOrPaymentPage } from '@/utils/utils';
import { getProductPetConfig } from '@/api/payment';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

/**
 * 登录链接重定向
 * 1. 当从这两个链接(/prescription /cart-force-to-checkout)登录过来时，自动下单并重定向到checkout
 * 2. 否则重定向到登录之前的页面
 */
const loginRedirection = async ({
  clinicStore,
  configStore,
  checkoutStore,
  history,
  isLogin
}) => {
  const tmpUrl = localItemRoyal.get('okta-redirectUrl')
    ? localItemRoyal.get('okta-redirectUrl')
    : '/';
  if (tmpUrl === '/prescription' || tmpUrl === '/cart-force-to-checkout') {
    let autoAuditFlag = false;
    let paramData = isLogin
      ? checkoutStore.loginCartData
      : checkoutStore.cartData.map((el) => {
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
    isLogin
      ? checkoutStore.setLoginCartData(handledData)
      : checkoutStore.setCartData(handledData);
    let AuditData = handledData.filter((el) => el.auditCatFlag);
    checkoutStore.setAuditData(AuditData);
    autoAuditFlag = res.context.autoAuditFlag;
    checkoutStore.setAutoAuditFlag(autoAuditFlag);
    checkoutStore.setPetFlag(res.context.petFlag);
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
