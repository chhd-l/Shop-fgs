import moment from 'moment';
import momentTz from 'moment-timezone';

//当前国家要显示的时间格式
export function getCurCountryDateFormat() {
  //todo 从配置接口获取当前国家要显示的时间格式
  const datePickerCfg = {
    mx: { format: 'YYYY-MM-DD' },
    de: { format: 'DD.MM.YYYY' },
    fr: { format: 'DD/MM/YYYY' },
    us: { format: 'MM/DD/YYYY', timezone: 'America/Chicago' },
    ru: { format: 'DD/MM/YYYY' },
    tr: { format: 'DD-MM-YYYY', timezone: 'Europe/Istanbul' },
    default: { format: 'YYYY-MM-DD' }
  };
  return datePickerCfg[window.__.env.REACT_APP_COUNTRY || 'default'];
}

/**
 * 格式化日期时间
 * @param date 需要格式化的日期时间（必须参数）
 * @param format 需要格式化成什么格式，默认取当前国家统一显示的格式，若需特殊处理可传参
 * @param needTz 是否需要格式化成特定的时区，默认不需要，需要的化会取当前国家是显示哪一个时区
 * @returns {string}
 */
export function momentNormalizeDate(date, format = '', needTz = false) {
  console.log(date);
  let normalizeDate = '';
  const isValidDate = moment(date).isValid();
  if (date && isValidDate) {
    if (needTz) {
      //需要转换时区先转换时区再格式化
      date = momentTz(date).tz(getCurCountryDateFormat().timezone);
    }
    if (format !== '') {
      normalizeDate = moment(date).format(format);
    } else {
      normalizeDate = moment(date).format(getCurCountryDateFormat().format);
    }
  }
  console.log(normalizeDate);
  return normalizeDate;
}

window.momentNormalizeDate = momentNormalizeDate;
