import axios from '@/utils/request';

const api = {
  getTimeOptions: '/appt/findByStoreAndDate',
  apptSave: '/appt/save'
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
