import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroCarousel from '@/components/HeroCarousel'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    }
  }
  render () {
    return (
      <div>
        <Header cartData={this.state.cartData} showMiniIcons={true} />
        <main className="rc-content--fixed-header rc-main-content__wrapper ">
          <div className="rc-full-width">
            <div className="experience-component experience-layouts-herocarousel">
              <HeroCarousel />
            </div>
          </div>

          <section>
            <div className="rc-bg-colour--brand3 rc-margin-bottom--xs">
              <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile category-cards rc-padding--sm">
                <div className="row rc-match-heights text-center text-md-left">
                  <div className="col-lg-3 align-self-center">
                    <h2 className="rc-beta rc-margin--none rc-padding--xs rc-padding--lg--mobile text-center text-lg-left rc-padding-top--none">
                      <FormattedMessage id="home.productsCategory" />
                    </h2>
                  </div>
                  <div className="col-lg-9">
                    <div className="row custom-gutter">
                      <div className="col-md-3 col-6">
                        <FormattedMessage id='dogs2'>
                          {(txt) => (
                            <Link className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                              to="/list/dogs" title={txt}>
                              <picture className="category-cards__card__img">
                                <source
                                  srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw96967667/Dog_categorie-RU@2x.jpg?sw=144&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw96967667/Dog_categorie-RU@2x.jpg?sw=288&amp;sfrm=png 2x" />
                                <img
                                  src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw96967667/Dog_categorie-RU@2x.jpg?sw=144&amp;sfrm=png"
                                  alt={txt}
                                  title={txt} />
                              </picture>
                              <div
                                className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                <h3 className="rc-margin--none">
                                  {txt}
                                </h3>
                              </div>
                            </Link>)}
                        </FormattedMessage>
                      </div>
                      <div className="col-md-3 col-6">
                        <FormattedMessage id='cats2'>
                          {(txt) => (
                            <Link className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                              to="/list/cats" title={txt}>
                              <picture className="category-cards__card__img">
                                <source
                                  srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw9266069c/homepage/Cat_categorie@2x.jpg?sw=144&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw9266069c/homepage/Cat_categorie@2x.jpg?sw=288&amp;sfrm=png 2x" />
                                <img
                                  src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw9266069c/homepage/Cat_categorie@2x.jpg?sw=144&amp;sfrm=png"
                                  alt={txt} title={txt} />
                              </picture>
                              <div
                                className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                <h3 className="rc-margin--none">{txt}</h3>
                              </div>
                            </Link>
                          )}
                        </FormattedMessage>
                      </div>
                      <div className="col-md-3 col-6">
                        <FormattedMessage id='header.VCN'>
                          {txt => (
                            <Link className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                              to="/list/vcn" title={txt}>
                              <picture className="category-cards__card__img">
                                <source
                                  srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw87e948c2/homepage/Puppy_categorie@2x.jpg?sw=144&sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw87e948c2/homepage/Puppy_categorie@2x.jpg?sw=288&sfrm=png 2x" />
                                <img
                                  src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw87e948c2/homepage/Puppy_categorie@2x.jpg?sw=144&sfrm=png"
                                  alt={txt} title={txt} />
                              </picture>
                              <div
                                className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                <h3 className="rc-margin--none">{txt}</h3>
                              </div>
                            </Link>
                          )}
                        </FormattedMessage>
                      </div>
                      <div className="col-md-3 col-6">
                        <FormattedMessage id='header.VD'>
                          {txt => (
                            <Link className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                              to="/list/vd" title={txt}>
                              <picture className="category-cards__card__img">
                                <source
                                  srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwcfc83bc5/homepage/Kitten_categorie@2x.jpg?sw=144&sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwcfc83bc5/homepage/Kitten_categorie@2x.jpg?sw=288&sfrm=png 2x" />
                                <img
                                  src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwcfc83bc5/homepage/Kitten_categorie@2x.jpg?sw=144&sfrm=png"
                                  alt={txt} title={txt} />
                              </picture>
                              <div
                                className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                <h3 className="rc-margin--none">{txt}</h3>
                              </div>
                            </Link>
                          )}
                        </FormattedMessage>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="rc-bg-colour--brand3">
              <div className="rc-full-width">
                <div className="rc-max-width--xl rc-padding-x--sm portfolio-content">
                  <a href="#">
                    <picture>
                      <source media="(max-width: 640px)"
                        srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw765f871e/homepage/banner-mob-CLUB@2x.jpg?sw=400&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw765f871e/homepage/banner-mob-CLUB@2x.jpg?sw=800&amp;sfrm=png 2x" />
                      <source media="(min-width: 640px) and (max-width: 769px)"
                        srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw765f871e/homepage/banner-mob-CLUB@2x.jpg?sw=750&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw765f871e/homepage/banner-mob-CLUB@2x.jpg?sw=1500&amp;sfrm=png 2x" />
                      <source media="(min-width: 769px)"
                        srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw9e25e43b/homepage/Banner-CLUB@2x.jpg?sw=1336&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw9e25e43b/homepage/Banner-CLUB@2x.jpg?sw=2380&amp;sfrm=png 2x" />
                      <img className="w-100"
                        src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw9e25e43b/homepage/Banner-CLUB@2x.jpg?sw=1336&amp;sfrm=png"
                        alt="Широкая линейка продуктов ROYAL CANIN®" title="Широкая линейка продуктов ROYAL CANIN®" />
                    </picture>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- divider --> */}
          <section>
            <div className="rc-border-bottom rc-border-colour--brand4" style={{ borderBottomWidth: '1px' }}> </div>
          </section>

          {/* <!-- ads --> */}
          <section>
            <div className="rc-bg-colour--brand3" style={{ padding: '1px 0' }}>
              <div className="rc-full-width">
                <div
                  className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">Why is it convenient to shop with ROYAL CANIN®?</h4>
                  <div className="value-proposition__container">
                    <div className="row mx-0">
                      <div
                        className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                          <img className="value-proposition__img"
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3206e904/homepage/pack@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            alt="  " title="  " />
                          <div className="pl-3 d-flex align-items-center value-proposition__text">
                            <p className="rc-margin-bottom--none rc-intro">Selection of a diet according to the needs of your pet</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                          <img className="value-proposition__img"
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw0093423f/homepage/delivery@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            alt="  " title="  " />
                          <div className="pl-3 d-flex align-items-center value-proposition__text">
                            <p className="rc-margin-bottom--none rc-intro">Fast free shipping when ordering from 2000 rubles.</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-6 col-xxl-4 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                          <img className="value-proposition__img"
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw91a30682/homepage/question@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            alt="  " title="  " />
                          <div className="pl-3 d-flex align-items-center value-proposition__text">
                            <p className="rc-margin-bottom--none rc-intro">Support service: ask a question about your pet to a specialist</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="rc-bg-colour--brand3" style={{ padding: '1px 0' }}>
              <div className="rc-full-width">
                <div
                  className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                  <div className="row d-flex align-items-center">
                    <div className="col-12 col-lg-4">
                      <div data-js-carousel="" className="rc-carousel rc-carousel--hero">
                        <div data-thumb="interactive--pager" className="rc-hero rc-hero__layout--3">
                          <div className="rc-hero__fg mini-carousel-slide rc-padding--xs">
                            <div className="rc-hero__section rc-hero__section--text rc-padding-bottom--xs">
                              <a href="#"
                                title="View Products">
                                <div className="rc-margin-bottom--xs mini-carousel__title inherit-fontsize children-nomargin">
                                  <p>The splendor of each breed is</p>
                                  <p>in its uniqueness.</p>
                                </div>
                                <p className="rc-body">Find out what makes them unique!</p>
                              </a>
                              <a href="#"
                                className="rc-btn rc-btn--one rc-margin-y--xs gtm-mini-carousel-btn"
                                data-gtm="{&quot;title&quot;:&quot;Специально разработанный продукт Royal Canin®  для собак определенных пород &quot;,&quot;img&quot;:&quot;[object Object]&quot;}"
                                title="View Products">View Products</a>
                            </div>
                            <a href="#"
                              title="View Products">
                              <div className="rc-hero__section rc-hero__section--img">
                                <picture>
                                  <source media="(max-width: 640px)"
                                    srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw5d0f51df/homepage/minibanner1.jpg?sw=364&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw5d0f51df/homepage/minibanner1.jpg?sw=728&amp;sfrm=png 2x" />
                                  <source media="(min-width: 640px) and (max-width: 1439px)"
                                    srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw5d0f51df/homepage/minibanner1.jpg?sw=718&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw5d0f51df/homepage/minibanner1.jpg?sw=1436&amp;sfrm=png 2x" />
                                  <source media="(min-width: 1439px)"
                                    srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw5d0f51df/homepage/minibanner1.jpg?sw=407&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw5d0f51df/homepage/minibanner1.jpg?sw=814&amp;sfrm=png 2x" />
                                  <img className="w-100"
                                    src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw5d0f51df/homepage/minibanner1.jpg?sw=407&amp;sfrm=png"
                                    alt="Специально разработанный продукт Royal Canin®  для собак определенных пород "
                                    title="Специально разработанный продукт Royal Canin®  для собак определенных пород " />
                                </picture>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div data-thumb="interactive--pager" className="rc-hero rc-hero__layout--3">
                          <div className="rc-hero__fg mini-carousel-slide rc-padding--xs">
                            <div className="rc-hero__section rc-hero__section--text rc-padding-bottom--xs">
                              <a href="#"
                                title="View Products">
                                <div className="rc-margin-bottom--xs mini-carousel__title inherit-fontsize children-nomargin">
                                  <p>The splendor of each breed is</p>
                                  <p>in its uniqueness.</p>
                                </div>
                                <p className="rc-body">Find out what makes them unique!</p>
                              </a>
                              <a href="#"
                                className="rc-btn rc-btn--one rc-margin-y--xs gtm-mini-carousel-btn"
                                title="View Products">View Products</a>
                            </div>
                            <a href="#"
                              title="View Products">
                              <div className="rc-hero__section rc-hero__section--img">
                                <picture>
                                  <source media="(max-width: 640px)"
                                    srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb42d3a8a/homepage/minibanner2.jpg?sw=364&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb42d3a8a/homepage/minibanner2.jpg?sw=728&amp;sfrm=png 2x" />
                                  <source media="(min-width: 640px) and (max-width: 1439px)"
                                    srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb42d3a8a/homepage/minibanner2.jpg?sw=718&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb42d3a8a/homepage/minibanner2.jpg?sw=1436&amp;sfrm=png 2x" />
                                  <source media="(min-width: 1439px)"
                                    srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb42d3a8a/homepage/minibanner2.jpg?sw=407&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb42d3a8a/homepage/minibanner2.jpg?sw=814&amp;sfrm=png 2x" />
                                  <img className="w-100"
                                    src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb42d3a8a/homepage/minibanner2.jpg?sw=407&amp;sfrm=png"
                                    alt="Специально разработанный продукт Royal Canin®  для кошек определенных пород"
                                    title="Специально разработанный продукт Royal Canin®  для кошек определенных пород" />
                                </picture>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="col-12 col-lg-8">
                      <div className="experience-component experience-assets-contentBlock">
                        <div
                          className="rc-content-block rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile content-block">
                          <div className="row align-items-center hp-right-content-block">
                            <div className=" col-12 col-lg-6">
                              <picture>
                                <source media="(max-width: 640px)"
                                  srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwd8ab8f2a/homepage/RC draw@2x.jpg?sw=350&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwd8ab8f2a/homepage/RC draw@2x.jpg?sw=700&amp;sfrm=png 2x" />
                                <source media="(min-width: 640px) and (max-width: 769px)"
                                  srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwd8ab8f2a/homepage/RC draw@2x.jpg?sw=674&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwd8ab8f2a/homepage/RC draw@2x.jpg?sw=1348&amp;sfrm=png 2x" />
                                <source media="(min-width: 769px)"
                                  srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwd8ab8f2a/homepage/RC draw@2x.jpg?sw=380&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwd8ab8f2a/homepage/RC draw@2x.jpg?sw=760&amp;sfrm=png 2x" />
                                <img className="w-100"
                                  src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwd8ab8f2a/homepage/RC draw@2x.jpg?sw=380&amp;sfrm=png"
                                  alt="Здоровое питание Royal Canin®" title="Здоровое питание Royal Canin®" />
                              </picture>
                            </div>
                            <div className=" col-12 col-lg-6">
                              <div className=" text-center text-lg-left rc-padding-y--sm rc-padding-y--md--mobile">
                                <h5 className="rc-beta markup-text">Special animal nutrition</h5>
                                <p>
                                  For more than 50 years, we have been following the principle of “Well-being for dogs and cats, above all.” We create adapted food for animals according to their special needs.
                                </p>
                                <a className="rc-btn rc-btn--two gtm-content-block-btn"
                                  href="#" title="To learn more">To learn more</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="experience-component experience-assets-divider">
            <div className="rc-border-bottom rc-border-colour--brand4" style={{ borderBottomWidth: '4px' }}> </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-centeredIconList">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile centered-icon-list">
                    <div className="row rc-padding-x--xl--mobile col-10 bottom-content__icon-list rc-sm-down mx-auto">
                      <div className="col-6 centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Secure payments" title="Secure payments" />
                        <p className="rc-meta text-center markup-text">Secure payments</p>
                      </div>
                      <div className="col-6 centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Quality assurance" title="Quality assurance" />
                        <p className="rc-meta text-center markup-text">Quality assurance</p>
                      </div>
                      <div className="col-6 centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Premium service" title="Premium service" />
                        <p className="rc-meta text-center markup-text">Premium service</p>
                      </div>
                      <div className="col-6 centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Fast shipping" title="Fast shipping" />
                        <p className="rc-meta text-center markup-text">Fast shipping</p>
                      </div>
                    </div>
                    <div className="rc-sm-up d-flex justify-content-center bottom-content__icon-list">
                      <div className="centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Secure payments" title="Secure payments" />
                        <p className="rc-meta text-center markup-text">Secure payments</p>
                      </div>
                      <div className="centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Quality assurance" title="Quality assurance" />
                        <p className="rc-meta text-center markup-text">Quality assurance</p>
                      </div>
                      <div className="centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Premium service" title="Premium service" />
                        <p className="rc-meta text-center markup-text">Premium service</p>
                      </div>
                      <div className="centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCM/K_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Fast shipping" title="Fast shipping" />
                        <p className="rc-meta text-center markup-text">Fast shipping</p>
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
                    <div className="row rc-margin-x--none d-flex">
                      <div className="col-6 col-lg-4 order-1 order-lg-0">
                        <picture>
                          <source media="(max-width: 640px)" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=161&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=322&amp;sfrm=png 2x" />
                          <source media="(min-width: 640px) and (max-width: 769px)" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=338&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=676&amp;sfrm=png 2x" />
                          <source media="(min-width: 769px)" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=415&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=830&amp;sfrm=png 2x" />
                          <img className="w-100" src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw6c03729b/homepage/footerpet@2x.jpg?sw=415&amp;sfrm=png" alt="Royal Canin® - for dogs and cats" title="Royal Canin® - for dogs and cats" />
                        </picture>
                      </div>
                      <div className="col-12 col-lg-4 d-flex align-items-center order-0 order-lg-1 justify-content-center rc-margin-bottom--sm">
                        <div className="rc-alpha text-center uppercase inherit-fontsize markup-text children-nomargin rc-margin--none"><p>CARE FOR THE HEALTH OF DOGS AND CATS SINCE 1968</p></div>
                      </div>
                      <div className="col-6 col-lg-4 d-flex align-items-center order-2 justify-content-center flex-column flex-lg-row">
                        <div className="image-container rc-padding-bottom--xs rc-margin-right--xs--desktop">
                          <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=58&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=58&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=116&amp;sfrm=png 2x" width="58" alt="together with you" title="together with you" />
                        </div>
                        <h5 className="rc-epsilon rc-text-colour--brand1"><b>TOGETHER WITH YOU</b></h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Home