import React, { Component } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';

const SocialRegister = () => {
  const { oktaAuth, authState } = useOktaAuth();

  const loginWithFacebook = async () => {
    window.dataLayer &&
      window.dataLayer.push({
        event: `socialLoginClick`,
        socialButton: 'Facebook'
      });
    oktaAuth.signInWithRedirect({ idp: window.__.env.REACT_APP_FaceBook_IDP });
  };
  const loginWithGoogle = async () => {
    window.dataLayer &&
      dataLayer.push({
        event: `socialLoginClick`,
        socialButton: 'Google'
      });
    oktaAuth.signInWithRedirect({ idp: window.__.env.REACT_APP_Google_IDP });
  };

  return (
    <div className="rc-two-column">
      <div className="rc-column">
        <p
          className="social-auth-button fecebookBtn"
          onClick={loginWithFacebook}
        >
          <FormattedMessage id="registerFeckbook" />
        </p>
      </div>
      <div className="rc-column">
        <p className="social-auth-button googleBtn" onClick={loginWithGoogle}>
          <FormattedMessage id="registerGoogle" />
        </p>
      </div>
    </div>
  );
};

export default SocialRegister;
