export const GAForSeeRecommendationBtn = () => {
  window?.dataLayer?.push({
    event: 'myAccountAction',
    myAccountActionName: 'See recommendation'
  });
};

export const GAForChangePetinfoBtn = () => {
  window?.dataLayer?.push({
    event: 'myAccountAction',
    myAccountActionName: 'Pet info change confirmation'
  });
};

export const GAForChangeProductBtn = () => {
  window?.dataLayer?.push({
    event: 'myAccountAction',
    myAccountActionName: 'Change product'
  });
};
