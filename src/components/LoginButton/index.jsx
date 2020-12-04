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
import { Button, Header } from 'semantic-ui-react';
import { getToken } from '@/api/login';
import { getCustomerInfo } from '@/api/user';
import { findUserConsentList } from '@/api/consent';
import { inject, observer } from 'mobx-react';
import stores from '@/store';
import { FormattedMessage } from 'react-intl';
import { mergeUnloginCartData } from '@/utils/utils';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const loginStore = stores.loginStore;
const checkoutStore = stores.checkoutStore;

const LoginButton = (props) => {
  const init = props.init;
  // console.log(useOktaAuth)
  // console.log(useOktaAuth(), 'useOktaAuth')
  // const { authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [isGetUserInfoDown, setIsGetUserInfoDown] = useState(false);
  const { authState, authService } = useOktaAuth();

  const { accessToken } = authState;

  useEffect(() => {
    if (isGetUserInfoDown && init) {
      init();
    }
  }, [isGetUserInfoDown, init]);

  useEffect(() => {
    setIsGetUserInfoDown(false);
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      loginStore.changeLoginModal(true);
      authService
        .getUser()
        .then((info) => {
          setUserInfo(info);
          if (!loginStore.isLogin) {
            getToken({ oktaToken: `Bearer ${accessToken}` })
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

                setIsGetUserInfoDown(true);
              })
              .catch((e) => {
                console.log(e);
                loginStore.changeLoginModal(false);
              });
          } else {
            loginStore.changeLoginModal(false);
          }
        })
        .catch((err) => {
          loginStore.changeLoginModal(false);
        });
    }
  }, [authState, authService, accessToken]); // Update if authState changes

  const login = async () => {
    try {
      sessionItemRoyal.remove('rc-token-lose');
      sessionItemRoyal.set('okta-redirectUrl', props.history.location.pathname);
      props.beforeLoginCallback && (await props.beforeLoginCallback());
      authService.login(process.env.REACT_APP_HOMEPAGE);
    } catch (err) {}
  };

  return (
    <button
      className={props.btnClass || 'rc-btn rc-btn--one'}
      style={props.btnStyle || {}}
      onClick={login}
      ref={props.buttonRef}
      id="J-btn-login"
    >
      {props.children || <FormattedMessage id="login" />}
    </button>
  );
};
export default LoginButton;
