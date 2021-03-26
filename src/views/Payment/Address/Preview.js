import React from 'react';
import { formatMoney, matchNamefromDict, getDictionary } from '@/utils/utils';
import { FormattedMessage } from 'react-intl';
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
    const { form, boldName, isLogin } = this.props;

    return form ? (
      <div className="children-nomargin">
        {/* {JSON.stringify(form)} */}
        <p className={`${boldName ? 'medium' : ''}`}>
          {form.firstName + ' ' + form.lastName}
        </p>
        <p>{form.phoneNumber || form.consigneeNumber}</p>
        <p>{form.address1}</p>
        {form.address2 ? <p>{form.address2}</p> : null}
        {process.env.REACT_APP_LANG == 'ru' ? (
          <>
            {form.city && form.city != null ? (
              <>
                {form.city} и {form.city}
                <br />
                <p>
                  <FormattedMessage id="payment.deliveryFee" />:{' '}
                  {formatMoney(form?.calculation?.deliveryPrice)}
                </p>
                <FormattedMessage
                  id="payment.deliveryDate"
                  values={{
                    min: form?.calculation?.minDeliveryTime,
                    max: form?.calculation?.maxDeliveryTime
                  }}
                />
              </>
            ) : null}
          </>
        ) : (
          <p>
            <span>{[form.postCode, form.city, ' '].join(',')}</span>

            {form.province && form.province != null && (
              <span>{form.province}, </span>
            )}

            <span>
              {matchNamefromDict(
                this.state.countryList,
                form.country || form.countryId
              )}
            </span>
          </p>
        )}
      </div>
    ) : null;
  }
}
