/*
 * Created By ZuoQin On 2021/03/12
 * Contact Us Request api and method
 */
import axios from '@/utils/request';

const api = {
  submitContactUsInfo: '/help/contact' //提交联系我们的用户的联系信息
};

export default api;

export function submitContactUsInfo(parameter) {
  return axios({
    url: `${api.submitContactUsInfo}`,
    method: 'post',
    data: parameter
  });
}
