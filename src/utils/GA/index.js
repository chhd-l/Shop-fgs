const isHubGA = window.__.env.REACT_APP_HUB_GA;

const localItemRoyal = window.__.localItemRoyal;

const isRu = window.__.env.REACT_APP_COUNTRY === 'ru';

const filterAttrValue = (list, keyWords) => {
  return (list || [])
    .filter((attr) => attr?.goodsAttributeName?.toLowerCase() === keyWords)
    .map((item) => item?.goodsAttributeValue);
};

const getPromotionInfo = () => {
  let promotionInfo = localItemRoyal.get('rc-totalInfo');
  return promotionInfo?.goodsInfos?.map((item) => {
    return {
      promoCodeName: item.marketingCode || '',
      promoCodeAmount: item.promotionDiscountPrice || ''
    };
  });
};

//{0:'One Shot', 1:'Subscription', 2:'Club'}
const getSubscriptionAttr = (goodsInfoFlag) => {
  return (
    {
      0: 'One Shot',
      1: 'Subscription',
      2: 'Club'
    }[goodsInfoFlag] || 'One Shot'
  );
};

export const getOtherSpecies = (item, attribute) => {
  const { goodsAttributesValueRelVOList, goodsAttributesValueRelList } = item;
  return (goodsAttributesValueRelVOList || goodsAttributesValueRelList || [])
    .filter(
      (attr) =>
        attr?.goodsAttributeName?.toLowerCase() == attribute?.toLowerCase()
    )
    .map((item) => item.goodsAttributeValue);
};

//species属性
const getSpecies = (item) => {
  if (window.__.env.REACT_APP_COUNTRY == 'de') {
    return getOtherSpecies(item, 'SPEZIES')?.[0] == 'Hund' ? 'Dog' : 'Cat';
  } else if (window.__.env.REACT_APP_COUNTRY == 'mx') {
    return getOtherSpecies(item, 'Species')?.[0];
  } else {
    return (
      {
        1158: 'Cat', //Russia Cat SPT food
        1159: 'Cat', //Russia Cat VET Food
        1160: 'Dog', //Russia Dog SPT food
        1161: 'Dog', //Russia Dog VET food
        1165: 'Cat', //Turkey Cat SPT food
        1166: 'Cat', //Turkey Cat VET Food
        1167: 'Dog', //Turkey Dog SPT food
        1168: 'Dog', //Turkey Dog VET food
        1133: 'Dog', //France Dog SPT food
        1134: 'Cat', //France Cat SPT food
        1153: 'Dog', //France Dog VET food
        1154: 'Cat', //France Cat VET Food
        1172: 'Cat', //US Cat SPT food
        1173: 'Cat', //US Cat VET food
        1174: 'Dog', //US Dog SPT food
        1175: 'Dog' //US Dog VET food
      }[item.cateId] || 'Cat'
    );
  }
};

//SpeciesId属性
const getSpeciesId = (item) => {
  if (window.__.env.REACT_APP_COUNTRY == 'de') {
    return getOtherSpecies(item, 'SPEZIES')?.[0] == 'Hund' ? '2' : '1';
  } else if (window.__.env.REACT_APP_COUNTRY == 'mx') {
    return getOtherSpecies(item, 'Species')?.[0] == 'Cat' ? '1' : '2';
  } else {
    return (
      {
        1158: '1', //Russia Cat SPT food
        1159: '1', //Russia Cat VET Food
        1160: '2', //Russia Dog SPT food
        1161: '2', //Russia Dog VET food
        1165: '1', //Turkey Cat SPT food
        1166: '1', //Turkey Cat VET Food
        1167: '2', //Turkey Dog SPT food
        1168: '2', //Turkey Dog VET food
        1133: '2', //France Dog SPT food
        1134: '1', //France Cat SPT food
        1153: '2', //France Dog VET food
        1154: '1', //France Cat VET Food
        1172: '1', //US Cat SPT food
        1173: '1', //US Cat VET food
        1174: '2', //US Dog SPT food
        1175: '2' //US Dog VET food
      }[item.cateId] || ''
    );
  }
};

// //删除对象中空属性
export function deleteObjEmptyAttr(obj) {
  for (var key in obj) {
    if (
      obj[key] === undefined ||
      obj[key] === null ||
      obj[key] === '' ||
      (Array.isArray(obj[key]) && obj[key].length == 0)
    ) {
      delete obj[key];
    }
  }
  return obj;
}

