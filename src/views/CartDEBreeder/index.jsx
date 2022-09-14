import Cart from '../Cart';
import React, { useEffect, useState } from 'react';
import { funcUrl } from '@/lib/url-utils';
import { inject, observer } from 'mobx-react';
import { getRecommendation, saveShelterId } from '@/api/recommendation';
import { injectIntl } from 'react-intl-phraseapp';
import {
  AddItemsMember as AddCartItemsMember,
  AddItemsVisitor as AddCartItemsVisitor
} from '@/framework/cart';
import intersection from 'lodash/intersection';
import { handleSizeList } from '@/framework/product';

const localItemRoyal = window.__.localItemRoyal;

const CartDEBreeder = ({
  loginStore,
  clinicStore,
  checkoutStore,
  intl,
  configStore,
  ...restProps
}) => {
  const [loadingRecommendation, setLoadingRecommendation] = useState(true);
  useEffect(() => {
    const req = async () => {
      const deRecommendationGoodsId = localItemRoyal.get(
        'deRecommendationGoodsId'
      );
      const products = funcUrl({ name: 'products' });
      const customerId = funcUrl({ name: 'customerId' });
      if (customerId && loginStore.isLogin) {
        await saveShelterId({
          shelterId: customerId,
          customerId: loginStore.userInfo.customerId,
          prescriberType: 'vet'
        });
      }
      if (deRecommendationGoodsId) {
        let cardGoodIds = [];
        if (loginStore.isLogin) {
          cardGoodIds = checkoutStore.loginCartData.map(
            (goodsInfo) => goodsInfo.goodsId
          );
        } else {
          cardGoodIds = checkoutStore.cartData.map(
            (goodsInfo) => goodsInfo.goodsInfo.goodsId
          );
        }
        const recommendationGoodIds = deRecommendationGoodsId;
        // if cardGoodIds intersection with recommendationGoodIds is empty, then get recommendation
        if (intersection(cardGoodIds, recommendationGoodIds).length > 0) {
          setLoadingRecommendation(false);
          return;
        }
      }
      const res = await getRecommendation(products, customerId);
      const recommendationGoodsInfoRels =
        res.context.recommendationGoodsInfoRels;
      localItemRoyal.set(
        'deRecommendationGoodsId',
        recommendationGoodsInfoRels.map((goodsInfo) => goodsInfo.goods.goodsId)
      );
      localItemRoyal.set('customerId', customerId);
      let recommendationInfos = {
        recommenderId: customerId
      };
      clinicStore.setLinkClinicRecommendationInfos(recommendationInfos);
      clinicStore.setLinkClinicId(customerId);
      if (loginStore.isLogin) {
        await AddCartItemsMember({
          paramList: recommendationGoodsInfoRels.map((r) => ({
            goodsInfoId: r.goodsInfo.goodsInfoId,
            goodsNum: r.recommendationNumber,
            goodsCategory: '',
            goodsInfoFlag: 0,
            recommenderId: customerId,
            clinicId: customerId
          })),
          showPCMiniCartPop: false
        });
      } else {
        let goodsList = recommendationGoodsInfoRels.map((item) => {
          item.goodsInfos = item.goodsInfos.map((g) => {
            g.selected = g.goodsInfoId === item.goodsInfo.goodsInfoId;
            return g;
          });
          item.sizeList = handleSizeList({
            goodsInfos: item.goodsInfos,
            goodsSpecDetails: item.goodsSpecDetails,
            goodsSpecs: item.goodsSpecs,
            defaultSkuNo: item.goodsInfo.goodsInfoNo
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
      setLoadingRecommendation(false);
    };
    req();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loadingRecommendation) return <div />;
  return <Cart {...restProps} />;
};
export default injectIntl(
  inject(
    'loginStore',
    'checkoutStore',
    'clinicStore',
    'configStore'
  )(observer(CartDEBreeder))
);
