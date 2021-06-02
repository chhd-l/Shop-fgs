import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import vetdeimage from './deimage/Product-composition-dog.png'
import { setSeoConfig, getDeviceType, getOktaCallBackUrl } from '@/utils/utils';
import './index.css';
import Loading from '@/components/Loading';
import { withOktaAuth } from '@okta/okta-react';
import { Helmet } from 'react-helmet';
import stores from '@/store';
import declublogo from './deimage/declublogo.png'

import line from './deimage/Line@4x.png'
import dephone from './deimage/dePhoneicon.png'
import demail from './deimage/deEmailicon.png'
import dehowit1 from './deimage/dehowit1.png'
import dehowit2 from './deimage/dehowit2.png'
import dehowit3 from './deimage/dehowit3.png'
import dehowit4 from './deimage/dehowit4.png'
import number1 from './deimage/number1.png'
import number2 from './deimage/number2.png'
import number3 from './deimage/number3.png'
import number4 from './deimage/number4.png'
import HelpComponentsNew from '../../components/HelpComponentsNew/HelpComponents';
import vetru from '../ClubLandingPage/vetlandingpage/images/VET@2x.png';
import logoad from './Components/GetMoreAd/image/logoad.png';
import logoclubad from './Components/GetMoreAd/image/CLUBLOGOSUBSCIPTION@4x.png';
import online1 from './deimage/onlinepic1.png'
import online2 from './deimage/onlinepic2.png'
import online3 from './deimage/onlinepic3.png'
import online4 from './deimage/onlinepic4.png'
import callImgNew from '../../components/HelpComponentsNew/img/phoneicon@4x.png';
import emailImgNew from '../../components/HelpComponentsNew/img/emailicon@4x.png';
import faqImgNew from '../../components/HelpComponentsNew/img/FAQicon@4x.png';
import Logo from '../../components/Logo';
import DeMyList from './demylist';
import StoreCode from './Components/DeStoreCode/storecode';
import SalesCategory from '../Home/modules/SalesCategory';
import goldenfood from './image/goldenfood.png';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const loginStore = stores.loginStore;
const pageLink = window.location.href;
const deviceType = getDeviceType();
let RCDrawPng = `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw.jpg`;
function Divider() {
  return (
    <div className="experience-component experience-assets-divider">
      <div
        className="rc-border-bottom rc-border-colour--brand4"
        style={{ borderBottomWidth: '4px' }}
      />
    </div>
  );
}

