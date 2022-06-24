interface Props {
  defaultSkuNo?: string;
  defaultSkuId?: string;
  goodsInfos: any[];
  goodsSpecDetails: any[];
  goodsSpecs: any[];
  disabledGoodsInfoIds?: string[];
  onIsSpecAvailable?: Function;
  canSelectedWhenAllSpecDisabled?: boolean; //是否规格禁用了，仍然可以被选中，eg:规格被禁用了，一般情况不默认选中了；然而，PDP，即使规格被禁用了，仍需被选中，原因是需要返回对应的price信息，以便页面展示用
  canSelectedOutOfStock?: boolean; //when sku out of stock, don't disabled sku, it's an optional status and displays 'out of stock' info.
}

/**
 * 封装sizeList，实质为goodsInfos；组装规格层级信息，用于页面循环展示用，children
 * @param defaultSkuNo - 默认选中的skuNo
 * @param defaultSkuId - 默认选中的skuId
 */
const handleSizeList = ({
  defaultSkuNo,
  defaultSkuId,
  goodsInfos,
  goodsSpecDetails,
  goodsSpecs,
  disabledGoodsInfoIds = [],
  onIsSpecAvailable = () => {},
  canSelectedWhenAllSpecDisabled = false,
  canSelectedOutOfStock = false
}: Props) => {
  let choosedSpecsArr: any[] = [];
  // 通过sku no查询，默认选中此sku
  if (defaultSkuNo) {
    const specsItem = goodsInfos.find(
      (item: any) => item.goodsInfoNo == defaultSkuNo
    );
    if (specsItem) {
      choosedSpecsArr = specsItem.mockSpecDetailIds;
    }
  }

  // 通过sku id查询，默认选中此sku
  if (defaultSkuId) {
    const specsItem = goodsInfos.find(
      (item: any) => item.goodsInfoId == defaultSkuId
    );
    if (specsItem) {
      choosedSpecsArr = specsItem.mockSpecDetailIds;
    }
  }

  // 组装购物车的前端数据结构与规格的层级关系
  if (goodsSpecDetails) {
    // 是否有规格可用
    let isAllSpecDisabled = true;
    goodsSpecs.map((sItem: any, index: any) => {
      // 该层判断是为了去判断sku是否存在
      // children为每个规格类别下的详细规则value，比如重量下的1kg、2kg集合
      sItem.chidren = goodsSpecDetails.filter((sdItem: any) => {
        const filterproducts = goodsInfos.filter((goodEl) =>
          goodEl.mockSpecDetailIds.includes(sdItem.specDetailId)
        );
        sdItem.goodsInfoUnit = filterproducts?.[0]?.goodsInfoUnit;
        sdItem.isEmpty = filterproducts.every((item) => item.stock === 0);
        sdItem.isUnitPriceZero = filterproducts?.[0]?.marketPrice === 0;
        sdItem.isDisabled =
          sdItem.isEmpty ||
          sdItem.isUnitPriceZero ||
          disabledGoodsInfoIds.includes(filterproducts[0]?.goodsInfoId);
        sdItem.canSelectedOutOfStock = sdItem.isEmpty && canSelectedOutOfStock;
        return sdItem.specId === sItem.specId;
      });

      // 所有规格都不可用，一旦有可用的，则置为false
      if (sItem.chidren.some((_item: any) => !_item.isDisabled)) {
        isAllSpecDisabled = false;
      }

      let defaultSelcetdSku = -1;
      if (choosedSpecsArr.length) {
        for (let i = 0; i < choosedSpecsArr.length; i++) {
          let specDetailIndex = sItem.chidren.findIndex(
            (el: any) => el.specDetailId === choosedSpecsArr[i]
          );
          if (specDetailIndex > -1) {
            defaultSelcetdSku = specDetailIndex;
          }
        }
      }

      const isSelectedDefaultSkuItem = sItem.chidren.findIndex(
        (_item: any) =>
          _item.isSelected &&
          (canSelectedWhenAllSpecDisabled || !_item.isDisabled)
      );

      // 规格默认选中逻辑:
      if (defaultSelcetdSku > -1) {
        // 1. 如果是sku进来的，需要默认当前sku被选择
        if (!sItem.chidren[defaultSelcetdSku].isEmpty) {
          sItem.chidren[defaultSelcetdSku].selected = true;
        }
      } else if (isSelectedDefaultSkuItem > -1) {
        // 2. 在storePortal设置了defaultSku那么该sku被选中
        sItem.chidren[isSelectedDefaultSkuItem].selected = true;
      } else {
        // 3. 按以前默认的逻辑走:
        if (
          window.__.env.REACT_APP_COUNTRY === 'de' &&
          sItem.chidren.length &&
          !sItem.chidren[0].isEmpty
        ) {
          // 3.1 德国默认选中第一个
          sItem.chidren[0].selected = true;
        } else if (sItem.chidren.length > 1 && !sItem.chidren[1].isDisabled) {
          // 3.2 其他国家默认选中第二个（在有多个规格的情况下）
          sItem.chidren[1].selected = true;
        } else {
          for (let i = 0; i < sItem.chidren.length; i++) {
            if (!sItem.chidren[i].isDisabled) {
              sItem.chidren[i].selected = true;
              break;
            }
          }
          // 如果所有sku都没有被选中时
          if (
            sItem.chidren.filter((el: any) => el.selected).length === 0 &&
            sItem.chidren.length
          ) {
            // 取第一个规格
            if (canSelectedWhenAllSpecDisabled) {
              sItem.chidren[0].selected = true;
            } else {
              // 取第一个可用规格
              const targetItem = sItem.chidren.filter(
                (el: any) => !el.isDisabled
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
    goodsInfos[0].selected = true;
  }

  return goodsInfos;
};

export default handleSizeList;
