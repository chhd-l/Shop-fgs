import React from 'react';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';

const OneOffSelection = function (props) {
  const { isGift, pitem, isLogin } = props;
  return (
    <div
      className="buyMethod for_ipad_pro_price rc-margin-bottom--xs--desktop cursor-pointer"
      style={{
        borderColor: !parseInt(pitem.goodsInfoFlag) ? '#e2001a' : '#d7d7d7',
        display: `${isGift ? 'none' : 'block'}`
      }}
      onClick={props.chooseOneOff}
    >
      <div className="buyMethodInnerBox d-flex justify-content-between align-items-center text-break flex-wrap">
        <div className="radioBox mr-2">
          <span
            className="font15 font-thin h-full text-xl leading-4"
            style={{
              color: '#666'
            }}
          >
            <span className="iconfont iconOrders text-rc-red font-medium text-lg mr-1" />
            <FormattedMessage id="singlePurchase" />
          </span>
        </div>
        <div
          className="price singlePrice text-nowrap qhx"
          style={{ fontSize: '1.375rem' }}
        >
          {console.log(999, pitem)}
          {!isLogin
            ? formatMoney(
                pitem.quantity *
                  pitem.sizeList.filter((el) => el.selected)[0].salePrice
              )
            : formatMoney(pitem.buyCount * pitem.salePrice)}
        </div>
      </div>
    </div>
  );
};

export default OneOffSelection;
