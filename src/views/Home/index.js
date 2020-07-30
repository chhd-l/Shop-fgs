import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { formatMoney } from '@/utils/utils'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BannerTip from '@/components/BannerTip'
import HeroCarousel from '@/components/HeroCarousel2'
import './index.css'
import CARECAT from "@/assets/images/MX-L-VET-CARE-CAT.jpg";
import CAREDOG from "@/assets/images/MX-L-VET-CARE-DOG.jpg";
import DIETCAT from "@/assets/images/MX-L-VET-DIET-CAT.jpg";
import DIETDOG from "@/assets/images/MX-L-VET-DIET-DOG.jpg";
import Pomotion25offImg from "@/assets/images/pomotion_25off.png";
import { getBanner } from '@/api/home.js'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      promotionVisible: false
    }
  }
  async componentDidMount () {
    getBanner().then(res => {
      console.log(res, 'ressssss')
    })
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
    if (new Date().getTime() < new Date('2020/6/2').getTime()) {
      this.setState({
        // promotionVisible: true
        promotionVisible: false
      })
    }
  }
  closePromotionPop () {
    this.setState({ promotionVisible: false })
    sessionStorage.setItem('rc-promotion-pop-close', true)
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  render () {
    const event = {
      page: {
        type: 'Homepage',
        theme: ''
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />

        <Header showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
        {
          this.state.promotionVisible && !sessionStorage.getItem('rc-promotion-pop-close')
            ? <div className="ui-pop" onClick={() => this.closePromotionPop()}>
              <div className="img-container" onClick={e => { e.stopPropagation() }}>
                <span className="pop-close" onClick={() => this.closePromotionPop()}>X</span>
                <span className="btn-cheat" onClick={() => this.closePromotionPop()}></span>
                <img src={Pomotion25offImg} style={{ width: '100%' }} />
              </div>
            </div>
            : null
        }
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
                <div className="row rc-match-heights text-center text-md-left">
                  <div className="col-lg-3 align-self-center">
                    <h2 className="rc-beta rc-margin--none rc-padding--xs rc-padding--lg--mobile text-center text-lg-left rc-padding-top--none">
                      <FormattedMessage id="home.productsCategory" />
                    </h2>
                  </div>
                  <div className="col-lg-9">
                    <div className="row custom-gutter">
                      {process.env.REACT_APP_LANG === 'de'
                        ? <>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="home.catogery1">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/vcn"
                                  title={txt}>
                                  <picture className="category-cards__card__img">
                                    <source
                                      srcSet={CAREDOG} />
                                    <img
                                      src={CAREDOG}
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
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="home.catogery2">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/vd"
                                  title={txt}>
                                  <picture className="category-cards__card__img">
                                    <source
                                      srcSet={CARECAT} />
                                    <img
                                      src={CARECAT}
                                      alt={txt}
                                      title={txt} />
                                  </picture>
                                  <div
                                    className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="home.catogery3">
                              {txt => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/prescription-dogs"
                                  title={txt}>
                                  <picture className="category-cards__card__img">
                                    <source
                                      srcSet={DIETDOG} />
                                    <img
                                      src={DIETDOG}
                                      alt={txt}
                                      title={txt} />
                                  </picture>
                                  <div
                                    className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="home.catogery4">
                              {txt => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/prescription-cats"
                                  title={txt}>
                                  <picture className="category-cards__card__img">
                                    <source
                                      srcSet={DIETCAT} />
                                    <img
                                      src={DIETCAT}
                                      alt={txt}
                                      title={txt} />
                                  </picture>
                                  <div
                                    className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="home.catogery7">
                              {txt => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/prescription-cats"
                                  title={txt}>
                                  <picture className="category-cards__card__img">
                                    <source
                                      srcSet={DIETCAT} />
                                    <img
                                      src={DIETCAT}
                                      alt={txt}
                                      title={txt} />
                                  </picture>
                                  <div
                                    className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="home.catogery8">
                              {txt => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/prescription-cats"
                                  title={txt}>
                                  <picture className="category-cards__card__img">
                                    <source
                                      srcSet={DIETCAT} />
                                    <img
                                      src={DIETCAT}
                                      alt={txt}
                                      title={txt} />
                                  </picture>
                                  <div
                                    className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                        </>
                        : <>
                          <div className="col-md-3 col-6">
                            <FormattedMessage id="home.catogery1">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/vcn"
                                  title={txt}>
                                  <picture className="category-cards__card__img">
                                    <source
                                      srcSet={CAREDOG} />
                                    <img
                                      src={CAREDOG}
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
                            <FormattedMessage id="home.catogery2">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/vd"
                                  title={txt}>
                                  <picture className="category-cards__card__img">
                                    <source
                                      srcSet={CARECAT} />
                                    <img
                                      src={CARECAT}
                                      alt={txt}
                                      title={txt} />
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
                            <FormattedMessage id="home.catogery3">
                              {txt => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/prescription-dogs"
                                  title={txt}>
                                  <picture className="category-cards__card__img">
                                    <source
                                      srcSet={DIETDOG} />
                                    <img
                                      src={DIETDOG}
                                      alt={txt}
                                      title={txt} />
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
                            <FormattedMessage id="home.catogery4">
                              {txt => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/prescription-cats"
                                  title={txt}>
                                  <picture className="category-cards__card__img">
                                    <source
                                      srcSet={DIETCAT} />
                                    <img
                                      src={DIETCAT}
                                      alt={txt}
                                      title={txt} />
                                  </picture>
                                  <div
                                    className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                        </>}
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
                              <FormattedMessage id="home.convenientTip2" values={{ val: formatMoney(process.env.REACT_APP_MINIMUM_AMOUNT) }} />
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