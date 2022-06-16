import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import stores from '@/store';
const configStore = stores.configStore;

//1.直接跳转邮箱
const mailFrag = (
  <a
    href={`mailto:${configStore.storeContactEmail}`}
    className="rc-styled-link"
  >
    <FormattedMessage id="searchNoResult.email.content" />
  </a>
);

//2.跳转hub他们的constUs
const hubFrag = (
  <a
    href={`${window.__.env.REACT_APP_HUB_URLPREFIX}/contact-us`}
    className="rc-styled-link"
  >
    <FormattedMessage id="searchNoResult.email.content" />
  </a>
);

//3.跳转hub我们的constUs
const fgsFrag = (
  <Link to="/help/contact" className="rc-styled-link">
    <FormattedMessage id="searchNoResult.email.content" />
  </Link>
);

export const getEmailWay = () => {
  const param =
    window.__.env.REACT_APP_COUNTRY +
    '_' +
    (window.__.env.REACT_APP_HUB ? 'hub' : 'fgs');

  const defaultWay = mailFrag;

  const emailWay =
    {
      FR_hub: hubFrag,
      RU_hub: hubFrag,
      TR_hub: hubFrag,
      US_fgs: fgsFrag //现在我们的contactUs只支持美国。没做多语言
    }[param] || defaultWay;

  return emailWay;
};
