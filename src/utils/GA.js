const isHubGA = process.env.REACT_APP_HUB_GA

export const myAccountPushEvent = (myAccountScreenName) => {
  if (!isHubGA) return
  dataLayer.push({
    'event': 'myAccountScreen',
    myAccountScreenName, //Values : 'Overview', 'Personal information', 'Pets', 'Orders & Subscriptions', 'Payment & Addresses', 'Security', 'Data & Settings'
  })
  console.log(myAccountScreenName)
  console.log({ dataLayer })
  debugger
}


export const myAccountActionPushEvent = (myAccountActionName) => {
  if (!isHubGA) return
  dataLayer.push({
    'event': 'myAccountAction',
    myAccountActionName,
    //Values : 'Add picture', 'Edit profile info', 'Edit contact info', 'Add pet', 'Remove pet', 'Download Invoice', 'Cancel Subscription','Pause Subscription', 'Restart Subscription', 'Add payment Method', 'Delete payment method', 'Add Address', 'Delete Address', 'Change email', 'Change password', 'Delete Account'
  })
  console.log(myAccountActionName)
  console.log({ dataLayer })
}


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

  return calculatedWeeks
}

export const GACartScreenLoad = ()=> {
  dataLayer.push({
    event: 'cartScreenLoad'
  });
}

export const GAInitUnLoginCart = ({productList,frequencyList,props}) => {
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
        breed: ['unLoginCart'], //All animal breeds associated with the product in an array
        promoCodeName: 'PROMO1234', //Promo code name, only if promo activated
        promoCodeAmount: 8 //Promo code amount, only if promo activated
      });
    }
    dataLayer.push({
      products: arr
    });
}
