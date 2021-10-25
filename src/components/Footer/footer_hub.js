import React from 'react';
import { FormattedMessage } from 'react-intl';
import { cookieSettingsBtn } from './cookieSettingsBtn';
import MarsFooterMap from './MarsFooterMap';
import { menubar } from './menubar';
import { contactInfo } from './contactInfo';
import './index.css';
import LoginButton from '@/components/LoginButton';
import { withRouter, Link } from 'react-router-dom';
import Language from '@/components/Language';
import { queryApiFromSessionCache } from '@/utils/utils';
import { getFooter } from '@/api/hub';
import footerHubResult from './mock';

class FooterHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_menubar: menubar[window.__.env.REACT_APP_COUNTRY] || [],
      cur_contactInfo: contactInfo[window.__.env.REACT_APP_COUNTRY] || null,
      footerInfo: {}
    };
  }
  componentDidMount() {
    queryApiFromSessionCache({ sessionKey: 'footer-hub', api: getFooter }).then(
      (res) => {
        this.setState({ footerInfo: res.data });
      }
    );
    let timer = setInterval(() => {
      let cookieDomBox = document.querySelector('.cookieSettingBox');
      if (cookieDomBox && document.querySelector('#mars-footer-panel')) {
        document.querySelector('#mars-footer-panel').append(cookieDomBox);
        cookieDomBox.style.visibility = 'visible';
        clearInterval(timer);
      }
    }, 1000);
    // this.setState({ footerInfo: footerHubResult.data });
  }
  scrollToTop = () => {
    const widget = document.querySelector('#page-top');
    widget && widget.scrollIntoView();
  };
  render() {
    const { footerInfo, cur_contactInfo } = this.state;
    const { isLogin, history } = this.props;
    if (Object.keys(footerInfo).length == 0) return null;
    const {
      LocalMarketSettings,
      MenuGroups,
      MenuInfoItems,
      MenuItems
    } = footerInfo;
    const { ContactUsUrl, ContactPhone } = LocalMarketSettings || {};

    return (
      <>
        <footer
          className="rc-bg-colour--interface-dark hub-footer"
          id="footer"
          data-tms="Footer"
        >
          <div className="rc-max-width--xl rc-scroll--y">
            {/* MenuItems PC     */}
            <div className="rc-md-up rc-layout-container rc-two-column rc-padding-x--xs--desktop">
              <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile rc-text--center--sm-down">
                {(MenuItems || []).map((item, i) => (
                  <React.Fragment key={i}>
                    {item.Icon === 'user' && !isLogin ? (
                      <Link
                        to="/account"
                        className={`rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-${item.Icon}--xs rc-brand3`}
                      >
                        {item.Link.Text}
                      </Link>
                    ) : (
                      // <LoginButton
                      //   className={`rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-${item.Icon}--xs rc-brand3`}
                      //   history={history}
                      // >
                      //   {item.Link.Text}
                      // </LoginButton>
                      <a
                        className={`rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-${item.Icon}--xs rc-brand3`}
                        role="menuitem"
                        href={`${item.Link.Url}`}
                      >
                        {item.Link.Text}
                      </a>
                    )}
                  </React.Fragment>
                ))}

                <Language className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-language--xs rc-brand3 text-white" />
                <a
                  style={{
                    position: 'absolute',
                    right: 0
                  }}
                >
                  <span
                    className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-up--xs rc-brand3 text-white ui-cursor-pointer"
                    onClick={this.scrollToTop}
                    role="back to top"
                  >
                    <FormattedMessage id="footer.toTheTop" />
                  </span>
                </a>
              </div>
            </div>
            <div className="rc-divider rc-md-up" />
            {/* MenuGroups */}
            {MenuGroups && MenuGroups.length > 0 ? (
              <div className="rc-layout-container rc-one-column rc-padding-x--xs">
                <div className="rc-column rc-padding-x--xs">
                  <nav
                    data-toggle-group="mobile"
                    data-toggle-effect="rc-expand--vertical"
                    className="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
                  >
                    <ul
                      className="rc-list rc-list--footer-columns rc-list--blank rc-list--align rc-list--inverse"
                      role="menubar"
                    >
                      {MenuGroups.map((item, index) => {
                        return (
                          <li
                            className="rc-list__item rc-list__item--group"
                            key={index}
                          >
                            <h3
                              className="rc-list__header"
                              role="menuitem"
                              data-toggle={`nav-footer-list-${index}`}
                              id={`nav-footer-${index}`}
                            >
                              <a href={item.Link.Url} className="color-f6f6f6">
                                {item.Link.Text}
                              </a>
                            </h3>
                            <ul
                              className="rc-list rc-list--blank rc-list--align"
                              role="menu"
                              id={`nav-footer-list-${index}`}
                              aria-labelledby={`nav-footer-${index}`}
                            >
                              {item.MenuItems
                                ? item.MenuItems.map((listItem, i) => {
                                    return (
                                      <li className="rc-list__item" key={i}>
                                        <a
                                          className="rc-list__link text-decoration-none color-f6f6f6"
                                          href={listItem.Link.Url}
                                          // target="_blank"
                                          role="menuitem"
                                          rel="nofollow"
                                        >
                                          {listItem.Link.Text}
                                        </a>
                                      </li>
                                    );
                                  })
                                : null}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </div>
            ) : null}
            <div className="rc-divider rc-md-up rc-hub-divider2" />
            {/* MenuItems Mobile */}
            <div className="rc-md-down rc-layout-container rc-one-column rc-padding-x--xs--desktop rc-margin-top--md--desktop rc-padding-x--none--mobile">
              <div className="rc-column rc-padding-bottom--none">
                {(MenuItems || []).map((item, i) => (
                  <React.Fragment key={i}>
                    {item.Icon === 'user' && !isLogin ? (
                      <div>
                        <LoginButton
                          className={`rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-${item.Icon}--xs rc-brand3`}
                          history={history}
                          btnStyle={{
                            marginLeft: '-.8rem',
                            fontSize: 'inherit'
                          }}
                        >
                          {item.Link.Text}
                        </LoginButton>
                      </div>
                    ) : (
                      <div>
                        <a
                          className={`rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-${item.Icon}--xs rc-brand3`}
                          role="menuitem"
                          href={item.Link.Url}
                          style={{ marginLeft: '-.8rem' }}
                        >
                          {item.Link.Text}
                        </a>
                      </div>
                    )}
                  </React.Fragment>
                ))}

                <div>
                  <Language
                    className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-language--xs rc-brand3"
                    style={{ marginLeft: '-.8rem' }}
                  />
                </div>

                <div>
                  <a>
                    <span
                      className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-up--xs rc-brand3 text-white ui-cursor-pointer"
                      onClick={this.scrollToTop}
                      role="back to top"
                      style={{ marginLeft: '-.8rem' }}
                    >
                      <FormattedMessage id="footer.toTheTop" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/*MenuInfoItems */}
            {MenuInfoItems && MenuInfoItems[0] ? (
              <div className="rc-layout-container rc-one-column rc-padding-x--xs--desktop rc-margin-top--md--desktop rc-padding-x--none--mobile">
                <div className="rc-column rc-padding-bottom--none rc-padding-top--lg--mobile">
                  <p className="rc-espilon rc-text--inverse">
                    {MenuInfoItems[0]?.Title}
                  </p>
                  <div className="rc-text--inverse">
                    <p>{MenuInfoItems[0]?.Content}</p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* LocalMarketSettings */}
            {cur_contactInfo && ContactUsUrl ? (
              <div className="rc-layout-container rc-two-column rc-padding-x--xs--desktop">
                {cur_contactInfo && (
                  <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile">
                    <a
                      className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-mobile--xs rc-brand3"
                      role="menuitem"
                      href={`tel:${ContactPhone}`}
                    >
                      {ContactPhone}
                    </a>
                    <a
                      className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3 text-white"
                      role="menuitem"
                      href={ContactUsUrl.Url}
                    >
                      {ContactUsUrl.Text}
                    </a>
                  </div>
                )}
              </div>
            ) : null}

            {/* 底部横向链接 */}
            <MarsFooterMap />
          </div>
          {/* <!-- OneTrust Cookies Settings button start --> */}
          <div
            className="cookieSettingBox"
            style={{ visibility: 'hidden', background: '#fff' }}
          >
            {cookieSettingsBtn[window.__.env.REACT_APP_COUNTRY]}
          </div>
          {/* <!-- OneTrust Cookies Settings button end --> */}
        </footer>
      </>
    );
  }
}

export default withRouter(FooterHub);
