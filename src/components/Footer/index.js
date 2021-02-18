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
import { withRouter } from 'react-router-dom'

const sessionItemRoyal = window.__.sessionItemRoyal;

@inject('configStore', 'loginStore')
@observer
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_menubar: menubar[process.env.REACT_APP_LANG] || [],
      cur_contactInfo: contactInfo[process.env.REACT_APP_LANG] || null
    };
  }
  async componentDidMount() {
    this.props.configStore.queryConfig();
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  scrollToTop = () => {
    const widget = document.querySelector('#page-top');
    widget && widget.scrollIntoView();
  };
  render() {
    return (
      <footer className="rc-bg-colour--interface-dark" id="footer">
        <div className="rc-max-width--xl rc-scroll--y">
          <div className="rc-layout-container rc-three-column rc-md-up">
            <div className="rc-column rc-text--right">
              <span
                className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-up--xs rc-brand3 text-white ui-cursor-pointer"
                onClick={this.scrollToTop}
                role="back to top"
              >
                <FormattedMessage id="footer.toTheTop" />
              </span>
            </div>
          </div>
          <div className="rc-divider rc-md-up"></div>
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
                  {this.state.cur_menubar.map((item, index) => {
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
                          <FormattedMessage id={item[0].titleId} />
                        </h3>
                        <ul
                          className="rc-list rc-list--blank rc-list--align"
                          role="menu"
                          id={`nav-footer-list-${index}`}
                          aria-labelledby={`nav-footer-${index}`}
                        >
                          {item[0].list.map((listItem, i) => {
                            return (
                              <li className="rc-list__item" key={i}>
                                {!!listItem.link ? (listItem.needLogin && !this.isLogin?(
                                  <LoginButton
                                    beforeLoginCallback={ async () => {
                                      sessionItemRoyal.set('okta-redirectUrl', listItem.link);  
                                    }}
                                    btnClass="rc-list__link text-decoration-none color-f6f6f6"
                                    history={this.props.history}
                                  >
                                    <FormattedMessage id={listItem.messageId} />
                                  </LoginButton>
                                ): (
                                  <Link
                                    className="rc-list__link text-decoration-none color-f6f6f6"
                                    to={listItem.link}
                                    role="menuitem"
                                  >
                                    <FormattedMessage id={listItem.messageId} />
                                  </Link>
                                )) : (
                                  <a
                                    className="rc-list__link text-decoration-none color-f6f6f6"
                                    href={
                                      (!!listItem.prop &&
                                        this.props.configStore[
                                          listItem.prop
                                        ]) ||
                                      listItem.url
                                    }
                                    target="_blank"
                                    role="menuitem"
                                    rel="nofollow"
                                  >
                                    <FormattedMessage id={listItem.messageId} />
                                  </a>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
          <div className="rc-divider rc-md-up"></div>
          {/*tips */}
          <div className="rc-layout-container rc-one-column rc-padding-x--xs--desktop rc-margin-top--md--desktop rc-padding-x--none--mobile">
            <div className="rc-column rc-padding-bottom--none rc-padding-top--lg--mobile">
              <p className="rc-espilon rc-text--inverse">
                <FormattedMessage id="footer.contactRoyalCanin" />
              </p>
              <div className="rc-text--inverse">
                <p>
                  {process.env.REACT_APP_LANG == 'fr'
                    ? 'Nos spécialistes sont disponibles de 8h30 à 12h30 et de 14h à 17h du lundi au vendredi.'
                    : this.props.configStore.contactTimePeriod}
                </p>
                <p>
                  <FormattedMessage
                    id="contactUsViaPhone"
                    defaultMessage={' '}
                  />
                </p>
              </div>
            </div>
          </div>
          {/* mail and phone */}
          <div className="rc-layout-container rc-two-column rc-padding-x--xs--desktop">
            {this.state.cur_contactInfo && (
              <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile rc-text--center--sm-down">
                <a
                  style={{
                    display:
                      process.env.REACT_APP_LANG == 'fr'
                        ? 'none'
                        : 'inline-block'
                  }}
                  className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-mobile--xs rc-brand3"
                  role="menuitem"
                  href={`tel:${
                    this.props.configStore[
                      this.state.cur_contactInfo.phoneNumber.prop
                    ]
                  }`}
                >
                  {
                    this.props.configStore[
                      this.state.cur_contactInfo.phoneNumber.prop
                    ]
                  }
                </a>
                {!!this.state.cur_contactInfo.email.link ? (
                  <Link
                    className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3"
                    role="menuitem"
                    to={this.state.cur_contactInfo.email.link}
                  >
                    <FormattedMessage id="footer.contactUs" />
                  </Link>
                ) : (
                  <a
                    className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3"
                    role="menuitem"
                    href={this.state.cur_contactInfo.email.url}
                    style={{ color: '#fff' }}
                  >
                    <FormattedMessage id="footer.email" />
                  </a>
                )}
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

export default withRouter(Footer);
