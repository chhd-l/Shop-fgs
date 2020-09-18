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

const LogoutButton = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { authState, authService } = useOktaAuth();

  const { accessToken } = authState;

  const logout = async () => {
    try {
      await authService.logout(process.env.REACT_APP_HOMEPAGE);
      setTimeout(() => {
        loginStore.changeLoginModal(false);
      }, 1000);
    } catch (e) {
      loginStore.changeLoginModal(false);
      window.location.reload();
    }
  };
  const clickLogoff = async () => {
    try {
      loginStore.changeLoginModal(true);
      await doLogout();
      localItemRoyal.remove('rc-token');
      loginStore.removeUserInfo();
      checkoutStore.removeLoginCartData();
      logout(process.env.REACT_APP_HOMEPAGE);
    } catch (err) {
      console.log(err);
      // logout(process.env.REACT_APP_HOMEPAGE);
    }
  };
  return (
    <div className="logoff-style">
      <a
        className="rc-styled-link--external"
        id="J-btn-logoff"
        onClick={clickLogoff}
      >
        <FormattedMessage id="logOff" />
      </a>
    </div>
  );
};
export default LogoutButton;
