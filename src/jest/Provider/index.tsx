import { AuthState, OktaAuth, UserClaims } from '@okta/okta-auth-js';
import { AbstractToken } from '@okta/okta-auth-js/lib/types/Token';
import React from 'react';

import { AuthProvider } from './AuthProvider';
import { oktaConfig } from '../../oktaConfig';

const testToken = <M extends Record<string, any>>(
  more: M
): AbstractToken & { claims: UserClaims } & Omit<
    M,
    keyof AbstractToken | 'claims'
  > => {
  const {
    claims = { sub: 'test@test.com' },
    expiresAt = 999999999,
    authorizeUrl = '',
    scopes = [],
    ...rest
  } = more;
  return {
    claims,
    expiresAt,
    authorizeUrl,
    scopes,
    ...rest
  } as any;
};

const loggedInState: (authState: AuthState) => AuthState = (
  authState: AuthState
) => ({
  ...authState,
  isAuthenticated: true,
  idToken: testToken({
    ...authState?.idToken,
    idToken: 'testIDToken',
    issuer: '',
    clientId: ''
  }),
  accessToken: testToken({
    ...authState?.accessToken,
    accessToken: 'testAccessToken',
    tokenType: 'accessToken',
    userinfoUrl: ''
  })
});

const TestOktaAuthProvider: React.FC<{ authorized?: boolean }> = ({
  authorized = false,
  children
}) => {
  const transformAuthState = authorized
    ? async (ignored: any, authState: AuthState) => loggedInState(authState)
    : async (ignored: any, authState: AuthState) => authState;
  const oktaAuth = new OktaAuth({
    ...oktaConfig,
    transformAuthState
  });
  return <AuthProvider value={oktaAuth}>{children}</AuthProvider>;
};

export { testToken, loggedInState, TestOktaAuthProvider };
