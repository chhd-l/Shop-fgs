import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage } from 'react-intl';
import PriceSlider from '@/components/PriceSlider';
import '@/assets/css/search.css';
import './index.less';

class Filter extends React.Component {
  static defaultProps = {
    initing: true,
    filterList: [],
    updateParentData: () => {},
    maxGoodsPrice: 100,
    markPriceAndSubscriptionLangDict: []
  };
  constructor(props) {
    super(props);
    this.state = {
      filterList: props.filterList
    };
    this.toggleContent = this.toggleContent.bind(this);
    this.hanldeClickRemoveAll = this.hanldeClickRemoveAll.bind(this);
    this.handleClickValueItem = this.handleClickValueItem.bind(this);
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
  toggleContent(idx) {
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
  }
  hanldeClickRemoveAll() {
    let { filterList } = this.state;
    Array.from(filterList, (parentEle) => {
      Array.from(
        parentEle.attributesValueList ||
          parentEle.storeGoodsFilterValueVOList ||
          [],
        (childEle) => {
          childEle.selected = false;
          return childEle;
        }
      );
      return parentEle;
    });

    this.setState(
      {
        filterList
      },
      () => this.props.updateParentData(this.state.filterList)
    );
    this.handleClickCloseBtn();
  }
  handleClickCloseBtn = () => {
    this.props.onToggleFilterModal(false);
  };
  handleClickValueItem({ parentItem, item, isRemoveOperate = false }) {
    // radio情况下 点击删除应置为false
    let { filterList } = this.state;
    if (parentItem.choiceStatus === 'Multiple choice') {
      item.selected = !item.selected;
    } else if (parentItem.choiceStatus === 'Single choice') {
      // 同级其他设置为false
      Array.from(
        parentItem.attributesValueList ||
          parentItem.storeGoodsFilterValueVOList ||
          [],
        (ele) => {
          ele.selected = false;
          return ele;
        }
      );
      if (isRemoveOperate) {
        item.selected = false;
      } else {
        item.selected = true;
      }
    }
    this.setState(
      {
        filterList
      },
      () => this.props.updateParentData(this.state.filterList)
    );
  }
  renderMultiChoiceJSX = (parentItem, childItem) => {
    const { inputLabelKey } = this.props;
    return (
      <li
        title={`Sort by ${parentItem.attributeName.toLocaleLowerCase()}: ${
          childItem.attributeDetailName
        }`}
        className="rc-list__item"
        key={childItem.id}
      >
        <div className="rc-input rc-input--stacked">
          <input
            className={`rc-input__checkbox`}
            id={`filter-input-${childItem.id}-${inputLabelKey}`}
            type="checkbox"
            name="checkbox"
            checked={childItem.selected}
            onChange={this.handleClickValueItem.bind(this, {
              parentItem,
              item: childItem
            })}
          />
          <label
            className="rc-input__label--inline"
            htmlFor={`filter-input-${childItem.id}-${inputLabelKey}`}
          >
            {childItem.attributeDetailName}
          </label>
        </div>
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
        <div className="rc-input w-100 rc-margin-y--xs rc-input--full-width ml-2">
          <input
            className="rc-input__radio"
            id={`filter-sub-radio-${childItem.id}-${inputLabelKey}`}
            type="radio"
            checked={childItem.selected}
            onChange={this.handleClickValueItem.bind(this, {
              parentItem,
              item: childItem
            })}
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
              : childItem.attributeDetailName}
          </label>
        </div>
      </div>
    );
  };
  render() {
    const { filterList } = this.state;
    const {
      initing,
      hanldePriceSliderChange,
      markPriceAndSubscriptionLangDict
    } = this.props;
    return (
      <div className="rc-filters__form" name="example-filter">
        {initing ? (
          <div style={{ marginTop: '10px' }}>
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
                <span className="md-up rc-icon rc-filter--xs rc-iconography" />
                <FormattedMessage id="filters" />
              </div>
              <div className="filter-bar">
                <ul className="mt-4 mt-md-0">
                  {filterList.map((pItem) => {
                    return (
                      pItem.attributesValueList ||
                      pItem.storeGoodsFilterValueVOList ||
                      []
                    ).map((cItem) => {
                      if (cItem.selected) {
                        return (
                          <li className="filter-value" key={cItem.id}>
                            {cItem.attributeDetailName}
                            <i
                              className="filter-remove"
                              onClick={this.handleClickValueItem.bind(this, {
                                parentItem: pItem,
                                item: cItem,
                                isRemoveOperate: true
                              })}
                            />
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
                <div className="text-center rc-margin-y--xs rc-padding-bottom--xs">
                  <span
                    className="rc-styled-link js-clear-filter"
                    onClick={this.hanldeClickRemoveAll}
                  >
                    <FormattedMessage id="removeAllFilters" />
                  </span>
                </div>
              )}
            </header>

            <div className="rc-margin--none">
              {filterList.length ? (
                filterList.map((parentItem, pIndex) => (
                  <React.Fragment key={parentItem.id}>
                    <>
                      <div role="heading">
                        <div
                          className="rc-list__header"
                          id={`accordion-header-${pIndex}`}
                          onClick={this.toggleContent.bind(this, pIndex)}
                        >
                          {/* when name=markPrice/subscription, get dictionary to multi lang  */}
                          {(parentItem.attributeName === 'markPrice' ||
                            parentItem.attributeName === 'subscription') &&
                          markPriceAndSubscriptionLangDict.filter(
                            (ele) => ele.name === parentItem.attributeName
                          ).length
                            ? markPriceAndSubscriptionLangDict.filter(
                                (ele) => ele.name === parentItem.attributeName
                              )[0].valueEn
                            : parentItem.attributeName}
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
                  <i className="rc-icon rc-incompatible--sm rc-iconography" />
                  <FormattedMessage id="list.errMsg3" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Filter;
