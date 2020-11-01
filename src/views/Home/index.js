import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { formatMoney } from '@/utils/utils';
import { STORE_CATOGERY_ENUM } from '@/utils/constant';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import HeroCarousel from '@/components/HeroCarousel2';
import FooterImage from './modules/FooterImage';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;

const CUR_STORE_CATOGERY =
  STORE_CATOGERY_ENUM[process.env.REACT_APP_LANG] || [];
const curNum = CUR_STORE_CATOGERY.length;

function Divider() {
  return (
    <div className="experience-component experience-assets-divider">
      <div
        className="rc-border-bottom rc-border-colour--brand4"
        style={{ borderBottomWidth: '4px' }}
      >
        {' '}
      </div>
    </div>
  );
}

function Ads() {
  return (
    {
      en: (
        <>
          <Divider />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-banner">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-margin-y--sm rc-margin-y--lg--mobile portfolio-content">
                    <Link to="/Tailorednutrition">
                      <picture data-rc-feature-objectfillpolyfill-setup="true">
                        <source
                          media="(max-width: 640px)"
                          data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=400, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=600 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=800 2x"
                          srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=400, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=600 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=800 2x"
                        />
                        <source
                          media="(min-width: 640px) and (max-width: 769px)"
                          data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=750, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=1125 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=1500 2x"
                          srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=750, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=1125 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwf2969cfc/Homepage/banner_mob_USA@2x.png?sw=1500 2x"
                        />
                        <source
                          media="(min-width: 769px)"
                          data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=1336, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2004 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2380 2x"
                          srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=1336, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2004 1.5x, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2380 2x"
                        />
                        <img
                          className="w-100 lazyloaded"
                          data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2004"
                          alt="Royal Canin Extensive Product Range"
                          title="Royal Canin Extensive Product Range"
                          src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw7176d0bf/Homepage/Banner_USA@2x.png?sw=2004"
                        />
                      </picture>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }[process.env.REACT_APP_LANG] || null
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
                  <div
                    data-js-carousel=""
                    className="rc-carousel js-mini-carousel"
                  >
                    <div className="rc-hero rc-hero__layout--3">
                      <div className="rc-hero__fg mini-carousel-slide rc-padding--xs">
                        <div className="rc-hero__section rc-hero__section--text rc-padding-bottom--xs">
                          <Link to="/list/dogs" title="SHOP DOG">
                            <div className="rc-margin-bottom--xs mini-carousel__title inherit-fontsize children-nomargin">
                              <p>Canine Breed-Specific Nutrition</p>
                            </div>
                            <p className="rc-body">
                              Find your dog's unique formula
                            </p>
                          </Link>
                          <Link
                            to="/list/dogs"
                            className="rc-btn rc-btn--one rc-margin-y--xs gtm-mini-carousel-btn"
                            data-gtm='{"title":"Royal Canin specific dog food for every breed","img":"[object Object]"}'
                            title="SHOP DOG"
                          >
                            SHOP DOG
                          </Link>
                        </div>
                        <Link to="/list/dogs" title="SHOP DOG">
                          <div className="rc-hero__section rc-hero__section--img">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <source
                                media="(max-width: 640px)"
                                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=364&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=728&amp;sfrm=png 2x"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=364&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=728&amp;sfrm=png 2x"
                              />
                              <source
                                media="(min-width: 640px) and (max-width: 1439px)"
                                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=718&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=1436&amp;sfrm=png 2x"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=718&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=1436&amp;sfrm=png 2x"
                              />
                              <source
                                media="(min-width: 1439px)"
                                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=407&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=814&amp;sfrm=png 2x"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=407&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=814&amp;sfrm=png 2x"
                              />
                              <img
                                className="w-100 ls-is-cached lazyloaded"
                                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=407&amp;sfrm=png"
                                alt="Royal Canin specific dog food for every breed"
                                title="Royal Canin specific dog food for every breed"
                                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwdfd395e0/Homepage/minibanner1.jpg?sw=407&amp;sfrm=png"
                              />
                            </picture>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="rc-hero rc-hero__layout--3">
                      <div className="rc-hero__fg mini-carousel-slide rc-padding--xs">
                        <div className="rc-hero__section rc-hero__section--text rc-padding-bottom--xs">
                          <Link to="/list/cats" title="SHOP CAT">
                            <div className="rc-margin-bottom--xs mini-carousel__title inherit-fontsize children-nomargin">
                              <p>Feline Breed-Specific Nutrition</p>
                            </div>
                            <p className="rc-body">
                              Find your cat's unique formula
                            </p>
                          </Link>
                          <Link
                            to="/list/cats"
                            className="rc-btn rc-btn--one rc-margin-y--xs gtm-mini-carousel-btn"
                            data-gtm='{"title":"Royal Canin specific cat food for every breed","img":"[object Object]"}'
                            title="SHOP CAT"
                          >
                            SHOP CAT
                          </Link>
                        </div>
                        <Link to="/list/cats" title="SHOP CAT">
                          <div className="rc-hero__section rc-hero__section--img">
                            <picture data-rc-feature-objectfillpolyfill-setup="true">
                              <source
                                media="(max-width: 640px)"
                                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=364&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=728&amp;sfrm=png 2x"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=364&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=728&amp;sfrm=png 2x"
                              />
                              <source
                                media="(min-width: 640px) and (max-width: 1439px)"
                                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=718&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=1436&amp;sfrm=png 2x"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=718&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=1436&amp;sfrm=png 2x"
                              />
                              <source
                                media="(min-width: 1439px)"
                                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=407&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=814&amp;sfrm=png 2x"
                                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=407&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=814&amp;sfrm=png 2x"
                              />
                              <img
                                className="w-100 ls-is-cached lazyloaded"
                                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=407&amp;sfrm=png"
                                alt="Royal Canin specific cat food for every breed"
                                title="Royal Canin specific cat food for every breed"
                                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwd217c472/Homepage/minibanner2.jpg?sw=407&amp;sfrm=png"
                              />
                            </picture>
                          </div>
                        </Link>
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
                            srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=350&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=700&amp;sfrm=png 2x"
                          />
                          <source
                            media="(min-width: 640px) and (max-width: 769px)"
                            data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=706&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=1412&amp;sfrm=png 2x"
                            srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=706&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=1412&amp;sfrm=png 2x"
                          />
                          <source
                            media="(min-width: 769px)"
                            data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=622&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=1244&amp;sfrm=png 2x"
                            srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=622&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=1244&amp;sfrm=png 2x"
                          />
                          <img
                            className="w-100 ls-is-cached lazyloaded"
                            data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=622&amp;sfrm=png"
                            alt="Royal Canin Health Through Nutrition"
                            title="Royal Canin Health Through Nutrition"
                            src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw4d48b068/Homepage/RC-draw.jpg?sw=622&amp;sfrm=png"
                          />
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

function Advantage() {
  const defaultJSX = (
    <>
      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
          <img
            className="value-proposition__img"
            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3206e904/homepage/pack@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
            alt=""
            title=""
          />
          <div className="pl-3 d-flex align-items-center value-proposition__text">
            <p className="rc-margin-bottom--none rc-intro">
              <FormattedMessage id="home.convenientTip1" />
            </p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
          <img
            className="value-proposition__img"
            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw0093423f/homepage/delivery@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
            alt=""
            title=""
          />
          <div className="pl-3 d-flex align-items-center value-proposition__text">
            <p className="rc-margin-bottom--none rc-intro">
              <FormattedMessage
                id="home.convenientTip2"
                values={{
                  val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT)
                }}
              />
            </p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
          <img
            className="value-proposition__img"
            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw91a30682/homepage/question@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
            alt=""
            title=""
          />
          <div className="pl-3 d-flex align-items-center value-proposition__text">
            <p className="rc-margin-bottom--none rc-intro">
              <FormattedMessage id="home.convenientTip3" />
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    {
      en: (
        <>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <img
                className="value-proposition__img lazyloaded"
                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                alt="ideal formula"
                title="ideal formula"
                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0a2524e3/Homepage/CLUB-BENEFITS_PRODUCT-RECOS@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
              />
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Find the Ideal Formula for Your Pet’s Health
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <img
                className="value-proposition__img lazyloaded"
                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                alt="club benefits"
                title="club benefits"
                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwc5a22147/Homepage/CLUB-BENEFITS_DISCOUNT@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
              />
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Save 5% on Every Autoship Order Plus, 30% Off Your First Order
                  Through Royal Canin Club
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <img
                className="value-proposition__img lazyloaded"
                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                alt="Welcome Box"
                title="Welcome Box"
                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0e710f21/Homepage/CLUB-BENEFITS_WELCOME-BOX@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
              />
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Receive a Specialty Welcome Box to Help Welcome Your New Pet
                  Home{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
            <div className="d-flex justify-content-start justify-content-xxl-center align-items-center w-100 value-proposition__content">
              <img
                className="value-proposition__img lazyloaded"
                data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                alt="Free Automatic Shipping"
                title="Free Automatic Shipping"
                srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=180&amp;sh=180&amp;sm=cut&amp;sfrm=png 2x"
                src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw647a8fe4/Homepage/CLUB-BENEFITS_FREE-SHIPPING@x2.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
              />
              <div className="pl-3 d-flex align-items-center value-proposition__text">
                <p className="rc-margin-bottom--none rc-intro">
                  Free Automatic Shipping
                </p>
              </div>
            </div>
          </div>
        </>
      )
    }[process.env.REACT_APP_LANG] || defaultJSX
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
                            <img
                              className="w-100 lazyloaded"
                              data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwcb8977c3/Homepage/SOCIAL1.jpg?sw=293&amp;sfrm=png"
                              data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwcb8977c3/Homepage/SOCIAL1.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwcb8977c3/Homepage/SOCIAL1.jpg?sw=586&amp;sfrm=png 2x"
                              alt="Royal Canin Dog Products on Social Media"
                              title="Royal Canin Dog Products on Social Media"
                              srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwcb8977c3/Homepage/SOCIAL1.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwcb8977c3/Homepage/SOCIAL1.jpg?sw=586&amp;sfrm=png 2x"
                              src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwcb8977c3/Homepage/SOCIAL1.jpg?sw=293&amp;sfrm=png"
                            />
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
                            <img
                              className="w-100 lazyloaded"
                              data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0f1c04d3/Homepage/SOCIAL2.jpg?sw=293&amp;sfrm=png"
                              data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0f1c04d3/Homepage/SOCIAL2.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0f1c04d3/Homepage/SOCIAL2.jpg?sw=586&amp;sfrm=png 2x"
                              alt="Royal Canin Cat Products on Social Media"
                              title="Royal Canin Cat Products on Social Media"
                              srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0f1c04d3/Homepage/SOCIAL2.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0f1c04d3/Homepage/SOCIAL2.jpg?sw=586&amp;sfrm=png 2x"
                              src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw0f1c04d3/Homepage/SOCIAL2.jpg?sw=293&amp;sfrm=png"
                            />
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
                            <img
                              className="w-100 lazyloaded"
                              data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw601328ff/Homepage/SOCIAL3.jpg?sw=293&amp;sfrm=png"
                              data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw601328ff/Homepage/SOCIAL3.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw601328ff/Homepage/SOCIAL3.jpg?sw=586&amp;sfrm=png 2x"
                              alt="Royal Canin Dog Products on Social Media"
                              title="Royal Canin Dog Products on Social Media"
                              srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw601328ff/Homepage/SOCIAL3.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw601328ff/Homepage/SOCIAL3.jpg?sw=586&amp;sfrm=png 2x"
                              src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dw601328ff/Homepage/SOCIAL3.jpg?sw=293&amp;sfrm=png"
                            />
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
                            <img
                              className="w-100 ls-is-cached lazyloaded"
                              data-src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwa1e1259c/Homepage/SOCIAL4.jpg?sw=293&amp;sfrm=png"
                              data-srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwa1e1259c/Homepage/SOCIAL4.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwa1e1259c/Homepage/SOCIAL4.jpg?sw=586&amp;sfrm=png 2x"
                              alt="Royal Canin Cat Products on Social Media"
                              title="Royal Canin Cat Products on Social Media"
                              srcset="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwa1e1259c/Homepage/SOCIAL4.jpg?sw=293&amp;sfrm=png, https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwa1e1259c/Homepage/SOCIAL4.jpg?sw=586&amp;sfrm=png 2x"
                              src="https://shop.royalcanin.com/dw/image/v2/BDJP_PRD/on/demandware.static/-/Sites-US-Library/en_US/dwa1e1259c/Homepage/SOCIAL4.jpg?sw=293&amp;sfrm=png"
                            />
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
class Home extends React.Component {
  async componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  render() {
    const event = {
      page: {
        type: 'Homepage',
        theme: ''
      }
    };

    const _catogeryJXS = CUR_STORE_CATOGERY.map((ele, i) => (
      <div
        className={`${curNum === 6 ? 'col-md-4' : 'col-md-3'} col-6`}
        key={i}
      >
        <FormattedMessage id={ele.textLangKey}>
          {(txt) => (
            <Link
              className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
              to={ele.url}
              title={txt}
            >
              <picture className="category-cards__card__img">
                <source srcSet={ele.homeImg} />
                <img
                  src={ele.homeImg}
                  alt={txt}
                  title={txt}
                  style={{ width: '144px' }}
                />
              </picture>
              <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                <h3 className="rc-margin--none">{txt}</h3>
              </div>
            </Link>
          )}
        </FormattedMessage>
      </div>
    ));

    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          match={this.props.match}
          location={this.props.location}
          history={this.props.history}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper ">
          <BannerTip />
          <div className="rc-full-width">
            <div className="experience-component experience-layouts-herocarousel">
              <HeroCarousel history={this.props.history} />
            </div>
          </div>

          <section>
            <div className="rc-bg-colour--brand3 rc-margin-bottom--xs">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile category-cards rc-padding--sm">
                <div
                  className={`${
                    curNum === 6 ? '' : 'row'
                  } rc-match-heights text-center text-md-left`}
                >
                  <div
                    className={`${
                      curNum === 6 ? 'DeCenter' : ''
                    } col-lg-3 align-self-center`}
                  >
                    <h2 className="rc-beta rc-margin--none rc-padding--xs rc-padding--lg--mobile text-center rc-padding-top--none">
                      <FormattedMessage id="home.productsCategory" />
                    </h2>
                  </div>
                  <div className={`${curNum === 6 ? 'DeCenter' : ''} col-lg-9`}>
                    <div className="row custom-gutter">{_catogeryJXS}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {<Ads />}

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
          <HealthNutrition />
          <Share />

          <Divider />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-centeredIconList">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile centered-icon-list">
                    <div
                      className="row col-10 col-md-5 bottom-content__icon-list mx-auto text-center"
                      style={{ justifyContent: 'center' }}
                    >
                      <div className="col-6 col-md-3 centered-icon-list__icon">
                        <img
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                          srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                          className="mx-auto"
                          alt="Secure payments"
                          title="Secure payments"
                        />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point1" />
                        </p>
                      </div>
                      {process.env.REACT_APP_LANG === 'de' ? null : (
                        <div className="col-6 col-md-3 centered-icon-list__icon">
                          <img
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                            srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                            className="mx-auto"
                            alt="Quality assurance"
                            title="Quality assurance"
                          />
                          <p className="rc-meta text-center markup-text">
                            <FormattedMessage id="home.point2" />
                          </p>
                        </div>
                      )}
                      <div className="col-6 col-md-3 centered-icon-list__icon">
                        <img
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                          srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                          className="mx-auto"
                          alt="Premium service"
                          title="Premium service"
                        />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point3" />
                        </p>
                      </div>
                      <div className="col-6 col-md-3 centered-icon-list__icon">
                        <img
                          src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                          srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                          className="mx-auto"
                          alt="Fast shipping"
                          title="Fast shipping"
                        />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point4" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default Home;
