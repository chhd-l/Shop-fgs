import React, { Component } from 'react';
import moment from 'moment';
import './index.less';

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
    let weekDate = [];
    let dateList = await this.getEnmbeData();
    for (let i = 0; i < 7; i++) {
      let _date = moment(date).subtract(weekOfDay - i, 'days');
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
    this.setState({ weekDate });
  };
  getEnmbeData = () => {
    return new Promise((reslove) => {
      let _data = [...this.props.data];
      let _dataObj = {};
      _data.map((item) => {
        _dataObj[item.date] = item;
        _dataObj[item.date]['minuteList'] = {};
        item.minuteSlotVOList.map((list) => {
          _dataObj[item.date]['minuteList'][list.startTime] = list;
        });
      });
      console.log(_dataObj, '_dataObj');
      reslove(_dataObj);
    });
  };

  lastWeek = () => {
    if (index === -1) return;
    index++;
    const cc = this.getWeek();
    this.getCurrentWeek(cc[0]);
  };

  nextWeek = () => {
    if (index === -2) return;
    index--;
    const cc = this.getWeek();
    this.getCurrentWeek(cc[0]);
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
                    className={`${
                      selectedIndex === it.dateNo + '_' + idx
                        ? 'rc-btn-active'
                        : ''
                    }
                         bg-gray-300
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
