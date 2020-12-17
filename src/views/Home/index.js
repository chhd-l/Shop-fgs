import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel3';
import HeroCarouselMobile from '@/components/HeroCarouselMobile2';
import FooterImage from './modules/FooterImage';
import { Ads } from './ad';
import { Advantage } from './advantage';
import { setSeoConfig, getDeviceType, queryStoreCateList } from '@/utils/utils';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;

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

// 上线后修改id todo
const DEFUALT_FILTER_MAP_FR = {
  '/dogs/?prefn1=ages&prefv1=Adulte|Sénior': [
    {
      attributeId: 'A20201209071242331',
      attributeName: 'ÂGE',
      filterType: '0',
      attributeValues: ['Adult_Dog', 'Mature_Dog'],
      attributeValueIdList: ['AV202012160309152796', 'AV202012160309161216']
    }
  ],
  '/cats/?prefn1=ages&prefv1=Adulte (1-7 ans)|Mature (7-12 ans)|Senior (+ 12 ans)': [
    {
      attributeId: 'A20201209071242331',
      attributeName: 'ÂGE',
      filterType: '0',
      attributeValues: ['Adult_Cat', 'Mature_Cat', 'Senior_Cat'],
      attributeValueIdList: [
        'AV202012160309229266',
        'AV202012160309234996',
        'AV202012160309253586'
      ]
    }
  ],
  '/dogs/?prefn1=ages&prefv1=Chiot de 0 à 2 mois|Chiot de plus de 2 mois': [
    {
      attributeId: 'A20201209071242331',
      attributeName: 'ÂGE',
      filterType: '0',
      attributeValues: ['Puppy_Dog', 'Baby_Dog'],
      attributeValueIdList: ['AV202012160309175316', 'AV202012160310184696']
    }
  ],
  '/cats/?prefn1=ages&prefv1=Chaton (0-4 mois)|Chaton (5 mois-1 an)': [
    {
      attributeId: 'A20201209071242331',
      attributeName: 'ÂGE',
      filterType: '0',
      attributeValues: ['Kitten_Cat', 'Baby_Cat'],
      attributeValueIdList: ['AV202012160309246796', 'AV202012160309463736']
    }
  ]
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true,
      deviceType: ''
    };
  }
  async componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    this.setState({ deviceType: getDeviceType() });
    setSeoConfig({ pageName: 'Home Page' });
    queryStoreCateList().then((res) => {
      let tmpRes = (res || [])
        .sort((a, b) => a.sort - b.sort)
        .map((ele) => {
          try {
            let tmpList = JSON.parse(ele.cateImg);
            ele.cateImgHome = tmpList[0].artworkUrl;
            ele.cateImgList = tmpList.length > 1 && tmpList[1].artworkUrl;
            ele.filters = DEFUALT_FILTER_MAP_FR[ele.cateRouter] || [];
          } catch (e) {}
          return ele;
        });
      this.setState({ categoryList: tmpRes, categoryLoading: false });
    });
  }
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  render() {
    const { history, match, location } = this.props;
    const { categoryList, deviceType } = this.state;
    const curListNum = categoryList.length;

    const event = {
      page: {
        error: '',
        hitTimestamp: new Date(),
        path: match.path,
        type: 'Homepage',
        filters: '',
        theme: ''
      }
    };

    const _catogeryJXS2 = categoryList.map((ele, i) => (
      <div
        className={`col-6 ${
          curListNum >= 6
            ? curListNum === 15
              ? 'col-md-3'
              : 'col-md-3'
            : 'col-md-3'
        }`}
        key={i}
      >
        <Link
          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
          to={{
            pathname: `${
              ele.cateRouter && ele.cateRouter.startsWith('/')
                ? ele.cateRouter
                : `/${ele.cateRouter}`
            }`,
            state: {
              cateIds: [ele.storeCateId],
              cateName: ele.cateName,
              cateTitle: ele.cateTitle || ele.cateName,
              cateDescription: ele.cateDescription,
              cateImgList: ele.cateImgList,
              filters: ele.filters
            }
          }}
          title={ele.cateName}
        >
          <picture className="category-cards__card__img">
            <source srcSet={ele.cateImgHome} />
            <LazyLoad height={200}>
              <img
                src={ele.cateImgHome}
                alt={ele.cateName}
                title={ele.cateName}
                style={{ width: '144px' }}
              />
            </LazyLoad>
          </picture>
          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
            <h3 className="rc-margin--none">{ele.cateName}</h3>
          </div>
        </Link>
      </div>
    ));

    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          match={match}
          location={location}
          history={history}
        />
        <main className={'rc-content--fixed-header'}>
          <BannerTip />
          <div className="rc-full-width">
            <div className="experience-component experience-layouts-herocarousel">
              {deviceType === 'PC' ? (
                <HeroCarousel history={history} />
              ) : (
                <HeroCarouselMobile history={history} />
              )}
            </div>
          </div>
          <section>
            <div className="rc-bg-colour--brand3 rc-margin-bottom--xs">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile category-cards rc-padding--sm">
                <div
                  className={`${
                    curListNum >= 6 ? '' : 'row'
                  } rc-match-heights text-center text-md-left`}
                >
                  <div
                    className={`${
                      curListNum >= 6 ? 'DeCenter' : ''
                    } col-lg-3 align-self-center`}
                  >
                    <h2 className="rc-beta rc-margin--none rc-padding--xs rc-padding--lg--mobile text-left rc-padding-top--none">
                      <FormattedMessage id="home.productsCategory" />
                    </h2>
                  </div>
                  <div
                    className={`${curListNum >= 6 ? 'DeCenter' : ''} col-lg-9`}
                  >
                    <div className="row custom-gutter">
                      <span className="hidden rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link" />
                      {_catogeryJXS2}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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

          {<Ads />}
          <Divider />

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
                        <LazyLoad height={200}>
                          <img
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                            srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                            className="mx-auto"
                            alt="Secure payments"
                            title="Secure payments"
                          />
                        </LazyLoad>
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point1" />
                        </p>
                      </div>
                      {process.env.REACT_APP_LANG === 'de' ? null : (
                        <div className="col-6 col-md-3 centered-icon-list__icon">
                          <LazyLoad height={200}>
                            <img
                              src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                              srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                              className="mx-auto"
                              alt="Quality assurance"
                              title="Quality assurance"
                            />
                          </LazyLoad>
                          <p className="rc-meta text-center markup-text">
                            <FormattedMessage id="home.point2" />
                          </p>
                        </div>
                      )}
                      <div className="col-6 col-md-3 centered-icon-list__icon">
                        <LazyLoad height={200}>
                          <img
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                            srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                            className="mx-auto"
                            alt="Premium service"
                            title="Premium service"
                          />
                        </LazyLoad>
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point3" />
                        </p>
                      </div>
                      <div className="col-6 col-md-3 centered-icon-list__icon">
                        <LazyLoad height={200}>
                          <img
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png"
                            srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x"
                            className="mx-auto"
                            alt="Fast shipping"
                            title="Fast shipping"
                          />
                        </LazyLoad>
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
