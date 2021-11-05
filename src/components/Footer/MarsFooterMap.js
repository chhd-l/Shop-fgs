import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { cookieSettingsBtn } from './cookieSettingsBtn';

@inject('configStore')
@observer
class MarsFooterMap extends React.Component {
  render() {
    const marsFooterMap = {
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
