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
    console.log('16    Preview: ', this.props.form);
  }
  render() {
    const { form, boldName, isLogin } = this.props;

    return form ? (
      <div className="children-nomargin">
        {/* {JSON.stringify(form)} */}
        <p className={`${boldName ? 'medium' : ''}`}>
          {form.firstName + ' ' + form.lastName}
        </p>
        <p>{form.address1}</p>
        {form.address2 ? <p>{form.address2}</p> : null}

        {/* 俄罗斯计算运费 */}
        {process.env.REACT_APP_LANG == 'ru' ? (
          <>
            <p>{form.phoneNumber || form.consigneeNumber} </p>
            {/* 是否存在运费 */}
            {form?.calculation?.deliveryPrice &&
              form?.calculation?.minDeliveryTime && (
                <>
                  <p>
                    <FormattedMessage id="payment.deliveryFee" />:{' '}
                    {formatMoney(form?.calculation?.deliveryPrice)}
                  </p>
                  {form?.calculation?.minDeliveryTime && (
                    <>
                      {form?.calculation?.minDeliveryTime ==
                      form?.calculation?.maxDeliveryTime ? (
                        <FormattedMessage
                          id="payment.deliveryDate2"
                          values={{
                            val: form?.calculation?.minDeliveryTime
                          }}
                        />
                      ) : (
                        <FormattedMessage
                          id="payment.deliveryDate"
                          values={{
                            min: form?.calculation?.minDeliveryTime,
                            max: form?.calculation?.maxDeliveryTime
                          }}
                        />
                      )}
                    </>
                  )}
                </>
              )}
          </>
        ) : (
          <>
            <p>
              <span>{[form.postCode, form.city, ' '].join(',')}</span>

              {form.province && form.province != null && (
                <span>{form.province}</span>
              )}

              {process.env.REACT_APP_LANG == 'en' ? null : (
                <>
                  ,
                  <span>
                    {matchNamefromDict(
                      this.state.countryList,
                      form.country || form.countryId
                    )}
                  </span>
                </>
              )}
            </p>
            <p>{form.phoneNumber || form.consigneeNumber} </p>
          </>
        )}
      </div>
    ) : null;
  }
}
