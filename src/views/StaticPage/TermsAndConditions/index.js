import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage } from 'react-intl';
import { inject, observer } from 'mobx-react';
import BreadCrumbs from '@/components/BreadCrumbs';
import BannerTip from '@/components/BannerTip';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;

@inject('configStore')
@observer
class TermsConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      mailAddress: ''
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    const tel = 'tel:' + this.props.configStore.storeContactPhoneNumber;
    const mailAddress = 'mailto:' + this.props.configStore.storeContactEmail;

    this.setState({ tel, mailAddress });
  }
  render(h) {
    const event = {
      page: {
        type: 'Content',
        theme: ''
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />

        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbs />
          <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg rc-padding-x--md--mobile">
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding--sm rc-padding-left--none">
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                      <h2
                        className="text-center"
                        style={{
                          color: '#E2001A',
                          marginTop: '20px',
                          fontSize: '2.5rem'
                        }}
                      >
                        <FormattedMessage id="termsandconditions.title" />
                      </h2>
                    </div>
                  </div>
                </div>

                <p>
                  <FormattedMessage
                    id="termsandconditions.information"
                    values={{
                      val1: <strong>Conditions</strong>
                    }}
                  />
                </p>
                <p>
                  <h6
                    style={{
                      color: '#606060'
                    }}
                  >
                    <strong>
                      <FormattedMessage id="termsandconditions.paragraph2" />
                    </strong>
                  </h6>
                  <FormattedMessage id="termsandconditions.paragraph3" />
                  <br />

                  <FormattedMessage id="termsandconditions.paragraph4" />
                  <br />
                  <FormattedMessage
                    id="termsandconditions.paragraph5"
                    values={{
                      val1: <strong>04 66 73 03 00</strong>
                    }}
                  />
                  <br />
                  <FormattedMessage id="termsandconditions.paragraph6" />
                </p>
                <p>
                  <FormattedMessage
                    id="termsandconditions.paragraph7"
                    values={{
                      val1: <strong>Royal Canin</strong>
                    }}
                  />
                  <br />
                  <FormattedMessage id="termsandconditions.paragraph8" />
                </p>
                <p>
                  <FormattedMessage id="termsandconditions.paragraph9" />
                  <br />
                </p>

                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title1" />
                  </h3>
                  <br />
                  <h4>
                    <FormattedMessage id="termsandconditions.title1.1" />
                  </h4>
                  <FormattedMessage id="termsandconditions.title1.1descripition" />
                  <br />
                  <br />
                  <h4>
                    <FormattedMessage id="termsandconditions.title1.2" />
                  </h4>

                  <FormattedMessage id="termsandconditions.title1.2descripition" />
                  <br />
                  <br />
                  <h4>
                    <FormattedMessage id="termsandconditions.title1.3" />
                  </h4>
                  <FormattedMessage
                    style={{
                      'white-space': 'pre-wrap'
                    }}
                    id="termsandconditions.title1.3descripition"
                  />
                </p>
                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title2" />
                  </h3>
                  <br />
                  <FormattedMessage id="termsandconditions.title2descripition" />
                </p>

                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title3" />
                  </h3>
                  <h4>
                    <FormattedMessage id="termsandconditions.title3.1" />
                  </h4>
                  <FormattedMessage id="termsandconditions.title3.1descripition" />
                  <br />
                  <br />
                  <h4>
                    <FormattedMessage id="termsandconditions.title3.2" />
                  </h4>
                  <FormattedMessage id="termsandconditions.title3.2descripition" />
                </p>

                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title4" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title4descripition" />
                </p>

                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title5" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title5descripition" />
                </p>

                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title6" />
                  </h3>
                  <br />
                  <h4>
                    <FormattedMessage id="termsandconditions.title6.1" />
                  </h4>
                  <FormattedMessage id="termsandconditions.title6.1descripition" />
                  <br />
                  <br />
                  <h4>
                    <FormattedMessage id="termsandconditions.title6.2" />
                  </h4>
                  <FormattedMessage id="termsandconditions.title6.2descripition" />
                  <br />
                  <br />
                  <h4>
                    <FormattedMessage id="termsandconditions.title6.3" />
                  </h4>
                  <FormattedMessage id="termsandconditions.title6.3descripition" />
                </p>

                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title7" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title7descripition" />
                </p>

                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title8" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title8descripition" />
                </p>

                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title9" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title9descripition" />
                </p>

                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title10" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title10descripition" />
                </p>

                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title11" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title11descripition" />
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default TermsConditions;
