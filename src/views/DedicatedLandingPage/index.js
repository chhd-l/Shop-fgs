import React from 'react';
import Skeleton from '@/components/NormalSkeleton';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { inject, observer } from 'mobx-react';
import { setSeoConfig, getDeviceType, getOktaCallBackUrl } from '@/utils/utils';
import Loading from '@/components/Loading';
import { withOktaAuth } from '@okta/okta-react';
import { Helmet } from 'react-helmet';
import stores from '@/store';
import kittencute from './img/kittencute.png';
import kittenimgone from './img/kittenimgone.png';
import kittenimgtwo from './img/kittenimgtwo.png';

import BreadCrumbs from '../../components/BreadCrumbs';
import Logo from '../../components/Logo';
import Help from './modules/help';
import { getDetailsBySpuNo } from '@/api/details';
import { sitePurchase } from '@/api/cart';
import './index.css';

const localItemRoyal = window.__.localItemRoyal;
const loginStore = stores.loginStore;
const pageLink = window.location.href;
const deviceType = getDeviceType();
let RCDrawPng = `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/home/RC-draw.jpg`;

let isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const kittyData = [
  {
    kittenImg: kittenimgone,
    kittenDescription: [
      'sac de croquette Mother & BabyCat',
      'boite de mousse Mother & BabyCat'
    ],
    dataCurrent: 1
  },
  {
    kittenImg: kittenimgtwo,
    kittenDescription: [
      '1 sac de croquette Kitten',
      '1 sachet de nutrition fraicheur Kitten123'
    ],
    dataCurrent: 2
  }
];

