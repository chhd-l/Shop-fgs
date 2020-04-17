import React from 'react';
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/index'
import HeroCarousel from '@/components/HeroCarousel/index'

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
                      Our products by category
                    </h2>
                  </div>
                  <div className="col-lg-9">
                    <div className="row">
                      <div className="col-md-3 col-6">
                        <a className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          href="#/list/dogs" title="Dogs">
                          <picture className="category-cards__card__img">
                            <source
                              srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw96967667/Dog_categorie-RU@2x.jpg?sw=144&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw96967667/Dog_categorie-RU@2x.jpg?sw=288&amp;sfrm=png 2x" />
                            <img
                              src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw96967667/Dog_categorie-RU@2x.jpg?sw=144&amp;sfrm=png"
                              alt="Dog Products" title="Dog Products" />
                          </picture>
                          <div
                            className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Dogs</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-md-3 col-6">
                        <a className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          href="#/list/cats" title="Products for cats">
                          <picture className="category-cards__card__img">
                            <source
                              srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw9266069c/homepage/Cat_categorie@2x.jpg?sw=144&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw9266069c/homepage/Cat_categorie@2x.jpg?sw=288&amp;sfrm=png 2x" />
                            <img
                              src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw9266069c/homepage/Cat_categorie@2x.jpg?sw=144&amp;sfrm=png"
                              alt="Products for cats" title="Products for cats" />
                          </picture>
                          <div
                            className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Cats</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-md-3 col-6">
                        <a className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          href=".#/list/puppies" title="Puppies">
                          <picture className="category-cards__card__img">
                            <source
                              srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw87e948c2/homepage/Puppy_categorie@2x.jpg?sw=144&sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw87e948c2/homepage/Puppy_categorie@2x.jpg?sw=288&sfrm=png 2x" />
                            <img
                              src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw87e948c2/homepage/Puppy_categorie@2x.jpg?sw=144&sfrm=png"
                              alt="Products for puppies" title="Products for puppies" />
                          </picture>
                          <div
                            className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Puppies</h3>
                          </div>
                        </a>
                      </div>
                      <div className="col-md-3 col-6">
                        <a className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                          href="#/list/kittens" title="Kittens">
                          <picture className="category-cards__card__img">
                            <source
                              srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwcfc83bc5/homepage/Kitten_categorie@2x.jpg?sw=144&sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwcfc83bc5/homepage/Kitten_categorie@2x.jpg?sw=288&sfrm=png 2x" />
                            <img
                              src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwcfc83bc5/homepage/Kitten_categorie@2x.jpg?sw=144&sfrm=png"
                              alt="Products for kittens" title="Products for kittens" />
                          </picture>
                          <div
                            className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                            <h3 className="rc-margin--none">Kittens</h3>
                          </div>
                        </a>
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
                        className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
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
                        className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                          <img className="value-proposition__img"
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwc850168b/homepage/autoship@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            alt="  " title="  " />
                          <div className="pl-3 d-flex align-items-center value-proposition__text">
                            <p className="rc-margin-bottom--none rc-intro">Subscription delivery with a 10% discount on the amount of each order</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-6 col-xxl-3 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
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
                        className="col-12 col-md-6 col-xxl-3 d-flex px-0  pl-md-2 pr-md-0 pr-xxl-3 pl-xxl-0 justify-content-center">
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
        </main>
        <Footer />
      </div>
    )
  }
}

export default Home