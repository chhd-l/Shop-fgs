/* eslint-disable no-unused-expressions */
import { pillarEnum } from '.';
import { filterObjectValue } from '../utils';
import { filterAttrValue, getSubscriptionAttr } from './util';

export const GACartButtonClick = (item) => {
  window.dataLayer?.push({
    event: 'cartButtonClick', //String : constant
    cartButtonClick: {
      item //String : label of the button clicked ("Buy Now" or "Guest checkout")
    }
  });
};

export const GACartRecommendedProductClick = (el) => {
  window.dataLayer = window.dataLayer || [];
  const filterAttrValue = (list, keyWords) => {
    return (list || [])
      .filter((attr) => attr?.goodsAttributeName?.toLowerCase() == keyWords)
      .map((item) => item?.goodsAttributeValue);
  };

  const {
    fromPrice,
    goodsCate,
    goodsInfos,
    goodsBrand,
    goodsNo,
    goodsName,
    mainItemCode,
    goodsAttributesValueRelVOAllList,
    goodsSpecDetailVOS,
    goodsCateName,
    goodsImg,
    goodsInfoVOS,
    goodsInfoIds,
    brandName
  } = el;
  const breed = filterAttrValue(goodsAttributesValueRelVOAllList, 'breeds');
  const specie = filterAttrValue(
    goodsAttributesValueRelVOAllList,
    'species'
  ).toString();
  const range = filterAttrValue(
    goodsAttributesValueRelVOAllList,
    'range'
  ).toString();
  const technology = filterAttrValue(
    goodsAttributesValueRelVOAllList,
    'technology'
  ).toString();
  const size = goodsSpecDetailVOS?.[0]?.detailName || '';
  const SKU = goodsInfoVOS?.[0]?.goodsInfoNo || '';
  const gaProduct = {
    price: fromPrice,
    specie,
    range,
    name: goodsName,
    mainItemCode,
    SKU,
    technology,
    brand: brandName,
    breed,
    size
  };

  const product = filterObjectValue(gaProduct);

  dataLayer.push({
    event: 'cartRecommendedProductClick',
    cartRecommendedProductClick: {
      products: [product]
    }
  });
};

export const GABackInStockNotifyMeClick = () => {
  window.dataLayer?.push({
    event: 'backInStockNotifyMe' //String : constant
  });
};
export const GABackToStockSubscription = (item, form) => {
  const {
    goodsName,
    goodsInfos,
    goodsNo,
    goodsAttributesValueRelList,
    goodsType
  } = item;
  const selectSku = item.sizeList?.filter((i) => i.selected);

  let product = {
    pillar: pillarEnum[goodsType],
    SKU: goodsInfos?.[0]?.goodsInfoNo || '',
    size: selectSku.map((selectItem) => selectItem.specText).toString(),
    price: selectSku.map((selectItem) => selectItem.marketPrice).toString(),
    specie: filterAttrValue(goodsAttributesValueRelList, 'species').toString(),
    range: filterAttrValue(goodsAttributesValueRelList, 'range').toString(),
    technology: filterAttrValue(
      goodsAttributesValueRelList,
      'technology'
    ).toString(),
    breed: filterAttrValue(goodsAttributesValueRelList, 'breeds'),
    subscription: getSubscriptionAttr(form.buyWay),
    quantity: form.quantity,
    name: goodsName,
    mainItemCode: goodsNo,
    brand: 'Royal Canin'
  };
  if (form.buyWay !== 0) {
    product.subscriptionFrequency = form.frequencyValueEn;
  }
  window.dataLayer?.push({
    event: 'BackToStockSubscription', //String : Constant
    BackToStockSubscription: {
      //String : Constant
      products: [product]
    }
  });
};
