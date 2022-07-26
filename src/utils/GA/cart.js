/* eslint-disable no-unused-expressions */
import { pillarEnum } from '.';
import { filterObjectValue } from '../utils';
import { filterAttrValue } from './util';

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
    cateId,
    minMarketPrice,
    goodsCateName,
    goodsName,
    goodsInfos,
    goodsNo,
    goodsAttributesValueRelList,
    goodsImg,
    quantity,
    goodsType
  } = item;
  const SKU = goodsInfos?.[0]?.goodsInfoNo || '';
  const selectSku = item.sizeList.filter((item) => item.selected);
  const size = selectSku.map((selectItem) => selectItem.specText).toString();
  const price = selectSku
    .map((selectItem) => selectItem.marketPrice)
    .toString();
  const specie = filterAttrValue(
    goodsAttributesValueRelList,
    'species'
  ).toString();
  const range = filterAttrValue(
    goodsAttributesValueRelList,
    'range'
  ).toString();
  const technology = filterAttrValue(
    goodsAttributesValueRelList,
    'technology'
  ).toString();
  const breed = filterAttrValue(goodsAttributesValueRelList, 'breeds');
  window.dataLayer?.push({
    event: 'BackToStockSubscription', //String : Constant
    BackToStockSubscription: {
      //String : Constant
      products: [
        {
          //All the information provided in the "products" object have the same key / values as other product interactions (PLP Load, PDP Load, checkout, etc...)
          pillar: pillarEnum[goodsType], //String : 'SPT' or 'Vet' depending on type of product range
          price, //Integer : Product Price, including discount if promo code activated for this product
          specie, //String : 'Cat' or 'Dog',
          range, //String : Possible values are 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
          name: goodsName,
          mainItemCode: goodsNo,
          SKU,

          technology, //String : 'Dry', 'Wet', 'Pack'
          quantity: quantity,
          brand: 'Royal Canin', //String : 'Royal Canin' or 'Eukanuba'
          size, //String : Same wording as displayed on the site, with units depending on the country (oz, grams...)
          breed //Array : All animal breeds associated with the product in an array
        }
      ]
    }
  });
};
