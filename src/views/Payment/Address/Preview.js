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
      <div className="children-nomargin">
        <p className={`${boldName ? 'medium' : ''}`}>
          {form.firstName + ' ' + form.lastName}
        </p>
        <p>{form.phoneNumber || form.consigneeNumber}</p>
        <p>{form.address1}</p>
        {form.address2 ? <p>{form.address2}</p> : null}
        <p>
          <span>
            {form.postCode}, {form.cityName},{' '}
          </span>
          <span>
            {matchNamefromDict(
              this.state.countryList,
              form.country || form.countryId
            )}
          </span>
        </p>
      </div>
    ) : null;
  }
}
