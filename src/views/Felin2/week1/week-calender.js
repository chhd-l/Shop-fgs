import React, { Component } from 'react';
import moment from 'moment';
import './index.less';
import 'moment/locale/fr';
moment.locale('fr');

let index = -1;

class WeekCalender extends Component {
  state = {
    weekDate: [],
    selectedIndex: ''
  };

  componentDidMount() {
    this.getCurrentWeek();
  }

  getCurrentWeek = async (date = undefined) => {
    let weekOfDay = moment(date).format('E'); // 指定日期的周的第几天
    console.log(weekOfDay);
    let weekDate = [];
    let dateList = await this.getEnmbeData();
    for (let i = 0; i < 3; i++) {
      let _date = moment(date).add(i, 'days');
      let nowDate = moment(_date).format('YYYYMMDD');
      let currentDate = dateList[nowDate] || {};
      let list = await this.intervals(
        moment(_date).format('YYYYMMDD 09:00'),
        moment(_date).format('YYYYMMDD 17:00'),
        currentDate
      );
      weekDate.push({
        weekDay: _date.format('dddd'),
        date: _date.format('YYYY-MM-DD'),
        times: list
      });
    }
    console.log(weekDate);

    this.setState({ weekDate });
  };
  getCurrentWeek1 = async (date = undefined) => {
    console.log(date);
    let weekDate = [];
    let dateList = await this.getEnmbeData();
    for (let i = 0; i < 3; i++) {
      let _date = moment(date).subtract(i + 1, 'days');
      let nowDate = moment(_date).format('YYYYMMDD');
      let currentDate = dateList[nowDate] || {};
      let list = await this.intervals(
        moment(_date).format('YYYYMMDD 09:00'),
        moment(_date).format('YYYYMMDD 17:00'),
        currentDate
      );
      weekDate.unshift({
        weekDay: _date.format('dddd'),
        date: _date.format('YYYY-MM-DD'),
        times: list
      });
    }
    this.setState({ weekDate });
  };
  getCurrentWeek2 = async (date = undefined) => {
    console.log(date);
    let weekDate = [];
    let dateList = await this.getEnmbeData();
    for (let i = 0; i < 3; i++) {
      let _date = moment(date).add(i + 1, 'days');
      let nowDate = moment(_date).format('YYYYMMDD');
      let currentDate = dateList[nowDate] || {};
      let list = await this.intervals(
        moment(_date).format('YYYYMMDD 09:00'),
        moment(_date).format('YYYYMMDD 17:00'),
        currentDate
      );
      weekDate.push({
        weekDay: _date.format('dddd'),
        date: _date.format('YYYY-MM-DD'),
        times: list
      });
    }
    console.log(weekDate);

    this.setState({ weekDate });
  };
  getEnmbeData = () => {
    return new Promise((reslove) => {
      let _data = [...this.props.data];
      let _dataObj = {};
      _data.forEach((item) => {
        _dataObj[item.date] = item;
        _dataObj[item.date]['minuteList'] = {};
        item.minuteSlotVOList.forEach((list) => {
          _dataObj[item.date]['minuteList'][list.startTime] = list;
        });
      });
      console.log(_dataObj, '_dataObj');
      reslove(_dataObj);
    });
  };

  lastWeek = () => {
    index++;
    const arr = this.state.weekDate;
    let dd = moment(arr[0].date);
    this.getCurrentWeek1(dd);
  };

  nextWeek = () => {
    index--;
    const arr = this.state.weekDate;
    let dd = moment(arr[arr.length - 1].date);
    this.getCurrentWeek2(dd);
  };
  getWeek = () => {
    let i = index;
    let begin = moment()
      .week(moment().week() - i)
      .startOf('week')
      .format('YYYY-MM-DD');
    let end = moment()
      .week(moment().week() - i)
      .endOf('week')
      .format('YYYY-MM-DD');
    return [begin, end];
  };
  intervals = async (startString, endString, currentDate) => {
    return new Promise((reslove) => {
      let start = moment(startString, 'YYYYMMDD HH:mm');
      let end = moment(endString, 'YYYYMMDD HH:mm');
      start.minutes(Math.ceil(start.minutes() / 15) * 15);
      let result = [];
      let current = moment(start);
      while (current <= end) {
        let dateNo = current.format('YYYYMMDD');
        let cc = {
          disabled: true,
          type: 'default',
          dateNo,
          time: current.format('HH:mm')
        };
        if (currentDate.minuteList) {
          let curr = currentDate.minuteList[current.format('YYYYMMDD HH:mm')];
          if (curr) {
            cc = {
              ...curr,
              disabled: false,
              time: current.format('HH:mm'),
              dateNo
            };
          }
        }
        result.push(cc);
        current.add(15, 'minutes');
      }
      reslove(result);
    });
  };
  clickAppointItem = (item, index) => {
    this.setState({ selectedIndex: item.dateNo + '_' + index });
    this.props.onChange(item);
  };

  render() {
    const { weekDate, selectedIndex } = this.state;
    return (
      <div className="week-calender">
        <div className="week-head">
          <div className="week-head-left" onClick={this.lastWeek}>
            <div className="rc-icon rc-left rc-iconography"></div>
          </div>
          <div className="week-head-content" style={{ flex: 1 }}>
            <ul style={{ padding: 0 }}>
              {weekDate.map((item, index) => {
                return (
                  <li key={index}>
                    <span>{item.weekDay}</span>
                    <span>{item.date}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="week-head-right" onClick={this.nextWeek}>
            <div className="rc-icon rc-right rc-iconography"></div>
          </div>
        </div>
        <div className="week-content">
          <ul>
            {weekDate.map((item, index) => (
              <li key={index + 1}>
                {item.times.map((it, idx) => (
                  <button
                    onClick={() => this.clickAppointItem(it, idx)}
                    key={it.time + 1}
                    className={`time-but border-2 border-black p-px ${
                      selectedIndex === it.dateNo + '_' + idx
                        ? 'bg-red-600 text-white p-px border-2 border-red-600'
                        : ''
                    }
                     ${
                       it.type === 'primary'
                         ? 'bg-red-400 text-white p-px border-2 border-red-400'
                         : ''
                     }
                      `}
                    disabled={it.disabled}
                    style={{ marginTop: 5 }}
                  >
                    {it.time}
                  </button>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default WeekCalender;
