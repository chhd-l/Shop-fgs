import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import GoogleTagManager from '@/components/GoogleTagManager';
import image from '@/assets/images/500.png';
import { seoHoc } from '@/framework/common';
import { LOGO } from '@/utils/constant';
import LazyLoad from 'react-lazyload';
import Canonical from '@/components/Canonical';

const event = {
  page: {
    type: 'error',
    theme: '',
    path: location.pathname,
    error: '',
    hitTimestamp: new Date(),
    filters: ''
  }
};
@seoHoc()
class Page500 extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <Header showMiniIcons={true} location={this.props.location} /> */}
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <div className="text-center mt-5">
          <img src={LOGO} alt="" className="inline-block w-40 md:w-auto" />
        </div>

        <div>
          <div className="container">
            <div className="rc-padding--md rc-text--center rc-bg-colour--interface">
              <LazyLoad>
                <img
                  src={image}
                  style={{ width: '300px', margin: '0 auto' }}
                  alt="Internet problem 500"
                />
              </LazyLoad>
              <div className="rc-bg-colour--brand3">
                <div className="rc-padding--sm rc-margin-bottom--xs">
                  <div className="rc-padding-y--md rc-md-down"></div>

                  <div className="rc-layout-container rc-one-column rc-max-width--md">
                    <div className="rc-column">
                      <div className="rc-full-width rc-text--center rc-padding-x--sm">
                        <div className="rc-alpha inherit-fontsize">
                          <h1>
                            <FormattedMessage id="500 Internal Server Error" />
                          </h1>
                        </div>
                        <div>
                          <FormattedMessage id="Sorry, please contact the manager to solve the problem" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rc-padding-y--md rc-md-down"></div>
                </div>
              </div>
              {/* <Link
                to="/home"
                className="rc-btn rc-btn--two"
                role="button"
                aria-pressed="true"
              >
                <FormattedMessage id="continueShopping" />
              </Link> */}
            </div>
          </div>
        </div>

        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

export default Page500;
