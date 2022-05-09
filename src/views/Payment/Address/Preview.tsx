import React, { useEffect, useState } from 'react';
import { matchNamefromDict, getDictionary, formatDate } from '@/utils/utils';
import { AddressPreview } from '@/components/Address';
import cn from 'classnames';
import cloneDeep from 'lodash/cloneDeep';

const sessionItemRoyal = window.__.sessionItemRoyal;
const isFromFelin = sessionItemRoyal.get('appointment-no');

interface Props {
  form: any;
  boldName?: boolean;
  titleJSX?: any;
}

const AddrPreview = ({ form, boldName = true, titleJSX }: Props) => {
  const [countryName, setCountryName] = useState<string>('');
  useEffect(() => {
    getDictionary({ type: 'country' }).then((res) => {
      setCountryName(matchNamefromDict(res, form?.country || form?.countryId));
    });
  }, [form?.country || form?.countryId]);

  const newDeliveryDate = formatDate({
    date: form?.deliveryDate,
    // @ts-ignore
    formatOption: { weekday: 'long', day: '2-digit', month: 'long' }
  });
  return form ? (
    <>
      {titleJSX ? titleJSX : null}
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
    </>
  ) : null;
};

export default AddrPreview;
