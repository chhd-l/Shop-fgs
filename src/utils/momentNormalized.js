import moment from 'moment';

export function getCurCountryDateFormat() {
  //todo 从配置接口获取当前国家要显示的时间格式
}

export function normalizeDate(date, format = 'YYYY-MM-DD') {
  const isValidDate = moment(date).isValid();
  if (isValidDate) {
    if (format) {
      return moment(date).format(format);
    } else {
    }
  }
}
