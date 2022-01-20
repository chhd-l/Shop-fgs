import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import PaymentLogos from './paymentLogos';
import LoginButton from '@/components/LoginButton';
import { withRouter } from 'react-router-dom';
import Language from '@/components/Language';

@injectIntl
class FooterHub extends React.Component {
  scrollToTop = () => {
    const widget = document.querySelector('#page-top');
    widget && widget.scrollIntoView();
  };
  render() {
    const { isLogin, intl, footerInfo } = this.props;
    const { LocalMarketSettings, MenuGroups, MenuInfoItems, MenuItems } =
      footerInfo || {};
    const { ContactUsUrl, ContactPhone } = LocalMarketSettings || {};

    return (
      <>
        {/* MenuItems  */}
        <div className="rc-layout-container rc-two-column rc-padding-x--xs--desktop order-5 md:order-1 col-span-12 z-auto">
          <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile flex md:justify-between flex-wrap">
            <div className="w-full md:w-auto flex flex-col md:block">
              {(MenuItems || []).map((item, i) => (
                <React.Fragment key={i}>
                  {item.Icon === 'user' && !isLogin ? (
                    <LoginButton
                      intl={intl}
                      className={`rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-${item.Icon}--xs rc-brand3`}
                      btnStyle={{
                        fontSize: 'inherit'
                      }}
                    >
                      {item.Link.Text}
                    </LoginButton>
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
            </div>
            <a className="w-full md:w-auto">
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
        <div className="rc-divider hidden md:block order-2 col-span-12" />
        {/* MenuGroups */}
        {MenuGroups && MenuGroups.length > 0 ? (
          <div className="rc-layout-container rc-one-column rc-padding-x--xs order-3 col-span-12">
            <div className="rc-column rc-padding-x--xs">
              <nav
                data-toggle-group="mobile"
                data-toggle-effect="rc-expand--vertical"
                className="rc-padding-x--xs--desktop rc-padding-x--none--mobile"
              >
                <ul
                  className="rc-list rc-list--footer-columns rc-list--blank rc-list--align rc-list--inverse rc-list-overwrite"
                  role="menubar"
                >
                  {MenuGroups.map((item, index) => {
                    return (
                      <li
                        className="rc-list__item rc-list__item--group"
                        key={index}
                      >
                        <h3
                          className="rc-list__header J_rc-list__header flex justify-between justify-items-center bg-transparent"
                          role="menuitem"
                          data-toggle={`nav-footer-list-${index}`}
                          id={`nav-footer-${index}`}
                        >
                          <a href={item.Link.Url} className="color-f6f6f6">
                            {item.Link.Text}
                          </a>
                          <span className="iconfont iconDown icon-down" />
                        </h3>
                        <ul
                          className="rc-list rc-list--blank rc-list--align overflow-hidden"
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
        <div className="rc-divider hidden md:block order-4 col-span-12" />
        {/*MenuInfoItems */}
        {MenuInfoItems && MenuInfoItems[0] ? (
          <div className="rc-layout-container rc-one-column rc-padding-x--xs--desktop rc-margin-top--md--desktop rc-padding-x--none--mobile order-5 col-span-12 md:col-span-8">
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
        {/* payment logos */}
        <PaymentLogos className="rc-column order-6 col-span-12 md:col-span-4" />
        <div className="rc-layout-container rc-two-column rc-padding-x--xs--desktop order-7 col-span-12">
          <div className="rc-column  rc-padding-x--none rc-padding-top--xs--desktop rc-padding-y--md--mobile">
            {ContactPhone ? (
              <a
                className="rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-mobile--xs rc-brand3"
                role="menuitem"
                href={`tel:${ContactPhone}`}
              >
                {ContactPhone}
              </a>
            ) : null}

            {ContactUsUrl ? (
              <a
                className="qhx rc-btn rc-btn--inverse rc-btn--icon-label rc-icon rc-email--xs rc-brand3 text-white"
                role="menuitem"
                href={ContactUsUrl.Url}
              >
                {ContactUsUrl.Text}
              </a>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(FooterHub);
