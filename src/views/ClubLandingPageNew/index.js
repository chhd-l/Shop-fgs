import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DistributeHubLinkOrATag } from '@/components/DistributeLink';
import { getDeviceType } from '@/utils/utils';
import { seoHoc } from '@/framework/common';
import './index.css';
import Loading from '@/components/Loading';
import { withOktaAuth } from '@okta/okta-react';
import stores from '@/store';

import LongBanner from './Components/LongBanner/index';
import goldenfood from './image/goldenfood.webp';
import SubsriptionBenefitsNew from './SubscriptionBenefitsNew';
import HowItWorksNew from './Components/HowItWorksNew';
import JoinTodayNew from './Components/JoinTodayNew';
import CommentCarouselNew from '../../components/CommentCarouselNew';
import GetMoreAd from './Components/GetMoreAd';
import HelpComponentsNew from '../../components/HelpComponentsNew/HelpComponents';
import vetru from '../ClubLandingPage/vetlandingpage/images/VET@2x.webp';
import ruhowitworknew1 from './Components/HowItWorksNew/image/ruhowitworksnew1.png';
import ruhowitworknew2 from './Components/HowItWorksNew/image/ruhowitworksnew2.png';
import ruhowitworknew3 from './Components/HowItWorksNew/image/ruhowitworksnew3.png';
import ruhowitworknew4 from './Components/HowItWorksNew/image/ruhowitworksnew4.png';
import ruhowitworknewmobile1 from './Components/HowItWorksNew/image/ruhowitworksmobile1.png';
import ruhowitworknewmobile2 from './Components/HowItWorksNew/image/ruhowitworksmobile2.png';
import ruhowitworknewmobile3 from './Components/HowItWorksNew/image/ruhowitworksmobile3.png';
import ruhowitworknewmobile4 from './Components/HowItWorksNew/image/ruhowitworksmobile4.png';
import frhowitworknew1 from './Components/HowItWorksNew/image/frhowitworknew1.png';
import frhowitworknew2 from './Components/HowItWorksNew/image/frhowitworknew2.png';
import frhowitworknew3 from './Components/HowItWorksNew/image/frhowitworknew3.png';
import frhowitworknew4 from './Components/HowItWorksNew/image/frhowitworknew4.png';
import frhowitworknewmobile1 from './Components/HowItWorksNew/image/frhowitworknewmobile1.png';
import frhowitworknewmobile2 from './Components/HowItWorksNew/image/frhowitworknewmobile2.png';
import frhowitworknewmobile3 from './Components/HowItWorksNew/image/frhowitworknewmobile3.png';
import frhowitworknewmobile4 from './Components/HowItWorksNew/image/frhowitworknewmobile4.png';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const loginStore = stores.loginStore;
const deviceType = getDeviceType();
let RCDrawPng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw.jpg`;
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

//Ru Image
const RuhowitworksnewLists = [
  {
    HowitworksStep: ruhowitworknew1
  },
  {
    HowitworksStep: ruhowitworknew2
  },
  {
    HowitworksStep: ruhowitworknew3
  },
  {
    HowitworksStep: ruhowitworknew4
  }
];

const RuhowitworksnewListmobiles = [
  {
    HowitworksStep: ruhowitworknewmobile1
  },
  {
    HowitworksStep: ruhowitworknewmobile2
  },
  {
    HowitworksStep: ruhowitworknewmobile3
  },
  {
    HowitworksStep: ruhowitworknewmobile4
  }
];

//Fr Image
const FrhowitworksnewList = [
  {
    HowitworksStep: frhowitworknew1
  },
  {
    HowitworksStep: frhowitworknew2
  },
  {
    HowitworksStep: frhowitworknew3
  },
  {
    HowitworksStep: frhowitworknew4
  }
];

const FrhowitworksnewListmobile = [
  {
    HowitworksStep: frhowitworknewmobile1
  },
  {
    HowitworksStep: frhowitworknewmobile2
  },
  {
    HowitworksStep: frhowitworknewmobile3
  },
  {
    HowitworksStep: frhowitworknewmobile4
  }
];

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

@seoHoc('club subscription landing')
class ClubLandingPageNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true,
      searchEvent: {}
    };
  }

  componentWillUnmount() {}
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

    return (
      <div>
        <Canonical />
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
          searchEvent={this.state.searchEvent}
        />
        <Header
          {...this.props}
          showMiniIcons={true}
          showUserIcon={true}
          sendGAHeaderSearch={this.sendGAHeaderSearch}
        />
        <main className={'rc-content--fixed-header'}>
          <BannerTip />

          <LongBanner />

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-headingBlock">
                  <div className="rc-max-width--md text-center rc-margin-top--md">
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
                  <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-bottom--sm  content-block rc-max-width--lg">
                    <div className="rc-layout-container rc-two-column rc-content-h-middle flex-md-row ">
                      <div className="rc-column">
                        <div className=" rc-full-width">
                          <ul
                            className="rc-list rc-list--blank rc-list--align rc-list--large-icon"
                            style={
                              window.__.env.REACT_APP_COUNTRY == 'fr'
                                ? { fontWeight: '550' }
                                : {}
                            }
                          >
                            <li className="rc-list__item flex">
                              <div>
                                <em className="bingo iconfont rc-margin-right--xs"></em>
                              </div>
                              <div>
                                <FormattedMessage id="ClubLP.Advantage.content1" />
                              </div>
                            </li>
                            <li className="rc-list__item flex">
                              <div>
                                <em className="bingo iconfont rc-margin-right--xs"></em>
                              </div>
                              <div>
                                <FormattedMessage id="ClubLP.Advantage.content2" />
                              </div>
                            </li>
                            <li className="rc-list__item flex">
                              <div>
                                <em className="bingo iconfont rc-margin-right--xs"></em>
                              </div>
                              <div>
                                <FormattedMessage id="ClubLP.Advantage.content3" />
                              </div>
                            </li>
                            <li className="rc-list__item flex">
                              <div>
                                <em className="bingo iconfont rc-margin-right--xs"></em>
                              </div>
                              <div>
                                <FormattedMessage id="ClubLP.Advantage.content4" />
                              </div>
                            </li>
                          </ul>
                          <div className="rc-padding--xs detextcenter">
                            <DistributeHubLinkOrATag
                              href={'/product-finder'}
                              data-tms-ruproductfinderlandingpage="1"
                              ariaLabel="Links to product finder"
                            >
                              <button
                                onClick={() => {
                                  window.__.env.REACT_APP_COUNTRY == 'ru' &&
                                    window?.dataLayer?.push({
                                      event: 'ruClubSubscriptionCtA',
                                      ruClubSubscriptionCtAName:
                                        'Choose a diet - Top'
                                    });
                                }}
                                className="rc-btn rc-btn--one rc-margin-right--xs rc-margin-bottom--xs"
                                style={
                                  window.__.env.REACT_APP_COUNTRY === 'fr'
                                    ? {
                                        paddingLeft: '20px',
                                        paddingRight: '20px'
                                      }
                                    : null
                                }
                              >
                                <FormattedMessage
                                  id="ClubLP.Advantage.button"
                                  values={
                                    isMobile ? { val: <br /> } : { val: null }
                                  }
                                />
                              </button>
                            </DistributeHubLinkOrATag>
                          </div>
                        </div>
                      </div>
                      <div className="rc-column">
                        <div className="lazyload-wrapper">
                          <LazyLoad>
                            <img
                              alt="With the Subscription, they will always have what they need"
                              className="w-100 lazyloaded"
                              src={goldenfood}
                            />
                          </LazyLoad>
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

          <HowItWorksNew
            RuhowitworksnewList={RuhowitworksnewLists}
            RuhowitworksnewListmobile={RuhowitworksnewListmobiles}
            FrhowitworksnewList={FrhowitworksnewList}
            FrhowitworksnewListmobile={FrhowitworksnewListmobile}
          />

          <div style={{ height: '5vh', backgroundColor: '#D0D0D0' }} />
          <div style={{ backgroundColor: '#D0D0D0' }}>
            <JoinTodayNew />
          </div>
          <div style={{ height: '5vh', backgroundColor: '#D0D0D0' }} />

          <CommentCarouselNew />

          <Divider />
          <GetMoreAd />

          <Divider />

          {window.__.env.REACT_APP_COUNTRY == 'ru' ? (
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
                          <LazyLoad>
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <img
                                className="w-100 lazyloaded"
                                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw231c60b5/About-us/YORKSHIRE_TERRIER_PUPPY___MOTHER_-_BREED_EMBLEMATIC_Med._Res.___Basic.jpg?sw=622"
                                alt="Yorkshire dog pic - Our Values"
                                title="Yorkshire dog pic - Our Values"
                                src={vetru}
                              />
                            </picture>
                          </LazyLoad>
                        </div>
                        <div className=" col-12 col-lg-6">
                          <div className="text-center text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                            <h2 className="rc-beta markup-text">
                              У Вашего питомца диагностировали заболевание?
                            </h2>
                            <p>
                              <span>
                                Диетическое питание, которое помогает
                                поддерживать здоровье питомцев с
                                диагностированными заболеваниями
                              </span>
                            </p>
                            <Link to="subscription-landing">
                              <button
                                className="rc-btn rc-btn--two"
                                onClick={() => {
                                  window.__.env.REACT_APP_COUNTRY == 'ru' &&
                                    window?.dataLayer?.push({
                                      event: 'ruClubSubscriptionCtA',
                                      ruClubSubscriptionCtAName: 'Learn More'
                                    });
                                }}
                              >
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
