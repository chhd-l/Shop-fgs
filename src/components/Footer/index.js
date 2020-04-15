import React from 'react';

function Footer () {
  return (
    <footer className="rc-bg-colour--interface-dark" id="footer">
      <div className="rc-max-width--lg rc-scroll--y">
        <div className="rc-layout-container rc-four-column rc-md-up">
          <div className="rc-column rc-triple-width">
            <nav className="rc-menubar">
              <ul className="rc-list rc-list--blank rc-list--inverse tes">
                <li className="rc-list__item ">
                  <a href="/getting-started/overview/about_design_language.html"
                    className="rc-list__link rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-user--xs rc-brand3">Getting
              Started</a>
                </li>
                <li className="rc-list__item ">
                  <a href="/"
                    className="rc-list__link rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-home--xs rc-brand3">Home</a>
                </li>
                <li className="rc-list__item ">
                  <a href="/terms.html"
                    className="rc-list__link rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-user--xs rc-brand3">Terms &
              Conditions</a>
                </li>
                <li className="rc-list__item ">
                  <a href="/ui-framework/brand_identity/colour.html"
                    className="rc-list__link rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-documents--xs rc-brand3">UI
              Framework</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="rc-column rc-text--right">
            <a className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-up--xs rc-brand3 " href='#'
              role='back to top'>Back to top</a>
          </div>
        </div>
        <div className="rc-divider rc-md-up"></div>
        <div className="rc-layout-container rc-two-column rc-padding-top--md rc-padding-x--xs">
          <div className="rc-column">
            <h1 className="rc-espilon rc-text--inverse">&copy; Royal Canin Design Language: <a className="rc-text--inverse"
              href="/getting-started/overview/releases.html">v 8.7.8</a></h1>
            <p className="rc-text--inverse">Working together for the ultimate brand experience.</p>
          </div>
        </div>
        <div className="rc-layout-container rc-two-column">
          <div className="rc-column rc-padding-x--xs">
            <button className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-mobile--xs rc-brand3 modal__toggle"
              data-modal-trigger="modal-register">Register For Updates</button>
          </div>
          <div className="rc-column rc-text--right rc-padding-x--none"></div>
        </div>
        <div className="rc-layout-container rc-one-column rc-md-down">
          <div className="rc-column rc-padding-x--none">
            <a className=" rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-user--xs rc-brand3"
              href="/getting-started/overview/about_design_language.html">Getting Started</a>
            <a className=" rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-home--xs rc-brand3" href="/">Home</a>
            <a className=" rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-user--xs rc-brand3" href="/terms.html">Terms &
        Conditions</a>
            <a className=" rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-documents--xs rc-brand3"
              href="/ui-framework/brand_identity/colour.html">UI Framework</a>
            <a className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-up--xs rc-brand3 " href='#'
              role='back to top'>Back to top</a>
          </div>
        </div>
      </div>
      <div className="rc-bg-colour--brand4">
        <div
          className="rc-max-width--lg rc-layout-container rc-two-column rc-padding-x--xs--desktop rc-padding-x--none--mobile rc-flex-direction--reverse--sm-down">
          <div className="rc-column rc-double-width rc-padding-x--none">
            <ol className="rc-list rc-list--align rc-list--blank rc-list--inline rc-text--center--sm-down">
              <li className="rc-list__item ">
                <a href="https://www.royalcanin.com/us" className="rc-list__link">© Royal Canin SAS 2019</a>
              </li>
              <li className="rc-list__item ">
                <a href="https://www.mars.com/global/policies/privacy/pp-english" className="rc-list__link">Privacy</a>
              </li>
              <li className="rc-list__item ">
                <a href="/terms.html" className="rc-list__link">Terms</a>
              </li>
              <li className="rc-list__item ">
                <a href="/getting-started/support/submit_an_issue.html" className="rc-list__link">Help</a>
              </li>
              <li className="rc-list__item ">
                <a href="/getting-started/usage/resources.html" className="rc-list__link">Brand Resources</a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;