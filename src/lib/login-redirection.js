import { distributeLinktoPrecriberOrPaymentPage } from '@/utils/utils';

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
