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
import { getToken } from '@/api/login'

const Home = () => {
  // console.log(useOktaAuth)
  // console.log(useOktaAuth(), 'useOktaAuth')
  // const { authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const { authState, authService } = useOktaAuth();
  console.log(authService, 'authService')
  //     const [userInfo, setUserInfo] = useState(null);
  //     authService.getUser().then((info) => {
  //       console.log(info, 'info')
  //       setUserInfo(info);
  //     });
  const { accessToken } = authState;
  // console.log(accessToken ,'accessToken')
  useEffect(() => {
    if (!authState.isAuthenticated) {
      console.log(1)
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      console.log(2)
      authService.getUser().then((info) => {
        setUserInfo(info);
        authService.getUser().then((info) => {
          setUserInfo(info);
          if (!sessionStorage.getItem('rc-token')) {
            getToken({ oktaToken: `Bearer ${accessToken}` }).then(res => {
              console.log(res)
              sessionStorage.setItem("rc-token", res.context.token);
              sessionStorage.setItem("rc-userinfo", JSON.stringify(res.context.customerDetail));
            })
          }
        });
      });
    }
  }, [authState, authService]); // Update if authState changes

  const login = async () => {
    authService.login('/');
  };

  const resourceServerExamples = [
    {
      label: 'Node/Express Resource Server Example',
      url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
    },
    {
      label: 'Java/Spring MVC Resource Server Example',
      url: 'https://github.com/okta/samples-java-spring-mvc/tree/master/resource-server',
    },
  ];

  // if (authState.isPending) {
  //   return (
  //     <div>Loading...</div>
  //   );
  // }

  return (
    <button className="rc-btn rc-btn--one" style={{ width: "11rem", margin: "2rem 0" }} onClick={login}>Log in</button>
  );
};
export default Home;
