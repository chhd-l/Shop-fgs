import { isDuringDate, transTime } from '@/utils/utils';

const START_TIME = '2021/04/17 08:00'; //限制登录开始时间
const END_TIME = '2021/04/17 16:00'; //限制登录结束时间

const TimeZone = 'America/Chicago'; //需要重新转化的时区

// const START_TIME = "2021/04/14 01:00"
// const END_TIME = "2021/04/17 05:00"

//是否限制登录
export const isLimitLogin = () => {
  return isDuringDate(transTime({ timeZone: TimeZone }), START_TIME, END_TIME);
};
