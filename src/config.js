const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '0oar7ofrk3EJ4SYPT0h7';
const ISSUER = process.env.REACT_APP_ISSUER || 'https://accountdev.royalcanin.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    // redirectUri: 'https://shopuat.466920.com/implicit/callback',
    redirectUri: process.env.NODE_ENV === 'development'? 'http://localhost:3000/implicit/callback': process.env.REACT_APP_RedirectURL,
    // redirectUri: 'http://localhost:3000/implicit/callback',
    scopes: ['openid', 'profile', 'email','user.consent:read','user.profile:write','user.consent:delete','user.consent:collect'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: 'https://shopuat.466920.com/api/messages',
    // messagesUrl: 'https://localhost:3000/api/messages'
  },
};
