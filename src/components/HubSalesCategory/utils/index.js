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

//猫狗category的顺序配置
const categorySetting = (cate) => {
  const setting1 = {
    cat: '1',
    dog: '2'
  };
  const setting2 = {
    cat: '2',
    dog: '1'
  };
  const defaultSetting = (cate) => {
    return setting2[cate];
  };

  const newSetting =
    {
      ru: () => {
        return setting1[cate];
      },
      mx: () => {
        return setting1[cate];
      },
      de: () => {
        return setting1[cate];
      },
      ca: () => {
        return setting1[cate];
      },
      jp: () => {
        return setting1[cate];
      },
      nl: () => {
        return setting1[cate];
      }
    }[window.__.env.REACT_APP_COUNTRY] || defaultSetting;

  return newSetting(cate);
};

export { salesCategoryFilterRule, salesCategoryFilterRule2, categorySetting };
