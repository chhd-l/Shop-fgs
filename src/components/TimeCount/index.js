import React from 'react';
import { FormattedMessage } from 'react-intl';

export default class TimeCount extends React.Component {
  static defaultProps = {
    // endTime:
  };
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0,
      second: 0,
      initd: false
    };
    this.timer = null;
  }
  componentDidMount() {
    const end = Date.parse(new Date(this.props.endTime));
    this.countFun(end);
  }
  countFun = (end) => {
    let now_time = Date.parse(
      this.props.startTime ? new Date(this.props.startTime) : new Date()
    );
    var remaining = end - now_time;

    this.timer = setInterval(() => {
      this.setState({ initd: true });
      //防止出现负数
      if (remaining > 1000) {
        remaining -= 1000;
        let hour = Math.floor((remaining / 1000 / 3600) % 24);
        let minute = Math.floor((remaining / 1000 / 60) % 60);
        let second = Math.floor((remaining / 1000) % 60);

        this.setState({
          hour: hour < 10 ? '0' + hour : hour,
          minute: minute < 10 ? '0' + minute : minute,
          second: second < 10 ? '0' + second : second
        });
      } else {
        clearInterval(this.timer);
        //倒计时结束时触发父组件的方法
        this.props.onTimeEnd();
      }
    }, 1000);
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      this.state.initd && (
        <span className="red">
          <span
            className="inlineblock rc-icon rc-clock--xs rc-brand1 relative"
            style={{ top: 2 }}
          ></span>
          {this.state.hour}:{this.state.minute}:{this.state.second}
        </span>
      )
    );
  }
}
