// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { unique } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { SubscriptionType, SubScriptionStatusNumber } from '@/utils/types';
import Selection from '@/components/Selection/index.js';
import InstockStatusComp from '@/components/InstockStatusComp';
import { GAPdpSizeChange } from '../../views/Details/GA';
import cn from 'classnames';

interface Props {
  renderAgin?: boolean;
  details: any;
  updatedSku: Function;
  updatedPriceOrCode: Function;
  defaultSkuId: string;
  disabledGoodsInfoIds?: string[];
  onIsSpecAvailable?: Function;
  canSelectedWhenAllSpecDisabled?: boolean; //是否规格禁用了，仍然可以被选中，eg:规格被禁用了，一般情况不默认选中了；然而，PDP，即使规格被禁用了，仍需被选中，原因是需要返回对应的price信息，以便页面展示用
  canSelectedOutOfStock?: boolean; //when sku out of stock, don't disabled sku, it's an optional status and displays 'out of stock' info.
  instockStatus?: boolean;
}

const HandledSpec = ({
  renderAgin,
  details,
  updatedSku,
  updatedPriceOrCode = () => { },
  defaultSkuId,
  disabledGoodsInfoIds = [],
  onIsSpecAvailable = () => { },
  canSelectedWhenAllSpecDisabled = false,
  canSelectedOutOfStock = false,
  instockStatus = true,
}: Props) => {
  const { goodsSpecs, goodsSpecDetails, goodsInfos, isSkuNoQuery, goodsNo } =
    details;
  const [sizeList, setSizeList] = useState([]);

  const getPriceOrCode = () => {
    const selectSpecDetailId = goodsSpecs.map((item: any) =>
      item.chidren.find((good: any) => good.selected)
    )?.[0]?.specDetailId;
    const selectSkuDetail = goodsInfos.find(
      (item: any) => item.mockSpecDetailIds.includes(selectSpecDetailId)
    );
    const goodsInfoBarcode = selectSkuDetail?.goodsInfoBarcode || goodsInfos?.[0]?.goodsInfoBarcode
    const selectPrice = selectSkuDetail?.marketPrice
    const barcode = goodsInfoBarcode ? goodsInfoBarcode : '12';
    updatedPriceOrCode({ barcode, selectPrice });
  };

  // tododo 这个方法干嘛的
  const matchGoods = () => {
    // let {
    //   specList,
    //   details,
    //   currentUnitPrice,
    //   currentLinePrice,
    //   currentSubscriptionPrice,
    //   currentSubscriptionStatus,
    //   stock,
    //   form,
    //   defaultPurchaseType
    // } = this.state;
    let handledValues = {
      currentUnitPrice: 0,
      currentLinePrice: 0,
      currentSubscriptionPrice: 0,
      currentSubscriptionStatus: 0,
      stock: 0,
      skuPromotions: 0
    };

    let selectedArr: any[] = [];
    let idArr: any[] = [];
    // 当所有规格不可用时，没有返回相关信息：currentUnitPrice/currentLinePrice/currentSubscriptionPrice/currentSubscriptionStatus/stock/skuPromotions
    goodsSpecs.map((el: any) => {
      if (el.chidren.filter((item: any) => item.selected).length) {
        selectedArr.push(el.chidren.filter((item: any) => item.selected)[0]);
      }
      return el;
    });
    selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId);
    idArr = selectedArr.map((el) => el.specDetailId);
    // marketprice需要取sku的（goodsinfo是sku），不然有时候spu（goods里面）会没值
    // currentUnitPrice = goodsInfos?.[0]?.marketPrice;
    sizeList.map((item, i) => {
      let specTextArr = [];
      for (let specItem of goodsSpecs) {
        for (let specDetailItem of specItem.chidren) {
          if (
            item.mockSpecIds.includes(specDetailItem.specId) &&
            item.mockSpecDetailIds.includes(specDetailItem.specDetailId)
          ) {
            specTextArr.push(specDetailItem.detailName);
          }
        }
      }
      item.specText = specTextArr.join(' ');
      if (
        unique(item.mockSpecDetailIds).sort().join(',') ===
        idArr.sort().join(',')
      ) {
        item.selected = true;
        handledValues.currentUnitPrice = item.salePrice;
        handledValues.currentLinePrice = item.linePrice;
        handledValues.currentSubscriptionPrice = item.subscriptionPrice;
        handledValues.currentSubscriptionStatus = item.subscriptionStatus; //subscriptionStatus 是否订阅商品
        handledValues.stock = item.stock;
        handledValues.skuPromotions = item.promotions;
      } else {
        item.selected = false;
      }

      return item;
    });
    // defaultPurchaseType === 1 ||
    // sessionItemRoyal.get('pf-result') ||
    // localStorage.getItem('pfls')
    //   ? skuPromotions == 'club'
    //     ? (form.buyWay = 2)
    //     : (form.buyWay = 1)
    //   : (form.buyWay = 0);
    updatedSku(handledValues, sizeList);
  };
  const bundleMatchGoods = () => {
    let handledValues = {
      currentUnitPrice: 0,
      currentLinePrice: 0,
      currentSubscriptionPrice: 0,
      currentSubscriptionStatus: 0,
      defaultPurchaseType: 0,
      stock: 0,
      skuPromotions: 0
    };
    handledValues.currentUnitPrice = sizeList[0].salePrice;
    handledValues.currentSubscriptionPrice = sizeList[0].subscriptionPrice;
    handledValues.currentSubscriptionStatus = sizeList[0].subscriptionStatus;
    handledValues.skuPromotions = sizeList[0].promotions;
    handledValues.stock = sizeList[0].stock;
    sizeList[0].selected = true;

    updatedSku(handledValues, sizeList);
  };

  const handleChooseSize = (sId: any, sdId: any) => {
    goodsSpecs
      .filter((item: any) => item.specId === sId)[0]
      .chidren.map((item: any) => {
        if (item.specDetailId === sdId) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
    const goodSize = goodsSpecs.map((item: any) =>
      item.chidren.find((good: any) => good.specDetailId === sdId)
    )?.[0]?.detailName;
    GAPdpSizeChange(goodSize);
    const specDetailId = goodsSpecs.map((item: any) =>
      item.chidren.find((good: any) => good.specDetailId === sdId)
    )?.[0]?.specDetailId;
    const barcode = goodsInfos.find(
      (item: any) => item.mockSpecDetailIds.includes(specDetailId)
    )?.goodsInfoBarcode;
    updatedPriceOrCode({ barcode, clickEvent: true });
    matchGoods();
  };

  useEffect(() => {
    let choosedSpecsArr: any[] = [];
    let sizeList = [];
    // tododo 通过sku查询报错了
    // 通过sku查询，默认选中此sku
    if (isSkuNoQuery) {
      let specsItem = goodsInfos.filter(
        (item: any) => item.goodsInfoNo == goodsNo
      );

      choosedSpecsArr =
        specsItem && specsItem[0] && specsItem[0].mockSpecDetailIds;
    }
    // tododo 链接上带skuId参数，好像没有这样的链接
    // 通过sku查询，默认选中此sku
    if (defaultSkuId) {
      let specsItem = goodsInfos.filter(
        (item: any) => item.goodsInfoId == defaultSkuId
      );

      choosedSpecsArr =
        specsItem && specsItem[0] && specsItem[0].mockSpecDetailIds;
    }

    // 组装购物车的前端数据结构与规格的层级关系
    if (goodsSpecDetails) {
      // 是否有规格可用
      let isAllSpecDisabled = true;
      goodsSpecs.map((sItem: any, index: any) => {
        // 该层判断是为了去判断sku是否存在
        // children为每个规格类别下的详细规则value，比如重量下的1kg、2kg集合
        sItem.chidren = goodsSpecDetails.filter((sdItem: any, i: number) => {
          // tododo 为什么只第一个？？
          if (index === 0) {
            const filterproducts = goodsInfos.filter((goodEl: any) =>
              goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)
            );
            sdItem.goodsInfoUnit = filterproducts?.[0]?.goodsInfoUnit;
            sdItem.isEmpty = filterproducts.every(
              (item: any) => item.stock === 0
            );
            sdItem.isUnitPriceZero = filterproducts?.[0]?.marketPrice === 0;
            sdItem.isDisabled =
              sdItem.isEmpty ||
              sdItem.isUnitPriceZero ||
              disabledGoodsInfoIds.includes(filterproducts[0]?.goodsInfoId);
            sdItem.canSelectedOutOfStock = sdItem.isEmpty && canSelectedOutOfStock
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

        // tododo isSelected没看到设置的地方？？
        const isSelectedDefaultSkuItem = sItem.chidren.findIndex(
          (_item) =>
            _item.isSelected && (canSelectedWhenAllSpecDisabled || !_item.isDisabled)
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
          } else if (sItem.chidren.length > 1 && !sItem.chidren[1].isDisabled) {
            sItem.chidren[1].selected = true; debugger
          } else {
            for (let i = 0; i < sItem.chidren.length; i++) {
              if (!sItem.chidren[i].isDisabled) {
                debugger
                sItem.chidren[i].selected = true;
                break;
              }
            }
            // 如果所有sku都没有库存时
            if (
              sItem.chidren.filter((el: any) => el.selected).length === 0 &&
              sItem.chidren.length
            ) {
              debugger
              // 取第一个规格
              if (canSelectedWhenAllSpecDisabled) {
                sItem.chidren[0].selected = true;
              } else {
                // 取第一个可用规格
                const targetItem = sItem.chidren.filter(
                  (el) => !el.isDisabled
                )[0];
                if (targetItem) {
                  targetItem.selected = true;
                }
              }
            }
          }
        }
        return sItem;
      });
      onIsSpecAvailable(!isAllSpecDisabled);
    } else {
      debugger
      goodsInfos[0].selected = true;
    }
    setSizeList(goodsInfos);
    console.log(111111, goodsInfos)
  }, [details.goodsNo, renderAgin]);

  useEffect(() => {
    (async () => {
      if (sizeList?.length) {
        // goodsSpecDetails可能是数组可能是null
        if (goodsSpecDetails?.length) {
          await matchGoods();
          getPriceOrCode();
        } else {
          bundleMatchGoods();
        }
      }
    })();
  }, [sizeList]);
  return (
    <div className="spec">
      {goodsSpecs?.map((sItem: any, i: number) => (
        <div id="choose-select" className="spec-choose-select" key={i}>
          <div className="rc-margin-bottom--xs">
            <FormattedMessage id={sItem?.specName} />:
          </div>
          <div data-attr="size">
            <div
              className="rc-swatch __select-size d-flex justify-content-end justify-content-md-start flex-wrap"
              id="id-single-select-size"
            >
              {sItem.chidren?.map((sdItem: any, i: number) => (
                <div
                  key={i}
                  className={cn(`rc-swatch__item ddd`, {
                    selected: sdItem.selected,
                    outOfStock: sdItem.isDisabled && !sdItem.canSelectedOutOfStock,
                  })}
                  onClick={() => {
                    if ((sdItem.isDisabled && !sdItem.canSelectedOutOfStock) || sdItem.selected) {
                      return false;
                    } else {
                      handleChooseSize(sItem.specId, sdItem.specDetailId);
                    }
                  }}
                >
                  <span
                    style={{
                      backgroundColor: sdItem.isDisabled && !sdItem.canSelectedOutOfStock ? '#ccc' : '#fff',
                      cursor: sdItem.isDisabled && !sdItem.canSelectedOutOfStock ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {/* {parseFloat(sdItem.detailName)}{' '} */}
                    {sdItem.detailName}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {canSelectedOutOfStock ? <div><InstockStatusComp status={instockStatus} /></div> : null}
        </div>
      ))}
    </div>
  );
};
export default HandledSpec;
