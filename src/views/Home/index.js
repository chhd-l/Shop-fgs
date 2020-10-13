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

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    if (localItemRoyal.get('isRefresh')) {
      localItemRoyal.remove('isRefresh');
      window.location.reload();
      return false;
    }
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
