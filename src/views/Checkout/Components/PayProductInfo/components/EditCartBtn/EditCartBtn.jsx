import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl-phraseapp';

const sessionItemRoyal = window.__.sessionItemRoyal;
const localItemRoyal = window.__.localItemRoyal;
const isFromFelin = sessionItemRoyal.get('appointment-no');

const EditCartBtn = ({ operateBtnVisible, className, isIndv }) => {
  // edit cart button，隐藏edit cart按钮
  // 1. goodsInfoFlag为3的时候是indv
  // 2. portal代客下单
  const editInCartBtnVisible =
    !localItemRoyal.get('rc-iframe-from-storepotal') &&
    operateBtnVisible &&
    !isIndv &&
    !isFromFelin;
  // edit felin button
  const editInFelinBtnVisible = isFromFelin;

  return editInCartBtnVisible || editInFelinBtnVisible ? (
    <div className={className}>
      {editInCartBtnVisible ? (
        <Link to="/cart" className="font-medium underline hover:text-rc-red">
          <FormattedMessage id="edit2" />
        </Link>
      ) : null}
      {/* from-frlin的时候需要将edit换成re-book按钮 */}
      {editInFelinBtnVisible ? (
        <Link to="/felin" className="product-summary__cartlink rc-styled-link">
          <FormattedMessage id="re-book" />
        </Link>
      ) : null}
    </div>
  ) : null;
};

export default EditCartBtn;
