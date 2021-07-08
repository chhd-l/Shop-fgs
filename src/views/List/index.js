import React from 'react';
import Skeleton from 'react-skeleton-loader';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import GoogleTagManager from '@/components/GoogleTagManager';
import PLPCover from '@/components/PLPCover';
import BannerTip from '@/components/BannerTip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbsNavigation from '@/components/BreadCrumbsNavigation';
import Pagination from '@/components/Pagination';
import Selection from '@/components/Selection';
import { Filters, FiltersPC } from './modules';
import cloneDeep from 'lodash/cloneDeep';
import flatMap from 'lodash/flatMap';
import { IMG_DEFAULT } from '@/utils/constant';
import { Helmet } from 'react-helmet';
import { getList } from '@/api/list';
import ruFilterMap from './ruFilterMap.json';
import {
  fetchHeaderNavigations,
  fetchFilterList,
  fetchSortList,
  queryStoreCateList,
  generateOptions,
  getParentNodesByChild,
  getDictionary,
  setSeoConfig,
  getDeviceType,
  loadJS,
  filterObjectValue
} from '@/utils/utils';
import { removeArgFromUrl, funcUrl, transferToObject } from '@/lib/url-utils';
import { getSpecies } from '@/utils/GA';
import bottomDescJson from './bottomDesc.json';
import getTechnologyOrBreedsAttr from '@/lib/get-technology-or-breedsAttr';
import './index.less';

import pfRecoImg from '@/assets/images/product-finder-recomend.jpg';

const isHub = window.__.env.REACT_APP_HUB == '1';
const isMobilePhone = getDeviceType() === 'H5';
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const retailDog =
  'https://cdn.royalcanin-weshare-online.io/zWkqHWsBG95Xk-RBIfhn/v1/bd13h-hub-golden-retriever-adult-black-and-white?w=1280&auto=compress&fm=jpg';
const urlPrefix = `${window.location.origin}${window.__.env.REACT_APP_HOMEPAGE}`.replace(
  /\/$/,
  ''
);

