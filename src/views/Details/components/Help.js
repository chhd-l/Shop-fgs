import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

@inject('configStore')
@observer
class Help extends React.Component {
  render() {
    const { configStore } = this.props;
    return (
      {
        en: (
          <div className="rc-bg-colour--brand4">
            <div className="contact-section rc-max-width--xl rc-padding-y--md rc-padding-x--sm">
              <div className="content-asset">
                <div className="rc-layout-container rc-content-h-middle rc-two-column">
                  <div className="rc-column rc-content-v-left rc-padding-y--none contact-section__text">
                    <FormattedMessage id="contactTimePeriod" />
                  </div>
                  <div className="rc-column rc-content-v-right rc-padding-y--none">
                    <a
                      className="rc-btn rc-btn--two rc-btn rc-btn--two rc-margin-right--sm contact-section__btn"
                      href={`tel:${configStore.storeContactPhoneNumber}`}
                    >
                      {configStore.storeContactPhoneNumber}
                    </a>
                    <Link
                      className="rc-btn rc-btn--two contact-section__btn"
                      to="/help/contact"
                    >
                      <span className="rc-icon rc-email--sm rc-brand1" />
                      <FormattedMessage id="contactUs" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }[process.env.REACT_APP_LANG] || null
    );
  }
}
export default Help;