//天-0周  周-value*1 月-value*4
export const getComputedWeeks = (frequencyList) => {
  let calculatedWeeks = {};

  frequencyList.forEach((item) => {
    switch (item.type) {
      case 'Frequency_day':
        calculatedWeeks[item.id] = 0;
        break;
      case 'Frequency_week':
        calculatedWeeks[item.id] = item.valueEn * 1;
        break;
      case 'Frequency_month':
        calculatedWeeks[item.id] = item.valueEn * 4;
        break;
    }
  });

  return calculatedWeeks;
};

//myAccountScreen
export const myAccountPushEvent = (myAccountScreenName) => {
  if (!isHubGA) return;
  // setTimeout(() => {
  window.dataLayer &&
    dataLayer.push({
      event: 'myAccountScreen',
      myAccountScreenName //Values : 'Overview', 'Personal information', 'Pets', 'Orders & Subscriptions', 'Payment & Addresses', 'Security', 'Data & Settings'
    });
  // }, 5000gtm优化);

  // console.log(myAccountScreenName)
  // debugger
};

//myAccountAction
export const myAccountActionPushEvent = (myAccountActionName) => {
  if (!isHubGA) return;
  window?.dataLayer?.push({
    event: 'myAccountAction',
    myAccountActionName
    //Values : 'Add picture', 'Edit profile info', 'Edit contact info', 'Add pet', 'Remove pet', 'Download Invoice', 'Cancel Subscription','Pause Subscription', 'Restart Subscription', 'Add payment Method', 'Delete payment method', 'Add Address', 'Delete Address', 'Change email', 'Change password', 'Delete Account'
  });
  // console.log(myAccountActionName)
  // debugger
};

//faqClick
export const faqClickDataLayerPushEvent = ({ item, clickType }) => {
  if (!isHubGA) return;
  window?.dataLayer?.push({
    event: 'faqClick',
    faqClick: {
      item, //Generic name in English for each item
      clickType //'Expand' or 'Collapse'
    }
  });
};

//cartScreenLoad
export const GACartScreenLoad = (cb) => {
  // setTimeout(() => {
  window?.dataLayer?.push({
    event: 'cartScreenLoad',
    cartScreenLoad: {
      products: cb?.()
    }
  });
  // }, 5000gtm优化);
};

//checkoutScreenLoad
export const GACheckoutScreenLoad = (cb) => {
  // setTimeout(() => {
  window?.dataLayer?.push({
    event: 'checkoutScreenLoad',
    checkoutScreenLoad: {
      products: cb?.()
    }
  });
  // }, 5000gtm优化);
};

