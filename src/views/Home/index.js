import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroCarousel from '@/components/HeroCarousel'
import './index.css'

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
        <Header cartData={this.state.cartData} showMiniIcons={true} location={this.props.location} />
        
        <main className="rc-content--fixed-header rc-main-content__wrapper ">
          <div className="rc-full-width">
            <div className="experience-component experience-layouts-herocarousel">
              <HeroCarousel history={this.props.history} />
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
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                    <FormattedMessage id="home.convenientTitle" />
                  </h4>
                  <div className="value-proposition__container">
                    <div className="row mx-0">
                      <div
                        className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                          <img className="value-proposition__img"
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3206e904/homepage/pack@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            alt="  " title="  " />
                          <div className="pl-3 d-flex align-items-center value-proposition__text">
                            <p className="rc-margin-bottom--none rc-intro">
                              <FormattedMessage id="home.convenientTip1" />
                            </p>
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
                            <p className="rc-margin-bottom--none rc-intro">
                              <FormattedMessage id="home.convenientTip2" />
                            </p>
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
                            <p className="rc-margin-bottom--none rc-intro">
                              <FormattedMessage id="home.convenientTip3" />
                            </p>
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
                    <div className="row rc-padding-x--xl--mobile col-10 bottom-content__icon-list rc-sm-down mx-auto text-center">
                      <div className="col-6 centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Secure payments" title="Secure payments" />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point1" />
                        </p>
                      </div>
                      <div className="col-6 centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Quality assurance" title="Quality assurance" />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point2" />
                        </p>
                      </div>
                      <div className="col-6 centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Premium service" title="Premium service" />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point3" />
                        </p>
                      </div>
                      <div className="col-6 centered-icon-list__icon">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Fast shipping" title="Fast shipping" />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point4" />
                        </p>
                      </div>
                    </div>
                    <div className="rc-sm-up d-flex justify-content-center bottom-content__icon-list">
                      <div className="centered-icon-list__icon text-center">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw489a492c/homepage/Payment-secure@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Secure payments" title="Secure payments" />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point1" />
                        </p>
                      </div>
                      <div className="centered-icon-list__icon text-center">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw128623a0/homepage/reimbursed@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Quality assurance" title="Quality assurance" />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point2" />
                        </p>
                      </div>
                      <div className="centered-icon-list__icon text-center">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dwb61f3539/homepage/premium@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Premium service" title="Premium service" />
                        <p className="rc-meta text-center markup-text">
                          <FormattedMessage id="home.point3" />
                        </p>
                      </div>
                      <div className="centered-icon-list__icon text-center">
                        <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCM/K_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=40&amp;sh=31&amp;sm=cut&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw2e4c369e/homepage/shippment@2x.png?sw=80&amp;sh=62&amp;sm=cut&amp;sfrm=png 2x" className="mx-auto" alt="Fast shipping" title="Fast shipping" />
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
                        <div className="rc-alpha text-center uppercase inherit-fontsize markup-text children-nomargin rc-margin--none">
                          <p><FormattedMessage id="home.point5" /></p>
                        </div>
                      </div>
                      <div className="col-6 col-lg-4 d-flex align-items-center order-2 justify-content-center flex-column flex-lg-row">
                        <div className="image-container rc-padding-bottom--xs rc-margin-right--xs--desktop">
                          <img src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=58&amp;sfrm=png" srcSet="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=58&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3905477a/homepage/50y@2x.jpg?sw=116&amp;sfrm=png 2x" width="58" alt="together with you" title="together with you" />
                        </div>
                        <h5 className="rc-epsilon rc-text-colour--brand1"><b><FormattedMessage id="home.point6" /></b></h5>
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