const filterAttrValue = (list, keyWords) => {
  return (list || [])
    .filter((attr) => attr?.goodsAttributeName?.toLowerCase() == keyWords)
    .map((item) => item?.goodsAttributeValue);
};

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
                          : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/product-finder/product-finder-recomend-retail-cat-find@2x.jpeg`
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

function ProductFinderAd({ isRetailProducts, isVetProducts, isDogPage }) {
  // 当前种类，spt和retail类型相互链接
  // 如: current is the dog spt, then the bottom desc link to the dog retail
  // 如: current is the dog retail, then the bottom desc link to the dog spt
  const key = `${isDogPage ? 'dog' : 'cat'}-${
    isRetailProducts ? 'vet' : 'retail'
  }`;
  const descObj = bottomDescJson[key];
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
          {descObj ? (
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <LazyLoad style={{ width: '100%', height: '100%' }}>
                  <img
                    style={{ width: '100%' }}
                    src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img${descObj.img}`}
                    alt={descObj.alt}
                  />
                </LazyLoad>
              </div>
              <div className="col-12 col-md-6">
                <p
                  className="rc-gamma rc-padding--none"
                  style={{ fontSize: '2em', fontWight: 'border' }}
                >
                  {descObj.title}
                </p>
                <p>{descObj.desc}</p>
                <Link to={descObj.link} className="rc-btn rc-btn--two">
                  <FormattedMessage id="plp.retail.cat.button" />
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      )
    }[window.__.env.REACT_APP_COUNTRY] || null
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
      canonicalLink: { cur: '', prev: '', next: '' },
      listLazyLoadSection: 1,
      prefv1: '',
      keywordsSearch: '',
      baseSearchStr: ''
    };
    this.pageSize = isRetailProducts ? 8 : 12;
    this.hanldeItemClick = this.hanldeItemClick.bind(this);
    this.toggleFilterModal = this.toggleFilterModal.bind(this);
    this.hubGA = window.__.env.REACT_APP_HUB_GA == '1';
    this.showSmartFeeder = isDog && this.hubGA;
  }
  componentDidMount() {
    const { state, search, pathname } = this.props.history.location;
    const cateId = funcUrl({ name: 'cateId' });
    const utm_source = funcUrl({ name: 'utm_source' }); //有这个属性，表示是breeder商品，breeder商品才需要把search赋值给sourceParam
    if (utm_source) {
      this.setState({
        sourceParam: search
      });
    }
    const { category, keywords } = this.props.match.params;
    const keywordsSearch = decodeURI(funcUrl({ name: 'q' }) || '');
    if (
      keywordsSearch &&
      window.dataLayer &&
      window.dataLayer[0] &&
      window.dataLayer[0].page &&
      window.dataLayer[0].page.type
    ) {
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
        keywordsSearch,
        currentPage: Number(funcUrl({ name: 'p' })) || 1
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

    // 除开prefn以外的其他参数
    const baseSearchStr = this.removePrefnFromSearch();
    // 点击filter，一律重置页码
    this.setState({
      baseSearchStr: removeArgFromUrl({
        search: baseSearchStr,
        name: 'p'
      })
    });

    const prefnNum = (search.match(/prefn/gi) || []).length;

    // ru filter seo 定制化 ==
    let lifestagesPrefv = [],
      sterilizedPrefv = [],
      technologyPrefv = [],
      breedsPrefv = [],
      sizePrefvSeo = [];
    let sizePrefv = []; //用于ga filter 传参size
    for (let index = 0; index < prefnNum; index++) {
      const fnEle = decodeURI(funcUrl({ name: `prefn${index + 1}` }) || '');
      const fvEles = decodeURI(funcUrl({ name: `prefv${index + 1}` }) || '');
      ruFilterMap.attributesList.map((item) => {
        if (item.attributeName == fnEle) {
          if (fvEles.includes('|')) {
            if (fnEle == 'Lifestages') {
              this.state.isDogPage
                ? lifestagesPrefv.push(item.dogMultiSelection)
                : lifestagesPrefv.push(item.catMultiSelection);
            }
            fnEle == 'Breeds' && breedsPrefv.push(item.multiSelection);
            if (fnEle == 'Size') {
              //XSmall + Mini  and  Maxi + Giant 特殊处理传值
              if (
                [
                  'Миниатюрные-(до-4-кг)|Мелкие-(5-10-кг)',
                  'Мелкие-(5-10-кг)|Миниатюрные-(до-4-кг)'
                ].includes(fvEles)
              ) {
                sizePrefvSeo.push('мелких размеров');
              } else if (
                [
                  'Крупные-(26-44--кг)|Очень-крупные--(более-45-кг)',
                  'Очень-крупные--(более-45-кг)|Крупные-(26-44--кг)'
                ].includes(fvEles)
              ) {
                sizePrefvSeo.push('крупных размеров');
              } else {
                sizePrefvSeo.push(item.multiSelection);
              }
            }
          } else {
            const attrNameEn = item.attributesValuesVOList.find(
              (item) => item.attributeDetailNameEn == fvEles
            )?.attributeDetailNameSeoEn;
            if (fnEle == 'Lifestages') {
              let attr = attrNameEn;
              if (
                this.state.isDogPage &&
                ['Взрослая', 'Стареющая', 'Пожилая'].includes(fvEles)
              ) {
                attr = attrNameEn.replace('кошек', 'собак');
              }
              lifestagesPrefv.push(attr);
            }
            fnEle == 'Sterilized' && sterilizedPrefv.push(attrNameEn);
            fnEle == 'Technology' && technologyPrefv.push(attrNameEn);
            fnEle == 'Breeds' && breedsPrefv.push(attrNameEn);
            fnEle == 'Size' && sizePrefvSeo.push(attrNameEn);
          }
        }
      });

      if (fnEle == 'Size') {
        sizePrefv.push(fvEles);
      }
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
      ...sizePrefvSeo,
      ...breedsPrefv,
      ...sterilizedPrefv
    ]?.join(' '); //要排序，因此这样写的==
    const prefv1 = decodeURI(funcUrl({ name: 'prefv1' }) || '');
    const animalType = this.state.isDogPage ? 'dog' : 'cat';

    this.setState({
      prefv1,
      animalType,
      sizePrefv: sizePrefv.join(' '),
      allPrefv
    });
  }

  // canonical link logic
  // 1. 去除prefn multi
  // 2. 需要取值绝对地址
  // 3. 使用generatePageLink方法生成当前页/上一页/下一页
  handleCanonicalLink() {
    const { currentPage } = this.state;
    const curLink = this.generatePageLink(currentPage);
    const prevLink = this.generatePageLink(currentPage - 1);
    const nextLink = this.generatePageLink(currentPage + 1);
    const cur = curLink
      ? h(
          this.removePrefnMultiFromSearch({
            search: curLink.search
          })
        )
      : '';
    const prev = prevLink
      ? h(
          this.removePrefnMultiFromSearch({
            search: prevLink.search
          })
        )
      : '';
    const next = nextLink
      ? h(
          this.removePrefnMultiFromSearch({
            search: nextLink.search
          })
        )
      : '';

    function h(curSearch) {
      return `${window.location.origin}${window.location.pathname}${
        curSearch ? `?${curSearch}` : ''
      }`;
    }

    this.setState({
      canonicalLink: Object.assign(this.state.canonicalLink, {
        cur,
        prev,
        next
      })
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
  /**
   * 移除以prefn或prefv开头的查询参数
   * @returns {string}
   */
  removePrefnFromSearch() {
    const allSearchParam = transferToObject();
    let ret = funcUrl();
    for (const key in allSearchParam) {
      if (/^prefn/.test(key) || /^prefv/.test(key)) {
        ret = removeArgFromUrl({ search: ret, name: key });
      }
    }
    return ret;
  }
  /**
   * remove prefn[2-9|0], only remain prefn1, remove prefv[2-9|0], only remain prefv1
   * @param {string} param0 需要处理的search参数
   * @returns {string} 处理后的search字符串，eg:'a=1&b=2&c=3'
   */
  removePrefnMultiFromSearch({ search = '' } = {}) {
    let ret = search;
    const allSearchParam = transferToObject({ search });
    for (const key in allSearchParam) {
      if (/^prefn[2-9|0]/.test(key) || /^prefv[2-9|0]/.test(key)) {
        ret = removeArgFromUrl({ search: ret, name: key });
      }
    }
    return ret.replace(/^\?/gi, '');
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
  get prevPageLink() {
    return this.generatePageLink(this.state.currentPage - 1);
  }
  get nextPageLink() {
    return this.generatePageLink(this.state.currentPage + 1);
  }
  /**
   * 根据传入的页码，生成link参数
   * @param {number} page 页码
   * @returns {object} {pathname, search} | null
   */
  generatePageLink(page) {
    const {
      location: { pathname, search }
    } = this.props;
    let param;
    let ret = { pathname };
    // 超过页码范围
    if (page < 1 || page > this.state.totalPage) {
      return null;
    }
    if (page > 1) {
      // 如果存在p参数，则替换，否则新增
      param = funcUrl({ name: 'p', value: page, type: 1 });
    } else {
      // 第一页总是移除p参数
      param = removeArgFromUrl({ search: search.substr(1), name: 'p' });
    }

    if (param) {
      ret = Object.assign(ret, {
        search: `?${param}`
      });
    }

    return ret;
  }
  //点击商品 埋点
  GAProductClick(item, index) {
    dataLayer.push({
      event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComProductClick`,
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
      event: `${window.__.env.REACT_APP_GTM_SITE_ID}eComProductImpression`,
      ecommerce: {
        impressions: impressions
      }
    });
  }

  // hub商品列表 埋点
  hubGAProductImpression(productList, totalElements, keywords, type) {
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
        goodsNo,
        goodsName,
        goodsAttributesValueRelVOAllList,
        goodsCateName,
        goodsImg
      } = item;
      const breed = filterAttrValue(goodsAttributesValueRelVOAllList, 'breeds');
      // const spezies = filterAttrValue(
      //   goodsAttributesValueRelVOAllList,
      //   'spezies'
      // );
      const specie = filterAttrValue(
        goodsAttributesValueRelVOAllList,
        'species'
      ).toString();
      const range = filterAttrValue(
        goodsAttributesValueRelVOAllList,
        'range'
      ).toString();
      const technology = filterAttrValue(
        goodsAttributesValueRelVOAllList,
        'technology'
      ).toString();
      const SKU = goodsInfos?.[0]?.goodsInfoNo || '';
      // const specie = breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';//这个方法有时候数据没有breed，判断不了
      // const deSpecie = spezies.includes('Hund') ? 'Dog' : 'Cat'; //德国用来判断是猫咪还是狗狗
      let productItem = {
        price: fromPrice,
        specie,
        range,
        name: goodsName,
        mainItemCode: goodsNo,
        SKU,
        technology,
        brand: 'Royal Canin',
        breed,
        sizeCategory,
        imageURL: goodsImg
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
  hubGAPageChange(productList) {
    const products = productList.map((item, index) => {
      const {
        fromPrice,
        goodsCate,
        goodsInfos,
        goodsBrand,
        goodsName,
        goodsAttributesValueRelVOAllList,
        goodsCateName,
        goodsNo,
        goodsImg
      } = item;
      const SKU = goodsInfos?.[0]?.goodsInfoNo || '';
      const breed = filterAttrValue(goodsAttributesValueRelVOAllList, 'breeds');
      // const spezies = filterAttrValue(
      //   goodsAttributesValueRelVOAllList,
      //   'spezies'
      // );
      const specie = filterAttrValue(
        goodsAttributesValueRelVOAllList,
        'species'
      ).toString();
      const range = filterAttrValue(
        goodsAttributesValueRelVOAllList,
        'range'
      ).toString();
      const technology = filterAttrValue(
        goodsAttributesValueRelVOAllList,
        'technology'
      ).toString();
      // const specie = breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';
      // const deSpecie = spezies.includes('Hund') ? 'Dog' : 'Cat'; //德国用来判断是猫咪还是狗狗

      let productItem = {
        price: fromPrice,
        specie,
        range,
        name: goodsName,
        mainItemCode: goodsNo,
        SKU,
        technology,
        brand: 'Royal Canin',
        breed,
        imageURL: goodsImg
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
          const fnEle = decodeURI(funcUrl({ name: `prefn${index + 1}` }));
          const fvEles = decodeURI(
            funcUrl({ name: `prefv${index + 1}` }) || ''
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

    // isVetProducts 暂时又要手动过滤掉'breeds'
    const vetFilterList = filterList.filter(
      (item) => item?.attributeName?.toLowerCase() !== 'breeds'
    );
    // 非isVetProducts 过滤掉'Size'
    // const sptFilterList = filterList.filter(
    //   (item) => item.attributeName !== 'Size'
    // );
    const allFilterList = this.state.isVetProducts ? vetFilterList : filterList;
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
      const fnEle = decodeURI(funcUrl({ name: `prefn${index + 1}` }) || '');
      const fvEles = decodeURI(
        funcUrl({ name: `prefv${index + 1}` }) || ''
      ).split('|');
      prefnParamListFromSearch.push({ prefn: fnEle, prefvs: fvEles });
    }

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

        const search = decoParam.ret
          ? `?${baseSearchStr ? `${baseSearchStr}&` : ''}${decoParam.ret.substr(
              1
            )}`
          : `?${baseSearchStr}`;
        cEle.router = {
          pathname,
          // 点击filter，都重置为第一页，删除p查询参数
          search: `?${removeArgFromUrl({
            search: search.substr(1),
            name: 'p'
          })}`
        };
        return cEle;
      });
      return pEle;
    });
    this.setState({ filterList: allFilterList, initingFilter: false });
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
      storeId: window.__.env.REACT_APP_STOREID,
      cateId: this.state.cateId || '',
      pageNum: currentPage - 1,
      sortFlag: 11,
      pageSize: this.pageSize,
      keywords,
      storeCateIds,
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
          goodsContent = goodsContent.map((ele) => {
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
                (e) => e.taggingType === 'Image' && e.showPage?.includes('PLP')
              )[0],
              technologyOrBreedsAttr: getTechnologyOrBreedsAttr(ele),
              fromPrice: ele.fromPrice,
              toPrice: ele.toPrice
            });
            return ret;
          });

          if (this.state.isRetailProducts) {
            goodsContent.splice(4, 0, { productFinder: true });
          }
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
              this.handleCanonicalLink();
              // plp页面初始化埋点
              this.hubGA
                ? this.hubGAProductImpression(
                    esGoodsPage.content,
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
                this.hubGAPageChange(esGoodsPage.content);
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
    this.props.history.push(this.generatePageLink(currentPage));
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
      {
        selectedSortParam: data,
        // currentPage: 1,
        initingList: true
      },
      () => this.getProductList()
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
    const { canonicalLink } = this.state;
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
    const h1Title =
      window.__.env.REACT_APP_COUNTRY === 'ru'
        ? titleData?.title?.toLowerCase()
        : titleData?.title;
    const titleSeo = title && titleData && title.replace(/{H1}/, h1Title);
    const metaDescriptionSeo =
      metaDescription && titleData && metaDescription.replace(/{H1}/, h1Title);
    const ruFilterSeoTitle = title && title.replace(/{H1}/, allPrefv);
    const ruFilterSeoDesc =
      metaDescription && metaDescription.replace(/{H1}/, allPrefv);
    const trFilterSeoTitle = prefv1 + ' ' + animalType + ' ' + titleSeo;
    const trFilterSeoDesc =
      prefv1 + ' ' + animalType + ' ' + metaDescriptionSeo;
    const filterSeoTitle =
      window.__.env.REACT_APP_COUNTRY === 'ru'
        ? ruFilterSeoTitle
        : trFilterSeoTitle;
    const filterSeoDesc =
      window.__.env.REACT_APP_COUNTRY === 'ru'
        ? ruFilterSeoDesc
        : trFilterSeoDesc;
    const filterSeoWords =
      window.__.env.REACT_APP_COUNTRY === 'ru' ? allPrefv : metaKeywords;
    return (
      <div>
        {this.state.event && (
          <GoogleTagManager
            additionalEvents={this.state.event}
            ecommerceEvents={eEvents}
          />
        )}
        <Helmet>
          <link rel="canonical" href={canonicalLink.cur} />
          {canonicalLink.prev ? (
            <link rel="prev" href={canonicalLink.prev} />
          ) : null}
          {canonicalLink.next ? (
            <link rel="next" href={canonicalLink.next} />
          ) : null}

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
                    <strong>"{keywords}"</strong>&nbsp;
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
                        {lastBreadListName}&nbsp;
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
                        <div className="row rc-md-up align-items-center pl-2 pr-2">
                          <div className="col-12 col-md-8 pt-3 pb-2">
                            <span className="rc-intro rc-margin--none">
                              <span className="medium text-capitalize">
                                {lastBreadListName}&nbsp;
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
                            : productList.map((item, i) => {
                                return (
                                  <div
                                    className={`${
                                      window.__.env.REACT_APP_PLP_STYLE ===
                                      'layout-global'
                                        ? 'col-12 pr-0 pl-md-2 pr-md-2'
                                        : 'col-6 pl-2 pr-2'
                                    } col-md-4 mb-3 pl-0 BoxFitMonileScreen`}
                                  >
                                    <PLPCover
                                      item={item}
                                      key={item.id}
                                      isDogPage={isDogPage}
                                      sourceParam={this.state.sourceParam}
                                      GAListParam={GAListParam}
                                      breadListByDeco={breadListByDeco}
                                      headingTag={
                                        this.state.seoConfig.headingTag
                                      }
                                      onClick={this.hanldeItemClick.bind(
                                        this,
                                        item,
                                        i
                                      )}
                                    />
                                  </div>
                                );
                              })}
                        </article>
                        <div
                          className="grid-footer rc-full-width"
                          style={{ marginTop: '0.5rem' }}
                          data-tms="Pagination"
                        >
                          <Pagination
                            loading={this.state.loading}
                            defaultCurrentPage={this.state.currentPage}
                            key={this.state.currentPage}
                            totalPage={this.state.totalPage}
                            onPageNumChange={this.hanldePageNumChange}
                            prevPageLink={this.prevPageLink}
                            nextPageLink={this.nextPageLink}
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
          {window.__.env.REACT_APP_COUNTRY == 'de' ? (
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