@inject('configStore', 'checkoutStore', 'loginStore', 'clinicStore')
@observer
@injectIntl
class DedicatedLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true,
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin'
      },
      searchEvent: {},
      showKitten: false,
      selectLine: 0,
      buttonLoading: false,
      productList: [],
      promotionCode: '',
      listOne: [], // 商品数据1
      listTwo: [], // 商品数据2
      details: {
        id: '',
        goodsName: '',
        goodsDescription: '',
        sizeList: [],
        images: [],
        goodsSpecDetails: [],
        goodsSpecs: [],
        taggingForText: null,
        taggingForImage: null,
        fromPrice: 0,
        toPrice: 0
      },
      unProductList: {}
    };
  }

  async componentDidMount() {
    if (localItemRoyal.get('login-again')) {
      loginStore.changeLoginModal(true);
      var callOktaCallBack = getOktaCallBackUrl(
        localItemRoyal.get('okta-session-token')
      );
      localItemRoyal.remove('login-again');
      window.location.href = callOktaCallBack;
    } // Cross-store login
    setSeoConfig({ pageName: 'Home Page' }).then((res) => {
      this.setState({ seoConfig: res });
    });
    if (localItemRoyal.get('logout-redirect-url')) {
      let url = localItemRoyal.get('logout-redirect-url');
      localItemRoyal.remove('logout-redirect-url');
      location.href = url;
    }
    this.setState({ promotionCode: this.props.match.params.id });
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }

  sendGAHeaderSearch = (event) => {
    this.setState({
      searchEvent: event
    });
  };
  // 关闭 打开弹窗
  changeShowKitten = () => {
    this.setState({
      showKitten: !this.state.showKitten,
      buttonLoading: false,
      selectLine: 0
    });
  };
  // 选中哪一项商品
  changeSetLine = (dataCurrent) => {
    this.setState({
      selectLine: dataCurrent
    });
  };

  // 添加商品并跳转购物车
  addCart = async () => {
    const { selectLine } = this.state;
    if (selectLine === 0) {
      return;
    }
    this.setState({ buttonLoading: true });
    if (selectLine === 1) {
      const { context } = await getDetailsBySpuNo(2544);
      this.setState({ listOne: context });
      this.getProductList();
    } else if (selectLine === 2) {
      const { context } = await getDetailsBySpuNo(2522);
      this.setState({ listTwo: context });
      this.getProductList();
    }
  };
  // 获取选中商品sku
  getProductList = async () => {
    const { selectLine, listOne, listTwo } = this.state;
    let list = [];
    let unProductList = [];
    if (selectLine === 1) {
      list = listOne.goodsInfos;
      unProductList = listOne;
    } else {
      list = listTwo.goodsInfos;
      unProductList = listTwo;
    }
    let productList = {};
    for (let i = 0; i < list.length; i++) {
      if (list[i].stock !== 0) {
        list[i].selected = true;
        productList = list[i];
        break;
      }
    }
    this.setState({
      productList: [productList],
      unProductList
    });
    // 判断是否登陆
    if (this.props.loginStore.isLogin) {
      this.hanldeLoginAddToCart();
    } else {
      this.hanldeUnloginAddToCart();
    }
  };

  // 已登录
  async hanldeLoginAddToCart() {
    let { productList, promotionCode } = this.state;
    if (productList.length > 0) {
      try {
        await this.props.checkoutStore.setPromotionCode(promotionCode);
        await sitePurchase({
          goodsInfoId: productList[0].goodsInfoId,
          goodsNum: 1,
          goodsCategory: '',
          goodsInfoFlag: 0,
          recommendationId:
            this.props.clinicStore.linkClinicRecommendationInfos
              ?.recommendationId || this.props.clinicStore.linkClinicId,
          recommendationInfos: this.props.clinicStore
            .linkClinicRecommendationInfos,
          recommendationName:
            this.props.clinicStore.linkClinicRecommendationInfos
              ?.recommendationName || this.props.clinicStore.linkClinicName
        });
        await this.props.checkoutStore.updateLoginCart();
        this.setState({ buttonLoading: false, showKitten: false });
        this.props.history.push('/cart');
      } catch (e) {
        this.setState({ buttonLoading: false });
      }
    } else {
      this.setState({ buttonLoading: false });
    }
  }

  get addCartBtnStatus() {
    return this.state.productList.length > 0;
  }

  // 未登录
  async hanldeUnloginAddToCart() {
    let { productList, unProductList, promotionCode } = this.state;
    await this.props.checkoutStore.setPromotionCode(promotionCode);
    let specList = unProductList.goodsSpecs;
    let specDetailList = unProductList.goodsSpecDetails;
    if (specList) {
      specList.map((sItem) => {
        sItem.chidren = specDetailList.filter((sdItem, i) => {
          return sdItem.specId === sItem.specId;
        });
        sItem.chidren.map((child) => {
          if (
            productList[0]?.mockSpecDetailIds.indexOf(child.specDetailId) > -1
          ) {
            child.selected = true;
          }
          return child;
        });
        return sItem;
      });
    }

    let cartItem = Object.assign(
      {},
      { ...unProductList, ...unProductList.goods },
      {
        selected: true,
        sizeList: unProductList.goodsInfos,
        goodsInfo: { ...productList },
        quantity: 1,
        currentUnitPrice: productList[0]?.marketPrice,
        goodsInfoFlag: 0,
        periodTypeId: null,
        recommendationInfos: this.props.clinicStore
          .linkClinicRecommendationInfos,
        recommendationId:
          this.props.clinicStore.linkClinicRecommendationInfos
            ?.recommendationId || this.props.clinicStore.linkClinicId,
        recommendationName:
          this.props.clinicStore.linkClinicRecommendationInfos
            ?.recommendationName || this.props.clinicStore.linkClinicName,
        taggingForTextAtCart: (unProductList.taggingList || []).filter(
          (e) =>
            e.taggingType === 'Text' &&
            e.showPage?.includes('Shopping cart page')
        )[0],
        taggingForImageAtCart: (unProductList.taggingList || []).filter(
          (e) =>
            e.taggingType === 'Image' &&
            e.showPage?.includes('Shopping cart page')
        )[0],
        goodsSpecs: specList
      }
    );
    await this.props.checkoutStore.hanldeUnloginAddToCart({
      valid: this.addCartBtnStatus,
      cartItemList: [cartItem]
    });
    this.setState({ buttonLoading: false, showKitten: false });
    // this.props.history.push('/cart');
  }

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
      localItemRoyal.set(
        'okta-redirectUrl',
        '/account/orders' + history.location.search
      );
    }
    if (parametersString.indexOf('redirect=subscription') >= 0) {
      localItemRoyal.set(
        'okta-redirectUrl',
        '/account/subscription' + history.location.search
      );
    }
    if (parametersString.indexOf('redirect=baseinfo') >= 0) {
      localItemRoyal.set('okta-redirectUrl', '/account/information');
    }
    if (parametersString.indexOf('redirect=pets') >= 0) {
      localItemRoyal.set('okta-redirectUrl', '/account/pets');
    }
    if (parametersString.indexOf('toOkta=true') >= 0) {
      this.props.oktaAuth.signInWithRedirect(window.__.env.REACT_APP_HOMEPAGE);
      return <Loading bgColor={'#fff'} />;
    }
    if (parametersString.indexOf('origin=forgot') >= 0) {
      this.props.oktaAuth.signInWithRedirect(window.__.env.REACT_APP_HOMEPAGE);
      return <Loading bgColor={'#fff'} />;
    }

    if (localItemRoyal.get('login-again')) {
      return null;
    }
    const Ru = window.__.env.REACT_APP_COUNTRY === 'ru';
    const showKitten = this.state.showKitten;
    const selectLine = this.state.selectLine;

    return (
      <div>
        <div
          className={'modal'}
          style={
            showKitten
              ? {
                  width: '100vw',
                  height: '300vh',
                  position: 'absolute',
                  display: 'block',
                  background: '#000',
                  opacity: '0.80'
                }
              : {}
          }
        ></div>
        {!Ru ? (
          <Helmet>
            <link rel="canonical" href={pageLink} />
            <title>{this.state.seoConfig.title}</title>
            <meta
              name="description"
              content={this.state.seoConfig.metaDescription}
            />
            <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
          </Helmet>
        ) : (
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>
        )}
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
          <BreadCrumbs />
          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-pawListBlock">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="rc-max-width--lg rc-padding-y--sm">
                      <div className="rc-layout-container rc-two-column rc-content-h-middle ">
                        <div className="rc-column">
                          <div className="rc-full-width">
                            <h2 className="rc-beta fwt siz26">
                              Recevez votre kit chaton offert pour
                              <br />
                              vous féliciter de votre adoption !
                            </h2>
                            <ul className="rc-list rc-list--blank rc-list--align rc-list--large-icon">
                              <li className="rc-list__item fwt pdln">
                                Avec le code promotionnel qui vous a été
                                communiqué vous pouvez à la fin de votre
                                commande obtenir votre kit de nutrition adaptée
                                pour votre chaton.
                              </li>
                              <li className="rc-list__item fwt pdln">
                                Sélectionnez le kit d’aliment chaton et
                                ajoutez-le à votre panier
                              </li>
                            </ul>
                            <div className=" rc-btn-group m-0 rc-column rc-padding-x--none kittycenter">
                              <button
                                className="rc-btn rc-btn--one  rc-margin-bottom--xs"
                                style={{
                                  paddingLeft: '80px',
                                  paddingRight: '80px'
                                }}
                                onClick={() => this.changeShowKitten()}
                              >
                                J’en profite
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="rc-column">
                          <LazyLoad>
                            <img
                              className="w-100 lazyloaded"
                              src={kittencute}
                            ></img>
                          </LazyLoad>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isMobile ? (
            <div
              style={{
                display: showKitten ? 'block' : 'none',
                position: 'absolute',
                top: '25%',
                left: '50%',
                transform: 'translate(-50%,0%)',
                opacity: '100',
                zIndex: '1100'
              }}
              className="kitty80"
            >
              <article className="rc-card rc-card--a">
                <div className="rc-card__body">
                  <div
                    className="flex "
                    style={{ justifyContent: 'flex-end' }}
                    onClick={() => this.changeShowKitten()}
                  >
                    <span
                      className="rc-icon rc-close rc-iconography"
                      style={{ width: '15px' }}
                    ></span>
                  </div>
                  <header style={{ marginBottom: '25px' }}>
                    <h1
                      className="rc-card__title rc-delta text-center "
                      style={{ fontSize: '26px' }}
                    >
                      Sélectionnez votre kit
                    </h1>
                  </header>
                  <div
                    className="flex flex-md-column kittyflexdirection"
                    style={{ justifyContent: 'space-evenly' }}
                  >
                    {kittyData.map((index, indexs) => (
                      <div style={{ marginRight: '5px' }} key={indexs}>
                        <p className="text-center" style={{ color: '#E2001A' }}>
                          Moins de 4 mois
                        </p>
                        <article
                          className="rc-card rc-card--a"
                          onClick={() => this.changeSetLine(index.dataCurrent)}
                          style={
                            selectLine == index.dataCurrent
                              ? { boxShadow: ' 0vh 0vh 0.3vh 0.1vh #E2001A' }
                              : null
                          }
                        >
                          <picture className="rc-card__image">
                            <img
                              src={index.kittenImg}
                              alt="Kitten and puppy playing with ball"
                            />
                          </picture>
                          <div style={{ marginBottom: '5px' }}>
                            <header>
                              {index.kittenDescription.map((index, indexs) => (
                                <div key={indexs}>
                                  <p className="rc-meta rc-margin-bottom--sm--mobile text-center">
                                    - {index}
                                  </p>
                                </div>
                              ))}
                            </header>
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    boxShadow: ' 0vh 0vh 0.3vh 0.1vh #E3E3E3',
                    paddingTop: '15px',
                    paddingBottom: '15px'
                  }}
                  className="text-center"
                >
                  <button
                    className={`rc-btn rc-btn--one ${
                      this.state.buttonLoading ? 'ui-btn-loading' : ''
                    }  ${
                      this.state.selectLine === 0 ? 'rc-btn-solid-disabled' : ''
                    }`}
                    onClick={this.addCart}
                  >
                    Ajouter et voir mon panier
                  </button>
                </div>
              </article>
            </div>
          ) : (
            <div
              className="rc-layout-container rc-news-article-card--sidebar-present "
              style={{
                display: showKitten ? 'block' : 'none',
                position: 'absolute',
                top: '25%',
                left: '50%',
                transform: 'translate(-50%,0%)',
                opacity: '100',
                zIndex: '1100'
              }}
            >
              <div className="rc-column " style={{ width: '950px' }}>
                <article className="rc-card rc-card--a">
                  <div className="rc-card__body">
                    <div
                      className="flex "
                      style={{ justifyContent: 'flex-end' }}
                      onClick={() => this.changeShowKitten()}
                    >
                      <span
                        className="rc-icon rc-close rc-iconography"
                        style={{ width: '15px' }}
                      ></span>
                    </div>
                    <header style={{ marginBottom: '25px' }}>
                      <h1
                        className="rc-card__title rc-delta text-center "
                        style={{ fontSize: '26px' }}
                      >
                        Sélectionnez votre kit
                      </h1>
                    </header>
                    <div
                      className="flex "
                      style={{ justifyContent: 'space-evenly' }}
                    >
                      {kittyData.map((index, indexs) => (
                        <div style={{ marginRight: '5px' }} key={indexs}>
                          <p
                            className="text-center"
                            style={{ color: '#E2001A' }}
                          >
                            Moins de 4 mois
                          </p>
                          <article
                            className="rc-card rc-card--a"
                            onClick={() =>
                              this.changeSetLine(index.dataCurrent)
                            }
                            style={
                              selectLine == index.dataCurrent
                                ? { boxShadow: ' 0vh 0vh 0.3vh 0.1vh #E2001A' }
                                : null
                            }
                          >
                            <picture className="rc-card__image">
                              <img
                                src={index.kittenImg}
                                alt="Kitten and puppy playing with ball"
                              />
                            </picture>
                            <div style={{ marginBottom: '5px' }}>
                              <header>
                                {index.kittenDescription.map(
                                  (index, indexs) => (
                                    <div key={indexs}>
                                      <p className="rc-meta rc-margin-bottom--sm--mobile text-center">
                                        - {index}
                                      </p>
                                    </div>
                                  )
                                )}
                              </header>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      boxShadow: ' 0vh 0vh 0.3vh 0.1vh #E3E3E3',
                      paddingTop: '15px',
                      paddingBottom: '15px'
                    }}
                    className="text-center"
                  >
                    <button
                      className={`rc-btn rc-btn--one ${
                        this.state.buttonLoading ? 'ui-btn-loading' : ''
                      }  ${
                        this.state.selectLine === 0
                          ? 'rc-btn-solid-disabled'
                          : ''
                      }`}
                      onClick={this.addCart}
                    >
                      Ajouter et voir mon panier
                    </button>
                  </div>
                </article>
              </div>
            </div>
          )}

          <div className="experience-component experience-layouts-1column">
            <div className="row rc-margin-x--none">
              <div className="rc-full-width">
                <div className="experience-component experience-assets-twoColImgText">
                  <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                    <div className="rc-margin-top--md rc-margin-top--none--mobile rc-padding-x--lg--mobile">
                      <h2 className="rc-beta fwt rc-margin--none text-center rc-padding-x--lg--mobile">
                        Connaissez-vous I’Abonnement ?
                      </h2>
                    </div>
                    <div className="row rc-content-v-middle text-center rc-padding-top--md rc-margin-x--none">
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <LazyLoad>
                            <img
                              className="m-auto w-auto lazyloaded"
                              alt="image one"
                              title="image one"
                              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon1@1x.png`}
                            ></img>
                          </LazyLoad>
                        </div>

                        <h6>
                          <FormattedMessage
                            id="subscription.ad.list1"
                            values={{
                              val1: (
                                <strong className="ft24">
                                  Ajoutez les produits nutritionnels répondant
                                  aux besoins de votre animal dans votre panier.
                                </strong>
                              )
                            }}
                          />
                        </h6>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <LazyLoad>
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon2.png`}
                              alt="image two"
                              title="image two"
                            ></img>
                          </LazyLoad>
                        </div>
                        <h6>
                          <FormattedMessage
                            id="subscription.ad.list2"
                            values={{
                              val1: (
                                <strong className="ft24">
                                  Sélectionnez I'expédition
                                  <br />
                                  automatique et entrez votre
                                  <br />
                                  mode de paiement.
                                </strong>
                              )
                            }}
                          />
                        </h6>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <LazyLoad>
                            <img
                              className="m-auto w-auto lazyloaded"
                              src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon3.png`}
                              alt="image three"
                              title="image three"
                            ></img>
                          </LazyLoad>
                        </div>

                        <h6>
                          <FormattedMessage
                            id="subscription.ad.list3"
                            values={{
                              val1: (
                                <strong className="ft24">
                                  Recevez votre produit
                                  <br />
                                  automatiquement en fonction de
                                  <br />
                                  votre calendrier.
                                </strong>
                              )
                            }}
                          />
                        </h6>
                      </div>
                      <div className="col-6 col-md-3 rc-column">
                        <div className="rc-margin-bottom--sm">
                          <img
                            className="m-auto w-auto lazyloaded"
                            alt="image four"
                            src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/subscription_icon4.png`}
                            title="image four"
                          ></img>
                        </div>
                        <h6>
                          <FormattedMessage
                            id="subscription.ad.list4"
                            values={{
                              val1: (
                                <strong className="ft24">
                                  Modifiez vos préférences à tout
                                  <br /> moment.
                                </strong>
                              )
                            }}
                          />
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="help-page" style={{ marginBottom: '1rem' }}>
            <section style={{ textAlign: 'center' }}>
              <h2
                style={{ color: '#E2001A', marginTop: '40px', fontWeight: 400 }}
              >
                <FormattedMessage id="subscription.help.title" />
              </h2>
              <p style={{ fontWeight: 400 }}>
                <FormattedMessage id="subscription.help.subTitle" />
              </p>
            </section>
            {window.__.env.REACT_APP_COUNTRY == 'fr' ? (
              <Help />
            ) : (
              <div className="experience-region experience-main">
                <div className="experience-component experience-layouts-1column">
                  <div className="row rc-margin-x--none">
                    <div className="rc-full-width">
                      <div className="experience-component experience-assets-contactUsBlock">
                        <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile">
                          <div className="rc-layout-container rc-two-column rc-margin-y--sm text-center text-md-left rc-margin-top--lg--mobile"></div>
                          <div className="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
                            <div className="rc-column rc-double-width rc-padding--none">
                              <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#00BCA3' }}>
                                          <FormattedMessage id="help.byTelephone" />
                                        </b>
                                        <p>
                                          {
                                            this.props.configStore
                                              .contactTimePeriod
                                          }
                                        </p>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-numeric rc-md-up"
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            style={{ color: '#00BCA3' }}
                                            className="rc-alpha rc-border--none rc-md-down"
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactPhoneNumber
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <LazyLoad>
                                        <img
                                          className="align-self-center widthAuto"
                                          src={callImg}
                                          alt="By telephone"
                                          title="By telephone"
                                        />
                                      </LazyLoad>
                                    </div>
                                  </div>
                                </div>
                              </article>
                              <article className="rc-full-width rc-column">
                                <div className="rc-border-all rc-border-colour--interface fullHeight">
                                  <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                                    <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                                      <div className="w-100">
                                        <b style={{ color: '#0087BD' }}>
                                          <font
                                            style={{ verticalAlign: 'inherit' }}
                                          >
                                            <font
                                              style={{
                                                verticalAlign: 'inherit'
                                              }}
                                            >
                                              <FormattedMessage id="help.byEmail" />
                                            </font>
                                          </font>
                                        </b>
                                        <p>
                                          <span
                                            style={{ color: 'rgb(0, 0, 0)' }}
                                          >
                                            <font
                                              style={{
                                                verticalAlign: 'inherit'
                                              }}
                                            >
                                              <font
                                                style={{
                                                  verticalAlign: 'inherit'
                                                }}
                                              >
                                                <FormattedMessage id="help.tip3" />
                                              </font>
                                            </font>
                                          </span>
                                        </p>
                                        <div className="rc-margin-top--xs">
                                          <p
                                            className="rc-numeric rc-md-up"
                                            style={{
                                              color: 'rgb(0, 135, 189)'
                                            }}
                                          >
                                            {
                                              this.props.configStore
                                                .storeContactEmail
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rc-column rc-content-v-middle">
                                      <LazyLoad>
                                        <img
                                          className="align-self-center widthAuto"
                                          src={emailImg}
                                          alt="By email"
                                          title="By email"
                                        />
                                      </LazyLoad>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </div>
                            <div className="rc-column rc-triple-width">
                              <div
                                className="background-cover"
                                style={{
                                  backgroundImage: `url(${require('@/assets/images/slider-img-help.jpg?sw=802&amp;sh=336&amp;sm=cut&amp;sfrm=png')})`
                                }}
                              >
                                <picture className="rc-card__image">
                                  <LazyLoad>
                                    <img
                                      src={helpImg}
                                      alt="help icon"
                                      title=" "
                                    />
                                  </LazyLoad>
                                </picture>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}

export default withOktaAuth(DedicatedLandingPage);
