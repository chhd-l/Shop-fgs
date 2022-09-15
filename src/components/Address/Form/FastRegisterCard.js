import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PasswordInput from '@/components/Address/Form/PasswordInput';

const FastRegisterCard = ({ onChange = () => {} }, ref) => {
  const history = useHistory();
  const { oktaAuth } = useOktaAuth();
  const localItemRoyal = window.__.localItemRoyal;
  const sessionItemRoyal = window.__.sessionItemRoyal;

  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    getInputState: inputRef.current.getInputState,
    setInputValue: inputRef.current.setInputValue
  }));

  const handleLogin = () => {
    localStorage.setItem(
      'country-code-current-operated',
      window.__.env.REACT_APP_COUNTRY
    );
    sessionItemRoyal.remove('rc-token-lose');
    localItemRoyal.set(
      'okta-redirectUrl',
      history?.location.pathname + history?.location.search
    );

    if (window.__.env.REACT_APP_FGS_SELF_LOGIN) {
      history.push('/login');
    } else {
      oktaAuth.signInWithRedirect(window.__.env.REACT_APP_HOMEPAGE);
    }
  };

  return (
    <div
      className="fast-register-card p-4 border rounded border-gray-300"
      style={{ height: 300 }}
    >
      <div className="text-16 text-black font-medium">
        Vous voulez gagner du temps?
      </div>
      <div className="text-12 mb-4">
        Connectez-vous directement a voter compte
      </div>
      <div className="flex justify-end mb-5">
        <button className="rc-btn rc-btn--two py-1" onClick={handleLogin}>
          Se connecter
        </button>
      </div>
      <div className="text-16 text-black font-medium">
        Vous desirez un compte?
      </div>
      <div className="text-12 mb-4">
        Definissez votre mot depasse. votre compte sera automatiquement cree
        apres letapa de confirmation
      </div>
      <div className="register-pass">
        <PasswordInput ref={inputRef} onChange={onChange} />
      </div>
    </div>
  );
};

export default forwardRef(FastRegisterCard);
