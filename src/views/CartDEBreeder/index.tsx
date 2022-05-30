import Cart from '../Cart';
import React, { useEffect, useState } from 'react';
import { funcUrl } from '@/lib/url-utils';
import { inject, observer } from 'mobx-react';
import { getRecommendation } from '@/api/recommendation';
import { sitePurchase } from '@/api/cart';
import { injectIntl } from 'react-intl-phraseapp';
type CartDEBreederProps = {
  loginStore: any;
  checkoutStore: any;
  clinicStore: any;
  intl: any;
};
const CartDEBreeder = ({
  loginStore,
  clinicStore,
  checkoutStore,
  intl,
  ...restProps
}: CartDEBreederProps) => {
  const [loadingRecommendation, setLoadingRecommendation] = useState(true);
  useEffect(() => {
    (async () => {
      const products = funcUrl({ name: 'products' });
      const customerId = funcUrl({ name: 'customerId' });
      const res = await getRecommendation(products, customerId);
      const recommendationGoodsInfoRels = (res as any).context
        .recommendationGoodsInfoRels;
      // 查recommendationInfo
      // 也就是clinic信息也就是prescriber信息 也就是诊所信息
      // 登陆状态添加购物车
      // const res2 = getRecommendationList_prescriberId(customerId);
      // const recommendationInfos = {
      //   recommenderName: res.context?.recommendationName || '',
      //   recommenderId: res.context?.recommendationId || '',
      //   recommendationName: res.context?.prescriberName || '',
      //   recommendationId: res.context?.prescriberId || '',
      //   referenceObject: res.context?.structureType || '',
      //   referenceData: res.context?.prescriptionJson || ''
      // };
      console.log('recommendationGoodsInfoRels', recommendationGoodsInfoRels);
      if (loginStore.isLogin) {
        for (let i = 0; i < recommendationGoodsInfoRels.length; i++) {
          await sitePurchase({
            goodsInfoId: recommendationGoodsInfoRels[i].goodsInfo.goodsInfoId,
            goodsNum: recommendationGoodsInfoRels[i].recommendationNumber,
            goodsCategory: '',
            goodsInfoFlag: 0
            // periodTypeId: recommendationGoodsInfoRels[i].goodsInfo.periodTypeId
            // recommendationId: 222,
            // recommendationInfos: 22,
            // recommendationName: 33
          });
          await checkoutStore.updateLoginCart({
            intl
          });
        }
      }
      setLoadingRecommendation(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loadingRecommendation) return null;
  return <Cart {...restProps} />;
};
export default injectIntl(
  inject(
    'loginStore',
    'checkoutStore',
    'clinicStore'
  )(observer(CartDEBreeder)) as any
);
