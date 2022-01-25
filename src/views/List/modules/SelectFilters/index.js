import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
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
      <div className="rc-rc-filters__header rc-padding-left--none--desktop pointer-events-auto px-3">
        <div className="filter-bar">
          {isSelectedFilter ? (
            <ul className="md:mt-0">
              {filterList.map((pItem) => {
                return (
                  pItem.attributesValueList ||
                  pItem.storeGoodsFilterValueVOList ||
                  []
                ).map((cItem) => {
                  if (cItem.selected) {
                    return (
                      <li className="filter-value px-1 py-0" key={cItem.id}>
                        <Link to={cItem.router}>
                          {cItem.attributeDetailNameEn}
                          <em className="rc-icon rc-close--xs rc-iconography inline-block" />
                        </Link>
                      </li>
                    );
                  } else {
                    return null;
                  }
                });
              })}
              {this.hasSelecedItems && (
                <li className="mt-3 d-inline-block" key="removeAllFilters">
                  <Link
                    className="underline font-weight-normal"
                    to={{ pathname, search: `?${baseSearchStr}` }}
                  >
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
