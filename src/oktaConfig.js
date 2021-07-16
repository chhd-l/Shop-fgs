import { OktaAuth } from '@okta/okta-auth-js';

const CLIENT_ID = window.__.env.REACT_APP_CLIENT_ID || '0oar7ofrk3EJ4SYPT0h7';
const ISSUER =
  window.__.env.REACT_APP_ISSUER ||
  'https://accountdev.royalcanin.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK =
  window.__.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

const oktaAuth = new OktaAuth({
  clientId: CLIENT_ID,
  issuer: ISSUER,
  // redirectUri: 'https://shopuat.466920.com/implicit/callback',
  // redirectUri: window.__.env.REACT_APP_RedirectURL,
  redirectUri: window.__.env.REACT_APP_RedirectURL,
  scopes: [
    'openid',
    'profile',
    'email',
    'user.consent:read',
    'user.profile:write',
    'user.consent:delete',
    'user.consent:collect'
  ],
  pkce: true,
  disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
});

export default oktaAuth;

// export default {
//   oidc: {
//     clientId: CLIENT_ID,
//     issuer: ISSUER,
//     // redirectUri: 'https://shopuat.466920.com/implicit/callback',
//     redirectUri: process.env.NODE_ENV === 'development'? 'http://localhost:3000/implicit/callback': window.__.env.REACT_APP_RedirectURL,
//     // redirectUri: 'http://localhost:3000/implicit/callback',
//     scopes: ['openid', 'profile', 'email','user.consent:read','user.profile:write','user.consent:delete','user.consent:collect'],
//     pkce: true,
//     disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
//   },
//   resourceServer: {
//     messagesUrl: 'https://shopuat.466920.com/api/messages',
//     // messagesUrl: 'https://localhost:3000/api/messages'
//   },
// };
