import { getToken } from '@/api/login';
import { getCustomerInfo } from '@/api/user';
import stores from '@/store';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const checkoutStore = stores.checkoutStore;
const loginStore = stores.loginStore;


export function setToken(token) {
    getToken({ oktaToken: `Bearer ${token}` })
    .then(async (res) => {
      let userinfo = res.context.customerDetail;
      loginStore.changeLoginModal(false);
      loginStore.changeIsLogin(true);
    
      localItemRoyal.set('rc-token', res.context.token);
      let customerInfoRes = await getCustomerInfo();
      userinfo.defaultClinics =
        customerInfoRes.context.defaultClinics;
      loginStore.setUserInfo(customerInfoRes.context);
    
      const tmpUrl = sessionItemRoyal.get('okta-redirectUrl');
      if (tmpUrl !== '/cart' && checkoutStore.cartData.length) {
        await mergeUnloginCartData();
        console.log(loginStore, 'loginStore');
        await checkoutStore.updateLoginCart();
      }
    })
    .catch((e) => {
      console.log(e);
      loginStore.changeLoginModal(false);
    });
}

