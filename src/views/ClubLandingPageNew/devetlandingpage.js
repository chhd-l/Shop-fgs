import React from 'react';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
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
import declublogo from './deimage/declublogo.png';
import vetdeimage from './deimage/Product-composition-dog.png';

import dehowit1 from './deimage/dehowit1.png';
import dehowit2 from './deimage/dehowit2.png';
import dehowit3 from './deimage/dehowit3.png';
import dehowit4 from './deimage/dehowit4.png';
import number1 from './deimage/number1.png';
import number2 from './deimage/number2.png';
import number3 from './deimage/number3.png';
import number4 from './deimage/number4.png';
import HelpComponentsNew from '../../components/HelpComponentsNew/HelpComponents';
import vetru from '../ClubLandingPage/vetlandingpage/images/VET@2x.png';
import logoad from './Components/GetMoreAd/image/logoad.png';
import StoreCode from './Components/DeStoreCode/storecode';
import SalesCategory from '../Home/modules/SalesCategory';
import goldenfood from './image/goldenfood.png';
import line from './deimage/Line@4x.png';
import HubSalesCategory from '../../components/HubSalesCategory';
import { salesCategoryFilterRule } from '../../components/HubSalesCategory/utils';

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

          <HubSalesCategory rule={salesCategoryFilterRule} />

          <Divider />

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-layouts-cardcarousel">
                  <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile ">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition text-center">
                      <div>
                        <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                          Empfehlungscode Ihrer Tierarztpraxis
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