//init 游客(cart+checkout都使用)
export const GAInitUnLogin = ({
  productList,
  frequencyList,
  props,
  type,
  isReturnList
}) => {
  let arr = [];
  try {
    let promotionInfo = getPromotionInfo();
    if (!isHubGA) return;
    // const breed = [];
    // productList?.[0]?.goodsAttributesValueRelList
    //   ?.filter((item) => item?.goodsAttributeName?.toLowerCase() == 'breeds')
    //   .forEach((item2) => {
    //     breed.push(item2.goodsAttributeValue);
    //   });

    const calculatedWeeks = getComputedWeeks(frequencyList);
    const mapProductList = new Map(productList.map((item, i) => [i, item])); //换成map格式的目的 就是为了for of循环获取index
    for (let [index, item] of mapProductList) {
      let cur_selected_size =
        item.sizeList?.filter((item2) => {
          return item2.selected == true;
        }) || [];
      let variant = cur_selected_size[0]?.specText;
      let goodsInfoNo = cur_selected_size[0]?.goodsInfoNo;
      let price = item.goodsInfoFlag
        ? cur_selected_size[0]?.subscriptionPrice
        : cur_selected_size[0]?.marketPrice;
      let subscriptionFrequency = item.form
        ? calculatedWeeks[item.form.frequencyId]
        : '';
      let range = item.goodsCateName?.split('/')[1] || '';
      let technology = item.goodsCateName?.split('/')[2] || '';
      if (!technology) {
        //第二种方式获取technology
        item?.goodsAttributesValueRelList
          ?.filter((item) => item.goodsAttributeName == 'Technology')
          .forEach((item2) => {
            if (item2.goodsAttributeValue) {
              technology = item2.goodsAttributeValue;
            }
          });
      }

      if (type === 'felin') {
        price = item.salePrice;
      }
      const breed = filterAttrValue(
        item?.goodsAttributesValueRelList,
        'breeds'
      );
      const specie = filterAttrValue(
        item?.goodsAttributesValueRelList,
        'species'
      ).toString();
      let obj = deleteObjEmptyAttr({
        price: price, //Product Price, including discount if promo code activated for this product
        specie, //'Cat' or 'Dog',
        range: range, //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
        name: item.goodsName, //WeShare product name, always in English
        mainItemCode: item.goodsNo, //Main item code
        SKU: goodsInfoNo, //product SKU
        subscription: getSubscriptionAttr(item.goodsInfoFlag), //'One Shot', 'Subscription', 'Club'
        technology: technology, //'Dry', 'Wet', 'Pack'
        brand: 'Royal Canin', //'Royal Canin' or 'Eukanuba'
        size: variant || '', //Same wording as displayed on the site, with units depending on the country (oz, grams…)
        quantity: item.quantity, //Number of products, only if already added to cartequals 'Subscription or Club'
        subscriptionFrequency:
          item.goodsInfoFlag > 0 ? subscriptionFrequency : '', //Frequency in weeks, to populate only if 'subscription'
        recommendationID: props.clinicStore.linkClinicId || '', //recommendation ID
        //'sizeCategory': 'Small', //'Small', 'Medium', 'Large', 'Very Large', reflecting the filter present in the PLP
        breed, //All animal breeds associated with the product in an array
        imageURL: item.goodsInfoImg,
        promoCodeName:
          (promotionInfo &&
            promotionInfo[index] &&
            promotionInfo[index].promoCodeName) ||
          '', //Promo code name, only if promo activated
        promoCodeAmount:
          (promotionInfo &&
            promotionInfo[index] &&
            promotionInfo[index].promoCodeAmount) ||
          '' //Promo code amount, only if promo activated
      });
      if (type == 'felin') {
        // felin特殊处理
        obj.range = 'Booking';
        obj.name = "L'Atelier Félin booking";
        obj.mainItemCode = "L'Atelier Félin booking";
      }
      arr.push(obj);
    }
    props.checkoutStore.saveGAProduct({ products: arr });
    if (isReturnList) {
      return arr;
    }
    window?.dataLayer?.push({
      products: arr
    });
  } catch (err) {
    console.info('errrrrrrr', err);
  }
};

//init 会员(cart+checkout都使用)
export const GAInitLogin = ({
  productList,
  frequencyList,
  props,
  type,
  isReturnList
}) => {
  let promotionInfo = getPromotionInfo();
  if (!isHubGA) return;
  const calculatedWeeks = getComputedWeeks(frequencyList);
  let arr = [];
  const mapProductList = new Map(productList.map((item, i) => [i, item])); //换成map格式的目的 就是为了for of循环获取index
  for (let [index, item] of mapProductList) {
    let subscriptionFrequency = item.periodTypeId
      ? calculatedWeeks[item.periodTypeId]
      : '';
    let range = item.goods.goodsCateName?.split('/')[1] || '';
    // let range = ''
    // item?.goodsAttributesValueRelVOList
    // ?.filter((item) => item.goodsAttributeName == 'Range')
    // .forEach((item2) => {
    //   if(item2.goodsAttributeValue){
    //     range = item2.goodsAttributeValue.split("_")[0]
    //   }
    // });
    let technology = item.goods.goodsCateName?.split('/')[2] || '';
    if (!technology) {
      //第二种方式获取technology
      item?.goodsAttributesValueRelVOList
        ?.filter((item) => item.goodsAttributeName == 'Technology')
        .forEach((item2) => {
          if (item2.goodsAttributeValue) {
            technology = item2.goodsAttributeValue;
          }
        });
    }

    // let breed = [];
    // item?.goodsAttributesValueRelVOList
    //   ?.filter((item) => item?.goodsAttributeName?.toLowerCase() == 'breeds')
    //   .forEach((item2) => {
    //     breed.push(item2.goodsAttributeValue);
    //   });
    // 非会员和会员的数据来源不一样，不要直接复制粘贴同一个值，取值不对！
    const breed = filterAttrValue(
      item?.goodsAttributesValueRelVOList,
      'breeds'
    );
    const specie = filterAttrValue(
      item?.goodsAttributesValueRelVOList,
      'species'
    ).toString();
    let productItem = {
      price: item.goodsInfoFlag > 0 ? item.subscriptionPrice : item.salePrice, //Product Price, including discount if promo code activated for this product
      specie, //'Cat' or 'Dog',
      range: range, //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
      name: item.goodsName, //WeShare product name, always in English
      mainItemCode: item.goods.goodsNo, //Main item code
      SKU: item.goodsInfoNo, //product SKU
      subscription: getSubscriptionAttr(item.goodsInfoFlag), //'One Shot', 'Subscription', 'Club'
      technology: technology, //'Dry', 'Wet', 'Pack'
      brand: 'Royal Canin', //'Royal Canin' or 'Eukanuba'
      size: item.specText, //Same wording as displayed on the site, with units depending on the country (oz, grams…)
      quantity: item.buyCount, //Number of products, only if already added to cartequals 'Subscription or Club'
      subscriptionFrequency:
        item.goodsInfoFlag > 0 ? subscriptionFrequency : '', //Frequency in weeks, to populate only if 'subscription'
      recommendationID: props.clinicStore.linkClinicId || '', //recommendation ID
      //'sizeCategory': 'Small', //'Small', 'Medium', 'Large', 'Very Large', reflecting the filter present in the PLP
      breed, //All animal breeds associated with the product in an array
      imageURL: item.goodsInfoImg,
      promoCodeName:
        (promotionInfo &&
          promotionInfo[index] &&
          promotionInfo[index].promoCodeName) ||
        '', //Promo code name, only if promo activated
      promoCodeAmount:
        (promotionInfo &&
          promotionInfo[index] &&
          promotionInfo[index].promoCodeAmount) ||
        '' //Promo code amount, only if promo activated
    };
    if (type == 'felin') {
      // felin特殊处理
      productItem.range = 'Booking';
      productItem.name = "L'Atelier Félin booking";
      productItem.mainItemCode = "L'Atelier Félin booking";
    }
    let obj = deleteObjEmptyAttr(productItem);

    arr.push(obj);
  }

  //debugger;

  props.checkoutStore.saveGAProduct({ products: arr });
  if (isReturnList) {
    return arr;
  }
  window?.dataLayer?.push({
    products: arr
  });
};

