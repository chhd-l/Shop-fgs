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
import { getToken } from '@/api/login'
import { getCustomerInfo } from "@/api/user"
import { FormattedMessage } from 'react-intl'
import { inject, observer } from 'mobx-react';
import Store from '@/store/store';

const LogoutButton = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { authState, authService } = useOktaAuth();

  const { accessToken } = authState;

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
        authService.getUser().then((info) => {
          setUserInfo(info);
          if (!localStorage.getItem('rc-token')) {
            getToken({ oktaToken: `Bearer ${accessToken}` }).then(async res => {
              let userinfo = res.context.customerDetail
              let customerInfoRes = await getCustomerInfo()
              userinfo.defaultClinics = customerInfoRes.context.defaultClinics
              localStorage.localStorage("rc-token", res.context.token);
              localStorage.setItem("rc-userinfo", JSON.stringify(userinfo));
            })
          }
        });
      });
    }
  }, [authState, authService]); // Update if authState changes

  const login = async () => {
    Store.changeIsLogin(false)
    authService.login('/');
  };
  const logout = async () => authService.logout('/');
  const clickLogoff = () => {
    localStorage.removeItem("rc-token");
    logout()
  }
  return (
    <div className="logoff-style">
      <a className="rc-styled-link--external" onClick={clickLogoff}>
        <FormattedMessage id="logOff" />
      </a>
    </div>
  );
};
export default LogoutButton;
