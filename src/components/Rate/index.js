import React, { Component } from 'react';
import './index.less';
import Tooltip from '@/components/Tooltip';
export default class Rate extends Component {
  static defaultProps = {
    color: 'red' // red yellow
  };
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.number || 5,
      num: this.props.def || 0,
      disabled: this.props.disabled || false,
      enter: 0,
      leave: this.props.def || 0,
      state: ['不满意', '满意', '超满意'],
      tooltipStatus: false
    };
  }
  /** 数据更新前 */
  UNSAFE_componentWillUpdate = () => {
    this.showState();
  };
  showState() {
    let { count, num, enter, state } = this.state;
    let f = Math.ceil(count / 2);
    if (Number(num) === 0 && Number(enter) === 0) {
      return '';
    } else if (num < f && enter < f) {
      return state[0];
    } else if (
      Number(num) === Number(count) ||
      Number(enter) === Number(count)
    ) {
      return state[2];
    } else {
      return state[1];
    }
  }
  render() {
    const { color } = this.props;
    let { count, num, enter, leave } = this.state;
    const t = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/; //整数
    const flag = !t.test(num);
    const numInt = parseInt(num);
    const tooltip = this.props.tooltip ? this.props.tooltip : null;

    const activeStar =
      color === 'red' ? (
        <span className="iconfont text-rc-red rate__icon icongrayStar" />
      ) : (
        <span className="iconfont rate__icon yellow icongrayStar" />
      );

    const halfStar = (
      <img
        className="inline-block"
        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/icons/star.svg`}
        alt="icons star"
        style={{ width: '1.3rem', height: '1.3rem', verticalAlign: 'middle' }}
      />
    );

    const inActiveStar =
      color === 'red' ? (
        <span className="iconfont rate__icon grey icongrayStar" />
      ) : (
        <span className="iconfont rate__icon grey icongrayStar1" />
      );
    return (
      <div>
        <div className="rate flex 1111111 items-center">
          {new Array(count).fill().map((item, index) => (
            <span
              className="rate__icon__container"
              key={index}
              onClick={() => {
                if (!this.state.disabled) {
                  num = index + 1;
                  leave = num;
                  this.setState({ num, leave });
                  this.props.selectRate(num);
                }
              }}
              onMouseEnter={() => {
                if (!this.state.disabled) {
                  enter = index + 1;
                  num = 0;
                  this.setState({ enter, num });
                }
                if (tooltip) {
                  this.setState({ tooltipStatus: true });
                }
              }}
              onMouseLeave={() => {
                if (!this.state.disabled) {
                  enter = 0;
                  num = leave;
                  this.setState({ enter, num });
                }
                if (tooltip) {
                  this.setState({ tooltipStatus: false });
                }
              }}
            >
              {enter > index || num - 1 >= index ? (
                <>{activeStar}</>
              ) : flag && index === numInt ? (
                <>{halfStar}</>
              ) : (
                <>{inActiveStar}</>
              )}
            </span>
          ))}
        </div>
        {tooltip && this.state.tooltipStatus ? (
          <Tooltip content={tooltip} />
        ) : null}
      </div>
    );
  }
}
