export const filterAttrValue = (list, keyWords) => {
  return (list || [])
    .filter((attr) => attr?.goodsAttributeName?.toLowerCase() == keyWords)
    .map((item) => item?.goodsAttributeValue);
};

export const getSubscriptionAttr = (goodsInfoFlag) => {
  return (
    {
      0: 'One Shot',
      1: 'Subscription',
      2: 'Club'
    }[goodsInfoFlag] || 'One Shot'
  );
};
