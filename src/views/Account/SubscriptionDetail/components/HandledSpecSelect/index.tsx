import React, { useEffect, useState } from 'react';
import { unique } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import cn from 'classnames';
import Selection from '@/components/Selection';
import { handleSizeList } from '@/framework/product';
import './index.less'

interface Props {
  renderAgin?: boolean;
  details: any;
  updatedSku: Function;
  defaultSkuId: string;
  disabledGoodsInfoIds?: string[];
  onIsSpecAvailable?: Function;
  canSelectedWhenAllSpecDisabled?: boolean; //是否规格禁用了，仍然可以被选中，eg:规格被禁用了，一般情况不默认选中了；然而，PDP，即使规格被禁用了，仍需被选中，原因是需要返回对应的price信息，以便页面展示用
  canSelectedOutOfStock?: boolean; //when sku out of stock, don't disabled sku, it's an optional status and displays 'out of stock' info.
  defaultSkuNo?: string;
  updatedChangeSku?: Function;
  inModal?:boolean;
  showCurrentOutOfStockSku?:string;
}

const HandledSpecSelect = ({
  renderAgin,
  details,
  updatedSku,
  defaultSkuId,
  disabledGoodsInfoIds = [],
  onIsSpecAvailable = () => { },
  canSelectedWhenAllSpecDisabled = false,
  canSelectedOutOfStock = false,
  defaultSkuNo,
  inModal,
  updatedChangeSku = () => { }
}: Props) => {
  const { goodsSpecs, goodsSpecDetails, goodsInfos, isSkuNoQuery } =
    details;
  const [sizeList, setSizeList] = useState<any[]>([]);
  const [subSkuItem,setSubSkuItem] = useState<any>({})
  const matchGoods = () => {
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
    sizeList.forEach((item: any) => {
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

  const handleChooseSize = async(sId: any, sdId: any) => {
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
    const specDetailId = goodsSpecs.map((item: any) =>
      item.chidren.find((good: any) => good.specDetailId === sdId)
    )?.[0]?.specDetailId;
    const skuInfo = goodsInfos.find((item: any) =>
      item.mockSpecDetailIds?.includes(specDetailId)
    );
    await matchGoods();
    await updatedChangeSku(skuInfo)

  };

  useEffect(() => {
    const handledGoodsInfos = handleSizeList({
      defaultSkuNo: isSkuNoQuery && defaultSkuNo ? defaultSkuNo : '',
      defaultSkuId,
      goodsInfos,
      goodsSpecDetails,
      goodsSpecs,
      disabledGoodsInfoIds,
      onIsSpecAvailable,
      canSelectedWhenAllSpecDisabled,
      canSelectedOutOfStock
    });
    goodsSpecs?.forEach((el: any) => el?.chidren?.forEach((it: any) => {
      it.value = it?.detailName
      it.name = it?.detailName
      it.name2 = 'details.inStock'
      if (it?.isEmpty) {
        it.name2 = 'details.outStock'
      }
      const defaultSkuGoods = goodsInfos.filter((item: any) => item.goodsInfoId ===defaultSkuId)?.[0]
      const specId = defaultSkuGoods?.mockSpecDetailIds?.includes(it.specDetailId)
      // addedFlag 是否上下架
      const skuHidden = defaultSkuGoods?.subscriptionStatus && !defaultSkuGoods?.addedFlag

      //defalutSubSku: goodInfo and goodsSpecDetails inconsistent,need delete goodsSpecDetails sku,because the current sku can no longer be subscribed
      if(specId && Boolean(skuHidden)){
        it.needHidden = true  
        setSubSkuItem(it)
      }
      //sku: addedFlag:0, don't display
      if(!specId && !it.addedFlag){
        it.needHidden = true  
      }
      it.disabled = (!canSelectedOutOfStock && it?.isEmpty) ||(inModal && it?.isDisabled)
      it.selected = it.selected || specId //specId:When the default subscription sku is out of stock, it need displayed
    }))
    setSizeList(handledGoodsInfos);
  }, [details.goodsNo, renderAgin]);

  useEffect(() => {
    (async () => {
      if (sizeList?.length) {
        // goodsSpecDetails可能是数组可能是null
        if (goodsSpecDetails?.length) {
          await matchGoods();
        } else {
          bundleMatchGoods();
        }
      }
    })();
  }, [sizeList]);

  const selectStock = (sItem: any) => {
    const v = sItem?.chidren?.filter((el: any) => el.selected)?.[0]?.value
    const optionLists = sItem?.chidren?.filter((el: any) => !el?.needHidden)
    const selectChange = (el: any) => {
      setSubSkuItem({})
      handleChooseSize(sItem.specId, el.specDetailId);
    }
    return (
      <div className="relative">
        {Object.keys(subSkuItem)?.length > 0 && <div className="absolute bottom-4">
          <span>{subSkuItem?.name}</span>
          <span
            className={`sku-stock ml-8 ${subSkuItem?.isEmpty?'sku-out-of-stock' : ''}`}
          >
            <FormattedMessage id={subSkuItem?.name2} />
          </span>
        </div>}
      <Selection
        optionList={optionLists}
        key={sItem.specName}
        selectedItemData={{
          value: v
        }}
        selectedItemChange={selectChange}
      />
      </div>
    )

  }

  return (
    <div className="spec select-spec-wrap">
      {goodsSpecs?.map((sItem: any, i: number) => (
        <div id="choose-select" className="spec-choose-select" key={i}>
          <div>
            <FormattedMessage id={sItem?.specName} />:
          </div>
          {selectStock(sItem)}
        </div>
      ))}
    </div>
  );
};
export default HandledSpecSelect;
