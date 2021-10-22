const isHub = window.__.env.REACT_APP_HUB == '1';

const filterAttrValue = (list, keyWords, val) => {
  return (list || [])
    .filter((attr) => attr?.goodsAttributeName?.toLowerCase() == keyWords)
    .map((item) => item?.[val]);
};

/**
 * hub商品图片下方展示的属性
 * @param {*} product 产品列表接口返回的item
 * @returns {string}
 */
const getTechnologyOrBreedsAttr = (product) => {
  const { goodsAttributesValueRelVOAllList } = product;
  // const breedsAttr = (product.goodsAttributesValueRelVOAllList || [])
  //   .filter((item) => item?.goodsAttributeName?.toLowerCase() == 'breeds')
  //   .map((t) => t.goodsAttributeValueEn);
  const breedsAttr = filterAttrValue(
    goodsAttributesValueRelVOAllList,
    'breeds',
    'goodsAttributeValueEn'
  );
  // const breedsValueAttr = (product.goodsAttributesValueRelVOAllList || [])
  //   .filter((item) => item?.goodsAttributeName?.toLowerCase() == 'breeds')
  //   .map((t) => t.goodsAttributeValue);
  const breedsValueAttr = filterAttrValue(
    goodsAttributesValueRelVOAllList,
    'breeds',
    'goodsAttributeValue'
  );
  // const technologyAttr = (product.goodsAttributesValueRelVOAllList || [])
  //   .filter((item) => item?.goodsAttributeName?.toLowerCase() == 'technology')
  //   .map((t) => t.goodsAttributeValueEn);
  const technologyAttr = filterAttrValue(
    goodsAttributesValueRelVOAllList,
    'technology',
    'goodsAttributeValueEn'
  );
  const technologyAttrs = technologyAttr.join(', ');
  const attrs = breedsAttr.concat(technologyAttr).join(', '); //需要排序因此不能一起写；
  const breedValue = breedsValueAttr?.[0]?.split('_')?.[1];
  const breed = breedValue
    ? breedValue.toLowerCase() === 'cat'
      ? 'Для кошек'
      : 'Для собак'
    : ''; //俄罗斯定制，嗐！
  const ruAttrs = breed ? [breed, ...technologyAttr] : [...technologyAttr];
  const technologyOrBreedsAttr =
    isHub && window.__.env.REACT_APP_COUNTRY === 'ru'
      ? ruAttrs.join(', ')
      : attrs;
  const goodsAttr =
    window.__.env.REACT_APP_COUNTRY === 'fr'
      ? technologyAttrs
      : technologyOrBreedsAttr;

  return goodsAttr;
};

export const getFoodType = (product) => {
  const { goodsAttributesValueRelVOAllList } = product;
  const technologyType =
    filterAttrValue(
      goodsAttributesValueRelVOAllList,
      'technology',
      'goodsAttributeValue'
    ).findIndex((item) => item.toLowerCase() === 'dry') > -1
      ? 'dry'
      : 'wet';
  const speciesType =
    filterAttrValue(
      goodsAttributesValueRelVOAllList,
      'species',
      'goodsAttributeValue'
    ).findIndex((item) => item.toLowerCase() === 'dog') > -1
      ? 'dog'
      : 'cat';
  return `${technologyType}${speciesType}`;
};

export default getTechnologyOrBreedsAttr;
