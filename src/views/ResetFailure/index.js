import React from 'react';
import { injectIntl } from 'react-intl-phraseapp';
import { Footer } from '@/react-components';
import './index.less';

const ResetFailure = ({ history }) => {
  return (
    <div>
      <div className="ResetFailure text-center">
        <img
          className="align-self-center m-auto img-pc md:img-md mt-10"
          alt=""
          title=""
          srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/reset_password_failure.jpg`}
          src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/reset_password_failure.jpg`}
        />
        <div className="title my-5">
          К сожалению, ваш новый пароль не может быть установлен!
        </div>
        <div>Повторите попытку или обратитесь в службу поддержки.</div>
        <div className="button mt-10 mb-14">
          <button
            onClick={() => {
              history.push('/forgot');
            }}
          >
            Попробуйте еще раз
          </button>
          <button
            onClick={() => {
              history.push('/contact-us');
            }}
          >
            Контактная поддержка
          </button>
        </div>
      </div>
      <Footer showFooter={false} />
    </div>
  );
};

export default injectIntl(ResetFailure);
