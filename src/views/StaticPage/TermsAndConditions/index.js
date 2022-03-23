import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { seoHoc } from '@/framework/common';
import BreadCrumbs from '@/components/BreadCrumbs';
import BannerTip from '@/components/BannerTip';
import './index.css';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;
@injectIntl
@inject('configStore')
@seoHoc('general terms conditions page')
@observer
class TermsConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      mailAddress: ''
    };
  }

  componentWillUnmount() {}
  async componentDidMount() {
    const tel = 'tel:' + this.props.configStore.storeContactPhoneNumber;
    const mailAddress = 'mailto:' + this.props.configStore.storeContactEmail;

    this.setState({ tel, mailAddress });
  }
  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };
    return (
      <div>
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
        />
        <Canonical />
        <Header {...this.props} showMiniIcons={true} showUserIcon={true} />

        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          {window.__.env.REACT_APP_COUNTRY == 'fr' ? null : <BannerTip />}
          <BreadCrumbs />
          {/* <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg rc-padding-x--md--mobile"> */}
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext  noParagraphMargin">
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding-left--none">
                <div className="rc-one-column">
                  <div className="rc-column rc-padding-left--none">
                    <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">
                      <h2
                        className="text-center"
                        style={{
                          color: '#E2001A',
                          marginTop: '1.25rem',
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
                      val1: <strong>04 66 73 03 00</strong>,
                      val4: (
                        <a
                          href={this.props.intl.formatMessage({
                            id: 'serviceclients.france@royalcanin.com.href'
                          })}
                        >
                          <ins>
                            {this.props.intl.formatMessage({
                              id: 'serviceclients.france@royalcanin.com'
                            })}
                          </ins>
                        </a>
                      )
                    }}
                  />
                  <br />
                  <FormattedMessage id="termsandconditions.paragraph6" />
                </p>
                <p>
                  <FormattedMessage
                    id="termsandconditions.paragraph7"
                    values={{
                      val1: <strong>Royal Canin</strong>,
                      val2: <strong>Site</strong>,
                      val3: <strong>Sites</strong>
                    }}
                  />
                  <p style={{ margin: 0 }}>
                    <br />
                  </p>
                  <strong>
                    <FormattedMessage id="termsandconditions.paragraph8" />
                  </strong>
                </p>
                <p>
                  <FormattedMessage
                    id="termsandconditions.paragraph9"
                    values={{
                      val1: (
                        <a href="https://www.royalcanin.com/fr">
                          https://www.royalcanin.com/fr
                        </a>
                      )
                    }}
                  />
                  <br />
                </p>

                <p style={{ fontSize: '1rem' }}>
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

                  <FormattedMessage
                    id="termsandconditions.title1.2descripition"
                    values={{
                      val1: <br />
                    }}
                  />
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
                    values={{
                      val1: <br />,
                      val2: (
                        <p style={{ margin: 0 }}>
                          <br />
                        </p>
                      )
                    }}
                  />
                </p>
                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title2" />
                  </h3>
                  <br />
                  <FormattedMessage
                    id="termsandconditions.title2descripition"
                    values={{
                      val1: <br />,
                      val2: (
                        <p style={{ margin: 0 }}>
                          <br />
                        </p>
                      )
                    }}
                  />
                </p>

                <p>
                  <br />
                  <h3>
                    <FormattedMessage
                      values={{
                        val1: <br />,
                        val2: (
                          <p style={{ margin: 0 }}>
                            <br />
                          </p>
                        )
                      }}
                      id="termsandconditions.title3"
                    />
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
                  <FormattedMessage
                    values={{
                      val1: <br />,
                      val2: (
                        <p style={{ margin: 0 }}>
                          <br />
                        </p>
                      )
                    }}
                    id="termsandconditions.title3.2descripition"
                  />
                </p>

                <p>
                  <br />
                  <h3>
                    <FormattedMessage id="termsandconditions.title4" />
                  </h3>
                  <FormattedMessage
                    values={{
                      val1: <br />,
                      val2: (
                        <p style={{ margin: 0 }}>
                          <br />
                        </p>
                      )
                    }}
                    id="termsandconditions.title4descripition"
                  />
                </p>

                <p>
                  <br />
                  <h3>
                    <FormattedMessage id="termsandconditions.title5" />
                  </h3>
                  <FormattedMessage
                    values={{
                      val1: <br />,
                      val2: (
                        <p style={{ margin: 0 }}>
                          <br />
                        </p>
                      ),
                      val3: <strong>Garantie légale de conformité</strong>,
                      val4: (
                        <strong>
                          Garantie contre les défauts de la chose vendue
                        </strong>
                      )
                    }}
                    id="termsandconditions.title5descripition"
                  />
                </p>

                <p>
                  <br />
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
                  <FormattedMessage
                    values={{
                      val1: <br />,
                      val2: (
                        <p style={{ margin: 0 }}>
                          <br />
                        </p>
                      ),
                      val3: (
                        <div className="rc-padding-left--md">
                          {this.props.intl.formatMessage({
                            id: 'termsandconditions.title6.2.1'
                          })}
                        </div>
                      ),
                      val4: (
                        <div className="rc-padding-left--md">
                          {this.props.intl.formatMessage({
                            id: 'termsandconditions.title6.2.2'
                          })}
                        </div>
                      ),
                      val5: (
                        <div className="rc-padding-left--md">
                          {this.props.intl.formatMessage({
                            id: 'termsandconditions.title6.2.3'
                          })}
                        </div>
                      )
                    }}
                    id="termsandconditions.title6.2descripition"
                  />
                  <br />
                  <br />
                  <h4>
                    <FormattedMessage id="termsandconditions.title6.3" />
                  </h4>
                  <FormattedMessage
                    values={{
                      val1: <br />,
                      val2: (
                        <p style={{ margin: 0 }}>
                          <br />
                        </p>
                      ),
                      val3: (
                        <div className="rc-padding-left--md">
                          {this.props.intl.formatMessage({
                            id: 'termsandconditions.title6.3descripition.1'
                          })}
                        </div>
                      ),
                      val4: (
                        <div className="rc-padding-left--md">
                          {this.props.intl.formatMessage(
                            { id: 'termsandconditions.title6.3descripition.2' },

                            {
                              // val4: <a href={this.props.intl.formatMessage({ id: 'serviceclients.france@royalcanin.com.href' })}>
                              //   <ins>
                              //   {this.props.intl.formatMessage({ id: 'serviceclients.france@royalcanin.com' })}
                              //   </ins>
                              // </a>,
                              val: (
                                <a href="mailto:suivi.dtc.france@royalcanin.com">
                                  <ins>suivi.dtc.france@royalcanin.com</ins>
                                </a>
                              )
                            }
                          )}
                        </div>
                      ),
                      val5: (
                        <div className="rc-padding-left--md">
                          {this.props.intl.formatMessage({
                            id: 'termsandconditions.title6.3descripition.3'
                          })}
                        </div>
                      )
                    }}
                    id="termsandconditions.title6.3descripition"
                  />
                </p>

                <p>
                  <br />
                  <h3>
                    <FormattedMessage id="termsandconditions.title7" />
                  </h3>
                  <FormattedMessage
                    values={{
                      val1: <br />,
                      val2: (
                        <p style={{ margin: 0 }}>
                          <br />
                        </p>
                      )
                    }}
                    id="termsandconditions.title7descripition"
                  />
                </p>

                <p>
                  <br />
                  <h3>
                    <FormattedMessage id="termsandconditions.title8" />
                  </h3>
                  <FormattedMessage
                    values={{
                      val3: (
                        <span style={{ color: 'red' }}>
                          {this.props.intl.formatMessage({
                            id: 'termsandconditions.title8descripition.1'
                          })}
                        </span>
                      ),
                      val4: (
                        <a
                          href={this.props.intl.formatMessage({
                            id: 'serviceclients.france@royalcanin.com.href'
                          })}
                        >
                          <ins>
                            {this.props.intl.formatMessage({
                              id: 'serviceclients.france@royalcanin.com'
                            })}
                          </ins>
                        </a>
                      )
                    }}
                    id="termsandconditions.title8descripition"
                  />
                </p>

                <p>
                  <br />
                  <h3>
                    <FormattedMessage id="termsandconditions.title9" />
                  </h3>
                  <FormattedMessage
                    id="termsandconditions.title9descripition"
                    values={{
                      val3: (
                        <a href="https://www.mars.com/privacy-policy-france">
                          <ins>https://www.mars.com/privacy-policy-france</ins>
                        </a>
                      )
                    }}
                  />
                </p>

                <p>
                  <br />
                  <h3>
                    <FormattedMessage id="termsandconditions.title10" />
                  </h3>
                  <FormattedMessage
                    values={{
                      val1: <br />,
                      val2: (
                        <p style={{ margin: 0 }}>
                          <br />
                        </p>
                      ),
                      val3: (
                        <a href="https://www.mars.com/privacy-policy-france">
                          <ins>https://medicys-consommation.fr</ins>
                        </a>
                      ),
                      val4: (
                        <a href="https://webgate.ec.europa.eu/odr/main/?event=main.home.show&amp;lng=FR">
                          <ins>
                             https://webgate.ec.europa.eu/odr/main/?event=main.home.show&lng=FR
                          </ins>
                        </a>
                      ),
                      val5: (
                        <div className="rc-padding-left--md">
                          {this.props.intl.formatMessage({
                            id: 'termsandconditions.title10.descripition.1'
                          })}
                        </div>
                      ),
                      val6: (
                        <div className="rc-padding-left--md">
                          {this.props.intl.formatMessage({
                            id: 'termsandconditions.title10.descripition.2'
                          })}
                        </div>
                      )
                    }}
                    id="termsandconditions.title10descripition"
                  />
                </p>

                <p>
                  <br />
                  <h3>
                    <FormattedMessage id="termsandconditions.title11" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title11descripition" />
                </p>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default TermsConditions;
