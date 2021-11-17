import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

class SelectFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  get hasSelecedItems() {
    let ret = false;
    const { filterList } = this.props;
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

  render() {
    const { history, baseSearchStr, filterList } = this.props;
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
    return (
      <div
        className="rc-rc-filters__header rc-padding-left--none--desktop pointer-events-auto"
        style={{ backgroundColor: '#f6f6f6' }}
      >
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
                  <Link to={{ pathname, search: `?${baseSearchStr}` }}>
                    <FormattedMessage id="removeAllFilters" />
                  </Link>
                </li>
              )}
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SelectFilters;
