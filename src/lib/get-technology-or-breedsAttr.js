const isHub = window.__.env.REACT_APP_HUB == '1';

/**
 * hub商品图片下方展示的属性
 * @param {*} product 产品列表接口返回的item
 * @returns {string}
 */
const getTechnologyOrBreedsAttr = (product) => {
  const breedsAttr = (product.goodsAttributesValueRelVOAllList || [])
    .filter((item) => item?.goodsAttributeName?.toLowerCase() == 'breeds')
    .map((t) => t.goodsAttributeValueEn);
  const breedsValueAttr = (product.goodsAttributesValueRelVOAllList || [])
    .filter((item) => item?.goodsAttributeName?.toLowerCase() == 'breeds')
    .map((t) => t.goodsAttributeValue);
  const technologyAttr = (product.goodsAttributesValueRelVOAllList || [])
    .filter((item) => item?.goodsAttributeName?.toLowerCase() == 'technology')
    .map((t) => t.goodsAttributeValueEn);
  const attrs = breedsAttr.concat(technologyAttr).join(','); //需要排序因此不能一起写；
  const breedValue = breedsValueAttr?.[0]?.split('_')?.[1];
  const breed = breedValue
    ? breedValue.toLowerCase() === 'cat'
      ? 'Для кошек'
      : 'Для собак'
    : ''; //俄罗斯定制，嗐！
  const ruAttrs = breed ? [breed, ...technologyAttr] : [...technologyAttr];
  const technologyOrBreedsAttr =
    isHub && window.__.env.REACT_APP_COUNTRY === 'ru'
      ? ruAttrs.join(',')
      : attrs;
  return technologyOrBreedsAttr;
};

export default getTechnologyOrBreedsAttr;
