import React from 'react';

function MegaMenu () {
  return (
    <div data-js-modal-menu>
      <header className="rc-modal__header rc-md-up">
        <button className="rc-modal__close rc-btn rc-btn--icon-label rc-icon rc-close--xs rc-iconography"
          data-modal-trigger="main-nav-modal">Close</button>
        <a href="/">
          <span className="rc-screen-reader-text">Royal Canin Logo</span>
          <object id="main-logo" data="https://d1a19ys8w1wkc1.cloudfront.net/logo--crown.svg?v=8-7-8" type="image/svg+xml"
            className="rc-modal__logo" data-js-import-interactive-svg>
            <img src="https://d1a19ys8w1wkc1.cloudfront.net/1x1.gif?v=8-7-8"
              style={{ backgroundImage: 'url(https://d1a19ys8w1wkc1.cloudfront.net/logo--crown.png?v=8-7-8)' }} width="150"
              height="100" alt="Royal Canin logo" />
          </object>
        </a>
      </header>
      <section className="rc-max-width--xl">
        <div className="rc-column rc-lg-up rc-padding--lg">
          <h1 className="rc-gamma rc-padding-x--md">Working together for the ultimate brand experience</h1>
          <img className="rc-padding--sm" src="./assets/images/Getting-Started.jpg" alt="Royal Canin Design Language" />
        </div>
        <nav className="rc-nav rc-hidden" data-toggle-group="mobile" data-toggle-effect="rc-expand--horizontal"
          data-js-target="mobile-push-nav">
          <div className="rc-layout-container rc-three-column">
            <div className="rc-column rc-double-width rc-padding-x--none--mobile rc-padding-right--none">
              <ul className="rc-list rc-list--blank rc-list--align rc-list--two-column" role="menubar">


                <li className="rc-list__item rc-list__item--group">
                  <a href="/getting-started/overview/about_design_language.html" className="rc-list__header"
                    id="mega-nav-header-1" data-toggle="nav-list-1" role="menuitem">Getting Started</a>
                  <ul className="rc-list rc-list--blank rc-list--align" id="nav-list-1" aria-labelledby="mega-nav-menu-1"
                    role="menu">
                    <li className="rc-list__item rc-md-down">
                      <button className="rc-list__link rc-icon rc-left--xs rc-iconography" data-toggle="nav-list-1"
                        role="button">Back</button>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/getting-started/overview/about_design_language.html"
                        role="menuitem">Overview</a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/getting-started/support/submit_an_issue.html"
                        role="menuitem">Support</a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/getting-started/usage/boilerplate.html" role="menuitem">Usage</a>
                    </li>
                  </ul>
                </li>

                <li className="rc-list__item rc-list__item--group">
                  <a href="/getting-started/support/submit_an_issue.html" className="rc-list__header" id="mega-nav-header-2"
                    data-toggle="nav-list-2" role="menuitem">Help</a>
                  <ul className="rc-list rc-list--blank rc-list--align" id="nav-list-2" aria-labelledby="mega-nav-menu-2"
                    role="menu">
                    <li className="rc-list__item rc-md-down">
                      <button className="rc-list__link rc-icon rc-left--xs rc-iconography" data-toggle="nav-list-2"
                        role="button">Back</button>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/getting-started/support/submit_an_issue.html"
                        role="menuitem">Help</a>
                    </li>
                  </ul>
                </li>

                <li className="rc-list__item rc-list__item--group">
                  <a href="/ui-framework/brand_identity/colour.html" className="rc-list__header" id="mega-nav-header-3"
                    data-toggle="nav-list-3" role="menuitem">Ui Framework</a>
                  <ul className="rc-list rc-list--blank rc-list--align" id="nav-list-3" aria-labelledby="mega-nav-menu-3"
                    role="menu">
                    <li className="rc-list__item rc-md-down">
                      <button className="rc-list__link rc-icon rc-left--xs rc-iconography" data-toggle="nav-list-3"
                        role="button">Back</button>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/ui-framework/brand_identity/colour.html" role="menuitem">Brand
                  Identity</a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/ui-framework/elements/alerts.html" role="menuitem">Elements</a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/ui-framework/components/accordion.html"
                        role="menuitem">Components</a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/ui-framework/layouts/breakpoint_utilities.html"
                        role="menuitem">Layouts</a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/ui-framework/templates/starter.html"
                        role="menuitem">Templates</a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/ui-framework/visual_styles/block_styles.html"
                        role="menuitem">Visual Styles</a>
                    </li>
                    <li className="rc-list__item">
                      <a className="rc-list__link ca" href="/ui-framework/documentation/utility_classNamees.html"
                        role="menuitem">Documentation</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="rc-column rc-padding-x--none">
              <ul className="rc-list rc-list--blank rc-list--align rc-btn-offset--top" role="menu">
                <li className="rc-list__item">
                  <a className="rc-list__link rc-icon rc-email--xs rc-iconography--xs" role="menuitem"
                    href="/getting-started/support/submit_an_issue.html">Submit an issue</a>
                </li>
                <li className="rc-list__item">
                  <a className="rc-list__link rc-icon rc-advice--xs rc-iconography--xs" role="menuitem"
                    href="mailto:designlanguagesupport@homeagency.co.uk">Contact us</a>
                </li>
                <li className="rc-list__item">
                  <a className="rc-list__link rc-icon rc-actions--xs rc-iconography--xs" role="menuitem"
                    href="/getting-started/usage/resources.html">Downloads</a>
                </li>
                <li className="rc-list__item rc-md-down">
                  <a target="_blank" className="rc-btn rc-btn--icon-label rc-flag rc-gb--xs" role="menuitem"
                    href="https://www.royalcanin.com/uk">United Kingdom</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </div>
  )
}

export default MegaMenu;