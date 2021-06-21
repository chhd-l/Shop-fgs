import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
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
import vetru from '../ClubLandingPage/vetlandingpage/images/VET@2x.png';

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
      localItemRoyal.set(
        'okta-redirectUrl',
        '/account/orders' + history.location.search
      );
    }
    if (parametersString.indexOf('redirect=subscription') >= 0) {
      localItemRoyal.set(
        'okta-redirectUrl',
        '/account/subscription' + history.location.search
      );
    }
    if (parametersString.indexOf('redirect=baseinfo') >= 0) {
      localItemRoyal.set('okta-redirectUrl', '/account/information');
    }
    if (parametersString.indexOf('redirect=pets') >= 0) {
      localItemRoyal.set('okta-redirectUrl', '/account/pets');
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
                    <div className="rc-beta text-center  rc-margin-bottom--lg--mobile">
                      <h3 style={{ fontWeight: '550' }}>
                        <FormattedMessage id="ClubLP.Advantage.title" />
                      </h3>
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
                  <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm  content-block rc-max-width--lg">
                    <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row ">
                      <div className="rc-column">
                        <div className=" rc-full-width">
                          <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                            <li className="rc-list__item flex">
                              <div>
                              <em className="bingo rc-margin-right--xs"></em>
                              </div>
                              <div>
                              <FormattedMessage id="ClubLP.Advantage.content1" />
                              </div>
                            </li>
                            <li className="rc-list__item flex">
                              <div>
                              <em className="bingo rc-margin-right--xs"></em>
                              </div>
                              <div>
                              <FormattedMessage id="ClubLP.Advantage.content2" />
                              </div>
                            </li>
                            <li className="rc-list__item flex">
                              <div>
                              <em className="bingo rc-margin-right--xs"></em>
                              </div>
                              <div>
                              <FormattedMessage id="ClubLP.Advantage.content3" />
                              </div>
                            </li>
                            <li className="rc-list__item flex">
                              <div>
                              <em className="bingo rc-margin-right--xs"></em>
                              </div>
                              <div>
                              <FormattedMessage id="ClubLP.Advantage.content4" />
                              </div>
                            </li>
                          </ul>
                          <div className="rc-padding-x--none detextcenter">
                            <DistributeHubLinkOrATag
                              href={'/product-finder'}
                              ariaLabel="Links to product finder"
                            >
                              <button className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs">
                                <FormattedMessage id="ClubLP.Advantage.button" />
                              </button>
                            </DistributeHubLinkOrATag>
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

          <Divider />
          <GetMoreAd />

          <Divider />

          {process.env.REACT_APP_COUNTRY == 'ru' ? (
            <div className="experience-component experience-layouts-1column">
              <div className="row rc-margin-x--none ">
                <div className="rc-full-width">
                  <div className="experience-component experience-assets-contentBlock">
                    <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                      <a
                        id="undefined"
                        name="undefined"
                        className="page-section-anchor"
                        aria-hidden="true"
                      ></a>
                      <div className="row align-items-md-center">
                        <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <img
                              className="w-100 lazyloaded"
                              data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw231c60b5/About-us/YORKSHIRE_TERRIER_PUPPY___MOTHER_-_BREED_EMBLEMATIC_Med._Res.___Basic.jpg?sw=622"
                              alt="Yorkshire dog pic - Our Values"
                              title="Yorkshire dog pic - Our Values"
                              src={vetru}
                            />
                          </picture>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">
                              Ищете ветеринарную диету?
                            </h2>
                            <p>
                              <span>
                                Диетическое питание, которое помогает
                                поддерживать здоровье питомцев с
                                диагностированными заболеваниями
                              </span>
                            </p>
                            <Link to="subscription-landing">
                              <button className="rc-btn rc-btn--two">
                                Узнать подробнее
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <Divider />

          <HelpComponentsNew />

          <Footer />
        </main>
      </div>
    );
  }
}

export default withOktaAuth(ClubLandingPageNew);
