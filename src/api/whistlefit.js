import axios from '@/utils/request';

const api = {
  getLandingPage: '/landingPage/getLandingPage',
  landingPageViews: '/landingPage/views',
  registerLandingPage: '/landingPage/registerLandingPage',
  getOpenConsentByCategory: '/consent/getOpenConsentByCategory'
};

export default api;

export function getLandingPage(number) {
  return axios({
    url: `${api.getLandingPage}/${window.__.env.REACT_APP_STOREID}/${number}`,
    method: 'get'
  });
}

export function landingPageViews(parameter) {
  return axios({
    url: `${api.landingPageViews}`,
    method: 'POST',
    data: parameter
  });
}

export function registerLandingPage(parameter) {
  return axios({
    url: `${api.registerLandingPage}`,
    method: 'POST',
    data: parameter
  });
}

export function getOpenConsentByCategory(parameter) {
  return axios({
    url: `${api.getOpenConsentByCategory}`,
    method: 'POST',
    data: parameter
  });
}
