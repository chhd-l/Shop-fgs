import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import FooterImage from './modules/FooterImage';
import SalesCategory from './modules/SalesCategory';
import HubSalesCategory from '@/components/HubSalesCategory';
import { salesCategoryFilterRule } from '@/components/HubSalesCategory/utils';
import { Ads } from './ad';
import { TopAds } from './ad';
import { Advantage } from './advantage';
import { setSeoConfig, getDeviceType, getOktaCallBackUrl } from '@/utils/utils';
import './index.css';
import Loading from '@/components/Loading';
import { withOktaAuth } from '@okta/okta-react';
import { Helmet } from 'react-helmet';
import stores from '@/store';

import LongBanner from './Components/LongBanner/index';
import goldenfood from './image/goldenfood.png';
import SubsriptionBenefitsNew from './SubscriptionBenefitsNew';
import HowItWorksNew from './Components/HowItWorksNew';
import JoinTodayNew from './Components/JoinTodayNew';
import CommentCarouselNew from '../../components/CommentCarouselNew';
import GetMoreAd from './Components/GetMoreAd';
import HelpComponentsNew from '../../components/HelpComponentsNew/HelpComponents';

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

class ClubLandingPageNew extends React.Component {
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

          <LongBanner />

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-headingBlock">
                  <div className="rc-max-width--md text-center rc-margin-y--md">
                    <div className="rc-alpha inherit-fontsize">
                      <h1>
                        <FormattedMessage id="ClubLP.Advantage.title" />
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                    <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row flex-column-reverse">
                      <div className="rc-column">
                        <div className="rc-padding-y--lg--mobile rc-full-width">
                          <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                            <li className="rc-list__item">
                              <em className="bingo rc-margin-right--xs"></em>
                              <FormattedMessage id="ClubLP.Advantage.content1" />
                            </li>
                            <li className="rc-list__item">
                              <em className="bingo rc-margin-right--xs"></em>
                              <FormattedMessage id="ClubLP.Advantage.content2" />
                            </li>
                            <li className="rc-list__item">
                              <em className="bingo rc-margin-right--xs"></em>
                              <FormattedMessage id="ClubLP.Advantage.content3" />
                            </li>
                            <li className="rc-list__item">
                              <em className="bingo rc-margin-right--xs"></em>
                              <FormattedMessage id="ClubLP.Advantage.content4" />
                            </li>
                          </ul>
                          <br />
                          <br />
                          <div className=" rc-btn-group m-0 rc-column rc-padding-x--none">
                            <Link to="/cats/vet-products">
                              <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                                Find your tailored food now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="rc-column">
                        <div className="lazyload-wrapper">
                          <img
                            alt="With the Subscription, they will always have what they need"
                            className="w-100 lazyloaded"
                            src={goldenfood}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: '5vh', backgroundColor: '#D0D0D0' }} />
          <div style={{ backgroundColor: '#D0D0D0' }}>
            <SubsriptionBenefitsNew />
          </div>
          <div style={{ height: '5vh', backgroundColor: '#D0D0D0' }} />

          <HowItWorksNew />

          <div style={{ height: '5vh', backgroundColor: '#D0D0D0' }} />
          <div style={{ backgroundColor: '#D0D0D0' }}>
            <JoinTodayNew />
          </div>
          <div style={{ height: '5vh', backgroundColor: '#D0D0D0' }} />

          <CommentCarouselNew />

          <GetMoreAd />

          <Divider />

          <HelpComponentsNew />

          <Footer />
        </main>
      </div>
    );
  }
}

export default withOktaAuth(ClubLandingPageNew);
