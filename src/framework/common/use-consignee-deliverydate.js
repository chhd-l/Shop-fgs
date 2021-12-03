// 星期
const getWeekDay = (day, intl) => {
  let weekArr = [
    intl.messages['payment.Sunday'],
    intl.messages['payment.Monday'],
    intl.messages['payment.Tuesday'],
    intl.messages['payment.Wednesday'],
    intl.messages['payment.Thursday'],
    intl.messages['payment.Friday'],
    intl.messages['payment.Saturday']
  ];
  return weekArr[day];
};
// 月份
const getMonth = (num, intl) => {
  num = Number(num);
  let monthArr = [
    '0',
    intl.messages['payment.January'],
    intl.messages['payment.February'],
    intl.messages['payment.March'],
    intl.messages['payment.April'],
    intl.messages['payment.May'],
    intl.messages['payment.June'],
    intl.messages['payment.July'],
    intl.messages['payment.August'],
    intl.messages['payment.September'],
    intl.messages['payment.October'],
    intl.messages['payment.November'],
    intl.messages['payment.December']
  ];
  return monthArr[num];
};

// 原getFormatDeliveryDateStr方法 delivery date 格式转换: 星期, 15 月份
const useConsigneeDeliveryDate = (date, intl) => {
  // 获取明天几号
  let mdate = new Date();
  let tomorrow = mdate.getDate() + 1;
  // 获取星期
  var week = new Date(date).getDay();
  let weekday = getWeekDay(week, intl);
  // 获取月份
  let ymd = date.split('-');
  let month = getMonth(ymd[1], intl);

  // 判断是否有 ‘明天’ 的日期
  let thisday = Number(ymd[2]);
  let daystr = '';
  if (tomorrow === thisday) {
    daystr = intl.messages['payment.tomorrow'];
  } else {
    daystr = weekday;
  }
  return daystr + ', ' + ymd[2] + ' ' + month;
};

export default useConsigneeDeliveryDate;
