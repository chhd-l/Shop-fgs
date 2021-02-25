const isHubGA = process.env.REACT_APP_HUB_GA

export const myAccountPushEvent = (myAccountScreenName) => {
    if (!isHubGA) return
    dataLayer.push({
      'event' : 'myAccountScreen',
      myAccountScreenName, //Values : 'Overview', 'Personal information', 'Pets', 'Orders & Subscriptions', 'Payment & Addresses', 'Security', 'Data & Settings'
    })
  }