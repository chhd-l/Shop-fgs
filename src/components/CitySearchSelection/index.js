import React from 'react';
import { injectIntl } from 'react-intl-phraseapp';
import SearchSelection from '@/components/SearchSelection';
import { queryCityByName } from '@/api/address';

@injectIntl
class CitySearchSelection extends React.Component {
  static defaultProps = {
    name: '',
    searchSelectionBlur: () => {}
  };
  render() {
    return (
      <>
        <SearchSelection
          queryList={async ({ inputVal, pageNum }) => {
            let res = await queryCityByName({
              cityName: inputVal,
              pages: pageNum
            });
            return ((res.context && res.context.systemCityVO) || []).map(
              (ele) => Object.assign(ele, { name: ele.cityName })
            );
          }}
          selectedItemChange={(data) => this.props.onChange(data)}
          defaultValue={this.props.defaultValue}
          key={this.props.defaultValue}
          freeText={this.props.freeText}
          name={this.props.name}
          placeholder={
            this.props.placeholder
              ? this.props.intl.messages.inputSearchText
              : ''
          }
          customStyle={true}
          isBottomPaging={true}
          isCitySearchSelection={true}
          searchSelectionBlur={(e) => this.props.searchSelectionBlur(e)}
        />
      </>
    );
  }
}

export default CitySearchSelection;
