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
import { doLogout } from '@/api/login';
import { FormattedMessage } from 'react-intl';
import stores from '@/store';

const localItemRoyal = window.__.localItemRoyal;
const loginStore = stores.loginStore;
const checkoutStore = stores.checkoutStore;
const clinicStore = stores.clinicStore;

const LogoutButton = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const { authState, oktaAuth } = useOktaAuth();
  const logout = async () => {
    try {
      const idToken = authState.idToken;
      if (idToken) {
        if (location.pathname.includes('/account')) {
          // const redirectUri =
          // window.location.origin + window.__.env.REACT_APP_HOMEPAGE;
          // // await oktaAuth.signOut({ postLogoutRedirectUri: redirectUri});
          // window.location.href = `${
          //   window.__.env.REACT_APP_ISSUER
          // }/v1/logout?id_token_hint=${
          //   idToken ? idToken.value : ''
          // }&post_logout_redirect_uri=${redirectUri}`;
          oktaAuth.revokeAccessToken();
          // oktaAuth.signOut(props.callbackUrl || window.__.env.REACT_APP_HOMEPAGE);
          oktaAuth.signOut({
            postLogoutRedirectUri: window.__.env.REACT_APP_ACCESS_PATH
          });
        } else {
          localItemRoyal.set('logout-redirect-url', location.href);
          oktaAuth.revokeAccessToken();
          oktaAuth.signOut({
            postLogoutRedirectUri: window.__.env.REACT_APP_ACCESS_PATH
          });
          // oktaAuth.signOut(props.callbackUrl || window.__.env.REACT_APP_HOMEPAGE);
        }
      } else {
        loginStore.changeLoginModal(false);
        window.location.reload();
      }

      setTimeout(() => {
        loginStore.changeLoginModal(false);
      }, 1000);
    } catch (e) {
      loginStore.changeLoginModal(false);
    }
  };
  const clickLogoff = async () => {
    try {
      loginStore.changeLoginModal(true);
      await doLogout();
      localItemRoyal.remove('rc-token');
      localItemRoyal.remove('rc-register');
      localItemRoyal.remove('rc-consent-list');
      localItemRoyal.remove('okta-session-token');
      localItemRoyal.remove('rc-userinfo');
      loginStore.removeUserInfo();
      checkoutStore.removeLoginCartData();
      clinicStore.removeDefaultClinicInfo();
      // await logout(props.callbackUrl || window.__.env.REACT_APP_HOMEPAGE);
      await logout(window.__.env.REACT_APP_HOMEPAGE);
    } catch (err) {
      console.log(err);
      loginStore.changeLoginModal(false);
      // logout(window.__.env.REACT_APP_HOMEPAGE);
    }
  };
  const defaultLogoutBtnJSX = () => {
    return (
      <div
        className="logoff-style"
        style={(props && props.containerStyle) || {}}
      >
        <span
          className="rc-styled-link--external"
          id="J-btn-logoff"
          onClick={clickLogoff}
          style={(props && props.btnStyle) || {}}
          ref={props && props.buttonRef}
        >
          <FormattedMessage id="logOff" />
        </span>
      </div>
    );
  };
  const hubLogoutBtnJSX = () => {
    return (
      <div
        className={props.containerClassName || 'logoff-style'}
        style={props.containerStyle || {}}
      >
        <span
          id="J-btn-logoff"
          className={props.btnClassName}
          onClick={clickLogoff}
          style={Object.assign(
            {
              background: '#fff'
            },
            props.btnStyle || {}
          )}
          ref={props && props.buttonRef}
        >
          <FormattedMessage id="logOff" />
        </span>
      </div>
    );
  };

  return +window.__.env.REACT_APP_HUB ? hubLogoutBtnJSX() : defaultLogoutBtnJSX();
};
export default LogoutButton;
