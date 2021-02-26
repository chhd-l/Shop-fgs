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
import HubSalesCategory from './modules/HubSalesCategory';
import { Ads } from './ad';
import { TopAds } from './ad';
import { Advantage } from './advantage';
import { setSeoConfig, getDeviceType } from '@/utils/utils';
import './index.css';
import Loading from '@/components/Loading';
import { withOktaAuth } from '@okta/okta-react';
import { Helmet } from 'react-helmet';

import PaymentSecureHome from '@/assets/images/home/Payment-secure@2x.png';
import premiumHome from '@/assets/images/home/premium@2x.png';
import reimbursedHome from '@/assets/images/home/reimbursed@2x.png';
import shippmentHome from '@/assets/images/home/shippment@2x.png';
import question from '@/assets/images/home/question@2x.png';

const localItemRoyal = window.__.localItemRoyal;
const sessionItemRoyal = window.__.sessionItemRoyal;
const pageLink = window.location.href;
const deviceType = getDeviceType();

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

function HealthNutrition() {
  return (
    {
      en: (
        <div className="experience-component experience-layouts-1to2columnRatio">
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
            <div className="row d-flex align-items-center">
              <div className="col-12 col-lg-4">
                <div className="experience-component experience-layouts-minicarousel">
                  <div className="rc-margin-bottom--sm--mobile mini-carousel">
                    <div
                      data-js-carousel=""
                      className="rc-carousel js-mini-carousel"
                    >
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
                              <picture data-rc-feature-objectfillpolyfill-setup="true">
                                <source
                                  media="(max-width: 640px)"
                                  data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=364&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=728&amp;sfrm=png 2x"
                                  srcSet="Shttps://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=364&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=728&amp;sfrm=png 2x"
                                />
                                <source
                                  media="(min-width: 640px) and (max-width: 1439px)"
                                  data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=718&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=1436&amp;sfrm=png 2x"
                                  srcSet="Shttps://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=718&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=1436&amp;sfrm=png 2x"
                                />
                                <source
                                  media="(min-width: 1439px)"
                                  data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=407&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=814&amp;sfrm=png 2x"
                                  srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=407&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=814&amp;sfrm=png 2x"
                                />
                                <LazyLoad height={200}>
                                  <img
                                    className="w-100 ls-is-cached lazyloaded"
                                    data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=407&amp;sfrm=png"
                                    alt="Royal Canin specific dog food for every breed"
                                    title="Royal Canin specific dog food for every breed"
                                    src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=407&amp;sfrm=png"
                                  />
                                </LazyLoad>
                              </picture>
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
                              <picture data-rc-feature-objectfillpolyfill-setup="true">
                                <source
                                  media="(max-width: 640px)"
                                  data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=364&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=728&amp;sfrm=png 2x"
                                  srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=364&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=728&amp;sfrm=png 2x"
                                />
                                <source
                                  media="(min-width: 640px) and (max-width: 1439px)"
                                  data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=718&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=1436&amp;sfrm=png 2x"
                                  srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=718&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=1436&amp;sfrm=png 2x"
                                />
                                <source
                                  media="(min-width: 1439px)"
                                  data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=407&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=814&amp;sfrm=png 2x"
                                  srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=407&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=814&amp;sfrm=png 2x"
                                />
                                <LazyLoad height={200}>
                                  <img
                                    className="w-100 ls-is-cached lazyloaded"
                                    data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=407&amp;sfrm=png"
                                    alt="Royal Canin specific cat food for every breed"
                                    title="Royal Canin specific cat food for every breed"
                                    src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=407&amp;sfrm=png"
                                  />
                                </LazyLoad>
                              </picture>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
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
                        <picture data-rc-feature-objectfillpolyfill-setup="true">
                          <source
                            media="(max-width: 640px)"
                            data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=350&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=700&amp;sfrm=png 2x"
                            srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=350&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=700&amp;sfrm=png 2x"
                          />
                          <source
                            media="(min-width: 640px) and (max-width: 769px)"
                            data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=706&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=1412&amp;sfrm=png 2x"
                            srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=706&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=1412&amp;sfrm=png 2x"
                          />
                          <source
                            media="(min-width: 769px)"
                            data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=622&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=1244&amp;sfrm=png 2x"
                            srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=622&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=1244&amp;sfrm=png 2x"
                          />
                          <LazyLoad height={200}>
                            <img
                              className="w-100 ls-is-cached lazyloaded"
                              data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=622&amp;sfrm=png"
                              alt="Royal Canin Health Through Nutrition"
                              title="Royal Canin Health Through Nutrition"
                              src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=622&amp;sfrm=png"
                            />
                          </LazyLoad>
                        </picture>
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
                            Learn more
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
    }[process.env.REACT_APP_LANG] || null
  );
}

function Share() {
  return (
    {
      en: (
        <div className="experience-component experience-layouts-1column">
          <div className="row rc-margin-x--none">
            <div className="rc-full-width">
              <div className="experience-component experience-layouts-cardcarousel">
                <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
                  <h3 className="rc-beta">Share With Us #RoyalCanin</h3>
                </div>
                <div
                  data-js-carousel=""
                  data-rc-cards="true"
                  data-rows="4"
                  data-rc-prev="prev"
                  data-rc-next="next"
                  className="rc-carousel rc-carousel--cards rc-match-heights js-card-carousel"
                >
                  <div className="rc-carousel__card-gal">
                    <div className="rc-padding-x--xs">
                      <a
                        className="rc-full-width"
                        href="https://www.instagram.com/royalcaninus/"
                      >
                        <article className="rc-card rc-card--b rc-border--none">
                          <picture
                            className="rc-card__image"
                            data-rc-feature-objectfillpolyfill-setup="true"
                          >
                            <LazyLoad height={200}>
                              <img
                                className="w-100 lazyloaded"
                                alt="Royal Canin Dog Products on Social Media"
                                title="Royal Canin Dog Products on Social Media"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwcb8977c3/Homepage/SOCIAL1.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwcb8977c3/Homepage/SOCIAL1.jpg?sw=586&amp;sfrm=png 2x"
                                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwcb8977c3/Homepage/SOCIAL1.jpg?sw=293&amp;sfrm=png"
                              />
                            </LazyLoad>
                          </picture>
                        </article>
                      </a>
                    </div>
                    <div className="rc-padding-x--xs">
                      <a
                        className="rc-full-width"
                        href="https://www.instagram.com/royalcaninus/"
                      >
                        <article className="rc-card rc-card--b rc-border--none">
                          <picture
                            className="rc-card__image"
                            data-rc-feature-objectfillpolyfill-setup="true"
                          >
                            <LazyLoad height={200}>
                              <img
                                className="w-100 lazyloaded"
                                alt="Royal Canin Cat Products on Social Media"
                                title="Royal Canin Cat Products on Social Media"
                                srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0f1c04d3/Homepage/SOCIAL2.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0f1c04d3/Homepage/SOCIAL2.jpg?sw=586&amp;sfrm=png 2x"
                                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0f1c04d3/Homepage/SOCIAL2.jpg?sw=293&amp;sfrm=png"
                              />
                            </LazyLoad>
                          </picture>
                        </article>
                      </a>
                    </div>
                    <div className="rc-padding-x--xs">
                      <a
                        className="rc-full-width"
                        href="https://www.instagram.com/royalcaninus/"
                      >
                        <article className="rc-card rc-card--b rc-border--none">
                          <picture
                            className="rc-card__image"
                            data-rc-feature-objectfillpolyfill-setup="true"
                          >
                            <LazyLoad height={200}>
                              <img
                                className="w-100 lazyloaded"
                                alt="Royal Canin Dog Products on Social Media"
                                title="Royal Canin Dog Products on Social Media"
                                srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw601328ff/Homepage/SOCIAL3.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw601328ff/Homepage/SOCIAL3.jpg?sw=586&amp;sfrm=png 2x"
                                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw601328ff/Homepage/SOCIAL3.jpg?sw=293&amp;sfrm=png"
                              />
                            </LazyLoad>
                          </picture>
                        </article>
                      </a>
                    </div>
                    <div className="rc-padding-x--xs">
                      <a
                        className="rc-full-width"
                        href="https://www.instagram.com/royalcaninus/"
                      >
                        <article className="rc-card rc-card--b rc-border--none">
                          <picture
                            className="rc-card__image"
                            data-rc-feature-objectfillpolyfill-setup="true"
                          >
                            <LazyLoad height={200}>
                              <img
                                className="w-100 ls-is-cached lazyloaded"
                                alt="Royal Canin Cat Products on Social Media"
                                title="Royal Canin Cat Products on Social Media"
                                srcSet="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwa1e1259c/Homepage/SOCIAL4.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwa1e1259c/Homepage/SOCIAL4.jpg?sw=586&amp;sfrm=png 2x"
                                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwa1e1259c/Homepage/SOCIAL4.jpg?sw=293&amp;sfrm=png"
                              />
                            </LazyLoad>
                          </picture>
                        </article>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }[process.env.REACT_APP_LANG] || null
  );
}

function AdvantageTips() {
  const defaultIconList = [
    { img: PaymentSecureHome, langKey: 'home.point1' },
    { img: reimbursedHome, langKey: 'home.point2' },
    { img: premiumHome, langKey: 'home.point3' },
    { img: shippmentHome, langKey: 'home.point4' }
  ];
  const iconList =
    {
      en: [
        { img: PaymentSecureHome, langKey: 'home.point1' },
        {
          img: `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/CLUB-BENEFITS_FREE-SHIPPING.webp`,
          langKey: 'home.point2'
        },
        { img: premiumHome, langKey: 'home.point3' },
        {
          img: `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/question@2x_home_us.webp`,
          langKey: 'home.point4'
        }
      ]
    }[process.env.REACT_APP_LANG] || defaultIconList;
  return (
    <div className="rc-full-width">
      <div className="experience-component experience-assets-centeredIconList">
        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile centered-icon-list">
          <div className="rc-sm-down">
            <div className="row rc-padding-x--xl--mobile col-10 bottom-content__icon-list mx-auto text-center">
              {iconList.map((ele, i) => (
                <div className="col-6 centered-icon-list__icon" key={i}>
                  <FormattedMessage id={ele.langKey}>
                    {(txt) => (
                      <>
                        <LazyLoad height={200}>
                          <img
                            src={ele.img}
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
                <div className="centered-icon-list__icon" key={i}>
                  <FormattedMessage id={ele.langKey}>
                    {(txt) => (
                      <>
                        <LazyLoad height={200}>
                          <img
                            src={ele.img}
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true,
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      searchEvent: {}
    };
  }
  async componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    setSeoConfig({ pageName: 'Home Page' }).then((res) => {
      this.setState({ seoConfig: res });
    });
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
      sessionItemRoyal.set('okta-redirectUrl', '/account/orders');
    }
    if (parametersString.indexOf('redirect=subscription') >= 0) {
      sessionItemRoyal.set('okta-redirectUrl', '/account/subscription');
    }
    if (parametersString.indexOf('redirect=baseinfo') >= 0) {
      sessionItemRoyal.set('okta-redirectUrl', '/account/information');
    }
    if (parametersString.indexOf('toOkta=true') >= 0) {
      this.props.oktaAuth.signInWithRedirect(process.env.REACT_APP_HOMEPAGE);
      return <Loading bgColor={'#fff'} />;
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
          <div className="rc-full-width">
            <div className="experience-component experience-layouts-herocarousel">
              <HeroCarousel history={history} />
            </div>
          </div>
          {process.env.REACT_APP_HUB == 1 ? (
            <HubSalesCategory />
          ) : (
            <SalesCategory />
          )}
          <TopAds />
          <Divider />
          <section>
            <div className="rc-bg-colour--brand3" style={{ padding: '1px 0' }}>
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
        </main>
        <Footer />
      </div>
    );
  }
}

export default withOktaAuth(Home);
