import axios from '@/utils/requestHub';

const api = {
  footer: '/footer/getmodel',
  navigation: '/navigation/getmodel',
  search: '/royalcanin/predictive',
  getCountries: '/languagepicker/getcountries'
};

export function getFooter(parameter) {
  return axios({
    url: api.footer,
    method: 'get',
    params: parameter
  });
}

export function getNavigation(parameter) {
  return axios({
    url: api.navigation,
    method: 'get',
    params: parameter
  });
}

export function getSearch(parameter) {
  return axios({
    url: `${api.search}?keyword=${parameter.keywords}`,
    method: 'get',
    params: parameter
  });
}

export function getCountries(parameter) {
  return axios({
    url: api.getCountries,
    method: 'get',
    params: parameter
  });
}
