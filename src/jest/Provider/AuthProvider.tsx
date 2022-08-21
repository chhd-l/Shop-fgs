import { OktaAuth } from '@okta/okta-auth-js';
import React from 'react';

import oktaAuth from '../../oktaConfig';

const AuthContext: React.Context<OktaAuth> = React.createContext(oktaAuth);
const useAuthContext = () => React.useContext(AuthContext);

const AuthProvider: React.FC<{ value?: OktaAuth }> = ({
  children,
  value = oktaAuth
}) => <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

export { AuthContext, useAuthContext, AuthProvider };
