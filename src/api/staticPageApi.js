import axios from '@/utils/request';

const api = {
  customerInfoSave: '/customer-info/save',
  linkTransform: '/coupon-code/link/transform',
  submitContactUsInfo: '/help/contact', //提交联系我们的用户的联系信息
  getFaq: `/faqs/${window.__.env.REACT_APP_STOREID}`
};

export function customerInfoSave(parameter) {
  return axios({
    url: api.customerInfoSave,
    method: 'post',
    data: parameter
  });
}

export function linkTransform(parameter) {
  return axios({
    url: api.linkTransform,
    method: 'post',
    data: parameter
  });
}

export function submitContactUsInfo(parameter) {
  return axios({
    url: `${api.submitContactUsInfo}`,
    method: 'post',
    data: parameter
  });
}

export function getFaq() {
  return axios({
    url: `${api.getFaq}`,
    method: 'get',
    params: { storeId: window.__.env.REACT_APP_STOREID }
  });
}
