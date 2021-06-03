//home页 过滤规则
const salesCategoryFilterRule = (item, type) => {
  const defaultRule = () => {
    return item.cateType === type;
  };
  const rule =
    {
      TR: () => {
        return item.cateType === type && item.cateRouter.indexOf('vet') == -1;
      },
      FR: () => {
        return item.cateType === type && item.cateRouter.indexOf('vet') == -1;
      },
    }[process.env.REACT_APP_COUNTRY] || defaultRule;
  return rule();
};

//retail-products页 过滤规则 全部去掉vet
const salesCategoryFilterRule2 = (item, type) => {
  const defaultRule = () => {
    return item.cateType === type && item.cateRouter.indexOf('vet') == -1;
  };

  return defaultRule();
};

export { salesCategoryFilterRule, salesCategoryFilterRule2 };
