import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import PriceSlider from '@/components/PriceSlider';
import '@/assets/css/search.css';
import './index.less';

class Filter extends React.Component {
  static defaultProps = {
    history: null,
    initing: true,
    filterList: [],
    maxGoodsPrice: 100,
    markPriceAndSubscriptionLangDict: []
  };
  constructor(props) {
    super(props);
    this.state = {
      filterList: props.filterList
    };
    this.toggleContent = this.toggleContent.bind(this);
    this.hubGA = window.__.env.REACT_APP_HUB_GA == '1';
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

  // handleClickCloseBtn = () => {
  //   this.props.onToggleFilterModal(false);
  // };
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
        <Link to={childItem.router} className="rc-input rc-input--stacked">
          <input
            className={`rc-input__checkbox`}
            id={`filter-input-${childItem.id}-${inputLabelKey}`}
            type="checkbox"
            name="checkbox"
            checked={childItem.selected}
          />
          <label
            className="rc-input__label--inline"
            htmlFor={`filter-input-${childItem.id}-${inputLabelKey}`}
          >
            {childItem.attributeDetailNameEn}
          </label>
        </Link>
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
        <Link
          to={childItem.router}
          className="rc-input w-100 rc-margin-y--xs rc-input--full-width ml-2"
        >
          <input
            className="rc-input__radio"
            id={`filter-sub-radio-${childItem.id}-${inputLabelKey}`}
            type="radio"
            checked={childItem.selected}
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
        </Link>
      </div>
    );
  };
  render() {
    const { filterList } = this.state;
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
          className="rc-nav rc-md-down "
          data-toggle-group="mobile"
          data-toggle-effect="rc-expand--horizontal"
        >
          <div className="rc-filters__form fr-mobile" name="example-filter">
            <div
              onClick={this.props.handleCloseFilter(false)}
              className="flex w-100 align-items-center justify-content-between rc-padding-x--sm--mobile"
            >
              <div>
                <em
                  className={`rc-icon rc-filter--xs rc-iconography`}
                  data-filter-trigger="filter-example"
                  style={{ position: 'relative', top: '0.2rem' }}
                />
                <span className=" font-weight-normal font-18 rc-padding-left--sm">
                  <FormattedMessage id={'Close filters'} />
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
                <header
                  className="rc-rc-filters__header rc-padding-left--none--desktop pointer-events-auto"
                  style={{ backgroundColor: '#f6f6f6' }}
                >
                  {/* <button
                className="rc-md-down rc-stick-left rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography"
                type="button"
                onClick={this.handleClickCloseBtn}
              />
              <div className="rc-filters__heading rc-padding-top--sm rc-padding-bottom--xs rc-header-with-icon rc-header-with-icon--alpha pt-0 pb-0">
                <span className="md-up rc-icon rc-filter--xs rc-iconography" />
                <FormattedMessage id="filters" />
              </div> */}
                  <div className="filter-bar">
                    {isSelectedFilter ? (
                      <ul className="mt-md-0">
                        {filterList.map((pItem) => {
                          return (
                            pItem.attributesValueList ||
                            pItem.storeGoodsFilterValueVOList ||
                            []
                          ).map((cItem) => {
                            if (cItem.selected) {
                              return (
                                <li className="filter-value" key={cItem.id}>
                                  <Link to={cItem.router}>
                                    {cItem.attributeDetailNameEn}
                                    <em className="filter-remove" />
                                  </Link>
                                </li>
                              );
                            } else {
                              return null;
                            }
                          });
                        })}
                        {this.hasSelecedItems && (
                          <li
                            className="d-md-none rc-margin-top--sm--mobile rc-margin-left--md--mobile rc-margin-bottom--md--mobile d-inline-block"
                            key="removeAllFilters"
                          >
                            <Link
                              to={{ pathname, search: `?${baseSearchStr}` }}
                            >
                              <FormattedMessage id="removeAllFilters" />
                            </Link>
                          </li>
                        )}
                      </ul>
                    ) : (
                      <div style={{ borderBottom: '1px solid #ccc' }} />
                    )}
                  </div>
                </header>

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
                              {(parentItem.attributeName === 'markPrice' ||
                                parentItem.attributeName === 'subscription') &&
                              markPriceAndSubscriptionLangDict.filter(
                                (ele) => ele.name === parentItem.attributeName
                              ).length
                                ? markPriceAndSubscriptionLangDict.filter(
                                    (ele) =>
                                      ele.name === parentItem.attributeName
                                  )[0].valueEn
                                : parentItem.attributeNameEn}
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
      </section>
    );
  }
}

export default Filter;
