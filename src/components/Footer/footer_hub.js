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
import LanguagePage from '@/views/Language';
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
      footerInfo: {},
      languagePopVisible: false
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
  handleClickShowLanguage = () => {
    this.setState({ languagePopVisible: true });
  };
  onLanguagePopClose = () => {
    this.setState({ languagePopVisible: false });
  };
  render() {
    if (Object.keys(this.state.footerInfo).length == 0) return null;
    const { isLogin, history } = this.props;
    const { languagePopVisible } = this.state;
    const {
      LocalMarketSettings: { ContactUsUrl, ContactPhone },
      MenuGroups,
      MenuInfoItems,
      MenuItems
    } = this.state.footerInfo;
  
    return (
      <>
        <footer className="rc-bg-colour--interface-dark" id="footer">
          <div className="rc-max-width--xl rc-scroll--y">
            {/* MenuItems PC     */}
            <div className="rc-md-up rc-layout-container rc-two-column rc-padding-x--xs--desktop">
              <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile rc-text--center--sm-down">
                {isLogin ? (
                  <a
                    className={`rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-${MenuItems[0].ICON}--xs rc-brand3`}
                    role="menuitem"
                    href={`${MenuItems[0].Link.Url}`}
                  >
                    {MenuItems[0].Link.Text}
                  </a>
                ) : (
                  <LoginButton
                    className={`rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-${MenuItems[0].ICON}--xs rc-brand3`}
                    history={history}
                  >
                    {MenuItems[0].Link.Text}
                  </LoginButton>
                )}

                <a
                  className={`rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-user--xs rc-brand3`}
                  role="menuitem"
                  href={MenuItems[1].Link.Url}
                  style={{ color: '#fff' }}
                >
                  {MenuItems[1].Link.Text}
                </a>
                <span
                  className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-language--xs rc-brand3"
                  style={{ color: '#fff' }}
                  onClick={this.handleClickShowLanguage}
                >
                  <FormattedMessage id="language" />
                </span>
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
                                        target="_blank"
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
            <div className="rc-divider rc-md-up"></div>
            {/* MenuItems Mobile */}
            <div className="rc-md-down rc-layout-container rc-one-column rc-padding-x--xs--desktop rc-margin-top--md--desktop rc-padding-x--none--mobile">
              <div className="rc-column rc-padding-bottom--none">
                <div>
                  <a
                    className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-user--xs rc-brand3"
                    role="menuitem"
                    style={{ marginLeft: '-.8rem' }}
                    href={`${MenuItems[0].Link.Url}`}
                  >
                    {MenuItems[0].Link.Text}
                  </a>
                </div>
                <div>
                  <a
                    className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-cart--xs rc-brand3"
                    role="menuitem"
                    href={MenuItems[1].Link.Url}
                    style={{ marginLeft: '-.8rem' }}
                  >
                    {MenuItems[1].Link.Text}
                  </a>
                </div>
                <div>
                  <span
                    className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-language--xs rc-brand3"
                    style={{ marginLeft: '-.8rem' }}
                    onClick={this.handleClickShowLanguage}
                  >
                    <FormattedMessage id="language" />
                  </span>
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
                  {MenuInfoItems[0].Title}
                </p>
                <div className="rc-text--inverse">
                  <p>{MenuInfoItems[0].Content}</p>
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
                    href={`tel:${ContactPhone}`}
                  >
                    {ContactPhone}
                  </a>
                  <a
                    className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3"
                    role="menuitem"
                    href={ContactUsUrl.Url}
                    style={{ color: '#fff' }}
                  >
                    {ContactUsUrl.Text}
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
        {languagePopVisible ? (
          <LanguagePage onClose={this.onLanguagePopClose} />
        ) : null}
      </>
    );
  }
}

export default withRouter(FooterHub);
