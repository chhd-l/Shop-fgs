import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import BreadCrumbs from '@/components/BreadCrumbs';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import { seoHoc } from '@/framework/common';
import { funcUrl } from '@/lib/url-utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { getEmailWay } from './config';
import Canonical from '@/components/Canonical';

@inject('configStore')
@seoHoc()
@observer
class SearchShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWords: ''
    };
  }
  componentWillUnmount() {}
  componentDidMount() {
    const searchWords = decodeURI(funcUrl({ name: 'q' }));

    this.setState({
      searchWords
    });
  }

  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: 'Brand',
        path: this.props.location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div className="recommendation">
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />
        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          {window.__.env.REACT_APP_COUNTRY == 'fr' ? null : <BannerTip />}
          <BreadCrumbs />

          <div className="search-results rc-padding--sm rc-max-width--xl">
            <section className="rc-bg-colour--brand3">
              <div className="noSearch-result">
                <div className="rc-text--center rc-text--center rc-padding-top--sm--mobile">
                  <h2 className="rc-alpha rc-margin-bottom--none">
                    <FormattedMessage id="searchNoResult.title" />!
                  </h2>
                  <div className="rc-gamma textColor rc-margin-bottom--none rc-padding-y--sm rc-padding-y--lg--mobile">
                    <FormattedMessage id="searchNoResult.content1" /> :{' '}
                    <br className="d-block d-md-none" />“
                    <strong>{this.state.searchWords}</strong>”
                  </div>
                </div>
                <div className="content-asset">
                  <div className="rc-layout-container rc-one-column rc-max-width--md rc-padding-x--lg">
                    <div className="rc-full-width rc-text--center rc-padding-x--sm noSearch-desc">
                      <p>
                        <FormattedMessage id="searchNoResult.content2" />
                      </p>
                    </div>
                    <div className="rc-layout-container rc-two-column">
                      <article className="rc-full-width rc-column">
                        <div className="rc-border-all rc-border-colour--interface fullHeight">
                          <div className="row rc-layout-container rc-three-column rc-margin--none rc-content-h-middle fullHeight">
                            <div className="col-8 rc-column rc-double-width rc-padding-top--md--mobile">
                              <div>
                                <b style={{ color: '#00A4A6' }}>
                                  <FormattedMessage id="searchNoResult.telephone" />
                                </b>
                                <p>
                                  {this.props.configStore.contactTimePeriod}
                                </p>
                                <div style={{ width: '180px' }}>
                                  <a
                                    href={
                                      this.props.configStore
                                        .storeContactPhoneNumber
                                    }
                                    style={{ color: '#00A4A6' }}
                                    className="rc-numeric"
                                  >
                                    {
                                      this.props.configStore
                                        .storeContactPhoneNumber
                                    }
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-4 rc-column rc-content-v-middle">
                              <img
                                alt="customer service image"
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/customer-service@2x.png`}
                                className="align-self-center w-auto"
                              />
                            </div>
                          </div>
                        </div>
                      </article>
                      <article className="rc-full-width rc-column">
                        <div className="rc-border-all rc-border-colour--interface fullHeight">
                          <div className="row rc-layout-container rc-three-column rc-margin--none rc-content-h-middle fullHeight">
                            <div className="col-8 rc-column rc-double-width rc-padding-top--md--mobile">
                              <div>
                                <strong style={{ color: '#0087BD' }}>
                                  <FormattedMessage id="searchNoResult.email" />
                                </strong>
                                <div>{getEmailWay()}</div>
                              </div>
                            </div>
                            <div className="col-4 rc-column rc-content-v-middle">
                              <img
                                alt="email us image"
                                src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/Emailus_icon@2x.png`}
                                className="align-self-center w-auto"
                              ></img>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default SearchShow;
