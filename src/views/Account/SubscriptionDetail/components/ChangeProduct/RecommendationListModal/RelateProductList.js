import React, { useEffect, useState, useContext } from 'react';
import Skeleton from 'react-skeleton-loader';
import { PLPCover } from '@/components/Product';
import { FormattedMessage } from 'react-intl-phraseapp';
import { IMG_DEFAULT } from '@/utils/constant';
import { getList } from '@/api/list';
import cloneDeep from 'lodash/cloneDeep';
import { isMobile as isMobilePhone, fetchFilterList } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { getFoodType } from '@/lib/get-technology-or-breedsAttr';
import { Filters, FiltersPC, SelectFilters } from '@/views/List/modules';
import Pagination from '@/components/Pagination';
import { removeArgFromUrl, funcUrl, transferToObject } from '@/lib/url-utils';
import { useHistory } from 'react-router-dom';
import { ChangeProductContext } from '../index';

function ListItemForDefault(props) {
  const { item } = props;
  return (
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
            // to={{
            //   pathname: item
            //     ? `/${item.lowGoodsName
            //         .split(' ')
            //         .join('-')
            //         .replace('/', '')}-${item.goodsNo}` + sourceParam
            //     : '',
            //   state: {
            //     GAListParam,
            //     historyBreads: breadListByDeco
            //   }
            // }}
            // onClick={props.onClick}
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

function bSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j]?.sort > arr[j + 1]?.sort) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const subType = {
  1: 'autoship',
  2: 'club'
};

const sessionItemRoyal = window.__.sessionItemRoyal;

