import React, { Component } from 'react';
import './index.less';
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day: ['一', '二', '三', '四', '五', '六', '日'],
      selectYear: new Date().getFullYear(),
      selectMonth: new Date().getMonth() + 1,
      arr: []
    };
  }

  change = (data, select) => {
    if (data == 'year') {
      this.setState({ selectYear: select, arr: [] });
    } else {
      this.setState({ selectMonth: select, arr: [] });
    }
  };

  chose(e) {
    console.log(e);
  }

  render() {
    var count = 1;
    var date1 = new Date(
      new Date(this.state.selectYear, this.state.selectMonth - 1).setDate(0)
    ).getDate();
    var date =
      new Date(this.state.selectYear, this.state.selectMonth - 1).getDay() == 0
        ? 6
        : new Date(this.state.selectYear, this.state.selectMonth - 1).getDay() -
          1;
    var today = new Date(
      new Date(this.state.selectYear, this.state.selectMonth).setDate(0)
    ).getDate();

    for (var i = date1, j = 0; j < date; i--, j++) {
      this.state.arr.unshift(i);
    }

    for (var i = 1; i <= today; i++) {
      this.state.arr.push(i);
    }
    for (var i = this.state.arr.length, j = 1; i < 42; j++, i++) {
      this.state.arr.push(j);
    }
    return (
      <div className="calendar">
        <Select name="year" date={this.state.year} fn={this.change}></Select>
        <Select name="month" date={this.state.month} fn={this.change}></Select>
        <div className="monthes">
          {this.state.day.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}

          {this.state.arr.map((item, index) => {
            return (
              <li
                key={index}
                className={
                  item == new Date().getDate() && count++ == 1 ? 'show' : ''
                }
                onClick={this.chose.bind(this)}
              >
                {item}
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: false,
      date: this.props.date,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    };
  }

  selectHandler = () => {
    this.setState({ select: !this.state.select });
  };

  change = (e) => {
    if (this.props.name == 'year') {
      this.props.fn('year', e);
      this.setState({ year: e });
    } else {
      this.props.fn('month', e);
      this.setState({ month: e });
    }
  };

  render() {
    return (
      <div
        className={'select' + ' ' + this.props.name}
        onClick={this.selectHandler}
      >
        <span className="date">
          {this.props.name == 'year' ? this.state.year : this.state.month}
        </span>
        <span className={this.state.select ? 'top' : 'under'}></span>

        {this.state.select && (
          <div className="list">
            {this.state.date.map((item, index) => {
              return (
                <li key={index} onClick={this.change.bind(this, item)}>
                  {item}
                </li>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
