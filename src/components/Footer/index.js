import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { cookieSettingsBtn } from './cookieSettingsBtn';
import MarsFooterMap from './MarsFooterMap';
import { menubar } from './menubar';
import { contactInfo } from './contactInfo';
import FooterHub from './footer_hub';
import { withRouter } from 'react-router-dom';
import { getDeviceType } from '@/utils/utils';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const cur_menubar = menubar[window.__.env.REACT_APP_COUNTRY] || [];
const cur_contactInfo = contactInfo[window.__.env.REACT_APP_COUNTRY] || null;
@inject('configStore', 'loginStore')
@injectIntl
@observer
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIdx: -1
    };
  }
  componentDidMount() {
    const {
      configStore,
      intl: { messages }
    } = this.props;
    configStore.queryConfig();

    configStore.getPrescriberSettingInfo(); //查询prescriber setting信息

    configStore.getSystemFormConfig(); // 查询address form表单配置开关

    // 地址错误提示信息
    localItemRoyal.set(
      'rc-wrongAddressMsg',
      JSON.stringify({
        title: messages['payment.pleaseInput'],
        wrongAddress: messages['payment.wrongAddress'],
        streets: messages['payment.streets'],
        postCode: messages['payment.postCode'],
        house: messages['payment.house'],
        city: messages['payment.city'],
        districtCode: messages['payment.province'],
        settlement: messages['payment.settlement'],
        address1: messages['payment.address1'],
        address2: messages['payment.address2'],
        apartment: messages['payment.apartment'],
        comment: messages['payment.comment'],
        country: messages['payment.country'],
        entrance: messages['payment.entrance'],
        firstName: messages['payment.firstName'],
        lastName: messages['payment.lastName'],
        phoneNumber: messages['payment.phoneNumber'],
        consigneeNumber: messages['payment.phoneNumber'],
        area: messages['payment.region'],
        province: messages['payment.state']
      })
    );
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  scrollToTop = () => {
    const widget = document.querySelector('#page-top');
    widget && widget.scrollIntoView();
  };
  toggleExpand = (index) => {
    this.setState(
      (cur) => ({
        activeIdx: cur.activeIdx === index ? -1 : index
      }),
      () => {
        console.log(this.state.activeIdx);
      }
    );
  };
  footerInfo = () => {
    const { activeIdx } = this.state;
    return (
      <footer
        className="rc-bg-colour--interface-dark"
        id="footer"
        data-tms="Footer"
      >
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
          <div className="rc-divider rc-md-up" />
          {cur_menubar.length > 0 ? (
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
                    {cur_menubar.map((item, index) => {
                      return (
                        <li
                          className="rc-list__item rc-list__item--group"
                          key={index}
                        >
                          <h3
                            className={`rc-list__header ${
                              activeIdx === index ? 'rc-icon--rotate' : ''
                            }`}
                            role="menuitem"
                            data-toggle={`nav-footer-list-${index}`}
                            aria-haspopup={isMobile ? 'true' : 'false'}
                            aria-selected={
                              activeIdx === index && isMobile ? 'true' : 'false'
                            }
                            id={`nav-footer-${index}`}
                            onClick={() => this.toggleExpand(index)}
                          >
                            <FormattedMessage id={item[0].titleId} />
                          </h3>
                          <ul
                            className={`rc-list rc-list--blank rc-list--align overflow-hidden`}
                            role="menu"
                            id={`nav-footer-list-${index}`}
                            aria-labelledby={`nav-footer-${index}`}
                            style={{
                              maxHeight:
                                activeIdx === index || !isMobile ? 'initial' : 0
                            }}
                          >
                            {item[0].list.map((listItem, i) => {
                              return (
                                <li className="rc-list__item" key={i}>
                                  {!!listItem.link ? (
                                    listItem.needLogin && !this.isLogin ? (
                                      <>
                                        <Link
                                          to="/account"
                                          className="rc-list__link text-decoration-none color-f6f6f6 55"
                                        >
                                          <FormattedMessage
                                            id={listItem.messageId}
                                          />
                                        </Link>
                                        {/* <LoginButton
                                        beforeLoginCallback={async () => {
                                          sessionItemRoyal.set(
                                            'okta-redirectUrl',
                                            listItem.link
                                          );
                                        }}
                                        btnClass="rc-list__link text-decoration-none color-f6f6f6"
                                        history={this.props.history}
                                      >
                                        <FormattedMessage
                                          id={listItem.messageId}
                                        />
                                      </LoginButton> */}
                                      </>
                                    ) : (
                                      <Link
                                        className="rc-list__link text-decoration-none color-f6f6f6 66"
                                        to={listItem.link}
                                        role="menuitem"
                                      >
                                        <FormattedMessage
                                          id={listItem.messageId}
                                        />
                                      </Link>
                                    )
                                  ) : (
                                    <a
                                      className="rc-list__link text-decoration-none color-f6f6f6 1111"
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
                                      <FormattedMessage
                                        id={listItem.messageId}
                                      />
                                      {Boolean(
                                        window.__.env
                                          .REACT_APP_ACCESSBILITY_OPEN_A_NEW_WINDOW
                                      ) && (
                                        <span className="warning_blank">
                                          Opens a new window
                                        </span>
                                      )}
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
          ) : null}
          <div className="rc-divider rc-md-up" />
          {/*tips */}
          <div className="rc-layout-container rc-one-column rc-padding-x--xs--desktop rc-margin-top--md--desktop rc-padding-x--none--mobile">
            <div className="rc-column rc-padding-bottom--none rc-padding-top--lg--mobile">
              <p className="rc-espilon rc-text--inverse">
                <FormattedMessage id="footer.contactRoyalCanin" />
              </p>
              <div className="rc-text--inverse">
                <p>
                  {window.__.env.REACT_APP_COUNTRY == 'fr'
                    ? 'Nos spécialistes sont disponibles de 8h30 à 12h30 et de 14h à 17h du lundi au vendredi.'
                    : this.props.configStore.contactTimePeriod}
                </p>
                {window.__.env.REACT_APP_COUNTRY == 'fr' ? (
                  <p>
                    <FormattedMessage
                      id="contactUsViaPhone"
                      defaultMessage={' '}
                    />
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          {/* mail and phone */}
          <div className="rc-layout-container rc-two-column rc-padding-x--xs--desktop">
            {cur_contactInfo && (
              <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile rc-text--center--sm-down">
                <a
                  style={{
                    display:
                      window.__.env.REACT_APP_COUNTRY == 'fr'
                        ? 'none'
                        : 'inline-block'
                  }}
                  className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-mobile--xs rc-brand3"
                  role="menuitem"
                  href={`tel:${
                    this.props.configStore[cur_contactInfo.phoneNumber.prop]
                  }`}
                >
                  {this.props.configStore[cur_contactInfo.phoneNumber.prop]}
                </a>
                {!!cur_contactInfo.email.link ? (
                  <Link
                    className="ctnus rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3"
                    role="menuitem"
                    to={cur_contactInfo.email.link}
                  >
                    <FormattedMessage id="footer.contactUs" />
                  </Link>
                ) : (
                  <a
                    className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3 text-white"
                    role="menuitem"
                    href={cur_contactInfo.email.url}
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
        {cookieSettingsBtn[window.__.env.REACT_APP_COUNTRY]}
        {/* <!-- OneTrust Cookies Settings button end --> */}
      </footer>
    );
  };
  render() {
    return (
      <div>
        {+window.__.env.REACT_APP_HUB ? (
          <FooterHub isLogin={this.isLogin} history={this.props.history} />
        ) : (
          this.footerInfo()
        )}
      </div>
    );
  }
}

export default withRouter(Footer);
