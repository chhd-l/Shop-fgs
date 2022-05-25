import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import PriceSlider from '@/components/PriceSlider';
import { removeArgFromUrl } from '@/lib/url-utils';
import '@/assets/css/search.css';
import './index.less';

class Filter extends React.Component {
  static defaultProps = {
    history: null,
    initing: true,
    filterList: [],
    maxGoodsPrice: 100,
    markPriceAndSubscriptionLangDict: [],
    filtersCounts: 0
  };
  constructor(props) {
    super(props);
    this.state = {
      filterList: props.filterList,
      selectedFilterParams: props.prefnParamListSearch || []
    };
    this.toggleContent = this.toggleContent.bind(this);
    this.hubGA = window.__.env.REACT_APP_HUB_GA == '1';
  }

  componentDidMount() {
    // 随着滚动，更改顶部距离
    window.onscroll = function () {
      const isHubUi = document.getElementsByClassName('ui-custom-hub')[0];
      if (isHubUi) {
        const headerClass = document.getElementsByClassName(
          'rc-header--scrolled'
        )[0];
        const filterWrap = document.getElementsByClassName('filter-rc-nav')[0];
        if (headerClass && filterWrap) {
          filterWrap.style.top = '4.167rem';
        } else if (filterWrap) {
          filterWrap.style.top = '6.7rem';
        }
      }
    };

    const { filterList } = this.state;
    let filtersCounts = 0;
    filterList.map((item) => {
      item.attributesValueList?.map((el) => {
        if (el.selected) {
          filtersCounts += 1;
          el.notApplyChecked = true;
        }
      });
    });

    this.setState({
      filterList,
      filtersCounts
    });
  }

  get hasSelecedItems() {
    let ret = false;
    const { filterList } = this.state;
    for (let index = 0; index < filterList.length; index++) {
      const pItem = filterList[index];
      const tmpRes = (
        pItem.attributesValueList ||
        pItem.storeGoodsFilterValueVOList ||
        []
      ).some((cItem) => cItem.selected);
      if (tmpRes) {
        ret = true;
        break;
      }
    }
    return ret;
  }
  toggleContent(idx, attributeName) {
    let { filterList } = this.state;
    filterList.map((f, i) => {
      if (i === idx) {
        f.expand = !f.expand;
      } else {
        f.expand = false;
      }
      return f;
    });
    this.setState({
      filterList
    });

    // this.hubGA && dataLayer.push({
    //   event: 'plpFilterClick',
    //   plpFilterClickName: attributeName,
    // });
  }

  handleClickCloseBtn = () => {
    this.props.onToggleFilterModal(false);
    // this.setState({
    //   selectedFilterParams: []
    // })
  };

  handleClickItemFilter = (e, parentItem, childItem) => {
    const { filterList } = this.state;
    filterList.map((item) => {
      item.attributesValueList?.map((el) => {
        if (el.attributeDetailName == childItem.attributeDetailName) {
          el.notApplyChecked = e.target.checked;
        }
      });
    });
    this.setState({
      filterList
    });
    const { selectedFilterParams } = this.state;
    let selectedFilters = [];
    if (selectedFilterParams.length && e.target.checked) {
      let choosedIndex = selectedFilterParams.findIndex(
        (el) => el.prefn == parentItem.attributeName
      );
      if (choosedIndex > -1) {
        selectedFilterParams[choosedIndex].prefvs = [
          ...selectedFilterParams[choosedIndex].prefvs,
          childItem.attributeDetailNameEnSplitByLine
        ];
      } else {
        selectedFilterParams.push({
          prefn: parentItem.attributeName,
          prefvs: [childItem.attributeDetailNameEnSplitByLine]
        });
      }
      selectedFilters = [...selectedFilterParams];
    } else if (selectedFilterParams.length && !e.target.checked) {
      let choosedIndex = selectedFilterParams.findIndex(
        (el) => el.prefn == parentItem.attributeName
      );
      if (choosedIndex > -1) {
        let deletedIdx = selectedFilterParams[choosedIndex].prefvs.findIndex(
          (el) => el == childItem.attributeDetailNameEnSplitByLine
        );
        selectedFilterParams[choosedIndex].prefvs.splice(deletedIdx, 1);
        selectedFilterParams?.map((item, idx) => {
          if (!item.prefvs.length) selectedFilterParams.splice(idx, 1);
        });
        selectedFilters = [...selectedFilterParams];
      }
    } else if (e.target.checked) {
      selectedFilters.push({
        prefn: parentItem.attributeName,
        prefvs: [childItem.attributeDetailNameEnSplitByLine]
      });
    }

    this.setState({
      selectedFilterParams: selectedFilters
    });
  };

