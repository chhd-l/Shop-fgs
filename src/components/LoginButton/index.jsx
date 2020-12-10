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
import { FormattedMessage } from 'react-intl';
import { setToken } from '../../utils/token'

const sessionItemRoyal = window.__.sessionItemRoyal;
const loginStore = stores.loginStore;

const LoginButton = (props) => {
  const init = props.init;
  const [, setUserInfo] = useState(null);
  const [isGetUserInfoDown, setIsGetUserInfoDown] = useState(false);
  const { oktaAuth } = useOktaAuth();
  const { authState } = useOktaAuth();

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
      oktaAuth
        .getUser()
        .then((info) => {
          setUserInfo(info);
          if (!loginStore.isLogin) {
            setToken(authState.accessToken ? authState.accessToken.value : '');
          } else {
            loginStore.changeLoginModal(false);
          }
        })
        .catch(() => {
          loginStore.changeLoginModal(false);
        });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    try {
      sessionItemRoyal.remove('rc-token-lose');
      sessionItemRoyal.set('okta-redirectUrl', props.history.location.pathname);
      props.beforeLoginCallback && (await props.beforeLoginCallback());
      oktaAuth.signInWithRedirect(process.env.REACT_APP_HOMEPAGE);
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
