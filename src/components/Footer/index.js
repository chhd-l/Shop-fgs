import React from 'react';
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import './index.css'

function Footer () {
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
              <ul className="rc-list rc-list--five-column rc-list--blank rc-list--align rc-list--inverse" role="menubar">
                <li className="rc-list__item rc-list__item--group">
                  <button className="rc-list__header" id="footer-head-158504765613564650" data-toggle="footer-list-158504765613564650" role="menuitem">
                    <h3 className="rc-padding-left--md--mobile">
                      <FormattedMessage id="footer.aboutRoyalCanin" />
                    </h3>
                  </button>
                  <ul className="list list--blank list--align" id="footer-list-158504765613564650" aria-labelledby="footer-head-158504765613564650" role="menu">
                    <li className="rc-list__item">
                      <a className="rc-list__link" href="https://www.royalcanin.com/mx/about-us" role="menuitem">
                        <FormattedMessage id="aboutUs2" />
                      </a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link" href="https://www.royalcanin.com/mx/about-us/our-values" role="menuitem">
                        <FormattedMessage id="footer.ourValues" />
                      </a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link" href="https://www.royalcanin.com/mx/about-us/quality-and-food-safety" role="menuitem">
                        <FormattedMessage id="footer.qualityAndSafety" />
                      </a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link" href="https://www.royalcanin.com/mx/cats/health-and-wellbeing" role="menuitem">
                        <FormattedMessage id="footer.healthAndNutrition" />
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="rc-list__item rc-list__item--group">
                  <button className="rc-list__header" id="footer-head-158504765613561849" data-toggle="footer-list-158504765613561849" role="menuitem">
                    <h3 className="rc-padding-left--md--mobile">
                      <FormattedMessage id="footer.products" />
                    </h3>
                  </button>
                  <ul className="list list--blank list--align" id="footer-list-158504765613561849" aria-labelledby="footer-head-158504765613561849" role="menu">
                    <li className="rc-list__item">
                      <Link className="rc-list__link" to="/list/cats" role="menuitem">
                        <FormattedMessage id="cats" />
                      </Link>
                    </li>
                    <li className="rc-list__item">
                      <Link className="rc-list__link" to="/list/dogs" role="menuitem">
                        <FormattedMessage id="dogs" />
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="rc-list__item rc-list__item--group">
                  <button className="rc-list__header" id="footer-head-158504765613551093" data-toggle="footer-list-158504765613551093" role="menuitem">
                    <h3 className="rc-padding-left--md--mobile">
                      <FormattedMessage id="footer.help" />
                    </h3>
                  </button>
                  <ul className="list list--blank list--align" id="footer-list-158504765613551093" aria-labelledby="footer-head-158504765613551093" role="menu">
                    <li className="rc-list__item">
                      <a className="rc-list__link" href="https://www.royalcanin.com/mx/contact-us" role="menuitem">
                        <FormattedMessage id="footer.contacts" />
                      </a>
                    </li>
                    <li className="rc-list__item">
                      <Link className="rc-list__link" to="/FAQ" role="menuitem">
                        <FormattedMessage id="footer.FAQ" />
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="rc-list__item rc-list__item--group">
                  <button className="rc-list__header" id="footer-head-158504765613549553" data-toggle="footer-list-158504765613549553" role="menuitem">
                    <h3 className="rc-padding-left--md--mobile">
                      <FormattedMessage id="footer.Additionally" />
                    </h3>
                  </button>
                  <ul className="list list--blank list--align" id="footer-list-158504765613549553" aria-labelledby="footer-head-158504765613549553" role="menu">
                    <li className="rc-list__item">
                      <a className="rc-list__link" href="https://www.mars.com/privacy-policy-mexico" role="menuitem">
                        <FormattedMessage id="footer.privacyPolicy" />
                      </a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link" href="https://www.mars.com/global/policies/note-to-parents/np-russian" role="menuitem">
                        <FormattedMessage id="footer.informationForParents" />
                      </a>
                    </li>
                    <li className="rc-list__item">
                      <Link className="rc-list__link" to="/termuse" role="menuitem">
                        <FormattedMessage id="footer.websiteTermsOfUse" />
                      </Link>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link" href="https://www.mars.com/cookies-spain" role="menuitem">
                        <FormattedMessage id="footer.cookieCollectionPolicy" />
                      </a>
                    </li>
                  </ul>
                </li>
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
              <p><FormattedMessage id="footer.contactUsInfo" /></p>
            </div>
          </div>
        </div>
        <div className="rc-layout-container rc-two-column rc-padding-x--xs--desktop">
          <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile rc-text--center--sm-down">
            <a className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-mobile--xs rc-brand3" role="menuitem" href="tel:8000247764">
              800 024 77 64
            </a>
            <a className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3" role="menuitem" href="https://www.royalcanin.com/mx/contact-us">
              <FormattedMessage id="footer.contactUs" />
            </a>
          </div>
        </div>
        <div id="mars-footer-panel">
          <div className="mars-footer-container">
            <ul className="mars-footer-list-right" style={{ fontSize: '10px', fontFamily: 'Inherit' }}>
              <li>
                <a target="_blank" href="https://www.mars.com/privacy-policy-mexico">
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.confidentiality" />
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.mars.com/cookies-spain">
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.cookies" />
                  </span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.mars.com/legal-mexico">
                  <span className="mars-footer-label">
                    <FormattedMessage id="footer.legalTerms" />
                  </span>
                </a>
              </li>
            </ul>
            <div className="mars-footer-legal" style={{ fontSize: '10px', fontFamily: 'Inherit' }}>
              <p style={{ textAlign: 'center' }}><FormattedMessage id="footer.copyrightInfo" /></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;