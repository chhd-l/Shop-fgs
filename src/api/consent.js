import axios from '@/utils/request';

const api = {
  findUserConsentList: `/${window.__.env.REACT_APP_STOREID}/consents`,
  consentListDetail: '/consent/detail/list',
  userBindConsent: '/consent/binds/customer-id=',
  getStoreOpenConsentList: `/consents/enable/store-id=${window.__.env.REACT_APP_STOREID}`,
  findUserSelectedList: '/consents/selected'
};

export default api;

export function findUserConsentList(parameter) {
  return axios({
    url: `${api.findUserConsentList}`,
    method: 'POST',
    data: parameter
  });
}

export function consentListDetail(parameter) {
  return axios({
    url: `${api.consentListDetail}`,
    method: 'post',
    data: parameter
  });
}

export function userBindConsent(parameter) {
  return axios({
    url: `${api.userBindConsent}${parameter.customerId}`,
    method: 'post',
    data: parameter
  });
}

export function getStoreOpenConsentList(parameter) {
  return axios({
    url: `${api.getStoreOpenConsentList}`,
    method: 'get',
    params: parameter
  });
}

export function findUserSelectedList(parameter) {
  return axios({
    url: `${api.findUserSelectedList}`,
    method: 'post',
    data: parameter
  });
}
