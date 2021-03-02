import { toJS } from 'mobx';

const isHubGA = process.env.REACT_APP_HUB_GA

//天-0周  周-value*1 月-value*4
const getComputedWeeks = (frequencyList) => {
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

  return calculatedWeeks
}


//myAccountScreen
export const myAccountPushEvent = (myAccountScreenName) => {
  if (!isHubGA) return
  dataLayer.push({
    'event': 'myAccountScreen',
    myAccountScreenName, //Values : 'Overview', 'Personal information', 'Pets', 'Orders & Subscriptions', 'Payment & Addresses', 'Security', 'Data & Settings'
  })
  console.log(myAccountScreenName)
}

//myAccountAction
export const myAccountActionPushEvent = (myAccountActionName) => {
  if (!isHubGA) return
  dataLayer.push({
    'event': 'myAccountAction',
    myAccountActionName,
    //Values : 'Add picture', 'Edit profile info', 'Edit contact info', 'Add pet', 'Remove pet', 'Download Invoice', 'Cancel Subscription','Pause Subscription', 'Restart Subscription', 'Add payment Method', 'Delete payment method', 'Add Address', 'Delete Address', 'Change email', 'Change password', 'Delete Account'
  })
  console.log(myAccountActionName)
}

//faqClick
export const faqClickDataLayerPushEvent = ({ item, clickType }) => {
  dataLayer.push({
    'event': 'faqClick',
    'faqClick': {
      item, //Generic name in English for each item
      clickType //'Expand' or 'Collapse'
    }
  });
  // console.log({dataLayer})
  // debugger
}

//cartScreenLoad
export const GACartScreenLoad = () => {
  dataLayer.push({
    event: 'cartScreenLoad'
  });
}


//cart init 游客
export const GAInitUnLoginCart = ({ productList, frequencyList, props }) => {
  let breed = []
  productList?.[0]?.goodsAttributesValueRelList?.toJS().filter(item=>item.goodsAttributeName == 'breeds').forEach(item2=>{
      breed.push(item2.goodsAttributeValue)
  })
  const calculatedWeeks = getComputedWeeks(frequencyList)
  let arr = [];
  for (let item of productList) {
    let cur_selected_size = item.sizeList.filter((item2) => {
      return item2.selected == true;
    });
    let variant = cur_selected_size[0].specText;
    let goodsInfoNo = cur_selected_size[0].goodsInfoNo;
    let price = item.goodsInfoFlag ? cur_selected_size[0].subscriptionPrice : cur_selected_size[0].marketPrice
    let subscriptionFrequency = item.form ? calculatedWeeks[item.form.frequencyId] : ''
    let range = item.goodsCateName?.split("/")[1] || ""
    let technology = item.goodsCateName?.split("/")[2] || ""
    
    

    arr.push({
      'price': price, //Product Price, including discount if promo code activated for this product
      'specie': item.cateId == '1134' ? 'Cat' : 'Dog', //'Cat' or 'Dog',
      'range': range, //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
      'name': item.goodsName, //WeShare product name, always in English
      'mainItemCode': item.goodsNo, //Main item code
      'SKU': goodsInfoNo, //product SKU
      'subscription': item.goodsInfoFlag == 1 ? 'Subscription' : 'One Shot', //'One Shot', 'Subscription', 'Club'
      'technology': technology, //'Dry', 'Wet', 'Pack'
      'brand': 'Royal Canin', //'Royal Canin' or 'Eukanuba'
      'size': variant || "", //Same wording as displayed on the site, with units depending on the country (oz, grams…)
      'quantity': item.quantity, //Number of products, only if already added to cartequals 'Subscription or Club'
      'subscriptionFrequency': item.goodsInfoFlag == 1 ? subscriptionFrequency : '', //Frequency in weeks, to populate only if 'subscription' 
      recommendationID: props.clinicStore.linkClinicId || '', //recommendation ID
      //'sizeCategory': 'Small', //'Small', 'Medium', 'Large', 'Very Large', reflecting the filter present in the PLP
      breed, //All animal breeds associated with the product in an array

      promoCodeName: '', //Promo code name, only if promo activated
      promoCodeAmount: '' //Promo code amount, only if promo activated
    });
  }
  dataLayer.push({
    products: arr
  });
}

