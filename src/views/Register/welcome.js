import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { LOGO } from '@/utils/constant';
import './index.less';

export default class welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params && this.props.match.params.id
    };
  }
  render() {
    let homePage = window.__.env.REACT_APP_HOMEPAGE;

    const contactUrl = `${homePage.replace(/\/$/gi, '')}/help/contact`;
    const helpUrl = `${homePage.replace(/\/$/gi, '')}/help`;
    return (
      <div id="welcome" className="page">
        <div
          _ngcontent-dqg-c56=""
          class="register-success-container"
          style={{ marginBottom: 45 }}
        >
          <div _ngcontent-dqg-c56="" class="register-success-container__logo">
            <img _ngcontent-dqg-c56="" src={LOGO} alt="" />
          </div>
          <div
            _ngcontent-dqg-c56=""
            class="register-success-container__img-bloc"
          >
            <img
              _ngcontent-dqg-c56=""
              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/cat-dog.jpg`}
              alt=""
            />
          </div>
          <div
            _ngcontent-dqg-c56=""
            class="register-success-container__text-container"
          >
            <h1
              _ngcontent-dqg-c56=""
              class="register-success-container__text-container__h1"
            >
              <FormattedMessage id="welcome.createdSuccessfully" />
            </h1>
            <p
              _ngcontent-dqg-c56=""
              class="register-success-container__text-container__p"
            >
              <FormattedMessage id="welcome.confirmEmail" />{' '}
              <span _ngcontent-dqg-c56="" class="bold-text">
                {this.state.email}
              </span>
            </p>
            <p
              _ngcontent-dqg-c56=""
              class="register-success-container__text-container__p"
            >
              {' '}
              <FormattedMessage id="welcome.notReceiveEmail" />{' '}
              <a
                _ngcontent-dqg-c56=""
                apptracking="registration.contactSupport"
                class="rc-link"
                href={
                  window.__.env.REACT_APP_COUNTRY === 'us'
                    ? contactUrl
                    : helpUrl
                }
              >
                <strong>
                  <FormattedMessage id="welcome.contactSupport" />
                </strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
