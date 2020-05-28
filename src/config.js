const CLIENT_ID = process.env.CLIENT_ID || '0oar7ofrk3EJ4SYPT0h7';
const ISSUER = process.env.ISSUER || 'https://accountdev.royalcanin.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    // redirectUri: 'https://shopuat.466920.com/implicit/callback',
    redirectUri: 'https://shopuat.466920.com/implicit/callback',
    // redirectUri: 'https://localhost:3000/api/messages',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: 'https://shopuat.466920.com/api/messages',
    // messagesUrl: 'https://localhost:3000/api/messages',
  },
};
