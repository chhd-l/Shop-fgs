import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { formatMoney } from '@/utils/utils';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerTip from '@/components/BannerTip';
import HeroCarousel from '@/components/HeroCarousel2';
import FooterImage from './modules/FooterImage';
import './index.css';
import CARECAT from '@/assets/images/MX-L-VET-CARE-CAT.jpg';
import CAREDOG from '@/assets/images/MX-L-VET-CARE-DOG.jpg';
import DIETCAT from '@/assets/images/MX-L-VET-DIET-CAT.jpg';
import DIETDOG from '@/assets/images/MX-L-VET-DIET-DOG.jpg';

import Urinary from '@/assets/images/home-catogery/Urinary.jpg';
import Dermatology from '@/assets/images/home-catogery/Dermatology.jpg';
import WeightManagement from '@/assets/images/home-catogery/Weight-Management.jpg';
import Gastrointestinal from '@/assets/images/home-catogery/Gastrointestinal.jpg';
import VitalSupport from '@/assets/images/home-catogery/Vital-Support.jpg';
import HealthManagement from '@/assets/images/home-catogery/Health-Management.jpg';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    // console.log(111111,process.env.REACT_APP_AdyenOriginKEY)
    if (localStorage.getItem('isRefresh')) {
      localStorage.removeItem('isRefresh');
      window.location.reload();
      return false;
    }
  }
  componentWillUnmount() {
    localStorage.setItem('isRefresh', true);
  }
  render() {
    const event = {
      page: {
        type: 'Homepage',
        theme: ''
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header
          showMiniIcons={true}
          showUserIcon={true}
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
                    process.env.REACT_APP_LANG === 'de' ? '' : 'row'
                  } rc-match-heights text-center text-md-left`}
                >
                  <div
                    className={`${
                      process.env.REACT_APP_LANG === 'de' ? 'DeCenter' : ''
                    } col-lg-3 align-self-center`}
                  >
                    <h2 className="rc-beta rc-margin--none rc-padding--xs rc-padding--lg--mobile text-center rc-padding-top--none">
                      <FormattedMessage id="home.productsCategory" />
                    </h2>
                  </div>
                  <div
                    className={`${
                      process.env.REACT_APP_LANG === 'de' ? 'DeCenter' : ''
                    } col-lg-9`}
                  >
                    <div className="row custom-gutter">
                      {process.env.REACT_APP_LANG === 'de' ? (
                        <>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="product.de.catogery1.name">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/urinary"
                                  title={txt}
                                >
                                  <picture className="category-cards__card__img">
                                    <source srcSet={Urinary} />
                                    <img src={Urinary} alt={txt} title={txt} />
                                  </picture>
                                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="product.de.catogery2.name">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/dermatology"
                                  title={txt}
                                >
                                  <picture className="category-cards__card__img">
                                    <source srcSet={Dermatology} />
                                    <img
                                      src={Dermatology}
                                      alt={txt}
                                      title={txt}
                                    />
                                  </picture>
                                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="product.de.catogery3.name">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/weight-management"
                                  title={txt}
                                >
                                  <picture className="category-cards__card__img">
                                    <source srcSet={WeightManagement} />
                                    <img
                                      src={WeightManagement}
                                      alt={txt}
                                      title={txt}
                                    />
                                  </picture>
                                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="product.de.catogery4.name">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/gastrointestinal-tract"
                                  title={txt}
                                >
                                  <picture className="category-cards__card__img">
                                    <source srcSet={Gastrointestinal} />
                                    <img
                                      src={Gastrointestinal}
                                      alt={txt}
                                      title={txt}
                                    />
                                  </picture>
                                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="product.de.catogery5.name">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/vital-support"
                                  title={txt}
                                >
                                  <picture className="category-cards__card__img">
                                    <source srcSet={VitalSupport} />
                                    <img
                                      src={VitalSupport}
                                      alt={txt}
                                      title={txt}
                                    />
                                  </picture>
                                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-4 col-6">
                            <FormattedMessage id="product.de.catogery6.name">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/health-management"
                                  title={txt}
                                >
                                  <picture className="category-cards__card__img">
                                    <source srcSet={HealthManagement} />
                                    <img
                                      src={HealthManagement}
                                      alt={txt}
                                      title={txt}
                                    />
                                  </picture>
                                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-md-3 col-6">
                            <FormattedMessage id="product.catogery3.name">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/vcn"
                                  title={txt}
                                >
                                  <picture className="category-cards__card__img">
                                    <source srcSet={CAREDOG} />
                                    <img src={CAREDOG} alt={txt} title={txt} />
                                  </picture>
                                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-3 col-6">
                            <FormattedMessage id="product.catogery4.name">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/vd"
                                  title={txt}
                                >
                                  <picture className="category-cards__card__img">
                                    <source srcSet={CARECAT} />
                                    <img src={CARECAT} alt={txt} title={txt} />
                                  </picture>
                                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-3 col-6">
                            <FormattedMessage id="product.catogery1.name">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/prescription-dogs"
                                  title={txt}
                                >
                                  <picture className="category-cards__card__img">
                                    <source srcSet={DIETDOG} />
                                    <img src={DIETDOG} alt={txt} title={txt} />
                                  </picture>
                                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="col-md-3 col-6">
                            <FormattedMessage id="product.catogery2.name">
                              {(txt) => (
                                <Link
                                  className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
                                  to="/list/prescription-cats"
                                  title={txt}
                                >
                                  <picture className="category-cards__card__img">
                                    <source srcSet={DIETCAT} />
                                    <img src={DIETCAT} alt={txt} title={txt} />
                                  </picture>
                                  <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
                                    <h3 className="rc-margin--none">{txt}</h3>
                                  </div>
                                </Link>
                              )}
                            </FormattedMessage>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- divider --> */}
          <section>
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '1px' }}
            >
              {' '}
            </div>
          </section>

          {/* <!-- ads --> */}
          <section>
            <div className="rc-bg-colour--brand3" style={{ padding: '1px 0' }}>
              <div className="rc-full-width">
                <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile value-proposition">
                  <h4 className="rc-beta text-center rc-margin-bottom--sm rc-margin-bottom--lg--mobile">
                    <FormattedMessage id="home.convenientTitle" />
                  </h4>
                  <div className="value-proposition__container">
                    <div className="row mx-0">
                      <div className="col-12 col-md-6 col-xxl-4 d-flex px-0 pl-md-0 pr-md-2  pr-xxl-3 pl-xxl-0 justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-100 value-proposition__content">
                          <img
                            className="value-proposition__img"
                            src="https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Library-Sites-RoyalCaninSharedLibrary/default/dw3206e904/homepage/pack@2x.png?sw=90&amp;sh=90&amp;sm=cut&amp;sfrm=png"
                            alt="  "
                            title="  "
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
                            alt="  "
                            title="  "
                          />
                          <div className="pl-3 d-flex align-items-center value-proposition__text">
                            <p className="rc-margin-bottom--none rc-intro">
                              <FormattedMessage
                                id="home.convenientTip2"
                                values={{
                                  val: formatMoney(
                                    process.env.REACT_APP_MINIMUM_AMOUNT
                                  )
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
                            alt="  "
                            title="  "
                          />
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
            <div
              className="rc-border-bottom rc-border-colour--brand4"
              style={{ borderBottomWidth: '4px' }}
            >
              {' '}
            </div>
          </div>
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-centeredIconList">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile centered-icon-list">
                    <div className="row col-10 col-md-5 bottom-content__icon-list mx-auto text-center">
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
