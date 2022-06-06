export const GACartButtonClick = (item) => {
  window.dataLayer?.push({
    event: 'cartButtonClick', //String : constant
    cartButtonClick: {
      item //String : label of the button clicked ("Buy Now" or "Guest checkout")
    }
  });
};
export const GACartRecommendedProductClick = (product) => {
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
    goodsCateName,
    goodsImg,
    subscription,
    goodsInfoVOS,
    subscriptionFrequency,
    goodsInfoIds,
    promoCodeName,
    brandName,
    promoCodeAmount = ''
  } = product;
  const breed = filterAttrValue(goodsAttributesValueRelVOAllList, 'breeds');
  // const spezies = filterAttrValue(
  //   goodsAttributesValueRelVOAllList,
  //   'spezies'
  // );
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
  const size = filterAttrValue(goodsAttributesValueRelVOAllList, 'size')[0];
  const SKU = goodsInfoIds[0];
  const quantity = goodsInfoVOS[0].buyCount;
  // const specie = breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';//这个方法有时候数据没有breed，判断不了
  // const deSpecie = spezies.includes('Hund') ? 'Dog' : 'Cat'; //德国用来判断是猫咪还是狗狗
  const gaProduct = {
    price: fromPrice,
    specie,
    range,
    name: goodsName,
    mainItemCode,
    SKU,
    technology,
    subscription,
    subscriptionFrequency,
    brand: brandName,
    breed,
    size,
    quantity,
    promoCodeName,
    promoCodeAmount
  };
  // const  product = filterObjectValue(gaProduct);

  dataLayer.push({
    event: 'cartRecommendedProductClick',
    cartRecommendedProductClick: {
      products: [gaProduct]
    }
  });
};
