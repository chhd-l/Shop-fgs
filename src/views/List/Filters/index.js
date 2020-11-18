import React, { Fragment } from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage } from 'react-intl';
import { findIndex, find } from 'lodash';
import PriceSlider from '@/components/PriceSlider';
import '@/assets/css/search.css';
import './index.less';

class Filter extends React.Component {
  static defaultProps = {
    initing: true,
    filterList: []
  };
  constructor(props) {
    super(props);
    this.state = {
      filterList: props.filterList,
      checkedObjForAttr: null,
      checkedObjForFilter: null
    };
    this.toggleContent = this.toggleContent.bind(this);
    this.hanldeRemove = this.hanldeRemove.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  get computedCheckList() {
    return [];
    return this.props.checkedList.map((v) => {
      return Object.assign(
        {},
        { parentCatogery: this.matchParentCatogery(v) },
        v
      );
    });
  }
  matchParentCatogery(data) {
    let res = '';
    let tmp = find(this.state.filterList, (l) => l.propId === data.propId);
    if (tmp) {
      res = tmp.propName && tmp.propName.toLocaleLowerCase();
    }
    return res;
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
  hanldeRemove(data) {
    this.props.onRemove(data);
    if (data === 'all') {
      let { filterList } = this.state;
      filterList.map((f) => (f.expand = false));
      this.setState({
        filterList
      });
      this.handleClickCloseBtn();
    }
  }
  handleClickCloseBtn = () => {
    this.props.onToggleFilterModal(false);
  };
  // handleFilterChange() {
  //   debugger;
  //   this.setState({ checkedObjForAttr: 1 }, () => {
  //     console.log(122121, this.state.checkedObjForAttr);
  //   });
  // }
  handleFilterChange(parentItem, item) {
    debugger;
    let { checkedObjForAttr, checkedObjForFilter } = this.state;
    if (parentItem.filterType === '0') {
      checkedObjForAttr = checkedObjForAttr || {};
      let valueList = (checkedObjForAttr[item.attributeId] =
        checkedObjForAttr[item.attributeId] || []);

      // 判断删除或新增
      // 该孩子id是否存在于list中，
      const index = findIndex(valueList, (c) => c.id === item.id);
      if (index > -1) {
        valueList.splice(index, 1); // 删除
      } else {
        valueList.push(item);
      }

      debugger;
      this.setState({ checkedObjForAttr });
    } else {
      checkedObjForFilter = checkedObjForFilter || {};
      let valueList = (checkedObjForFilter[item.filterId] =
        checkedObjForFilter[item.filterId] || []);

      // 判断删除或新增
      // 该孩子id是否存在于list中，
      const index = findIndex(valueList, (c) => c.id === item.id);
      if (index > -1) {
        valueList.splice(index, 1); // 删除
      } else {
        valueList.push(item);
      }

      debugger;
      this.setState({ checkedObjForFilter });
    }
  }
  render() {
    const { computedCheckList } = this;
    const { filterList, checkedObjForAttr, checkedObjForFilter } = this.state;
    const { onChange, initing } = this.props;
    console.log(2222222222, checkedObjForAttr);
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
                <ul>
                  {(computedCheckList || []).map((v, i) => (
                    <FormattedMessage id="sortedBy" key={i}>
                      {(txt) => (
                        <li
                          className="filter-value"
                          title={`${txt} ${v.parentCatogery}: ${v.detailName}`}
                          key={v + i}
                        >
                          {v.detailName}
                          <i
                            className="filter-remove"
                            onClick={this.hanldeRemove.bind(this, v)}
                          />
                        </li>
                      )}
                    </FormattedMessage>
                  ))}
                </ul>
              </div>
              {checkedObjForAttr || checkedObjForFilter ? (
                <div className="text-center rc-margin-y--xs rc-padding-bottom--xs">
                  <span
                    className="rc-styled-link js-clear-filter"
                    onClick={this.hanldeRemove.bind(this, 'all')}
                  >
                    <FormattedMessage id="removeAllFilters" />
                  </span>
                </div>
              ) : (
                ''
              )}
            </header>

            <div className="rc-margin--none">
              {filterList.length ? (
                filterList.map((f, index) => (
                  <React.Fragment key={index}>
                    <>
                      <div role="heading">
                        <div
                          className="rc-list__header"
                          id={`accordion-header-${index}`}
                          onClick={this.toggleContent.bind(this, index)}
                        >
                          {f.attributeName}
                        </div>
                      </div>

                      <ul
                        className={`rc-list__content rc-expand--vertical ${
                          f.expand ? 'expand' : ''
                        }`}
                        id={`accordion-content-${index}`}
                      >
                        {f.filterType === '0' ? (
                          f.attributesValueList.map((l, i) => (
                            <li
                              title={`Sort by ${f.attributeName.toLocaleLowerCase()}: ${
                                l.attributeDetailName
                              }`}
                              className="rc-list__item"
                              key={index + '-' + i}
                            >
                              <div className="rc-input rc-input--stacked">
                                <input
                                  className={`2222 rc-input__checkbox ${
                                    checkedObjForAttr &&
                                    checkedObjForAttr[l.attributeId]
                                      ? JSON.stringify(
                                          checkedObjForAttr[l.attributeId]
                                        ) +
                                        'ddd' +
                                        JSON.stringify(
                                          checkedObjForAttr[l.attributeId].find(
                                            (c) => c.id === l.id
                                          )
                                        )
                                      : null
                                  }`}
                                  id={`filter-input-${index}-${i}`}
                                  type="checkbox"
                                  name="checkbox"
                                  checked={
                                    checkedObjForAttr &&
                                    checkedObjForAttr[l.attributeId] &&
                                    checkedObjForAttr[l.attributeId].find(
                                      (c) => c.id === l.id
                                    )
                                      ? true
                                      : false
                                  }
                                  // value={l.propName}
                                  onChange={this.handleFilterChange.bind(
                                    this,
                                    f,
                                    l
                                  )}
                                />
                                <label
                                  className="rc-input__label--inline"
                                  htmlFor={`filter-input-${index}-${i}`}
                                >
                                  {l.attributeDetailName}
                                </label>
                              </div>
                            </li>
                          ))
                        ) : f.attributeName === 'markPrice' ? (
                          <PriceSlider
                            onChange={(val) => {
                              console.log(333, val);
                            }}
                          />
                        ) : f.attributeName === 'subscription' &&
                          f.choiceStatus === 'Single choice' ? (
                          f.storeGoodsFilterValueVOList.map((ele) => (
                            <div
                              key={ele.id}
                              className="row rc-margin-left--none rc-padding-left--none rc-margin-left--xs rc-padding-left--xs"
                            >
                              <div className="rc-input w-100 rc-margin-y--xs rc-input--full-width ml-2">
                                <input
                                  className="rc-input__radio"
                                  id={`filter-sub-radio-${ele.id}`}
                                  type="radio"
                                  onChange={this.handleFilterChange.bind(
                                    this,
                                    f,
                                    ele
                                  )}
                                  // checked={}
                                />
                                <label
                                  className="rc-input__label--inline"
                                  htmlFor={`filter-sub-radio-${ele.id}`}
                                >
                                  {ele.attributeDetailName}
                                </label>
                              </div>
                            </div>
                          ))
                        ) : null}
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
