const isHubGA = process.env.REACT_APP_HUB_GA

export const myAccountPushEvent = (myAccountScreenName) => {
  if (!isHubGA) return
  dataLayer.push({
    'event': 'myAccountScreen',
    myAccountScreenName, //Values : 'Overview', 'Personal information', 'Pets', 'Orders & Subscriptions', 'Payment & Addresses', 'Security', 'Data & Settings'
  })
  console.log(myAccountScreenName)
  console.log({ dataLayer })
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
