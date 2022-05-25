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
    baseSearchStr: '',
    maxGoodsPrice: 100,
    markPriceAndSubscriptionLangDict: []
  };
  constructor(props) {
    super(props);
    this.state = {
      filterList: props.filterList,
      selectedFilterParams: props.prefnParamListSearch || [],
      filtersCounts: 0
    };
    this.toggleContent = this.toggleContent.bind(this);
    this.hubGA = window.__.env.REACT_APP_HUB_GA == '1';
  }

  componentDidMount() {
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
  };

  FilterClick(parentItem, item) {
    //hub filter点击埋点
    const attributeName = parentItem?.attributeName || '';
    const attributeDetailName = item?.attributeDetailName || '';
    this.hubGA &&
      window?.dataLayer?.push({
        event: 'plpFilterClick',
        plpFilterClickName: `${attributeName}|${attributeDetailName}`
      });
  }

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

    this.FilterClick(parentItem, childItem);
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
    }
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
        {childItem.router ? (
          <span
            // to={childItem.router}
            className="rc-input rc-input--stacked"
          >
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
          </span>
        ) : (
          <span className="rc-input rc-input--stacked">
            <input
              className={`rc-input__checkbox`}
              id={`filter-input-${childItem.id}-${inputLabelKey}`}
              type="checkbox"
              name="checkbox"
              checked={childItem.selected}
              onChange={() => this.FilterClick(parentItem, childItem)}
            />
            <label
              className="rc-input__label--inline"
              htmlFor={`filter-input-${childItem.id}-${inputLabelKey}`}
            >
              {childItem.attributeDetailNameEn}
            </label>
          </span>
        )}
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
        {childItem.router ? (
          <span
            // to={childItem.router}
            onClick={() => this.FilterClick(parentItem, childItem)}
            className="rc-input w-100 rc-margin-y--xs rc-input--full-width ml-2"
          >
            <input
              name="notApplyChecked"
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
        ) : (
          <span className="rc-input w-100 rc-margin-y--xs rc-input--full-width ml-2">
            <input
              className="rc-input__radio"
              id={`filter-sub-radio-${childItem.id}-${inputLabelKey}`}
              type="radio"
              checked={childItem.selected}
              name="selected"
              onClick={() => this.FilterClick(parentItem, childItem)}
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
        )}
      </div>
    );
  };

  render() {
    const { filterList, selectedFilterParams, filtersCounts } = this.state;
    const {
      history,
      initing,
      hanldePriceSliderChange,
      markPriceAndSubscriptionLangDict,
      baseSearchStr
    } = this.props;
    const { pathname } = history.location;
    return (
      <div className="rc-filters__form filter-pc-wrap" name="example-filter">
        {initing ? (
          <div style={{ marginTop: '.625rem' }}>
            <Skeleton color="#f5f5f5" width="100%" height="100%" count={7} />
          </div>
        ) : (
          <>
            <header className="rc-filters__header">
              <button
                className="rc-md-down rc-stick-left rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography"
                type="button"
                onClick={this.handleClickCloseBtn}
              />
              <div className="rc-filters__heading rc-padding-top--sm rc-padding-bottom--xs rc-header-with-icon rc-header-with-icon--alpha pt-0 pb-0">
                <span className="md-up rc-icon rc-filter--xs rc-iconography fr-pc" />
                <FormattedMessage id="filters" />
                {filtersCounts && filterList ? (
                  <span className=" font-weight-normal font-18 rc-padding-left--xs">
                    ({filtersCounts})
                  </span>
                ) : null}
              </div>
              <div className="filter-bar">
                <ul className="mt-4 md:mt-0">
                  {filterList.map((pItem) => {
                    return (
                      pItem.attributesValueList ||
                      pItem.storeGoodsFilterValueVOList ||
                      []
                    ).map((cItem) => {
                      if (cItem.selected) {
                        return (
                          <li className="filter-value" key={cItem.id}>
                            {cItem.router ? (
                              <Link to={cItem.router}>
                                {cItem.attributeDetailNameEn}
                                <em className="rc-icon rc-close--sm rc-iconography inline-block" />
                              </Link>
                            ) : (
                              <span>
                                {cItem.attributeDetailNameEn}
                                <em className="rc-icon rc-close--sm rc-iconography inline-block" />
                              </span>
                            )}
                          </li>
                        );
                      } else {
                        return null;
                      }
                    });
                  })}
                </ul>
              </div>
              {this.hasSelecedItems && (
                <li className="text-center rc-margin-y--xs rc-padding-bottom--xs">
                  <Link
                    to={{ pathname, search: `?${baseSearchStr}` }}
                    className="rc-styled-link js-clear-filter"
                  >
                    <FormattedMessage id="removeAllFilters" />
                  </Link>
                </li>
              )}
            </header>

            <div className="rc-margin--none">
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
                              parentItem.attributeName === 'subscription') &&
                            markPriceAndSubscriptionLangDict.filter(
                              (ele) => ele.name === parentItem.attributeName
                            ).length
                              ? markPriceAndSubscriptionLangDict.filter(
                                  (ele) => ele.name === parentItem.attributeName
                                )[0].valueEn
                              : parentItem.attributeNameEn}
                          </span>
                          {this.handleParentFilterCounts(parentItem)}
                        </div>
                      </div>

                      <ul
                        className={`rc-list__content rc-expand--vertical ${
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
                            return parentItem.choiceStatus === 'Single choice'
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
              {/* 第一次选择和应用过filter后选择都需要展示 */}
              {selectedFilterParams.length ||
              this.props.prefnParamListSearch.length ? (
                <div className="filter-button-groups  text-center">
                  <button
                    className={`rc-btn rc-btn--sm rc-btn--two rc-margin-bottom--xs w-100`}
                    onClick={this.handleFilterClearBtn}
                  >
                    <FormattedMessage id="list.clearFilters" />
                  </button>
                  {filterList.length ? (
                    <button
                      className={`rc-btn rc-btn--one rc-btn--sm rc-margin-left--none rc-margin-bottom--xs w-100`}
                      onClick={this.handleFilterApplyBtn}
                    >
                      <FormattedMessage id="list.applyFilters" />
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Filter;
