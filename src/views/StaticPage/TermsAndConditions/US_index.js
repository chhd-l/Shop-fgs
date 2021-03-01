import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { setSeoConfig } from '@/utils/utils';
import BreadCrumbs from '@/components/BreadCrumbs';
import BannerTip from '@/components/BannerTip';
import './index.css';
import { Helmet } from 'react-helmet';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href
@injectIntl
@inject('configStore')
@observer
class TermsConditionsUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
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
    setSeoConfig({
      pageName: 'general terms conditions page'
    }).then(res => {
      this.setState({seoConfig: res})
    });
  }
  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription}/>
          <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />

        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          {process.env.REACT_APP_LANG == 'fr' ? null : <BannerTip />}
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
                          marginTop: '20px',
                          fontSize: '2.5rem'
                        }}
                      >
                        你好呀
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
                      val4: <a href={this.props.intl.formatMessage({ id: 'serviceclients.france@royalcanin.com.href' })}>
                        <u>
                          {this.props.intl.formatMessage({ id: 'serviceclients.france@royalcanin.com' })}
                        </u>
                      </a>,
                    }}
                  />
                  <br />
                </p>
                <p>

                </p>

                <p style={{fontSize: '16px'}}>
                  <br />
                  <h4>
                    <FormattedMessage id="termsandconditions.title1.1" />
                  </h4>
                  <FormattedMessage id="termsandconditions.title1.1descripition" />
                  <br />
                  <br />

                  <FormattedMessage id="termsandconditions.title1.2descripition"
                                    values={{
                                      val1: <br/>
                                    }}/>
                  <br />
                  <br />
                  <FormattedMessage
                    style={{
                      'white-space': 'pre-wrap'
                    }}
                    id="termsandconditions.title1.3descripition"
                    values={{
                      val1: <br/>,
                      val2: <p style={{margin:0}}><br /></p>
                    }}
                  />
                </p>
                <p>
                  <h3>
                    <FormattedMessage id="termsandconditions.title2" />
                  </h3>
                  <br />
                  <FormattedMessage id="termsandconditions.title2descripition"
                                    values={{
                                      val1: <br/>,
                                      val2: <p style={{margin:0}}><br /></p>
                                    }}/>
                </p>

                <p>
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
                      val1: <br/>,
                      val2: <p style={{margin:0}}><br /></p>
                    }} id="termsandconditions.title3.2descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title4" />
                  </h3>
                  <FormattedMessage
                    values={{
                      val1: <br/>,
                      val2: <p style={{margin:0}}><br /></p>
                    }}
                    id="termsandconditions.title4descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title5" />
                  </h3>
                  <FormattedMessage
                    values={{
                      val1: <br/>,
                      val2: <p style={{margin:0}}><br /></p>,
                      val3: <strong>Garantie légale de conformité</strong>,
                      val4: <strong>Garantie contre les défauts de la chose vendue</strong>
                    }}
                    id="termsandconditions.title5descripition" />
                </p>

                <p>
                  <br/>
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
                      val1: <br/>,
                      val2: <p style={{margin:0}}><br /></p>,
                      val3: <div className="rc-padding-left--md">
                        {this.props.intl.formatMessage({ id: 'termsandconditions.title6.2.1' })}
                      </div>,
                      val4: <div className="rc-padding-left--md">
                        {this.props.intl.formatMessage({ id: 'termsandconditions.title6.2.2' })}
                      </div>,
                      val5: <div className="rc-padding-left--md">
                        {this.props.intl.formatMessage({ id: 'termsandconditions.title6.2.3' })}
                      </div>,
                    }}
                    id="termsandconditions.title6.2descripition" />
                  <br />
                  <br />
                  <FormattedMessage
                    values={{
                      val1: <br/>,
                      val2: <p style={{margin:0}}><br /></p>,

                      val4: <div className="rc-padding-left--md">
                        {this.props.intl.formatMessage(
                          { id: 'termsandconditions.title6.3descripition.2' },

                          {
                            // val4: <a href={this.props.intl.formatMessage({ id: 'serviceclients.france@royalcanin.com.href' })}>
                            //   <u>
                            //   {this.props.intl.formatMessage({ id: 'serviceclients.france@royalcanin.com' })}
                            //   </u>
                            // </a>,
                            val:<a href="mailto:suivi.dtc.france@royalcanin.com"><u>
                              suivi.dtc.france@royalcanin.com</u></a>}
                        )}
                      </div>,
                      val5: <div className="rc-padding-left--md">
                        {this.props.intl.formatMessage({ id: 'termsandconditions.title6.3descripition.3' })}
                      </div>,
                    }}
                    id="termsandconditions.title6.3descripition" />
                </p>



                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title9" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title9descripition"
                                    values={{
                                      val3: <a href='https://www.mars.com/privacy-policy-france'>
                                        <u>
                                          https://www.mars.com/privacy-policy-france
                                        </u>
                                      </a>
                                    }}/>
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title10" />
                  </h3>
                  <FormattedMessage
                    values={{
                      val1: <br/>,
                      val2: <p style={{margin:0}}><br /></p>,
                      val3:  <a href='https://www.mars.com/privacy-policy-france'>
                        <u>
                          https://medicys-consommation.fr
                        </u>
                      </a>,
                      val4:  <a href='https://webgate.ec.europa.eu/odr/main/?event=main.home.show&amp;lng=FR'>
                        <u>
                          https://webgate.ec.europa.eu/odr/main/?event=main.home.show&lng=FR
                        </u>
                      </a>,
                      val5: <div className="rc-padding-left--md">
                        {this.props.intl.formatMessage({ id: 'termsandconditions.title10.descripition.1' })}
                      </div>,
                      val6: <div className="rc-padding-left--md">
                        {this.props.intl.formatMessage({ id: 'termsandconditions.title10.descripition.2' })}
                      </div>,
                    }}
                    id="termsandconditions.title10descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title11" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title11descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title12" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title12descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title13" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title13descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title14" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title14descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title15" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title15descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title16" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title16descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title17" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title17descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title18" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title18descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title19" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title19descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title20" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title20descripition" />
                </p>

                <p>
                  <br/>
                  <h3>
                    <FormattedMessage id="termsandconditions.title21" />
                  </h3>
                  <FormattedMessage id="termsandconditions.title21descripition" />
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

export default TermsConditionsUs;
