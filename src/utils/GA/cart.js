/* eslint-disable no-unused-expressions */
import { filterObjectValue } from '../utils';

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
