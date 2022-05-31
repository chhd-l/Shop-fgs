import Cart from '../Cart';
import React, { useEffect, useState } from 'react';
import { funcUrl } from '@/lib/url-utils';
import { inject, observer } from 'mobx-react';
import { getRecommendation } from '@/api/recommendation';
import { sitePurchase, valetGuestMiniCars } from '@/api/cart';
import { injectIntl } from 'react-intl-phraseapp';
const localItemRoyal = window.__.localItemRoyal;
const CartDEBreeder = ({
  loginStore,
  clinicStore,
  checkoutStore,
  intl,
  ...restProps
}) => {
  const [loadingRecommendation, setLoadingRecommendation] = useState(true);
  useEffect(() => {
    const req = async () => {
      localItemRoyal.set('isDERecommendation', 'true');
      const products = funcUrl({ name: 'products' });
      const customerId = funcUrl({ name: 'customerId' });
      const res = await getRecommendation(products, customerId);
      const recommendationGoodsInfoRels =
        res.context.recommendationGoodsInfoRels;
      let recommendationInfos = {
        recommenderId: customerId
      };
      clinicStore.setLinkClinicRecommendationInfos(recommendationInfos);
      clinicStore.setLinkClinicRecommendationInfos(recommendationInfos);
      clinicStore.setLinkClinicId(customerId);
      if (loginStore.isLogin) {
        for (let i = 0; i < recommendationGoodsInfoRels.length; i++) {
          await sitePurchase({
            goodsInfoId: recommendationGoodsInfoRels[i].goodsInfo.goodsInfoId,
            goodsNum: recommendationGoodsInfoRels[i].recommendationNumber,
            goodsCategory: '',
            goodsInfoFlag: 0,
            recommenderId: customerId,
            clinicId: customerId
          });

          await checkoutStore.updateLoginCart({
            intl
          });
        }
      } else {
        const getDetail = ({
          goodsInfos,
          goodsSpecDetails,
          goodsSpecs,
          goodsInfoNo,
          goodsInfoId
        }) => {
          let choosedSpecsArr = [];
          let sizeList = [];
          if (true) {
            // 通过sku查询
            let specsItem = goodsInfos.filter(
              (item) => item.goodsInfoNo == goodsInfoNo
            );
            choosedSpecsArr =
              specsItem && specsItem[0] && specsItem[0].mockSpecDetailIds;
          }

          // 组装购物车的前端数据结构与规格的层级关系
          if (goodsSpecDetails) {
            // 是否有规格可用
            let isAllSpecDisabled = true;
            goodsSpecs.map((sItem, index) => {
              // 该层判断是为了去判断sku是否存在
              sItem.chidren = goodsSpecDetails.filter((sdItem, i) => {
                if (index === 0) {
                  let filterproducts = goodsInfos.filter((goodEl) =>
                    goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)
                  );
                  sdItem.goodsInfoUnit = filterproducts?.[0]?.goodsInfoUnit;
                  sdItem.isEmpty = filterproducts.every(
                    (item) => item.stock === 0
                  );
                  sdItem.isUnitPriceZero =
                    filterproducts?.[0]?.marketPrice === 0;
                  sdItem.isDisabled = sdItem.isEmpty || sdItem.isUnitPriceZero;
                  // filterproduct.goodsInfoWeight = parseFloat(sdItem.detailName)
                }
                return sdItem.specId === sItem.specId;
              });
              let defaultSelcetdSku = -1;
              if (choosedSpecsArr.length) {
                for (let i = 0; i < choosedSpecsArr.length; i++) {
                  let specDetailIndex = sItem.chidren.findIndex(
                    (el) => el.specDetailId === choosedSpecsArr[i]
                  );
                  if (specDetailIndex > -1) {
                    defaultSelcetdSku = specDetailIndex;
                  }
                }
              }
              const isSelectedDefaultSkuItem = sItem.chidren.findIndex(
                (_item) => _item.isSelected && !_item.isDisabled
              );
              // 所有规格都不可用，一旦有可用的，则置为false
              if (sItem.chidren.some((_item) => !_item.isDisabled)) {
                isAllSpecDisabled = false;
              }

              if (defaultSelcetdSku > -1) {
                // 默认选择该sku
                if (!sItem.chidren[defaultSelcetdSku].isEmpty) {
                  // 如果是sku进来的，需要默认当前sku被选择
                  sItem.chidren[defaultSelcetdSku].selected = true;
                }
              } else if (isSelectedDefaultSkuItem > -1) {
                // sprint6添加的需求，在storePortal设置了defaultSku那么该sku被选中.
                sItem.chidren[isSelectedDefaultSkuItem].selected = true;
              } else {
                if (
                  window.__.env.REACT_APP_COUNTRY === 'de' &&
                  sItem.chidren.length &&
                  !sItem.chidren[0].isEmpty
                ) {
                  // de设置最小的
                  sItem.chidren[0].selected = true;
                } else if (
                  sItem.chidren.length > 1 &&
                  !sItem.chidren[1].isDisabled
                ) {
                  sItem.chidren[1].selected = true;
                } else {
                  for (let i = 0; i < sItem.chidren.length; i++) {
                    if (!sItem.chidren[i].isDisabled) {
                      sItem.chidren[i].selected = true;
                      break;
                    }
                  }
                  // 如果所有sku都没有库存 取第一个可用的规格
                  if (
                    sItem.chidren.filter((el) => el.selected).length === 0 &&
                    sItem.chidren.filter((el) => !el.isDisabled).length &&
                    sItem.chidren.length
                  ) {
                    const targetItem = sItem.chidren.filter(
                      (el) => !el.isDisabled
                    )[0];
                    if (targetItem) {
                      targetItem.selected = true;
                    }
                  }
                }
              }
              return sItem;
            });
          } else {
            goodsInfos[0].selected = true;
          }
          goodsInfos = goodsInfos.map((g) => {
            g.selected = g.goodsInfoId === goodsInfoId;
            return g;
          });
          return goodsInfos;
        };

        let goodsList = recommendationGoodsInfoRels.map((item) => {
          item.sizeList = getDetail({
            goodsInfos: item.goodsInfos,
            goodsSpecDetails: item.goodsSpecDetails,
            goodsSpecs: item.goodsSpecs,
            goodsInfoNo: item.goodsInfo.goodsInfoNo,
            goodsInfoId: item.goodsInfo.goodsInfoId
          });
          item.selected = true;
          item.quantity = 1;
          item.goodsInfoFlag = 0;
          item.goodsName = item.goods.goodsName;
          return item;
        });
        await checkoutStore.updateUnloginCart({
          cartData: goodsList,
          intl
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
  inject('loginStore', 'checkoutStore', 'clinicStore')(observer(CartDEBreeder))
);
