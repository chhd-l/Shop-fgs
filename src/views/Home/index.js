import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
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
import { TopAds, Ads } from './ad';
import { Advantage, JpAdvantage } from './advantage';
import {
  getDeviceType,
  getOktaCallBackUrl,
  optimizeImage
} from '@/utils/utils';
import './index.css';
import { withOktaAuth } from '@okta/okta-react';
import { Helmet } from 'react-helmet';
import { funcUrl } from '@/lib/url-utils';
import { redirectHoc, seoHoc } from '@/framework/common';
import { inject, observer } from 'mobx-react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import renderLinkLang from './hreflang';
const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const pageLink = window.location.href;
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const RCDrawPng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw.jpg`;

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

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--next iconfont font-weight-bold icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        right: '3%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      &#xe6f9;
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--prev iconfont font-weight-bold icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        left: '3%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      &#xe6fa;
    </div>
  );
}

function HealthNutrition() {
  const settings = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    // centerMode: true,
    slidesToShow: 1,
    // slidesToScroll: 1,
    // infinite: false,
    // variableWidth: true,
    speed: 500,
    autoplay: true,
    onLazyLoad: true,
    accessibility: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    {
      us: (
        <div className="experience-component experience-layouts-1to2columnRatio">
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
            <div className="row d-flex align-items-center">
              <div className="col-12 col-lg-4">
                <div className="experience-component experience-layouts-minicarousel">
                  <Slider {...settings}>
                    <div className="rc-hero rc-hero__layout--3">
                      <div className="rc-hero__fg mini-carousel-slide rc-padding--xs">
                        <div className="rc-hero__section rc-hero__section--text rc-padding-bottom--xs">
                          <Link to="/dogs" title="SHOP DOG">
                            <div className="rc-margin-bottom--xs mini-carousel__title inherit-fontsize children-nomargin">
                              <p>Canine Breed-Specific Nutrition</p>
                            </div>
                            <p className="rc-body">
                              Find your dog's unique formula
                            </p>
                          </Link>
                          <Link
                            to="/dogs"
                            className="rc-btn rc-btn--one rc-margin-y--xs gtm-mini-carousel-btn"
                            data-gtm='{"title":"Royal Canin specific dog food for every breed","img":"[object Object]"}'
                            title="SHOP DOG"
                          >
                            SHOP DOG
                          </Link>
                        </div>
                        <Link to="/dogs" title="SHOP DOG">
                          <div className="rc-hero__section rc-hero__section--img">
                            <LazyLoad height={200}>
                              <picture data-rc-feature-objectfillpolyfill-setup="true">
                                <source
                                  media="(max-width: 640px)"
                                  // data-srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner12.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner11.jpg 2x`}
                                  // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner12.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner11.jpg 2x`}
                                  srcSet={optimizeImage({
                                    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner15.jpg`,
                                    width: 400
                                  })}
                                />
                                <source
                                  media="(min-width: 640px) and (max-width: 1439px)"
                                  // data-srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner13.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner14.jpg 2x`}
                                  // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner13.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner14.jpg 2x`}
                                  srcSet={optimizeImage({
                                    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner15.jpg`,
                                    width: 400
                                  })}
                                />
                                <source
                                  media="(min-width: 1439px)"
                                  // data-srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner1.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner15.jpg 2x`}
                                  // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner1.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner15.jpg 2x`}
                                  srcSet={optimizeImage({
                                    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner15.jpg`,
                                    width: 400
                                  })}
                                />
                                <img
                                  className="w-100 ls-is-cached lazyloaded"
                                  // data-src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner1.jpg`}
                                  alt="Royal Canin specific dog food for every breed"
                                  title="Royal Canin specific dog food for every breed"
                                  src={optimizeImage({
                                    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner15.jpg`,
                                    width: 400
                                  })}
                                />
                              </picture>
                            </LazyLoad>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="rc-hero rc-hero__layout--3">
                      <div className="rc-hero__fg mini-carousel-slide rc-padding--xs">
                        <div className="rc-hero__section rc-hero__section--text rc-padding-bottom--xs">
                          <Link to="/cats" title="SHOP CAT">
                            <div className="rc-margin-bottom--xs mini-carousel__title inherit-fontsize children-nomargin">
                              <p>Feline Breed-Specific Nutrition</p>
                            </div>
                            <p className="rc-body">
                              Find your cat's unique formula
                            </p>
                          </Link>
                          <Link
                            to="/cats"
                            className="rc-btn rc-btn--one rc-margin-y--xs gtm-mini-carousel-btn"
                            data-gtm='{"title":"Royal Canin specific cat food for every breed","img":"[object Object]"}'
                            title="SHOP CAT"
                          >
                            SHOP CAT
                          </Link>
                        </div>
                        <Link to="/cats" title="SHOP CAT">
                          <div className="rc-hero__section rc-hero__section--img">
                            <LazyLoad height={200}>
                              <picture data-rc-feature-objectfillpolyfill-setup="true">
                                <source
                                  media="(max-width: 640px)"
                                  // data-srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner21jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner22.jpg 2x`}
                                  // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner21jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner22.jpg 2x`}
                                  srcSet={optimizeImage({
                                    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner25.jpg`,
                                    width: 400
                                  })}
                                />
                                <source
                                  media="(min-width: 640px) and (max-width: 1439px)"
                                  // data-srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner23.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner24.jpg 2x`}
                                  // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner23.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner24.jpg 2x`}
                                  srcSet={optimizeImage({
                                    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner25.jpg`,
                                    width: 400
                                  })}
                                />
                                <source
                                  media="(min-width: 1439px)"
                                  // data-srcset={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner2.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner25.jpg 2x`}
                                  // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner2.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner25.jpg 2x`}
                                  srcSet={optimizeImage({
                                    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner25.jpg`,
                                    width: 400
                                  })}
                                />
                                <img
                                  className="w-100 ls-is-cached lazyloaded"
                                  // data-src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner2.jpg`}
                                  alt="Royal Canin specific cat food for every breed"
                                  title="Royal Canin specific cat food for every breed"
                                  src={optimizeImage({
                                    originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/minibanner25.jpg`,
                                    width: 400
                                  })}
                                />
                              </picture>
                            </LazyLoad>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div className="experience-component experience-assets-contentBlock">
                  <div className="rc-content-block rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block rc-max-width--lg">
                    <a
                      id="undefined"
                      name="undefined"
                      className="page-section-anchor"
                      aria-hidden="true"
                    >
                      {' '}
                    </a>
                    <div className="row w-100 align-items-center hp-right-content-block rc-margin-top--none">
                      <div className=" col-12 col-lg-6 rc-padding-x--sm--desktop">
                        <LazyLoad height={200}>
                          <picture data-rc-feature-objectfillpolyfill-setup="true">
                            <source
                              media="(max-width: 640px)"
                              // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw4.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw5.jpg 2x`}
                              srcSet={optimizeImage({
                                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw1.jpg`,
                                width: 440
                              })}
                            />
                            <source
                              media="(min-width: 640px) and (max-width: 769px)"
                              // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw2.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw3.jpg 2x`}
                              srcSet={optimizeImage({
                                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw1.jpg`,
                                width: 440
                              })}
                            />
                            <source
                              media="(min-width: 769px)"
                              // srcSet={`${RCDrawPng}, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw1.jpg 2x`}
                              srcSet={optimizeImage({
                                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw1.jpg`,
                                width: 440
                              })}
                            />
                            <img
                              className="w-100 ls-is-cached lazyloaded"
                              alt="Royal Canin Health Through Nutrition"
                              title="Royal Canin Health Through Nutrition"
                              src={optimizeImage({
                                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw1.jpg`,
                                width: 440
                              })}
                            />
                          </picture>
                        </LazyLoad>
                      </div>
                      <div className=" col-12 col-lg-6">
                        <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                          <h2 className="rc-beta markup-text">
                            Health is Our Obsession
                          </h2>
                          <p>
                            For over 50 years, our mission has been the same: to
                            make a better world for pets. To give pets the best
                            life possible, we focus on the specific nutrients
                            they need to support their lifelong health.
                          </p>
                          <Link
                            className="rc-btn rc-btn--two gtm-content-block-btn js-hnc-try-the-club"
                            to="/Tailorednutrition"
                            title="Learn more"
                          >
                            Explore Tailored Nutrition
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }[window.__.env.REACT_APP_COUNTRY] || null
  );
}

function Share() {
  const settingsShare = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    slidesToShow: isMobile ? 1 : 4,
    speed: 500,
    autoplay: true,
    onLazyLoad: true,
    accessibility: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    {
      us: (
        <div className="experience-component experience-layouts-1column">
          <div className="row rc-margin-x--none">
            <div className="rc-full-width">
              <div className={'carousel-home-share pb-5'}>
                <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                  <h3 className="rc-beta">Share With Us #RoyalCanin</h3>
                </div>
                <Slider {...settingsShare}>
                  <div className="rc-padding-x--xs">
                    <div
                      className="rc-full-width"
                      // href="https://www.instagram.com/royalcaninus/"
                    >
                      <article className="rc-card rc-card--b rc-border--none">
                        <picture
                          className="rc-card__image"
                          data-rc-feature-objectfillpolyfill-setup="true"
                        >
                          <LazyLoad height={200} style={{ width: '100%' }}>
                            <img
                              className="w-100 lazyloaded"
                              alt="Royal Canin Dog Products on Social Media"
                              title="Royal Canin Dog Products on Social Media"
                              // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL1.jpg,  ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL11.jpg 2x`}
                              // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL1.jpg`}
                              src={optimizeImage({
                                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL11.jpg`,
                                width: 300
                              })}
                            />
                          </LazyLoad>
                        </picture>
                      </article>
                    </div>
                  </div>
                  <div className="rc-padding-x--xs">
                    <div
                      className="rc-full-width"
                      // href="https://www.instagram.com/royalcaninus/"
                    >
                      <article className="rc-card rc-card--b rc-border--none">
                        <picture
                          className="rc-card__image"
                          data-rc-feature-objectfillpolyfill-setup="true"
                        >
                          <LazyLoad height={200} style={{ width: '100%' }}>
                            <img
                              className="w-100 lazyloaded"
                              alt="Royal Canin Cat Products on Social Media"
                              title="Royal Canin Cat Products on Social Media"
                              // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL2.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL21.jpg 2x`}
                              // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL2.jpg`}
                              src={optimizeImage({
                                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL21.jpg`,
                                width: 300
                              })}
                            />
                          </LazyLoad>
                        </picture>
                      </article>
                    </div>
                  </div>
                  <div className="rc-padding-x--xs">
                    <div
                      className="rc-full-width"
                      // href="https://www.instagram.com/royalcaninus/"
                    >
                      <article className="rc-card rc-card--b rc-border--none">
                        <picture
                          className="rc-card__image"
                          data-rc-feature-objectfillpolyfill-setup="true"
                        >
                          <LazyLoad height={200} style={{ width: '100%' }}>
                            <img
                              className="w-100 lazyloaded"
                              alt="Royal Canin Dog Products on Social Media"
                              title="Royal Canin Dog Products on Social Media"
                              // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL3.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL31.jpg 2x`}
                              // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL3.jpg`}
                              src={optimizeImage({
                                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL31.jpg`,
                                width: 300
                              })}
                            />
                          </LazyLoad>
                        </picture>
                      </article>
                    </div>
                  </div>
                  <div className="rc-padding-x--xs">
                    <div
                      className="rc-full-width"
                      // href="https://www.instagram.com/royalcaninus/"
                    >
                      <article className="rc-card rc-card--b rc-border--none">
                        <picture
                          className="rc-card__image"
                          data-rc-feature-objectfillpolyfill-setup="true"
                        >
                          <LazyLoad height={200} style={{ width: '100%' }}>
                            <img
                              className="w-100 ls-is-cached lazyloaded"
                              alt="Royal Canin Cat Products on Social Media"
                              title="Royal Canin Cat Products on Social Media"
                              // srcSet={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL4.jpg, ${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL41.jpg 2x`}
                              // src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL4.jpg`}
                              src={optimizeImage({
                                originImageUrl: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/SOCIAL41.jpg`,
                                width: 300
                              })}
                            />
                          </LazyLoad>
                        </picture>
                      </article>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      )
    }[window.__.env.REACT_APP_COUNTRY] || null
  );
}

function AdvantageTips() {
  const defaultIconList = [
    {
      img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Payment-secure@2x.png`,
      langKey: 'home.point1'
    },
    {
      img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/reimbursed@2x.png`,
      langKey: 'home.point2'
    },
    {
      img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/premium@2x.png`,
      langKey: 'home.point3'
    },
    {
      img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/shippment@2x.png`,
      langKey: 'home.point4'
    }
  ];
  const iconList =
    {
      us: [
        {
          img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/Payment-secure@2x.png`,
          langKey: 'home.point1'
        },
        {
          img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CLUB-BENEFITS_FREE-SHIPPING.webp`,
          langKey: 'home.point2'
        },
        {
          img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/premium@2x.png`,
          langKey: 'home.point3'
        },
        {
          img: `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/question@2x_home_us.webp`,
          langKey: 'home.point4'
        }
      ]
    }[window.__.env.REACT_APP_COUNTRY] || defaultIconList;
  return (
    <div className="rc-full-width">
      <div className="experience-component experience-assets-centeredIconList">
        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile centered-icon-list">
          <div className="rc-sm-down">
            <div
              style={{
                maxWidth: isMobile ? '100%' : '',
                padding: isMobile ? '0' : ''
              }}
              className="row rc-padding-x--xl--mobile col-10 bottom-content__icon-list mx-auto text-center"
            >
              {iconList.map((ele, i) => (
                <div className="col-6 centered-icon-list__icon" key={i}>
                  <FormattedMessage id={ele.langKey}>
                    {(txt) => (
                      <>
                        <LazyLoad height={200}>
                          <img
                            src={optimizeImage({
                              originImageUrl: ele.img,
                              width: 40
                            })}
                            srcSet={ele.img}
                            className="mx-auto"
                            alt={txt}
                            title={txt}
                          />
                        </LazyLoad>
                        <p className="rc-meta text-center markup-text">{txt}</p>
                      </>
                    )}
                  </FormattedMessage>
                </div>
              ))}
            </div>
          </div>
          <div className="rc-sm-up">
            <div className="d-flex justify-content-center bottom-content__icon-list text-center">
              {iconList.map((ele, i) => (
                <div
                  style={{ width: '6rem' }}
                  className="centered-icon-list__icon"
                  key={i}
                >
                  <FormattedMessage id={ele.langKey}>
                    {(txt) => (
                      <>
                        <LazyLoad height={200}>
                          <img
                            src={optimizeImage({
                              originImageUrl: ele.img,
                              width: 40
                            })}
                            srcSet={ele.ele}
                            className="mx-auto"
                            alt={txt}
                            title={txt}
                          />
                        </LazyLoad>
                        <p className="rc-meta text-center markup-text">{txt}</p>
                      </>
                    )}
                  </FormattedMessage>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

@seoHoc('Home Page')
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true,
      searchEvent: {}
    };
  }

  componentDidMount() {
    const { loginStore } = this.props;
    sessionItemRoyal.remove('refresh-confirm-page');
    if (funcUrl({ name: 'couponCode' })) {
      localItemRoyal.set('rc-couponCode', funcUrl({ name: 'couponCode' }));
    }
    // Cross-store login
    if (localItemRoyal.get('login-again')) {
      loginStore.changeLoginModal(true);
      const callOktaCallBack = getOktaCallBackUrl(
        localItemRoyal.get('okta-session-token')
      );
      localItemRoyal.remove('login-again');
      //debugger;
      window.location.href = callOktaCallBack;
    }

    if (localItemRoyal.get('logout-redirect-url')) {
      let url = localItemRoyal.get('logout-redirect-url');
      localItemRoyal.remove('logout-redirect-url');
      location.href = url;
    }
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

    //添加seo 收录标签链接
    const renderLang = (position) => {
      return renderLinkLang[position].map((item) => {
        if (item.country !== window.__.env.REACT_APP_COUNTRY) {
          return (
            <link
              key={item.country}
              rel="alternate"
              hreflang={item.lang}
              href={item.href}
            />
          );
        }
      });
    };

    if (localItemRoyal.get('login-again')) {
      return null;
    }

    return (
      <div>
        <Helmet>
          <link rel="canonical" href={pageLink} />
          {renderLang('home')}
        </Helmet>
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
          <div className="rc-full-width">
            <div className="experience-component experience-layouts-herocarousel">
              <HeroCarousel history={history} />
            </div>
          </div>
          {window.__.env.REACT_APP_HUB ? (
            <HubSalesCategory rule={salesCategoryFilterRule} />
          ) : (
            <SalesCategory />
          )}
          <TopAds />
          <Divider />
          {window.__.env.REACT_APP_COUNTRY === 'jp' ? (
            <JpAdvantage />
          ) : (
            <React.Fragment>
              <section>
                <div
                  className="rc-bg-colour--brand3"
                  style={{ padding: '1px 0' }}
                >
                  <div className="rc-full-width">
                    <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                      <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                        <FormattedMessage id="home.convenientTitle" />
                      </h4>
                      <div className="value-proposition__container">
                        <div className="row mx-0">
                          <Advantage />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Ads />

              <HealthNutrition />
              <Share />
              <Divider />
              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <AdvantageTips />
                </div>
              </div>
              <div className="experience-component experience-layouts-1column">
                <div className="row rc-margin-x--none">
                  <div className="rc-full-width">
                    <div className="experience-component experience-assets-threeColumnContentBlock">
                      <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-top--sm rc-margin-top--lg--mobile three-column-content-block">
                        <FooterImage />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
          <Footer />
        </main>
      </div>
    );
  }
}

// export default withOktaAuth(redirectHoc(Home));
export default inject('loginStore')(observer(withOktaAuth(redirectHoc(Home))));
