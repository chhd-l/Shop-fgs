import React from 'react';
import { FormattedMessage } from 'react-intl';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { setSeoConfig, getDeviceType, getOktaCallBackUrl } from '@/utils/utils';
import './index.css';
import Loading from '@/components/Loading';
import { withOktaAuth } from '@okta/okta-react';
import { Helmet } from 'react-helmet';
import stores from '@/store';
import vetdeimage from './deimage/Product-composition-dog.png';
import decat from './deimage/delangdingpagecat.png';
import dedog from './deimage/delangdingpagedog.png';
import decat1 from './deimage/decat1.png';
import decat2 from './deimage/decat2.png';
import dedog1 from './deimage/dedog1.png';
import dedog2 from './deimage/dedog2.png';

import SalesCategory from '../Home/modules/SalesCategory';
import Logo from '../../components/Logo';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const loginStore = stores.loginStore;
const pageLink = window.location.href;
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
                            src={vetdeimage}
                          />
                        </div>
                      </div>
                      <div className="rc-column">
                        <div className="rc-padding-y--lg--mobile rc-full-width">
                          <p
                            style={{
                              fontSize: '28px',
                              color: '#E2001A'
                            }}
                          >
                            Die richtige Ernährung ist eine wesentliche Grundlage für Tiergesundheit
                          </p>
                          <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                            <li className="rc-list__item">
                              <em className="petCrew rc-margin-right--xs"></em>
                              Verbesserung der Lebensqualität der Tiere
                            </li>
                            <li className="rc-list__item">
                              <em className="petCrew rc-margin-right--xs"></em>
                              Unterstützung von Tieren mit fütterungsbedingten Erkrankungen
                            </li>
                            <li className="rc-list__item">
                              <em className="petCrew rc-margin-right--xs"></em>
                              Beeinflussung des Wachstums von Katzen- und Hundewelpen
                            </li>
                            <li className="rc-list__item">
                              <em className="petCrew rc-margin-right--xs"></em>
                              Beitrag zum Management von Erkrankungen
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

          <div className="">
            <div className="rc-fgs-component-container">
              <div className="hub-category rc-bg-colour--brand3 rc-margin-bottom--xs">
                <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile category-cards rc-padding--sm">
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                    <span>
                      Die tierärztlichen Diätnahrungen <br /> von ROYAL CANIN®
                    </span>
                  </h4>
                  <div className="rc-intro inherit-fontsize text-center contact_options__subheading">
                    <p>
                      <span>
                        <p>Seit 1968 erforscht ROYAL CANIN® die besonderen Ernährungsbedürfnisse von Katzen und Hunden bis ins kleinste Detail. Denn schon kleinste Nährstoffunterschiede in der Nahrung können einen großen Unterschied für das Wohlbefinden Ihres Haustieres bedeuten. Das gilt natürlich um so mehr, wenn Tierärzt*innen bei Ihrer Katze oder Ihrem Hund ein besonderes Bedürfnis festgestellt haben. Gerade dann kann eine maßgeschneiderte Ernährung helfen, die Gesundheit Ihres Haustieres zu unterstützen und zu erhalten.</p>
                        <p>ROYAL CANIN® bietet deshalb ein umfangreiches Programm an Nahrungen an, die speziell auf die tierärztlich festgestellten besonderen Bedürfnisse von Katzen und Hunden abgestimmt sind. Sprechen Sie mit Ihrer Tierärztin oder Ihrem Tierarzt darüber, mit welcher ROYAL CANIN® Nahrung Sie die Gesundheit Ihres vierbeinigen Begleiters am besten unterstützen können.</p>
                      </span>
                    </p>
                  </div>
                  <div className="rc-layout-container rc-two-column">
                    <div className="rc-column">
                      <div className="header-title">
                        <h1 className="rc-espilon">Für Katzen</h1>
                        <img src={decat} />
                      </div>
                      <div className="rc-layout-container rc-two-column">
                        <div className="rc-column category-goods">
                          <a
                            className="rc-moblie-flex flex-wrap justify-content-center"
                            href="https://www.royalcanin.com/fr/shop/dogs/retail-products"
                          >
                            <img src={decat1} />
                            <div className="d-flex justify-content-center">
                              <h3 className="rc-margin--none">
                                Aliments pour chien
                              </h3>
                            </div>
                          </a>
                        </div>
                        <div className="rc-column category-goods">
                          <a
                            className="rc-moblie-flex flex-wrap justify-content-center"
                            href="https://www.royalcanin.com/fr/shop/dogs/vet-products"
                          >
                            <img src={decat2} />
                            <div className="d-flex justify-content-center">
                              <h3 className="rc-margin--none">
                                Aliments vétérinaire pour chien
                              </h3>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="rc-column">
                      <div className="header-title">
                        <h1 className="rc-espilon">Für Hunde</h1>
                        <img src={dedog} />
                      </div>
                      <div className="rc-layout-container rc-two-column">
                        <div className="rc-column category-goods">
                          <a
                            className="rc-moblie-flex flex-wrap justify-content-center"
                            href="https://www.royalcanin.com/fr/shop/dogs/retail-products"
                          >
                            <img src={dedog1} />
                            <div className="d-flex justify-content-center">
                              <h3 className="rc-margin--none">
                                Aliments pour chien
                              </h3>
                            </div>
                          </a>
                        </div>
                        <div className="rc-column category-goods">
                          <a
                            className="rc-moblie-flex flex-wrap justify-content-center"
                            href="https://www.royalcanin.com/fr/shop/dogs/vet-products"
                          >
                            <img src={dedog2} />
                            <div className="d-flex justify-content-center">
                              <h3 className="rc-margin--none">
                                Aliments vétérinaire pour chien
                              </h3>
                            </div>
                          </a>
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
                <div className="experience-component experience-layouts-cardcarousel">
                  <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile ">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition text-center">
                      <div>
                        <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                          Unser Diätnahrungssortiment
                        </h4>
                      </div>
                      <div className="flex justify-content-center">
                        <iframe
                          width="560"
                          height="315"
                          src="https://www.youtube.com/embed/3Tfl1pmFej8"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />
          <SalesCategory />

          <Footer />
        </main>
      </div>
    );
  }
}

export default withOktaAuth(ClubLandingPageDeVet);
