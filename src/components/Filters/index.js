import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage } from 'react-intl';
import { findIndex, find } from 'lodash';
import '@/assets/css/search.css';
import './index.css';

class Filter extends React.Component {
  static defaultProps = {
    initing: true,
    filterList: []
  };
  constructor(props) {
    super(props);
    this.state = {
      initing: props.initing,
      prevIniting: props.initing,
      filterListCopy: props.filterList
    };
    this.matchParentCatogery = this.matchParentCatogery.bind(this);
    this.toggleContent = this.toggleContent.bind(this);
    this.hanldeRemove = this.hanldeRemove.bind(this);
    this.contentRef = React.createRef();
  }
  get computedCheckList() {
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
    let tmp = find(this.state.filterListCopy, (l) => l.propId === data.propId);
    if (tmp) {
      res = tmp.propName.toLocaleLowerCase();
    }
    return res;
  }
  toggleContent(idx) {
    let { filterListCopy } = this.state;
    filterListCopy.map((f, i) => {
      if (i === idx) {
        f.expand = !f.expand;
      } else {
        f.expand = false;
      }
      return f;
    });
    this.setState({
      filterListCopy: filterListCopy
    });
  }
  hanldeRemove(data) {
    this.props.onRemove(data);
    if (data === 'all') {
      let { filterListCopy } = this.state;
      filterListCopy.map((f) => (f.expand = false));
      this.setState({
        filterListCopy: filterListCopy
      });
      this.props.onToggleFilterModal(false);
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.initing !== state.prevIniting) {
      return {
        filterListCopy: props.filterList
      };
    }
    return null;
  }
  render() {
    const { computedCheckList } = this;
    const { filterListCopy } = this.state;
    const { onChange, checkedList, initing } = this.props;
    return (
      <div className="rc-filters__form" name="example-filter">
        {initing ? (
          <div style={{ marginTop: '10px' }}>
            <Skeleton color="#f5f5f5" width="100%" height="100%" count={7} />
          </div>
        ) : (
          <React.Fragment>
            <header className="rc-filters__header">
              <button
                className="rc-md-down rc-stick-left rc-btn rc-btn--icon rc-icon rc-close--xs rc-iconography"
                type="button"
                onClick={() => this.props.onToggleFilterModal(false)}
              ></button>
              <div className="rc-filters__heading rc-padding-top--sm rc-padding-bottom--xs rc-header-with-icon rc-header-with-icon--alpha pt-0 pb-0">
                <span className="md-up rc-icon rc-filter--xs rc-iconography"></span>
                <FormattedMessage id="filters" />
              </div>
              <div className="filter-bar">
                <ul>
                  {computedCheckList.map((v, i) => (
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
                            onClick={() => this.hanldeRemove(v)}
                          ></i>
                        </li>
                      )}
                    </FormattedMessage>
                  ))}
                </ul>
              </div>
              {checkedList.length ? (
                <div className="text-center rc-margin-y--xs rc-padding-bottom--xs">
                  <span
                    className="rc-styled-link js-clear-filter"
                    onClick={() => this.hanldeRemove('all')}
                  >
                    <FormattedMessage id="removeAllFilters" />
                  </span>
                </div>
              ) : (
                ''
              )}
            </header>

            <div className="rc-margin--none" ref={this.contentRef}>
              {filterListCopy.length ? (
                filterListCopy.map((f, index) => (
                  <React.Fragment key={index}>
                    <div role="heading">
                      <div
                        className="rc-list__header"
                        id={`accordion-header-${index}`}
                        onClick={() => this.toggleContent(index)}
                      >
                        {f.propName}
                      </div>
                    </div>
                    <ul
                      className={[
                        'rc-list__content',
                        'rc-expand--vertical',
                        f.expand ? 'expand' : ''
                      ].join(' ')}
                      id={`accordion-content-${index}`}
                    >
                      {f.goodsPropDetails.map((l, i) => (
                        <li
                          title={`Sort by ${f.propName.toLocaleLowerCase()}: ${
                            l.detailName
                          }`}
                          className="rc-list__item"
                          key={index + '-' + i}
                        >
                          <div className="rc-input rc-input--stacked">
                            <input
                              className="rc-input__checkbox"
                              id={`input-${index}-${i}`}
                              type="checkbox"
                              name="checkbox"
                              checked={
                                findIndex(
                                  checkedList,
                                  (c) =>
                                    c.detailId === l.detailId &&
                                    c.propId === l.propId
                                ) > -1
                              }
                              value={l.propName}
                              onChange={onChange.bind(this, l)}
                            />
                            <label
                              className="rc-input__label--inline"
                              htmlFor={`input-${index}-${i}`}
                            >
                              {l.detailName}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                ))
              ) : (
                <div className="ui-font-nothing mt-2">
                  <i className="rc-icon rc-incompatible--sm rc-iconography"></i>
                  <FormattedMessage id="list.errMsg3" />
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Filter;
