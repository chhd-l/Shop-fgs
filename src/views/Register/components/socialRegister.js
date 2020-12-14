import React, { Component } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { injectIntl, FormattedMessage } from 'react-intl';

const SocialRegister = () => {
  const { oktaAuth, authState } = useOktaAuth();

  const loginWithFacebook = async () => {
    oktaAuth.signInWithRedirect({ idp: process.env.REACT_APP_FaceBook_IDP });
  };
  const loginWithGoogle = async () => {
    oktaAuth.signInWithRedirect({ idp: process.env.REACT_APP_Google_IDP });
  };

  return (
    <div class="rc-two-column">
      <div class="rc-column">
        <p class="social-auth-button fecebookBtn" onClick={loginWithFacebook}>
          <FormattedMessage id="registerFeckbook" />
        </p>
      </div>
      <div class="rc-column">
        <p class="social-auth-button googleBtn" onClick={loginWithGoogle}>
          <FormattedMessage id="registerGoogle" />
        </p>
      </div>
    </div>
  );
};

export default SocialRegister;
