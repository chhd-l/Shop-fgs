import { distributeLinktoPrecriberOrPaymentPage } from '@/utils/utils';

const sessionItemRoyal = window.__.sessionItemRoyal;

const loginRedirection = async ({
  clinicStore,
  configStore,
  checkoutStore,
  history,
  isLogin
}) => {
  const tmpUrl = sessionItemRoyal.get('okta-redirectUrl')
    ? sessionItemRoyal.get('okta-redirectUrl')
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
