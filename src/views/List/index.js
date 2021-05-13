import React from 'react';
import Skeleton from 'react-skeleton-loader';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import GoogleTagManager from '@/components/GoogleTagManager';
import BannerTip from '@/components/BannerTip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbsNavigation from '@/components/BreadCrumbsNavigation';
import Pagination from '@/components/Pagination';
import Selection from '@/components/Selection';
import Rate from '@/components/Rate';
import Filters from './Filters';
import FiltersPC from './FiltersPC';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import flatMap from 'lodash/flatMap';
import { IMG_DEFAULT } from '@/utils/constant';
import { Helmet } from 'react-helmet';
import { getList } from '@/api/list';
import {
  fetchHeaderNavigations,
  fetchFilterList,
  fetchSortList,
  queryStoreCateList,
  generateOptions,
  getParentNodesByChild,
  formatMoney,
  getParaByName,
  getRequest,
  getDictionary,
  setSeoConfig,
  getDeviceType,
  loadJS,
  filterObjectValue
} from '@/utils/utils';
import './index.less';

import pfRecoImg from '@/assets/images/product-finder-recomend.jpg';

import smartFeeder from '@/assets/images/smart_feeder.png';

const isHub = process.env.REACT_APP_HUB == '1';
const isMobilePhone = getDeviceType() === 'H5';
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const retailDog =
  'https://cdn.royalcanin-weshare-online.io/zWkqHWsBG95Xk-RBIfhn/v1/bd13h-hub-golden-retriever-adult-black-and-white?w=1280&auto=compress&fm=jpg';

function getMuntiImg(item) {
  let img;
  if (
    item.goodsImg ||
    item.goodsInfos.sort((a, b) => a.marketPrice - b.marketPrice)[0]
      .goodsInfoImg
  ) {
    img =
      item.goodsImg ||
      item.goodsInfos.sort((a, b) => a.marketPrice - b.marketPrice)[0]
        .goodsInfoImg;
    return `${img.replace('.jpg', '_250.jpg')}, ${img} 2x`;
  } else {
    img = IMG_DEFAULT;
    return `${img}`;
  }
}

function ListItemH5ForGlobalStyle(props) {
  const { item, GAListParam, breadListByDeco, sourceParam, isDogPage } = props;
  return item && item.productFinder ? (
    <div
      className="rc-column rc-column-pad fr-mobile-product"
      style={{ height: '300px' }}
    >
      <article
        className="rc-card--product overflow-hidden"
        style={{ minHeight: '120px' }}
      >
        <div className="fullHeight">
          <span className="ui-cursor-pointer-pure">
            <article className="rc-card--a  margin-top--5">
              <div className="rc-card__body rc-padding-top--md pb-0 justify-content-start">
                <div className="height-product-tile-plpOnly margin-top-mobile-20">
                  <h3 className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop product-title text-break ">
                    <FormattedMessage id="plp.retail.cat.product.finder.title" />
                  </h3>
                </div>
                <div
                  className="d-flex rc-padding-top--md margin-top-mobile-20 position-relative"
                  style={{ fontSize: 'large', zIndex: 2 }}
                >
                  <FormattedMessage
                    id="plp.retail.cat.product.finder.detail"
                    values={{
                      val: <br />
                    }}
                  />
                </div>
                <DistributeHubLinkOrATag
                  href="/product-finder"
                  to="/product-finder"
                >
                  <button
                    className="rc-btn rc-btn--two margin-top-mobile-20"
                    style={{ marginTop: '1.1875rem' }}
                  >
                    <FormattedMessage id="plp.retail.cat.product.finder.button" />
                  </button>
                </DistributeHubLinkOrATag>
                <picture className="rc-card__image">
                  <div className="rc-padding-bottom--xs justify-content-center ">
                    <div
                      className="lazyload-wrapper"
                      style={{
                        width: '100%',
                        height: '100%',
                        transform: 'translate(31%,-65%)'
                      }}
                    >
                      <img
                        src={
                          isDogPage
                            ? retailDog
                            : `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/product-finder/product-finder-recomend-retail-cat-find@2x.jpeg`
                        }
                        className="ImgFitScreen pt-3"
                        style={{
                          maxWidth: '50%',
                          maxHeight: '100%',
                          width: isDogPage ? '175px' : '150px',
                          height: 'auto',
                          margin: 'auto'
                        }}
                        alt="Retail Products"
                      />
                    </div>
                  </div>
                </picture>
              </div>
            </article>
          </span>
        </div>
      </article>
    </div>
  ) : (
    <div className="rc-column rc-column-pad fr-mobile-product">
      <article
        className="rc-card rc-card--b rc-padding--sm--mobile rc-padding--xs--desktop rc-padding-x--xs h-100 priceRangeFormat product-tiles-container fr-mobile overflow-hidden"
        style={{ minHeight: '120px' }}
      >
        {props.leftPromotionJSX}
        {props.rightPromotionJSX}
        <div className="h-100">
          <Link
            className="ui-cursor-pointer"
            to={{
              pathname: item
                ? `/${
                    item.lowGoodsName
                      ? item.lowGoodsName.split(' ').join('-').replace('/', '')
                      : ''
                  }-${item.goodsNo}` + sourceParam
                : '',
              state: { GAListParam, historyBreads: breadListByDeco }
            }}
            onClick={props.onClick}
          >
            <article
              className="rc-card--a rc-text--center text-center"
              style={{ flexWrap: 'wrap' }}
            >
              {item ? (
                <picture
                  className="col-4 col-sm-3 col-md-12 rc-margin-bottom--xs--desktope"
                  style={{
                    marginLeft: '-.625rem',
                    paddingLeft: '5px',
                    paddingRight: '.9375rem',
                    fontSize: '0'
                  }}
                >
                  {/*循环遍历的图片*/}
                  <LazyLoad style={{ width: '100%', height: '100%' }}>
                    <img
                      src={
                        item.goodsImg || item.goodsInfos
                          ? item.goodsImg ||
                            item.goodsInfos.sort(
                              (a, b) => a.marketPrice - b.marketPrice
                            )[0].goodsInfoImg ||
                            IMG_DEFAULT
                          : ''
                      }
                      alt={item.goodsName}
                      title={item.goodsName}
                      className="ImgFitScreen"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        margin: 'auto'
                      }}
                    />
                  </LazyLoad>
                </picture>
              ) : null}
              {props.children}

              {item && item.goodsNewSubtitle ? (
                <div className="rc-card__meta text-center col-12 ui-text-overflow-line2 m-0">
                  {item.goodsNewSubtitle}
                </div>
              ) : null}
            </article>
          </Link>
        </div>
      </article>
    </div>
  );
}

