import React from 'react';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl-phraseapp';
import ConfirmTooltip from '@/components/ConfirmTooltip';
import Selection from '@/components/Selection';
import cartImg from '../../modules/images/cart.png';
import LazyLoad from 'react-lazyload';

const OneOffSelection = function (props) {
  const { isGift, pitem, activeToolTipIndex, index, toolTipVisible, isLogin } =
    props;
  return (
    <div
      className="buyMethod for_ipad_pro_price rc-margin-bottom--xs--desktop"
      style={{
        borderColor: !parseInt(pitem.goodsInfoFlag) ? '#e2001a' : '#d7d7d7',
        cursor: 'pointer',
        display: `${isGift ? 'none' : 'block'}`
      }}
      onClick={props.chooseOneOff}
    >
      <div className="buyMethodInnerBox d-flex justify-content-between align-items-center text-break flex-wrap">
        <div className="radioBox mr-2">
          <span
            className="font15"
            style={{
              height: '100%',
              fontWeight: '100',
              color: '#666',
              fontSize: '1.25rem',
              lineHeight: '1'
            }}
          >
            <LazyLoad>
              <img src={cartImg} alt="cart image" />
            </LazyLoad>
            <span>
              <FormattedMessage id="singlePurchase" />
            </span>
          </span>
        </div>
        <div
          className="price singlePrice text-nowrap"
          style={{ fontSize: '1.375rem' }}
        >
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
