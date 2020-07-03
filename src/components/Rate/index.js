import React, { Component } from 'react'
import './index.less'

export default class Rate extends Component {
    state = {
        count: this.props.number || 5,
        num: this.props.def || 0,
        disabled: this.props.disabled || false,
        enter: 0,
        leave: this.props.def || 0,
        state: ['不满意', '满意', '超满意']
    }
    /** 页面渲染前 */
    componentWillMount = () => {}
    /** 页面渲染后 */
    componentDidMount = () => {}
    /** 数据更新前 */
    componentWillUpdate = () => {
        this.showState()
    }
    showState() {
        let { count, num, enter, state } = this.state
        let f = Math.ceil(count / 2)
        if (num == 0 && enter == 0) {
            return ''
        } else if (num < f && enter < f) {
            return state[0]
        } else if (
            num == count ||
            enter == count
        ) {
            return state[2]
        } else {
            return state[1]
        }
    }
    /** 数据更新后 */
    componentDidUpdate = () => {}
    render() {
        let { count, num, enter, leave } = this.state
        return (
            <div className="rate">
                {new Array(count).fill().map((item, index) => (
                    <span
                        key={index}
                        onClick={() => {
                            if(!this.state.disabled) {
                                num = index + 1
                                leave = num
                                this.setState({ num, leave })
                            }
                        }}
                        onMouseEnter={() => {
                            if(!this.state.disabled) {
                                enter = index + 1
                                num = 0
                                this.setState({ enter, num })
                            }
                        }}
                        onMouseLeave={() => {
                            if(!this.state.disabled) {
                                enter = 0
                                num = leave
                                this.setState({ enter, num })
                            }
                        }}

                    >
              {enter > index ? (
                  <span className="rc-icon rc-badge--icon-label  rc-padding-x--xs--mobile  rc-margin-bottom--xs rc-margin-right--xs rc-rate-fill--xs rc-brand1--xs" disabled={this.state.disabled}></span>
              ) : num > index ? (
                  <span className="rc-icon rc-badge--icon-label  rc-padding-x--xs--mobile  rc-margin-bottom--xs rc-margin-right--xs rc-rate-fill--xs rc-brand1--xs" disabled={this.state.disabled}></span>
              ) : (
                  <span className="rc-icon rc-badge--icon-label  rc-padding-x--xs--mobile  rc-margin-right--xs rc-rate-fill--xs rc-iconography--xs" disabled={this.state.disabled}></span>
              )}
            </span>
                ))}
            </div>
        )
    }
}
