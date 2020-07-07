import React from "react"
import { inject } from 'mobx-react'
import UnloginCart from './modules/unLoginCart'
import LoginCart from './modules/loginCart'
import "./index.css"

@inject("loginStore")
class Cart extends React.Component {
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
  }
  get isLogin () {
    return this.props.loginStore.isLogin
  }
  render () {
    return (
      <>
        {
          this.isLogin
            ? <LoginCart history={this.props.history} />
            : <UnloginCart history={this.props.history} />
        }
      </>
    )
  }
}

export default Cart