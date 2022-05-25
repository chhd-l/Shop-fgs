import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import BannerTip from '@/components/BannerTip';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { inject, observer } from 'mobx-react';
import { getDeviceType } from '@/utils/utils';
import { seoHoc } from '@/framework/common';
import { withOktaAuth } from '@okta/okta-react';
import { Helmet } from 'react-helmet';
import kittencute from './img/kittencute.png';
import kittenimgone from './img/kittenimgone.png';
import kittenimgtwo from './img/kittenimgtwo.png';
import { getOtherSpecies, getSpecies } from '@/utils/GA';

import BreadCrumbs from '../../components/BreadCrumbs';
import Help from './modules/help';
import { getDetailsBySpuNoIgnoreDisplayFlag } from '@/api/details';
import { sitePurchase } from '@/api/cart';
import './index.css';
import Canonical from '@/components/Canonical';

const localItemRoyal = window.__.localItemRoyal;

let isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

const kittyData = [
  {
    kittenImg: kittenimgone,
    kittenTitle: 'Moins de 4 mois',
    kittenDescription: [
      '- 1 sac de croquette Mother & BabyCat',
      '- 1 boite de mousse Mother & BabyCat'
    ],
    dataCurrent: 1
  },
  {
    kittenImg: kittenimgtwo,
    kittenTitle: 'Plus de 4 mois',
    kittenDescription: [
      '- 1 sac de croquette Kitten',
      '- 1 sachet de nutrition fraicheur Kitten'
    ],
    dataCurrent: 2
  }
];
let skuArr = ['FGS20049', 'FGS20050'];

