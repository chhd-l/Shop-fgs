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
import find from 'lodash/find';
import { IMG_DEFAULT } from '@/utils/constant';
import {
  getList,
  getLoginList,
  findFilterList,
  findSortList
} from '@/api/list';
import {
  formatMoney,
  getParaByName,
  getDictionary,
  setSeoConfig
} from '@/utils/utils';
import './index.less';

import pfRecoImg from '@/assets/images/product-finder-recomend.jpg';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

function ListItem(props) {
  return (
    <div className="col-6 col-md-4 mb-3 pl-2 pr-2 BoxFitMonileScreen">
      <article
        className="rc-card rc-card--product overflow-hidden"
        style={{ minHeight: '120px' }}
      >
        {props.leftPromotionJSX}
        {props.rightPromotionJSX}
        <div className="fullHeight">
          <a className="ui-cursor-pointer" onClick={props.onClick}>
            <article className="rc-card--a rc-text--center text-center">
              {props.children}
            </article>
          </a>
        </div>
      </article>
    </div>
  );
}

@inject('loginStore', 'configStore')
@injectIntl
@observer
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeCateIds: [],
      category: '',
      cateType: '',
      titleData: null,
      productList: Array(1).fill(null),
      loading: true,

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

      markPriceAndSubscriptionLangDict: []
    };
    this.pageSize = 12;
    this.fidFromSearch = ''; // 链接中所带筛选器参数
    this.cidFromSearch = ''; // 链接中所带catory参数
    this.hanldeItemClick = this.hanldeItemClick.bind(this);
    this.toggleFilterModal = this.toggleFilterModal.bind(this);
  }
  componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }

    const { state, search, pathname } = this.props.history.location;
    const { category, keywords } = this.props.match.params;
    this.fidFromSearch = getParaByName(search, 'fid');
    this.cidFromSearch = getParaByName(search, 'cid');
    const keywordsSearch = getParaByName(search, 'q');

    // 存在初始的filter查询数据
    // 1 查询产品接口时，需要带上此参数
    // 2 查询filterlist后，需初始化状态
    if (state) {
      this.setState({
        selectedSortParam: state.sortParam || null,
        storeCateIds: state.cateIds || [],
        defaultFilterSearchForm: {
          attrList: (state.filters || [])
            .filter((ele) => ele.filterType === '0')
            .map((ele) => {
              const { filterType, ...param } = ele;
              return param;
            }),
          filterList: (state.filters || [])
            .filter((ele) => ele.filterType === '1')
            .map((ele) => {
              const { filterType, ...param } = ele;
              return param;
            })
        },
        titleData:
          state.cateName && state.cateDescription && state.cateImgList
            ? {
                cateName: state.cateName,
                title: state.cateTitle,
                description: state.cateDescription,
                img: state.cateImgList
              }
            : null
      });
    }

    this.setState(
      {
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
    const { storeCateIds, keywords } = this.state;
    this.getProductList(this.fidFromSearch ? 'search_fid' : '');
    findSortList().then((res) => {
      let list = res.context || [];
      list.sort((a, b) => a.sort - b.sort);
      list.unshift({
        sortName: <FormattedMessage id="default" />,
        value: '11'
      });
      this.setState({
        sortList: list.map((ele) => ({
          ...ele,
          name: ele.sortName,
          value: ele.field
        }))
      });
    });
    findFilterList()
      .then((res) => {
        let tmpList = (res.context || [])
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

        this.setState({ filterList: tmpList, initingFilter: false });
      })
      .catch(() => {
        this.setState({ initingFilter: false });
      });
    if (keywords) {
      setSeoConfig({
        pageName: 'Search Results Page'
      });
    } else if (storeCateIds && storeCateIds.length) {
      setSeoConfig({
        categoryId: storeCateIds[0],
        pageName: 'Product List Page' // Search Results Page
      });
    }
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
      defaultFilterSearchForm
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
            attributeValues: seletedList.map((s) => s.attributeDetailName)
          });
        } else {
          goodsFilterRelList.push({
            attributeId: pItem.id,
            attributeValueIdList: seletedList.map((s) => s.id),
            attributeValues: seletedList.map((s) => s.attributeDetailName)
          });
        }
      }
      return pItem;
    });

    let urlPreVal = '';
    goodsAttributesValueRelVOList.map((item, i) => {
      urlPreVal += `${i ? '&' : ''}prefv${i + 1}=${item.attributeValues.join(
        '|'
      )}`;
      return item;
    });
    // debugger;
    // 点击filter，触发局部刷新或整页面刷新
    // history.push(
    //   `${location.pathname}${urlPreVal ? `?${urlPreVal}` : ''}`
    //   // `${location.pathname}?prefn1=ages&prefv1=Chaton (0-4 mois)|Chaton (5 mois-1 an)`
    // );

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

    if (this.cidFromSearch) {
      params.storeCateIds = this.cidFromSearch.split('|');
    }
    let tmpArr;
    switch (type) {
      case 'search_fid':
        tmpArr = this.fidFromSearch.split('|');
        params.propDetails = [{ propId: tmpArr[0], detailIds: [tmpArr[1]] }];
        break;
      default:
        for (let item of []) {
          let tmp = find(params.propDetails, (p) => p.propId === item.propId);
          if (tmp) {
            tmp.detailIds.push(item.detailId);
          } else {
            params.propDetails.push({
              propId: item.propId,
              detailIds: [item.detailId]
            });
          }
        }
    }

    (this.isLogin ? getLoginList : getList)(params)
      .then((res) => {
        this.setState({ initingList: false });
        const esGoods = res.context.esGoods;
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
          this.setState({
            productList: goodsContent,
            results: esGoods.totalElements,
            currentPage: esGoods.number + 1,
            totalPage: esGoods.totalPages
          });
        } else {
          this.setState({
            productList: [],
            results: 0
          });
        }
        this.setState({
          loading: false
        });
      })
      .catch(() => {
        this.setState({ loading: false, productList: [], initingList: false });
      });
  }
  hanldePageNumChange({ currentPage }) {
    this.setState(
      {
        currentPage
      },
      () => this.getProductList()
    );
  }
  hanldeItemClick(item) {
    const { history, location } = this.props;
    if (this.state.loading) {
      return false;
    }
    sessionItemRoyal.set(
      'rc-goods-cate-name',
      this.state.currentCatogery || ''
    );
    sessionItemRoyal.set('recomment-preview', location.pathname);
    history.push(`/${item.lowGoodsName.split(' ').join('-')}-${item.goodsNo}`);
    // history.push('/details/' + item.goodsInfos[0].goodsInfoId);
  }
  onSortChange = (data) => {
    this.setState({ selectedSortParam: data, currentPage: 1 }, () =>
      this.getProductList()
    );
  };
  updateOperatedFilterList = (data) => {
    // 触发点击或跳转页面事件
    this.setState({ filterList: data, currentPage: 1 }, () => {
      this.getProductList();
    });
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
      markPriceAndSubscriptionLangDict,
      selectedSortParam,
      keywords
    } = this.state;
    let event;
    let eEvents;
    if (category) {
      let theme;
      let type;
      switch (category) {
        case 'dogs':
          theme = 'Dog';
          type = 'Product Catalogue';
          break;
        case 'cats':
          theme = 'Cat';
          type = 'Product Catalogue';
          break;
        case 'keywords':
          theme = '';
          type = 'Search Results';
          break;
        default:
          theme = 'Cat or Dog';
          type = 'Product';
          break;
      }
      event = {
        page: {
          type,
          theme
        }
      };
    }
    if (!initingList) {
      eEvents = {
        event: `${process.env.REACT_APP_GTM_SITE_ID}eComProductImpression`,
        ecommerce: {
          // impressions: [
          //   {
          //     id: '',
          //     name: item.goodsCategory,
          //     price: currentUnitPrice,
          //     brand: 'Royal Canin',
          //     category: this.specie,
          //     quantity: selectedSpecItem.buyCount,
          //     variant: selectedSpecItem.specText,
          //     club: 'no',
          //     sku: selectedSpecItem.goodsInfoId
          //   }
          // ]
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
        {event ? <GoogleTagManager additionalEvents={event} /> : null}
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BannerTip />
          <BreadCrumbsNavigation
            list={[{ name: (titleData && titleData.cateName) || '' }].filter(
              (el) => el.name
            )}
          />
          <div className="rc-md-down rc-padding-x--sm rc-padding-top--sm">
            <Link to="/home" className="back-link">
              Homepage
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
          <div className="search-results rc-padding--sm rc-max-width--xl pt-4 pt-sm-1">
            <div className="search-nav border-bottom-0">
              {keywords ? (
                <div className="nav-tabs-wrapper rc-text--center">
                  <div className="rc-intro">
                    <FormattedMessage id="list.youSearchedFor" />:
                  </div>
                  <div className="rc-beta rc-padding-bottom--sm rc-margin-bottom--none searchText">
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
                      className={`rc-filters ${
                        filterModalVisible ? 'active' : ''
                      }`}
                    >
                      <Filters
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
                    </aside>
                  </div>
                  <div className="refinements rc-column ItemBoxFitSCreen pt-0 mb-3 mb-md-0 pl-0 pl-md-3">
                    <button
                      className="rc-md-down rc-btn rc-btn--icon-label rc-icon rc-filter--xs rc-iconography FilterFitScreen"
                      data-filter-trigger="filter-example"
                      onClick={this.toggleFilterModal.bind(this, true)}
                    >
                      <FormattedMessage id="filters" />
                    </button>
                    <aside
                      className={`rc-filters ${
                        filterModalVisible ? 'active' : ''
                      }`}
                    >
                      <Filters
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
                    </aside>
                  </div>
                  <div
                    className={`rc-column rc-triple-width rc-padding--none--mobile product-tiles-container`}
                  >
                    {!loading && (
                      <>
                        <div className="row mb-3">
                          <div className="col-12 col-md-8">
                            <span className="font-weight-normal">
                              {this.state.currentCatogery}{' '}
                            </span>
                            (
                            <FormattedMessage
                              id="results"
                              values={{ val: results }}
                            />
                            )
                          </div>
                          <div className="col-12 col-md-4">
                            <span className="rc-select rc-input--full-width w-100 rc-input--full-width rc-select-processed mt-0">
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
                        <article className="rc-layout-container rc-three-column rc-layout-grid rc-match-heights product-tiles ">
                          {loading
                            ? _loadingJXS
                            : productList.map((item, i) => (
                                <ListItem
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
                                            item.taggingForText.taggingFontColor
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
                                    item
                                  )}
                                >
                                  <picture className="rc-card__image">
                                    <div
                                      className="rc-padding-bottom--xs d-flex justify-content-center align-items-center ImgBoxFitScreen"
                                      style={{ height: '15.7rem' }}
                                    >
                                      {/*循环遍历的图片*/}
                                      <LazyLoad style={{ width: '100%' }}>
                                        <img
                                          src={
                                            item.goodsImg ||
                                            item.goodsInfos.sort(
                                              (a, b) =>
                                                a.marketPrice - b.marketPrice
                                            )[0].goodsInfoImg ||
                                            IMG_DEFAULT
                                          }
                                          srcSet={
                                            item.goodsImg ||
                                            item.goodsInfos.sort(
                                              (a, b) =>
                                                a.marketPrice - b.marketPrice
                                            )[0].goodsInfoImg ||
                                            IMG_DEFAULT
                                          }
                                          alt={item.goodsName}
                                          title={item.goodsName}
                                          className="ImgFitScreen pt-3"
                                          style={{
                                            maxWidth: '50%',
                                            maxHeight: '100%',
                                            width: 'auto',
                                            height: 'auto',
                                            margin: 'auto'
                                          }}
                                        />
                                      </LazyLoad>
                                    </div>
                                  </picture>
                                  <div className="rc-card__body rc-padding-top--none pb-0 justify-content-start">
                                    <div className="height-product-tile-plpOnly">
                                      {/*商品名字*/}
                                      <header
                                        className="rc-text--center "
                                        style={{ height: '70px' }}
                                      >
                                        <h3
                                          className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop red-title"
                                          title={item.goodsName}
                                        >
                                          {item.goodsName}
                                        </h3>
                                      </header>
                                      {/*商品描述*/}
                                      <div
                                        className={`rc-card__meta text-center col-12`}
                                        title={item.goodsSubtitle}
                                        style={{ color: '#4a4a4a' }}
                                      >
                                        <h6 className="second-title">
                                          {item.goodsSubtitle}
                                        </h6>
                                      </div>
                                    </div>
                                    {/*商品评分和评论数目*/}
                                    <div
                                      className={`rc-card__price text-center RateFitScreen`}
                                    >
                                      <div>
                                        <Rate
                                          def={item.avgEvaluate}
                                          disabled={true}
                                          marginSize="smallRate"
                                        />
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
                                        opacity:
                                          item.goodsInfos.length > 1 ? 1 : 0
                                      }}
                                    >
                                      <FormattedMessage id="startFrom" />
                                    </div>
                                    {/*商品价格*/}
                                    <div className="d-flex justify-content-center">
                                      <div className="rc-card__price text-left PriceFitScreen">
                                        <div
                                          className={`rc-full-width PriceFitScreen`}
                                        >
                                          <span
                                            style={{
                                              color: '#323232',
                                              fontWeight: 400
                                            }}
                                            className="value sales"
                                          >
                                            {/* 最低marketPrice */}
                                            {formatMoney(
                                              item.miMarketPrice
                                            )}{' '}
                                            {/* 划线价 */}
                                            {item.miLinePrice &&
                                            item.miLinePrice > 0
                                              ? formatMoney(item.miLinePrice)
                                              : null}
                                          </span>
                                        </div>
                                        {item.miSubscriptionPrice &&
                                        item.miSubscriptionPrice > 0 ? (
                                          <div className="range position-relative SePriceScreen">
                                            <span
                                              style={{
                                                color: '#323232',
                                                fontWeight: 400
                                              }}
                                            >
                                              {formatMoney(
                                                item.miSubscriptionPrice
                                              )}{' '}
                                            </span>
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                    {/*商品价格截至*/}
                                    <div className="text-center">
                                      <span
                                        className="iconfont font-weight-bold red mr-1"
                                        style={{
                                          fontSize: '.65em'
                                        }}
                                      >
                                        &#xe675;
                                      </span>
                                      <span
                                        className="red-text"
                                        style={{
                                          fontSize: '.7em',
                                          transform: 'translateY(-50%)',
                                          whiteSpace: 'nowrap'
                                        }}
                                      >
                                        <FormattedMessage id="autoshop" />
                                      </span>
                                    </div>
                                  </div>
                                </ListItem>
                              ))}
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
            {process.env.REACT_APP_LANG === 'fr' && (
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
            )}
          </div>
        </main>
        {process.env.REACT_APP_LANG == 'de' ? (
          <div className="notate ml-2 mb-2">
            <FormattedMessage
              id="notate"
              values={{
                val: (
                  <Link className="rc-styled-link" to="/FAQ/all">
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
