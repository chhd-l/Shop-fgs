import Selection from '@/components/Selection';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

const PetListSelection = ({ paymentStoreNew, idx }) => {
  const { petList, petSelectedIds, setPetSelectedIds } = paymentStoreNew;

  return (
    <Selection
      selectedItemChange={(data) => {
        petSelectedIds.splice(idx, 0, data.value);
        setPetSelectedIds(petSelectedIds);
      }}
      optionList={[
        {
          name: <FormattedMessage id="payment.noPetProfileSelected" />,
          value: -1
        },
        ...petList.map((l) => ({
          value: l.petsId,
          name: l.petsName
        }))
      ]}
      choicesInput={true}
      // emptyFirstItem={'State'}
      name={''}
      selectedItemData={{ value: petSelectedIds[idx] || -1 }}
    />
  );
};

export default inject('paymentStoreNew')(observer(PetListSelection));