//cart init 会员
export const GAInitLoginCart = ({productList,frequencyList,props}) => {

  const calculatedWeeks = getComputedWeeks(frequencyList)
  let arr = [];
  for (let item of productList) {
    let subscriptionFrequency = item.periodTypeId ? calculatedWeeks[item.periodTypeId] : ''
    let range = item.goods.goodsCateName?.split("/")[1] || "";
    let technology = item.goods.goodsCateName?.split("/")[2] || ""
    let breed = []
    item.goodsAttributesValueRelVOList.filter(item=>item.goodsAttributeName == 'breeds').forEach(item2=>{
      breed.push(item2.goodsAttributeValue)
    })


    arr.push({
      price:
        item.goodsInfoFlag == 1 ? item.subscriptionPrice : item.salePrice, //Product Price, including discount if promo code activated for this product
      specie: item.cateId == '1134' ? 'Cat' : 'Dog', //'Cat' or 'Dog',
      range: range, //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
      name: item.goodsName, //WeShare product name, always in English
      mainItemCode: item.goods.goodsNo, //Main item code
      SKU: item.goodsInfoNo, //product SKU
      subscription: item.goodsInfoFlag == 1 ? 'Subscription' : 'One Shot', //'One Shot', 'Subscription', 'Club'
      technology: technology, //'Dry', 'Wet', 'Pack'
      brand: 'Royal Canin', //'Royal Canin' or 'Eukanuba'
      size: item.specText, //Same wording as displayed on the site, with units depending on the country (oz, grams…)
      quantity: item.buyCount, //Number of products, only if already added to cartequals 'Subscription or Club'
      subscriptionFrequency:
        item.goodsInfoFlag == 1 ? subscriptionFrequency : '', //Frequency in weeks, to populate only if 'subscription'
      recommendationID: props.clinicStore.linkClinicId || '', //recommendation ID
      //'sizeCategory': 'Small', //'Small', 'Medium', 'Large', 'Very Large', reflecting the filter present in the PLP
      breed, //All animal breeds associated with the product in an array


      promoCodeName: '', //Promo code name, only if promo activated
      promoCodeAmount: '' //Promo code amount, only if promo activated
    });
  }
  dataLayer.push({
    products: arr
  });
}

//cart cartChangeSubscription
export const GACartChangeSubscription = (btnContent) => {
  dataLayer.push({
    event: 'cartChangeSubscription',
    cartChangeSubscription: {
      button: btnContent //Values : 'Single purchase', 'Autoship'
    }
  });
}


//checkout init 游客
export const GAInitUnLoginCheckout = ({productList,frequencyList,props}) => {
  let breed = []
  productList?.[0]?.goodsAttributesValueRelList?.toJS().filter(item=>item.goodsAttributeName == 'breeds').forEach(item2=>{
      breed.push(item2.goodsAttributeValue)
  })
  const calculatedWeeks = getComputedWeeks(frequencyList)
  let arr = []
    for (let item of productList) {
      let cur_selected_size = item.sizeList.filter((item2) => {
        return item2.selected == true;
      });
      let variant = cur_selected_size[0].specText;
      let goodsInfoNo = cur_selected_size[0].goodsInfoNo;
      let price = item.goodsInfoFlag ? cur_selected_size[0].subscriptionPrice : cur_selected_size[0].marketPrice
      let subscriptionFrequency = item.form ? calculatedWeeks[item.form.frequencyId] : ''
      let range = item.goodsCateName?.split("/")[1] || ""
      let technology = item.goodsCateName?.split("/")[2] || ""

      arr.push({
        'price': price, //Product Price, including discount if promo code activated for this product
        'specie': item.cateId == '1134' ? 'Cat' : 'Dog', //'Cat' or 'Dog',
        'range': range, //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
        'name': item.goodsName, //WeShare product name, always in English
        'mainItemCode': item.goodsNo, //Main item code
        'SKU': goodsInfoNo, //product SKU
        'subscription': item.goodsInfoFlag == 1 ? 'Subscription' : 'One Shot', //'One Shot', 'Subscription', 'Club'
        'technology': technology, //'Dry', 'Wet', 'Pack'
        'brand': 'Royal Canin', //'Royal Canin' or 'Eukanuba'
        'size': variant, //Same wording as displayed on the site, with units depending on the country (oz, grams…)
        'quantity': item.quantity, //Number of products, only if already added to cartequals 'Subscription or Club'
        'subscriptionFrequency': item.goodsInfoFlag == 1 ? subscriptionFrequency : '', //Frequency in weeks, to populate only if 'subscription' 

        'recommendationID': props.clinicStore.linkClinicId || '', //recommendation ID
        //'sizeCategory': 'Small', //'Small', 'Medium', 'Large', 'Very Large', reflecting the filter present in the PLP
        breed, //All animal breeds associated with the product in an array

        'promoCodeName': '', //Promo code name, only if promo activated     
        'promoCodeAmount': '' //Promo code amount, only if promo activated
      })
    }
    dataLayer.push({
      'products': arr
    })
}

