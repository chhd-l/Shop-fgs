import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from '@/utils/utils';

function getDatePickerConfig() {
  // dateFnslocaleModuleLang: date-fns插件对应的多语言文件后缀名
  // datePickerLocale: react-datepicker所需locale参数
  const curDatePickerCfg = window.__.env.REACT_APP_DATEPICKER_LOCALE
    ? JSON.parse(window.__.env.REACT_APP_DATEPICKER_LOCALE)
    : { datePickerLocale: 'en', dateFnslocaleModuleLang: 'en-US' };
  const curLocaleModule =
    require(`date-fns/locale/${curDatePickerCfg.dateFnslocaleModuleLang}`).default;
  registerLocale(window.__.env.REACT_APP_COUNTRY, curLocaleModule);
  // 根据Intl.DateTimeFormat生成当前国家的日期格式
  const specificDate = formatDate({ date: '2021-12-30' });
  const datePickerConfig = Object.assign(
    {},
    curDatePickerCfg,
    {
      format: specificDate
        .replace(/2021/gi, 'yyyy')
        .replace(/12/gi, 'MM')
        .replace(/30/gi, 'dd')
    },
    {
      locale_module: curLocaleModule
    }
  );
  return datePickerConfig;
}
const datePickerConfig = getDatePickerConfig();

const DatePickerComponent = ({ onChange, selected, placeholder, ...rest }) => {
  let props = {
    placeholderText: placeholder || datePickerConfig.format.toUpperCase(),
    dateFormat: datePickerConfig.format,
    locale: datePickerConfig.datePickerLocale,
    selected: selected,
    onChange: onChange
  };

  if (window.__.env.REACT_APP_COUNTRY === 'jp') {
    props.renderCustomHeader = renderCustomHeader;
  }

  return <DatePicker {...props} {...rest} />;
};

export default DatePickerComponent;

// jp customize: change the order of year and month at header
const renderCustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}) => (
  <div className="react-datepicker__current-month">
    {prevMonthButtonDisabled ? null : (
      <button
        type="button"
        className="react-datepicker__navigation react-datepicker__navigation--previous"
        aria-label="Previous Month"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        Previous Month
      </button>
    )}
    <span>
      {date.getFullYear()} {date.getMonth() + 1}月
    </span>
    {nextMonthButtonDisabled ? null : (
      <button
        type="button"
        className="react-datepicker__navigation react-datepicker__navigation--next"
        aria-label="Next Month"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        Next Month
      </button>
    )}
  </div>
);
