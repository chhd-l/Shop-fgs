import axios from '@/utils/request';

const api = {
  getTimeOptions: '/appt/findByStoreAndDate',
  apptSave: '/appt/save',
  consentList: '/appt/listApptPageConsent',
  getAppointList: '/appt/list'
};

export default api;

export function getTimeOptions(parameter) {
  return axios({
    url: `${api.getTimeOptions}`,
    method: 'post',
    data: parameter
  });
}

export function apptSave(parameter) {
  return axios({
    url: `${api.apptSave}`,
    method: 'post',
    data: parameter
  });
}

export function getConsentList(parameter) {
  return axios({
    url: `${api.consentList}`,
    method: 'post',
    data: parameter
  });
}

export function getAppointList(parameter) {
  return axios({
    url: `${api.getAppointList}`,
    method: 'post',
    data: parameter
  });
}
