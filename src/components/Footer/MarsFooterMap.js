import React from 'react';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';

@inject('configStore')
@observer
class MarsFooterMap extends React.Component {
  render() {
    const marsFooterMap = {
      es: (
        <div id="mars-footer-panel">
          <div className="mars-footer-container">
            <ul className="mars-footer-list-right" style={{ fontSize: '10px' }}>
              <li>
                <a
                  target="_blank"
                  href={this.props.configStore.privacyPolicyUrl}
                  rel="noopener noreferrer"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.confidentiality" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href={this.props.configStore.cookiesUrl}
                  rel="noopener noreferrer"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.cookies" />
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href={this.props.configStore.legalTerms} rel="noopener noreferrer">
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.legalTerms" />
                  </span>
                </a>
              </li>
            </ul>
            <div
              className="mars-footer-legal text-center"
              style={{ fontSize: '10px' }}
            >
              <p>
                <FormattedMessage id="footer.copyrightInfo" />
              </p>
            </div>
          </div>
        </div>
      ),
      en: (
        <div id="mars-footer-panel">
          <div className="mars-footer-container">
            <ul className="mars-footer-list-right" style={{ fontSize: '10px' }}>
              <li>
                <a target="_blank" href="https://www.mars.com/privacy" rel="noopener noreferrer">
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.confidentiality" />
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.mars.com/cookies-english" rel="noopener noreferrer">
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.cookies" />
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.mars.com/legal" rel="noopener noreferrer">
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.legalTerms" />
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.mars.com/accessibility" rel="noopener noreferrer">
                  <span className="mars-footer-label">Accessibility</span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/legal/ca-supply-chain-act"
                  rel="noopener noreferrer"
                >
                  <span className="mars-footer-label">CA Supply Chain Act</span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/modern-slavery-act"
                  rel="noopener noreferrer"
                >
                  <span className="mars-footer-label">Modern Slavery Act</span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/mars-incorporated-adchoices-united-states"
                  rel="noopener noreferrer"
                >
                  <span className="mars-footer-label">AdChoices</span>
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
            <ul className="mars-footer-list-right" style={{ fontSize: '10px' }}>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/privacy-policy-germany"
                  rel="noopener noreferrer"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.privacy" />
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.mars.com/cookies-germany" rel="noopener noreferrer">
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.cookies2" />
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.mars.com/legal-germany" rel="noopener noreferrer">
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.termsOfUse" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.royalcanin.com/de/about-us/imprint"
                  rel="noopener noreferrer"
                >
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.impress" />
                  </span>
                </a>
              </li>
            </ul>
            <div
              className="mars-footer-legal text-center"
              style={{ fontSize: '10px' }}
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
            <ul className="mars-footer-list-right" style={{ fontSize: '10px' }}>
              <li>
                <a
                  target="_blank"
                  href="https://www.mars.com/privacy-policy-france"
                  rel="noopener noreferrer"
                >       
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.privacy" />
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.mars.com/cookies-france" rel="noopener noreferrer">
                  
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.cookies2" />
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.mars.com/legal-france" rel="noopener noreferrer">          
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.termsOfUse" />
                  </span>  
                </a>
              </li>
            </ul>
            <div
              className="mars-footer-legal text-center"
              style={{ fontSize: '10px' }}
            >
              <p style={{color:'rgb(102,102,102)'}}>
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
                  rel="noopener noreferrer"
                >
                  <span className="mars-footer-icon">
                     <strong></strong>
                  </span>{' '}
                  <span className="mars-footer-label">Конфиденциальность</span>
                </a>
              </li>{' '}
              <li>
                <a target="_blank" href="https://www.mars.com/cookies-russia" rel="noopener noreferrer">
                  <span className="mars-footer-icon">
                     <strong></strong>
                  </span>{' '}
                  <span className="mars-footer-label">Файлы Cookies</span>
                </a>
              </li>{' '}
              <li>
                <a target="_blank" href="https://www.mars.com/legal-russia" rel="noopener noreferrer">
                  <span className="mars-footer-icon">
                     <strong></strong>
                  </span>{' '}
                  <span className="mars-footer-label">Юридические условия</span>
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
    return <div>{marsFooterMap[process.env.REACT_APP_LANG]}</div>;
  }
}
export default MarsFooterMap;
