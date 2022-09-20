import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PasswordInput from '@/components/Address/Form/PasswordInput';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';

const FastRegisterCard = ({ paymentStoreNew, onChange = () => {} }, ref) => {
  const history = useHistory();
  const { oktaAuth } = useOktaAuth();
  const localItemRoyal = window.__.localItemRoyal;
  const sessionItemRoyal = window.__.sessionItemRoyal;
  const { subForm } = paymentStoreNew;
  console.log(888, subForm);

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
      className="fast-register-card py-4 border rounded border-gray-300"
      style={{ height: 'auto' }}
    >
      <div
        className={cn('flex border-b px-4 pb-2', {
          hidden: subForm.buyWay == 'once'
        })}
      >
        <div className="iconfont iconinfo mr-3 text-24 text-yellow-500"></div>
        <div className="flex-1 text-14 font-medium text-cs-gray leading-tight">
          L’achat d’article via un abonnement nécessite la création d’un compte.
        </div>
      </div>
      <div className="text-16 text-black font-medium px-4 pt-2">
        Vous voulez gagner du temps?
      </div>
      <div className="text-12 mb-4 px-4">
        Connectez-vous directement a voter compte
      </div>
      <div className="flex justify-end mb-5 px-4">
        <button className="rc-btn rc-btn--two py-1" onClick={handleLogin}>
          Se connecter
        </button>
      </div>
      <div className="text-16 text-black font-medium px-4">
        Vous desirez un compte?
      </div>
      <div className="text-12 mb-4 px-4">
        Definissez votre mot depasse. votre compte sera automatiquement cree
        apres letapa de confirmation
      </div>
      <div className="register-pass px-4">
        <PasswordInput ref={inputRef} onChange={onChange} />
      </div>
    </div>
  );
};

//export default forwardRef(FastRegisterCard);
export default inject('paymentStoreNew')(
  observer(forwardRef(FastRegisterCard))
);
