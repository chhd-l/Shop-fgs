import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import './index.less';
import Footer from '@/components/Footer';

export default class welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params && this.props.match.params.id
    };
  }
  render() {
    let homePage = window.__.env.REACT_APP_HOMEPAGE;
    const contactUrl =
      homePage.substring(homePage.length - 1, homePage.length) === '/'
        ? 'help/contact'
        : '/help/contact';
    const helpUrl =
      homePage.substring(homePage.length - 1, homePage.length) === '/'
        ? 'help'
        : '/help';
    return (
      <div id="welcome" className="page">
        <div
          _ngcontent-dqg-c56=""
          class="register-success-container"
          style={{ marginBottom: 45 }}
        >
          <div _ngcontent-dqg-c56="" class="register-success-container__logo">
            <img
              _ngcontent-dqg-c56=""
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/rc_logo.svg`}
              alt=""
            />
          </div>
          <div
            _ngcontent-dqg-c56=""
            class="register-success-container__img-bloc"
          >
            <img
              _ngcontent-dqg-c56=""
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/cat-dog.jpg`}
              alt=""
            />
          </div>
          <div
            _ngcontent-dqg-c56=""
            class="register-success-container__text-container"
          >
            <h1
              _ngcontent-dqg-c56=""
              class="register-success-container__text-container__h1"
            >
              <FormattedMessage id="welcome.createdSuccessfully" />
            </h1>
            <p
              _ngcontent-dqg-c56=""
              class="register-success-container__text-container__p"
            >
              <FormattedMessage id="welcome.confirmEmail" />{' '}
              <span _ngcontent-dqg-c56="" class="bold-text">
                {this.state.email}
              </span>
            </p>
            <p
              _ngcontent-dqg-c56=""
              class="register-success-container__text-container__p"
            >
              {' '}
              <FormattedMessage id="welcome.notReceiveEmail" />{' '}
              <a
                _ngcontent-dqg-c56=""
                apptracking="registration.contactSupport"
                class="rc-link"
                href={
                  window.__.env.REACT_APP_COUNTRY === 'us'
                    ? homePage + contactUrl
                    : homePage + helpUrl
                }
              >
                <strong>
                  <FormattedMessage id="welcome.contactSupport" />
                </strong>
              </a>
            </p>
          </div>
        </div>

        {window.__.env.REACT_APP_COUNTRY === 'de' ? (
          <Footer />
        ) : (
          <div
            id="mars-footer-panel"
            class="mars-footer-mars 	mars-footer-icon-size-medium"
            data-cookie-warning-enabled="no"
          >
            <div class="mars-footer-container">
              <ul
                class="mars-footer-list-right"
                style={{ fontSize: 10, fontFamily: 'Inherit' }}
              >
                <li>
                  <a
                    target="_blank"
                    href="https://www.mars.com/privacy-policy"
                    onclick="_gaq.push(['_trackEvent', 'footer', 'click', '1'])"
                  >
                    <span class="mars-footer-icon">
                       <strong></strong>
                    </span>{' '}
                    <span class="mars-footer-label">
                      {' '}
                      <FormattedMessage id="welcome.privacyStatement" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.mars.com/cookies-english"
                    onclick="_gaq.push(['_trackEvent', 'footer', 'click', '2'])"
                  >
                    <span class="mars-footer-icon">
                       <strong></strong>
                    </span>{' '}
                    <span class="mars-footer-label">
                      <FormattedMessage id="welcome.cookiesNotice" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.mars.com/legal"
                    onclick="_gaq.push(['_trackEvent', 'footer', 'click', '3'])"
                  >
                    <span class="mars-footer-icon">
                       <strong></strong>
                    </span>{' '}
                    <span class="mars-footer-label">
                      <FormattedMessage id="welcome.legal" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.mars.com/accessibility"
                    onclick="_gaq.push(['_trackEvent', 'footer', 'click', '4'])"
                  >
                    <span class="mars-footer-icon">
                       <strong></strong>
                    </span>{' '}
                    <span class="mars-footer-label">
                      <FormattedMessage id="welcome.accessibility" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.mars.com/mars-incorporated-adchoices-united-states"
                    onclick="_gaq.push(['_trackEvent', 'footer', 'click', '5'])"
                  >
                    <span class="mars-footer-icon">
                       <strong></strong>
                    </span>{' '}
                    <span class="mars-footer-label">
                      <FormattedMessage id="welcome.adChoices" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.mars.com/legal/ca-supply-chain-act"
                    onclick="_gaq.push(['_trackEvent', 'footer', 'click', '6'])"
                  >
                    <span class="mars-footer-icon">
                       <strong></strong>
                    </span>{' '}
                    <span class="mars-footer-label">
                      <FormattedMessage id="welcome.cASupplyChainTransparencyAct" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.mars.com/modern-slavery-act"
                    onclick="_gaq.push(['_trackEvent', 'footer', 'click', '7'])"
                  >
                    <span class="mars-footer-icon">
                       <strong></strong>
                    </span>{' '}
                    <span class="mars-footer-label">
                      <FormattedMessage id="welcome.modernSlaveryAct" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.mars.com/contact-us"
                    onclick="_gaq.push(['_trackEvent', 'footer', 'click', '8'])"
                  >
                    <span class="mars-footer-icon">
                       <strong></strong>
                    </span>{' '}
                    <span class="mars-footer-label">
                      <FormattedMessage id="welcome.contactUS" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}
