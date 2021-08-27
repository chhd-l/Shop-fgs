import React, { useEffect, useState } from 'react';
import { matchNamefromDict, getDeviceType, unique } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { SubscriptionType, SubScriptionStatusNumber } from '@/utils/types.ts';
import Selection from '@/components/Selection/index.js';
import { PropTypes } from 'mobx-react';
import {
  GAPdpSizeChange
} from '../../views/Details/GA';
const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

interface Props {
  renderAgin?: boolean;
  details: any;
  updatedSku: Function;
  updatedPriceOrCode: Function;
}

const HandledSpec = ({
  renderAgin,
  details,
  updatedSku,
  updatedPriceOrCode = () => {}
}: Props) => {
  const {
    goodsSpecs,
    goodsSpecDetails,
    goodsInfos,
    isSkuNoQuery,
    goodsNo
  } = details;
  const [sizeList, setSizeList] = useState([]);

  const getPriceOrCode = () => {
    const selectGoodSize = goodsSpecs.map((item: any) =>
      item.chidren.find((good: any) => good.selected)
    )?.[0]?.detailName;
    const selectPrice = goodsInfos.find(
      (item: any) => item.packSize == selectGoodSize
    )?.marketPrice;
    const goodsInfoBarcode =
      goodsInfos.find((item: any) => item.packSize === selectGoodSize)
        ?.goodsInfoBarcode || goodsInfos?.[0]?.goodsInfoBarcode;
    const barcode = goodsInfoBarcode ? goodsInfoBarcode : '12'; //暂时临时填充一个code,因为没有值，按钮将不会显示，后期也许产品会干掉没有code的时候不展示吧==
    updatedPriceOrCode({barcode, selectPrice});
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
    goodsSpecs.map((el: any) => {
      if (el.chidren.filter((item: any) => item.selected).length) {
        selectedArr.push(el.chidren.filter((item: any) => item.selected)[0]);
      }
      return el;
    });
    selectedArr = selectedArr.sort((a, b) => a.specDetailId - b.specDetailId);
    idArr = selectedArr.map((el) => el.specDetailId);
    //marketprice需要取sku的（goodsinfo是sku），不然有时候spu（goods里面）会没值
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
    GAPdpSizeChange(goodSize)
    const barcode = goodsInfos.find((item: any) => item.packSize === goodSize)
      ?.goodsInfoBarcode;
    updatedPriceOrCode({barcode,clickEvent:true});
    matchGoods();
  };

  useEffect(() => {
    let choosedSpecsArr: any[] = [];
    let sizeList = [];
    if (isSkuNoQuery) {
      // 通过sku查询
      let specsItem = goodsInfos.filter(
        (item: any) => item.goodsInfoNo == goodsNo
      );
      choosedSpecsArr =
        specsItem && specsItem[0] && specsItem[0].mockSpecDetailIds;
    }
    // 组装购物车的前端数据结构与规格的层级关系
    if (goodsSpecDetails) {
      goodsSpecs.map((sItem: any, index: any) => {
        sItem.chidren = goodsSpecDetails.filter((sdItem: any, i: number) => {
          if (index === 0) {
            let filterproducts = goodsInfos.filter((goodEl: any) =>
              goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)
            );
            sdItem.goodsInfoUnit = filterproducts?.[0]?.goodsInfoUnit;
            sdItem.isEmpty = filterproducts.every(
              (item: any) => item.stock === 0
            );
            // filterproduct.goodsInfoWeight = parseFloat(sdItem.detailName)
          }
          return sdItem.specId === sItem.specId;
        });
        let defaultSelcetdSku = -1;
        if (choosedSpecsArr.length) {
          for (let i = 0; i < choosedSpecsArr.length; i++) {
            let specDetailIndex = sItem.specDetailIds.indexOf(
              choosedSpecsArr[i]
            );
            if (specDetailIndex > -1) {
              defaultSelcetdSku = specDetailIndex;
            }
          }
        }
        if (defaultSelcetdSku > -1) {
          // 默认选择该sku
          if (!sItem.chidren[defaultSelcetdSku].isEmpty) {
            // 如果是sku进来的，需要默认当前sku被选择
            sItem.chidren[defaultSelcetdSku].selected = true;
          }
        } else {
          if (
            window.__.env.REACT_APP_COUNTRY === 'de' &&
            sItem.chidren.length > 1 &&
            !sItem.chidren[1].isEmpty
          ) {
            sItem.chidren[1].selected = true;
          } else if (sItem.chidren.length > 1 && !sItem.chidren[1].isEmpty) {
            sItem.chidren[1].selected = true;
          } else {
            for (let i = 0; i < sItem.chidren.length; i++) {
              if (sItem.chidren[i].isEmpty) {
              } else {
                sItem.chidren[i].selected = true;
                break;
              }
            }
            // 如果所有sku都没有库存 取第一个规格
            if (
              sItem.chidren.filter((el: any) => el.selected).length === 0 &&
              sItem.chidren.length
            ) {
              sItem.chidren[0].selected = true;
            }
          }
        }
        return sItem;
      });
    } else {
      goodsInfos[0].selected = true;
    }
    setSizeList(goodsInfos);
  }, [details.goodsNo,renderAgin]);
  useEffect(() => {
    (async () => {
      if (sizeList.length) {
        if (goodsSpecDetails) {
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
                  className={`rc-swatch__item ${
                    sdItem.selected ? 'selected' : ''
                  } ${sdItem.isEmpty ? 'outOfStock' : ''}`}
                  onClick={() => {
                    if (sdItem.isEmpty || sdItem.selected) {
                      return false;
                    } else {
                      handleChooseSize(sItem.specId, sdItem.specDetailId);
                    }
                  }}
                >
                  <span
                    style={{
                      backgroundColor: sdItem.isEmpty ? '#ccc' : '#fff',
                      cursor: sdItem.isEmpty ? 'not-allowed' : 'pointer'
                    }}
                  >
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
