import axios from '@/utils/request';

const api = {
  getTimeOptions: '/appt/findByStoreAndDate',
  apptSave: '/appt/save',
  consentList: '/appt/listApptPageConsent',
  getAppointList: '/appt/list',
  cancelAppoint: '/appt/cancelByNo', //根据appointNo cancel appointment
  getAppointDetail: '/appt/findByNo', //根据appointNo查询appoint信息
  getMemberAppointDetail: '/appt/findByNoForCust' //根据appointNo查询会员appoint信息
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

export function cancelAppointByNo(parameter) {
  return axios({
    url: api.cancelAppoint,
    method: 'post',
    data: parameter
  });
}

export function getAppointDetail(parameter) {
  return axios({
    url: api.getAppointDetail,
    method: 'post',
    data: parameter
  });
}

export function getMemberAppointDetail(parameter) {
  return axios({
    url: api.getMemberAppointDetail,
    method: 'post',
    data: parameter
  });
}
