import React from 'react';
import { matchNamefromDict, getDictionary } from '@/utils/utils';

export default class AddressPreview extends React.Component {
  static defaultProps = { form: null, countryListDict: [], boldName: true };
  constructor(props) {
    super(props);
    this.state = { countryList: [] };
  }
  componentDidMount() {
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryList: res
      });
    });
  }
  render() {
    const { form, boldName } = this.props;
    return form ? (
      <div>
        <span className={`${boldName ? 'medium' : ''}`}>
          {form.firstName + ' ' + form.lastName}
        </span>
        <br />
        <span>{form.phoneNumber || form.consigneeNumber}</span>
        <br />
        <span>{form.address1}</span>
        <br />
        <span>{form.address2}</span>
        <span>{form.address2 ? <br /> : null}</span>
        <span>
          {form.postCode}, {form.cityName},{' '}
          {matchNamefromDict(
            this.state.countryList,
            form.country || form.countryId
          )}
        </span>
      </div>
    ) : null;
  }
}
