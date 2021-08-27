import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { cookieSettingsBtn } from './cookieSettingsBtn';

@inject('configStore')
@observer
class MarsFooterMap extends React.Component {
  render() {
    const marsFooterMap = {
      mx: (
        <div id="mars-footer-panel">
          <div className="mars-footer-container">
            <ul
              className="mars-footer-list-right"
              style={{ fontSize: '.625rem' }}
            >
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/privacy-policy-mexico"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.confidentiality" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href={this.props.configStore.cookiesUrl}
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.cookies" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/legal-mexico"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.legalTerms" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
            </ul>
            <div
              className="mars-footer-legal text-center"
              style={{ fontSize: '.625rem' }}
            >
              <p>
                <FormattedMessage id="footer.copyrightInfo" />
              </p>
            </div>
          </div>
        </div>
      ),
      us: (
        <div id="mars-footer-panel">
          <div className="mars-footer-container">
            <ul
              className="mars-footer-list-right"
              style={{ fontSize: '.625rem' }}
            >
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/privacy"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.confidentiality" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/cookies-english"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.cookies" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/legal"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.legalTerms" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/accessibility"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">Accessibility</span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/legal/ca-supply-chain-act"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">CA Supply Chain Act</span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/modern-slavery-act"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">Modern Slavery Act</span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/mars-incorporated-adchoices-united-states"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">AdChoices</span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
            </ul>
            <div className="mars-footer-legal text-center">
              <p>
                <FormattedMessage id="footer.copyrightInfo" />
              </p>
            </div>
          </div>
        </div>
      ),
      de: (
        <div id="mars-footer-panel">
          <div className="mars-footer-container">
            <ul
              className="mars-footer-list-right"
              style={{ fontSize: '.625rem' }}
            >
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/privacy-policy-germany"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.privacy" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/cookies-germany"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.cookies2" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/legal-germany"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.termsOfUse" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.royalcanin.com/de/about-us/imprint"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.impress" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
            </ul>
            <div
              className="mars-footer-legal text-center"
              style={{ fontSize: '.625rem' }}
            >
              <p>
                <FormattedMessage id="footer.copyrightInfo2" />
              </p>
            </div>
          </div>
        </div>
      ),
      fr: (
        <div id="mars-footer-panel">
          <div className="mars-footer-container">
            <ul
              className="mars-footer-list-right"
              style={{ fontSize: '.625rem' }}
            >
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/privacy-policy-france"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.privacy" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/cookies-france"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.cookies2" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/legal-france"
                  rel="nofollow"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.termsOfUse" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>
              <li>
                {/* <a target="_blank" rel="nofollow" href="https://www.royalcanin.com/fr/mentions-legales/royal-canin"> */}
                <Link to="/mentionslegales" target="_blank">
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.statutoryDeclaration" />
                  </span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </Link>
              </li>
            </ul>
            <div
              className="mars-footer-legal text-center"
              style={{ fontSize: '.625rem' }}
            >
              <p style={{ color: 'rgb(102,102,102)' }}>
                <FormattedMessage id="footer.copyrightInfo2" />
                <br />
                <FormattedMessage id="footer.copyrightInfo2_1" />
              </p>
            </div>
          </div>
        </div>
      ),
      ru: (
        <div
          id="mars-footer-panel"
          className="mars-footer-mars mars-footer-icon-size-medium"
          data-cookie-warning-enabled="no"
          data-lang="ru"
        >
          <div className="mars-footer-container">
            {' '}
            <ul className="mars-footer-list-right">
              {' '}
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/privacy-policy-russia"
                  rel="nofollow"
                >
                  <span className="mars-footer-icon">
                     <strong></strong>
                  </span>{' '}
                  <span className="mars-footer-label">Конфиденциальность</span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>{' '}
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/cookies-russia"
                  rel="nofollow"
                >
                  <span className="mars-footer-icon">
                     <strong></strong>
                  </span>{' '}
                  <span className="mars-footer-label">Файлы Cookies</span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>{' '}
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/legal-russia"
                  rel="nofollow"
                >
                  <span className="mars-footer-icon">
                     <strong></strong>
                  </span>{' '}
                  <span className="mars-footer-label">Юридические условия</span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>{' '}
            </ul>{' '}
            <div className="mars-footer-legal">
              {' '}
              <p className="text-center">
                Copyright © Mars 2021®, Trademark of Mars Incorporated and its
                affiliates
              </p>{' '}
            </div>{' '}
          </div>{' '}
        </div>
      ),
      tr: (
        <div
          id="mars-footer-panel"
          className="mars-footer-mars mars-footer-icon-size-medium"
          data-cookie-warning-enabled="no"
          data-lang="ru"
        >
          <div className="mars-footer-container">
            {' '}
            <ul className="mars-footer-list-right">
              {' '}
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/privacy-policy-russia"
                  rel="nofollow"
                >
                  <span className="mars-footer-icon">
                     <strong></strong>
                  </span>{' '}
                  <span className="mars-footer-label">Конфиденциальность</span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>{' '}
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/cookies-russia"
                  rel="nofollow"
                >
                  <span className="mars-footer-icon">
                     <strong></strong>
                  </span>{' '}
                  <span className="mars-footer-label">Файлы Cookies</span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>{' '}
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/legal-russia"
                  rel="nofollow"
                >
                  <span className="mars-footer-icon">
                     <strong></strong>
                  </span>{' '}
                  <span className="mars-footer-label">Юридические условия</span>
                  {Boolean(
                    window.__.env.REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                  ) && (
                    <span className="warning_blank">Opens a new window</span>
                  )}
                </a>
              </li>{' '}
            </ul>{' '}
            <div className="mars-footer-legal">
              {' '}
              <p className="text-center">
                Copyright © Mars 2020®, Trademark of Mars Incorporated and its
                affiliates
              </p>{' '}
            </div>{' '}
          </div>{' '}
        </div>
      )
    };
    return (
      <div>
        {+window.__.env.REACT_APP_HUB
          ? null
          : marsFooterMap[window.__.env.REACT_APP_COUNTRY]}
      </div>
    );
  }
}
export default MarsFooterMap;
