/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import stores from '@/store';
import { FormattedMessage } from 'react-intl-phraseapp';
import { getToken } from '@/api/login';
import { getCustomerInfo } from '@/api/user';
import { mergeUnloginCartData, bindSubmitParam } from '@/utils/utils';
import { userBindConsent } from '@/api/consent';
import LimitLoginModal from '@/views/Home/modules/LimitLoginModal';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const loginStore = stores.loginStore;
const checkoutStore = stores.checkoutStore;

interface Props {
  getUserInfoDownCallback?: Function; //登录成功，获取到用户信息后，需执行的callback
  beforeLoginCallback?: Function; //进行登录操作前，需执行的函数
  callbackUrl?: Function; //登录成功的回调
  btnClass?: Function;
  className?: Function;
  btnStyle?: object;
  buttonRef?: any;
  children?: any;
}

const LoginButton = ({
  getUserInfoDownCallback,
  callbackUrl,
  beforeLoginCallback,
  btnClass,
  className,
  btnStyle,
  buttonRef,
  children
}: Props) => {
  if (sessionItemRoyal.get('rc-guestId')) return <></>;
  const history = useHistory();
  const [, setUserInfo] = useState(null);
  const [isGetUserInfoDown, setIsGetUserInfoDown] = useState(false);
  const { oktaAuth } = useOktaAuth();
  const { authState } = useOktaAuth();

  useEffect(() => {
    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  // 拿到userinfo信息后，执行传入该组件的init方法
  useEffect(() => {
    console.log(
      'getUserInfoDownCallback',
      isGetUserInfoDown,
      getUserInfoDownCallback
    );
    if (
      (isGetUserInfoDown || window.__.env.REACT_APP_FGS_SELF_REGISTER) &&
      getUserInfoDownCallback
    ) {
      getUserInfoDownCallback();
    }
  }, [isGetUserInfoDown, getUserInfoDownCallback]);

  useEffect(() => {
    console.log('login in status同步', authState, oktaAuth);
    setIsGetUserInfoDown(false);
    // console.log('OKTA authState:', authState);
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
      const parametersString = history && history.location.search;
      if (!parametersString) {
        return;
      }
    } else {
      loginStore.changeLoginModal(true);
      oktaAuth
        .getUser()
        .then((info: any) => {
          // Cross-store login: 跨店铺登录后需要logout再登录
          if (
            loginStore?.userInfo?.email &&
            info?.email !== loginStore?.userInfo.email &&
            localItemRoyal.get('okta-session-token')
          ) {
            localItemRoyal.set('login-again', true);
            const idToken = authState.idToken;
            const redirectUri =
              window.location.origin + window.__.env.REACT_APP_HOMEPAGE;
            window.location.href = `${
              window.__.env.REACT_APP_ISSUER
            }/v1/logout?id_token_hint=${
              idToken ? idToken.value : ''
            }&post_logout_redirect_uri=${redirectUri}`;
          }
          setUserInfo(info);
          localItemRoyal.set('customer-okta-id', info.sub);
          const oktaTokenString = authState.accessToken
            ? authState.accessToken.value
            : '';
          let oktaToken = 'Bearer ' + oktaTokenString;
          localItemRoyal.set('oktaToken', oktaToken);
          const consentString = localItemRoyal.get('rc-consent-list');
          if (consentString && loginStore.isLogin) {
            // 自动登录后，注册consent
            var consents = JSON.parse(consentString);
            let submitParam = bindSubmitParam(consents);
            // 不知道能不能拿到customerId
            let customerId =
              loginStore.userInfo && loginStore.userInfo.customerId;
            userBindConsent({
              ...submitParam,
              ...{ oktaToken },
              customerId
            })
              .then(() => {
                console.log('setIsGetUserInfoDown22');
                setIsGetUserInfoDown(true);
                loginStore.changeLoginModal(false);
              })
              .catch((e) => {
                console.log(e);
                loginStore.changeLoginModal(false);
              });
          } else {
            if (!loginStore.isLogin) {
              getToken({ oktaToken: oktaToken })
                .then(async (res: any) => {
                  // GA 登录成功埋点 start
                  // @ts-ignore
                  window.dataLayer &&
                    // @ts-ignore
                    window.dataLayer.push({
                      event: `${window.__.env.REACT_APP_GTM_SITE_ID}loginAccess`,
                      interaction: {
                        category: 'registration',
                        action: 'login',
                        label: '',
                        value: 1
                      }
                    });
                  // GA 登陆成功埋点 end
                  let userinfo = res.context.customerDetail;
                  let customerId = res.context?.customerId;
                  loginStore.changeLoginModal(false);
                  loginStore.changeIsLogin(true);

                  localItemRoyal.set('rc-token', res.context.token);
                  let customerInfoRes: any = await getCustomerInfo({
                    customerId
                  });
                  userinfo.defaultClinics =
                    customerInfoRes.context.defaultClinics;

                  loginStore.setUserInfo(customerInfoRes.context);
                  // 去除cart页面不合并购物车逻辑，因为现在登录后不会回到tmpUrl所指页面
                  if (
                    // tmpUrl !== '/cart' &&
                    checkoutStore.cartData.length
                  ) {
                    await mergeUnloginCartData();
                    // @ts-ignore
                    await checkoutStore.updateLoginCart({
                      delFlag: 1
                    }); // indv登录的时候需要查询到相应的数据
                  }

                  // PO bind shelterId, country:us
                  // const shelterId =
                  //   sessionItemRoyal.get('handled-shelter') || '';
                  // if (shelterId) {
                  //   await saveShelterId({
                  //     shelterId,
                  //     customerId
                  //   });
                  // }
                  console.log('setIsGetUserInfoDown33');
                  setIsGetUserInfoDown(true);
                })
                .catch((e) => {
                  console.log('Get JWT Token Failed:', e);
                  loginStore.changeLoginModal(false);
                });
            } else {
              loginStore.changeLoginModal(false);
              console.log('setIsGetUserInfoDown11');
              setIsGetUserInfoDown(true);
            }
          }
        })
        .catch((e) => {
          console.log('Get OKTA User Failed:', e);
          loginStore.changeLoginModal(false);
        });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const storageHandler = (e: StorageEvent) => {
    if (e.key === `${window.__.env.REACT_APP_COUNTRY}-rc-token`) {
      // 该token的旧值不存在，新值存在，表示登录
      if (!e.oldValue && e.newValue && !localItemRoyal.get('rc-register')) {
        login();
      }
    }
  };

  const login = async () => {
    try {
      localStorage.setItem(
        'country-code-current-operated',
        window.__.env.REACT_APP_COUNTRY
      );
      sessionItemRoyal.remove('rc-token-lose');
      localItemRoyal.set(
        'okta-redirectUrl',
        history?.location.pathname + history?.location.search
      );

      beforeLoginCallback && (await beforeLoginCallback());
      if (window.__.env.REACT_APP_FGS_SELF_LOGIN) {
        history.push('/login');
      } else {
        oktaAuth.signInWithRedirect(
          callbackUrl || window.__.env.REACT_APP_HOMEPAGE
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LimitLoginModal />
      <button
        className={cn(btnClass || className || 'rc-btn rc-btn--one bg-rc-red')}
        style={btnStyle || {}}
        onClick={login}
        ref={buttonRef}
        id="J-btn-login"
      >
        {children || <FormattedMessage id="login" />}
      </button>
    </>
  );
};
export default LoginButton;
