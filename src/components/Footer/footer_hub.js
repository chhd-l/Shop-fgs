import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { cookieSettingsBtn } from './cookieSettingsBtn';
import MarsFooterMap from './MarsFooterMap';
import { menubar } from './menubar';
import { contactInfo } from './contactInfo';
import './index.css';
import LoginButton from '@/components/LoginButton';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import footerHubResult from './mock';

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('configStore')
@observer
class FooterHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_menubar: menubar[process.env.REACT_APP_LANG] || [],
      cur_contactInfo: contactInfo[process.env.REACT_APP_LANG] || null,
      footerInfo: {}
    };
  }
  componentDidMount() {
    this.props.configStore.queryConfig();
    // axios.get('/footer/getmodel').then((res) => {
    //     this.setState({ footerInfo: res.data })
    // })
    this.setState({ footerInfo: footerHubResult.data });
  }
  scrollToTop = () => {
    const widget = document.querySelector('#page-top');
    widget && widget.scrollIntoView();
  };
  render() {
    if (Object.keys(this.state.footerInfo).length == 0) return null;
    const { isLogin, history } = this.props;
    const {
      localMarketSettings: { contactUsUrl, contactPhone },
      menuGroups,
      menuInfoItems,
      menuItems
    } = this.state.footerInfo;
    return (
      <footer className="rc-bg-colour--interface-dark" id="footer">
        <div className="rc-max-width--xl rc-scroll--y">
          {/* MenuItems PC     */}
          <div className="rc-md-up rc-layout-container rc-two-column rc-padding-x--xs--desktop">
            <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile rc-text--center--sm-down">
              {isLogin ? (
                <a
                  className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-user--xs rc-brand3"
                  role="menuitem"
                  href={`${menuItems[0].link.url}`}
                >
                  {menuItems[0].link.text}
                </a>
              ) : (
                <LoginButton
                  className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-user--xs rc-brand3"
                  history={history}
                >
                  {menuItems[0].link.text}
                </LoginButton>
              )}

              <a
                className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-cart--xs rc-brand3"
                role="menuitem"
                href={menuItems[1].link.url}
                style={{ color: '#fff' }}
              >
                {menuItems[1].link.text}
              </a>
              <Link
                className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-language--xs rc-brand3"
                to="/language"
                style={{ color: '#fff' }}
              >
                <FormattedMessage id="language" />
              </Link>
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
          <div className="rc-divider rc-md-up"></div>
          {/* MenuGroups */}
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
                  {menuGroups.map((item, index) => {
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
                          <a href={item.link.url} className="color-f6f6f6">
                            {item.link.text}
                          </a>
                        </h3>
                        <ul
                          className="rc-list rc-list--blank rc-list--align"
                          role="menu"
                          id={`nav-footer-list-${index}`}
                          aria-labelledby={`nav-footer-${index}`}
                        >
                          {item.menuItems
                            ? item.menuItems.map((listItem, i) => {
                                return (
                                  <li className="rc-list__item" key={i}>
                                    <a
                                      className="rc-list__link text-decoration-none color-f6f6f6"
                                      href={listItem.link.url}
                                      target="_blank"
                                      role="menuitem"
                                      rel="nofollow"
                                    >
                                      {listItem.link.text}
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
          <div className="rc-divider rc-md-up"></div>
          {/* MenuItems Mobile */}
          <div className="rc-md-down rc-layout-container rc-one-column rc-padding-x--xs--desktop rc-margin-top--md--desktop rc-padding-x--none--mobile">
            <div className="rc-column rc-padding-bottom--none">
              <div>
                <a
                  className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-user--xs rc-brand3"
                  role="menuitem"
                  style={{ marginLeft: '-.8rem' }}
                  href={`${menuItems[0].link.url}`}
                >
                  {menuItems[0].link.text}
                </a>
              </div>
              <div>
                <a
                  className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-cart--xs rc-brand3"
                  role="menuitem"
                  href={menuItems[1].link.url}
                  style={{ marginLeft: '-.8rem' }}
                >
                  {menuItems[1].link.text}
                </a>
              </div>
              <div>
                <Link
                  className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-language--xs rc-brand3"
                  to="/language"
                  style={{ marginLeft: '-.8rem' }}
                >
                  {process.env.REACT_APP_LANG}
                </Link>
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
          <div className="rc-layout-container rc-one-column rc-padding-x--xs--desktop rc-margin-top--md--desktop rc-padding-x--none--mobile">
            <div className="rc-column rc-padding-bottom--none rc-padding-top--lg--mobile">
              <p className="rc-espilon rc-text--inverse">
                {menuInfoItems[0].title}
              </p>
              <div className="rc-text--inverse">
                <p>{menuInfoItems[0].content}</p>
              </div>
            </div>
          </div>
          {/* LocalMarketSettings */}
          <div className="rc-layout-container rc-two-column rc-padding-x--xs--desktop">
            {this.state.cur_contactInfo && (
              <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile">
                <a
                  className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-mobile--xs rc-brand3"
                  role="menuitem"
                  href={`tel:${contactPhone}`}
                >
                  {contactPhone}
                </a>
                <a
                  className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3"
                  role="menuitem"
                  href={contactUsUrl.url}
                  style={{ color: '#fff' }}
                >
                  {contactUsUrl.text}
                </a>
              </div>
            )}
          </div>
          {/* 底部横向链接 */}
          <MarsFooterMap />
        </div>
        {/* <!-- OneTrust Cookies Settings button start --> */}
        {cookieSettingsBtn[process.env.REACT_APP_LANG]}
        {/* <!-- OneTrust Cookies Settings button end --> */}
      </footer>
    );
  }
}

export default withRouter(FooterHub);
