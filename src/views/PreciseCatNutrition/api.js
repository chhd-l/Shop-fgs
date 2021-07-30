import axios from '@/utils/request';

const api = {
  getAllStep: '/individualization/allSteps',
  getNextStep: '/individualization/nextStep'
};

export default api;

export function getAllStep(parameter) {
  return axios({
    url: api.getAllStep,
    method: 'post',
    data: parameter
  });
}
export function getNextStep(parameter) {
  return axios({
    url: api.getNextStep,
    method: 'post',
    data: parameter
  });
}
