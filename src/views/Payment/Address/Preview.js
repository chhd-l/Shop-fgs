import React from 'react';
import { matchNamefromDict, getDictionary, formatDate } from '@/utils/utils';
import { AddressPreview } from '@/components/Address';
import cn from 'classnames';
import cloneDeep from 'lodash/cloneDeep';

const sessionItemRoyal = window.__.sessionItemRoyal;
const isFromFelin = sessionItemRoyal.get('appointment-no');

class AddrPreview extends React.Component {
  static defaultProps = { form: null, countryListDict: [], boldName: true };
  constructor(props) {
    super(props);
    this.state = { countryName: '' };
  }

  componentDidMount() {
    const { form } = this.props;
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryName: matchNamefromDict(res, form.country || form.countryId, 11)
      });
    });
  }
  render() {
    const { form, boldName } = this.props;
    const { countryName } = this.state;
    const newDeliveryDate = formatDate({
      date: form?.deliveryDate,
      formatOption: { weekday: 'long', day: '2-digit', month: 'long' }
    });

    return form ? (
      <div className="children-nomargin">
        <AddressPreview
          nameCls={cn('font-weight-bold', { medium: boldName })}
          pickupNameCls={cn('font-weight-bold flex justify-between', {
            medium: boldName
          })}
          data={cloneDeep(
            Object.assign(form, {
              name: isFromFelin
                ? ''
                : [form.firstName, form.lastName].join(' '),
              countryName,
              phone: isFromFelin
                ? ''
                : form.phoneNumber || form.consigneeNumber,
              newDeliveryDate
            })
          )}
        />
      </div>
    ) : null;
  }
}
export default AddrPreview;
