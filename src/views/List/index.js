import React from 'react';
import Skeleton from 'react-skeleton-loader';
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
  getDictionary,
  setSeoConfig,
  getDeviceType
} from '@/utils/utils';
import './index.less';

import pfRecoImg from '@/assets/images/product-finder-recomend.jpg';
let isMobile = getDeviceType() === 'H5';
const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

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
function ListItem(props) {
  const { item, GAListParam } = props;
  return (
    <div className="rc-column rc-column-pad fr-mobile-product">
      <article
        className="rc-card rc-card--b rc-padding--sm--mobile rc-padding--xs--desktop rc-padding-x--xs h-100 priceRangeFormat product-tiles-container fr-mobile overflow-hidden"
        style={{ minHeight: '120px' }}
      >
        {props.leftPromotionJSX}
        {props.rightPromotionJSX}
        <div className="h-100">
          {/* <a className="ui-cursor-pointer" onClick={props.onClick}> */}
          {/* <Link className="ui-cursor-pointer" to={item? `/${item.lowGoodsName.split(' ').join('-')}-${item.goodsNo}`: ''} onClick={props.onClick}> */}
          <Link
            className="ui-cursor-pointer"
            to={{
              pathname: item
                ? `/${item.lowGoodsName.split(' ').join('-').replace('/', '')}-${item.goodsNo}`
                : '',
              state: {
                GAListParam
              }
            }}
            onClick={props.onClick}
          >
            <article className="rc-card--a rc-text--center text-center">
              {item ? (
                <picture
                  className="mx-auto col-4 col-sm-3 col-md-12 rc-margin-bottom--xs--desktope margin0 padding0"
                  style={{ margin: '0 !important' }}
                >
                  <div
                    className="rc-padding-bottom--xs d-flex justify-content-center align-items-center ImgBoxFitScreen"
                    style={{ height: '15.7rem', overflow: 'hidden' }}
                  >
                    {/*循环遍历的图片*/}
                    <LazyLoad style={{ width: '100%', heigth: '100%' }}>
                      <img
                        src={
                          item.goodsImg ||
                          item.goodsInfos.sort(
                            (a, b) => a.marketPrice - b.marketPrice
                          )[0].goodsInfoImg ||
                          IMG_DEFAULT
                        }
                        // srcSet={
                        //   item ? getMuntiImg(item) : IMG_DEFAULT
                        //   // item.goodsImg ||
                        //   // item.goodsInfos.sort(
                        //   //   (a, b) => a.marketPrice - b.marketPrice
                        //   // )[0].goodsInfoImg ||
                        //   // IMG_DEFAULT
                        // }
                        alt={item.goodsName}
                        title={item.goodsName}
                        className="ImgFitScreen pt-3"
                        style={{
                          maxWidth: '100%',
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
function ListItemPC(props) {
  const { item, GAListParam } = props;
  return (
    <div className="col-6 col-md-4 mb-3 pl-2 pr-2 BoxFitMonileScreen">
      <article
        className="rc-card rc-card--product overflow-hidden"
        style={{ minHeight: '120px' }}
      >
        {props.leftPromotionJSX}
        {props.rightPromotionJSX}
        <div className="fullHeight">
          {/* <a className="ui-cursor-pointer" onClick={props.onClick}> */}
          {/* <Link className="ui-cursor-pointer" to={item? `/${item.lowGoodsName.split(' ').join('-')}-${item.goodsNo}`: ''} onClick={props.onClick}> */}
          <Link
            className="ui-cursor-pointer"
            to={{
              pathname: item
                ? `/${item.lowGoodsName.split(' ').join('-').replace('/', '')}-${item.goodsNo}`
                : '',
              state: {
                GAListParam: GAListParam
              }
            }}
            onClick={props.onClick}
          >
            <article className="rc-card--a rc-text--center text-center">
              {item ? (
                <picture className="rc-card__image">
                  <div
                    className="rc-padding-bottom--xs d-flex justify-content-center align-items-center ImgBoxFitScreen"
                    style={{ height: '15.7rem' }}
                  >
                    {/*循环遍历的图片*/}
                    <LazyLoad style={{ width: '100%', height: '100%' }}>
                      <img
                        src={
                          item.goodsImg ||
                          item.goodsInfos.sort(
                            (a, b) => a.marketPrice - b.marketPrice
                          )[0].goodsInfoImg ||
                          IMG_DEFAULT
                        }
                        // srcSet={item ? getMuntiImg(item) : IMG_DEFAULT}
                        alt={item.goodsName}
                        title={item.goodsName}
                        className="ImgFitScreen pt-3"
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
function ListItemBody({ item }) {
  return (
    <div
      className="fr-mobile-product-list text-left text-md-center col-8 col-sm-9 col-md-12 d-flex flex-column rc-padding-left--none--mobile align-self-center align-self-md-start"
      style={{ paddingRight: '3rem' }}
    >
      <div className="product-name" title={item.goodsName}>
        {' '}
        {item.goodsName}
      </div>
      <div className="product-price">
        {/* {formatMoney(item.miLinePrice)} */}
        {formatMoney(item.fromPrice)}
      </div>
    </div>
  );
}
function ListItemBodyPC({ item }) {
  const defaultJSX = (
    <>
      <div className="height-product-tile-plpOnly">
        <h3
          className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop ui-text-overflow-line2 product-title text-break text-center"
          title={item.goodsName}
        >
          {item.goodsName}
        </h3>
        {/*商品描述*/}
        <h6
          className="rc-card__meta text-center col-12 mt-2 mb-1 ui-text-overflow-line1"
          style={{ color: '#4a4a4a' }}
          title={item.goodsSubtitle}
        >
          {item.goodsSubtitle}
        </h6>
      </div>
      {/*商品评分和评论数目*/}
      <div
        style={{
          margin: '0 auto'
        }}
        className={`d-flex rc-card__price text-center RateFitScreen`}
      >
        <div>
          <Rate def={item.avgEvaluate} disabled={true} marginSize="smallRate" />
        </div>
        <span
          className="comments rc-margin-left--xs rc-text-colour--text"
          style={{ marginTop: '3px' }}
        >
          ({item.goodsEvaluateNum})
        </span>
      </div>
      <br />
      <div
        className="text-center NameFitScreen"
        style={{
          color: '#4a4a4a',
          opacity: item.goodsInfos.length > 1 ? 1 : 0
        }}
      >
        <FormattedMessage id="startFrom" />
      </div>
      {/*商品价格*/}
      <div className="d-flex justify-content-center">
        <div className="rc-card__price text-left PriceFitScreen">
          <div
            className={`rc-full-width PriceFitScreen flex`}
            style={{ justifyContent: 'center' }}
          >
            <span
              style={{
                color: '#323232',
                fontWeight: 400
              }}
              className="value sales"
            >
              {/* 最低marketPrice */}
              {formatMoney(item.miMarketPrice)} {/* 划线价 */}
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
    <div className="rc-card__body rc-padding-top--none pb-0 justify-content-start">
      {process.env.REACT_APP_LANG === 'fr' ? (
        <>
          <div className="height-product-tile-plpOnly">
            <h3
              className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop ui-text-overflow-line2 product-title text-break text-center"
              title={item.goodsName}
            >
              {item.goodsName}
            </h3>
          </div>
          <br />
          {/*商品价格*/}
          <div className="d-flex justify-content-center">
            <div className="rc-card__price text-left PriceFitScreen">
              <div className={`rc-full-width PriceFitScreen`}>
                <span
                  style={{
                    color: '#000'
                  }}
                  className="value sales"
                >
                  {item.toPrice ? (
                    <span className="mr-1" style={{ fontSize: '.8em' }}>
                      <FormattedMessage id="startFrom" />
                    </span>
                  ) : null}
                  {formatMoney(item.fromPrice)}
                  {item.toPrice ? (
                    <>
                      <span className="ml-1 mr-1" style={{ fontSize: '.8em' }}>
                        <FormattedMessage id="startEnd" />
                      </span>
                      {formatMoney(item.toPrice)}
                    </>
                  ) : null}
                </span>
              </div>
      
            </div>
      
          </div>
          <div class="rc-card__meta text-center col-12" style={{padding: '0', marginBottom: '10px'}}>
            {item.goodsSubtitle}
          </div>
        </>
      ) : (
        defaultJSX
      )}
    </div>
  );
}

function ProductFinderAd() {
  return (
    {
      fr: (
        <div className="ml-4 mr-4 pl-4 pr-4">
          <div className="row d-flex align-items-center">
            <div className="col-12 col-md-6">
              <p className="rc-gamma rc-padding--none">
                <FormattedMessage id="productFinder.recoTitle" />
              </p>
              <p>
                <FormattedMessage id="productFinder.recoDesc" />
              </p>
              <Link to="/product-finder" className="rc-btn rc-btn--one">
                <FormattedMessage id="productFinder.index" />
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <LazyLoad height={200}>
                <img src={pfRecoImg} />
              </LazyLoad>
            </div>
          </div>
        </div>
      )
    }[process.env.REACT_APP_LANG] || null
  );
}

@inject('loginStore', 'configStore')
@injectIntl
@observer
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        maxMarketPrice: null
      },
      defaultFilterSearchForm: {
        // 初始化filter查询参数
        attrList: [],
        filterList: []
      },

      markPriceAndSubscriptionLangDict: [],
      actionFromFilter: false,
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      }
    };
    this.pageSize = 12;
    this.hanldeItemClick = this.hanldeItemClick.bind(this);
    this.toggleFilterModal = this.toggleFilterModal.bind(this);
  }
  componentDidMount() {
    const { state, search, pathname } = this.props.history.location;
    const { category, keywords } = this.props.match.params;
    const keywordsSearch = decodeURI(getParaByName(search, 'q'));
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
        cateType: { '/cats': 'cats', '/dogs': 'dogs' }[pathname] || ''
      },
      () => {
        this.initData();
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
  }
  //点击商品 埋点
  GAProductClick(item, index) {
    dataLayer.push({
      event: `${process.env.REACT_APP_GTM_SITE_ID}eComProductClick`,
      ecommerce: {
        click: {
          actionField: { list: this.state.GAListParam }, //?list's name where the product was clicked from (Catalogue, Homepage, Search Results)
          products: [
            {
              name: item.goodsName, //?
              id: item.goodsNo,
              club: 'no',
              brand: item.goodsBrand.brandName,
              // category: item.goodsCateName
              //   ? JSON.parse(item.goodsCateName)[0]
              //   : '',
              category:item.goodsCateName,
              list: this.state.GAListParam, //?list's name where the product was clicked from (Catalogue, Homepage, Search Results)
              position: index,
              sku: item.goodsInfos.length && item.goodsInfos[0].goodsInfoNo
            }
          ]
        }
      }
    });
  }

  // 商品列表 埋点
  GAProductImpression(productList, totalElements, keywords) {
    const impressions = productList.map((item, index) => {
      return {
        name: item.goodsName, //
        id: item.goodsNo,
        brand: item.goodsBrand.brandName,
        price: item.minMarketPrice,
        club: 'no',
        //category: !!item.goodsCateName ? JSON.parse(item.goodsCateName)[0] : '',
        category:item.goodsCateName,
        list: this.state.GAListParam, //list's name where the product was clicked from (Catalogue, Homepage, Search Results)
        position: index,
        sku: item.goodsInfos.length && item.goodsInfos[0].goodsInfoNo,
        // flag: !!item.taggingForImage
        //   ? JSON.parse(item.taggingForImage).taggingName
        //   : ''
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
  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  get isLogin() {
    return this.props.loginStore.isLogin;
  }
  toggleFilterModal(status) {
    this.setState({ filterModalVisible: status });
  }
  async initData() {
    const { pathname, search, state } = this.props.history.location;
    Promise.all([
      fetchHeaderNavigations(),
      queryStoreCateList(),
      fetchSortList(),
      fetchFilterList()
    ])
      .then((res) => {
        const routers = [...(res[0] || []), ...(res[1] || [])];
        const targetRouter = routers.filter(
          (r) =>
            [
              r.navigationLink,
              // r.cateRouter,
              `${r.navigationLink}?${r.keywords}`
            ].includes(decodeURIComponent(pathname + search)) ||
            [
              r.navigationLink,
              r.cateRouter,
              `${r.navigationLink}?${r.keywords}`
            ].includes(pathname)
        )[0];
        let sortParam = null;
        let cateIds = [];
        let filters = [];
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
        }
        // 生成面包屑
        const targetId =
          (targetRouter && targetRouter.id) ||
          (targetRouter && targetRouter.storeCateId) ||
          '';
        breadList = getParentNodesByChild({
          data: generateOptions(res[0] || []).concat(res[1] || []),
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

        // 解析prefn/prefv, 匹配filter, 设置默认值
        const prefnNum = (search.match(/prefn/gi) || []).length;
        for (let index = 0; index < prefnNum; index++) {
          const fnEle = decodeURI(getParaByName(search, `prefn${index + 1}`));
          const fvEles = decodeURI(
            getParaByName(search, `prefv${index + 1}`)
          ).split('|');
          const tItem = (res[3] || []).filter(
            (r) => r.attributeName === fnEle
          )[0];
          if (tItem) {
            let attributeValues = [];
            let attributeValueIdList = [];
            Array.from(fvEles, (fvItem) => {
              const tFvItem = tItem.attributesValueList.filter(
                (t) => t.attributeDetailNameEn === fvItem
              )[0];
              if (tFvItem) {
                attributeValues.push(tFvItem.attributeDetailName);
                attributeValueIdList.push(tFvItem.id);
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
          breadList: [{ name: <FormattedMessage id="searchShow" /> }]
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
  handleFilterResData(res) {
    const { state, pathname, search } = this.props.history.location;
    let tmpList = res
      .filter((ele) => +ele.filterStatus)
      .sort((a) => (a.filterType === '0' ? -1 : 1))
      .sort((a, b) => (a.filterType === '0' ? a.sort - b.sort : 1))
      .sort((a) =>
        a.filterType === '1' && a.attributeName === 'markPrice' ? -1 : 1
      );
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
              (p) => p === cEle.attributeDetailNameEn
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
              targetPItem.prefvs = [cEle.attributeDetailNameEn];
            } else {
              targetPItem.prefvs.push(cEle.attributeDetailNameEn);
            }
          } else {
            prefnParamList.push({
              prefn: pEle.attributeName,
              prefvs: [cEle.attributeDetailNameEn]
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
          search: decoParam.ret ? `?${decoParam.ret.substr(1)}` : ''
        };
        return cEle;
      });
      return pEle;
    });
    this.setState({ filterList: tmpList, initingFilter: false });
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
  async getProductList() {
    const { history } = this.props;
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
      actionFromFilter
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
        if (pItem.filterType === '0') {
          goodsAttributesValueRelVOList.push({
            attributeId: pItem.attributeId,
            attributeValueIdList: seletedList.map((s) => s.id),
            attributeValues: seletedList.map((s) => s.attributeDetailNameEn),
            attributeName: pItem.attributeName,
            filterType: pItem.filterType
          });
        } else {
          goodsFilterRelList.push({
            attributeId: pItem.id,
            attributeValueIdList: seletedList.map((s) => s.id),
            attributeValues: seletedList.map((s) => s.attributeDetailNameEn),
            attributeName: pItem.attributeName,
            filterType: pItem.filterType
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
      history.push({
        pathname,
        state: {
          filters: goodsAttributesValueRelVOList.concat(goodsFilterRelList)
        }
      });
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
      // cateId: process.env.REACT_APP_CATEID,
      cateId: this.state.cateId || '',
      // cateId: this.state.cateId || process.env.REACT_APP_CATEID,
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
        // storeGoodsFilterVOList
        this.handleFilterResData(
          (res.context && res.context.esGoodsStoreGoodsFilterVOList) || []
        );
        const esGoods = res.context.esGoods;
        const totalElements = esGoods.totalElements;
        const keywords = this.state.keywords;
        if (esGoods && esGoods.content.length) {
          let goodsContent = esGoods.content;
          if (res.context.goodsList) {
            goodsContent = goodsContent.map((ele) => {
              let ret = Object.assign({}, ele, {
                // 最低marketPrice对应的划线价
                miLinePrice: ele.goodsInfos.sort(
                  (a, b) => a.marketPrice - b.marketPrice
                )[0].linePrice,
                taggingForText: (ele.taggingVOList || []).filter(
                  (e) =>
                    e.taggingType === 'Text' &&
                    e.showPage &&
                    e.showPage.includes('PLP')
                )[0],
                taggingForImage: (ele.taggingVOList || []).filter(
                  (e) =>
                    e.taggingType === 'Image' &&
                    e.showPage &&
                    e.showPage.includes('PLP')
                )[0]
              });
              const tmpItem = find(
                res.context.goodsList,
                (g) => g.goodsId === ele.id
              );
              if (tmpItem) {
                const {
                  goodsCateName,
                  goodsSubtitle,
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
          this.setState(
            {
              productList: goodsContent,
              results: esGoods.totalElements,
              currentPage: esGoods.number + 1,
              totalPage: esGoods.totalPages
            },
            () => {
              this.GAProductImpression(
                this.state.productList,
                totalElements,
                keywords
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
        console.log(1111, err);
        this.setState({
          loading: false,
          productList: [],
          initingList: false,
          initingFilter: false
        });
      });
  }
  hanldePageNumChange = ({ currentPage }) => {
    this.setState(
      {
        currentPage
      },
      () => this.getProductList()
    );
  };
  hanldeItemClick(item, index) {
    this.GAProductClick(item, index);
    const { history, location } = this.props;
    if (this.state.loading) {
      return false;
    }
    sessionItemRoyal.set('recomment-preview', location.pathname);
    // history.push(`/${item.lowGoodsName.split(' ').join('-')}-${item.goodsNo}`);
    // history.push('/details/' + item.goodsInfos[0].goodsInfoId);
  }
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  }

  stickyMobileRefineBar() {
    if (isMobile) {
      var t = document.getElementById('refineBar').getBoundingClientRect().top;
      window.addEventListener('scroll', () => {
        var choosedVal = document.querySelector('.filter-value'); // 有选择的时候才操作
        if (window.pageYOffset + 33 >= t && choosedVal) {
          document.body.classList.add('sticky-refineBar');
          this.setState({
            isTop: true
          });
          document.querySelector('.rc-header').style.display = 'none';
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
    const { history } = this.props;
    const { pathname } = history.location;
    const {
      category,
      results,
      productList,
      loading,
      titleData,
      initingList,
      sortList,
      filterList,
      initingFilter,
      filterModalVisible,
      isTop,
      markPriceAndSubscriptionLangDict,
      selectedSortParam,
      keywords,
      breadList,
      eEvents
    } = this.state;
    const lastBreadListName =
      (breadList[breadList.length - 1] &&
        breadList[breadList.length - 1].name) ||
      '';

    let event;
    if (pathname) {
      let reDog = /^\/dog/; // 匹配dog开头
      let reCat = /^\/cat/; // 匹配cat开头
      let theme;
      let type;
      let specieId;
      if (reDog.test(pathname)) {
        theme = 'Dog';
        type = 'Product Catalogue';
        specieId = 1;
      } else if (reCat.test(pathname)) {
        theme = 'Cat';
        type = 'Product Catalogue';
        specieId = 2;
      } else {
        theme = '';
        type = 'Product';
        specieId = '';
      }

      event = {
        page: {
          type,
          theme,
          path: pathname,
          error: '',
          hitTimestamp: new Date(),
          filters: ''
        },
        pet: {
          specieId
        }
      };
    }

    const _loadingJXS = Array(6)
      .fill(null)
      .map((item, i) => (
        <ListItem key={i}>
          <span className="mt-4">
            <Skeleton color="#f5f5f5" width="100%" height="50%" count={2} />
          </span>
        </ListItem>
      ));
    return (
      <div>
        <GoogleTagManager additionalEvents={event} ecommerceEvents={eEvents} />
        <Helmet>
          <title>{this.state.seoConfig.title}</title>
          <meta
            name="description"
            content={this.state.seoConfig.metaDescription}
          />
          <meta name="keywords" content={this.state.seoConfig.metaKeywords} />
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
          <BreadCrumbsNavigation list={breadList.filter((b) => b)} />
          <div className="rc-md-down rc-padding-x--sm rc-padding-top--sm">
            <Link to="/home" className="back-link">
              <FormattedMessage id="homePage" />
            </Link>
          </div>
          {titleData ? (
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
                  <LazyLoad>
                    <img src={titleData.img} className="mx-auto" alt="" />
                  </LazyLoad>
                </div>
              </div>
            </div>
          ) : null}
          <div id="J-product-list" />
          <div className="search-results rc-max-width--xl pt-4 pt-sm-1">
            <div className="search-nav border-bottom-0">
              {keywords ? (
                <div class="rc-padding-y--md--mobile rc-text--center">
                  <div class="rc-intro"><FormattedMessage id="list.youSearchedFor" />:</div>
                  <div class="rc-beta rc-padding-bottom--sm rc-margin-bottom--none searchText">
                    <b>"{keywords}"</b>(
                    <FormattedMessage id="results" values={{ val: results }} />)
                  </div>
                </div>
              ) : null}
            </div>
            <section className="rc-bg-colour--brand3">
              <div>
                <div
                  className="rc-layout-container rc-four-column position-relative"
                  id="J_filter_contaner"
                >
                  <div
                    className="refinements-fixed rc-column"
                    style={{
                      position: 'fixed',
                      display: 'none',
                      background: '#fff',
                      zIndex: 22
                    }}
                  >
                    <button
                      className="rc-md-down rc-btn rc-btn--icon-label rc-icon rc-filter--xs rc-iconography"
                      data-filter-trigger="filter-example"
                      onClick={this.toggleFilterModal.bind(this, true)}
                    >
                      <FormattedMessage id="filters" />
                    </button>
                    <aside
                      className={`rc-filters border-top ${
                        filterModalVisible ? 'active' : ''
                      }`}
                    >
                      {isMobile ? (
                        <Filters
                          history={history}
                          maxGoodsPrice={this.props.configStore.maxGoodsPrice}
                          initing={initingFilter}
                          onToggleFilterModal={this.toggleFilterModal}
                          filterList={filterList}
                          key={`1-${filterList.length}`}
                          inputLabelKey={1}
                          updateParentData={this.updateOperatedFilterList}
                          hanldePriceSliderChange={this.hanldePriceSliderChange}
                          markPriceAndSubscriptionLangDict={
                            markPriceAndSubscriptionLangDict
                          }
                        />
                      ) : (
                        <FiltersPC
                          history={history}
                          maxGoodsPrice={this.props.configStore.maxGoodsPrice}
                          initing={initingFilter}
                          onToggleFilterModal={this.toggleFilterModal}
                          filterList={filterList}
                          key={`1-${filterList.length}`}
                          inputLabelKey={1}
                          updateParentData={this.updateOperatedFilterList}
                          hanldePriceSliderChange={this.hanldePriceSliderChange}
                          markPriceAndSubscriptionLangDict={
                            markPriceAndSubscriptionLangDict
                          }
                        />
                      )}
                    </aside>
                  </div>

                  <div
                    id="refineBar"
                    className="refine-bar refinements rc-column ItemBoxFitSCreen pt-0 mb-0 mb-md-3 mb-md-0 pl-0 pl-md-3 pr-0"
                  >
                    <div
                      className="rc-meta rc-md-down"
                      style={{ padding: '0 1em', fontSize: '1em' }}
                    >
                      <span className="font-weight-normal">
                        {lastBreadListName}{' '}
                      </span>
                      (
                      <FormattedMessage
                        id="results"
                        values={{ val: results }}
                      />
                      )
                    </div>
                    <div
                      className="d-flex justify-content-between align-items-center rc-md-down"
                      style={{ padding: '0 1rem' }}
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
                              paddingBottom: '.7em'
                            }}
                            customStyleType="select-one"
                          />
                        )}
                      </span>
                      <i
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
                      {isMobile ? (
                        <Filters
                          history={history}
                          maxGoodsPrice={this.props.configStore.maxGoodsPrice}
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
                        />
                      ) : (
                        <FiltersPC
                          history={history}
                          maxGoodsPrice={this.props.configStore.maxGoodsPrice}
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
                        />
                      )}
                    </aside>
                  </div>
                  <div
                    className={`rc-column rc-triple-width rc-padding--sm product-tiles-container`}
                  >
                    {!loading && (
                      <>
                        <div className="row mb-3">
                          <div className="col-12 col-md-8 rc-md-up">
                            <span className="font-weight-normal">
                              {lastBreadListName}{' '}
                            </span>
                            (
                            <FormattedMessage
                              id="results"
                              values={{ val: results }}
                            />
                            )
                          </div>

                          <div className="col-12 col-md-4  rc-md-up">
                            <span className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0n">
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
                                  customStyleType="select-one"
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
                            <i className="rc-icon rc-incompatible--sm rc-iconography" />
                            <FormattedMessage id="list.errMsg" />
                          </div>
                          <div className="ui-font-nothing rc-md-down d-flex">
                            <i className="rc-icon rc-incompatible--xs rc-iconography" />
                            <FormattedMessage id="list.errMsg" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rc-column rc-triple-width rc-padding--none--mobile product-tiles-container">
                        <article className="rc-layout-container rc-three-column rc-layout-grid rc-match-heights product-tiles">
                          {loading
                            ? _loadingJXS
                            : productList.map((item, i) =>
                                process.env.REACT_APP_LANG === 'fr' &&
                                isMobile ? (
                                  <ListItem
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
                                    GAListParam={this.state.GAListParam}
                                  >
                                    {process.env.REACT_APP_LANG === 'fr' &&
                                    isMobile ? (
                                      <ListItemBody item={item} />
                                    ) : (
                                      <ListItemBodyPC item={item} />
                                    )}
                                  </ListItem>
                                ) : (
                                  <ListItemPC
                                    key={item.id}
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
                                    GAListParam={this.state.GAListParam}
                                  >
                                    {process.env.REACT_APP_LANG === 'fr' &&
                                    isMobile ? (
                                      <ListItemBody item={item} />
                                    ) : (
                                      <ListItemBodyPC item={item} />
                                    )}
                                  </ListItemPC>
                                )
                              )}
                        </article>
                        <div className="grid-footer rc-full-width">
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
            <ProductFinderAd />
          </div>
        </main>
        {process.env.REACT_APP_LANG == 'de' ? (
          <div className="notate ml-2 mb-2">
            <FormattedMessage
              id="notate"
              values={{
                val: (
                  <Link className="rc-styled-link" to="/FAQ/catogery-1">
                    Versandkosten
                  </Link>
                )
              }}
              defaultMessage={' '}
            />
          </div>
        ) : null}

        <Footer />
      </div>
    );
  }
}

export default List;
