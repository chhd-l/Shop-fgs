import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import Filters from './Filters';
import Pagination from '@/components/Pagination';
import Selection from '@/components/Selection';
import { find } from 'lodash';
import {
  getList,
  getLoginList,
  findFilterList,
  findSortList
} from '@/api/list';
import { queryStoreCateIds, formatMoney, getParaByName } from '@/utils/utils';
import { STORE_CATE_ENUM, STORE_CATOGERY_ENUM } from '@/utils/constant';
import Rate from '@/components/Rate';
import './index.less';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;

function ListItem(props) {
  return (
    <div className="col-6 col-md-4 mb-3 pl-2 pr-2 BoxFitMonileScreen">
      <article
        className="rc-card rc-card--product overflow-hidden"
        style={{ minHeight: '120px' }}
      >
        {props.promotionJSX}
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
      titleData: null,
      productList: Array(1).fill(null),
      loading: true,

      currentPage: 1,
      totalPage: 1, // 总页数
      results: 0, // 总数据条数

      keywords: '',
      filterList: [],
      operatedFilterList: [],

      initingFilter: true,
      initingList: true,
      filterModalVisible: false,
      currentCatogery: '',
      cateId: '',
      sortList: [], // 排序信息
      selectedSortParam: null
    };
    this.pageSize = 12;
    this.hanldeItemClick = this.hanldeItemClick.bind(this);
    this.toggleFilterModal = this.toggleFilterModal.bind(this);
    this.fidFromSearch = ''; // 链接中所带筛选器参数
    this.cidFromSearch = ''; // 链接中所带catory参数
  }
  componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    this.fidFromSearch = getParaByName(this.props.location.search, 'fid');
    this.cidFromSearch = getParaByName(this.props.location.search, 'cid');
    const { state } = this.props.history.location;
    const { category, keywords } = this.props.match.params;
    debugger;
    if (state && state.sortParam) {
      this.setState({ selectedSortParam: state.sortParam });
    }

    this.setState(
      {
        category
      },
      () => {
        const { category } = this.state;
        this.initData();
        if (category.toLocaleLowerCase() === 'keywords') {
          this.setState({
            keywords
          });
        }
      }
    );
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
    const { category } = this.state;
    let storeIdList = await queryStoreCateIds();
    const t =
      find(STORE_CATE_ENUM, (ele) => ele.category === category) ||
      find(
        STORE_CATOGERY_ENUM[process.env.REACT_APP_LANG] || [],
        (ele) => ele.category === category
      );
    if (t) {
      const tmpStoreCateIds = Array.from(storeIdList, (s) =>
        t.cateName.includes(s.cateName) ? s.storeCateId : ''
      ).filter((s) => !!s);
      const tmpCateId = Array.from(storeIdList, (s) =>
        t.cateName.includes(s.cateName) ? s.goodsCateId : ''
      ).filter((s) => !!s)[0];
      this.setState({
        storeCateIds: tmpStoreCateIds,
        cateId: tmpCateId,
        currentCatogery: t.text
      });
      if (t.title && t.desc && t.img) {
        this.setState({
          titleData: {
            title: t.title,
            description: t.desc,
            img: t.img
          }
        });
      }
    }

    this.getProductList(this.fidFromSearch ? 'search_fid' : '');
    findSortList().then((res) => {
      let list = res.context || [];
      list.sort((a, b) => a.sort - b.sort);
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
          .sort((a) => (a.filterType === '0' ? -1 : 1));
        this.setState({ filterList: tmpList, initingFilter: false });
      })
      .catch(() => {
        this.setState({ initingFilter: false });
      });
  }
  async getProductList(type) {
    let {
      currentPage,
      storeCateIds,
      keywords,
      initingList,
      category,
      selectedSortParam,
      operatedFilterList
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

    let goodsAttributesValueRelVOList = [];
    let goodsFilterRelList = [];
    // 处理filter查询值
    Array.from(operatedFilterList, (pItem) => {
      const seletedList = (
        pItem.attributesValueList ||
        pItem.storeGoodsFilterValueVOList ||
        []
      ).filter((cItem) => cItem.selected);
      if (seletedList.length) {
        if (pItem.filterType === '0') {
          goodsAttributesValueRelVOList.push({
            attributeId: pItem.attributeId,
            attributeValueIdList: seletedList.map((s) => s.id)
          });
        } else {
          goodsFilterRelList.push({
            attributeId: pItem.id,
            attributeValueIdList: seletedList.map((s) => s.id)
          });
        }
      }
      return pItem;
    });

    let params = {
      storeId: process.env.REACT_APP_STOREID,
      // cateId: process.env.REACT_APP_CATEID,
      cateId: this.state.cateId || '',
      // cateId: this.state.cateId || process.env.REACT_APP_CATEID,
      propDetails: [],
      pageNum: currentPage - 1,
      brandIds: [],
      sortFlag: 10, // todo 最终为11
      pageSize: this.pageSize,
      esGoodsInfoDTOList: [],
      companyType: '',
      keywords,
      storeCateIds,
      goodsAttributesValueRelVOList,
      goodsFilterRelList
    };
    debugger;
    if (selectedSortParam) {
      params = Object.assign(params, {
        esSortList: [
          {
            fieldName: selectedSortParam.field,
            type: selectedSortParam.sortType
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

    let tmpList = this.isLogin ? getLoginList : getList;
    tmpList(params)
      .then((res) => {
        this.setState({ initingList: false });
        const esGoods = res.context.esGoods;
        if (esGoods && esGoods.content.length) {
          let goodsContent = esGoods.content;
          if (res.context.goodsList) {
            goodsContent = goodsContent.map((ele) => {
              let ret = Object.assign({}, ele);
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
                  ...others
                } = tmpItem;
                ret = Object.assign(ret, {
                  goodsCateName,
                  goodsSubtitle,
                  subscriptionStatus,
                  avgEvaluate,
                  minMarketPrice,
                  goodsImg
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
        this.setState({ loading: false, productList: [] });
      });
  }
  hanldePageNumChange(params) {
    this.setState(
      {
        currentPage: params.currentPage
      },
      () => this.getProductList()
    );
  }
  hanldeItemClick(item) {
    if (this.state.loading) {
      return false;
    }
    sessionItemRoyal.set(
      'rc-goods-cate-name',
      this.state.currentCatogery || ''
    );
    sessionItemRoyal.set('recomment-preview', this.props.location.pathname);
    sessionItemRoyal.set('rc-goods-name', item.goodsName);
    const { history } = this.props;
    history.push('/details/' + item.goodsInfos[0].goodsInfoId);
  }
  onSortChange = (data) => {
    this.setState({ selectedSortParam: data, currentPage: 1 }, () =>
      this.getProductList()
    );
  };
  updateOperatedFilterList = (data) => {
    this.setState({ operatedFilterList: data, currentPage: 1 }, () => {
      this.getProductList();
    });
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
      filterModalVisible
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
          <BreadCrumbs />
          {titleData ? (
            <div className="rc-max-width--lg rc-padding-x--sm">
              <div className="rc-layout-container rc-three-column">
                <div className="rc-column rc-double-width">
                  <h1 className="rc-gamma rc-margin--none">
                    {titleData.title}
                  </h1>
                  <div>{titleData.description}</div>
                </div>
                <div className="rc-column">
                  <img className="mx-auto" src={titleData.img}></img>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          <div id="J-product-list"></div>
          <div className="search-results rc-padding--sm rc-max-width--xl pt-4 pt-sm-1">
            <div className="search-nav border-bottom-0">
              {this.state.keywords ? (
                <div className="nav-tabs-wrapper rc-text--center">
                  <div className="rc-intro">
                    <FormattedMessage id="list.youSearchedFor" />:
                  </div>
                  <div className="rc-beta rc-padding-bottom--sm rc-margin-bottom--none searchText">
                    <b>"{this.state.keywords}"</b>(
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
                      onClick={() => this.toggleFilterModal(true)}
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
                      />
                    </aside>
                  </div>
                  <div
                    className="refinements rc-column ItemBoxFitSCreen"
                    style={{ top: '-45px' }}
                  >
                    <button
                      className="rc-md-down rc-btn rc-btn--icon-label rc-icon rc-filter--xs rc-iconography FilterFitScreen"
                      data-filter-trigger="filter-example"
                      onClick={() => this.toggleFilterModal(true)}
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
                      />
                    </aside>
                  </div>
                  <div className={`rc-column rc-triple-width`}>
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
                                // selectedItemData={{
                                //   value: form.country
                                // }}
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
                      <div className="row RowFitScreen">
                        {loading
                          ? _loadingJXS
                          : productList.map((item, i) => (
                              <ListItem
                                key={item.id}
                                promotionJSX={
                                  find(
                                    item.goodsInfos,
                                    (ele) => ele.goodsPromotion
                                  ) ? (
                                    <div className="product-item-flag">
                                      <FormattedMessage id="promotion" />
                                    </div>
                                  ) : null
                                }
                                onClick={() => this.hanldeItemClick(item)}
                              >
                                <picture className="rc-card__image">
                                  <div
                                    className="rc-padding-bottom--xs d-flex justify-content-center align-items-center ImgBoxFitScreen"
                                    style={{ height: '15.7rem' }}
                                  >
                                    <img
                                      src={
                                        item.goodsImg ||
                                        item.goodsInfos.sort(
                                          (a, b) =>
                                            a.marketPrice - b.marketPrice
                                        )[0].goodsInfoImg
                                      }
                                      srcSet={
                                        item.goodsImg ||
                                        item.goodsInfos.sort(
                                          (a, b) =>
                                            a.marketPrice - b.marketPrice
                                        )[0].goodsInfoImg
                                      }
                                      alt={item.goodsName}
                                      title={item.goodsName}
                                      className="ImgFitScreen pt-3"
                                      style={{
                                        maxWidth: '50%',
                                        maxHeight: '100%',
                                        width: 'auto',
                                        height: 'auto'
                                      }}
                                    />
                                  </div>
                                </picture>
                                <div className="rc-card__body rc-padding-top--none pb-0 justify-content-start">
                                  <div className="height-product-tile-plpOnly">
                                    <header
                                      className="rc-text--center"
                                      style={{ height: '100px' }}
                                    >
                                      <h3
                                        className="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen product-title"
                                        title={item.goodsName}
                                      >
                                        {item.goodsName}
                                      </h3>
                                    </header>
                                    <div
                                      className={`ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen`}
                                      title={item.goodsSubtitle}
                                      style={{ color: '#4a4a4a' }}
                                    >
                                      {item.goodsSubtitle}
                                    </div>
                                  </div>
                                  <div
                                    className={`rc-card__price text-center RateFitScreen `}
                                  >
                                    <div className="display-inline">
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
                                        >
                                          {formatMoney(
                                            Math.min.apply(
                                              null,
                                              item.goodsInfos.map(
                                                (g) => g.marketPrice || 0
                                              )
                                            )
                                          )}{' '}
                                          {item.goodsInfos.sort(
                                            (a, b) =>
                                              a.marketPrice - b.marketPrice
                                          )[0].linePrice &&
                                          item.goodsInfos.sort(
                                            (a, b) =>
                                              a.marketPrice - b.marketPrice
                                          )[0].linePrice > 0 ? (
                                            <span
                                              className="text-line-through rc-text-colour--text font-weight-lighter"
                                              style={{
                                                fontSize: '.8em'
                                              }}
                                            >
                                              {formatMoney(
                                                item.goodsInfos.sort(
                                                  (a, b) =>
                                                    a.marketPrice -
                                                    b.marketPrice
                                                )[0].linePrice
                                              )}
                                            </span>
                                          ) : null}
                                        </span>
                                      </div>
                                      {find(
                                        item.goodsInfos,
                                        (ele) => ele.subscriptionStatus
                                      ) &&
                                      Math.min.apply(
                                        null,
                                        item.goodsInfos
                                          .filter((g) => g.subscriptionStatus)
                                          .map((g) => g.subscriptionPrice || 0)
                                      ) > 0 ? (
                                        <div className="range position-relative SePriceScreen">
                                          <span
                                            style={{
                                              color: '#323232',
                                              fontWeight: 400
                                            }}
                                          >
                                            {formatMoney(
                                              Math.min.apply(
                                                null,
                                                item.goodsInfos
                                                  .filter(
                                                    (g) => g.subscriptionStatus
                                                  )
                                                  .map(
                                                    (g) =>
                                                      g.subscriptionPrice || 0
                                                  )
                                              )
                                            )}{' '}
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
                                            className="position-relative red-text position-absolute"
                                            style={{
                                              fontSize: '.7em',
                                              top: '52%',
                                              transform: 'translateY(-50%)',
                                              whiteSpace: 'nowrap'
                                            }}
                                          >
                                            <FormattedMessage id="autoshop" />
                                          </span>
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </ListItem>
                            ))}
                        <div className="grid-footer rc-full-width">
                          <Pagination
                            loading={this.state.loading}
                            defaultCurrentPage={this.state.currentPage}
                            key={this.state.currentPage}
                            totalPage={this.state.totalPage}
                            onPageNumChange={(params) =>
                              this.hanldePageNumChange(params)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
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

        <Footer />
      </div>
    );
  }
}

export default List;