// const calculateGAPrice = (productList, activeIndex) => {
//   let MaxMarketPrice = Math.max.apply(
//     null,
//     productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
//   );
//   let MinMarketPrice = Math.min.apply(
//     null,
//     productList[activeIndex].goodsInfos.map((g) => g.marketPrice || 0)
//   );
//   if (isRu) {
//     MaxMarketPrice = MinMarketPrice; // 俄罗斯只展示最低价格
//   }

//   let GAPrice = '';
//   if (MaxMarketPrice > 0) {
//     if (MaxMarketPrice === MinMarketPrice) {
//       GAPrice = Math.round(MaxMarketPrice * 0.8);
//     } else {
//       GAPrice = MinMarketPrice + '~' + MaxMarketPrice;
//     }
//   }

//   return GAPrice;
// };

//cart cartChangeSubscription
export const GACartChangeSubscription = (btnContent) => {
  if (!isHubGA) return;
  window?.dataLayer?.push({
    event: 'cartChangeSubscription',
    cartChangeSubscription: {
      button: btnContent //Values : 'Single purchase', 'Autoship'
    }
  });
};
//recommendation-product
export const GARecommendationProduct = (
  productList,
  type,
  frequencyList,
  promotionCode,
  activeIndex
) => {
  // type: 3=>us shelter; 4=>felin
  const calculatedWeeks = getComputedWeeks(frequencyList);
  const products = productList.map((item) => {
    const {
      goods,
      goodsInfos,
      goodsAttributesValueRelVOAllList,
      goodsAttributesValueRelList
    } = item;
    const { minMarketPrice, goodsNo, goodsName, goodsCateName } = goods;
    let price = minMarketPrice;
    let SKU = goodsInfos?.[0]?.goodsInfoNo || '';
    if (type === 3 || type === 4) {
      SKU = item.goodsInfos.find(
        (citem) => citem.goodsInfoId == item.goodsInfoId
      )?.goodsInfoNo;
      price = item.salePrice;
    }
    const cateName = goodsCateName?.split('/');
    const breed = filterAttrValue(
      goodsAttributesValueRelVOAllList || goodsAttributesValueRelList || [],
      'breeds'
    );
    const specie = filterAttrValue(
      goodsAttributesValueRelVOAllList || goodsAttributesValueRelList || [],
      'species'
    ).toString();
    // breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';
    let subscriptionFrequency = item.periodTypeId
      ? calculatedWeeks[item.periodTypeId]
      : '';
    let productItem = {
      price,
      specie,
      range: type === 4 ? 'Booking' : cateName?.[1] || '', //sku不存在，只有spu上有
      name: type === 4 ? "L'Atelier Félin booking" : goodsName,
      mainItemCode: type === 4 ? "L'Atelier Félin booking" : goodsNo,
      SKU,
      subscription: getSubscriptionAttr(item.goodsInfoFlag),
      subscriptionFrequency:
        item.goodsInfoFlag > 0 ? subscriptionFrequency : '',
      technology: cateName?.[2] || '',
      brand: 'Royal Canin',
      size: item.specText, //???
      breed, //???
      quantity: item.buyCount,
      sizeCategory: '', //??
      promoCodeName: promotionCode || '',
      promoCodeAmount: ''
    };
    let res = deleteObjEmptyAttr(productItem);
    return res;
  });
  //debugger;
  (type === 1 || type === 4) &&
    window?.dataLayer?.unshift({
      products
    });
  type === 2 &&
    window?.dataLayer?.push({
      event: 'breederRecoTabClick',
      breederRecoTabClickProduct: products
    });

  type === 3 &&
    window?.dataLayer?.push({
      event: 'shelterLPAddToCart',
      product: products[0]
    });
};
//GA pet 全局获取
export const doGetGAVal = (props) => {
  if (!isHubGA) return;
  let breed = [],
    id = [],
    obj = {
      specieId: [],
      breedName: []
    };
  const {
    loginStore: { isLogin },
    checkoutStore: { cartData, loginCartData }
  } = props;

  if (isLogin) {
    for (let item of loginCartData) {
      item?.goodsAttributesValueRelVOList
        ?.filter((item) => item?.goodsAttributeName?.toLowerCase() == 'breeds')
        .forEach((item2) => {
          breed.push(item2.goodsAttributeValue);
        });
      id.push(getSpeciesId(item));
    }
  } else {
    cartData.forEach((item) => {
      id.push(getSpeciesId(item));
    });

    let arr = (cartData[0] && cartData[0].goodsAttributesValueRelList) || [];

    arr
      .filter((item) => item?.goodsAttributeName?.toLowerCase() == 'breeds')
      .forEach((item2) => {
        breed.push(item2.goodsAttributeValue);
      });
  }
  obj.specieId = id;
  obj.breedName = breed;
  return deleteObjEmptyAttr(obj);
};

