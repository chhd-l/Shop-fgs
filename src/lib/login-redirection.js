import { distributeLinktoPrecriberOrPaymentPage } from '@/utils/utils';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

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
  if (tmpUrl === '/prescription' || tmpUrl === '/cart') {
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
