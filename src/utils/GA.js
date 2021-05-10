const isHubGA = process.env.REACT_APP_HUB_GA;

const localItemRoyal = window.__.localItemRoyal;

const isRu = process.env.REACT_APP_COUNTRY === 'RU';

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

//species属性
const getSpecies = (cateId) => {
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
    }[cateId] || 'Cat'
  );
};

//SpeciesId属性
const getSpeciesId = (cateId) => {
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
    }[cateId] || ''
  );
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
  dataLayer.push({
    event: 'myAccountScreen',
    myAccountScreenName //Values : 'Overview', 'Personal information', 'Pets', 'Orders & Subscriptions', 'Payment & Addresses', 'Security', 'Data & Settings'
  });
  // console.log(myAccountScreenName)
  // debugger
};

//myAccountAction
export const myAccountActionPushEvent = (myAccountActionName) => {
  if (!isHubGA) return;
  dataLayer.push({
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
  dataLayer.push({
    event: 'faqClick',
    faqClick: {
      item, //Generic name in English for each item
      clickType //'Expand' or 'Collapse'
    }
  });
};

//cartScreenLoad
export const GACartScreenLoad = () => {
  if (!isHubGA) return;
  dataLayer.push({
    event: 'cartScreenLoad'
  });
};

//init 游客(cart+checkout都使用)
export const GAInitUnLogin = ({ productList, frequencyList, props }) => {
  let promotionInfo = getPromotionInfo();
  if (!isHubGA) return;
  let breed = [];
  productList?.[0]?.goodsAttributesValueRelList
    ?.filter((item) => item.goodsAttributeName == 'breeds')
    .forEach((item2) => {
      breed.push(item2.goodsAttributeValue);
    });
  const calculatedWeeks = getComputedWeeks(frequencyList);
  let arr = [];
  const mapProductList = new Map(productList.map((item, i) => [i, item])); //换成map格式的目的 就是为了for of循环获取index
  for (let [index, item] of mapProductList) {
    let cur_selected_size = item.sizeList.filter((item2) => {
      return item2.selected == true;
    });
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

    let obj = deleteObjEmptyAttr({
      price: price, //Product Price, including discount if promo code activated for this product
      specie: getSpecies(item.cateId), //'Cat' or 'Dog',
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

    arr.push(obj);
  }
  dataLayer.push({
    products: arr
  });
  props.checkoutStore.saveGAProduct({ products: arr });
};

//init 会员(cart+checkout都使用)
export const GAInitLogin = ({ productList, frequencyList, props }) => {
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
    let technology = item.goods.goodsCateName?.split('/')[2] || '';
    let breed = [];
    item?.goodsAttributesValueRelVOList
      ?.filter((item) => item.goodsAttributeName == 'breeds')
      .forEach((item2) => {
        breed.push(item2.goodsAttributeValue);
      });

    let obj = deleteObjEmptyAttr({
      price: item.goodsInfoFlag > 0 ? item.subscriptionPrice : item.salePrice, //Product Price, including discount if promo code activated for this product
      specie: getSpecies(item.cateId), //'Cat' or 'Dog',
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

    arr.push(obj);
  }
  dataLayer.push({
    products: arr
  });
  props.checkoutStore.saveGAProduct({ products: arr });
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
  dataLayer.push({
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
  const calculatedWeeks = getComputedWeeks(frequencyList);
  const products = productList.map((item) => {
    const { goods, goodsInfos, goodsAttributesValueRelVOAllList } = item;
    const { minMarketPrice, goodsNo, goodsName, goodsCateName } = goods;
    const SKU = goodsInfos?.[0]?.goodsInfoNo || '';
    const cateName = goodsCateName?.split('/');
    const breed = (goodsAttributesValueRelVOAllList || [])
      .filter(
        (attr) =>
          attr.goodsAttributeName &&
          attr.goodsAttributeName.toLowerCase() == 'breeds'
      )
      .map((item) => item.goodsAttributeValue);
    const specie = breed.toString().indexOf('Cat') > -1 ? 'Cat' : 'Dog';
    let subscriptionFrequency = item.periodTypeId
      ? calculatedWeeks[item.periodTypeId]
      : '';
    let productItem = {
      price: minMarketPrice,
      specie,
      range: cateName?.[1] || '',
      name: goodsName,
      mainItemCode: goodsNo,
      SKU,
      subscription: getSubscriptionAttr(item.goodsInfoFlag),
      subscriptionFrequency:
        item.goodsInfoFlag > 0 ? subscriptionFrequency : '',
      technology: cateName?.[2] || '',
      brand: 'Royal Canin',
      size: item.specText,
      breed,
      quantity: item.buyCount,
      sizeCategory: '',
      promoCodeName: promotionCode || '',
      promoCodeAmount: ''
    };
    let res = deleteObjEmptyAttr(productItem);
    return res;
  });
  type === 1 &&
    dataLayer.unshift({
      products
    });
  type === 2 &&
    dataLayer.push({
      event: 'breederRecoTabClick',
      breederRecoTabClickProduct: products
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
        ?.filter((item) => item.goodsAttributeName == 'breeds')
        .forEach((item2) => {
          breed.push(item2.goodsAttributeValue);
        });
      id.push(getSpeciesId(item.cateId));
    }
  } else {
    cartData.forEach((item) => {
      id.push(getSpeciesId(item.cateId));
    });

    let arr = (cartData[0] && cartData[0].goodsAttributesValueRelList) || [];

    arr
      .filter((item) => item.goodsAttributeName == 'breeds')
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
  dataLayer.push({
    event: 'checkoutStep',
    checkoutStep: {
      name, //Following values possible : 'Email', 'Delivery', 'Payment', 'Confirmation'
      options //'Guest checkout', 'New account', 'Existing account'
    }
  });
};

//Order confirmation
export const orderConfirmationPushEvent = (details) => {
  const clinic = details.tradeItems.some((item) => item.recommendationId);
  if (!isHubGA) return;
  let obj = {
    event: 'orderConfirmation',
    orderConfirmation: deleteObjEmptyAttr({
      id: details.totalTid || '', //Transaction ID, same as backend system
      currency: process.env.REACT_APP_GA_CURRENCY_CODE, //cf. https://support.google.com/analytics/answer/6205902?hl=en for complete list
      amount: details.tradePrice.totalPrice, //Transaction amount without taxes and shipping, US number format, for local currency
      taxes: details.tradePrice.taxFeePrice, //Taxes amount, US number format, local currency
      shipping: details.tradePrice.deliveryPrice, //Shipping amount, US number format, local currency
      paymentMethod: 'Credit Card',
      shippingMode: details.clinicsId || clinic ? 'Clinic' : 'Standard Delivery'
    })
  };
  dataLayer.push(obj);
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
  dataLayer.push({
    event: 'productFinderScreen',
    productFinderScreen: {
      name: getStepCurrentName({ type, stepName }), //Pattern : productfinder/pet/step, see full list below
      number: stepOrder, //Step number
      previousAnswer: getStepCurrentPreviousAnswer(answerdQuestionList) //Answer to previous question, generic name, in English
    }
  });
};

export const GABuyNow = () => {
  dataLayer.push({
    'event ': 'breederRecoBuyNow'
  });
  debugger;
};

export const GABreederRecoPromoCodeCTA = () => {
  dataLayer.push({
    'event ': 'breederRecoPromoCodeCTA'
  });
};
