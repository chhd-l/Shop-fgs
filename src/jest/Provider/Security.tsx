import { toRelativeUrl, UserClaims } from '@okta/okta-auth-js';
import { AbstractToken } from '@okta/okta-auth-js/lib/types/Token';
import React from 'react';
import { Security as OktaSecurity } from '@okta/okta-react';
import { RestoreOriginalUriFunction } from '@okta/okta-react/bundles/types/OktaContext';

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

// const loggedInState: (authState: AuthState) => AuthState = (
//   authState: AuthState
// ) => ({
//   ...authState,
//   isAuthenticated: true,
//   idToken: testToken({
//     ...authState?.idToken,
//     idToken: 'testIDToken',
//     issuer: '',
//     clientId: ''
//   }),
//   accessToken: testToken({
//     ...authState?.accessToken,
//     accessToken: 'testAccessToken',
//     tokenType: 'accessToken',
//     userinfoUrl: ''
//   })
// });
const restoreOriginalUri: RestoreOriginalUriFunction = async (
  _oktaAuth,
  originalUri
) => {
  (window.history as any).replace(toRelativeUrl(originalUri, window.location.origin));
};
const Security: React.FC<{ authorized?: boolean }> = ({
  authorized = true,
  children
}) => {
  // const transformAuthState = authorized
  //   ? async (ignored: any, authState: AuthState) => loggedInState(authState)
  //   : async (ignored: any, authState: AuthState) => authState;
  const initialAuthState = {
    isInitialState: true
  };
  const oktaAuth = {
    _oktaUserAgent: {
      addEnvironment: jest.fn(),
      getHttpHeader: jest.fn(),
      getVersion: jest.fn()
    } as any,
    options: {},
    authStateManager: {
      getAuthState: jest.fn().mockImplementation(() => initialAuthState),
      updateAuthState: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn()
    } as any,
    start: jest.fn(),
    stop: jest.fn(),
    isLoginRedirect: jest.fn().mockImplementation(() => false)
  } as any;
  return (
    <OktaSecurity oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </OktaSecurity>
  );
};
export default Security;
export { testToken };
