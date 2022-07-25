import React, { useEffect, useState } from 'react';
import { unique } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { SubscriptionType, SubScriptionStatusNumber } from '@/utils/types';
import { GAPdpSizeChange } from '../../views/Details/GA';
import cn from 'classnames';
import { handleSizeList } from '@/framework/product';

interface Props {
  renderAgin?: boolean;
  details: any;
  updatedSku: Function;
  onClickSku?: () => void;
  updatedPriceOrCode: Function;
  defaultSkuId: string;
  disabledGoodsInfoIds?: string[];
  onIsSpecAvailable?: Function;
  canSelectedWhenAllSpecDisabled?: boolean; //是否规格禁用了，仍然可以被选中，eg:规格被禁用了，一般情况不默认选中了；然而，PDP，即使规格被禁用了，仍需被选中，原因是需要返回对应的price信息，以便页面展示用
  canSelectedOutOfStock?: boolean; //when sku out of stock, don't disabled sku, it's an optional status and displays 'out of stock' info.
  defaultSkuNo?: string;
  shouldSkuGrayOutOfStock: boolean;
  showOffShelvesSpecs: boolean; //是否显示下架的规格
}

const HandledSpec = ({
  renderAgin,
  details,
  updatedSku,
  updatedPriceOrCode = () => {},
  defaultSkuId,
  disabledGoodsInfoIds = [],
  onIsSpecAvailable = () => {},
  onClickSku = () => {},
  canSelectedWhenAllSpecDisabled = false,
  canSelectedOutOfStock = false,
  defaultSkuNo,
  shouldSkuGrayOutOfStock,
  showOffShelvesSpecs = true
}: Props) => {
  const { goodsSpecs, goodsSpecDetails, goodsInfos, isSkuNoQuery, goodsNo } =
    details;
  const [selectId, setSelectId] = useState();
  const [sizeList, setSizeList] = useState<any[]>([]);

  const getPriceOrCode = () => {
    const selectSpecDetailId = goodsSpecs.map((item: any) =>
      item.chidren.find((good: any) => good.selected)
    )?.[0]?.specDetailId;
    const selectSkuDetail = goodsInfos.find((item: any) =>
      item.mockSpecDetailIds.includes(selectSpecDetailId)
    );
    const goodsInfoBarcode =
      selectSkuDetail?.goodsInfoBarcode || goodsInfos?.[0]?.goodsInfoBarcode;
    const selectPrice = selectSkuDetail?.marketPrice;
    const barcode = goodsInfoBarcode ? goodsInfoBarcode : '12';
    updatedPriceOrCode({ barcode, selectPrice });
  };

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

  const handleChooseSize = async (sId: any, sdId: any) => {
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
    const barcode = goodsInfos.find((item: any) =>
      item.mockSpecDetailIds.includes(specDetailId)
    )?.goodsInfoBarcode;
    await matchGoods();
    updatedPriceOrCode({ barcode, clickEvent: true });
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
    setSizeList(handledGoodsInfos);
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
  const renderStyle = (sdItem: any) => {
    console.log(
      sdItem,
      shouldSkuGrayOutOfStock,
      sdItem.specDetailId === selectId,
      sdItem.isEmpty,
      '99999999'
    );
    let backgroundColor = '';
    if (sdItem.isDisabled && !sdItem.canSelectedOutOfStock) {
      backgroundColor = '#ccc';
    } else if (
      shouldSkuGrayOutOfStock &&
      sdItem.specDetailId === selectId &&
      sdItem.isEmpty
    ) {
      backgroundColor = '#ccc';
    } else {
      backgroundColor = '#fff';
    }
    let cursor = '';
    if (sdItem.isDisabled && !sdItem.canSelectedOutOfStock) {
      cursor = 'not-allowed';
    } else {
      cursor = 'not-pointer';
    }
    return {
      backgroundColor,
      cursor
    };
  };
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
              {(sItem.chidren || [])
                .filter((el: any) => showOffShelvesSpecs || el.addedFlag)
                .map((sdItem: any, i: number) => (
                  <div
                    key={i}
                    className={cn(`rc-swatch__item`, {
                      selected: sdItem.selected,
                      outOfStock:
                        sdItem.isDisabled && !sdItem.canSelectedOutOfStock
                    })}
                    onClick={() => {
                      onClickSku();
                      setSelectId(sdItem.specDetailId);
                      if (
                        (sdItem.isDisabled && !sdItem.canSelectedOutOfStock) ||
                        sdItem.selected
                      ) {
                        return false;
                      } else {
                        handleChooseSize(sItem.specId, sdItem.specDetailId);
                      }
                    }}
                  >
                    <span style={renderStyle(sdItem)}>
                      {/* {parseFloat(sdItem.detailName)}{' '} */}
                      {sdItem.detailName}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default HandledSpec;
