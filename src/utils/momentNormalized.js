import moment from 'moment';

//当前国家要显示的时间格式
export function getCurCountryDateFormat() {
  //todo 从配置接口获取当前国家要显示的时间格式
  const datePickerCfg = {
    mx: { format: 'yyyy-MM-dd' },
    de: { format: 'dd.MM.yyyy' },
    fr: { format: 'DD/MM/YYYY' },
    us: { format: 'MM/dd/yyyy' },
    ru: { format: 'dd/MM/yyyy' },
    tr: { format: 'DD-MM-YYYY' },
    default: { format: 'yyyy-MM-dd' }
  };
  return datePickerCfg[window.__.env.REACT_APP_COUNTRY || 'default'].format;
}

//格式化日期时间格式
export function momentNormalizeDate(date, format = '') {
  console.log(date);
  const isValidDate = moment(date).isValid();
  let normalizeDate = '';
  if (date && isValidDate) {
    if (format !== '') {
      normalizeDate = moment(date).format(format);
    } else {
      normalizeDate = moment(date).format(getCurCountryDateFormat());
    }
  }
  console.log(normalizeDate);
  return normalizeDate;
}

window.momentNormalizeDate = momentNormalizeDate;
