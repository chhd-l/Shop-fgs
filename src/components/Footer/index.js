import React from 'react';
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { inject, observer } from 'mobx-react';
import './index.css'

@inject("configStore")
@observer
class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount () {
    this.props.configStore.queryConfig()
  }
  render () {
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
      </div>
    }

    const cookieSettingsBtn = {
      es: <a className="optanon-show-settings">Cookie Settings</a>,
      en: <a className="optanon-show-settings">Cookie Settings</a>,
      de: <button id="ot-sdk-btn" class="ot-sdk-show-settings">Cookie Settings</button>
    }
    const scrollToTop = () => {
      const widget = document.querySelector('#page-top')
      widget && widget.scrollIntoView()
    }
    return (
      <footer className="rc-bg-colour--interface-dark" id="footer">
        <div className="rc-max-width--lg rc-scroll--y">
          <div className="rc-layout-container rc-md-up">
            <div className="rc-column rc-text--right">
              <a className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-up--xs rc-brand3" role="menuitem" onClick={scrollToTop} style={{ color: '#f6f6f6' }}>
                <FormattedMessage id="footer.toTheTop" />
              </a>
            </div>
          </div>
          <div className="rc-divider rc-md-up"></div>
          <div className="rc-layout-container rc-one-column">
            <div className="rc-column rc-padding-x--xs--desktop rc-padding-x--none--mobile">
              <nav data-toggle-group="mobile" data-toggle-effect="rc-expand--vertical" className="rc-padding-x--xs--desktop rc-padding-x--none--mobile">
                <ul className="rc-list rc-list--blank rc-list--align rc-list--inverse d-flex justify-content-between flex-wrap flex-md-nowrap" role="menubar">
                  <li className="rc-list__item rc-list__item--group rc-full-width">
                    <div className="rc-list__header" id="footer-head-158504765613564650" data-toggle="footer-list-158504765613564650" role="menuitem">
                      <h3 className="rc-padding-left--md--mobile">
                        <FormattedMessage id="footer.aboutRoyalCanin" />
                      </h3>
                    </div>
                    <ul className="list list--blank list--align" id="footer-list-158504765613564650" aria-labelledby="footer-head-158504765613564650" role="menu">
                      <li className="rc-list__item">
                        <a className="rc-list__link text-decoration-none color-f6f6f6" href={this.props.configStore.contactUsUrl} role="menuitem">
                          <FormattedMessage id="aboutUs2" />
                        </a>
                      </li>
                      <li className="rc-list__item">
                        <a className="rc-list__link text-decoration-none color-f6f6f6" href="https://www.royalcanin.com/mx/about-us/our-values" role="menuitem">
                          <FormattedMessage id="footer.ourValues" />
                        </a>
                      </li>
                      <li className="rc-list__item">
                        <a className="rc-list__link text-decoration-none color-f6f6f6" href="https://www.royalcanin.com/mx/about-us/quality-and-food-safety" role="menuitem">
                          <FormattedMessage id="footer.qualityAndSafety" />
                        </a>
                      </li>
                      <li className="rc-list__item">
                        <a className="rc-list__link text-decoration-none color-f6f6f6" href="https://www.royalcanin.com/mx/cats/health-and-wellbeing" role="menuitem">
                          <FormattedMessage id="footer.healthAndNutrition" />
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="rc-list__item rc-list__item--group rc-full-width">
                    <div className="rc-list__header" id="footer-head-158504765613561849" data-toggle="footer-list-158504765613561849" role="menuitem">
                      <h3 className="rc-padding-left--md--mobile">
                        <FormattedMessage id="footer.products" />
                      </h3>
                    </div>
                    <ul className="list list--blank list--align" id="footer-list-158504765613561849" aria-labelledby="footer-head-158504765613561849" role="menu">
                      <li className="rc-list__item">
                        <Link className="rc-list__link text-decoration-none color-f6f6f6" to="/list/cats" role="menuitem">
                          <FormattedMessage id="cats" />
                        </Link>
                      </li>
                      <li className="rc-list__item">
                        <Link className="rc-list__link text-decoration-none color-f6f6f6" to="/list/dogs" role="menuitem">
                          <FormattedMessage id="dogs" />
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="rc-list__item rc-list__item--group rc-full-width">
                    <div className="rc-list__header" id="footer-head-158504765613551093" data-toggle="footer-list-158504765613551093" role="menuitem">
                      <h3 className="rc-padding-left--md--mobile">
                        <FormattedMessage id="footer.help" />
                      </h3>
                    </div>
                    <ul className="list list--blank list--align" id="footer-list-158504765613551093" aria-labelledby="footer-head-158504765613551093" role="menu">
                      <li className="rc-list__item">
                        <Link className="rc-list__link text-decoration-none color-f6f6f6" to="/help" role="menuitem">
                          <FormattedMessage id="footer.contacts" />
                        </Link>
                      </li>
                      <li className="rc-list__item">
                        <Link className="rc-list__link text-decoration-none color-f6f6f6" to="/FAQ" role="menuitem">
                          <FormattedMessage id="footer.FAQ" />
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="rc-list__item rc-list__item--group rc-full-width">
                    <div className="rc-list__header" id="footer-head-158504765613549553" data-toggle="footer-list-158504765613549553" role="menuitem">
                      <h3 className="rc-padding-left--md--mobile">
                        <FormattedMessage id="footer.Additionally" />
                      </h3>
                    </div>
                    <ul className="list list--blank list--align" id="footer-list-158504765613549553" aria-labelledby="footer-head-158504765613549553" role="menu">
                      <li className="rc-list__item">
                        <Link className="rc-list__link text-decoration-none color-f6f6f6" to="/privacypolicy" role="menuitem">
                          <FormattedMessage id="footer.privacyPolicy" />
                        </Link>
                      </li>
                      <li className="rc-list__item">
                        <a className="rc-list__link text-decoration-none color-f6f6f6" href="https://www.mars.com/global/policies/note-to-parents/np-russian" role="menuitem">
                          <FormattedMessage id="footer.informationForParents" />
                        </a>
                      </li>
                      <li className="rc-list__item">
                        <Link className="rc-list__link text-decoration-none color-f6f6f6" to="/termuse" role="menuitem">
                          <FormattedMessage id="footer.websiteTermsOfUse" />
                        </Link>
                      </li>
                      <li className="rc-list__item">
                        <a className="rc-list__link text-decoration-none color-f6f6f6" href="https://www.mars.com/cookies-spain" role="menuitem">
                          <FormattedMessage id="footer.cookieCollectionPolicy" />
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="rc-list__item rc-list__item--group rc-full-width"></li>
                </ul>
              </nav>

            </div>
          </div>
          <div className="rc-divider rc-md-up"></div>
          <div className="rc-layout-container rc-one-column rc-padding-x--xs--desktop rc-margin-top--md--desktop rc-padding-x--none--mobile">
            <div className="rc-column rc-padding-bottom--none rc-padding-top--lg--mobile">
              <p className="rc-espilon rc-text--inverse">
                <FormattedMessage id="footer.contactRoyalCanin" />
              </p>
              <div className="rc-text--inverse">
                <p>{this.props.configStore.contactTimePeriod}</p>
              </div>
            </div>
          </div>
          <div className="rc-layout-container rc-two-column rc-padding-x--xs--desktop">
            <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile rc-text--center--sm-down">
              <a className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-mobile--xs rc-brand3" role="menuitem" href={`tel:${this.props.configStore.storeContactPhoneNumber}`}>
                {this.props.configStore.storeContactPhoneNumber}
              </a>
              <Link className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3" role="menuitem" to="/help">
                <FormattedMessage id="footer.contactUs" />
              </Link>
            </div>
          </div>
          {marsFooterMap[process.env.REACT_APP_LANG]}
        </div>
        {/* <!-- OneTrust Cookies Settings button start --> */}
        {cookieSettingsBtn[process.env.REACT_APP_LANG]}
        {/* <!-- OneTrust Cookies Settings button end --> */}
      </footer>
    )
  }
}

export default Footer;