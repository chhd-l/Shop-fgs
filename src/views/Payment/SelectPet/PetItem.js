import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import LazyLoad from 'react-lazyload';
import PetListSelection from './PetListSelection';
import { getPetList } from '@/api/pet';

const PetItem = ({ loginStore, item, className, idx }) => {
  const { isLogin, userInfo } = loginStore;
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPetList({
        customerId: userInfo.customerId,
        consumerAccount: userInfo.customerAccount
      });
      setList(res.context.context);
    };
    if (isLogin) {
      fetchData();
    }
  }, [isLogin]);
  return (
    <div
      className={cn('petProduct flex justify-between items-center', className)}
    >
      <div className="flex">
        <LazyLoad>
          <img
            className="pull-left"
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
      <div className="ml-5">
        <FormattedMessage id="payment.selectPetProfile" />
        <PetListSelection list={list} key={list.length} idx={idx} />
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