//checkout step
export const checkoutDataLayerPushEvent = ({ name, options }) => {
  if (!isHubGA) return;
  // setTimeout(() => {
  window?.dataLayer?.push({
    event: 'checkoutStep',
    checkoutStep: {
      name, //Following values possible : 'Email', 'Delivery', 'Payment', 'Confirmation'
      options //'Guest checkout', 'New account', 'Existing account'
    }
  });
  // }, 5000gtm优化);
};

//Order confirmation
export const orderConfirmationPushEvent = (details) => {
  const clinic = details.tradeItems.some((item) => item.recommendationId);
  if (!isHubGA) return;
  const GA_product = localItemRoyal.get('rc-ga-product');
  let obj = {
    event: 'orderConfirmation',
    orderConfirmation: deleteObjEmptyAttr({
      id: details.totalTid || '', //Transaction ID, same as backend system
      currency: window.__.env.REACT_APP_GA_CURRENCY_CODE, //cf. https://support.google.com/analytics/answer/6205902?hl=en for complete list
      amount: details.tradePrice.totalPrice, //Transaction amount without taxes and shipping, US number format, for local currency
      taxes: details.tradePrice.taxFeePrice, //Taxes amount, US number format, local currency
      shipping: details.tradePrice.deliveryPrice, //Shipping amount, US number format, local currency
      paymentMethod: 'Credit Card',
      shippingMode:
        details.clinicsId || clinic ? 'Clinic' : 'Standard Delivery',
      ...GA_product
    })
  };
  // setTimeout(() => {
  window?.dataLayer?.push(obj);
  // }, 3000gtm优化);
};

//product finder  productFinderScreen:{name}
const getStepCurrentName = ({ type, stepName }) => {
  let stepVirtualPageURLObj = {
    age: 'productfinder/' + type + '/age',
    breed: 'productfinder/' + type + '/breed',
    sterilized: 'productfinder/' + type + '/sterilization_status',
    genderCode: 'productfinder/' + type + '/gender',
    weight: 'productfinder/' + type + '/weight',
    sensitivity: 'productfinder/' + type + '/sensitivity',
    petActivityCode: 'productfinder/' + type + '/activity',
    lifestyle: 'productfinder/' + type + '/lifestyle'
  };
  return stepVirtualPageURLObj[stepName];
};