class ClubLandingPageDeVet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true,
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      searchEvent: {}
    };
  }

  async componentDidMount() {
    if (localItemRoyal.get('login-again')) {
      loginStore.changeLoginModal(true);
      var callOktaCallBack = getOktaCallBackUrl(
        localItemRoyal.get('okta-session-token')
      );
      localItemRoyal.remove('login-again');
      window.location.href = callOktaCallBack;
    } // Cross-store login
    setSeoConfig({ pageName: 'Home Page' }).then((res) => {
      this.setState({ seoConfig: res });
    });
    if (localItemRoyal.get('logout-redirect-url')) {
      let url = localItemRoyal.get('logout-redirect-url');
      localItemRoyal.remove('logout-redirect-url');
      location.href = url;
    }
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  sendGAHeaderSearch = (event) => {
    this.setState({
      searchEvent: event
    });
  };
  render() {
    const { history, match, location } = this.props;

    const event = {
      page: {
        type: 'Homepage',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: ''
      }
    };

    const parametersString = history.location.search;
    if (parametersString.indexOf('redirect=order') >= 0) {
      sessionItemRoyal.set(
        'okta-redirectUrl',
        '/account/orders' + history.location.search
      );
    }
    if (parametersString.indexOf('redirect=subscription') >= 0) {
      sessionItemRoyal.set(
        'okta-redirectUrl',
        '/account/subscription' + history.location.search
      );
    }
    if (parametersString.indexOf('redirect=baseinfo') >= 0) {
      sessionItemRoyal.set('okta-redirectUrl', '/account/information');
    }
    if (parametersString.indexOf('redirect=pets') >= 0) {
      sessionItemRoyal.set('okta-redirectUrl', '/account/pets');
    }
    if (parametersString.indexOf('toOkta=true') >= 0) {
      this.props.oktaAuth.signInWithRedirect(process.env.REACT_APP_HOMEPAGE);
      return <Loading bgColor={'#fff'} />;
    }
    if (parametersString.indexOf('origin=forgot') >= 0) {
      this.props.oktaAuth.signInWithRedirect(process.env.REACT_APP_HOMEPAGE);
      return <Loading bgColor={'#fff'} />;
    }

    if (localItemRoyal.get('login-again')) {
      return null;
    }

    return (
      <div>
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
        </Helmet>
        <GoogleTagManager
          additionalEvents={event}
          searchEvent={this.state.searchEvent}
        />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          match={match}
          location={location}
          history={history}
          sendGAHeaderSearch={this.sendGAHeaderSearch}
        />
        <main className={'rc-content--fixed-header'}>
          <BannerTip />
          <div
            style={{
              textAlign: 'center',
              height: '42px',
              backgroundColor: '#F6F6F6',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div style={{ alignSelf: 'center', color: '#E2001A' }}>
              <FormattedMessage id="ClubLP.discount.content"></FormattedMessage>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                    <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                      <div className="rc-column">
                        <div className="lazyload-wrapper">
                          <img
                            alt="With the Subscription, they will always have what they need"
                            className="w-100 lazyloaded"
                            src={goldenfood}
                          />
                        </div>
                      </div>
                      <div className="rc-column">
                        <div className="rc-padding-y--lg--mobile rc-full-width">
                          <p>
                            What makes the RC Vet Portfolio special​
                          </p>
                          <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                            <li className="rc-list__item">
                              <em className="petCrew rc-margin-right--xs"></em>
                              Djaöfonöoihaer
                            </li>
                            <li className="rc-list__item">
                              <em className="petCrew rc-margin-right--xs"></em>
                              Aeornöoiaöoebaröoobaöobe​
                            </li>
                            <li className="rc-list__item">
                              <em className="petCrew rc-margin-right--xs"></em>
                              Oaberoö.aneonioaebnr
                            </li>
                            <li className="rc-list__item">
                              <em className="petCrew rc-margin-right--xs"></em>
                              aöneörionanöobearboobe
                            </li>
                          </ul>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                    <div>
                      <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                        Wie funktioniert die Bestellung?
                      </h4>
                    </div>
                    <div style={{display:'flex',justifyContent:"center"}} className="deflexcolumn">
                      <div className="ordertwo">
                        <LazyLoad>
                          <img src={dehowit1} className="desktop30vw"/>
                        </LazyLoad>
                      </div>
                      <div style={{marginLeft:'5vw',marginRight:'5vw',display:'flex',alignItems:'center'}} className="orderone decenter">
                        <LazyLoad>
                          <img src={number1} style={{height:'50px'}} />
                        </LazyLoad>
                      </div>
                      <div className="desktop30vw orderthree">
                        <p >
                          Besuchen Sie Ihre Tierarztpraxis und erhalten Sie eine Nahrungsempfehlung zur Behandlung eines besonderen Bedürfnisses Ihrer Katze oder Ihres Hundes. Diese händigt Ihnen einen individuellen Empfehlungscode aus. Hier finden Sie teilnehmende Tierarztpraxen.
                        </p>
                      </div>
                    </div>

                    <div style={{display:'flex',justifyContent:"center"}} className="deflexcolumn">
                      <div style={{display:'flex',alignItems:'center'}} className="desktop30vw orderthree">
                        <p >
                          Geben Sie Ihren individuellen Empfehlungscode unten auf dieser Seite ein.
                        </p>
                      </div>
                      <div style={{marginLeft:'5vw',marginRight:'5vw',display:'flex',alignItems:'center'}} className="orderone decenter">
                        <LazyLoad>
                          <img src={number2} style={{height:'50px'}}/>
                        </LazyLoad>
                      </div>
                      <div className="ordertwo">
                        <LazyLoad>
                          <img src={dehowit2} className="desktop30vw"/>
                        </LazyLoad>
                      </div>
                    </div>

                    <div style={{display:'flex',justifyContent:"center"}} className="deflexcolumn">
                      <div className="ordertwo">
                        <LazyLoad>
                          <img src={dehowit3} className="desktop30vw"/>
                        </LazyLoad>
                      </div>
                      <div style={{marginLeft:'5vw',marginRight:'5vw',display:'flex',alignItems:'center'}} className="orderone decenter">
                        <LazyLoad>
                          <img src={number3} style={{height:'50px'}}/>
                        </LazyLoad>
                      </div>
                      <div style={{display:'flex',alignItems:'center'}} className="desktop30vw orderthree">
                        <p >
                          Suchen Sie die empfohlene Nahrung Ihrer Tierarztpraxis im Shop heraus und legen Sie diese in Ihren Warenkorb.
                        </p>
                      </div>
                    </div>

                    <div style={{display:'flex',justifyContent:"center"}} className="deflexcolumn">
                      <div style={{display:'flex',alignItems:'center'}} className="desktop30vw orderthree">
                        <p>
                          Wählen Sie Ihre gewünschte Zahlungsmethode aus und schließen Sie Ihre ROYAL CANIN® Bestellung ab. Sie erhalten Ihre bestellte Nahrung innerhalb von 1-3 Werktagen nach Hause versandt.
                        </p>
                      </div>
                      <div style={{marginLeft:'5vw',marginRight:'5vw',display:'flex',alignItems:'center'}} className="orderone decenter">
                        <LazyLoad>
                          <img src={number4} style={{height:'50px'}}/>
                        </LazyLoad>
                      </div>
                      <div className="ordertwo">
                        <LazyLoad>
                          <img src={dehowit4} className="desktop30vw"/>
                        </LazyLoad>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider/>

          <StoreCode/>

          <Divider/>

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                    <div>
                      <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                        Ihre Bestelloptionen
                      </h4>
                    </div>
                    <div
                      style={{ display: 'flex', justifyContent: 'center' }}
                      className="flexColumn"
                    >
                      <div
                        style={{
                          boxShadow: ' 0vh 0vh 0.3vh 0.1vh #DCDCDE',
                          marginTop: '10vh'
                        }}
                        className="widthsmall"
                      >
                        <div
                          style={{
                            height: '15vh',
                            marginRight: '5vh'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              marginLeft: '5vw',
                              marginTop: '10vh'
                            }}
                          >
                            <div>
                              <LazyLoad>
                                <img
                                  className="w-60 lazyloaded"
                                  src={logoad}
                                  style={{ width: '100px' }}
                                />
                              </LazyLoad>
                            </div>
                            <div
                              style={{
                                transform: 'translateY(-10px)'
                              }}
                              className="marginleftpc demobile30"
                            >
                              <p style={{ fontSize: '28px', fontWeight: 'bolder' }}  className="marginToppc">
                                Einzelbestellung
                              </p>
                            </div>
                          </div>
                        </div>

                        <div style={{ height: '30vh' }}>
                          <div className="rc-column">
                            <div className="rc-padding-y--lg--mobile rc-full-width">
                              <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                <li className="rc-list__item">
                                  <em className="bingoWhite rc-margin-right--xs"></em>
                                  <a style={{ marginLeft: '10px' }}>
                                    kostenloser Versand ​
                                  </a>
                                </li>
                                <li className="rc-list__item">
                                  <em className="bingoWhite rc-margin-right--xs"></em>
                                  <a style={{ marginLeft: '10px' }}>
                                    schnelle Lieferung innerhalb von 1-3 Werktagen​
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          height: '85vh',
                          boxShadow: ' 0vh 0vh 0.3vh 0.1vh #ed001a'
                        }}
                      >
                        <div
                          style={{
                            height: '22vh',
                            marginRight: '5vh'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              marginLeft: '3vw',
                              marginTop: '10vh'
                            }}
                          >
                            <div>
                              <LazyLoad>
                                <img
                                  className="w-60 lazyloaded"
                                  src={declublogo}
                                  style={{ width: '70px' }}
                                />
                              </LazyLoad>
                            </div>
                            <div
                              style={{
                                marginLeft: '5vh',
                                transform: 'translateY(-10px)'
                              }}
                            >
                              <p
                                style={{
                                  fontSize: '28px',
                                  fontWeight: 'bolder',
                                  color: '#E2001A'
                                }}
                              >
                                Regelmäßige
                              </p>
                              <p style={{
                                fontSize: '28px',
                                fontWeight: 'bolder',
                                color: '#E2001A',
                                margin:'0',
                              }} >
                                Lieferung
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            height: '30vh',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div className="rc-column" style={{ padding: '0' ,marginRight:'3vw',marginLeft:'2vw'}}>
                            <div className="rc-padding-y--lg--mobile rc-full-width">
                              <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                                <li className="rc-list__item">
                                  <em className="bingoWhite rc-margin-right--xs"></em>
                                  <a style={{ marginLeft: '10px' }}>
                                    10% Rabatt auf Ihre Bestellungen
                                  </a>
                                </li>
                                <li className="rc-list__item">
                                  <em className="bingoWhite rc-margin-right--xs"></em>
                                  <a style={{ marginLeft: '10px' }}>
                                    immer genug Nahrung für Ihr Tier Zuhause
                                  </a>
                                </li>
                                <li className="rc-list__item">
                                  <em className="bingoWhite rc-margin-right--xs"></em>
                                  <a style={{ marginLeft: '10px' }}>
                                    keine Mindestlaufzeit oder Kündigungsfrist
                                  </a>
                                </li>
                                <li className="rc-list__item">
                                  <em className="bingoWhite rc-margin-right--xs"></em>
                                  <a style={{ marginLeft: '10px' }}>
                                    flexibel anpassbar
                                  </a>
                                </li>
                                <li className="rc-list__item">
                                  <em className="bingoWhite rc-margin-right--xs"></em>
                                  <a style={{ marginLeft: '10px' }}>
                                    kostenloser Versand
                                  </a>
                                </li>
                                <li className="rc-list__item">
                                  <em className="bingoWhite rc-margin-right--xs"></em>
                                  <a style={{ marginLeft: '10px' }}>
                                    schnelle Lieferung innerhalb von 1-3 Werktagen
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <Divider/>
          <SalesCategory/>

          <Footer />
        </main>
      </div>
    );
  }
}

export default withOktaAuth(ClubLandingPageDeVet);
