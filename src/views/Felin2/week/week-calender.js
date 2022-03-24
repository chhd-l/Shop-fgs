import React, { Component } from 'react';
import moment from 'moment';
import { compareAsc, format, getISOWeek, subDays, getWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import './index.less';
import 'moment/locale/fr';

moment.locale('fr', {
  months:
    'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
      '_'
    ),
  monthsShort:
    'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact: true,
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  longDateFormat: {
    LL: 'D MMM'
  }
});

let index = 0;

class WeekCalender extends Component {
  state = {
    weekDate: [],
    selectedIndex: '',
    index: 0,
    show: false,
    timeWidth: 0
  };

  componentDidMount() {
    index = 0;
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
        moment(_date).format('YYYYMMDD 10:00'),
        moment(_date).format('YYYYMMDD 20:00'),
        currentDate
      );
      weekDate.push({
        weekDay: _date.format('ddd'),
        date: _date.format('LL'),
        times: list
      });
    }
    this.setState({ weekDate }, () => {
      this.goTotime(weekDate);
    });
  };
  goTotime = (weekDate) => {
    let flag = false;
    let weekContent = document.getElementById('week-content');
    weekContent.scrollTo(0, 0);
    for (var i in weekDate) {
      for (var j in weekDate[i].times) {
        if (!weekDate[i].times[j].disabled) {
          flag = true;
          weekContent.scrollTo(0, j * 35 + 1);
          break;
        }
      }
      if (flag) {
        if (i > 1) {
          let width = parseFloat(i) * 12.4 + '%';
          this.setState({
            show: true,
            timeWidth: width
          });
        } else {
          this.setState({
            show: false,
            timeWidth: 0
          });
        }
        break;
      } else {
        if (i === '6') {
          let width = (parseFloat(i) + 1) * 12.4 + '%';
          this.setState({
            show: true,
            timeWidth: width
          });
        }
      }
    }
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
      reslove(_dataObj);
    });
  };

  lastWeek = () => {
    if (index === 0) return;
    index++;
    this.setState(
      {
        index
      },
      () => {
        const cc = this.getWeek();
        this.getCurrentWeek(cc[0]);
      }
    );
  };

  nextWeek = () => {
    if (index === -3) return;
    index--;
    this.setState(
      {
        index
      },
      () => {
        const cc = this.getWeek();
        this.getCurrentWeek(cc[0]);
      }
    );
  };
  getWeek = () => {
    let i = this.state.index;
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
        {this.state.show ? (
          <div className="not-time" style={{ width: this.state.timeWidth }}>
            pas de disponibilité
          </div>
        ) : null}

        <div className="week-content" id="week-content">
          <ul>
            {weekDate.map((item, index) => (
              <li key={index + 1}>
                {item.times.map((it, idx) => (
                  <button
                    onClick={() => this.clickAppointItem(it, idx)}
                    key={it.time + 1}
                    className={`border-2 border-black p-px ${
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
