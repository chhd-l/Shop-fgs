import React from 'react';
import { inject, observer } from 'mobx-react';
import { matchNamefromDict, getDictionary, formatDate } from '@/utils/utils';
import AddressPreview from '@/components/AddressPreview';
import cn from 'classnames';

const sessionItemRoyal = window.__.sessionItemRoyal;
const isFromFelin = sessionItemRoyal.get('from-felin');

@inject('configStore', 'paymentStore')
@observer
class AddrPreview extends React.Component {
  static defaultProps = { form: null, countryListDict: [], boldName: true };
  constructor(props) {
    super(props);
    this.state = { countryName: '' };
  }

  // todo 法国的form.country不应该有值，否则会显示此值
  componentDidMount() {
    const { form } = this.props;
    getDictionary({ type: 'country' }).then((res) => {
      this.setState({
        countryName: matchNamefromDict(res, form.country || form.countryId)
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
          data={Object.assign(form, {
            name: isFromFelin ? '' : [form.firstName, form.lastName].join(' '),
            countryName,
            phone: isFromFelin ? '' : form.phoneNumber || form.consigneeNumber,
            newDeliveryDate
          })}
        />
      </div>
    ) : null;
  }
}
export default AddrPreview;
