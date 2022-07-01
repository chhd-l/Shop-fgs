import Cart from '../Cart';
import React, { useEffect, useState } from 'react';
import { funcUrl } from '@/lib/url-utils';
import { inject, observer } from 'mobx-react';
import { getRecommendation } from '@/api/recommendation';
import { injectIntl } from 'react-intl-phraseapp';
import {
  AddItemsMember as AddCartItemsMember,
  AddItemsVisitor as AddCartItemsVisitor
} from '@/framework/cart';
import intersection from 'lodash/intersection';
import { handleSizeList } from '@/framework/product';
import { getDetails, getDetailsBySpuNo, getLoginDetails } from '@/api/details';

const localItemRoyal = window.__.localItemRoyal;

const CartInStock = ({
  loginStore,
  clinicStore,
  checkoutStore,
  intl,
  configStore,
  ...restProps
}) => {
  const [loadingSku, setLoadingSku] = useState(true);
  useEffect(() => {
    const req = async () => {
      // const instockGoodsId = localItemRoyal.get('instockGoodsId');
      // if (instockGoodsId) {
      //   let cardGoodIds = [];
      //   if (loginStore.isLogin) {
      //     cardGoodIds = checkoutStore.loginCartData.map(
      //       (goodsInfo) => goodsInfo.goodsId
      //     );
      //   } else {
      //     cardGoodIds = checkoutStore.cartData.map(
      //       (goodsInfo) => goodsInfo.goodsInfo.goodsId
      //     );
      //   }
      //   // if cardGoodIds intersection with recommendationGoodIds is empty, then get recommendation
      //   if (intersection(cardGoodIds, instockGoodsId).length > 0) {
      //     setLoadingSku(false);
      //     return;
      //   }
      // }
      const skuId = funcUrl({ name: 'skuId' });
      // 2c91808577d2c0dd0177d2ca59680076
      if (loginStore.isLogin) {
        const { context } = await getLoginDetails(skuId);
        await AddCartItemsMember({
          paramList: [context].map((r) => ({
            goodsInfoId: skuId,
            goodsNum: 1,
            goodsCategory: '',
            goodsInfoFlag: 0
          })),
          showPCMiniCartPop: false
        });
      } else {
        const { context } = await getDetails(skuId);
        let goodsList = [context].map((item) => {
          item.goodsInfos = item.goodsInfos.map((g) => {
            g.selected = g.goodsInfoId === skuId;
            return g;
          });
          item.sizeList = handleSizeList({
            goodsInfos: item.goodsInfos,
            goodsSpecDetails: item.goodsSpecDetails,
            goodsSpecs: item.goodsSpecs,
            defaultSkuNo: skuId
          });
          return item;
        });
        await AddCartItemsVisitor({
          cartItemList: goodsList.map((item) =>
            Object.assign({}, item, {
              selected: true,
              quantity: 1,
              goodsInfoFlag: 0
            })
          ),
          showPCMiniCartPop: false
        });
      }
      setLoadingSku(false);
    };
    req();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loadingSku) return <div />;
  return <Cart {...restProps} />;
};
export default injectIntl(
  inject(
    'loginStore',
    'checkoutStore',
    'clinicStore',
    'configStore'
  )(observer(CartInStock))
);