  handleFilterApplyBtn = () => {
    const { pathname } = this.props.history.location;
    const { baseSearchStr } = this.props;
    const searchFilterParams = this.state.selectedFilterParams.reduce(
      (pre, cur) => {
        return {
          ret:
            pre.ret +
            `&prefn${pre.i}=${cur.prefn}&prefv${pre.i}=${cur.prefvs.join('|')}`,
          i: ++pre.i
        };
      },
      { i: 1, ret: '' }
    );
    const _search = searchFilterParams.ret
      ? `?${
          baseSearchStr ? `${baseSearchStr}&` : ''
        }${searchFilterParams.ret.substr(1)}`
      : `?${baseSearchStr}`;
    const _router = {
      pathname,
      search: `?${removeArgFromUrl({
        search: _search.substr(1),
        name: 'p'
      })}`
    };
    this.props.history.push(_router);
  };

  // 判断router上是否已经选择了filters，如果选择了则清空filter跳转router,若没有直接清空目前正在操作选择的。
  handleFilterClearBtn = () => {
    const { filterList } = this.state;
    const { pathname, search } = this.props.history.location;
    const { baseSearchStr } = this.props;
    if (search.includes('prefn')) {
      const _router = {
        pathname,
        search: baseSearchStr
      };
      this.props.history.push(_router);
    } else {
      this.setState({
        selectedFilterParams: []
      });
      // const filterCheckBox = document.getElementsByClassName(
      //   'filter-input-checkout'
      // );
      // for (let i = 0; i < filterCheckBox.length; i++) {
      //   filterCheckBox[i].checked = '';
      // }
      filterList.map((item) => {
        item.attributesValueList?.map((el) => {
          el.notApplyChecked = '';
        });
      });
      this.setState({
        filterList
      });
      this.props.onToggleFilterModal(false);
    }
  };

  handleParentFilterCounts = (parentItem) => {
    const selectedList = parentItem.attributesValueList?.filter(
      (item) => item.notApplyChecked
    );
    return (
      <>
        {selectedList?.length ? (
          <div className="filter-parent-item-count">
            <span>{selectedList.length}</span>
          </div>
        ) : null}
      </>
    );
  };