//checkout init 会员
export const GAInitLoginCheckout = ({productList,frequencyList,props}) => {
  const calculatedWeeks = getComputedWeeks(frequencyList)

  let arr = []
    for (let item of productList) {
      let subscriptionFrequency = item.periodTypeId ? calculatedWeeks[item.periodTypeId] : ''
      let range = item.goods.goodsCateName?.split("/")[1] || "";
      let technology = item.goods.goodsCateName?.split("/")[2] || ""
      let breed = []
      item.goodsAttributesValueRelVOList.filter(item=>item.goodsAttributeName == 'breeds').forEach(item2=>{
        breed.push(item2.goodsAttributeValue)
      })

      arr.push({
        'price': item.goodsInfoFlag == 1 ? item.subscriptionPrice : item.salePrice, //Product Price, including discount if promo code activated for this product
        'specie': item.cateId == '1134' ? 'Cat' : 'Dog', //'Cat' or 'Dog',
        'range': range, //Possible values : 'Size Health Nutrition', 'Breed Health Nutrition', 'Feline Care Nutrition', 'Feline Health Nutrition', 'Feline Breed Nutrition'
        'name': item.goodsName, //WeShare product name, always in English
        'mainItemCode': item.goods.goodsNo, //Main item code
        'SKU': item.goodsInfoNo, //product SKU
        'subscription': item.goodsInfoFlag == 1 ? 'Subscription' : 'One Shot', //'One Shot', 'Subscription', 'Club'
        'technology': technology, //'Dry', 'Wet', 'Pack'
        'brand': 'Royal Canin', //'Royal Canin' or 'Eukanuba'
        'size': item.specText, //Same wording as displayed on the site, with units depending on the country (oz, grams…)
        'quantity': item.buyCount, //Number of products, only if already added to cartequals 'Subscription or Club'
        'subscriptionFrequency': item.goodsInfoFlag == 1 ? subscriptionFrequency : '', //Frequency in weeks, to populate only if 'subscription' 
        'recommendationID': props.clinicStore.linkClinicId || '', //recommendation ID
         //'sizeCategory': 'Small', //'Small', 'Medium', 'Large', 'Very Large', reflecting the filter present in the PLP
         breed, //All animal breeds associated with the product in an array

        'promoCodeName': '', //Promo code name, only if promo activated     
        'promoCodeAmount': '' //Promo code amount, only if promo activated
      })
    }
    dataLayer.push({
      'products': arr
    })
}


//GA pet 全局获取
export const doGetGAVal = (props) => {
  let breed = [],
           id = [],
          obj = {
      specieId: [],
      breedName: []
    }
    const { loginStore:{isLogin},checkoutStore: { cartData, loginCartData } } = props
    if (isLogin) {
      for (let item of loginCartData) {
        item.goodsAttributesValueRelVOList.filter(item => item.goodsAttributeName == 'breeds').forEach(item2 => {
          breed.push(item2.goodsAttributeValue)
        })
        if (item.cateId == '1134') {
          id.push(1)
        } else {
          id.push(2)
        }
      }
    } else {
        cartData.forEach(item=>{
          if (item.cateId == '1134') {
            id.push(1)
          } else {
            id.push(2)
          }
        })
        let arr =  cartData?.[0]?.goodsAttributesValueRelList?.toJS()
        arr.filter(item => item.goodsAttributeName == 'breeds').forEach(item2 => {
          breed.push(item2.goodsAttributeValue)
        })
    }
    obj.specieId = id
    obj.breedName = breed
    return obj
}

//checkout step
export const checkoutDataLayerPushEvent = ({ name, options }) => {
  dataLayer.push({
    event: 'checkoutStep',
    checkoutStep: {
      name, //Following values possible : 'Email', 'Delivery', 'Payment', 'Confirmation'
      options //'Guest checkout', 'New account', 'Existing account'
    }
  });
};

//Order confirmation
export const orderConfirmationPushEvent = (details)=>{
  dataLayer.push({
    'event': 'orderConfirmation',
    'orderConfirmation': {
      'id': details.transactionId || "", //Transaction ID, same as backend system
      'currency': process.env.REACT_APP_GA_CURRENCY_CODE, //cf. https://support.google.com/analytics/answer/6205902?hl=en for complete list
      'amount': details.tradePrice.totalPrice, //Transaction amount without taxes and shipping, US number format, for local currency
      'taxes': details.tradePrice.taxFreePrice || '', //Taxes amount, US number format, local currency
      'shipping': details.tradePrice.deliveryPrice, //Shipping amount, US number format, local currency
      'paymentMethod': 'Credit Card' //'Credit Card' currently only payment method in use
    }
  });
}