import moment from 'moment';

//当前国家要显示的时间格式
export function getCurCountryDateFormat() {
  //todo 从配置接口获取当前国家要显示的时间格式
  const datePickerCfg = {
    mx: { format: 'yyyy-MM-dd' },
    de: { format: 'dd.MM.yyyy' },
    fr: { format: 'dd/MM/yyyy' },
    us: { format: 'MM/dd/yyyy' },
    ru: { format: 'dd/MM/yyyy' },
    tr: { format: 'dd-MM-yyyy' },
    default: { format: 'yyyy-MM-dd' }
  };
  return datePickerCfg[window.__.env.REACT_APP_COUNTRY || 'default'].format;
}

//格式化日期时间格式
export function normalizeDate(date, format = '') {
  const isValidDate = moment(date).isValid();
  if (isValidDate) {
    if (format) {
      return moment(date).format(format);
    } else {
      return moment(date).format(getCurCountryDateFormat());
    }
  } else {
    return '';
  }
}
