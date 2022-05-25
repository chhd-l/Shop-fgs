//home页 过滤规则
const salesCategoryFilterRule = (item, type) => {
  const defaultRule = () => {
    return item.displayStatus && item.cateType === type;
  };
  const rule =
    {
      tr: () => {
        return (
          item.displayStatus &&
          item.cateType === type &&
          item.cateRouter.indexOf('vet') == -1
        );
      },
      fr: () => {
        return (
          item.displayStatus &&
          item.cateType === type &&
          item.cateRouter.indexOf('vet') == -1
        );
      }
    }[window.__.env.REACT_APP_COUNTRY] || defaultRule;
  return rule();
};

//retail-products页 过滤规则 全部去掉vet
const salesCategoryFilterRule2 = (item, type) => {
  const defaultRule = () => {
    return (
      item.displayStatus &&
      item.cateType === type &&
      item.cateRouter.indexOf('vet') == -1
    );
  };

  return defaultRule();
};

export { salesCategoryFilterRule, salesCategoryFilterRule2 };
