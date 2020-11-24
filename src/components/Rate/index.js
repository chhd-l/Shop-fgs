import React, { Component } from 'react';
import './index.less';
import Tooltip from '@/components/Tooltip';
import redStar from './images/redStar.svg';
import grayStar from './images/grayStar.svg';
import oraStar from './images/oraStar.svg';
import halfStar from './images/halfStar.png';
import oraStar_active from './images/oraStar_active.svg';
export default class Rate extends Component {
  state = {
    count: this.props.number || 5,
    num: this.props.def || 0,
    disabled: this.props.disabled || false,
    enter: 0,
    leave: this.props.def || 0,
    state: ['不满意', '满意', '超满意'],
    tooltipStatus: false,
    inActiveStar: grayStar,
    activeStar: redStar,
    halfStar: halfStar
  };
  /** 页面渲染前 */
  /*componentWillMount = () => {};*/
  /** 页面渲染后 */
  componentDidMount = () => {
    if (this.props.color === 'yellow') {
      this.setState({ inActiveStar: oraStar, activeStar: oraStar_active });
    }
  };
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
  /** 数据更新后 */
  componentDidUpdate = () => {};
  render() {
    let { count, num, enter, leave } = this.state;
    const t = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/; //整数
    const flag = !t.test(num);
    const numInt = parseInt(num);
    const tooltip = this.props.tooltip ? this.props.tooltip : null;
    return (
      <div>
        <div className="rate">
          {new Array(count).fill().map((item, index) => (
            <span
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
                // <span
                //   className={`rc-icon  hands rc-margin-bottom--xs rc-rate-fill--xs rc-brand1--xs ${this.props.marginSize}`}
                //   disabled={this.state.disabled}
                //   // style={{marginRight:this.props.marginSize}}
                // ></span>

                <img src={this.state.activeStar} alt="" />
              ) : flag && index === numInt ? (
                // <span
                //   className={`rc-icon rc-margin-bottom--xs rc-rate-fill--xs half-star ${this.props.marginSize}`}
                //   disabled={this.state.disabled}
                //   // style={{marginRight:this.props.marginSize}}
                // />
                <img src={this.state.halfStar} alt="" />
              ) : (
                // <img src={redStar}/>
                // <span
                //   className={`rc-icon rc-margin-bottom--xs rc-rate-fill--xs rc-iconography--xs  ${this.props.marginSize}`}
                //   style={{ opacity: '.5' }}
                //   disabled={this.state.disabled}
                // ></span>
                <img src={this.state.inActiveStar} alt="" />
              )}
            </span>
          ))}
        </div>
        {tooltip && this.state.tooltipStatus ? (
          <Tooltip
            // containerStyle={{ transform: 'translate(-89%, 89%)' }}
            // arrowStyle={{ left: '120%' }}
            content={tooltip}
          />
        ) : null}
      </div>
    );
  }
}
