import React from 'react';
import { FormattedMessage } from 'react-intl'
import { inject, observer } from 'mobx-react';

@inject("configStore")
@observer
class MarsFooterMap extends React.Component {
    constructor(props) {
        super(props);
      }
    async componentDidMount () {
        this.props.configStore.queryConfig()
    }
    render(){
        const marsFooterMap = {
            es: <div id="mars-footer-panel">
              <div className="mars-footer-container">
                <ul className="mars-footer-list-right" style={{ fontSize: '10px' }}>
                  <li>
                    <a target="_blank" href={this.props.configStore.privacyPolicyUrl}>
                      <span className="mars-footer-label">
                        <FormattedMessage id="footer.confidentiality" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={this.props.configStore.cookiesUrl}>
                      <span className="mars-footer-label">
                        <FormattedMessage id="footer.cookies" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={this.props.configStore.legalTerms}>
                      <span className="mars-footer-label">
                        <FormattedMessage id="footer.legalTerms" />
                      </span>
                    </a>
                  </li>
                </ul>
                <div className="mars-footer-legal text-center" style={{ fontSize: '10px' }}>
                  <p><FormattedMessage id="footer.copyrightInfo" /></p>
                </div>
              </div>
            </div>,
            en: <div id="mars-footer-panel">
              <div className="mars-footer-container">
                <ul className="mars-footer-list-right" style={{ fontSize: '10px' }}>
                  <li>
                    <a target="_blank" href={this.props.configStore.privacyPolicyUrl}>
                      <span className="mars-footer-label">
                        <FormattedMessage id="footer.confidentiality" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={this.props.configStore.cookiesUrl}>
                      <span className="mars-footer-label">
                        <FormattedMessage id="footer.cookies" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={this.props.configStore.legalTerms}>
                      <span className="mars-footer-label">
                        <FormattedMessage id="footer.legalTerms" />
                      </span>
                    </a>
                  </li>
                </ul>
                <div className="mars-footer-legal text-center" style={{ fontSize: '10px' }}>
                  <p><FormattedMessage id="footer.copyrightInfo" /></p>
                </div>
              </div>
            </div>,
            de: <div id="mars-footer-panel">
                  <div className="mars-footer-container">
                    <ul className="mars-footer-list-right" style={{ fontSize: '10px' }}>
                      <li>
                        <a target="_blank" href="https://www.mars.com/privacy-policy-germany">
                          <span className="mars-footer-label">
                            <FormattedMessage id="footer.privacy" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://www.mars.com/cookies-germany">
                          <span className="mars-footer-label">
                            <FormattedMessage id="footer.cookies2" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://www.mars.com/legal-germany">
                          <span className="mars-footer-label">
                            <FormattedMessage id="footer.termsOfUse" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://www.royalcanin.com/de/about-us/imprint">
                          <span className="mars-footer-label">
                            <FormattedMessage id="footer.impress" />
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div className="mars-footer-legal text-center" style={{ fontSize: '10px' }}>
                      <p><FormattedMessage id="footer.copyrightInfo2" /></p>
                    </div>
                  </div>
              </div>
          }
        return (
            <div>
                {marsFooterMap[process.env.REACT_APP_LANG]}
            </div>
        )
    }
}
export default MarsFooterMap