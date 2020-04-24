import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.css';
 
 
let defaultState = {
  alertStatus:false,
  alertTip:"提示",
  time:3000,
  closeAlert:function(){}
}
 
class Alert extends Component{
 
  state = {
    ...defaultState,
  };
  componentDidMount() {
    this.timer = setTimeout(
      () => {
        this.close()
      },
      this.state.time
    )
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  // css动画组件设置为目标组件
  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }
  // 关闭弹框
  confirm = () => {
    this.setState({
      alertStatus:false
    })
    this.state.closeAlert();
  }
  open =(options)=>{
    options = options || {};
    options.alertStatus = true;
    this.setState({
      ...defaultState,
      ...options
    })
  }
  close(){
    this.state.closeAlert();
    this.setState({
      ...defaultState
    })
  }
  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }
   
  render(){
    return (
      <ReactCSSTransitionGroup
        component={this.FirstChild}
        transitionName='hide'
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        {/* <aside class="rc-alert rc-alert--error rc-alert--with-close" role="alert" style={this.state.alertStatus? {display:'block'}:{display:'none'}}>
          <span>{this.state.alertTip}</span>
          <button class="rc-alert__close rc-icon rc-icon rc-close-error--xs" data-close="">
            <span class="rc-screen-reader-text" onClick={this.confirm}>Close</span>
          </button>
        </aside> */}
        <div className="alert-con" style={this.state.alertStatus? {display:'block'}:{display:'none'}}>
          {/* <aside class="rc-alert rc-alert--error rc-alert--with-close" role="alert" >
            <div>{this.state.alertTip}</div>
            <button class="rc-alert__close rc-icon rc-icon rc-close-error--xs" data-close="">
              <span class="rc-screen-reader-text" onClick={this.confirm}>Close</span>
            </button>
          </aside> */}
          <div className="alert-context rc-alert rc-alert--error rc-alert--with-close" style={{width: "50%",height: "4rem"}}>
            <div>{this.state.alertTip}</div>
            <button class="rc-alert__close rc-icon rc-icon rc-close-error--xs" data-close="">
              <span class="rc-screen-reader-text" onClick={this.confirm}>Close</span>
            </button>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
 
let div = document.getElementById("alert-tip");
let props = {
   
};
 
let Box = ReactDOM.render(React.createElement(
  Alert,
  props
),div);
 
 
 
export default Box;