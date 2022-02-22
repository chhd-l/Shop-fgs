import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import PetListSelection from './PetListSelection';

const PetItem = ({ item, className, idx }) => {
  return (
    <div
      className={cn(
        'petProduct flex flex-col md:flex-row justify-between md:items-center',
        className
      )}
    >
      <div className="flex">
        <LazyLoad>
          <img
            className="w-16"
            alt="goods information image"
            src={item.goodsInfoImg}
          />
        </LazyLoad>

        <div className="ml-5">
          <p className="font-medium">{item.goodsName}</p>
          <p>{item.specText}</p>
          <p>
            <FormattedMessage id="quantity" />:{item.buyCount}
          </p>
        </div>
      </div>
      <div className="ml-20 md:ml-5">
        <FormattedMessage id="payment.selectPetProfile" />
        <PetListSelection idx={idx} />
        {/* <button
          className="rc-btn rc-btn--sm rc-btn--one"
          onClick={() => {
            setPetModalVisible(true);
            setCurrentProIndex(i);
          }}
        >
          Select a pet
        </button> */}
      </div>
    </div>
  );
};

export default inject('checkoutStore', 'loginStore')(observer(PetItem));