  renderMultiChoiceJSX = (parentItem, childItem) => {
    const { inputLabelKey } = this.props;
    return (
      <li
        title={`Sort by ${
          parentItem.attributeNameEn &&
          parentItem.attributeNameEn.toLocaleLowerCase()
        }: ${childItem.attributeDetailNameEn}`}
        className="rc-list__item"
        key={childItem.id}
      >
        <span className="rc-input rc-input--stacked">
          {/* <Link to={childItem.router} className="rc-input rc-input--stacked"> */}
          <input
            className={`rc-input__checkbox filter-input-checkout`}
            id={`filter-input-${childItem.id}-${inputLabelKey}`}
            type="checkbox"
            name="checkbox"
            checked={childItem.notApplyChecked}
            onChange={(e) =>
              this.handleClickItemFilter(e, parentItem, childItem)
            }
          />
          <label
            className="rc-input__label--inline"
            htmlFor={`filter-input-${childItem.id}-${inputLabelKey}`}
          >
            {childItem.attributeDetailNameEn}
          </label>
          {/* </Link> */}
        </span>
      </li>
    );
  };
  renderSingleChoiceJSX = (parentItem, childItem) => {
    const { inputLabelKey, markPriceAndSubscriptionLangDict } = this.props;
    return (
      <div
        key={childItem.id}
        className="row rc-margin-left--none rc-padding-left--none rc-margin-left--xs rc-padding-left--xs"
      >
        <span
          // to={childItem.router}
          className="rc-input w-100 rc-margin-y--xs rc-input--full-width ml-2"
        >
          <input
            className="rc-input__radio filter-input-checkout"
            id={`filter-sub-radio-${childItem.id}-${inputLabelKey}`}
            type="radio"
            checked={childItem.notApplyChecked}
            onChange={(e) =>
              this.handleClickItemFilter(e, parentItem, childItem)
            }
          />
          <label
            className="rc-input__label--inline"
            htmlFor={`filter-sub-radio-${childItem.id}-${inputLabelKey}`}
          >
            {/* when name=not subscription/subscription, get dictionary to multi lang  */}
            {(childItem.attributeDetailName === 'subscription' ||
              childItem.attributeDetailName === 'not subscription') &&
            markPriceAndSubscriptionLangDict.filter(
              (ele) => ele.name === childItem.attributeDetailName
            ).length
              ? markPriceAndSubscriptionLangDict.filter(
                  (ele) => ele.name === childItem.attributeDetailName
                )[0].valueEn
              : childItem.attributeDetailNameEn}
          </label>
        </span>
      </div>
    );
  };
  render() {
    const { filterList, selectedFilterParams } = this.state;
    const {
      history,
      initing,
      hanldePriceSliderChange,
      markPriceAndSubscriptionLangDict,
      baseSearchStr
    } = this.props;
    const { pathname } = history.location;
    let isSelectedFilter = false; // 是否有选择筛选项
    for (let pItem in filterList) {
      let lists =
        filterList[pItem].attributesValueList ||
        filterList[pItem].storeGoodsFilterValueVOList ||
        [];
      for (let cItem in lists) {
        if (lists[cItem].selected) {
          isSelectedFilter = true;
          break;
        }
      }
      if (isSelectedFilter) {
        break;
      }
    }

    // filterList.forEach(item=>{
    //   lists.forEach(cItem=>{
    //     if(cItem.selected){
    //       isSelectedFilter = true
    //     }
    //   })
    // })
    // let isSelectedFilter = filterList.forEach(element => {

    // });(()=>)
    return (
      <section className="rc-max-width--xl filter-mobile-wrap">
        <nav
          id="headnav-mobile"
          className="rc-nav rc-md-down filter-rc-nav"
          data-toggle-group="mobile"
          data-toggle-effect="rc-expand--horizontal"
        >
          <div className="rc-filters__form fr-mobile" name="example-filter">
            <div
              onClick={this.handleClickCloseBtn}
              className="flex w-100 align-items-center justify-content-between rc-padding--sm--mobile"
            >
              <div className="flex items-center">
                <em
                  className={`rc-icon rc-filter--xs rc-iconography`}
                  data-filter-trigger="filter-example"
                  // style={{ position: 'relative', top: '0.2rem' }}
                />
                <span className=" font-weight-normal font-18 rc-padding-left--sm">
                  <FormattedMessage id={'list.closeFilters'} />
                </span>
              </div>
              <span className={'rc-icon rc-iconography rc-close--xs'} />
              {/* <span className="rc-icon rc-iconography"/> */}
            </div>
            {initing ? (
              <div style={{ marginTop: '.625rem' }}>
                <Skeleton
                  color="#f5f5f5"
                  width="100%"
                  height="100%"
                  count={7}
                />
              </div>
            ) : (
              <header>
                <div className="rc-padding-bottom--md--mobile">
                  {filterList.length ? (
                    filterList.map((parentItem, pIndex) => (
                      <React.Fragment key={parentItem.id}>
                        <>
                          <div role="heading">
                            <div
                              className="rc-list__header text-break"
                              id={`accordion-header-${pIndex}`}
                              onClick={this.toggleContent.bind(
                                this,
                                pIndex,
                                parentItem.attributeName
                              )}
                            >
                              {/* when name=markPrice/subscription, get dictionary to multi lang  */}
                              <span>
                                {(parentItem.attributeName === 'markPrice' ||
                                  parentItem.attributeName ===
                                    'subscription') &&
                                markPriceAndSubscriptionLangDict.filter(
                                  (ele) => ele.name === parentItem.attributeName
                                ).length
                                  ? markPriceAndSubscriptionLangDict.filter(
                                      (ele) =>
                                        ele.name === parentItem.attributeName
                                    )[0].valueEn
                                  : parentItem.attributeNameEn}
                              </span>
                              {this.handleParentFilterCounts(parentItem)}
                              {/* {selectedFilterParams?.map((item, idx) => {
                                if (item.prefn == parentItem.attributeName) {
                                  return (
                                    <div
                                      className="filter-parent-item-count"
                                      key={idx}
                                    >
                                      <span>{item.prefvs.length}</span>
                                    </div>
                                  );
                                }
                              })} */}
                            </div>
                          </div>

                          <ul
                            className={`rc-list__content rc-expand--vertical  ${
                              parentItem.attributeName === 'markPrice'
                                ? 'list-price'
                                : ''
                            } ${parentItem.expand ? 'expand' : ''}`}
                            id={`accordion-content-${pIndex}`}
                          >
                            {parentItem.attributeName === 'markPrice' ? (
                              <PriceSlider
                                max={this.props.maxGoodsPrice}
                                defaultValue={[0, this.props.maxGoodsPrice]}
                                // key={this.props.maxGoodsPrice}
                                onChange={hanldePriceSliderChange}
                              />
                            ) : (
                              (
                                parentItem.attributesValueList ||
                                parentItem.storeGoodsFilterValueVOList ||
                                []
                              ).map((childItem) => {
                                return parentItem.choiceStatus ===
                                  'Single choice'
                                  ? this.renderSingleChoiceJSX(
                                      parentItem,
                                      childItem
                                    )
                                  : this.renderMultiChoiceJSX(
                                      parentItem,
                                      childItem
                                    );
                              })
                            )}
                          </ul>
                        </>
                      </React.Fragment>
                    ))
                  ) : (
                    <div className="ui-font-nothing mt-2">
                      <em className="rc-icon rc-incompatible--sm rc-iconography" />
                      <FormattedMessage id="list.errMsg3" />
                    </div>
                  )}
                </div>
              </header>
            )}
          </div>
        </nav>
        {selectedFilterParams.length ||
        this.props.prefnParamListSearch.length ? (
          <div className="filter-button-groups">
            <button
              className={`rc-btn rc-btn--sm rc-btn--two rc-margin-bottom--xs--mobile`}
              onClick={this.handleFilterClearBtn}
            >
              <FormattedMessage id="list.clearFilters" />
            </button>
            {filterList.length ? (
              <button
                className={`rc-btn rc-btn--one rc-margin-right--xs--mobile`}
                onClick={this.handleFilterApplyBtn}
              >
                <span>
                  <FormattedMessage id="list.applyFilters" />
                </span>
              </button>
            ) : null}
          </div>
        ) : null}
      </section>
    );
  }
}

export default Filter;
