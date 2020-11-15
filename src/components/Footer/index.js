import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { cookieSettingsBtn } from './cookieSettingsBtn';
import MarsFooterMap from './MarsFooterMap';
import { menubar } from './menubar';
import { contactInfo } from './contactInfo';
import './index.css';

@inject('configStore')
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

  render() {
    const scrollToTop = () => {
      const widget = document.querySelector('#page-top');
      widget && widget.scrollIntoView();
    };
    return (
      <footer className="rc-bg-colour--interface-dark" id="footer">
        <div className="rc-max-width--lg rc-scroll--y" style={{maxWidth:'1400px'}}>
          <div className="rc-layout-container rc-md-up">
            <div className="rc-column rc-text--right">
              <span
                className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-up--xs rc-brand3"
                role="menuitem"
                onClick={scrollToTop}
                style={{ color: '#f6f6f6' }}
              >
                <FormattedMessage id="footer.toTheTop" />
              </span>
            </div>
          </div>
          <div className="rc-divider rc-md-up"></div>
          <div className="rc-layout-container rc-one-column">
            <div className="rc-column rc-padding-x--xs--desktop rc-padding-x--none--mobile">
              <nav
                data-toggle-group="mobile"
                data-toggle-effect="rc-expand--vertical"
                className="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
              >
                <ul
                  className="rc-list rc-list--blank rc-list--align rc-list--inverse d-flex justify-content-between flex-wrap flex-md-nowrap"
                  role="menubar"
                >
                  {this.state.cur_menubar.map((item) =>
                    item.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className="rc-list__item rc-list__item--group rc-full-width"
                        >
                          <div
                            className="rc-list__header"
                            id="footer-head-158504765613564650"
                            data-toggle="footer-list-158504765613564650"
                            role="menuitem"
                          >
                            <h3 className="rc-padding-left--md--mobile">
                              <FormattedMessage id={item.titleId} />
                            </h3>
                          </div>
                          <ul
                            className="list list--blank list--align"
                            id="footer-list-158504765613564650"
                            aria-labelledby="footer-head-158504765613564650"
                            role="menu"
                          >
                            {item.list.map((listItem, i) => {
                              return (
                                <li key={i} className="rc-list__item">
                                  {!!listItem.link ? (
                                    <Link
                                      className="rc-list__link text-decoration-none color-f6f6f6"
                                      to={listItem.link}
                                      role="menuitem"
                                    >
                                      <FormattedMessage
                                        id={listItem.messageId}
                                      />
                                    </Link>
                                  ) : (
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
                                    >
                                      <FormattedMessage
                                        id={listItem.messageId}
                                      />
                                    </a>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    })
                  )}
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
                <p>
                  <FormattedMessage
                    id="contactUsViaPhone"
                    defaultMessage={' '}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="rc-layout-container rc-two-column rc-padding-x--xs--desktop">
            {this.state.cur_contactInfo && (
              <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile rc-text--center--sm-down">
                <a
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
                    to="/help"
                  >
                    <FormattedMessage id="footer.contactUs" />
                  </Link>
                ) : (
                  <a
                    className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3"
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

export default Footer;
