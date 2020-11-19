import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import FrTips from './fr/frTips'
import FrFaq from './fr/frFaq'
import Footer from '@/components/Footer';
import { FormattedMessage } from 'react-intl';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import { inject, observer } from 'mobx-react';
import { setSeoConfig } from '@/utils/utils';

const localItemRoyal = window.__.localItemRoyal;

@inject('configStore')
@observer
class Help extends React.Component {
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
    setSeoConfig()
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
          {/* <div className="rc-bg-colour--brand4 text-center" >
            <div className="rc-layout-container rc-content-h-middle">
              <div className="rc-column rc-content-v-middle rc-zeta rc-margin--none rc-padding--xs">
                <span className="rc-icon rc-icon rc-delivery--sm rc-brand1 rc-iconography"></span>
                <div className="d-flex align-items-center">
                  <span className="rc-margin-right--xs rc-margin-left--xs">
                    <font style={{verticalAlign: "inherit"}}>
                      <font style={{verticalAlign: "inherit"}}>FREE home delivery! </font>
                      <font style={{verticalAlign: "inherit"}}>(allow a delay of 5 to 7 days due to the exceptional context)</font>
                    </font>
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          <div className="help-page" style={{ marginBottom: '1rem' }}>
            <div className="experience-region experience-main">
              <div className="experience-region experience-main">
                <div className="experience-component experience-layouts-1column">
                  <div className="row rc-margin-x--none">
                    <div className="rc-full-width">
                      <div className="experience-component experience-assets-contactUsBlock">
                        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div className="rc-layout-container rc-two-column rc-margin-y--sm text-center text-md-left rc-margin-top--lg--mobile">
                            <div
                              className="rc-padding-bottom--none--mobile"
                              style={{ width: '40%' }}
                            >
                              <h1
                                className="rc-beta"
                                style={{ margin: '0 0 0 1rem' }}
                              >
                                <font style={{ verticalAlign: 'inherit' }}>
                                  <font style={{ verticalAlign: 'inherit' }}>
                                    <FormattedMessage id="help.needHelp" />
                                  </font>
                                </font>
                              </h1>
                            </div>
                            <div style={{ width: '60%' }}>
                              <div className="rc-large-body inherit-fontsize children-nomargin">
                                <p style={{marginLeft:'150px'}}>
                                  <FormattedMessage id="help.tip1" />
                                  <br />
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
                            <div className="rc-column rc-double-width rc-padding--none">
                              <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#00BCA3' }}>
                                          <FormattedMessage id="help.byTelephone" />
                                        </b>
                                        <p>
                                          {
                                            this.props.configStore
                                              .contactTimePeriod
                                          }
                                        </p>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-numeric rc-md-up"
                                          >
                                            <a
                                              href={this.state.tel}
                                              style={{ color: '#00BCA3' }}
                                            >
                                              {/* <FormattedMessage id="help.tel" /> */}
                                              {
                                                this.props.configStore
                                                  .storeContactPhoneNumber
                                              }
                                            </a>
                                          </p>
                                        </div>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-alpha rc-border--none rc-md-down"
                                          >
                                            {/* 800 024 77 64 */}
                                            {/* <FormattedMessage id="help.mail" /> */}
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <img
                                        className="align-self-center widthAuto"
                                        src={callImg}
                                        alt="By telephone"
                                        title="By telephone"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </article>
                              <article className="rc-full-width rc-column">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#0087BD' }}>
                                          <font
                                            style={{ verticalAlign: 'inherit' }}
                                          >
                                            <font
                                              style={{
                                                verticalAlign: 'inherit'
                                              }}
                                            >
                                              <FormattedMessage id="help.byEmail" />
                                            </font>
                                          </font>
                                        </b>
                                        <p>
                                          <span
                                            style={{ color: 'rgb(0, 0, 0)' }}
                                          >
                                            <font
                                              style={{
                                                verticalAlign: 'inherit'
                                              }}
                                            >
                                              <font
                                                style={{
                                                  verticalAlign: 'inherit'
                                                }}
                                              >
                                                <FormattedMessage id="help.tip3" />
                                              </font>
                                            </font>
                                          </span>
                                        </p>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            className="rc-numeric rc-md-up"
                                            style={{
                                              color: 'rgb(0, 135, 189)',
                                              whiteSpace:'nowrap'
                                            }}
                                          >
                                            <a
                                              href={this.state.mailAddress}
                                              style={{
                                                color: 'rgb(0, 135, 189)'
                                              }}
                                            >
                                              {/* <FormattedMessage id="help.email" /> */}
                                              {
                                                this.props.configStore
                                                  .storeContactEmail
                                              }
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <img
                                        className="align-self-center widthAuto"
                                        src={emailImg}
                                        alt="By email"
                                        title="By email"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </article>
                              {/* <h1 className="rc-beta" style={{ margin: '0 0 0 1rem' }}>
                                <font style={{ verticalAlign: "inherit" }}>
                                  <Link className="rc-list__link" style={{ color: '#e2001a' }} to="/FAQ/all" role="menuitem">
                                    <FormattedMessage id="footer.FAQ" />
                                  </Link>
                                </font>
                              </h1> */}
                            </div>
                            <div className="rc-column rc-triple-width">
                              <div
                                className="background-cover"
                                style={{
                                  backgroundImage: `url(${require('@/assets/images/slider-img-help.jpg?sw=802&amp;sh=336&amp;sm=cut&amp;sfrm=png')})`
                                }}
                              >
                                <picture className="rc-card__image">
                                  <img src={helpImg} alt=" " title=" " />
                                </picture>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            process.env.REACT_APP_LANG == 'fr'?
            <div>
              <FrTips/>
              <FrFaq/>
            </div>
            :null
          }
          
        </main>

        <Footer />
      </div>
    );
  }
}

export default Help;