const RelateProductList = ({ mainProduct, goodsInfoFlag }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState(Array(1).fill(null));
  const [results, setResults] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPageProductNum, setCurrentPageProductNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [initingFilter, setInitingFilter] = useState(true);
  const [filterList, setFilterList] = useState([]);
  const [baseSearchStr, setBaseSearchStr] = useState('');
  const [filtersCounts, setFiltersCounts] = useState(0);
  const [prefnParamListFromSearch, setPrefnParamListFromSearch] = useState([]);
  const [defaultFilterSearchForm, setDefaultFilterSearchForm] = useState({
    attrList: [],
    filterList: []
  }); // 初始化filter查询参数
  const [initingList, setInitingList] = useState(true);
  const [filterListRes, setFilterListRes] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [resetList, setResetList] = useState(false);
  const [goodsFilterVOList, setGoodsFilterVOList] = useState([]);
  const [isClearItem, setIsClearItem] = useState(false);

  const ChangeProductValue = useContext(ChangeProductContext);
  const { showProdutctDetail, errMsg } = ChangeProductValue;

  const history = useHistory();

  useEffect(() => {
    getFilterList();
  }, []);

  useEffect(() => {
    if (
      !resetList &&
      (defaultFilterSearchForm?.attrList?.length > 0 ||
        defaultFilterSearchForm?.filterList?.length > 0)
    ) {
      getProductLists();
    }

    if (
      resetList &&
      (defaultFilterSearchForm?.attrList?.length < 1 ||
        defaultFilterSearchForm?.filterList?.length < 1)
    ) {
      getProductLists();
    }
  }, [resetList, defaultFilterSearchForm]);

  useEffect(() => {
    if (isClearItem && defaultFilterSearchForm?.attrList?.length < 1) {
      setResetList(true);
    }
  }, [isClearItem, defaultFilterSearchForm]);

  useEffect(() => {
    // Filter the product list by the attribute of the main product
    if (filterListRes) {
      let _list = cloneDeep(
        mainProduct.goodsAttributesValueRelVOList ||
          mainProduct.goodsAttributesValueRelList ||
          []
      );
      let _prefnParamList = [];
      _list?.forEach((cEle) => {
        if (cEle.goodsAttributeValueEn) {
          cEle.attributeDetailNameEnSplitByLine = cEle.goodsAttributeValueEn
            .split(' ')
            .join('-');
          _prefnParamList.push({
            prefn: cEle.goodsAttributeName,
            prefvs: [cEle.attributeDetailNameEnSplitByLine]
          });
        }
      });
      const prefnParamNewList = [];
      const prefnNames = [];
      for (const item of _prefnParamList) {
        if (!prefnNames.includes(item.prefn)) {
          const obj = { prefn: item.prefn };
          obj['prefvs'] = item['prefvs'];
          prefnParamNewList.push(obj);
          prefnNames.push(item.prefn);
        } else {
          for (const ele of prefnParamNewList) {
            if (ele.prefn === item.prefn) {
              ele['prefvs'] = ele['prefvs'].concat(item['prefvs']);
              break;
            }
          }
        }
      }
      const _decoParam = prefnParamNewList?.reduce(
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
      const _search = `?${_decoParam.ret.substr(1)}`;
      handleSelectedFilterPref(_search);
    }
  }, [filterListRes, mainProduct]);

  const getFilterList = async () => {
    const filterListRes = await fetchFilterList();
    setFilterListRes(filterListRes);
  };

  // 处理attributeDetailNameEn字段，处理空格为-
  const handledAttributeDetailNameEn = (list) => {
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
  };

  // 根据路由上的filter选项，计算出其选中了的filter个数
  const handleCountFilters = (prefnParamListSearch) => {
    let filtersCounts = 0;
    prefnParamListSearch.map((item) => (filtersCounts += item.prefvs.length));
    setFiltersCounts(filtersCounts);
  };

  // 处理产品列表返回的filter list，
  // 1 排序
  // 2 根据默认参数设置filter select 状态
  // 3 拼接router参数，用于点击filter时，跳转链接用
  const handleFilterResData = (res, customFilter) => {
    // const { baseSearchStr } = this.state;
    const { pathname } = history.location;
    let tmpList = res.filter((ele) => +ele.filterStatus);
    let allFilterList = tmpList.concat(customFilter);
    allFilterList?.forEach((item) => bSort(item.attributesValueList || []));
    // 根据默认参数设置filter状态
    initFilterSelectedSts({
      seletedValList: defaultFilterSearchForm.attrList,
      orginData: tmpList,
      filterType: '0',
      pIdName: 'attributeId',
      orginChildListName: 'attributesValueList'
    });
    initFilterSelectedSts({
      seletedValList: defaultFilterSearchForm.filterList,
      orginData: tmpList,
      filterType: '1',
      pIdName: 'id',
      orginChildListName: 'storeGoodsFilterValueVOList'
    });
    let prefnParamListFromSearch = [];
    const prefnNum = (searchFilter.match(/prefn/gi) || []).length;
    for (let index = 0; index < prefnNum; index++) {
      const fnEle = decodeURI(
        funcUrl({
          name: `prefn${index + 1}`,
          customSearch: searchFilter.substr(1)
        }) || ''
      );
      const fvEles = decodeURI(
        funcUrl({
          name: `prefv${index + 1}`,
          customSearch: searchFilter.substr(1)
        }) || ''
      ).split('|');
      prefnParamListFromSearch.push({ prefn: fnEle, prefvs: fvEles });
    }
    handleCountFilters(prefnParamListFromSearch);

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
    setFilterList(allFilterList);
    setInitingFilter(false);
    setPrefnParamListFromSearch(prefnParamListFromSearch);
  };

  const getProductLists = async (pageNum) => {
    let _goodsInfoFlag = goodsInfoFlag || mainProduct.goodsInfoFlag;
    let promotions = '';
    promotions = subType[_goodsInfoFlag];

    let goodsAttributesValueRelVOList = [...defaultFilterSearchForm.attrList];
    let goodsFilterRelList = initingList
      ? [...defaultFilterSearchForm.filterList]
      : [];
    const _goodsAttributesValueRelVOList = cloneDeep(
      goodsAttributesValueRelVOList
    );
    const goodsFilterVOList =
      JSON.parse(sessionItemRoyal.get('plpGoodsFilterVOList')) || [];
    _goodsAttributesValueRelVOList.forEach((items) => {
      goodsFilterVOList.forEach((ele) => {
        if (items.attributeId === ele.attributeId) {
          items.plpDisplayAttributeValueIdList = ele.attributesValueList.map(
            (el) => el.id
          );
        }
      });
    });

    setInitingFilter(true);
    setLoading(true);
    let params = {
      storeId: window.__.env.REACT_APP_STOREID,
      pageNum: pageNum || currentPage - 1,
      sortFlag: 11,
      pageSize: 9,
      promotions,
      goodsAttributesValueRelVOList: _goodsAttributesValueRelVOList.map(
        (el) => {
          const { attributeValues, ...otherParam } = el;
          return otherParam;
        }
      ),
      goodsFilterRelList: goodsFilterRelList.map((el) => {
        const { attributeValues, ...otherParam } = el;
        return otherParam;
      })
    };
    const res = await getList(params);
    if (res.code === 'K-000000') {
      sessionItemRoyal.remove('plpGoodsFilterVOList');
      const esGoodsStoreGoodsFilterVOList = handledAttributeDetailNameEn(
        res.context?.esGoodsStoreGoodsFilterVOList || []
      );
      const esGoodsCustomFilterVOList =
        res.context?.esGoodsCustomFilterVOList || [];
      handleFilterResData(
        esGoodsStoreGoodsFilterVOList,
        esGoodsCustomFilterVOList
      );

      const { esGoodsPage } = res.context;
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
            )?.[0]?.linePrice,
            taggingForText: taggingVOList.filter(
              (e) => e.taggingType === 'Text' && e.showPage?.includes('PLP')
            )[0],
            taggingForImage: taggingVOList.filter(
              (e) => e.taggingType === 'Image' && e.showPage?.includes('PLP')
            )[0],
            // technologyOrBreedsAttr: getTechnologyOrBreedsAttr(ele),
            foodType: getFoodType(ele),
            fromPrice: ele.fromPrice,
            toPrice: ele.toPrice
          });
          return ret;
        });

        setProductList(goodsContent);
        setResults(esGoodsPage.totalElements);
        setCurrentPage(esGoodsPage.number + 1);
        setTotalPage(esGoodsPage.totalPages);
        setCurrentPageProductNum(esGoodsPage.numberOfElements);
        setGoodsFilterVOList(esGoodsStoreGoodsFilterVOList);
        // this.handleCanonicalLink();
      } else {
        setProductList([]);
        setResults(0);
      }
    } else {
      setProductList([]);
      setResults(0);
    }
    setLoading(false);
    setInitingFilter(false);
  };

  const handleSelectedFilterPref = (search, isClearItemClick) => {
    setIsClearItem(isClearItemClick);
    setSearchFilter(search);
    let filters = [];
    // 解析prefn/prefv, 匹配filter, 设置默认选中值
    const prefnNum = (search.match(/prefn/gi) || []).length;
    for (let index = 0; index < prefnNum; index++) {
      const fnEle = decodeURI(
        funcUrl({ name: `prefn${index + 1}`, customSearch: search.substr(1) })
      );
      const fvEles = decodeURI(
        funcUrl({
          name: `prefv${index + 1}`,
          customSearch: search.substr(1)
        }) || ''
      ).split('|');
      const tItem = handledAttributeDetailNameEn(filterListRes).filter(
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
            attributeValues.push(...tFvItem.map((t) => t.attributeDetailName));
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
    setDefaultFilterSearchForm({
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
    });
  };

  const initProductList = () => {
    setDefaultFilterSearchForm({
      attrList: [],
      filterList: []
    });
    setSearchFilter('');
    setResetList(true);
  };

  const initFilterSelectedSts = ({
    seletedValList,
    orginData,
    filterType,
    pIdName,
    orginChildListName
  }) => {
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
  };

  const toggleFilterModal = (status) => {
    setFilterModalVisible(status);
  };

  const handleFilterApplyChange = () => {
    sessionItemRoyal.set(
      'plpGoodsFilterVOList',
      JSON.stringify(goodsFilterVOList)
    );
  };

  const hanldePageNumChange = ({ currentPage }) => {
    setCurrentPage(currentPage);
    getProductLists(currentPage - 1);
  };

  // handle the number of selected filters on the mobile
  const handleFilterCounts = (filterList) => {
    let filtersCounts = 0;
    filterList.map((item) => {
      item.attributesValueList?.map((el) => {
        if (el.selected) {
          filtersCounts += 1;
        }
      });
    });

    return <>{filtersCounts ? <span>({filtersCounts})</span> : null}</>;
  };

  const _loadingJXS = Array(6)
    .fill(null)
    .map((item, i) => (
      <ListItemForDefault key={i}>
        <span className="mt-4">
          <Skeleton color="#f5f5f5" width="100%" height="50%" count={2} />
        </span>
      </ListItemForDefault>
    ));

  console.log(defaultFilterSearchForm, 'defaultFilterSearchForm==');

  return (
    <>
      <div>
        <h3 className="red text-center text-xl md:text-2xl mt-5 md:mt-8 mb-1 md:mb-3">
          <FormattedMessage id="moreProducts" />
        </h3>
        <div
          className="rc-layout-container rc-four-column position-relative row ml-0 mr-0"
          id="J_filter_contaner"
          style={{
            zIndex: 3
          }}
        >
          <div
            id="refineBar"
            className="refine-bar refinements rc-column1 col-12 col-xl-3 ItemBoxFitSCreen pt-0 mb-0 md:mb-3 pl-0 md:pl-3 pr-0"
          >
            <div className="flex md:hidden justify-content-between align-items-center list_select_choose flex-col">
              <button
                onClick={() => toggleFilterModal(!filterModalVisible)}
                className="rc-btn rc-btn--two py-0 text-lg px-8 mb-4 d-flex justify-content-center align-items-center"
              >
                <span className="filter-btn-icon rc-icon rc-filter--xs rc-iconography rc-brand1" />
                <FormattedMessage id="plp.filter" />
                {handleFilterCounts(filterList)}
              </button>
              <SelectFilters
                filterList={filterList}
                history={history}
                notUpdateRouter={true}
                selectedFilterPref={handleSelectedFilterPref}
                getProductList={initProductList}
              />
            </div>
            <aside
              className={`rc-filters ${filterModalVisible ? 'active' : ''}`}
            >
              {isMobilePhone ? (
                <Filters
                  history={history}
                  initing={initingFilter}
                  onToggleFilterModal={toggleFilterModal}
                  filterList={filterList}
                  key={`2-${filterList.length}`}
                  notUpdateRouter={true}
                  inputLabelKey={2}
                  getProductList={initProductList}
                  prefnParamListSearch={prefnParamListFromSearch}
                  selectedFilterPref={handleSelectedFilterPref}
                  handleFilterApply={handleFilterApplyChange}
                />
              ) : (
                <FiltersPC
                  history={history}
                  initing={initingFilter}
                  // onToggleFilterModal={this.toggleFilterModal}
                  filterList={filterList}
                  key={`2-${filterList.length}`}
                  inputLabelKey={2}
                  // hanldePriceSliderChange={
                  //   this.hanldePriceSliderChange
                  // }
                  // markPriceAndSubscriptionLangDict={
                  //   markPriceAndSubscriptionLangDict
                  // }
                  // baseSearchStr={baseSearchStr}
                  prefnParamListSearch={prefnParamListFromSearch}
                  filtersCounts={filtersCounts}
                  notUpdateRouter={true}
                  selectedFilterPref={handleSelectedFilterPref}
                  getProductList={initProductList}
                  handleFilterApply={handleFilterApplyChange}
                />
              )}
            </aside>
            <div className="text-center pt-3 rc-md-down border-top border-color-d7d7d7">
              {results > 0 && (
                <>
                  <FormattedMessage
                    id="plp.displayItems"
                    values={{
                      num: (
                        <span className="font-weight-normal">
                          {currentPageProductNum}
                        </span>
                      ),
                      total: (
                        <span className="font-weight-normal">{results}</span>
                      )
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div
            className={`rc-column1 col-12 col-xl-9 rc-triple-width product-tiles-container pt-4 px-4 md:px-2 md:pt-0`}
          >
            {!productList.length ? (
              <div className="row">
                <div className="col-12">
                  <div className="ui-font-nothing ui-font-nothing mb-4 text-base md:text-lg">
                    <em className="rc-icon rc-incompatible--sm rc-iconography" />
                    <FormattedMessage id="list.errMsg" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rc-column rc-triple-width rc-padding--none--mobile product-tiles-container pt-0">
                <article
                  className="rc-layout-container rc-three-column rc-layout-grid rc-match-heights product-tiles pt-0"
                  id="scroll-img-box"
                >
                  {loading
                    ? _loadingJXS
                    : productList.map((item, i) => {
                        return (
                          <div
                            className="col-12 pr-0 md:pl-2 md:pr-2 mb-3 pl-0 BoxFitMonileScreen col-md-4"
                            key={i}
                          >
                            <PLPCover
                              item={item}
                              key={item.id}
                              notUpdateRouter={true}
                              onClick={() => {
                                showProdutctDetail(item.goodsNo);
                              }}
                              // sourceParam={this.state.sourceParam}
                              // GAListParam={GAListParam}
                              // breadListByDeco={breadListByDeco}
                              // headingTag={
                              //   this.state.seoConfig.headingTag
                              // }
                            />
                          </div>
                        );
                      })}
                </article>
                {loading ? null : (
                  <div
                    className="grid-footer rc-full-width"
                    style={{ marginTop: '0.5rem' }}
                    data-tms="Pagination"
                  >
                    <Pagination
                      loading={loading}
                      defaultCurrentPage={currentPage}
                      key={currentPage}
                      totalPage={totalPage}
                      paginationClass="max-w-xs w-74"
                      onPageNumChange={hanldePageNumChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelateProductList;
