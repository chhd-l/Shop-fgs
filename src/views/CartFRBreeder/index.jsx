import Cart from '../Cart';
import React, { useEffect, useState } from 'react';
import { funcUrl } from '@/lib/url-utils';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl-phraseapp';
import {
  AddItemsMember as AddCartItemsMember,
  AddItemsVisitor as AddCartItemsVisitor
} from '@/framework/cart';
import {
  getRecommendationList_prescriberId,
  getRecommendationList_token
} from '@/api/recommendation';
import { handleSizeList } from '@/framework/product';
import { getFrequencyDict } from '@/utils/utils';
const localItemRoyal = window.__.localItemRoyal;

export const CartFRBreeder = ({
  loginStore,
  clinicStore,
  checkoutStore,
  intl,
  configStore,
  ...restProps
}) => {
  const [loadingRecommendation, setLoadingRecommendation] = useState(true);
  const [isSPT, setIsSPT] = useState(false);
  useEffect(() => {
    req();
  }, []);
  const req = async () => {
    let frequencyList = [];
    getFrequencyDict().then((res) => {
      frequencyList = res;
    });
    let token = funcUrl({ name: 'token' });
    let prescription = funcUrl({ name: 'prescription' });
    let params = { id: token };
    let requestName = getRecommendationList_token;
    if (!token) {
      requestName = getRecommendationList_prescriberId;
      params = { id: prescription };
    }
    params.allGoods = true;

    try {
      let res = await requestName(params);
      const productLists = res?.context?.recommendationGoodsInfoRels || [];
      // if (!productLists?.length) {
      //   setLoadingRecommendation(false);
      //   return;
      // }
      if (res.context.structureType != 'breeder') {
        // 法国区分stp和breeder
        setIsSPT(true);
      }
      let autoshipDictRes = frequencyList.filter(
        (el) => el.goodsInfoFlag === 1
      );
      let clubDictRes = frequencyList.filter((el) => el.goodsInfoFlag === 2);
      let filterProducts = productLists.filter((el) => {
        let goodsInfoFlag = 0;
        let FrequencyIdDefault = '';
        if (el.goods.subscriptionStatus) {
          if (el.goodsInfo.promotions != 'club') {
            goodsInfoFlag = 1;
            FrequencyIdDefault =
              configStore?.info?.storeVO?.defaultSubscriptionFrequencyId ||
              (autoshipDictRes[0] && autoshipDictRes[0].id);
          } else {
            goodsInfoFlag = 2;
            FrequencyIdDefault =
              configStore?.info?.storeVO?.defaultSubscriptionClubFrequencyId ||
              (clubDictRes[0] && clubDictRes[0].id);
          }
          let defaultFrequencyId =
            el?.defaultFrequencyId || FrequencyIdDefault || '';
          el.defaultFrequencyId = defaultFrequencyId;
        }
        el.goodsInfoFlag = goodsInfoFlag;
        console.info('el.goodsInfoFlag', el.goodsInfoFlag);
        return el.goodsInfo.addedFlag && el.goods.saleableFlag;
      });
      let recommendationInfos = {
        recommenderName: res.context?.recommendationName || '',
        recommenderId: res.context?.recommendationId || '',
        recommendationName: res.context?.prescriberName || '',
        recommendationId: res.context?.prescriberId || '',
        referenceObject: res.context?.structureType || '',
        referenceData: res.context?.prescriptionJson || ''
      };
      localItemRoyal.set('rc-prescriber', res.context?.prescriberId || '');
      clinicStore.setLinkClinicRecommendationInfos(recommendationInfos);
      clinicStore.setAuditAuthority(false);
      // clinicStore.setLinkClinicId(customerId); //fr 没对这个做处理
      // 只展示上架商品
      if (!filterProducts.length) {
        setLoadingRecommendation(false);
        return;
      }
      handleAddCart(productLists);
    } catch (err) {
      console.info('req,err', err);
      setLoadingRecommendation(false);
      return;
    }
  };
  const handleAddCart = async (productLists) => {
    if (loginStore.isLogin) {
      await AddCartItemsMember({
        paramList: productLists.map((item) => ({
          goodsInfoId: item.goodsInfo.goodsInfoId,
          goodsNum: item.recommendationNumber,
          goodsCategory: '',
          goodsInfoFlag: 0, //修改为默认single purchase
          periodTypeId: item.defaultFrequencyId,
          recommendationId:
            clinicStore.linkClinicRecommendationInfos?.recommendationId ||
            clinicStore.linkClinicId,
          recommendationInfos: clinicStore.linkClinicRecommendationInfos,
          recommendationName:
            clinicStore.linkClinicRecommendationInfos?.recommendationName ||
            clinicStore.linkClinicName
        })),
        showPCMiniCartPop: false
      });
    } else {
      let goodsList = productLists.map((item) => {
        item.goodsInfos = item.goodsInfos.map((g) => {
          g.selected = g.goodsInfoId === item.goodsInfo.goodsInfoId;
          return g;
        });
        item.sizeList = handleSizeList({
          goodsInfos: item.goodsInfos,
          goodsSpecDetails: item.goodsSpecDetails,
          goodsSpecs: item.goodsSpecs,
          defaultSkuNo: item.goodsInfo.goodsInfoNo,
          canSelectedOutOfStock: true
        });
        return item;
      });
      let cartItemList = goodsList.map((item) =>
        Object.assign(
          {},
          item,
          { ...item.goodsInfo.goods },
          {
            selected: true,
            quantity: item.recommendationNumber,
            goodsInfoFlag: 0, // item.goodsInfoFlag, 修改为默认single purchase
            periodTypeId: item.defaultFrequencyId,
            recommendationInfos: clinicStore.linkClinicRecommendationInfos,
            recommendationId:
              clinicStore.linkClinicRecommendationInfos?.recommendationId ||
              clinicStore.linkClinicId,
            recommendationName:
              clinicStore.linkClinicRecommendationInfos?.recommendationName ||
              clinicStore.linkClinicName,
            taggingForTextAtCart: (item.taggingList || []).filter(
              (e) =>
                e.taggingType === 'Text' &&
                e.showPage?.includes('Shopping cart page')
            )[0],
            taggingForImageAtCart: (item.taggingList || []).filter(
              (e) =>
                e.taggingType === 'Image' &&
                e.showPage?.includes('Shopping cart page')
            )[0]
          }
        )
      );
      console.info('cartItemList', cartItemList);
      await AddCartItemsVisitor({
        cartItemList,
        showPCMiniCartPop: false
      });
    }
    setLoadingRecommendation(false);
  };
  return loadingRecommendation ? null : <Cart {...restProps} />;
};
export default injectIntl(
  inject(
    'loginStore',
    'checkoutStore',
    'clinicStore',
    'configStore'
  )(observer(CartFRBreeder))
);
