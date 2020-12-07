import React, { Component } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const SocialRegister = () => {
  const { oktaAuth, authState } = useOktaAuth();

  const loginWithFacebook = async () => {
    oktaAuth.signInWithRedirect({ idp: process.env.REACT_APP_FaceBook_IDP });
  }
  const loginWithGoogle = async () => {
    debugger
    oktaAuth.signInWithRedirect({ idp: process.env.REACT_APP_Google_IDP });
  }

  return (
    <div class="rc-two-column">
      <div class="rc-column">
        <p
          class="social-auth-button fecebookBtn"
          onClick={loginWithFacebook}
        >
          Sign in with Facebook
        </p>
      </div>
      <div class="rc-column">
        <p class="social-auth-button googleBtn" onClick={loginWithGoogle}>
          Sign in with Google
        </p>
      </div>
    </div>
  );
};

export default SocialRegister;