function ListItemForDefault(props) {
  const { item, GAListParam, breadListByDeco, sourceParam, isDogPage } = props;
  return item && item.productFinder ? (
    <div className="col-6 col-md-4 mb-3 pl-2 pr-2 BoxFitMonileScreen">
      <article
        className="rc-card--product overflow-hidden"
        style={{ minHeight: '120px' }}
      >
        <div className="fullHeight">
          <span className="ui-cursor-pointer-pure">
            <article className="rc-card--a rc-text--center text-center">
              <div className="pb-0 justify-content-start rc-padding-top--md">
                <div className="height-product-tile-plpOnly">
                  <FormattedMessage id="plp.retail.cat.product.finder.title">
                    {(txt) => (
                      <h3
                        className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop product-title text-break text-center"
                        title={txt}
                      >
                        {txt}
                      </h3>
                    )}
                  </FormattedMessage>
                </div>
                <div
                  className=" text-center rc-padding-top--xs"
                  style={{ fontSize: 'large' }}
                >
                  <FormattedMessage
                    id="plp.retail.cat.product.finder.detail"
                    values={{
                      val: <br />
                    }}
                  />
                </div>
                <div style={{ margin: '0 auto' }}>
                  <DistributeHubLinkOrATag
                    href="/product-finder"
                    to="/product-finder"
                  >
                    <button
                      className="rc-btn rc-btn--two "
                      style={{ marginTop: '1.1875rem' }}
                    >
                      <FormattedMessage id="plp.retail.cat.product.finder.button" />
                    </button>
                  </DistributeHubLinkOrATag>
                </div>
              </div>
              <picture className="rc-card__image">
                <div className="rc-padding-bottom--xs d-flex justify-content-center align-items-center ImgBoxFitScreen">
                  <div
                    className="lazyload-wrapper"
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <img
                      src={
                        isDogPage
                          ? retailDog
                          : `${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/product-finder/product-finder-recomend-retail-cat-find@2x.jpeg`
                      }
                      alt="product finder recomend retail cat find"
                      title=""
                      className="ImgFitScreen pt-3"
                      style={{
                        maxHeight: '100%',
                        width: isDogPage ? '175px' : '150px',
                        height: 'auto',
                        margin: 'auto'
                      }}
                    />
                  </div>
                </div>
              </picture>
            </article>
          </span>
        </div>
      </article>
    </div>
  ) : (
    <div className="col-6 col-md-4 mb-3 pl-2 pr-2 BoxFitMonileScreen">
      <article
        className="rc-card rc-card--product overflow-hidden"
        style={{ minHeight: '120px' }}
      >
        {props.leftPromotionJSX}
        {props.rightPromotionJSX}
        <div className="fullHeight">
          <Link
            className="ui-cursor-pointer"
            to={{
              pathname: item
                ? `/${item.lowGoodsName
                    .split(' ')
                    .join('-')
                    .replace('/', '')}-${item.goodsNo}` + sourceParam
                : '',
              state: {
                GAListParam,
                historyBreads: breadListByDeco
              }
            }}
            onClick={props.onClick}
          >
            <article className="rc-card--a rc-text--center text-center">
              {item ? (
                <picture className="rc-card__image">
                  <div
                    className="d-flex justify-content-center align-items-center ImgBoxFitScreen"
                    style={{ height: '13rem' }}
                  >
                    {/*循环遍历的图片*/}
                    <LazyLoad
                      style={{ width: '100%', height: '100%' }}
                      classNamePrefix="w-100 h-100 d-flex align-items-center"
                    >
                      <img
                        src={
                          item.goodsImg ||
                          item.goodsInfos.sort(
                            (a, b) => a.marketPrice - b.marketPrice
                          )[0].goodsInfoImg ||
                          IMG_DEFAULT
                        }
                        // srcSet={item ? getMuntiImg(item) : IMG_DEFAULT}
                        alt={`${item.goodsName} product image`}
                        title={item.goodsName}
                        className="ImgFitScreen "
                        style={{
                          maxWidth: '50%',
                          maxHeight: '100%',
                          width: '150px',
                          height: 'auto',
                          margin: 'auto'
                        }}
                      />
                    </LazyLoad>
                  </div>
                </picture>
              ) : null}
              {props.children}
            </article>
          </Link>
        </div>
      </article>
    </div>
  );
}
function ListItemBodyH5ForGlobalStyle({ item }) {
  return (
    <div className="fr-mobile-product-list text-left text-md-center col-8 col-sm-9 col-md-12 d-flex flex-column rc-padding-left--none--mobile align-self-center align-self-md-start pr-0">
      <div className="product-name" title={item.goodsName}>
        {item.goodsName}
      </div>
      {item.technologyOrBreedsAttr ? (
        <div className="rc-card__meta">{item.technologyOrBreedsAttr}</div>
      ) : null}
      {item.fromPrice ? (
        <div className="product-price">
          <div className="card--product-contaner-price">
            {item.toPrice ? (
              <FormattedMessage
                id="pirceRange"
                values={{
                  fromPrice: (
                    <span className="contaner-price__value">
                      {formatMoney(item.fromPrice)}
                    </span>
                  ),
                  toPrice: (
                    <span className="contaner-price__value">
                      {formatMoney(item.toPrice)}
                    </span>
                  )
                }}
              />
            ) : (
              <span className="contaner-price__value">
                {formatMoney(item.fromPrice)}
              </span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
function ListItemBody({ item, headingTag }) {
  const goodHeading = `<${headingTag ? headingTag : 'h2'}
      class="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop ui-text-overflow-line2 product-title text-break text-center pl-4 pr-4"
      title="${item.goodsName}">
      ${item.goodsName}
  </${headingTag ? headingTag : 'h2'}>`;
  const defaultJSX = (
    <>
      <div className="height-product-tile-plpOnly">
        <div dangerouslySetInnerHTML={{ __html: goodHeading }} />
        {/*商品描述*/}
        <h6
          className="rc-card__meta text-center col-12 mt-2 mb-1 ui-text-overflow-line1"
          style={{ color: '#4a4a4a' }}
          title={item.goodsNewSubtitle}
        >
          {item.goodsNewSubtitle}
        </h6>
      </div>
      {/*商品评分和评论数目*/}
      <div
        className={`d-flex align-items-center justify-content-center rc-card__price RateFitScreen`}
      >
        <div>
          <Rate def={item.avgEvaluate} disabled={true} marginSize="smallRate" />
        </div>
        <span className="comments rc-margin-left--xs rc-text-colour--text">
          ({item.goodsEvaluateNum})
        </span>
      </div>
      <br />
      <div
        className="text-center NameFitScreen"
        style={{
          color: '#4a4a4a',
          opacity: item.goodsInfos ? item.goodsInfos.length : '' > 1 ? 1 : 0
        }}
      >
        <FormattedMessage id="startFrom" />
      </div>
      {/*商品价格*/}
      <div className={`d-flex justify-content-center`}>
        <div className="rc-card__price text-left PriceFitScreen">
          <div
            className={`rc-full-width PriceFitScreen flex justify-content-center`}
          >
            <span
              style={{
                color: '#323232',
                fontWeight: 400
              }}
              className="value sales"
            >
              {/* 最低marketPrice */}
              {item.miMarketPrice ? formatMoney(item.miMarketPrice) : null}{' '}
              {/* 划线价 */}
              {item.miLinePrice && item.miLinePrice > 0 ? (
                <span
                  className="text-line-through rc-text-colour--text font-weight-lighter"
                  style={{
                    fontSize: '.8em'
                  }}
                >
                  {formatMoney(item.miLinePrice)}
                </span>
              ) : null}
            </span>
          </div>
          {item.miSubscriptionPrice && item.miSubscriptionPrice > 0 ? (
            <div
              className="range position-relative SePriceScreen "
              style={{ transform: 'translateX(24%)' }}
            >
              <span
                style={{
                  color: '#323232',
                  fontWeight: 400
                }}
              >
                {formatMoney(item.miSubscriptionPrice)}{' '}
              </span>
              <span
                className="iconfont font-weight-bold red mr-1"
                style={{
                  fontSize: '.65em'
                }}
              >
                &#xe675;
              </span>
              <span
                className="red-text text-nowrap"
                style={{
                  fontSize: '.7em',
                  transform: 'translateY(-50%)'
                }}
              >
                <FormattedMessage id="autoshop" />
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
  return (
    <div className="rc-card__body rc-padding-top--none pb-0 justify-content-start pl-0 pr-0 pc-product-card">
      {process.env.REACT_APP_PLP_STYLE === 'layout-global' ? (
        <>
          <div className="height-product-tile-plpOnly pl-4 pr-4">
            <div dangerouslySetInnerHTML={{ __html: goodHeading }} />
            {item.technologyOrBreedsAttr ? (
              <p className="rc-card__meta text-center rc-padding-top--xs">
                {item.technologyOrBreedsAttr}
              </p>
            ) : null}
          </div>
          {item.fromPrice ? (
            <div className="d-flex justify-content-center pt-3 pb-3">
              <div className="rc-card__price text-left PriceFitScreen">
                <div className={`rc-full-width PriceFitScreen`}>
                  <span className="value sales card--product-contaner-price">
                    {item.toPrice ? (
                      <FormattedMessage
                        id="pirceRange"
                        values={{
                          fromPrice: (
                            <span className="contaner-price__value">
                              {formatMoney(item.fromPrice)}
                            </span>
                          ),
                          toPrice: (
                            <span className="contaner-price__value">
                              {formatMoney(item.toPrice)}
                            </span>
                          )
                        }}
                      />
                    ) : (
                      <span className="contaner-price__value">
                        {formatMoney(item.fromPrice)}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          {item.goodsNewSubtitle ? (
            <div
              className="rc-card__meta text-center ui-text-overflow-line2 col-12 pl-4 pr-4"
              style={{ marginBottom: '.625rem' }}
            >
              {item.goodsNewSubtitle}
            </div>
          ) : null}
        </>
      ) : (
        defaultJSX
      )}
    </div>
  );
}

function ProductFinderAd({
  isRetailProducts,
  isVetProducts,
  retailProductLink,
  vetProductLink
}) {
  return (
    {
      fr: (
        <div className="ml-4 mr-4 pl-4 pr-4 pb-4 pb-md-0">
          {isRetailProducts || isVetProducts ? null : (
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <LazyLoad
                  style={{ width: '100%', height: '100%' }}
                  height={200}
                >
                  <img src={pfRecoImg} alt="product finder recomend" />
                </LazyLoad>
              </div>
              <div className="col-12 col-md-6">
                <p className="rc-gamma rc-padding--none">
                  <FormattedMessage id="productFinder.recoTitle" />
                </p>
                <p>
                  <FormattedMessage id="productFinder.recoDesc" />
                </p>
                <DistributeHubLinkOrATag
                  to="/product-finder"
                  href="/product-finder"
                  className="rc-btn rc-btn--two"
                >
                  <FormattedMessage id="productFinder.index" />
                </DistributeHubLinkOrATag>
              </div>
            </div>
          )}

          {isRetailProducts ? (
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <LazyLoad style={{ width: '100%', height: '100%' }}>
                  <img
                    style={{ width: '100%' }}
                    src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/product-finder/product-finder-recomend-retail-cat@2x.jpeg`}
                    alt="product finder recomend retail cat"
                  />
                </LazyLoad>
              </div>
              <div className="col-12 col-md-6">
                <p
                  className="rc-gamma rc-padding--none"
                  style={{ fontSize: '2em', fontWight: 'border' }}
                >
                  <FormattedMessage id="plp.retail.cat.title" />
                </p>
                <p>
                  <FormattedMessage id="plp.retail.cat.detail" />
                </p>
                <Link to={`${vetProductLink}`} className="rc-btn rc-btn--two">
                  <FormattedMessage id="plp.retail.cat.button" />
                </Link>
              </div>
            </div>
          ) : null}

          {isVetProducts ? (
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <LazyLoad
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <img
                    style={{ width: '100%' }}
                    src={`${process.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/product-finder/product-finder-recomend-vet-cat@2x.jpeg`}
                    alt="product finder recomend vet cat"
                  />
                </LazyLoad>
              </div>
              <div className="col-12 col-md-6">
                <p
                  className="rc-gamma rc-padding--none"
                  style={{ fontSize: '2em', fontWight: 'border' }}
                >
                  <FormattedMessage id="plp.vet.cat.title" />
                </p>
                <p>
                  <FormattedMessage id="plp.vet.cat.detail" />
                </p>
                <Link
                  to={`${retailProductLink}`}
                  className="rc-btn rc-btn--two"
                >
                  <FormattedMessage id="plp.vet.cat.button" />
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      )
    }[process.env.REACT_APP_LANG] || null
  );
}

@inject('configStore')
@injectIntl
@observer
class List extends React.Component {
  constructor(props) {
    super(props);
    const isDog = location.pathname.includes('dog');
    const isRetailProducts =
      isHub && location.pathname.includes('retail-products');
    const isVetProducts = isHub && location.pathname.includes('vet-products');
    const retailProductLink = `/${isDog ? 'dogs' : 'cats'}/retail-products`;
    const vetProductLink = `/${isDog ? 'dogs' : 'cats'}/vet-products`;
    this.state = {
      sourceParam: '',
      GAListParam: '', //GA list参数
      eEvents: '',
      storeCateIds: [],
      category: '',
      breadList: [],
      pathname: '',
      cateType: '',
      titleData: null,
      productList: Array(1).fill(null),
      loading: true,
      isTop: false,
      currentPage: 1,
      totalPage: 1, // 总页数
      results: 0, // 总数据条数

      keywords: '',
      filterList: [],

      initingFilter: true,
      initingList: true,
      filterModalVisible: false,
      currentCatogery: '',
      cateId: '',
      sortList: [], // 排序信息
      selectedSortParam: null,

      searchForm: {
        minMarketPrice: 0,
        maxMarketPrice: this.props?.configStore?.maxGoodsPrice || null
      },
      defaultFilterSearchForm: {
        // 初始化filter查询参数
        attrList: [],
        filterList: []
      },

      markPriceAndSubscriptionLangDict: [],
      actionFromFilter: false,
      seoConfig: {
        title: 'Royal canin',
        metaKeywords: 'Royal canin',
        metaDescription: 'Royal canin',
        headingTag: 'h2'
      },
      isDogPage: isDog,
      isRetailProducts,
      isVetProducts,
      retailProductLink,
      vetProductLink,
      pageLink: '',
      listLazyLoadSection: 1,
      prefv1: '',
      keywordsSearch: '',
      baseSearchStr: ''
    };
    this.pageSize = isRetailProducts ? 8 : 12;
    this.hanldeItemClick = this.hanldeItemClick.bind(this);
    this.toggleFilterModal = this.toggleFilterModal.bind(this);
    this.hubGA = process.env.REACT_APP_HUB_GA == '1';
    this.showSmartFeeder = isDog && this.hubGA;
  }
  componentDidMount() {
    const { state, search, pathname } = this.props.history.location;
    const cateId = getParaByName(search, 'cateId');
    const utm_source = getParaByName(search, 'utm_source'); //有这个属性，表示是breeder商品，breeder商品才需要把search赋值给sourceParam
    if (utm_source) {
      this.setState({
        sourceParam: search
      });
    }
    const { category, keywords } = this.props.match.params;
    const keywordsSearch = decodeURI(getParaByName(search, 'q'));
    if (
      keywordsSearch &&
      dataLayer[0] &&
      dataLayer[0].page &&
      dataLayer[0].page.type
    ) {
      //表示从搜索来的
      // dataLayer[0].page.type = 'Search Results';
    }
    this.setState(
      {
        GAListParam:
          state && state.GAListParam ? state.GAListParam : 'Catalogue',
        category,
        keywords:
          category && category.toLocaleLowerCase() === 'keywords'
            ? keywords
            : keywordsSearch
            ? keywordsSearch
            : '',
        cateType: { '/cats': 'cats', '/dogs': 'dogs' }[pathname] || '',
        cateId,
        keywordsSearch
      },
      () => {
        this.initData();
        this.pageGa();
      }
    );
    setTimeout(() => {
      this.stickyMobileRefineBar();
    });

    Promise.all([
      getDictionary({ type: 'filterMarketPrice' }),
      getDictionary({ type: 'filterSubscription' }),
      getDictionary({ type: 'filterSubscriptionValue' })
    ]).then((dictList) => {
      this.setState({
        markPriceAndSubscriptionLangDict: [
          ...dictList[0],
          ...dictList[1],
          ...dictList[2]
        ]
      });
    });

    let baseSearchStr = '';

    const allSearchParam = getRequest();
    for (const key in allSearchParam) {
      if (!key.includes('prefn') && !key.includes('prefv')) {
        baseSearchStr += `${key}=${allSearchParam[key]}`;
      }
    }

    this.setState({ baseSearchStr });

    let tmpSearch = '';
    const prefnNum = (search.match(/prefn/gi) || []).length;
    for (let index = 0; index < Math.min(prefnNum, 1); index++) {
      const fnEle = decodeURI(getParaByName(search, `prefn${index + 1}`));
      const fvEles = decodeURI(
        getParaByName(search, `prefv${index + 1}`)
      ).split('|');
      tmpSearch = `?prefn1=${fnEle}&prefv1=${fvEles.join('|')}`;
    }

    // ru filter seo 定制化 ==
    let lifestagesPrefv = [],
      sterilizedPrefv = [],
      technologyPrefv = [],
      breedsPrefv = [];
    let sizePrefv = []; //用于ga filter 传参size
    for (let index = 0; index < prefnNum; index++) {
      const fnEle = decodeURI(getParaByName(search, `prefn${index + 1}`));
      const fvEles = decodeURI(getParaByName(search, `prefv${index + 1}`));
      if (fnEle == 'Lifestages') {
        const lifestage = fvEles.includes('|')
          ? 'корм для кошек разных возрастов'
          : 'корм для ' + fvEles;
        lifestagesPrefv.push(lifestage);
      } else if (fnEle == 'Sterilized') {
        const sterilize =
          fvEles == 'Нет' ? 'стерилизованных' : 'нестерилизованных';
        sterilizedPrefv.push(sterilize);
      } else if (fnEle == 'Technology' && fvEles != 'Другой') {
        technologyPrefv.push(fvEles);
      } else if (fnEle == 'Breeds') {
        const breed = fvEles.includes('|')
          ? 'разных пород'
          : 'породы ' + fvEles;
        breedsPrefv.push(breed);
      }

      if (fnEle == 'Size') sizePrefv.push(fvEles);
    }

    if (!lifestagesPrefv.length && prefnNum) {
      const foodType = this.state.isDogPage
        ? 'корм для собак'
        : 'корм для кошек';
      lifestagesPrefv.push(foodType);
    }
    let allPrefv = [
      ...technologyPrefv,
      ...lifestagesPrefv,
      ...breedsPrefv,
      ...sterilizedPrefv
    ]?.join(' '); //要排序，因此这样写的==
    const prefv1 = decodeURI(getParaByName(search, 'prefv1'));
    const animalType = this.state.isDogPage ? 'dog' : 'cat';
    this.setState({
      pageLink: `${window.location.origin}${window.location.pathname}${tmpSearch}`,
      prefv1,
      animalType,
      sizePrefv: sizePrefv.join(' '),
      allPrefv: allPrefv?.toLowerCase()
    });
  }

  pageGa() {
    const { pathname } = this.props.history.location;
    if (pathname) {
      let reDog = /^\/dog/; // 匹配dog开头
      let reCat = /^\/cat/; // 匹配cat开头
      let theme;
      let type;
      let specieId;
      if (reDog.test(pathname)) {
        theme = 'Dog';
        type = 'Product Catalogue';
        specieId = 2;
      } else if (reCat.test(pathname)) {
        theme = 'Cat';
        type = 'Product Catalogue';
        specieId = 1;
      } else {
        theme = '';
        type = 'Product';
        specieId = '';
      }

      let search = this.state.keywordsSearch
        ? {
            query: this.state.keywordsSearch,
            results: parseFloat(sessionItemRoyal.get('search-results')),
            type: 'with results'
          }
        : {};
      let event = {
        page: {
          type,
          theme,
          path: pathname,
          error: '',
          hitTimestamp: new Date(),
          filters: ''
        },
        search: {
          ...search
        },
        pet: {
          specieId
        }
      };
      this.setState({
        event
      });
    }
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  get lastBreadListName() {
    const { breadList } = this.state;
    return (
      (breadList[breadList.length - 1] &&
        breadList[breadList.length - 1].name) ||
      ''
    );
  }
  get breadListByDeco() {
    let ret = [];
    const { pathname, search } = this.props.location;
    const { breadList } = this.state;
    // 一旦某层级无link，则将其与后一项合并
    for (let index = 0; index < breadList.length; index++) {
      const element = breadList[index];
      let tmpEle = { ...element };
      const nextItem = breadList[index + 1];
      if (!element.link && nextItem) {
        index++;
        tmpEle = Object.assign(tmpEle, {
          name: [element.name, nextItem.name].join(': ')
        });
      }
      ret.push(tmpEle);
    }
    // 将当前路由加入到最有一项上
    let lastItem = ret[ret.length - 1];
    if (lastItem) {
      lastItem.link = { pathname, search };
    }

    return ret;
  }
  //点击商品 埋点
  GAProductClick(item, index) {
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComProductClick`,
      ecommerce: {
        click: {
          actionField: { list: this.state.GAListParam },
          products: [
            {
              name: item.goodsName,
              id: item.goodsNo,
              club: 'no',
              brand: item.goodsBrand.brandName,
              category: item.goodsCateName,
              list: this.state.GAListParam,
              position: index,
              sku: item.goodsInfos.length && item.goodsInfos[0].goodsInfoNo
            }
          ]
        }
      }
    });
  }

  //点击商品 hubGa埋点
  hubGAProductClick(item, index) {
    const { goodsInfos } = item;
    const SKU = goodsInfos?.[0]?.goodsInfoNo || '';
    const { defaultFilterSearchForm } = this.state;
    let Filters = defaultFilterSearchForm?.attrList?.length
      ? defaultFilterSearchForm.attrList.map((item) => {
          let { attributeName = '', attributeValues = [] } = item;
          let filter = attributeValues.map((val) => `${attributeName}|${val}`);
          return filter;
        })
      : [];
    let activeFilters = flatMap(Filters);
    dataLayer.push({
      event: 'plpProductClick',
      plpProductClickItem: {
        SKU,
        activeFilters
      }
    });
  }

  // 商品列表 埋点
  GAProductImpression(productList, totalElements, keywords) {
    const impressions = productList.map((item, index) => {
      return {
        name: item.goodsName,
        id: item.goodsNo,
        brand: item.goodsBrand ? item.goodsBrand.brandName : '',
        price: item.minMarketPrice,
        club: 'no',
        category: item.goodsCateName,
        list: this.state.GAListParam,
        position: index,
        sku: item.goodsInfos
          ? item.goodsInfos.length && item.goodsInfos[0].goodsInfoNo
          : '',
        flag: ''
      };
    });

    if (dataLayer[0] && dataLayer[0].search) {
      dataLayer[0].search.query = keywords;
      dataLayer[0].search.results = totalElements;
      dataLayer[0].search.type = 'with results';
    }

    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComProductImpression`,
      ecommerce: {
        impressions: impressions
      }
    });
  }

  // hub商品列表 埋点
  hubGAProductImpression(
    productList,
    goodsList,
    totalElements,
    keywords,
    type
  ) {
    const { sizePrefv = [], filterList = [] } = this.state;
    const filterPrefv = sizePrefv.split('|');
    const sizeAttr = filterList.filter(
      (item) => item.attributeName == 'Size'
    )?.[0]?.attributesValueList;
    let sizeFilter = [];
    for (let index = 0; index < filterPrefv.length; index++) {
      const attrName = sizeAttr?.filter(
        (item) => item.attributeDetailNameEnSplitByLine == filterPrefv[index]
      )?.[0]?.attributeDetailName;
      sizeFilter.push(attrName);
    }
    const sizeCategory = sizeFilter.join('|');
    const products = productList.map((item, index) => {
      const {
        fromPrice,
        goodsCate,
        goodsInfos,
        goodsBrand,
        goodsName,
        goodsAttributesValueRelVOAllList,
        goodsCateName
      } = item;
      const goodsNo = goodsList.filter(
        (good) => good.goodsName == goodsName
      )?.[0]?.goodsNo;
      const breed = (goodsAttributesValueRelVOAllList || [])
        .filter((attr) => attr.goodsAttributeName?.toLowerCase() == 'breeds')
        .map((item) => item.goodsAttributeValue);
      const SKU = goodsInfos?.[0]?.goodsInfoNo || '';
      const specie = breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';
      const cateName = goodsCateName?.split('/');
      let productItem = {
        price: fromPrice,
        specie,
        range: cateName?.[1] || '',
        name: goodsName,
        mainItemCode: goodsNo,
        SKU,
        technology: cateName?.[2] || '',
        brand: 'Royal Canin',
        breed,
        sizeCategory
      };
      let res = filterObjectValue(productItem);
      return res;
    });

    dataLayer.push({
      products
    });

    type !== 'pageChange' &&
      dataLayer.push({
        event: 'plpScreenLoad',
        plpScreenLoad: {
          nbResults: totalElements,
          userRequest: keywords || ''
        }
      });

    if (dataLayer[0] && dataLayer[0].search) {
      dataLayer[0].search.query = keywords;
      dataLayer[0].search.results = totalElements;
      dataLayer[0].search.type = 'with results';
    }
  }

  // hubGa点击页码切换埋点
  hubGAPageChange(productList, goodsList) {
    const products = productList.map((item, index) => {
      const {
        fromPrice,
        goodsCate,
        goodsInfos,
        goodsBrand,
        goodsName,
        goodsAttributesValueRelVOAllList,
        goodsCateName
      } = item;
      const goodsNo = goodsList.filter(
        (good) => good.goodsName == goodsName
      )?.[0]?.goodsNo;
      const SKU = goodsInfos?.[0]?.goodsInfoNo || '';
      const breed = (goodsAttributesValueRelVOAllList || [])
        .filter(
          (attr) =>
            attr.goodsAttributeName &&
            attr.goodsAttributeName.toLowerCase() == 'breeds'
        )
        .map((item) => item.goodsAttributeValue);
      const specie = breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';
      const cateName = goodsCateName?.split('/');
      let productItem = {
        price: fromPrice,
        specie,
        range: cateName?.[1] || '',
        name: goodsName,
        mainItemCode: goodsNo,
        SKU,
        technology: cateName?.[2] || '',
        brand: 'Royal Canin',
        breed
      };
      let res = filterObjectValue(productItem);
      return res;
    });
    dataLayer.push({
      event: 'plpListLazyLoad',
      plpListLazyLoadSection: this.state.listLazyLoadSection,
      plpListLazyLoadProducts: products
    });
  }

  toggleFilterModal(status) {
    this.setState({ filterModalVisible: status });
  }
  async initData() {
    const { isDogPage } = this.state;
    const { pathname, search, state } = this.props.history.location;
    Promise.all([
      queryStoreCateList(),
      fetchHeaderNavigations(),
      fetchSortList(),
      fetchFilterList()
    ])
      .then((res) => {
        const routers = [...(res[0] || []), ...(res[1] || [])];
        const targetRouter = routers.filter((r) => {
          const tempArr = [
            r.cateRouter,
            r.navigationLink,
            `${r.navigationLink}?${r.keywords}`
          ];
          return (
            tempArr.includes(
              decodeURIComponent(pathname.replace(/\/$/, '') + search)
            ) || tempArr.includes(pathname.replace(/\/$/, ''))
          );
        })[0];

        let sortParam = null;
        let cateIds = [];
        let filters = cloneDeep((state && state.filters) || []);
        let breadList = [];
        const sortList = (res[2] || [])
          .sort((a, b) => a.sort - b.sort)
          .map((ele) => ({
            ...ele,
            name: ele.sortName,
            value: [ele.field, ele.id].join('|')
          }));
        if (targetRouter) {
          // 匹配sort参数
          if (targetRouter.searchSort) {
            const targetSortItem = ((res && res[2]) || []).filter(
              (e) => e.id === targetRouter.searchSort
            )[0];
            if (targetSortItem) {
              sortParam = {
                field: targetSortItem.field,
                sortType: targetSortItem.sortType,
                value: [targetSortItem.field, targetSortItem.id].join('|')
              };
            }
          }
          // sales category筛选
          const tmpCateIds = (
            targetRouter.navigationCateIds ||
            targetRouter.storeCateId + '' ||
            ''
          ).split(',');
          if (tmpCateIds.length) {
            cateIds = tmpCateIds;
          }
          // filter筛选
          try {
            if (targetRouter.filter) {
              const tmpFilter = JSON.parse(targetRouter.filter);
              if (tmpFilter.length) {
                filters = tmpFilter;
              }
            }
          } catch (err) {}
        } else {
          // this.props.history.push('/404');
        }
        // 生成面包屑
        const targetId =
          (targetRouter && targetRouter.id) ||
          (targetRouter && targetRouter.storeCateId) ||
          '';
        breadList = getParentNodesByChild({
          data: generateOptions(res[1] || []).concat(res[0] || []),
          id: targetId,
          matchIdName:
            targetRouter && targetRouter.id
              ? 'id'
              : targetRouter && targetRouter.storeCateId
              ? 'storeCateId'
              : ''
        })
          .map((e) => ({
            ...e,
            name: e.navigationName || e.cateName,
            link: e.navigationLink || e.cateRouter
          }))
          .reverse();
        // set SEO
        this.setSEO({ cateIds });

        // 解析prefn/prefv, 匹配filter, 设置默认选中值
        const prefnNum = (search.match(/prefn/gi) || []).length;
        for (let index = 0; index < prefnNum; index++) {
          const fnEle = decodeURI(getParaByName(search, `prefn${index + 1}`));
          const fvEles = decodeURI(
            getParaByName(search, `prefv${index + 1}`)
          ).split('|');
          const tItem = this.handledAttributeDetailNameEn(res[3] || []).filter(
            (r) => r.attributeName === fnEle
          )[0];
          if (tItem) {
            let attributeValues = [];
            let attributeValueIdList = [];
            Array.from(fvEles, (fvItem) => {
              const tFvItemList = tItem.attributesValueList.filter(
                (t) => t.attributeDetailNameEnSplitByLine === fvItem
              );
              const tFvItemForFirst = tFvItemList;
              let tFvItem = tFvItemForFirst;
              if (tFvItemList.length > 1) {
                tFvItem =
                  tItem.attributesValueList.filter(
                    (t) => t.attributeDetailNameEnSplitByLine === fvItem
                  ) || tFvItemForFirst;
              }

              if (tFvItem.length > 0) {
                attributeValues.push(
                  ...tFvItem.map((t) => t.attributeDetailName)
                );
                attributeValueIdList.push(...tFvItem.map((t) => t.id));
              }
              return fvItem;
            });
            filters.push(
              Object.assign(tItem, {
                attributeValues,
                attributeValueIdList
              })
            );
          }
        }

        this.setState(
          {
            sortList,
            selectedSortParam: sortParam || sortList[0] || null,
            storeCateIds: cateIds,
            defaultFilterSearchForm: {
              attrList: filters
                .filter((ele) => ele.filterType === '0')
                .map((ele) => {
                  const { filterType, ...param } = ele;
                  return param;
                }),
              filterList: filters
                .filter((ele) => ele.filterType === '1')
                .map((ele) => {
                  const { filterType, ...param } = ele;
                  return param;
                })
            },
            titleData: {
              title:
                (targetRouter && targetRouter.pageTitle) ||
                (targetRouter && targetRouter.cateTitle),
              description:
                (targetRouter && targetRouter.pageDesc) ||
                (targetRouter && targetRouter.cateDescription),
              img:
                (targetRouter && targetRouter.pageImg) ||
                (targetRouter && targetRouter.cateImgForList)
            },
            breadList
          },
          () => {
            this.getProductList();
          }
        );
      })
      .catch((err) => {
        console.log(err);
        this.getProductList();
        this.setSEO();
      });
  }
  setSEO({ cateIds = [] } = {}) {
    const { keywords } = this.state;
    if (keywords) {
      setSeoConfig({ pageName: 'Search Results Page' }).then((res) => {
        this.setState({
          seoConfig: res,
          breadList: [{ name: this.props.intl.messages.searchShow }]
        });
      });
    } else if (cateIds && cateIds.length) {
      setSeoConfig({
        categoryId: cateIds[0],
        pageName: 'Product List Page'
      }).then((res) => {
        this.setState({ seoConfig: res });
      });
    } else {
      setSeoConfig({ pageName: 'Product List Page' }).then((res) => {
        this.setState({ seoConfig: res });
      });
    }
  }
  // 处理产品列表返回的filter list，
  // 1 排序
  // 2 根据默认参数设置filter select 状态
  // 3 拼接router参数，用于点击filter时，跳转链接用
  handleFilterResData(res, customFilter) {
    const { baseSearchStr } = this.state;
    const { pathname, search } = this.props.history.location;
    let tmpList = res
      .filter((ele) => +ele.filterStatus)
      .sort((a) => (a.filterType === '0' ? -1 : 1))
      .sort((a, b) => (a.filterType === '0' ? a.sort - b.sort : 1))
      .sort((a) =>
        a.filterType === '1' && a.attributeName === 'markPrice' ? -1 : 1
      );
    let filterList = tmpList.concat(customFilter);

    // isVetProducts 过滤掉'breeds' 'Sterilized' 改成storeportal配置
    // const vetFilterList = filterList.filter(
    //   (item) =>
    //     item.attributeName !== 'breeds' && item.attributeName !== 'Sterilized'
    // );
    // 非isVetProducts 过滤掉'Size'
    // const sptFilterList = filterList.filter(
    //   (item) => item.attributeName !== 'Size'
    // );
    // 根据默认参数设置filter状态
    const { defaultFilterSearchForm } = this.state;
    this.initFilterSelectedSts({
      seletedValList: defaultFilterSearchForm.attrList,
      orginData: tmpList,
      filterType: '0',
      pIdName: 'attributeId',
      orginChildListName: 'attributesValueList'
    });
    this.initFilterSelectedSts({
      seletedValList: defaultFilterSearchForm.filterList,
      orginData: tmpList,
      filterType: '1',
      pIdName: 'id',
      orginChildListName: 'storeGoodsFilterValueVOList'
    });
    let prefnParamListFromSearch = [];
    const prefnNum = (search.match(/prefn/gi) || []).length;
    for (let index = 0; index < prefnNum; index++) {
      const fnEle = decodeURI(getParaByName(search, `prefn${index + 1}`));
      const fvEles = decodeURI(
        getParaByName(search, `prefv${index + 1}`)
      ).split('|');
      prefnParamListFromSearch.push({ prefn: fnEle, prefvs: fvEles });
    }

    // 处理每个filter的router(处理url prefn/state)
    // Array.from(tmpList, (pEle) => {
    //   Array.from(pEle.attributesValueList, (cEle) => {
    //     let hasRouter = true;
    //     let filters = cloneDeep((state && state.filters) || []);
    //     let prefnParamList = cloneDeep(prefnParamListFromSearch);

    //     // 该子节点是否存在于prefn中
    //     const targetPIdxForPrefn = prefnParamList.findIndex(
    //       (p) => p.prefn === pEle.attributeName
    //     );
    //     const targetPItemForPrefn = prefnParamList[targetPIdxForPrefn];
    //     // 该子节点是否存在于state.filters中
    //     const targetPIdxForState = filters.findIndex(
    //       (p) => p.attributeId === pEle.attributeId
    //     );
    //     const targetPItemForState = filters[targetPIdxForState];
    //     if (cEle.selected) {
    //       // 该子节点被选中，
    //       // 1.1 若存在于链接中，则从链接中移除
    //       // 1.2 若存在于state中，则从state中移除
    //       // 2 若移除后，子节点为空了，则移除该父节点
    //       let idx;
    //       if (targetPItemForPrefn) {
    //         idx = targetPItemForPrefn.prefvs.findIndex(
    //           (p) => p === cEle.attributeDetailNameEn
    //         );
    //         targetPItemForPrefn.prefvs.splice(idx, 1);
    //         if (!targetPItemForPrefn.prefvs.length) {
    //           prefnParamList.splice(targetPIdxForPrefn, 1);
    //         }
    //       } else if (targetPItemForState) {
    //         idx = targetPItemForState.attributeValueIdList.findIndex(
    //           (p) => p === cEle.id
    //         );
    //         targetPItemForState.attributeValueIdList.splice(idx, 1);
    //         targetPItemForState.attributeValues.splice(idx, 1);
    //         if (!targetPItemForState.attributeValueIdList.length) {
    //           filters.splice(targetPIdxForState, 1);
    //         }
    //       }
    //     } else {
    //       // 该子节点未被选中，在链接中新增prefn/新增state
    //       // 1 该父节点存在于链接中，
    //       // 1-1 该子节点为多选，找出并拼接上该子节点
    //       // 2-1 该子节点为单选，原子节点值全部替换为当前子节点
    //       // 2 该父节点不存在于链接中，直接新增

    //       if (targetPItemForPrefn) {
    //         if (pEle.choiceStatus === 'Single choice') {
    //           targetPItemForPrefn.prefvs = [cEle.attributeDetailNameEn];
    //         } else {
    //           targetPItemForPrefn.prefvs.push(cEle.attributeDetailNameEn);
    //         }
    //       } else if (targetPItemForState) {
    //         if (pEle.choiceStatus === 'Single choice') {
    //           targetPItemForState.attributeValueIdList = [cEle.id];
    //           targetPItemForState.attributeValues = [
    //             cEle.attributeDetailNameEn
    //           ];
    //         } else {
    //           targetPItemForState.attributeValueIdList.push(cEle.id);
    //           targetPItemForState.attributeValues.push(
    //             cEle.attributeDetailNameEn
    //           );
    //         }
    //       } else {
    //         // 少于1级，就把参数拼接到url prefn上，否则就把参数拼接到state上
    //         if (prefnParamList.length < 1) {
    //           prefnParamList.push({
    //             prefn: pEle.attributeName,
    //             prefvs: [cEle.attributeDetailNameEn]
    //           });
    //         } else {
    //           // hasRouter = false;
    //           filters.push({
    //             attributeId: pEle.attributeId,
    //             attributeName: pEle.attributeName,
    //             attributeValueIdList: [cEle.id],
    //             attributeValues: [cEle.attributeDetailNameEn],
    //             filterType: pEle.filterType
    //           });
    //         }
    //       }
    //     }
    //     const decoParam = prefnParamList.reduce(
    //       (pre, cur) => {
    //         return {
    //           ret:
    //             pre.ret +
    //             `&prefn${pre.i}=${cur.prefn}&prefv${pre.i}=${cur.prefvs.join(
    //               '|'
    //             )}`,
    //           i: ++pre.i
    //         };
    //       },
    //       { i: 1, ret: '' }
    //     );
    //     cEle.router = hasRouter
    //       ? {
    //           pathname,
    //           search: decoParam.ret ? `?${decoParam.ret.substr(1)}` : '',
    //           state: {
    //             filters
    //           }
    //         }
    //       : null;
    //     return cEle;
    //   });
    //   return pEle;
    // });

    // 处理每个filter的router
    Array.from(tmpList, (pEle) => {
      Array.from(pEle.attributesValueList, (cEle) => {
        let prefnParamList = cloneDeep(prefnParamListFromSearch);
        const targetPIdx = prefnParamList.findIndex(
          (p) => p.prefn === pEle.attributeName
        );
        const targetPItem = prefnParamList[targetPIdx];
        if (cEle.selected) {
          // 该子节点被选中，从链接中移除
          // 1 若移除后，子节点为空了，则移除该父节点
          if (targetPItem) {
            const idx = targetPItem.prefvs.findIndex(
              (p) => p === cEle.attributeDetailNameEnSplitByLine
            );
            targetPItem.prefvs.splice(idx, 1);
            if (!targetPItem.prefvs.length) {
              prefnParamList.splice(targetPIdx, 1);
            }
          }
        } else {
          // 该子节点未被选中，在链接中新增prefn/prefv
          // 1 该父节点存在于链接中，
          // 1-1 该子节点为多选，找出并拼接上该子节点
          // 2-1 该子节点为单选，原子节点值全部替换为当前子节点
          // 2 该父节点不存在于链接中，直接新增

          if (targetPItem) {
            if (pEle.choiceStatus === 'Single choice') {
              targetPItem.prefvs = [cEle.attributeDetailNameEnSplitByLine];
            } else {
              targetPItem.prefvs.push(cEle.attributeDetailNameEnSplitByLine);
            }
          } else {
            prefnParamList.push({
              prefn: pEle.attributeName,
              prefvs: [cEle.attributeDetailNameEnSplitByLine]
            });
          }
        }
        const decoParam = prefnParamList.reduce(
          (pre, cur) => {
            return {
              ret:
                pre.ret +
                `&prefn${pre.i}=${cur.prefn}&prefv${pre.i}=${cur.prefvs.join(
                  '|'
                )}`,
              i: ++pre.i
            };
          },
          { i: 1, ret: '' }
        );
        cEle.router = {
          pathname,
          search: decoParam.ret
            ? `?${
                baseSearchStr ? `${baseSearchStr}&` : ''
              }${decoParam.ret.substr(1)}`
            : `?${baseSearchStr}`
        };
        return cEle;
      });
      return pEle;
    });
    this.setState({ filterList, initingFilter: false });
  }
  initFilterSelectedSts({
    seletedValList,
    orginData,
    filterType,
    pIdName,
    orginChildListName
  }) {
    Array.from(seletedValList, (pItem) => {
      // 所有匹配的源数据的父级数组
      const targetItem = orginData.filter(
        (t) => t.filterType === filterType && t[pIdName] === pItem.attributeId
      );
      if (targetItem.length) {
        Array.from(pItem.attributeValueIdList, (cItem) => {
          Array.from(targetItem[0][orginChildListName], (tItem) => {
            if (tItem.id === cItem) {
              tItem.selected = true;
            }
            return tItem;
          });
          return cItem;
        });
      }

      return pItem;
    });
  }
  async getProductList(type) {
    let {
      cateType,
      currentPage,
      storeCateIds,
      keywords,
      initingList,
      selectedSortParam,
      filterList,
      searchForm,
      defaultFilterSearchForm,
      actionFromFilter,
      sourceParam
    } = this.state;
    this.setState({ loading: true });

    if (!initingList) {
      const widget = document.querySelector('#J-product-list');
      if (widget) {
        setTimeout(() => {
          window.scrollTo({
            top: widget.offsetTop - 100,
            behavior: 'smooth'
          });
        }, 0);
      }
    }

    let goodsAttributesValueRelVOList = initingList
      ? [...defaultFilterSearchForm.attrList]
      : [];
    let goodsFilterRelList = initingList
      ? [...defaultFilterSearchForm.filterList]
      : [];
    // 处理filter查询值
    Array.from(filterList, (pItem) => {
      const seletedList = (
        pItem.attributesValueList ||
        pItem.storeGoodsFilterValueVOList ||
        []
      ).filter((cItem) => cItem.selected);
      if (seletedList.length) {
        // filterType: 0是属性， 1 是自定义；
        if (pItem.filterType === '0') {
          goodsAttributesValueRelVOList.push({
            attributeId: pItem.attributeId,
            attributeValueIdList: seletedList.map((s) => s.id),
            attributeValues: seletedList.map((s) => s.attributeDetailNameEn),
            attributeName: pItem.attributeName,
            filterType: pItem.filterType
          });
        } else {
          // todo:why pItem.filterType ==='1'需要这么处理？目前单选项saleable的filterType是1，因此下方的.concat(goodsFilterRelList).map找不到attributeName，attributeValues；
          goodsFilterRelList.push({
            filterId: pItem.id,
            filterValueIdList: seletedList.map((s) => s.id)
          });
        }
      }
      return pItem;
    });
    let urlPreVal = '';
    let pathname = '';
    goodsAttributesValueRelVOList
      .concat(goodsFilterRelList)
      .slice(0, 1)
      .map((item, i) => {
        urlPreVal += `${i ? '&' : ''}prefn${i + 1}=${item.attributeName}&prefv${
          i + 1
        }=${item.attributeValues.join('|')}`;
        return item;
      });

    // 点击filter，触发局部刷新或整页面刷新
    if (!initingList && actionFromFilter) {
      pathname = `${location.pathname}${urlPreVal ? `?${urlPreVal}` : ''}`;
      // history.push({
      //   pathname,
      //   state: {
      //     filters: goodsAttributesValueRelVOList.concat(goodsFilterRelList)
      //   }
      // });
    }

    // 选择subscription 和 not subscription 才置状态
    let subscriptionStatus = null;
    for (const item of goodsFilterRelList) {
      const subItems = (item.attributeValues || []).filter(
        (a) => a === 'subscription'
      );
      const notSubItems = (item.attributeValues || []).filter(
        (a) => a === 'not subscription'
      );
      if (subItems.length || notSubItems.length) {
        subscriptionStatus = subItems.length ? 1 : 0;
        break;
      }
    }

    let params = {
      cateType,
      storeId: process.env.REACT_APP_STOREID,
      cateId: this.state.cateId || '',
      pageNum: currentPage - 1,
      sortFlag: 11,
      pageSize: this.pageSize,
      keywords,
      storeCateIds:
        this.props.location.pathname == '/list/keywords' ? [] : storeCateIds, //暂时加一个判断，特定路由storeCateId为空
      goodsAttributesValueRelVOList: goodsAttributesValueRelVOList.map((el) => {
        const { attributeValues, ...otherParam } = el;
        return otherParam;
      }),
      goodsFilterRelList: goodsFilterRelList.map((el) => {
        const { attributeValues, ...otherParam } = el;
        return otherParam;
      }),
      subscriptionStatus,
      ...searchForm
    };

    if (selectedSortParam && selectedSortParam.field) {
      params = Object.assign(params, {
        esSortList: [
          {
            fieldName: selectedSortParam.field,
            type: selectedSortParam.sortType === '0' ? 'asc' : 'desc'
          }
        ]
      });
    }

    getList(params)
      .then((res) => {
        const esGoodsStoreGoodsFilterVOList = this.handledAttributeDetailNameEn(
          res.context?.esGoodsStoreGoodsFilterVOList || []
        );
        const esGoodsCustomFilterVOList =
          res.context?.esGoodsCustomFilterVOList || [];
        this.handleFilterResData(
          esGoodsStoreGoodsFilterVOList,
          esGoodsCustomFilterVOList
        );
        const esGoodsPage = res.context.esGoodsPage;
        const totalElements = esGoodsPage.totalElements;
        const keywords = this.state.keywords;
        if (esGoodsPage && esGoodsPage.content.length) {
          let goodsContent = esGoodsPage.content;
          if (res.context.goodsList) {
            goodsContent = goodsContent.map((ele) => {
              //hub商品图片下方展示的属性
              const breedsAttr = (ele.goodsAttributesValueRelVOAllList || [])
                .filter(
                  (item) => item?.goodsAttributeName?.toLowerCase() == 'breeds'
                )
                .map((t) => t.goodsAttributeValueEn);
              const breedsValueAttr = (
                ele.goodsAttributesValueRelVOAllList || []
              )
                .filter(
                  (item) => item?.goodsAttributeName?.toLowerCase() == 'breeds'
                )
                .map((t) => t.goodsAttributeValue);
              const technologyAttr = (
                ele.goodsAttributesValueRelVOAllList || []
              )
                .filter(
                  (item) =>
                    item?.goodsAttributeName?.toLowerCase() == 'technology'
                )
                .map((t) => t.goodsAttributeValueEn);
              const attrs = breedsAttr.concat(technologyAttr).join(','); //需要排序因此不能一起写；
              const breedValue = breedsValueAttr?.[0]?.split('_')?.[1];
              console.log(breedValue, 'breedValuebreedValuebreedValue===');
              const breed = breedValue
                ? breedValue.toLowerCase() === 'cat'
                  ? 'Для кошек'
                  : 'Для собак'
                : ''; //俄罗斯定制，嗐！
              const ruAttrs = [breed, ...technologyAttr];
              const technologyOrBreedsAttr =
                isHub && process.env.REACT_APP_COUNTRY === 'RU'
                  ? ruAttrs.join(',')
                  : attrs;
              const taggingVOList = (ele.taggingVOList || []).filter(
                (t) => t.displayStatus
              );

              let ret = Object.assign({}, ele, {
                // 最低marketPrice对应的划线价
                miLinePrice: ele.goodsInfos.sort(
                  (a, b) => a.marketPrice - b.marketPrice
                )[0].linePrice,
                taggingForText: taggingVOList.filter(
                  (e) => e.taggingType === 'Text' && e.showPage?.includes('PLP')
                )[0],
                taggingForImage: taggingVOList.filter(
                  (e) =>
                    e.taggingType === 'Image' && e.showPage?.includes('PLP')
                )[0],
                technologyOrBreedsAttr,
                fromPrice: ele.fromPrice,
                toPrice: ele.toPrice
              });
              const tmpItem = find(
                res.context.goodsList,
                (g) => g.goodsId === ele.id
              );
              if (tmpItem) {
                const {
                  goodsCateName,
                  goodsSubtitle,
                  goodsNewSubtitle, // 商品into介绍
                  subscriptionStatus,
                  avgEvaluate,
                  minMarketPrice,
                  goodsImg,
                  miMarketPrice,
                  goodsNo,
                  ...others
                } = tmpItem;
                ret = Object.assign(ret, {
                  goodsCateName,
                  goodsSubtitle,
                  goodsNewSubtitle,
                  subscriptionStatus,
                  avgEvaluate,
                  minMarketPrice,
                  goodsImg,
                  goodsNo
                });
              }
              return ret;
            });
          }

          if (this.state.isRetailProducts) {
            goodsContent.splice(4, 0, { productFinder: true });
          }
          const urlPrefix =
            `${window.location.origin}${process.env.REACT_APP_HOMEPAGE}`.replace(
              /\/$/,
              ''
            );
          loadJS({
            code: JSON.stringify({
              '@context': 'http://schema.org/',
              '@type': 'ItemList',
              itemListElement: goodsContent.map((g, i) => ({
                '@type': 'ListItem',
                position: (esGoodsPage.number + 1) * (i + 1),
                url: g.lowGoodsName
                  ? `${urlPrefix}/${g.lowGoodsName
                      .split(' ')
                      .join('-')
                      .replace('/', '')}-${g.goodsNo}${sourceParam}`
                  : ''
              }))
            }),
            type: 'application/ld+json'
          });
          this.setState(
            {
              productList: goodsContent,
              results: esGoodsPage.totalElements,
              currentPage: esGoodsPage.number + 1,
              totalPage: esGoodsPage.totalPages
            },
            () => {
              // plp页面初始化埋点
              this.hubGA
                ? this.hubGAProductImpression(
                    esGoodsPage.content,
                    res.context.goodsList,
                    totalElements,
                    keywords,
                    type
                  )
                : this.GAProductImpression(
                    esGoodsPage.content,
                    totalElements,
                    keywords
                  );

              // hubGa点击页码切换埋点
              this.hubGA &&
                type === 'pageChange' &&
                this.hubGAPageChange(
                  esGoodsPage.content,
                  res.context.goodsList
                );
            }
          );
        } else {
          this.setState({
            productList: [],
            results: 0
          });
        }
        this.setState({
          loading: false,
          initingList: false
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          productList: [],
          initingList: false,
          initingFilter: false
        });
      });
  }

  // 处理attributeDetailNameEn字段，处理空格为-
  handledAttributeDetailNameEn(list) {
    let tmpList = cloneDeep(list);
    Array.from(tmpList, (ele) => {
      (ele.attributesValueList || []).map((cEle) => {
        if (cEle.attributeDetailNameEn) {
          cEle.attributeDetailNameEnSplitByLine = cEle.attributeDetailNameEn
            .split(' ')
            .join('-');
        }
        return cEle;
      });
      return ele;
    });
    return tmpList;
  }

  hanldePageNumChange = ({ currentPage }) => {
    let lazyLoadSection = this.state.listLazyLoadSection + 1;
    this.setState(
      {
        currentPage,
        listLazyLoadSection: lazyLoadSection
      },
      () => this.getProductList('pageChange')
    );
  };

  hanldeItemClick(item, index) {
    this.hubGA
      ? this.hubGAProductClick(item, index)
      : this.GAProductClick(item, index);
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }

  stickyMobileRefineBar() {
    if (isMobilePhone) {
      var t = document.getElementById('refineBar').getBoundingClientRect().top;
      window.addEventListener('scroll', () => {
        var choosedVal = document.querySelector('.filter-value'); // 有选择的时候才操作
        if (window.pageYOffset + 33 >= t && choosedVal) {
          document.body.classList.add('sticky-refineBar');
          this.setState({
            isTop: true
          });
          if (document.querySelector('.rc-header')) {
            document.querySelector('.rc-header').style.display = 'none';
          }
        } else {
          document.querySelector('.rc-header').style.display = 'block';
          this.setState({
            isTop: false
          });
          document.body.classList.remove('sticky-refineBar');
        }
      });
      // window.on("scroll", function() {

      //   // $(".js-toggle-filters").addClass("rc-brand1")) : ($("body").removeClass("sticky-refineBar"),
      //   // $(".js-toggle-filters").removeClass("rc-brand1"))
      // })
    }
  }

  onSortChange = (data) => {
    // 在筛选的时候不让他刷新页面
    this.setState(
      { selectedSortParam: data, currentPage: 1, initingList: true },
      () => this.getProductList()
    );
  };
  updateOperatedFilterList = (data) => {
    // 触发点击或跳转页面事件
    this.setState(
      { filterList: data, currentPage: 1, actionFromFilter: true },
      () => {
        this.getProductList();
      }
    );
  };
  hanldePriceSliderChange = (val) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      // 防抖
      this.setState(
        {
          searchForm: Object.assign(this.state.searchForm, {
            minMarketPrice: val[0],
            maxMarketPrice: val[1]
          }),
          currentPage: 1
        },
        () => {
          this.getProductList();
        }
      );
    }, 500);
  };
  render() {
    const { breadListByDeco, lastBreadListName } = this;
    const { pageLink } = this.state;
    const {
      history,
      configStore: { maxGoodsPrice }
    } = this.props;
    const {
      results,
      productList,
      loading,
      titleData,
      sortList,
      filterList,
      initingFilter,
      filterModalVisible,
      isTop,
      markPriceAndSubscriptionLangDict,
      selectedSortParam,
      keywords,
      eEvents,
      GAListParam,
      isDogPage,
      baseSearchStr,
      allPrefv,
      prefv1,
      animalType
    } = this.state;
    console.log(allPrefv, 'allPrefvallPrefv');
    const _loadingJXS = Array(6)
      .fill(null)
      .map((item, i) => (
        <ListItemForDefault key={i}>
          <span className="mt-4">
            <Skeleton color="#f5f5f5" width="100%" height="50%" count={2} />
          </span>
        </ListItemForDefault>
      ));

    const { title, metaDescription, metaKeywords } = this.state.seoConfig;
    const titleSeo =
      title && titleData && title.replace(/{H1}/, titleData.title);
    const metaDescriptionSeo =
      metaDescription &&
      titleData &&
      metaDescription.replace(/{H1}/, titleData.title);
    const ruFilterSeoTitle = title && title.replace(/{H1}/, allPrefv);
    const ruFilterSeoDesc =
      metaDescription && metaDescription.replace(/{H1}/, allPrefv);
    const trFilterSeoTitle = prefv1 + ' ' + animalType + ' ' + titleSeo;
    const trFilterSeoDesc =
      prefv1 + ' ' + animalType + ' ' + metaDescriptionSeo;
    const filterSeoTitle =
      process.env.REACT_APP_COUNTRY === 'RU'
        ? ruFilterSeoTitle
        : trFilterSeoTitle;
    const filterSeoDesc =
      process.env.REACT_APP_COUNTRY === 'RU'
        ? ruFilterSeoDesc
        : trFilterSeoDesc;
    const filterSeoWords =
      process.env.REACT_APP_COUNTRY === 'RU' ? allPrefv : metaKeywords;
    return (
      <div>
        {this.state.event && (
          <GoogleTagManager
            additionalEvents={this.state.event}
            ecommerceEvents={eEvents}
          />
        )}
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.prefv1 ? filterSeoTitle : titleSeo}</title>
          <meta
            name="description"
            content={this.state.prefv1 ? filterSeoDesc : metaDescriptionSeo}
          />
          <meta name="keywords" content={filterSeoWords} />
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbsNavigation list={breadListByDeco.filter((b) => b)} />
          <div className="rc-md-down rc-padding-x--sm rc-padding-top--sm">
            <DistributeHubLinkOrATag href="" to="/home" className="back-link">
              <FormattedMessage id="homePage" />
            </DistributeHubLinkOrATag>
          </div>
          {titleData && titleData.title && titleData.description ? (
            <div className="rc-max-width--lg rc-padding-x--sm">
              <div className="rc-layout-container rc-three-column rc-content-h-middle d-flex flex-md-wrap flex-wrap-reverse">
                <div className="rc-column rc-double-width text-center text-md-left">
                  <div className="rc-full-width rc-padding-x--md--mobile rc-margin-bottom--lg--mobile">
                    <h1 className="rc-gamma rc-margin--none">
                      {titleData.title}
                    </h1>
                    <div className="children-nomargin rc-body">
                      <p>{titleData.description}</p>
                    </div>
                  </div>
                </div>
                <div className="rc-column">
                  <LazyLoad style={{ width: '100%' }}>
                    <img
                      src={titleData.img}
                      className="mx-auto"
                      alt="titleData image"
                    />
                  </LazyLoad>
                </div>
              </div>
            </div>
          ) : (
            <h1 style={{ display: 'none' }}>Royal canin</h1>
          )}
          <div id="J-product-list" />
          {/* <div className="search-results rc-max-width--xl pt-4 pt-sm-1"> */}
          <div
            className="search-results rc-max-width--xl pt-sm-1 rc-padding--sm--desktop position-relative"
            style={{ zIndex: 2 }}
          >
            <div className="search-nav border-bottom-0">
              {keywords ? (
                <div className="rc-padding-y--md--mobile rc-text--center">
                  <div className="rc-intro">
                    <FormattedMessage id="list.youSearchedFor" />:
                  </div>
                  <h1 className="rc-beta rc-padding-bottom--sm rc-margin-bottom--none searchText">
                    <strong>"{keywords}"</strong>
                    {results > 0 && (
                      <>
                        (
                        <FormattedMessage
                          id="results"
                          values={{ val: results }}
                        />
                        )
                      </>
                    )}
                  </h1>
                </div>
              ) : null}
            </div>
            <section className="rc-bg-colour--brand3">
              <div>
                <div
                  className="rc-layout-container rc-four-column position-relative row ml-0 mr-0"
                  id="J_filter_contaner"
                  style={{
                    zIndex: 3
                  }}
                >
                  <div
                    id="refineBar"
                    className="refine-bar refinements rc-column1 col-12 col-xl-3 ItemBoxFitSCreen pt-0 mb-0 mb-md-3 mb-md-0 pl-0 pl-md-3 pr-0"
                  >
                    <div
                      className="rc-meta rc-md-down"
                      style={{ padding: '0 1em', fontSize: '1em' }}
                    >
                      <span className="font-weight-normal">
                        {lastBreadListName}{' '}
                      </span>
                      {results > 0 && (
                        <>
                          (
                          <FormattedMessage
                            id="results"
                            values={{ val: results }}
                          />
                          )
                        </>
                      )}
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center rc-md-down list_select_choose"
                      style={{
                        padding: '0 1rem',
                        boxShadow: '0 2px 4px #f1f1f1'
                      }}
                    >
                      <span
                        style={{ marginRight: '1em' }}
                        className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0"
                      >
                        {sortList.length > 0 && (
                          <Selection
                            key={sortList.length}
                            selectedItemChange={this.onSortChange}
                            optionList={sortList}
                            selectedItemData={{
                              value:
                                (selectedSortParam &&
                                  selectedSortParam.value) ||
                                ''
                            }}
                            placeholder={<FormattedMessage id="sortBy" />}
                            customInnerStyle={{
                              paddingTop: '.7em',
                              paddingBottom: '.7em',
                              bottom: 0
                            }}
                          />
                        )}
                      </span>
                      <em
                        className={`rc-icon rc-filter--xs rc-iconography ${
                          (filterModalVisible && !isTop) ||
                          (!filterModalVisible && isTop)
                            ? 'rc-brand1'
                            : ''
                        }`}
                        data-filter-trigger="filter-example"
                        style={{ position: 'relative', top: '0.4rem' }}
                        onClick={this.toggleFilterModal.bind(
                          this,
                          !filterModalVisible
                        )}
                      />
                      {/* <button
                        className="rc-btn rc-btn--icon-label rc-icon rc-filter--xs rc-iconography FilterFitScreen"
                        data-filter-trigger="filter-example"
                        onClick={this.toggleFilterModal.bind(this, true)}
                      /> */}
                    </div>
                    <aside
                      className={`rc-filters ${
                        filterModalVisible ? 'active' : ''
                      }`}
                    >
                      {isMobilePhone ? (
                        <Filters
                          history={history}
                          maxGoodsPrice={maxGoodsPrice}
                          initing={initingFilter}
                          onToggleFilterModal={this.toggleFilterModal}
                          filterList={filterList}
                          key={`2-${filterList.length}`}
                          inputLabelKey={2}
                          updateParentData={this.updateOperatedFilterList}
                          hanldePriceSliderChange={this.hanldePriceSliderChange}
                          markPriceAndSubscriptionLangDict={
                            markPriceAndSubscriptionLangDict
                          }
                          baseSearchStr={baseSearchStr}
                        />
                      ) : (
                        <FiltersPC
                          history={history}
                          maxGoodsPrice={maxGoodsPrice}
                          initing={initingFilter}
                          onToggleFilterModal={this.toggleFilterModal}
                          filterList={filterList}
                          key={`2-${filterList.length}`}
                          inputLabelKey={2}
                          updateParentData={this.updateOperatedFilterList}
                          hanldePriceSliderChange={this.hanldePriceSliderChange}
                          markPriceAndSubscriptionLangDict={
                            markPriceAndSubscriptionLangDict
                          }
                          baseSearchStr={baseSearchStr}
                        />
                      )}
                      {/* 由于么数据暂时隐藏注释 */}
                      {/* {this.state.showSmartFeeder ? (
                        <div className="smart-feeder-container">
                          <p>Abonnement au distributeur connecté</p>
                          <p>
                            Un abonnement à l'alimentation de votre animal de
                            compagnie couplé à un distributeur intelligent
                          </p>
                          <a
                            href="https://www.royalcanin.com/fr/shop/smart-feeder-subscription"
                            className="rc-btn rc-btn--sm rc-btn--two rc-margin-left--xs"
                            style={{ minWidth: '110px' }}
                          >
                            Voir l'offre
                          </a>
                          <img src={smartFeeder} />
                        </div>
                      ) : null} */}
                    </aside>
                  </div>
                  <div
                    className={`rc-column1 col-12 col-xl-9 rc-triple-width rc-padding--xs product-tiles-container pt-4 pt-md-0`}
                  >
                    {!loading && (
                      <>
                        <div className="row pl-1 rc-md-up align-items-center">
                          <div className="col-12 col-md-8 pt-3 pb-2">
                            <span className="rc-intro rc-margin--none">
                              <span className="medium text-capitalize">
                                {lastBreadListName}
                              </span>
                              (
                              <FormattedMessage
                                id="results"
                                values={{ val: results }}
                              />
                              )
                            </span>
                          </div>

                          <div className="col-12 col-md-4">
                            <span
                              style={{ position: 'relative', top: '2px' }}
                              className="rc-select page-list-center-arrow rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0n"
                            >
                              {sortList.length > 0 && (
                                <Selection
                                  key={sortList.length}
                                  selectedItemChange={this.onSortChange}
                                  optionList={sortList}
                                  selectedItemData={{
                                    value:
                                      (selectedSortParam &&
                                        selectedSortParam.value) ||
                                      ''
                                  }}
                                  // placeholder={<FormattedMessage id="sortBy" />}
                                  customInnerStyle={{
                                    paddingTop: '.7em',
                                    paddingBottom: '.7em'
                                  }}
                                />
                              )}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    {!productList.length ? (
                      <div className="row">
                        <div className="col-12">
                          <div className="ui-font-nothing rc-md-up">
                            <em className="rc-icon rc-incompatible--sm rc-iconography" />
                            <FormattedMessage id="list.errMsg" />
                          </div>
                          <div className="ui-font-nothing rc-md-down d-flex pb-4">
                            <em className="rc-icon rc-incompatible--xs rc-iconography" />
                            <FormattedMessage id="list.errMsg" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rc-column rc-triple-width rc-padding--none--mobile product-tiles-container pt-0">
                        <article className="rc-layout-container rc-three-column rc-layout-grid rc-match-heights product-tiles">
                          {loading
                            ? _loadingJXS
                            : productList.map((item, i) =>
                                process.env.REACT_APP_PLP_STYLE ===
                                  'layout-global' && isMobilePhone ? (
                                  <ListItemH5ForGlobalStyle
                                    sourceParam={this.state.sourceParam}
                                    isDogPage={isDogPage}
                                    key={item.id}
                                    leftPromotionJSX={
                                      item.taggingForText ? (
                                        <div
                                          className="product-item-flag-text fr-label"
                                          style={{
                                            backgroundColor:
                                              item.taggingForText
                                                .taggingFillColor,
                                            color:
                                              item.taggingForText
                                                .taggingFontColor
                                          }}
                                        >
                                          {item.taggingForText.taggingName}
                                        </div>
                                      ) : null
                                    }
                                    rightPromotionJSX={
                                      item.taggingForImage ? (
                                        <div className="product-item-flag-image position-absolute">
                                          <img
                                            style={{
                                              width: 'inherit',
                                              height: 'inherit'
                                            }}
                                            src={
                                              item.taggingForImage.taggingImgUrl
                                            }
                                            alt="product list taggingForImage"
                                          />
                                        </div>
                                      ) : null
                                    }
                                    onClick={this.hanldeItemClick.bind(
                                      this,
                                      item,
                                      i
                                    )}
                                    item={item}
                                    GAListParam={GAListParam}
                                    breadListByDeco={breadListByDeco}
                                  >
                                    <ListItemBodyH5ForGlobalStyle item={item} />
                                  </ListItemH5ForGlobalStyle>
                                ) : (
                                  <ListItemForDefault
                                    sourceParam={this.state.sourceParam}
                                    key={item.id}
                                    isDogPage={isDogPage}
                                    leftPromotionJSX={
                                      item.taggingForText ? (
                                        <div
                                          className="product-item-flag-text"
                                          style={{
                                            backgroundColor:
                                              item.taggingForText
                                                .taggingFillColor,
                                            color:
                                              item.taggingForText
                                                .taggingFontColor
                                          }}
                                        >
                                          {item.taggingForText.taggingName}
                                        </div>
                                      ) : null
                                    }
                                    rightPromotionJSX={
                                      item.taggingForImage ? (
                                        <div className="product-item-flag-image position-absolute">
                                          <img
                                            src={
                                              item.taggingForImage.taggingImgUrl
                                            }
                                            alt="product list taggingForImage"
                                          />
                                        </div>
                                      ) : null
                                    }
                                    onClick={this.hanldeItemClick.bind(
                                      this,
                                      item,
                                      i
                                    )}
                                    item={item}
                                    GAListParam={GAListParam}
                                    breadListByDeco={breadListByDeco}
                                  >
                                    <ListItemBody
                                      item={item}
                                      headingTag={
                                        this.state.seoConfig.headingTag
                                      }
                                    />
                                  </ListItemForDefault>
                                )
                              )}
                        </article>
                        <div
                          className="grid-footer rc-full-width"
                          style={{ marginTop: '0.5rem' }}
                        >
                          <Pagination
                            loading={this.state.loading}
                            defaultCurrentPage={this.state.currentPage}
                            key={this.state.currentPage}
                            totalPage={this.state.totalPage}
                            onPageNumChange={this.hanldePageNumChange}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <ProductFinderAd {...this.state} />
          </div>
          {process.env.REACT_APP_COUNTRY == 'DE' ? (
            <div className="notate ml-2 mb-2">
              <FormattedMessage
                id="notate"
                values={{
                  val: (
                    <Link
                      className="rc-styled-link"
                      to={{
                        pathname: '/faq',
                        state: {
                          catogery: 'catogery-1'
                        }
                      }}
                    >
                      Versandkosten
                    </Link>
                  )
                }}
                defaultMessage={' '}
              />
            </div>
          ) : null}

          <Footer />
        </main>
      </div>
    );
  }
}

export default List;