@inject('configStore', 'checkoutStore', 'loginStore', 'clinicStore')
@injectIntl
@seoHoc('Home Page')
@observer
class DedicatedLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true,
      searchEvent: {},
      showKitten: false,
      selectLine: 3,
      buttonLoading: false,
      productList: [],
      promotionCode: '',
      choosedProduct: [],
      // listOne: [], // 商品数据1
      // listTwo: [], // 商品数据2
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
    let res = await Promise.all([
      getDetailsBySpuNoIgnoreDisplayFlag('FGS20049'),
      getDetailsBySpuNoIgnoreDisplayFlag('FGS20050')
    ]);
    let productList = [res[0]?.context, res[1]?.context];
    console.info(' productList[selectLine]', productList);
    this.handleGoodsGA(productList);
    // dataLayer.push({
    //   products: productList.map((el) => handleGoodsGA(el))
    // });

    this.setState({ productList, promotionCode: this.props.match.params.id });
  }
  handleGoodsGA = (productList) => {
    try {
      if (!productList) {
        return;
      }
      let products = productList.map((goodsData) => {
        let technology = (
          getOtherSpecies(goodsData, 'Technology') || []
        ).toString();
        let range = (getOtherSpecies(goodsData, 'Range') || []).toString();
        let breed = getOtherSpecies(goodsData, 'breeds') || [];
        let choosedItem =
          goodsData.goodsInfos.find((el) => el.selected) ||
          goodsData.goodsInfos[0];
        return {
          price: goodsData.goodsInfos[0]?.marketPrice, //Product Price, including discount if promo code activated for this product
          specie: getSpecies(goodsData), //'Cat' or 'Dog',
          range, //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
          name: choosedItem.goodsInfoName, //WeShare product name, always in English
          mainItemCode: choosedItem.goodsInfoNo, //Main item code
          SKU: choosedItem.goodsInfoNo, //product SKU
          subscription: 'One Shot', //'One Shot', 'Subscription', 'Club'
          subscriptionFrequency: '', //Frequency in weeks, to populate only if 'subscription' equals 'Subscription or Club'
          technology, //'Dry', 'Wet', 'Pack'
          brand: 'Royal Canin', //'Royal Canin' or 'Eukanuba'
          size: choosedItem.specText || '', //?Same wording as displayed on the site, with units depending on the country (oz, grams...)
          breed, //All animal breeds associated with the product in an array
          quantity: choosedItem.buyCount || 1, //Number of products, only if already added to cart
          sizeCategory: '', //'Less than 4Kg', 'Over 45kg'... reflecting the 'Weight of my animal' field present in the PLP filters
          promoCodeName: '', //Promo code name, only if promo activated
          promoCodeAmount: '' //Promo code amount, only if promo activated
        };
      });
      console.info('GADataproductsproducts', products);
      window?.dataLayer?.push({ products });
    } catch (err) {
      console.info('err', err);
    }
  };

  componentWillUnmount() {}

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
      selectLine: 3
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

    window?.dataLayer?.push({
      event: 'kitKittenRecoAddToCart',
      landingPageAddProduct: {
        SKU: skuArr[selectLine] //product SKU, must absolutely be coherent with the SKU displayed in the initial product array
      }
    });
    if (selectLine > 1) {
      return;
    }
    this.setState({ buttonLoading: true });
    this.getProductList();

    // if (selectLine === 1) {
    //   const { context } = await getDetailsBySpuNoIgnoreDisplayFlag('FGS20049');
    //   this.setState({ listOne: context });
    //   this.getProductList();
    // } else if (selectLine === 2) {
    //   const { context } = await getDetailsBySpuNoIgnoreDisplayFlag('FGS20050');
    //   this.setState({ listTwo: context });
    //   this.getProductList();
    // }
  };
  // 获取选中商品sku
  getProductList = async () => {
    const { selectLine, productList } = this.state;
    // let productList = {};
    // let unProductList = [];
    productList[selectLine].goodsInfos[selectLine].selected = true;
    let unProductList = productList[selectLine];
    let choosedProduct = productList[selectLine].goodsInfos[selectLine];
    // if (selectLine === 1) {
    //   listOne.goodsInfos[0].selected = true;
    //   unProductList = listOne;
    //   productList = listOne.goodsInfos[0];
    // } else {
    //   unProductList = listTwo;
    //   listTwo.goodsInfos[1].selected = true;
    //   productList = listTwo.goodsInfos[1];
    // }
    this.setState({
      choosedProduct: [choosedProduct],
      unProductList
    });
    // 判断是否登陆
    if (this.props.loginStore.isLogin) {
      this.hanldeLoginAddToCart([choosedProduct]);
    } else {
      this.hanldeUnloginAddToCart(choosedProduct, unProductList);
    }
  };

  // 已登录
  async hanldeLoginAddToCart(choosedProduct) {
    let { promotionCode } = this.state;
    if (choosedProduct.length > 0) {
      try {
        await this.props.checkoutStore.setPromotionCode(promotionCode);
        await sitePurchase({
          goodsInfoId: choosedProduct[0].goodsInfoId,
          goodsNum: 1,
          goodsCategory: '',
          goodsInfoFlag: 0,
          recommendationId:
            this.props.clinicStore.linkClinicRecommendationInfos
              ?.recommendationId || this.props.clinicStore.linkClinicId,
          recommendationInfos:
            this.props.clinicStore.linkClinicRecommendationInfos,
          recommendationName:
            this.props.clinicStore.linkClinicRecommendationInfos
              ?.recommendationName || this.props.clinicStore.linkClinicName
        });
        await this.props.checkoutStore.updateLoginCart({
          intl: this.props.intl
        });
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
    return this.state.choosedProduct.length > 0;
  }

  // 未登录
  async hanldeUnloginAddToCart(choosedProduct, unProductList) {
    let { promotionCode } = this.state;
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
            choosedProduct?.mockSpecDetailIds.indexOf(child.specDetailId) > -1
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
        goodsInfo: { ...choosedProduct },
        quantity: 1,
        currentUnitPrice: choosedProduct?.marketPrice,
        goodsInfoFlag: 0,
        periodTypeId: null,
        recommendationInfos:
          this.props.clinicStore.linkClinicRecommendationInfos,
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
    console.log(cartItem);
    await this.props.checkoutStore.hanldeUnloginAddToCart({
      valid: this.addCartBtnStatus,
      cartItemList: [cartItem],
      ...this.props
    });

    this.setState({ buttonLoading: false, showKitten: false });
    this.props.history.push('/cart');
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
                  background: '#333333',
                  opacity: '0.5'
                }
              : {}
          }
        />
        {!Ru ? (
          <Canonical />
        ) : (
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>
        )}
        <GoogleTagManager
          key={this.props.location.key}
          additionalEvents={event}
          searchEvent={this.state.searchEvent}
        />
        <Header
          {...this.props}
          showMiniIcons={true}
          showUserIcon={true}
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
                                onClick={() => {
                                  window?.dataLayer?.push({
                                    'event ': 'kitKittenRecoTabClick'
                                  });
                                  this.changeShowKitten();
                                }}
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
                top: '17%',
                left: '50%',
                transform: 'translate(-50%,0%)',
                opacity: '100',
                zIndex: '1100'
              }}
              className="kitty80"
            >
              <article className="rc-card rc-card--a">
                <div
                  style={{ textAlign: 'right', padding: '24px 24px 0 0' }}
                  onClick={() => this.changeShowKitten()}
                >
                  <span
                    className="rc-icon rc-close rc-iconography"
                    style={{ width: '15px', height: '24px', cursor: 'pointer' }}
                  ></span>
                </div>
                <div className="rc-card__body">
                  <header style={{ marginBottom: '25px' }}>
                    <h1
                      className="rc-card__title rc-delta text-center fwt"
                      style={{ fontSize: '28px' }}
                    >
                      Sélectionnez votre kit
                    </h1>
                  </header>
                  <div
                    className="flex flex-md-column kittyflexdirection"
                    style={{ justifyContent: 'space-evenly' }}
                  >
                    {kittyData.map((index, indexs) => (
                      <div
                        style={indexs === 0 ? { marginBottom: '10px' } : null}
                        key={indexs}
                      >
                        <p
                          className="text-center fwt"
                          style={{ color: '#E2001A' }}
                        >
                          {index.kittenTitle}
                        </p>
                        <article
                          className="rc-card rc-card--a pd27"
                          onClick={() => this.changeSetLine(indexs)}
                          style={
                            selectLine == indexs
                              ? {
                                  boxShadow: ' 0vh 0vh 0.3vh 0.1vh #E2001A'
                                }
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
                                  <p
                                    className="rc-meta rc-margin-bottom--sm--mobile"
                                    style={{ fontSize: 16, fontWeight: 400 }}
                                  >
                                    {index}
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
                    boxShadow: ' rgb(0 0 0 / 30%) 0px -10px 15px -10px',
                    padding: '20px',
                    marginTop: '20px'
                  }}
                  className="text-center"
                >
                  <button
                    className={`rc-btn rc-btn--one ${
                      this.state.buttonLoading ? 'ui-btn-loading' : ''
                    }  ${
                      this.state.selectLine > 1 ? 'rc-btn-solid-disabled' : ''
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
                top: '17%',
                left: '50%',
                transform: 'translate(-50%,0%)',
                opacity: '100',
                zIndex: '1100'
              }}
            >
              <div className="rc-column " style={{ width: '950px' }}>
                <article className="rc-card rc-card--a">
                  <div
                    style={{ textAlign: 'right', padding: '24px 24px 0 0' }}
                    onClick={() => this.changeShowKitten()}
                  >
                    <span
                      className="rc-icon rc-close rc-iconography"
                      style={{
                        width: '15px',
                        height: '24px',
                        cursor: 'pointer'
                      }}
                    ></span>
                  </div>
                  <div className="rc-card__bodys">
                    <header style={{ marginBottom: '25px' }}>
                      <h1
                        className="rc-card__title rc-delta text-center fwt"
                        style={{ fontSize: '28px' }}
                      >
                        Sélectionnez votre kit
                      </h1>
                    </header>
                    <div
                      className="flex "
                      style={{ justifyContent: 'space-evenly' }}
                    >
                      {kittyData.map((index, indexs) => (
                        <div
                          style={indexs === 0 ? { marginRight: '27px' } : null}
                          key={indexs}
                        >
                          <p
                            className="text-center fwt"
                            style={{ color: '#E2001A' }}
                          >
                            {index.kittenTitle}
                          </p>
                          <article
                            className="rc-card rc-card--a pd27"
                            onClick={() => this.changeSetLine(indexs)}
                            style={
                              selectLine == indexs
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
                                      <p
                                        className="rc-meta rc-margin-bottom--sm--mobile"
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 400
                                        }}
                                      >
                                        {index}
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
                      boxShadow: ' rgb(0 0 0 / 30%) 0px -10px 15px -10px',
                      padding: '20px',
                      marginTop: '20px'
                    }}
                    className="text-center"
                  >
                    <button
                      className={`rc-btn rc-btn--one ${
                        this.state.buttonLoading ? 'ui-btn-loading' : ''
                      }  ${
                        this.state.selectLine > 1 ? 'rc-btn-solid-disabled' : ''
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
                          <div className="rc-layout-container rc-two-column rc-margin-y--sm text-center md:text-left rc-margin-top--lg--mobile"></div>
                          <div className="rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center md:text-left">
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
