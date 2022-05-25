import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';

const PetItemDone = ({ item, className, idx, paymentStore }) => {
  const { petList, petSelectedIds } = paymentStore;
  return (
    <div className={cn('col-span-12 md:col-span-6 flex', className)}>
      <LazyLoad>
        <img className="w-16" alt={item.goodsName} src={item.goodsInfoImg} />
      </LazyLoad>

      <div className="ml-4">
        <p className="font-medium">{item.goodsName}</p>
        <p>{item.specText}</p>
        <p>
          <FormattedMessage id="quantity" />:{item.buyCount}
        </p>
        <p>
          <FormattedMessage id="payment.petProfile" />:
          {petList.find((p) => p.petsId === petSelectedIds[idx])?.petsName || (
            <FormattedMessage id="none" />
          )}
        </p>
      </div>
    </div>
  );
};

export default inject('paymentStore')(observer(PetItemDone));