//product finder  productFinderScreen:{previousAnswer}
const getStepCurrentPreviousAnswer = (answerList) => {
  if (answerList.length == 0) return;
  if (answerList[answerList.length - 1].productFinderAnswerDetailsVO) {
    let productFinderAnswerDetailsVO =
      answerList[answerList.length - 1].productFinderAnswerDetailsVO;
    return (
      productFinderAnswerDetailsVO.prefix +
      ' ' +
      productFinderAnswerDetailsVO.suffix
    );
  }
};

//product finder
export const productFinderPushEvent = ({
  type,
  stepName,
  stepOrder,
  answerdQuestionList
}) => {
  window?.dataLayer?.push({
    event: 'productFinderScreen',
    productFinderScreen: {
      name: getStepCurrentName({ type, stepName }), //Pattern : productfinder/pet/step, see full list below
      number: stepOrder, //Step number
      previousAnswer: getStepCurrentPreviousAnswer(answerdQuestionList) //Answer to previous question, generic name, in English
    }
  });
};

export const GABuyNow = () => {
  window?.dataLayer?.push({
    event: 'breederRecoBuyNow'
  });
};

export const GABreederRecoPromoCodeCTA = () => {
  window?.dataLayer?.push({
    event: 'breederRecoPromoCodeCTA'
  });
};

export const GABreederRecoSeeInCart = () => {
  window?.dataLayer?.push({
    event: 'breederRecoSeeInCart'
  });
};

export const GABigBreederAddToCar = (products) => {
  let quantity = products.length,
    buyWay = 0;
  window?.dataLayer?.push({
    event: 'pdpAddToCart',
    pdpAddToCartQuantity: quantity,
    pdpAddToCartCtA: { 0: 'One Shot', 1: 'Subscription', 2: 'Club' }[buyWay]
  });
};

export const GAInstantSearchFieldClick = () => {
  window?.dataLayer?.push({
    event: 'instantSearchFieldClick'
  });
};

export const GAInstantSearchResultDisplay = ({
  query,
  productResultNum,
  contentResultNum
}) => {
  window?.dataLayer?.push({
    event: 'instantSearchResultDisplay',
    instantSearchResultDisplay: {
      query, //Query as written by the user
      productResultsDisplayed: productResultNum, //Number of product results displayed on the box
      contentResultsDisplayed: contentResultNum //Number of content results displayed on the box
    }
  });
};

export const GAInstantSearchResultClick = ({ type, name, position }) => {
  window?.dataLayer?.push({
    event: 'instantSearchResultClick',
    instantSearchResultClick: {
      type, //'Product' or 'Content' depending on the type of result clicked
      name, //Link name, as written on the list
      position //Position of the article in the product or content list
    }
  });
};

export const GAWhistleFitButtonClick = (positon, label) => {
  window?.dataLayer?.push({
    event: 'whistleFitLandingButtonClick',
    whistleFitLandingButtonClick: {
      position: positon,
      label: label
    }
  });
};

export const GAonSearchSelectionFocus = (type) => {
  return;
  window.__.env.REACT_APP_COUNTRY === 'ru' &&
    window?.dataLayer?.push({
      event: 'suggestedAdressInteraction',
      suggestedAdress: {
        action: 'fieldClick',
        type: type || 'Add'
      }
    });
  console.info('onSearchSelectionFocus', type || 'Add');
};
export const GAonSearchSelectionError = (errorMessage, type) => {
  return;
  window.__.env.REACT_APP_COUNTRY === 'ru' &&
    window?.dataLayer?.push({
      event: 'suggestedAdressInteraction',
      suggestedAdress: {
        action: 'errorMessage',
        message: errorMessage, //The message must be translated into English
        type: type || 'Add' //'Add' or 'Modify' depending if the user has an address in their account
      }
    });
  console.info('onSearchSelectionError', type || 'Add');
};

export const GAonSearchSelectionChange = (type) => {
  return;
  window.__.env.REACT_APP_COUNTRY === 'ru' &&
    window?.dataLayer?.push({
      event: 'suggestedAdressInteraction',
      suggestedAdress: {
        action: 'suggestionClick',
        type: type || 'Add'
      }
    });
  console.info('onSearchSelectionChange', type || 'Add');
};

export { getSpecies };
// export { GAForSeeRecommendationBtn, GAForChangePetinfoBtn, GAForChangeProductBtn } from './subscription'
export * from './subscription';
