/* eslint-disable no-unused-expressions */

export const GAForSeeRecommendationBtn = () => {
  window.dataLayer?.push({
    event: 'myAccountAction',
    myAccountActionName: 'See recommendation'
  });
};

export const GAForChangePetinfoBtn = () => {
  window.dataLayer?.push({
    event: 'myAccountAction',
    myAccountActionName: 'Pet info change confirmation'
  });
};

export const GAForChangeProductBtn = (params) => {
  window.dataLayer?.push({
    event: 'myAccountAction',
    myAccountActionName: params
  });
};

export const GAForSeeMorePromotionBtn = () => {
  window.dataLayer?.push({
    event: 'myAccountAction', //String : constant
    myAccountActionName: 'See more promotions' //String : constant
  });
};
