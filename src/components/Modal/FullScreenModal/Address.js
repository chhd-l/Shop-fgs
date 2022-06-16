//deliveryAddress+billingAddress通用
import React, { useContext } from 'react';
import stores from '@/store';

export default function Address(props) {
  const { deliveryAddressInfo, billingAddressInfo } = props;
  let addressInfo = '';
  if (deliveryAddressInfo) {
    addressInfo = deliveryAddressInfo;
  } else {
    addressInfo = billingAddressInfo;
  }
  return (
    <p>
      Adres:
      <span>
        {addressInfo.country +
          ',' +
          addressInfo.city +
          ',' +
          addressInfo.area +
          ',' +
          addressInfo?.address1}
      </span>
    </p>
  );
}
